import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  Users, 
  Layers, 
  Dice5, 
  Sparkles, 
  Lightbulb, 
  Cpu, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const WhatWeBuildGrid: React.FC = () => {
  const { navigate, openConsultationModal } = useAppState();

  const categories = [
    {
      icon: Users,
      title: 'Multiplayer Games',
      description: 'Real-time multiplayer experiences engineered for massive scalability, zero packet loss, and authoritative server sync.',
      badge: 'Real-Time Sync',
      slug: 'multiplayer-games',
      color: 'from-orange-500/20 to-amber-500/5'
    },
    {
      icon: Layers,
      title: 'Card Games',
      description: 'Custom card-game mechanics, cryptographic shuffles, intuitive table gestures, and multiplayer lobby systems.',
      badge: 'Provably Fair',
      slug: 'card-games',
      color: 'from-emerald-500/20 to-teal-500/5'
    },
    {
      icon: Dice5,
      title: 'Board Games',
      description: 'Digital board-game experiences (Ludo, Snakes & Ladders, Chess) with custom rule engines and sponsor branding.',
      badge: 'Classic & Modern',
      slug: 'board-games',
      color: 'from-blue-500/20 to-indigo-500/5'
    },
    {
      icon: Sparkles,
      title: 'Casual Games',
      description: 'Engaging lightweight games designed for mobile apps, retention campaigns, and viral social competition.',
      badge: 'High Retention',
      slug: 'casual-games',
      color: 'from-purple-500/20 to-pink-500/5'
    },
    {
      icon: Lightbulb,
      title: 'Custom Game Concepts',
      description: 'Have your own unique game idea? Oreng engineers bespoke 2D/3D products from concept to full production.',
      badge: '100% IP Ownership',
      slug: 'custom-concepts',
      color: 'from-cyan-500/20 to-sky-500/5'
    },
    {
      icon: Cpu,
      title: 'Game Engines & Math Logic',
      description: 'Custom state resolution engines, mathematical modeling, and backend daemons for platforms needing deep control.',
      badge: 'Authoritative Core',
      slug: 'game-engines',
      color: 'from-rose-500/20 to-red-500/5'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <span>CORE PRODUCT CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Games Built Around Your Platform.
            </h2>
            <p className="text-gray-400 mt-3 text-base max-w-2xl leading-relaxed">
              We engineer performant, secure, and engaging game titles ready for seamless integration into your existing infrastructure or standalone deployment.
            </p>
          </div>

          <button
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF782D] hover:text-white transition group shrink-0"
          >
            <span>Explore All Game Engines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-gradient-to-b from-[#121622] to-[#0E1119] border border-white/10 p-7 hover:border-[#FF5B14]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#FF5B14]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] group-hover:bg-[#FF5B14] group-hover:text-white transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => navigate('games')}
                    className="text-xs font-mono text-gray-400 group-hover:text-white flex items-center gap-1 transition"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openConsultationModal(cat.title)}
                    className="text-xs font-medium text-[#FF782D] hover:underline"
                  >
                    Discuss Build
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
