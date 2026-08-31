export type CardSuit = '♠' | '♥' | '♦' | '♣';
export type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  id: string;
  rank: CardRank;
  suit: CardSuit;
  color: 'text-white' | 'text-red-500';
  value: number; // 2 to 14 (A=14)
}

const SUITS: { suit: CardSuit; color: 'text-white' | 'text-red-500' }[] = [
  { suit: '♠', color: 'text-white' },
  { suit: '♥', color: 'text-red-500' },
  { suit: '♦', color: 'text-red-500' },
  { suit: '♣', color: 'text-white' }
];

const RANKS: { rank: CardRank; value: number }[] = [
  { rank: '2', value: 2 },
  { rank: '3', value: 3 },
  { rank: '4', value: 4 },
  { rank: '5', value: 5 },
  { rank: '6', value: 6 },
  { rank: '7', value: 7 },
  { rank: '8', value: 8 },
  { rank: '9', value: 9 },
  { rank: '10', value: 10 },
  { rank: 'J', value: 11 },
  { rank: 'Q', value: 12 },
  { rank: 'K', value: 13 },
  { rank: 'A', value: 14 }
];

export function createShuffledDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of SUITS) {
    for (const r of RANKS) {
      deck.push({
        id: `${r.rank}-${s.suit}-${Math.random().toString(36).substring(2, 7)}`,
        rank: r.rank,
        suit: s.suit,
        color: s.color,
        value: r.value
      });
    }
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export interface PokerHandResult {
  rankScore: number; // Higher is better (0 to 9)
  name: string;
  payoutMultiplier: number;
  description: string;
  isWin: boolean;
}

// 5-Card Video Poker Evaluation
export function evaluate5CardPoker(cards: Card[]): PokerHandResult {
  if (cards.length !== 5) {
    return { rankScore: 0, name: 'Incomplete Hand', payoutMultiplier: 0, description: 'Deal cards', isWin: false };
  }

  const sorted = [...cards].sort((a, b) => b.value - a.value);
  const values = sorted.map((c) => c.value);
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Check straight (including A-2-3-4-5 wheel straight)
  let isStraight = false;
  const isHighStraight = values[0] - values[4] === 4 && new Set(values).size === 5;
  const isAceLowStraight = values[0] === 14 && values[1] === 5 && values[2] === 4 && values[3] === 3 && values[4] === 2;

  if (isHighStraight || isAceLowStraight) {
    isStraight = true;
  }

  // Counts of each rank
  const counts: { [val: number]: number } = {};
  values.forEach((v) => {
    counts[v] = (counts[v] || 0) + 1;
  });
  const countValues = Object.values(counts).sort((a, b) => b - a);

  // 1. Royal Flush
  if (isFlush && isHighStraight && values[0] === 14 && values[4] === 10) {
    return { rankScore: 9, name: 'Royal Flush', payoutMultiplier: 250, description: 'A, K, Q, J, 10 suited', isWin: true };
  }

  // 2. Straight Flush
  if (isFlush && isStraight) {
    return { rankScore: 8, name: 'Straight Flush', payoutMultiplier: 50, description: '5 consecutive suited cards', isWin: true };
  }

  // 3. Four of a Kind
  if (countValues[0] === 4) {
    return { rankScore: 7, name: 'Four of a Kind', payoutMultiplier: 25, description: 'Four cards of same rank', isWin: true };
  }

  // 4. Full House
  if (countValues[0] === 3 && countValues[1] === 2) {
    return { rankScore: 6, name: 'Full House', payoutMultiplier: 9, description: 'Three of a kind + Pair', isWin: true };
  }

  // 5. Flush
  if (isFlush) {
    return { rankScore: 5, name: 'Flush', payoutMultiplier: 6, description: '5 cards of same suit', isWin: true };
  }

  // 6. Straight
  if (isStraight) {
    return { rankScore: 4, name: 'Straight', payoutMultiplier: 4, description: '5 consecutive ranks', isWin: true };
  }

  // 7. Three of a Kind
  if (countValues[0] === 3) {
    return { rankScore: 3, name: 'Three of a Kind', payoutMultiplier: 3, description: 'Three cards of same rank', isWin: true };
  }

  // 8. Two Pair
  if (countValues[0] === 2 && countValues[1] === 2) {
    return { rankScore: 2, name: 'Two Pair', payoutMultiplier: 2, description: 'Two distinct pairs', isWin: true };
  }

  // 9. Jacks or Better (Pair of J, Q, K, A)
  if (countValues[0] === 2) {
    const pairValue = Number(Object.keys(counts).find((k) => counts[Number(k)] === 2));
    if (pairValue >= 11) {
      return { rankScore: 1, name: `Jacks or Better (${sorted.find((c) => c.value === pairValue)?.rank}s)`, payoutMultiplier: 1, description: 'Pair of Jacks, Queens, Kings or Aces', isWin: true };
    }
    return { rankScore: 0.5, name: `Low Pair (${sorted.find((c) => c.value === pairValue)?.rank}s)`, payoutMultiplier: 0, description: 'Below Jacks (No Payout)', isWin: false };
  }

  return { rankScore: 0, name: `High Card (${sorted[0].rank})`, payoutMultiplier: 0, description: 'No winning combination', isWin: false };
}

// 3-Card Teen Patti / Tri-Card Evaluator
export interface TeenPattiResult {
  handRank: number; // 6 to 1
  name: string;
  highCardValue: number;
}

export function evaluateTeenPatti(cards: Card[]): TeenPattiResult {
  if (cards.length !== 3) {
    return { handRank: 0, name: 'Invalid', highCardValue: 0 };
  }

  const sorted = [...cards].sort((a, b) => b.value - a.value);
  const v = sorted.map((c) => c.value);
  const s = sorted.map((c) => c.suit);

  const isFlush = s[0] === s[1] && s[1] === s[2];
  const isStraight = (v[0] - v[1] === 1 && v[1] - v[2] === 1) || (v[0] === 14 && v[1] === 3 && v[2] === 2); // A-2-3 or normal

  // Trio / Trail (Three of a kind)
  if (v[0] === v[1] && v[1] === v[2]) {
    return { handRank: 6, name: `Trail / Trio (${sorted[0].rank}s)`, highCardValue: v[0] };
  }

  // Pure Sequence (Straight Flush)
  if (isStraight && isFlush) {
    return { handRank: 5, name: `Pure Sequence (${sorted[0].rank} High)`, highCardValue: v[0] };
  }

  // Sequence (Straight)
  if (isStraight) {
    return { handRank: 4, name: `Sequence / Normal Run (${sorted[0].rank} High)`, highCardValue: v[0] };
  }

  // Color (Flush)
  if (isFlush) {
    return { handRank: 3, name: `Color / Flush (${sorted[0].rank} High)`, highCardValue: v[0] };
  }

  // Pair
  if (v[0] === v[1] || v[1] === v[2] || v[0] === v[2]) {
    const pairRank = v[0] === v[1] ? v[0] : v[2];
    const pairCard = sorted.find((c) => c.value === pairRank);
    return { handRank: 2, name: `Pair of ${pairCard?.rank}s`, highCardValue: pairRank };
  }

  // High card
  return { handRank: 1, name: `High Card (${sorted[0].rank})`, highCardValue: v[0] };
}
