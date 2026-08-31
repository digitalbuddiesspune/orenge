import React from 'react';
import { 
  Building2, 
  Rocket, 
  Tv, 
  Globe2, 
  Code2, 
  Briefcase 
} from 'lucide-react';

export const TargetIndustries: React.FC = () => {
  const industries = [
    {
      icon: Building2,
      title: 'Gaming Platform Operators',
      description: 'Established platforms looking to expand player lifetime value by launching custom proprietary games they own directly.'
    },
    {
      icon: Rocket,
      title: 'Gaming Startups',
      description: 'Founders seeking an elite technical studio to architect their core game loops, mathematics, backend, and launch strategy.'
    },
    {
      icon: Briefcase,
      title: 'Game Publishers',
      description: 'Publishers requiring dedicated game development pods to build, optimize, and port high-retention titles to new markets.'
    },
    {
      icon: Tv,
      title: 'Entertainment & Media Apps',
      description: 'Consumer apps and media platforms introducing gamified reward loops, live competitions, and multiplayer interactions.'
    },
    {
      icon: Code2,
      title: 'Technology Companies',
      description: 'Tech firms requiring specialized outsourced game engineering, WebGL rendering, and low-latency networking capabilities.'
    },
    {
      icon: Globe2,
      title: 'International Gaming Businesses',
      description: 'Global operators seeking an agile, high-caliber development studio capable of delivering certified multi-currency gaming software.'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <span>AUDIENCE &amp; ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Built for Gaming Businesses.
          </h2>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            Whether you operate an established enterprise platform with millions of active users or are launching a new entertainment venture, Oreng is your dedicated engineering partner.
          </p>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-gradient-to-b from-[#121622] to-[#0A0D15] border border-white/10 hover:border-[#FF5B14]/40 transition duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] group-hover:bg-[#FF5B14] group-hover:text-white transition duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-[#FF782D] transition">
                  {ind.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
