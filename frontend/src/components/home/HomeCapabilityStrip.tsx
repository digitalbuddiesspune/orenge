import React from 'react';
import { SuitStrip } from './GamingDecor';
import { HOME_BG_IMAGES, SectionBgImage } from './SectionBgImage';

const items = [
  'Ludo & Board Games',
  'Card & Table Games',
  'Live Casino Engines',
  'Multiplayer Rooms',
  'Wallet APIs',
  'White-Label Launch',
];

export const HomeCapabilityStrip: React.FC = () => (
  <section className="border-y border-white/[0.06] bg-[#08090A] relative overflow-hidden">
    <SectionBgImage src={HOME_BG_IMAGES.casino} opacity={0.1} overlay="full" />
    <div className="absolute inset-0 bg-felt-surface opacity-40 pointer-events-none" />
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 relative z-10">
      <div className="mb-3 opacity-60 scale-75">
        <SuitStrip />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] sm:text-sm">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-5">
            {i > 0 && (
              <span className="hidden sm:inline text-[#FF5B14]/40 text-xs">
                ◆
              </span>
            )}
            <span className="text-neutral-300 font-medium">{item}</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);
