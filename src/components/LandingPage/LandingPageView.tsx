import React, { useState } from 'react';
import { Role } from '../../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  QrCode, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  FlaskConical, 
  Scale, 
  Radio, 
  Award, 
  Users, 
  Globe2,
  Check,
  PlayCircle
} from 'lucide-react';

interface LandingPageViewProps {
  onNavigateRole: (role: Role) => void;
  onEnterJudgeDemo: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigateRole,
  onEnterJudgeDemo
}) => {
  const [activeStoryStage, setActiveStoryStage] = useState<number>(0);

  const storyStages = [
    {
      label: 'HIVE',
      icon: '🐝',
      title: 'Smart Hive H-017 In Dharmasagar Apiary',
      data: 'Sensors report: 34.2°C temperature, 61% humidity, 42.7 kg colony weight. Active Apis cerana indica colony with calm 220Hz queen acoustic frequency.'
    },
    {
      label: 'FLORAL SOURCE',
      icon: '🌸',
      title: 'Multiflora & Wild Neem (Azadirachta indica)',
      data: 'Bees forage across flowering wild neem and mustard blooms within 2.5km Warangal rural corridor. Zero chemical pesticide residues detected.'
    },
    {
      label: 'HARVEST',
      icon: '⚖',
      title: 'Cold Centrifugal Extraction (42.5 kg)',
      data: 'Harvested on 10 Sep 2026 by certified beekeeper Ravi Kumar. Raw, unheated centrifugal spinning preserves live antibacterial enzymes.'
    },
    {
      label: 'LAB TEST',
      icon: '🧪',
      title: 'NABL Certified Quality Analysis (#TC-7182)',
      data: 'Moisture: 17.2% (Standard <20%), HMF: 14.2 mg/kg (Standard <80mg/kg), Pollen Count: 38,500 grains/g. Certified FSSAI Grade A (PASS).'
    },
    {
      label: 'BLOCKCHAIN',
      icon: '⛓',
      title: 'Cryptographic SHA-256 Ledger Minting',
      data: 'Block #001 through #007 cryptographically chained using native Web Crypto SHA-256. Every timestamp and GPS custody handoff is tamper-evident.'
    },
    {
      label: 'PROCESSING',
      icon: '🏭',
      title: 'Pollen-Retaining 80 Micron Micro-Filtration',
      data: 'Processed at FPO facility at max 37.5°C unpasteurized temperature. Zero artificial corn/cane sugar syrups added.'
    },
    {
      label: 'PACKAGING',
      icon: '📦',
      title: 'Child Packaging Lots (PKG-TG-001 & 002)',
      data: 'Split into 100 jars of 250g and 30 jars of 500g with induction cap seal and unique serial numbering: JAR 001 - 130.'
    },
    {
      label: 'DISTRIBUTION',
      icon: '🚚',
      title: 'Cold-Chain Telemetry Logistics Fleet',
      data: 'Transported under controlled 24.1°C temperature from Warangal to KVIC Gramodyog retail distribution depot in Hyderabad.'
    },
    {
      label: 'QR / NFC',
      icon: '📱',
      title: 'Tamper-Evident Consumer Verification QR',
      data: 'Serialized dynamic QR code linking directly to public zero-login batch verification passport with anti-cloning multi-geo protection.'
    },
    {
      label: 'CONSUMER',
      icon: '👨👩👧',
      title: 'Complete Origin & Farmer Attribution',
      data: 'Consumer verifies pure unadulterated raw honey, meets farmer Ravi Kumar, and learns ₹62 of every ₹100 reached the rural producer directly.'
    }
  ];

  return (
    <div className="space-y-24 py-8">
      
      {/* HERO SECTION (Section 39) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center space-y-8">
        
        {/* Mission Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>NATIONAL DIGITAL INFRASTRUCTURE • KVIC HONEY MISSION</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            EVERY DROP HAS A <span className="honey-gradient-text">DIGITAL IDENTITY.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered smart beekeeping. IoT-driven hive telemetry. Blockchain-backed cryptographic provenance.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigateRole('BEEKEEPER')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>EXPLORE SMART HIVE</span>
          </button>

          <button
            onClick={() => onNavigateRole('CONSUMER')}
            className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>SCAN / VERIFY A BATCH</span>
          </button>

          <button
            onClick={onEnterJudgeDemo}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white font-black text-sm tracking-wide shadow-xl shadow-red-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-pulse"
          >
            <PlayCircle className="w-4 h-4" />
            <span>ENTER 14-STEP JUDGE DEMO</span>
          </button>
        </div>

        {/* Hero Visual Flow Animation (Hive -> Lab -> Blockchain -> QR -> Consumer) */}
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 items-center">
              
              <div className="text-center space-y-2 group cursor-pointer" onClick={() => onNavigateRole('BEEKEEPER')}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🐝
                </div>
                <div className="text-xs font-bold text-white">Smart Hive</div>
                <span className="text-[10px] text-amber-400 font-mono hidden sm:block">IoT Edge</span>
              </div>

              <div className="flex justify-center text-slate-600"><ChevronRight className="w-6 h-6 text-amber-500" /></div>

              <div className="text-center space-y-2 group cursor-pointer" onClick={() => onNavigateRole('LAB')}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🧪
                </div>
                <div className="text-xs font-bold text-white">NABL Lab</div>
                <span className="text-[10px] text-emerald-400 font-mono hidden sm:block">Scientific Test</span>
              </div>

              <div className="flex justify-center text-slate-600"><ChevronRight className="w-6 h-6 text-amber-500" /></div>

              <div className="text-center space-y-2 group cursor-pointer" onClick={() => onNavigateRole('CONSUMER')}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📱
                </div>
                <div className="text-xs font-bold text-white">Consumer QR</div>
                <span className="text-[10px] text-blue-400 font-mono hidden sm:block">Pure Honey</span>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* THREE STRONGEST CORE MESSAGES (Section 50) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-amber-400">PILLAR 01</div>
            <h3 className="text-xl font-black text-white">
              WE CAN SEE WHAT IS HAPPENING INSIDE THE HIVE.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time ESP32 edge telemetry measures temperature, moisture, load cell weight gain, and MEMS acoustic frequencies (220Hz queen hum vs 440Hz swarming).
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-emerald-400">PILLAR 02</div>
            <h3 className="text-xl font-black text-white">
              WE CAN TRACE WHAT HAPPENED TO THE HONEY.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A 7-block cryptographic SHA-256 ledger tracks centrifugal extraction, NABL lab screening, micro-filtering, packaging split, and cold logistics.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-blue-500/30 space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-blue-400">PILLAR 03</div>
            <h3 className="text-xl font-black text-white">
              THE CONSUMER CAN VERIFY THE COMPLETE STORY.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scanning the jar QR reveals the honey fingerprint passport, meet the beekeeper Ravi Kumar, and verifies zero adulteration with anti-cloning protection.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: "ONE BATCH — COMPLETE STORY" (Section 41) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
            INTERACTIVE LIFECYCLE EXPLORER
          </span>
          <h2 className="text-3xl font-black text-white">
            "One Batch — Complete Story"
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Click any of the 10 lifecycle stages below to reveal real telemetry and cryptographic evidence.
          </p>
        </div>

        {/* 10 Lifecycle Stages Pills */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {storyStages.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStoryStage(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeStoryStage === idx
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Data Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{storyStages[activeStoryStage].icon}</span>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                Stage {activeStoryStage + 1} of 10: {storyStages[activeStoryStage].label}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {storyStages[activeStoryStage].title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {storyStages[activeStoryStage].data}
          </p>
        </div>
      </section>

      {/* SECTION: THE TRUST STACK (Section 42) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
            FIVE-TIER TRUST FRAMEWORK
          </span>
          <h2 className="text-3xl font-black text-white">
            The Honey Trust Stack
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            A layered architectural pyramid replacing blind trust with verifiable evidence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          
          {/* Level 5 */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-blue-500/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500 text-black font-black flex items-center justify-center text-xs">L5</span>
              <div>
                <h4 className="text-sm font-bold text-white">Level 5: Consumer Public Access</h4>
                <p className="text-xs text-slate-400">Public zero-login QR / NFC scan, anti-clone verification, and direct farmer connection.</p>
              </div>
            </div>
            <span className="text-xs text-blue-400 font-mono font-bold">QR / Mobile</span>
          </div>

          {/* Level 4 */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-black flex items-center justify-center text-xs">L4</span>
              <div>
                <h4 className="text-sm font-bold text-white">Level 4: Cryptographic Digital Evidence</h4>
                <p className="text-xs text-slate-400">SHA-256 hash chaining, Ed25519 digital signatures, and automated tamper detection.</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">Blockchain</span>
          </div>

          {/* Level 3 */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-black flex items-center justify-center text-xs">L3</span>
              <div>
                <h4 className="text-sm font-bold text-white">Level 3: Colony Intelligence & Yield Modeling</h4>
                <p className="text-xs text-slate-400">Explainable AI multi-factor health reasoning, computer vision pest diagnostics, What-If yield forecasting.</p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">Explainable AI</span>
          </div>

          {/* Level 2 */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-black flex items-center justify-center text-xs">L2</span>
              <div>
                <h4 className="text-sm font-bold text-white">Level 2: Scientific & Laboratory Evidence</h4>
                <p className="text-xs text-slate-400">NABL laboratory testing, melissopalynology (pollen counts), moisture %, HMF analysis.</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">NABL Lab</span>
          </div>

          {/* Level 1 */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-amber-500/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-black font-black flex items-center justify-center text-xs">L1</span>
              <div>
                <h4 className="text-sm font-bold text-white">Level 1: Physical In-Hive Evidence</h4>
                <p className="text-xs text-slate-400">BME280 temperature & humidity, load cell weight gain, MEMS microphone audio spectrum.</p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">IoT Sensors</span>
          </div>

        </div>
      </section>

      {/* SECTION: WHY HONEY CHAIN? (Section 43) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
            TRANSFORMATION IMPACT
          </span>
          <h2 className="text-3xl font-black text-white">
            Why Honey Chain? Before vs After
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Before */}
          <div className="bg-red-950/20 p-6 rounded-3xl border border-red-500/30 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-black text-lg">
              <span>BEFORE HONEY CHAIN</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Fragmented, paper-based harvest logs easily falsified.</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Unknown origin: rampant adulteration with C4 corn/cane syrup.</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Manual hive inspections miss early swarming & pest stress.</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Delayed alerts cause colony collapse and loss of productive queen.</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Weak farmer bargaining: rural beekeepers receive &lt; 28% of retail value.</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Opaque supply chain: zero consumer trust in generic store labels.</li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-emerald-950/20 p-6 rounded-3xl border-2 border-emerald-500/50 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
              <span>AFTER HONEY CHAIN</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Digital hive identity: every comb extraction gets cryptographic GPS timestamp.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Traceable batch: NABL chemical fingerprint with pollen DNA passport.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> AI-assisted edge monitoring: continuous acoustics & thermal telemetry.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Early warning engine: instant field alerts before swarming loss.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Fair producer economy: 62% direct share + automated 3% secondary resale royalties.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Auditable SHA-256 ledger: QR verification with clone detection.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-12 pb-8 border-t border-slate-800">
        <h3 className="text-2xl font-black text-white">
          Ready to experience the future of Indian Beekeeping?
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Built for the KVIC Honey Mission innovation showcase.
        </p>
        <div className="pt-2">
          <button
            onClick={onEnterJudgeDemo}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-black font-black text-sm tracking-wide shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
          >
            🎬 LAUNCH GUIDED JUDGE DEMO MODE
          </button>
        </div>
      </section>

    </div>
  );
};
