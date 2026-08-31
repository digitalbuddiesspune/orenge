import React, { useState, useEffect } from 'react';
import { 
  User, 
  Smartphone, 
  Server, 
  Cpu, 
  Database, 
  Code2, 
  ArrowRight, 
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const InteractiveArchitecture: React.FC = () => {
  const { navigate } = useAppState();
  const [activeStep, setActiveStep] = useState<number>(2); // Default on Game Server Daemon

  // Auto-flow along pipeline if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    {
      id: 0,
      title: 'Player Client',
      role: 'Mobile & WebGL Ingress',
      icon: User,
      tech: 'PixiJS / Canvas / React Native',
      details: 'Lightweight client captures user gestures (dice rolls, card moves, bets). Serializes player intentions into compact Protobuf binary frames and dispatches via encrypted WebSocket.',
      security: 'Zero Trust: Client holds NO game state authority or turn resolution logic.',
      codeSnippet: 'message ActionPayload {\n  uint64 match_id = 1;\n  string player_id = 2;\n  uint32 move_action = 3;\n  bytes hmac_token = 4;\n}',
      metric: '< 12ms Input Latency'
    },
    {
      id: 1,
      title: 'Edge Gateway',
      role: 'WebSocket Cluster Ingress',
      icon: Smartphone,
      tech: 'Cloudflare / AWS ALB / TLS 1.3',
      details: 'Terminates TLS connections at edge locations worldwide. Applies layer-7 DDoS shielding, packet rate limiting, and routes connections to regional room clusters.',
      security: 'Strict packet throttling and real-time IP anomaly detection.',
      codeSnippet: 'upstream game_cluster {\n  server 10.0.4.12:8443 max_fails=2;\n  server 10.0.4.15:8443 max_fails=2;\n  keepalive 512;\n}',
      metric: 'DDoS Shielded'
    },
    {
      id: 2,
      title: 'Game Server Daemon',
      role: 'Authoritative Room Core',
      icon: Server,
      tech: 'Golang / Node.js Cluster',
      details: 'Manages live room instances. Verifies turn sequence authorization, enforces countdown clocks, executes disconnect fallbacks, and broadcasts state deltas in sub-35ms.',
      security: 'Authoritative state validation rejecting unauthorized out-of-turn actions.',
      codeSnippet: 'func (r *Room) ExecuteTurn(action *Action) error {\n  if !r.IsActiveTurn(action.PlayerID) {\n    return ErrUnauthorizedTurn\n  }\n  return r.StateEngine.Resolve(action)\n}',
      metric: '60 Hz State Tick'
    },
    {
      id: 3,
      title: 'Game State Engine',
      role: 'Math, CSPRNG & Physics',
      icon: Cpu,
      tech: 'Rust / C++ Micro-Engine / CSPRNG',
      details: 'Executes deterministic game logic, card shuffles (Fisher-Yates SHA-256), multiplier curve ticks, and collision physics. Generates verifiable fairness seeds.',
      security: 'Cryptographically certified RNG seeds with tamper-proof hashing.',
      codeSnippet: 'fn generate_provable_seed(server_seed: &[u8], client_seed: &str, nonce: u64) -> [u8; 32] {\n  let mut hasher = Sha256::new();\n  hasher.update(server_seed);\n  hasher.finalize().into()\n}',
      metric: 'GLI-19 Certified Math'
    },
    {
      id: 4,
      title: 'In-Memory State & DB',
      role: 'Redis Locks & Persistence',
      icon: Database,
      tech: 'Redis Cluster & PostgreSQL',
      details: 'Sub-millisecond Redis distributed locks ensure zero race conditions during simultaneous turns. PostgreSQL transactionally records financial ledgers and replay frames.',
      security: 'ACID-compliant dual-entry bookkeeping with automated backups.',
      codeSnippet: 'SET match:7892:lock "client_392" NX PX 500\nINSERT INTO match_ledgers (match_id, rake_collected, winner_id)\nVALUES ($1, $2, $3) RETURNING tx_id;',
      metric: 'Sub-1ms Atomic Locks'
    },
    {
      id: 5,
      title: 'Platform & Admin APIs',
      role: 'Wallet, SSO & Telemetry',
      icon: Code2,
      tech: 'gRPC / HMAC REST / Webhooks',
      details: 'Seamlessly talks to your host platform for user authentication (JWT SSO), wallet debit/credit settlement, and delivers real-time match telemetry to operations staff.',
      security: 'HMAC SHA-256 signatures with idempotent replay defense.',
      codeSnippet: 'POST /v1/wallet/credit\nAuthorization: Bearer <JWT>\nX-Signature: hmac_sha256(payload, secret)\n{\n  "user_id": "usr_9921",\n  "amount": 250.00\n}',
      metric: 'Idempotent Settlement'
    }
  ];

  const current = nodes[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090F]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#FF5B14]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AUTHORITATIVE ARCHITECTURE PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Technology Behind the Games.
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed font-sans">
            Explore how data, state resolution, and cryptographic RNG execute in under 35ms across our distributed real-time gaming cluster.
          </p>
        </div>

        {/* Continuous Animated Circuit Pipeline Track */}
        <div className="relative mb-12">
          {/* Connecting Circuit Line spanning across all 6 nodes */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-white/10 via-[#FF5B14]/60 to-white/10 z-0">
            {/* Animated Laser Pulse traveling along the line */}
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FF5B14] to-transparent shadow-[0_0_15px_#FF5B14] animate-[pulse_2s_ease-in-out_infinite]" />
          </div>

          {/* 6 Seamless Pipeline Step Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {nodes.map((node) => {
              const Icon = node.icon;
              const isSelected = activeStep === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveStep(node.id)}
                  onMouseEnter={() => setActiveStep(node.id)}
                  className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px] relative backdrop-blur-md border ${
                    isSelected
                      ? 'bg-[#141824] border-[#FF5B14] shadow-[0_0_30px_rgba(255,91,20,0.3)] scale-105 z-20'
                      : 'bg-[#0B0E17]/80 border-white/10 hover:border-white/25 hover:bg-[#101420]'
                  }`}
                >
                  {/* Top: Icon + Node Numeral */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#FF5B14] text-white shadow-lg shadow-[#FF5B14]/40'
                        : 'bg-white/5 text-[#FF782D]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${
                      isSelected ? 'text-[#FF782D]' : 'text-gray-500'
                    }`}>
                      0{node.id + 1}
                    </span>
                  </div>

                  {/* Node Title & Role */}
                  <div>
                    <h4 className={`text-xs sm:text-sm font-display font-bold transition-colors line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {node.title}
                    </h4>
                    <p className="text-[11px] font-mono text-gray-400 mt-0.5 line-clamp-1">
                      {node.role}
                    </p>
                  </div>

                  {/* Active Underline Glow */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#FF5B14] to-transparent shadow-[0_0_10px_#FF5B14]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cinematic Live Architecture Inspector Stage */}
        <div className="relative rounded-3xl bg-[#0C101A]/95 border border-white/15 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5B14]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Deep Node Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5B14] text-white text-xs font-mono font-bold shadow-md">
                  <CurrentIcon className="w-3.5 h-3.5" />
                  <span>Node 0{current.id + 1} — {current.title}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
                  ⚡ {current.metric}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  {current.role}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed font-sans">
                  {current.details}
                </p>
              </div>

              {/* Security & Tech Strip */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{current.security}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                  <span className="text-gray-500">Tech Stack:</span>
                  <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {current.tech}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Real-Time Protocol / Code Telemetry Console */}
            <div className="lg:col-span-5 rounded-2xl bg-black/80 border border-white/15 p-5 font-mono text-xs shadow-inner space-y-4">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-gray-400 text-[10px] ml-1">oreng-cluster-v2.8</span>
                </div>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYNC: ACTIVE
                </span>
              </div>

              {/* Code Snippet Box */}
              <div className="overflow-x-auto text-[11px] text-gray-300 bg-black/50 p-3 rounded-xl border border-white/5 font-mono leading-relaxed max-h-[160px]">
                <pre className="text-cyan-300 whitespace-pre-wrap">{current.codeSnippet}</pre>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-gray-500 block">TICK FREQUENCY</span>
                  <span className="text-white font-bold">60 Hz / 16.6ms</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-gray-500 block">STATE AUTHORITY</span>
                  <span className="text-emerald-400 font-bold">100% Server-Side</span>
                </div>
              </div>

              <button
                onClick={() => navigate('technology')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer border border-white/10"
              >
                <span>View Full Technology Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF782D]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
