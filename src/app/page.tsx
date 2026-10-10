'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocuEaseLanding } from '@/components/LandingPage/DocuEaseLanding';
import { SupportedLanguage } from '@/types/medscript';

export default function LandingPage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('docuease_preferred_language');
        if (saved) return saved as SupportedLanguage;
      } catch { /* ignore */ }
    }
    return 'en';
  });

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setCurrentLanguage(newLang);
    try {
      localStorage.setItem('docuease_preferred_language', newLang);
    } catch { /* ignore */ }
  };

  const handleNavigate = (route: string) => {
    if (route === '/medscan') router.push('/medscan');
    else if (route === '/simplify') router.push('/simplify');
    else if (route === '/dashboard') router.push('/dashboard');
    else router.push(route);
  };

  return (
    <DocuEaseLanding
      onNavigate={handleNavigate}
      currentLanguage={currentLanguage}
      onLanguageChange={handleLanguageChange}
    />
  );
}
