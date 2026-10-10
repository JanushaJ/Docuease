import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Zap, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  HeartHandshake,
  HelpCircle,
  Eye,
  BookOpen
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';
import { getUITranslation } from '../../utils/uiTranslations';
import { speechManager } from '../../utils/speech';
import { DocumentCategory } from './DocumentTypeScreen';

export interface LandingScreenProps {
  onGetStarted: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSelectCategory?: (category: DocumentCategory) => void;
}

// Sample Demonstration Datasets for Evaluators
const DEMO_SAMPLES = {
  prescription: {
    id: 'sample-rx',
    type: 'prescription' as const,
    title: 'Dr. Anita Rajan — City Health Clinic',
    patient: 'Ramesh Kumar (Age: 42) • Acute Bronchitis',
    originalOcrText: [
      '1. Tab. Paracetamol 650mg — 1 tab TDS after meals (3 days)',
      '2. Tab. Azithromycin 500mg — 1 tab OD after food (5 days)',
      '3. Syr. Ascoril D — 5ml at bedtime for cough',
      'Advice: Drink warm water, steam inhalation. Rest 3 days.'
    ],
    medications: [
      { name: 'Paracetamol 650mg', dose: '1-0-1 (TDS)', timing: 'After food', status: 'VERIFIED' },
      { name: 'Azithromycin 500mg', dose: '1-0-0 (OD)', timing: 'After lunch', status: 'VERIFIED' },
      { name: 'Ascoril D Cough Syrup', dose: '5ml', timing: 'At bedtime', status: 'LIKELY' }
    ],
    warning: 'Always confirm dosage and duration with your pharmacist before taking medications.',
    spokenScripts: {
      en: "This prescription contains Paracetamol for fever, Azithromycin antibiotic for 5 days, and cough syrup. Take after food and drink warm fluids.",
      te: "ఈ ప్రిస్క్రిప్షన్‌లో జ్వరం కోసం పారాసిటమాల్, 5 రోజుల యాంటీబయాటిక్ మరియు దగ్గు సిరప్ ఉన్నాయి. భోజనం తర్వాత వేసుకోండి మరియు గోరువెచ్చని నీరు తాగండి.",
      hi: "इस पर्चे में बुखार के लिए पैरासिटामोल, 5 दिनों की एंटीबायोटिक और खांसी की सिरप है। खाने के बाद लें और गुनगुना पानी पिएं।",
      ta: "இந்த மருந்து சீட்டில் காய்ச்சலுக்கு பாராசிட்டமால், 5 நாட்களுக்கு அசித்ரோமைசின் மற்றும் இருமல் மருந்து உள்ளன. உணவுக்குப் பின் சாப்பிடவும்.",
      kn: "ಈ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ ಜ್ವರಕ್ಕೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್, 5 ದಿನಗಳ ಆಂಟಿಬಯೋಟಿಕ್ ಮತ್ತು ಕೆಮ್ಮಿನ ಸಿರಪ್ ಇವೆ. ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.",
      ml: "ഈ കുറിപ്പടിയിൽ പനിക്ക് പാരസെറ്റാമോളും 5 ദിവസത്തെ ആന്റിബയോട്ടിക്കും ചുമയുടെ മരുന്നും ഉണ്ട്. ഭക്ഷണത്തിന് ശേഷം കഴിക്കുക.",
      bn: "এই প্রেসক্রিপশনে জ্বরের জন্য প্যারাসিটামল, ৫ দিনের অ্যান্টিবায়োটিক এবং কাশির সিরাপ রয়েছে। খাবারের পরে সেবন করুন।",
      mr: "या प्रिस्क्रिप्शनमध्ये तापासाठी पॅरासिटामॉल, ५ दिवसांचे अँटीबायोटिक आणि खोकल्याचे सिरप आहे. जेवणानंतर घ्या.",
      gu: "આ પ્રિસ્ક્રિપ્શનમાં તાવ માટે પેરાસીટામોલ, ૫ દિવસની એન્ટિબાયોટિક અને ઉધરસની સિરપ છે. જમ્યા પછી લેવી.",
      pa: "ਇਸ ਪਰਚੀ ਵਿੱਚ ਬੁਖ਼ਾਰ ਲਈ ਪੈਰਾਸੀਟਾਮੋਲ, ੫ ਦਿਨਾਂ ਦੀ ਐਂਟੀਬਾਇਓਟਿਕ ਅਤੇ ਖੰਘ ਦਾ ਸ਼ਰਬਤ ਹੈ। ਖਾਣਾ ਖਾਣ ਤੋਂ ਬਾਅਦ ਲਵੋ।",
      ur: "اس نسخے میں بخار کے لیے پیراسیٹامول، 5 دن کی اینٹی بائیوٹک اور کھانسی کا شربت ہے۔ کھانے کے بعد لیں اور نیم گرم پانی پیئیں۔"
    } as Record<string, string>
  },
  utility: {
    id: 'sample-bill',
    type: 'utility' as const,
    title: 'State Electricity Distribution Co. — Consumer #582910',
    patient: 'Consumer: Sunita Sharma • Billing: September 2026',
    originalOcrText: [
      'Current Reading: 4,820 kWh • Previous: 4,636 kWh (184 Units)',
      'Energy Tariff Charges: ₹644.00',
      'Fixed Meter Rent: ₹60.00 | Electricity Duty: ₹38.00',
      'Total Amount Due: ₹742.00 | Due Date: 15 Oct 2026'
    ],
    items: [
      { label: 'Total Payable Amount', val: '₹742.00', highlight: true },
      { label: 'Due Date', val: '15 Oct 2026', highlight: true },
      { label: 'Units Consumed', val: '184 Units', highlight: false },
      { label: 'Late Surcharge Fee', val: '₹45.00 after due date', highlight: false }
    ],
    warning: 'Pay before 15 Oct 2026 to avoid late fee surcharge or supply disconnection.',
    spokenScripts: {
      en: "Your electricity bill total is 742 rupees for 184 units. The payment due date is 15 October 2026. Please pay before the deadline.",
      te: "మీ కరెంట్ బిల్లు మొత్తం 184 యూనిట్లకు 742 రూపాయలు. చెల్లించాల్సిన గడువు తేదీ 15 అక్టోబర్ 2026. ఆలస్య రుసుము లేకుండా చెల్లించండి.",
      hi: "आपका बिजली बिल 184 यूनिट का कुल 742 रुपये है। भुगतान की अंतिम तिथि 15 अक्टूबर 2026 है। कृपया समय पर भुगतान करें।",
      ta: "உங்கள் மின்சார கட்டணம் 184 யூனிட்டுகளுக்கு 742 ரூபாய். செலுத்த வேண்டிய கடைசி தேதி 15 அக்டோபர் 2026. தாமத கட்டணத்தை தவிர்க்கவும்.",
      kn: "ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ 184 ಯೂನಿಟ್‌ಗಳಿಗೆ ಒಟ್ಟು 742 ರೂಪಾಯಿಗಳು. ಪಾವತಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ 15 ಅಕ್ಟೋಬರ್ 2026 ಆಗಿದೆ.",
      ml: "നിങ്ങളുടെ വൈദ്യുതി ബിൽ 184 യൂണിറ്റുകൾക്ക് 742 രൂപയാണ്. അടയ്ക്കേണ്ട അവസാന തീയതി 2026 ഒക്ടോബർ 15 ആണ്.",
      bn: "আপনার বিদ্যুৎ বিল ১৮৪ ইউনিটের জন্য মোট ৭৪২ টাকা। বিল জমা দেওয়ার শেষ তারিখ ১৫ অক্টোবর ২০২৬।",
      mr: "तुमचे वीज बिल १८४ युनिट्ससाठी एकूण ७४२ रुपये आहे. भरण्याची शेवटची तारीख १५ ऑक्टोबर २०२६ आहे.",
      gu: "તમારું લાઇટ બિલ ૧૮૪ યુનિટનું કુલ ૭૪૨ રૂપિયા છે. ભરવાની છેલ્લી તારીખ ૧૫ ઓક્ટોબર ૨૦૨૬ છે.",
      pa: "ਤੁਹਾਡਾ ਬਿਜਲੀ ਦਾ ਬਿੱਲ ੧੮੪ ਯੂਨਿਟਾਂ ਦਾ ਕੁੱਲ ੭੪੨ ਰੁਪਏ ਹੈ। ਭਰਨ ਦੀ ਆਖ਼ਰੀ ਮਿਤੀ ੧੫ ਅਕਤੂਬਰ ੨੦੨೬ ਹੈ।",
      ur: "آپ کا بجلی کا بل 184 یونٹ کا کل 742 روپے ہے۔ ادائیگی کی آخری تاریخ 15 اکتوبر 2026 ہے۔"
    } as Record<string, string>
  }
};

export const LandingScreen: React.FC<LandingScreenProps> = ({ 
  onGetStarted,
  currentLanguage,
  onLanguageChange,
  onSelectCategory
}) => {
  const t = getUITranslation(currentLanguage);

  // Live Demo Playground State
  const [activeDemoTab, setActiveDemoTab] = useState<'prescription' | 'utility'>('prescription');
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);
  const [demoSubtitle, setDemoSubtitle] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [langToast, setLangToast] = useState<{ show: boolean; name: string } | null>(null);
  const prevLangRef = useRef(currentLanguage);

  // Trigger brief delightful toast when language changes
  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
      setLangToast({ show: true, name: langObj?.nativeName || currentLanguage });
      prevLangRef.current = currentLanguage;
      const timer = setTimeout(() => setLangToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentLanguage]);

  // Smooth scroll anchors
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const stepsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSteps = () => {
    stepsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSample = DEMO_SAMPLES[activeDemoTab];
  const activeSpokenScript = currentSample.spokenScripts[currentLanguage] || currentSample.spokenScripts.en;

  // Handle Demo Voice Playback
  const handleToggleDemoSpeech = () => {
    if (isPlayingDemoVoice) {
      speechManager.stop();
      setIsPlayingDemoVoice(false);
      setDemoSubtitle('');
    } else {
      setIsPlayingDemoVoice(true);
      setDemoSubtitle(activeSpokenScript);
      speechManager.speakScript(
        activeSpokenScript,
        currentLanguage,
        {
          onStart: () => setIsPlayingDemoVoice(true),
          onSentenceChange: (_idx, text) => setDemoSubtitle(text),
          onEnd: () => {
            setIsPlayingDemoVoice(false);
            setDemoSubtitle('');
          },
          onError: () => {
            setIsPlayingDemoVoice(false);
            setDemoSubtitle('');
          }
        },
        playbackSpeed
      );
    }
  };

  const handleReplayDemoSpeech = () => {
    speechManager.stop();
    setIsPlayingDemoVoice(true);
    setDemoSubtitle(activeSpokenScript);
    speechManager.speakScript(
      activeSpokenScript,
      currentLanguage,
      {
        onStart: () => setIsPlayingDemoVoice(true),
        onSentenceChange: (_idx, text) => setDemoSubtitle(text),
        onEnd: () => {
          setIsPlayingDemoVoice(false);
          setDemoSubtitle('');
        }
      },
      playbackSpeed
    );
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-[#f0fdfa]/60 via-[#f8fafc] to-white text-slate-900 overflow-x-hidden relative">
      
      {/* Floating Language Switched Feedback Toast */}
      {langToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-xl shadow-teal-900/20 border border-teal-400/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-teal-200 animate-spin" />
          <span className="text-xs font-bold">
            Translated whole page to {langToast.name} ✨
          </span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: HERO SECTION (WARM SUNLIT CLINIC DESK THEME & 3D MASCOT)
          ========================================================================= */}
      <section className="relative w-full pt-8 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Soft Background Radial Light & Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-teal-200/35 via-emerald-100/25 to-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Column: Headline, Subtitle, Floating Badges & CTAs */}
          <div key={`hero-${currentLanguage}`} className="lg:col-span-7 flex flex-col items-start text-left space-y-6 z-10 lang-switch-animate">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span>{t.heroBadge}</span>
              <span className="text-teal-400">•</span>
              <span className="text-teal-700 font-medium">11 Languages Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              {t.heroHeadlinePrefix}{' '}
              <span className="shimmer-teal underline decoration-teal-300 decoration-wavy decoration-2">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Clear Supporting Text */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-normal">
              {t.heroSubtitle}
            </p>

            {/* Quick Language Capsules (All 11 Languages - Click for instant whole-site translation) */}
            <div className="flex flex-col gap-2 pt-1 max-w-2xl w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Choose Your Language:</span>
                </span>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                  Instant whole page update
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {SUPPORTED_LANGUAGES.map(langObj => {
                  const isSelected = currentLanguage === langObj.code;
                  return (
                    <button
                      key={langObj.code}
                      onClick={() => onLanguageChange(langObj.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1 ${
                        isSelected
                          ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-400/50'
                          : 'bg-white/90 text-slate-700 border border-slate-200/90 hover:border-teal-300 hover:text-teal-800 hover:bg-teal-50/50 shadow-2xs'
                      }`}
                      title={`Switch entire page to ${langObj.name}`}
                    >
                      <span>{langObj.nativeName}</span>
                      {isSelected && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3 w-full sm:w-auto">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-base shadow-lg shadow-teal-800/25 hover:shadow-xl hover:shadow-teal-800/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.navGetStarted}</span>
                <ArrowRight className="w-5 h-5 text-teal-200" />
              </button>

              <button
                onClick={scrollToDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-teal-50/80 text-teal-800 font-bold text-base border-2 border-teal-200/90 shadow-sm hover:border-teal-400 transition-all transform hover:-translate-y-0.5"
              >
                <Eye className="w-5 h-5 text-teal-600" />
                <span>{t.btnTryLiveDemo}</span>
              </button>

              <button
                onClick={scrollToSteps}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-4 text-sm font-bold text-slate-600 hover:text-teal-700 transition-colors"
              >
                <span>{t.btnHowItWorks}</span>
                <span className="text-teal-500">↓</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.statZeroGuesswork}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Globe2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.stat11Languages}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.statVerifiedSafe}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: 3D Robot Doctor Mascot with Floating Document Cards & Desk Accents */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Sticky Note 1: "Small Steps, Big Clarity" (Inspired by Reference Image) */}
            <div className="absolute -top-8 -left-6 hidden xl:flex flex-col p-2.5 bg-[#fef9c3] rounded-xl border border-yellow-300 shadow-md transform -rotate-3 text-[11px] font-bold text-yellow-950 sticky-note-shadow animate-float-slow z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400 mx-auto -mt-3.5 mb-1 shadow-2xs border border-white" />
              <span>{t.tagSmallSteps}</span>
            </div>

            {/* Sticky Note 2: "Docs → Simple Words" (Inspired by Reference Image) */}
            <div className="absolute top-28 -left-10 hidden xl:flex flex-col p-2 bg-[#ccfbf1] rounded-xl border border-teal-300 shadow-md transform rotate-2 text-[11px] font-bold text-teal-950 sticky-note-shadow animate-float-reverse z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mx-auto -mt-3 mb-1 shadow-2xs border border-white" />
              <span>{t.tagDocsToSimple}</span>
            </div>

            {/* Sticky Note 3: "Understand • Translate • Feel Confident" (Inspired by Reference Image) */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col p-2.5 bg-[#fef3c7] rounded-xl border border-amber-300 shadow-md transform -rotate-1 text-[11px] font-bold text-amber-950 sticky-note-shadow z-20">
              <div className="w-8 h-2.5 bg-amber-200/90 -mt-3.5 mb-1 mx-auto rounded-xs opacity-80 border-t border-amber-300" />
              <span>{t.tagFeelConfident}</span>
            </div>

            {/* Soft Ambient Card Container */}
            <div className="relative w-full max-w-md lg:max-w-none bg-gradient-to-b from-white/95 via-teal-50/40 to-white/90 rounded-3xl border border-teal-200/80 shadow-xl shadow-teal-900/5 p-4 sm:p-6 backdrop-blur-md flex flex-col items-center">
              
              {/* Floating Prescription Note (Top-Left) with float animation */}
              <div className="absolute -top-4 -left-4 sm:-left-6 hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-white/95 rounded-2xl border border-teal-200 shadow-lg shadow-teal-900/10 animate-float-slow z-10">
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  Rx
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-800">Paracetamol 650mg</p>
                  <p className="text-[9px] text-teal-700 font-semibold">1-0-1 TDS • After meals</p>
                </div>
              </div>

              {/* Floating Lab / Bill Card (Top-Right) with reverse float animation */}
              <div className="absolute -top-3 -right-4 sm:-right-6 hidden sm:flex items-center gap-2 px-3 py-2 bg-white/95 rounded-2xl border border-emerald-200 shadow-lg shadow-emerald-900/10 animate-float-reverse z-10">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ⚡
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-800">Total: ₹742.00</p>
                  <p className="text-[9px] text-emerald-700 font-semibold">Due: 15 Oct 2026</p>
                </div>
              </div>

              {/* 3D WebGL Mascot Canvas (DocuBot Milo) */}
              <div className="w-full flex flex-col items-center">
                <KrishXTattvaAvatar
                  mood={isPlayingDemoVoice ? 'speaking' : 'greeting'}
                  isSpeaking={isPlayingDemoVoice}
                  activeSentence={demoSubtitle}
                  onToggleSpeech={handleToggleDemoSpeech}
                  onReplaySpeech={handleReplayDemoSpeech}
                  playbackSpeed={playbackSpeed}
                  onSpeedChange={setPlaybackSpeed}
                  compact={false}
                  showControls={true}
                  language={currentLanguage}
                  characterTitle="DocuBot (Milo)"
                />
              </div>

              {/* Clinic Study Desk Stack of Medical Books from Reference Image */}
              <div className="w-full mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5 px-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
                  Clinic Study Reference Desk
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800 text-white shadow-2xs">
                    <BookOpen className="w-3 h-3 text-teal-200" />
                    <span>{t.book1}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-teal-600 text-white shadow-2xs">
                    <span>{t.book2}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-2xs">
                    <span>{t.book3}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2: SEPARATED DUAL EXPERIENCE CARDS (CARD A & CARD B)
          ========================================================================= */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Two Dedicated Intelligence Tools
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Medical prescriptions require strict pharmacological safeguards, while official documents need clear financial breakdowns. Choose your workflow below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* ---------------- CARD A: MEDICAL PRESCRIPTIONS ---------------- */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-teal-50/50 via-white to-teal-50/30 border-2 border-teal-200/90 hover:border-teal-400 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-6">
                
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold">
                    MedScan AI
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t.cardATitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.cardASubtitle}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint3}</span>
                  </li>
                </ul>

                {/* Medical Safety Disclaimer Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{t.cardAWarning}</p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory('prescription');
                    } else {
                      onGetStarted();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base shadow-md shadow-teal-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{t.cardABtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* ---------------- CARD B: COMPLEX DOCUMENTS MADE SIMPLE ---------------- */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 border-2 border-sky-200/90 hover:border-sky-400 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-6">
                
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sky-700 text-white flex items-center justify-center shadow-md shadow-sky-700/20 group-hover:scale-105 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-100/70 text-sky-800 text-xs font-bold">
                    DocuSimplify AI
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t.cardBTitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.cardBSubtitle}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint3}</span>
                  </li>
                </ul>

                {/* Zero Guessing Policy Notice */}
                <div className="p-3.5 rounded-2xl bg-sky-50/90 border border-sky-200/80 text-sky-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{t.cardBNotice}</p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory('complex_document');
                    } else {
                      onGetStarted();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm sm:text-base shadow-md shadow-sky-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{t.cardBBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE LIVE DEMO (FOR EVALUATORS & USERS)
          ========================================================================= */}
      <section ref={demoSectionRef} className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.demoSectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.demoSectionTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.demoSectionSubtitle}
            </p>
          </div>

          {/* Sample Switcher Tabs & Language Control */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  setActiveDemoTab('prescription');
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDemoTab === 'prescription'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.tabPrescription}
              </button>

              <button
                onClick={() => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  setActiveDemoTab('utility');
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDemoTab === 'utility'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.tabUtilityBill}
              </button>
            </div>

            {/* Language Selector for Live Demo */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                {t.selectLanguagePrompt}
              </span>
              <select
                value={currentLanguage}
                onChange={(e) => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  onLanguageChange(e.target.value as SupportedLanguage);
                }}
                className="px-3 py-2 rounded-xl border border-teal-200 bg-teal-50/50 text-teal-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side 3-Column Interactive Demo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Col 1: Original Scanned OCR Document (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.colOriginalTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Real Sample
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {currentSample.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentSample.patient}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-2">
                {currentSample.originalOcrText.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">›</span>
                    <span className="leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-teal-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Extracted with Optical Stroke Analysis • Zero guessing</span>
              </div>
            </div>

            {/* Col 2: Plain-Language Structured Explanation (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.colExplanationTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 uppercase">
                  {currentLanguage}
                </span>
              </div>

              {/* Spoken / Translated Script Display */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/90 text-sm leading-relaxed text-teal-950 font-medium">
                "{activeSpokenScript}"
              </div>

              {/* Items / Meds list */}
              {activeDemoTab === 'prescription' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Detected Medications &amp; Dosage:
                  </p>
                  {(currentSample as typeof DEMO_SAMPLES.prescription).medications.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{m.name}</p>
                        <p className="text-[11px] text-slate-500">{m.timing}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px]">
                        {m.dose}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeDemoTab === 'utility' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Key Financial Highlights:
                  </p>
                  {(currentSample as typeof DEMO_SAMPLES.utility).items.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className={`font-bold ${item.highlight ? 'text-teal-700 text-sm' : 'text-slate-900'}`}>
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Safety Warning */}
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                {currentSample.warning}
              </p>
            </div>

            {/* Col 3: DocuBot Voice Narration & Live Subtitles (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-gradient-to-b from-teal-900 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-teal-700/50 pb-2">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    {t.colVoiceTitle}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Google TTS Active
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  DocuBot speaks fluently in {SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.nativeName || currentLanguage} with mouth sync and captions.
                </p>
              </div>

              {/* Mini Avatar or Subtitles visualizer */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/30 border border-teal-400/40 flex items-center justify-center text-teal-300">
                    <Volume2 className={`w-6 h-6 ${isPlayingDemoVoice ? 'animate-bounce text-emerald-400' : ''}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">DocuBot Audio</p>
                    <p className="text-xs text-teal-300">Native {currentLanguage.toUpperCase()} Pronunciation</p>
                  </div>
                </div>

                {/* Subtitle Display */}
                <div className="min-h-[50px] p-2.5 rounded-xl bg-black/40 text-xs text-emerald-300 font-sans leading-relaxed border border-emerald-500/20 flex items-center justify-center">
                  {isPlayingDemoVoice && demoSubtitle ? (
                    <span>"{demoSubtitle}"</span>
                  ) : (
                    <span className="text-slate-400 italic">Click Play to hear DocuBot speak in {currentLanguage.toUpperCase()}</span>
                  )}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleToggleDemoSpeech}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all transform hover:scale-[1.02]"
                >
                  {isPlayingDemoVoice ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t.btnPauseVoice}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 ml-0.5" />
                      <span>{t.btnPlayVoice}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReplayDemoSpeech}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  title={t.btnReplayVoice}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 3-STEP JOURNEY (HOW IT WORKS)
          ========================================================================= */}
      <section ref={stepsSectionRef} className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.stepsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step1Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step1Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step2Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step2Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step3Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step3Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>

          </div>

          {/* Bottom Action */}
          <div className="text-center pt-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base shadow-lg shadow-teal-700/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.navGetStarted}</span>
              <ArrowRight className="w-5 h-5 text-teal-200" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FOOTER & TRUST
          ========================================================================= */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>{t.footerRights}</p>
          <p className="text-[11px] text-slate-400 max-w-md">{t.footerMedicalDisclaimer}</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingScreen;
