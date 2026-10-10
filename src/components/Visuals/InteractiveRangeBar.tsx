import React from 'react';
import { RangeComparisonData } from '../../services/teacherCurriculum';
import { ShieldCheck, AlertCircle, ArrowDown } from 'lucide-react';

export interface InteractiveRangeBarProps {
  data: RangeComparisonData;
}

export const InteractiveRangeBar: React.FC<InteractiveRangeBarProps> = ({ data }) => {
  const {
    userValue,
    cutoffValue,
    cutoffLabel,
    isBelowCutoff,
    unit,
    minScale,
    maxScale,
    grayZoneMin,
    grayZoneMax,
    safeZoneLabel,
    reactiveZoneLabel,
    interpretationText
  } = data;

  // Calculate percentage positions along the scale (minScale to maxScale)
  const totalRange = maxScale - minScale;
  const userPercent = Math.min(Math.max(((userValue - minScale) / totalRange) * 100, 3), 97);
  const cutoffPercent = ((cutoffValue - minScale) / totalRange) * 100;
  const grayZoneStartPercent = grayZoneMin !== undefined ? ((grayZoneMin - minScale) / totalRange) * 100 : cutoffPercent;
  const grayZoneEndPercent = grayZoneMax !== undefined ? ((grayZoneMax - minScale) / totalRange) * 100 : cutoffPercent;

  return (
    <div className="w-full p-4 rounded-xl bg-darkblue-950/90 border border-darkblue-700/80 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream-100">
              Interactive Cutoff &amp; Range Bar
            </h4>
            <p className="text-[11px] text-cream-400">Visual comparison of your value against lab criteria</p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
          {userValue} {unit} (Observed)
        </div>
      </div>

      {/* Main Range Bar Graphic */}
      <div className="relative pt-8 pb-4">
        {/* Dynamic Needle Pointer above the bar */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out z-20"
          style={{ left: `${userPercent}%` }}
        >
          <div className="px-2 py-0.5 rounded bg-emerald-500 text-darkblue-950 text-[10px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
            <span>YOU: {userValue}</span>
          </div>
          <ArrowDown className="w-4 h-4 text-emerald-400 -mt-0.5 animate-bounce" />
        </div>

        {/* Multi-tier Gradient Bar */}
        <div className="relative w-full h-5 rounded-full overflow-hidden flex bg-darkblue-900 border border-darkblue-700 shadow-inner">
          {/* Safe / Non-Reactive Zone */}
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400"
            style={{ width: `${grayZoneStartPercent}%` }}
            title={`Safe / Non-Reactive Zone (< ${cutoffValue})`}
          />

          {/* Gray / Borderline Zone (if applicable) */}
          {grayZoneMin !== undefined && grayZoneMax !== undefined && (
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
              style={{ width: `${grayZoneEndPercent - grayZoneStartPercent}%` }}
              title={`Borderline / Equivocal Zone (${grayZoneMin} - ${grayZoneMax})`}
            />
          )}

          {/* Reactive / Elevated Zone */}
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-rose-700 flex-1"
            title={`Reactive Zone (>= ${grayZoneMax || cutoffValue})`}
          />
        </div>

        {/* Cutoff Threshold Divider Line */}
        <div
          className="absolute top-7 bottom-3 w-0.5 bg-cream-50 -translate-x-1/2 z-10 shadow-sm"
          style={{ left: `${cutoffPercent}%` }}
        >
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono font-bold text-cream-300">
            Cutoff: {cutoffValue}
          </div>
        </div>
      </div>

      {/* Range Labels Below */}
      <div className="flex items-center justify-between text-[11px] font-medium text-cream-300 mt-2 px-1">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{safeZoneLabel}</span>
        </div>

        {grayZoneMin !== undefined && (
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Borderline ({grayZoneMin}-{grayZoneMax})</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span>{reactiveZoneLabel}</span>
        </div>
      </div>

      {/* Plain Language Interpretation Pill */}
      <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-200 leading-relaxed">
          <strong className="text-emerald-300">Visual Summary: </strong>
          {interpretationText}
        </div>
      </div>
    </div>
  );
};
