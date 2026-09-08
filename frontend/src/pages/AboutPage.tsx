import React from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { useAppState } from '../contexts/AppStateContext';
import {
  Flame,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Cpu,
  Globe2,
  Gamepad2,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openConsultationModal, navigate } = useAppState();

  const coreValues = [
    {
      icon: Lock,
      title: '100% Source Code & IP Ownership',
      description: 'You own the game outright. No hidden royalties, no black-box revenue share, and full intellectual property handover.',
      badge: 'Full Ownership',
      badgeColor: 'text-[#FF782D] bg-[#FF5B14]/10 border-[#FF5B14]/30'
    },
    {
      icon: Zap,
      title: 'Sub-50ms Multiplayer Speed',
      description: 'We engineer compiled Go server daemons with binary WebSockets, giving players instant response on mobile networks.',
      badge: 'High Speed',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      icon: ShieldCheck,
      title: '100% Certified Fair RNG Math',
      description: 'Server-side card shuffles and dice rolls backed by verifiable SHA-256 cryptographic hashes for player trust and audit compliance.',
      badge: 'Certified Fair',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      icon: Globe2,
      title: 'Global Multi-Market Ready',
      description: 'Built-in support for multi-currency wallets, instant localization in multiple languages, and regional cloud edge routing.',
      badge: 'Worldwide',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    }
  ];

  const teamDisciplines = [
    {
      title: 'Game Designers & Artists',
      skills: 'PixiJS, Spine 2D, 3D Assets, UI/UX Motion',
      desc: 'Creating tactile, addictive game mechanics with 60 FPS animations and instant loading under 2 seconds.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      icon: Gamepad2
    },
    {
      title: 'Game Server Engineers',
      skills: 'Go (Golang), WebSockets, Protobuf, Redis',
      desc: 'Building ultra-lightweight room servers that synchronize tens of thousands of players with zero lag.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      icon: Cpu
    },
    {
      title: 'Game Mathematicians & RNG',
      skills: 'RTP Math Models, SHA-256 Hash Chains, Anti-Cheat',
      desc: 'Formulating certified random math models, balanced economy loops, and cheat-proof game mechanics.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      icon: Target
    },
    {
      title: 'DevOps & QA Specialists',
      skills: 'AWS Cloud, Kubernetes, 100k Bot Stress Tests',
      desc: 'Stress testing builds with thousands of automated bots and deploying auto-healing cloud clusters.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      icon: Layers
    }
  ];

  return (
    <>
      <SeoMeta
        title="About Oreng — Custom B2B Game Development Studio"
        description="Learn how Oreng builds custom multiplayer games, real-time backend engines, and secure APIs for gaming platforms, publishers, and digital operators worldwide."
        keywords="About Oreng, Game Development Studio, B2B Game Tech Partner, Game Engineering Studio"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
          
          {/* 1. HERO SECTION */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>THE ORENG STORY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              We Build Games That Platforms <br />
              <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-400 bg-clip-text text-transparent">
                Truly Own &amp; Scale.
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Oreng is a specialized game engineering studio. We build custom multiplayer titles, fast game servers, and secure wallet APIs that help operators scale without royalties or technical headaches.
            </p>

            {/* 4 Studio Proof Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-[#101420] border border-white/10 shadow-lg text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B14] to-[#FF782D] block">
                  50+
                </span>
                <span className="text-xs text-gray-300 font-medium block mt-1">Games Launched</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#101420] border border-white/10 shadow-lg text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-cyan-400 block">
                  100k+
                </span>
                <span className="text-xs text-gray-300 font-medium block mt-1">Peak Live Players</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#101420] border border-white/10 shadow-lg text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400 block">
                  99.99%
                </span>
                <span className="text-xs text-gray-300 font-medium block mt-1">Server Uptime</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#101420] border border-white/10 shadow-lg text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-amber-400 block">
                  100%
                </span>
                <span className="text-xs text-gray-300 font-medium block mt-1">IP &amp; Source Code Handover</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openConsultationModal('About Page Hero CTA')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Partner with Oreng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('games')}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm font-semibold transition cursor-pointer flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-[#FF782D]" />
                <span>Explore Our Games</span>
              </button>
            </div>
          </div>

          {/* 2. THE STORY / WHY WE EXIST (IMAGE + CONTENT SPLIT) */}
          <div className="rounded-3xl bg-[#101420] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left text */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Why We Started Oreng</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                  No Middlemen. No Revenue Cuts. <br />
                  <span className="text-[#FF782D]">Just Pure Engineering Excellence.</span>
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Traditional game aggregators lock platforms into rigid monthly revenue-shares, providing black-box games that cannot be customized or audited.
                </p>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Oreng was built to fix this. We are a direct engineering studio. We build games that you own 100%, customized with your branding, rules, and mathematical models, deployed straight into your infrastructure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Royalty Fees</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Rules &amp; Math</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct Senior Engineer Access</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fast 1-Week API Hookup</span>
                  </div>
                </div>
              </div>

              {/* Right image */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] group">
                  <img
                    src="/assets/casino_studio_hero.jpg"
                    alt="Oreng Game Engineering Studio"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs text-gray-200 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#FF782D]" />
                      <span>Oreng Game Tech Lab</span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Engineering high-throughput game engines for international gaming platforms.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. MISSION & VISION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#101420] to-[#0A0D16] border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF782D] border border-orange-500/20 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                To build reliable, scalable, and engaging custom gaming technology for businesses worldwide — empowering platform owners with deterministic multiplayer, cheat-proof game servers, and 100% intellectual property freedom.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#101420] to-[#0A0D16] border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                To be the most trusted global engineering partner for ambitious companies building the next generation of real-money multiplayer games, casual gaming hubs, and high-retention digital entertainment platforms.
              </p>
            </div>
          </div>

          {/* 4. BEHIND THE SCENES: THE MULTIDISCIPLINARY TEAM PODS (WITH IMAGES) */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Our Engineering Pods</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Senior Specialists Behind Every Title
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                When you collaborate with Oreng, you get a full multidisciplinary pod dedicated to designing, programming, and deploying your game.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {teamDisciplines.map((pod, idx) => {
                const Icon = pod.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-[#101420] border border-white/10 overflow-hidden shadow-xl hover:border-[#FF5B14]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    {/* Top Image */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={pod.image}
                        alt={pod.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101420] via-[#101420]/30 to-transparent" />
                      <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FF782D]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 className="text-base font-display font-bold text-white group-hover:text-[#FF782D] transition">
                          {pod.title}
                        </h4>
                        <span className="text-[11px] text-cyan-400 font-semibold block">
                          {pod.skills}
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed pt-1">
                          {pod.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Dedicated Team Pod</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. CORE VALUE COMMITMENTS */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101420] via-[#0A0D16] to-[#07090E] border border-white/10 shadow-2xl space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-xs text-[#FF782D] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Commitments</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Why Operators Choose Oreng
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Engineering principles that ensure your gaming operations run smoothly 24 hours a day, 365 days a year.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[#FF5B14]/40 transition duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${v.badgeColor}`}>
                          {v.badge}
                        </span>
                      </div>

                      <h4 className="text-lg font-display font-bold text-white">
                        {v.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. BOTTOM CTA BANNER */}
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-500 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative max-w-2xl space-y-4 text-left">
              <span className="px-3 py-1 rounded-full bg-black/20 text-white text-xs font-bold uppercase tracking-wider">
                READY TO BUILD YOUR GAME?
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight leading-tight">
                Discuss Your Game Specifications With Our Senior Architects.
              </h2>

              <p className="text-white/90 text-sm leading-relaxed">
                Schedule a 30-minute discovery call to evaluate game mechanics, math models, integration timelines, and ballpark budgets.
              </p>

              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openConsultationModal('About Page Bottom Banner')}
                  className="px-7 py-3.5 rounded-2xl bg-black text-white hover:bg-black/90 font-bold text-sm shadow-xl transition cursor-pointer flex items-center gap-2"
                >
                  <span>Schedule Discovery Session</span>
                  <ArrowRight className="w-4 h-4 text-[#FF782D]" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition cursor-pointer"
                >
                  Contact Engineering Team
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
