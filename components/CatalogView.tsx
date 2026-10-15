'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Play, 
  Info, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Exam, ExamCategory, Difficulty } from '@/types/quiz';

interface CatalogViewProps {
  exams: Exam[];
  initialCategory?: string;
  initialQuery?: string;
  onStartExam: (examId: string) => void;
  onViewDetails: (exam: Exam) => void;
}

export function CatalogView({
  exams,
  initialCategory = 'todos',
  initialQuery = '',
  onStartExam,
  onViewDetails,
}: CatalogViewProps) {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todos');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('todos');

  // Extract all distinct disciplines
  const allDisciplines = useMemo(() => {
    const set = new Set<string>();
    exams.forEach(e => e.disciplines.forEach(d => set.add(d)));
    return Array.from(set).sort();
  }, [exams]);

  const filteredExams = useMemo(() => {
    const q = search.toLowerCase().trim();

    return exams.filter((exam) => {
      const matchCat = selectedCategory === 'todos' || exam.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'todos' || exam.difficulty === selectedDifficulty;
      const matchDisc = selectedDiscipline === 'todos' || exam.disciplines.includes(selectedDiscipline);

      if (!matchCat || !matchDiff || !matchDisc) return false;
      if (!q) return true;

      return (
        exam.title.toLowerCase().includes(q) ||
        exam.subtitle.toLowerCase().includes(q) ||
        exam.institution.toLowerCase().includes(q) ||
        exam.disciplines.some(d => d.toLowerCase().includes(q)) ||
        exam.description.toLowerCase().includes(q)
      );
    });
  }, [exams, search, selectedCategory, selectedDifficulty, selectedDiscipline]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h 00m`;
    return `${hours}h ${mins}m`;
  };

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

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('todos');
    setSelectedDifficulty('todos');
    setSelectedDiscipline('todos');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col gap-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Catálogo Completo
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface mt-1">
            Explorar Simulados
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
            Todas as provas disponíveis possuem pelo menos 20 questões completas com gabarito comentado, cronômetro oficial e correção automática sem necessidade de conta.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary-fixed text-primary self-start md:self-auto shadow-sm">
          {filteredExams.length} {filteredExams.length === 1 ? 'simulado encontrado' : 'simulados encontrados'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome da prova, instituição (USP, INEP, SEDUC), matéria..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category */}
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Categoria da Prova
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <option value="todos">Todas as Categorias</option>
              <option value="enem">ENEM</option>
              <option value="vestibulares">Vestibulares (FUVEST, etc.)</option>
              <option value="concursos">Concursos Públicos</option>
              <option value="olimpiadas">Olimpíadas Acadêmicas</option>
              <option value="educacao_basica">Educação Básica & Seriado</option>
            </select>
          </div>

          {/* Discipline */}
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Disciplina Principal
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <option value="todos">Todas as Matérias</option>
              {allDisciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Dificuldade
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <option value="todos">Todas as Dificuldades</option>
              <option value="Fácil">Fácil</option>
              <option value="Média">Média</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full h-10 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredExams.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-surface-container-highest flex flex-col items-center gap-3">
          <BookOpen className="w-12 h-12 text-on-surface-variant/40" />
          <h3 className="text-lg font-bold text-on-surface">Nenhum simulado encontrado</h3>
          <p className="text-xs text-on-surface-variant max-w-sm">
            Tente remover alguns filtros ou buscar por palavras mais gerais como &quot;ENEM&quot;, &quot;FUVEST&quot; ou &quot;Matemática&quot;.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Ver Todos os Simulados
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-primary text-xs font-bold">
                    {exam.categoryLabel}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDifficultyBadge(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {exam.title}
                </h3>
                
                <span className="text-[11px] font-semibold text-secondary block mb-3">
                  {exam.institution} • {exam.year}
                </span>

                <p className="text-xs text-on-surface-variant mb-4 line-clamp-3 leading-relaxed">
                  {exam.description}
                </p>

                {/* Disciplines tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {exam.disciplines.slice(0, 3).map((d, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-surface-container text-[10px] text-on-surface-variant font-medium">
                      {d}
                    </span>
                  ))}
                  {exam.disciplines.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] text-on-surface-variant font-medium">
                      +{exam.disciplines.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between py-2 px-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant font-semibold mb-4">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-primary" />
                    <span>{exam.questionsCount} Questões</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span>{formatDuration(exam.durationMinutes)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDetails(exam)}
                    className="py-2.5 px-3 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Instruções</span>
                  </button>

                  <button
                    onClick={() => onStartExam(exam.id)}
                    className="py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container active:scale-95 shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Iniciar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
