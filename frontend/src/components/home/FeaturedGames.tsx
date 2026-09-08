import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';
import type { Game } from '../../types';
import { CardSuitPattern, GamingDecor, SuitStrip } from './GamingDecor';
import { BgAccentImage, HOME_BG_IMAGES, SectionBgImage } from './SectionBgImage';

export const FeaturedGames: React.FC = () => {
  const { games, navigate, openConsultationModal } = useAppState();
  const featured = games.filter((g) => g.isFeatured);
  const hero = featured[0];
  const rest = featured.slice(1, 4);

  if (!hero) return null;

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06] relative z-10 overflow-hidden">
      <SectionBgImage src={HOME_BG_IMAGES.roulette} opacity={0.12} overlay="bottom" />
      <BgAccentImage
        src={HOME_BG_IMAGES.ludo}
        className="top-20 -left-20 w-96 h-56 hidden xl:block"
        opacity={0.08}
      />
      <BgAccentImage
        src={HOME_BG_IMAGES.poker}
        className="bottom-10 -right-16 w-80 h-48 hidden xl:block rotate-[-4deg]"
        opacity={0.09}
      />
      <CardSuitPattern className="opacity-[0.025]" />
      <GamingDecor variant="cards" className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,91,20,0.06)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            See what we've built.
          </h2>
          <p className="mt-4 text-[15px] text-neutral-400 leading-relaxed font-sans">
            Real games we have built — Ludo, Rummy, Roulette, Crash &amp; custom engines — ready to deploy to your platform.
          </p>
          <div className="mt-5 opacity-50">
            <SuitStrip />
          </div>
        </div>

        {/* Dynamic Bento Grid without coordinate collisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Main Hero Card */}
          <BentoTile
            game={hero}
            variant="hero"
            className="md:col-span-2 lg:col-span-7 lg:min-h-[460px]"
            onView={() => navigate('game-detail', hero.slug)}
            onDemo={() => openConsultationModal(`Demo: ${hero.title}`)}
          />

          {/* Right column / top secondary tiles */}
          <div className="md:col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {rest.slice(0, 2).map((game) => (
              <BentoTile
                key={game.id}
                game={game}
                variant="compact"
                className="min-h-[220px]"
                onView={() => navigate('game-detail', game.slug)}
                onDemo={() => openConsultationModal(`Demo: ${game.title}`)}
              />
            ))}
          </div>

          {/* Bottom row if more featured games exist */}
          {rest.length > 2 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.slice(2).map((game) => (
                <BentoTile
                  key={game.id}
                  game={game}
                  variant="compact"
                  className="min-h-[230px]"
                  onView={() => navigate('game-detail', game.slug)}
                  onDemo={() => openConsultationModal(`Demo: ${game.title}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:px-8 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <p className="text-sm text-neutral-400 text-center sm:text-left font-sans">
            {games.length}+ ready games · Your branding · Full source code ownership
          </p>
          <button
            type="button"
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-sm font-bold shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition cursor-pointer shrink-0"
          >
            <span>Explore all games</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

function BentoTile({
  game,
  variant,
  className = '',
  onView,
  onDemo,
}: {
  game: Game;
  variant: 'hero' | 'compact';
  className?: string;
  onView: () => void;
  onDemo: () => void;
}) {
  const isHero = variant === 'hero';
  const isCardGame = game.category.toLowerCase().includes('card');

  return (
    <article
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(255,91,20,0.35)] ${
        isHero ? 'min-h-[380px] sm:min-h-[440px]' : 'min-h-[220px]'
      } ${className} ${
        isCardGame
          ? 'border-emerald-500/20 hover:border-emerald-400/50'
          : 'border-white/10 hover:border-[#FF5B14]/40'
      } bg-[#0A0D18]`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={game.bannerImage || game.thumbnail || '/assets/ludo_3d_gameplay.jpg'}
          alt={game.title}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/assets/ludo_3d_gameplay.jpg';
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/70 to-[#07090F]/20" />
        {isCardGame && (
          <div className="absolute inset-0 bg-felt-surface opacity-60 mix-blend-overlay" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5B14]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {isHero && (
        <span className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full bg-[#FF5B14] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
          🎲 Flagship
        </span>
      )}
      {isCardGame && !isHero && (
        <span className="absolute top-4 left-4 z-10 text-lg opacity-60">♠</span>
      )}

      <div className={`relative z-10 ${isHero ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-[#FF782D]">
          {game.category}
          {game.multiplayer && ' · Multiplayer'}
        </p>
        <h3
          className={`font-display font-extrabold text-white tracking-tight leading-tight ${
            isHero ? 'mt-2 text-2xl sm:text-3xl lg:text-4xl' : 'mt-1.5 text-xl sm:text-2xl'
          }`}
        >
          {game.title}
        </h3>
        {isHero && (
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed line-clamp-2 max-w-md font-sans">
            {game.shortDescription}
          </p>
        )}

        <div
          className={`flex items-center gap-4 transition-all duration-300 ${
            isHero
              ? 'mt-4 sm:mt-5 opacity-100'
              : 'mt-3 opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={onView}
            className={`inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#FF782D] transition cursor-pointer ${
              isHero ? 'text-sm' : 'text-xs'
            }`}
          >
            <span>View game</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDemo}
            className="text-xs text-neutral-400 hover:text-white transition cursor-pointer"
          >
            Request Demo
          </button>
        </div>

        {isHero && (
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onView}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-[#080B13] text-sm font-bold hover:bg-neutral-100 transition cursor-pointer text-center"
            >
              View details
            </button>
            <button
              type="button"
              onClick={onDemo}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition cursor-pointer text-center"
            >
              Request demo
            </button>
          </div>
        )}
      </div>

      {/* Corner arrow — compact tiles */}
      {!isHero && (
        <button
          type="button"
          onClick={onView}
          aria-label={`View ${game.title}`}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-[#FF5B14] hover:border-[#FF5B14]"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}
    </article>
  );
}
