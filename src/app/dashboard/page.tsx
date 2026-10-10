'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToolHub } from '@/components/Dashboard/ToolHub';
import { SupportedLanguage } from '@/types/medscript';

export default function DashboardPage() {
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
    router.push(route);
  };

  return (
    <ToolHub
      onNavigate={handleNavigate}
      currentLanguage={currentLanguage}
      onLanguageChange={handleLanguageChange}
    />
  );
}
