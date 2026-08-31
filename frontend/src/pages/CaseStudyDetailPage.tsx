import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { ArrowLeft, CheckCircle2, Cpu } from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { currentSlug, caseStudies, navigate, openConsultationModal } = useAppState();

  const study = caseStudies.find((s) => s.slug === currentSlug) || caseStudies[0];

  return (
    <>
      <SeoMeta
        title={`${study.title} — Case Study`}
        description={study.challenge}
        keywords="Case Study, Game Architecture, Scale, Multiplayer Game Development"
      />

      <div className="pt-28 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('work')}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Case Studies</span>
            </button>
          </div>

          {/* Article Header */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#FF782D]">
              <span className="px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 font-bold">
                {study.clientName}
              </span>
              <span>•</span>
              <span className="text-gray-400">{study.clientIndustry}</span>
              <span>•</span>
              <span className="text-gray-500">Timeline: {study.timeline}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {study.title}
            </h1>
          </div>

          {/* Cover Hero Banner */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 relative aspect-[16/8]">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />
          </div>

          {/* Key Metrics Band */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-[#121622] border border-white/10 shadow-xl">
            {study.results.map((res, rIdx) => (
              <div key={rIdx} className="text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-gradient-orange block">
                  {res.metric}
                </span>
                <span className="text-xs font-mono text-gray-400 block mt-1">
                  {res.label}
                </span>
              </div>
            ))}
          </div>

          {/* Case Study Deep Dive Body */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-sm sm:text-base">
            
            {/* The Challenge */}
            <div className="p-8 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <span className="text-red-400">01.</span>
                <span>The Client Challenge</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {study.challenge}
              </p>
            </div>

            {/* The Requirement */}
            <div className="p-8 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">02.</span>
                <span>Technical Requirements</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {study.requirement}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-2xl bg-[#121622] border border-white/10 space-y-4">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">03.</span>
                <span>The Oreng Engineering Solution</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {study.solution}
              </p>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">Features Delivered:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {study.featuresDelivered.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Deployed */}
            <div className="p-8 rounded-2xl bg-[#121622] border border-white/10 space-y-4">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#FF782D]" />
                <span>Technologies Deployed</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#121622] to-[#171C2B] border border-white/10 text-center shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Ready to build something similar for your platform?
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
              Connect with Oreng’s systems architects to review your technical specs and launch timeline.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openConsultationModal(`Build something similar to ${study.title}`)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
              >
                Discuss This Architecture
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
