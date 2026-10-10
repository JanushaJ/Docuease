import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  ShieldCheck, 
  Trash2, 
  Languages, 
  Volume2, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { getBackendSettings, saveGeminiKey, purgeAllDocuments } from '../../services/api';

interface SettingsViewProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isDemoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onPurgeComplete?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLanguage,
  onLanguageChange,
  isDemoMode,
  onToggleDemoMode,
  onPurgeComplete
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [activeEngine, setActiveEngine] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await getBackendSettings();
      setHasGeminiKey(data.hasGeminiKey);
      setActiveEngine(data.activeEngine);
    }
    loadSettings();
  }, []);

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setIsSaving(true);
    const ok = await saveGeminiKey(apiKey.trim());
    setIsSaving(false);
    if (ok) {
      setHasGeminiKey(true);
      setActiveEngine('Google Gemini 2.5 Flash Multimodal Document AI');
      setSaveSuccess(true);
      setApiKey('');
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handlePurgeAll = async () => {
    if (window.confirm('Are you sure you want to permanently delete all uploaded documents and chat histories from the SQLite database? This cannot be undone.')) {
      setIsPurging(true);
      const ok = await purgeAllDocuments();
      setIsPurging(false);
      if (ok) {
        setPurgeSuccess(true);
        if (onPurgeComplete) onPurgeComplete();
        setTimeout(() => setPurgeSuccess(false), 3000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-medblue-50 text-medblue-600 flex items-center justify-center border border-medblue-200">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                System &amp; Application Settings
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Configure Document AI credentials, recognition engine, language, and privacy controls
              </p>
            </div>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 inline-flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          Server-Side Credential Protection
        </span>
      </div>

      {/* Section 17 & 16: Document AI Credentials */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-medblue-700 uppercase tracking-wider block mb-1">
              Document Recognition Service
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Google Gemini Multimodal Vision &amp; Document AI
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Krishxtattva uses Google Gemini 2.5 Flash Multimodal Vision for reading cursive handwriting, complex multi-page PDFs, utility bills, and official documents.
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            hasGeminiKey 
              ? 'bg-teal-50 text-teal-800 border border-teal-200' 
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {hasGeminiKey ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Active (Gemini 2.5 Flash)
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Local Tesseract Engine Active
              </>
            )}
          </span>
        </div>

        {/* Status Alert Banner */}
        {!hasGeminiKey && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                Document AI service is not configured.
              </p>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Add your Google Gemini API key below to enable real multimodal prescription analysis. The system is currently running with the built-in Local Tesseract Clinical Engine.
              </p>
            </div>
          </div>
        )}

        {hasGeminiKey && (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Document AI service is active.</span>
              <span className="text-xs text-teal-800 ml-2">All uploaded documents travel through Google Gemini 2.5 Flash Multimodal Vision.</span>
            </div>
          </div>
        )}

        {/* API Key Form */}
        <form onSubmit={handleSaveKey} className="space-y-4 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {hasGeminiKey ? 'Update Gemini API Key:' : 'Enter Gemini API Key (GEMINI_API_KEY):'}
          </label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={hasGeminiKey ? '••••••••••••••••••••••••••••••••' : 'AIzaSy...'}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-medblue-500 focus:border-transparent font-mono"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSaving || !apiKey.trim()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-medblue-600 text-white hover:bg-medblue-700 disabled:opacity-50 transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Verifying...' : 'Save & Activate'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Keys are securely stored in local SQLite environment and never transmitted to client JS.</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-medblue-600 hover:underline flex items-center gap-1 font-semibold"
            >
              Get Free Gemini Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </form>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            Gemini Document AI credentials successfully verified and activated!
          </div>
        )}
      </div>

      {/* Section 11 & 18: Language & Speech Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Language &amp; Speech Settings
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Preferred Explanation Language
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Affects written explanation, simple summary, AI Doctor speech, and subtitles.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUPPORTED_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => onLanguageChange(l.code)}
              className={`p-3 rounded-2xl border text-left transition ${
                currentLanguage === l.code
                  ? 'bg-medblue-600 text-white border-medblue-600 shadow-md ring-2 ring-medblue-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="block text-sm font-bold">{l.nativeName}</span>
              <span className={`text-[11px] block mt-0.5 ${currentLanguage === l.code ? 'text-sky-100' : 'text-slate-500'}`}>
                {l.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section 17: Developer Mock Mode */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-slate-600" />
              Developer UI Mock Mode
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly for offline UI development. When enabled, sample data will be explicitly labeled as DEMO / MOCK DATA.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDemoMode}
              onChange={(e) => onToggleDemoMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medblue-600" />
          </label>
        </div>

        {isDemoMode && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>DEMO / MOCK DATA MODE ACTIVE: Any sample documents shown are strictly for developer layout testing and must never be interpreted as real clinical documents.</span>
          </div>
        )}
      </div>

      {/* Section 15: Privacy & Local Storage */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Privacy &amp; Data Hygiene
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Database &amp; Session Memory Wipe
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Krishxtattva enforces complete privacy. All processed files and chat memories reside in your local SQLite store. You can purge all persisted data at any time.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Permanent Database Reset
            </span>
            <span className="text-[11px] text-slate-500 block">
              Deletes all records from `documents` and `chat_messages` tables.
            </span>
          </div>

          <button
            onClick={handlePurgeAll}
            disabled={isPurging}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            {isPurging ? 'Purging...' : 'Purge All Saved Records'}
          </button>
        </div>

        {purgeSuccess && (
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            All database documents and conversation logs have been permanently erased.
          </div>
        )}
      </div>

      {/* Medical Safety Disclaimer Notice */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs leading-relaxed">
        <p className="font-bold text-slate-800 mb-1">
          Accessibility & Medical Disclaimer Notice:
        </p>
        Krishxtattva explains information contained in your documents. It does not replace your doctor, lawyer, or financial institution and does not independently diagnose medical conditions. Always verify unclear instructions with a qualified professional.
      </div>

    </div>
  );
};
