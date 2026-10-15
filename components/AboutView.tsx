'use client';

import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Heart 
} from 'lucide-react';

export function AboutView() {
  const officialSources = [
    {
      name: 'INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira)',
      desc: 'Responsável oficial pela realização do ENEM, ENADE, SAEB e Revalida.',
      url: 'https://www.gov.br/inep/pt-br',
    },
    {
      name: 'MEC - Ministério da Educação (SiSU, ProUni e FIES)',
      desc: 'Gestor dos programas oficiais de ingresso no ensino superior e financiamento estudantil.',
      url: 'https://www.gov.br/mec/pt-br',
    },
    {
      name: 'OBMEP - Olimpíada Brasileira de Matemática das Escolas Públicas',
      desc: 'Realizada pelo IMPA e pela Sociedade Brasileira de Matemática (SBM).',
      url: 'http://www.obmep.org.br',
    },
    {
      name: 'FUVEST - Fundação Universitária para o Vestibular',
      desc: 'Processo seletivo oficial para ingresso na Universidade de São Paulo (USP).',
      url: 'https://www.fuvest.br',
    },
    {
      name: 'COMVEST - Vestibular UNICAMP',
      desc: 'Comissão permanente para os vestibulares da Universidade Estadual de Campinas.',
      url: 'https://www.comvest.unicamp.br',
    },
    {
      name: 'VUNESP - Fundação para o Vestibular da UNESP',
      desc: 'Organizadora dos vestibulares da UNESP, Famema, Fatec e concursos públicos paulistas.',
      url: 'https://www.vunesp.com.br',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col gap-10">
      {/* Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <Sparkles className="w-4 h-4" />
          Manifesto Pedagógico
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          Sobre o Quiz&apos;s
        </h1>

        <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
          O <strong>Quiz&apos;s</strong> nasceu com uma missão inegociável: democratizar o acesso à preparação de alto nível para avaliações educacionais brasileiras, olimpíadas acadêmicas, vestibulares e concursos públicos.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center font-extrabold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-on-surface">100% Livre e Sem Cadastro</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Acreditamos que o direito de estudar não deve ser condicionado à criação de contas, senhas ou cobranças disfarçadas. Qualquer estudante pode entrar no site e começar um simulado imediatamente.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-extrabold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-on-surface">Simulados Completos (20+ Questões)</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Não oferecemos demonstrações superficiais. Cada simulado publicado possui pelo menos 20 questões completas, distintas e respondíveis, com tempo autêntico e resolução detalhada.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-extrabold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-on-surface">Autenticidade e Rigor</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Identificamos claramente a procedência de cada item: quando oficiais, registramos ano, órgão e edição; quando autorais, destacamos que são inspiradas no estilo e nas matrizes das bancas.
          </p>
        </div>
      </div>

      {/* Official Sources Links */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-on-surface">
          Portais e Regulamentos Oficiais de Referência
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Recomendamos sempre a consulta aos editais, calendários e normas vigentes diretamente nos portais governamentais e das bancas organizadoras:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {officialSources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 hover:border-primary/40 hover:bg-surface-container transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    {source.name}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {source.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
