import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Compass, 
  Sparkles, 
  Eye, 
  Layers,
  Crosshair,
  CheckCircle2
} from 'lucide-react';
import { TeacherStep } from '../services/teacherCurriculum';
import { OCRToken } from '../types/medscript';

export interface SynchronizedDocumentViewerProps {
  documentImageDataUrl: string;
  documentTitle: string;
  currentStep: TeacherStep;
  allSteps: TeacherStep[];
  onSelectStep: (stepIndex: number) => void;
  rawTokens?: OCRToken[];
}

export const SynchronizedDocumentViewer: React.FC<SynchronizedDocumentViewerProps> = ({
  documentImageDataUrl,
  documentTitle,
  currentStep,
  allSteps,
  onSelectStep,
  rawTokens = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoFollowTeacher, setAutoFollowTeacher] = useState<boolean>(true);
  const [showAllBBoxes, setShowAllBBoxes] = useState<boolean>(true);

  // Auto-scroll and center on the active teacher bounding box when step changes
  useEffect(() => {
    if (!autoFollowTeacher || !containerRef.current) return;

    const area = currentStep.documentArea;
    const container = containerRef.current;

    // Calculate target scroll position (percentage of container scroll height)
    const targetScrollY = (area.y / 100) * container.scrollHeight - (container.clientHeight / 2.5);
    const targetScrollX = (area.x / 100) * container.scrollWidth - (container.clientWidth / 2.5);

    container.scrollTo({
      top: Math.max(0, targetScrollY),
      left: Math.max(0, targetScrollX),
      behavior: 'smooth'
    });
  }, [currentStep, autoFollowTeacher]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const activeBox = currentStep.documentArea;

  return (
    <div className="relative flex flex-col w-full h-full bg-darkblue-950 rounded-2xl border border-darkblue-700/80 shadow-2xl overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-darkblue-900/90 border-b border-darkblue-700/70 z-20">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-cream-100 uppercase tracking-wider font-sans">
            Original Document View
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-full bg-darkblue-800 text-gold-accent border border-darkblue-700">
            Interactive Teacher Target
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1.5">
          {/* Auto-Follow Toggle */}
          <button
            onClick={() => setAutoFollowTeacher(prev => !prev)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-all ${
              autoFollowTeacher 
                ? 'bg-gold-500/20 text-gold-accent border border-gold-500/40' 
                : 'bg-darkblue-800 text-cream-400 hover:text-cream-100'
            }`}
            title="Auto-Follow Teacher: Automatically zooms and scrolls to the active section"
          >
            <Compass className="w-3 h-3" />
            <span className="hidden md:inline">Auto-Follow</span>
          </button>

          {/* Toggle All Boxes */}
          <button
            onClick={() => setShowAllBBoxes(prev => !prev)}
            className={`p-1.5 rounded text-xs transition-all ${
              showAllBBoxes 
                ? 'bg-darkblue-800 text-cream-100 border border-darkblue-700' 
                : 'text-cream-400 hover:text-cream-100'
            }`}
            title="Show All Recognized Document Fields"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-darkblue-800 rounded-lg p-0.5 border border-darkblue-700">
            <button
              onClick={handleZoomOut}
              className="p-1 text-cream-300 hover:text-cream-100 rounded transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-cream-200">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-cream-300 hover:text-cream-100 rounded transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 text-cream-300 hover:text-cream-100 rounded transition-all ml-0.5"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Viewport with Overlays */}
      <div 
        ref={containerRef}
        className="relative flex-1 w-full overflow-auto bg-[#0a0f20] p-4 sm:p-6 flex items-start justify-center cursor-default select-none scroll-smooth"
      >
        <div 
          className="relative transition-transform duration-300 ease-out origin-top shadow-2xl rounded-lg"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Document Image / SVG Renderer */}
          <img
            src={documentImageDataUrl}
            alt={documentTitle}
            className="max-w-[700px] w-full h-auto rounded-lg border border-darkblue-700/60 shadow-2xl block bg-white"
          />

          {/* Inactive Step Bounding Boxes (Clickable to jump teacher!) */}
          {showAllBBoxes && allSteps.map((step, idx) => {
            const isCurrent = step.id === currentStep.id;
            if (isCurrent) return null; // rendered with active spotlight below
            const box = step.documentArea;

            return (
              <div
                key={step.id}
                onClick={() => onSelectStep(idx)}
                className="absolute z-10 cursor-pointer rounded transition-all duration-200 border border-gold-500/20 bg-gold-500/5 hover:bg-gold-500/20 hover:border-gold-accent/60 group"
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`
                }}
              >
                {/* Subtle step chip on hover */}
                <div className="hidden group-hover:flex absolute -top-5 left-1 z-30 px-1.5 py-0.5 rounded bg-darkblue-950 text-gold-accent border border-gold-500/40 text-[9px] font-bold whitespace-nowrap shadow-lg">
                  Click to teach: Step {step.stepNumber}
                </div>
              </div>
            );
          })}

          {/* ACTIVE SPOTLIGHT BOUNDING BOX (Teacher is pointing here!) */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-400 ease-out"
            style={{
              left: `${activeBox.x}%`,
              top: `${activeBox.y}%`,
              width: `${activeBox.width}%`,
              height: `${activeBox.height}%`
            }}
          >
            {/* Glowing Border Spotlight */}
            <div className="absolute inset-0 rounded-md border-2 border-gold-accent bg-gold-500/15 spotlight-active" />

            {/* Corner Reticle Brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold-accent" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold-accent" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold-accent" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold-accent" />

            {/* Teacher Floating Pointer Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-darkblue-950 text-cream-50 border-2 border-gold-accent shadow-2xl whitespace-nowrap animate-bounce">
              <span className="text-xs">👇</span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-accent">
                Teacher pointing here
              </span>
            </div>

            {/* Extracted Value Floating Tag */}
            <div className="absolute -bottom-8 left-2 z-30 px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/60 shadow-xl text-[11px] font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentStep.highlightText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 py-2 bg-darkblue-900/90 border-t border-darkblue-700/60 flex items-center justify-between text-xs text-cream-300">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-gold-accent" />
          <span>Active Target:</span>
          <strong className="text-cream-100">{currentStep.title}</strong>
        </div>
        <div className="text-[11px] text-cream-400">
          Click any section on the document to teach that part
        </div>
      </div>
    </div>
  );
};
