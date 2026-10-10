import React, { useState } from 'react';
import { 
  Activity, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

export interface OrganDiagramExplainerProps {
  organType?: string;
  markerName?: string;
}

export const OrganDiagramExplainer: React.FC<OrganDiagramExplainerProps> = ({
  organType = 'liver',
  markerName = 'HBsAg'
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const educationalFlow = [
    {
      title: '1. The Organ: Liver',
      subtitle: 'Where Hepatitis B virus targets',
      description: 'The liver is your body’s chemical processing and filtering factory. Hepatitis refers generally to inflammation of this vital organ.',
      iconText: '🫀',
      badge: 'Target Organ'
    },
    {
      title: '2. The Virus Structure',
      subtitle: 'Outer coat vs Inner core',
      description: 'Hepatitis B virus is surrounded by a spherical outer coat made of specialized surface proteins called HBsAg.',
      iconText: '🦠',
      badge: 'Virus Antigen'
    },
    {
      title: '3. Release into Bloodstream',
      subtitle: 'Shedding of surface markers',
      description: 'When the virus replicates, excess surface antigen proteins (HBsAg) spill into circulating blood vessels.',
      iconText: '🩸',
      badge: 'Circulating Marker'
    },
    {
      title: '4. The Laboratory Detector (CMIA)',
      subtitle: 'Looking for the specific marker',
      description: 'The laboratory machine uses targeted antibodies to capture any HBsAg proteins. Your test found NO marker (Non-Reactive, score 0.35).',
      iconText: '🔬',
      badge: 'Detection Result'
    }
  ];

  return (
    <div className="w-full p-4 rounded-xl bg-darkblue-950/95 border border-darkblue-700 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-darkblue-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-gold-500/20 text-gold-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream-100">
              Educational Concept Map: How HBsAg Works
            </h4>
            <p className="text-[11px] text-cream-400">Gentle visual explanation of liver viral screening</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-darkblue-800 text-gold-accent border border-darkblue-700">
          Educational Diagram
        </span>
      </div>

      {/* SVG Educational Visual Diagram (Friendly, Non-graphic) */}
      <div className="relative w-full h-[180px] bg-gradient-to-b from-darkblue-900 to-darkblue-950 rounded-xl border border-darkblue-800 p-2 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 650 200" className="w-full h-full max-w-[550px]" preserveAspectRatio="xMidYMid meet">
          {/* Connecting Pathway Line */}
          <line x1="80" y1="100" x2="570" y2="100" stroke="#1E2F6C" stroke-width="3" stroke-dasharray="4 4" />
          
          {/* Animated Energy Flow pulses along the line */}
          <circle cx="210" cy="100" r="5" fill="#38BDF8" className="animate-ping" />
          <circle cx="380" cy="100" r="5" fill="#E5C07B" className="animate-ping" />

          {/* Node 1: The Liver */}
          <g 
            onClick={() => setActiveStep(0)} 
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            transform="translate(80, 100)"
          >
            <circle cx="0" cy="0" r="42" fill={activeStep === 0 ? '#182658' : '#0D1636'} stroke={activeStep === 0 ? '#38BDF8' : '#1E2F6C'} stroke-width="2.5" />
            {/* Stylized Friendly Liver Shape */}
            <path d="M-18 -12 C -8 -26, 22 -22, 26 -2 C 28 16, 12 26, -6 24 C -22 22, -26 4, -18 -12 Z" fill="#E08365" stroke="#C26143" stroke-width="1.5" />
            <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#CBD5E1" text-anchor="middle">LIVER</text>
          </g>

          {/* Arrow 1 */}
          <path d="M 140 100 L 160 100" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" />

          {/* Node 2: Virus Particle */}
          <g 
            onClick={() => setActiveStep(1)} 
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            transform="translate(230, 100)"
          >
            <circle cx="0" cy="0" r="42" fill={activeStep === 1 ? '#182658' : '#0D1636'} stroke={activeStep === 1 ? '#E5C07B' : '#1E2F6C'} stroke-width="2.5" />
            {/* Friendly Virus with Coat Markers */}
            <circle cx="0" cy="0" r="16" fill="#3B82F6" opacity="0.8" />
            <circle cx="-16" cy="0" r="3" fill="#E5C07B" />
            <circle cx="16" cy="0" r="3" fill="#E5C07B" />
            <circle cx="0" cy="-16" r="3" fill="#E5C07B" />
            <circle cx="0" cy="16" r="3" fill="#E5C07B" />
            <circle cx="-11" cy="-11" r="3" fill="#E5C07B" />
            <circle cx="11" cy="11" r="3" fill="#E5C07B" />
            <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#CBD5E1" text-anchor="middle">VIRUS</text>
          </g>

          {/* Arrow 2 */}
          <path d="M 290 100 L 310 100" stroke="#E5C07B" stroke-width="2" />

          {/* Node 3: Shed Surface Antigen (HBsAg) */}
          <g 
            onClick={() => setActiveStep(2)} 
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            transform="translate(400, 100)"
          >
            <circle cx="0" cy="0" r="42" fill={activeStep === 2 ? '#182658' : '#0D1636'} stroke={activeStep === 2 ? '#F59E0B' : '#1E2F6C'} stroke-width="2.5" />
            {/* Free Surface Antigen Molecules */}
            <circle cx="-10" cy="-6" r="6" fill="#F59E0B" />
            <circle cx="8" cy="8" r="6" fill="#F59E0B" />
            <circle cx="10" cy="-8" r="5" fill="#FBBF24" />
            <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#CBD5E1" text-anchor="middle">HBsAg</text>
          </g>

          {/* Arrow 3 */}
          <path d="M 460 100 L 480 100" stroke="#10B981" stroke-width="2" />

          {/* Node 4: The Laboratory Analyzer Detector */}
          <g 
            onClick={() => setActiveStep(3)} 
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            transform="translate(560, 100)"
          >
            <circle cx="0" cy="0" r="42" fill={activeStep === 3 ? '#182658' : '#0D1636'} stroke={activeStep === 3 ? '#10B981' : '#1E2F6C'} stroke-width="2.5" />
            {/* Checkmark Shield */}
            <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#10B981" />
            <path d="M-7 -1 L -2 5 L 7 -5" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#10B981" text-anchor="middle">CLEAR</text>
          </g>
        </svg>
      </div>

      {/* Step Explanation Cards Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {educationalFlow.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-darkblue-800 border-gold-accent shadow-md'
                  : 'bg-darkblue-900/60 border-darkblue-800 hover:bg-darkblue-850 hover:border-darkblue-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{step.iconText}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-gold-accent' : 'text-cream-400'
                }`}>
                  {step.badge}
                </span>
              </div>
              <h5 className="text-[11px] font-bold text-cream-100 truncate">
                {step.title}
              </h5>
            </button>
          );
        })}
      </div>

      {/* Active Concept Explanation Box */}
      <div className="mt-3 p-3 rounded-lg bg-darkblue-900/80 border border-darkblue-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-gold-accent flex-shrink-0 mt-0.5" />
        <div className="text-xs text-cream-200 leading-relaxed">
          <strong className="text-gold-accent">{educationalFlow[activeStep].title}: </strong>
          {educationalFlow[activeStep].description}
        </div>
      </div>
    </div>
  );
};
