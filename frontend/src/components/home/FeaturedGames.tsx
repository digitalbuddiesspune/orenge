import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

export const FeaturedGames: React.FC = () => {
  const { games, navigate } = useAppState();

  const featuredList = games.filter((g) => g.isFeatured).slice(0, 3);

  return (
    <section className="py-24 bg-[#080A10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <span>TECHNICAL PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            See What We've Built.
          </h2>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            Real games engineered for high-concurrency platforms. Examine our architecture, turn synchronization models, and back-office admin capabilities.
          </p>
        </div>

        {/* Featured Game Deep Dive Cards */}
        <div className="space-y-12">
          {featuredList.map((game, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={game.id}
                className="rounded-3xl bg-[#101420] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl hover:border-[#FF5B14]/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Preview / Thumbnail Banner */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <img
                        src={game.bannerImage}
                        alt={game.title}
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-black/40 to-transparent" />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#FF5B14] text-white text-xs font-mono font-bold shadow-lg">
                          {game.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                          {game.status}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-gray-300">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Zap className="w-3.5 h-3.5" />
                          <span>{game.syncLatency}</span>
                        </span>
                        <span>{game.maxPlayers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details and Technical Highlights */}
                  <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        {game.title}
                      </h3>
                      <p className="text-sm font-mono text-[#FF782D] mt-1">
                        {game.tagline}
                      </p>
                      <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                        {game.shortDescription}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                        Key Capabilities &amp; Architecture:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {game.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supported Platforms */}
                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        Supported Platforms:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {game.platforms.map((plat, pIdx) => (
                          <span key={pIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => navigate('game-detail', game.slug)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
                      >
                        <span>View Game Architecture</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigate('request-demo')}
                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-medium text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer"
                      >
                        Request Demo Access
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full Catalog */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
          >
            <span>View All Available Games &amp; SDKs</span>
            <ArrowRight className="w-4 h-4 text-[#FF782D]" />
          </button>
        </div>

      </div>
    </section>
  );
};
