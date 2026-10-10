import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  FileCheck,
  ChevronLeft
} from 'lucide-react';

export interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-slate-800">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold mb-6 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Application</span>
      </button>

      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-3 border border-teal-200">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>DocuEase AI Security Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy, Data Security &amp; Medical Safety Policy
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            How we protect personal information, process documents securely in memory, and ensure ethical AI document understanding.
          </p>
        </div>

        {/* Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Ephemeral Processing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your uploaded document files and OCR transcriptions are processed strictly in temporary volatile memory. 
              We do not permanently archive medical prescriptions or utility bills.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Server-Side Key Leaks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All AI API keys and OCR service credentials remain encrypted on the server environment. 
              No private credentials are ever transmitted or exposed to browser client code.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instant Local Reset</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whenever you click "Process Another Document" or navigate away, memory references to your 
              document and raw base64 data are cleanly terminated.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              <span>1. Medical Prescriptions &amp; Clinical Safety Disclaimers</span>
            </h2>
            <p>
              DocuEase AI uses optical handwriting recognition and multimodal language models to assist in reading 
              and understanding medical prescriptions. <strong>It does not diagnose medical conditions, prescribe medication, 
              or replace professional advice from a licensed physician or pharmacist.</strong>
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
              "This AI helps you read and understand a prescription. It does not verify a diagnosis or replace advice 
              from a doctor or pharmacist. Confirm unclear medicine names and dosages with a qualified healthcare 
              professional before taking medication."
            </div>
            <p>
              We enforce a strict <strong>Zero-Guessing Policy</strong>: Any handwriting strokes with low OCR confidence 
              are marked explicitly as "Needs verification" rather than guessed or silently autocorrected into a different drug.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>2. Disclosure of External AI Processing</span>
            </h2>
            <p>
              To transcribe complex handwriting and generate translations across 11 Indian languages, DocuEase AI 
              communicates securely with Google Gemini Vision API and optical OCR engines via HTTPS. Document payloads 
              are sent solely for real-time inference and are not retained to train public models.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-600" />
              <span>3. Financial &amp; Utility Documents</span>
            </h2>
            <p>
              When simplifying electricity bills, bank letters, or government circulars, DocuEase AI extracts numbers 
              (such as tariff fees, kWh readings, due dates, and account references) verbatim. The application includes 
              mandatory anti-scam advisories for all banking communications reminding citizens never to disclose OTPs 
              or passwords.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-teal-600" />
              <span>4. Regulatory Disclaimers</span>
            </h2>
            <p>
              DocuEase AI does not claim HIPAA certification, medical device CE mark, FDA clearance, or ISO regulatory accreditation. 
              It is an accessibility-oriented assistive platform intended to improve document literacy across multilingual communities.
            </p>
          </section>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-sm"
          >
            Return to DocuEase AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
