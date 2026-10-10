import React from 'react';

// Friendly Robot Mascot "Sprout AI"
export const MascotSprout: React.FC<{
  mood?: 'happy' | 'thinking' | 'celebrating' | 'cooking';
  size?: number;
  className?: string;
}> = ({ mood = 'happy', size = 80, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none transition-transform hover:scale-105 duration-300"
      >
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="36" ry="6" fill="#064E3B" fillOpacity="0.12" />

        {/* Sprout Antenna */}
        <path d="M60 32 V18" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
        {/* Leaves on antenna */}
        <path d="M60 20 C54 14 46 16 48 24 C55 24 59 22 60 20 Z" fill="#22C55E" />
        <path d="M60 20 C66 14 74 16 72 24 C65 24 61 22 60 20 Z" fill="#4ADE80" />
        <circle cx="60" cy="18" r="3" fill="#FACC15" />

        {/* Robot Head Body */}
        <rect x="30" y="30" width="60" height="52" rx="20" fill="#10B981" />
        <rect x="33" y="33" width="54" height="46" rx="17" fill="#34D399" />

        {/* Cute Face Screen */}
        <rect x="38" y="40" width="44" height="32" rx="12" fill="#064E3B" />

        {/* Face Expressions */}
        {mood === 'happy' && (
          <g>
            {/* Blinking / Starry Eyes */}
            <circle cx="49" cy="52" r="4.5" fill="#38BDF8" />
            <circle cx="51" cy="50" r="1.5" fill="#FFFFFF" />
            <circle cx="71" cy="52" r="4.5" fill="#38BDF8" />
            <circle cx="73" cy="50" r="1.5" fill="#FFFFFF" />
            {/* Cheerful Smile */}
            <path d="M53 61 Q60 67 67 61" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Blushing Cheeks */}
            <circle cx="43" cy="58" r="3" fill="#F43F5E" fillOpacity="0.6" />
            <circle cx="77" cy="58" r="3" fill="#F43F5E" fillOpacity="0.6" />
          </g>
        )}

        {mood === 'thinking' && (
          <g>
            {/* Glasses / Scanner Eyes */}
            <rect x="44" y="48" width="13" height="9" rx="3" fill="#38BDF8" />
            <rect x="63" y="48" width="13" height="9" rx="3" fill="#38BDF8" />
            <line x1="57" y1="52" x2="63" y2="52" stroke="#38BDF8" strokeWidth="2" />
            {/* Small 'o' mouth */}
            <circle cx="60" cy="62" r="3" stroke="#FDE047" strokeWidth="2" fill="none" />
            {/* Blushing */}
            <circle cx="43" cy="58" r="2.5" fill="#F43F5E" fillOpacity="0.5" />
            <circle cx="77" cy="58" r="2.5" fill="#F43F5E" fillOpacity="0.5" />
          </g>
        )}

        {mood === 'celebrating' && (
          <g>
            {/* Happy Curved Closed Eyes ^ ^ */}
            <path d="M46 54 Q50 48 54 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M66 54 Q70 48 74 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Big Open Smile */}
            <path d="M52 60 Q60 69 68 60 Z" fill="#FDE047" />
            <circle cx="42" cy="58" r="3.5" fill="#F43F5E" fillOpacity="0.8" />
            <circle cx="78" cy="58" r="3.5" fill="#F43F5E" fillOpacity="0.8" />
          </g>
        )}

        {mood === 'cooking' && (
          <g>
            {/* Chef Hat */}
            <path d="M48 30 C44 20 54 14 60 18 C66 14 76 20 72 30 Z" fill="#FFFFFF" />
            <rect x="48" y="27" width="24" height="6" rx="2" fill="#E2E8F0" />
            {/* Winking eye */}
            <circle cx="49" cy="52" r="4.5" fill="#38BDF8" />
            <path d="M67 52 Q72 55 76 52" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M54 62 Q60 67 66 62" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Robot Body / Torso */}
        <path d="M38 82 H82 L78 106 H42 L38 82 Z" fill="#059669" />
        <rect x="45" y="86" width="30" height="15" rx="5" fill="#ECFDF5" />
        {/* Heart / Eco Gauge on Torso */}
        <path d="M57 91 A3 3 0 0 0 54 94 C54 97 60 100 60 100 C60 100 66 97 66 94 A3 3 0 0 0 63 91 C61.5 91 60 92.5 60 92.5 C60 92.5 58.5 91 57 91 Z" fill="#F43F5E" />

        {/* Waving Hands */}
        <circle cx="27" cy="85" r="7" fill="#10B981" />
        <circle cx="93" cy="76" r="7" fill="#10B981" />
        {/* Hand wave lines */}
        <path d="M98 68 Q103 72 101 78" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M103 71 Q108 76 106 82" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

// Cute Smiling Apple
export const CartoonApple: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Stem & Leaf */}
    <path d="M32 16 C32 10 36 6 40 4" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <path d="M34 10 C42 8 46 14 44 18 C38 18 35 14 34 10 Z" fill="#22C55E" />
    {/* Apple Body */}
    <path d="M32 20 C20 12 8 22 8 36 C8 50 20 60 32 58 C44 60 56 50 56 36 C56 22 44 12 32 20 Z" fill="#F43F5E" />
    {/* Highlights */}
    <ellipse cx="20" cy="28" rx="4" ry="7" fill="#FB7185" transform="rotate(-20 20 28)" />
    {/* Smiling Face */}
    <circle cx="26" cy="36" r="2.5" fill="#1E293B" />
    <circle cx="38" cy="36" r="2.5" fill="#1E293B" />
    <path d="M28 42 Q32 46 36 42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="20" cy="40" r="2" fill="#FDA4AF" />
    <circle cx="44" cy="40" r="2" fill="#FDA4AF" />
  </svg>
);

// Cute Smiling Carrot
export const CartoonCarrot: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Carrot Greens */}
    <path d="M42 12 C44 4 52 4 50 14" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 16 C54 10 58 16 50 22" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
    {/* Carrot Body */}
    <path d="M44 20 C48 24 46 30 40 34 L18 56 C14 58 10 54 12 50 L34 28 C38 22 40 18 44 20 Z" fill="#F97316" />
    {/* Stripes */}
    <line x1="28" y1="36" x2="34" y2="40" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="44" x2="26" y2="48" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    {/* Face */}
    <circle cx="36" cy="27" r="2" fill="#1E293B" />
    <circle cx="41" cy="31" r="2" fill="#1E293B" />
    <path d="M37 34 Q39 37 42 34" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// Cute Delivery Van Illustration
export const CartoonDeliveryVan: React.FC<{ size?: number; className?: string }> = ({ size = 96, className = '' }) => (
  <svg width={size} height={(size * 2) / 3} viewBox="0 0 120 80" fill="none" className={className}>
    {/* Van Body */}
    <rect x="10" y="22" width="70" height="42" rx="8" fill="#10B981" />
    <path d="M80 32 L98 32 C104 32 108 36 109 42 L112 52 C113 58 110 64 104 64 H80 V32 Z" fill="#34D399" />
    {/* Window */}
    <path d="M84 36 H97 C100 36 102 38 103 42 L105 48 H84 V36 Z" fill="#E0F2FE" />
    {/* Headlight */}
    <circle cx="110" cy="56" r="3" fill="#FDE047" />
    {/* Sprout Logo on Van side */}
    <circle cx="45" cy="42" r="14" fill="#FFFFFF" />
    <path d="M45 48 V36" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    <path d="M45 38 C41 34 37 36 38 41 C42 41 44 40 45 38 Z" fill="#22C55E" />
    <path d="M45 38 C49 34 53 36 52 41 C48 41 46 40 45 38 Z" fill="#4ADE80" />
    {/* Wheels */}
    <circle cx="32" cy="64" r="10" fill="#1E293B" />
    <circle cx="32" cy="64" r="5" fill="#E2E8F0" />
    <circle cx="92" cy="64" r="10" fill="#1E293B" />
    <circle cx="92" cy="64" r="5" fill="#E2E8F0" />
    {/* Speed Wind Lines */}
    <path d="M2 32 H6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M0 40 H7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 48 H8" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Cute Community Volunteer Illustration
export const CartoonVolunteers: React.FC<{ size?: number; className?: string }> = ({ size = 80, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    {/* Volunteer 1 (Left) */}
    <circle cx="35" cy="30" r="12" fill="#FDBA74" />
    <path d="M25 24 C28 18 42 18 45 24 Z" fill="#78350F" />
    <circle cx="32" cy="30" r="1.5" fill="#1E293B" />
    <circle cx="38" cy="30" r="1.5" fill="#1E293B" />
    <path d="M33 34 Q35 37 37 34" stroke="#1E293B" strokeWidth="1.2" fill="none" />
    <path d="M20 54 C20 44 50 44 50 54 V70 H20 Z" fill="#0EA5E9" />
    {/* Volunteer 2 (Right) */}
    <circle cx="65" cy="30" r="12" fill="#FED7AA" />
    <path d="M55 22 C62 16 75 18 75 25 Z" fill="#1E293B" />
    <circle cx="62" cy="30" r="1.5" fill="#1E293B" />
    <circle cx="68" cy="30" r="1.5" fill="#1E293B" />
    <path d="M63 34 Q65 37 67 34" stroke="#1E293B" strokeWidth="1.2" fill="none" />
    <path d="M50 54 C50 44 80 44 80 54 V70 H50 Z" fill="#F59E0B" />
    {/* Crate of Rescued Produce held together */}
    <rect x="30" y="60" width="40" height="24" rx="4" fill="#D97706" />
    <line x1="30" y1="68" x2="70" y2="68" stroke="#B45309" strokeWidth="2" />
    <circle cx="40" cy="56" r="6" fill="#F43F5E" />
    <circle cx="50" cy="54" r="7" fill="#22C55E" />
    <circle cx="60" cy="57" r="5" fill="#FACC15" />
    {/* Heart Symbol */}
    <path d="M50 42 A2.5 2.5 0 0 0 47.5 44.5 C47.5 47 50 49 50 49 C50 49 52.5 47 52.5 44.5 A2.5 2.5 0 0 0 50 42 Z" fill="#F43F5E" />
  </svg>
);

// Cute Bread Loaf
export const CartoonBread: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <ellipse cx="32" cy="36" rx="24" ry="16" fill="#F59E0B" />
    <ellipse cx="32" cy="32" rx="22" ry="14" fill="#FCD34D" />
    {/* Slash cuts */}
    <path d="M22 24 Q24 32 20 38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 22 Q34 32 30 38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M42 24 Q44 32 40 38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    {/* Face */}
    <circle cx="28" cy="34" r="2" fill="#78350F" />
    <circle cx="36" cy="34" r="2" fill="#78350F" />
    <path d="M30 38 Q32 41 34 38" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="23" cy="36" r="2" fill="#F43F5E" fillOpacity="0.4" />
    <circle cx="41" cy="36" r="2" fill="#F43F5E" fillOpacity="0.4" />
  </svg>
);

// Cute Zero-Waste Loop Symbol
export const CartoonRecycleLoop: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="32" r="26" fill="#DCFCE7" />
    <path d="M32 14 C42 14 50 22 50 32 C50 36 48 40 45 44" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 44 L44 44 L46 38" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 50 C22 50 14 42 14 32 C14 28 16 24 19 20" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
    <path d="M14 20 L20 20 L18 26" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center Leaf */}
    <path d="M32 24 C26 24 24 30 26 36 C32 38 36 34 36 28 C36 26 34 24 32 24 Z" fill="#22C55E" />
    <line x1="26" y1="36" x2="32" y2="28" stroke="#15803D" strokeWidth="1.5" />
  </svg>
);
