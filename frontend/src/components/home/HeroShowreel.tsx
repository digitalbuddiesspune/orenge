import React, { useState } from 'react';
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
  const { navigate, openConsultationModal, homeAssets } = useAppState();
  
  // Interactive Showreel Tab (Ludo 3D, Cards & Poker, Roulette, Multiplier)
  const [activeTab, setActiveTab] = useState<'ludo' | 'cards' | 'roulette' | 'multiplier'>('ludo');

  return (
    <section className="relative overflow-x-hidden bg-[#0B0D13]">
      {/* Native 1672×941 — never crop, stretch, or enlarge past original size */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1672px]">
        <img
          src={homeAssets.heroBg || '/assets/heroBg.png'}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          className="block w-full h-auto pointer-events-none select-none object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/assets/heroBg.png';
          }}
        />
        <div className="absolute inset-0 bg-[#0B0D13]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,14,0.82)_0%,rgba(8,9,14,0.5)_38%,rgba(8,9,14,0.18)_68%,transparent_82%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 lg:min-h-[941px]">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6 px-1">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/65 border border-white/15 backdrop-blur-md text-[11px] sm:text-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.55)] max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5B14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5B14]" />
            </span>
            <span className="text-white/70 shrink-0">Game Studio:</span>
            <span className="text-white font-medium truncate sm:whitespace-normal">
              <span className="sm:hidden">Custom Games for Your Business</span>
              <span className="hidden sm:inline">We Build Custom Games for Gaming Platforms &amp; Businesses</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#FF782D] shrink-0 hidden sm:block" />
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
            We make custom online games for gaming companies and businesses.
            From game design to building, testing and launch — Oreng handles everything for you.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={() => openConsultationModal('Custom Game Development')}
              className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => navigate('games')}
              className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-black/55 border border-white/25 text-white font-semibold text-sm sm:text-base hover:bg-black/70 transition cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF782D]" />
              <span>Explore Our Games</span>
            </button>
          </div>

          <p className="mt-5 text-[11px] sm:text-sm font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center px-2">
            <span>✓ You Own the Game</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span>✓ Fast Online Play</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span>✓ Fair &amp; Safe Games</span>
          </p>
          </div>
        </div>

        {/* Hero Interactive Showreel with REAL 3D Game Graphics */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl">
            <div className="bg-[#0D1019] border border-white/10 rounded-[15px] overflow-hidden">
              
              {/* Showreel Top Bar & Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-3 bg-[#131724] border-b border-white/10 gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* Showreel Switcher */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 overflow-x-auto no-scrollbar -mx-0.5 px-0.5 sm:mx-auto">
                  <button
                    onClick={() => setActiveTab('ludo')}
                    className={`shrink-0 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-md transition cursor-pointer whitespace-nowrap ${
                      activeTab === 'ludo' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🎲 Ludo
                  </button>
                  <button
                    onClick={() => setActiveTab('cards')}
                    className={`shrink-0 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-md transition cursor-pointer whitespace-nowrap ${
                      activeTab === 'cards' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🃏 Cards
                  </button>
                  <button
                    onClick={() => setActiveTab('roulette')}
                    className={`shrink-0 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-md transition cursor-pointer whitespace-nowrap ${
                      activeTab === 'roulette' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🎡 Roulette
                  </button>
                  <button
                    onClick={() => setActiveTab('multiplier')}
                    className={`shrink-0 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-md transition cursor-pointer whitespace-nowrap ${
                      activeTab === 'multiplier' ? 'bg-[#FF5B14] text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    📈 Crash
                  </button>
                </div>

                <div className="hidden sm:block w-[54px] shrink-0" aria-hidden />
              </div>

              {/* Showreel Interactive Viewport */}
              <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#0A0C14] to-[#121622]">
                
                {/* 1. LUDO SHOWREEL */}
                {activeTab === 'ludo' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img
                        src={homeAssets.ludoBg || '/assets/ludo_3d_gameplay.jpg'}
                        alt="3D Multiplayer Ludo Game"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/ludo_3d_gameplay.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
                        <span className="text-emerald-400 font-bold">● Smooth Online Play</span>
                        <span>2 to 4 Players</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        <span>ONLINE MULTIPLAYER</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        3D Ludo Game
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Beautiful 3D Ludo board where friends can play together online. Private rooms, quick matchmaking, turn timers, and auto-play if someone disconnects.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Graphics</span>
                          <span className="text-emerald-400 font-bold">Smooth 3D Animation</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Security</span>
                          <span className="text-white font-bold">No Cheating Possible</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'ludo')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Game Details</span>
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
                        src={homeAssets.pokerBg || '/assets/poker_table_gameplay.jpg'}
                        alt="Poker and Card Table Game"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/poker_table_gameplay.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
                        <span className="text-emerald-400 font-bold">● Fair Card Shuffling</span>
                        <span>2 to 6 Players per Table</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>FAIR &amp; TRUSTED</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Card &amp; Rummy Games
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Ready-made card game tables for Poker, Rummy and Teen Patti. Fair card dealing, multiple tables at once, and easy connection to your platform.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Players</span>
                          <span className="text-white font-bold">2–6 per Table</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Setup</span>
                          <span className="text-emerald-400 font-bold">Easy to Connect</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'multiplayer-cards')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Game Details</span>
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
                        src={homeAssets.rouletteBg || '/assets/roulette_engine.jpg'}
                        alt="Live Roulette Game"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/roulette_engine.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
                        <span className="text-amber-400 font-bold">● Real Casino Feel</span>
                        <span>Many Players at Once</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>LIVE CASINO GAME</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Live Roulette Game
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Real-looking 3D roulette wheel with smooth ball spin. Multiple betting options, live results, and instant payouts for all players.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Capacity</span>
                          <span className="text-white font-bold">Thousands of Players</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-gray-400 block">Speed</span>
                          <span className="text-emerald-400 font-bold">Instant Results</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'roulette-casino-engine')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Game Details</span>
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
                      <div className="flex justify-between text-[11px] text-purple-300">
                        <span>LIVE GAME</span>
                        <span className="text-emerald-400">50K+ WATCHING</span>
                      </div>
                      <div className="py-8">
                        <span className="text-6xl font-black font-display text-gradient-orange tracking-tight">
                          4.82x
                        </span>
                        <p className="text-xs text-cyan-400 mt-2">Current Multiplier</p>
                      </div>
                      <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-xs text-gray-300 flex justify-between">
                        <span>Cash Out Speed:</span>
                        <span className="text-emerald-400 font-bold">Instant</span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        <span>POPULAR CRASH GAME</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        Crash / Multiplier Game
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Exciting multiplier game where numbers go up and players cash out before it crashes. Supports 50,000+ players at the same time with fair and verified results.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
                        <button
                          onClick={() => navigate('game-detail', 'crash-multiplier')}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/30 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Game Details</span>
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
