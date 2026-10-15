'use client';

import React from 'react';
import { 
  School, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  ArrowRight 
} from 'lucide-react';
import { ExamCategory } from '@/types/quiz';

interface CategorySectionProps {
  onSelectCategory: (category: ExamCategory) => void;
}

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  const categories = [
    {
      id: 'educacao_basica' as ExamCategory,
      title: 'Ensino Fundamental & Básico',
      count: 'SARESP, SAEB & Bases',
      description: 'Bases sólidas em matemática, língua portuguesa e ciências para consolidar a aprendizagem.',
      icon: School,
      bgIcon: 'bg-secondary-fixed/50 text-primary',
      badge: 'Bases Essenciais',
    },
    {
      id: 'educacao_basica' as ExamCategory,
      title: 'Provão Paulista & Ensino Médio',
      count: 'Currículo Regular & Seriado',
      description: 'Aprofundamento curricular para 1º, 2º e 3º ano com foco em acesso direto a USP, Unicamp e Unesp.',
      icon: BookOpen,
      bgIcon: 'bg-primary-fixed/40 text-primary-container',
      badge: 'Acesso Universitário',
    },
    {
      id: 'enem' as ExamCategory,
      title: 'ENEM',
      count: 'Matriz MEC & TRI Estimada',
      description: 'Simulados completos por cadernos: Humanas, Linguagens, Matemática e Ciências da Natureza.',
      icon: Sparkles,
      bgIcon: 'bg-secondary-container/20 text-secondary',
      badge: 'Mais Procurado',
      highlight: true,
    },
    {
      id: 'vestibulares' as ExamCategory,
      title: 'Vestibulares Tradicionais',
      count: 'FUVEST, UNICAMP & Federais',
      description: 'Provas densas e interdisciplinares das principais universidades públicas de São Paulo e do país.',
      icon: GraduationCap,
      bgIcon: 'bg-surface-container-high text-primary',
      badge: 'Alta Densidade',
    },
    {
      id: 'concursos' as ExamCategory,
      title: 'Concursos Públicos',
      count: 'Cebraspe, FGV & Vunesp',
      description: 'Carreiras administrativas e policiais: Português, RLM, Informática, Direito Constitucional e Administrativo.',
      icon: Briefcase,
      bgIcon: 'bg-tertiary-fixed text-tertiary',
      badge: 'Carreira Pública',
    },
    {
      id: 'olimpiadas' as ExamCategory,
      title: 'Olimpíadas Acadêmicas',
      count: 'OBMEP, Canguru & OBA',
      description: 'Desafios matemáticos e científicos para desenvolver raciocínio dedutivo, lógica e criatividade pura.',
      icon: Trophy,
      bgIcon: 'bg-secondary-fixed text-primary',
      badge: 'Raciocínio Olímpico',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-20 pb-16" id="categorias">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Trilhas de Aprendizagem
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface mt-1">
            Navegue pelas Categorias
          </h2>
        </div>
        <p className="text-sm text-on-surface-variant max-w-md">
          Selecione o nível de ensino ou objetivo para acessar simulados estruturados rigorosamente segundo matrizes de referência oficiais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <button
              key={`${cat.id}-${idx}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 shadow-[0px_2px_8px_-2px_rgba(31,41,55,0.04),0px_6px_16px_-4px_rgba(31,41,55,0.06)] hover:shadow-xl hover:-translate-y-1 text-left relative overflow-hidden border border-surface-container-highest/60 ${
                cat.highlight ? 'ring-2 ring-secondary/30' : ''
              }`}
            >
              {cat.highlight && (
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-secondary-fixed-dim/30 pointer-events-none" />
              )}

              <div>
                <div className={`w-12 h-12 rounded-xl ${cat.bgIcon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  {cat.badge}
                </span>

                <h3 className="text-lg font-bold text-on-surface mt-1 mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 mt-4 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors border-t border-surface-container-high/40">
                <span>Ver simulados disponíveis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
