'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  BarChart3, 
  Compass, 
  Sparkles,
  Info
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onSearch?: (query: string) => void;
  savedCount?: number;
  attemptsCount?: number;
}

export function Navbar({ currentView, onNavigate, onSearch, savedCount = 0, attemptsCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
      onNavigate('simulados', { query: searchInput });
    }
  };

  const navLinks = [
    { id: 'inicio', label: 'Início', icon: Compass },
    { id: 'simulados', label: 'Simulados', icon: BookOpen },
    { id: 'vestibulares', label: 'Vestibulares', icon: GraduationCap },
    { id: 'concursos', label: 'Concursos', icon: Briefcase },
    { id: 'olimpiadas', label: 'Olimpíadas', icon: Trophy },
    { id: 'sisu', label: 'Guia SISU', icon: Sparkles },
    { id: 'sobre', label: 'Sobre', icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <button 
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-2.5 group text-left transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <span className="font-extrabold text-xl tracking-tight">Q</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-primary leading-none">
                Quiz&apos;s
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-tight">
                Simulados 100% Livres
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 text-sm font-bold rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 text-on-surface-variant/70 w-4 h-4 pointer-events-none" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar simulados, questões ou bancas..."
              className="w-full h-10 pl-10 pr-4 bg-surface-container-lowest border border-surface-container-highest/60 rounded-full text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all"
            />
          </form>
        </div>

        {/* Action Controls - NO LOGIN, replaced with useful actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onNavigate('progresso')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              currentView === 'progresso'
                ? 'bg-secondary-fixed text-primary ring-1 ring-secondary/30'
                : 'bg-surface-container-low text-primary hover:bg-surface-container'
            }`}
            title="Meu Histórico e Progresso no Navegador"
          >
            <BarChart3 className="w-4 h-4 text-secondary" />
            <span className="hidden sm:inline">Meu Progresso</span>
            {attemptsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-extrabold flex items-center justify-center">
                {attemptsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('simulados')}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 active:scale-95 transition-all rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explorar Provas</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container-highest/60 px-4 py-4 flex flex-col gap-3 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 text-on-surface-variant/70 w-4 h-4 pointer-events-none" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar ENEM, FUVEST, Concursos..."
              className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </form>

          <nav className="flex flex-col gap-1 pt-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onNavigate('progresso');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold bg-secondary-fixed text-primary mt-2"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-secondary" />
                <span>Meu Progresso (Local)</span>
              </div>
              {attemptsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                  {attemptsCount} provas
                </span>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
