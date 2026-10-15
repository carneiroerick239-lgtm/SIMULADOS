'use client';

import React, { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedExams } from '@/components/FeaturedExams';
import { MethodologySection } from '@/components/MethodologySection';
import { CommunityBanner } from '@/components/CommunityBanner';
import { FreeCtaSection } from '@/components/FreeCtaSection';
import { CatalogView } from '@/components/CatalogView';
import { ExamSimulatorView } from '@/components/ExamSimulator/ExamSimulatorView';
import { ExamResultsView } from '@/components/ExamResults/ExamResultsView';
import { ExamDetailsModal } from '@/components/ExamDetailsModal';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { SisuGuide } from '@/components/SisuGuide';
import { AboutView } from '@/components/AboutView';
import { allExams, getExamById } from '@/data/exams';
import { Exam, ExamCategory, ExamResult } from '@/types/quiz';
import { storage } from '@/lib/storage';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<string>('inicio');
  const [selectedExamId, setSelectedExamId] = useState<string>('enem-humanas-2024');
  const [detailsExam, setDetailsExam] = useState<Exam | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Results view data
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);

  // Redo mode for errors
  const [filterWrongQuestionIds, setFilterWrongQuestionIds] = useState<string[] | undefined>(undefined);

  // Stats for navbar indicators - initialized lazily without effect cascading renders
  const [stats, setStats] = useState(() => ({
    savedCount: typeof window !== 'undefined' ? storage.getSavedQuestions().length : 0,
    attemptsCount: typeof window !== 'undefined' ? storage.getHistory().length : 0,
  }));

  const updateStats = useCallback(() => {
    setStats({
      savedCount: storage.getSavedQuestions().length,
      attemptsCount: storage.getHistory().length,
    });
  }, []);

  // Navigation router
  const handleNavigate = (view: string, params?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateStats();

    if (view === 'simulados' && params?.category) {
      setCurrentView(`simulados-${params.category}`);
      return;
    }
    setCurrentView(view);
  };

  // Start exam flow
  const handleStartExam = (examId: string, filterIds?: string[]) => {
    setSelectedExamId(examId);
    setFilterWrongQuestionIds(filterIds);
    setIsDetailsModalOpen(false);
    setCurrentView('execucao');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // View details modal
  const handleViewDetails = (exam: Exam) => {
    setDetailsExam(exam);
    setIsDetailsModalOpen(true);
  };

  // Exam completion
  const handleExamFinished = (result: ExamResult) => {
    setActiveResult(result);
    updateStats();
    setCurrentView('resultado');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const activeExam = getExamById(selectedExamId) || allExams[0];

  // Redo options from results
  const handleRedoErrors = () => {
    if (!activeResult) return;
    const wrongIds = Object.keys(activeResult.attempts).filter(qId => {
      const q = activeExam?.questions.find(item => item.id === qId);
      return activeResult.attempts[qId]?.selectedAlternativeId !== q?.correctAlternativeId;
    });

    if (wrongIds.length > 0) {
      handleStartExam(activeResult.examId, wrongIds);
    } else {
      handleStartExam(activeResult.examId);
    }
  };

  const handleRedoFull = () => {
    if (!activeResult) return;
    storage.clearActiveSession();
    handleStartExam(activeResult.examId);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface antialiased selection:bg-secondary-fixed selection:text-primary">
      {/* Show regular Navbar on all views EXCEPT during live exam execution */}
      {currentView !== 'execucao' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          savedCount={stats.savedCount}
          attemptsCount={stats.attemptsCount}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${currentView !== 'execucao' ? 'pt-20' : ''}`}>
        {/* VIEW: INÍCIO (LANDING PAGE) */}
        {currentView === 'inicio' && (
          <div className="flex flex-col w-full">
            <HeroSection
              onStartExam={(id) => handleStartExam(id)}
              onExplore={() => handleNavigate('simulados')}
            />

            <CategorySection
              onSelectCategory={(cat) => handleNavigate(`simulados-${cat}`)}
            />

            <FeaturedExams
              exams={allExams}
              onStartExam={(id) => handleStartExam(id)}
              onViewDetails={handleViewDetails}
            />

            <MethodologySection />

            <CommunityBanner />

            <FreeCtaSection
              onStart={() => handleStartExam('enem-humanas-2024')}
            />
          </div>
        )}

        {/* VIEW: CATALOG (EXPLORAR SIMULADOS) */}
        {currentView === 'simulados' && (
          <CatalogView
            exams={allExams}
            initialCategory="todos"
            onStartExam={(id) => handleStartExam(id)}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView === 'vestibulares' && (
          <CatalogView
            exams={allExams}
            initialCategory="vestibulares"
            onStartExam={(id) => handleStartExam(id)}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView === 'concursos' && (
          <CatalogView
            exams={allExams}
            initialCategory="concursos"
            onStartExam={(id) => handleStartExam(id)}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView === 'olimpiadas' && (
          <CatalogView
            exams={allExams}
            initialCategory="olimpiadas"
            onStartExam={(id) => handleStartExam(id)}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView.startsWith('simulados-') && (
          <CatalogView
            exams={allExams}
            initialCategory={currentView.replace('simulados-', '')}
            onStartExam={(id) => handleStartExam(id)}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* VIEW: EXAM SIMULATOR (TELA DE RESOLUÇÃO) */}
        {currentView === 'execucao' && activeExam && (
          <ExamSimulatorView
            exam={activeExam}
            filterQuestionIds={filterWrongQuestionIds}
            onFinishExam={handleExamFinished}
            onExit={() => {
              if (window.confirm('Deseja sair do simulado? Seu progresso continuará salvo no navegador.')) {
                setCurrentView('inicio');
              }
            }}
          />
        )}

        {/* VIEW: EXAM RESULTS (PÁGINA DE RESULTADOS) */}
        {currentView === 'resultado' && activeResult && (
          <ExamResultsView
            exam={getExamById(activeResult.examId) || activeExam}
            result={activeResult}
            onRedoErrors={handleRedoErrors}
            onRedoFull={handleRedoFull}
            onBackToCatalog={() => handleNavigate('simulados')}
          />
        )}

        {/* VIEW: PROGRESS DASHBOARD (MEU PROGRESSO) */}
        {currentView === 'progresso' && (
          <ProgressDashboard
            onViewResult={(res) => {
              setActiveResult(res);
              setSelectedExamId(res.examId);
              setCurrentView('resultado');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onStartExam={(id) => handleStartExam(id)}
            onExplore={() => handleNavigate('simulados')}
          />
        )}

        {/* VIEW: SISU GUIDE (PREPARAÇÃO PARA O SISU) */}
        {currentView === 'sisu' && (
          <SisuGuide
            onStartEnemExam={() => handleStartExam('enem-humanas-2024')}
          />
        )}

        {/* VIEW: SOBRE (ABOUT & METHODOLOGY) */}
        {currentView === 'sobre' && (
          <AboutView />
        )}
      </main>

      {/* Pre-Exam Details Modal */}
      <ExamDetailsModal
        exam={detailsExam}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onStartExam={(id) => handleStartExam(id)}
      />

      {/* Show Footer on non-exam execution views */}
      {currentView !== 'execucao' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
