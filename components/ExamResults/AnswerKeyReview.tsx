'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Flag, 
  ChevronDown, 
  Bookmark, 
  BookmarkCheck, 
  Lightbulb, 
  GraduationCap, 
  Clock 
} from 'lucide-react';
import { Exam, ExamResult, Question } from '@/types/quiz';
import { storage } from '@/lib/storage';

interface AnswerKeyReviewProps {
  exam: Exam;
  result: ExamResult;
  onRedoErrors: () => void;
  onRedoFull: () => void;
}

export function AnswerKeyReview({
  exam,
  result,
  onRedoErrors,
  onRedoFull,
}: AnswerKeyReviewProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'marked'>('all');
  const [savedQuestions, setSavedQuestions] = useState<string[]>(() => storage.getSavedQuestions());

  const handleToggleBookmark = (questionId: string) => {
    storage.toggleSaveQuestion(questionId);
    setSavedQuestions(storage.getSavedQuestions());
  };

  const markedQuestionsCount = Object.values(result.attempts).filter(a => a.isMarkedForReview).length;

  const filteredQuestions = exam.questions.filter((q) => {
    const attempt = result.attempts[q.id];
    const isCorrect = attempt?.selectedAlternativeId === q.correctAlternativeId;
    const isMarked = Boolean(attempt?.isMarkedForReview);

    if (filter === 'correct') return isCorrect;
    if (filter === 'wrong') return !isCorrect;
    if (filter === 'marked') return isMarked;
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20">
      <div className="flex flex-col gap-6">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Revisão Detalhada do Gabarito
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Confira cada alternativa, justificativa do professor e estatísticas didáticas
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 rounded-2xl border border-surface-container-highest/60">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Todas as Questões ({exam.questions.length})
            </button>

            <button
              onClick={() => setFilter('correct')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'correct'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Acertos ({result.totalCorrect})
            </button>

            <button
              onClick={() => setFilter('wrong')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'wrong'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Erros ({result.totalWrong})
            </button>

            <button
              onClick={() => setFilter('marked')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'marked'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Revisadas ({markedQuestionsCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex flex-col gap-6">
          {filteredQuestions.map((question) => {
            const attempt = result.attempts[question.id];
            const isCorrect = attempt?.selectedAlternativeId === question.correctAlternativeId;
            const isMarked = Boolean(attempt?.isMarkedForReview);
            const isSaved = savedQuestions.includes(question.id);

            const formatSpent = (sec?: number) => {
              if (!sec) return '1m 30s';
              const m = Math.floor(sec / 60);
              const s = sec % 60;
              return `${m}m ${s}s`;
            };

            return (
              <article
                key={question.id}
                className="p-6 lg:p-8 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm flex flex-col gap-5 hover:shadow-md transition-all"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-container-high/40">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-high text-primary font-extrabold text-xs flex items-center justify-center">
                      {String(question.number).padStart(2, '0')}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
                      {question.source}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs font-bold">
                      {question.subject}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold">
                      {question.difficulty}
                    </span>
                    {isMarked && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-primary text-xs font-bold">
                        <Flag className="w-3 h-3 fill-primary" /> Marcada p/ Revisão
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        Você acertou
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Você errou
                      </span>
                    )}
                    <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> {formatSpent(attempt?.timeSpentSeconds)}
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="text-on-surface text-base leading-relaxed">
                  {question.contextQuote && (
                    <p className="italic text-on-surface-variant text-sm mb-3 bg-surface-container-low p-4 rounded-xl border-l-4 border-primary">
                      {question.contextQuote}
                    </p>
                  )}
                  <p className="font-bold text-on-surface text-base sm:text-lg">
                    {question.prompt}
                  </p>
                </div>

                {/* Alternatives with user choice & official key */}
                <div className="grid grid-cols-1 gap-2.5">
                  {question.alternatives.map((alt) => {
                    const wasChosen = attempt?.selectedAlternativeId === alt.id;
                    const isRightAnswer = question.correctAlternativeId === alt.id;

                    let rowStyle = 'bg-surface-container-low/60 text-on-surface-variant border-transparent';
                    if (isRightAnswer) {
                      rowStyle = 'bg-secondary-fixed/50 text-primary border-secondary font-semibold shadow-sm';
                    } else if (wasChosen && !isRightAnswer) {
                      rowStyle = 'bg-rose-100/70 text-rose-900 border-rose-300 font-medium';
                    }

                    return (
                      <div
                        key={alt.id}
                        className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${rowStyle}`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                            isRightAnswer
                              ? 'bg-primary text-white'
                              : wasChosen
                              ? 'bg-rose-600 text-white'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}>
                            {alt.id}
                          </span>
                          <span className="leading-relaxed">{alt.text}</span>
                        </div>

                        {/* Status Label on Right */}
                        <div className="shrink-0 ml-2">
                          {isRightAnswer && wasChosen && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                              <CheckCircle className="w-4 h-4" /> Sua Escolha · Correta
                            </span>
                          )}
                          {isRightAnswer && !wasChosen && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                              <CheckCircle className="w-4 h-4" /> Gabarito Oficial
                            </span>
                          )}
                          {!isRightAnswer && wasChosen && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                              <XCircle className="w-4 h-4" /> Sua Resposta
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Expandable Teacher Commentary Accordion */}
                <div className="pt-2">
                  <details className="group rounded-2xl bg-surface-container p-4 cursor-pointer">
                    <summary className="flex items-center justify-between text-xs sm:text-sm font-bold text-primary select-none">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-secondary" />
                        Comentário do Professor ({question.teacherName || 'Equipe Pedagógica Quiz\'s'})
                      </span>
                      <ChevronDown className="w-4 h-4 text-on-surface-variant group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-container-high/60 mt-3">
                      <p>{question.explanation}</p>
                      {question.pedagogicalFocus && (
                        <div className="mt-2 text-xs font-bold text-primary">
                          Eixo pedagógico: {question.pedagogicalFocus}
                        </div>
                      )}
                    </div>
                  </details>
                </div>

                {/* Actions: Save to Error Notebook */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleToggleBookmark(question.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isSaved
                        ? 'bg-primary text-white'
                        : 'bg-surface-container text-primary hover:bg-secondary-fixed'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Salva no Caderno de Erros' : 'Salvar no Caderno de Erros'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Redo Actions */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary shrink-0 shadow-sm">
              <Lightbulb className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                Pronto para fixar os conteúdos incorretos?
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Pratique imediatamente as {result.totalWrong} questões que você errou ou inicie uma nova simulação completa cronometrada.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
            {result.totalWrong > 0 && (
              <button
                onClick={onRedoErrors}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-lowest text-primary text-xs sm:text-sm font-bold shadow hover:bg-surface-container hover:shadow-md transition-all flex items-center justify-center gap-2 border border-surface-container-highest"
              >
                <Bookmark className="w-4 h-4 text-secondary" />
                <span>Refazer Apenas as {result.totalWrong} Erradas</span>
              </button>
            )}

            <button
              onClick={onRedoFull}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Refazer Simulado Completo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
