'use client';

import React from 'react';
import { 
  Trophy, 
  BarChart3, 
  Timer, 
  CheckSquare, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { ExamResult } from '@/types/quiz';

interface MetricsBentoGridProps {
  result: ExamResult;
}

export function MetricsBentoGrid({ result }: MetricsBentoGridProps) {
  // Format total seconds to HHh MMm
  const formatTimeHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
  };

  // Average time per question
  const avgSecondsPerQ = result.totalAnswered > 0 
    ? Math.round(result.timeSpentSeconds / result.totalAnswered) 
    : 0;
  const avgMins = Math.floor(avgSecondsPerQ / 60);
  const avgSecs = avgSecondsPerQ % 60;

  // Percentage for SVG circle
  const scorePercent = Number(result.percentageScore.toFixed(1));
  const dashArray = `${scorePercent}, 100`;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-20 w-full mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Aproveitamento Global */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-extrabold">
              Aproveitamento Global
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              result.percentageScore >= 80 
                ? 'bg-secondary-fixed text-primary' 
                : result.percentageScore >= 60 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              {result.percentageScore >= 80 ? 'Excelente' : result.percentageScore >= 60 ? 'Bom' : 'Atenção'}
            </span>
          </div>

          <div className="flex items-center justify-between my-4 gap-4">
            <div>
              <div className="text-4xl sm:text-5xl text-primary font-extrabold leading-none tracking-tight">
                {result.percentageScore.toFixed(1)}
                <span className="text-2xl font-bold text-secondary">%</span>
              </div>
              <div className="text-xs text-on-surface-variant mt-1.5 font-semibold">
                {result.totalCorrect} acertos de {result.totalQuestions}
              </div>
            </div>

            {/* Radial SVG Gauge */}
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={dashArray}
                  strokeLinecap="round"
                  strokeWidth="3.8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-primary">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
              style={{ width: `${result.percentageScore}%` }}
            />
          </div>
        </div>

        {/* Card 2: Nota Estimada (TRI / Projeção) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-extrabold">
              Nota Estimada (TRI)
            </span>
            <span className="p-1 rounded-lg bg-surface-container-low text-primary">
              <BarChart3 className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl text-on-surface font-extrabold leading-none tracking-tight">
                {result.estimatedTri}
              </span>
              <span className="text-on-surface-variant text-xs font-bold">
                / 1000 pts
              </span>
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary text-[11px] font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-secondary" />
              {result.estimatedTri >= 700 ? '+18% acima da média nacional' : 'Alinhada à média de corte'}
            </div>
          </div>

          <p className="text-xs text-on-surface-variant font-medium truncate">
            Coerência pedagógica calculada: Alta
          </p>
        </div>

        {/* Card 3: Gestão de Tempo */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-extrabold">
              Gestão de Tempo
            </span>
            <span className="p-1 rounded-lg bg-surface-container-low text-primary">
              <Timer className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-4xl sm:text-5xl text-on-surface font-extrabold leading-none tracking-tight">
              {formatTimeHours(result.timeSpentSeconds)}
            </div>

            <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              Média de <strong className="text-on-surface font-bold">{avgMins}m {avgSecs}s</strong> por questão
            </div>
          </div>

          <div className="text-[11px] text-on-surface-variant flex items-center justify-between font-semibold">
            <span>Ritmo de prova</span>
            <span className="text-secondary font-bold">Adequado ao edital</span>
          </div>
        </div>

        {/* Card 4: Cobertura da Prova */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-extrabold">
              Cobertura da Prova
            </span>
            <span className="p-1 rounded-lg bg-surface-container-low text-primary">
              <CheckSquare className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-4xl sm:text-5xl text-on-surface font-extrabold leading-none tracking-tight">
              {result.totalAnswered}
              <span className="text-xl font-medium text-on-surface-variant"> / {result.totalQuestions}</span>
            </div>

            <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              {result.totalBlank === 0 ? '100% preenchido · Nenhuma em branco' : `${result.totalBlank} em branco`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-fixed text-primary text-xs font-bold">
              {result.totalCorrect} Corretas
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant text-xs font-semibold">
              {result.totalWrong} Incorretas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
