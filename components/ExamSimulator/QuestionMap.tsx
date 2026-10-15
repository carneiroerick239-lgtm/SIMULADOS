'use client';

import React from 'react';
import { LayoutGrid, Bookmark } from 'lucide-react';
import { QuestionAttempt } from '@/types/quiz';

interface QuestionMapProps {
  totalQuestions: number;
  currentIndex: number;
  attempts: Record<string, QuestionAttempt>;
  questionIds: string[];
  onSelectIndex: (index: number) => void;
}

export function QuestionMap({
  totalQuestions,
  currentIndex,
  attempts,
  questionIds,
  onSelectIndex,
}: QuestionMapProps) {
  let answeredCount = 0;
  let markedCount = 0;
  let blankCount = 0;

  questionIds.forEach((qId, idx) => {
    const attempt = attempts[qId];
    if (attempt?.isMarkedForReview) {
      markedCount++;
    }
    if (attempt?.selectedAlternativeId) {
      answeredCount++;
    } else if (idx !== currentIndex) {
      blankCount++;
    }
  });

  return (
    <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-md border border-surface-container-highest/60 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-on-surface">Mapa da Prova</h2>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-surface-container font-bold text-on-surface-variant">
          {totalQuestions} Questões
        </span>
      </div>

      {/* Grid of Question Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const qId = questionIds[idx];
          const attempt = attempts[qId];
          const isCurrent = idx === currentIndex;
          const isAnswered = Boolean(attempt?.selectedAlternativeId);
          const isMarked = Boolean(attempt?.isMarkedForReview);

          let btnClasses = 'bg-surface-container text-on-surface-variant font-semibold hover:bg-surface-container-high';
          if (isCurrent) {
            btnClasses = 'bg-primary text-white font-extrabold shadow-md scale-105 ring-2 ring-primary-container z-10';
          } else if (isMarked) {
            btnClasses = 'bg-secondary-fixed text-primary font-bold hover:brightness-95';
          } else if (isAnswered) {
            btnClasses = 'bg-primary-fixed text-primary font-bold hover:brightness-95';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`h-10 rounded-xl text-xs flex items-center justify-center relative transition-all ${btnClasses}`}
              title={`Questão ${idx + 1}`}
            >
              {String(idx + 1).padStart(2, '0')}
              {isMarked && (
                <span className="w-2 h-2 rounded-full bg-secondary absolute top-1.5 right-1.5 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend & Stats */}
      <div className="pt-3 border-t border-surface-container-high/40 flex flex-col gap-2 text-xs text-on-surface-variant">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-primary-fixed" />
            Respondida
          </span>
          <span className="font-bold text-on-surface">{answeredCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-primary text-white font-bold flex items-center justify-center text-[9px]">
              •
            </span>
            Atual
          </span>
          <span className="font-bold text-primary">1</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-secondary-fixed relative flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </span>
            Revisar mais tarde
          </span>
          <span className="font-bold text-secondary">{markedCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-surface-container" />
            Não respondida
          </span>
          <span className="font-bold text-on-surface">{blankCount}</span>
        </div>
      </div>
    </div>
  );
}
