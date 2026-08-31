import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import type { GameCategory } from '../types';
import { 
  Gamepad2, 
  Search, 
  Zap, 
  Users, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const GamesPage: React.FC = () => {
  const { games, navigate, openConsultationModal } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: GameCategory[] = [
    'All',
    'Multiplayer Games',
    'Card Games',
    'Board Games',
    'Casual Games',
    'Game Engines'
  ];

  const filteredGames = games.filter((game) => {
    const matchesCat = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SeoMeta
        title="Games We Build — Multiplayer, Card, Board & Custom Engines"
        description="Explore Oreng's production-ready games and custom game engines. Features Multiplayer Ludo, Card & Rummy Engine, Multiplier Curves, and Bespoke Proprietary Titles."
        keywords="Multiplayer Games, Card Games, Board Games, Ludo Game Engine, Rummy Engine, Crash Multiplier, Custom Game Development"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>GAME ENGINE CATALOG</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Games We Build.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              Explore our portfolio of high-concurrency multiplayer titles, certified card engines, and customizable board games engineered for platform ownership.
            </p>
          </div>

          {/* Filters & Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-semibold'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games, engines, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
              />
            </div>
          </div>

          {/* Games Grid */}
          {filteredGames.length === 0 ? (
            <div className="text-center py-20 bg-[#121622] rounded-2xl border border-white/10">
              <Gamepad2 className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No games found</h3>
              <p className="text-sm text-gray-400 mt-1">Try refining your search query or selected category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="rounded-2xl bg-[#121622] border border-white/10 overflow-hidden hover:border-[#FF5B14]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5B14] text-white text-[11px] font-mono font-bold shadow">
                          {game.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-emerald-400 text-[11px] font-mono">
                          {game.status}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Zap className="w-3 h-3" />
                          <span>{game.syncLatency}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#FF782D]" />
                          <span>{game.maxPlayers}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                        {game.title}
                      </h3>
                      
                      <p className="text-xs font-mono text-gray-400 mt-1 line-clamp-1">
                        {game.tagline}
                      </p>

                      <p className="text-xs text-gray-300 mt-3 leading-relaxed line-clamp-3">
                        {game.shortDescription}
                      </p>

                      {/* Supported Platforms Chips */}
                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                        {game.platforms.slice(0, 3).map((p, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-gray-400">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      onClick={() => navigate('game-detail', game.slug)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#FF5B14]/20 hover:opacity-95 transition cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={() => navigate('request-demo')}
                      className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-medium transition cursor-pointer"
                    >
                      Demo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Custom Concept Box */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#121622] to-[#171C2B] border border-white/10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 text-[#FF782D] text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BESPOKE GAME ENGINEERING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Don't see your desired game mechanic?
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Oreng develops custom game logic, proprietary rulesets, and mathematical models for completely novel game ideas with 100% client IP ownership.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openConsultationModal('Custom Proprietary Game Idea')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
                >
                  Discuss Your Custom Concept
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
