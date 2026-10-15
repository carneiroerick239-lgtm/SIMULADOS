'use client';

import React from 'react';
import { Layers, Zap, MessageSquareText, LineChart } from 'lucide-react';

export function MethodologySection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
            Metodologia Comprovada
          </span>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface leading-tight mb-6">
            Tudo o que você precisa para acelerar seu aprendizado.
          </h2>
          
          <p className="text-base text-on-surface-variant mb-8 leading-relaxed">
            A plataforma Quiz&apos;s une inteligência analítica e rigor pedagógico para que você identifique seus pontos fracos e treine a gestão do tempo antes do dia oficial da prova.
          </p>

          {/* Dynamic Visual Metric Widget */}
          <div className="p-6 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container-highest/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface">Evolução Média por Simulado</span>
              <span className="text-xs font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
                +28% de assertividade
              </span>
            </div>

            {/* Sparkline SVG */}
            <svg className="w-full h-16 text-secondary overflow-visible" fill="none" viewBox="0 0 400 70">
              <path
                d="M 0 55 C 60 50, 100 45, 150 35 C 200 25, 250 30, 300 15 C 350 8, 380 5, 400 2"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="400" cy="2" r="6" fill="#8F123B" stroke="#ffffff" strokeWidth="2" />
            </svg>

            <div className="flex justify-between text-on-surface-variant text-xs font-medium pt-1">
              <span>1º Simulado</span>
              <span>3º Simulado</span>
              <span>5º Simulado</span>
              <span className="font-bold text-primary">Aprovação</span>
            </div>
          </div>
        </div>

        {/* Right Bento Grid of Features */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 text-primary flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Matérias e Assuntos</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Questões catalogadas por microtópicos detalhados para você focar no que realmente precisa treinar e revisar.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 text-primary-container flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Correção Instantânea</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Descubra sua pontuação exata e taxa de acerto no momento da finalização com cálculo automático e seguro.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-4">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Gabarito Comentado</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Resoluções comentadas passo a passo com justificativa das alternativas corretas e incorretas.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Histórico & Métricas</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Estatísticas intuitivas com tempo por questão, distribuição por disciplina e histórico salvo no navegador.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
