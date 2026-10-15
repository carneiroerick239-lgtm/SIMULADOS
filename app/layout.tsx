import type {Metadata} from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Quiz's - Plataforma de Estudos e Simulados Gratuitos",
  description: 'Pratique questões reais e simulados completos para ENEM, Vestibulares, Olimpíadas e Concursos Públicos. 100% gratuito e sem necessidade de login.',
  openGraph: {
    title: "Quiz's - Plataforma de Estudos e Simulados Gratuitos",
    description: 'Pratique questões reais e simulados completos para ENEM, Vestibulares, Olimpíadas e Concursos Públicos. 100% gratuito e sem cadastro.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Quiz's - Plataforma de Estudos e Simulados",
    description: 'Simulados completos para ENEM, FUVEST, Concursos e Olimpíadas. Sem login e gratuito.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col justify-between" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
