import React, { useState } from 'react';
import { Hive, AIHealthFactor, AIDiseasePrediction } from '../../types';
import { 
  Sparkles, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Sliders, 
  Calendar, 
  Bug, 
  ShieldAlert, 
  UserCheck, 
  Activity, 
  Info, 
  Thermometer, 
  Droplets, 
  Eye
} from 'lucide-react';

interface AIEngineViewProps {
  hive: Hive;
  onAssignOfficer: (officerName: string) => void;
  onCreateAlert: (title: string, severity: 'Critical' | 'Warning' | 'Notice') => void;
}

export const AIEngineView: React.FC<AIEngineViewProps> = ({
  hive,
  onAssignOfficer,
  onCreateAlert
}) => {
  // Tabs within AI View
  const [activeTab, setActiveTab] = useState<'HEALTH' | 'DISEASE' | 'FORECAST'>('HEALTH');

  // Disease sample selector
  const [selectedSample, setSelectedSample] = useState<number>(1);
  const [diseaseState, setDiseaseState] = useState<AIDiseasePrediction>({
    id: 'DISEASE-PRED-001',
    issue: 'Varroa Destructor Infestation Risk',
    confidence: 78,
    evidence: [
      'Visual phoretic mites spotted on worker bee thoraces (sample image)',
      'Subtle brood uncapping pattern with chewed pupal remnants',
      'In-hive entrance vibration anomaly correlated with grooming stress'
    ],
    recommendedAction: 'Apply oxalic acid sublimation or thymol vapor strips. Inspect bottom board sticky paper within 24h.',
    status: 'Pending',
    timestamp: '2026-09-16T14:30:00Z'
  });

  // What-If Simulator state
  const [simTemp, setSimTemp] = useState<number>(34);
  const [simRainfall, setSimRainfall] = useState<number>(12);
  const [simFloralDensity, setSimFloralDensity] = useState<number>(85);
  const [simColonyHealth, setSimColonyHealth] = useState<number>(hive.healthScore);

  // Dynamic Yield Calculation based on What-If Sliders
  const calculateDynamicYield = (days: number) => {
    const base = hive.expectedYieldKg;
    const tempFactor = (simTemp >= 30 && simTemp <= 36) ? 1.05 : 0.88;
    const rainFactor = simRainfall > 40 ? 0.85 : 1.02;
    const floraFactor = simFloralDensity / 80;
    const healthFactor = simColonyHealth / 85;

    const rate = (days / 21) * 4.8 * tempFactor * rainFactor * floraFactor * healthFactor;
    return +(base + rate).toFixed(1);
  };

  const yield7 = calculateDynamicYield(7);
  const yield14 = calculateDynamicYield(14);
  const yield21 = calculateDynamicYield(21);

  // Health Factors Breakdown
  const healthFactors: AIHealthFactor[] = [
    {
      name: 'Brood Temperature Stability (34.2°C)',
      impact: hive.sensors.temperature >= 33.5 && hive.sensors.temperature <= 35.5 ? 18 : -12,
      status: hive.sensors.temperature >= 33.5 && hive.sensors.temperature <= 35.5 ? 'positive' : 'critical',
      detail: 'Optimal internal nest thermal regulation maintained by nurse bees.'
    },
    {
      name: 'Brood Chamber Relative Humidity (61%)',
      impact: 12,
      status: 'positive',
      detail: 'Within 55-65% safe moisture band; minimizes fungal ascosphera development.'
    },
    {
      name: 'Nectar Flow Weight Accumulation (+0.4kg/day)',
      impact: 20,
      status: 'positive',
      detail: 'Consistent daily mass increase indicating active foraging corridor.'
    },
    {
      name: 'Acoustic Frequency Rhythm (220 Hz)',
      impact: hive.sensors.acousticFreqHz > 350 ? -14 : 16,
      status: hive.sensors.acousticFreqHz > 350 ? 'critical' : 'positive',
      detail: hive.sensors.acousticFreqHz > 350 
        ? 'High frequency swarming harmonics detected (440Hz)' 
        : 'Steady queen retention tone with regular worker fanning.'
    },
    {
      name: 'Recent Telemetry Variance & Flight Anomaly',
      impact: -4,
      status: 'warning',
      detail: 'Minor rain shower caused 2-hour foraging pause yesterday.'
    }
  ];

  const diseaseSamples = [
    {
      id: 1,
      name: 'Brood Comb - Varroa Mites Detected',
      issue: 'Varroa Destructor Infestation Risk',
      confidence: 78,
      riskLevel: 'High',
      recommendation: 'Apply oxalic acid sublimation or thymol vapor strips. Inspect bottom board sticky paper within 24h.'
    },
    {
      id: 2,
      name: 'Wax Moth Comb Webbing',
      issue: 'Galleria Mellonella (Wax Moth) Intrusion',
      confidence: 84,
      riskLevel: 'Moderate',
      recommendation: 'Freeze damaged frames for 48h to eliminate larvae; narrow entrance to aid guard bees.'
    },
    {
      id: 3,
      name: 'Healthy Capped Worker Brood',
      issue: 'Normal Healthy Comb Structure',
      confidence: 96,
      riskLevel: 'None',
      recommendation: 'Brood pattern is dense and concentric with glistening larvae. No intervention required.'
    }
  ];

  const handleSelectSample = (sample: typeof diseaseSamples[0]) => {
    setSelectedSample(sample.id);
    setDiseaseState({
      ...diseaseState,
      issue: sample.issue,
      confidence: sample.confidence,
      recommendedAction: sample.recommendation,
      status: 'Pending'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white flex items-center gap-3">
              Explainable AI Colony Intelligence Engine
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                PROTOTYPE DECISION-SUPPORT
              </span>
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Multi-modal sensor reasoning, computer vision pest diagnostics, and dynamic yield forecasting.
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('HEALTH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'HEALTH'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Colony Health
          </button>
          <button
            onClick={() => setActiveTab('DISEASE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'DISEASE'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pest & Disease Vision
          </button>
          <button
            onClick={() => setActiveTab('FORECAST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'FORECAST'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Yield Forecast & What-If
          </button>
        </div>
      </div>

      {/* Scientific Responsibility Callout Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>
          <strong>SCIENTIFIC HONESTY PROTOCOL:</strong> AI models generate risk signals and decision-support guidance for beekeepers. 
          They are not definitive veterinary or laboratory certifications and always require field validation.
        </span>
      </div>

      {/* TAB 1: EXPLAINABLE COLONY HEALTH */}
      {activeTab === 'HEALTH' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Health Score Overview (5 cols) */}
          <div className="lg:col-span-5 glass-panel-glow rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Multi-Factor Explainable AI Score
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className={`text-6xl font-black font-mono ${
                  hive.healthScore > 80 ? 'text-emerald-400' : hive.healthScore > 65 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {hive.healthScore}
                </span>
                <span className="text-2xl text-slate-500 font-normal">/ 100</span>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>AI Interpretation for {hive.code}:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {hive.healthScore > 80
                    ? 'Colony appears robust and stable. Weight trajectory confirms continuous nectar gathering. Brood nest thermal gradients show active queen laying.'
                    : 'Colony exhibiting thermal or acoustic stress indicators. Higher worker activity without proportional weight gain suggests potential nectar dearth or robber bees.'}
                </p>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <div className="font-bold text-amber-300">Recommended Next Action:</div>
                <p className="text-slate-300 text-[11px]">
                  {hive.healthScore > 80 
                    ? 'Monitor weight plateau over the next 4 days. Prepare clean supers for centrifugal extraction.'
                    : 'Schedule manual visual inspection of brood comb within 24 hours. Check queen health and mite count.'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Sensor Fusion: 5 Data Streams</span>
              <span className="text-emerald-400 font-mono font-bold">Confidence: 94.2%</span>
            </div>
          </div>

          {/* Contributing Factors Breakdown (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Factor Contribution Breakdown</span>
              <span className="text-xs font-mono font-normal text-slate-400">(Why is the score {hive.healthScore}?)</span>
            </h3>

            <div className="space-y-3">
              {healthFactors.map((factor, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{factor.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {factor.detail}
                    </p>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap ${
                    factor.impact > 0 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {factor.impact > 0 ? `+${factor.impact}` : factor.impact}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>Sum of Positive Factors: +66</span>
              <span className="text-red-400">Penalties / Anomalies: -4</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: AI DISEASE & PEST VISION DIAGNOSTICS */}
      {activeTab === 'DISEASE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sample Comb Image Selection & Inspector (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Inspection Image Analysis</span>
            </h3>

            {/* Selectable Samples */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400">Select comb inspection sample photo:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {diseaseSamples.map(sample => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all ${
                      selectedSample === sample.id
                        ? 'bg-amber-500/20 border-2 border-amber-500 text-white font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold truncate">{sample.name}</div>
                    <div className="text-[10px] text-amber-400 mt-1">{sample.riskLevel} Risk</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Comb Image with Vision Bounding Boxes */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
              <div className="w-full h-full bg-gradient-to-br from-amber-950/40 via-slate-900 to-amber-900/30 rounded-lg flex flex-col items-center justify-center relative p-6 text-center">
                <span className="text-6xl mb-2">
                  {selectedSample === 1 ? '🪲' : selectedSample === 2 ? '🐛' : '🐝'}
                </span>
                <span className="text-sm font-bold text-white">
                  {diseaseSamples.find(s => s.id === selectedSample)?.name}
                </span>
                <span className="text-xs text-slate-400 mt-1 font-mono">
                  Resolution: 1920x1080 • Macro Lens • Field Camera
                </span>

                {/* Simulated Bounding Boxes for Sample 1 & 2 */}
                {selectedSample === 1 && (
                  <div className="absolute top-1/4 left-1/3 border-2 border-red-500 bg-red-500/10 p-1 rounded text-[9px] font-mono text-red-300 font-bold animate-pulse">
                    Varroa [0.81]
                  </div>
                )}
                {selectedSample === 2 && (
                  <div className="absolute bottom-1/3 right-1/4 border-2 border-amber-500 bg-amber-500/10 p-1 rounded text-[9px] font-mono text-amber-300 font-bold animate-pulse">
                    WaxMoth_Silk [0.89]
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Custom Hive Frame Image</span>
              </button>
            </div>
          </div>

          {/* Model Inference Results & Actions (6 cols) */}
          <div className="lg:col-span-6 glass-panel-glow rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Demo Inference Output
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Model: YOLOv8-BeeGuard-Demo
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400">Classified Issue:</span>
                <div className="text-xl font-black text-white mt-0.5">
                  {diseaseState.issue}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Confidence Level</div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                    {diseaseState.confidence}%
                  </div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Risk Classification</div>
                  <div className={`text-2xl font-black font-mono mt-0.5 ${
                    diseaseState.confidence > 75 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {diseaseState.confidence > 75 ? 'ACTION REQ' : 'NORMAL'}
                  </div>
                </div>
              </div>

              {/* Supporting Evidence */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Supporting Multi-Modal Evidence:</span>
                <ul className="space-y-1">
                  {diseaseState.evidence.map((ev, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Protocol */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <span className="font-bold text-amber-300 block mb-1">Recommended Beekeeper Guidance:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {diseaseState.recommendedAction}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => onCreateAlert(`Pest Detection: ${diseaseState.issue} on ${hive.code}`, 'Critical')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>CREATE CLUSTER ALERT</span>
              </button>

              <button
                onClick={() => onAssignOfficer('Officer Ramesh K.')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>ASSIGN FIELD OFFICER</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: AI YIELD FORECAST & WHAT-IF SIMULATOR */}
      {activeTab === 'FORECAST' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Yield Forecast Cards (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Predictive Harvest Planner
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Honey Production & Yield Forecast
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">CURRENT HIVE YIELD</span>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {hive.expectedYieldKg} kg
                </div>
              </div>
            </div>

            {/* 3 Forecast Horizon Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-mono">7 Days</div>
                <div className="text-2xl font-black text-white mt-1 font-mono">{yield7} kg</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">+{(yield7 - hive.expectedYieldKg).toFixed(1)} kg</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/40 text-center shadow-lg shadow-amber-500/10">
                <div className="text-xs text-amber-300 font-mono font-bold">14 Days</div>
                <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{yield14} kg</div>
                <div className="text-[10px] text-amber-300 font-mono mt-1">+{(yield14 - hive.expectedYieldKg).toFixed(1)} kg</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-mono">21 Days</div>
                <div className="text-2xl font-black text-white mt-1 font-mono">{yield21} kg</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">+{(yield21 - hive.expectedYieldKg).toFixed(1)} kg</div>
              </div>
            </div>

            {/* Smart Harvest Window Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>RECOMMENDED SMART HARVEST WINDOW:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-extrabold text-[10px]">
                    18–22 SEPTEMBER 2026
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Based on weight accumulation flattening (plateauing at ~21 kg) and high nectar hydration reduction, 
                  the honey moisture is forecasted to reach optimal 17.0–17.4% during this 4-day window.
                </p>
              </div>
            </div>

            {/* Environmental Factors Pill Row */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temp: 34°C</span>
              <span className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-blue-400" /> Humidity: 61%</span>
              <span className="flex items-center gap-1.5">🌸 Foraging: High Neem Bloom</span>
              <span className="flex items-center gap-1.5">⚖ Accumulation: +400g/day</span>
            </div>
          </div>

          {/* WHAT-IF SIMULATOR (5 cols) */}
          <div className="lg:col-span-5 glass-panel-glow rounded-2xl p-6 border border-amber-500/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Interactive What-If Simulator
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Live Recalculation</span>
            </div>

            <p className="text-xs text-slate-300">
              Adjust external environmental variables to simulate yield sensitivity and harvest timeline shifts:
            </p>

            {/* Slider 1: Temperature */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Ambient Temperature</span>
                <span className="font-mono text-amber-400 font-bold">{simTemp}°C</span>
              </div>
              <input 
                type="range" 
                min={20} 
                max={44} 
                value={simTemp}
                onChange={(e) => setSimTemp(+e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Cool (20°C)</span>
                <span>Optimal (34°C)</span>
                <span>Heatwave (44°C)</span>
              </div>
            </div>

            {/* Slider 2: Rainfall */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Local Precipitation (Rainfall)</span>
                <span className="font-mono text-blue-400 font-bold">{simRainfall} mm</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={80} 
                value={simRainfall}
                onChange={(e) => setSimRainfall(+e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Dry (0mm)</span>
                <span>Moderate (15mm)</span>
                <span>Storm (80mm)</span>
              </div>
            </div>

            {/* Slider 3: Floral Density */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Surrounding Floral Density</span>
                <span className="font-mono text-emerald-400 font-bold">{simFloralDensity}%</span>
              </div>
              <input 
                type="range" 
                min={20} 
                max={100} 
                value={simFloralDensity}
                onChange={(e) => setSimFloralDensity(+e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Dearth (20%)</span>
                <span>Abundant (100%)</span>
              </div>
            </div>

            {/* Slider 4: Colony Health */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Colony Health Index</span>
                <span className="font-mono text-amber-400 font-bold">{simColonyHealth}%</span>
              </div>
              <input 
                type="range" 
                min={40} 
                max={100} 
                value={simColonyHealth}
                onChange={(e) => setSimColonyHealth(+e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Recalculated Summary Output */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px]">Simulated 14-Day Yield:</span>
                <span className="text-xl font-bold text-white font-mono">{yield14} kg</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Sensitivity Delta:</span>
                <span className={`text-sm font-bold font-mono ${
                  yield14 >= hive.expectedYieldKg ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {yield14 >= hive.expectedYieldKg ? `+${(yield14 - hive.expectedYieldKg).toFixed(1)} kg` : `${(yield14 - hive.expectedYieldKg).toFixed(1)} kg`}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
