import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Dices, Spade } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';
import { CardSuitPattern, FeltGlow, GamingDecor } from './GamingDecor';
import { HOME_BG_IMAGES, SectionBgImage } from './SectionBgImage';

const pillars = [
  {
    num: '01',
    title: 'Built for Your Brand',
    description: 'Your logo, colours, and style on every screen — the game looks like it belongs to your company.',
    tags: ['Your Logo', 'Custom Design', 'Your Identity'],
    vibe: 'brand' as const,
  },
  {
    num: '02',
    title: 'Custom Game Rules',
    description: 'Game rules and how it works — built exactly the way you want for your players.',
    tags: ['Your Rules', 'Fair Play', 'Trusted Results'],
    vibe: 'casino' as const,
  },
  {
    num: '03',
    title: 'Play Together Online',
    description: 'Friends and players can join the same game room and play together in real time.',
    tags: ['Online Rooms', 'Quick Matching', 'Live Play'],
    vibe: 'multiplayer' as const,
  },
  {
    num: '04',
    title: 'Easy to Connect',
    description: 'Plugs into your existing app or website — login, payments, and user accounts work smoothly.',
    tags: ['User Login', 'Payments', 'Easy Setup'],
    vibe: 'tech' as const,
  },
  {
    num: '05',
    title: 'Handles Many Players',
    description: 'Built to support lots of players at the same time without slowing down or crashing.',
    tags: ['Fast Server', 'Many Players', 'Always On'],
    vibe: 'tech' as const,
  },
  {
    num: '06',
    title: 'Complete Partner',
    description: 'From your idea to launch and after — we help at every step including testing and support.',
    tags: ['Ludo · Cards · Roulette', 'Testing', 'Support'],
    vibe: 'studio' as const,
  },
];

const pillarBgs = [
  HOME_BG_IMAGES.casino,
  HOME_BG_IMAGES.poker,
  HOME_BG_IMAGES.multiplayer,
  HOME_BG_IMAGES.hero,
  HOME_BG_IMAGES.ludo,
  HOME_BG_IMAGES.roulette,
];

const vibeStyles = {
  brand: {
    panel: 'neon-casino-border border-[#FF5B14]/25',
    glow: 'bg-[#FF5B14]/[0.06]',
    num: 'text-[#FF5B14]/25',
    icon: null,
  },
  casino: {
    panel: 'neon-casino-border border-emerald-500/25 bg-felt-surface',
    glow: '',
    num: 'text-emerald-500/25',
    icon: Spade,
  },
  multiplayer: {
    panel: 'neon-casino-border border-sky-500/20',
    glow: 'bg-sky-500/[0.05]',
    num: 'text-sky-400/25',
    icon: Dices,
  },
  tech: {
    panel: 'neon-casino-border border-violet-500/20',
    glow: 'bg-violet-500/[0.05]',
    num: 'text-violet-400/25',
    icon: null,
  },
  studio: {
    panel: 'neon-casino-border border-amber-500/25',
    glow: 'bg-amber-500/[0.05]',
    num: 'text-amber-400/25',
    icon: null,
  },
};

const AUTO_INTERVAL_MS = 5500;

export const WhyOreng: React.FC = () => {
  const { openConsultationModal } = useAppState();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const current = pillars[active];
  const style = vibeStyles[current.vibe];
  const VibeIcon = style.icon;

  const goTo = useCallback((index: number) => {
    setActive(index);
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % pillars.length);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goTo((active + 1) % pillars.length);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo((active - 1 + pillars.length) % pillars.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#07090F] relative z-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CardSuitPattern />
      <GamingDecor variant="mixed" className="absolute inset-0" />
      <SectionBgImage
        key={active}
        src={pillarBgs[active]}
        opacity={0.16}
        overlay="left"
      />
      {current.vibe === 'casino' && <FeltGlow className="w-[400px] h-[400px] top-0 left-0" />}

      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#FF5B14]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-8 font-display font-black text-[clamp(6rem,18vw,14rem)] leading-none text-white/[0.025] select-none"
      >
        {current.num}
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-neutral-400 mb-4">
              <span className="text-red-400">♥</span>
              <span className="text-white/60">♠</span>
              <span className="text-red-400">♦</span>
              <span className="text-white/60">♣</span>
              <span className="ml-1 text-neutral-500">· Game Making Studio</span>
            </div>

            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
              Why Oreng
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-extrabold text-white tracking-tight leading-[1.1]">
              More than game development.
            </h2>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-500 tabular-nums">
                {current.num} / 06
              </span>
              <div className="flex-1 h-px bg-white/10 relative overflow-hidden rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF5B14] via-amber-400 to-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${((active + 1) / pillars.length) * 100}%` }}
                />
              </div>
            </div>

            <div
              key={animKey}
              className={`relative mt-8 p-6 sm:p-7 rounded-2xl border backdrop-blur-sm animate-fade-slide-in overflow-hidden ${style.panel}`}
            >
              <CardSuitPattern className="opacity-[0.06]" />
              <div className={`absolute inset-0 ${style.glow} pointer-events-none`} />

              <div className="relative flex items-start justify-between gap-4">
                <span className={`font-display text-5xl sm:text-6xl font-black leading-none ${style.num}`}>
                  {current.num}
                </span>
                {VibeIcon && (
                  <VibeIcon className="w-8 h-8 text-emerald-400/40 shrink-0" strokeWidth={1.5} />
                )}
              </div>

              <h3 className="relative mt-2 text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {current.title}
              </h3>
              <p className="relative mt-3 text-sm sm:text-[15px] text-neutral-400 leading-relaxed">
                {current.description}
              </p>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 border border-white/[0.1] bg-black/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openConsultationModal('Game Development Discussion')}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-sm font-bold shadow-lg shadow-[#FF5B14]/20 hover:opacity-95 transition cursor-pointer"
            >
              <span>Talk to our team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative pl-0 sm:pl-2">
            <div
              aria-hidden
              className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[#FF5B14]/50 via-emerald-500/30 to-transparent"
            />

            <ul className="space-y-1">
              {pillars.map((pillar, index) => {
                const isActive = active === index;
                const isCasino = pillar.vibe === 'casino';
                return (
                  <li key={pillar.num}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={`w-full text-left flex items-center gap-4 sm:gap-5 py-4 px-3 sm:px-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? isCasino
                            ? 'bg-emerald-500/[0.08] border border-emerald-500/30'
                            : 'bg-[#FF5B14]/[0.08] border border-[#FF5B14]/25'
                          : 'border border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]'
                      }`}
                    >
                      <span
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold font-mono transition-all duration-300 ${
                          isActive
                            ? isCasino
                              ? 'border-emerald-400 bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                              : 'border-[#FF5B14] bg-[#FF5B14] text-white shadow-[0_0_20px_rgba(255,91,20,0.4)]'
                            : 'border-white/15 bg-[#0E1018] text-neutral-500 group-hover:border-white/30 group-hover:text-neutral-300'
                        }`}
                      >
                        {isCasino && isActive ? '♠' : index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm sm:text-base font-display font-bold tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          {pillar.title}
                        </p>
                        {isActive && (
                          <p className="mt-1 text-xs text-neutral-500 line-clamp-1 sm:hidden">
                            {pillar.description}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <span
                          className={`hidden sm:block w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${
                            isCasino ? 'bg-emerald-400' : 'bg-[#FF5B14]'
                          }`}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
