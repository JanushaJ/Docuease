import React from 'react';

/**
 * Professional Medical Document Understanding SVG Illustration
 * Clean healthcare-tech aesthetic with prescription document, stethoscope emblem, 
 * subtle optical scan line, and AI clarity badge.
 */
export const DocumentHeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto' }) => {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Medical document analysis illustration"
    >
      <defs>
        {/* Soft Background Radial Gradient */}
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Prescription Paper Drop Shadow */}
        <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0f172a" floodOpacity="0.08" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0ea5e9" floodOpacity="0.04" />
        </filter>

        {/* Secondary Card Drop Shadow */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.1" />
        </filter>

        {/* Scan Line Gradient */}
        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
          <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </linearGradient>

        {/* Teal Accent Gradient */}
        <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Ambient Glow */}
      <circle cx="240" cy="180" r="160" fill="url(#bgGlow)" />

      {/* Subtle Background Geometric Circuit Lines */}
      <path
        d="M60 140 H120 V220 H80"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="60" cy="140" r="3" fill="#cbd5e1" />
      <path
        d="M420 220 H360 V120 H400"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="420" cy="220" r="3" fill="#cbd5e1" />

      {/* Behind Document Layer (Secondary Page / Lab Report) */}
      <rect
        x="170"
        y="50"
        width="190"
        height="250"
        rx="14"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        transform="rotate(6 170 50)"
      />
      <line x1="200" y1="90" x2="310" y2="102" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" transform="rotate(6 170 50)" />
      <line x1="200" y1="110" x2="280" y2="119" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" transform="rotate(6 170 50)" />

      {/* Main Front Document: Medical Prescription Pad */}
      <g filter="url(#cardShadow)">
        <rect
          x="120"
          y="45"
          width="210"
          height="270"
          rx="16"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />

        {/* Prescription Header Bar */}
        <path d="M120 61 C120 52.16 127.16 45 136 45 H314 C322.84 45 330 52.16 330 61 V85 H120 V61 Z" fill="#f0fdfa" />
        <line x1="120" y1="85" x2="330" y2="85" stroke="#ccfbf1" strokeWidth="1" />

        {/* Rx Medical Symbol */}
        <text x="140" y="74" fill="#0f766e" fontSize="18" fontWeight="bold" fontFamily="serif">℞</text>

        {/* Clinic Header Lines */}
        <rect x="165" y="61" width="85" height="5" rx="2.5" fill="#0f766e" />
        <rect x="165" y="70" width="55" height="4" rx="2" fill="#99f6e4" />

        {/* Doctor Verification Stamp Outline */}
        <rect x="272" y="55" width="42" height="20" rx="4" fill="none" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" />
        <text x="278" y="69" fill="#0f766e" fontSize="8" fontWeight="bold" fontFamily="sans-serif">VERIFIED</text>

        {/* Cursive / Handwritten Representation (Simulated prescription handwriting) */}
        <path
          d="M142 110 C155 106 170 114 185 108 C195 104 205 112 215 107 C225 102 235 110 245 106"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <text x="255" y="112" fill="#64748b" fontSize="11" fontWeight="600" fontFamily="sans-serif">500mg</text>

        {/* Dosage Tag e.g. 1-0-1 */}
        <rect x="142" y="124" width="70" height="18" rx="5" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
        <text x="150" y="136" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="sans-serif">1 - 0 - 1 • 5d</text>

        {/* Second Medicine Stroke */}
        <path
          d="M142 165 C158 160 175 168 190 162 C205 158 220 166 235 161"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <text x="245" y="167" fill="#64748b" fontSize="11" fontWeight="600" fontFamily="sans-serif">650mg</text>
        <rect x="142" y="178" width="82" height="18" rx="5" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
        <text x="149" y="190" fill="#0f766e" fontSize="10" fontWeight="bold" fontFamily="sans-serif">After meals</text>

        {/* Third Line: Unclear Handwriting Line with Question Marker */}
        <path
          d="M142 220 C152 215 165 224 175 218 C185 212 195 220 205 216"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="3 2"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="215" y="210" width="98" height="18" rx="5" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
        <text x="221" y="222" fill="#b45309" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Pharmacist Verify</text>

        {/* Bottom Doctor Signature */}
        <path
          d="M230 280 C240 268 250 292 265 272 C275 260 285 284 300 274"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="220" y1="288" x2="310" y2="288" stroke="#e2e8f0" strokeWidth="1" />
        <text x="235" y="298" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Doctor's Signature</text>

        {/* Active Laser Optical Scan Line */}
        <line x1="120" y1="152" x2="330" y2="152" stroke="url(#scanGradient)" strokeWidth="3" />
        <circle cx="225" cy="152" r="4" fill="#0ea5e9" />
      </g>

      {/* Floating Badge Left: Multi-Language Output Card */}
      <g filter="url(#badgeShadow)">
        <rect x="40" y="195" width="130" height="66" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="52" y="207" width="28" height="28" rx="8" fill="#f0f9ff" />
        <text x="59" y="226" fill="#0284c7" fontSize="14" fontWeight="bold">తె</text>
        <text x="88" y="218" fill="#0f172a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Plain Language</text>
        <text x="88" y="232" fill="#0284c7" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">11 Languages</text>
        <text x="52" y="251" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">Native regional speech</text>
      </g>

      {/* Floating Badge Right: Clinical Accuracy Shield */}
      <g filter="url(#badgeShadow)">
        <rect x="290" y="90" width="145" height="64" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="302" y="102" width="28" height="28" rx="8" fill="#f0fdfa" />
        {/* Shield Icon */}
        <path
          d="M316 109 L323 112 V118 C323 123 319 127 316 128 C313 127 309 123 309 118 V112 Z"
          fill="#0d9488"
        />
        <text x="338" y="114" fill="#0f172a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Zero-Guessing</text>
        <text x="338" y="128" fill="#059669" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">100% Reliable</text>
        <text x="302" y="146" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">Safety checks included</text>
      </g>
    </svg>
  );
};
