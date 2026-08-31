import React from 'react';
import { 
  Gamepad2, 
  Users, 
  Server, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Activity,
  Sparkles
} from 'lucide-react';

export const TrustCapabilityStrip: React.FC = () => {
  const capabilities = [
    { label: 'Custom Games', icon: Gamepad2, color: 'text-[#FF782D]' },
    { label: 'Multiplayer Rooms', icon: Users, color: 'text-amber-400' },
    { label: 'Stateful Backend', icon: Server, color: 'text-emerald-400' },
    { label: 'Unified Game APIs', icon: Code2, color: 'text-sky-400' },
    { label: 'Admin Telemetry', icon: ShieldCheck, color: 'text-purple-400' },
    { label: 'Platform Integration', icon: Layers, color: 'text-pink-400' },
  ];

  const verifiedMetrics = [
    { value: '15+', label: 'Custom Game Engines Built', icon: Gamepad2 },
    { value: '100k+', label: 'Peak CCU Tested & Sustained', icon: Users },
    { value: '< 40ms', label: 'Average Turn Latency', icon: Activity },
    { value: '99.99%', label: 'Production Uptime SLA', icon: ShieldCheck },
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Connected Glass Hub */}
      <div className="relative rounded-3xl bg-[#0F131D]/90 border border-white/15 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5B14] to-transparent opacity-75" />

        {/* 1. Seamless Interconnected Capability Stream */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5B14]/15 border border-[#FF5B14]/30 text-[11px] font-mono text-[#FF782D]">
            <Sparkles className="w-3 h-3" />
            <span className="font-bold">END-TO-END CAPABILITIES</span>
          </div>

          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-medium text-gray-200 hover:text-white hover:border-[#FF5B14]/50 hover:bg-white/[0.08] transition duration-300 shadow-sm"
              >
                <Icon className={`w-4 h-4 ${cap.color}`} />
                <span>{cap.label}</span>
              </div>
            );
          })}
        </div>

        {/* 2. Verified Stats Telemetry Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
          {verifiedMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="relative group">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#FF5B14]/10 border border-[#FF5B14]/20 text-[#FF782D] mb-2 group-hover:scale-110 group-hover:bg-[#FF5B14] group-hover:text-white transition duration-300 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Downward Vertical Flow Rail Connector */}
      <div className="flex justify-center my-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF5B14] to-transparent opacity-60" />
      </div>
    </div>
  );
};

