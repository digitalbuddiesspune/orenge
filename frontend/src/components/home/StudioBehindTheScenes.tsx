import React from 'react';
import { 
  Users, 
  Quote, 
  ShieldCheck, 
  Globe2, 
  ArrowUpRight 
} from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const StudioBehindTheScenes: React.FC = () => {
  const { openConsultationModal } = useAppState();

  const studioPods = [
    {
      pod: 'RNG & Game Math Pod',
      lead: 'Vikram Malhotra',
      role: 'Chief Gaming Mathematician (Ex-DeltaX)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      description: 'Calculates mathematical paytables, house edge variance, Fisher-Yates shuffle algorithms, and Monte Carlo probability models.',
      badge: 'Certified RNG'
    },
    {
      pod: 'Multiplayer Infrastructure Pod',
      lead: 'Aarav Nambiar',
      role: 'Head of Distributed Game Systems',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      description: 'Architects sub-40ms Go room daemons, Redis distributed locks, binary Protobuf protocols, and zero-downtime auto-scaling clusters.',
      badge: '100k+ CCU'
    },
    {
      pod: 'Game Art & Spine 2D Pod',
      lead: 'Meera Sen',
      role: 'Principal Game Art Director',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      description: 'Crafts 3D dice physics, custom board skins, casino table felts, skeletal character animations, and particle victory VFX.',
      badge: '60 FPS Canvas'
    },
    {
      pod: 'Security & QA Stress Pod',
      lead: 'David Miller',
      role: 'Lead Security & Load Test Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      description: 'Executes automated 100,000 bot load stress simulations, anti-cheat penetration audits, and HMAC webhook signature testing.',
      badge: 'Zero-Tamper'
    }
  ];

  const clientReviews = [
    {
      quote: "Oreng migrated our legacy card room to their stateful Go engine in under 4 weeks. Our peak concurrent tables jumped 3x with zero server crashes during IPL championship weekend.",
      name: "Rajiv Mukherjee",
      title: "CTO, PlayZen Gaming Network",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      location: "Mumbai, India",
      metrics: "+280% Concurrency Growth"
    },
    {
      quote: "The provably-fair SHA-256 roulette and crash engines gave our platform the exact regulatory transparency required for European compliance. Outstanding engineering.",
      name: "Marcus Vance",
      title: "VP of Product, ApexBet Interactive",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      location: "Valletta, Malta",
      metrics: "Sub-15ms Cashout Latency"
    },
    {
      quote: "We commissioned a bespoke strategy board game. Oreng delivered full source code ownership, clean documentation, and seamless single-sign-on integration with our player wallet.",
      name: "Elena Rostova",
      title: "Head of Gaming, Vortex Entertainment",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      location: "Singapore",
      metrics: "100% Source Code Delivery"
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D13] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Studio Hero Banner with Real Photo */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#101420] to-[#171C2B] border border-white/10 p-6 sm:p-10 lg:p-12 mb-20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>HUMAN-CRAFTED GAME ENGINEERING</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Real Game Engineers. <br />
                <span className="text-gradient-orange">Real Studio Discipline.</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Behind Oreng is a dedicated team of veteran game developers, mathematical modelers, and distributed systems architects who have built games played by millions of daily users.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Ex-AAA &amp; Casual Gaming Leads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>Studios in Pune &amp; Singapore</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openConsultationModal('Studio Engineering Pod Consultation')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center gap-2"
                >
                  <span>Meet Our Engineering Pods</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Studio Workspace Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img
                  src="/assets/casino_studio_hero.jpg"
                  alt="Oreng Game Development Studio"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-gray-300 flex items-center justify-between">
                  <span>📍 Oreng Live Game Technology Lab</span>
                  <span className="text-emerald-400">● Active Pod Session</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specialized Engineering Pods */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Specialized Engineering Pods
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Every client project is assigned a dedicated full-stack pod with specialized expertise in math, graphics, and low-latency networking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioPods.map((pod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121622] border border-white/10 hover:border-[#FF5B14]/40 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={pod.avatar}
                      alt={pod.lead}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#FF5B14]/40 shadow-md"
                    />
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF5B14]/10 text-[#FF782D] text-[10px] font-mono font-bold">
                      {pod.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#FF782D] transition">
                    {pod.lead}
                  </h4>
                  <p className="text-[11px] font-mono text-[#FF782D] mt-0.5">
                    {pod.role}
                  </p>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    {pod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
                  {pod.pod}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic Client Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>VERIFIED OPERATOR REVIEWS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              What Platform Operators Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-gradient-to-b from-[#131725] to-[#0D101A] border border-white/10 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-[#FF782D] opacity-60" />
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                      {rev.metrics}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">
                      {rev.name}
                    </h5>
                    <p className="text-[11px] text-gray-400 font-mono">
                      {rev.title} • <span className="text-emerald-400">{rev.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
