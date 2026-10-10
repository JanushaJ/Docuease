import React, { useState, useEffect } from 'react';
import { 
  ProcessedDocument, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES,
  ExplanationLevel
} from '../types/medscript';
import { 
  buildCurriculumFromDocument, 
  DocumentCurriculum, 
  TeacherStep 
} from '../services/teacherCurriculum';
import { TeacherAvatar3D } from './TeacherAvatar3D';
import { SynchronizedDocumentViewer } from './SynchronizedDocumentViewer';
import { InteractiveRangeBar } from './Visuals/InteractiveRangeBar';
import { OrganDiagramExplainer } from './Visuals/OrganDiagramExplainer';
import { PrescriptionSchedule } from './Visuals/PrescriptionSchedule';
import { HandwritingInspector } from './Visuals/HandwritingInspector';
import { ExplainEveryPartView } from './ExplainEveryPartView';
import { MedicalExplanationMode } from './MedicalExplanationMode';
import { AskDocumentChat } from './AskDocumentChat';
import { WhatDidILearnModal } from './WhatDidILearnModal';
import { ResultDashboard } from './ResultDashboard';
import { ShowMeWhatAIReadModal } from './ShowMeWhatAIReadModal';
import { speechManager } from '../utils/speech';
import { 
  BookOpen, 
  Layout, 
  FileText, 
  Sparkles, 
  Stethoscope, 
  MessageSquare, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Download, 
  Share2, 
  ArrowLeft,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export interface DocuvaTeacherDashboardProps {
  document: ProcessedDocument;
  onBackToUpload: () => void;
  onDeleteDocument?: (id: string) => void;
}

export type ViewLayout = 'side_by_side' | 'ai_explanation' | 'original_document';
export type DashboardTab = 'teacher_mode' | 'results_dashboard' | 'explain_every_part' | 'medical_mode' | 'ask_chat';

export const DocuvaTeacherDashboard: React.FC<DocuvaTeacherDashboardProps> = ({
  document,
  onBackToUpload,
  onDeleteDocument
}) => {
  // Curriculum state
  const [curriculum, setCurriculum] = useState<DocumentCurriculum>(() => 
    buildCurriculumFromDocument(document)
  );

  useEffect(() => {
    setCurriculum(buildCurriculumFromDocument(document));
    setCurrentStepIndex(0);
  }, [document]);

  // Layout & Tab Navigation
  const [viewLayout, setViewLayout] = useState<ViewLayout>('side_by_side');
  const [activeTab, setActiveTab] = useState<DashboardTab>('teacher_mode');

  // Step Navigation
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep: TeacherStep = curriculum.steps[currentStepIndex] || curriculum.steps[0];

  // Speech & Avatar state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [language, setLanguage] = useState<SupportedLanguage>(document.selectedLanguage || 'en');
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');
  const [explanationStyle, setExplanationStyle] = useState<ExplanationLevel>('simple');

  // Modals & Drawers
  const [showGraduationModal, setShowGraduationModal] = useState<boolean>(false);
  const [showTranscriptDrawer, setShowTranscriptDrawer] = useState<boolean>(false);
  const [showWhatAIReadModal, setShowWhatAIReadModal] = useState<boolean>(false);

  // Play spoken explanation for the active step
  const speakCurrentStep = (step: TeacherStep, lang: SupportedLanguage, speed: number) => {
    if (isMuted) return;

    // Pick translated spoken script if available
    let scriptToSpeak = step.spokenScript;
    if (lang !== 'en' && step.translations && step.translations[lang]) {
      scriptToSpeak = step.translations[lang];
    } else if (lang !== 'en' && document.translations && document.translations[lang]) {
      scriptToSpeak = document.translations[lang].spokenScript || scriptToSpeak;
    }

    speechManager.speakScript(
      scriptToSpeak,
      lang,
      {
        onStart: () => setIsSpeaking(true),
        onSentenceChange: (_idx, text) => setActiveSubtitle(text),
        onEnd: () => {
          setIsSpeaking(false);
          setActiveSubtitle('');
        },
        onError: () => {
          setIsSpeaking(false);
          setActiveSubtitle('');
        }
      },
      speed
    );
  };

  // Play / Pause controls
  const handlePlay = () => {
    speakCurrentStep(currentStep, language, playbackSpeed);
  };

  const handlePause = () => {
    speechManager.pause();
    setIsSpeaking(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < curriculum.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const nextStep = curriculum.steps[nextIdx];
      speakCurrentStep(nextStep, language, playbackSpeed);
    } else {
      // Reached the end of the lesson! Trigger graduation summary modal
      setShowGraduationModal(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const prevStep = curriculum.steps[prevIdx];
      speakCurrentStep(prevStep, language, playbackSpeed);
    }
  };

  const handleSelectStep = (idx: number) => {
    setCurrentStepIndex(idx);
    const step = curriculum.steps[idx];
    speakCurrentStep(step, language, playbackSpeed);
  };

  const handleToggleMute = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    }
    setIsMuted(prev => !prev);
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (isSpeaking) {
      speechManager.stop();
      speakCurrentStep(currentStep, newLang, playbackSpeed);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    speechManager.setRate(newSpeed);
  };

  const handleReplay = () => {
    speakCurrentStep(currentStep, language, playbackSpeed);
  };

  const isMedicalDoc = document.type === 'medical' || document.categoryGroup === 'medical';

  return (
    <div className="flex flex-col min-h-screen w-full bg-darkblue-900 text-cream-100 font-sans pb-16">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 w-full bg-darkblue-950/95 border-b border-darkblue-700/80 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand & Back to Upload */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToUpload}
              className="p-2 rounded-xl bg-darkblue-850 hover:bg-darkblue-800 text-cream-200 border border-darkblue-700 hover:border-gold-accent/50 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Upload New</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-cream-50 font-sans">
                  Krishxtattva
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/20 text-gold-accent border border-gold-500/30">
                  UNIVERSAL AI GUIDE
                </span>
              </div>
              <p className="text-[11px] text-cream-400 truncate max-w-[220px] sm:max-w-md">
                {document.name}
              </p>
            </div>
          </div>

          {/* Center: View Layout Switcher (Side-by-side, Original, AI) */}
          <div className="hidden lg:flex items-center bg-darkblue-900 rounded-xl p-1 border border-darkblue-700 text-xs font-semibold">
            <button
              onClick={() => setViewLayout('original_document')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewLayout === 'original_document'
                  ? 'bg-darkblue-800 text-cream-50 shadow-sm'
                  : 'text-cream-400 hover:text-cream-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Original Document</span>
            </button>

            <button
              onClick={() => setViewLayout('side_by_side')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewLayout === 'side_by_side'
                  ? 'bg-gold-500 text-darkblue-950 font-bold shadow-md'
                  : 'text-cream-400 hover:text-cream-100'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Side-by-Side Teaching</span>
            </button>

            <button
              onClick={() => setViewLayout('ai_explanation')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewLayout === 'ai_explanation'
                  ? 'bg-darkblue-800 text-cream-50 shadow-sm'
                  : 'text-cream-400 hover:text-cream-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
              <span>AI Explanation</span>
            </button>
          </div>

          {/* Right: Graduation & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGraduationModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-darkblue-950 font-bold text-xs shadow-md hover:shadow-gold-500/20 transition-all active:scale-98"
            >
              <GraduationCap className="w-4 h-4" />
              <span>What I Learned</span>
            </button>
          </div>
        </div>
      </header>

      {/* Privacy & Zero-Fabrication Notice Bar */}
      <div className="w-full bg-darkblue-950/80 border-b border-darkblue-800/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] text-cream-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-emerald-300">Private &amp; Grounded: </strong>
              Processed in-memory. Zero-fabrication verified against document numbers and cutoffs.
            </span>
          </div>
          <span className="text-cream-500 text-[10px]">
            Educational tool &bull; Does not replace qualified clinical diagnosis
          </span>
        </div>
      </div>

      {/* Main Tab Bar (Teacher Mode, Explain Every Part, Medical Mode, Ask Chat) */}
      <div className="w-full bg-darkblue-900 border-b border-darkblue-800 px-4 sm:px-6 pt-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('teacher_mode')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'teacher_mode'
                ? 'border-gold-accent text-gold-accent'
                : 'border-transparent text-cream-400 hover:text-cream-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>TEACHER MODE (Primary)</span>
          </button>

          <button
            onClick={() => setActiveTab('results_dashboard')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'results_dashboard'
                ? 'border-gold-accent text-gold-accent'
                : 'border-transparent text-cream-400 hover:text-cream-200'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Universal Results Dashboard (5 Tabs)</span>
          </button>

          <button
            onClick={() => setActiveTab('explain_every_part')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'explain_every_part'
                ? 'border-gold-accent text-gold-accent'
                : 'border-transparent text-cream-400 hover:text-cream-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Explain Every Part</span>
          </button>

          {isMedicalDoc && (
            <button
              onClick={() => setActiveTab('medical_mode')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'medical_mode'
                  ? 'border-gold-accent text-gold-accent'
                  : 'border-transparent text-cream-400 hover:text-cream-200'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Medical Document Mode (9 Sections)</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('ask_chat')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ask_chat'
                ? 'border-gold-accent text-gold-accent'
                : 'border-transparent text-cream-400 hover:text-cream-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask This Document</span>
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* ======================================================== */}
        {/* TAB 1: TEACHER MODE (Core Experience with 3D Avatar + Synced Document) */}
        {/* ======================================================== */}
        {activeTab === 'teacher_mode' && (
          <div className="flex flex-col gap-5">
            {/* View Layout Switcher for Mobile/Tablet */}
            <div className="flex lg:hidden items-center justify-center bg-darkblue-950 p-1 rounded-xl border border-darkblue-700 text-xs">
              <button
                onClick={() => setViewLayout('side_by_side')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  viewLayout === 'side_by_side' ? 'bg-gold-500 text-darkblue-950' : 'text-cream-400'
                }`}
              >
                Split Screen
              </button>
              <button
                onClick={() => setViewLayout('original_document')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  viewLayout === 'original_document' ? 'bg-darkblue-800 text-cream-100' : 'text-cream-400'
                }`}
              >
                Document
              </button>
              <button
                onClick={() => setViewLayout('ai_explanation')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  viewLayout === 'ai_explanation' ? 'bg-darkblue-800 text-cream-100' : 'text-cream-400'
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Split Screen Grid (Side-by-side or stacked depending on layout) */}
            <div className={`grid gap-6 ${
              viewLayout === 'side_by_side' 
                ? 'grid-cols-1 lg:grid-cols-12 items-start' 
                : 'grid-cols-1'
            }`}>
              {/* LEFT COLUMN: Synchronized Document Viewer */}
              {(viewLayout === 'side_by_side' || viewLayout === 'original_document') && (
                <div className={`${viewLayout === 'side_by_side' ? 'lg:col-span-6' : 'w-full'} h-[620px] sticky top-20`}>
                  <SynchronizedDocumentViewer
                    documentImageDataUrl={document.imageDataUrl}
                    documentTitle={document.name}
                    currentStep={currentStep}
                    allSteps={curriculum.steps}
                    onSelectStep={handleSelectStep}
                  />
                </div>
              )}

              {/* RIGHT COLUMN: 3D Teacher Avatar + Explanation Card */}
              {(viewLayout === 'side_by_side' || viewLayout === 'ai_explanation') && (
                <div className={`${viewLayout === 'side_by_side' ? 'lg:col-span-6' : 'w-full'} flex flex-col gap-4`}>
                  {/* 3D AI Teacher Avatar Card */}
                  <TeacherAvatar3D
                    currentStep={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={curriculum.steps.length}
                    isSpeaking={isSpeaking}
                    isMuted={isMuted}
                    playbackSpeed={playbackSpeed}
                    language={language}
                    activeSubtitleSentence={activeSubtitle}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep}
                    onToggleMute={handleToggleMute}
                    onLanguageChange={handleLanguageChange}
                    onSpeedChange={handleSpeedChange}
                    onReplayStep={handleReplay}
                    onToggleTranscript={() => setShowTranscriptDrawer(prev => !prev)}
                    showTranscript={showTranscriptDrawer}
                  />

                  {/* Dynamic Visual Widget (Range Bar / Organ Diagram / Schedule) */}
                  {currentStep.visualType === 'range_bar' && currentStep.visualData && (
                    <InteractiveRangeBar data={currentStep.visualData} />
                  )}

                  {currentStep.visualType === 'organ_diagram' && (
                    <OrganDiagramExplainer />
                  )}

                  {currentStep.visualType === 'prescription_schedule' && (
                    <PrescriptionSchedule medications={document.structuredMeds} />
                  )}

                  {/* Handwriting inspection if present */}
                  {document.uncertainWords && document.uncertainWords.length > 0 && (
                    <HandwritingInspector uncertainWords={document.uncertainWords} />
                  )}

                  {/* Main Cream Luxury Teaching Card (7-part Teacher Structure) */}
                  <div className="cream-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-cream-300 text-darkblue-950">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-cream-250">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gold-500 text-darkblue-950 font-mono">
                            STEP {currentStep.stepNumber} OF {currentStep.totalSteps}
                          </span>
                          <span className="text-xs font-bold text-cream-700 font-sans">
                            {currentStep.badgeLabel}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-darkblue-950 font-sans leading-tight">
                          {currentStep.title}
                        </h3>
                      </div>
                    </div>

                    {/* Original Document Snippet Box */}
                    <div className="p-3 rounded-xl bg-cream-100 border border-cream-250">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-cream-700 block mb-1">
                        Original Document Wording:
                      </span>
                      <p className="font-mono font-bold text-xs text-darkblue-950">
                        "{currentStep.whatDoesItSay}"
                      </p>
                    </div>

                    {/* 7-Part Teacher Explanation Breakdown */}
                    <div className="grid grid-cols-1 gap-3.5 text-xs text-darkblue-950">
                      {/* 1. What is it? */}
                      <div>
                        <strong className="text-darkblue-900 font-extrabold block text-[11px] uppercase tracking-wider mb-0.5 text-gold-700">
                          1. What is it?
                        </strong>
                        <p className="text-darkblue-900 leading-relaxed font-sans">
                          {currentStep.whatIsIt}
                        </p>
                      </div>

                      {/* 2. Why is it present? */}
                      <div>
                        <strong className="text-darkblue-900 font-extrabold block text-[11px] uppercase tracking-wider mb-0.5 text-gold-700">
                          2. Why is it present in this document?
                        </strong>
                        <p className="text-darkblue-900 leading-relaxed font-sans">
                          {currentStep.whyIsItThere}
                        </p>
                      </div>

                      {/* 3. What does it mean in simple language? */}
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                        <strong className="text-emerald-900 font-extrabold block text-[11px] uppercase tracking-wider mb-0.5">
                          3. What does this mean in simple words?
                        </strong>
                        <p className="text-emerald-950 leading-relaxed font-sans font-medium text-xs">
                          {currentStep.simpleExplanation}
                        </p>
                      </div>

                      {/* 4. Why does this matter? */}
                      <div>
                        <strong className="text-darkblue-900 font-extrabold block text-[11px] uppercase tracking-wider mb-0.5 text-gold-700">
                          4. Why does this matter?
                        </strong>
                        <p className="text-darkblue-900 leading-relaxed font-sans">
                          {currentStep.whyDoesItMatter}
                        </p>
                      </div>

                      {/* 5. Facts vs Interpretation */}
                      <div className="p-2.5 rounded-lg bg-cream-100 border border-cream-250 text-[11px] text-darkblue-900">
                        <strong className="text-cream-800 font-bold block mb-0.5">
                          5. Facts vs Interpretation:
                        </strong>
                        <p>{currentStep.factsVsInterpretation}</p>
                      </div>

                      {/* 6. Important Note */}
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
                        <strong className="text-amber-900 font-bold block mb-0.5">
                          6. Important Note &amp; Caveats:
                        </strong>
                        <p>{currentStep.importantNote}</p>
                      </div>
                    </div>

                    {/* Step Navigation Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-cream-250 mt-1">
                      <button
                        onClick={handlePreviousStep}
                        disabled={currentStepIndex <= 0}
                        className="px-3 py-1.5 rounded-lg bg-cream-150 hover:bg-cream-200 text-darkblue-900 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-all"
                      >
                        &larr; Previous Section
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-amber-500 text-darkblue-950 font-extrabold text-xs shadow-md transition-all active:scale-98 flex items-center gap-1.5"
                      >
                        <span>
                          {currentStepIndex >= curriculum.steps.length - 1 ? 'Finish & Review' : 'Next Section'}
                        </span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* ======================================================== */}
        {/* TAB: RESULTS DASHBOARD (Comprehensive 5 Tabs & Compare View) */}
        {/* ======================================================== */}
        {activeTab === 'results_dashboard' && (
          <div className="max-w-6xl mx-auto w-full">
            <ResultDashboard
              document={document}
              onOpenShowMeWhatAIRead={() => setShowWhatAIReadModal(true)}
              onLanguageChange={handleLanguageChange}
              activeSentenceIndex={0}
              isSpeaking={isSpeaking}
              onTriggerSpeak={handlePlay}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: EXPLAIN EVERY PART (Full Accordion Curriculum) */}
        {/* ======================================================== */}
        {activeTab === 'explain_every_part' && (
          <div className="max-w-4xl mx-auto">
            <ExplainEveryPartView
              steps={curriculum.steps}
              currentStepIndex={currentStepIndex}
              onSelectStep={(idx) => {
                handleSelectStep(idx);
                setActiveTab('teacher_mode');
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MEDICAL DOCUMENT MODE (The 9 Mandatory Sections) */}
        {/* ======================================================== */}
        {activeTab === 'medical_mode' && isMedicalDoc && (
          <div className="max-w-4xl mx-auto">
            <MedicalExplanationMode document={document} />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: ASK THIS DOCUMENT (Conversational AI Chat) */}
        {/* ======================================================== */}
        {activeTab === 'ask_chat' && (
          <div className="max-w-3xl mx-auto">
            <AskDocumentChat document={document} />
          </div>
        )}
      </main>

      {/* Graduation / Summary Modal */}
      <WhatDidILearnModal
        curriculum={curriculum}
        isOpen={showGraduationModal}
        onClose={() => setShowGraduationModal(false)}
        onExplainAgain={() => {
          setCurrentStepIndex(0);
          speakCurrentStep(curriculum.steps[0], language, playbackSpeed);
        }}
        onMakeItSimpler={() => {
          setExplanationStyle('very_simple');
          speakCurrentStep(currentStep, language, playbackSpeed);
        }}
        onShowVisual={() => {
          setActiveTab('teacher_mode');
        }}
        onExplainInLanguage={(lang) => {
          handleLanguageChange(lang);
        }}
        onAskQuestion={() => {
          setActiveTab('ask_chat');
        }}
      />

      {/* Show What AI Read Modal */}
      {showWhatAIReadModal && (
        <ShowMeWhatAIReadModal
          onClose={() => setShowWhatAIReadModal(false)}
          document={document}
        />
      )}
    </div>
  );
};

export { DocuvaTeacherDashboard as KrishxtattvaTeacherDashboard };
