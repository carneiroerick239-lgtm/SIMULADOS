'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Exam, ExamResult, QuestionAttempt } from '@/types/quiz';
import { storage } from '@/lib/storage';
import { ExamHeader } from './ExamHeader';
import { QuestionCard } from './QuestionCard';
import { QuestionMap } from './QuestionMap';
import { SuggestedPaceCard } from './SuggestedPaceCard';
import { ConfirmFinishModal } from './ConfirmFinishModal';
import { QuickNotesModal } from './QuickNotesModal';
import { ReportQuestionModal } from './ReportQuestionModal';
import { Play } from 'lucide-react';

interface ExamSimulatorViewProps {
  exam: Exam;
  onFinishExam: (result: ExamResult) => void;
  onExit: () => void;
  filterQuestionIds?: string[]; // Optional: for redoing only wrong questions mode!
}

export function ExamSimulatorView({
  exam,
  onFinishExam,
  onExit,
  filterQuestionIds,
}: ExamSimulatorViewProps) {
  // If in re-test mode for specific questions (e.g. wrong questions only), filter the questions array
  const activeQuestions = useMemo(() => {
    if (filterQuestionIds && filterQuestionIds.length > 0) {
      const filtered = exam.questions.filter(q => filterQuestionIds.includes(q.id));
      return filtered.length > 0 ? filtered : exam.questions;
    }
    return exam.questions;
  }, [exam, filterQuestionIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, QuestionAttempt>>(() => {
    const existing = storage.getActiveSession();
    if (existing && existing.examId === exam.id) {
      return existing.attempts;
    }
    const initial: Record<string, QuestionAttempt> = {};
    activeQuestions.forEach(q => {
      initial[q.id] = {
        questionId: q.id,
        selectedAlternativeId: null,
        isMarkedForReview: false,
        isStruckThrough: [],
        timeSpentSeconds: 0,
      };
    });
    return initial;
  });

  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const existing = storage.getActiveSession();
    if (existing && existing.examId === exam.id) {
      return existing.durationSeconds;
    }
    return exam.durationMinutes * 60;
  });

  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [elapsedTotalSeconds, setElapsedTotalSeconds] = useState(0);

  // Modals
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const currentQuestion = activeQuestions[currentIndex];
  const currentAttempt = attempts[currentQuestion?.id] || {
    questionId: currentQuestion?.id,
    selectedAlternativeId: null,
    isMarkedForReview: false,
    isStruckThrough: [],
    timeSpentSeconds: 0,
  };

  // Evaluation and Result Calculation - Declared before timer effect
  const handleFinishExam = useCallback(() => {
    setIsFinishModalOpen(false);

    let totalCorrect = 0;
    let totalAnswered = 0;
    let totalBlank = 0;
    const disciplineStats: Record<string, { total: number; correct: number; percentage: number }> = {};
    const difficultyStats = {
      'Fácil': { total: 0, correct: 0 },
      'Média': { total: 0, correct: 0 },
      'Difícil': { total: 0, correct: 0 },
    };
    const weakTopicsSet = new Set<string>();

    activeQuestions.forEach(q => {
      const att = attempts[q.id];
      const isCorrect = att?.selectedAlternativeId === q.correctAlternativeId;

      // Question counts
      if (att?.selectedAlternativeId) {
        totalAnswered++;
      } else {
        totalBlank++;
      }

      if (isCorrect) {
        totalCorrect++;
      } else {
        weakTopicsSet.add(`${q.subject} (${q.generalDiscipline})`);
      }

      // Discipline stats
      if (!disciplineStats[q.subject]) {
        disciplineStats[q.subject] = { total: 0, correct: 0, percentage: 0 };
      }
      disciplineStats[q.subject].total++;
      if (isCorrect) disciplineStats[q.subject].correct++;

      // Difficulty stats
      if (difficultyStats[q.difficulty]) {
        difficultyStats[q.difficulty].total++;
        if (isCorrect) difficultyStats[q.difficulty].correct++;
      }
    });

    // Compute percentages
    Object.keys(disciplineStats).forEach(key => {
      const item = disciplineStats[key];
      item.percentage = Math.round((item.correct / item.total) * 100);
    });

    const totalQuestions = activeQuestions.length;
    const totalWrong = totalQuestions - totalCorrect;
    const percentageScore = (totalCorrect / totalQuestions) * 100;

    // Pedagogical TRI estimation formula
    const easyPoints = difficultyStats['Fácil'].total > 0 ? (difficultyStats['Fácil'].correct / difficultyStats['Fácil'].total) * 150 : 150;
    const mediumPoints = difficultyStats['Média'].total > 0 ? (difficultyStats['Média'].correct / difficultyStats['Média'].total) * 250 : 200;
    const hardPoints = difficultyStats['Difícil'].total > 0 ? (difficultyStats['Difícil'].correct / difficultyStats['Difícil'].total) * 200 : 150;
    const estimatedTri = Math.min(1000, Math.round(350 + easyPoints + mediumPoints + hardPoints + (percentageScore * 0.5)));

    const result: ExamResult = {
      id: `result-${exam.id}-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      examCategory: exam.category,
      completedAt: new Date().toISOString(),
      totalQuestions,
      totalAnswered,
      totalBlank,
      totalCorrect,
      totalWrong,
      percentageScore,
      estimatedTri,
      timeSpentSeconds: elapsedTotalSeconds,
      attempts,
      disciplineBreakdown: disciplineStats,
      difficultyBreakdown: difficultyStats,
      weakTopics: Array.from(weakTopicsSet),
    };

    storage.saveResult(result);
    storage.clearActiveSession();
    onFinishExam(result);
  }, [activeQuestions, attempts, elapsedTotalSeconds, exam, onFinishExam]);

  const finishExamRef = useRef(handleFinishExam);
  useEffect(() => {
    finishExamRef.current = handleFinishExam;
  }, [handleFinishExam]);

  // Timer interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExamRef.current();
          return 0;
        }
        return prev - 1;
      });

      setCurrentQuestionTime(prev => prev + 1);
      setElapsedTotalSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Persist session to local storage
  useEffect(() => {
    storage.saveActiveSession({
      examId: exam.id,
      startedAt: new Date().toISOString(),
      durationSeconds: secondsRemaining,
      attempts,
      currentQuestionIndex: currentIndex,
      isPaused,
    });
  }, [attempts, currentIndex, secondsRemaining, isPaused, exam.id]);

  // Handlers
  const handleSelectAlternative = (altId: string) => {
    setAttempts(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedAlternativeId: prev[currentQuestion.id]?.selectedAlternativeId === altId ? null : altId,
        timeSpentSeconds: (prev[currentQuestion.id]?.timeSpentSeconds || 0) + currentQuestionTime,
      }
    }));
  };

  const handleToggleStrikethrough = (altId: string) => {
    setAttempts(prev => {
      const currentStruck = prev[currentQuestion.id]?.isStruckThrough || [];
      const updated = currentStruck.includes(altId)
        ? currentStruck.filter(id => id !== altId)
        : [...currentStruck, altId];

      return {
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          isStruckThrough: updated,
          selectedAlternativeId: prev[currentQuestion.id]?.selectedAlternativeId === altId ? null : prev[currentQuestion.id]?.selectedAlternativeId,
        }
      };
    });
  };

  const handleToggleBookmark = () => {
    setAttempts(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isMarkedForReview: !prev[currentQuestion.id]?.isMarkedForReview,
      }
    }));
  };

  const handleGoToQuestion = (index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentIndex(index);
      setCurrentQuestionTime(0);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Counts for header & map
  const questionIds = activeQuestions.map(q => q.id);
  const answeredCount = Object.values(attempts).filter(a => Boolean(a.selectedAlternativeId)).length;
  const markedCount = Object.values(attempts).filter(a => a.isMarkedForReview).length;
  const blankCount = activeQuestions.length - answeredCount;

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Sticky Header */}
      <ExamHeader
        exam={exam}
        currentQuestionNumber={currentIndex + 1}
        totalQuestions={activeQuestions.length}
        secondsRemaining={secondsRemaining}
        isPaused={isPaused}
        isMarkedForReview={Boolean(currentAttempt.isMarkedForReview)}
        answeredCount={answeredCount}
        markedCount={markedCount}
        blankCount={blankCount}
        onPauseToggle={() => setIsPaused(!isPaused)}
        onBookmarkToggle={handleToggleBookmark}
        onExit={onExit}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full">
        {/* Paused Overlay */}
        {isPaused ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-surface-container-lowest rounded-3xl p-8 border border-surface-container-highest shadow-xl">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
              <Play className="w-8 h-8 fill-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-on-surface">Simulado Pausado</h2>
            <p className="text-sm text-on-surface-variant max-w-md">
              O cronômetro está congelado. Respire fundo, tome uma água e retome quando estiver pronto.
            </p>
            <button
              onClick={() => setIsPaused(false)}
              className="mt-2 px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-container shadow-md"
            >
              Retomar Prova Agora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Question Card & Nav (8 cols) */}
            <div className="lg:col-span-8">
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  selectedAlternativeId={currentAttempt.selectedAlternativeId}
                  struckThroughIds={currentAttempt.isStruckThrough || []}
                  isFirstQuestion={currentIndex === 0}
                  isLastQuestion={currentIndex === activeQuestions.length - 1}
                  onSelectAlternative={handleSelectAlternative}
                  onToggleStrikethrough={handleToggleStrikethrough}
                  onPrev={() => handleGoToQuestion(currentIndex - 1)}
                  onNext={() => handleGoToQuestion(currentIndex + 1)}
                  onFinishPrompt={() => setIsFinishModalOpen(true)}
                  onOpenNotes={() => setIsNotesModalOpen(true)}
                  onOpenReport={() => setIsReportModalOpen(true)}
                />
              )}
            </div>

            {/* Right Column: Question Map & Suggested Pace (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <QuestionMap
                totalQuestions={activeQuestions.length}
                currentIndex={currentIndex}
                attempts={attempts}
                questionIds={questionIds}
                onSelectIndex={handleGoToQuestion}
              />

              <SuggestedPaceCard
                questionTimeSeconds={currentQuestionTime}
                totalSecondsRemaining={secondsRemaining}
                totalQuestions={activeQuestions.length}
                remainingQuestionsCount={blankCount}
                onFinishPrompt={() => setIsFinishModalOpen(true)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Finish Modal */}
      <ConfirmFinishModal
        isOpen={isFinishModalOpen}
        answeredCount={answeredCount}
        totalQuestions={activeQuestions.length}
        blankCount={blankCount}
        markedCount={markedCount}
        elapsedSeconds={elapsedTotalSeconds}
        remainingSeconds={secondsRemaining}
        onCancel={() => setIsFinishModalOpen(false)}
        onConfirm={handleFinishExam}
      />

      {/* Quick Notes Modal */}
      {currentQuestion && (
        <QuickNotesModal
          isOpen={isNotesModalOpen}
          questionId={currentQuestion.id}
          examId={exam.id}
          questionNumber={currentQuestion.number}
          onClose={() => setIsNotesModalOpen(false)}
        />
      )}

      {/* Report Question Modal */}
      {currentQuestion && (
        <ReportQuestionModal
          isOpen={isReportModalOpen}
          questionNumber={currentQuestion.number}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </div>
  );
}
