'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface ConfirmFinishModalProps {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  blankCount: number;
  markedCount: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmFinishModal({
  isOpen,
  answeredCount,
  totalQuestions,
  blankCount,
  markedCount,
  elapsedSeconds,
  remainingSeconds,
  onCancel,
  onConfirm,
}: ConfirmFinishModalProps) {
  if (!isOpen) return null;

  const formatTime = (totalSecs: number) => {
    const h = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const s = String(totalSecs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const hasUnanswered = blankCount > 0;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 border border-surface-container-highest/80">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
          hasUnanswered ? 'bg-amber-100 text-amber-700' : 'bg-secondary-fixed text-primary'
        }`}>
          {hasUnanswered ? (
            <AlertTriangle className="w-7 h-7" />
          ) : (
            <CheckCircle2 className="w-7 h-7" />
          )}
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Entregar simulado agora?
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Você respondeu <strong className="text-on-surface font-bold">{answeredCount} de {totalQuestions} questões</strong>.
            {blankCount > 0 && (
              <> Ainda restam <span className="text-amber-700 font-bold">{blankCount} em branco</span></>
            )}
            {markedCount > 0 && (
              <> e <span className="text-secondary font-bold">{markedCount} marcadas para revisão</span></>
            )}.
          </p>
        </div>

        {/* Time stats */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2 text-xs font-semibold">
          <div className="flex justify-between text-on-surface-variant">
            <span>Tempo decorrido:</span>
            <span className="font-bold text-on-surface tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Tempo restante disponível:</span>
            <span className="font-bold text-primary tabular-nums">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl bg-surface-container text-on-surface text-sm font-bold hover:bg-surface-container-high transition-colors"
          >
            Continuar Prova
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container active:scale-95 shadow-md transition-all"
          >
            Confirmar Entrega
          </button>
        </div>
      </div>
    </div>
  );
}
