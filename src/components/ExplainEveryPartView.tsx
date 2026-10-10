import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { TeacherStep } from '../services/teacherCurriculum';

export interface ExplainEveryPartViewProps {
  steps: TeacherStep[];
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
}

export const ExplainEveryPartView: React.FC<ExplainEveryPartViewProps> = ({
  steps,
  currentStepIndex,
  onSelectStep
}) => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    steps.forEach((s, idx) => {
      init[s.id] = idx === 0 || idx === currentStepIndex;
    });
    return init;
  });

  const toggleStep = (id: string) => {
    setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    steps.forEach(s => all[s.id] = true);
    setExpandedMap(all);
  };

  const collapseAll = () => {
    const none: Record<string, boolean> = {};
    steps.forEach(s => none[s.id] = false);
    setExpandedMap(none);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-darkblue-900 border border-darkblue-700 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-accent">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-cream-100 uppercase tracking-wider font-sans">
              Explain Every Part — Step-by-Step Curriculum
            </h3>
            <p className="text-[11px] text-cream-400">
              Walk through every line from top to bottom like a textbook
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-[11px] font-semibold text-gold-accent hover:text-gold-300 px-2 py-1 rounded bg-darkblue-800 border border-darkblue-700 transition-all"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-[11px] font-semibold text-cream-300 hover:text-cream-100 px-2 py-1 rounded bg-darkblue-800 border border-darkblue-700 transition-all"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion Steps List */}
      <div className="flex flex-col gap-2.5">
        {steps.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isExpanded = Boolean(expandedMap[step.id]);

          return (
            <div
              key={step.id}
              className={`rounded-xl transition-all border ${
                isCurrent
                  ? 'cream-card ring-2 ring-gold-accent/80 shadow-xl'
                  : 'bg-cream-50 border-cream-250 shadow-sm hover:border-cream-300'
              }`}
            >
              {/* Accordion Header */}
              <div 
                onClick={() => {
                  toggleStep(step.id);
                  onSelectStep(idx);
                }}
                className={`w-full px-4 py-3 flex items-center justify-between cursor-pointer rounded-t-xl transition-all ${
                  isCurrent ? 'bg-cream-150' : 'hover:bg-cream-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-sm ${
                    isCurrent 
                      ? 'bg-gold-500 text-darkblue-950 font-extrabold ring-2 ring-gold-400' 
                      : 'bg-cream-250 text-darkblue-900'
                  }`}>
                    {step.stepNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-darkblue-950 font-sans">
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-gold-500 text-darkblue-950">
                          Active Target
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-cream-700/80 font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStep(idx);
                    }}
                    className="p-1 rounded bg-cream-200 hover:bg-cream-300 text-darkblue-900 text-[11px] font-semibold flex items-center gap-1 transition-all"
                    title="Focus Teacher On This Part"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Focus</span>
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-darkblue-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-darkblue-700" />
                  )}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-cream-200 text-xs text-darkblue-950 flex flex-col gap-3">
                  {/* Original Information Snippet */}
                  <div className="p-2.5 rounded-lg bg-cream-100 border border-cream-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cream-700 block mb-0.5">
                      Original Document Text:
                    </span>
                    <p className="font-mono font-medium text-darkblue-950 text-xs">
                      "{step.whatDoesItSay}"
                    </p>
                  </div>

                  {/* Simple Explanation */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                      Simple Explanation:
                    </span>
                    <p className="text-darkblue-900 leading-relaxed font-sans">
                      {step.simpleExplanation}
                    </p>
                  </div>

                  {/* Why Does This Matter? */}
                  <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/80">
                    <strong className="text-blue-900 font-bold block mb-0.5">
                      Why does this matter?
                    </strong>
                    <p className="text-blue-950 text-xs leading-relaxed">
                      {step.whyDoesItMatter}
                    </p>
                  </div>

                  {/* Facts vs Interpretation */}
                  <div className="text-[11px] text-cream-800 flex items-start gap-1.5 pt-1 border-t border-cream-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-cream-700 flex-shrink-0 mt-0.5" />
                    <span><strong>Fact vs Interpretation: </strong>{step.factsVsInterpretation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
