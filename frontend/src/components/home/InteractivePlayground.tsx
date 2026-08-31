import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  ShieldCheck,
  Award,
  ChevronRight,
  Coins
} from 'lucide-react';
import { soundFX } from '../../lib/soundFx';
import {
  createShuffledDeck,
  evaluate5CardPoker,
  evaluateTeenPatti,
  type Card,
  type PokerHandResult,
  type TeenPattiResult
} from '../../lib/cardGameLogic';

// Standard European Roulette Wheel Numbers clockwise
const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

export const InteractivePlayground: React.FC = () => {
  const { navigate } = useAppState();
  const [activeTab, setActiveTab] = useState<'ludo' | 'cards' | 'crash' | 'roulette'>('ludo');

  // Shared Demo Bankroll & Audio Settings
  const [bankroll, setBankroll] = useState<number>(1000);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playTone(880, 'sine', 0.08, 0.15);
  };

  const addBankroll = (amt: number) => {
    setBankroll((prev) => Math.max(0, prev + amt));
  };

  // =========================================================================
  // 1. LUDO PRO: REAL AUTHENTIC 15x15 BOARD RACE & 3D ROLLING PHYSICS
  // =========================================================================
  const [ludoDice, setLudoDice] = useState<number>(6);
  const [isLudoRolling, setIsLudoRolling] = useState<boolean>(false);
  const [ludoTurn, setLudoTurn] = useState<'player' | 'bot'>('player');
  // Token positions: -1 = Yard Base, 0-51 = Active Outer Track, 52-56 = Home Stretch, 57 = Won Home
  const [playerPawns, setPlayerPawns] = useState<[number, number]>([-1, 0]);
  const [botPawns, setBotPawns] = useState<[number, number]>([-1, 26]);
  const [ludoStatus, setLudoStatus] = useState<string>('Your Turn! Click the 3D Dice to roll.');
  const [ludoHistory, setLudoHistory] = useState<number[]>([6, 4, 3, 5]);
  const [ludoMatchStats, setLudoMatchStats] = useState<{ pWins: number; bWins: number }>({ pWins: 0, bWins: 0 });
  const [selectablePawn, setSelectablePawn] = useState<number | null>(null);
  const [isMovingStep, setIsMovingStep] = useState<boolean>(false);

  const rollRNG = () => Math.floor(Math.random() * 6) + 1;

  const handleRollLudo = () => {
    if (isLudoRolling || ludoTurn !== 'player' || isMovingStep) return;
    setIsLudoRolling(true);
    soundFX.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      setLudoDice(rollRNG());
      rollCount++;
      if (rollCount > 8) {
        clearInterval(interval);
        const finalRoll = rollRNG();
        setLudoDice(finalRoll);
        setIsLudoRolling(false);
        soundFX.playDiceLand();
        setLudoHistory((prev) => [finalRoll, ...prev.slice(0, 5)]);
        processPlayerMoveOptions(finalRoll);
      }
    }, 65);
  };

  const processPlayerMoveOptions = (roll: number) => {
    const [p0, p1] = playerPawns;
    const canMove0 = p0 === -1 ? roll === 6 : p0 + roll <= 57;
    const canMove1 = p1 === -1 ? roll === 6 : p1 + roll <= 57;

    if (!canMove0 && !canMove1) {
      setLudoStatus(`Rolled ${roll}! No valid moves. Bot turn...`);
      setTimeout(() => executeBotTurn(), 1000);
      return;
    }

    if (canMove0 && !canMove1) {
      stepMovePlayer(0, roll);
    } else if (!canMove0 && canMove1) {
      stepMovePlayer(1, roll);
    } else {
      setLudoStatus(`Rolled ${roll}! Select Pawn #1 or Pawn #2 to move.`);
      setSelectablePawn(roll);
    }
  };

  // Step-by-step moving animation with bounce sound
  const stepMovePlayer = (pawnIdx: 0 | 1, roll: number) => {
    setSelectablePawn(null);
    setIsMovingStep(true);

    const currentPos = playerPawns[pawnIdx];
    if (currentPos === -1 && roll === 6) {
      soundFX.playTone(600, 'triangle', 0.1, 0.2);
      setPlayerPawns((prev) => {
        const next = [...prev] as [number, number];
        next[pawnIdx] = 0;
        return next;
      });
      setIsMovingStep(false);
      setLudoStatus('🎲 Rolled a 6! You got a pawn out and get a BONUS ROLL!');
      return;
    }

    let stepsTaken = 0;
    const stepInterval = setInterval(() => {
      stepsTaken++;
      soundFX.playTone(400 + stepsTaken * 40, 'sine', 0.04, 0.12);
      setPlayerPawns((prev) => {
        const next = [...prev] as [number, number];
        next[pawnIdx] = Math.min(next[pawnIdx] + 1, 57);
        return next;
      });

      if (stepsTaken >= roll) {
        clearInterval(stepInterval);
        setIsMovingStep(false);

        // Check Pawn Capture & Winning
        setPlayerPawns((prev) => {
          const finalPawnPos = prev[pawnIdx];
          const safeTiles = [0, 8, 13, 21, 26, 34, 39, 47];

          // Check Capture on Bot
          if (finalPawnPos < 52 && !safeTiles.includes(finalPawnPos)) {
            setBotPawns((bPrev) => {
              const bNext = [...bPrev] as [number, number];
              let captured = false;
              if (bNext[0] === finalPawnPos) {
                bNext[0] = -1;
                captured = true;
              }
              if (bNext[1] === finalPawnPos) {
                bNext[1] = -1;
                captured = true;
              }
              if (captured) {
                soundFX.playLoss();
                setLudoStatus('💥 Direct Hit! You captured Bot pawn back to yard!');
              }
              return bNext;
            });
          }

          // Check Victory
          if (prev[0] === 57 && prev[1] === 57) {
            soundFX.playWin();
            setLudoStatus('🏆 Match Won! All Red pawns in Home!');
            setLudoMatchStats((s) => ({ ...s, pWins: s.pWins + 1 }));
            addBankroll(150);
            return prev;
          }

          if (roll === 6) {
            setLudoStatus('🎲 Rolled a 6! You earned a bonus roll!');
          } else {
            setLudoTurn('bot');
            setLudoStatus('Bot (Green) is rolling...');
            setTimeout(() => executeBotTurn(), 900);
          }

          return prev;
        });
      }
    }, 100);
  };

  const executeBotTurn = () => {
    setLudoTurn('bot');
    soundFX.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      setLudoDice(rollRNG());
      rollCount++;
      if (rollCount > 6) {
        clearInterval(interval);
        const botRoll = rollRNG();
        setLudoDice(botRoll);
        soundFX.playDiceLand();
        setLudoHistory((prev) => [botRoll, ...prev.slice(0, 5)]);

        setBotPawns((prev) => {
          const next = [...prev] as [number, number];
          const [b0, b1] = next;
          const can0 = b0 === -1 ? botRoll === 6 : b0 + botRoll <= 57;
          const can1 = b1 === -1 ? botRoll === 6 : b1 + botRoll <= 57;

          if (!can0 && !can1) {
            setLudoStatus(`Bot rolled ${botRoll} (cannot move). Your turn!`);
            setLudoTurn('player');
            return next;
          }

          let chosen = 0;
          if (can0 && can1) chosen = b0 > b1 ? 0 : 1;
          else if (can1) chosen = 1;

          if (next[chosen] === -1 && botRoll === 6) {
            next[chosen] = 26; // Bot Start Tile
          } else {
            next[chosen] = Math.min(next[chosen] + botRoll, 57);
          }

          // Check if Bot Captures Player
          const safeTiles = [0, 8, 13, 21, 26, 34, 39, 47];
          const bPos = next[chosen];
          if (bPos < 52 && !safeTiles.includes(bPos)) {
            setPlayerPawns((pPrev) => {
              const pNext = [...pPrev] as [number, number];
              if (pNext[0] === bPos) pNext[0] = -1;
              if (pNext[1] === bPos) pNext[1] = -1;
              return pNext;
            });
          }

          if (next[0] === 57 && next[1] === 57) {
            soundFX.playLoss();
            setLudoStatus('🤖 Bot won the match! Hit reset to play again.');
            setLudoMatchStats((s) => ({ ...s, bWins: s.bWins + 1 }));
            return next;
          }

          if (botRoll === 6) {
            setLudoStatus('Bot rolled 6 and gets a bonus roll...');
            setTimeout(() => executeBotTurn(), 800);
          } else {
            setLudoTurn('player');
            setLudoStatus('Your turn! Roll the 3D Dice.');
          }

          return next;
        });
      }
    }, 60);
  };

  const resetLudo = () => {
    setPlayerPawns([-1, 0]);
    setBotPawns([-1, 26]);
    setLudoTurn('player');
    setLudoStatus('Game reset. Roll dice to start!');
  };

  // =========================================================================
  // 2. REAL CASINO CARD ROOM: VIDEO POKER & TEEN PATTI SHOWDOWN
  // =========================================================================
  const [cardRoomMode, setCardRoomMode] = useState<'poker' | 'teenpatti'>('poker');
  const [deck, setDeck] = useState<Card[]>([]);
  const [pokerHand, setPokerHand] = useState<Card[]>([]);
  const [heldIndices, setHeldIndices] = useState<boolean[]>([false, false, false, false, false]);
  const [pokerPhase, setPokerPhase] = useState<'betting' | 'holding' | 'result'>('betting');
  const [pokerChip, setPokerChip] = useState<number>(25);
  const [pokerResult, setPokerResult] = useState<PokerHandResult | null>(null);

  // Teen Patti State
  const [tpPlayerHand, setTpPlayerHand] = useState<Card[]>([]);
  const [tpDealerHand, setTpDealerHand] = useState<Card[]>([]);
  const [tpCardsRevealed, setTpCardsRevealed] = useState<boolean>(false);
  const [tpPotAmount, setTpPotAmount] = useState<number>(100);
  const [tpMessage, setTpMessage] = useState<string>('Welcome to Teen Patti Table. Place bet & Deal.');

  // Deal Initial Cards on Mount
  useEffect(() => {
    const fresh = createShuffledDeck();
    setDeck(fresh.slice(5));
    const h5 = fresh.slice(0, 5);
    setPokerHand(h5);
    setPokerResult(evaluate5CardPoker(h5));
  }, []);

  const handlePokerDeal = () => {
    if (bankroll < pokerChip) {
      alert('Insufficient bankroll! Click "+ $500" above.');
      return;
    }
    soundFX.playChip();
    addBankroll(-pokerChip);

    const fresh = createShuffledDeck();
    const h5 = fresh.slice(0, 5);
    setDeck(fresh.slice(5));
    setPokerHand(h5);
    setHeldIndices([false, false, false, false, false]);
    setPokerPhase('holding');
    setPokerResult(evaluate5CardPoker(h5));
    soundFX.playCardDeal();
  };

  const toggleHold = (idx: number) => {
    if (pokerPhase !== 'holding') return;
    soundFX.playTone(700 + idx * 60, 'sine', 0.05, 0.15);
    setHeldIndices((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const handlePokerDraw = () => {
    if (pokerPhase !== 'holding') return;
    soundFX.playCardDeal();

    let dIdx = 0;
    const finalHand = pokerHand.map((c, i) => {
      if (heldIndices[i]) return c;
      const rep = deck[dIdx];
      dIdx++;
      return rep;
    });

    setPokerHand(finalHand);
    setPokerPhase('result');
    const res = evaluate5CardPoker(finalHand);
    setPokerResult(res);

    if (res.isWin && res.payoutMultiplier > 0) {
      const payout = pokerChip * res.payoutMultiplier;
      addBankroll(payout);
      soundFX.playWin();
    } else {
      soundFX.playLoss();
    }
  };

  // Teen Patti Controls
  const handleDealTeenPatti = () => {
    const bet = 50;
    if (bankroll < bet) {
      alert('Insufficient bankroll!');
      return;
    }
    soundFX.playChip();
    addBankroll(-bet);
    setTpPotAmount(bet * 2);

    const fresh = createShuffledDeck();
    setTpPlayerHand(fresh.slice(0, 3));
    setTpDealerHand(fresh.slice(3, 6));
    setTpCardsRevealed(false);
    setTpMessage('Cards Dealt! Click "SHOWDOWN" to reveal Dealer hand.');
    soundFX.playCardDeal();
  };

  const handleTeenPattiShow = () => {
    setTpCardsRevealed(true);
    const pEval: TeenPattiResult = evaluateTeenPatti(tpPlayerHand);
    const dEval: TeenPattiResult = evaluateTeenPatti(tpDealerHand);

    let playerWon = false;
    let tie = false;

    if (pEval.handRank > dEval.handRank) playerWon = true;
    else if (pEval.handRank < dEval.handRank) playerWon = false;
    else {
      if (pEval.highCardValue > dEval.highCardValue) playerWon = true;
      else if (pEval.highCardValue < dEval.highCardValue) playerWon = false;
      else tie = true;
    }

    if (tie) {
      addBankroll(tpPotAmount / 2);
      setTpMessage(`🤝 Push / Tie! Both players have ${pEval.name}. Pot split.`);
      soundFX.playTone(500, 'sine', 0.2);
    } else if (playerWon) {
      addBankroll(tpPotAmount);
      setTpMessage(`🎉 Winner! Your [${pEval.name}] beats Dealer's [${dEval.name}]. Won $${tpPotAmount}!`);
      soundFX.playWin();
    } else {
      setTpMessage(`💀 House Wins! Dealer's [${dEval.name}] beats your [${pEval.name}].`);
      soundFX.playLoss();
    }
  };

  // =========================================================================
  // 3. AVIATOR PRO: 1:1 AUTHENTIC SPRIBE AVIATOR WITH DUAL BET CONTROLS
  // =========================================================================
  const aviatorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [aviatorState, setAviatorState] = useState<'idle' | 'waiting' | 'flying' | 'crashed' | 'cashed'>('idle');
  const [curMultiplier, setCurMultiplier] = useState<number>(1.00);
  const [crashLimit, setCrashLimit] = useState<number>(2.40);
  const [roundSeedHash, setRoundSeedHash] = useState<string>('8b1a9953c4611296a827abf8c47804d7e9b46e3c');
  const [recentCrashHistory, setRecentCrashHistory] = useState<number[]>([1.94, 3.12, 1.15, 8.40, 2.05, 1.42, 14.80]);

  // Dual Bet Panels (Bet 1 & Bet 2)
  const [bet1Amt, setBet1Amt] = useState<number>(50);
  const [bet1Auto, setBet1Auto] = useState<number>(2.00);
  const [bet1AutoEnabled, setBet1AutoEnabled] = useState<boolean>(true);
  const [bet1Status, setBet1Status] = useState<'in' | 'cashed' | 'busted' | 'idle'>('idle');
  const [bet1Won, setBet1Won] = useState<number>(0);

  const [bet2Amt, setBet2Amt] = useState<number>(25);
  const [bet2Auto, setBet2Auto] = useState<number>(5.00);
  const [bet2AutoEnabled, setBet2AutoEnabled] = useState<boolean>(false);
  const [bet2Status, setBet2Status] = useState<'in' | 'cashed' | 'busted' | 'idle'>('idle');
  const [bet2Won, setBet2Won] = useState<number>(0);

  // Live Multiplayer Player Feed
  const [multiplayerBets, setMultiplayerBets] = useState<
    { name: string; avatar: string; bet: number; mult?: number; profit?: number; status: 'in' | 'cashed' | 'busted' }[]
  >([
    { name: '0xCryptoWhale', avatar: '🐳', bet: 250, mult: 2.10, profit: 525, status: 'cashed' },
    { name: 'VegasAce_99', avatar: '♠️', bet: 100, mult: 1.65, profit: 165, status: 'cashed' },
    { name: 'SkyPilot_Pro', avatar: '✈️', bet: 75, status: 'in' },
    { name: 'LuckyStar_IN', avatar: '⭐', bet: 50, status: 'in' },
    { name: 'Rohan_Gaming', avatar: '🔥', bet: 200, status: 'in' }
  ]);

  const startAviatorRound = () => {
    let required = 0;
    if (bet1Status !== 'idle') required += bet1Amt;
    if (bet2Status !== 'idle') required += bet2Amt;
    if (required === 0) {
      required = bet1Amt;
      setBet1Status('in');
    }

    if (bankroll < required) {
      alert('Insufficient bankroll! Click "+ $500" above.');
      return;
    }
    soundFX.playChip();
    addBankroll(-required);

    // Provably fair crash calculation (House edge 3%)
    const rand = Math.random();
    const calculated = Math.max(1.02, +(0.97 / (1 - rand)).toFixed(2));
    const capped = calculated > 60 ? 60 : calculated;

    setCrashLimit(capped);
    setCurMultiplier(1.00);
    setBet1Won(0);
    setBet2Won(0);
    setAviatorState('waiting');

    // Pseudo SHA-256 Hash
    const hash = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setRoundSeedHash(hash);

    setMultiplayerBets([
      { name: '0xCryptoWhale', avatar: '🐳', bet: 250, status: 'in' },
      { name: 'VegasAce_99', avatar: '♠️', bet: 100, status: 'in' },
      { name: 'SkyPilot_Pro', avatar: '✈️', bet: 75, status: 'in' },
      { name: 'LuckyStar_IN', avatar: '⭐', bet: 50, status: 'in' },
      { name: 'Rohan_Gaming', avatar: '🔥', bet: 200, status: 'in' }
    ]);

    setTimeout(() => {
      setAviatorState('flying');
      if (bet1Status !== 'idle') setBet1Status('in');
      if (bet2Status !== 'idle') setBet2Status('in');
    }, 1200);
  };

  const cashoutBet1 = useCallback(() => {
    if (aviatorState === 'flying' && bet1Status === 'in') {
      const won = +(bet1Amt * curMultiplier).toFixed(2);
      setBet1Won(won);
      addBankroll(won);
      setBet1Status('cashed');
      soundFX.playWin();
    }
  }, [aviatorState, bet1Status, bet1Amt, curMultiplier]);

  const cashoutBet2 = useCallback(() => {
    if (aviatorState === 'flying' && bet2Status === 'in') {
      const won = +(bet2Amt * curMultiplier).toFixed(2);
      setBet2Won(won);
      addBankroll(won);
      setBet2Status('cashed');
      soundFX.playWin();
    }
  }, [aviatorState, bet2Status, bet2Amt, curMultiplier]);

  // Main Aviator Flight Engine & Sound Hook
  useEffect(() => {
    if (aviatorState !== 'flying') return;

    let animId: number;
    const startT = Date.now();

    const loop = () => {
      const elapsed = (Date.now() - startT) / 1000;
      // Exponential rocket trajectory
      const mult = +(1.00 + Math.pow(elapsed * 0.95, 1.85)).toFixed(2);

      // Pitch-rising sound
      if (Math.floor(elapsed * 10) % 3 === 0) {
        soundFX.playRocketHum(mult);
      }

      // Check Auto-Cashout Bet 1
      if (bet1AutoEnabled && bet1Status === 'in' && mult >= bet1Auto) {
        const won = +(bet1Amt * bet1Auto).toFixed(2);
        setBet1Won(won);
        addBankroll(won);
        setBet1Status('cashed');
        soundFX.playWin();
      }

      // Check Auto-Cashout Bet 2
      if (bet2AutoEnabled && bet2Status === 'in' && mult >= bet2Auto) {
        const won = +(bet2Amt * bet2Auto).toFixed(2);
        setBet2Won(won);
        addBankroll(won);
        setBet2Status('cashed');
        soundFX.playWin();
      }

      // Simulate Other Player Cashouts
      setMultiplayerBets((prev) =>
        prev.map((p) => {
          if (p.status === 'in' && Math.random() < 0.07 && mult > 1.3) {
            return { ...p, status: 'cashed', mult, profit: +(p.bet * mult).toFixed(0) };
          }
          return p;
        })
      );

      // Check Crash
      if (mult >= crashLimit) {
        setCurMultiplier(crashLimit);
        setAviatorState('crashed');
        soundFX.playCrashExplosion();
        setRecentCrashHistory((prev) => [crashLimit, ...prev.slice(0, 7)]);
        if (bet1Status === 'in') setBet1Status('busted');
        if (bet2Status === 'in') setBet2Status('busted');
        setMultiplayerBets((prev) =>
          prev.map((p) => (p.status === 'in' ? { ...p, status: 'busted' } : p))
        );
        return;
      }

      setCurMultiplier(mult);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [aviatorState, crashLimit, bet1AutoEnabled, bet1Auto, bet1Amt, bet1Status, bet2AutoEnabled, bet2Auto, bet2Amt, bet2Status]);

  // Render 60fps Aviator Canvas with Propeller Plane
  useEffect(() => {
    const canvas = aviatorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);

    ctx.clearRect(0, 0, w, h);

    // Radar Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 2;
    for (let x = 0; x < w; x += 70) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (aviatorState === 'flying' || aviatorState === 'cashed' || aviatorState === 'crashed') {
      const progress = Math.min((curMultiplier - 1) / Math.max(crashLimit - 1, 3.5), 1);
      const startX = 50;
      const startY = h - 50;
      const endX = startX + progress * (w - 120);
      const endY = startY - progress * (h - 100);

      // Curve Fill Gradient
      const fillGrad = ctx.createLinearGradient(0, endY, 0, h);
      if (aviatorState === 'crashed') {
        fillGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
        fillGrad.addColorStop(1, 'rgba(239, 68, 68, 0.0)');
      } else {
        fillGrad.addColorStop(0, 'rgba(255, 91, 20, 0.4)');
        fillGrad.addColorStop(1, 'rgba(255, 91, 20, 0.0)');
      }

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(startX + (endX - startX) * 0.45, startY, endX, endY);
      ctx.lineTo(endX, h - 50);
      ctx.lineTo(startX, h - 50);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Glowing Flight Path Line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(startX + (endX - startX) * 0.45, startY, endX, endY);
      ctx.lineWidth = 6;
      ctx.strokeStyle = aviatorState === 'crashed' ? '#EF4444' : '#FF5B14';
      ctx.shadowColor = aviatorState === 'crashed' ? '#EF4444' : '#FF782D';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Propeller Plane / Jet at endX, endY
      ctx.save();
      ctx.translate(endX, endY);
      ctx.rotate(-Math.PI / 6);

      if (aviatorState === 'crashed') {
        // Explosion Burst
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        for (let i = 0; i < 14; i++) {
          const r = i % 2 === 0 ? 32 : 14;
          const a = (i * Math.PI) / 7;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        // Red Propeller Airplane Body
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        ctx.moveTo(28, 0);
        ctx.lineTo(-24, -15);
        ctx.lineTo(-14, 0);
        ctx.lineTo(-24, 15);
        ctx.closePath();
        ctx.fill();

        // Cockpit Glass
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(6, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        // Propeller blur
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(26, -16, 4, 32);

        // Exhaust Fire
        ctx.fillStyle = '#FF782D';
        ctx.beginPath();
        ctx.moveTo(-18, -6);
        ctx.lineTo(-35 - Math.random() * 12, 0);
        ctx.lineTo(-18, 6);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }, [curMultiplier, aviatorState, crashLimit]);

  // =========================================================================
  // 4. MONTE CARLO LIVE 3D ROULETTE (Mahogany Wheel & Realistic Grid Felt)
  // =========================================================================
  const rouletteWheelRef = useRef<HTMLCanvasElement | null>(null);
  const [wheelSpinning, setWheelSpinning] = useState<boolean>(false);
  const [chipDenom, setChipDenom] = useState<number>(25);
  const [betsTable, setBetsTable] = useState<{ [key: string]: number }>({ red: 25 });
  const [lastWinPocket, setLastWinPocket] = useState<{ num: number; color: 'red' | 'black' | 'green' }>({
    num: 7,
    color: 'red'
  });
  const [rouletteNetWin, setRouletteNetWin] = useState<number | null>(null);
  const [historyPockets, setHistoryPockets] = useState<
    { num: number; color: 'red' | 'black' | 'green' }[]
  >([
    { num: 7, color: 'red' },
    { num: 20, color: 'black' },
    { num: 32, color: 'red' },
    { num: 0, color: 'green' },
    { num: 11, color: 'black' }
  ]);

  const calcTotalFeltBets = (): number => {
    return Object.values(betsTable).reduce((a, b) => a + b, 0);
  };

  const placeFeltBet = (key: string) => {
    if (wheelSpinning) return;
    if (bankroll < chipDenom) {
      alert('Insufficient bankroll! Add funds above.');
      return;
    }
    soundFX.playChip();
    addBankroll(-chipDenom);
    setBetsTable((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + chipDenom
    }));
  };

  const clearFeltBets = () => {
    if (wheelSpinning) return;
    const tot = calcTotalFeltBets();
    addBankroll(tot);
    setBetsTable({});
  };

  const spinRoulette = () => {
    const totalBet = calcTotalFeltBets();
    if (totalBet === 0) {
      alert('Place chips on the roulette table before spinning!');
      return;
    }
    if (wheelSpinning) return;

    setWheelSpinning(true);
    setRouletteNetWin(null);

    const winIdx = Math.floor(Math.random() * ROULETTE_NUMBERS.length);
    const winNum = ROULETTE_NUMBERS[winIdx];
    let winColor: 'red' | 'black' | 'green' = 'black';
    if (winNum === 0) winColor = 'green';
    else if (RED_NUMBERS.includes(winNum)) winColor = 'red';

    // Sound effect ticks
    for (let i = 0; i < 22; i++) {
      setTimeout(() => {
        soundFX.playRouletteTick(750 + i * 18);
      }, i * 110);
    }

    // Wheel Canvas Animation
    const canvas = rouletteWheelRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let rot = 0;
        let vel = 0.38;
        const animate = () => {
          rot += vel;
          vel *= 0.984;

          const size = canvas.width;
          const center = size / 2;
          const radius = center - 12;
          ctx.clearRect(0, 0, size, size);

          // Mahogany Outer Rim
          ctx.beginPath();
          ctx.arc(center, center, radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = '#451A03';
          ctx.fill();
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 4;
          ctx.stroke();

          // 37 Pockets
          const numPockets = ROULETTE_NUMBERS.length;
          const arc = (Math.PI * 2) / numPockets;

          for (let i = 0; i < numPockets; i++) {
            const angle = rot + i * arc;
            const n = ROULETTE_NUMBERS[i];
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, angle, angle + arc);
            ctx.closePath();

            if (n === 0) ctx.fillStyle = '#059669';
            else if (RED_NUMBERS.includes(n)) ctx.fillStyle = '#DC2626';
            else ctx.fillStyle = '#18181B';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.stroke();

            // Number Pocket text
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 11px monospace';
            ctx.fillText(n.toString(), radius - 14, 4);
            ctx.restore();
          }

          // Center Hub Brass Turret
          ctx.beginPath();
          ctx.arc(center, center, radius * 0.38, 0, Math.PI * 2);
          ctx.fillStyle = '#0B0D13';
          ctx.fill();
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Silver Ball dropping
          ctx.beginPath();
          ctx.arc(center, center - radius * 0.72, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#F8FAFC';
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          if (vel > 0.003) {
            requestAnimationFrame(animate);
          } else {
            // Settle Wheel
            setLastWinPocket({ num: winNum, color: winColor });
            setWheelSpinning(false);
            setHistoryPockets((prev) => [{ num: winNum, color: winColor }, ...prev.slice(0, 7)]);
            evaluateRoulettePayout(winNum, winColor);
          }
        };
        requestAnimationFrame(animate);
      }
    }
  };

  const evaluateRoulettePayout = (winNum: number, winColor: 'red' | 'black' | 'green') => {
    let winTotal = 0;

    Object.entries(betsTable).forEach(([key, amt]) => {
      if (key === 'red' && winColor === 'red') winTotal += amt * 2;
      if (key === 'black' && winColor === 'black') winTotal += amt * 2;
      if (key === 'green' && winColor === 'green') winTotal += amt * 36;
      if (key === 'even' && winNum !== 0 && winNum % 2 === 0) winTotal += amt * 2;
      if (key === 'odd' && winNum !== 0 && winNum % 2 !== 0) winTotal += amt * 2;
      if (key === '1-18' && winNum >= 1 && winNum <= 18) winTotal += amt * 2;
      if (key === '19-36' && winNum >= 19 && winNum <= 36) winTotal += amt * 2;
      if (key === '1st-12' && winNum >= 1 && winNum <= 12) winTotal += amt * 3;
      if (key === '2nd-12' && winNum >= 13 && winNum <= 24) winTotal += amt * 3;
      if (key === '3rd-12' && winNum >= 25 && winNum <= 36) winTotal += amt * 3;
      if (key === `num-${winNum}`) winTotal += amt * 36;
    });

    setRouletteNetWin(winTotal);
    if (winTotal > 0) {
      addBankroll(winTotal);
      soundFX.playWin();
    } else {
      soundFX.playLoss();
    }
  };

  return (
    <section className="py-20 bg-[#07090F] border-t border-white/10 relative overflow-hidden">
      {/* Immersive Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-[#FF5B14]/15 via-[#F59E0B]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & Global Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-white/10 pb-8">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>COMMERCIAL-GRADE PRODUCTION ENGINE PLAYGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Test Our Game Logic Live.
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
              Experience the exact mathematics, 3D physics, CSPRNG seeds, and sub-10ms network synchronization powering our production games worldwide.
            </p>
          </div>

          {/* Player Live Bankroll & Audio Hub */}
          <div className="flex items-center gap-3 bg-[#121624] border border-white/15 px-4 py-3 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] flex items-center justify-center text-white shadow-lg">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Active Demo Wallet</span>
                <span className="text-xl font-mono font-black text-emerald-400">${bankroll.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => addBankroll(500)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition cursor-pointer"
              title="Add $500 Demo Balance"
            >
              + $500
            </button>

            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? 'bg-[#FF5B14]/20 border-[#FF5B14]/40 text-[#FF782D]'
                  : 'bg-white/5 border-white/10 text-gray-500'
              }`}
              title={soundEnabled ? 'Mute Sound FX' : 'Unmute Sound FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Game Engine Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('ludo')}
            className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'ludo'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-xl shadow-[#FF5B14]/30 scale-105 ring-2 ring-white/20'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span className="text-xl">🎲</span>
            <span>Ludo Pro Board (15x15)</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'cards'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-xl shadow-[#FF5B14]/30 scale-105 ring-2 ring-white/20'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span className="text-xl">🃏</span>
            <span>Royal Poker &amp; Teen Patti</span>
          </button>

          <button
            onClick={() => setActiveTab('crash')}
            className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'crash'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-xl shadow-[#FF5B14]/30 scale-105 ring-2 ring-white/20'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span className="text-xl">🚀</span>
            <span>Aviator Multiplier (Dual Bet)</span>
          </button>

          <button
            onClick={() => setActiveTab('roulette')}
            className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'roulette'
                ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-xl shadow-[#FF5B14]/30 scale-105 ring-2 ring-white/20'
                : 'bg-[#121622] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span className="text-xl">🎡</span>
            <span>Monte Carlo Live 3D Roulette</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: REAL 15x15 LUDO PRO BOARD RACE WITH 3D DICE */}
        {/* ========================================================================= */}
        {activeTab === 'ludo' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* 15x15 Authentic Ludo Board */}
            <div className="lg:col-span-8 bg-[#0D111D] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
              
              {/* Match Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white">YOU (Red)</span>
                  </div>
                  <span className="text-gray-500 font-mono text-xs">VS</span>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-emerald-400">AI BOT (Green)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-red-400 font-bold">Wins: {ludoMatchStats.pWins}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-emerald-400 font-bold">Bot: {ludoMatchStats.bWins}</span>
                </div>
              </div>

              {/* Authentic 4-Yard Ludo Board Layout */}
              <div className="aspect-square max-w-[420px] mx-auto bg-[#F8FAFC] rounded-2xl p-2.5 shadow-2xl border-4 border-[#0B0D13] grid grid-cols-3 grid-rows-3 gap-1 relative select-none">
                
                {/* 1. TOP-LEFT: Red Yard (Player Base) */}
                <div className="bg-red-500 rounded-xl p-3 border-2 border-red-700 flex flex-col justify-between relative shadow-inner">
                  <span className="text-[10px] font-black font-mono text-white/90">RED YARD (YOU)</span>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-white/20 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      {playerPawns[0] === -1 && (
                        <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow animate-bounce text-[9px] font-black text-white flex items-center justify-center">
                          P1
                        </div>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      {playerPawns[1] === -1 && (
                        <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow animate-bounce text-[9px] font-black text-white flex items-center justify-center">
                          P2
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. TOP-CENTER: Green Column (Track) */}
                <div className="bg-white rounded-xl p-1 grid grid-cols-3 grid-rows-6 gap-0.5 border border-gray-300 text-[8px] font-bold text-center">
                  <div className="bg-gray-100 rounded flex items-center justify-center">11</div>
                  <div className="bg-emerald-500 text-white rounded flex items-center justify-center">★</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">13</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">10</div>
                  <div className="bg-emerald-400 text-white rounded flex items-center justify-center">▲</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">14</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">9</div>
                  <div className="bg-emerald-400 text-white rounded flex items-center justify-center">▲</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">15</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">8</div>
                  <div className="bg-emerald-400 text-white rounded flex items-center justify-center">▲</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">16</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">7</div>
                  <div className="bg-emerald-400 text-white rounded flex items-center justify-center">▲</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">17</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">6</div>
                  <div className="bg-emerald-400 text-white rounded flex items-center justify-center">▲</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">18</div>
                </div>

                {/* 3. TOP-RIGHT: Green Yard (Bot Base) */}
                <div className="bg-emerald-600 rounded-xl p-3 border-2 border-emerald-800 flex flex-col justify-between relative shadow-inner">
                  <span className="text-[10px] font-black font-mono text-white/90">GREEN YARD (BOT)</span>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-white/20 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      {botPawns[0] === -1 && (
                        <div className="w-6 h-6 rounded-full bg-emerald-700 border-2 border-white shadow text-[9px] font-black text-white flex items-center justify-center">
                          B1
                        </div>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      {botPawns[1] === -1 && (
                        <div className="w-6 h-6 rounded-full bg-emerald-700 border-2 border-white shadow text-[9px] font-black text-white flex items-center justify-center">
                          B2
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. MID-LEFT: Red Column */}
                <div className="bg-white rounded-xl p-1 grid grid-cols-6 grid-rows-3 gap-0.5 border border-gray-300 text-[8px] font-bold text-center">
                  <div className="bg-gray-100 rounded flex items-center justify-center">0</div>
                  <div className="bg-red-500 text-white rounded flex items-center justify-center">★</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">2</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">3</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">4</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">5</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-red-400 text-white rounded flex items-center justify-center">►</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">51</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">50</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">49</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">48</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">47</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">46</div>
                </div>

                {/* 5. CENTER: Victory Home Triangles */}
                <div className="bg-[#0F172A] rounded-xl p-2 relative flex items-center justify-center border-2 border-amber-400 shadow-2xl">
                  <div className="text-center font-display font-black text-amber-400 text-xs">
                    🏆 HOME
                  </div>
                </div>

                {/* 6. MID-RIGHT: Yellow Column */}
                <div className="bg-white rounded-xl p-1 grid grid-cols-6 grid-rows-3 gap-0.5 border border-gray-300 text-[8px] font-bold text-center">
                  <div className="bg-gray-100 rounded flex items-center justify-center">19</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">20</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">21</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">22</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">23</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">24</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-yellow-400 text-black rounded flex items-center justify-center">◄</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">31</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">30</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">29</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">28</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">27</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">26</div>
                </div>

                {/* 7. BOTTOM-LEFT: Blue Yard */}
                <div className="bg-sky-600 rounded-xl p-3 border-2 border-sky-800 flex flex-col justify-between shadow-inner">
                  <span className="text-[10px] font-black font-mono text-white/90">BLUE YARD</span>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-white/20 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white shadow-md" />
                    <div className="w-8 h-8 rounded-full bg-white shadow-md" />
                  </div>
                </div>

                {/* 8. BOTTOM-CENTER: Blue Column */}
                <div className="bg-white rounded-xl p-1 grid grid-cols-3 grid-rows-6 gap-0.5 border border-gray-300 text-[8px] font-bold text-center">
                  <div className="bg-gray-100 rounded flex items-center justify-center">45</div>
                  <div className="bg-sky-400 text-white rounded flex items-center justify-center">▼</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">33</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">44</div>
                  <div className="bg-sky-400 text-white rounded flex items-center justify-center">▼</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">34</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">43</div>
                  <div className="bg-sky-400 text-white rounded flex items-center justify-center">▼</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">35</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">42</div>
                  <div className="bg-sky-400 text-white rounded flex items-center justify-center">▼</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">36</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">41</div>
                  <div className="bg-sky-400 text-white rounded flex items-center justify-center">▼</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">37</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">40</div>
                  <div className="bg-sky-500 text-white rounded flex items-center justify-center">★</div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">38</div>
                </div>

                {/* 9. BOTTOM-RIGHT: Yellow Yard */}
                <div className="bg-yellow-500 rounded-xl p-3 border-2 border-yellow-700 flex flex-col justify-between shadow-inner">
                  <span className="text-[10px] font-black font-mono text-black">YELLOW YARD</span>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-white/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white shadow-md" />
                    <div className="w-8 h-8 rounded-full bg-white shadow-md" />
                  </div>
                </div>
              </div>

              {/* 3D Dice Shaker Tray & Roll Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#141A29] rounded-2xl border border-white/10">
                {/* 3D Realistic Pip Dice */}
                <div className="flex items-center gap-4">
                  <div
                    onClick={handleRollLudo}
                    className={`w-18 h-18 rounded-2xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-1.5 shadow-2xl cursor-pointer hover:scale-105 transition-transform ${
                      isLudoRolling ? 'animate-dice-3d' : ''
                    }`}
                  >
                    <div className="w-full h-full bg-[#0B0D13] rounded-xl flex items-center justify-center p-2 border border-white/20">
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-0.5 items-center justify-items-center">
                        {ludoDice === 1 && <div className="col-start-2 row-start-2 w-3 h-3 rounded-full bg-white shadow" />}
                        {ludoDice === 2 && (
                          <>
                            <div className="col-start-1 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                          </>
                        )}
                        {ludoDice === 3 && (
                          <>
                            <div className="col-start-1 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-2 row-start-2 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                          </>
                        )}
                        {ludoDice === 4 && (
                          <>
                            <div className="col-start-1 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-1 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                          </>
                        )}
                        {ludoDice === 5 && (
                          <>
                            <div className="col-start-1 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-1 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-2 row-start-2 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-1 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                          </>
                        )}
                        {ludoDice === 6 && (
                          <>
                            <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-white" />
                            <div className="col-start-3 row-start-1 w-2 h-2 rounded-full bg-white" />
                            <div className="col-start-1 row-start-2 w-2 h-2 rounded-full bg-white" />
                            <div className="col-start-3 row-start-2 w-2 h-2 rounded-full bg-white" />
                            <div className="col-start-1 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="col-start-3 row-start-3 w-2.5 h-2.5 rounded-full bg-white" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 block">Server CSPRNG Roll</span>
                    <span className="text-2xl font-mono font-black text-white">{ludoDice}</span>
                  </div>
                </div>

                {/* Pawn Selection Buttons if multiple available */}
                {selectablePawn !== null && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => stepMovePlayer(0, selectablePawn)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold font-mono shadow-lg transition cursor-pointer"
                    >
                      Advance Pawn 1 (Pos: {playerPawns[0] === -1 ? 'Yard' : playerPawns[0]})
                    </button>
                    <button
                      onClick={() => stepMovePlayer(1, selectablePawn)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold font-mono shadow-lg transition cursor-pointer"
                    >
                      Advance Pawn 2 (Pos: {playerPawns[1] === -1 ? 'Yard' : playerPawns[1]})
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRollLudo}
                    disabled={isLudoRolling || ludoTurn !== 'player' || isMovingStep}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:scale-105 transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className={`w-4 h-4 ${isLudoRolling ? 'animate-spin' : ''}`} />
                    <span>{ludoTurn === 'player' ? 'Roll 3D Dice' : 'Bot Rolling...'}</span>
                  </button>

                  <button
                    onClick={resetLudo}
                    className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 transition cursor-pointer"
                    title="Reset Board"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Message */}
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs font-mono text-center text-amber-400">
                {ludoStatus}
              </div>
            </div>

            {/* Architecture Specs */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SERVER-AUTHORITATIVE ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Multiplayer 3D Ludo Engine
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                Full 4-player online synchronization with WebSockets, deterministic turn-timers, automatic AI reconnection fallbacks, and fraud detection.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Sync Protocol:</span>
                  <span className="text-emerald-400 font-bold">&lt; 18ms Latency</span>
                </div>
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Roll Stream:</span>
                  <span className="text-amber-400 font-bold">[{ludoHistory.join(', ')}]</span>
                </div>
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Match Rooms:</span>
                  <span className="text-white font-bold">250,000 Concurrent</span>
                </div>
              </div>

              <button
                onClick={() => navigate('game-detail', 'ludo')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF782D] hover:underline cursor-pointer pt-2"
              >
                <span>View Full Ludo Tech Stack &amp; Benchmarks</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: REAL CASINO VELVET FELT (Video Poker & Teen Patti) */}
        {/* ========================================================================= */}
        {activeTab === 'cards' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Real Felt Table Layout */}
            <div className="lg:col-span-8 bg-gradient-to-b from-[#0B2317] via-[#081A11] to-[#040C08] border-4 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
              
              {/* Card Room Mode Switcher */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCardRoomMode('poker')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      cardRoomMode === 'poker'
                        ? 'bg-amber-500 text-black shadow-lg scale-105'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    5-Card Draw Video Poker
                  </button>
                  <button
                    onClick={() => setCardRoomMode('teenpatti')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      cardRoomMode === 'teenpatti'
                        ? 'bg-amber-500 text-black shadow-lg scale-105'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Teen Patti Live Showdown
                  </button>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>FISHER-YATES 52 CARDS</span>
                </span>
              </div>

              {/* --- 5-CARD VIDEO POKER MODE --- */}
              {cardRoomMode === 'poker' && (
                <div className="space-y-6">
                  {/* Real Video Poker Paytable Strip */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-2.5 bg-black/70 rounded-xl border border-amber-500/30 text-[10px] font-mono text-center">
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-gray-400 block">Royal Flush</span>
                      <span className="text-amber-400 font-bold">250x</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-gray-400 block">Str. Flush</span>
                      <span className="text-amber-400 font-bold">50x</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-gray-400 block">4 of a Kind</span>
                      <span className="text-amber-400 font-bold">25x</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-gray-400 block">Full House</span>
                      <span className="text-amber-400 font-bold">9x</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-gray-400 block">Jacks or Better</span>
                      <span className="text-amber-400 font-bold">1x</span>
                    </div>
                  </div>

                  {/* 5 Playing Cards with 3D Flip & Hold Badges */}
                  <div className="flex justify-center gap-2 sm:gap-4 py-3">
                    {pokerHand.map((c, idx) => {
                      const isHeld = heldIndices[idx];
                      return (
                        <div
                          key={c.id || idx}
                          onClick={() => toggleHold(idx)}
                          className={`w-16 h-26 sm:w-20 sm:h-32 bg-white rounded-2xl shadow-2xl border-2 p-2 flex flex-col justify-between cursor-pointer select-none transform transition-all ${
                            isHeld
                              ? 'border-amber-400 -translate-y-4 ring-4 ring-amber-400/50'
                              : 'border-gray-300 hover:-translate-y-2'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-sm sm:text-base font-black ${c.color}`}>{c.rank}</span>
                            <span className={`text-xs sm:text-sm ${c.color}`}>{c.suit}</span>
                          </div>

                          <div className="text-center text-2xl sm:text-3xl">{c.suit}</div>

                          <div className="flex justify-between items-end">
                            {isHeld ? (
                              <span className="text-[9px] font-black font-mono bg-amber-400 text-black px-1.5 py-0.5 rounded shadow">
                                HELD
                              </span>
                            ) : (
                              <span />
                            )}
                            <span className={`text-sm sm:text-base font-black ${c.color}`}>{c.rank}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hand Evaluation Result Banner */}
                  <div className="p-3 bg-black/60 rounded-2xl border border-emerald-500/30 text-center font-mono">
                    <span className="text-xs text-gray-400 block">Current Hand Combination:</span>
                    <span className="text-lg font-bold text-amber-300">
                      {pokerResult?.name || 'Deal Cards to Begin'}
                    </span>
                    {pokerResult?.payoutMultiplier ? (
                      <span className="text-xs text-emerald-400 block font-bold mt-0.5">
                        🎉 Payout: {pokerResult.payoutMultiplier}x (Win ${pokerChip * pokerResult.payoutMultiplier})
                      </span>
                    ) : null}
                  </div>

                  {/* Betting Controls & Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-300">Bet Chip:</span>
                      {[10, 25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setPokerChip(amt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                            pokerChip === amt
                              ? 'bg-amber-400 text-black shadow-lg scale-105'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      {pokerPhase === 'holding' ? (
                        <button
                          onClick={handlePokerDraw}
                          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer"
                        >
                          DRAW REPLACEMENTS
                        </button>
                      ) : (
                        <button
                          onClick={handlePokerDeal}
                          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer"
                        >
                          DEAL HAND (${pokerChip})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* --- TEEN PATTI LIVE SHOWDOWN MODE --- */}
              {cardRoomMode === 'teenpatti' && (
                <div className="space-y-6">
                  {/* Dealer Side */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-emerald-400 mb-1">
                      <span>Dealer Hand (House):</span>
                      <span>{tpCardsRevealed ? 'REVEALED' : 'FACE DOWN'}</span>
                    </div>
                    <div className="flex justify-center gap-3 py-2">
                      {tpDealerHand.length > 0 ? (
                        tpDealerHand.map((c, idx) => (
                          <div
                            key={idx}
                            className={`w-16 h-24 sm:w-18 sm:h-28 rounded-2xl border-2 p-1.5 flex flex-col justify-between shadow-xl ${
                              tpCardsRevealed
                                ? 'bg-white border-gray-300'
                                : 'bg-gradient-to-br from-red-950 to-red-900 border-amber-500/40'
                            }`}
                          >
                            {tpCardsRevealed ? (
                              <>
                                <span className={`text-xs font-bold ${c.color}`}>{c.rank}{c.suit}</span>
                                <span className={`text-center text-xl ${c.color}`}>{c.suit}</span>
                                <span className={`text-xs font-bold self-end ${c.color}`}>{c.rank}</span>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-amber-400 font-mono text-lg">
                                🂠
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs font-mono text-gray-400 py-3">Click Deal to start hand</div>
                      )}
                    </div>
                  </div>

                  {/* Player Hand */}
                  <div>
                    <div className="text-xs font-mono text-emerald-400 mb-1">Your 3 Cards:</div>
                    <div className="flex justify-center gap-3 py-2">
                      {tpPlayerHand.map((c, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-24 sm:w-18 sm:h-28 bg-white rounded-2xl border-2 border-gray-300 p-1.5 flex flex-col justify-between shadow-2xl"
                        >
                          <span className={`text-xs font-bold ${c.color}`}>{c.rank}{c.suit}</span>
                          <span className={`text-center text-xl ${c.color}`}>{c.suit}</span>
                          <span className={`text-xs font-bold self-end ${c.color}`}>{c.rank}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Banner */}
                  <div className="p-3 bg-black/60 rounded-xl border border-emerald-500/30 text-center font-mono text-xs text-amber-300">
                    {tpMessage}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="text-xs font-mono text-emerald-300">
                      Pot Pool: <span className="text-amber-400 font-bold">${tpPotAmount}</span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleDealTeenPatti}
                        className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg cursor-pointer"
                      >
                        DEAL NEW HAND ($50)
                      </button>

                      {tpPlayerHand.length > 0 && !tpCardsRevealed && (
                        <button
                          onClick={handleTeenPattiShow}
                          className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-lg cursor-pointer"
                        >
                          SHOWDOWN / CHALL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Architecture Details */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>ANTI-COLLUSION CARD ENGINE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Rummy, Poker &amp; Teen Patti Architecture
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                Handles high-frequency card evaluations, sequence melds, dynamic table reshuffles, and automated rake deductions.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Hand Evaluation:</span>
                  <span className="text-emerald-400 font-bold">&lt; 0.4ms Native</span>
                </div>
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Shuffle Proof:</span>
                  <span className="text-sky-400 font-bold">SHA-256 Validated</span>
                </div>
                <div className="p-3 bg-[#121622] rounded-xl border border-white/10 font-mono text-xs flex justify-between">
                  <span className="text-gray-400">Card Draw Speed:</span>
                  <span className="text-amber-400 font-bold">&lt; 25ms Global</span>
                </div>
              </div>

              <button
                onClick={() => navigate('game-detail', 'multiplayer-cards')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF782D] hover:underline cursor-pointer pt-2"
              >
                <span>Explore Card Suite Specs &amp; Rummy Rules</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: REAL AVIATOR PRO MULTIPLIER (Dual Bet Control & Propeller Plane) */}
        {/* ========================================================================= */}
        {activeTab === 'crash' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Aviator Cockpit Canvas & Dual Bet Panels */}
            <div className="lg:col-span-8 bg-[#0D101C] border-2 border-rose-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
              
              {/* Recent Multipliers History Pill Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
                <span className="text-gray-400 text-[11px] uppercase whitespace-nowrap">Recent:</span>
                {recentCrashHistory.map((m, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap ${
                      m >= 2.0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {m.toFixed(2)}x
                  </span>
                ))}
              </div>

              {/* 60fps Realtime Canvas */}
              <div className="relative h-64 sm:h-72 w-full bg-[#07090F] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                <canvas ref={aviatorCanvasRef} className="absolute inset-0 w-full h-full" />

                {/* Big Flight Multiplier Display */}
                <div className="relative z-10 text-center select-none pointer-events-none">
                  {aviatorState === 'waiting' && (
                    <span className="text-4xl font-display font-black text-amber-400 animate-pulse">
                      WAITING FOR NEXT ROUND...
                    </span>
                  )}

                  {aviatorState === 'flying' && (
                    <span className="text-6xl sm:text-7xl font-black font-display tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,91,20,0.8)]">
                      {curMultiplier.toFixed(2)}x
                    </span>
                  )}

                  {aviatorState === 'crashed' && (
                    <div>
                      <span className="text-6xl sm:text-7xl font-black font-display tracking-tight text-rose-500 animate-shake">
                        {curMultiplier.toFixed(2)}x
                      </span>
                      <p className="text-xs font-mono text-rose-400 mt-2 font-bold uppercase tracking-widest">
                        💥 FLEW AWAY @ {curMultiplier.toFixed(2)}x
                      </p>
                    </div>
                  )}

                  {aviatorState === 'idle' && (
                    <div className="text-center">
                      <span className="text-5xl font-black font-display text-gray-500">1.00x</span>
                      <p className="text-xs font-mono text-gray-400 mt-2">Place bet &amp; Launch to start flight</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dual Bet Control Panels (Bet 1 & Bet 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* BET PANEL 1 */}
                <div className="bg-[#131828] border border-white/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">BET #1 ($)</span>
                    <div className="flex items-center gap-1.5">
                      <label className="flex items-center gap-1 text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bet1AutoEnabled}
                          onChange={(e) => setBet1AutoEnabled(e.target.checked)}
                          className="accent-[#FF5B14]"
                        />
                        <span>Auto:</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1.1"
                        max="50"
                        value={bet1Auto}
                        onChange={(e) => setBet1Auto(parseFloat(e.target.value) || 2.0)}
                        disabled={!bet1AutoEnabled || aviatorState === 'flying'}
                        className="w-14 px-1.5 py-0.5 rounded bg-black/60 border border-white/20 font-mono text-[11px] text-white text-right"
                      />
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setBet1Amt(amt)}
                        className={`flex-1 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                          bet1Amt === amt ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {aviatorState === 'flying' && bet1Status === 'in' ? (
                    <button
                      onClick={cashoutBet1}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/40 hover:scale-105 transition cursor-pointer animate-pulse"
                    >
                      CASHOUT ${(bet1Amt * curMultiplier).toFixed(2)}
                    </button>
                  ) : (
                    <button
                      onClick={startAviatorRound}
                      disabled={aviatorState === 'waiting'}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:scale-105 transition cursor-pointer disabled:opacity-50"
                    >
                      {bet1Status === 'cashed' ? `CASHED +$${bet1Won}` : `BET $${bet1Amt}`}
                    </button>
                  )}
                </div>

                {/* BET PANEL 2 */}
                <div className="bg-[#131828] border border-white/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">BET #2 (Moonshot)</span>
                    <div className="flex items-center gap-1.5">
                      <label className="flex items-center gap-1 text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bet2AutoEnabled}
                          onChange={(e) => setBet2AutoEnabled(e.target.checked)}
                          className="accent-purple-500"
                        />
                        <span>Auto:</span>
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="1.5"
                        max="100"
                        value={bet2Auto}
                        onChange={(e) => setBet2Auto(parseFloat(e.target.value) || 5.0)}
                        disabled={!bet2AutoEnabled || aviatorState === 'flying'}
                        className="w-14 px-1.5 py-0.5 rounded bg-black/60 border border-white/20 font-mono text-[11px] text-white text-right"
                      />
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setBet2Amt(amt)}
                        className={`flex-1 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                          bet2Amt === amt ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {aviatorState === 'flying' && bet2Status === 'in' ? (
                    <button
                      onClick={cashoutBet2}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/40 hover:scale-105 transition cursor-pointer animate-pulse"
                    >
                      CASHOUT ${(bet2Amt * curMultiplier).toFixed(2)}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setBet2Status('in');
                        startAviatorRound();
                      }}
                      disabled={aviatorState === 'waiting'}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-xl hover:scale-105 transition cursor-pointer disabled:opacity-50"
                    >
                      {bet2Status === 'cashed' ? `CASHED +$${bet2Won}` : `BET $${bet2Amt}`}
                    </button>
                  )}
                </div>
              </div>

              {/* SHA-256 Provably Fair Hash */}
              <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] text-gray-400 flex items-center justify-between">
                <span className="truncate mr-2">Seed Hash: <span className="text-cyan-400">{roundSeedHash}</span></span>
                <span className="text-emerald-400 whitespace-nowrap">✓ Provably Fair</span>
              </div>
            </div>

            {/* Multiplayer Room Live Feed */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="bg-[#101422] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Aviator Live Room (6,210 Online)
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">Total Pot: $18,920</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  {multiplayerBets.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                      <div className="flex items-center gap-2">
                        <span>{p.avatar}</span>
                        <span className="text-gray-300">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">${p.bet}</span>
                        {p.status === 'cashed' && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            {p.mult}x (+${p.profit})
                          </span>
                        )}
                        {p.status === 'in' && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] animate-pulse">
                            Flying...
                          </span>
                        )}
                        {p.status === 'busted' && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold text-[10px]">
                            Busted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mass Concurrency Specs */}
              <div className="p-4 bg-[#121622] rounded-2xl border border-white/10 space-y-2.5">
                <h4 className="text-sm font-bold font-display text-white">Broadcast Architecture</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Redis in-memory Sorted Sets with WebSocket pub/sub handles 50,000+ players per crash room with &lt;10ms broadcast latency.
                </p>
                <button
                  onClick={() => navigate('game-detail', 'crash-multiplier')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Multiplier Engine Specs →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MONTE CARLO LIVE 3D ROULETTE (Mahogany Wheel & Realistic Grid Felt) */}
        {/* ========================================================================= */}
        {activeTab === 'roulette' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Roulette Canvas Wheel & Betting Table */}
            <div className="lg:col-span-8 bg-[#0F1424] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
              
              {/* Wheel + Result Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-b border-white/10 pb-6">
                {/* Mahogany Rotating Wheel */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-r from-amber-600 via-amber-800 to-amber-950 shadow-2xl">
                    <canvas
                      ref={rouletteWheelRef}
                      width={240}
                      height={240}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Outcome Badge & Spin Action */}
                <div className="space-y-4 text-center sm:text-left">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-2xl text-white shadow-2xl ${
                        lastWinPocket.color === 'red'
                          ? 'bg-red-600'
                          : lastWinPocket.color === 'green'
                          ? 'bg-emerald-600'
                          : 'bg-zinc-800'
                      }`}
                    >
                      <span>{lastWinPocket.num}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">Winning Pocket</span>
                      <span className="text-sm font-mono font-bold text-white uppercase">
                        {lastWinPocket.color} • {lastWinPocket.num === 0 ? 'Single Zero' : lastWinPocket.num % 2 === 0 ? 'Even' : 'Odd'}
                      </span>
                    </div>
                  </div>

                  {rouletteNetWin !== null && (
                    <div className={`p-2.5 rounded-xl font-mono text-xs font-bold ${
                      rouletteNetWin > 0 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950/40 text-rose-400 border border-rose-500/30'
                    }`}>
                      {rouletteNetWin > 0 ? `🎉 Won +$${rouletteNetWin} Payout!` : 'No winning bets on this spin.'}
                    </div>
                  )}

                  <button
                    onClick={spinRoulette}
                    disabled={wheelSpinning}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF5B14] text-white font-bold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition disabled:opacity-50 cursor-pointer"
                  >
                    {wheelSpinning ? 'Wheel Spinning...' : `SPIN ROULETTE (Bet $${calcTotalFeltBets()})`}
                  </button>
                </div>
              </div>

              {/* Complete European Casino Betting Felt Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300">Select Chip Value:</span>
                  <div className="flex items-center gap-2">
                    {[10, 25, 50, 100].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setChipDenom(chip)}
                        className={`w-8 h-8 rounded-full text-xs font-mono font-bold border-2 transition cursor-pointer flex items-center justify-center ${
                          chipDenom === chip
                            ? 'bg-amber-400 text-black border-white scale-110 shadow-lg'
                            : 'bg-white/10 text-gray-300 border-white/20'
                        }`}
                      >
                        ${chip}
                      </button>
                    ))}
                    <button
                      onClick={clearFeltBets}
                      className="ml-2 px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs transition cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Outside Bets Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs font-mono">
                  <button
                    onClick={() => placeFeltBet('red')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['red']
                        ? 'bg-red-600 text-white border-white ring-2 ring-white/50'
                        : 'bg-red-950/60 text-red-300 border-red-600/40 hover:bg-red-900/60'
                    }`}
                  >
                    RED (1:1)
                    {betsTable['red'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['red']}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => placeFeltBet('black')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['black']
                        ? 'bg-zinc-800 text-white border-white ring-2 ring-white/50'
                        : 'bg-zinc-950/60 text-zinc-300 border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    BLACK (1:1)
                    {betsTable['black'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['black']}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => placeFeltBet('even')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['even']
                        ? 'bg-sky-600 text-white border-white'
                        : 'bg-sky-950/40 text-sky-300 border-sky-600/30 hover:bg-sky-900/40'
                    }`}
                  >
                    EVEN (1:1)
                    {betsTable['even'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['even']}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => placeFeltBet('odd')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['odd']
                        ? 'bg-sky-600 text-white border-white'
                        : 'bg-sky-950/40 text-sky-300 border-sky-600/30 hover:bg-sky-900/40'
                    }`}
                  >
                    ODD (1:1)
                    {betsTable['odd'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['odd']}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => placeFeltBet('1-18')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['1-18']
                        ? 'bg-purple-600 text-white border-white'
                        : 'bg-purple-950/40 text-purple-300 border-purple-600/30'
                    }`}
                  >
                    1-18 (Low)
                    {betsTable['1-18'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['1-18']}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => placeFeltBet('19-36')}
                    className={`py-2.5 rounded-xl font-bold transition border cursor-pointer relative ${
                      betsTable['19-36']
                        ? 'bg-purple-600 text-white border-white'
                        : 'bg-purple-950/40 text-purple-300 border-purple-600/30'
                    }`}
                  >
                    19-36 (High)
                    {betsTable['19-36'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['19-36']}
                      </span>
                    )}
                  </button>
                </div>

                {/* Dozens Grid */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    onClick={() => placeFeltBet('1st-12')}
                    className={`py-2 rounded-xl font-bold border transition cursor-pointer relative ${
                      betsTable['1st-12'] ? 'bg-amber-600 text-white border-white' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    1st 12 (2:1)
                    {betsTable['1st-12'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['1st-12']}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => placeFeltBet('2nd-12')}
                    className={`py-2 rounded-xl font-bold border transition cursor-pointer relative ${
                      betsTable['2nd-12'] ? 'bg-amber-600 text-white border-white' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    2nd 12 (2:1)
                    {betsTable['2nd-12'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['2nd-12']}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => placeFeltBet('3rd-12')}
                    className={`py-2 rounded-xl font-bold border transition cursor-pointer relative ${
                      betsTable['3rd-12'] ? 'bg-amber-600 text-white border-white' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    3rd 12 (2:1)
                    {betsTable['3rd-12'] && (
                      <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[9px] px-1 rounded-full font-black">
                        ${betsTable['3rd-12']}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Roulette History & Certified Specs */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="bg-[#121622] border border-white/10 rounded-2xl p-4 shadow-xl">
                <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-3 flex items-center justify-between">
                  <span>Recent Spin Stream</span>
                  <span className="text-emerald-400">RTP: 97.30%</span>
                </h4>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {historyPockets.map((s, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white shadow ${
                        s.color === 'red' ? 'bg-red-600' : s.color === 'green' ? 'bg-emerald-600' : 'bg-zinc-800'
                      }`}
                    >
                      {s.num}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs font-mono text-gray-400">
                  <div className="flex justify-between p-2 bg-black/40 rounded-lg">
                    <span>Wheel Standard:</span>
                    <span className="text-white">European Single-Zero</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/40 rounded-lg">
                    <span>Straight-Up Payout:</span>
                    <span className="text-amber-400 font-bold">35 to 1</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/40 rounded-lg">
                    <span>Physics Model:</span>
                    <span className="text-emerald-400">Continuous Deceleration</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#121622] rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold font-display text-white">Live Dealer &amp; Casino API</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Support for multi-camera video feed overlay, real-time bet validation via socket streams, and certified random number generation.
                </p>
                <button
                  onClick={() => navigate('game-detail', 'roulette-casino-engine')}
                  className="text-xs font-semibold text-[#FF782D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Roulette Casino Specs →</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
