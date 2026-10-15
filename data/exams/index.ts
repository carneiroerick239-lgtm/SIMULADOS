import { Exam, ExamCategory } from '@/types/quiz';
import { enemHumanas2024 } from './enem-humanas-2024';
import { fuvest2024Geral } from './fuvest-2024-geral';
import { concursoPfAdm2024 } from './concurso-pf-adm-2024';
import { obmepOlimpiadas2024 } from './obmep-olimpiadas-2024';
import { provaoPaulistaSaresp2024 } from './provao-paulista-saresp-2024';

export const allExams: Exam[] = [
  enemHumanas2024,
  fuvest2024Geral,
  concursoPfAdm2024,
  obmepOlimpiadas2024,
  provaoPaulistaSaresp2024,
];

export function getExamById(id: string): Exam | undefined {
  return allExams.find((exam) => exam.id === id || exam.slug === id);
}

export function getExamsByCategory(category: ExamCategory | 'todos'): Exam[] {
  if (category === 'todos') return allExams;
  return allExams.filter((exam) => exam.category === category);
}

export function searchExams(query: string, category?: string, difficulty?: string): Exam[] {
  const cleanQuery = query.toLowerCase().trim();
  
  return allExams.filter((exam) => {
    const matchesCategory = !category || category === 'todos' || exam.category === category;
    const matchesDifficulty = !difficulty || difficulty === 'todos' || exam.difficulty === difficulty;
    
    if (!cleanQuery) return matchesCategory && matchesDifficulty;

    const matchesTitle = exam.title.toLowerCase().includes(cleanQuery);
    const matchesSub = exam.subtitle.toLowerCase().includes(cleanQuery);
    const matchesInst = exam.institution.toLowerCase().includes(cleanQuery);
    const matchesDisc = exam.disciplines.some((d) => d.toLowerCase().includes(cleanQuery));
    const matchesQuestions = exam.questions.some((q) => 
      q.prompt.toLowerCase().includes(cleanQuery) || 
      q.subject.toLowerCase().includes(cleanQuery)
    );

    return matchesCategory && matchesDifficulty && (matchesTitle || matchesSub || matchesInst || matchesDisc || matchesQuestions);
  });
}
