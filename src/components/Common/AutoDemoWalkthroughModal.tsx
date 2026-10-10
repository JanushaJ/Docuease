import React, { useState, useEffect } from 'react';
import {
  MascotSprout,
  CartoonApple,
  CartoonBread,
  CartoonDeliveryVan,
  CartoonVolunteers,
} from './CartoonIllustrations';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  MapPin,
  Utensils,
  HeartHandshake,
  Navigation,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AutoDemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToFlow: (flow: 'login' | 'donor' | 'receiver' | 'tracking') => void;
}

export const AutoDemoWalkthroughModal: React.FC<AutoDemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onJumpToFlow,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const demoSteps = [
    {
      id: 'step-login',
      flowKey: 'login' as const,
      timestamp: '00:00 - 00:15',
      title: 'Step 1: Clean Login & Two Clear Options',
      subtitle: 'Donor Kitchen vs. Receiver Charity',
      color: 'purple',
      badge: '🔐 ENTRY POINT',
      description:
        'The application opens with a neat, cheerful login screen. The user is presented with two distinct paths: 🍲 Enter as Food Donor (Kitchen / Restaurant) or 🤝 Enter as Food Receiver (Charity / Shelter).',
      mascotComment:
        '“Welcome! Select whether you are donating prepared meals or picking them up for your charity!”',
      previewDetails: {
        donorProfile: 'Chef Vikram Rao (Annapurna Grand Kitchen, Hyderabad)',
        receiverProfile: 'Priya Sharma (Robin Hood Army & Shelter Care, Secunderabad)',
      },
    },
    {
      id: 'step-donor',
      flowKey: 'donor' as const,
      timestamp: '00:16 - 00:35',
      title: 'Step 2: Donor Kitchen Asks What Type of Food It Is',
      subtitle: 'Specifying Dish Name, Diet, Quantities & Freshness',
      color: 'purple',
      badge: '🍲 DONOR FLOW',
      description:
        'In the donor flow, the app asks: "What type of food are you donating?". The chef can pick authentic presets (e.g. Hyderabadi Shahi Veg Dum Biryani, Tandoori Roti & Dal), select Pure Veg/Non-Veg, enter quantities (50 Plates), and input the pickup address.',
      mascotComment:
        '“Our AI logs the dish, verifies food safety temperatures (65°C hot-holding), and publishes it to the network!”',
      previewDetails: {
        dish: 'Royal Shahi Veg Dum Biryani & Mirchi Ka Salan',
        portions: '50 Plates (Hot-Holding 65°C)',
        location: 'Road No. 12, Banjara Hills, Hyderabad',
      },
    },
    {
      id: 'step-receiver',
      flowKey: 'receiver' as const,
      timestamp: '00:36 - 00:55',
      title: 'Step 3: Receiver Charity Browses & Places Order',
      subtitle: 'Claiming Portions & Dispatching Express Delivery Partner',
      color: 'orange',
      badge: '🤝 RECEIVER FLOW',
      description:
        'Charity coordinators see all entered food listed live with zero cost (₹0). They click "Place Order / Pick Up", specify required portions (e.g. 40 Plates for children dinner), enter shelter drop-off address, and choose "🛵 Express Electric Delivery Partner".',
      mascotComment:
        '“The order is confirmed with celebratory confetti, and a dedicated delivery partner with thermal hot-box is assigned!”',
      previewDetails: {
        charity: 'Robin Hood Army & Asha Orphanage Shelter',
        portionsClaimed: '40 Plates',
        rider: 'Rajesh Kumar 🛵 (Hero Electric Scooter)',
      },
    },
    {
      id: 'step-tracking',
      flowKey: 'tracking' as const,
      timestamp: '00:56 - 01:15',
      title: 'Step 4: Live India Map Dispatch & Tracking',
      subtitle: 'Watch the Rider Coming from Kitchen to Deliver Food to Shelter',
      color: 'gradient',
      badge: '🛵 LIVE TELEMETRY',
      description:
        'The interactive Leaflet India map displays the full route across the city. A pulsing electric scooter icon moves in real-time between the donor kitchen (Purple Pin) and the charity shelter (Orange Pin), accompanied by a 5-step milestone timeline and live ETA countdown.',
      mascotComment:
        '“Watch the rider advance through 5 stages: Packed ➔ Picked Up ➔ Out for Delivery ➔ Delivered to Shelter!”',
      previewDetails: {
        city: 'Hyderabad, Telangana (Banjara Hills ➔ Secunderabad)',
        eta: '8 mins remaining',
        status: '🛵 Rider On The Way on City Route',
      },
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 6000 / playbackSpeed);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentStep, playbackSpeed]);

  if (!isOpen) return null;

  const current = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border-2 border-purple-200 flex flex-col max-h-[92vh]">
        {/* 1. Video Player Top Bar */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white px-6 py-4 flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-black tracking-wide font-display">
                  FoodSaver AI — Interactive Video Walkthrough
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/80 text-white font-bold uppercase">
                  Simulated Replay
                </span>
              </div>
              <p className="text-[11px] text-purple-200">
                Visual demonstration of the complete Donor ➔ Receiver ➔ Live Map tracking lifecycle
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            title="Close Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Video Timeline / Step Scrubber Bar */}
        <div className="bg-purple-950/90 px-6 py-2.5 flex items-center justify-between gap-2 border-b border-purple-900 overflow-x-auto text-xs">
          {demoSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`flex-1 min-w-[140px] px-3 py-1.5 rounded-xl text-left transition-all ${
                currentStep === idx
                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-md'
                  : 'text-purple-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] opacity-75">
                <span>{step.badge}</span>
                <span>{step.timestamp}</span>
              </div>
              <p className="text-[11px] font-black truncate">{step.title.split(':')[0]}</p>
            </button>
          ))}
        </div>

        {/* 3. Main Stage Screen (Visual Simulation Arena) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#FAF8FF] to-white">
          {/* Header of Active Step */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                {current.badge} • {current.timestamp}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-purple-950 mt-1 font-display">
                {current.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">{current.subtitle}</p>
            </div>

            <button
              onClick={() => {
                onJumpToFlow(current.flowKey);
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-md hover:scale-105 transition-all self-start sm:self-auto shrink-0"
            >
              <span>Try This Flow Live in App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulated Visual Screen */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-md relative overflow-hidden space-y-4">
            {/* Step 1 Visual Mockup */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-scaleUp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-purple-500 bg-purple-50/70 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🍲</span>
                      <span className="text-[10px] font-black uppercase bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                        Donor Role
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-purple-950">1. Enter as Food Donor</h4>
                    <p className="text-xs text-slate-600">
                      Preloaded profile: Chef Vikram Rao • Annapurna Grand Kitchen & Banquets (Hyderabad)
                    </p>
                    <div className="pt-2">
                      <span className="inline-block bg-purple-600 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xs">
                        Enter as Donor ➔
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-orange-400 bg-orange-50/70 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🤝</span>
                      <span className="text-[10px] font-black uppercase bg-orange-200 text-orange-950 px-2 py-0.5 rounded-full">
                        Receiver Role
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">2. Enter as Food Receiver</h4>
                    <p className="text-xs text-slate-600">
                      Preloaded profile: Priya Sharma • Robin Hood Army & Shelter Care (Secunderabad)
                    </p>
                    <div className="pt-2">
                      <span className="inline-block bg-orange-500 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xs">
                        Enter as Receiver ➔
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual Mockup */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-scaleUp">
                <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🍛</span>
                    <h4 className="text-sm font-black text-purple-950">
                      What type of food are you donating?
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-purple-200">
                      <span className="text-[10px] text-purple-400 font-black uppercase">Selected Dish</span>
                      <p className="font-bold text-slate-900">Hyderabadi Shahi Veg Dum Biryani</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-purple-200">
                      <span className="text-[10px] text-purple-400 font-black uppercase">Dietary Category</span>
                      <p className="font-bold text-emerald-700">🟢 Pure Veg (50 Plates / Handis)</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-purple-400 font-black uppercase">Storage & Kitchen Location</span>
                      <p className="font-bold text-slate-800">Hot-Holding (65°C) • Banjara Hills, Hyderabad</p>
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-3 py-1.5 rounded-xl font-black text-[11px] shadow-xs">
                      ✓ Published Live to Network
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Visual Mockup */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-scaleUp">
                <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🛍️</span>
                      <h4 className="text-sm font-black text-slate-900">
                        Charity Order Confirmation & Dispatch
                      </h4>
                    </div>
                    <span className="text-xs font-black text-orange-600 bg-white px-2.5 py-1 rounded-full border border-orange-200">
                      ₹0 Free Claim
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-orange-200">
                      <span className="text-[10px] text-orange-400 font-black uppercase">Receiving Shelter</span>
                      <p className="font-bold text-slate-900">Asha Children Orphanage & Shelter</p>
                      <p className="text-[11px] text-slate-500">Secunderabad Clock Tower, Hyderabad</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-orange-200">
                      <span className="text-[10px] text-orange-400 font-black uppercase">Portions Rescued</span>
                      <p className="font-bold text-orange-600 text-sm">40 Plates (Evening Distribution)</p>
                      <p className="text-[11px] text-slate-500">10 Plates remaining for other shelters</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900 to-orange-600 text-white p-3.5 rounded-xl flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🛵</span>
                      <div>
                        <p className="font-black text-white">Express Food Rescue Partner Assigned</p>
                        <p className="text-[11px] text-orange-200">Rider Rajesh Kumar • Hero Electric Scooter</p>
                      </div>
                    </div>
                    <span className="bg-white text-purple-950 px-3 py-1 rounded-xl text-[11px] font-black">
                      Dispatched ➔
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Visual Mockup */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-scaleUp">
                <div className="bg-gradient-to-br from-purple-950 to-indigo-950 p-4 rounded-2xl text-white space-y-3 border border-purple-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                      <h4 className="text-sm font-black">
                        Live GPS Map: Banjara Hills ➔ Secunderabad
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-orange-400 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                      ⏱️ 8 mins ETA
                    </span>
                  </div>

                  {/* Graphic Map Simulation Line */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold px-2">
                      <div className="flex items-center space-x-1.5 text-purple-300">
                        <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                        <span>Annapurna Kitchen</span>
                      </div>

                      <div className="flex items-center space-x-2 text-orange-300 animate-pulse">
                        <span className="text-base">🛵</span>
                        <span>Rider In Transit (70%)</span>
                      </div>

                      <div className="flex items-center space-x-1.5 text-orange-400">
                        <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                        <span>Asha Shelter Drop</span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-white/15 h-3 rounded-full overflow-hidden relative">
                      <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-full w-[70%] rounded-full relative" />
                    </div>
                  </div>

                  {/* Milestone Indicators */}
                  <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-bold">
                    <div className="p-1.5 rounded-lg bg-white/10 text-purple-200">1. Packed ✓</div>
                    <div className="p-1.5 rounded-lg bg-white/10 text-purple-200">2. Assigned ✓</div>
                    <div className="p-1.5 rounded-lg bg-orange-500 text-white">3. On Route 🛵</div>
                    <div className="p-1.5 rounded-lg bg-white/5 text-purple-400">4. Delivered 🍽️</div>
                  </div>
                </div>
              </div>
            )}

            {/* Mascot Commentary Card */}
            <div className="flex items-center space-x-3.5 bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-2xl border border-purple-200/80">
              <MascotSprout mood="celebrating" size={54} />
              <div className="text-xs">
                <p className="font-black text-purple-950">{current.mascotComment}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{current.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Video Player Controls Footer */}
        <div className="bg-white px-6 py-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Play/Pause & Scrub Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white flex items-center justify-center shadow-md shadow-purple-200 transition-all hover:scale-105"
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length)}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 transition-all text-xs font-bold flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="text-xs font-black text-purple-950">
              {currentStep + 1} / {demoSteps.length}
            </span>

            <button
              onClick={() => setCurrentStep((prev) => (prev + 1) % demoSteps.length)}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 transition-all text-xs font-bold flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(true);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-purple-600 transition-all"
              title="Restart from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Direct Flow Jump Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-slate-400">Speed:</span>
            {[1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  playbackSpeed === s
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}

            <button
              onClick={onClose}
              className="ml-3 px-4 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            >
              Close Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
