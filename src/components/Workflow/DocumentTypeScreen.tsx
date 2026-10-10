import React from 'react';
import { ArrowLeft, ArrowRight, Stethoscope, FileText, CheckCircle2 } from 'lucide-react';
import { PrescriptionIllustration } from '../Illustrations/PrescriptionIllustration';
import { ComplexDocIllustration } from '../Illustrations/ComplexDocIllustration';
import { SupportedLanguage } from '../../types/medscript';
import { getUITranslation } from '../../utils/uiTranslations';

export type DocumentCategory = 'prescription' | 'complex_document';

export interface DocumentTypeScreenProps {
  onSelectCategory: (category: DocumentCategory) => void;
  onBack: () => void;
  currentLanguage?: SupportedLanguage;
}

/**
 * Screen 2: Document Type Selection Screen
 * Displays exactly two large, neatly aligned options:
 * Option 1: Medical Handwritten Prescription
 * Option 2: Complex Documents in Simple Language
 */
export const DocumentTypeScreen: React.FC<DocumentTypeScreenProps> = ({
  onSelectCategory,
  onBack,
  currentLanguage = 'en',
}) => {
  const t = getUITranslation(currentLanguage);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Back Navigation */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:underline"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Screen Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
          Step 1 of 4
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          What type of document do you want to understand?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Select a category below to route your document through our specialized deciphering engine.
        </p>
      </div>

      {/* Exactly Two Large, Neatly Aligned Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* OPTION 1: Medical Handwritten Prescription */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-6 sm:p-8 text-left group">
          <div className="space-y-5">
            {/* Illustration */}
            <div className="w-full flex items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100 p-3 overflow-hidden">
              <PrescriptionIllustration className="w-full h-36" />
            </div>

            {/* Title & Tag */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Clinical Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {t.cardATitle}
              </h3>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.cardASubtitle}
            </p>

            {/* Specific Capabilities List */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.cardAPoint1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.cardAPoint2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.cardAPoint3}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={() => onSelectCategory('prescription')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all group-hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
              aria-label="Upload Prescription"
            >
              <span>{t.cardABtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* OPTION 2: Complex Documents in Simple Language */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-6 sm:p-8 text-left group">
          <div className="space-y-5">
            {/* Illustration */}
            <div className="w-full flex items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100 p-3 overflow-hidden">
              <ComplexDocIllustration className="w-full h-36" />
            </div>

            {/* Title & Tag */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Simplification Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {t.cardBTitle}
              </h3>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.cardBSubtitle}
            </p>

            {/* Specific Capabilities List */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{t.cardBPoint1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{t.cardBPoint2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{t.cardBPoint3}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={() => onSelectCategory('complex_document')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all group-hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
              aria-label="Upload Document"
            >
              <span>{t.cardBBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
