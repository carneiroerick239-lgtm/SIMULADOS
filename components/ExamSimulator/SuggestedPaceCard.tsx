'use client';

import React from 'react';
import { Sparkles, CheckSquare, Clock } from 'lucide-react';

interface SuggestedPaceCardProps {
  questionTimeSeconds: number;
  totalSecondsRemaining: number;
  totalQuestions: number;
  remainingQuestionsCount: number;
  onFinishPrompt: () => void;
}

export function SuggestedPaceCard({
  questionTimeSeconds,
  totalSecondsRemaining,
  totalQuestions,
  remainingQuestionsCount,
  onFinishPrompt,
}: SuggestedPaceCardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const remainingHours = Math.floor(totalSecondsRemaining / 3600);
  const remainingMins = Math.floor((totalSecondsRemaining % 3600) / 60);

  return (
    <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-md border border-surface-container-highest/60 flex flex-col gap-4">
      {/* Pace Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-surface">Ritmo Sugerido</span>
          <span className="text-xs text-on-surface-variant font-medium">
            Média ideal de 3 min por questão
          </span>
        </div>
      </div>

      {/* Current Question Stopwatch */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
        <span className="text-xs font-semibold text-on-surface-variant">Tempo nesta questão:</span>
        <span className="text-base font-extrabold text-primary tabular-nums">
          {formatTime(questionTimeSeconds)}
        </span>
      </div>

      {/* Pace analysis */}
      <p className="text-xs text-on-surface-variant leading-relaxed">
        Seu tempo total restante para este caderno é de{' '}
        <strong className="text-on-surface font-bold">
          {remainingHours > 0 ? `${remainingHours}h ${remainingMins}m` : `${remainingMins}m`}
        </strong>
        . Restam {remainingQuestionsCount} questões a responder.
      </p>

      {/* Big Finish Button */}
      <button
        onClick={onFinishPrompt}
        className="mt-1 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <CheckSquare className="w-4 h-4" />
        <span>Finalizar Simulado</span>
      </button>
    </div>
  );
}
