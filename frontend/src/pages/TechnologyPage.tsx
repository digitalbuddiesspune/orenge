import React from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { techCategories } from '../data/techData';
import { InteractiveArchitecture } from '../components/home/InteractiveArchitecture';
import { useAppState } from '../contexts/AppStateContext';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const { openConsultationModal } = useAppState();

  return (
    <>
      <SeoMeta
        title="Technology Stack & Architecture — Real-Time Multiplayer Engines"
        description="Discover the technology behind Oreng games. Authoritative Go & Node.js room daemons, sub-30ms WebSocket Protobuf streams, Redis state caching, and AWS auto-scaling."
        keywords="Game Technology, WebSockets, Go Game Server, PixiJS, Real-time Multiplayer Architecture, Game Database Redis, AWS Game Tech"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>ENGINEERING INTEGRITY</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Technology Behind the Games.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              We establish technical credibility by displaying only technologies genuinely used in our production game engines. Zero fluff, pure engineering rigor.
            </p>
          </div>

          {/* Core Architecture Flowchart */}
          <div className="mb-20">
            <InteractiveArchitecture />
          </div>

          {/* Tech Stack Deep Dive Categories */}
          <div className="space-y-16">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="p-8 sm:p-10 rounded-3xl bg-[#121622] border border-white/10 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {cat.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#FF782D] uppercase tracking-wider">
                    Tier-1 Tech Stack
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#FF5B14]/40 transition duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-[11px] font-mono font-bold">
                            {item.badge}
                          </span>
                        </div>
                        
                        <h3 className="font-display font-bold text-base text-white group-hover:text-[#FF782D] transition">
                          {item.name}
                        </h3>

                        <p className="text-xs font-mono text-gray-400 mt-0.5">
                          {item.role}
                        </p>

                        <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Performance & Security Benchmarks Box */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1F30] via-[#121622] to-[#1A1F30] border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Authoritative RNG &amp; Provable Fairness</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Every card shuffle, dice roll, and multiplier curve seed is cryptographically generated server-side using SHA-256 hash chains, providing mathematically verifiable fairness for audit compliance.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Sub-50ms Turn Synchronization</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Binary Protobuf serialization reduces mobile packet payloads by up to 75%. Combined with regional edge routing, games maintain sub-50ms ping even on congested 3G/4G networks.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF782D] flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Idempotent Wallet Integrity</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Financial transactions (bets, entry credits, payout settlements) are processed via HMAC-signed idempotent webhooks, ensuring zero double-charges or ledger discrepancies.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 text-center">
              <button
                onClick={() => openConsultationModal('Technical Architecture Assessment')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
              >
                Schedule Technical Architecture Review
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
