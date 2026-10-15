'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  BookOpen, 
  Sparkles,
  Info
} from 'lucide-react';
import { Exam, ExamCategory } from '@/types/quiz';

interface FeaturedExamsProps {
  exams: Exam[];
  onStartExam: (examId: string) => void;
  onViewDetails: (exam: Exam) => void;
}

export function FeaturedExams({ exams, onStartExam, onViewDetails }: FeaturedExamsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');

  const filterTabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'enem', label: 'ENEM' },
    { id: 'vestibulares', label: 'Vestibulares' },
    { id: 'concursos', label: 'Concursos' },
    { id: 'olimpiadas', label: 'Olimpíadas' },
    { id: 'educacao_basica', label: 'Educação Básica' },
  ];

  const filteredExams = exams.filter((exam) => {
    if (selectedFilter === 'todos') return true;
    return exam.category === selectedFilter;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Média':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Difícil':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h 00m`;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className="w-full bg-surface-container-low py-20 px-6 lg:px-12" id="simulados">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Treinamento Intensivo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface mt-1">
              Simulados em Destaque
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xl">
              Provas configuradas com temporizador autêntico, correção automática e gabaritos auditados com resoluções comentadas.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-surface-container p-1 rounded-xl">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between shadow-[0px_2px_8px_-2px_rgba(31,41,55,0.04),0px_6px_16px_-4px_rgba(31,41,55,0.06)] hover:shadow-xl transition-all border border-surface-container-highest/60 group"
            >
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs font-bold truncate max-w-[170px]">
                    {exam.categoryLabel}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDifficultyBadge(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {exam.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                  {exam.description}
                </p>
              </div>

              <div>
                {/* Metadata Pill */}
                <div className="flex items-center justify-between py-2.5 my-2 bg-surface-container-low px-4 rounded-xl text-on-surface-variant text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>{exam.questionsCount} Questões</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{formatDuration(exam.durationMinutes)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => onViewDetails(exam)}
                    className="py-2.5 px-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Instruções</span>
                  </button>

                  <button
                    onClick={() => onStartExam(exam.id)}
                    className="py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Iniciar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
