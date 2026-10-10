import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { MedicalTerm } from '../types/medscript';

interface MedicalTermCardsProps {
  terms: MedicalTerm[];
}

export const MedicalTermCards: React.FC<MedicalTermCardsProps> = ({ terms }) => {
  const [expandedId, setExpandedId] = useState<string | null>(terms[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!terms || terms.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-xs">No complex medical terms identified in this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {terms.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isExpanded
                ? 'bg-white border-medblue-300 shadow-medical'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Card Summary Header */}
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full p-4 text-left flex items-center justify-between gap-3 focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isExpanded ? 'bg-sky-100 text-medblue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.term}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                    {item.simpleMeaning}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-slate-100 text-slate-600">
                  {item.category.replace('_', ' ')}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3 text-xs animate-in fade-in">
                
                {/* 1. Simple Meaning */}
                <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-slate-800">
                  <span className="font-bold text-medblue-900 block mb-1">
                    Simple Plain Meaning:
                  </span>
                  <p className="leading-relaxed">
                    {item.simpleMeaning}
                  </p>
                </div>

                {/* 2. Exact Document Context */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    What the Document Actually Says:
                  </span>
                  <p className="italic font-medium text-slate-900">
                    “{item.documentContext}”
                  </p>
                </div>

                {/* 3. Non-Diagnostic Boundary (What it does NOT mean) */}
                {item.whatItDoesNotMean && (
                  <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-900">
                    <span className="font-bold block mb-1 flex items-center gap-1.5 text-teal-950">
                      <ShieldAlert className="w-3.5 h-3.5 text-teal-700" />
                      Important Clinical Boundary:
                    </span>
                    <p className="leading-relaxed">
                      {item.whatItDoesNotMean}
                    </p>
                  </div>
                )}

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
