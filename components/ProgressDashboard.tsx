'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  Trophy, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck,
  Play
} from 'lucide-react';
import { ExamResult } from '@/types/quiz';
import { storage } from '@/lib/storage';
import { allExams } from '@/data/exams';

interface ProgressDashboardProps {
  onViewResult: (result: ExamResult) => void;
  onStartExam: (examId: string) => void;
  onExplore: () => void;
}

export function ProgressDashboard({
  onViewResult,
  onStartExam,
  onExplore,
}: ProgressDashboardProps) {
  // Lazy state initializers - No cascading effect re-renders
  const [history, setHistory] = useState<ExamResult[]>(() => storage.getHistory());
  const [savedQuestionIds, setSavedQuestionIds] = useState<string[]>(() => storage.getSavedQuestions());
  const [stats, setStats] = useState(() => storage.getUserStats());

  const handleClearData = () => {
    if (window.confirm('Tem certeza de que deseja limpar todo o histórico local salvo neste navegador? Esta ação não pode ser desfeita.')) {
      storage.clearAllData();
      setHistory([]);
      setSavedQuestionIds([]);
      setStats(storage.getUserStats());
    }
  };

  // Find saved questions objects from all available exams
  const savedQuestionsList = allExams
    .flatMap(e => e.questions.map(q => ({ ...q, examTitle: e.title, examId: e.id })))
    .filter(q => savedQuestionIds.includes(q.id));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col gap-8">
      {/* Privacy Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary-fixed/50 border border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">
              Progresso 100% Privado e Sem Cadastro
            </h4>
            <p className="text-xs text-on-surface-variant">
              Seu histórico, anotações e caderno de erros são armazenados exclusivamente na memória deste navegador (LocalStorage).
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Dados</span>
          </button>
        )}
      </div>

      {/* Metrics Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Simulados */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Simulados Realizados
          </span>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">{stats.totalSimulados}</span>
            <span className="text-xs text-on-surface-variant font-semibold">provas entregues</span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            <span>{stats.totalQuestionsAnswered} questões resolvidas</span>
          </div>
        </div>

        {/* Média de Assertividade */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Aproveitamento Médio
          </span>
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-on-surface">{stats.avgAccuracy}</span>
            <span className="text-2xl font-bold text-secondary">%</span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span>{stats.totalCorrect} acertos no total</span>
          </div>
        </div>

        {/* Tempo de Estudo */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Tempo em Simulado
          </span>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-surface">{stats.totalTimeMinutes}</span>
            <span className="text-xs text-on-surface-variant font-semibold">minutos de treino</span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>Gestão cronometrada</span>
          </div>
        </div>

        {/* Caderno de Erros */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Caderno de Erros
          </span>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-secondary">{stats.savedQuestionsCount}</span>
            <span className="text-xs text-on-surface-variant font-semibold">questões salvas</span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
            <Bookmark className="w-3.5 h-3.5 text-primary" />
            <span>Para revisão direcionada</span>
          </div>
        </div>
      </div>

      {/* History Table / List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            Histórico de Tentativas Realizadas
          </h2>
          <span className="text-xs font-semibold text-on-surface-variant">
            {history.length} {history.length === 1 ? 'tentativa' : 'tentativas'}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="p-10 text-center bg-surface-container-lowest rounded-3xl border border-surface-container-highest flex flex-col items-center gap-3">
            <BarChart3 className="w-12 h-12 text-on-surface-variant/40" />
            <h3 className="text-base font-bold text-on-surface">Você ainda não finalizou nenhum simulado</h3>
            <p className="text-xs text-on-surface-variant max-w-sm">
              Escolha uma das provas do catálogo, responda às questões e seu diagnóstico completo aparecerá aqui automaticamente.
            </p>
            <button
              onClick={onExplore}
              className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container"
            >
              Começar Meu Primeiro Simulado
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((item) => {
              const formattedDate = new Date(item.completedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-primary text-[10px] font-bold uppercase tracking-wider">
                        {item.examCategory.toUpperCase()}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {formattedDate}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-on-surface truncate">
                      {item.examTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                      <span>{item.totalCorrect} de {item.totalQuestions} acertos</span>
                      <span>•</span>
                      <span>Nota TRI: <strong>{item.estimatedTri}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-container-high/40">
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-primary">
                        {item.percentageScore.toFixed(1)}%
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-medium">Aproveitamento</span>
                    </div>

                    <button
                      onClick={() => onViewResult(item)}
                      className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
                    >
                      <span>Ver Resultados</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Caderno de Erros Section */}
      {savedQuestionsList.length > 0 && (
        <div className="flex flex-col gap-4 pt-6 border-t border-surface-container-highest/60">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">
                Caderno de Erros e Questões Salvas
              </h2>
              <p className="text-xs text-on-surface-variant">
                Revise os pontos críticos marcados durante suas resoluções
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs font-bold">
              {savedQuestionsList.length} salvas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedQuestionsList.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-xs font-bold text-primary">
                      {q.subject}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-semibold">
                      {q.examTitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-on-surface line-clamp-3">
                    {q.prompt}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant">
                  <span className="font-bold text-primary block mb-0.5">Resposta Correta: Alternativa {q.correctAlternativeId}</span>
                  <p className="line-clamp-2">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
