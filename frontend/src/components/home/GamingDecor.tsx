import React from 'react';

type DecorVariant = 'cards' | 'dice' | 'chips' | 'roulette' | 'mixed';

const suits = ['♠', '♥', '♦', '♣'] as const;

export const GamingDecor: React.FC<{ variant?: DecorVariant; className?: string }> = ({
  variant = 'mixed',
  className = '',
}) => (
  <div aria-hidden className={`pointer-events-none select-none ${className}`}>
    {(variant === 'cards' || variant === 'mixed') && (
      <>
        <span className="absolute top-12 right-8 text-4xl text-red-500/[0.07] animate-float-slow">♥</span>
        <span className="absolute top-32 right-24 text-3xl text-white/[0.06] animate-float-slow [animation-delay:1s]">♠</span>
        <span className="absolute bottom-20 right-12 text-2xl text-red-500/[0.05] animate-float-slow [animation-delay:2s]">♦</span>
        <span className="absolute bottom-40 right-32 text-3xl text-white/[0.05] animate-float-slow [animation-delay:0.5s]">♣</span>
      </>
    )}

    {(variant === 'dice' || variant === 'mixed') && (
      <div className="absolute top-16 left-[8%] w-10 h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] rotate-12 animate-float-slow [animation-delay:1.5s] shadow-lg">
        <div className="grid grid-cols-2 gap-1 p-2 h-full">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF5B14]/40" />
          ))}
        </div>
      </div>
    )}

    {(variant === 'chips' || variant === 'mixed') && (
      <div className="absolute bottom-24 left-[6%] animate-float-slow [animation-delay:0.8s]">
        <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#FF5B14]/20 bg-[#FF5B14]/[0.06]" />
        <div className="absolute inset-1 rounded-full border border-white/[0.1]" />
      </div>
    )}

    {(variant === 'roulette' || variant === 'mixed') && (
      <div className="absolute top-1/2 -translate-y-1/2 right-[4%] w-20 h-20 rounded-full border border-white/[0.06] opacity-40 animate-spin-slow hidden lg:block">
        <div className="absolute inset-2 rounded-full border border-[#FF5B14]/20" />
        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-white/20">
          00
        </div>
      </div>
    )}
  </div>
);

export const CardSuitPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 opacity-[0.035] ${className}`}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='8' y='22' fill='%23fff' font-size='14' opacity='0.8'%3E♠%3C/text%3E%3Ctext x='32' y='48' fill='%23ef4444' font-size='12' opacity='0.6'%3E♥%3C/text%3E%3Ctext x='38' y='18' fill='%23ef4444' font-size='11' opacity='0.5'%3E♦%3C/text%3E%3Ctext x='12' y='50' fill='%23fff' font-size='13' opacity='0.5'%3E♣%3C/text%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px',
    }}
  />
);

export const FeltGlow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute rounded-full blur-[80px] ${className}`}
    style={{
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
    }}
  />
);

export function SuitStrip() {
  return (
    <div className="flex items-center justify-center gap-3 text-lg tracking-widest" aria-hidden>
      {suits.map((suit) => (
        <span
          key={suit}
          className={`opacity-40 ${suit === '♥' || suit === '♦' ? 'text-red-400' : 'text-white'}`}
        >
          {suit}
        </span>
      ))}
    </div>
  );
}
