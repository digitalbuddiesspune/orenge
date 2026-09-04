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
  const [activeStep, setActiveStep] = useState<number>(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    {
      id: 0,
      title: 'Player App',
      role: 'Where Players Play',
      icon: User,
      tech: 'Mobile App & Website',
      details: 'This is what players see and use — the game screen on their phone or browser. When they tap to roll dice or play a card, the action is sent to our server instantly.',
      security: 'Safe: The player app cannot cheat — all game decisions happen on the server.',
      highlights: ['Works on phone & web', 'Easy to use', 'Instant response'],
      metric: 'Quick Response'
    },
    {
      id: 1,
      title: 'Secure Connection',
      role: 'Safe Online Link',
      icon: Smartphone,
      tech: 'Protected Internet Connection',
      details: 'Keeps the connection between player and server safe and fast. Protects against hackers and handles thousands of players connecting at the same time.',
      security: 'Protected against attacks and unwanted access.',
      highlights: ['Safe connection', 'Works worldwide', 'Handles heavy traffic'],
      metric: 'Fully Protected'
    },
    {
      id: 2,
      title: 'Game Server',
      role: 'Game Control Center',
      icon: Server,
      tech: 'Powerful Game Server',
      details: 'The brain of the game. It manages who plays when, keeps track of scores, handles disconnections, and makes sure every player sees the same game state.',
      security: 'Only valid moves are accepted — cheating is blocked automatically.',
      highlights: ['Manages all rooms', 'Fair turn order', 'Auto reconnect'],
      metric: 'Always Fair'
    },
    {
      id: 3,
      title: 'Game Logic',
      role: 'Rules & Fair Results',
      icon: Cpu,
      tech: 'Trusted Game Engine',
      details: 'Runs the game rules — card shuffling, dice rolls, multiplier numbers. Every result is fair, random, and can be verified so players trust the game.',
      security: 'Fair and random results that cannot be manipulated.',
      highlights: ['Fair card shuffle', 'Random dice', 'Trusted results'],
      metric: '100% Fair Play'
    },
    {
      id: 4,
      title: 'Data Storage',
      role: 'Saves Game History',
      icon: Database,
      tech: 'Fast & Reliable Storage',
      details: 'Stores all game records, player history, and payment details safely. Nothing is lost even if many players play at the same time.',
      security: 'All data is backed up and stored securely.',
      highlights: ['Game history saved', 'Payment records', 'Auto backup'],
      metric: 'Data Always Safe'
    },
    {
      id: 5,
      title: 'Your Platform',
      role: 'Connects to Your App',
      icon: Code2,
      tech: 'Easy Integration',
      details: 'Connects the game to your existing app or website — user login, wallet/payments, and admin dashboard all work together smoothly.',
      security: 'Secure login and payment handling.',
      highlights: ['User login', 'Wallet & payments', 'Admin dashboard'],
      metric: 'Easy to Connect'
    }
  ];

  const current = nodes[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090F]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#FF5B14]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>HOW OUR GAMES WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Technology Behind the Games.
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed font-sans">
            See how a game goes from the player&apos;s screen to the server and back — fast, fair, and safe for everyone.
          </p>
        </div>

        <div className="relative mb-12">
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-white/10 via-[#FF5B14]/60 to-white/10 z-0">
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FF5B14] to-transparent shadow-[0_0_15px_#FF5B14] animate-[pulse_2s_ease-in-out_infinite]" />
          </div>

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
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#FF5B14] text-white shadow-lg shadow-[#FF5B14]/40'
                        : 'bg-white/5 text-[#FF782D]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold ${
                      isSelected ? 'text-[#FF782D]' : 'text-gray-500'
                    }`}>
                      0{node.id + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xs sm:text-sm font-display font-bold transition-colors line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {node.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                      {node.role}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#FF5B14] to-transparent shadow-[0_0_10px_#FF5B14]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-3xl bg-[#0C101A]/95 border border-white/15 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5B14]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5B14] text-white text-xs font-bold shadow-md">
                  <CurrentIcon className="w-3.5 h-3.5" />
                  <span>Step 0{current.id + 1} — {current.title}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400">
                  ✓ {current.metric}
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

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{current.security}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-gray-500">Uses:</span>
                  <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {current.tech}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-black/80 border border-white/15 p-5 text-sm shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white font-bold text-sm">Key Benefits</span>
                <span className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>

              <ul className="space-y-3">
                {current.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-gray-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#FF5B14]/20 border border-[#FF5B14]/40 flex items-center justify-center text-[#FF782D] text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('technology')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer border border-white/10"
              >
                <span>Learn More About Our Technology</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF782D]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
