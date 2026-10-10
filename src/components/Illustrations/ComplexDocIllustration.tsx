import React from 'react';

/**
 * Clean Complex Document & Plain Language Illustration
 * Used on Document Type Selection (Option 2)
 */
export const ComplexDocIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-36' }) => {
  return (
    <svg
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Complex document simplification illustration"
    >
      <defs>
        <linearGradient id="docCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>
      </defs>

      {/* Background Soft Container */}
      <rect x="10" y="8" width="260" height="124" rx="16" fill="url(#docCardGrad)" />

      {/* Back Layer: Complex Dense Legal/Bill Page */}
      <rect x="35" y="24" width="85" height="96" rx="6" fill="#e2e8f0" transform="rotate(-6 35 24)" />
      
      {/* Front Page: Simplified Clean Document */}
      <rect x="55" y="16" width="105" height="108" rx="8" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.5" />
      
      {/* Header Bar */}
      <rect x="55" y="16" width="105" height="20" rx="8" fill="#0284c7" />
      <rect x="55" y="26" width="105" height="10" fill="#0284c7" />
      <rect x="68" y="22" width="48" height="5" rx="2.5" fill="#ffffff" />
      <rect x="68" y="30" width="30" height="3" rx="1.5" fill="#bae6fd" />

      {/* Clear Key Fact 1: Due Date / Amount */}
      <rect x="68" y="48" width="78" height="14" rx="4" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="0.8" />
      <circle cx="75" cy="55" r="2.5" fill="#0d9488" />
      <text x="82" y="58" fill="#0f766e" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">Due Date: 15 Oct</text>

      {/* Clear Key Fact 2: Action Item */}
      <rect x="68" y="68" width="78" height="14" rx="4" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="0.8" />
      <circle cx="75" cy="75" r="2.5" fill="#0284c7" />
      <text x="82" y="78" fill="#0369a1" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">Total: ₹742.00</text>

      {/* Clear Key Fact 3: Plain Language Note */}
      <rect x="68" y="88" width="78" height="14" rx="4" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="0.8" />
      <circle cx="75" cy="95" r="2.5" fill="#7e22ce" />
      <text x="82" y="98" fill="#6b21a8" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Action: Pay Online</text>

      {/* Side Plain-Language Transformation Motif */}
      <g transform="translate(175, 26)">
        {/* Magic Lens / Clarity Graphic */}
        <circle cx="40" cy="40" r="28" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
        
        {/* Checkmark in circle */}
        <circle cx="40" cy="40" r="16" fill="#0284c7" />
        <path d="M34 40 L38 44 L47 35" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Floating Sparkle Stars */}
        <path d="M16 18 L18 12 L20 18 L26 20 L20 22 L18 28 L16 22 L10 20 Z" fill="#38bdf8" />
        <path d="M60 62 L61 58 L63 62 L67 63 L63 65 L61 69 L60 65 L56 63 Z" fill="#0d9488" />
      </g>
    </svg>
  );
};
