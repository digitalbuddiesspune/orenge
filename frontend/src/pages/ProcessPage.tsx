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

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <GitBranch className="w-3.5 h-3.5" />
              <span>STRUCTURED PRODUCTION LIFECYCLE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              From Idea to Launch.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              Our 8-phase engineering process guarantees transparent milestones, rock-solid mathematical models, and zero launch-day surprises.
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FF5B14] via-white/20 to-[#FF5B14] -translate-x-1/2" />

            <div className="space-y-12 relative z-10">
              {developmentProcess.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2">
                      <div className="p-7 rounded-2xl bg-[#121622] border border-white/10 hover:border-[#FF5B14]/40 transition duration-300 shadow-xl group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs font-mono font-bold">
                            Phase {item.step}
                          </span>
                          <span className="text-xs font-mono text-gray-500">Step {index + 1} of 8</span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-300 mt-2.5 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-xs font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>Deliverable: {item.deliverable}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Step Indicator Circle */}
                    <div className="w-12 h-12 rounded-full bg-[#1A2030] border-2 border-[#FF5B14] shadow-lg shadow-[#FF5B14]/30 flex items-center justify-center text-white font-mono font-bold text-sm shrink-0 z-20">
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
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#121622] to-[#171C2B] border border-white/10 text-center max-w-3xl mx-auto shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Have a Game Specification in Mind?
            </h2>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              Share your target platform, rules, and monetization mechanics. We will deliver a detailed technical scope document and delivery timeline.
            </p>
            <div className="mt-6">
              <button
                onClick={() => openConsultationModal('New Game Development Project')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
              >
                Initiate Discovery Phase
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
