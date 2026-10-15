import { ExamResult, ExamSession, SavedNote } from '@/types/quiz';

const HISTORY_KEY = 'quizs_exam_history';
const ACTIVE_SESSION_KEY = 'quizs_active_session';
const SAVED_QUESTIONS_KEY = 'quizs_saved_questions';
const NOTES_KEY = 'quizs_question_notes';

export const storage = {
  // Exam history
  getHistory(): ExamResult[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveResult(result: ExamResult): void {
    if (typeof window === 'undefined') return;
    try {
      const history = this.getHistory();
      // Add newest first, avoid duplicates
      const updated = [result, ...history.filter(r => r.id !== result.id)];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar resultado no localStorage:', e);
    }
  },

  getResultById(id: string): ExamResult | undefined {
    const history = this.getHistory();
    return history.find(r => r.id === id);
  },

  // Active exam session
  getActiveSession(): ExamSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveActiveSession(session: ExamSession): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Erro ao salvar sessão ativa:', e);
    }
  },

  clearActiveSession(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (e) {
      console.error('Erro ao limpar sessão:', e);
    }
  },

  // Saved / Error Notebook Questions
  getSavedQuestions(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(SAVED_QUESTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleSaveQuestion(questionId: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const saved = this.getSavedQuestions();
      let updated: string[];
      let isSavedNow = false;
      if (saved.includes(questionId)) {
        updated = saved.filter(id => id !== questionId);
        isSavedNow = false;
      } else {
        updated = [...saved, questionId];
        isSavedNow = true;
      }
      localStorage.setItem(SAVED_QUESTIONS_KEY, JSON.stringify(updated));
      return isSavedNow;
    } catch {
      return false;
    }
  },

  isQuestionSaved(questionId: string): boolean {
    const saved = this.getSavedQuestions();
    return saved.includes(questionId);
  },

  // Question Notes
  getNotes(): SavedNote[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveNote(questionId: string, examId: string, text: string): void {
    if (typeof window === 'undefined') return;
    try {
      const notes = this.getNotes().filter(n => n.questionId !== questionId);
      if (text.trim()) {
        notes.push({
          questionId,
          examId,
          text,
          updatedAt: new Date().toISOString()
        });
      }
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Erro ao salvar anotação:', e);
    }
  },

  getNoteByQuestionId(questionId: string): string {
    const notes = this.getNotes();
    const note = notes.find(n => n.questionId === questionId);
    return note ? note.text : '';
  },

  // Global Statistics computed from real user history
  getUserStats() {
    const history = this.getHistory();
    const totalSimulados = history.length;
    if (totalSimulados === 0) {
      return {
        totalSimulados: 0,
        avgAccuracy: 0,
        totalTimeMinutes: 0,
        totalQuestionsAnswered: 0,
        totalCorrect: 0,
        savedQuestionsCount: this.getSavedQuestions().length,
      };
    }

    const totalQuestionsAnswered = history.reduce((acc, h) => acc + h.totalAnswered, 0);
    const totalCorrect = history.reduce((acc, h) => acc + h.totalCorrect, 0);
    const totalTimeMinutes = Math.round(history.reduce((acc, h) => acc + h.timeSpentSeconds, 0) / 60);
    const avgAccuracy = Math.round(
      history.reduce((acc, h) => acc + h.percentageScore, 0) / totalSimulados
    );

    return {
      totalSimulados,
      avgAccuracy,
      totalTimeMinutes,
      totalQuestionsAnswered,
      totalCorrect,
      savedQuestionsCount: this.getSavedQuestions().length,
    };
  },

  clearAllData(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(HISTORY_KEY);
      localStorage.removeItem(ACTIVE_SESSION_KEY);
      localStorage.removeItem(SAVED_QUESTIONS_KEY);
      localStorage.removeItem(NOTES_KEY);
    } catch (e) {
      console.error('Erro ao limpar dados locais:', e);
    }
  }
};
