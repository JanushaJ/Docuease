import React from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Globe, 
  UploadCloud, 
  Pill,
  ShieldCheck
} from 'lucide-react';
import { ProcessedDocument } from '../types/medscript';

interface HistoryViewProps {
  documents: ProcessedDocument[];
  onSelectDoc: (doc: ProcessedDocument) => void;
  onDeleteDoc: (docId: string) => void;
  onNavigateUpload: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  documents,
  onSelectDoc,
  onDeleteDoc,
  onNavigateUpload
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-medblue-50 text-medblue-600 flex items-center justify-center border border-medblue-200">
            <HistoryIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Document History &amp; Verified Records
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Locally persisted prescription interpretations stored in your private SQLite database
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateUpload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-medblue-600 hover:bg-medblue-700 text-white transition shadow-sm self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          Upload New Document
        </button>
      </div>

      {/* Document List */}
      {documents.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 opacity-60" />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-800">
              No Medical Documents in History
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Upload a prescription or medical report. Your analyzed and verified clinical documents will appear here.
            </p>
          </div>
          <button
            onClick={onNavigateUpload}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-medblue-600 text-white hover:bg-medblue-700 transition"
          >
            Upload Document Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-base text-slate-900 truncate">
                      {doc.name}
                    </span>
                    {doc.isDemo && (
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-sky-100 text-sky-800 rounded-full">
                        Demo
                      </span>
                    )}
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 flex-shrink-0 ${
                    doc.allUncertainResolved
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {doc.allUncertainResolved ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Needs Review
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {doc.explanation?.simpleSummary || 'Medical document analyzed and verified.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium pt-3 mt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    {doc.selectedLanguage?.toUpperCase() || 'EN'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-medblue-500" />
                    {doc.structuredMeds?.length || 0} Medicines
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectDoc(doc)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-medblue-600 hover:bg-medblue-700 text-white transition shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View &amp; Ask AI Doctor
                </button>

                <button
                  onClick={() => onDeleteDoc(doc.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Permanently Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Documents are stored securely in local SQLite storage and are never made publicly accessible.
        </span>
      </div>

    </div>
  );
};
