import React, { useState } from 'react';
import { 
  Stethoscope, 
  ClipboardList, 
  Microscope, 
  BarChart3, 
  BookOpen, 
  AlertTriangle, 
  Lightbulb, 
  Ban, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ProcessedDocument } from '../types/medscript';

export interface MedicalExplanationModeProps {
  document: ProcessedDocument;
}

export const MedicalExplanationMode: React.FC<MedicalExplanationModeProps> = ({ document }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true,
    sec5: false,
    sec6: true,
    sec7: false,
    sec8: true,
    sec9: false
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isHepatitis = document.id === 'demo-hepatitis-hbsag' || document.name.toLowerCase().includes('hepatitis');

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-darkblue-850 via-darkblue-800 to-darkblue-850 border border-darkblue-700 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-cream-50 uppercase tracking-wider font-sans flex items-center gap-2">
              <span>Medical Explanation Mode</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                Clinical Safety Active
              </span>
            </h3>
            <p className="text-xs text-cream-300">
              Clear, patient-friendly medical explanation without diagnosis or medical jargon.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const allOpen = Object.values(expandedSections).every(v => v);
            setExpandedSections({
              sec1: !allOpen,
              sec2: !allOpen,
              sec3: !allOpen,
              sec4: !allOpen,
              sec5: !allOpen,
              sec6: !allOpen,
              sec7: !allOpen,
              sec8: !allOpen,
              sec9: !allOpen
            });
          }}
          className="text-xs text-gold-accent hover:text-gold-400 font-semibold px-2 py-1 rounded bg-darkblue-900 border border-darkblue-700 transition-all"
        >
          {Object.values(expandedSections).every(v => v) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* 9 Structured Medical Sections */}

      {/* 1. What is this document? */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec1')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🩺</span>
            <span className="font-extrabold text-darkblue-900">1. What is this document?</span>
          </div>
          {expandedSections.sec1 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec1 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            <p className="mb-2">
              <strong>Official Classification: </strong>{document.detectedCategoryLabel || 'Diagnostic Medical Document'}.
            </p>
            <p>
              {document.explanation.breakdown.whatIsThis}
            </p>
          </div>
        )}
      </div>

      {/* 2. What does each part mean? */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec2')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📋</span>
            <span className="font-extrabold text-darkblue-900">2. What does each part mean?</span>
          </div>
          {expandedSections.sec2 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec2 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50 space-y-2">
            <div className="p-2.5 rounded-lg bg-cream-150 border border-cream-300">
              <strong className="text-darkblue-950 block mb-0.5">Top Header:</strong>
              Laboratory accreditation details (NABL / ISO), patient name, and sample verification barcode.
            </div>
            <div className="p-2.5 rounded-lg bg-cream-150 border border-cream-300">
              <strong className="text-darkblue-950 block mb-0.5">Investigation Row:</strong>
              Lists the biological substance tested, observed machine reading, laboratory cutoff limit, and qualitative status.
            </div>
            <div className="p-2.5 rounded-lg bg-cream-150 border border-cream-300">
              <strong className="text-darkblue-950 block mb-0.5">Pathologist Remarks &amp; Signatures:</strong>
              Contextual notes written by the consultant virologist or pathologist and digital authentication signatures.
            </div>
          </div>
        )}
      </div>

      {/* 3. Understanding the tests */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec3')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔬</span>
            <span className="font-extrabold text-darkblue-900">3. Understanding the tests</span>
          </div>
          {expandedSections.sec3 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec3 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            {isHepatitis ? (
              <div>
                <p className="mb-2">
                  <strong>HBsAg (Hepatitis B Surface Antigen): </strong>
                  The Hepatitis B virus is encapsulated by an outer envelope containing a specific protein called surface antigen (HBsAg).
                </p>
                <p>
                  When a laboratory tests your blood for HBsAg, it is searching for this specific outer viral coat. Detecting it indicates active infection. Not detecting it (Non-Reactive) means the marker was absent.
                </p>
              </div>
            ) : (
              <p>
                {document.labFindings && document.labFindings.length > 0 
                  ? document.labFindings.join(', ')
                  : 'Diagnostic laboratory parameters tested in this requisition.'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 4. Understanding the numbers & cutoffs */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec4')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📊</span>
            <span className="font-extrabold text-darkblue-900">4. Understanding the numbers &amp; cutoffs</span>
          </div>
          {expandedSections.sec4 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec4 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            {isHepatitis ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800">Your Observed Value:</span>
                  <span className="font-mono font-bold text-emerald-900">0.35 S/CO</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-800">Laboratory Cutoff Threshold:</span>
                  <span className="font-mono font-bold text-amber-900">&lt; 0.90 S/CO</span>
                </div>
                <p className="mt-2 text-darkblue-900">
                  Because 0.35 is below 0.90, this falls completely within the Non-Reactive zone. The unit S/CO stands for Signal-to-Cutoff ratio, which is the optical luminescence emitted during the test.
                </p>
              </div>
            ) : (
              <p>
                Reference ranges indicate the interval within which the vast majority of healthy individuals fall. Values slightly outside ranges should be reviewed with your doctor.
              </p>
            )}
          </div>
        )}
      </div>

      {/* 5. Medical terms explained */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec5')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📖</span>
            <span className="font-extrabold text-darkblue-900">5. Medical terms &amp; abbreviations explained</span>
          </div>
          {expandedSections.sec5 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec5 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50 space-y-2">
            <div>
              <strong>Non-Reactive: </strong>The test searched for the biological substance and found none above the lab cutoff (equivalent to negative).
            </div>
            <div>
              <strong>Antigen: </strong>A foreign substance or viral protein that stimulates the immune system.
            </div>
            <div>
              <strong>Antibody: </strong>A protective protein made by your body's immune system to neutralize antigens.
            </div>
            <div>
              <strong>CMIA: </strong>Chemiluminescent Microparticle Immunoassay, a gold-standard automated test using light signals.
            </div>
          </div>
        )}
      </div>

      {/* 6. Important notes */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec6')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">⚠️</span>
            <span className="font-extrabold text-darkblue-900">6. Important notes &amp; caveats</span>
          </div>
          {expandedSections.sec6 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec6 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50 space-y-2">
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200">
              <strong className="text-amber-900">Vaccination Caveat: </strong>
              This test measures active virus antigen, NOT vaccine protection. If you received the Hepatitis B vaccine, you will still test Non-Reactive for HBsAg. Vaccine immunity is checked by a separate test called Anti-HBs.
            </div>
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200">
              <strong className="text-amber-900">Window Period: </strong>
              If exposure occurred very recently (within 2-4 weeks), viral antigens might not yet be present in measurable amounts.
            </div>
          </div>
        )}
      </div>

      {/* 7. What this report can tell you */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec7')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">💡</span>
            <span className="font-extrabold text-darkblue-900">7. What this report can tell you</span>
          </div>
          {expandedSections.sec7 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec7 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            <ul className="list-disc pl-5 space-y-1">
              <li>It shows that at the time of sample collection, Hepatitis B surface antigen was not detected.</li>
              <li>It confirms your machine index was 0.35 against the 0.90 non-reactive threshold.</li>
              <li>It provides an objective baseline for your official health record.</li>
            </ul>
          </div>
        )}
      </div>

      {/* 8. What this report cannot tell you */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec8')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🚫</span>
            <span className="font-extrabold text-darkblue-900">8. What this report cannot tell you</span>
          </div>
          {expandedSections.sec8 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec8 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            <ul className="list-disc pl-5 space-y-1">
              <li>It cannot diagnose your overall liver health (that requires liver enzymes ALT, AST, Bilirubin, Ultrasound).</li>
              <li>It cannot determine whether you have immunity from a prior vaccination.</li>
              <li>It cannot rule out very recent exposure acquired during the early incubation window period.</li>
            </ul>
          </div>
        )}
      </div>

      {/* 9. When professional interpretation is needed */}
      <div className="rounded-xl bg-cream-50 border border-cream-250 shadow-md overflow-hidden text-darkblue-950">
        <button
          onClick={() => toggleSection('sec9')}
          className="w-full px-4 py-3 bg-cream-100/80 hover:bg-cream-150 flex items-center justify-between text-left font-bold text-sm transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">👨‍⚕️</span>
            <span className="font-extrabold text-darkblue-900">9. When professional interpretation is needed</span>
          </div>
          {expandedSections.sec9 ? <ChevronUp className="w-4 h-4 text-cream-700" /> : <ChevronDown className="w-4 h-4 text-cream-700" />}
        </button>
        {expandedSections.sec9 && (
          <div className="p-4 text-xs leading-relaxed text-darkblue-900 border-t border-cream-200 bg-cream-50">
            <p className="mb-2">
              Always share this laboratory report with your treating physician <strong>Dr. K. M. Rao</strong>. Professional medical consultation is especially indicated if:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You have symptoms such as jaundice (yellowing eyes/skin), dark urine, or upper right abdominal pain.</li>
              <li>You had potential high-risk viral exposure in the preceding 6 weeks.</li>
              <li>You want to check your antibody protection titer following hepatitis B vaccination.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
