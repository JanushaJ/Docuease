import React from 'react';

/**
 * Clean Medical Prescription Card Illustration
 * Used on Document Type Selection (Option 1)
 */
export const PrescriptionIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-36' }) => {
  return (
    <svg
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Medical prescription illustration"
    >
      <defs>
        <linearGradient id="rxCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>

      {/* Background Soft Pill Container */}
      <rect x="10" y="8" width="260" height="124" rx="16" fill="url(#rxCardGrad)" />

      {/* Prescription Pad */}
      <rect x="45" y="16" width="105" height="108" rx="8" fill="#ffffff" stroke="#ccfbf1" strokeWidth="1.5" />
      
      {/* Top Rx Header */}
      <rect x="45" y="16" width="105" height="24" rx="8" fill="#0d9488" />
      <rect x="45" y="28" width="105" height="12" fill="#0d9488" />
      <text x="56" y="32" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="serif">℞</text>
      <rect x="74" y="24" width="45" height="4" rx="2" fill="#99f6e4" />
      <rect x="74" y="31" width="28" height="3" rx="1.5" fill="#ccfbf1" />

      {/* Simulated Cursive Prescription Strokes */}
      <path d="M56 52 C65 48 76 55 88 50 C98 46 108 52 118 49" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="56" y="60" width="46" height="12" rx="3" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="0.8" />
      <text x="61" y="69" fill="#0f766e" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">1-0-1 • 5 Days</text>

      <path d="M56 82 C68 78 80 84 94 80 C104 76 116 82 128 79" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="56" y="90" width="58" height="12" rx="3" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="0.8" />
      <text x="61" y="99" fill="#0284c7" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">Post-meal Timing</text>

      {/* Side Medicine Pill & Stethoscope Motif */}
      <g transform="translate(170, 30)">
        {/* Capsule Pill */}
        <g transform="rotate(-30 40 40)">
          <rect x="25" y="10" width="30" height="14" rx="7" fill="#0ea5e9" />
          <path d="M25 17 A7 7 0 0 1 32 10 H40 V24 H32 A7 7 0 0 1 25 17 Z" fill="#0284c7" />
          <path d="M40 10 H48 A7 7 0 0 1 55 17 A7 7 0 0 1 48 24 H40 V10 Z" fill="#ffffff" />
        </g>

        {/* Clinical Shield Badge */}
        <circle cx="45" cy="58" r="22" fill="#ffffff" stroke="#99f6e4" strokeWidth="1.5" />
        <path d="M45 44 L53 48 V56 C53 62 48 67 45 69 C42 67 37 62 37 56 V48 Z" fill="#0d9488" />
        <path d="M42 56 L44 58 L48 53" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};
