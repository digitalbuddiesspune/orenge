import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { Briefcase, ArrowRight } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const { caseStudies, navigate, openConsultationModal } = useAppState();

  return (
    <>
      <SeoMeta
        title="Portfolio & Case Studies — Proven Enterprise Game Deployments"
        description="Review case studies of high-scale multiplayer game architectures engineered by Oreng. Includes 100k CCU Ludo engine, multi-table card rooms, and high-velocity multiplier platforms."
        keywords="Game Development Portfolio, Case Studies, Ludo Multiplayer Scale, Card Game Engine Integration"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROVEN RESULTS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Our Work &amp; Case Studies.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              Explore how we solved critical throughput, synchronization, and security challenges for enterprise gaming platforms and high-growth startups.
            </p>
          </div>

          {/* Case Studies List */}
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden shadow-2xl hover:border-[#FF5B14]/40 transition duration-300 p-6 sm:p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Summary & Metrics */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono text-gray-400">
                        <span className="text-[#FF782D] font-semibold">{study.clientName}</span>
                        <span>•</span>
                        <span>{study.clientIndustry}</span>
                        <span>•</span>
                        <span className="text-gray-500">{study.timeline}</span>
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        {study.title}
                      </h2>
                    </div>

                    {/* Challenge & Solution snippets */}
                    <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      <p>
                        <strong className="text-red-400 font-mono">The Challenge:</strong> {study.challenge}
                      </p>
                      <p>
                        <strong className="text-emerald-400 font-mono">The Solution:</strong> {study.solution}
                      </p>
                    </div>

                    {/* Key Metrics Results Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {study.results.map((res, rIdx) => (
                        <div key={rIdx} className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                          <span className="text-xl sm:text-2xl font-display font-black text-gradient-orange block">
                            {res.metric}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {study.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => navigate('case-study-detail', study.slug)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openConsultationModal(`Build something similar to ${study.title}`)}
                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-medium text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer"
                      >
                        Build Something Similar
                      </button>
                    </div>
                  </div>

                  {/* Right: Cover Image */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] group">
                      <img
                        src={study.coverImage}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs font-mono text-gray-300">
                        <span>Project Status: <strong className="text-emerald-400">Deployed to Production</strong></span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};
