import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

const audiences = [
  'Gaming platform operators',
  'Game publishers',
  'Gaming startups',
  'Entertainment platforms',
  'Technology companies',
  'International operators',
];

export const HomeAudienceCta: React.FC = () => {
  const { navigate, openConsultationModal } = useAppState();

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#0A0C10]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
              Who we work with
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              Built for gaming businesses.
            </h2>
            <ul className="mt-8 space-y-3">
              {audiences.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-[#FF5B14] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-8">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Tell us what you're building. We'll discuss scope, technology, and how Oreng can deliver
              a game your platform can own.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal('B2B Game Development')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-lg shadow-[#FF5B14]/25 hover:opacity-95 transition cursor-pointer"
              >
                <span>Discuss your project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('request-demo')}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/15 text-neutral-300 font-medium text-sm hover:text-white hover:border-white/30 transition cursor-pointer"
              >
                Request demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
