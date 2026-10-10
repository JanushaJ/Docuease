import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileCheck,
  Stethoscope
} from 'lucide-react';
import { SafetyCheck } from '../types/medscript';

interface SafetyCheckPanelProps {
  safety: SafetyCheck;
  isAllUncertainResolved?: boolean;
}

export const SafetyCheckPanel: React.FC<SafetyCheckPanelProps> = ({
  safety,
  isAllUncertainResolved = true
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-medical p-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Clinical Safety &amp; Grounding Validation
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Multi-tiered safeguards preventing hallucinations and invented diagnoses
            </p>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
          safety.passed && isAllUncertainResolved
            ? 'bg-teal-50 text-teal-700 border border-teal-200'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {safety.passed && isAllUncertainResolved ? '100% Verified Safe' : '⚠️ Pending Verification'}
        </span>
      </div>

      {/* Safety Checks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {safety.checks.map((chk) => (
          <div
            key={chk.id}
            className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start gap-3"
          >
            <div className="mt-0.5">
              {chk.passed ? (
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-900">{chk.name}</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {chk.details}
              </p>
            </div>
          </div>
        ))}

        {/* Dynamic Uncertainty Isolation Card */}
        <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
          isAllUncertainResolved
            ? 'bg-teal-50/50 border-teal-200'
            : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="mt-0.5">
            {isAllUncertainResolved ? (
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">
              Handwriting Uncertainty Guardrail
            </h5>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              {isAllUncertainResolved
                ? 'All ambiguous words verified by user. No guesswork introduced.'
                : 'Ambiguous handwriting is isolated and excluded from confident claims.'}
            </p>
          </div>
        </div>

        {/* Non-Diagnostic Boundary Card */}
        <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 flex items-start gap-3">
          <div className="mt-0.5">
            <Lock className="w-4 h-4 text-medblue-600" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">
              Non-Diagnostic Boundary
            </h5>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Krishxtattva explains documents only. It never invents diagnoses or replaces your doctor.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
