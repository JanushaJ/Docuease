import React from 'react';
import { 
  X, 
  History, 
  Trash2, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  Globe
} from 'lucide-react';
import { ProcessedDocument } from '../types/medscript';

interface DocumentHistoryModalProps {
  documents: ProcessedDocument[];
  onSelectDoc: (doc: ProcessedDocument) => void;
  onDeleteDoc: (docId: string) => void;
  onClose: () => void;
}

export const DocumentHistoryModal: React.FC<DocumentHistoryModalProps> = ({
  documents,
  onSelectDoc,
  onDeleteDoc,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                My Documents
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Session history of analyzed medical records
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

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {documents.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No documents uploaded yet in this session.</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-medblue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900 truncate max-w-xs">
                      {doc.name}
                    </span>
                    {doc.isDemo && (
                      <span className="px-2 py-0.2 text-[9px] font-bold uppercase bg-sky-100 text-sky-800 rounded-full">
                        Demo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      {doc.selectedLanguage.toUpperCase()}
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      doc.allUncertainResolved ? 'text-teal-700' : 'text-amber-700'
                    }`}>
                      {doc.allUncertainResolved ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Fully Verified
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" /> Needs Review
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onSelectDoc(doc);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-medblue-600 hover:bg-medblue-700 text-white transition shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>

                  <button
                    onClick={() => onDeleteDoc(doc.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
