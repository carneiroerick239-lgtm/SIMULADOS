'use client';

import React from 'react';
import { CheckCircle2, Calendar, Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { ExamResult } from '@/types/quiz';

interface ResultsHeaderProps {
  result: ExamResult;
  onRedoFull: () => void;
  onBackToCatalog: () => void;
}

export function ResultsHeader({ result, onRedoFull, onBackToCatalog }: ResultsHeaderProps) {
  const handlePrintPdf = () => {
    window.print();
  };

  const formattedDate = new Date(result.completedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-low py-10 lg:py-14 border-b border-surface-container-highest/60">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-primary-container/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs uppercase tracking-wider font-extrabold shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                Simulado Concluído com Sucesso
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5" /> Realizado em {formattedDate}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-extrabold tracking-tight">
              {result.examTitle}
            </h1>

            {/* Subtitle / Feedback */}
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {result.percentageScore >= 80 ? (
                'Excelente ritmo de prova! Seu resultado projeta uma pontuação altamente competitiva para os cursos mais concorridos do SiSU e vestibulares.'
              ) : result.percentageScore >= 60 ? (
                'Bom desempenho geral! Revise as questões comentadas abaixo para identificar e reforçar lacunas pontuais de conteúdo.'
              ) : (
                'Etapa importante de treino concluída. O aprendizado mais duradouro vem da análise atenta de cada erro no gabarito comentado.'
              )}
            </p>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto print:hidden">
            <button
              onClick={onBackToCatalog}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container text-on-surface text-xs font-bold rounded-xl hover:bg-surface-container-high transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Outros Simulados</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface text-xs font-bold rounded-xl shadow-sm hover:bg-surface-container hover:shadow transition-all border border-surface-container-highest"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Relatório em PDF</span>
            </button>

            <button
              onClick={onRedoFull}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refazer Simulado</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
