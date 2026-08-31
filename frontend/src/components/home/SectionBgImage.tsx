import React from 'react';

type SectionBgImageProps = {
  src: string;
  alt?: string;
  className?: string;
  opacity?: number;
  /** extra dark gradient for text readability */
  overlay?: 'left' | 'right' | 'bottom' | 'full' | 'none';
};

const overlays = {
  left: 'bg-gradient-to-r from-[#07090F] via-[#07090F]/85 to-transparent',
  right: 'bg-gradient-to-l from-[#07090F] via-[#07090F]/85 to-transparent',
  bottom: 'bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-transparent',
  full: 'bg-[#07090F]/75',
  none: 'bg-[#07090F]/40',
};

export const SectionBgImage: React.FC<SectionBgImageProps> = ({
  src,
  alt = '',
  className = '',
  opacity = 0.18,
  overlay = 'full',
}) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
      style={{ opacity }}
      loading="lazy"
    />
    <div className={`absolute inset-0 ${overlays[overlay]}`} />
  </div>
);

/** Corner / side accent image — smaller, decorative */
export const BgAccentImage: React.FC<{
  src: string;
  className?: string;
  opacity?: number;
}> = ({ src, className = '', opacity = 0.12 }) => (
  <div aria-hidden className={`pointer-events-none absolute overflow-hidden rounded-2xl ${className}`}>
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover"
      style={{ opacity }}
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-[#07090F]/60 to-transparent" />
  </div>
);

export const HOME_BG_IMAGES = {
  hero: '/assets/heroBg.png',
  ludo: '/assets/ludo_3d_gameplay.jpg',
  poker: '/assets/poker_table_gameplay.jpg',
  roulette: '/assets/roulette_engine.jpg',
  multiplayer: '/assets/multiplayer_games_bg.jpg',
  casino: '/assets/casino_studio_hero.jpg',
} as const;
