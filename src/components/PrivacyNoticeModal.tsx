import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Key, 
  Trash2, 
  FileCheck,
  Server,
  AlertCircle
} from 'lucide-react';

interface PrivacyNoticeModalProps {
  onClose: () => void;
  onDeleteCurrentDocument?: () => void;
  hasActiveDocument: boolean;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({
  onClose,
  onDeleteCurrentDocument,
  hasActiveDocument
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Privacy &amp; Medical Data Security
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Document privacy & accessibility standards in MedScript AI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Commitments */}
        <div className="space-y-3.5 mb-6 text-xs text-slate-700">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Lock className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 block mb-0.5">Strict Private Isolation</strong>
              Uploaded medical documents are processed in private memory sessions and are never published or publicly indexed.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Key className="w-4 h-4 text-medblue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 block mb-0.5">Server-Side Credentials</strong>
              All OCR and LLM API keys remain securely on the backend server. No credentials or secret keys are ever exposed in frontend client code.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Server className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 block mb-0.5">No Patient Data Resale or Training</strong>
              Your prescriptions and clinical notes are never used for training third-party public models or shared with insurance brokers.
            </div>
          </div>

        </div>

        {/* Delete Document Action (Memory Wipe) */}
        {hasActiveDocument && onDeleteCurrentDocument && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 mb-6">
            <h4 className="text-xs font-bold text-rose-900 mb-1 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4 text-rose-600" />
              Purge Active Document from Session Memory
            </h4>
            <p className="text-[11px] text-rose-700 mb-3">
              Instantly wipes the currently loaded document, its extracted OCR tokens, audio speech cues, and translations.
            </p>
            <button
              onClick={() => {
                onDeleteCurrentDocument();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm"
            >
              Permanently Delete Document Now
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
