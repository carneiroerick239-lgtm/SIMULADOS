'use client';

import React from 'react';
import { Globe, Mail, Youtube, MessageSquare, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-low pt-16 pb-12 border-t border-surface-container-highest/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
                Q
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-primary">
                Quiz&apos;s
              </span>
            </div>
            
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Seu futuro começa com uma resposta. A mais moderna plataforma educacional brasileira de simulados completos, cronometrados e adaptativos, 100% gratuita e sem exigir cadastro.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-primary max-w-xs">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>Acesso livre imediato • Progresso salvo no navegador</span>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="#inicio" 
                onClick={(e) => { e.preventDefault(); onNavigate('inicio'); }}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                title="Portal Quiz's"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contato@quizs.edu.br"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                title="Fale Conosco"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                title="Aulas e Vídeos"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button 
                onClick={() => onNavigate('sobre')}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                title="Dúvidas e Ajuda"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 1: Links Úteis */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-on-surface tracking-wide uppercase">Links Úteis</span>
            <ul className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-primary transition-colors text-left">
                  Sobre nós
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-primary transition-colors text-left">
                  Metodologia & TRI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulados')} className="hover:text-primary transition-colors text-left">
                  Banco de Questões
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sisu')} className="hover:text-primary transition-colors text-left font-semibold text-secondary">
                  Preparação para o SISU
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('progresso')} className="hover:text-primary transition-colors text-left">
                  Meu Progresso Local
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Categorias */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-on-surface tracking-wide uppercase">Categorias</span>
            <ul className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('simulados', { category: 'enem' })} className="hover:text-primary transition-colors text-left">
                  ENEM Oficial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vestibulares')} className="hover:text-primary transition-colors text-left">
                  FUVEST & Vestibulares
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('concursos')} className="hover:text-primary transition-colors text-left">
                  Concursos Públicos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('olimpiadas')} className="hover:text-primary transition-colors text-left">
                  OBMEP & Olimpíadas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulados', { category: 'educacao_basica' })} className="hover:text-primary transition-colors text-left">
                  SARESP & Provão Paulista
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Suporte & Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-on-surface tracking-wide uppercase">Fontes Oficiais & Legal</span>
            <ul className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
              <li>
                <a href="https://www.gov.br/inep/pt-br" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  Portal INEP / MEC
                </a>
              </li>
              <li>
                <a href="https://acessounico.mec.gov.br/sisu" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  Portal Oficial do SiSU
                </a>
              </li>
              <li>
                <a href="http://www.obmep.org.br" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  Portal Oficial da OBMEP
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-primary transition-colors text-left">
                  Termos de Uso Gratuitos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-primary transition-colors text-left">
                  Privacidade sem Cookies Invasivos
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© 2025 Quiz&apos;s Educação Digital. Todos os direitos reservados. Plataforma livre para fins educacionais.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Feito com carinho para estudantes de todo o Brasil</span>
            <Heart className="w-3.5 h-3.5 text-secondary fill-secondary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
