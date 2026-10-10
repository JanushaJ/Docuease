import React, { useState } from 'react';
import { 
  FileText, 
  Stethoscope, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  Layers, 
  Lock
} from 'lucide-react';
import { SupportedLanguage } from '../types/medscript';
import { LanguageSelector } from './LanguageSelector';
import { getUITranslation } from '../utils/uiTranslations';

export type ActiveNavRoute = 'home' | 'dashboard' | 'medscan' | 'simplify' | 'how-it-works' | 'privacy';
export type ActivePage = ActiveNavRoute | 'landing' | 'upload' | 'results' | 'history' | 'privacy';

export interface HeaderProps {
  currentRoute: ActiveNavRoute;
  onNavigate: (route: ActiveNavRoute) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  hasActiveDoc?: boolean;
  onOpenPrivacy?: () => void;
}

/**
 * Clean, Modern Healthcare-Tech Header
 * Minimal, aligned, professional visual identity with full i18n localization.
 */
export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  currentLanguage,
  onLanguageChange,
  onOpenPrivacy,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getUITranslation(currentLanguage);

  const handleNav = (route: ActiveNavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-teal-100/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name Matching Reference Image */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNav('home'); }}
          aria-label="DocuEase Documents Made Simple"
        >
          {/* Document Upload Icon */}
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-2xs transition-transform group-hover:scale-105">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="m9 15 3-3 3 3" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-[#1e293b] tracking-tight">
                DocuEase
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <p className="text-[11px] text-slate-500 font-semibold tracking-tight">
              Documents Made Simple
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links (Home, Features, How It Works, About, Contact) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-blue-600 ${
              currentRoute === 'home' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className="transition-colors hover:text-blue-600"
          >
            Features
          </button>
          <button
            onClick={() => handleNav('how-it-works')}
            className="transition-colors hover:text-blue-600"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="transition-colors hover:text-blue-600"
          >
            About
          </button>
          <button
            onClick={() => onOpenPrivacy ? onOpenPrivacy() : handleNav('privacy')}
            className="transition-colors hover:text-blue-600"
          >
            Contact
          </button>
        </nav>

        {/* Right: Language Selector & "Try Now →" Button */}
        <div className="flex items-center gap-3">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="compact"
          />

          <button
            onClick={() => handleNav('dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Try Now</span>
            <span className="text-blue-200">→</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Document Hub</span>
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Privacy &amp; Safety</span>
          </button>
        </div>
      )}
    </header>
  );
};
