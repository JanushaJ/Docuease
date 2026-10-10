import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Languages, 
  Volume2, 
  Stethoscope, 
  FileSpreadsheet, 
  Building2, 
  GraduationCap, 
  Scale, 
  PenTool, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  Lock,
  Layers,
  HelpCircle
} from 'lucide-react';
import { ActivePage } from '../Header';

interface AboutViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>About Krishxtattva &bull; AI Document Accessibility</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Complex documents. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-medblue-600 to-indigo-600">Clear understanding.</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
          “A person should not need to be medically trained, financially knowledgeable, or fluent in formal English just to understand a document that affects their everyday life.”
        </p>
      </div>

      {/* The Core Engineering Principle (Section 39) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="text-xs font-black uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            Our Architectural Differentiator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            “Krishxtattva does NOT ask an LLM to make the final safety-critical decision.”
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In healthcare, finance, and official administration, language models are prone to hallucinating plausible-sounding details. Krishxtattva decouples understanding from verification through a deterministic validation engine:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-teal-300 block mb-1">1. AI Extracts &amp; Explains</span>
              <p className="text-2xs text-slate-300">Gemini vision and OCR read messy handwriting and extract structured fields.</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-amber-300 block mb-1">2. Deterministic Code Validates</span>
              <p className="text-2xs text-slate-300">Rule-based engines verify drug-drug interactions, duplicate doses, and amounts against trusted clinical sources.</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-emerald-300 block mb-1">3. Humans Hold Authority</span>
              <p className="text-2xs text-slate-300">Unclear text is flagged explicitly. Warnings show reasons and traceable references.</p>
            </div>
          </div>
        </div>
      </div>

      {/* The 6-Layer Universal Processing Pipeline */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Architecture</span>
          <h2 className="text-2xl font-black text-slate-900">How Krishxtattva Processes Any Document</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              title: 'Image Preprocessing & Quality Gate',
              desc: 'Contrast normalization, rotation correction, brightness boost, and binarization for faint handwriting strokes.'
            },
            {
              step: '02',
              title: 'Multimodal Vision & Classification',
              desc: 'Automatically classifies document into Medical, Bills, Banking, Government, Education, Legal, or General categories.'
            },
            {
              step: '03',
              title: 'Structured Fact Extraction',
              desc: 'Extracts exact quantities, dates, names, account numbers, test values, and medication directions into strict JSON.'
            },
            {
              step: '04',
              title: 'Deterministic Safety Rule Engine',
              desc: 'Checks for duplicate drugs, known interactions (e.g. Aspirin + Ibuprofen), and bank scam alerts without hallucination.'
            },
            {
              step: '05',
              title: '3-Level Plain-Language Simplification',
              desc: 'Produces Original, Simple, and Very Simple explanations (1st-grade reading level) for users with limited literacy.'
            },
            {
              step: '06',
              title: 'Multilingual Audio & KrishBuddy Avatar',
              desc: 'Generates natural voice in 11 Indian languages with real-time synchronized subtitles and animated character guidance.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition">
              <span className="text-xs font-black text-teal-600 font-mono block mb-1">{item.step}</span>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zero Guessing Policy */}
      <div className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Zero-Guessing Guarantee for Unclear Handwriting &amp; Values</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          If a doctor’s handwriting, laboratory measurement, or bank figure is smudged or ambiguous, Krishxtattva <strong>never silently invents a value</strong>. It explicitly alerts the user with:
        </p>
        <blockquote className="bg-white p-3.5 rounded-xl border border-amber-200 font-medium text-xs text-amber-950 italic">
          “Could not confidently read this part. Please verify with your doctor, pharmacist, or issuing office.”
        </blockquote>
      </div>

      {/* Official Medical & Legal Safety Disclaimer */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3 text-center max-w-3xl mx-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Safety Notice</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Krishxtattva is an intelligent accessibility and decision-support tool. It does not replace a doctor, pharmacist, laboratory professional, lawyer, or other qualified healthcare professional. Always verify unclear prescriptions, medication dosages, and official deadlines with a licensed expert.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('upload')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25 transition active:scale-95"
        >
          <span>Try Krishxtattva With Your Document</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
