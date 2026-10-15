'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BarChart2, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Highlighter, 
  FileEdit, 
  AlertCircle, 
  Strikethrough,
  Check,
  Send
} from 'lucide-react';
import { Question } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAlternativeId: string | null;
  struckThroughIds: string[];
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onSelectAlternative: (id: string) => void;
  onToggleStrikethrough: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinishPrompt: () => void;
  onOpenNotes: () => void;
  onOpenReport: () => void;
}

export function QuestionCard({
  question,
  selectedAlternativeId,
  struckThroughIds,
  isFirstQuestion,
  isLastQuestion,
  onSelectAlternative,
  onToggleStrikethrough,
  onPrev,
  onNext,
  onFinishPrompt,
  onOpenNotes,
  onOpenReport,
}: QuestionCardProps) {
  const [highlightEnabled, setHighlightEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Question Card Box */}
      <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-2xl shadow-md border border-surface-container-highest/60 flex flex-col gap-6">
        {/* Header Tags & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-container-high/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-extrabold tracking-wide">
              QUESTÃO {String(question.number).padStart(2, '0')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
              {question.subject}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
              {question.source}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-bold">
            <BarChart2 className="w-3.5 h-3.5 text-secondary" />
            <span>Dificuldade: {question.difficulty}</span>
          </div>
        </div>

        {/* Question Statement & Context */}
        <div className="flex flex-col gap-4 text-base sm:text-lg text-on-surface leading-relaxed">
          {/* Optional Context Quote */}
          {question.contextQuote && (
            <div className={`transition-colors rounded-xl p-4 ${
              highlightEnabled ? 'bg-amber-100/70 border-l-4 border-amber-400' : 'bg-surface-container-low/60 border-l-4 border-secondary-fixed'
            }`}>
              <p className="text-on-surface-variant text-sm sm:text-base italic pl-2 leading-relaxed">
                {question.contextQuote}
              </p>
              {question.quoteAuthor && (
                <span className="block text-on-surface-variant text-xs mt-2 pl-2 font-medium">
                  {question.quoteAuthor}
                </span>
              )}
            </div>
          )}

          {/* Optional Image / Cartographic Document */}
          {question.imageUrl && (
            <div className="my-2 p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-56 h-36 rounded-lg bg-surface-container overflow-hidden shrink-0 shadow-sm">
                <Image
                  src={question.imageUrl}
                  alt={question.imageAlt || 'Iconografia da questão'}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-extrabold text-on-surface uppercase tracking-wider text-primary">
                  Documento Cartográfico / Iconografia
                </span>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {question.imageCaption || 'Analise a imagem documental acima para responder à proposição a seguir:'}
                </p>
              </div>
            </div>
          )}

          {/* Main Question Prompt */}
          <p className={`font-bold text-base sm:text-xl text-on-surface pt-1 leading-snug rounded-lg transition-colors ${
            highlightEnabled ? 'bg-amber-100/50 p-2' : ''
          }`}>
            {question.prompt}
          </p>
        </div>

        {/* Alternatives Group (A, B, C, D, E) */}
        <div className="flex flex-col gap-3 pt-2" id="alternatives-group">
          {question.alternatives.map((alt) => {
            const isSelected = selectedAlternativeId === alt.id;
            const isStruck = struckThroughIds.includes(alt.id);

            return (
              <div
                key={alt.id}
                onClick={() => {
                  if (!isStruck) {
                    onSelectAlternative(alt.id);
                  }
                }}
                className={`group relative flex items-start justify-between gap-4 p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-secondary-fixed/40 border-secondary shadow-md ring-1 ring-secondary'
                    : isStruck
                    ? 'bg-surface-container-low/40 border-dashed border-outline-variant opacity-50'
                    : 'bg-surface-container-lowest border-surface-container-highest hover:bg-surface-container-low hover:border-surface-container-high shadow-sm'
                }`}
              >
                {/* Left: Circle badge + Text */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : isStruck
                        ? 'bg-surface-container text-on-surface-variant line-through'
                        : 'bg-surface-container-high text-on-surface group-hover:bg-primary-fixed group-hover:text-primary'
                    }`}
                  >
                    {alt.id}
                  </div>

                  <div className={`flex-1 text-sm sm:text-base leading-normal pt-1 select-none ${
                    isSelected ? 'font-bold text-on-surface text-primary-container' : 'text-on-surface'
                  } ${isStruck ? 'line-through text-on-surface-variant' : ''}`}>
                    {alt.text}
                  </div>
                </div>

                {/* Right controls: check status or strikethrough toggle */}
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  {isSelected && (
                    <div className="flex items-center gap-1 text-primary">
                      <CheckCircle className="w-5 h-5 fill-primary text-white" />
                    </div>
                  )}

                  {/* Strikethrough button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStrikethrough(alt.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isStruck
                        ? 'bg-secondary-fixed text-primary'
                        : 'text-on-surface-variant/40 hover:text-on-surface-variant hover:bg-surface-container'
                    }`}
                    title={isStruck ? 'Desmarcar eliminação' : 'Riscar alternativa que você descartou'}
                  >
                    <Strikethrough className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Auxiliary Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-container-high/40 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHighlightEnabled(!highlightEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                highlightEnabled
                  ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-300'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>{highlightEnabled ? 'Desativar Marcador' : 'Marcador de texto'}</span>
            </button>

            <button
              onClick={onOpenNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors font-bold"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Anotações rápidas</span>
            </button>
          </div>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-red-600 transition-colors font-medium text-[11px]"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Reportar questão</span>
          </button>
        </div>
      </div>

      {/* Navigation Footer (Previous / Next / Finish) */}
      <div className="flex items-center justify-between gap-4 py-2">
        <button
          onClick={onPrev}
          disabled={isFirstQuestion}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
            isFirstQuestion
              ? 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed shadow-none'
              : 'bg-surface-container-lowest text-primary hover:bg-surface-container border border-surface-container-highest'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Questão anterior</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-on-surface-variant hidden sm:inline font-medium">
            Resposta salva automaticamente no navegador
          </span>

          {isLastQuestion ? (
            <button
              onClick={onFinishPrompt}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:brightness-110 active:scale-95 shadow-md transition-all"
            >
              <span>Revisar & Finalizar</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-container active:scale-95 shadow-md transition-all"
            >
              <span>Próxima questão</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
