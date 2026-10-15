export type Difficulty = 'Fácil' | 'Média' | 'Difícil';

export type ExamCategory = 
  | 'enem'
  | 'vestibulares'
  | 'concursos'
  | 'olimpiadas'
  | 'educacao_basica';

export interface QuestionAlternative {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export interface Question {
  id: string;
  number: number;
  subject: string; // e.g. "Geografia Urbana", "História do Brasil", "Direito Constitucional"
  generalDiscipline: string; // e.g. "Ciências Humanas", "Linguagens", "Matemática", "Ciências da Natureza", "Conhecimentos Específicos"
  source: string; // e.g. "ENEM 2024 Aplicada", "FUVEST 2024 - 1ª Fase", "Questão de Treino - Estilo Cebraspe"
  isOfficial: boolean;
  difficulty: Difficulty;
  contextQuote?: string; // Optional excerpt or quote
  quoteAuthor?: string; // Citation source
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  prompt: string; // Main question statement
  alternatives: QuestionAlternative[];
  correctAlternativeId: string;
  explanation: string;
  teacherName?: string;
  pedagogicalFocus?: string;
}

export interface Exam {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ExamCategory;
  categoryLabel: string;
  year: number;
  institution: string; // e.g. "INEP", "USP", "Polícia Federal", "OBMEP", "Vunesp"
  difficulty: Difficulty;
  durationMinutes: number; // e.g. 150 for 2h30m, 330 for 5h30m
  questionsCount: number; // MUST be >= 20
  disciplines: string[];
  description: string;
  isOfficial: boolean;
  questions: Question[];
}

export interface QuestionAttempt {
  questionId: string;
  selectedAlternativeId: string | null;
  isMarkedForReview: boolean;
  isStruckThrough: string[]; // List of eliminated alternative IDs (e.g. ['A', 'C'])
  timeSpentSeconds: number;
}

export interface ExamSession {
  examId: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  attempts: Record<string, QuestionAttempt>;
  currentQuestionIndex: number;
  isPaused: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  examCategory: ExamCategory;
  completedAt: string;
  totalQuestions: number;
  totalAnswered: number;
  totalBlank: number;
  totalCorrect: number;
  totalWrong: number;
  percentageScore: number;
  estimatedTri: number;
  timeSpentSeconds: number;
  attempts: Record<string, QuestionAttempt>;
  disciplineBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  difficultyBreakdown: Record<Difficulty, { total: number; correct: number }>;
  weakTopics: string[];
}

export interface SavedNote {
  questionId: string;
  examId: string;
  text: string;
  updatedAt: string;
}
