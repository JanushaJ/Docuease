import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Languages, 
  Stethoscope, 
  FileText, 
  Activity, 
  Eye, 
  Volume2, 
  HelpCircle,
  Play,
  RotateCcw,
  Check,
  Zap,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { ProcessedDocument, SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/medscript';
import { getHepatitisDocument } from '../data/hepatitisDemo';

export interface MedScriptLandingProps {
  onSelectDemoDocument: (doc: ProcessedDocument) => void;
  onUploadFile: (file: File) => void;
  isProcessing: boolean;
  processingStage?: string;
  processingProgress?: number;
  demoDocuments: ProcessedDocument[];
}

export const MedScriptLanding: React.FC<MedScriptLandingProps> = ({
  onSelectDemoDocument,
  onUploadFile,
  isProcessing,
  processingStage = 'Scanning document...',
  processingProgress = 0,
  demoDocuments
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedDemoTab, setSelectedDemoTab] = useState<number>(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadFile(e.target.files[0]);
    }
  };

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Find demo documents
  const prescriptionDemo = demoDocuments.find(d => d.id === 'demo-doc-1' || d.name.toLowerCase().includes('prescription')) || demoDocuments[0];
  const hepatitisDemo = demoDocuments.find(d => d.id === 'demo-hepatitis-hbsag' || d.name.toLowerCase().includes('hepatitis')) || getHepatitisDocument();
  const dischargeDemo = demoDocuments.find(d => d.type === 'discharge_summary' || d.name.toLowerCase().includes('discharge') || d.name.toLowerCase().includes('prabha')) || demoDocuments[1] || getHepatitisDocument();

  const demoList = [
    {
      doc: prescriptionDemo,
      title: "Doctor's Handwritten Prescription",
      tag: "HANDWRITING OCR + UNCERTAINTY",
      icon: Stethoscope,
      badgeColor: "bg-medblue-50 text-medblue-700 border-medblue-200",
      description: "Dr. Suresh K. Mehta clinic notes with Metformin, Telmisartan, and the 'Leukopenia' (62% conf) vs 'Leukemia' uncertainty review.",
      highlights: ["Leukopenia vs Leukemia handwriting crop", "HbA1c: 7.2% management", "Metformin 500mg & Telmisartan 40mg"]
    },
    {
      doc: hepatitisDemo,
      title: "Diagnostic Laboratory Report",
      tag: "QUANTITATIVE LAB REPORT",
      icon: Activity,
      badgeColor: "bg-medteal-50 text-medteal-700 border-medteal-200",
      description: "Metropolis Virology Hepatitis B panel (HBsAg 0.35, Non-Reactive, Cutoff < 0.90 S/CO) with zero fabricated medications.",
      highlights: ["HBsAg: 0.35 Non-Reactive", "Cutoff Index < 0.90", "Vaccination Guidance"]
    },
    {
      doc: dischargeDemo,
      title: "Hospital Inpatient Discharge Summary",
      tag: "HOSPITAL CLINICAL RECORD",
      icon: FileText,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description: "Inpatient discharge instructions with post-operative vitals, scheduled discharge medications, and follow-up warnings.",
      highlights: ["Stable clinical vitals", "Post-op wound care directions", "Emergency red flags"]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-medblue-200/30 via-medteal-200/20 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6 animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-medteal-500 animate-ping" />
            <span className="text-xs font-bold text-slate-800 tracking-wide">
              Medical Document Understanding &bull; Multilingual Explainer
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none mb-4 font-sans">
            MedScript <span className="text-transparent bg-clip-text bg-gradient-to-r from-medblue-600 to-medteal-600">AI</span>
          </h1>

          {/* Core Slogan */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
            “Your doctor's handwriting. <span className="underline decoration-medteal-400 decoration-wavy decoration-2">Finally understandable.</span>”
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Upload a medical document, verify what was written, and hear a simple explanation in your preferred language from your 3D AI Doctor.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-medblue-600 to-medteal-600 hover:from-medblue-700 hover:to-medteal-700 text-white font-extrabold text-base shadow-medical hover:shadow-medical-hover transition-all flex items-center justify-center gap-2.5 active:scale-98 group cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
              <span>Upload Medical Document</span>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-base shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-5 h-5 text-medblue-600" />
              <span>Take a Photo</span>
            </button>

            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-medteal-600 fill-current" />
              <span>Try Demo</span>
            </button>
          </div>

          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Safety Note Alert */}
          <div className="max-w-2xl mx-auto p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-left shadow-xs">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                <strong>Medical Safety Note: </strong>
                MedScript AI explains information contained in uploaded documents. It does not replace a qualified healthcare professional or provide a medical diagnosis.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. VISUAL WORKFLOW: Upload -> Read -> Verify -> Translate -> Explain */}
      {/* ======================================================== */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-medblue-600 mb-2">
              End-to-End Accurate Processing
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How MedScript AI Understands Your Document
            </h3>
          </div>

          {/* 5-Step Workflow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 relative">
            
            {/* Step 1: Upload */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-medblue-300 hover:shadow-xs transition group">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
                📸
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Step 1
              </span>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Upload</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Photo or PDF of prescription, notes, or lab report.
              </p>
            </div>

            {/* Step 2: Read */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-medblue-300 hover:shadow-xs transition group">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
                🔍
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Step 2
              </span>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Read</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Optical stroke analysis &amp; handwriting detection.
              </p>
            </div>

            {/* Step 3: Verify (Highlighted Core Differentiator) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 text-center shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform text-amber-700">
                ✓
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Step 3 &bull; Core
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">Verify</h4>
              <p className="text-xs text-amber-900 font-medium leading-normal">
                Asks you to verify unclear words instead of guessing!
              </p>
            </div>

            {/* Step 4: Translate */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-medblue-300 hover:shadow-xs transition group">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
                🌍
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Step 4
              </span>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Translate</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Native Indian languages without losing medical meaning.
              </p>
            </div>

            {/* Step 5: Explain */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-medblue-50 to-white border border-medblue-200 text-center hover:shadow-xs transition group">
              <div className="w-12 h-12 rounded-xl bg-medblue-100 border border-medblue-300 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
                👨‍⚕️
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-medblue-600 block mb-1">
                Step 5 &bull; 3D Avatar
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">Explain</h4>
              <p className="text-xs text-slate-600 leading-normal">
                3D AI Doctor speaks the verified explanation clearly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CORE DIFFERENTIATOR: "ACCURACY FIRST"                 */}
      {/* ======================================================== */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Left Details */}
              <div className="flex-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>The MedScript AI Guarantee</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Accuracy First
                </h3>

                <p className="text-lg font-bold text-medblue-700 mb-3">
                  “When AI isn't sure, it asks you instead of guessing.”
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Standard AI document readers silently hallucinate medications or invent diagnoses when medical handwriting is cursive and unclear. MedScript AI isolates low-confidence strokes, presents the original crop, and prompts the user before anything enters the final medical explanation.
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Zero Guessing Rule
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    High-Res Crop Inspection
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Transparent Confidence Values
                  </span>
                </div>
              </div>

              {/* Right Visual Snippet: The Leukopenia Example */}
              <div className="w-full md:w-72 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-800">⚠️ Unclear handwriting</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    62% Confidence
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-amber-200 mb-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block mb-1">Doctor handwriting stroke:</span>
                  <span className="font-serif italic text-xl text-slate-900 font-bold block">
                    Leukopenia
                  </span>
                </div>

                <div className="text-[11px] text-slate-700 mb-2 font-medium">
                  <strong>AI reading:</strong> Leukopenia (62%)<br />
                  <strong>Possible alternative:</strong> Leukemia
                </div>

                <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-800 text-center">
                  “What did the doctor write?”
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. DRAG-AND-DROP UPLOAD ZONE                            */}
      {/* ======================================================== */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Upload Your Medical Document
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              For best accuracy, upload a clear image with the entire document visible.
            </p>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
              isDragOver
                ? 'border-medblue-500 bg-sky-50/50 shadow-md scale-[1.01]'
                : 'border-slate-300 hover:border-medblue-400 bg-slate-50/60 hover:bg-white shadow-xs'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-medblue-600 flex items-center justify-center mb-4 shadow-sm">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              Drag &amp; Drop your document here, or <span className="text-medblue-600 underline">Browse files</span>
            </h4>

            <p className="text-xs text-slate-500 max-w-sm mb-4">
              Supported formats: <strong>JPG, JPEG, PNG, PDF</strong> (up to 25MB)
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-teal-600" /> Prescriptions
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-teal-600" /> Lab Reports
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-teal-600" /> Discharge Summaries
              </span>
            </div>
          </div>

          {/* Quick instructions banner */}
          <div className="mt-4 p-3 rounded-xl bg-slate-100 text-slate-600 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Info className="w-4 h-4 text-medblue-600" />
              Tip: Avoid harsh shadows and glare over handwritten lines for maximum OCR precision.
            </span>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="text-medblue-700 font-bold hover:underline whitespace-nowrap ml-2"
            >
              Take Mobile Photo &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. DEMO MODE SECTION (Fictional Sample Documents)       */}
      {/* ======================================================== */}
      <section ref={demoSectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
              <span>FICTIONAL DEMO — NOT A REAL MEDICAL RECORD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Try Interactive Sample Records
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-1">
              Select any verified sample to test real OCR, uncertainty resolution, multilingual translation, and the 3D Doctor explainer.
            </p>
          </div>

          {/* Demo Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {demoList.map((demo, idx) => {
              const IconComp = demo.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${demo.badgeColor}`}>
                        {demo.tag}
                      </span>
                      <IconComp className="w-5 h-5 text-slate-400" />
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {demo.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {demo.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                      {demo.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Launch Button */}
                  <button
                    onClick={() => onSelectDemoDocument(demo.doc)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-medblue-600 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group"
                  >
                    <span>Launch Explanation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SIGNATURE FEATURES SUMMARY                           */}
      {/* ======================================================== */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Why MedScript AI is Built for Accuracy
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Engineered with medical safety rules and transparency at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-medblue-100 text-medblue-700 flex items-center justify-center mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                3D AI Doctor Explainer
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic 3D avatar with natural blinking, speaking gestures, and phonetic lip-sync in your chosen native language.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                “Show Me What AI Read”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect every detected bounding box, confidence percentage, and stroke region side-by-side with your original document.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Languages className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                8+ Indian Languages
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                English, Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, and Marathi with both written and spoken medical translation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                “Explain Like I'm 10”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                One-click toggle to simplify complex clinical jargon into plain, friendly terms without ever compromising medical truth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Anti-Diagnosis Guard
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distinguishes what the document says from what a term means. Never extrapolates a term like "bone marrow" into cancer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Private &amp; Ephemeral
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All documents are kept strictly confidential, processed with server-side keys, and can be instantly purged at any time.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="py-8 px-4 sm:px-6 bg-slate-900 text-white text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white">MedScript AI</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">Medical Document Understanding &amp; Multilingual Explainer</span>
          </div>
          <p className="text-slate-400 text-center sm:text-right">
            Zero Guessing &bull; Accuracy First &bull; Not a Replacement for a Doctor
          </p>
        </div>
      </footer>

    </div>
  );
};
