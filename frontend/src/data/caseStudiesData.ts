import type { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'case-study-ludo',
    slug: 'scaling-multiplayer-ludo-100k-ccu',
    title: 'High-Speed Multiplayer Ludo (100,000+ Live Players)',
    clientName: 'Major Gaming Platform',
    clientIndustry: 'Online Gaming Publisher (India & South-East Asia)',
    timeline: '6 Weeks from Concept to Launch',
    challenge: 'The client’s old game server kept crashing whenever more than 12,000 players played at the same time during evening tournaments. Frequent disconnections and lag caused player complaints and refund requests.',
    requirement: 'Build a fast, stable multiplayer Ludo game that can easily support 100,000+ players playing together with zero lag, instant turns, and cheat-proof dice rolls.',
    solution: 'Oreng rebuilt the game server using ultra-fast Go technology and lightweight real-time communication. We added automatic reconnection for players on slow 4G internet and verified server-side dice rolls.',
    results: [
      { metric: '100k+', label: 'Simultaneous Players' },
      { metric: '< 38ms', label: 'Super Fast Turn Speed' },
      { metric: '99.99%', label: 'Game Uptime' },
      { metric: '84%', label: 'Fewer Complaints' }
    ],
    techStack: ['Go (Golang)', 'Fast WebSockets', 'Redis Memory Cache', 'PixiJS 60 FPS Canvas', 'AWS Cloud Scaling', 'PostgreSQL'],
    featuresDelivered: [
      'Cheat-proof dice rolls calculated securely on the server',
      'Instant 2-player & 4-player matching with smart bot backup',
      'Live admin dashboard to monitor all active game rooms',
      'Safe, instant wallet balance updates with zero double-charge errors'
    ],
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-study-card-rooms',
    slug: 'multi-table-card-engine-integration',
    title: 'Multi-Table Card & Rummy Suite (2.4M+ Monthly Games)',
    clientName: 'International Gaming Operator',
    clientIndustry: 'Global Entertainment & Gaming Platform',
    timeline: '8 Weeks Complete Delivery',
    challenge: 'The operator wanted to add popular card games (Rummy, Teen Patti, Poker) to their existing app with multi-currency support, smooth mobile gestures, and certified 100% fair card shuffling.',
    requirement: 'Create a complete card room suite for 2 to 6 players per table, anti-cheating player protection, smooth touch controls, and seamless 1-click wallet connection.',
    solution: 'Oreng delivered a ready-to-launch Card Game Suite with silky smooth animations, certified random card shuffling, multi-language support (English, Hindi, Arabic, Spanish), and bank-grade secure wallet APIs.',
    results: [
      { metric: '2.4M+', label: 'Monthly Games Played' },
      { metric: '14 Days', label: 'Fast Platform Setup' },
      { metric: 'Zero', label: 'Payment or Wallet Errors' },
      { metric: '+42%', label: 'Longer Player Playtime' }
    ],
    techStack: ['TypeScript', 'Node.js Cluster', 'Redis Pub/Sub', 'PixiJS Smooth Canvas', 'Docker', 'Cloudflare Protection'],
    featuresDelivered: [
      '2 to 6 player table lobbies with automatic entry-fee calculations',
      'Smart anti-cheating system that blocks unfair group play',
      'Customizable table themes, card designs, and player chat emotes',
      'Detailed match history and round replay tools for platform owners'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-study-multiplier-engine',
    slug: 'high-velocity-multiplier-curve-engine',
    title: 'Instant-Cashout Multiplier & Crash Game (30,000+ Players)',
    clientName: 'Fast-Growing Gaming Startup',
    clientIndustry: 'Social & Instant-Win Gaming Platform',
    timeline: '5 Weeks Rapid Delivery',
    challenge: 'Building a multiplayer crash game where tens of thousands of players watch the multiplier rocket rise together and need their cashout button to respond in under 10 milliseconds without server lag.',
    requirement: 'Instant button response under 10 milliseconds, 100% provably fair random multiplier curves, and automated fast rounds every 15 seconds.',
    solution: 'Oreng created a high-speed game engine that broadcasts multiplier numbers to over 30,000 players at the exact same millisecond with certified random math outcomes.',
    results: [
      { metric: '30,000+', label: 'Live Players Per Room' },
      { metric: '< 8ms', label: 'Instant Cashout Time' },
      { metric: '100%', label: 'Fair & Verified Results' },
      { metric: '3.8x', label: 'Player Growth in 90 Days' }
    ],
    techStack: ['Rust & Go', 'High-Speed WebSockets', 'Redis Memory Streams', 'HTML5 60 FPS Canvas', 'AWS Cloud'],
    featuresDelivered: [
      '100% fair and verifiable round outcomes that players can trust',
      'Dual-bet panel with automatic cashout settings for players',
      'Real-time live bets ticker showing other players’ wins instantly'
    ],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
  }
];
