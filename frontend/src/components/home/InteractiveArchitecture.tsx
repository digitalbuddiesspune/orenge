import React, { useState } from 'react';
import { 
  User, 
  Smartphone, 
  Server, 
  Cpu, 
  Database, 
  Code2, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const InteractiveArchitecture: React.FC = () => {
  const { navigate } = useAppState();
  const [activeStep, setActiveStep] = useState<number>(2); // Default on Game Server

  const nodes = [
    {
      id: 0,
      title: '01. Player Client',
      subtitle: 'Mobile App / WebGL',
      icon: User,
      tech: 'PixiJS / Canvas / React Native',
      details: 'Lightweight client captures user gestures (dice roll, card tap, bet action). Serializes player intention into compact Protobuf binary frames and dispatches via secure WebSocket.',
      security: 'Zero trust: Client holds NO game state authority or turn resolution logic.'
    },
    {
      id: 1,
      title: '02. Edge Gateway',
      subtitle: 'WebSocket Ingress',
      icon: Smartphone,
      tech: 'Cloudflare / AWS ALB / TLS 1.3',
      details: 'Terminates TLS connections at edge locations worldwide. Applies layer-7 DDoS shielding, rate limiting, and routes packet streams to closest regional game room cluster.',
      security: 'Strict packet throttling and IP anomaly detection.'
    },
    {
      id: 2,
      title: '03. Game Server Daemon',
      subtitle: 'Authoritative Room Core',
      icon: Server,
      tech: 'Go (Golang) / Node.js Cluster',
      details: 'Manages live room instances. Verifies turn authorization, enforces timeout countdowns, triggers auto-bot disconnect fallback, and broadcasts synchronized state deltas in < 35ms.',
      security: 'Authoritative state validation rejecting unauthorized out-of-turn actions.'
    },
    {
      id: 3,
      title: '04. Game State Engine',
      subtitle: 'Math, RNG & Rule Logic',
      icon: Cpu,
      tech: 'Rust / C++ Micro-Engine / CSPRNG',
      details: 'Executes deterministic game logic, card shuffles (Fisher-Yates SHA-256), multiplier curve ticks, and collision physics. Generates verifiable fairness seeds.',
      security: 'Cryptographically certified RNG seeds with tamper-proof hashing.'
    },
    {
      id: 4,
      title: '05. In-Memory State & DB',
      subtitle: 'Persistence & Cache',
      icon: Database,
      tech: 'Redis Cluster & PostgreSQL',
      details: 'Sub-millisecond Redis locks ensure zero race conditions during simultaneous turns. PostgreSQL transactionally records financial ledgers, rake, and match replay frames.',
      security: 'ACID-compliant dual-entry bookkeeping with automated backups.'
    },
    {
      id: 5,
      title: '06. Platform & Admin APIs',
      subtitle: 'Wallet, SSO & Telemetry',
      icon: Code2,
      tech: 'gRPC / HMAC REST / Webhooks',
      details: 'Seamlessly talks to your host platform for user authentication (JWT SSO), wallet debit/credit settlement, and delivers real-time match telemetry to operations staff.',
      security: 'HMAC SHA-256 signatures with idempotent replay defense.'
    }
  ];

  return (
    <section className="py-24 bg-[#080A10] border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <span>HIGH-CONCURRENCY ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            How Oreng Games Execute.
          </h2>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            An authoritative, distributed architecture engineered for sub-50ms turn delivery, fraud elimination, and seamless platform integration.
          </p>
        </div>

        {/* Interactive Architecture Flow Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = activeStep === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveStep(node.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border cursor-pointer relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FF5B14]/20 to-[#121622] border-[#FF5B14] shadow-lg shadow-[#FF5B14]/20 scale-105 z-10'
                    : 'bg-[#101420] border-white/10 hover:border-white/20 hover:bg-[#151A2B]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-[#FF782D]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">Node #{node.id + 1}</span>
                </div>
                <h4 className="text-xs font-bold text-white font-display truncate">
                  {node.title.split('. ')[1]}
                </h4>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">
                  {node.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Node Inspector Box */}
        <div className="rounded-2xl bg-[#121622] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5B14]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#FF5B14] text-white text-xs font-mono font-bold">
                  {nodes[activeStep].title}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Tech Stack: <strong className="text-white">{nodes[activeStep].tech}</strong>
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                {nodes[activeStep].subtitle}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {nodes[activeStep].details}
              </p>

              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-start gap-2.5 text-xs text-emerald-400 font-mono">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Security &amp; Integrity: {nodes[activeStep].security}</span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-black/50 p-5 rounded-xl border border-white/10 space-y-3 font-mono text-xs text-gray-400">
              <div className="flex justify-between border-b border-white/10 pb-2 text-white font-bold">
                <span>SYSTEM TELEMETRY</span>
                <span className="text-emerald-400">STATUS: OPTIMAL</span>
              </div>
              <div className="flex justify-between">
                <span>Tick Resolution:</span>
                <span className="text-cyan-400">60 Hz / 16.6ms</span>
              </div>
              <div className="flex justify-between">
                <span>Packet Serialization:</span>
                <span className="text-white">Binary Protobuf</span>
              </div>
              <div className="flex justify-between">
                <span>State Integrity:</span>
                <span className="text-emerald-400">100% Authoritative</span>
              </div>
              <button
                onClick={() => navigate('technology')}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Explore Full Technology Stack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
