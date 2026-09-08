import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { servicesData } from '../data/servicesData';
import {
  Gamepad2,
  Users,
  Sparkles,
  Server,
  Code2,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Cloud,
  LifeBuoy,
  Check,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Boxes,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Gamepad2,
  Users,
  Sparkles,
  Server,
  Code2,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Cloud,
  LifeBuoy,
};

type CategoryFilter = 'all' | 'game-dev' | 'multiplayer' | 'api' | 'devops';

const categoryMap: Record<string, CategoryFilter> = {
  'srv-custom-game-dev': 'game-dev',
  'srv-white-label': 'game-dev',
  'srv-ui-ux': 'game-dev',
  'srv-multiplayer': 'multiplayer',
  'srv-backend-dev': 'multiplayer',
  'srv-api-integration': 'api',
  'srv-admin-panel': 'api',
  'srv-qa-testing': 'devops',
  'srv-deployment': 'devops',
  'srv-maintenance': 'devops',
};

const categoryLabels: Record<CategoryFilter, { label: string; count: number; desc: string }> = {
  all: { label: 'All Services', count: 10, desc: 'Complete end-to-end B2B game engineering suite' },
  'game-dev': { label: '🎮 Full-Cycle Game Dev', count: 3, desc: 'Custom 2D/3D games, white-label engines & UI/UX motion' },
  multiplayer: { label: '⚡ Multiplayer & Backend', count: 2, desc: 'Sub-50ms synchronized room engines & authoritative servers' },
  api: { label: '🔌 APIs & Platform Tools', count: 2, desc: 'Wallet hooks, SSO auth, telemetry & real-time admin portal' },
  devops: { label: '🚀 DevOps, QA & SLA', count: 3, desc: 'Cloud infrastructure, 100k CCU stress testing & 24/7 SLA' },
};

const lifecycleSteps = [
  {
    step: '01',
    title: 'GDD & Math Specs',
    subtitle: 'Architecture & Modeling',
    desc: 'We define the Game Design Document, RTP math models, RNG certification blueprints, and interactive UI/UX wireframes.',
    icon: <Sparkles className="w-5 h-5 text-[#FF782D]" />,
  },
  {
    step: '02',
    title: 'Engine & Client Build',
    subtitle: 'WebGL & Canvas 2D/3D',
    desc: 'High-performance rendering client built for 60 FPS on low-end mobile devices with asset bundles under 5MB.',
    icon: <Gamepad2 className="w-5 h-5 text-cyan-400" />,
  },
  {
    step: '03',
    title: 'Authoritative Multiplayer',
    subtitle: 'Deterministic State Netcode',
    desc: 'WebSocket room servers with Protobuf encoding, anti-cheat validation, and sub-50ms global turn synchronization.',
    icon: <Users className="w-5 h-5 text-emerald-400" />,
  },
  {
    step: '04',
    title: 'Wallet & API Integration',
    subtitle: 'Seamless Platform Hooks',
    desc: 'Zero-leak debit/credit wallet webhooks, SSO authentication, and real-time telemetry admin panel configured.',
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
  },
  {
    step: '05',
    title: 'Load Testing & Go-Live',
    subtitle: '100k CCU & 24/7 SLA',
    desc: 'Exhaustive bot simulations, automated cluster autoscaling, and dedicated 24/7 SLA engineering support.',
    icon: <ShieldCheck className="w-5 h-5 text-[#FF782D]" />,
  },
];

const faqs = [
  {
    q: 'Do we receive full source code and intellectual property (IP) rights?',
    a: 'Yes. For all custom game development projects, you receive 100% full source code handover, all design and audio assets, and unencumbered intellectual property ownership. Your platform owns the game outright.',
  },
  {
    q: 'How long does it take to integrate Oreng games into an existing platform?',
    a: 'Our modular REST and Webhook APIs allow standard wallet and SSO integration in under 1 week. For turnkey white-label titles, full rebranding and cloud deployment typically takes 10–14 business days.',
  },
  {
    q: 'How do you guarantee real-time synchronization without cheating?',
    a: 'All core game math, RNG dice/card outcomes, and turn validations execute on our authoritative server. The client only sends player input intentions, making client-side memory tampering or cheating impossible.',
  },
  {
    q: 'Can your multiplayer architecture handle large tournament traffic spikes?',
    a: 'Yes. Our room servers use stateless horizontal autoscaling backed by Redis cluster synchronization and AWS ECS/EKS. We pre-test builds with automated headless bots simulating up to 100,000+ concurrent players.',
  },
  {
    q: 'What post-launch maintenance and SLA support do you provide?',
    a: 'We offer dedicated 24/7 SLA support tiers with guaranteed sub-15 minute response times for critical incidents, continuous OS compatibility updates for iOS/Android, and quarterly engine performance tuning.',
  },
];

export const ServicesPage: React.FC = () => {
  const { openConsultationModal, navigate } = useAppState();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredServices = servicesData.filter((service) => {
    if (activeCategory === 'all') return true;
    return categoryMap[service.id] === activeCategory;
  });

  return (
    <>
      <SeoMeta
        title="B2B Game Development Services — Custom, Multiplayer, Backend & APIs"
        description="End-to-end B2B game development services by Oreng. From UI/UX and deterministic game engines to real-time multiplayer servers, cloud deployment, and 24/7 SLA maintenance."
        keywords="Game Development Services, Custom Game Studio, Real-time Multiplayer Engineering, Game Backend Development, White-label Game Development"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* HERO SECTION */}
          <div className="relative text-center max-w-4xl mx-auto space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5B14]/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono font-semibold tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>ENTERPRISE-GRADE B2B GAME SERVICES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              Game Engineering Services Built for <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-400 bg-clip-text text-transparent">Scale &amp; High Retention.</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We provide a complete engineering pod for gaming platforms, publishers, and ambitious digital businesses — from bespoke multiplayer game development to seamless wallet APIs and 24/7 SLA support.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openConsultationModal('B2B Game Development Services')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Request Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('games')}
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white font-semibold text-sm transition cursor-pointer flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-[#FF782D]" />
                <span>Explore Game Titles</span>
              </button>
            </div>

            {/* Value Highlights Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 text-left">
              <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 text-[#FF782D] mb-1">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">100% OWNERSHIP</span>
                </div>
                <div className="text-white text-sm font-bold">Full Source Code Handover</div>
                <p className="text-[11px] text-gray-400 mt-0.5">Proprietary IP rights included</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">&lt; 45MS LATENCY</span>
                </div>
                <div className="text-white text-sm font-bold">Authoritative Netcode</div>
                <p className="text-[11px] text-gray-400 mt-0.5">Real-time room synchronization</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Code2 className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">1-WEEK INTEGRATION</span>
                </div>
                <div className="text-white text-sm font-bold">Seamless Wallet APIs</div>
                <p className="text-[11px] text-gray-400 mt-0.5">Zero-leak HMAC webhooks</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">99.99% UPTIME SLA</span>
                </div>
                <div className="text-white text-sm font-bold">100k+ CCU Scalability</div>
                <p className="text-[11px] text-gray-400 mt-0.5">Auto-healing cloud clusters</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SERVICES DIRECTORY SECTION */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF782D] uppercase tracking-wider mb-2 font-bold">
                  <Boxes className="w-4 h-4" />
                  <span>Interactive Capabilities Directory</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                  Explore Specialized Service Pillars
                </h2>
                <p className="text-gray-400 text-sm mt-1 max-w-xl">
                  {categoryLabels[activeCategory].desc}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {(Object.keys(categoryLabels) as CategoryFilter[]).map((catKey) => {
                  const info = categoryLabels[catKey];
                  const isActive = activeCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => setActiveCategory(catKey)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/25 font-bold'
                          : 'bg-[#101420] border border-white/10 text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{info.label}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        {info.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, idx) => {
                const Icon = iconMap[service.iconName] || Gamepad2;
                const category = categoryMap[service.id] || 'game-dev';

                return (
                  <div
                    key={service.id}
                    className="rounded-3xl bg-gradient-to-br from-[#101420] to-[#0B0E17] border border-white/10 hover:border-[#FF5B14]/50 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-2xl flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Decorative Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5B14]/5 rounded-full blur-2xl group-hover:bg-[#FF5B14]/15 transition" />

                    <div className="space-y-4">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] group-hover:bg-gradient-to-br group-hover:from-[#FF5B14] group-hover:to-[#FF782D] group-hover:text-white transition duration-300 shadow-md">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
                          0{idx + 1} • {category}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs font-mono text-[#FF782D] mt-1 line-clamp-1">
                          {service.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Deliverables */}
                      <div className="pt-3 border-t border-white/5 space-y-2">
                        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                          Key Deliverables:
                        </span>
                        <div className="space-y-1.5">
                          {service.deliverables.slice(0, 3).map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs Tags */}
                      {service.technicalSpecs && service.technicalSpecs.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {service.technicalSpecs.slice(0, 3).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-gray-300"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="pt-6 mt-6 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => openConsultationModal(service.title)}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#FF5B14] hover:to-[#FF782D] text-gray-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5-STEP DELIVERY LIFECYCLE SECTION */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101420] via-[#0D101A] to-[#07090E] border border-white/10 shadow-2xl space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF782D] uppercase tracking-wider font-bold">
                <Cpu className="w-4 h-4" />
                <span>Predictable, Agile Delivery</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                How We Build &amp; Launch Your Games
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                From initial mathematical game design to zero-downtime production deployment and ongoing 24/7 SLA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {lifecycleSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#FF5B14]/40 transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        {step.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-500">STEP {step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{step.title}</h4>
                      <span className="text-[11px] font-mono text-[#FF782D] block mt-0.5">{step.subtitle}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ENGAGEMENT MODELS COMPARISON MATRIX */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF782D] uppercase tracking-wider font-bold">
                <Layers className="w-4 h-4" />
                <span>Transparent Engagement Models</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Choose the Model That Fits Your Strategy
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Whether you need maximum speed-to-market or complete proprietary ownership, we have a structured model.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Option 1: Turnkey White-Label */}
              <div className="p-7 rounded-3xl bg-[#101420] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                        Fastest Go-To-Market
                      </span>
                      <h3 className="text-xl font-display font-bold text-white mt-2">Turnkey White-Label</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Rebrand battle-tested game engines (Ludo, Card Engines, Dice, Casual) with your logos, custom table tiers, and colors.
                  </p>
                  <div className="space-y-2 pt-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Launch in under 2 weeks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Pre-certified RNG &amp; Tested Logic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Standard Wallet Webhook Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Lower upfront capital investment</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openConsultationModal('Turnkey White-Label Licensing')}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition cursor-pointer"
                >
                  Explore White-Label Titles
                </button>
              </div>

              {/* Option 2: Bespoke Custom Game Dev (Featured) */}
              <div className="p-7 rounded-3xl bg-gradient-to-b from-[#181C2B] to-[#101420] border-2 border-[#FF5B14] shadow-2xl shadow-[#FF5B14]/15 flex flex-col justify-between space-y-6 relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-[11px] font-mono font-bold tracking-wider shadow-md">
                  ★ MOST POPULAR FOR PLATFORMS
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[#FF5B14]/15 border border-[#FF5B14]/30 text-[#FF782D] font-bold">
                      100% Proprietary IP
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mt-2">Bespoke Custom Build</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Commission an original game engineered from scratch to your exact product specifications, rules, math model, and art style.
                  </p>
                  <div className="space-y-2 pt-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF782D] shrink-0" />
                      <span className="text-white font-semibold">100% Full Source Code Handover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF782D] shrink-0" />
                      <span>Custom 2D/3D Art, Spine Motion &amp; SFX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF782D] shrink-0" />
                      <span>Dedicated Authoritative Multiplayer Netcode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FF782D] shrink-0" />
                      <span>Custom Admin Telemetry &amp; Anti-Fraud Dashboard</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openConsultationModal('Custom Ground-Up Game Development')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#FF5B14]/25 transition cursor-pointer"
                >
                  Commission Bespoke Build
                </button>
              </div>

              {/* Option 3: Dedicated Engineering Pod */}
              <div className="p-7 rounded-3xl bg-[#101420] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold">
                      Continuous Roadmap
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-2">Dedicated Studio Pod</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Retain a full multidisciplinary game development pod (Engineers, Math Designers, QA, DevOps) dedicated to your ongoing catalog.
                  </p>
                  <div className="space-y-2 pt-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Continuous title releases &amp; updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Sprint-by-sprint agile delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct Slack/WhatsApp engineer channels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tier-1 24/7 SLA incident management</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openConsultationModal('Dedicated Engineering Pod')}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold transition cursor-pointer"
                >
                  Book Dedicated Pod
                </button>
              </div>
            </div>
          </div>

          {/* FAQ / UNDERSTANDING ACCORDION */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF782D] uppercase tracking-wider font-bold">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl bg-[#101420] border border-white/10 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#FF782D] transition cursor-pointer"
                    >
                      <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FF782D] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM CONSULTATION BANNER */}
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-500 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-black/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
                READY TO BUILD YOUR GAME?
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight leading-tight">
                Discuss Your Game Specifications With an Oreng Solutions Architect.
              </h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Schedule a confidential 30-minute discovery call to evaluate architecture requirements, math models, integration timelines, and ballpark budgets.
              </p>
              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openConsultationModal('Services Page Final Banner')}
                  className="px-7 py-3.5 rounded-2xl bg-black text-white hover:bg-black/90 font-bold text-sm shadow-xl transition cursor-pointer flex items-center gap-2"
                >
                  <span>Book Discovery Call</span>
                  <ArrowRight className="w-4 h-4 text-[#FF782D]" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition cursor-pointer"
                >
                  Submit Project Scope Form
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
