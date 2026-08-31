import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  Users, 
  Layers, 
  Dice5, 
  Sparkles, 
  Lightbulb, 
  Cpu, 
  ArrowRight,
  ChevronRight,
  Zap,
  ShieldCheck,
  Globe2,
  Gamepad2
} from 'lucide-react';

export const WhatWeBuildGrid: React.FC = () => {
  const { navigate, openConsultationModal } = useAppState();
  const [activeFilter, setActiveFilter] = useState<'all' | 'multiplayer' | 'cards' | 'board' | 'casual' | 'engines'>('all');

  const categories = [
    {
      id: 'multiplayer',
      filterType: 'multiplayer',
      icon: Users,
      title: 'Multiplayer Games',
      tagline: 'Real-time multiplayer experiences engineered for massive scalability.',
      badge: 'Sub-15ms Latency',
      gamePills: ['Crash Aviator', '3D Ludo Multi', '8-Ball Pool', 'Battle Arena'],
      rtp: 'Custom RTP',
      ccu: '50k+ CCU',
      delivery: '3-4 Wks',
      slug: 'multiplayer-games',
      image: '/assets/multiplayer_games_bg.jpg',
      accentColor: 'from-[#FF5B14]/40 to-amber-500/10',
      detailSlug: 'ludo'
    },
    {
      id: 'cards',
      filterType: 'cards',
      icon: Layers,
      title: 'Card Games',
      tagline: 'Custom card-game mechanics, interfaces and multiplayer systems.',
      badge: 'Provably Fair RNG',
      gamePills: ['Texas Hold\'em', '13-Card Rummy', 'Teen Patti', 'Blackjack 21'],
      rtp: '98.5% RTP',
      ccu: '100k+ Tables',
      delivery: '2-3 Wks',
      slug: 'card-games',
      image: '/assets/poker_table_gameplay.jpg',
      accentColor: 'from-emerald-500/40 to-teal-500/10',
      detailSlug: 'multiplayer-cards'
    },
    {
      id: 'board',
      filterType: 'board',
      icon: Dice5,
      title: 'Board Games',
      tagline: 'Digital board-game experiences with custom rules and branding.',
      badge: 'Deterministic Math',
      gamePills: ['Ludo King Style', 'Snakes & Ladders', 'Carrom 3D', 'Chess Masters'],
      rtp: 'Skill-Based',
      ccu: '250k+ Matches',
      delivery: '2-3 Wks',
      slug: 'board-games',
      image: '/assets/ludo_3d_gameplay.jpg',
      accentColor: 'from-blue-500/40 to-indigo-500/10',
      detailSlug: 'ludo'
    },
    {
      id: 'casual',
      filterType: 'casual',
      icon: Sparkles,
      title: 'Casual Games',
      tagline: 'Engaging lightweight games designed for mobile and web platforms.',
      badge: 'High Retention',
      gamePills: ['Match-3 Saga', 'Bubble Shooter', 'Plinko Arcade', 'Endless Runner'],
      rtp: 'Instant WebGL',
      ccu: 'Global CDNs',
      delivery: '2 Wks',
      slug: 'casual-games',
      image: '/assets/casino_studio_hero.jpg',
      accentColor: 'from-purple-500/40 to-pink-500/10',
      detailSlug: 'casual-arcade'
    },
    {
      id: 'concepts',
      filterType: 'engines',
      icon: Lightbulb,
      title: 'Custom Game Concepts',
      tagline: 'Have your own game idea? Oreng can develop the product around your requirements.',
      badge: '100% Source Code',
      gamePills: ['Proprietary Rules', 'Brand Gamification', 'Custom Physics', 'Web3 / Crypto'],
      rtp: 'Custom Math',
      ccu: 'Custom Target',
      delivery: 'Dedicated Pod',
      slug: 'custom-concepts',
      image: '/assets/heroBg.png',
      accentColor: 'from-cyan-500/40 to-sky-500/10',
      detailSlug: 'custom-build'
    },
    {
      id: 'engines',
      filterType: 'engines',
      icon: Cpu,
      title: 'Game Engines',
      tagline: 'Custom game logic and backend engines for platforms requiring deeper control.',
      badge: 'Authoritative Core',
      gamePills: ['CSPRNG Servers', 'Roulette Physics', 'Protocol Buffers', 'Anti-Cheat ML'],
      rtp: 'GLI-19 Certified',
      ccu: '<1ms Resolution',
      delivery: 'API / SDK',
      slug: 'game-engines',
      image: '/assets/roulette_engine.jpg',
      accentColor: 'from-rose-500/40 to-red-500/10',
      detailSlug: 'roulette-casino-engine'
    }
  ];

  const filtered = activeFilter === 'all' 
    ? categories 
    : categories.filter(c => c.filterType === activeFilter || (activeFilter === 'engines' && (c.id === 'engines' || c.id === 'concepts')));

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>WHAT WE BUILD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Games Built Around Your Platform.
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed font-sans">
              Turnkey game suites and custom engineering for gaming platforms, publishers, and operators worldwide. All delivered with full source code ownership.
            </p>
          </div>

          <button
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF782D] hover:text-white transition group shrink-0 cursor-pointer bg-[#FF5B14]/10 hover:bg-[#FF5B14] px-5 py-3 rounded-xl border border-[#FF5B14]/30 shadow-lg"
          >
            <span>Explore Game Development</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Interactive Studio Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 font-mono text-xs no-scrollbar">
          {[
            { key: 'all', label: 'All Engines (06)' },
            { key: 'multiplayer', label: 'Multiplayer Games' },
            { key: 'cards', label: 'Card Games' },
            { key: 'board', label: 'Board Games' },
            { key: 'casual', label: 'Casual Games' },
            { key: 'engines', label: 'Game Engines & Math' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as typeof activeFilter)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30 scale-105'
                  : 'bg-[#121624] border border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* High-Impact Visual Studio Game Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#FF5B14]/70 transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between min-h-[420px] bg-[#0E121C]"
              >
                {/* 1. High-Res Visual Game Banner with Cinematic Contrast */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A10] via-[#0B0E17]/90 to-[#0B0E17]/50" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.accentColor} opacity-25 group-hover:opacity-45 transition-opacity duration-500`} />
                </div>

                {/* 2. Top Header Overlay */}
                <div className="relative z-10 p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#FF782D] group-hover:bg-[#FF5B14] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] font-mono font-medium text-emerald-400 shadow-sm">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-white group-hover:text-[#FF782D] transition-colors duration-300 tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-sans line-clamp-2">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Supported Game Titles */}
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.gamePills.map((game, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2 py-0.5 rounded-md bg-black/60 border border-white/15 text-[11px] font-mono text-gray-200 group-hover:border-[#FF5B14]/40 transition"
                        >
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Tech Telemetry & Action Strip */}
                <div className="relative z-10 p-6 sm:p-7 pt-0 space-y-4">
                  {/* Micro Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/70 border border-white/10 text-[10px] font-mono text-center backdrop-blur-sm">
                    <div>
                      <span className="text-gray-400 block">RTP / Type</span>
                      <span className="text-emerald-400 font-bold truncate block">{cat.rtp}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Throughput</span>
                      <span className="text-white font-bold">{cat.ccu}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Turnaround</span>
                      <span className="text-amber-400 font-bold">{cat.delivery}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => navigate('game-detail', cat.detailSlug)}
                      className="text-xs font-mono text-gray-300 group-hover:text-white flex items-center gap-1 transition cursor-pointer hover:underline"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>

                    <button
                      onClick={() => openConsultationModal(cat.title)}
                      className="text-xs font-bold font-mono text-[#FF782D] hover:text-white transition cursor-pointer px-3 py-1.5 rounded-xl bg-[#FF5B14]/15 border border-[#FF5B14]/30 hover:bg-[#FF5B14]"
                    >
                      Discuss Build
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Operator Guarantee Banner (Like Evolution / Pragmatic Play) */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#0F131E] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left shadow-2xl">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">99.99% Server SLA</h4>
              <p className="text-xs text-gray-400 mt-0.5">Sub-20ms WebSocket sync worldwide with zero packet drop.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">GLI-19 Certified RNG</h4>
              <p className="text-xs text-gray-400 mt-0.5">Cryptographically sound CSPRNG math and provably fair seeds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FF5B14]/10 border border-[#FF5B14]/30 flex items-center justify-center text-[#FF782D] shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">100% IP &amp; Code Ownership</h4>
              <p className="text-xs text-gray-400 mt-0.5">Self-hosted or single-tenant with zero recurring per-user royalties.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">Cross-Platform SDKs</h4>
              <p className="text-xs text-gray-400 mt-0.5">Instant HTML5 WebGL, Unity iOS/Android SDKs, and WebView drop-ins.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
