import React from 'react';
import { 
  Palette, 
  Cpu, 
  Users, 
  Code2, 
  Server, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const WhyOreng: React.FC = () => {
  const { openConsultationModal } = useAppState();

  const pillars = [
    {
      icon: Palette,
      title: 'Built for Your Brand',
      description: 'Complete UI/UX theming, custom color palettes, sponsor logo integrations, and audio effects customized around your identity.'
    },
    {
      icon: Cpu,
      title: 'Custom Game Logic & RNG',
      description: 'Rules, math curves, and mechanics are developed exactly around your requirements, with certified verifiable randomness.'
    },
    {
      icon: Users,
      title: 'Real-Time Multiplayer',
      description: 'Authoritative server architecture designed for synchronized multiplayer with sub-50ms latency across low-bandwidth networks.'
    },
    {
      icon: Code2,
      title: 'API & SSO Ready',
      description: 'Seamless integration with existing platforms, user authorization, JWT tokens, and idempotent wallet debit/credit hooks.'
    },
    {
      icon: Server,
      title: 'Scalable Cloud Backend',
      description: 'Engineered on microservices with Redis cluster caching and auto-scaling cloud daemons that effortlessly handle 100k+ CCU.'
    },
    {
      icon: ShieldCheck,
      title: 'Complete Development Partner',
      description: 'From initial game design document (GDD) and math simulation to deployment, QA, and 24/7 post-launch SLA support.'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D13] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF5B14]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <span>THE ORENG ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            More Than Game Development.
          </h2>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            We don't just write game code—we build scalable gaming technology ecosystems that you own, control, and monetize.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-b from-[#121622] to-[#0D1019] border border-white/10 p-8 hover:border-[#FF5B14]/40 transition duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] group-hover:bg-gradient-to-tr group-hover:from-[#FF5B14] group-hover:to-[#FF782D] group-hover:text-white transition duration-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                  {pillar.title}
                </h3>

                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={() => openConsultationModal('Custom Architecture Discussion')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-[#FF5B14]/40 transition cursor-pointer"
          >
            <span>Speak with an Oreng Game Architect</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF782D]" />
          </button>
        </div>

      </div>
    </section>
  );
};
