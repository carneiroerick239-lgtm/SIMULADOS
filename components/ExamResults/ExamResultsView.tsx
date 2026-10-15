'use client';

import React from 'react';
import { Exam, ExamResult } from '@/types/quiz';
import { ResultsHeader } from './ResultsHeader';
import { MetricsBentoGrid } from './MetricsBentoGrid';
import { DisciplinePerformance } from './DisciplinePerformance';
import { IntelligentDiagnosis } from './IntelligentDiagnosis';
import { AnswerKeyReview } from './AnswerKeyReview';

interface ExamResultsViewProps {
  exam: Exam;
  result: ExamResult;
  onRedoErrors: () => void;
  onRedoFull: () => void;
  onBackToCatalog: () => void;
}

export function ExamResultsView({
  exam,
  result,
  onRedoErrors,
  onRedoFull,
  onBackToCatalog,
}: ExamResultsViewProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Top Banner & Header */}
      <ResultsHeader
        result={result}
        onRedoFull={onRedoFull}
        onBackToCatalog={onBackToCatalog}
      />

      {/* Primary Key Metrics Bento Grid */}
      <MetricsBentoGrid result={result} />

      {/* Detailed Analysis Section (Discipline + Diagnosis) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DisciplinePerformance result={result} />
          </div>
          <div className="lg:col-span-5">
            <IntelligentDiagnosis
              result={result}
              onQuickQuiz={onRedoErrors}
            />
          </div>
        </div>
      </section>

      {/* Answer Key Review with Detailed Teacher Commentary */}
      <AnswerKeyReview
        exam={exam}
        result={result}
        onRedoErrors={onRedoErrors}
        onRedoFull={onRedoFull}
      />
    </div>
  );
}
