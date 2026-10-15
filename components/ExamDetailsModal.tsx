'use client';

import React from 'react';
import { 
  X, 
  Play, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  AlertCircle, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { Exam } from '@/types/quiz';

interface ExamDetailsModalProps {
  exam: Exam | null;
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (examId: string) => void;
}

export function ExamDetailsModal({
  exam,
  isOpen,
  onClose,
  onStartExam,
}: ExamDetailsModalProps) {
  if (!isOpen || !exam) return null;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutos`;
    if (mins === 0) return `${hours} horas`;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-2xl w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto border border-surface-container-highest">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-surface-container-high/60">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-secondary-fixed text-primary text-xs font-bold uppercase tracking-wider">
                {exam.categoryLabel}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold">
                Ano {exam.year} • {exam.institution}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
              {exam.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {exam.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center">
            <HelpCircle className="w-5 h-5 text-primary mb-1" />
            <span className="text-lg font-extrabold text-on-surface">{exam.questionsCount}</span>
            <span className="text-[11px] text-on-surface-variant font-medium">Questões Reais</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center">
            <Clock className="w-5 h-5 text-secondary mb-1" />
            <span className="text-lg font-extrabold text-on-surface">{formatDuration(exam.durationMinutes)}</span>
            <span className="text-[11px] text-on-surface-variant font-medium">Duração Sugerida</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center">
            <BookOpen className="w-5 h-5 text-primary-container mb-1" />
            <span className="text-lg font-extrabold text-on-surface">{exam.disciplines.length}</span>
            <span className="text-[11px] text-on-surface-variant font-medium">Disciplinas</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-lg font-extrabold text-on-surface">{exam.difficulty}</span>
            <span className="text-[11px] text-on-surface-variant font-medium">Dificuldade</span>
          </div>
        </div>

        {/* Disciplines Chips */}
        <div>
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
            Disciplinas e Eixos Avaliados:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {exam.disciplines.map((d, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-surface-container text-xs text-on-surface font-semibold">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Exam Description */}
        <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-surface-container-high/40 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          <p>{exam.description}</p>
        </div>

        {/* Test Rules & Instructions */}
        <div className="space-y-2 text-xs text-on-surface-variant">
          <span className="font-bold text-on-surface uppercase tracking-wider block">
            Instruções para a Prova:
          </span>
          <ul className="list-disc pl-5 space-y-1">
            <li>As questões são apresentadas uma por vez, com navegação livre pelo Mapa da Prova.</li>
            <li>Você pode riscar alternativas descartadas para facilitar sua decisão.</li>
            <li>O cronômetro simula o tempo oficial, mas você pode pausar a qualquer momento se precisar.</li>
            <li>Marque questões para revisar mais tarde caso queira retornar antes de entregar.</li>
            <li>Ao finalizar, você receberá pontuação detalhada, cálculo TRI e resolução comentada de cada questão.</li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-container-high/60">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>100% Gratuito • Sem necessidade de cadastro</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={() => {
                onClose();
                onStartExam(exam.id);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-container active:scale-95 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Simulado Agora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
