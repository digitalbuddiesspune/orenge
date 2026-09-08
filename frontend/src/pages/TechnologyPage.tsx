import React, { useState } from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { useAppState } from '../contexts/AppStateContext';
import {
  Zap,
  ShieldCheck,
  Server,
  Lock,
  ArrowRight,
  Smartphone,
  Gauge,
  ChevronDown,
  ChevronUp,
  Cpu,
  RefreshCw,
  Database,
  Cloud,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';

const simpleFaqs = [
  {
    q: 'Can this technology handle thousands of players at the same time?',
    a: 'Yes. Our game servers are built in Go and run on AWS auto-scaling clusters, tested to comfortably handle over 100,000+ players simultaneously without lag.',
  },
  {
    q: 'Will the games run smoothly on budget/low-end smartphones?',
    a: 'Yes. Our rendering engine (PixiJS Canvas) is lightweight (under 5MB) and optimized for 60 FPS, even on budget Android phones with 2GB RAM.',
  },
  {
    q: 'How does it connect with our existing website or app?',
    a: 'Through standard REST & Webhook APIs. We provide seamless integration for user login (SSO), wallet debit/credit, and real-time balance updates in under 1 week.',
  },
];

export const TechnologyPage: React.FC = () => {
  const { openConsultationModal, navigate, homeAssets } = useAppState();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <SeoMeta
        title="Technology Stack — Fast, Fair & Scalable Game Engines | Oreng"
        description="Simple, fast, and secure game technology. 60 FPS lightweight graphics, sub-50ms multiplayer servers, and 100% fair random game logic."
        keywords="Game Technology, Real-time Multiplayer, Fast Game Engine, Fair Game RNG, PixiJS, Go Game Server"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          
          {/* 1. HERO SECTION - SHORT & PUNCHY */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>SIMPLE &amp; POWERFUL TECH</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Fast, Fair &amp; Lightweight <br />
              <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-400 bg-clip-text text-transparent">
                Game Engine Technology.
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              We build multiplayer games that load instantly under 2 seconds, run at a silky smooth 60 FPS, and never lag on mobile networks.
            </p>

            {/* 3 Core Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm font-semibold text-gray-200">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>&lt; 50ms Real-Time Speed</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Smooth 60 FPS on Any Phone</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#FF782D]" />
                <span>100% Fair &amp; Cheat-Proof</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => openConsultationModal('Technology Overview')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Talk to a Tech Expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('games')}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm font-semibold transition cursor-pointer"
              >
                See Live Games
              </button>
            </div>
          </div>

          {/* 2. HOW OUR GAMES WORK (SIMPLE 4-STEP PIPELINE) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0F131E] border border-white/10 space-y-8 shadow-xl">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                From Player Tap to Instant Result
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">STEP 1</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Player Taps Screen</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Smooth 60 FPS graphics on phone or browser. Actions are sent to the server in milliseconds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">STEP 2</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Fast Game Server</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Synchronizes all players instantly (&lt;50ms). Keeps turns in sync and prevents cheating.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5B14]/10 text-[#FF782D] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">STEP 3</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Fair Random Logic</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Card shuffling and dice rolls happen server-side with 100% fair mathematical randomness.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">STEP 4</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Safe Wallet &amp; Payout</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Instant balance updates and payouts connected securely to your app’s existing wallet.
                </p>
              </div>
            </div>
          </div>

          {/* 3. 4 CORE TECH PILLARS (CLEAN & SIMPLE) */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                Our Tech Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Simple, Reliable Building Blocks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pillar 1: Frontend */}
              <div className="p-6 rounded-3xl bg-[#101420] border border-white/10 hover:border-[#FF5B14]/40 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Game Screen &amp; Graphics</h3>
                    <p className="text-xs text-gray-400">PixiJS • WebGL Canvas • React 19</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Games load in under 2 seconds on web browsers and mobile apps. Crisp animations at 60 FPS without draining device battery.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-cyan-400 font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Instant Load (&lt;5MB)</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">60 FPS Smooth</span>
                </div>
              </div>

              {/* Pillar 2: Server */}
              <div className="p-6 rounded-3xl bg-[#101420] border border-white/10 hover:border-[#FF5B14]/40 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Multiplayer Server Engine</h3>
                    <p className="text-xs text-gray-400">Go (Golang) • WebSockets • Protobuf</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Ultra-fast real-time netcode. Handles turns with zero delay and reconnects players in 1 second if their phone network drops.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-400 font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">&lt; 50ms Turn Speed</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Auto-Reconnect</span>
                </div>
              </div>

              {/* Pillar 3: Database */}
              <div className="p-6 rounded-3xl bg-[#101420] border border-white/10 hover:border-[#FF5B14]/40 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Fast &amp; Safe Data Storage</h3>
                    <p className="text-xs text-gray-400">Redis In-Memory • PostgreSQL</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Sub-millisecond room state caching combined with rock-solid database ledgers for 100% accurate player balances and game history.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-amber-400 font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Zero Balance Errors</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Match Replays</span>
                </div>
              </div>

              {/* Pillar 4: Cloud & Security */}
              <div className="p-6 rounded-3xl bg-[#101420] border border-white/10 hover:border-[#FF5B14]/40 transition space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Cloud Hosting &amp; Anti-DDoS</h3>
                    <p className="text-xs text-gray-400">AWS Cloud • Docker • Cloudflare</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Automated auto-scaling infrastructure that expands effortlessly during tournament traffic spikes with 99.99% uptime guarantee.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-purple-400 font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">100k+ CCU Scaling</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">DDoS Shield</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. THREE BIG ADVANTAGES FOR OPERATORS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101420] to-[#0A0D16] border border-white/10 space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white text-center">
              Why Gaming Platforms Trust Our Technology
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cheat-Proof Logic</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  All cards, dice, and money calculations happen on our secure server. Players cannot hack or modify scores on their phones.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <RefreshCw className="w-4 h-4" />
                  <span>Instant Reconnect</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  If a player’s 4G drops for a few seconds, the game seamlessly restores their exact board state the moment they get back online.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-[#FF782D] font-bold text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Safe Wallet Webhooks</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  HMAC encrypted webhooks ensure zero double-debiting or payout mismatch when connecting to your platform wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Architecture Diagram Showcase */}
          <div className="rounded-3xl bg-[#0D111A] border-2 border-white/10 overflow-hidden shadow-2xl relative group">
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-black/80 overflow-hidden">
              <img
                src={homeAssets.architectureDiagram || '/assets/multiplayer_games_bg.jpg'}
                alt="System Architecture Diagram"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/multiplayer_games_bg.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/50 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-xl">
                  <span className="px-2.5 py-1 rounded-full bg-[#FF5B14]/20 border border-[#FF5B14]/40 text-[#FF782D] text-[10px] font-mono font-bold uppercase tracking-wider">
                    SYSTEM BLUEPRINT &amp; NETCODE
                  </span>
                  <h4 className="text-lg sm:text-2xl font-display font-extrabold text-white mt-1.5 tracking-tight">
                    Sub-45ms Real-Time Authoritative Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans mt-1">
                    High-throughput Go netcode, real-time WebSocket synchronization, and Redis room manager.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. SIMPLE FAQ ACCORDION */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                Got Questions?
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-2.5">
              {simpleFaqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl bg-[#101420] border border-white/10 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 text-white hover:text-[#FF782D] transition cursor-pointer text-sm font-semibold"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FF782D] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. BOTTOM SIMPLE CTA */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-xl text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Ready to Integrate High-Performance Games?
            </h2>
            <p className="text-white/90 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Let&apos;s discuss how our game engines can connect with your platform in under 1 week.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal('Technology Simple Banner')}
                className="px-6 py-3 rounded-xl bg-black text-white hover:bg-black/90 font-bold text-xs sm:text-sm shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <span>Request a Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-[#FF782D]" />
              </button>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Contact Team
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
