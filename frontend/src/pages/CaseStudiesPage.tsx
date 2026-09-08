import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const { caseStudies, navigate, openConsultationModal } = useAppState();

  return (
    <>
      <SeoMeta
        title="Our Work & Portfolio — Real Results for Gaming Platforms | Oreng"
        description="See how Oreng helps gaming platforms and publishers build fast, smooth, and scalable games. Real case studies with proven player growth and zero-lag performance."
        keywords="Game Development Portfolio, Case Studies, Ludo Multiplayer Scale, Card Games Development, Crash Game Engine"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header - Simple & Clear */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROVEN RESULTS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Real Games. Real Players. <br />
              <span className="bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-400 bg-clip-text text-transparent">
                Proven Success Stories.
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              See how we help gaming companies fix lag, handle thousands of players at once, and launch custom multiplayer games on time.
            </p>

            {/* Quick Proof Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm font-semibold text-gray-200">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>100k+ Live Players Handled</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Sub-50ms Fast Speed</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#FF782D]" />
                <span>Zero Wallet/Payment Errors</span>
              </span>
            </div>
          </div>

          {/* Case Studies List */}
          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div
                key={study.id}
                className="rounded-3xl bg-[#101420] border border-white/10 overflow-hidden shadow-2xl hover:border-[#FF5B14]/40 transition-all duration-300 p-6 sm:p-8 lg:p-10 space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Summary & Details */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      {/* Meta pills */}
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FF5B14]/10 text-[#FF782D] font-bold">
                          Project 0{idx + 1}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">{study.clientIndustry}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-cyan-400 font-medium">⏱️ {study.timeline}</span>
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        {study.title}
                      </h2>
                    </div>

                    {/* Challenge & Solution (Simple & Easy to read) */}
                    <div className="space-y-3">
                      {/* The Problem */}
                      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-xs sm:text-sm text-gray-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>The Problem</span>
                        </div>
                        <p className="leading-relaxed text-gray-300">
                          {study.challenge}
                        </p>
                      </div>

                      {/* What We Did */}
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-gray-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>What Oreng Built</span>
                        </div>
                        <p className="leading-relaxed text-gray-300">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Key Results Grid (Numbers that speak) */}
                    <div className="pt-2">
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider block font-bold mb-2">
                        Key Results:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {study.results.map((res, rIdx) => (
                          <div key={rIdx} className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                            <span className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B14] to-[#FF782D] block">
                              {res.metric}
                            </span>
                            <span className="text-[11px] text-gray-300 block mt-0.5 font-medium leading-tight">
                              {res.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {study.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => navigate('case-study-detail', study.slug)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
                      >
                        <span>View Full Story</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openConsultationModal(`Build something similar to ${study.title}`)}
                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer"
                      >
                        Build Something Similar
                      </button>
                    </div>
                  </div>

                  {/* Right: Cover Image */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] group">
                      <img
                        src={study.coverImage || 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80'}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80';
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-gray-200 flex items-center justify-between">
                        <span>Project Status:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Live in Production
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FF5B14] via-[#FF782D] to-amber-500 text-white shadow-2xl text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight">
              Want Similar Results For Your Gaming Platform?
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
              Tell us your game ideas, and our engineering team will build a fast, smooth, and profitable game for you.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal('Case Studies Bottom Banner')}
                className="px-7 py-3.5 rounded-2xl bg-black text-white hover:bg-black/90 font-bold text-sm shadow-xl transition cursor-pointer flex items-center gap-2"
              >
                <span>Request Project Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#FF782D]" />
              </button>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition cursor-pointer"
              >
                Contact Our Team
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
