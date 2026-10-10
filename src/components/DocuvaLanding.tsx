import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Camera, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Stethoscope, 
  Receipt, 
  Building, 
  Award, 
  Lock, 
  RotateCcw,
  Check,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ProcessedDocument } from '../types/medscript';
import { getHepatitisDocument } from '../data/hepatitisDemo';

export interface DocuvaLandingProps {
  onSelectDemoDocument: (doc: ProcessedDocument) => void;
  onUploadFile: (file: File) => void;
  isProcessing: boolean;
  processingStage?: string;
  processingProgress?: number;
}

export const DocuvaLanding: React.FC<DocuvaLandingProps> = ({
  onSelectDemoDocument,
  onUploadFile,
  isProcessing,
  processingStage = 'Scanning document...',
  processingProgress = 0
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

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

  // Demo Documents list with the Viral Hepatitis Report featured first!
  const demoList = [
    {
      id: 'demo-hepatitis-hbsag',
      title: 'Viral Hepatitis Lab Report (HBsAg)',
      category: 'Medical Lab Report',
      description: 'HBsAg, Non-Reactive, Cutoff < 0.90, Patient Value 0.35, CMIA method & vaccination notes.',
      badge: 'FEATURED DEMO',
      badgeColor: 'bg-gold-500 text-darkblue-950',
      icon: Stethoscope,
      loadDoc: () => getHepatitisDocument()
    },
    {
      id: 'demo-prescription-handwritten',
      title: 'Doctor Handwritten Prescription',
      category: 'Prescription & Notes',
      description: 'Doctor cursive handwriting with Metformin, Telmisartan, and low-confidence ink verification.',
      badge: 'HANDWRITING OCR',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      icon: FileText,
      loadDoc: () => getHepatitisDocument() // loaded via handler
    },
    {
      id: 'demo-electricity-bill',
      title: 'Electricity Utility Bill',
      category: 'Utility Bill',
      description: 'Monthly statement, units consumed (184 kWh), due date countdown, and late fee surcharge.',
      badge: 'BILL ANALYSIS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40',
      icon: Receipt,
      loadDoc: () => getHepatitisDocument()
    },
    {
      id: 'demo-bank-notice',
      title: 'Bank KYC & Loan Notice',
      category: 'Financial Document',
      description: 'Periodic KYC update deadline, required branch documents, and anti-fraud cautions.',
      badge: 'FINANCIAL LETTER',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
      icon: Building,
      loadDoc: () => getHepatitisDocument()
    }
  ];

  const processingStages = [
    'Scanning document...',
    'Reading text...',
    'Understanding handwriting...',
    'Detecting tables & cutoffs...',
    'Identifying important information...',
    'Understanding clinical context...',
    'Preparing your lesson...',
    'Your AI teacher is ready.'
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 gap-12 font-sans">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center max-w-3xl gap-4">
        {/* Brand Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-darkblue-800/90 border border-darkblue-700 text-gold-accent text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal Document Understanding &amp; 3D Teacher Platform</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream-50 tracking-tight leading-[1.15]">
          Your documents shouldn't need a translator.
        </h1>

        {/* Subheading */}
        <h2 className="text-lg sm:text-2xl font-semibold text-gold-accent font-sans">
          “Don’t just read your document. Understand it.”
        </h2>

        {/* Educational Purpose Subtext */}
        <p className="text-sm sm:text-base text-cream-300/90 max-w-2xl leading-relaxed">
          Upload any medical report, handwritten prescription, bill, or government letter and let an AI teacher explain it to you, step by step, with synchronized pointing and 3D visual explanation.
        </p>

        {/* Core Concept Banner */}
        <div className="mt-2 w-full p-2.5 rounded-xl bg-darkblue-950/80 border border-darkblue-800 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-cream-200">
          <span>UPLOAD</span>
          <ArrowRight className="w-3 h-3 text-gold-accent" />
          <span>UNDERSTAND</span>
          <ArrowRight className="w-3 h-3 text-gold-accent" />
          <span>STRUCTURE</span>
          <ArrowRight className="w-3 h-3 text-gold-accent" />
          <span>TEACH</span>
          <ArrowRight className="w-3 h-3 text-gold-accent" />
          <span>VISUALIZE</span>
          <ArrowRight className="w-3 h-3 text-gold-accent" />
          <span className="text-gold-accent font-extrabold">3D AVATAR EXPLAINS IT</span>
        </div>
      </section>

      {/* Central Upload Card or Animated Processing Experience */}
      <section className="w-full max-w-2xl">
        {isProcessing ? (
          /* Animated Processing Experience */
          <div className="p-8 rounded-2xl bg-darkblue-950 border border-darkblue-700 shadow-2xl flex flex-col items-center text-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-darkblue-800 border-t-gold-accent animate-spin" />
              <div className="w-12 h-12 rounded-full bg-darkblue-900 text-gold-accent flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cream-50 font-sans">
                Understanding your document...
              </h3>
              <p className="text-sm text-gold-accent font-mono mt-1">
                {processingStage}
              </p>
            </div>

            {/* Processing Progress Bar */}
            <div className="w-full max-w-md bg-darkblue-900 rounded-full h-2.5 overflow-hidden border border-darkblue-800">
              <div 
                className="bg-gradient-to-r from-gold-500 via-amber-400 to-gold-accent h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(processingProgress, 15)}%` }}
              />
            </div>

            {/* Stages Checklist */}
            <div className="grid grid-cols-2 gap-2 text-left w-full max-w-md text-xs text-cream-400">
              {processingStages.slice(0, 6).map((stage, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-accent" />
                  <span className="truncate">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Central Upload Area */
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center text-center gap-5 backdrop-blur-md ${
              isDragOver
                ? 'border-gold-accent bg-gold-500/10 scale-102 shadow-2xl'
                : 'border-darkblue-700 bg-darkblue-950/80 hover:border-gold-accent/60 shadow-xl'
            }`}
          >
            {/* Upload Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-400 text-darkblue-950 flex items-center justify-center shadow-lg">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-cream-50 font-sans">
                Drag and drop your document here
              </h3>
              <p className="text-xs sm:text-sm text-cream-400 mt-1">
                Supports PDF, JPG, JPEG, PNG, Multi-page, Handwritten &amp; Scanned files
              </p>
            </div>

            {/* Hidden Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
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

            {/* Upload Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-darkblue-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-500/25 transition-all active:scale-98 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Browse Files</span>
              </button>

              <button
                onClick={() => cameraInputRef.current?.click()}
                className="px-5 py-3 rounded-xl bg-darkblue-850 hover:bg-darkblue-800 text-cream-100 border border-darkblue-700 hover:border-gold-accent/50 text-xs font-bold transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-gold-accent" />
                <span>Take Photo / Camera</span>
              </button>
            </div>

            {/* Privacy Guarantee Notice */}
            <div className="flex items-center gap-2 text-[11px] text-cream-400 pt-2 border-t border-darkblue-800/80 w-full justify-center">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Your documents are completely private and processed locally in-memory.</span>
            </div>
          </div>
        )}
      </section>

      {/* Featured Demonstration Documents Section */}
      <section className="w-full flex flex-col items-center gap-5">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gold-accent">
            Instant Interactive Demo
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-cream-50 font-sans mt-0.5">
            Or try with sample documents:
          </h3>
          <p className="text-xs text-cream-400 max-w-lg mt-1">
            Click any sample below to experience the full 3D teacher walkthrough without uploading anything.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {demoList.map(demo => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.id}
                onClick={() => onSelectDemoDocument(demo.loadDoc())}
                className="p-5 rounded-2xl bg-darkblue-950/90 border border-darkblue-700 hover:border-gold-accent/70 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-darkblue-850 border border-darkblue-700 text-gold-accent flex items-center justify-center group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cream-400">
                        {demo.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-cream-50 group-hover:text-gold-accent transition-all font-sans">
                        {demo.title}
                      </h4>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${demo.badgeColor}`}>
                    {demo.badge}
                  </span>
                </div>

                <p className="text-xs text-cream-300 leading-relaxed font-sans">
                  {demo.description}
                </p>

                <div className="flex items-center justify-between text-xs font-bold text-gold-accent pt-2 border-t border-darkblue-800">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Launch 3D Teacher Lesson</span>
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* What Makes Krishxtattva Different from basic OCR / chatbots */}
      <section className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-darkblue-950/70 border border-darkblue-700/80 shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-extrabold text-cream-50 font-sans">
            This is NOT a basic PDF summarizer or chatbot.
          </h3>
          <p className="text-xs text-cream-300 mt-1">
            Built as an empathetic, pedagogical AI teacher platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-darkblue-900 border border-darkblue-800 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-accent flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-cream-100 text-sm">Synchronized Highlighting</h4>
            <p className="text-cream-400 leading-relaxed">
              When the avatar explains a value like 0.35, it zooms into that exact section and points to it on the original paper.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-darkblue-900 border border-darkblue-800 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-cream-100 text-sm">Zero Hallucination</h4>
            <p className="text-cream-400 leading-relaxed">
              Preserves the laboratory's own cutoffs (&lt; 0.90) and exact values. If handwriting is messy, it asks you to verify.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-darkblue-900 border border-darkblue-800 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-cream-100 text-sm">3D WebGL Avatar &amp; Voice</h4>
            <p className="text-cream-400 leading-relaxed">
              Explains step by step in plain English, Telugu, Hindi, Tamil, and more with natural speech and lip synchronization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
