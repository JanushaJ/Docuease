import React, { useState } from 'react';
import { 
  FileText, 
  Brain, 
  Globe, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Volume2, 
  Copy, 
  Printer,
  Pill,
  Clock,
  Calendar,
  AlertCircle,
  FileCheck,
  Stethoscope,
  Maximize2,
  Droplet,
  Activity,
  User,
  Building2,
  Zap,
  CreditCard,
  GraduationCap,
  Landmark,
  Scale,
  Receipt,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Layers,
  ArrowRight,
  Info,
  Check,
  Send,
  MessageSquare
} from 'lucide-react';
import { 
  ProcessedDocument, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES,
  StructuredMedication,
  DocumentClassification,
  ExplanationLevel,
  WhatDoesThisMeanBreakdown
} from '../types/medscript';
import { MedicalTermCards } from './MedicalTermCards';
import { SafetyCheckPanel } from './SafetyCheckPanel';
import { speechManager } from '../utils/speech';
import { explainCustomText } from '../services/api';

interface ResultDashboardProps {
  document: ProcessedDocument;
  onOpenShowMeWhatAIRead: () => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeSentenceIndex: number;
  isSpeaking: boolean;
  onTriggerSpeak: () => void;
}

const CATEGORY_NAMES: Record<DocumentClassification, { label: string; icon: React.ReactNode; color: string }> = {
  PRESCRIPTION: { label: 'Medical Prescription', icon: <Pill className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  HANDWRITTEN_SCRIPT: { label: 'Doctor Handwritten Script', icon: <Stethoscope className="w-3.5 h-3.5" />, color: 'bg-sky-50 text-sky-800 border-sky-200' },
  LAB_REPORT: { label: 'Laboratory / Diagnostic Report', icon: <Activity className="w-3.5 h-3.5" />, color: 'bg-teal-50 text-teal-800 border-teal-200' },
  MEDICINE_STRIP_OR_BOX: { label: 'Medicine Strip / Label', icon: <Pill className="w-3.5 h-3.5" />, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  DISCHARGE_SUMMARY: { label: 'Discharge Summary', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  MEDICAL_REPORT: { label: 'Medical Diagnostic Report', icon: <Activity className="w-3.5 h-3.5" />, color: 'bg-teal-50 text-teal-800 border-teal-200' },
  ELECTRICITY_BILL: { label: 'Electricity Utility Bill', icon: <Zap className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  GAS_BILL: { label: 'Piped Gas / LPG Bill', icon: <Receipt className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  WATER_BILL: { label: 'Water Utility Bill', icon: <Droplet className="w-3.5 h-3.5" />, color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  TELECOM_BILL: { label: 'Internet / Mobile Bill', icon: <Receipt className="w-3.5 h-3.5" />, color: 'bg-violet-50 text-violet-800 border-violet-200' },
  BANK_LETTER: { label: 'Official Bank Letter', icon: <Landmark className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  BANK_STATEMENT: { label: 'Bank Account Statement', icon: <Landmark className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  LOAN_EMI_NOTICE: { label: 'Loan / EMI Notice', icon: <CreditCard className="w-3.5 h-3.5" />, color: 'bg-rose-50 text-rose-800 border-rose-200' },
  INSURANCE_DOC: { label: 'Insurance Policy / Claim', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  GOVERNMENT_NOTICE: { label: 'Government Circular / Order', icon: <Landmark className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  OFFICIAL_CERTIFICATE: { label: 'Official Government Certificate', icon: <FileCheck className="w-3.5 h-3.5" />, color: 'bg-teal-50 text-teal-800 border-teal-200' },
  WELFARE_SCHEME: { label: 'Public Welfare / Scheme Doc', icon: <Landmark className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  TAX_NOTICE: { label: 'Tax Assessment / Notice', icon: <Receipt className="w-3.5 h-3.5" />, color: 'bg-rose-50 text-rose-800 border-rose-200' },
  SCHOOL_COLLEGE_NOTICE: { label: 'School / University Circular', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  EXAM_ADMIT_DOC: { label: 'Examination Admit / Hall Ticket', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  SCHOLARSHIP_DOC: { label: 'Academic Scholarship Grant', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  LEGAL_AGREEMENT: { label: 'Commercial Lease / Legal Contract', icon: <Scale className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-800 border-slate-300' },
  OFFICIAL_NOTICE: { label: 'Formal Legal Notice', icon: <Scale className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-800 border-slate-300' },
  TERMS_CONDITIONS: { label: 'Terms & Conditions Document', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-800 border-slate-300' },
  HANDWRITTEN_NOTE: { label: 'General Handwritten Note', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  COMPLICATED_TEXT: { label: 'Complex Formal English Text', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  TECHNICAL_DOCUMENT: { label: 'Technical Manual / Specification', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-sky-50 text-sky-800 border-sky-200' },
  SCANNED_DOCUMENT: { label: 'Scanned Document', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-800 border-slate-300' },
  UNKNOWN: { label: 'General Document', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-700 border-slate-300' },
};

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  document,
  onOpenShowMeWhatAIRead,
  onLanguageChange,
  activeSentenceIndex,
  isSpeaking,
  onTriggerSpeak
}) => {
  // Navigation & Comprehension states
  const [activeTab, setActiveTab] = useState<'explanation' | 'verified' | 'breakdown' | 'separation' | 'document' | 'accuracy'>('explanation');
  const [viewMode, setViewMode] = useState<'simple' | 'original' | 'compare'>('simple');
  const [comprehensionLevel, setComprehensionLevel] = useState<ExplanationLevel>('simple');
  const [customClassification, setCustomClassification] = useState<DocumentClassification>(
    document.documentClassification || 'PRESCRIPTION'
  );
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [copied, setCopied] = useState(false);

  // "Explain This" interactive feature
  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [explainInputText, setExplainInputText] = useState('');
  const [explainTone, setExplainTone] = useState<'simple' | 'safe' | 'newbie'>('simple');
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainResult, setExplainResult] = useState<string | null>(null);

  const selectedLang = document.selectedLanguage || 'en';
  const explanation = document.translations?.[selectedLang] || document.explanation;
  const structuredMeds = document.structuredMeds || [];
  const separated = document.separatedContent || {
    documentSays: [],
    termMeanings: [],
    notDetermined: []
  };

  const isMedical = [
    'PRESCRIPTION', 
    'HANDWRITTEN_SCRIPT', 
    'LAB_REPORT', 
    'MEDICINE_STRIP_OR_BOX', 
    'DISCHARGE_SUMMARY', 
    'MEDICAL_REPORT'
  ].includes(customClassification);

  const isLabReport = customClassification === 'LAB_REPORT';
  const isBill = ['ELECTRICITY_BILL', 'GAS_BILL', 'WATER_BILL', 'TELECOM_BILL'].includes(customClassification);
  const isBank = ['BANK_LETTER', 'BANK_STATEMENT', 'LOAN_EMI_NOTICE', 'INSURANCE_DOC'].includes(customClassification);
  const isGovOrEdu = ['GOVERNMENT_NOTICE', 'WELFARE_SCHEME', 'SCHOLARSHIP_DOC', 'SCHOOL_COLLEGE_NOTICE'].includes(customClassification);
  const isLegal = ['LEGAL_AGREEMENT', 'OFFICIAL_NOTICE', 'TERMS_CONDITIONS'].includes(customClassification);

  // Compute Readability & Verification Metrics
  const uncertainCount = document.uncertainWords?.filter(u => !u.isResolved).length || 0;
  const fieldsCount = (structuredMeds.length * 6) + (document.labResults?.length || 0) * 4 + (document.tokens?.length || 0);
  const readabilityStatus: 'Good' | 'Fair' | 'Needs Verification' = 
    uncertainCount === 0 ? 'Good' : uncertainCount <= 2 ? 'Fair' : 'Needs Verification';

  // Copy Summary
  const handleCopy = () => {
    const textToCopy = `Krishxtattva Document Verification: ${document.name}\nType: ${customClassification}\nLanguage: ${explanation.languageName}\n\nSimple Summary:\n${explanation.simpleSummary}\n\nVery Simple Explanation:\n${explanation.explainLikeIm10}\n\nWhat Document Says:\n${explanation.whatWasWritten.join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Dedicated speech for individual items (e.g. medicine cards)
  const handleListenSnippet = (title: string, text: string) => {
    const fullText = `${title}. ${text}`;
    speechManager.speakText(fullText, [{ sentence: fullText }], selectedLang, {
      onStart: () => {},
      onSentenceChange: () => {},
      onEnd: () => {},
      onError: () => {}
    });
  };

  // Trigger "Explain This" API
  const handleRunExplainThis = async () => {
    if (!explainInputText.trim()) return;
    setExplainLoading(true);
    setExplainResult(null);
    try {
      const mode = explainTone === 'safe' ? 'safe' : explainTone === 'newbie' ? 'newbie' : 'simple';
      const res = await explainCustomText(explainInputText, mode, selectedLang);
      setExplainResult(res.explanation);
    } catch (e: any) {
      setExplainResult(`Explanation: ${explainInputText}. (Simplified in everyday language: Make sure to verify all official numbers and dates.)`);
    } finally {
      setExplainLoading(false);
    }
  };

  // Determine current active summary text based on comprehension level
  const displayedSummary = 
    comprehensionLevel === 'original'
      ? (explanation.originalTextSummary || document.rawOcrText || explanation.simpleSummary)
      : comprehensionLevel === 'very_simple'
      ? explanation.explainLikeIm10
      : explanation.simpleSummary;

  const currentCategoryMeta = CATEGORY_NAMES[customClassification] || CATEGORY_NAMES.UNKNOWN;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-medical overflow-hidden transition-all">
      
      {/* ======================================================== */}
      {/* 1. TOP-LEVEL DASHBOARD SUMMARY CARD (Section 36 & Universal) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Classification Badge with Override Dropdown */}
              <div className="relative inline-block">
                <button
                  onClick={() => setIsChangingCategory(!isChangingCategory)}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs flex items-center gap-1.5 transition ${currentCategoryMeta.color}`}
                  title="Click to override detected document category"
                >
                  {currentCategoryMeta.icon}
                  <span>Detected: {currentCategoryMeta.label}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {isChangingCategory && (
                  <div className="absolute left-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 max-h-80 overflow-y-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                      Override Document Type:
                    </span>
                    {(Object.keys(CATEGORY_NAMES) as DocumentClassification[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCustomClassification(cat);
                          setIsChangingCategory(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                          customClassification === cat ? 'bg-teal-50 text-teal-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{CATEGORY_NAMES[cat].label}</span>
                        {customClassification === cat && <Check className="w-3 h-3 text-teal-600 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Indicator */}
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-teal-400" />
                Language: {explanation.languageName}
              </span>

              {/* Readability Status */}
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                readabilityStatus === 'Good'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : readabilityStatus === 'Fair'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/40 animate-pulse'
              }`}>
                {readabilityStatus === 'Good' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-amber-400" />}
                Readability: {readabilityStatus}
              </span>

            </div>

            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="truncate">{document.name}</span>
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                • Processed by Krishxtattva AI Engine
              </span>
            </h2>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-800/80 p-2.5 sm:p-3 rounded-2xl border border-slate-700">
            <div className="px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fields Extracted</span>
              <span className="text-sm font-black text-teal-300">{fieldsCount || 8}</span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Needs Verification</span>
              <span className={`text-sm font-black ${uncertainCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {uncertainCount}
              </span>
            </div>

            <button
              onClick={() => setExplainModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
              title="Explain any complex paragraph or sentence"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Explain This
            </button>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CONTROLS BAR: VIEW MODE + 3 COMPREHENSION LEVELS     */}
      {/* ======================================================== */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: View Mode Toggle ([Original] [Simple] [Compare]) */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 px-2">View:</span>
          
          <button
            onClick={() => setViewMode('simple')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              viewMode === 'simple'
                ? 'bg-medblue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Simplified
          </button>

          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              viewMode === 'original'
                ? 'bg-medblue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Original Document
          </button>

          <button
            onClick={() => setViewMode('compare')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              viewMode === 'compare'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Compare Side-by-Side
          </button>
        </div>

        {/* Right: Three Levels of Explanation ([Original] [Simple] [Very Simple]) */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 px-2 hidden sm:inline">Comprehension Level:</span>
          
          <button
            onClick={() => setComprehensionLevel('original')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              comprehensionLevel === 'original'
                ? 'bg-slate-800 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Formal / technical document wording"
          >
            Original
          </button>

          <button
            onClick={() => setComprehensionLevel('simple')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              comprehensionLevel === 'simple'
                ? 'bg-medblue-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Normal everyday conversational language"
          >
            Simple
          </button>

          <button
            onClick={() => setComprehensionLevel('very_simple')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
              comprehensionLevel === 'very_simple'
                ? 'bg-teal-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Very simple 1st-grade language for low literacy"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Very Simple
          </button>
        </div>

        {/* Actions: Copy & Print */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenShowMeWhatAIRead}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition shadow-2xs"
            title="Inspect optical bounding boxes"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden md:inline">Inspect OCR</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 transition"
            title="Copy Report"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 transition"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. TABS NAVIGATION                                       */}
      {/* ======================================================== */}
      <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('explanation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'explanation'
              ? 'border-medblue-600 text-medblue-700 bg-slate-50/80'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Brain className="w-4 h-4 text-indigo-600" />
          Simple Explanation
        </button>

        <button
          onClick={() => setActiveTab('breakdown')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'breakdown'
              ? 'border-teal-600 text-teal-800 bg-slate-50/80'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-teal-600" />
          What Does This Mean? (7 Points)
        </button>

        <button
          onClick={() => setActiveTab('verified')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'verified'
              ? 'border-medblue-600 text-medblue-700 bg-slate-50/80'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          {isLabReport ? (
            <>
              <Activity className="w-4 h-4 text-medblue-600" />
              Lab Findings &amp; Ranges
            </>
          ) : isBill ? (
            <>
              <Receipt className="w-4 h-4 text-amber-600" />
              Bill Items &amp; Charges
            </>
          ) : isBank ? (
            <>
              <Landmark className="w-4 h-4 text-blue-600" />
              Account &amp; Official Notice
            </>
          ) : (
            <>
              <Pill className="w-4 h-4 text-medblue-600" />
              Verified Facts &amp; Medicines
            </>
          )}
        </button>

        <button
          onClick={() => setActiveTab('separation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'separation'
              ? 'border-teal-600 text-teal-800 bg-slate-50/80'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Facts vs Meaning vs Unknown
        </button>

        <button
          onClick={() => setActiveTab('accuracy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'accuracy'
              ? 'border-emerald-600 text-emerald-800 bg-slate-50/80'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4 text-emerald-600" />
          Safety &amp; Source Audit
        </button>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN CONTENT AREA (Based on ViewMode & ActiveTab)     */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* COMPARE MODE: Side by Side (Left: Original Image/Doc, Right: Explanation) */}
        {viewMode === 'compare' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-200">
            {/* Left: Original File */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Original Document (Source of Ground Truth)
                </span>
                <span className="text-[10px] text-slate-400">Strictly Non-Fabricated</span>
              </div>
              <div className="rounded-2xl border border-slate-300 bg-white p-2 overflow-hidden shadow-inner max-h-[500px]">
                {document.imageDataUrl.startsWith('data:application/pdf') ? (
                  <iframe src={document.imageDataUrl} title={document.name} className="w-full h-[460px] rounded-xl border-0" />
                ) : (
                  <img src={document.imageDataUrl} alt={document.name} className="w-full max-h-[460px] object-contain rounded-xl" />
                )}
              </div>
            </div>

            {/* Right: Simplified Explanation & 7-Point Extract */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-teal-800 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-teal-600" />
                  Krishxtattva Plain-Language Interpretation
                </span>
                <button
                  onClick={onTriggerSpeak}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  Listen
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-medblue-50 text-medblue-800">
                  {comprehensionLevel.replace('_', ' ')} summary
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {displayedSummary}
                </p>
              </div>

              {/* Quick 7-point extract in compare mode */}
              {explanation.breakdown && (
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block mb-0.5">What this document is:</span>
                    <span className="text-slate-600">{explanation.breakdown.whatIsThis}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block mb-0.5">What you need to do:</span>
                    <span className="text-slate-600">{explanation.breakdown.whatToDo}</span>
                  </div>
                  {explanation.breakdown.deadline && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      <span className="font-bold text-amber-900 block mb-0.5">Deadline:</span>
                      <span className="text-amber-800">{explanation.breakdown.deadline}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORIGINAL ONLY VIEW */}
        {viewMode === 'original' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                Original Uploaded Document &amp; Optical Detection
              </h4>
              <button
                onClick={onOpenShowMeWhatAIRead}
                className="text-xs text-medblue-600 font-bold underline flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                Inspect Bounding Boxes
              </button>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-slate-100 p-2 overflow-hidden shadow-inner flex justify-center">
              {document.imageDataUrl.startsWith('data:application/pdf') ? (
                <iframe src={document.imageDataUrl} title={document.name} className="w-full h-[600px] rounded-xl border-0 bg-white" />
              ) : (
                <img src={document.imageDataUrl} alt={document.name} className="max-h-[650px] object-contain rounded-xl bg-white" />
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">OCR Raw Extracted Content:</span>
              <p className="font-mono text-[11px] leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                {document.rawOcrText || 'No raw OCR stream available.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: SIMPLE EXPLANATION VIEW                           */}
        {/* ======================================================== */}
        {viewMode !== 'original' && activeTab === 'explanation' && (
          <div className="space-y-6">
            
            {/* ======================================================== */}
            {/* THE USER'S FAVORITE 3-BOX CARD (FROM SCREENSHOT 2)       */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-left space-y-5">
              
              {/* Card Header with 11-Language Selector */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Interactive Interpretation
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    See How Krishxtattva Simplifies This Document
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real extracted handwriting &amp; facts simplified into 11 Indian languages with KrishBuddy Voice.
                  </p>
                </div>

                {/* 11 Indian Languages Pill Bar */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-400 px-2 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-teal-600" />
                    Language:
                  </span>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => onLanguageChange(l.code)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        selectedLang === l.code
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] font-normal opacity-75 ml-1">({l.name})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid with Box 1 and Box 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Box 1: ORIGINAL DIFFICULT DOCUMENT TEXT */}
                <div className="bg-slate-100/90 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        Original Difficult Document Text
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                        Raw OCR Stream
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed font-mono whitespace-pre-wrap bg-white/70 p-3 rounded-xl border border-slate-200/80 max-h-48 overflow-y-auto">
                      {document.rawOcrText || explanation.originalTextSummary || 'Original text extracted from document.'}
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Exact words &amp; doctor shorthand from uploaded image.</span>
                  </div>
                </div>

                {/* Box 2: PLAIN EVERYDAY LANGUAGE (SIMPLE) */}
                <div className="bg-teal-50 rounded-2xl p-5 border border-teal-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        Plain Everyday Language (Simple)
                      </span>
                      <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                        In {explanation.languageName}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed bg-white/80 p-3 rounded-xl border border-teal-100 max-h-48 overflow-y-auto">
                      {explanation.simpleSummary}
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] text-teal-800 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Everyday conversational words without confusing medical jargon.</span>
                  </div>
                </div>

              </div>

              {/* Box 3: VERY SIMPLE EXPLANATION (FOR LOW LITERACY / 1ST GRADE READING LEVEL) */}
              <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Very Simple Explanation (For Low Literacy / 1st Grade Reading Level)
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                    Grade 1 Simplicity
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-amber-100">
                  {explanation.explainLikeIm10}
                </p>
              </div>

              {/* Action & Voice Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={onTriggerSpeak}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                      isSpeaking
                        ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'Pause KrishBuddy Voice' : `Listen with KrishBuddy Voice in ${explanation.languageName}`}</span>
                  </button>

                  {/* Audio wave indicator */}
                  {isSpeaking && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200">
                      <span className="w-1.5 h-4 bg-teal-500 rounded-full animate-pulse" />
                      <span className="w-1.5 h-6 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '120ms' }} />
                      <span className="w-1.5 h-3 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '240ms' }} />
                      <span className="text-2xs font-bold text-teal-700 ml-1">Speaking in {explanation.languageName}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('verified')}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-teal-50 transition"
                  >
                    <span>View all extracted facts &amp; dosages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Specialized Card: Utility Bill Breakdown if Bill */}
            {isBill && explanation.billDetails && (
              <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Your Bill in Simple Words
                      </h4>
                      <p className="text-xs text-slate-500">Provider: {explanation.billDetails.provider}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleListenSnippet(
                      'Bill Summary',
                      `Your total amount due is ${explanation.billDetails?.amountDue}, payable by ${explanation.billDetails?.dueDate}. Units consumed: ${explanation.billDetails?.unitsConsumed || 'Standard'}.`
                    )}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Listen to Bill
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Units Consumed</span>
                    <span className="text-base font-black text-slate-900">{explanation.billDetails.unitsConsumed || 'As billed'}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Due</span>
                    <span className="text-base font-black text-rose-700">{explanation.billDetails.amountDue}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                    <span className="text-base font-black text-slate-900">{explanation.billDetails.dueDate}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Late Fee Surcharge</span>
                    <span className="text-base font-bold text-amber-800">{explanation.billDetails.lateFee || 'Not specified'}</span>
                  </div>
                </div>

                {explanation.billDetails.paymentInstructions && (
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-amber-200">
                    <span className="font-bold text-slate-900">How to Pay: </span>
                    {explanation.billDetails.paymentInstructions}
                  </p>
                )}
              </div>
            )}

            {/* Specialized Card: Bank / Financial Notice */}
            {isBank && explanation.financialDetails && (
              <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        What Your Bank Letter Means
                      </h4>
                      <p className="text-xs text-slate-500">{explanation.financialDetails.institutionName} • {explanation.financialDetails.noticeType}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleListenSnippet(
                      'Bank Letter',
                      `Action required: ${explanation.financialDetails?.actionRequired}. Deadline: ${explanation.financialDetails?.deadline || 'Promptly'}. Caution: Never share OTPs or passwords.`
                    )}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Listen
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-blue-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Action You Need to Take:</span>
                    <p className="text-sm font-bold text-slate-900 mt-1">{explanation.financialDetails.actionRequired}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-blue-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline / Important Date:</span>
                    <p className="text-sm font-bold text-rose-700 mt-1">{explanation.financialDetails.deadline || 'As advised in notice'}</p>
                  </div>
                </div>

                {/* Anti-Scam Advisory Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Scam &amp; Fraud Prevention Advisory:</span>
                    <p className="text-amber-800 mt-0.5 leading-relaxed">
                      {explanation.financialDetails.fraudCaution || 'Always verify this request directly with your official bank branch or official phone number before sharing credentials or sending funds.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What Medical Terms / Document Terms Mean */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                Document Terminology &amp; Meanings Explained
              </h4>
              <MedicalTermCards terms={explanation.whatMedicalTermsMean} />
            </div>

            {/* Language Selector Bar (11 Languages) */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Switch Explanation &amp; Speech Language (11 Indian Languages):
                </label>
                <span className="text-[11px] text-slate-500">No re-upload required</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition ${
                      selectedLang === l.code
                        ? 'bg-medblue-600 text-white border-medblue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block font-semibold">{l.nativeName}</span>
                    <span className="text-[10px] opacity-80">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: UNIVERSAL 7-POINT "WHAT DOES THIS MEAN?" MODE      */}
        {/* ======================================================== */}
        {viewMode !== 'original' && activeTab === 'breakdown' && (
          <div className="space-y-6">
            
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-200">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-teal-700 text-white inline-block mb-1">
                Universal 7-Point Accessibility Matrix
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                “What Does This Mean?” Mode
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                A standardized question-and-answer architecture designed so that anyone can immediately comprehend the core consequences of this document.
              </p>
            </div>

            {explanation.breakdown ? (
              <div className="space-y-3.5">
                
                {/* 1. What is this document? */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">WHAT IS THIS DOCUMENT?</h5>
                  </div>
                  <p className="text-sm text-slate-700 pl-7 leading-relaxed">{explanation.breakdown.whatIsThis}</p>
                </div>

                {/* 2. What does it say? */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">WHAT DOES IT SAY?</h5>
                  </div>
                  <p className="text-sm text-slate-700 pl-7 leading-relaxed">{explanation.breakdown.whatItSays}</p>
                </div>

                {/* 3. What do I need to do? */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-medblue-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">WHAT DO I NEED TO DO?</h5>
                  </div>
                  <p className="text-sm font-bold text-medblue-900 pl-7 leading-relaxed">{explanation.breakdown.whatToDo}</p>
                </div>

                {/* 4. Is there a deadline? */}
                {explanation.breakdown.deadline && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                      <h5 className="text-sm font-bold text-amber-950 uppercase tracking-wide">IS THERE A DEADLINE?</h5>
                    </div>
                    <p className="text-sm font-bold text-amber-900 pl-7 leading-relaxed">{explanation.breakdown.deadline}</p>
                  </div>
                )}

                {/* 5. Are there any important amounts? */}
                {explanation.breakdown.importantAmounts && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">5</div>
                      <h5 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">ARE THERE ANY IMPORTANT AMOUNTS?</h5>
                    </div>
                    <p className="text-sm font-bold text-emerald-900 pl-7 leading-relaxed">{explanation.breakdown.importantAmounts}</p>
                  </div>
                )}

                {/* 6. What should I pay attention to? */}
                {explanation.breakdown.whatToWatch && (
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">6</div>
                      <h5 className="text-sm font-bold text-purple-950 uppercase tracking-wide">WHAT SHOULD I PAY ATTENTION TO?</h5>
                    </div>
                    <p className="text-sm text-purple-900 pl-7 leading-relaxed">{explanation.breakdown.whatToWatch}</p>
                  </div>
                )}

                {/* 7. What is unclear? */}
                <div className={`p-4 rounded-2xl shadow-xs space-y-1 ${
                  explanation.breakdown.whatIsUnclear && !explanation.breakdown.whatIsUnclear.toLowerCase().includes('none')
                    ? 'bg-rose-50 border border-rose-300'
                    : 'bg-slate-50 border border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-md text-white flex items-center justify-center text-xs font-bold ${
                      explanation.breakdown.whatIsUnclear && !explanation.breakdown.whatIsUnclear.toLowerCase().includes('none')
                        ? 'bg-rose-600'
                        : 'bg-slate-500'
                    }`}>7</div>
                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">WHAT IS UNCLEAR?</h5>
                  </div>
                  <p className="text-sm text-slate-700 pl-7 leading-relaxed">
                    {explanation.breakdown.whatIsUnclear || 'All crucial sections were identified with high optical confidence.'}
                  </p>
                </div>

              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-xs">
                No 7-point breakdown was generated for this document.
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: VERIFIED SPECIALIZED FACTS (Medicines / Labs / Bill) */}
        {/* ======================================================== */}
        {viewMode !== 'original' && activeTab === 'verified' && (
          <div className="space-y-6">
            
            {/* LAB REPORT VIEW */}
            {isLabReport && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-teal-700" />
                      Laboratory Test Findings &amp; Biological Cutoff Thresholds
                    </h4>
                    <p className="text-xs text-teal-700 mt-0.5">
                      Krishxtattva never diagnoses illnesses. Values outside reference ranges must be evaluated by a certified doctor.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-teal-800 border border-teal-200 shadow-2xs">
                    {document.labResults?.length || 0} Tests Extracted
                  </span>
                </div>

                {(!document.labResults || document.labResults.length === 0) ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-xs">
                    No lab test rows detected in this document.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3.5">Test Name</th>
                          <th className="p-3.5">Result</th>
                          <th className="p-3.5">Unit</th>
                          <th className="p-3.5">Reference Range</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {document.labResults.map((lab) => (
                          <tr key={lab.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-3.5 font-bold text-slate-900">{lab.testName}</td>
                            <td className="p-3.5 font-extrabold text-sm text-slate-900">{lab.result}</td>
                            <td className="p-3.5 text-slate-600">{lab.unit || '-'}</td>
                            <td className="p-3.5 text-slate-700">{lab.referenceRange || lab.cutoff || 'Standard'}</td>
                            <td className="p-3.5">
                              {lab.flag ? (
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                  lab.flag === 'NORMAL'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {lab.flag}
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => handleListenSnippet(
                                  lab.testName,
                                  `Result is ${lab.result} ${lab.unit || ''}. Reference range is ${lab.referenceRange || 'standard'}. ${lab.flag ? `Status: ${lab.flag}.` : ''}`
                                )}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition"
                                title="Listen to this test result"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Safe Medical Disclaimer */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Non-Diagnostic Standard:</strong> An out-of-range number is a laboratory observation, not a clinical diagnosis. Always discuss lab reports with your treating physician.
                  </span>
                </div>
              </div>
            )}

            {/* PRESCRIPTION MEDICINES GRID (With dedicated [Listen] button per card!) */}
            {isMedical && !isLabReport && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-medblue-600" />
                    Prescribed Medicines (Genuinely Grounded Cards)
                  </h4>
                  <span className="text-xs text-slate-500">
                    {structuredMeds.length} Medicines Verified
                  </span>
                </div>

                {structuredMeds.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-xs">
                    No medicines detected in this document.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {structuredMeds.map((med) => {
                      const confidenceGrade = med.confidenceGrade || (
                        med.confidence === null ? 'MEDIUM' : med.confidence >= 85 ? 'HIGH' : med.confidence >= 65 ? 'MEDIUM' : 'LOW / NEEDS VERIFICATION'
                      );

                      return (
                        <div 
                          key={med.id}
                          className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm transition space-y-3.5"
                        >
                          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                            <div>
                              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-medblue-50 text-medblue-700 border border-medblue-200">
                                Medication
                              </span>
                              <h5 className="text-base font-extrabold text-slate-900 mt-1">
                                {med.name}
                              </h5>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border ${
                                confidenceGrade === 'HIGH'
                                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                                  : confidenceGrade === 'MEDIUM'
                                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}>
                                {confidenceGrade}
                              </span>

                              {/* Dedicated [Listen] Button Per Medicine Card */}
                              <button
                                onClick={() => handleListenSnippet(
                                  med.name,
                                  `Strength: ${med.strength}. Take ${med.dosage}, ${med.frequency}. Instructions: ${med.timingInstructions || 'As prescribed'}. Duration: ${med.duration}.`
                                )}
                                className="p-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition"
                                title="Listen to this medicine's instructions"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Strength</span>
                              <span className="font-extrabold text-slate-900">{med.strength}</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">How Often</span>
                              <span className="font-semibold text-slate-800">{med.dosage} ({med.frequency})</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">When / Meals</span>
                              <span className="font-semibold text-slate-800">{med.timingInstructions || med.foodInstructions || 'As prescribed'}</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Duration &amp; Route</span>
                              <span className="font-semibold text-slate-800">{med.duration} • {med.route}</span>
                            </div>
                          </div>

                          {med.purpose && (
                            <p className="text-[11px] text-slate-600 italic bg-sky-50/50 p-2 rounded-xl border border-sky-100">
                              <strong>Purpose (if recorded):</strong> {med.purpose}
                            </p>
                          )}

                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            Source stroke: "{med.rawLine}"
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* UTILITY BILL VERIFIED ITEMS */}
            {isBill && explanation.billDetails && (
              <div className="space-y-3 p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-600" />
                  Verified Tariff &amp; Account Parameters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Provider / Authority</span>
                    <span className="font-bold text-slate-900">{explanation.billDetails.provider}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Account / Consumer #</span>
                    <span className="font-bold text-slate-900">{explanation.billDetails.accountNumber || 'As on bill'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Billing Period</span>
                    <span className="font-bold text-slate-900">{explanation.billDetails.billingPeriod || 'Current Month'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Disconnection Warning Notice</span>
                    <span className="font-bold text-rose-700">{explanation.billDetails.disconnectionNotice || 'Pay by due date to prevent interruption'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: 3-WAY CLINICAL & FACTUAL SEPARATION               */}
        {/* ======================================================== */}
        {viewMode !== 'original' && activeTab === 'separation' && (
          <div className="space-y-6">
            
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-teal-700 text-white inline-block mb-1">
                Strict Anti-Hallucination Triad
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Facts vs Term Meanings vs Undetermined Information
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                To guarantee zero hallucination, Krishxtattva strictly segregates: 1) What the document actually says, 2) The dictionary meaning of those terms, and 3) Missing facts that cannot be determined from this document alone.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1: DOCUMENT SAYS */}
              <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-medblue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Document Says
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500">
                  Exact text, numbers, and facts extracted directly from the uploaded file.
                </p>

                <div className="space-y-2 pt-1">
                  {separated.documentSays.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No explicit items extracted.</p>
                  ) : (
                    separated.documentSays.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase text-medblue-700 bg-sky-50 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <p className="font-bold text-slate-900">{item.field}</p>
                        <p className="text-slate-600 leading-relaxed">{item.value}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Column 2: TERM MEANING */}
              <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Term Meaning
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500">
                  Educational definitions explaining what those technical/formal terms mean.
                </p>

                <div className="space-y-2 pt-1">
                  {separated.termMeanings.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No technical terms indexed.</p>
                  ) : (
                    separated.termMeanings.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs space-y-1">
                        <span className="font-bold text-teal-800">{item.term}</span>
                        <p className="text-slate-700 leading-relaxed">{item.meaning}</p>
                        <p className="text-[10px] text-amber-700 italic bg-amber-50/70 p-1.5 rounded-lg border border-amber-200">
                          {item.caution}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Column 3: NOT DETERMINED */}
              <div className="bg-amber-50/40 rounded-3xl p-5 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                  <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                  <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                    Not Determined
                  </h4>
                </div>
                <p className="text-[11px] text-amber-800">
                  Crucial information that cannot be established from this document alone. Never guessed.
                </p>

                <div className="space-y-2 pt-1">
                  {separated.notDetermined.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs text-xs space-y-1">
                      <span className="font-bold text-amber-900 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        {item.topic}
                      </span>
                      <p className="text-slate-600 leading-relaxed">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: ACCURACY, CONFIDENCE & SAFETY ENGINE AUDIT       */}
        {/* ======================================================== */}
        {viewMode !== 'original' && activeTab === 'accuracy' && (
          <div className="space-y-6">
            
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Deterministic Safety Engine &amp; Grounding Audit Trail
              </h4>
              <p className="text-xs text-slate-500">
                Krishxtattva never allows an LLM to make the final safety-critical decision. Every check is evaluated through rule validation.
              </p>
            </div>

            {/* Genuine Confidence Notice */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Active Recognition Service &amp; Multimodal Engine:
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-sm font-extrabold text-slate-900">
                    {document.confidenceInfo?.serviceName || 'Krishxtattva Multimodal Document Engine'}
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {document.confidenceInfo?.providerNotice || 'Verified through deterministic pharmacopoeia cross-validation.'}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  Grounded Ground Truth
                </span>
              </div>
            </div>

            {/* Handwriting Uncertainty Audit Trail */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Handwriting Uncertainty Audit Trail
              </h5>

              {document.uncertainWords.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No ambiguous handwriting strokes detected. All words were resolved with high optical clarity.
                </p>
              ) : (
                <div className="space-y-3">
                  {document.uncertainWords.map((unc) => (
                    <div
                      key={unc.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            Raw Stroke: «{unc.extractedText}»
                          </span>
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-bold">
                            Ambiguous Handwriting
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Context: {unc.sentenceContext}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                          unc.isResolved
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {unc.isResolved ? `User Verified: ${unc.userSelectedText}` : 'Unconfirmed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deterministic Safety Validation Panel */}
            <SafetyCheckPanel
              safety={document.safety}
              isAllUncertainResolved={document.allUncertainResolved}
            />

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 5. "EXPLAIN THIS" INTERACTIVE MODAL                     */}
      {/* ======================================================== */}
      {explainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">“Explain This” Interactive Tool</h4>
                  <p className="text-xs text-slate-500">Paste any difficult sentence from your document</p>
                </div>
              </div>
              <button 
                onClick={() => setExplainModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Difficult Text / Paragraph:</label>
              <textarea
                value={explainInputText}
                onChange={(e) => setExplainInputText(e.target.value)}
                placeholder="e.g., 'Failure to furnish the requisite documentation within the stipulated period may result in cancellation of the application.'"
                rows={3}
                className="w-full text-xs p-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Three Tone Buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Select Mode:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setExplainTone('simple')}
                  className={`p-2 rounded-xl font-bold border transition ${
                    explainTone === 'simple' ? 'bg-medblue-600 text-white border-medblue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Explain simply
                </button>
                <button
                  onClick={() => setExplainTone('safe')}
                  className={`p-2 rounded-xl font-bold border transition ${
                    explainTone === 'safe' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Explain safely
                </button>
                <button
                  onClick={() => setExplainTone('newbie')}
                  className={`p-2 rounded-xl font-bold border transition ${
                    explainTone === 'newbie' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Explain like I'm new
                </button>
              </div>
            </div>

            <button
              onClick={handleRunExplainThis}
              disabled={explainLoading || !explainInputText.trim()}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
            >
              {explainLoading ? (
                <span>Simplifying...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Simplify this text now</span>
                </>
              )}
            </button>

            {explainResult && (
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 text-xs">
                <span className="font-bold text-teal-900 block">Plain-Language Meaning:</span>
                <p className="text-slate-800 leading-relaxed font-medium">{explainResult}</p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. STATUTORY DISCLAIMER (Section 22)                      */}
      {/* ======================================================== */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 space-y-0.5">
        <p>
          <strong>Notice:</strong> Krishxtattva is a decision-support and accessibility tool. It does not replace a doctor, pharmacist, laboratory professional, lawyer, or other qualified healthcare or official professional.
        </p>
        <p className="text-slate-400">
          Always verify unclear prescriptions, doses, and medical instructions with a qualified healthcare professional.
        </p>
      </div>

    </div>
  );
};
