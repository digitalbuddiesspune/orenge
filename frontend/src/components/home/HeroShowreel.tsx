import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  ArrowRight, 
  Gamepad2, 
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const HeroShowreel: React.FC = () => {
  const { navigate, openConsultationModal } = useAppState();
  
  // Interactive Showreel Tab (Ludo 3D, Cards & Poker, Roulette, Multiplier)
  const [activeTab, setActiveTab] = useState<'ludo' | 'cards' | 'roulette' | 'multiplier'>('ludo');
  const [activeUsersCount, setActiveUsersCount] = useState(14820);

  // Auto-simulate ticker effects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsersCount((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-x-hidden bg-[#0B0D13]">
      {/* Native 1672×941 — never crop, stretch, or enlarge past original size */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1672px]">
        <img
          src="/assets/heroBg.png"
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          className="block w-full h-auto pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-[#0B0D13]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,14,0.82)_0%,rgba(8,9,14,0.5)_38%,rgba(8,9,14,0.18)_68%,transparent_82%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-[941px]">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/65 border border-white/15 backdrop-blur-md text-xs sm:text-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5B14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5B14]" />
            </span>
            <span className="font-mono text-white/70">B2B Game Studio:</span>
            <span className="text-white font-medium">Custom Real-Time Multiplayer, Card Engines &amp; Casino Tech</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#FF782D]" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="relative text-center max-w-4xl mx-auto mb-8">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[140%] bg-[radial-gradient(ellipse_at_center,rgba(8,9,14,0.9)_0%,rgba(8,9,14,0.62)_42%,transparent_72%)] pointer-events-none"
          />
          <div className="relative">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            Build Games Your Platform <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Can Own.</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-white font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            Custom game development for gaming platforms, publishers, and businesses. 
            From concept and 3D UI/UX to low-latency real-time servers, wallet APIs, and cloud scaling — 
            we build games that drive player retention.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultationModal('B2B Custom Game Development')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-base shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('games')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/55 border border-white/25 text-white font-semibold text-base hover:bg-black/70 transition cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Gamepad2 className="w-5 h-5 text-[#FF782D]" />
              <span>Explore Game Suite</span>
            </button>
          </div>

          <p className="mt-5 text-xs sm:text-sm font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            ✓ 100% Source Code Ownership &nbsp;•&nbsp; ✓ Sub-40ms WebSocket Sync &nbsp;•&nbsp; ✓ Certified RNG &amp; Provable Fairness
          </p>
          </div>
        </div>

        {/* Hero Interactive Showreel with REAL 3D Game Graphics */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl">
            <div className="bg-[#0D1019] border border-white/10 rounded-[15px] overflow-hidden">
              
              {/* Showreel Top Bar & Tab Switcher */}
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#131724] border-b border-white/10 gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2 hidden sm:inline">
                    oreng-engine-runtime v3.4.2 [LIVE PREVIEW]
                  </span>
                </div>

                {/* Showreel Switcher */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveTab('ludo')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                      activeTab === 'ludo' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🎲 3D Ludo Engine
                  </button>
                  <button
                    onClick={() => setActiveTab('cards')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                      activeTab === 'cards' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🃏 Poker / Rummy Table
                  </button>
                  <button
                    onClick={() => setActiveTab('roulette')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                      activeTab === 'roulette' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🎡 Live Roulette
                  </button>
                  <button
                    onClick={() => setActiveTab('multiplier')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                      activeTab === 'multiplier' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    📈 Multiplier Crash
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeUsersCount.toLocaleString()} Live CCU</span>
                </div>
              </div>

              {/* Showreel Interactive Viewport */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0A0C14] to-[#121622]">
                
                {/* 1. LUDO SHOWREEL */}
                {activeTab === 'ludo' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img
                        src="/assets/ludo_3d_gameplay.jpg"
                        alt="3D Multiplayer Ludo Game Engine"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
                        <span className="text-emerald-400 font-bold">● Sub-38ms WebSocket Sync</span>
                        <span>2 to 4 Players</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs font-mono">
                        <Zap className="w-3.5 h-3.5" />
                        <span>SYNCHRONIZED ROOM ENGINE</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Multiplayer 3D Ludo Engine
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Precision-rendered 3D board with deterministic server-side dice physics, instant room matchmaking, automated turn timers, and auto-bot disconnect recovery.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Frame Rate</span>
                          <span className="text-emerald-400 font-bold">60 FPS WebGL / Canvas</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Cheat Prevention</span>
                          <span className="text-white font-bold">100% Server Authoritative</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'ludo')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Inspect Technical Specs</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('request-demo')}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium cursor-pointer"
                        >
                          Book Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CARD & POKER TABLE SHOWREEL */}
                {activeTab === 'cards' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img
                        src="/assets/poker_table_gameplay.jpg"
                        alt="High-End Poker and Card Table Engine"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
                        <span className="text-emerald-400 font-bold">● Fisher-Yates SHA-256 Validated</span>
                        <span>2 to 6 Seat Multi-Table</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>PROVABLY-FAIR PROTOCOL</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Multi-Table Card &amp; Rummy Suite
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Turnkey card rooms with certified random number generator (RNG) shuffles, automated meld detectors, anti-collusion seat distribution, and zero-leak API wallet settlement.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Seat Limits</span>
                          <span className="text-white font-bold">2–6 Seats Configurable</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Integration</span>
                          <span className="text-emerald-400 font-bold">JWT SSO + Webhooks</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'multiplayer-cards')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Inspect Card Room Specs</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('request-demo')}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium cursor-pointer"
                        >
                          Book Demo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ROULETTE SHOWREEL */}
                {activeTab === 'roulette' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img
                        src="/assets/roulette_engine.jpg"
                        alt="European Live Roulette Engine"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
                        <span className="text-amber-400 font-bold">● European Single Zero RTP 97.3%</span>
                        <span>10k+ Bettors / Spin</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AUTHENTIC CASINO WHEEL ENGINE</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        European Live Roulette Engine
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        High-precision 3D ball spin physics, racetrack call betting grids (Voisins, Tiers, Orphelins), statistical number heatmaps, and instant batch settlement.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Concurrency</span>
                          <span className="text-white font-bold">10,000+ per Table</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Latency</span>
                          <span className="text-emerald-400 font-bold">&lt; 20ms Broadcast</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'roulette-casino-engine')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Inspect Roulette Specs</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('request-demo')}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium cursor-pointer"
                        >
                          Book Demo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MULTIPLIER CRASH SHOWREEL */}
                {activeTab === 'multiplier' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    <div className="lg:col-span-6 rounded-2xl bg-[#101322] border-2 border-purple-500/30 p-8 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden">
                      <div className="flex justify-between text-[11px] font-mono text-purple-300">
                        <span>BROADCAST STREAM</span>
                        <span className="text-emerald-400">50K SPECTATORS</span>
                      </div>
                      <div className="py-8">
                        <span className="text-6xl font-black font-display text-gradient-orange tracking-tight">
                          4.82x
                        </span>
                        <p className="text-xs font-mono text-cyan-400 mt-2">Active Multiplier Curve Tick</p>
                      </div>
                      <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-xs font-mono text-gray-300 flex justify-between">
                        <span>Reaction Speed:</span>
                        <span className="text-emerald-400 font-bold">&lt; 8ms Cashout Ack</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-mono">
                        <Zap className="w-3.5 h-3.5" />
                        <span>MASS SPECTATOR MULTIPLIER</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Crash Multiplier Curve Engine
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Ultra-high velocity curve tick simulator broadcasting to 50,000+ simultaneous connected players with verifiable cryptographic hash chains and dual-betting action panels.
                      </p>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'crash-multiplier')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Inspect Multiplier Specs</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate('request-demo')}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium cursor-pointer"
                        >
                          Book Demo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
