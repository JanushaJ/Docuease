import React, { useState } from 'react';
import { 
  Stethoscope, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  AlertTriangle,
  Building,
  CreditCard,
  Layers,
  CheckCircle2,
  Volume2,
  FileSpreadsheet,
  Globe2,
  BrainCircuit
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';
import { SpeechManager } from '../../utils/speech';

export interface ToolHubProps {
  onNavigate: (route: string, state?: any) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ToolHub: React.FC<ToolHubProps> = ({
  onNavigate,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSentence, setActiveSentence] = useState<string | undefined>(undefined);

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const hubGreetings: Record<string, string> = {
    en: "Welcome to the DocuEase Tool Hub! Choose MedScan AI for medical prescriptions and lab tests, or DocuSimplify AI for electricity bills and official notices.",
    te: "డాక్యుఈజ్ టూల్ హబ్‌కు స్వాగతం! ప్రిస్క్రిప్షన్‌లు మరియు ల్యాబ్ పరీక్షల కోసం మెడ్‌స్కాన్ AIని, లేదా కరెంట్ బిల్లులు మరియు నోటీసుల కోసం డాక్యుసింప్లిఫై AIని ఎంచుకోండి.",
    hi: "डॉक्यूईज टूल हब में आपका स्वागत है! मेडिकल पर्ची और लैब जांच के लिए मेडस्कैन एआई चुनें, या बिजली बिल और सरकारी नोटिस के लिए डॉक्यूमेंट सिंपलीफ़ाई एआई चुनें।",
    ta: "டாக்ஈஸ் டூல் ஹப்பிற்கு வரவேற்கிறோம்! மருத்துவ சீட்டுகள் மற்றும் ஆய்வக சோதனைகளுக்கு மெட்ஸ்கான் AI அல்லது மின்சார கட்டணங்களுக்கு டாக்குசிம்ப்ளிஃபை AI ஐ தேர்ந்தெடுக்கவும்.",
    kn: "ಡಾಕ್ಯುಈಸ್ ಟೂಲ್ ಹಬ್‌ಗೆ ಸುಸ್ವಾಗತ! ವೈದ್ಯಕೀಯ ಚೀಟಿ ಮತ್ತು ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳಿಗಾಗಿ ಮೆಡ್‌ಸ್ಕ್ಯಾನ್ AI ಆಯ್ಕೆಮಾಡಿ, ಅಥವಾ ವಿದ್ಯುತ್ ಬಿಲ್ ಮತ್ತು ನೋಟಿಸ್‌ಗಳಿಗಾಗಿ ಡಾಕ್ಯುಸಿಂಪ್ಲಿಫೈ AI ಆಯ್ಕೆಮಾಡಿ.",
    ml: "ഡോക്യുഈസ് ടൂൾ ഹബ്ബിലേക്ക് സ്വാഗതം! പ്രിസ്ക്രിപ്ഷനുകൾക്കും ലാബ് പരിശോധനകൾക്കുമായി മെഡ്സ്കാൻ AI അല്ലെങ്കിൽ വൈദ്യുതി ബില്ലുകൾക്കായി ഡോക്യുസിംപ്ലിഫൈ AI തിരഞ്ഞെടുക്കുക.",
    bn: "ডকুমেন্ট ইজি টুল হাবে স্বাগতম! প্রেসক্রিপশন ও ল্যাব টেস্টের জন্য মেডস্ক্যান এআই অথবা বিদ্যুৎ বিলের জন্য ডকুসিম্প্লিফাই এআই বেছে নিন।",
    mr: "डॉक्यूईज टूल हबमध्ये आपले स्वागत आहे! मेडिकल प्रिस्क्रिप्शनसाठी मेडस्कॅन एआय किंवा वीज बिलांसाठी डॉक्युसिम्प्लिफाय एआय निवडा.",
    gu: "ડોક્યુઈઝ ટૂલ હબમાં આપનું સ્વાગત છે! મેડિકલ પ્રિસ્ક્રિપ્શન અને લેબ ટેસ્ટ માટે મેડસ્કેન AI અથવા વીજળી બિલ માટે ડોક્યુસિમ્પલીફાઈ AI પસંદ કરો.",
    pa: "ਡੌਕਿਊਈਜ਼ ਟੂਲ ਹੱਬ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਮੈਡੀਕਲ ਪਰਚੀਆਂ ਲਈ ਮੈਡਸਕੈਨ AI ਜਾਂ ਬਿਜਲੀ ਬਿੱਲਾਂ ਲਈ ਡੌਕੂਸਿੰਪਲੀਫਾਈ AI ਚੁਣੋ।",
    ur: "ڈاکیوایز ٹول ہب میں خوش آمدید! طبی نسخوں اور لیب ٹیسٹ کے لیے میڈ اسکین اے آئی یا بجلی کے بلوں کے لیے ڈاکیوسمپلیفائی اے آئی کا انتخاب کریں۔"
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      SpeechManager.stop();
      setIsSpeaking(false);
      setActiveSentence(undefined);
      return;
    }

    const script = hubGreetings[currentLanguage] || hubGreetings.en;
    setActiveSentence(script);
    setIsSpeaking(true);

    SpeechManager.speak(script, currentLanguage, {
      speed: 0.95,
      onEnd: () => {
        setIsSpeaking(false);
        setActiveSentence(undefined);
      },
      onError: () => {
        setIsSpeaking(false);
        setActiveSentence(undefined);
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Welcome Section with 3D Krish Avatar */}
      <div className="relative rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden border border-teal-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DocuEase AI — Tool Selector Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Select Your Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">Analysis Engine</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Meet Krish X Tattva, your AI assistant. Choose between medical-grade clinical deciphering and universal plain-language utility bill analysis with zero hallucinations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleToggleVoice}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Pause Krish X Tattva' : 'Listen to Voice Guide'}</span>
              </button>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                <Globe2 className="w-4 h-4 text-teal-300" />
                <span>Language: <strong className="text-white">{selectedLangObj.nativeName}</strong></span>
              </div>
            </div>
          </div>

          {/* 3D Krish X Tattva Avatar */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs bg-slate-900/60 rounded-3xl p-3 border border-teal-500/30 shadow-2xl backdrop-blur-md">
              <KrishXTattvaAvatar
                mood={isSpeaking ? 'speaking' : 'idle'}
                isSpeaking={isSpeaking}
                activeSentence={activeSentence}
                onToggleSpeech={handleToggleVoice}
                onReplaySpeech={() => {
                  SpeechManager.stop();
                  setIsSpeaking(false);
                  setTimeout(handleToggleVoice, 200);
                }}
                language={currentLanguage}
                compact={true}
                showControls={false}
                characterTitle="Krish X Tattva"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main 2-Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TOOL A: MedScan AI */}
        <div 
          onClick={() => onNavigate('/medscan')}
          className="group relative bg-white rounded-3xl p-8 border-2 border-teal-100 hover:border-teal-500 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-teal-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          
          <div className="space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-800">
                  Tool A
                </span>
                <span className="text-xs font-bold text-slate-400">Clinical & Diagnostic OCR</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                MedScan AI
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Deciphers messy doctor handwriting, clinical cursive shorthand, dosages (1-0-1), and lab panels (Liver Profile, Hepatitis, Blood Tests). Illegible words are labeled as <strong>&quot;Needs Pharmacist Verification&quot;</strong>.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Messy doctor handwriting & cursive prescription deciphering</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Lab biomarker breakdown (Normal, Elevated, Low) with exact units</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Deterministic safety gate (Drug-drug interactions & duplicate Paracetamol)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('/medscan');
              }}
              className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>Launch MedScan AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TOOL B: DocuSimplify AI */}
        <div 
          onClick={() => onNavigate('/simplify')}
          className="group relative bg-white rounded-3xl p-8 border-2 border-cyan-100 hover:border-cyan-500 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div className="space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-100 text-cyan-800">
                  Tool B
                </span>
                <span className="text-xs font-bold text-slate-400">Utility, Finance & Notices</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                DocuSimplify AI
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Transforms electricity bills, gas invoices, water bills, bank letters, and government notices into clear, everyday language with exact due dates and fraud alerts.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Exact tariff charges, due dates, and consumer account numbers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Mandatory anti-fraud advisory for banking communications (Never share OTP)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Zero medical mixups — 100% segregated financial breakdown</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('/simplify');
              }}
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>Launch DocuSimplify AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Judge Demo Selector */}
      <div className="rounded-3xl bg-slate-100/80 border border-slate-200/80 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-teal-600" />
              1-Click Instant Evaluation Samples (No Upload Required)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly test the zero-fabrication clinical engine and regional TTS with verified realistic documents.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('/medscan', { sampleId: 'demo-hepatitis' })}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700">
              <Stethoscope className="w-4 h-4" />
              <span>Liver Profile Lab Test</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">Hepatitis Serology Panel</p>
            <p className="text-[11px] text-slate-500 mt-0.5">SGPT, SGOT, Bilirubin & HBsAg</p>
          </button>

          <button
            onClick={() => onNavigate('/medscan', { sampleId: 'demo-prescription-messy' })}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700">
              <Stethoscope className="w-4 h-4" />
              <span>Messy Doctor Prescription</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">Clinical Rx Handwriting</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Dosages, duration & verification</p>
          </button>

          <button
            onClick={() => onNavigate('/simplify', { sampleId: 'demo-electricity' })}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500 hover:shadow-md text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-700">
              <FileSpreadsheet className="w-4 h-4" />
              <span>TANGEDCO Electricity Bill</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">₹742.00 Due Amount</p>
            <p className="text-[11px] text-slate-500 mt-0.5">184 kWh units, due 15 Oct 2026</p>
          </button>

          <button
            onClick={() => onNavigate('/simplify', { sampleId: 'demo-bank-kyc' })}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500 hover:shadow-md text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-700">
              <CreditCard className="w-4 h-4" />
              <span>SBI Bank Re-KYC Notice</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">Mandatory KYC Letter</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Anti-scam advisory & deadline</p>
          </button>
        </div>
      </div>

    </div>
  );
};
export default ToolHub;
