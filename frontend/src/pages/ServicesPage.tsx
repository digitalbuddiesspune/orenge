import React from 'react';
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
  ArrowUpRight 
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

export const ServicesPage: React.FC = () => {
  const { openConsultationModal } = useAppState();

  return (
    <>
      <SeoMeta
        title="B2B Game Development Services — Custom, Multiplayer, Backend & APIs"
        description="End-to-end B2B game development services by Oreng. From UI/UX and deterministic game engines to real-time multiplayer servers, cloud deployment, and 24/7 SLA maintenance."
        keywords="Game Development Services, Custom Game Studio, Real-time Multiplayer Engineering, Game Backend Development, White-label Game Development"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>END-TO-END CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              End-to-End Game Development.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              Oreng provides a complete engineering pod for platforms looking to launch, scale, and monetize custom gaming intellectual properties.
            </p>
          </div>

          {/* Interactive 10-Service Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {servicesData.map((service, idx) => {
              const Icon = iconMap[service.iconName] || Gamepad2;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[#121622] border border-white/10 p-7 hover:border-[#FF5B14]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] group-hover:bg-[#FF5B14] group-hover:text-white transition duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs font-mono text-[#FF782D] mt-1">
                      {service.tagline}
                    </p>

                    <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">Key Deliverables:</span>
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <button
                      onClick={() => openConsultationModal(service.title)}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#FF5B14] text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Turnkey vs Custom Comparison Callout */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#101420] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-[#FF782D] uppercase tracking-wider">Flexible Engagement Models</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                  White-Label Speed vs Bespoke Proprietary IP
                </h2>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  Need to go live in under 2 weeks? Our turnkey white-label packages let you rebrand battle-tested game engines. Need a category-defining proprietary game that you own 100%? Our custom game studio pod builds to your exact specification.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => openConsultationModal('White-Label Game Licensing')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition cursor-pointer"
                  >
                    Explore White-Label Options
                  </button>
                  <button
                    onClick={() => openConsultationModal('Custom Ground-Up Game Development')}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm font-medium hover:bg-white/10 transition cursor-pointer"
                  >
                    Commission Custom Build
                  </button>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs text-gray-300">
                <div className="flex justify-between border-b border-white/10 pb-2 text-white font-bold">
                  <span>ENGAGEMENT COMPARISON</span>
                  <span className="text-emerald-400">ORENG STUDIO</span>
                </div>
                <div className="flex justify-between">
                  <span>Source Code Handover:</span>
                  <span className="text-white">Included in Custom Builds</span>
                </div>
                <div className="flex justify-between">
                  <span>RNG Certification:</span>
                  <span className="text-emerald-400">Verifiable SHA-256</span>
                </div>
                <div className="flex justify-between">
                  <span>Multiplayer Scalability:</span>
                  <span className="text-white">100k+ CCU Architecture</span>
                </div>
                <div className="flex justify-between">
                  <span>Wallet Integration:</span>
                  <span className="text-[#FF782D]">Zero-Leak Webhook Hooks</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
