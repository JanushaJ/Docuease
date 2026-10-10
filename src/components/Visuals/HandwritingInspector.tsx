import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert,
  ZoomIn,
  Check,
  X
} from 'lucide-react';
import { UncertainWord } from '../../types/medscript';

export interface HandwritingInspectorProps {
  uncertainWords?: UncertainWord[];
  onConfirmWord?: (id: string, text: string) => void;
}

export const HandwritingInspector: React.FC<HandwritingInspectorProps> = ({
  uncertainWords = [],
  onConfirmWord
}) => {
  // Demo default uncertain item (e.g. Doctor cursive "Leukopenia" or "Amoxicillin")
  const defaultItems: UncertainWord[] = uncertainWords.length > 0 ? uncertainWords : [
    {
      id: 'unc-1',
      originalOcrWord: 'Leukopenia',
      extractedText: 'Leukopenia',
      candidates: ['Leukopenia', 'Lymphopenia', 'Leukocytosis'],
      alternatives: ['Leukopenia', 'Lymphopenia', 'Leukocytosis'],
      confidence: 0.62,
      cropImageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="90" viewBox="0 0 280 90"><rect width="280" height="90" fill="#fefce8" stroke="#f59e0b" stroke-width="2" rx="8"/><text x="20" y="24" font-family="Arial" font-size="11" font-weight="bold" fill="#b45309">ORIGINAL DOCTOR INK STROKE</text><text x="35" y="62" font-family="'Caveat', cursive, sans-serif" font-size="36" fill="#172554">Leukopenia</text><rect x="195" y="10" width="75" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b"/><text x="202" y="24" font-family="Arial" font-size="10" font-weight="bold" fill="#b45309">Conf: 62%</text></svg>`),
      sourceCropUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="90" viewBox="0 0 280 90"><rect width="280" height="90" fill="#fefce8" stroke="#f59e0b" stroke-width="2" rx="8"/><text x="20" y="24" font-family="Arial" font-size="11" font-weight="bold" fill="#b45309">ORIGINAL DOCTOR INK STROKE</text><text x="35" y="62" font-family="'Caveat', cursive, sans-serif" font-size="36" fill="#172554">Leukopenia</text><rect x="195" y="10" width="75" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b"/><text x="202" y="24" font-family="Arial" font-size="10" font-weight="bold" fill="#b45309">Conf: 62%</text></svg>`),
      selectedCandidate: 'Leukopenia',
      isResolved: false
    }
  ];

  const [items, setItems] = useState<UncertainWord[]>(defaultItems);
  const [selectedWord, setSelectedWord] = useState<string>(items[0]?.selectedCandidate || items[0]?.userSelectedText || 'Leukopenia');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = (candidate: string) => {
    setSelectedWord(candidate);
    setIsVerified(true);
    if (onConfirmWord && items[0]) {
      onConfirmWord(items[0].id, candidate);
    }
  };

  const item = items[0];
  if (!item) return null;

  return (
    <div className="w-full p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 shadow-xl">
      {/* Alert Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-500/30">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Handwriting Intelligence &amp; Confidence Gate
            </h4>
            <p className="text-[11px] text-cream-400">Never silently converts uncertain cursive into false certainty</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Confidence: {Math.round(item.confidence * 100)}% (Low)
        </span>
      </div>

      {/* Visual Crop of Ink Stroke */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Original Ink Snippet */}
        <div className="w-full sm:w-1/2 flex flex-col items-center">
          <div className="text-[11px] font-bold text-cream-300 mb-1.5 flex items-center gap-1">
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Original Physical Ink Stroke:</span>
          </div>
          <div className="w-full rounded-lg overflow-hidden border border-amber-500/40 shadow-md bg-cream-50 flex items-center justify-center p-1">
            <img
              src={item.cropImageUrl || item.sourceCropUrl || ''}
              alt="Handwriting Crop"
              className="w-full h-auto max-h-[90px] object-contain rounded"
            />
          </div>
        </div>

        {/* AI Confidence & Verification Card */}
        <div className="w-full sm:w-1/2 flex flex-col gap-2">
          <div className="text-[11px] font-bold text-cream-300">
            AI Optical Readings:
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(item.candidates || item.alternatives || ['Leukopenia', 'Lymphopenia']).map((cand, idx) => {
              const isChosen = selectedWord === cand;
              return (
                <button
                  key={idx}
                  onClick={() => handleVerify(cand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isChosen
                      ? 'bg-amber-500 text-darkblue-950 border-amber-400 font-bold shadow-md'
                      : 'bg-darkblue-900/80 text-cream-200 border-darkblue-700 hover:border-amber-400/50'
                  }`}
                >
                  {isChosen && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{cand}</span>
                </button>
              );
            })}
          </div>

          {/* Verification Status */}
          {isVerified ? (
            <div className="mt-1 p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified as: <strong>{selectedWord}</strong></span>
            </div>
          ) : (
            <div className="mt-1 p-2 rounded bg-darkblue-900/90 border border-amber-500/30 text-cream-300 text-[11px] leading-relaxed">
              <span className="text-amber-300 font-bold">Please verify: </span>
              Inspect original paper to confirm if this word says "{selectedWord}".
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice Footer */}
      <div className="mt-3 pt-2 border-t border-amber-500/20 text-[11px] text-amber-200/90 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span>Anti-Hallucination Rule: Unclear doctor notes are never guessed without human verification.</span>
      </div>
    </div>
  );
};
