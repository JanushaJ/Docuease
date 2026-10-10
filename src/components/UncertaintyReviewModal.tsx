import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  PenTool,
  Lock
} from 'lucide-react';
import { UncertainWord } from '../types/medscript';

interface UncertaintyReviewModalProps {
  uncertainWords: UncertainWord[];
  onConfirm: (uncertainId: string, selection: string) => void;
  onFinishReview: () => void;
}

export const UncertaintyReviewModal: React.FC<UncertaintyReviewModalProps> = ({
  uncertainWords,
  onConfirm,
  onFinishReview
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const currentUncertain = uncertainWords[currentIdx];
  const isLast = currentIdx >= uncertainWords.length - 1;

  const handleSelect = (selection: string) => {
    if (!currentUncertain) return;
    onConfirm(currentUncertain.id, selection);
    if (!isLast) {
      setCurrentIdx((prev) => prev + 1);
      setShowCustomInput(false);
      setCustomInput('');
    } else {
      onFinishReview();
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    handleSelect(customInput.trim());
  };

  if (!currentUncertain) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Top Warning Banner */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ⚠️ Unclear Handwriting Detected
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Word {currentIdx + 1} of {uncertainWords.length} requiring verification
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-50 rounded-full border border-amber-200">
            Conf: {currentUncertain.confidence}%
          </span>
        </div>

        {/* Major Differentiator Alert */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left mb-5">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              <strong>Zero-Guessing Safety Rule: </strong>
              Never silently guess unclear handwriting. Krishxtattva isolates this word and asks for your confirmation before including it in the explanation.
            </p>
          </div>
        </div>

        {/* Original Handwriting Crop Preview */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-medblue-600" />
              Original Doctor Handwriting Crop:
            </span>
            <span className="text-[10px] text-slate-400">High-Resolution Segment</span>
          </div>

          <div className="w-full rounded-2xl bg-amber-50/40 border border-amber-200 p-3 flex items-center justify-center overflow-hidden shadow-inner">
            <img
              src={currentUncertain.sourceCropUrl}
              alt="Handwriting Crop"
              className="max-h-24 object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Context Sentence */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-5 text-left">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Prescription Context:
          </span>
          <p className="text-xs sm:text-sm text-slate-800 font-medium italic">
            "{currentUncertain.sentenceContext}"
          </p>
        </div>

        {/* Prompt Question */}
        <div className="text-center mb-4">
          <h4 className="text-sm sm:text-base font-bold text-slate-900">
            {currentUncertain.question}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose what the doctor intended, or select "I'm not sure" to keep it unconfirmed.
          </p>
        </div>

        {/* Choice Buttons */}
        <div className="space-y-2.5 mb-5">
          {currentUncertain.alternatives.map((alt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(alt)}
              className={`w-full py-3 px-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all ${
                alt === currentUncertain.extractedText
                  ? 'bg-sky-50 border-medblue-300 text-medblue-900 hover:bg-sky-100 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{alt}</span>
              <span className="text-[11px] font-semibold text-slate-500">
                {alt === currentUncertain.extractedText ? `AI Initial Read (${currentUncertain.confidence}%)` : 'Clinical Alternative'}
              </span>
            </button>
          ))}

          {/* "I'm not sure" Safe Option */}
          <button
            onClick={() => handleSelect("I'm not sure")}
            className="w-full py-3 px-4 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-900 text-sm font-bold flex items-center justify-between transition"
          >
            <span>I'm not sure</span>
            <span className="text-[11px] text-amber-700 font-medium">Keep unconfirmed &amp; flag for doctor</span>
          </button>
        </div>

        {/* Custom Manual Entry Option */}
        {!showCustomInput ? (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="text-xs text-medblue-600 hover:text-medblue-700 font-semibold underline block mx-auto mb-2"
          >
            Type a different word or dosage manually
          </button>
        ) : (
          <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter exact medical term or dosage..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-medblue-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-medblue-600 hover:bg-medblue-700 disabled:opacity-50 text-white"
            >
              Confirm
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
