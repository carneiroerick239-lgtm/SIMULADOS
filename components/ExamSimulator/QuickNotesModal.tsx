'use client';

import React, { useState } from 'react';
import { X, Save, FileText, Check } from 'lucide-react';
import { storage } from '@/lib/storage';

interface QuickNotesModalProps {
  isOpen: boolean;
  questionId: string;
  examId: string;
  questionNumber: number;
  onClose: () => void;
}

export function QuickNotesModal({
  isOpen,
  questionId,
  examId,
  questionNumber,
  onClose,
}: QuickNotesModalProps) {
  if (!isOpen) return null;

  return (
    <QuickNotesModalContent
      questionId={questionId}
      examId={examId}
      questionNumber={questionNumber}
      onClose={onClose}
    />
  );
}

function QuickNotesModalContent({
  questionId,
  examId,
  questionNumber,
  onClose,
}: {
  questionId: string;
  examId: string;
  questionNumber: number;
  onClose: () => void;
}) {
  const [noteText, setNoteText] = useState(() => storage.getNoteByQuestionId(questionId));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    storage.saveNote(questionId, examId, noteText);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-6 flex flex-col gap-4 border border-surface-container-highest">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-on-surface">
              Anotações Rápidas · Questão {String(questionNumber).padStart(2, '0')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-on-surface-variant">
          Suas anotações são salvas localmente no navegador e ficam visíveis na revisão deste simulado.
        </p>

        <textarea
          rows={6}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Escreva seus cálculos, dúvidas ou raciocínio para consultar depois..."
          className="w-full p-3.5 bg-surface-container-low border border-surface-container-high rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container"
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container flex items-center gap-1.5 shadow-sm transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Salvo!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Nota</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
