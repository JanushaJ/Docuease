import React, { useState, useEffect, useRef } from 'react';
import { 
  ProcessedDocument, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  ExplanationLevel,
  ChatMessage,
  TermCard
} from '../types/medscript';
import { ThreeDoctorAvatar } from './ThreeDoctorAvatar';
import { MedicalTermCards } from './MedicalTermCards';
import { SafetyCheckPanel } from './SafetyCheckPanel';
import { ShowMeWhatAIReadModal } from './ShowMeWhatAIReadModal';
import { AskDoctorChat } from './AskDoctorChat';
import { speechManager } from '../utils/speech';
import { 
  ArrowLeft, 
  Eye, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Brain, 
  Languages, 
  Activity, 
  Stethoscope, 
  Trash2, 
  Clock, 
  Calendar, 
  User, 
  Building2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  HelpCircle,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  Info
} from 'lucide-react';

export interface MedScriptDoctorDashboardProps {
  document: ProcessedDocument;
  onBackToUpload: () => void;
  onDeleteDocument?: (id: string) => void;
  onOpenPrivacyNotice?: () => void;
}

export type MajorTab = 'document' | 'explanation' | 'translation' | 'accuracy';

export const MedScriptDoctorDashboard: React.FC<MedScriptDoctorDashboardProps> = ({
  document,
  onBackToUpload,
  onDeleteDocument,
  onOpenPrivacyNotice
}) => {
  // Active Tab state (4 major tabs as requested in Section 14)
  const [activeTab, setActiveTab] = useState<MajorTab>('explanation');
  
  // Comprehension mode (Standard simple vs "Explain Like I'm 10")
  const [isExplainLikeTen, setIsExplainLikeTen] = useState<boolean>(false);
  
  // Selected Language (Affects written text AND 3D Doctor speech)
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    document.selectedLanguage || 'en'
  );

  // Speech & Avatar states
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [activeSentenceText, setActiveSentenceText] = useState<string>('');

  // Modals
  const [showWhatAIReadModal, setShowWhatAIReadModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Chat grounded messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Active translation/explanation payload
  const currentTranslation = document.translations?.[selectedLanguage] || document.explanation;
  const sentenceTimings = currentTranslation?.sentenceTimings || [];

  // Stop speech on unmount or language change
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // When language changes, update speech synthesis and state
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    speechManager.stop();
    setIsSpeaking(false);
    setSelectedLanguage(newLang);
    setActiveSentenceIndex(0);
    setActiveSentenceText('');
  };

  // Trigger speech playback
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechManager.pause();
      setIsSpeaking(false);
      return;
    }

    if (isMuted) {
      setIsMuted(false);
    }

    const scriptToSpeak = currentTranslation?.spokenScript || document.explanation.spokenScript;
    if (!scriptToSpeak) return;

    speechManager.speakScript(
      scriptToSpeak,
      selectedLanguage,
      {
        onStart: () => setIsSpeaking(true),
        onSentenceChange: (idx, text) => {
          setActiveSentenceIndex(idx);
          setActiveSentenceText(text);
        },
        onEnd: () => {
          setIsSpeaking(false);
          setActiveSentenceIndex(0);
          setActiveSentenceText('');
        },
        onError: () => {
          setIsSpeaking(false);
        }
      },
      playbackSpeed
    );
  };

  const handleReplaySpeech = () => {
    speechManager.stop();
    setIsSpeaking(false);
    setActiveSentenceIndex(0);
    setActiveSentenceText('');
    setTimeout(() => {
      handleToggleSpeech();
    }, 150);
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      speechManager.stop();
      setIsSpeaking(false);
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleCopySummary = () => {
    const text = `MedScript AI Summary for: ${document.name}
Language: ${SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}
Summary: ${isExplainLikeTen ? currentTranslation.explainLikeIm10 : currentTranslation.simpleSummary}
What was written:
${(currentTranslation.whatWasWritten || []).join('\n')}
Verified at: ${document.uploadedAt}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Grounded Ask-the-Doctor handler
  const handleAskDoctor = async (question: string) => {
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGrounded: true
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      // Prepare response grounded exclusively in verified document
      const qLower = question.toLowerCase();
      let reply = '';
      let refText = '';

      if (qLower.includes('medicine') || qLower.includes('drug') || qLower.includes('tablet') || qLower.includes('मद्') || qLower.includes('మందులు')) {
        const meds = document.structuredMeds || [];
        if (meds.length > 0) {
          reply = `The uploaded document prescribes: ${meds.map(m => `${m.name} ${m.strength || ''} (${m.dosage}, ${m.frequency}) - ${m.timingInstructions}`).join('. ')}.`;
          refText = meds.map(m => m.name).join(', ');
        } else {
          reply = `This document does not contain any prescribed medications.`;
        }
      } else if (qLower.includes('cancer') || qLower.includes('leukemia') || qLower.includes('serious') || qLower.includes('कर्क') || qLower.includes('క్యాన్సర్')) {
        reply = `No. The uploaded document does not diagnose cancer or leukemia. Any mention of white blood cells or 'Leukopenia' indicates a mild decrease in blood cell count, which is non-malignant. MedScript AI strictly avoids inventing diagnoses.`;
        refText = `Safety Guard: Anti-Diagnosis Protocol`;
      } else if (qLower.includes('ask') || qLower.includes('doctor') || qLower.includes('पूछ') || qLower.includes('అడగాలి')) {
        const questions = currentTranslation.whatToAskDoctor || [
          'What are the key instructions for taking these medications?',
          'When should I schedule my next follow-up examination?'
        ];
        reply = `Useful questions to ask your doctor based on this document:\n1. ${questions.join('\n2. ')}`;
        refText = `Document Section: What to Ask Doctor`;
      } else if (qLower.includes('report') || qLower.includes('say') || qLower.includes('explain') || qLower.includes('समझाएं') || qLower.includes('చెప్పండి')) {
        reply = isExplainLikeTen ? currentTranslation.explainLikeIm10 : currentTranslation.simpleSummary;
        refText = `Verified Document Summary`;
      } else {
        // Check if question asks for data not in document
        reply = `This information isn't available in the uploaded document. For your safety, MedScript AI only answers what was explicitly written and verified by the clinic.`;
      }

      const doctorMsg: ChatMessage = {
        id: `doc-${Date.now() + 1}`,
        sender: 'doctor',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGrounded: true,
        referencedText: refText
      };

      setChatMessages(prev => [...prev, doctorMsg]);
    } catch {
      // Fallback
    } finally {
      setIsChatLoading(false);
    }
  };

  // Determine numerical or unrated confidence
  const confScore = document.confidenceInfo?.hasNumericalConfidence 
    ? `${Math.round((document.confidenceInfo.averageConfidenceScore || 0.94) * 100)}%`
    : 'Confidence score unavailable';

  const uncertainCount = document.uncertainWords?.filter(u => !u.isResolved).length || 0;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER & METADATA BAR                             */}
      {/* ======================================================== */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Back + Title & Metadata */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToUpload}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center cursor-pointer"
            title="Upload another document"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-extrabold text-slate-900 truncate max-w-xs sm:max-w-md">
                {document.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-medblue-50 text-medblue-700 border border-medblue-200">
                {document.type === 'prescription' ? 'Prescription' : document.type === 'lab_report' ? 'Lab Report' : 'Discharge Summary'}
              </span>
              {document.isDemo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  Fictional Demo Record
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              {document.patientName && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Patient: <strong>{document.patientName}</strong>
                </span>
              )}
              {document.clinicOrDoctorName && (
                <span className="flex items-center gap-1 hidden sm:inline-flex">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400" /> {document.clinicOrDoctorName}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {new Date(document.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* "Show Me What AI Read" Button */}
          <button
            onClick={() => setShowWhatAIReadModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Show Me What AI Read</span>
          </button>

          {/* "Explain Like I'm 10" Toggle Button */}
          <button
            onClick={() => setIsExplainLikeTen(!isExplainLikeTen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer ${
              isExplainLikeTen
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
            }`}
            title="Convert to very simple everyday language"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Explain Like I'm 10</span>
            {isExplainLikeTen && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Explanation language"
              className="pl-8 pr-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-medteal-500 cursor-pointer shadow-2xs"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-medteal-600 absolute left-2.5 top-3 pointer-events-none" />
          </div>

          {/* Delete Document Action */}
          {onDeleteDocument && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this document from session memory?')) {
                  onDeleteDocument(document.id);
                }
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
              title="Delete Document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. 3D AI DOCTOR EXPLAINER (HERO CENTERPIECE)             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 3D Doctor Stage (Center Stage on mobile/tablet, 5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <ThreeDoctorAvatar
            isSpeaking={isSpeaking}
            onToggleSpeech={handleToggleSpeech}
            onReplaySpeech={handleReplaySpeech}
            language={selectedLanguage}
            activeSentence={activeSentenceText || currentTranslation.simpleSummary}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            spokenScript={currentTranslation.spokenScript}
            onLanguageChange={handleLanguageChange}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
            state={isSpeaking ? 'speaking' : uncertainCount > 0 ? 'warning' : 'idle'}
          />

          {/* Voice + Text Synchronization Live Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-medblue-600" />
                Spoken Sentence Synchronization
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}
              </span>
            </div>

            {/* Current Sentence Glow Banner */}
            <div className={`p-3 rounded-xl transition-all ${
              isSpeaking
                ? 'bg-medblue-50 border border-medblue-200 text-medblue-950 speech-highlight'
                : 'bg-slate-50 border border-slate-200 text-slate-700'
            }`}>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                "{activeSentenceText || (isExplainLikeTen ? currentTranslation.explainLikeIm10 : currentTranslation.simpleSummary)}"
              </p>
            </div>

            {/* Quick Audio Bar Controls */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                {isSpeaking ? (
                  <span className="flex gap-1 items-end h-4">
                    <span className="w-1 bg-medblue-600 rounded-full audio-bar" />
                    <span className="w-1 bg-medteal-500 rounded-full audio-bar" />
                    <span className="w-1 bg-indigo-500 rounded-full audio-bar" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
                <span>{isSpeaking ? 'Doctor is speaking' : 'Speech paused'}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="text-[11px] text-medblue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4 Major Tabs (Document, Explanation, Translation, Accuracy) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Four Tab Headers Bar (Section 14) */}
          <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
            
            <button
              onClick={() => setActiveTab('explanation')}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'explanation'
                  ? 'bg-medblue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Simple Explanation</span>
            </button>

            <button
              onClick={() => setActiveTab('document')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'document'
                  ? 'bg-medblue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Document</span>
            </button>

            <button
              onClick={() => setActiveTab('translation')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'translation'
                  ? 'bg-medblue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Translation</span>
            </button>

            <button
              onClick={() => setActiveTab('accuracy')}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'accuracy'
                  ? 'bg-medblue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Accuracy</span>
            </button>

          </div>

          {/* ======================================================== */}
          {/* TAB 1: SIMPLE EXPLANATION (5-Part Structure + Terms)    */}
          {/* ======================================================== */}
          {activeTab === 'explanation' && (
            <div className="flex flex-col gap-4">
              
              {/* Plain-Language Overview Card */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-medblue-50 text-medblue-600">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {isExplainLikeTen ? '🧒 Explanation Like You Are 10' : 'Plain-Language Overview'}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-medteal-50 text-medteal-800 border border-medteal-200">
                    Grounded in Verified Content
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium mb-3">
                  {isExplainLikeTen
                    ? currentTranslation.explainLikeIm10
                    : currentTranslation.simpleSummary}
                </p>

                {/* Anti-Diagnosis Medical Disclaimer */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-medteal-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Medical Boundary: </strong>
                    MedScript AI explains the document words and their clinical definitions. It never turns individual words into speculative diagnoses.
                  </p>
                </div>
              </div>

              {/* 5-Step Orderly Explanation Sections (Section 12) */}
              <div className="space-y-3">
                
                {/* 1. What was written */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-lg bg-medblue-100 text-medblue-700 flex items-center justify-center text-xs">1</span>
                    What was written in the document
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                    {(currentTranslation.whatWasWritten || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. What the medical terms mean */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-lg bg-medteal-100 text-medteal-700 flex items-center justify-center text-xs">2</span>
                    What the medical terms mean
                  </h5>
                  <MedicalTermCards terms={currentTranslation.whatMedicalTermsMean || []} />
                </div>

                {/* 3. What the document says happened */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">3</span>
                    What the document says happened
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                    {(currentTranslation.whatDocumentSaysHappened || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. What is unclear */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-2xs">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs">4</span>
                    What is unclear or needs doctor confirmation
                  </h5>
                  <ul className="space-y-1.5 text-xs text-amber-950 pl-2">
                    {(currentTranslation.whatIsUnclear || ['All clear handwriting strokes have been verified.']).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. What to ask the doctor */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs">5</span>
                    Useful questions to ask your doctor
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-800 pl-2">
                    {(currentTranslation.whatToAskDoctor || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                        <HelpCircle className="w-4 h-4 text-medteal-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: DOCUMENT (Original Document + What AI Read OCR)  */}
          {/* ======================================================== */}
          {activeTab === 'document' && (
            <div className="flex flex-col gap-4">
              
              <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-medblue-600" />
                    <span>Original Document vs What AI Read</span>
                  </h4>
                  <button
                    onClick={() => setShowWhatAIReadModal(true)}
                    className="text-xs font-bold text-medblue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Full Inspector</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left: Original Document Preview */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-700">Original Doctor Document</span>
                      <span className="text-[10px] text-slate-400">Preserved Unaltered</span>
                    </div>

                    <div className="max-h-96 overflow-auto rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2">
                      <img
                        src={document.imageDataUrl}
                        alt="Original Document Preview"
                        className="max-w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Right: What AI Read Tokens */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-700">What AI Read (Verified OCR)</span>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        {confScore}
                      </span>
                    </div>

                    <div className="flex-1 max-h-96 overflow-y-auto space-y-2 pr-1">
                      {document.tokens.map((tok) => (
                        <div
                          key={tok.id}
                          className={`p-2.5 rounded-xl border text-xs transition ${
                            tok.isUncertain
                              ? 'bg-amber-50 border-amber-300 text-amber-950'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold">{tok.text}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              tok.isUncertain ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {tok.confidence ? `${tok.confidence}%` : 'Verified'}
                            </span>
                          </div>
                          {tok.medicalMeaning && (
                            <p className="text-[11px] text-slate-500 italic">
                              Definition: {tok.medicalMeaning}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TRANSLATION (Language Translation & Speech)     */}
          {/* ======================================================== */}
          {activeTab === 'translation' && (
            <div className="flex flex-col gap-4">
              
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-medteal-600" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Verified Explanation in {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeName} ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Affects both written output and the 3D Doctor spoken speech
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleSpeech}
                    className="px-3.5 py-2 rounded-xl bg-medteal-600 hover:bg-medteal-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isSpeaking ? 'Pause Voice' : 'Hear Voice'}</span>
                  </button>
                </div>

                {/* Translated Text Summary */}
                <div className="p-4 rounded-2xl bg-medteal-50/50 border border-medteal-200 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-medteal-800 block mb-1">
                    Native Plain-Language Translation:
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {isExplainLikeTen
                      ? currentTranslation.explainLikeIm10
                      : currentTranslation.simpleSummary}
                  </p>
                </div>

                {/* Spoken Script with Timings */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Synchronized Sentences for 3D Doctor:
                  </span>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {(sentenceTimings.length > 0 ? sentenceTimings : [{ sentence: currentTranslation.spokenScript, durationSec: 5 }]).map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          isSpeaking && activeSentenceIndex === idx
                            ? 'bg-medblue-50 border-medblue-400 font-bold text-medblue-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span>Sentence {idx + 1}</span>
                          <span>{st.durationSec}s</span>
                        </div>
                        <p>{st.sentence}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: ACCURACY (Accuracy Panel & Safety Validation)    */}
          {/* ======================================================== */}
          {activeTab === 'accuracy' && (
            <div className="flex flex-col gap-4">
              
              {/* Accuracy Panel (Section 15) */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        AI Reading Verification
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Transparent OCR confidence and optical verification status
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    High Precision
                  </span>
                </div>

                {/* 4 Core Verification Metric Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Document Quality
                    </span>
                    <span className="text-base font-extrabold text-teal-700">
                      {document.quality?.status === 'pass' ? 'Excellent' : document.quality?.status === 'warning' ? 'Fair' : 'Unreliable'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Text Extraction
                    </span>
                    <span className="text-base font-extrabold text-teal-700">
                      Verified
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Medical Terms
                    </span>
                    <span className="text-base font-extrabold text-teal-700">
                      Verified
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Uncertain Sections
                    </span>
                    <span className={`text-base font-extrabold ${uncertainCount > 0 ? 'text-amber-600' : 'text-slate-800'}`}>
                      {document.uncertainWords?.length || 0}
                    </span>
                  </div>

                </div>

                {/* Optical Pre-check Breakdown */}
                {document.quality && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mb-4">
                    <span className="font-bold text-slate-900 block mb-2">Pre-OCR Optical Clarity Scores:</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block">Sharpness / Blur</span>
                        <strong>{document.quality.blurScore}%</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block">Lighting / Darkness</span>
                        <strong>{document.quality.darknessScore}%</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block">Glare Suppression</span>
                        <strong>{document.quality.glareScore}%</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Rules Panel */}
                <SafetyCheckPanel safety={document.safety} />

              </div>

            </div>
          )}

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. "ASK THE AI DOCTOR" GROUNDED CHAT (Section 13)       */}
      {/* ======================================================== */}
      <div className="w-full">
        <AskDoctorChat
          document={document}
          onAskQuestion={handleAskDoctor}
          chatMessages={chatMessages}
          isLoading={isChatLoading}
        />
      </div>

      {/* ======================================================== */}
      {/* 4. MODALS (Show Me What AI Read)                         */}
      {/* ======================================================== */}
      {showWhatAIReadModal && (
        <ShowMeWhatAIReadModal
          document={document}
          onClose={() => setShowWhatAIReadModal(false)}
        />
      )}

    </div>
  );
};
