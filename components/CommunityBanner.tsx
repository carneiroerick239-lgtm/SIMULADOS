'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Award } from 'lucide-react';

export function CommunityBanner() {
  return (
    <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16">
      <div className="relative w-full min-h-[320px] rounded-3xl overflow-hidden shadow-2xl flex items-center">
        {/* Background Image using Next.js Image */}
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuADzcv_dUcBYP1MzjliuUQUwMnkTeA-pBfgjsrxvSnCTzLg4kY7xDxiR8p6lf1rUANCqvQaZuPBJGOE9HbmEkRweWgZk3m2dPrFRJjTyr2VOy6KgEUFAzxA0zj5QiSX-cim32ob6L6S9jWp55cGuuBb0BCI9i-d21xn4MoeXCo11Zfld7N3vAk3loLsazlV4aH3NMB7OOJvqvF7kejkIHqkpPOgZ0WGbRnso0W-03TxliOc3D1oz-kO3A"
          alt="Estudantes brasileiros estudando com foco em sala moderna"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
          priority
        />

        {/* Gradient overlay scrim for crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary-container/85 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 max-w-xl text-white">
          <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-sm">
            Comunidade Ativa & Aberta
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight text-white">
            Junte-se a milhares de estudantes que conquistaram suas vagas.
          </h3>

          <p className="text-sm sm:text-base text-primary-fixed mb-6 leading-relaxed">
            A disciplina diária de resolver de 15 a 30 questões com análise dos erros transforma notas de corte em aprovações reais.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full bg-secondary-fixed text-primary font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                SP
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                RJ
              </div>
              <div className="w-9 h-9 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                MG
              </div>
              <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-primary font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                BA
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Estudantes de todas as regiões do Brasil
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
