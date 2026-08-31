import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  Flame, 
  ArrowUpRight, 
  Globe2, 
  Lock 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openConsultationModal } = useAppState();

  return (
    <footer className="relative bg-[#07080D] border-t border-white/10 pt-16 pb-12 overflow-hidden text-gray-400">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#FF5B14]/40 to-transparent" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FF5B14]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pre-Footer Callout Banner */}
        <div className="bg-gradient-to-r from-[#121622] via-[#1A2030] to-[#121622] border border-white/10 rounded-2xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#FF5B14]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>ENTERPRISE GAME ENGINEERING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Ready to build proprietary games your platform can own?
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
                Connect with our technical solution architects to evaluate game mathematics, real-time multiplayer architecture, and custom platform integration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openConsultationModal('B2B Platform Consultation')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('request-demo')}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition cursor-pointer"
              >
                <span>Request Live Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Column Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => navigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5 shadow-md shadow-[#FF5B14]/20">
                <div className="w-full h-full bg-[#0B0D13] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#FF782D]" />
                </div>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                ORENG
              </span>
            </button>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Custom game development for gaming platforms, publishers, and ambitious digital entertainment businesses. High-concurrency multiplayer, stateful room servers, and robust game APIs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF5B14]/50 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72-.77-1.72-1.72-1.72Z"/>
                </svg>
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF5B14]/50 transition"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF5B14]/50 transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2 text-xs font-mono text-gray-500 flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-[#FF782D]" />
              <span>Serving clients across India, SEA, Europe & LATAM</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition cursor-pointer">About Oreng</button>
              </li>
              <li>
                <button onClick={() => navigate('work')} className="hover:text-white transition cursor-pointer">Case Studies & Work</button>
              </li>
              <li>
                <button onClick={() => navigate('technology')} className="hover:text-white transition cursor-pointer">Technology & Architecture</button>
              </li>
              <li>
                <button onClick={() => navigate('process')} className="hover:text-white transition cursor-pointer">Development Process</button>
              </li>
              <li>
                <button onClick={() => navigate('insights')} className="hover:text-white transition cursor-pointer">Insights & Engineering Blog</button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-white transition cursor-pointer">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">Custom Game Development</button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">Real-Time Multiplayer</button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">Game Backend Architecture</button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">API & SSO Integration</button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">White-Label Game Solutions</button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition cursor-pointer">QA & Load Benchmarks</button>
              </li>
            </ul>
          </div>

          {/* Featured Games & Legal */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Featured Games
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <button onClick={() => navigate('game-detail', 'ludo')} className="hover:text-[#FF782D] transition cursor-pointer">Multiplayer Ludo Engine</button>
              </li>
              <li>
                <button onClick={() => navigate('game-detail', 'multiplayer-cards')} className="hover:text-[#FF782D] transition cursor-pointer">Multiplayer Card Engine</button>
              </li>
              <li>
                <button onClick={() => navigate('game-detail', 'crash-multiplier')} className="hover:text-[#FF782D] transition cursor-pointer">Multiplier Curve Engine</button>
              </li>
              <li>
                <button onClick={() => navigate('game-detail', 'strategy-dice-arena')} className="hover:text-[#FF782D] transition cursor-pointer">Strategy Dice Arena</button>
              </li>
              <li>
                <button onClick={() => navigate('games')} className="text-[#FF782D] hover:underline font-medium cursor-pointer">Browse All Games →</button>
              </li>
            </ul>

            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-3">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('legal', 'privacy')} className="hover:text-gray-300 transition cursor-pointer">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => navigate('legal', 'terms')} className="hover:text-gray-300 transition cursor-pointer">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => navigate('legal', 'disclaimer')} className="hover:text-gray-300 transition cursor-pointer">B2B Disclaimer & Compliance</button>
              </li>
              <li>
                <button onClick={() => navigate('legal', 'cookies')} className="hover:text-gray-300 transition cursor-pointer">Cookie Policy</button>
              </li>
            </ul>
          </div>

        </div>

        {/* B2B Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] leading-relaxed text-gray-500">
          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-gray-400 font-medium">B2B Corporate Notice:</strong> Oreng is a business-to-business technology and custom game development company. We engineer proprietary game software, backends, and APIs for licensed platform operators, game publishers, and businesses. Oreng does not offer consumer gaming services, consumer betting, fund deposits, or gambling activities on this website. All game technology is licensed subject to the regulatory laws of the client's operating jurisdiction.
            </p>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Oreng. All Rights Reserved. Built for high-performance gaming platforms.</p>
          <div className="flex items-center gap-4 font-mono">
            <span>Status: <span className="text-emerald-400">All Systems Operational</span></span>
            <span>•</span>
            <button 
              onClick={() => navigate('admin')}
              className="text-gray-500 hover:text-gray-300 transition underline cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
