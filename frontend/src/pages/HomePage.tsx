import React from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { HeroShowreel } from '../components/home/HeroShowreel';
import { TrustCapabilityStrip } from '../components/home/TrustCapabilityStrip';
import { InteractivePlayground } from '../components/home/InteractivePlayground';
import { WhatWeBuildGrid } from '../components/home/WhatWeBuildGrid';
import { FeaturedGames } from '../components/home/FeaturedGames';
import { WhyOreng } from '../components/home/WhyOreng';
import { InteractiveArchitecture } from '../components/home/InteractiveArchitecture';
import { StudioBehindTheScenes } from '../components/home/StudioBehindTheScenes';
import { TargetIndustries } from '../components/home/TargetIndustries';

export const HomePage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="Oreng — B2B Custom Game Development Company"
        description="Oreng develops custom multiplayer games, card engines, 3D board games, live roulette & crash multipliers for gaming platforms, publishers, and businesses worldwide."
        keywords="B2B Game Development, Custom Game Engine, Multiplayer Ludo, Rummy Engine, Real-time Gaming Backend, Casino Game Studio"
      />

      <div className="bg-[#0B0D13] text-white">
        {/* 1. Hero Section with Live Simulator & Studio Displays */}
        <HeroShowreel />

        {/* 2. Trust & Capability Strip */}
        <TrustCapabilityStrip />

        {/* 3. Live Playable Engine Playground (Dice, Cards, Crash, Roulette) */}
        <InteractivePlayground />

        {/* 4. What We Build Category Matrix */}
        <WhatWeBuildGrid />

        {/* 5. Featured Production Games Showcase */}
        <FeaturedGames />

        {/* 6. Human Studio Behind The Scenes, Team Pods & Verified Reviews */}
        <StudioBehindTheScenes />

        {/* 7. Why Oreng Value Pillars */}
        <WhyOreng />

        {/* 8. Interactive Architecture Pipeline */}
        <InteractiveArchitecture />

        {/* 9. Target Industries & Platforms */}
        <TargetIndustries />
      </div>
    </>
  );
};
