import type { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'case-study-ludo',
    slug: 'scaling-multiplayer-ludo-100k-ccu',
    title: 'Architecting a 100k CCU Real-Time Ludo Platform',
    clientName: 'Confidential Enterprise Gaming Platform',
    clientIndustry: 'Real-Money & Casual Gaming Publisher (India & SEA)',
    timeline: '6 Weeks Concept to Production',
    challenge: 'The client’s legacy Node.js/Socket.IO game room servers were crashing at 12,000 concurrent connections during peak evening tournaments. Frequent disconnects and packet loss led to high customer refund disputes.',
    requirement: 'Develop a high-throughput, low-latency Ludo multiplayer engine capable of sustaining 100,000+ simultaneous players with sub-50ms turn delivery and deterministic server-side state enforcement.',
    solution: 'Oreng re-engineered the game room core into a lightweight compiled Go daemon using binary Protobuf payloads over WebSockets. Integrated Redis cluster for instantaneous room state locks and built an authoritative dice verification engine.',
    results: [
      { metric: '100k+ CCU', label: 'Sustained Peak Load' },
      { metric: '< 38ms', label: 'Average Turn Latency' },
      { metric: '99.99%', label: 'Uptime SLA' },
      { metric: '84%', label: 'Dispute Reduction' }
    ],
    techStack: ['Go (Golang)', 'WebSockets (Protobuf)', 'Redis Cluster', 'PixiJS WebGL', 'AWS ECS Fargate', 'PostgreSQL'],
    featuresDelivered: [
      'Authoritative server-side turn validation eliminating cheat modifications',
      'Instant 2-player & 4-player matchmaking queues with bot fallback buffers',
      'Real-time admin room telemetry and disputed match replay inspector',
      'Automated wallet debit/credit settlement via idempotent webhooks'
    ],
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-study-card-rooms',
    slug: 'multi-table-card-engine-integration',
    title: 'Turnkey Multi-Table Card & Rummy Engine Deployment',
    clientName: 'International Gaming Operator',
    clientIndustry: 'Global Entertainment & Sports Gaming Operator',
    timeline: '8 Weeks End-to-End',
    challenge: 'The operator needed to expand their gaming catalog with card games tailored for international markets with multi-currency wallets, localized table themes, and certified RNG compliance.',
    requirement: 'Deliver a custom card room suite with 2 to 6 player table lobbies, anti-collusion seat algorithms, smooth mobile gestures, and zero-leak API wallet integration.',
    solution: 'Oreng delivered a customized White-Label Card Engine featuring responsive Canvas UI, cryptographic Fisher-Yates server shuffle, multi-language localization (EN, HI, AR, ES), and high-security HMAC API hooks.',
    results: [
      { metric: '2.4M+', label: 'Monthly Active Games' },
      { metric: '14 Days', label: 'API Integration Time' },
      { metric: 'Zero', label: 'Financial Settlement Errors' },
      { metric: '+42%', label: 'Player Session Length' }
    ],
    techStack: ['TypeScript', 'Node.js Cluster', 'Redis Pub/Sub', 'PixiJS', 'Docker', 'Cloudflare CDN'],
    featuresDelivered: [
      'Multi-currency and points table configurations with automated rake calculation',
      'Anti-collusion IP, GPS and betting behavior anomaly detectors',
      'Dynamic table skinning and animated emotes system',
      'Comprehensive back-office hand history auditing tools'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-study-multiplier-engine',
    slug: 'high-velocity-multiplier-curve-engine',
    title: 'High-Velocity Multiplier Curve Engine with Sub-10ms Cashout',
    clientName: 'Next-Gen Gaming Startup',
    clientIndustry: 'Social Gaming & High-Velocity Entertainment Platform',
    timeline: '5 Weeks Rapid Delivery',
    challenge: 'Building a multiplayer multiplier curve game where thousands of simultaneous spectators must receive identical curve frames every 50ms and execute instant cashouts without server queuing lag.',
    requirement: 'Sub-10ms cashout execution timestamping, SHA-256 verifiable fairness hash chains, and automated round scheduling.',
    solution: 'Engineered a Rust-based ticker engine broadcasting binary broadcast ticks to 30,000+ simultaneous connected clients per room via Redis in-memory sorted sets.',
    results: [
      { metric: '30,000+', label: 'Concurrent Spectators' },
      { metric: '< 8ms', label: 'Cashout Processing' },
      { metric: '100%', label: 'Verifiable Hash Audits' },
      { metric: '3.8x', label: 'DAU Growth in Q1' }
    ],
    techStack: ['Rust', 'WebSockets', 'Redis Sorted Sets', 'HTML5 Canvas', 'AWS EKS'],
    featuresDelivered: [
      'Verifiable SHA-256 provably fair round seed validator',
      'Live dual-bet action panels with customizable auto-cashout presets',
      'Real-time global bet ticker stream and dynamic leaderboard'
    ],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
  }
];
