'use client';

import React from 'react';
import { Sparkles, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { ExamResult } from '@/types/quiz';

interface IntelligentDiagnosisProps {
  result: ExamResult;
  onQuickQuiz: () => void;
}

export function IntelligentDiagnosis({ result, onQuickQuiz }: IntelligentDiagnosisProps) {
  const easy = result.difficultyBreakdown['Fácil'] || { total: 0, correct: 0 };
  const medium = result.difficultyBreakdown['Média'] || { total: 0, correct: 0 };
  const hard = result.difficultyBreakdown['Difícil'] || { total: 0, correct: 0 };

  const easyPercent = easy.total > 0 ? Math.round((easy.correct / easy.total) * 100) : 100;
  const mediumPercent = medium.total > 0 ? Math.round((medium.correct / medium.total) * 100) : 85;
  const hardPercent = hard.total > 0 ? Math.round((hard.correct / hard.total) * 100) : 60;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
          Diagnóstico Inteligente
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Mapeamento automatizado de pontos de atenção
        </p>
      </div>

      {/* AI Guidance Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-primary-container to-primary text-white shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-secondary/30 blur-2xl" />

        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-secondary-fixed" />
          </span>
          <span className="text-xs font-bold tracking-wider uppercase text-secondary-fixed">
            Recomendação do Mentor Pedagógico
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
          {result.weakTopics.length > 0 ? (
            <>Foque nestes tópicos para elevar sua pontuação:</>
          ) : (
            <>Excelente aproveitamento geral em todos os eixos!</>
          )}
        </h3>

        <p className="text-xs sm:text-sm text-primary-fixed mb-5 leading-relaxed">
          {result.totalWrong > 0 ? (
            `Suas ${result.totalWrong} incorreções concentraram-se em tópicos específicos que podem ser rapidamente fixados com o gabarito comentado.`
          ) : (
            'Você dominou todas as questões deste simulado! Mantenha o ritmo de prova realizando outros cadernos.'
          )}
        </p>

        {/* Warning cards for weak areas */}
        <div className="space-y-3 mb-6">
          {result.weakTopics.slice(0, 2).map((topic, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm flex items-start gap-3 border border-white/10">
              <AlertTriangle className="w-4 h-4 text-secondary-fixed shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">{topic}</p>
                <p className="text-[11px] text-primary-fixed">
                  Questão incorreta identificada · 10 min de revisão sugeridos
                </p>
              </div>
            </div>
          ))}

          {result.weakTopics.length === 0 && (
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm flex items-start gap-3 border border-white/10">
              <Check className="w-4 h-4 text-secondary-fixed shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Nenhum ponto crítico detectado</p>
                <p className="text-[11px] text-primary-fixed">
                  Excelente consistência conceitual em todas as áreas avaliadas.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {result.totalWrong > 0 && (
          <button
            onClick={onQuickQuiz}
            className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest text-primary text-xs sm:text-sm font-bold shadow hover:bg-surface active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Praticar Apenas as {result.totalWrong} Questões Erradas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Difficulty Profile Distribution */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-on-surface">Curva de Dificuldade Respondida</span>
          <span className="text-on-surface-variant text-xs font-semibold">
            {easyPercent >= 80 && mediumPercent >= 60 ? 'Coerência TRI Alta' : 'Coerência Regular'}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {/* Easy */}
          {easy.total > 0 && (
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-on-surface font-semibold">Fáceis ({easy.total} questões)</span>
                <span className="font-bold text-primary">
                  {easy.correct}/{easy.total} acertos ({easyPercent}%)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${easyPercent}%` }} />
              </div>
            </div>
          )}

          {/* Medium */}
          {medium.total > 0 && (
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-on-surface font-semibold">Médias ({medium.total} questões)</span>
                <span className="font-bold text-secondary">
                  {medium.correct}/{medium.total} acertos ({mediumPercent}%)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: `${mediumPercent}%` }} />
              </div>
            </div>
          )}

          {/* Hard */}
          {hard.total > 0 && (
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-on-surface font-semibold">Difíceis ({hard.total} questões)</span>
                <span className="font-bold text-on-surface">
                  {hard.correct}/{hard.total} acertos ({hardPercent}%)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: `${hardPercent}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
