import React from 'react';
import { 
  GraduationCap, 
  RotateCcw, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  CheckCircle2, 
  X, 
  Check, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { DocumentCurriculum } from '../services/teacherCurriculum';
import { SupportedLanguage } from '../types/medscript';

export interface WhatDidILearnModalProps {
  curriculum: DocumentCurriculum;
  isOpen: boolean;
  onClose: () => void;
  onExplainAgain: () => void;
  onMakeItSimpler: () => void;
  onShowVisual: () => void;
  onExplainInLanguage: (lang: SupportedLanguage) => void;
  onAskQuestion: () => void;
}

export const WhatDidILearnModal: React.FC<WhatDidILearnModalProps> = ({
  curriculum,
  isOpen,
  onClose,
  onExplainAgain,
  onMakeItSimpler,
  onShowVisual,
  onExplainInLanguage,
  onAskQuestion
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkblue-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-cream-50 text-darkblue-950 border border-cream-300 shadow-2xl p-6 flex flex-col gap-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-cream-200 text-cream-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-cream-250">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-400 text-darkblue-950 flex items-center justify-center font-bold shadow-lg">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-darkblue-950 font-sans tracking-tight">
              🎓 What You Learned Today
            </h2>
            <p className="text-xs text-cream-700 font-medium">
              Congratulations! You have completed the teacher walkthrough for this document.
            </p>
          </div>
        </div>

        {/* 5 Key Concepts */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-darkblue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>5 Core Concepts Mastered</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {curriculum.fiveKeyLearnings.map((learning, idx) => (
              <div 
                key={idx}
                className="p-2.5 rounded-lg bg-cream-100 border border-cream-250 text-xs text-darkblue-950 font-medium flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="leading-relaxed">{learning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Summary: What Document Says vs What It Does Not Establish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* What it says */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>What Document Says</span>
            </h4>
            <ul className="text-xs text-emerald-950 space-y-1.5 list-disc pl-4 font-medium">
              {curriculum.whatDocumentSays.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* What it does not establish */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>What It Does Not Establish</span>
            </h4>
            <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4 font-medium">
              {curriculum.whatDocumentDoesNotEstablish.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Step Action Prompt */}
        <div className="pt-3 border-t border-cream-250 flex flex-col gap-3">
          <p className="text-xs font-bold text-darkblue-900">
            Want me to explain anything again? Choose an option:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => {
                onClose();
                onExplainAgain();
              }}
              className="p-2.5 rounded-xl bg-cream-150 hover:bg-cream-200 border border-cream-300 text-xs font-bold text-darkblue-950 flex flex-col items-center gap-1 text-center transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-darkblue-700" />
              <span>Explain Again</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onMakeItSimpler();
              }}
              className="p-2.5 rounded-xl bg-cream-150 hover:bg-cream-200 border border-cream-300 text-xs font-bold text-darkblue-950 flex flex-col items-center gap-1 text-center transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Make It Simpler</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onShowVisual();
              }}
              className="p-2.5 rounded-xl bg-cream-150 hover:bg-cream-200 border border-cream-300 text-xs font-bold text-darkblue-950 flex flex-col items-center gap-1 text-center transition-all shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Show Visual</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onExplainInLanguage('te');
              }}
              className="p-2.5 rounded-xl bg-cream-150 hover:bg-cream-200 border border-cream-300 text-xs font-bold text-darkblue-950 flex flex-col items-center gap-1 text-center transition-all shadow-sm"
            >
              <Globe className="w-4 h-4 text-cyan-600" />
              <span>Explain in Telugu</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onAskQuestion();
              }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-darkblue-950 text-xs font-extrabold flex flex-col items-center gap-1 text-center transition-all shadow-md col-span-2 sm:col-span-1"
            >
              <MessageSquare className="w-4 h-4 fill-darkblue-950" />
              <span>Ask Question</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
