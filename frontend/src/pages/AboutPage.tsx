import React from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { useAppState } from '../contexts/AppStateContext';
import { 
  Flame, 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Globe2 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openConsultationModal } = useAppState();

  const values = [
    {
      icon: ShieldCheck,
      title: '100% Client IP Ownership',
      description: 'We believe platforms should own their technology. We deliver unencumbered source code, proprietary algorithms, and complete licensing independence.'
    },
    {
      icon: Cpu,
      title: 'Engineering Rigor Over Reselling',
      description: 'Oreng is not a middleman reseller. We write compiled Go room servers, custom PixiJS WebGL rendering pipelines, and certified RNG math from the ground up.'
    },
    {
      icon: Users,
      title: 'Player-Centric 60 FPS Polish',
      description: 'Game mechanics must feel tactile and snappy. We obsess over sub-50ms turn synchronization, smooth particle FX, and optimized mobile asset footprints.'
    },
    {
      icon: Globe2,
      title: 'Global Compliance & Security',
      description: 'We adhere to international gaming standards, zero-trust server validation, HMAC transaction signing, and provably fair cryptographic audits.'
    }
  ];

  return (
    <>
      <SeoMeta
        title="About Oreng — Custom B2B Game Engineering Studio"
        description="Learn about Oreng's mission to engineer reliable, scalable, and engaging gaming technology for platforms, publishers, and ambitious businesses worldwide."
        keywords="About Oreng, Game Development Studio, B2B Game Tech Partner, Game Engineering Pod"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>THE ORENG STORY</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              We Build Games Businesses Can Grow With.
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
              Oreng was founded on a simple observation: gaming platforms and publishers are tired of clunky, black-box game engines with hidden fees and zero customization. We set out to build an engineering studio that puts platform operators back in total control.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121622] to-[#0D1019] border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-[#FF782D] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Our Mission</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                To build reliable, scalable, and engaging custom gaming technology for businesses worldwide—empowering platforms with deterministic multiplayer, zero-tamper backends, and 100% intellectual property freedom.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121622] to-[#0D1019] border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Our Vision</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                To become the most trusted global engineering partner for ambitious companies building the next generation of interactive gaming, casual multiplayer, and real-time digital entertainment experiences.
              </p>
            </div>
          </div>

          {/* Development Philosophy & Core Values */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-display font-bold text-white">
                Our Engineering Philosophy
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                The core principles that guide how we architect, test, and ship game code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="p-7 rounded-2xl bg-[#121622] border border-white/10 hover:border-[#FF5B14]/40 transition duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF782D] shrink-0 mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white mb-1.5">{v.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Expertise Pods */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121622] border border-white/10 shadow-2xl mb-16">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono text-[#FF782D] uppercase tracking-wider">Multidisciplinary Engineering</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                A Complete Game Engineering Pod at Your Disposal
              </h2>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                When you partner with Oreng, you get a full team of senior game engineers, mathematics modelers, WebSocket network specialists, and cloud architects.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-lg font-bold text-white block mb-1">Client Engineers</span>
                <span className="text-gray-400">PixiJS, WebGL, React Native</span>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-lg font-bold text-white block mb-1">Server Daemons</span>
                <span className="text-gray-400">Go, Rust, Node.js Cluster</span>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-lg font-bold text-white block mb-1">Math &amp; RNG</span>
                <span className="text-gray-400">SHA-256 Seed Proofs, RTP</span>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-lg font-bold text-white block mb-1">DevOps &amp; QA</span>
                <span className="text-gray-400">AWS ECS, K6 Stress, 24/7 SLA</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="text-center">
            <button
              onClick={() => openConsultationModal('Partner with Oreng')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
            >
              Partner with Oreng Today
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
