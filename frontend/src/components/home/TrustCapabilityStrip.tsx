import React from 'react';
import { 
  Gamepad2, 
  Users, 
  Server, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Activity 
} from 'lucide-react';

export const TrustCapabilityStrip: React.FC = () => {
  const capabilities = [
    { label: 'Custom Games', icon: Gamepad2 },
    { label: 'Multiplayer Rooms', icon: Users },
    { label: 'Stateful Backend', icon: Server },
    { label: 'Unified Game APIs', icon: Code2 },
    { label: 'Admin Telemetry', icon: ShieldCheck },
    { label: 'Platform Integration', icon: Layers },
  ];

  const verifiedMetrics = [
    { value: '15+', label: 'Custom Game Engines Built', icon: Gamepad2 },
    { value: '100k+', label: 'Peak CCU Tested & Sustained', icon: Users },
    { value: '< 40ms', label: 'Average Turn Latency', icon: Activity },
    { value: '99.99%', label: 'Production Uptime SLA', icon: ShieldCheck },
  ];

  return (
    <div className="border-y border-white/10 bg-[#080A10] py-8 relative overflow-hidden">
      {/* Capability Marquee / Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Capabilities Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pb-8 border-b border-white/5">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:border-[#FF5B14]/40 transition"
              >
                <Icon className="w-4 h-4 text-[#FF782D]" />
                <span>{cap.label}</span>
              </div>
            );
          })}
        </div>

        {/* Verified Stats Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
          {verifiedMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="text-center group">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF5B14]/10 text-[#FF782D] mb-2 group-hover:scale-110 transition">
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
    </div>
  );
};
