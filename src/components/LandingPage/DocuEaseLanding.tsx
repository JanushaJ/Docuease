import React, { useState, useRef } from 'react';
import { 
  Stethoscope, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Globe, 
  Zap, 
  X, 
  AlertTriangle,
  Building,
  CreditCard,
  ShieldCheck,
  Check,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';
import { SpeechManager } from '../../utils/speech';

export interface DocuEaseLandingProps {
  onNavigate: (route: string, state?: any) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

/**
 * DocuEaseLanding — Breathtaking Landing Page for HackSphere AI Hackathon
 * Features:
 * - 3D Human Avatar: Krish X Tattva (pastel teal & white hoodie, waving, breathing idle, speech visemes)
 * - 11 Regional Indian Languages + Multilingual Native TTS Preview
 * - Direct routing to MedScan AI and DocuSimplify AI
 * - 1-Click Instant Evaluation Samples for Hackathon Judges
 */
export const DocuEaseLanding: React.FC<DocuEaseLandingProps> = ({
  onNavigate,
  currentLanguage,
  onLanguageChange,
}) => {
  const [demoSpeaking, setDemoSpeaking] = useState(false);
  const [demoSubtitle, setDemoSubtitle] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Regional Spoken Greeting Scripts
  const greetings: Record<SupportedLanguage, string> = {
    en: "Hello! I am Krish X Tattva. Upload a prescription, lab test, or official document, and I will explain it simply in your language.",
    te: "నమస్కారం! నేను మీ క్రిష్ X తత్త్వ అసిస్టెంట్‌ని. ప్రిస్క్రిప్షన్, ల్యాబ్ రిపోర్ట్ లేదా ఏదైనా కష్టమైన పత్రాన్ని అప్‌లోడ్ చేయండి, నేను మీకు సులభంగా వివరిస్తాను.",
    hi: "नमस्ते! मैं आपका क्रिश X तत्त्व सहायक हूँ। कोई भी पर्ची, लैब जांच रिपोर्ट या कठिन दस्तावेज़ अपलोड करें, मैं इसे आपकी भाषा में समझाऊँगा।",
    ta: "வணக்கம்! நான் உங்கள் கிரிஷ் X தத்துவ உதவியாளர். மருத்துவ சீட்டு, பரிசோதனை அறிக்கை அல்லது கடினமான ஆவணங்களை பதிவேற்றுங்கள், நான் எளிதாக விளக்குகிறேன்.",
    kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕ್ರಿಶ್ X ತತ್ವ ಸಹಾಯಕ. ಯಾವುದೇ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್, ಲ್ಯಾಬ್ ವರದಿ ಅಥವಾ ಕಾಗದಪತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ನಾನು ಸರಳವಾಗಿ ವಿವರಿಸುತ್ತೇನೆ.",
    ml: "നമസ്കാരം! ഞാൻ ക്രിഷ് X തത്വ ആണ്. പ്രിസ്ക്രിപ്ഷനോ ലാബ് റിപ്പോർട്ടോ മറ്റ് രേഖകളോ നൽകുക, ഞാൻ എളുപ്പത്തിൽ പറഞ്ഞുതരാം.",
    bn: "নমস্কার! আমি আপনার কৃষ X তত্ত্ব সহায়ক। যেকোনো প্রেসক্রিপশন, ল্যাব টেস্ট বা কঠিন নথি আপলোড করুন, আমি সহজ ভাষায় বুঝিয়ে দেব।",
    mr: "नमस्कार! मी तुमचा क्रिश X तत्त्व सहाय्यक आहे. कोणतेही प्रिस्क्रिप्शन, लॅब रिपोर्ट किंवा कठीण दस्तऐवज अपलोड करा, मी सोप्या भाषेत समजावून सांगेन.",
    gu: "નમસ્તે! હું તમારો ક્રિશ X તત્ત્વ સહાયક છું. કોઈપણ પ્રિસ્ક્રિપ્શન, લેબ રિપોર્ટ અથવા દસ્તાવેજ અપલોડ કરો, હું સરળ ભાષામાં સમજાવીશ.",
    pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਕ੍ਰਿਸ਼ X ਤੱਤਵ ਸਹਾਇਕ ਹਾਂ। ਕੋਈ ਵੀ ਪਰਚੀ, ਲੈਬ ਰਿਪੋਰਟ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ, ਮੈਂ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਵਾਂਗਾ।",
    ur: "السلام علیکم! میں آپ کا کرش X تتوا اسسٹنٹ ہوں۔ کوئی بھی نسخہ، لیب رپورٹ یا دستاویز اپ لوڈ کریں، میں آسان زبان میں سمجھاؤں گا۔",
    or: "ନମସ୍କାର! ମୁଁ କ୍ରିଶ X ତତ୍ତ୍ୱ। ଯେକୌଣସି ଡାକ୍ତରୀ ପ୍ରେସକ୍ରିପସନ୍ କିମ୍ବା କଠିନ ଦଲିଲ ଅପଲୋଡ୍ କରନ୍ତୁ, ମୁଁ ଏହାକୁ ଆପଣଙ୍କ ଭାଷାରେ ବୁଝାଇଦେବି।",
    as: "নমস্কাৰ! মই কৃশ X তত্ত্ব। যিকোনো ডাক্তৰী প্ৰেছক্ৰিপচন বা জটিল নথিপত্ৰ আপলোড কৰক, মই আপোনাৰ ভাষাত সহজকৈ বুজাই দিম।",
    bho: "प्रणाम! हम राउर क्रिश X तत्त्व सहायक हईं। कवनो डॉक्टरी पर्चा या कठिन कागजात अपलोड करीं, हम राउर आपन भाषा में समझा देब।",
    sa: "नमो नमः! अहं क्रिश X तत्त्व सहायकः अस्मि। किमपि वैद्यकीयपत्रं वा कठिनलेखं अपलोड् कुर्वन्तु, अहं सरलं व्याख्यास्यामि।",
    ne: "नमस्ते! म क्रिश X तत्त्व हुँ। कुनै पनि प्रेस्क्रिप्सन वा जटिल कागजात अपलोड गर्नुहोस्, म तपाईंको आफ्नै भाषामा सजिलै बुझाउनेछु।",
    es: "¡Hola! Soy Krish X Tattva. Sube una receta médica, prueba de laboratorio o cualquier documento y te lo explicaré en español.",
    fr: "Bonjour! Je suis Krish X Tattva. Téléchargez une ordonnance, un bilan de laboratoire ou un document officiel, je vous l'explique simplement.",
    ar: "مرحباً! أنا كريش X تاتفا. قم بتحميل أي وصفة طبية أو تقرير مختبر وسأقوم بشرحه لك ببساطة بلغتك الأم.",
    de: "Hallo! Ich bin Krish X Tattva. Laden Sie ein Rezept, einen Laborbefund oder ein amtliches Dokument hoch und ich erkläre es Ihnen auf Deutsch."
  };

  const handlePlayDemoGreeting = () => {
    if (demoSpeaking) {
      SpeechManager.stop();
      setDemoSpeaking(false);
      setDemoSubtitle(undefined);
      return;
    }

    const textToSpeak = greetings[currentLanguage] || greetings.en;
    setDemoSubtitle(textToSpeak);
    setDemoSpeaking(true);

    SpeechManager.speak(textToSpeak, currentLanguage, {
      speed: 0.95,
      onEnd: () => {
        setDemoSpeaking(false);
        setDemoSubtitle(undefined);
      },
      onError: () => {
        setDemoSpeaking(false);
        setDemoSubtitle(undefined);
      }
    });
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile || !previewUrl) return;
    const isMedical = /prescr|rx|lab|blood|med|doctor|clinic|hospital/i.test(selectedFile.name);
    const targetRoute = isMedical ? '/medscan' : '/simplify';
    onNavigate(targetRoute, {
      uploadedFile: {
        name: selectedFile.name,
        dataUrl: previewUrl,
        type: selectedFile.type
      }
    });
  };

  const handleLaunchSample = (sampleType: 'hepatitis' | 'prescription' | 'electricity' | 'kyc') => {
    if (sampleType === 'hepatitis' || sampleType === 'prescription') {
      onNavigate('/medscan', { sampleType });
    } else {
      onNavigate('/simplify', { sampleType });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* REGIONAL LANGUAGE FAST ACCESS PILL BAR */}
      <div className="w-full bg-slate-900 border-b border-slate-800 py-2 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-teal-400 font-bold shrink-0 pr-2 border-r border-slate-800">
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider text-[11px]">Regional Languages:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={`${lang.name} (${lang.nativeName})`}
                >
                  <span>{lang.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* HERO SECTION WITH KRISH X TATTVA 3D AVATAR */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-teal-400/15 via-cyan-400/15 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Voice Demo & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* HackSphere Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-black text-teal-900 tracking-wide uppercase">
                DocuEase AI • HackSphere AI
              </span>
              <span className="text-teal-300">•</span>
              <span className="text-xs font-semibold text-teal-700">
                Krish X Tattva 3D Edition
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Understand Any Document. <br />
              <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                In Your Mother Tongue.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From illegible doctor prescriptions and diagnostic lab reports to high-voltage electricity bills and bank KYC compliance notices. 
              Krish X Tattva, your cute 3D human AI guide in modern pastel teal attire, speaks verified plain-language summaries in your native regional language with synchronized subtitles.
            </p>

            {/* Audio Greeting Feature Button & Tool Hub CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handlePlayDemoGreeting}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-black text-xs shadow-md transition hover:scale-102"
                title="Hear Krish X Tattva speak in your language"
              >
                <Volume2 className={`w-4 h-4 ${demoSpeaking ? 'animate-bounce' : ''}`} />
                <span>{demoSpeaking ? 'Speaking Now...' : `Hear Krish in ${selectedLangObj.nativeName}`}</span>
              </button>

              <button
                onClick={() => onNavigate('/dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Open Tool Hub →</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero Hallucination Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Synchronized Karaoke Subtitles</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Deterministic Clinical Safety Checks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cute 3D Human Krish X Tattva Assistant */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-md relative p-4 rounded-3xl bg-gradient-to-b from-white to-teal-50/40 border border-teal-100 shadow-xl shadow-teal-600/5">
              
              {/* Decorative aura badge */}
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-teal-100 text-[11px] font-bold text-teal-700 flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3 h-3 text-teal-500" />
                <span>Cute 3D Human Assistant</span>
              </div>

              {/* Krish X Tattva 3D Component */}
              <KrishXTattvaAvatar
                mood={demoSpeaking ? 'speaking' : 'idle'}
                isSpeaking={demoSpeaking}
                activeSentence={demoSubtitle}
                className="w-full"
                characterTitle="Krish X Tattva"
                language={currentLanguage}
                showControls={false}
              />

              {/* Assistant Bio Tag */}
              <div className="mt-2 text-center">
                <h3 className="text-sm font-black text-slate-800">Krish X Tattva — 3D Universal Guide</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-0.5">
                  Speaking fluently in 11 Indian regional languages with synchronized subtitles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTRAL HERO UPLOAD ZONE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full -mt-6 mb-14">
        <div className="rounded-3xl bg-white border-2 border-teal-200/80 p-6 sm:p-8 shadow-xl shadow-teal-500/10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
              Drag &amp; Drop Workspace
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Drop Any Difficult Document to Begin
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload any prescription, diagnostic lab test, electric bill, or official notice.
            </p>
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            accept="image/*,application/pdf"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {/* Upload Drop Zone Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all ${
              isDragging
                ? 'border-teal-500 bg-teal-50/60 scale-[1.01]'
                : selectedFile
                  ? 'border-teal-400 bg-teal-50/30'
                  : 'border-slate-300 hover:border-teal-400 bg-slate-50/70 hover:bg-teal-50/20'
            }`}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center gap-4">
                {previewUrl && (
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-teal-400 shadow-md bg-white">
                    <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-500 text-white shadow-xs hover:bg-rose-600 transition"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedFile.name}</h4>
                  <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB • Ready to explain</p>
                </div>
                <button
                  onClick={handleStartAnalysis}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Instant Analysis in {selectedLangObj.nativeName} →</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Drag and drop your document here
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports JPG, PNG, WEBP, or scanned PDF photos
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Browse Computer Files</span>
                  </button>

                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 flex items-center gap-2 shadow-xs transition"
                  >
                    <Camera className="w-3.5 h-3.5 text-teal-600" />
                    <span>Take Photo with Camera</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4 INSTANT 1-CLICK SAMPLE CARDS FOR JUDGES */}
      <section className="py-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black text-teal-600 uppercase tracking-widest">
            Instant Test Library
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Or Click a Sample to Test Immediately
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try any of our real-world documents. Each takes you straight to the dedicated workspace with Krish X Tattva&apos;s full voice explanation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Sample 1: Hepatitis & Liver Panel */}
          <div 
            onClick={() => handleLaunchSample('hepatitis')}
            className="group rounded-3xl bg-white border-2 border-emerald-200/90 p-5 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Lab Test Panel
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                Hepatitis &amp; Liver Panel
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pathology report. Measures HBsAg (Non-Reactive) and Liver enzymes (ALT 38, AST 32, Bilirubin 0.8) with zero fake pills.
              </p>
            </div>
            <button className="mt-5 w-full py-2.5 px-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition">
              <span>Inspect Lab Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sample 2: Medical Prescription */}
          <div 
            onClick={() => handleLaunchSample('prescription')}
            className="group rounded-3xl bg-white border-2 border-teal-200/90 p-5 shadow-sm hover:shadow-xl hover:border-teal-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-300">
                  Doctor&apos;s Rx
                </span>
                <Stethoscope className="w-4 h-4 text-teal-600" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition">
                Handwritten Prescription
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Clinical Rx handwriting. Deciphers Metformin 500mg (1-0-1), Telmisartan 40mg, and flags ambiguous notes.
              </p>
            </div>
            <button className="mt-5 w-full py-2.5 px-3 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition">
              <span>Read Prescription</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sample 3: Electricity Bill */}
          <div 
            onClick={() => handleLaunchSample('electricity')}
            className="group rounded-3xl bg-white border-2 border-amber-200/90 p-5 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                  Utility Bill
                </span>
                <Zap className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition">
                Electricity Power Bill
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                State Electricity Board. Identifies 184 Units consumed, ₹742.00 Due Date &amp; disconnection warning.
              </p>
            </div>
            <button className="mt-5 w-full py-2.5 px-3 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition">
              <span>Simplify Power Bill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sample 4: State Bank Re-KYC Notice */}
          <div 
            onClick={() => handleLaunchSample('kyc')}
            className="group rounded-3xl bg-white border-2 border-indigo-200/90 p-5 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-300">
                  Bank Notice
                </span>
                <Building className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-700 transition">
                State Bank Re-KYC Notice
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Official RBI compliance letter. Mandatory anti-scam warning (never share OTP) and deadline.
              </p>
            </div>
            <button className="mt-5 w-full py-2.5 px-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition">
              <span>Explain Bank Notice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
export default DocuEaseLanding;
