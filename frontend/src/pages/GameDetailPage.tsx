import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { 
  Gamepad2, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Server, 
  Code2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const GameDetailPage: React.FC = () => {
  const { currentSlug, getGameBySlug, navigate, openConsultationModal } = useAppState();

  const game = getGameBySlug(currentSlug || 'ludo');

  if (!game) {
    return (
      <div className="pt-40 pb-20 min-h-screen text-center bg-[#0B0D13]">
        <h2 className="text-2xl font-bold text-white">Game Not Found</h2>
        <p className="text-gray-400 mt-2">The requested game specification could not be located.</p>
        <button
          onClick={() => navigate('games')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#FF5B14] text-white font-semibold text-sm cursor-pointer"
        >
          Return to Games Catalog
        </button>
      </div>
    );
  }

  return (
    <>
      <SeoMeta
        title={`${game.title} — Technical Game Specifications`}
        description={game.shortDescription}
        keywords={`${game.title}, ${game.category}, Game Engine, Multiplayer Game Development, B2B Game SDK`}
      />

      <div className="pt-28 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <div className="mb-6">
            <button
              onClick={() => navigate('games')}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Games Catalog</span>
            </button>
          </div>

          {/* Game Hero Banner */}
          <div className="relative rounded-3xl bg-[#121622] border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12 mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5B14]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FF5B14] text-white text-xs font-mono font-bold">
                    {game.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    {game.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">
                    {game.maxPlayers}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                  {game.title}
                </h1>

                <p className="text-base sm:text-lg text-[#FF782D] font-mono leading-relaxed">
                  {game.tagline}
                </p>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {game.fullOverview}
                </p>

                {/* Quick CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => navigate('request-demo')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Request Live Demo</span>
                  </button>

                  <button
                    onClick={() => openConsultationModal(`Customization for ${game.title}`)}
                    className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition cursor-pointer"
                  >
                    Discuss Platform Integration
                  </button>
                </div>
              </div>

              {/* Banner Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <img
                    src={game.bannerImage || game.thumbnail || '/assets/ludo_3d_gameplay.jpg'}
                    alt={game.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/ludo_3d_gameplay.jpg';
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{game.syncLatency}</span>
                    </span>
                    <span>Multiplayer: {game.multiplayer ? 'Yes (Synchronized)' : 'Single / Pass & Play'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Features, Customization & Gameplay */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Gameplay & Mechanics */}
              <div className="p-8 rounded-2xl bg-[#121622] border border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-[#FF782D]" />
                  <span>Gameplay &amp; Mechanics</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {game.gameplaySummary}
                </p>
              </div>

              {/* Engine Features Checklist */}
              <div className="p-8 rounded-2xl bg-[#121622] border border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Engine Features &amp; Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {game.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Possibilities */}
              <div className="p-8 rounded-2xl bg-[#121622] border border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FF782D]" />
                  <span>What Oreng Can Customize for Your Brand</span>
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Every game engine is fully modular. We adapt mechanics, visuals, and rule algorithms to match your platform requirements.
                </p>
                <div className="space-y-2.5">
                  {game.customizationOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5B14] mt-2 shrink-0" />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Integration Points */}
              <div className="p-8 rounded-2xl bg-[#121622] border border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span>Platform &amp; API Integration Points</span>
                </h3>
                <p className="text-xs text-gray-400 mb-4 font-mono">
                  Drop this game into your existing web, iOS, or Android app via our unified API endpoints:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  {game.apiIntegrationPoints.map((api, idx) => (
                    <div key={idx} className="p-3 bg-black/50 rounded-xl border border-white/5 text-gray-300 flex items-center gap-2">
                      <span className="text-[#FF782D]">▶</span>
                      <code>{api}</code>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Platform Availability, Architecture & Admin */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Supported Platforms */}
              <div className="p-6 rounded-2xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Available Platforms
                </h4>
                <div className="space-y-2">
                  {game.platforms.map((plat, idx) => (
                    <div key={idx} className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs text-gray-200">
                      <span>{plat}</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Ready ✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="p-6 rounded-2xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#FF782D]" />
                  <span>Technical Highlights</span>
                </h4>
                <div className="space-y-2.5 text-xs text-gray-300 font-mono">
                  {game.architectureHighlights.map((arch, idx) => (
                    <div key={idx} className="p-2.5 bg-black/40 rounded-xl border border-white/5">
                      {arch}
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Capabilities */}
              <div className="p-6 rounded-2xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Telemetry &amp; Controls</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {game.adminCapabilities.map((admin, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{admin}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sticky Request Demo Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1E2538] to-[#121622] border border-[#FF5B14]/40 shadow-xl text-center space-y-4">
                <h4 className="font-display font-bold text-lg text-white">
                  Want This Game for Your Platform?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Book a private demonstration with our technical team to inspect live room telemetry, turn latency, and API payloads.
                </p>
                <button
                  onClick={() => navigate('request-demo')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
                >
                  Request Game Demo
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
