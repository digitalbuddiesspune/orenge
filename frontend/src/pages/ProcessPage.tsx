import React from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { developmentProcess } from '../data/techData';
import { useAppState } from '../contexts/AppStateContext';
import { GitBranch, CheckCircle2 } from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const { openConsultationModal } = useAppState();

  return (
    <>
      <SeoMeta
        title="Development Process — From Game Concept to Production Launch"
        description="Explore Oreng's 8-step game engineering lifecycle. From requirements discovery, mathematical modeling, and UI/UX to server development, QA load testing, and cloud deployment."
        keywords="Game Development Lifecycle, Game Production Process, GDD, Game Testing QA, Cloud Deployment"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <GitBranch className="w-3.5 h-3.5" />
              <span>STRUCTURED PRODUCTION LIFECYCLE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              From Idea to Global Launch.
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our 8-phase engineering process guarantees transparent milestones, rock-solid mathematical models, and zero launch-day surprises.
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FF5B14] via-white/20 to-[#FF5B14] -translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12 relative z-10">
              {developmentProcess.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-4 sm:gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2">
                      <div className="p-6 sm:p-7 rounded-3xl bg-[#101420] border border-white/10 hover:border-[#FF5B14]/40 transition duration-300 shadow-xl group space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs font-bold">
                            Phase {item.step}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">Step {index + 1} of 8</span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Deliverable: {item.deliverable}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Step Indicator Circle */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A2030] border-2 border-[#FF5B14] shadow-lg shadow-[#FF5B14]/30 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0 z-20">
                      {item.step}
                    </div>

                    {/* Empty spacer for the other half */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-center max-w-3xl mx-auto shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Have a Game Specification in Mind?
            </h2>
            <p className="text-white/90 text-sm max-w-lg mx-auto leading-relaxed">
              Share your target platform, rules, and monetization mechanics. We will deliver a detailed technical scope document and delivery timeline.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => openConsultationModal('New Game Development Project')}
                className="px-7 py-3.5 rounded-2xl bg-black text-white hover:bg-black/90 font-bold text-sm shadow-xl transition cursor-pointer"
              >
                Start Technical Discovery
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
