import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption } from '../../types/medscript';

export interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  className?: string;
  variant?: 'compact' | 'full' | 'dropdown';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  variant = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    onLanguageChange(code);
    setIsOpen(false);
    try {
      localStorage.setItem('docuease_preferred_language', code);
    } catch {
      // Local storage unavailable
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 hover:border-teal-400 text-xs font-semibold text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Select language. Current: ${selectedLang.name}`}
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>{selectedLang.nativeName}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {isOpen && (
          <div
            className="absolute right-0 mt-1.5 w-56 max-h-72 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
            role="listbox"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-teal-50 font-bold text-teal-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                role="option"
                aria-selected={currentLanguage === lang.code}
              >
                <div>
                  <div className="font-semibold">{lang.nativeName}</div>
                  <div className="text-[11px] text-slate-500 font-normal">{lang.name}</div>
                </div>
                {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-teal-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-teal-400 text-sm font-medium text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select language. Current language: ${selectedLang.name}`}
      >
        <Globe className="w-4 h-4 text-teal-600" />
        <span className="font-semibold text-slate-900">{selectedLang.nativeName}</span>
        <span className="text-xs text-slate-500 hidden sm:inline">({selectedLang.name})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
        >
          <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Available Languages (11)
          </div>
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-teal-50/80 font-bold text-teal-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                role="option"
                aria-selected={currentLanguage === lang.code}
              >
                <div>
                  <div className="font-semibold text-slate-900">{lang.nativeName}</div>
                  <div className="text-[11px] text-slate-500 font-normal">{lang.name}</div>
                </div>
                {currentLanguage === lang.code && <Check className="w-4 h-4 text-teal-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
