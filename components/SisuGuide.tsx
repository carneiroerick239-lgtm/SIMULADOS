'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Calculator, 
  ExternalLink, 
  CheckCircle2, 
  Info, 
  Play,
  Award
} from 'lucide-react';

interface SisuGuideProps {
  onStartEnemExam: () => void;
}

export function SisuGuide({ onStartEnemExam }: SisuGuideProps) {
  // Interactive Weighted Average Calculator
  const [weights, setWeights] = useState({
    redacao: 2,
    matematica: 3,
    natureza: 3,
    humanas: 1,
    linguagens: 1,
  });

  const [scores, setScores] = useState({
    redacao: 880,
    matematica: 760,
    natureza: 720,
    humanas: 780,
    linguagens: 690,
  });

  const calculateWeightedAverage = () => {
    const totalWeights = weights.redacao + weights.matematica + weights.natureza + weights.humanas + weights.linguagens;
    if (totalWeights === 0) return 0;
    const weightedSum = 
      (scores.redacao * weights.redacao) +
      (scores.matematica * weights.matematica) +
      (scores.natureza * weights.natureza) +
      (scores.humanas * weights.humanas) +
      (scores.linguagens * weights.linguagens);
    return Math.round(weightedSum / totalWeights);
  };

  const weightedAverage = calculateWeightedAverage();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col gap-10">
      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary via-primary-container to-secondary text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-secondary-fixed text-xs font-bold uppercase tracking-wider w-fit border border-white/10">
            <Sparkles className="w-4 h-4" />
            Guia Informativo & Orientação Oficial
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preparação para o SiSU, ProUni e FIES
          </h1>

          <p className="text-sm sm:text-base text-primary-fixed leading-relaxed">
            Entenda com clareza como funciona a seleção unificada do Ministério da Educação (MEC), como os pesos de cada curso influenciam sua nota de corte e como treinar com os simulados do ENEM.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onStartEnemExam}
              className="px-6 py-3 rounded-xl bg-surface-container-lowest text-primary font-bold text-xs sm:text-sm hover:bg-surface active:scale-95 transition-all flex items-center gap-2 shadow-md"
            >
              <Play className="w-4 h-4 fill-primary" />
              <span>Fazer Simulado do ENEM Agora</span>
            </button>
            <a
              href="https://acessounico.mec.gov.br/sisu"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span>Portal Oficial do SiSU (MEC)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Critical Clarification: O QUE É O SISU? */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              Importante: O SiSU não é uma prova independente!
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Compreenda a diferença fundamental entre a avaliação e o sistema de seleção
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3 pt-2">
          <p>
            O <strong>SiSU (Sistema de Seleção Unificada)</strong> é uma plataforma digital mantida pelo Ministério da Educação (MEC) que reúne vagas em universidades públicas federais e estaduais (como UFRJ, UFMG, UFC, USP, etc.) para candidatos que realizaram o Exame Nacional do Ensino Médio (ENEM).
          </p>
          <p>
            Portanto, <strong>não existe uma &quot;prova do SiSU&quot;</strong>. Para concorrer às vagas, a prova realizada é o <strong>ENEM oficial</strong>. Cada universidade e cada curso (Medicina, Direito, Engenharia, Pedagogia, etc.) possui autonomia para atribuir pesos diferentes às 5 notas do ENEM:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 font-semibold text-xs">
            <span className="p-2.5 rounded-xl bg-surface-container text-center text-on-surface">1. Redação</span>
            <span className="p-2.5 rounded-xl bg-surface-container text-center text-on-surface">2. Matemática</span>
            <span className="p-2.5 rounded-xl bg-surface-container text-center text-on-surface">3. Ciências da Natureza</span>
            <span className="p-2.5 rounded-xl bg-surface-container text-center text-on-surface">4. Ciências Humanas</span>
            <span className="p-2.5 rounded-xl bg-surface-container text-center text-on-surface">5. Linguagens e Códigos</span>
          </div>
        </div>
      </div>

      {/* Interactive Weighted Score Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high/60">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-secondary" />
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">
                Simulador Didático de Média Ponderada
              </h2>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Ajuste as notas estimadas e os pesos exigidos pelo edital do seu curso-alvo
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-secondary-fixed text-primary flex items-baseline gap-2 self-start sm:self-auto shadow-sm">
            <span className="text-xs font-bold uppercase">Sua Média Estimada:</span>
            <span className="text-2xl sm:text-3xl font-extrabold">{weightedAverage} pts</span>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Redação */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">Redação</span>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Nota estimada:</label>
              <input
                type="number"
                min="0"
                max="1000"
                step="10"
                value={scores.redacao}
                onChange={(e) => setScores({ ...scores, redacao: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Peso do curso (1 a 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={weights.redacao}
                onChange={(e) => setWeights({ ...weights, redacao: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold"
              />
            </div>
          </div>

          {/* Matemática */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">Matemática</span>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Nota estimada:</label>
              <input
                type="number"
                min="0"
                max="1000"
                step="10"
                value={scores.matematica}
                onChange={(e) => setScores({ ...scores, matematica: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Peso do curso (1 a 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={weights.matematica}
                onChange={(e) => setWeights({ ...weights, matematica: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold"
              />
            </div>
          </div>

          {/* Natureza */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">Ciências da Natureza</span>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Nota estimada:</label>
              <input
                type="number"
                min="0"
                max="1000"
                step="10"
                value={scores.natureza}
                onChange={(e) => setScores({ ...scores, natureza: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Peso do curso (1 a 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={weights.natureza}
                onChange={(e) => setWeights({ ...weights, natureza: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold"
              />
            </div>
          </div>

          {/* Humanas */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">Ciências Humanas</span>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Nota estimada:</label>
              <input
                type="number"
                min="0"
                max="1000"
                step="10"
                value={scores.humanas}
                onChange={(e) => setScores({ ...scores, humanas: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Peso do curso (1 a 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={weights.humanas}
                onChange={(e) => setWeights({ ...weights, humanas: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold"
              />
            </div>
          </div>

          {/* Linguagens */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">Linguagens & Códigos</span>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Nota estimada:</label>
              <input
                type="number"
                min="0"
                max="1000"
                step="10"
                value={scores.linguagens}
                onChange={(e) => setScores({ ...scores, linguagens: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-on-surface-variant block mb-0.5">Peso do curso (1 a 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={weights.linguagens}
                onChange={(e) => setWeights({ ...weights, linguagens: Number(e.target.value) })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-lowest border text-xs font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: SiSU vs ProUni vs FIES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SiSU */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary-fixed text-primary">
                Públicas
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">SiSU</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Vagas em universidades públicas gratuitas (federais, estaduais e institutos federais). Não há mensalidade nem critério de renda familiar máxima, embora haja reserva de vagas por cotas sociais e raciais (Lei nº 12.711/2012).
            </p>
          </div>
          <a
            href="https://acessounico.mec.gov.br/sisu"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1"
          >
            <span>Ver regras oficiais do SiSU</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ProUni */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-fixed text-primary">
                Bolsas Privadas
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">ProUni</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Programa Universidade para Todos: concede bolsas integrais (100%) e parciais (50%) em instituições particulares de ensino superior. Exige cumprimento de limites específicos de renda familiar per capita (até 1,5 ou 3 salários mínimos).
            </p>
          </div>
          <a
            href="https://acessounico.mec.gov.br/prouni"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1"
          >
            <span>Ver regras oficiais do ProUni</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* FIES */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container-high text-on-surface">
                Financiamento
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">FIES</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Fundo de Financiamento Estudantil: financia o valor do curso em faculdades privadas a juros subsidiados ou zero para pagamento após a formatura. Possui critérios próprios de renda e nota de corte no ENEM.
            </p>
          </div>
          <a
            href="https://acessounico.mec.gov.br/fies"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1"
          >
            <span>Ver regras oficiais do FIES</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
