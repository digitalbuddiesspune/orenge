import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';
import { BgAccentImage, HOME_BG_IMAGES, SectionBgImage } from './SectionBgImage';

const offerings = [
  {
    title: 'Multiplayer Games',
    description: 'Real-time Ludo, pool, and arena games with room systems, matchmaking, and server-authoritative sync.',
    image: '/assets/multiplayer_games_bg.jpg',
    tags: ['WebSocket', 'Room Lobbies', '2–4 Players'],
  },
  {
    title: 'Card & Table Games',
    description: 'Poker, Rummy, and Teen Patti engines with table UI, game logic, and wallet-ready APIs.',
    image: '/assets/poker_table_gameplay.jpg',
    tags: ['Multi-Table', 'Game Logic', '2–6 Seats'],
  },
  {
    title: 'Board & Casual Games',
    description: 'Branded board-game experiences and lightweight casual titles for mobile and web platforms.',
    image: '/assets/ludo_3d_gameplay.jpg',
    tags: ['Custom Rules', 'White-Label UI', 'Mobile + Web'],
  },
];

export const HomeWhatWeBuild: React.FC = () => {
  const { navigate } = useAppState();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <SectionBgImage src={HOME_BG_IMAGES.multiplayer} opacity={0.14} overlay="right" />
      <BgAccentImage
        src={HOME_BG_IMAGES.poker}
        className="top-10 -left-16 w-72 h-48 hidden lg:block rotate-[-8deg]"
        opacity={0.1}
      />
      <BgAccentImage
        src={HOME_BG_IMAGES.ludo}
        className="bottom-16 -right-12 w-80 h-52 hidden lg:block rotate-[6deg]"
        opacity={0.1}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            Games built around your platform.
          </h2>
          <p className="mt-4 text-[15px] text-neutral-400 leading-relaxed">
            Oreng is a B2B game development studio. We design, build, and deploy custom games and
            gaming technology that your business can own — not rent.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20">
          {offerings.map((item, index) => (
            <div
              key={item.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                index % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <div className="aspect-[16/10] bg-[#12151C]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090A]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className={index % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] text-neutral-500 border-b border-white/10 pb-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => navigate('services')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FF782D] hover:text-white transition cursor-pointer"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
