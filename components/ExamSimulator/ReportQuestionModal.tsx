'use client';

import React, { useState } from 'react';
import { X, Send, AlertCircle, Check } from 'lucide-react';

interface ReportQuestionModalProps {
  isOpen: boolean;
  questionNumber: number;
  onClose: () => void;
}

export function ReportQuestionModal({
  isOpen,
  questionNumber,
  onClose,
}: ReportQuestionModalProps) {
  const [reportType, setReportType] = useState('Gabarito divergente');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onClose();
      setSent(false);
      setDetails('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-6 flex flex-col gap-4 border border-surface-container-highest">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-on-surface">
              Reportar Questão {String(questionNumber).padStart(2, '0')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-on-surface">Obrigado pela contribuição!</p>
            <p className="text-xs text-on-surface-variant">Nossa equipe pedagógica analisará o apontamento.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Tipo de apontamento
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="Gabarito divergente">Gabarito com divergência</option>
                <option value="Erro de digitação">Erro de digitação ou ortografia</option>
                <option value="Imagem não carrega">Problema na imagem ou enunciado</option>
                <option value="Outro">Outro apontamento pedagógico</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Detalhes adicionais (opcional)
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explique resumidamente o que você identificou..."
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Apontamento</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
