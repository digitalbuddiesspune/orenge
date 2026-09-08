import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { ArrowLeft, CheckCircle2, Cpu, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { currentSlug, caseStudies, navigate, openConsultationModal } = useAppState();

  const study = caseStudies.find((s) => s.slug === currentSlug) || caseStudies[0];

  return (
    <>
      <SeoMeta
        title={`${study.title} — Case Study | Oreng`}
        description={study.challenge}
        keywords="Case Study, Game Architecture, Scale, Multiplayer Game Development"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Back Button */}
          <div>
            <button
              type="button"
              onClick={() => navigate('work')}
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to All Case Studies</span>
            </button>
          </div>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] font-bold">
                {study.clientName}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{study.clientIndustry}</span>
              <span className="text-gray-500">•</span>
              <span className="text-cyan-400 font-medium">⏱️ {study.timeline}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {study.title}
            </h1>
          </div>

          {/* Cover Hero Banner */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/9] bg-[#101420]">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent" />
          </div>

          {/* Key Results Band */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 rounded-3xl bg-[#101420] border border-white/10 shadow-xl">
            {study.results.map((res, rIdx) => (
              <div key={rIdx} className="text-center p-2">
                <span className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B14] to-[#FF782D] block">
                  {res.metric}
                </span>
                <span className="text-xs text-gray-300 block mt-1 font-medium">
                  {res.label}
                </span>
              </div>
            ))}
          </div>

          {/* Case Study Deep Dive Body */}
          <div className="space-y-6 text-gray-300 text-sm sm:text-base">
            
            {/* 1. The Challenge */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101420] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold font-display text-lg">
                <AlertCircle className="w-5 h-5" />
                <span>1. The Problem</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {study.challenge}
              </p>
            </div>

            {/* 2. The Requirement */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101420] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-lg">
                <Sparkles className="w-5 h-5" />
                <span>2. What Was Needed</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {study.requirement}
              </p>
            </div>

            {/* 3. The Solution & Deliverables */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101420] border border-white/10 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-display text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>3. What Oreng Built &amp; Delivered</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {study.solution}
              </p>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  Key Features Implemented:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.featuresDelivered.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Tech Stack Deployed */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101420] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-lg">
                <Cpu className="w-5 h-5" />
                <span>4. Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-medium text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-center shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Want a similar custom game built for your platform?
            </h2>
            <p className="text-white/90 text-sm max-w-lg mx-auto leading-relaxed">
              Schedule a 30-minute discovery call with our team to discuss your project requirements, features, and timeline.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal(`Build something similar to ${study.title}`)}
                className="px-6 py-3 rounded-xl bg-black text-white hover:bg-black/90 font-bold text-sm shadow-xl transition cursor-pointer flex items-center gap-2"
              >
                <span>Discuss This Game</span>
                <ArrowRight className="w-4 h-4 text-[#FF782D]" />
              </button>
              <button
                type="button"
                onClick={() => navigate('work')}
                className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition cursor-pointer"
              >
                View More Case Studies
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
