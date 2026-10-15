'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Timer, 
  Pause, 
  Play, 
  Flag, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { Exam } from '@/types/quiz';

interface ExamHeaderProps {
  exam: Exam;
  currentQuestionNumber: number;
  totalQuestions: number;
  secondsRemaining: number;
  isPaused: boolean;
  isMarkedForReview: boolean;
  answeredCount: number;
  markedCount: number;
  blankCount: number;
  onPauseToggle: () => void;
  onBookmarkToggle: () => void;
  onExit: () => void;
}

export function ExamHeader({
  exam,
  currentQuestionNumber,
  totalQuestions,
  secondsRemaining,
  isPaused,
  isMarkedForReview,
  answeredCount,
  markedCount,
  blankCount,
  onPauseToggle,
  onBookmarkToggle,
  onExit,
}: ExamHeaderProps) {
  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="sticky top-20 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border-b border-surface-container-highest/60">
      {/* Top Title & Timer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={onExit}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high transition-colors shrink-0"
            title="Voltar ao início"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-primary text-[10px] sm:text-xs uppercase font-extrabold tracking-wider">
                {exam.isOfficial ? 'Simulado Oficial' : 'Simulado de Treino'}
              </span>
              <span className="text-xs text-on-surface-variant truncate font-medium">
                {exam.subtitle}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-on-surface truncate">
              {exam.title}
            </h1>
          </div>
        </div>

        {/* Right: Timer & Controls */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-4 shrink-0">
          {/* Countdown Clock */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-sm border transition-colors ${
            secondsRemaining < 300 
              ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
              : 'bg-surface-container-low border-surface-container-highest text-primary'
          }`}>
            <Timer className="w-5 h-5 text-primary" />
            <span className="font-extrabold text-sm sm:text-base tracking-tight tabular-nums">
              {formatTime(secondsRemaining)}
            </span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={onPauseToggle}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isPaused
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPaused ? 'Retomar' : 'Pausar'}</span>
          </button>

          {/* Bookmark / Review Later Button */}
          <button
            onClick={onBookmarkToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
              isMarkedForReview
                ? 'bg-secondary text-white'
                : 'bg-secondary-fixed text-primary hover:brightness-95'
            }`}
          >
            <Flag className={`w-4 h-4 ${isMarkedForReview ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">
              {isMarkedForReview ? 'Marcada p/ Revisão' : 'Revisar mais tarde'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress & Stat Indicators Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">
              Questão {currentQuestionNumber} de {totalQuestions}
            </span>
            <span className="text-on-surface-variant font-medium">
              respondidas ({progressPercentage}%)
            </span>
          </div>

          <div className="flex items-center gap-3 text-on-surface-variant text-[11px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              Respondidas: {answeredCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed" />
              Para Revisar: {markedCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-container-high" />
              Em aberto: {blankCount}
            </span>
          </div>
        </div>

        {/* Continuous Gradient Progress Line */}
        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
