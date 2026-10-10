import React from 'react';
import { ArrowRight, ShieldCheck, Globe2, Sparkles, Stethoscope, FileText } from 'lucide-react';
import { DocumentHeroIllustration } from '../Illustrations/DocumentHeroIllustration';

export interface LandingScreenProps {
  onGetStarted: () => void;
}

/**
 * Clean, Modern Healthcare-Tech Landing Screen
 * Features clear title, focused description, professional medical document illustration,
 * and one prominent "Get Started" call to action.
 */
export const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      {/* Main Centered Hero Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        
        {/* Left Column: Value Proposition & Single CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Subtle Healthcare-Tech Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>AI-Powered Medical & Document Deciphering</span>
          </div>

          {/* Clear Application Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Understand Any Document, <br />
              <span className="text-teal-700">in Your Language.</span>
            </h1>
            
            {/* Short, Focused Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              From messy doctor handwriting and prescription dosages to dense utility bills and legal notices. Get clear, plain-language explanations with zero guesswork.
            </p>
          </div>

          {/* Value Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg pt-1">
            <div className="flex items-start gap-2.5 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-md bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <span>Decipher cursive prescriptions & exact dosages</span>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-md bg-sky-100/70 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span>Simplify complex bills & official notices</span>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-md bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <span>Telugu, Tamil, Hindi, Kannada & more</span>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-md bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Explicit pharmacist verification warnings</span>
            </div>
          </div>

          {/* Prominent Primary Call-To-Action Button */}
          <div className="pt-4 w-full sm:w-auto">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base shadow-lg shadow-teal-700/20 hover:shadow-xl hover:shadow-teal-700/30 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-500/30"
              aria-label="Get Started with DocuEase AI"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Caption */}
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Private & confidential. Files are processed securely and never retained.</span>
          </p>
        </div>

        {/* Right Column: Professional Medical Document Illustration */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-md lg:max-w-none p-4 sm:p-6 bg-gradient-to-b from-slate-50/80 to-teal-50/30 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-center">
            <DocumentHeroIllustration className="w-full h-auto drop-shadow-sm" />
          </div>
        </div>

      </div>

      {/* Clean Bottom Trust Bar */}
      <div className="max-w-6xl mx-auto w-full pt-8 sm:pt-12 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700">DocuEase AI</span>
          <span>•</span>
          <span>Healthcare Accessibility & Linguistic Equity</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Doctor Prescriptions</span>
          <span>Lab Blood Reports</span>
          <span>Utility Bills</span>
          <span>Official Notices</span>
        </div>
      </div>
    </div>
  );
};
