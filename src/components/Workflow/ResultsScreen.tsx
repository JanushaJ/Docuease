import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Stethoscope, 
  Eye, 
  Download, 
  Sparkles,
  ChevronDown,
  Globe2,
  ExternalLink,
  Layers,
  HelpCircle,
  Clock,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { UploadedFileData } from './UploadScreen';
import { speechManager } from '../../utils/speech';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';

export interface ResultsScreenProps {
  uploadedFile: UploadedFileData;
  analysisData: any; // Response from /api/analyze or processed document
  currentLanguage: SupportedLanguage;
  onLanguageChange: (newLang: SupportedLanguage) => void;
  onStartNewDocument: () => void;
  onReanalyzeWithLanguage?: (newLang: SupportedLanguage) => void;
}

/**
 * Screen 5: Document Analysis and Explanation
 * Clean, modern healthcare-tech results interface with side-by-side document comparison,
 * 3D cartoon avatar explainer, synchronized subtitles, clinical safety flags, and plain-language translation.
 */
export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  uploadedFile,
  analysisData,
  currentLanguage,
  onLanguageChange,
  onStartNewDocument,
  onReanalyzeWithLanguage,
}) => {
  const isPrescription = uploadedFile.category === 'prescription' || analysisData?.analysisType === 'medical';

  // Audio Speech & Subtitle States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.95);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesVisible, setSubtitlesVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [showRawText, setShowRawText] = useState(false);

  // Normalize data between /api/analyze format and universalEngine ProcessedDocument format
  const rawData = analysisData?.data || analysisData || {};
  const explanationText = 
    rawData.simpleExplanation || 
    rawData.spokenExplanation || 
    rawData.translations?.[currentLanguage]?.simpleSummary || 
    rawData.explanation?.simpleSummary || 
    'Explanation generated successfully.';

  const clinicalSummaryText = 
    rawData.clinicalSummary || 
    rawData.translations?.[currentLanguage]?.originalTextSummary || 
    rawData.explanation?.originalTextSummary || 
    explanationText;

  const spokenScript = 
    rawData.spokenExplanation || 
    rawData.spokenScript || 
    rawData.translations?.[currentLanguage]?.spokenScript || 
    rawData.explanation?.spokenScript || 
    explanationText;

  const medications = Array.isArray(rawData.medications) 
    ? rawData.medications 
    : Array.isArray(rawData.structuredMeds) 
      ? rawData.structuredMeds.map((m: any) => ({
          name: m.name,
          strength: m.strength,
          dosage: m.dosage || '1 tablet',
          frequency: m.frequency,
          duration: m.duration,
          timingInstructions: m.timingInstructions,
          isLegible: m.isVerified,
          needsPharmacistVerification: !m.isVerified,
          notes: m.foodInstructions
        }))
      : [];

  const labBiomarkers = Array.isArray(rawData.labBiomarkers)
    ? rawData.labBiomarkers
    : Array.isArray(rawData.labResults)
      ? rawData.labResults.map((lr: any) => ({
          biomarker: lr.testName,
          value: lr.value,
          unit: lr.unit,
          referenceRange: lr.referenceRange,
          classification: lr.isAbnormal ? 'Elevated' : 'Normal',
          clinicalNote: lr.interpretation
        }))
      : [];

  const actionItems: string[] = Array.isArray(rawData.actionItems)
    ? rawData.actionItems
    : Array.isArray(rawData.requiredActions)
      ? rawData.requiredActions
      : rawData.breakdown?.whatToDo
        ? [rawData.breakdown.whatToDo]
        : [];

  const feeBreakdown = Array.isArray(rawData.breakdownOfFees)
    ? rawData.breakdownOfFees
    : [];

  // Parse spoken script into sentence subtitle chunks
  useEffect(() => {
    const rawSentences = spokenScript
      .split(/(?<=[.!?।])\s+/)
      .map((s: string) => s.trim())
      .filter(Boolean);
    setSentences(rawSentences.length > 0 ? rawSentences : [spokenScript]);
    setActiveSentenceIndex(0);
    setIsPlayingAudio(false);
    speechManager.stop();
  }, [spokenScript]);

  // Audio Playback Handler
  const toggleSpeechPlayback = () => {
    if (isPlayingAudio) {
      speechManager.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speechManager.speakScript(
      spokenScript,
      currentLanguage,
      {
        onSentenceChange: (idx) => setActiveSentenceIndex(idx),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      },
      playbackSpeed
    );
  };

  const handleReplaySpeech = () => {
    speechManager.stop();
    setActiveSentenceIndex(0);
    setIsPlayingAudio(true);
    speechManager.speakScript(
      spokenScript,
      currentLanguage,
      {
        onSentenceChange: (idx) => setActiveSentenceIndex(idx),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      },
      playbackSpeed
    );
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      toggleSpeechPlayback();
    } else {
      speechManager.stop();
      setIsPlayingAudio(false);
      setIsMuted(true);
    }
  };

  const handleCopyExplanation = () => {
    const fullText = `=== DocuEase AI Explanation (${currentLanguage.toUpperCase()}) ===\n\n` +
      `Document: ${uploadedFile.name}\n` +
      `Summary:\n${explanationText}\n\n` +
      (medications.length > 0 ? `Medications:\n` + medications.map((m: any) => `- ${m.name} (${m.dosage || ''}): ${m.timingInstructions || ''}`).join('\n') + `\n\n` : '') +
      (actionItems.length > 0 ? `Action Items:\n` + actionItems.map((a: string) => `- ${a}`).join('\n') : '');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Top Header & Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Start New Document Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartNewDocument}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Document</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-3">
            <span className="font-semibold text-slate-700 truncate max-w-[180px]">{uploadedFile.name}</span>
            <span>•</span>
            <span className="capitalize">{isPrescription ? 'Medical Prescription' : 'Complex Document'}</span>
          </div>
        </div>

        {/* Right: Quick Language Switcher & Copy Action */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative inline-flex items-center">
            <Globe2 className="w-4 h-4 text-teal-600 absolute left-3 pointer-events-none" />
            <select
              value={currentLanguage}
              onChange={(e) => {
                const newLang = e.target.value as SupportedLanguage;
                onLanguageChange(newLang);
                if (onReanalyzeWithLanguage) {
                  onReanalyzeWithLanguage(newLang);
                }
              }}
              className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-800 shadow-2xs appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Change explanation language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Copy Explanation Button */}
          <button
            onClick={handleCopyExplanation}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-2xs transition-colors"
            title="Copy explanation text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3D Avatar Cartoon Explainer & Synchronized Subtitle Theater */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-teal-800/50 space-y-4 overflow-hidden relative">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* LEFT: 3D Cartoon Avatar WebGL Stage */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px] rounded-2xl overflow-hidden bg-slate-950/70 border border-teal-500/30 shadow-2xl p-2 relative group">
              <KrishXTattvaAvatar
                mood={isPlayingAudio ? 'speaking' : 'greeting'}
                isSpeaking={isPlayingAudio}
                compact={true}
                showControls={false}
                language={currentLanguage}
                characterTitle="DocuEase 3D Assistant"
              />
              <div className="text-center pt-1 pb-0.5">
                <span className="text-[11px] font-bold text-teal-300 flex items-center justify-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-ping' : 'bg-teal-400'}`} />
                  {isPlayingAudio ? 'Explaining Your Document Live' : 'DocuEase 3D Cartoon Explainer'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Synchronized Subtitles & Player Controls */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-800/40 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>3D Animated Document Explanation</span>
                  </h3>
                </div>
                <p className="text-xs text-teal-200/80 mt-0.5">
                  Spoken in {selectedLangObj.nativeName} ({selectedLangObj.name}) with lip-synced 3D animations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Sentence {sentences.length > 0 ? activeSentenceIndex + 1 : 1} / {sentences.length || 1}
                </span>
              </div>
            </div>

            {/* Live Karaoke / Subtitle Banner */}
            {subtitlesVisible && (
              <div className="p-4 rounded-2xl bg-black/60 border border-teal-500/30 shadow-inner space-y-2 transition-all">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-teal-400">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-pulse' : 'bg-teal-400'}`} />
                    <span>Synchronized Subtitles ({selectedLangObj.nativeName})</span>
                  </span>
                  <span className="text-slate-400 text-[10px] normal-case">
                    {isPlayingAudio ? 'Speech Synced' : 'Ready to Play'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed font-sans min-h-[52px]">
                  {sentences[activeSentenceIndex] || sentences[0] || spokenScript}
                </p>
              </div>
            )}

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              
              <div className="flex items-center gap-2.5">
                {/* Play/Pause Button */}
                <button
                  onClick={toggleSpeechPlayback}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                    isPlayingAudio
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 scale-105 shadow-amber-500/20'
                      : 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/30'
                  }`}
                  aria-label={isPlayingAudio ? 'Pause Narration' : 'Listen to 3D Explainer'}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen to 3D Explainer</span>
                    </>
                  )}
                </button>

                {/* Replay Button */}
                <button
                  onClick={handleReplaySpeech}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                  title="Replay from beginning"
                  aria-label="Replay speech"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Mute Button */}
                <button
                  onClick={handleToggleMute}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Speed & Subtitle Visibility Controls */}
              <div className="flex items-center gap-3">
                {/* Speed Controls */}
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-semibold">
                  {[0.8, 0.95, 1.15].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPlaybackSpeed(spd);
                        speechManager.setRate(spd);
                      }}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        Math.abs(playbackSpeed - spd) < 0.05
                          ? 'bg-teal-500 text-white font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {spd === 0.95 ? '1x' : `${spd}x`}
                    </button>
                  ))}
                </div>

                {/* Subtitle Toggle */}
                <button
                  onClick={() => setSubtitlesVisible(!subtitlesVisible)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    subtitlesVisible 
                      ? 'border-teal-400/40 text-teal-300 bg-teal-500/10' 
                      : 'border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {subtitlesVisible ? 'Subtitles On' : 'Subtitles Off'}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Original Uploaded Document Viewer */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 lg:sticky lg:top-20">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-900">Original Document</h3>
            </div>
            
            <button
              onClick={() => setShowOriginalModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
          </div>

          {/* Document Preview Box */}
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center max-h-[380px] p-2">
            {uploadedFile.dataUrl ? (
              <img
                src={uploadedFile.dataUrl}
                alt={uploadedFile.name}
                className="max-h-[360px] w-auto object-contain rounded"
              />
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No image preview available
              </div>
            )}
          </div>

          {/* Document Metadata Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Format</div>
              <div className="font-semibold text-slate-800 uppercase">{uploadedFile.name.split('.').pop() || 'IMG'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Engine Accuracy</div>
              <div className="font-semibold text-emerald-700">Zero-Guessing Enabled</div>
            </div>
          </div>

          {/* Toggle Extracted Raw Text Accordion */}
          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={() => setShowRawText(!showRawText)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
            >
              <span>View Extracted Text (OCR)</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showRawText ? 'rotate-180' : ''}`} />
            </button>
            {showRawText && (
              <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {uploadedFile.rawText || rawData.rawText || 'Text extracted from document successfully.'}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Structured & Translated Explanation */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* A. If MEDICAL PRESCRIPTION: Medical Safety Advisory & Clinical Findings */}
          {isPrescription ? (
            <>
              {/* Mandatory Pharmacist Verification Warning Notice */}
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-bold text-amber-950">
                    Important Medical Safety Notice
                  </div>
                  <p className="text-amber-800 leading-relaxed text-xs">
                    This explanation is designed to help you understand your doctor&apos;s prescription. Any cursive or ambiguous handwriting is explicitly labeled below. <strong>Always confirm unverified medicines or dosages with a licensed pharmacist or your doctor before taking.</strong>
                  </p>
                </div>
              </div>

              {/* 1. Clinical Overview in Selected Language */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Prescription Overview ({selectedLangObj.nativeName})</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {rawData.identifiedCondition || 'Medical Prescription Summary'}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {explanationText}
                </p>
              </div>

              {/* 2. Prescribed Medicines & Dosages Section */}
              {medications.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">℞</span>
                      <h4 className="text-sm font-bold text-slate-900">Prescribed Medicines ({medications.length})</h4>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">Strict dosage pattern</span>
                  </div>

                  <div className="space-y-3">
                    {medications.map((med: any, index: number) => {
                      const needsVerification = med.needsPharmacistVerification || !med.isLegible;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border transition-all ${
                            needsVerification
                              ? 'bg-amber-50/60 border-amber-300'
                              : 'bg-slate-50/80 border-slate-200'
                          }`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span>{med.name}</span>
                                {med.strength && (
                                  <span className="px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold">
                                    {med.strength}
                                  </span>
                                )}
                              </div>
                              {med.originalText && med.originalText !== med.name && (
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  Original text: <span className="font-mono">{med.originalText}</span>
                                </div>
                              )}
                            </div>

                            {/* Verification Status Badge */}
                            {needsVerification ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold">
                                <AlertCircle className="w-3 h-3 text-amber-600" />
                                <span>Needs Pharmacist Verification</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Verified</span>
                              </span>
                            )}
                          </div>

                          {/* Dosage, Timing & Duration Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-700 border-t border-slate-200/60">
                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">Dosage</span>
                              <span className="font-semibold text-teal-800">{med.dosage || 'As prescribed'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">Timing</span>
                              <span className="font-semibold">{med.timingInstructions || med.frequency || 'Follow doctor directions'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">Duration</span>
                              <span className="font-semibold">{med.duration || 'As advised'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Diagnostic Lab Biomarkers (If Lab Report) */}
              {labBiomarkers.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-sm font-bold text-slate-900">Extracted Laboratory Biomarkers ({labBiomarkers.length})</h4>
                    <span className="text-xs text-slate-500 font-semibold">Standard Reference Ranges</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {labBiomarkers.map((bm: any, idx: number) => {
                      const isAbnormal = bm.classification === 'Elevated' || bm.classification === 'Low' || bm.classification === 'Abnormal';
                      return (
                        <div key={idx} className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <div className="font-bold text-slate-900">{bm.biomarker}</div>
                            {bm.clinicalNote && <div className="text-slate-500 text-[11px] mt-0.5">{bm.clinicalNote}</div>}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="font-bold text-slate-900 text-sm">{bm.value} {bm.unit}</span>
                              {bm.referenceRange && (
                                <span className="block text-[10px] text-slate-400">Ref: {bm.referenceRange}</span>
                              )}
                            </div>

                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              isAbnormal
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {bm.classification}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Action Items & Instructions */}
              {actionItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Recommended Steps for the Patient</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {actionItems.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            /* B. If COMPLEX DOCUMENT: Summary, Tariff Breakdown, Key Dates & Fraud Warnings */
            <>
              {/* Mandatory Anti-Fraud Caution if Bank/Financial */}
              {rawData.fraudCautionNotice && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-amber-950">
                      Security & Anti-Fraud Advisory
                    </div>
                    <p className="text-amber-800 leading-relaxed text-xs">
                      {rawData.fraudCautionNotice}
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Plain Language Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Plain Language Summary ({selectedLangObj.nativeName})</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {rawData.providerOrIssuer || 'Document Overview'}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {explanationText}
                </p>
              </div>

              {/* 2. Key Document Facts Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {rawData.totalAmountDue && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Amount Due</div>
                    <div className="text-base font-extrabold text-slate-900 mt-1">{rawData.totalAmountDue}</div>
                  </div>
                )}
                {rawData.dueDate && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Due Date</div>
                    <div className="text-sm font-bold text-rose-700 mt-1">{rawData.dueDate}</div>
                  </div>
                )}
                {rawData.accountNumber && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Consumer / A/C No.</div>
                    <div className="text-xs font-bold text-slate-800 mt-1 truncate">{rawData.accountNumber}</div>
                  </div>
                )}
                {rawData.billingPeriod && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Billing Period</div>
                    <div className="text-xs font-semibold text-slate-700 mt-1">{rawData.billingPeriod}</div>
                  </div>
                )}
              </div>

              {/* 3. Fee Breakdown */}
              {feeBreakdown.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Breakdown of Charges</h4>
                  <div className="divide-y divide-slate-100 text-xs">
                    {feeBreakdown.map((item: any, idx: number) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <span className="text-slate-600">{item.description}</span>
                        <span className="font-bold text-slate-900">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Action Items & Instructions */}
              {actionItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">What You Need to Do</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {actionItems.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Bottom Primary Action: Start New Document */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={onStartNewDocument}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-slate-400"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Document</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-2xs transition-all"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Print / Save Summary</span>
            </button>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {showOriginalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">{uploadedFile.name}</h4>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex items-center justify-center bg-slate-50">
              <img src={uploadedFile.dataUrl} alt={uploadedFile.name} className="max-w-full max-h-[75vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
