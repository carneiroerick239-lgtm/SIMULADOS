'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Play
} from 'lucide-react';

interface HeroSectionProps {
  onStartExam: (examId: string) => void;
  onExplore: (category?: string, query?: string) => void;
}

export function HeroSection({ onStartExam, onExplore }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExplore('todos', searchQuery.trim());
    }
  };

  const trendingTags = [
    { label: 'ENEM 2024', query: 'ENEM' },
    { label: 'FUVEST USP', query: 'FUVEST' },
    { label: 'Concurso Público', query: 'Concurso' },
    { label: 'OBMEP Matemática', query: 'OBMEP' },
    { label: 'Provão Paulista', query: 'Provão Paulista' },
    { label: 'Geografia & História', query: 'Humanas' },
  ];

  return (
    <>
      {/* HERO SECTION WITH INTEGRATED GRADIENT & IMMERSIVE DEPTH */}
      <section className="relative w-full bg-gradient-to-br from-primary via-primary-container to-secondary text-white overflow-hidden pb-24 pt-12 lg:pt-16 px-6 lg:px-12">
        {/* Ambient organic light blurs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[480px] h-[480px] rounded-full bg-primary/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Overline Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-secondary-fixed mb-6 shadow-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-secondary-fixed" />
            <span className="text-xs font-bold uppercase tracking-wider">
              A plataforma definitiva para aprovação · 100% Gratuita e Sem Login
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold max-w-4xl tracking-tight leading-tight text-white mb-6">
            Seu futuro começa com uma resposta.
          </h1>

          {/* Descriptive Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-primary-fixed max-w-3xl mb-10 leading-relaxed font-normal">
            Pratique, aprenda e conquiste seus objetivos com simulados gratuitos para todas as etapas da sua jornada: ENEM, vestibulares, olimpíadas acadêmicas e concursos públicos.
          </p>

          {/* CTA Button Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={() => onStartExam('enem-humanas-2024')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-surface-container-lowest text-primary font-bold text-base sm:text-lg shadow-xl hover:bg-surface hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-5 h-5 fill-primary text-primary" />
              <span>Começar a estudar</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onExplore('todos')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold text-base sm:text-lg hover:bg-white/20 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explorar simulados</span>
            </button>
          </div>

          {/* Real-time Proof Numbers (Transparent, pedagogically sound) */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center justify-center p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                105+
              </span>
              <span className="text-sm font-semibold text-primary-fixed mt-1">
                Questões completas auditadas
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 border-y md:border-y-0 md:border-x border-white/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                100%
              </span>
              <span className="text-sm font-semibold text-primary-fixed mt-1">
                Gabaritos com resolução didática
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                0
              </span>
              <span className="text-sm font-semibold text-primary-fixed mt-1">
                Barreiras ou exigência de login
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH OVERLAY / FLOATING COMPONENT */}
      <section className="relative max-w-5xl mx-auto w-full px-6 -mt-10 z-20">
        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0px_20px_32px_-8px_rgba(31,41,55,0.12),0px_8px_16px_-4px_rgba(31,41,55,0.04)] border border-surface-container-highest/60">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-4 text-on-surface-variant text-2xl w-6 h-6 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busque por prova, matéria (ex: Biologia, Geografia, Direito), ENEM ou instituição..."
              className="w-full h-14 pl-14 pr-28 sm:pr-32 bg-surface-container-low rounded-xl text-base text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-container transition-colors hidden sm:flex items-center gap-1.5 shadow-sm"
            >
              <span>Buscar</span>
            </button>
          </form>

          {/* Quick Search Trending Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-surface-container-high/40">
            <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-secondary" /> Em alta:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setSearchQuery(tag.query);
                  onExplore('todos', tag.query);
                }}
                className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-secondary-fixed hover:text-primary transition-all"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
