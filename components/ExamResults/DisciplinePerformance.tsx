'use client';

import React from 'react';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { ExamResult } from '@/types/quiz';

interface DisciplinePerformanceProps {
  result: ExamResult;
}

export function DisciplinePerformance({ result }: DisciplinePerformanceProps) {
  const entries = Object.entries(result.disciplineBreakdown);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Desempenho por Disciplina
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Acurácia dividida pelos eixos temáticos deste caderno
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-surface-container text-on-surface-variant rounded-full">
          {entries.length} Áreas
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {entries.map(([discipline, data]) => {
          return (
            <div
              key={discipline}
              className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-on-surface">
                      {discipline}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-medium">
                      Eixo estruturante avaliado
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base sm:text-lg font-extrabold text-primary">
                    {data.percentage}%
                  </span>
                  <p className="text-[11px] text-on-surface-variant font-semibold">
                    {data.correct}/{data.total} acertos
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-700"
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
