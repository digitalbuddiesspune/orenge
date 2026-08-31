import type { Game } from '../types';

export const initialGames: Game[] = [
  {
    id: 'game-ludo-3d',
    slug: 'ludo',
    title: 'Multiplayer 3D Ludo Engine',
    tagline: 'Sub-45ms real-time 4-player Ludo with 3D dice physics, customizable tokens, private room lobbies & anti-fraud server state.',
    category: 'Board Games',
    thumbnail: '/assets/ludo_3d_gameplay.jpg',
    bannerImage: '/assets/ludo_3d_gameplay.jpg',
    shortDescription: 'Enterprise-grade 2 to 4 player real-time Ludo game client and server logic. Features synchronized dice physics, room code generation, spectator modes, and fraud prevention.',
    fullOverview: 'Oreng’s Multiplayer Ludo Engine is engineered from the ground up for high-traffic gaming platforms, consumer reward apps, and international publishers. Built on an authoritative server architecture, it eliminates client-side cheating while delivering sub-50ms turn synchronization across low-bandwidth mobile networks.',
    gameplaySummary: 'Players compete across a precision-rendered dynamic 4-color board. Dice rolls trigger deterministic token animations, automated turn timers, safety zone calculations, and real-time victory celebrations.',
    features: [
      'Real-time 2-Player & 4-Player Matchmaking Queues',
      'Private Custom Rooms with Shareable 6-Digit Passcodes',
      'Authoritative Server-side RNG & Dice Physics Simulator',
      'Sub-45ms Turn Synchronization over WebSockets',
      'Configurable Turn Timers (15s/30s) & Auto-Bot Disconnect Fallback',
      'Custom Token Skins, Board Themes & Dynamic Particle FX',
      'Granular Admin Telemetry & Real-Time Match Inspector',
      'Webhook-driven Session Payouts & Platform Balances'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS', 'React Native/Flutter'],
    multiplayer: true,
    maxPlayers: '2 to 4 Players per Room',
    syncLatency: '< 38ms WebSocket Ping',
    customizationOptions: [
      'Custom Board Branding, Colors, and Sponsor Logo Slots',
      'Custom Rulesets (Quick Mode, Classic Rules, Timer Variations)',
      'Sound FX, Animated Emojis & Voice Chat Hooks',
      'White-label Native App Wrappers and Web SDK Embeds'
    ],
    architectureHighlights: [
      'PixiJS / Canvas 2D WebGL rendering pipeline for 60 FPS mobile performance',
      'Stateful Go / Node.js room server with automatic Redis lock management',
      'Zero-trust server-side state validation preventing manipulated turn payloads',
      'REST & gRPC endpoints for seamless balance authorization and user auth'
    ],
    adminCapabilities: [
      'Live Room Inspector (View active matches, player pings, and disconnects)',
      'Game Parameter Tweaker (Turn time limits, dice randomness seeds, bot aggression)',
      'Historical Replay Log & Rollback Verification for Disputed Matches',
      'Platform Commission & Revenue Analytics Dashboard'
    ],
    apiIntegrationPoints: [
      'POST /api/v1/game/session/create - Initialize authenticated player match',
      'POST /api/v1/game/wallet/debit - Deduct entry credit / token balance',
      'POST /api/v1/game/wallet/credit - Settle winner distribution',
      'WSS /ws/ludo/room/:roomId - Real-time binary event stream'
    ],
    isFeatured: true,
    status: 'Production Ready'
  },
  {
    id: 'game-poker-rummy-cards',
    slug: 'multiplayer-cards',
    title: 'Multi-Table Card & Rummy Suite (Poker / Teen Patti Core)',
    tagline: 'Ultra-low-latency card room engine with cryptographic Fisher-Yates shuffle, multi-seat lobbies & certified RNG mathematics.',
    category: 'Card Games',
    thumbnail: '/assets/poker_table_gameplay.jpg',
    bannerImage: '/assets/poker_table_gameplay.jpg',
    shortDescription: 'Scalable card room engine supporting 2-to-6 player tables, customizable card decks, dynamic meld validation, point calculations, and seamless wallet hooks.',
    fullOverview: 'Developed for operators who demand uncompromising reliability and regulatory transparency. The engine features provably-fair Fisher-Yates server shuffles, synchronized dealing animations, table re-buy logic, and comprehensive audit logs.',
    gameplaySummary: 'Engaging green-felt and modern neon table interfaces. Features smooth card fan-out animations, drag-and-drop grouping, card sorting algorithms, and automated declaration validation.',
    features: [
      '2 to 6 Seat Multi-Table Lobby Management',
      'Cryptographic Fisher-Yates Server-Side Shuffling',
      'Dynamic Card Grouping & Auto-Sort Algorithms',
      'Split-Pot & Multi-Tier Score Settlements',
      'Anti-Collusion Seat Randomization & IP Matching Guards',
      'In-Game Interactive Emojis, Quick Chats & Dealer Animations',
      'Automated Disconnect Guard with Turn Auto-Play Buffer',
      'Comprehensive Hand History and Session Replay'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS', 'Desktop SDK'],
    multiplayer: true,
    maxPlayers: '2 to 6 Players per Table',
    syncLatency: '< 28ms Event Broadcast',
    customizationOptions: [
      'Full UI Reskinning (Table felt textures, Card Backs, Dealer Avatars)',
      'Custom Game Rules (Points, Deals, Pool, Joker Rules)',
      'Multi-currency / Points Wallet Integration',
      'Multi-Language UI (English, Hindi, Arabic, Spanish, French)'
    ],
    architectureHighlights: [
      'Low-overhead Protobuf payload serialization for lightning-fast card draws',
      'Clustered Redis Pub/Sub for cross-server lobby synchronization',
      'Deterministic state engine eliminating card sync mismatches',
      'Stateless matchmaker microservice balancing player skill ratings'
    ],
    adminCapabilities: [
      'Real-Time Table Monitoring (Live hands, active bets, player balances)',
      'Anti-Fraud Anomaly Detector (Flagging suspicious folding patterns & shared IPs)',
      'Rake & Commission Configuration per Table Tier',
      'Player Hand Replay Audit Logs with Timestamped RNG Seeds'
    ],
    apiIntegrationPoints: [
      'POST /api/v1/cards/lobby/join - Authorize table seat allocation',
      'POST /api/v1/cards/settlement/payout - Push final hand points & payout',
      'WSS /ws/cards/table/:tableId - Secure WebSocket event channel'
    ],
    isFeatured: true,
    status: 'Production Ready'
  },
  {
    id: 'game-live-roulette',
    slug: 'roulette-casino-engine',
    title: 'European Live Roulette & Casino Wheel Engine',
    tagline: 'High-definition 3D physics roulette simulator with multi-tier betting tables, live dealer feeds, and instant round payouts.',
    category: 'Game Engines',
    thumbnail: '/assets/roulette_engine.jpg',
    bannerImage: '/assets/roulette_engine.jpg',
    shortDescription: 'High-throughput roulette engine featuring authentic wheel ball spin physics, race-track betting grids, statistical heatmaps, and sub-10ms bet settlement.',
    fullOverview: 'Engineered for casino platform operators requiring high concurrency and certified RTP mathematics. Supports single-zero European and double-zero American rules, dynamic hot/cold number stats, and full wallet API webhooks.',
    gameplaySummary: 'Players place chip bets on an intuitive velvet cloth betting layout (Straights, Splits, Corners, Red/Black). Real-time 3D wheel animations execute deterministic server-generated spins with instant payout credits.',
    features: [
      'Mass-Spectator Concurrency (10,000+ Players per Wheel)',
      'Certified Cryptographic Wheel Spin Outcome Seeds',
      'Interactive Racetrack & French Call Bets (Voisins, Tiers, Orphelins)',
      'Live Hot & Cold Number Statistical Heatmaps',
      'Multi-Chip Denomination Selector ($1 to $5,000)',
      'Automated Round Cooldown & 15-Second Betting Window',
      'Live Dealer Video Stream & Digital Overlay Sync',
      'Anti-Fraud Table Bet Maxima & Exposure Control'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS', 'Desktop SDK'],
    multiplayer: true,
    maxPlayers: 'Unlimited Simultaneous Bettors',
    syncLatency: '< 20ms Wheel State Broadcast',
    customizationOptions: [
      'Custom Wheel Models (European 37 Pockets, American 38 Pockets)',
      'Custom Table Felt Color (Emerald Green, Royal Burgundy, Midnight Blue)',
      'Custom Chip Sets, Soundtracks & Multi-Language Voice Callouts',
      'Configurable Table Limits and VIP High-Roller Tiers'
    ],
    architectureHighlights: [
      'Micro-daemon physics simulation running on compiled Go',
      'Zero-latency Redis batched bet accumulation and sub-second settlement',
      'WebSocket binary delta state streaming'
    ],
    adminCapabilities: [
      'Live Wheel Exposure & Real-Time House Edge Telemetry',
      'Round-by-Round Cryptographic Spin Hash Inspector',
      'Table Max Exposure Circuit Breaker'
    ],
    apiIntegrationPoints: [
      'POST /api/v1/roulette/bet - Submit and lock chip positions',
      'POST /api/v1/roulette/payout - Batch settle winning numbers',
      'WSS /ws/roulette/table/:tableId - Live wheel tick and state sync'
    ],
    isFeatured: true,
    status: 'Production Ready'
  },
  {
    id: 'game-crash-arena',
    slug: 'crash-multiplier',
    title: 'High-Concurrency Multiplier Crash Engine',
    tagline: 'High-velocity multiplier curve simulator with instant sub-10ms cashout triggers and mass spectator broadcast.',
    category: 'Game Engines',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    shortDescription: 'Custom multiplier game engine capable of broadcasting synchronized curve ticks to 50,000+ concurrent players with sub-10ms cashout execution.',
    fullOverview: 'Built specifically for high-velocity entertainment platforms and gamified reward systems. The engine supports custom visual assets (Rocket, Airplane, Stock Ticker, Energy Pulse), verifiable SHA-256 seed generation, and auto-cashout mechanisms.',
    gameplaySummary: 'Players watch a dynamic curve escalate in real time. The multiplier climbs until an abrupt randomized crash point occurs. Players trigger instant cashout to claim their multiplied score before the crash.',
    features: [
      'Handles 50,000+ Concurrent Viewers per Game Round',
      'Sub-10ms Cashout Reaction Verification',
      'Verifiable SHA-256 Hash Chain Provability',
      'Live Player Bets & Cashout Stream Ticker',
      'Custom Multiplier Curves (Linear, Exponential, Step-wise)',
      'Dual Bet / Split Strategy Action Controls',
      'Automated Round Scheduling & 5-Second Cooldowns',
      'Interactive Live Chat & Emote Reactions'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
    multiplayer: true,
    maxPlayers: 'Unlimited Spectators / 10k+ Simultaneous Players',
    syncLatency: '< 15ms Broadcast Tick',
    customizationOptions: [
      'Visual Theme Variations (Space, Retro Neon, Aviation, Cyberpunk)',
      'Custom RTP (Return to Player) and House Commission Curve Parameters',
      'Sound Engineering and Haptic Feedback for Mobile Devices'
    ],
    architectureHighlights: [
      'High-performance Go/Rust ticker daemon streaming binary state frames',
      'In-memory Redis sorted sets for instantaneous sub-millisecond cashouts',
      'Zero-database round execution with batched post-round persistence'
    ],
    adminCapabilities: [
      'Live Multiplier Curve Monitor & Player Exposure Metrics',
      'Instant Emergency Pause & Circuit Breaker Triggers',
      'Round-by-Round Seed Verification Inspector'
    ],
    apiIntegrationPoints: [
      'POST /api/v1/multiplier/bet - Lock player wager/credits',
      'POST /api/v1/multiplier/cashout - Execute instant cashout timestamp',
      'WSS /ws/multiplier/stream - Multi-cast curve broadcast'
    ],
    isFeatured: true,
    status: 'SDK Ready'
  },
  {
    id: 'game-strategy-dice',
    slug: 'strategy-dice-arena',
    title: '3D Dice Battle & Casual Strategy Arena',
    tagline: 'Engaging turn-based casual strategy mechanics built for mobile retention and viral platform engagement.',
    category: 'Casual Games',
    thumbnail: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    shortDescription: 'Fast-paced, highly engaging casual dice battle engine with modifier cards, power-ups, daily challenges, and integrated tournament ladders.',
    fullOverview: 'Perfect for brands looking to boost session duration and daily active users (DAU). This game combines simple dice rolling mechanics with tactical choice trees and social rivalry features.',
    gameplaySummary: 'Players roll custom dice sets, trigger combo multipliers, activate tactical shield cards, and capture territory or points against real-time opponents.',
    features: [
      'Rapid 3-Minute Match Sessions',
      'Asynchronous & Synchronous Multiplayer Modes',
      'Tournament Brackets & Knockout Ladders',
      'Collectible Dice Skins & Power-up Cards',
      'Social Leaderboards & Friends Matchmaking',
      'Daily Quest & Progression Rewards Engine'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
    multiplayer: true,
    maxPlayers: '1v1 & 4-Player Battle Royale',
    syncLatency: '< 60ms',
    customizationOptions: [
      'Brand Character Integration & Custom Mascot 3D Dice',
      'Custom Token Economy and In-Game Shop Architecture',
      'Soundtrack and Particle Effect Packs'
    ],
    architectureHighlights: [
      'Lightweight Phaser / PixiJS engine footprint under 3.5MB download',
      'Serverless auto-scaling match instances on AWS ECS'
    ],
    adminCapabilities: [
      'Tournament Scheduler & Bracket Automation',
      'Drop Rate & Loot Table Probability Editor'
    ],
    apiIntegrationPoints: [
      'POST /api/v1/tournaments/register',
      'POST /api/v1/dice/session/settle'
    ],
    isFeatured: false,
    status: 'Production Ready'
  },
  {
    id: 'game-custom-engine',
    slug: 'proprietary-custom-game',
    title: 'Custom Proprietary Game Concepts',
    tagline: 'Bespoke game development tailored from napkin sketch to production-grade deployment on your platform.',
    category: 'Custom Games',
    thumbnail: '/assets/casino_studio_hero.jpg',
    bannerImage: '/assets/casino_studio_hero.jpg',
    shortDescription: 'Have a unique game mechanic, regional classic, or gamified business product in mind? Oreng develops proprietary custom games with 100% IP ownership for your business.',
    fullOverview: 'We work directly with founders and platform executives to architect completely unique gaming intellectual properties. From initial game design documents (GDD), mathematical modeling, UI/UX concept art, to backend engineering and security audits.',
    gameplaySummary: 'Tailored specifically to your business mechanics—whether skill-based physics, strategy puzzles, multi-tier betting logic, or educational game loops.',
    features: [
      '100% Client Intellectual Property (IP) Ownership',
      'Full Source Code Delivery & Custom License Grants',
      'Custom Mathematical & Economic Modeling',
      'Multi-Language & Multi-Currency Architecture',
      'Enterprise API & Single Sign-On (SSO) Integration',
      'Dedicated Post-Launch Engineering & SLA Support'
    ],
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS', 'Desktop SDK', 'React Native/Flutter'],
    multiplayer: true,
    maxPlayers: 'Engineered to Specification',
    syncLatency: 'Custom Optimized',
    customizationOptions: [
      'Infinite Customization: You own the design, logic, and codebase',
      'Custom Integration with Proprietary Payment & Wallet Gateways'
    ],
    architectureHighlights: [
      'Modular microservices architecture adapted to your internal cloud infrastructure',
      'Comprehensive automated integration test suites and stress benchmarks'
    ],
    adminCapabilities: [
      'Bespoke Admin Portal tailored to your operations team workflow',
      'Custom Compliance & Financial Reporting Export Tools'
    ],
    apiIntegrationPoints: [
      'Tailored REST, GraphQL & WebSocket specifications built to match your platform'
    ],
    isFeatured: true,
    status: 'Custom Engine'
  }
];
