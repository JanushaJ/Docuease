import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Check, 
  Globe2, 
  FileText, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption } from '../../types/medscript';
import { UploadedFileData } from './UploadScreen';

export interface LanguageScreenProps {
  uploadedFile: UploadedFileData;
  selectedLanguage: SupportedLanguage;
  onLanguageSelect: (lang: SupportedLanguage) => void;
  onGenerateExplanation: () => void;
  onBack: () => void;
  isAnalyzing?: boolean;
}

/**
 * Screen 4: Language Selection Screen
 * Lets the user select their preferred regional language for the explanation.
 * Features a clean searchable card grid, clear selection highlighting, and file summary.
 */
export const LanguageScreen: React.FC<LanguageScreenProps> = ({
  uploadedFile,
  selectedLanguage,
  onLanguageSelect,
  onGenerateExplanation,
  onBack,
  isAnalyzing = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:underline disabled:opacity-50"
          aria-label="Back to file upload"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upload</span>
        </button>

        {/* Selected Document Summary Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">{uploadedFile.name}</span>
        </div>
      </div>

      {/* Screen Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
          Step 3 of 4
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Which language would you like the explanation in?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          The summary, medical dosages, action items, and spoken audio narration will be generated in your selected language.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by language name or native script..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 shadow-xs transition-all outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Searchable Language Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-8 max-h-[380px] overflow-y-auto p-1.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageSelect(lang.code)}
                disabled={isAnalyzing}
                className={`relative flex flex-col justify-between p-4 rounded-xl text-left transition-all duration-150 border ${
                  isSelected
                    ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/10'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900 tracking-tight">
                      {lang.nativeName}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {lang.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Volume2 className="w-3 h-3 text-slate-400" />
                  <span>Audio Speech</span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-slate-500">
            No languages matching &ldquo;{searchQuery}&rdquo;. Try another search.
          </div>
        )}
      </div>

      {/* Selected Language Active Confirmation Card */}
      <div className="mb-8 p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Selected Output Language
            </div>
            <div className="text-sm font-bold text-slate-900">
              {selectedLangObj.nativeName} ({selectedLangObj.name})
            </div>
          </div>
        </div>
        <span className="text-xs font-semibold text-teal-700 bg-white px-3 py-1 rounded-full border border-teal-200 shadow-2xs">
          Speech Locale: {selectedLangObj.voiceLangCode}
        </span>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onGenerateExplanation}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-teal-500/20 cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Document...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Explanation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
