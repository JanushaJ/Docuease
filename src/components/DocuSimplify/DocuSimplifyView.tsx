import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  IndianRupee, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  Copy, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  BookOpen, 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { 
  ProcessedDocument, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES,
  BillDetails,
  FinancialDetails
} from '../../types/medscript';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';
import { processDocumentDirect } from '../../services/api';
import { DEMO_DOCUMENTS } from '../../data/universalDemos';
import { useLocation } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';

export interface DocuSimplifyViewProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenPrivacyNotice?: () => void;
  onBackToStart?: () => void;
}

export const DocuSimplifyView: React.FC<DocuSimplifyViewProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenPrivacyNotice,
  onBackToStart,
}) => {
  // Workflow Step: 'upload' | 'processing' | 'results'
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Processing Stages State
  const [processingStage, setProcessingStage] = useState<string>('Uploading document...');
  const [processingProgress, setProcessingProgress] = useState<number>(0);

  // Document Result
  const [document, setDocument] = useState<ProcessedDocument | null>(null);

  // Active Tab in Results (All Facts, Original Text, Jargon Dictionary)
  const [activeTab, setActiveTab] = useState<'overview' | 'original' | 'jargon'>('overview');

  // Audio & Subtitles State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPausedAudio, setIsPausedAudio] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Update sentences when document or language changes
  useEffect(() => {
    if (document) {
      const activeExpl = document.translations?.[currentLanguage] || document.explanation;
      const script = activeExpl.spokenScript || activeExpl.simpleSummary || '';
      const splitSentences = script
        .split(/(?<=[.!?।])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      setSentences(splitSentences.length > 0 ? splitSentences : [script]);
      setActiveSentenceIndex(0);
    }
  }, [document, currentLanguage]);

  const location = useLocation();

  // Auto-load sample documents or direct passed files from Landing Page
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sampleParam = searchParams.get('sample') || location.state?.sample;
    if (sampleParam === 'electricity') {
      const elecDoc = DEMO_DOCUMENTS.find(d => d.classification === 'ELECTRICITY_BILL' || d.billDetails) || DEMO_DOCUMENTS[0];
      setDocument(elecDoc);
      setPreviewUrl(elecDoc.imageDataUrl);
      setStep('results');
    } else if (sampleParam === 'kyc') {
      const kycDoc = DEMO_DOCUMENTS.find(d => d.classification === 'BANK_LETTER' || d.financialDetails) || DEMO_DOCUMENTS[1] || DEMO_DOCUMENTS[0];
      setDocument(kycDoc);
      setPreviewUrl(kycDoc.imageDataUrl);
      setStep('results');
    } else if (location.state?.file) {
      const file = location.state.file as File;
      setSelectedFile(file);
      if (location.state.previewUrl) {
        setPreviewUrl(location.state.previewUrl);
        startProcessing(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setPreviewUrl(url);
          startProcessing(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [location]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle file input
  const handleFileChange = (file: File) => {
    setFileError(null);
    const validExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'txt', 'docx'];
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(fileExt)) {
      setFileError('Supported formats: PDF, JPG, PNG, TXT, DOCX.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setFileError('File size exceeds 25MB limit.');
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      // For PDF / TXT / DOCX create generic icon preview
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Run the simplification pipeline
  const startProcessing = async (fileToProcess?: File, directDemoDoc?: ProcessedDocument) => {
    if (directDemoDoc) {
      setStep('processing');
      setProcessingProgress(20);
      setProcessingStage('Uploading document to secure pipeline...');
      await new Promise((r) => setTimeout(r, 400));
      setProcessingProgress(45);
      setProcessingStage('Extracting document text and key metadata...');
      await new Promise((r) => setTimeout(r, 450));
      setProcessingProgress(70);
      setProcessingStage('Isolating deadlines, amounts, and required actions...');
      await new Promise((r) => setTimeout(r, 450));
      setProcessingProgress(90);
      setProcessingStage(`Translating explanation into ${SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || 'selected language'}...`);
      await new Promise((r) => setTimeout(r, 400));
      setProcessingProgress(100);
      setDocument(directDemoDoc);
      setStep('results');
      return;
    }

    const file = fileToProcess || selectedFile;
    if (!file && !previewUrl) {
      setFileError('Please select a file to simplify.');
      return;
    }

    setStep('processing');
    setProcessingProgress(15);
    setProcessingStage('Uploading document to DocuSimplify pipeline...');

    try {
      let dataUrl = previewUrl || '';
      let textContent = '';

      if (file && file.type === 'text/plain') {
        textContent = await file.text();
      } else if (file && !dataUrl) {
        dataUrl = await new Promise((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(file);
        });
      }

      await new Promise((r) => setTimeout(r, 450));
      setProcessingProgress(35);
      setProcessingStage('Performing Optical OCR on document text...');

      await new Promise((r) => setTimeout(r, 550));
      setProcessingProgress(60);
      setProcessingStage('Analyzing document structure (Utility, Banking, Government, Notice)...');

      await new Promise((r) => setTimeout(r, 550));
      setProcessingProgress(80);
      setProcessingStage('Extracting dates, deadlines, amounts, and action items...');

      await new Promise((r) => setTimeout(r, 450));
      setProcessingProgress(95);
      setProcessingStage(`Preparing plain-language summary in ${SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || 'selected language'}...`);

      let resDoc: ProcessedDocument;
      try {
        resDoc = await processDocumentDirect(
          file?.name || 'document',
          dataUrl,
          'general',
          currentLanguage,
          textContent
        );
      } catch (err: any) {
        console.error('DocuSimplify direct processing error:', err);
        setFileError(err?.message || 'Document processing could not be completed. Please ensure the document is clear, legible, and uncorrupted.');
        setStep('upload');
        return;
      }

      setProcessingProgress(100);
      setProcessingStage('Document Simplified!');
      await new Promise((r) => setTimeout(r, 300));

      setDocument(resDoc);
      setStep('results');
    } catch (err) {
      console.error('DocuSimplify failure:', err);
      setFileError('Could not process this document. Please try again.');
      setStep('upload');
    }
  };

  // 1-Click Samples
  const handleLoadSample = (sampleType: 'electricity' | 'bank' | 'scholarship') => {
    let match = DEMO_DOCUMENTS[0];
    if (sampleType === 'electricity') {
      match = DEMO_DOCUMENTS.find((d) => d.documentClassification === 'ELECTRICITY_BILL') || DEMO_DOCUMENTS[0];
    } else if (sampleType === 'bank') {
      match = DEMO_DOCUMENTS.find((d) => d.documentClassification === 'BANK_LETTER') || DEMO_DOCUMENTS[1] || DEMO_DOCUMENTS[0];
    } else if (sampleType === 'scholarship') {
      match = DEMO_DOCUMENTS.find((d) => d.documentClassification === 'SCHOLARSHIP_DOC' || d.documentClassification === 'GOVERNMENT_NOTICE') || DEMO_DOCUMENTS[2] || DEMO_DOCUMENTS[0];
    }

    startProcessing(undefined, match);
  };

  // Audio Playback
  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window) || sentences.length === 0) return;

    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();
    playSentence(0);
  };

  const playSentence = (index: number) => {
    if (index >= sentences.length) {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setActiveSentenceIndex(0);
      return;
    }

    setActiveSentenceIndex(index);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);

    const text = sentences[index];
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(currentLanguage) ||
        (currentLanguage === 'en' && v.lang.includes('en-IN'))
    );
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      playSentence(index + 1);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseAudio = () => {
    if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      setIsPlayingAudio(false);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setActiveSentenceIndex(0);
    }
  };

  const handleReplayAudio = () => {
    handleStopAudio();
    setTimeout(() => {
      playSentence(0);
    }, 150);
  };

  const handleCopySummary = () => {
    if (!document) return;
    const expl = document.translations?.[currentLanguage] || document.explanation;
    const summary = `DocuEase AI — ${document.detectedCategoryLabel || document.name}\n\nSummary:\n${expl.simpleSummary}\n\nWhat to do:\n${expl.breakdown?.whatToDo || ''}\n\nImportant Amount: ${expl.breakdown?.importantAmounts || 'N/A'}\nDeadline: ${expl.breakdown?.deadline || 'N/A'}`;

    navigator.clipboard.writeText(summary).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleDownloadExplanation = () => {
    if (!document) return;
    const expl = document.translations?.[currentLanguage] || document.explanation;
    const content = `DOCUEASE AI — SIMPLIFIED DOCUMENT SUMMARY
Document: ${document.name}
Category: ${document.detectedCategoryLabel || document.type}
Language: ${expl.languageName}
Processed Date: ${new Date().toLocaleDateString()}

==================================================
SIMPLE SUMMARY
==================================================
${expl.simpleSummary}

==================================================
KEY AMOUNTS & CHARGES
==================================================
${expl.breakdown?.importantAmounts || 'No specific fees flagged'}

==================================================
DEADLINES & DATES
==================================================
${expl.breakdown?.deadline || 'No hard deadline stated'}

==================================================
REQUIRED ACTIONS
==================================================
${expl.breakdown?.whatToDo || 'Review official document'}

==================================================
ORIGINAL EXTRACTED TEXT
==================================================
${document.rawOcrText || ''}

==================================================
DISCLAIMER
==================================================
This explanation is provided for general accessibility and comprehension. 
It does not constitute official legal, financial, or regulatory advice.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `DocuSimplify_${document.name.replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    handleStopAudio();
    setStep('upload');
    setSelectedFile(null);
    setPreviewUrl(null);
    setDocument(null);
    setFileError(null);
  };

  const activeExplanation = document
    ? document.translations?.[currentLanguage] || document.explanation
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Top Back to Start Navigation Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToStart || handleReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200 shadow-sm transition hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-600" />
          <span>← Back to Start / Upload Another</span>
        </button>

        {/* 20-Language Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <Globe className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Voice &amp; Language:</span>
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="text-xs font-black bg-transparent text-slate-800 focus:outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold mb-2 border border-cyan-200">
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>DocuSimplify AI • Page 2 Explainer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Universal Document Simplifier
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simplify confusing electricity bills, bank notices, government circulars, and agreements into clear everyday language.
          </p>
        </div>

        {step === 'results' && (
          <button
            onClick={handleReset}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100/80 text-cyan-800 text-xs font-bold transition border border-cyan-200 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simplify Another Document</span>
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* STEP 1: UPLOAD WORKFLOW                                  */}
      {/* ======================================================== */}
      {step === 'upload' && (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.docx"
            className="hidden"
          />

          {/* Main Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white ${
              selectedFile
                ? 'border-cyan-500 bg-cyan-50/20'
                : 'border-slate-300 hover:border-cyan-500 hover:bg-cyan-50/10'
            }`}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                {previewUrl ? (
                  <div className="relative max-w-sm rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-6 bg-slate-100">
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className="max-h-72 w-auto object-contain"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10" />
                  </div>
                )}

                <div className="text-sm font-semibold text-slate-800 mb-1">
                  {selectedFile.name}
                </div>
                <div className="text-xs text-slate-500 mb-6">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready to analyze
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => startProcessing()}
                    className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md shadow-cyan-600/20 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Simplify Document</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
                  >
                    Change File
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Upload any document to simplify
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6">
                  Electricity bills, water bills, bank letters, government notices, school letters, insurance, or agreements.
                </p>

                {fileError && (
                  <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose File (PDF, Images, TXT, DOCX)</span>
                </button>
              </div>
            )}
          </div>

          {/* 1-Click Interactive Demo Samples */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Instant 1-Click Verification Test
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Test DocuSimplify AI immediately with these real-world sample documents:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleLoadSample('electricity')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-900">
                  Electricity Bill
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  184 Units • ₹742.00 Due Date 15 Oct 2026
                </div>
              </button>

              <button
                onClick={() => handleLoadSample('bank')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-900">
                  Bank Re-KYC Notice
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Mandatory Re-KYC • Anti-scam caution
                </div>
              </button>

              <button
                onClick={() => handleLoadSample('scholarship')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-900">
                  Govt Scholarship Letter
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Ministry Sanction Grant • ₹36,000
                </div>
              </button>
            </div>
          </div>

          {/* Legal / Financial Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs leading-relaxed flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 font-bold">Informational Disclaimer:</strong> DocuSimplify provides accessible plain-language explanations to assist comprehension. It does not constitute professional legal, tax, or financial advice. Always verify critical payments with your official service provider.
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: PROCESSING SCREEN                                */}
      {/* ======================================================== */}
      {step === 'processing' && (
        <div className="max-w-lg mx-auto py-16 px-4 text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-4 animate-spin">
              <span className="w-8 h-8 rounded-full border-3 border-cyan-200 border-t-cyan-600" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              {processingStage}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Translating dense terminology, extracting due dates and amounts, and building synchronized speech.
            </p>

            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-cyan-700">{processingProgress}% Complete</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: RESULTS VIEW                                     */}
      {/* ======================================================== */}
      {step === 'results' && document && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Summary Banner */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {document.detectedCategoryLabel || document.type}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  {document.name}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {document.detectedCategoryLabel || 'Document Overview'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copySuccess ? 'Copied!' : 'Copy Summary'}</span>
              </button>
              <button
                onClick={handleDownloadExplanation}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Summary</span>
              </button>
            </div>
          </div>

          {/* 4 Crucial Fact Badges (Amounts, Due Date, Required Action, Scam Caution) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Important Amount */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Important Amount
                </span>
                <IndianRupee className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-extrabold text-emerald-700">
                {document.explanation.breakdown?.importantAmounts || 'No payment due'}
              </div>
              <div className="text-[11px] text-emerald-800/80 mt-1">
                Preserved verbatim from source document
              </div>
            </div>

            {/* 2. Deadlines / Important Dates */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Due Date / Deadline
                </span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl font-extrabold text-amber-700">
                {document.explanation.breakdown?.deadline || 'No deadline flagged'}
              </div>
              <div className="text-[11px] text-amber-800/80 mt-1">
                Pay on or before to avoid late surcharge
              </div>
            </div>

            {/* 3. Action Item */}
            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-950 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
                  Required Action
                </span>
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="text-sm font-bold text-cyan-900 line-clamp-2">
                {document.explanation.breakdown?.whatToDo || 'Review details'}
              </div>
              <div className="text-[11px] text-cyan-800/80 mt-1">
                Concrete steps required from you
              </div>
            </div>

            {/* 4. Attention / Caution */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  What To Watch
                </span>
                <Clock className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-2">
                {document.explanation.breakdown?.whatToWatch || 'Keep a copy for your records.'}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Official scam &amp; surcharge advice
              </div>
            </div>
          </div>

          {/* Main Grid: Left Explanations & Right 3D Milo Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Explanations & Tabs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'overview'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Plain Explanation
                </button>

                <button
                  onClick={() => setActiveTab('original')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'original'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Original Extracted Text
                </button>

                <button
                  onClick={() => setActiveTab('jargon')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'jargon'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Difficult Words Meaning
                </button>
              </div>

              {/* Tab 1: Plain Explanation */}
              {activeTab === 'overview' && (
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Simple Summary ({activeExplanation?.languageName || 'Selected Language'})
                    </h3>
                    <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-sm text-slate-800 leading-relaxed font-medium">
                      {activeExplanation?.simpleSummary || 'No summary available.'}
                    </div>
                  </div>

                  {/* 7-Point Breakdown Matrix */}
                  {activeExplanation?.breakdown && (
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Clear Breakdown
                      </h4>

                      <div className="grid grid-cols-1 gap-3 text-xs">
                        {activeExplanation.breakdown.whatIsThis && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-0.5">1. What is this document?</span>
                            <span className="text-slate-700 leading-relaxed">{activeExplanation.breakdown.whatIsThis}</span>
                          </div>
                        )}

                        {activeExplanation.breakdown.whatItSays && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-0.5">2. What does it say?</span>
                            <span className="text-slate-700 leading-relaxed">{activeExplanation.breakdown.whatItSays}</span>
                          </div>
                        )}

                        {activeExplanation.breakdown.whatToDo && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-0.5">3. What do I need to do?</span>
                            <span className="text-slate-700 leading-relaxed">{activeExplanation.breakdown.whatToDo}</span>
                          </div>
                        )}

                        {activeExplanation.breakdown.whatToWatch && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-0.5">4. What should I pay attention to?</span>
                            <span className="text-slate-700 leading-relaxed">{activeExplanation.breakdown.whatToWatch}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Original Extracted Text */}
              {activeTab === 'original' && (
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-slate-900">
                      Raw Extracted Text
                    </h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(document.rawOcrText || '');
                        alert('Original text copied to clipboard!');
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                      Copy Raw Text
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {document.rawOcrText || 'No text extracted.'}
                  </div>
                </div>
              )}

              {/* Tab 3: Difficult Words Dictionary */}
              {activeTab === 'jargon' && (
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Difficult Jargon &amp; Words Meaning
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Complex bureaucratic and legal terminology translated into ordinary words:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900">Re-KYC (Know Your Customer)</div>
                      <div className="text-xs text-slate-600 mt-1">
                        Periodic verification where the bank checks your address and identity proof to keep your account active.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900">Fuel Surcharge / FSA</div>
                      <div className="text-xs text-slate-600 mt-1">
                        An extra government fee added to electricity bills when fuel/coal prices fluctuate during power generation.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900">Late Payment Surcharge</div>
                      <div className="text-xs text-slate-600 mt-1">
                        A penalty fee added to your bill if payment is submitted after the specified due date.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900">Indemnity / Aforementioned</div>
                      <div className="text-xs text-slate-600 mt-1">
                        "Indemnity" means promising to cover someone's financial loss. "Aforementioned" simply means "the thing mentioned earlier."
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: 3D Milo Speech Studio & Subtitles */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="rounded-3xl bg-gradient-to-b from-white to-cyan-50/30 border border-cyan-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-600" />
                    <span>Krish X Tattva — 3D Voice Guide</span>
                  </h3>

                  <button
                    onClick={() => {
                      const speeds = [0.75, 1.0, 1.25];
                      const next = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                      setPlaybackSpeed(speeds[next]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Speed: {playbackSpeed}x
                  </button>
                </div>

                {/* Krish X Tattva 3D Avatar */}
                <KrishXTattvaAvatar
                  mood={isPlayingAudio ? 'speaking' : 'idle'}
                  isSpeaking={isPlayingAudio}
                  activeSentence={isPlayingAudio ? sentences[activeSentenceIndex] : undefined}
                  compact={true}
                  characterTitle="Krish X Tattva"
                  language={currentLanguage}
                  showControls={false}
                  className="w-full my-1"
                />

                {/* Subtitles Box */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white min-h-[5.5rem] flex flex-col justify-center text-center shadow-inner">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                    Live Subtitles ({activeExplanation?.languageName || 'Selected Language'})
                  </span>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {sentences[activeSentenceIndex] || activeExplanation?.spokenScript || 'Click Listen to Explanation.'}
                  </p>
                </div>

                {/* Speech Playback Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  {!isPlayingAudio ? (
                    <button
                      onClick={handlePlayAudio}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isPausedAudio ? 'Resume' : 'Listen to Explanation'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseAudio}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </button>
                  )}

                  <button
                    onClick={handleStopAudio}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                    title="Stop playback"
                  >
                    <Square className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReplayAudio}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                    title="Replay from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                <button
                  onClick={handleCopySummary}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Explanation'}</span>
                </button>

                <button
                  onClick={handleDownloadExplanation}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Explanation (TXT)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Simplify Another Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocuSimplifyView;
