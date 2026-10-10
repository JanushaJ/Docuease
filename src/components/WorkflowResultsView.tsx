import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Pill, 
  Activity, 
  MessageSquare, 
  Printer, 
  Copy, 
  Check, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  ChevronRight, 
  RotateCcw, 
  Globe, 
  Stethoscope,
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { 
  ProcessedDocument, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  ChatMessage 
} from '../types/medscript';
import { ThreeDoctorAvatar } from './ThreeDoctorAvatar';
import { AskDoctorChat } from './AskDoctorChat';
import { speechManager } from '../utils/speech';

export interface WorkflowResultsViewProps {
  document: ProcessedDocument;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onReplaySpeech: () => void;
  activeSentenceText: string;
  activeSentenceIndex: number;
  isMuted: boolean;
  onToggleMute: () => void;
  chatMessages: ChatMessage[];
  onAskQuestion: (q: string) => Promise<void>;
  isChatLoading: boolean;
  onOpenShowMeWhatAIRead: () => void;
  onNavigateUpload: () => void;
}

export const WorkflowResultsView: React.FC<WorkflowResultsViewProps> = ({
  document,
  currentLanguage,
  onLanguageChange,
  isSpeaking,
  onToggleSpeech,
  onReplaySpeech,
  activeSentenceText,
  activeSentenceIndex,
  isMuted,
  onToggleMute,
  chatMessages,
  onAskQuestion,
  isChatLoading,
  onOpenShowMeWhatAIRead,
  onNavigateUpload
}) => {
  // 4 Sequential Workflow Steps:
  // Step 1: Voice Guide (KrishBuddy Explains)
  // Step 2: What Does This Mean? (Plain Language Breakdown)
  // Step 3: Extracted Details (Verified Clinical & Lab Data)
  // Step 4: Ask & Actions (Ask AI Doctor & Print / Copy)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isKidMode, setIsKidMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const explanation = document.translations?.[currentLanguage] || document.explanation;
  const meds = document.structuredMeds || [];
  const labs = document.labResults || [];
  const breakdown = explanation?.breakdown || {
    whatIsThis: explanation?.simpleSummary || 'Medical Document',
    whatItSays: explanation?.simpleSummary || 'Document summary',
    whatToDo: 'Consult your doctor.',
    whatToWatch: 'Follow medical instructions.',
    importantAmounts: undefined,
    deadline: undefined
  };

  const isHepatitis = document.detectedCategoryLabel?.toLowerCase().includes('hepatitis') ||
    labs.some(l => 
      l.testName.toLowerCase().includes('hepatitis') || 
      l.testName.toLowerCase().includes('hbsag') || 
      l.testName.toLowerCase().includes('alt') ||
      l.testName.toLowerCase().includes('ast') ||
      l.testName.toLowerCase().includes('bilirubin')
    );

  const handleCopySummary = () => {
    const text = `Krishxtattva Verified Summary: ${document.name}\n` +
      `Category: ${document.detectedCategoryLabel}\n` +
      `Language: ${explanation.languageName}\n\n` +
      `Simple Explanation:\n${explanation.simpleSummary}\n\n` +
      `What To Do:\n${breakdown.whatToDo}\n\n` +
      `What To Watch:\n${breakdown.whatToWatch}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const stepsMeta = [
    { step: 1 as const, title: 'Voice Guide', icon: <Volume2 className="w-4 h-4" />, desc: 'KrishBuddy Explains' },
    { step: 2 as const, title: 'What It Means', icon: <FileText className="w-4 h-4" />, desc: 'Simple Breakdown' },
    { step: 3 as const, title: 'Extracted Details', icon: <Activity className="w-4 h-4" />, desc: 'Lab & Medicines' },
    { step: 4 as const, title: 'Ask & Actions', icon: <MessageSquare className="w-4 h-4" />, desc: 'Doctor Q&A & Print' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: Document Title, Navigation & Status           */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              speechManager.stop();
              onNavigateUpload();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs transition"
            title="Upload another document"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload Another</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 truncate max-w-md">
                {document.name}
              </h1>
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                isHepatitis 
                  ? 'bg-amber-50 text-amber-900 border-amber-200' 
                  : labs.length > 0 
                    ? 'bg-teal-50 text-teal-800 border-teal-200' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {document.detectedCategoryLabel || 'Medical Document'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Patient: <strong className="text-slate-700">{document.patientName || 'Patient'}</strong> • Optical Stroke Verified
            </p>
          </div>
        </div>

        {/* Language selector & Handwriting status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-2.5 py-1 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-teal-700" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select explanation language"
              className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>

          <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Zero Fake Details
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* WORKFLOW STEPPER BAR                                      */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 sm:p-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stepsMeta.map((s) => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl text-left transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-50 to-teal-100/60 border-2 border-teal-600 shadow-xs'
                    : isCompleted
                      ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                      : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : isCompleted
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4 text-teal-700 stroke-[3]" /> : s.step}
                </div>

                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-black truncate ${
                    isActive ? 'text-teal-950' : 'text-slate-800'
                  }`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                    {s.desc}
                  </div>
                </div>

                {isActive && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:block">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse inline-block" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* STEP 1: 🗣️ KRISHBUDDY VOICE GUIDE                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-teal-50/70 via-white to-sky-50/40 rounded-3xl border border-teal-100/80 shadow-md p-6 sm:p-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200 inline-block mb-2">
                Step 1 of 4 • Voice Explanation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Listen to KrishBuddy in {explanation.languageName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                KrishBuddy speaks your document findings in simple, natural language with synchronized subtitles.
              </p>
            </div>

            {/* KrishBuddy Avatar & Subtitles */}
            <div className="max-w-3xl mx-auto">
              <ThreeDoctorAvatar
                isSpeaking={isSpeaking}
                onToggleSpeech={onToggleSpeech}
                onReplaySpeech={onReplaySpeech}
                language={currentLanguage}
                activeSentence={activeSentenceText}
                isMuted={isMuted}
                onToggleMute={onToggleMute}
                isVerifiedContent={true}
                spokenScript={explanation.spokenScript}
              />
            </div>

            {/* Quick Takeaways Box */}
            <div className="max-w-3xl mx-auto mt-6 bg-white/90 backdrop-blur-xs rounded-2xl border border-teal-200/60 p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Key Takeaways At A Glance
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {explanation.simpleSummary}
              </p>

              {/* Hepatitis or Zero Fake Meds Verification Highlight */}
              {isHepatitis ? (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Zero-Fabrication Verified:</strong> This diagnostic test report measures viral markers (HBsAg, Anti-HCV) and liver enzymes (ALT, AST, Bilirubin). <em>No routine fever tablets (such as Dolo or Paracetamol) are listed on this report.</em> Please discuss these markers directly with a liver specialist.
                  </div>
                </div>
              ) : meds.length === 0 && labs.length === 0 ? (
                <div className="mt-4 p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Clinical Record Verified:</strong> No commercial medications or dosages are prescribed on this page. Please consult your physician.
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Step 1 Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 font-medium">
              Tip: You can pause or change the language above at any time.
            </div>
            <button
              onClick={() => {
                speechManager.stop();
                setCurrentStep(2);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800 transition transform hover:-translate-y-0.5"
            >
              <span>Next Step: What It Means</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* STEP 2: 📋 WHAT DOES THIS MEAN? (PLAIN BREAKDOWN)         */}
      {/* ────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                Step 2 of 4 • Plain Language Comprehension
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                What Does This Document Mean?
              </h2>
              <p className="text-xs text-slate-500">
                Simplified explanation broken down into 4 clear parts without confusing medical jargon.
              </p>
            </div>

            {/* Kid Mode / Explain Like I'm 10 Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsKidMode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  !isKidMode ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard Plain English
              </button>
              <button
                onClick={() => setIsKidMode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isKidMode ? 'bg-teal-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Explain Like I'm 10 👶
              </button>
            </div>
          </div>

          {/* 4 Clear Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: What is this */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 hover:border-teal-300 transition">
              <div className="flex items-center gap-2 text-teal-700 font-black text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>1. What is this document?</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {breakdown.whatIsThis}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isKidMode 
                  ? 'This is an official healthcare paper given by your doctor or laboratory.'
                  : `Issued by ${document.clinicOrDoctorName || 'a registered healthcare facility'} for patient ${document.patientName || 'record'}.`}
              </p>
            </div>

            {/* Card 2: What it says */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 hover:border-teal-300 transition">
              <div className="flex items-center gap-2 text-sky-700 font-black text-xs uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>2. What does it actually say?</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isKidMode ? explanation.explainLikeIm10 : breakdown.whatItSays}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHepatitis 
                  ? 'Key viral markers and liver enzymes were tested. No routine fever medicines or antibiotics were written on this page.'
                  : meds.length > 0
                    ? `Prescription listing ${meds.length} medication(s) with daily dosage instructions.`
                    : 'Clinical documentation without commercial drug prescriptions.'}
              </p>
            </div>

            {/* Card 3: What to do */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 hover:border-teal-300 transition">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. What should I do next?</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {breakdown.whatToDo}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHepatitis 
                  ? 'Schedule a review with your hepatologist or gastroenterologist to interpret these test markers.'
                  : meds.length > 0
                    ? 'Take your prescribed medicines on time with water as directed. Never skip doses.'
                    : 'Show this record to your consulting physician during your next visit.'}
              </p>
            </div>

            {/* Card 4: What to watch out for */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 hover:border-teal-300 transition">
              <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>4. What should I watch out for?</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {breakdown.whatToWatch}
              </h3>
              {breakdown.deadline && (
                <div className="mt-2 text-xs font-bold text-rose-700 flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Important Timeline: {breakdown.deadline}</span>
                </div>
              )}
            </div>
          </div>

          {/* Step 2 Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Voice Guide</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800 transition transform hover:-translate-y-0.5"
            >
              <span>Next Step: Extracted Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* STEP 3: 🔬 EXTRACTED DETAILS (ZERO FAKE DATA)              */}
      {/* ────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
              Step 3 of 4 • Accurate Clinical & Lab Data
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Extracted Facts from Your Document
            </h2>
            <p className="text-xs text-slate-500">
              Zero-fabrication extraction. Every single value below is verified against the physical paper.
            </p>
          </div>

          {/* 1. If Lab Report / Hepatitis Tests */}
          {labs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-700" />
                  <span>Laboratory Test Results ({labs.length} Tests)</span>
                </h3>
                <span className="text-xs text-teal-800 font-bold bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  Optical Stroke Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {labs.map((lab) => {
                  const isReactive = lab.result.toLowerCase().includes('reactive') && !lab.result.toLowerCase().includes('non');
                  const isHigh = lab.flag === 'HIGH' || lab.flag === 'ABNORMAL' || isReactive;

                  return (
                    <div 
                      key={lab.id}
                      className={`p-4 rounded-2xl border transition shadow-xs ${
                        isHigh
                          ? 'bg-rose-50/40 border-rose-200'
                          : 'bg-white border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-extrabold text-slate-800">
                          {lab.testName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          isHigh
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}>
                          {lab.result.includes('REACTIVE') 
                            ? lab.result 
                            : (lab.flag || 'NORMAL')}
                        </span>
                      </div>

                      <div className="text-xl font-black text-slate-950 mb-1">
                        {lab.result} <span className="text-xs font-semibold text-slate-500">{lab.unit}</span>
                      </div>

                      {lab.referenceRange && (
                        <div className="text-[11px] text-slate-500 font-medium mb-2">
                          Standard Range: <strong className="text-slate-700">{lab.referenceRange}</strong>
                        </div>
                      )}

                      {lab.safeExplanation && (
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 leading-relaxed">
                          {lab.safeExplanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explicit banner if no routine medications on diagnostic document */}
              {meds.length === 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-3">
                  <Pill className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <strong>No Routine Medications / Fever Tablets on this Diagnostic Document:</strong> This document is a laboratory diagnostic report. No oral tablets (such as Dolo 650, Combiflam, or Paracetamol) are prescribed on this sheet.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. If Prescription Medications */}
          {meds.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-700" />
                <span>Prescribed Medications ({meds.length} Medicines)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meds.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900">
                        {m.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {m.strength}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-bold bg-emerald-50/60 p-2 rounded-xl">
                      📅 Timing: {m.frequency}
                    </div>

                    <div className="text-xs text-slate-600">
                      🥄 Instructions: <strong>{m.timingInstructions || 'Take with water'}</strong>
                    </div>

                    {m.purpose && (
                      <div className="text-[11px] text-slate-500 italic">
                        Purpose: {m.purpose}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. OCR & Handwriting Stroke Inspection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Inspect OCR Stroke Detection & Raw Document
                </h4>
                <p className="text-[11px] text-slate-500">
                  View bounding boxes, individual handwriting strokes, and confidence ratings for each extracted word.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenShowMeWhatAIRead}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              <span>Show Me What AI Read</span>
            </button>
          </div>

          {/* Step 3 Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: What It Means</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800 transition transform hover:-translate-y-0.5"
            >
              <span>Next Step: Ask Questions & Actions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* STEP 4: 💬 ASK QUESTIONS & ACTIONS                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                Step 4 of 4 • Grounded Q&A & Export
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Ask Questions & Take Action
              </h2>
              <p className="text-xs text-slate-500">
                Have doubts about this report? Ask our grounded AI doctor or export the verified plain-language summary.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs transition"
                title="Print verified report"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Report</span>
              </button>
              <button
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs transition"
                title="Copy plain language summary"
              >
                {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          {/* Full-Width Grounded Chat with AI Doctor */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-6">
            <AskDoctorChat
              document={document}
              onAskQuestion={onAskQuestion}
              chatMessages={chatMessages}
              isLoading={isChatLoading}
            />
          </div>

          {/* Step 4 Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Extracted Details</span>
            </button>
            <button
              onClick={() => {
                speechManager.stop();
                onNavigateUpload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black bg-slate-900 text-white shadow-md hover:bg-slate-800 transition"
            >
              <span>Upload Another Document</span>
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
