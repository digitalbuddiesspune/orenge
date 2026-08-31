import React, { useState } from 'react';
import { 
  Building2, 
  Rocket, 
  Tv, 
  Globe2, 
  Code2, 
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const TargetIndustries: React.FC = () => {
  const { openConsultationModal } = useAppState();
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      icon: Building2,
      title: 'Gaming Platform Operators',
      description: 'Established platforms looking to expand player lifetime value by launching custom proprietary games they own directly.',
      highlights: ['Custom White-Label Engines', 'SSO & Wallet API Drops', 'Anti-Collusion & Telemetry']
    },
    {
      icon: Rocket,
      title: 'Gaming Startups',
      description: 'Founders seeking an elite technical studio to architect their core game loops, mathematics, backend, and launch strategy.',
      highlights: ['Rapid Prototype to Store', 'Deterministic Math & RNG', '100% IP & Code Handover']
    },
    {
      icon: Briefcase,
      title: 'Game Publishers',
      description: 'Publishers requiring dedicated game development pods to build, optimize, and port high-retention titles to new markets.',
      highlights: ['Dedicated Studio Pods', 'Cross-Platform WebGL/Mobile', 'LiveOps Architecture']
    },
    {
      icon: Tv,
      title: 'Entertainment & Media Apps',
      description: 'Consumer apps and media platforms introducing gamified reward loops, live competitions, and multiplayer interactions.',
      highlights: ['Engagement Mini-Games', 'Instant WebGL Embeds', 'Daily Tournaments']
    },
    {
      icon: Code2,
      title: 'Technology Companies',
      description: 'Tech firms requiring specialized outsourced game engineering, WebGL rendering, and low-latency networking capabilities.',
      highlights: ['WebSocket Networking', 'Microservices Backend', 'High-Load Scale Testing']
    },
    {
      icon: Globe2,
      title: 'International Gaming Businesses',
      description: 'Global operators seeking an agile, high-caliber development studio capable of delivering certified multi-currency gaming software.',
      highlights: ['Multi-Language & Currency', 'GLI-19 Certified Logic', 'Single-Tenant Deployment']
    }
  ];

  const current = industries[selectedIndustry];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical 2-Column Ecosystem Layout - NO Repetitive Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Selected Industry Deep-Dive */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BUILT FOR GAMING BUSINESSES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Engineering for Every Stage of Scale.
              </h2>
              <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed font-sans">
                Whether you operate an established enterprise platform with millions of active users or are launching a new entertainment venture, Oreng is your dedicated technical partner.
              </p>
            </div>

            {/* Dynamic Active Segment Highlight Stage */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FF5B14]/15 border border-[#FF5B14]/30 flex items-center justify-center text-[#FF782D]">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                {current.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2.5 text-xs font-mono text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openConsultationModal(current.title)}
                className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#FF5B14]/25 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Borderless Segment Selector Rows */}
          <div className="lg:col-span-7 space-y-2.5">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIndustry(idx)}
                  onMouseEnter={() => setSelectedIndustry(idx)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#141824] border-[#FF5B14]/60 shadow-lg shadow-[#FF5B14]/15 translate-x-2'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#FF5B14] text-white'
                        : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-base font-display font-bold transition ${
                        isSelected ? 'text-white' : 'text-gray-300'
                      }`}>
                        {ind.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-sans line-clamp-1">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-bold transition ${
                    isSelected ? 'text-[#FF782D]' : 'text-gray-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
