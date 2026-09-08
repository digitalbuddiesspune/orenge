import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';
import { BgAccentImage, HOME_BG_IMAGES, SectionBgImage } from './SectionBgImage';

export const HomeWhatWeBuild: React.FC = () => {
  const { navigate, homeAssets } = useAppState();

  const offerings = [
    {
      title: 'Multiplayer Games',
      description: 'Online games like Ludo where friends play together in real time. Private rooms, quick matching, and smooth gameplay.',
      image: homeAssets.whatWeBuild1 || homeAssets.multiplayerBg || '/assets/multiplayer_games_bg.jpg',
      tags: ['Online Play', 'Private Rooms', '2–4 Players'],
    },
    {
      title: 'Card & Table Games',
      description: 'Poker, Rummy, and Teen Patti games with beautiful tables, fair card dealing, and easy setup for your platform.',
      image: homeAssets.whatWeBuild2 || homeAssets.pokerBg || '/assets/poker_table_gameplay.jpg',
      tags: ['Multiple Tables', 'Fair Cards', '2–6 Players'],
    },
    {
      title: 'Board & Casual Games',
      description: 'Fun board games and simple mobile games with your brand name, colours, and custom rules.',
      image: homeAssets.whatWeBuild3 || homeAssets.ludoBg || '/assets/ludo_3d_gameplay.jpg',
      tags: ['Your Branding', 'Custom Rules', 'Mobile + Web'],
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <SectionBgImage src={homeAssets.whatWeBuildBackdrop || homeAssets.multiplayerBg || HOME_BG_IMAGES.multiplayer} opacity={0.14} overlay="right" />
      <BgAccentImage
        src={homeAssets.whatWeBuildBg1 || homeAssets.pokerBg || HOME_BG_IMAGES.poker}
        className="top-10 -left-16 w-72 h-48 hidden lg:block rotate-[-8deg]"
        opacity={0.1}
      />
      <BgAccentImage
        src={homeAssets.whatWeBuildBg2 || homeAssets.ludoBg || HOME_BG_IMAGES.ludo}
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
            Oreng is a game-making company for businesses. We design, build, and launch custom games
            that your company can fully own — not just rent.
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
