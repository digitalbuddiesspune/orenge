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
      title: 'Gaming Platform Owners',
      description: 'Already running a gaming platform? We help you add your own custom games that you fully own and control.',
      highlights: ['Your Own Games', 'Easy to Add', 'Safe & Fair Play']
    },
    {
      icon: Rocket,
      title: 'Gaming Startups',
      description: 'Starting a new gaming business? We build your game, server, and everything you need to launch successfully.',
      highlights: ['Idea to Launch', 'Fair Game Results', 'You Own Everything']
    },
    {
      icon: Briefcase,
      title: 'Game Publishers',
      description: 'Need new games for your portfolio? We build high-quality games that keep players coming back.',
      highlights: ['Dedicated Team', 'Phone & Web Games', 'Easy Updates']
    },
    {
      icon: Tv,
      title: 'Entertainment Apps',
      description: 'Want to add fun games to your app? We create engaging mini-games and live competitions for your users.',
      highlights: ['Fun Mini-Games', 'Works in Any App', 'Daily Events']
    },
    {
      icon: Code2,
      title: 'Technology Companies',
      description: 'Need game development help? We provide expert game building, online play, and server setup.',
      highlights: ['Online Multiplayer', 'Strong Server', 'Tested for Scale']
    },
    {
      icon: Globe2,
      title: 'International Businesses',
      description: 'Running a gaming business globally? We deliver trusted games with multiple languages and currencies.',
      highlights: ['Many Languages', 'Fair & Certified', 'Your Own Setup']
    }
  ];

  const current = industries[selectedIndustry];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHO WE WORK WITH</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Built for Gaming Businesses.
              </h2>
              <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed font-sans">
                Whether you are a big gaming company or just starting out, Oreng is your trusted partner to build great games.
              </p>
            </div>

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
                  <div key={hIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
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

                  <span className={`text-xs font-bold transition ${
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
