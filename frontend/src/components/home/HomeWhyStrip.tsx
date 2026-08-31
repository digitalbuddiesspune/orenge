import React from 'react';

const points = [
  { title: 'Built for your brand', text: 'Custom UI, rules, and branding around your platform.' },
  { title: 'Real-time multiplayer', text: 'Synchronized rooms, matchmaking, and server-side logic.' },
  { title: 'API-ready integration', text: 'Connect games to your existing auth, wallet, and platform.' },
  { title: 'Scalable backend', text: 'Game servers, databases, and admin systems built for scale.' },
  { title: 'Full source ownership', text: 'You own the code — no per-user royalties.' },
  { title: 'End-to-end delivery', text: 'From concept and UI/UX to deployment and support.' },
];

export const HomeWhyStrip: React.FC = () => (
  <section className="py-20 sm:py-24 border-t border-white/[0.06]">
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="max-w-2xl mb-12">
        <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#FF5B14] mb-3">
          Why Oreng
        </p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          More than game development.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {points.map((point) => (
          <div key={point.title} className="border-l-2 border-[#FF5B14]/40 pl-5">
            <h3 className="text-[15px] font-semibold text-white">{point.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
