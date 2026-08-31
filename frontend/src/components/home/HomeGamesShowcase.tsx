import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const HomeGamesShowcase: React.FC = () => {
  const { games, navigate, openConsultationModal } = useAppState();
  const featured = games.filter((g) => g.isFeatured).slice(0, 2);

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#0A0C10]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              See what we've built.
            </h2>
            <p className="mt-3 text-[15px] text-neutral-400 leading-relaxed">
              Production-ready games and engines you can white-label, customize, and launch on your platform.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition shrink-0 cursor-pointer"
          >
            <span>All games</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {featured.map((game) => (
            <article
              key={game.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12151C]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 relative aspect-[16/9] lg:aspect-auto lg:min-h-[280px] overflow-hidden">
                  <img
                    src={game.bannerImage}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#12151C]/90 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] to-transparent lg:hidden" />
                </div>

                <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
                  <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-500">
                    {game.category}
                    {game.multiplayer && ' · Multiplayer'}
                  </p>
                  <h3 className="mt-2 text-2xl font-display font-bold text-white">{game.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {game.shortDescription}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('game-detail', game.slug)}
                      className="px-5 py-2.5 rounded-lg bg-[#FF5B14] text-white text-sm font-semibold hover:bg-[#FF782D] transition cursor-pointer"
                    >
                      View game
                    </button>
                    <button
                      type="button"
                      onClick={() => openConsultationModal(`Demo: ${game.title}`)}
                      className="px-5 py-2.5 rounded-lg border border-white/15 text-neutral-300 text-sm font-medium hover:text-white hover:border-white/30 transition cursor-pointer"
                    >
                      Request demo
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
