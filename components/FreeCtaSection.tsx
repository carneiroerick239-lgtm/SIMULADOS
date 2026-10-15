'use client';

import React from 'react';
import { ShieldCheck, Play, Sparkles } from 'lucide-react';

interface FreeCtaSectionProps {
  onStart: () => void;
}

export function FreeCtaSection({ onStart }: FreeCtaSectionProps) {
  return (
    <section className="w-full bg-gradient-to-b from-surface-container-low to-surface-container py-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary via-primary-container to-secondary p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
        {/* Decorative background blurs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 shadow-sm border border-white/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-2xl tracking-tight mb-4 text-white">
            Comece a praticar hoje mesmo, 100% gratuito
          </h2>

          <p className="text-base sm:text-lg text-primary-fixed max-w-xl mb-8 font-normal leading-relaxed">
            Sem cadastro, sem formulários e sem planos pagos. Escolha qualquer simulado e comece a treinar agora mesmo com correção comentada.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-surface-container-lowest text-primary font-bold text-base shadow-xl hover:bg-surface hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-primary text-primary" />
              <span>Iniciar Primeiro Simulado Agora</span>
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 mt-6 text-primary-fixed text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-secondary-fixed shrink-0" />
            <span>Sem necessidade de cartão de crédito • Acesso livre e irrestrito</span>
          </div>
        </div>
      </div>
    </section>
  );
}
