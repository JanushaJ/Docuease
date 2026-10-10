import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header, ActiveNavRoute } from './components/Header';
import { WorkflowApp } from './components/Workflow/WorkflowApp';
import { PrivacyPage } from './components/Privacy/PrivacyPage';
import { SupportedLanguage } from './types/medscript';

/**
 * Main App Router and Shell
 * Implements the clean, modern user flow:
 * Landing Page -> Get Started -> Choose Document Type -> Upload Document -> 
 * Preview Uploaded File -> Select Language -> Generate Explanation -> View Simplified Explanation
 */
export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Language state (persisted locally)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('docuease_preferred_language');
      if (saved) return saved as SupportedLanguage;
    } catch { /* ignore */ }
    return 'en';
  });

  // Determine active route for Header
  let activeRoute: ActiveNavRoute = 'home';
  if (location.pathname === '/dashboard') {
    activeRoute = 'dashboard';
  } else if (location.pathname.startsWith('/medscan')) {
    activeRoute = 'medscan';
  } else if (location.pathname.startsWith('/simplify')) {
    activeRoute = 'simplify';
  } else if (location.pathname.startsWith('/privacy')) {
    activeRoute = 'privacy';
  }

  // Handle navigation from Header
  const handleNav = (route: ActiveNavRoute) => {
    if (route === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'dashboard') {
      navigate('/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'medscan') {
      navigate('/medscan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'simplify') {
      navigate('/simplify');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'privacy') {
      navigate('/privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setCurrentLanguage(newLang);
    try {
      localStorage.setItem('docuease_preferred_language', newLang);
    } catch { /* ignore */ }
  };

  // Support RTL for Urdu
  const isRtl = currentLanguage === 'ur';

  return (
    <div 
      className={`min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-700 selection:text-white ${
        isRtl ? 'rtl' : 'ltr'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Persistent Clean Navigation Header */}
      <Header
        currentRoute={activeRoute}
        onNavigate={handleNav}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenPrivacy={() => navigate('/privacy')}
      />

      {/* Main Routed Content */}
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          {/* Main User Journey Entry Point (Landing Screen) */}
          <Route
            path="/"
            element={
              <WorkflowApp
                initialStep="landing"
                initialLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />

          {/* Document Type Selection Screen Direct Route */}
          <Route
            path="/dashboard"
            element={
              <WorkflowApp
                initialStep="selection"
                initialLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />

          {/* Medical Prescription Upload Route */}
          <Route
            path="/medscan"
            element={
              <WorkflowApp
                initialStep="upload"
                initialCategory="prescription"
                initialLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />

          {/* Complex Document Upload Route */}
          <Route
            path="/simplify"
            element={
              <WorkflowApp
                initialStep="upload"
                initialCategory="complex_document"
                initialLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />

          {/* Privacy & Safety Information Page */}
          <Route
            path="/privacy"
            element={<PrivacyPage onBack={() => navigate('/')} />}
          />

          {/* Safe Fallback: Redirect unrecognized routes to Landing Page */}
          <Route
            path="*"
            element={
              <WorkflowApp
                initialStep="landing"
                initialLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
