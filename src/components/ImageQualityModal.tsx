import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  UploadCloud, 
  ArrowRight, 
  Eye, 
  Sun, 
  Sparkles, 
  RotateCw,
  ShieldAlert
} from 'lucide-react';
import { QualityCheckResult } from '../types/medscript';

interface ImageQualityModalProps {
  quality: QualityCheckResult;
  filename: string;
  onProceed: () => void;
  onRetake: () => void;
  onUploadAnother: () => void;
}

export const ImageQualityModal: React.FC<ImageQualityModalProps> = ({
  quality,
  filename,
  onProceed,
  onRetake,
  onUploadAnother
}) => {
  const isFailed = quality.status === 'fail';
  const isWarning = quality.status === 'warning';
  const isPassed = quality.status === 'pass';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-md ${
            isFailed
              ? 'bg-rose-100 text-rose-600'
              : isWarning
              ? 'bg-amber-100 text-amber-600'
              : 'bg-teal-100 text-teal-600'
          }`}>
            {isFailed ? (
              <ShieldAlert className="w-8 h-8" />
            ) : isWarning ? (
              <AlertTriangle className="w-8 h-8" />
            ) : (
              <CheckCircle2 className="w-8 h-8" />
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            {isFailed
              ? "We can't read this reliably"
              : isWarning
              ? 'Document Clarity Warning'
              : 'Image Quality Verified'}
          </h3>

          <p className="text-xs text-slate-500 mt-1 truncate max-w-xs mx-auto">
            {filename}
          </p>
        </div>

        {/* Quality Score Gauge */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Pre-OCR Optical Score</span>
            <span className={`text-sm font-extrabold ${
              isFailed ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-teal-600'
            }`}>
              {quality.overallScore} / 100
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFailed ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${quality.overallScore}%` }}
            />
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-slate-400 block mb-0.5">Sharpness</span>
              <span className="font-bold text-slate-800">{quality.blurScore}%</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-slate-400 block mb-0.5">Luminance</span>
              <span className="font-bold text-slate-800">{quality.darknessScore}%</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-slate-400 block mb-0.5">Glare Shield</span>
              <span className="font-bold text-slate-800">{quality.glareScore}%</span>
            </div>
          </div>
        </div>

        {/* Issues List (If Any) */}
        {quality.issues.length > 0 && (
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-left mb-5">
            <span className="text-xs font-bold text-rose-900 block mb-1">
              Optical Quality Issues Detected:
            </span>
            <ul className="list-disc list-inside space-y-1 text-xs text-rose-800">
              {quality.issues.map((issue, idx) => (
                <li key={idx} className="font-medium">
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions / Guidance */}
        {quality.suggestions.length > 0 && (
          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-left mb-6 text-xs text-sky-900">
            <span className="font-bold block mb-1">Recommendation:</span>
            {quality.suggestions.map((sug, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                • {sug}
              </p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {isFailed ? (
            <>
              <button
                onClick={onUploadAnother}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Upload Another
              </button>
              <button
                onClick={onRetake}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition"
              >
                <Camera className="w-4 h-4" />
                Retake Photo
              </button>
              <button
                onClick={onProceed}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition"
              >
                Proceed with OCR Anyway
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              {isWarning && (
                <button
                  onClick={onRetake}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Retake Photo
                </button>
              )}
              <button
                onClick={onProceed}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs font-bold bg-medblue-600 hover:bg-medblue-700 text-white shadow-medical transition"
              >
                Proceed to Medical OCR
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
