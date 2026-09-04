import React, { useRef } from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { HeroShowreel } from '../components/home/HeroShowreel';
import { HomeWhatWeBuild } from '../components/home/HomeWhatWeBuild';
import { FeaturedGames } from '../components/home/FeaturedGames';
import { WhyOreng } from '../components/home/WhyOreng';
import { InteractiveArchitecture } from '../components/home/InteractiveArchitecture';
import { TargetIndustries } from '../components/home/TargetIndustries';
import { TrustCapabilityStrip } from '../components/home/TrustCapabilityStrip';
import { BgAccentImage, HOME_BG_IMAGES } from '../components/home/SectionBgImage';
import { HomeInterconnect } from '../components/home/HomeInterconnect';

export const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SeoMeta
        title="Oreng — B2B Custom Game Development Company"
        description="Oreng builds custom online games — Ludo, Rummy, Roulette and more — for gaming platforms and businesses worldwide."
        keywords="B2B Game Development, Custom Game Engine, Multiplayer Ludo, Rummy Engine, Real-time Gaming Backend, Game Development Studio"
      />

      <div ref={pageRef} className="bg-[#07090F] text-white relative overflow-hidden">
        <HomeInterconnect containerRef={pageRef} />

        {/* Ambient background */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-[#FF5B14]/8 via-[#FF782D]/4 to-transparent rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute top-[42%] left-[-10%] w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[65%] right-[-10%] w-[900px] h-[900px] bg-[#FF5B14]/[0.06] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-[85%] left-1/3 w-[800px] h-[700px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden absolute inset-0 z-0">
          <BgAccentImage
            src={HOME_BG_IMAGES.ludo}
            className="top-[55vh] -right-24 w-[520px] h-[300px] hidden md:block"
            opacity={0.07}
          />
          <BgAccentImage
            src={HOME_BG_IMAGES.poker}
            className="top-[95vh] -left-20 w-[480px] h-[280px] hidden md:block rotate-[5deg]"
            opacity={0.06}
          />
          <BgAccentImage
            src={HOME_BG_IMAGES.roulette}
            className="top-[145vh] right-0 w-[440px] h-[260px] hidden lg:block rotate-[-3deg]"
            opacity={0.06}
          />
          <BgAccentImage
            src={HOME_BG_IMAGES.casino}
            className="top-[200vh] -left-16 w-[500px] h-[290px] hidden lg:block"
            opacity={0.05}
          />

          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-display font-black uppercase tracking-[-0.04em] text-white/[0.018] text-[clamp(6rem,22vw,17rem)] leading-none">
              MULTIPLAYER
            </p>
          </div>
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-display font-black uppercase tracking-[-0.04em] text-white/[0.022] text-[clamp(6rem,22vw,18rem)] leading-none">
              ORENG
            </p>
          </div>
          <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-display font-black uppercase tracking-[-0.04em] text-white/[0.018] text-[clamp(6rem,20vw,16rem)] leading-none">
              GAMES
            </p>
          </div>
          <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-display font-black uppercase tracking-[-0.04em] text-white/[0.02] text-[clamp(6rem,22vw,18rem)] leading-none">
              FOR YOU
            </p>
          </div>
        </div>

        <div data-home-section="hero">
          <HeroShowreel />
        </div>

        <div className="relative z-10" data-home-section="build">
          <HomeWhatWeBuild />
        </div>

        <div data-home-section="portfolio">
          <FeaturedGames />
        </div>

        <div data-home-section="why">
          <WhyOreng />
        </div>

        <div data-home-section="architecture">
          <InteractiveArchitecture />
        </div>

        <div data-home-section="industries">
          <TargetIndustries />
        </div>

        <div className="pb-20 relative z-10" data-home-section="trust">
          <TrustCapabilityStrip />
        </div>
      </div>
    </>
  );
};
