import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Smartphone, 
  Globe, 
  Code, 
  Check, 
  Copy, 
  ExternalLink,
  ArrowUp
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const apiEndpoints = [
    {
      name: 'IoT Hive Telemetry Ingestion API',
      endpoint: 'POST /api/v1/iot/telemetry',
      method: 'POST',
      desc: 'Receives periodic edge payload from ESP32 gateway: temperature, humidity, load cell weight, and MEMS acoustic FFT frequency.',
      payload: {
        hive_code: 'HIVE-TG-017',
        sensor_token: 'ed25519_esp32_hw_token_98fa',
        temp_c: 34.2,
        hum_pct: 61.0,
        weight_kg: 42.7,
        acoustic_peak_hz: 220,
        vibration_hz: 18.5
      }
    },
    {
      name: 'Blockchain Block Minting API',
      endpoint: 'POST /api/v1/ledger/mint-event',
      method: 'POST',
      desc: 'Appends a SHA-256 chained lifecycle block with Ed25519 cryptographic signature and verifiable actor credentials.',
      payload: {
        batch_id: 'HNY-TG-2026-0001',
        event_type: 'LAB_TEST',
        actor_id: 'NABL_LAB_TC7182',
        prev_hash: 'c8f18d7b329471ea87d10b991823aef01c3894b9102934ef018274a108234910',
        test_data: {
          moisture: 17.2,
          hmf_mg_kg: 14.2,
          decision: 'PASS'
        }
      }
    },
    {
      name: 'Consumer QR Verification API',
      endpoint: 'GET /api/v1/verify/HNY-TG-2026-0001',
      method: 'GET',
      desc: 'Public zero-auth endpoint for retail consumers scanning jar QR codes. Returns verified 7-stage provenance and honey DNA fingerprint.',
      payload: {
        status: 'VERIFIED_TRACEABLE_BATCH',
        confidence_pct: 98.5,
        producer: 'Ravi Kumar (KVIC #TG-8821)',
        harvest_date: '2026-09-10',
        lab_certified: true,
        ledger_blocks_verified: 7
      }
    },
    {
      name: 'AI Colony Health Inference API',
      endpoint: 'POST /api/v1/ai/colony-health',
      method: 'POST',
      desc: 'Multi-modal covariance engine that calculates explainable colony health scores and flags pre-swarming or pest risk signals.',
      payload: {
        hive_code: 'HIVE-TG-017',
        time_window_hours: 24,
        include_factor_breakdown: true
      }
    }
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Network className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white flex items-center gap-3">
              Honey Chain Digital Architecture & Ecosystem APIs
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            End-to-end technical topology: Physical Edge IoT $\rightarrow$ Explainable AI $\rightarrow$ SHA-256 Ledger $\rightarrow$ Consumer QR.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          Architecture: <strong className="text-amber-400">National-Ready Modular Topology</strong>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE DIAGRAM (Section 35) */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>MULTI-TIER PLATFORM TOPOLOGY</span>
          </h2>
          <span className="text-xs font-mono text-amber-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            6-Tier Pipeline Flow
          </span>
        </div>

        {/* 6-Tier Pipeline Cards */}
        <div className="space-y-4">
          
          {/* Tier 6: Consumer Layer */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-amber-500/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-amber-500 text-black px-2.5 py-1 rounded-lg">TIER 6</span>
              <div>
                <h3 className="text-base font-bold text-white">Public Consumer & Market Access Layer</h3>
                <p className="text-xs text-slate-400">Mobile PWA Web App • Scannable SVG/Canvas QR Codes • Anti-Cloning Multi-Geo Scan Telemetry</p>
              </div>
            </div>
            <div className="text-xs text-amber-300 font-mono">Zero-Login Instant Scan</div>
          </div>

          <div className="flex justify-center"><ArrowUp className="w-5 h-5 text-amber-400" /></div>

          {/* Tier 5: Packaging & Product Layer */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">TIER 5</span>
              <div>
                <h3 className="text-base font-bold text-white">Packaging & Digital Identity Assignment</h3>
                <p className="text-xs text-slate-400">Batch Split/Merge Genealogy (PKG-001/002) • Unique Jar Serial Serialization • Induction Cap Holographic Seals</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono">Child Batch Tracking</div>
          </div>

          <div className="flex justify-center"><ArrowUp className="w-5 h-5 text-amber-400" /></div>

          {/* Tier 4: Cryptographic Blockchain Ledger */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-emerald-500/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-emerald-500 text-black px-2.5 py-1 rounded-lg">TIER 4</span>
              <div>
                <h3 className="text-base font-bold text-white">Cryptographic Blockchain Ledger (SHA-256)</h3>
                <p className="text-xs text-slate-400">7-Block Tamper-Evident Hash Chaining • Ed25519 Signatures • Extensible to Hyperledger Fabric / Polygon EVM</p>
              </div>
            </div>
            <div className="text-xs text-emerald-300 font-mono">Automated Tamper Detection</div>
          </div>

          <div className="flex justify-center"><ArrowUp className="w-5 h-5 text-amber-400" /></div>

          {/* Tier 3: Scientific Testing & Processing */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">TIER 3</span>
              <div>
                <h3 className="text-base font-bold text-white">Scientific Lab & FPO Processing Center</h3>
                <p className="text-xs text-slate-400">NABL Quality Assessment • FSSAI Moisture/HMF Screening • 80μm Micro-Filtration Cold Settling</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono">Digital Honey Certificate</div>
          </div>

          <div className="flex justify-center"><ArrowUp className="w-5 h-5 text-amber-400" /></div>

          {/* Tier 2: AI Colony Intelligence */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">TIER 2</span>
              <div>
                <h3 className="text-base font-bold text-white">Explainable AI & Bio-Acoustic Intelligence</h3>
                <p className="text-xs text-slate-400">Multi-Sensor Covariance Health Modeling • Audio Spectrogram FFT • Computer Vision Comb Pest Diagnostics</p>
              </div>
            </div>
            <div className="text-xs text-amber-400 font-mono">What-If Yield Simulator</div>
          </div>

          <div className="flex justify-center"><ArrowUp className="w-5 h-5 text-amber-400" /></div>

          {/* Tier 1: Physical Edge IoT */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-amber-500/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-amber-500 text-black px-2.5 py-1 rounded-lg">TIER 1</span>
              <div>
                <h3 className="text-base font-bold text-white">Smart Hive Physical Edge IoT Hardware</h3>
                <p className="text-xs text-slate-400">BME280 (Temp/Hum) • HX711 (Load Cell Weight) • INMP441 (MEMS Mic) • ESP32 MQTT Wireless Edge Gateway</p>
              </div>
            </div>
            <div className="text-xs text-amber-300 font-mono">Software Hardware Simulator</div>
          </div>

        </div>
      </div>

      {/* DIGITAL API / INTEGRATION ARCHITECTURE (Section 30) */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Integration Ready: Digital OpenAPI Specification Cards
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Production-ready REST & MQTT contracts for government databases (KVIC, FSSAI), IoT gateways, and UPI payment escrows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {apiEndpoints.map((api, idx) => (
            <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{api.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  api.method === 'POST' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {api.method}
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-850 truncate">
                {api.endpoint}
              </div>

              <p className="text-[11px] text-slate-300">
                {api.desc}
              </p>

              <div className="relative">
                <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto">
                  {JSON.stringify(api.payload, null, 2)}
                </pre>
                <button
                  onClick={() => handleCopy(JSON.stringify(api.payload, null, 2), idx)}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  title="Copy Payload"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
