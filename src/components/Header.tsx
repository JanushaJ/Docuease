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
 * Minimal, aligned, professional visual identity.
 */
export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  currentLanguage,
  onLanguageChange,
  onOpenPrivacy,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: ActiveNavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNav('home'); }}
          aria-label="DocuEase AI Home"
        >
          {/* Professional Medical Document Symbol */}
          <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
            <Stethoscope className="w-5 h-5 text-teal-100" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                DocuEase <span className="text-teal-700">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 rounded-full border border-teal-200">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Medical &amp; Utility
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight hidden sm:block">
              Understand Any Document, in Your Language
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => handleNav('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'home'
                ? 'bg-white text-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'dashboard'
                ? 'bg-white text-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Document Hub</span>
          </button>

          <button
            onClick={() => handleNav('privacy')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'privacy'
                ? 'bg-white text-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy &amp; Safety</span>
          </button>
        </nav>

        {/* Right: Language Selector & Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="compact"
          />

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
