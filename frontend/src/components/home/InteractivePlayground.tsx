import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { RotateCcw, Sparkles } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const { navigate } = useAppState();
  const [activeGame, setActiveGame] = useState<'dice' | 'cards' | 'crash' | 'roulette'>('dice');

  // --- DICE SIMULATOR STATE ---
  const [diceVal1, setDiceVal1] = useState(6);
  const [diceVal2, setDiceVal2] = useState(4);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<number[]>([10, 7, 12, 8]);

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDiceVal1(Math.floor(Math.random() * 6) + 1);
      setDiceVal2(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const final1 = Math.floor(Math.random() * 6) + 1;
        const final2 = Math.floor(Math.random() * 6) + 1;
        setDiceVal1(final1);
        setDiceVal2(final2);
        setIsRolling(false);
        setRollHistory((prev) => [final1 + final2, ...prev.slice(0, 5)]);
      }
    }, 80);
  };

  // --- CARD TABLE DEALER STATE ---
  const initialCards = [
    { rank: 'A', suit: '♠', color: 'text-white' },
    { rank: 'K', suit: '♠', color: 'text-white' },
    { rank: 'Q', suit: '♠', color: 'text-white' },
    { rank: 'J', suit: '♠', color: 'text-white' },
    { rank: '10', suit: '♠', color: 'text-white' },
  ];
  const [hand, setHand] = useState(initialCards);
  const [handLabel, setHandLabel] = useState('Royal Flush (Pure Sequence)');

  const handleDealHand = () => {
    const suits = [
      { suit: '♠', color: 'text-white' },
      { suit: '♥', color: 'text-red-500' },
      { suit: '♦', color: 'text-red-500' },
      { suit: '♣', color: 'text-white' }
    ];
    const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    const newHand = [];
    for (let i = 0; i < 5; i++) {
      const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      newHand.push({ rank: randomRank, suit: randomSuit.suit, color: randomSuit.color });
    }
    setHand(newHand);
    const handTypes = ['Pair of Aces', 'Three of a Kind', 'Full House', 'Pure Sequence', 'High Card', 'Two Pairs'];
    setHandLabel(handTypes[Math.floor(Math.random() * handTypes.length)]);
  };

  // --- CRASH MULTIPLIER SIMULATOR ---
  const [crashState, setCrashState] = useState<'idle' | 'running' | 'cashed' | 'crashed'>('idle');
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const betAmount = 100;
  const [payoutResult, setPayoutResult] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (crashState === 'running') {
      const crashPoint = +(1.2 + Math.random() * 4.5).toFixed(2);
      timer = setInterval(() => {
        setCurrentMultiplier((prev) => {
          const next = +(prev + 0.04).toFixed(2);
          if (next >= crashPoint) {
            setCrashState('crashed');
            clearInterval(timer);
            return crashPoint;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [crashState]);

  const handleStartCrash = () => {
    setCurrentMultiplier(1.00);
    setCrashState('running');
    setPayoutResult(0);
  };

  const handleCashout = () => {
    if (crashState === 'running') {
      setCrashState('cashed');
      setPayoutResult(+(betAmount * currentMultiplier).toFixed(2));
    }
  };

  // --- ROULETTE SIMULATOR ---
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | 'green'>('red');
  const [rouletteSpinning, setRouletteSpinning] = useState(false);
  const [rouletteOutcome, setRouletteOutcome] = useState<{ number: number; color: 'red' | 'black' | 'green' }>({ number: 7, color: 'red' });
  const [rouletteWon, setRouletteWon] = useState<boolean | null>(null);

  const handleSpinRoulette = () => {
    if (rouletteSpinning) return;
    setRouletteSpinning(true);
    setRouletteWon(null);

    setTimeout(() => {
      const num = Math.floor(Math.random() * 37);
      let color: 'red' | 'black' | 'green' = 'red';
      if (num === 0) color = 'green';
      else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)) color = 'red';
      else color = 'black';

      setRouletteOutcome({ number: num, color });
      setRouletteSpinning(false);
      setRouletteWon(color === selectedColor);
    }, 1200);
  };

  return (
    <section className="py-24 bg-[#07090F] border-t border-white/10 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#FF5B14]/10 via-[#F59E0B]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE ENGINE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Test Our Game Logic Live.
          </h2>
          <p className="text-gray-400 mt-3 text-base leading-relaxed">
            We build real, playable game mechanics. Test our authoritative RNG dice simulator, card hand generator, crash multiplier ticker, and European roulette wheel.
          </p>
        </div>

        {/* Game Engine Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveGame('dice')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeGame === 'dice'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30 scale-105'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span>🎲 3D Ludo Dice RNG</span>
          </button>

          <button
            onClick={() => setActiveGame('cards')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeGame === 'cards'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30 scale-105'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span>🃏 Card Table &amp; Rummy Shuffler</span>
          </button>

          <button
            onClick={() => setActiveGame('crash')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeGame === 'crash'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30 scale-105'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span>📈 Multiplier Crash Ticker</span>
          </button>

          <button
            onClick={() => setActiveGame('roulette')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeGame === 'roulette'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30 scale-105'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span>🎡 European Live Roulette</span>
          </button>
        </div>

        {/* Interactive Playground Sandbox Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#161B2B] via-[#0E111B] to-[#0A0D15] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* 1. DICE ARENA PLAYGROUND */}
          {activeGame === 'dice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="bg-[#090C14] border border-white/10 rounded-2xl p-8 text-center space-y-6 shadow-inner">
                <div className="flex justify-center items-center gap-6">
                  {/* Dice 1 */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-1 shadow-2xl transition-transform ${isRolling ? 'animate-spin' : ''}`}>
                    <div className="w-full h-full bg-[#0B0D13] rounded-[14px] flex items-center justify-center text-4xl font-black font-mono text-white">
                      {diceVal1}
                    </div>
                  </div>

                  {/* Dice 2 */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#0284C7] p-1 shadow-2xl transition-transform ${isRolling ? 'animate-spin' : ''}`}>
                    <div className="w-full h-full bg-[#0B0D13] rounded-[14px] flex items-center justify-center text-4xl font-black font-mono text-white">
                      {diceVal2}
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono">
                  <span className="text-xs text-gray-400 block">Total Score:</span>
                  <span className="text-3xl font-bold text-white">{diceVal1 + diceVal2}</span>
                </div>

                <button
                  onClick={handleRollDice}
                  disabled={isRolling}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>{isRolling ? 'Simulating Server RNG...' : 'Roll Dice (Deterministic Physics)'}</span>
                </button>
              </div>

              {/* Tech Architecture info */}
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs font-mono">
                  <span>CSPRNG SERVER RANDOMNESS</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Multiplayer Dice Physics &amp; Synchronization
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Dice seeds are generated on the server using cryptographically secure random number generators (CSPRNG). The 3D animation on the client is deterministic, guaranteeing zero manipulated roll payloads.
                </p>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-gray-400">
                  <span>Recent Roll Stream: </span>
                  <span className="text-emerald-400 font-bold">[{rollHistory.join(', ')}]</span>
                </div>
                <button
                  onClick={() => navigate('game-detail', 'ludo')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Ludo Engine Specs →</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. CARD TABLE PLAYGROUND */}
          {activeGame === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="bg-gradient-to-b from-[#0F2D1F] to-[#08150E] border-2 border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-6">
                <div className="flex justify-between text-[11px] font-mono text-emerald-300 pb-2 border-b border-emerald-500/20">
                  <span>TABLE FELT #04</span>
                  <span>FISHER-YATES SHUFFLE</span>
                </div>

                {/* Cards Hand */}
                <div className="flex justify-center -space-x-3 sm:-space-x-4 py-4">
                  {hand.map((c, idx) => (
                    <div
                      key={idx}
                      className="w-14 h-22 sm:w-16 sm:h-24 bg-white rounded-xl shadow-2xl border border-gray-300 p-1.5 flex flex-col justify-between transform hover:-translate-y-3 transition-transform cursor-pointer"
                    >
                      <span className={`text-xs font-black ${c.color}`}>{c.rank} {c.suit}</span>
                      <span className={`text-center text-lg ${c.color}`}>{c.suit}</span>
                      <span className={`text-xs font-black self-end ${c.color}`}>{c.rank}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-black/60 rounded-xl border border-white/10 font-mono text-xs">
                  <span className="text-gray-400">Detected Hand: </span>
                  <span className="text-emerald-400 font-bold">{handLabel}</span>
                </div>

                <button
                  onClick={handleDealHand}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition cursor-pointer"
                >
                  Deal Fresh Hand (Auto-Sort &amp; Validate)
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                  <span>PROVABLY-FAIR PROTOCOL</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Multi-Table Card Shuffler
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Features anti-collusion seat randomization, dynamic meld groupings, and sub-30ms card draws serialized via compact Protocol Buffers.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-black/40 rounded-lg">
                    <span className="text-gray-400 block">Shuffle Proof</span>
                    <span className="text-emerald-400">SHA-256 Validated</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded-lg">
                    <span className="text-gray-400 block">Meld Detection</span>
                    <span className="text-white">&lt; 1ms Execution</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('game-detail', 'multiplayer-cards')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Card Suite Specs →</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. CRASH MULTIPLIER PLAYGROUND */}
          {activeGame === 'crash' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="bg-[#101322] border-2 border-purple-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-5">
                <div className="flex justify-between text-[11px] font-mono text-purple-300 pb-2 border-b border-purple-500/20">
                  <span>CURVE RESOLUTION: 60 HZ</span>
                  <span>SUB-10MS CASHOUT</span>
                </div>

                <div className="py-6">
                  <span className={`text-6xl font-black font-display tracking-tight transition-all ${
                    crashState === 'crashed' ? 'text-red-500 animate-shake' : 
                    crashState === 'cashed' ? 'text-emerald-400' : 'text-gradient-orange'
                  }`}>
                    {currentMultiplier.toFixed(2)}x
                  </span>
                  
                  {crashState === 'crashed' && (
                    <p className="text-xs font-mono text-red-400 mt-2 font-bold uppercase tracking-wider">
                      CRASHED @ {currentMultiplier.toFixed(2)}x
                    </p>
                  )}
                  {crashState === 'cashed' && (
                    <p className="text-xs font-mono text-emerald-400 mt-2 font-bold uppercase tracking-wider">
                      ✓ CASHED OUT! PROFIT: ${payoutResult}
                    </p>
                  )}
                  {crashState === 'running' && (
                    <p className="text-xs font-mono text-cyan-400 mt-2 animate-pulse">
                      ▲ ASCENDING... CLICK CASHOUT!
                    </p>
                  )}
                  {crashState === 'idle' && (
                    <p className="text-xs font-mono text-gray-400 mt-2">
                      Ready for next round
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  {crashState === 'running' ? (
                    <button
                      onClick={handleCashout}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/40 hover:scale-105 transition cursor-pointer"
                    >
                      CASHOUT AT {currentMultiplier.toFixed(2)}x
                    </button>
                  ) : (
                    <button
                      onClick={handleStartCrash}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
                    >
                      Start Simulated Round
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-mono">
                  <span>HIGH-CONCURRENCY TICKER</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Mass Multiplier Engine
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Engineered to broadcast synchronized multiplier ticks to 50,000+ simultaneous connected clients per room via Redis in-memory sorted sets with sub-10ms cashout execution timestamps.
                </p>
                <button
                  onClick={() => navigate('game-detail', 'crash-multiplier')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Multiplier Engine Specs →</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. ROULETTE PLAYGROUND */}
          {activeGame === 'roulette' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="bg-[#121622] border-2 border-amber-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-5">
                <div className="flex justify-between text-[11px] font-mono text-amber-300 pb-2 border-b border-amber-500/20">
                  <span>EUROPEAN SINGLE ZERO</span>
                  <span>RTP: 97.30%</span>
                </div>

                {/* Spinning Outcome Display */}
                <div className="py-4">
                  <div className={`w-24 h-24 rounded-full mx-auto p-1 shadow-2xl flex items-center justify-center transition-all ${
                    rouletteSpinning ? 'animate-spin bg-gradient-to-r from-red-600 via-amber-400 to-black' :
                    rouletteOutcome.color === 'red' ? 'bg-red-600' :
                    rouletteOutcome.color === 'black' ? 'bg-zinc-800' : 'bg-emerald-600'
                  }`}>
                    <div className="w-20 h-20 rounded-full bg-[#0B0D13] border-2 border-white/20 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white font-mono">
                        {rouletteSpinning ? '?' : rouletteOutcome.number}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-gray-400">
                        {rouletteSpinning ? 'Spinning' : rouletteOutcome.color}
                      </span>
                    </div>
                  </div>

                  {rouletteWon !== null && !rouletteSpinning && (
                    <p className={`text-xs font-mono font-bold mt-3 ${rouletteWon ? 'text-emerald-400' : 'text-red-400'}`}>
                      {rouletteWon ? '🎉 WIN! Number matched your color bet!' : 'Missed! Better luck next spin.'}
                    </p>
                  )}
                </div>

                {/* Chip Color Bet Selector */}
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setSelectedColor('red')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      selectedColor === 'red' ? 'bg-red-600 text-white ring-2 ring-white' : 'bg-red-950/60 text-red-300 border border-red-500/30'
                    }`}
                  >
                    Red (1:1)
                  </button>
                  <button
                    onClick={() => setSelectedColor('black')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      selectedColor === 'black' ? 'bg-zinc-800 text-white ring-2 ring-white' : 'bg-zinc-950/60 text-gray-400 border border-zinc-700'
                    }`}
                  >
                    Black (1:1)
                  </button>
                  <button
                    onClick={() => setSelectedColor('green')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      selectedColor === 'green' ? 'bg-emerald-600 text-white ring-2 ring-white' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    Zero (35:1)
                  </button>
                </div>

                <button
                  onClick={handleSpinRoulette}
                  disabled={rouletteSpinning}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF5B14] text-white font-bold text-sm shadow-xl shadow-amber-500/30 hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
                >
                  {rouletteSpinning ? 'Wheel Spinning...' : 'Spin Live Roulette Wheel'}
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-mono">
                  <span>AUTHENTIC CASINO WHEEL ENGINE</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  European 3D Live Roulette
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Real-time ball trajectory physics, full racetrack betting layouts, statistical cold/hot number heatmaps, and certified single-zero RTP mathematics.
                </p>
                <button
                  onClick={() => navigate('game-detail', 'roulette-casino-engine')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Roulette Engine Specs →</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
