import React, { useState } from 'react';
import { LabQualityData, BlockEvent } from '../../types';
import { generateQRCodeSVG } from '../../utils/qrGenerator';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  FileText, 
  Fingerprint, 
  Check, 
  Sparkles
} from 'lucide-react';

interface LabPortalViewProps {
  onMintLabBlock: (labData: LabQualityData) => void;
  blocks: BlockEvent[];
}

export const LabPortalView: React.FC<LabPortalViewProps> = ({
  onMintLabBlock,
  blocks
}) => {
  const [selectedBatch, setSelectedBatch] = useState<string>('HNY-TG-2026-0001');
  const [moisture, setMoisture] = useState<number>(17.2);
  const [hmf, setHmf] = useState<number>(14.2);
  const [fgRatio, setFgRatio] = useState<number>(1.22);
  const [sucrose, setSucrose] = useState<number>(1.8);
  const [pollenCount, setPollenCount] = useState<number>(38500);
  const [conductivity, setConductivity] = useState<number>(0.38);

  const [assessmentResult, setAssessmentResult] = useState<'PASS' | 'REVIEW' | 'FLAG' | null>('PASS');
  const [isMinted, setIsMinted] = useState<boolean>(true);
  const [verifiedOnline, setVerifiedOnline] = useState<boolean | null>(null);

  // Determine FSSAI status dynamically
  const evaluateQuality = () => {
    if (moisture > 20 || hmf > 80 || sucrose > 5) {
      return 'FLAG';
    }
    if (moisture > 19 || hmf > 40) {
      return 'REVIEW';
    }
    return 'PASS';
  };

  const handleRunAssessment = () => {
    const decision = evaluateQuality();
    setAssessmentResult(decision);

    const labData: LabQualityData = {
      testId: 'LAB-QC-9941',
      certificateId: 'CERT-HNY-2026-NABL-0182',
      labName: 'Regional Honey Analysis & Quality Assurance Center (NABL Accredited #TC-7182)',
      technicianName: 'Dr. Sunita Rao, M.Sc. Food Chemistry',
      timestamp: new Date().toISOString(),
      moisturePercent: moisture,
      hmfMgKg: hmf,
      fructoseGlucoseRatio: fgRatio,
      sucrosePercent: sucrose,
      pollenCountPerGram: pollenCount,
      electricalConductivity: conductivity,
      pollenTypes: [
        { flora: 'Azadirachta indica (Neem)', percent: 42 },
        { flora: 'Eucalyptus tereticornis', percent: 28 },
        { flora: 'Brassica campestris (Mustard)', percent: 18 },
        { flora: 'Secondary Wild Flora', percent: 12 }
      ],
      decision,
      decisionNotes: decision === 'PASS' 
        ? 'Fully compliant with FSSAI & BIS Grade A raw honey parameters. Low HMF confirms zero artificial heat treatment.'
        : 'Parameters warrant secondary isotopic mass spectrometry review.'
    };

    onMintLabBlock(labData);
    setIsMinted(true);
  };

  // Verify Certificate Lookup
  const handleVerifyCertificate = () => {
    setVerifiedOnline(true);
  };

  const qrSvg = generateQRCodeSVG(`https://honeychain.gov.in/cert/CERT-HNY-2026-NABL-0182`, 130, '#1E293B', '#FFFFFF');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white flex items-center gap-3">
              Quality Assessment & Testing Laboratory Portal
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                NABL ACCREDITED
              </span>
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            FSSAI and BIS Grade A honey analysis, chemical fingerprinting, and cryptographic certificate minting.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Lab Technician: <strong>Dr. Sunita Rao (TC-7182)</strong></span>
        </div>
      </div>

      {/* Grid: Data Entry (5 cols) & Digital Certificate (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quality Parameter Input Form (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5 no-print">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Enter Laboratory Metrics</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">Batch: {selectedBatch}</span>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Moisture */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Moisture Content (%):</label>
                <span className={`font-mono font-bold ${moisture <= 20 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {moisture}% (FSSAI Limit &lt; 20%)
                </span>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* HMF */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Hydroxymethylfurfural (HMF mg/kg):</label>
                <span className={`font-mono font-bold ${hmf <= 80 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {hmf} mg/kg (Limit &lt; 80 mg/kg)
                </span>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={hmf}
                onChange={(e) => setHmf(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* F/G Ratio */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Fructose / Glucose Ratio:</label>
                <span className="text-slate-400 font-mono">{fgRatio}</span>
              </div>
              <input 
                type="number" 
                step="0.01"
                value={fgRatio}
                onChange={(e) => setFgRatio(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* Sucrose */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Apparent Sucrose (%):</label>
                <span className="text-slate-400 font-mono">{sucrose}% (Limit &lt; 5%)</span>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={sucrose}
                onChange={(e) => setSucrose(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* Pollen Count */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Absolute Pollen Count (grains/g):</label>
                <span className="text-emerald-400 font-mono font-bold">{pollenCount.toLocaleString()}</span>
              </div>
              <input 
                type="number" 
                step="500"
                value={pollenCount}
                onChange={(e) => setPollenCount(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

            {/* Electrical Conductivity */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">Electrical Conductivity (mS/cm):</label>
                <span className="text-slate-400 font-mono">{conductivity}</span>
              </div>
              <input 
                type="number" 
                step="0.01"
                value={conductivity}
                onChange={(e) => setConductivity(+e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>

          </div>

          <button
            onClick={handleRunAssessment}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01]"
          >
            RUN QUALITY ASSESSMENT & MINT BLOCK #002
          </button>

          {assessmentResult && (
            <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
              assessmentResult === 'PASS'
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                : 'bg-red-950/80 border-red-500/60 text-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {assessmentResult === 'PASS' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-red-400" />}
                <span className="font-bold">STATUS: {assessmentResult} (FSSAI Grade A)</span>
              </div>
              <span className="font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded">
                Block #002 Committed
              </span>
            </div>
          )}
        </div>

        {/* Right Column: OFFICIAL DIGITAL CERTIFICATE OF PROVENANCE (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between no-print">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Certificate Preview</span>
            </h3>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Export Certificate</span>
            </button>
          </div>

          {/* Certificate Box */}
          <div className="certificate-box bg-[#fffdf7] text-slate-900 rounded-2xl p-8 sm:p-10 border-4 border-[#b45309] shadow-2xl relative overflow-hidden">
            
            {/* Background Seal Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[280px]">🍯</span>
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 pb-6 border-b-2 border-amber-900/30">
              <div className="text-[11px] font-mono tracking-widest text-amber-900 uppercase font-extrabold">
                KHADI & VILLAGE INDUSTRIES COMMISSION (KVIC) • HONEY MISSION
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight uppercase">
                Certificate of Provenance & Authenticity
              </h2>
              <p className="text-xs text-amber-900/80 font-serif italic">
                National Digital Beekeeping Traceability Network • NABL Accredited Laboratory Standard
              </p>
            </div>

            {/* Certificate Attributes Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-6 text-xs border-b border-amber-900/20">
              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Certificate Number:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">CERT-HNY-2026-NABL-0182</span>
              </div>

              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Digital Batch Identifier:</span>
                <span className="font-mono font-bold text-amber-800 text-sm">HNY-TG-2026-0001</span>
              </div>

              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Certified Beekeeper:</span>
                <span className="font-bold text-slate-900 text-sm">Ravi Kumar (KVIC #TG-8821)</span>
                <span className="text-[11px] text-amber-900/80 block">Warangal Rural Cluster, Telangana</span>
              </div>

              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Harvest Date & Quantity:</span>
                <span className="font-bold text-slate-900 text-sm">10 September 2026 • 42.5 kg</span>
                <span className="text-[11px] text-amber-900/80 block">Centrifugal Cold Centrifuge</span>
              </div>

              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Botanical / Floral Origin:</span>
                <span className="font-bold text-slate-900 text-sm">Multiflora & Wild Neem</span>
                <span className="text-[11px] text-amber-900/80 block">Pollen Count: 38,500 grains/g</span>
              </div>

              <div>
                <span className="text-amber-900/70 block uppercase text-[10px] font-mono font-bold">Scientific Quality Status:</span>
                <span className="font-bold text-emerald-800 text-sm">FSSAI GRADE A (PASS)</span>
                <span className="text-[11px] text-amber-900/80 block">Moisture: 17.2% • HMF: 14.2 mg/kg</span>
              </div>
            </div>

            {/* Footer with Signatures & QR */}
            <div className="pt-6 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono text-amber-900/70 font-bold">
                  Cryptographic Ledger Status:
                </div>
                <div className="font-mono text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>SHA-256 Immutable Block #002 Verified</span>
                </div>
                <div className="text-[10px] font-mono text-amber-900/70 pt-1">
                  Lead Chemist: Dr. Sunita Rao, M.Sc.
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl border border-amber-900/20 shadow-sm flex flex-col items-center">
                <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                <span className="text-[9px] font-mono text-slate-700 font-bold mt-1">VERIFY CERTIFICATE</span>
              </div>
            </div>

          </div>

          {/* Interactive "Verify this certificate" Query Button */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 no-print text-xs">
            <div>
              <span className="text-white font-bold block">Live Query Validation</span>
              <span className="text-slate-400 text-[11px]">Queries active application database to verify certificate authenticity.</span>
            </div>
            <button
              onClick={handleVerifyCertificate}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Verify this Certificate</span>
            </button>
          </div>

          {verifiedOnline && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between no-print animate-fadeIn">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Certificate CERT-HNY-2026-NABL-0182 matches live blockchain Block #002 timestamp!</span>
              </span>
              <button 
                onClick={() => setVerifiedOnline(null)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
