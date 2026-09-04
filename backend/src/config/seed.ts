import 'dotenv/config';
import { connectDb } from './db.js';
import { seedAdmin } from './seedAdmin.js';
import { Game } from '../models/Game.js';
import { CaseStudy } from '../models/CaseStudy.js';
import { BlogPost } from '../models/BlogPost.js';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI required');
    process.exit(1);
  }

  await connectDb(uri);
  await seedAdmin();

  const gameCount = await Game.countDocuments();
  if (gameCount === 0) {
    await Game.insertMany([
      {
        slug: 'ludo',
        title: 'Ludo 3D',
        tagline: 'Sub-45ms real-time 4-player Ludo with customizable tokens and private rooms.',
        category: 'Board Games',
        thumbnail: '/assets/ludo_3d_gameplay.jpg',
        bannerImage: '/assets/ludo_3d_gameplay.jpg',
        shortDescription:
          'Enterprise-grade 2 to 4 player real-time Ludo game client and server logic.',
        fullOverview:
          'Oreng’s Multiplayer Ludo Engine is engineered for high-traffic gaming platforms with authoritative server architecture.',
        gameplaySummary: 'Precision-rendered board with deterministic dice and turn timers.',
        features: [
          'Real-time matchmaking',
          'Private rooms',
          'Server-side RNG',
          'Admin telemetry',
        ],
        platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
        multiplayer: true,
        maxPlayers: '2 to 4 Players per Room',
        syncLatency: '< 38ms WebSocket Ping',
        isFeatured: true,
        published: true,
        status: 'Production Ready',
        sortOrder: 1,
      },
      {
        slug: 'multiplayer-cards',
        title: 'Cards & Rummy',
        tagline: 'Ultra-low-latency card room engine with certified RNG mathematics.',
        category: 'Card Games',
        thumbnail: '/assets/poker_table_gameplay.jpg',
        bannerImage: '/assets/poker_table_gameplay.jpg',
        shortDescription: 'Scalable card room engine supporting 2-to-6 player tables.',
        fullOverview: 'Provably-fair shuffles, multi-seat lobbies, and wallet-ready APIs.',
        gameplaySummary: 'Smooth dealing animations with automated meld validation.',
        features: ['Multi-table lobbies', 'Fisher-Yates shuffle', 'Anti-collusion'],
        platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
        multiplayer: true,
        maxPlayers: '2 to 6 Players per Table',
        syncLatency: '< 28ms Event Broadcast',
        isFeatured: true,
        published: true,
        status: 'Production Ready',
        sortOrder: 2,
      },
    ]);
    console.log('[seed] Sample games inserted');
  } else {
    console.log(`[seed] Games already present (${gameCount})`);
  }

  const caseCount = await CaseStudy.countDocuments();
  if (caseCount === 0) {
    await CaseStudy.create({
      slug: 'scaling-multiplayer-ludo-100k-ccu',
      title: 'Architecting a 100k CCU Real-Time Ludo Platform',
      clientName: 'Confidential Enterprise Gaming Platform',
      clientIndustry: 'Real-Money & Casual Gaming Publisher',
      timeline: '6 Weeks Concept to Production',
      challenge: 'Legacy room servers crashing under peak load.',
      requirement: 'Sustain 100,000+ CCU with sub-50ms turn delivery.',
      solution: 'Re-engineered room core with Redis locks and authoritative dice engine.',
      results: [
        { metric: '100k+ CCU', label: 'Sustained Peak Load' },
        { metric: '< 38ms', label: 'Average Turn Latency' },
      ],
      techStack: ['Go', 'WebSockets', 'Redis', 'AWS'],
      featuresDelivered: ['Authoritative validation', 'Matchmaking', 'Admin telemetry'],
      coverImage: '/assets/ludo_3d_gameplay.jpg',
      published: true,
      sortOrder: 1,
    });
    console.log('[seed] Sample case study inserted');
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.create({
      slug: 'how-to-build-a-realtime-multiplayer-game',
      title: 'How Real-Time Multiplayer Games Work',
      excerpt: 'Authoritative servers, WebSockets, and lag compensation explained.',
      publishedDate: new Date('2026-08-18'),
      readTime: '8 min read',
      category: 'Architecture',
      author: {
        name: 'Oreng Engineering',
        role: 'Game Systems',
        avatar: '',
      },
      content: [
        'Authoritative server architecture is the foundation of trustworthy multiplayer games.',
        'Binary serialization and Redis locks keep rooms consistent under load.',
      ],
      tags: ['WebSockets', 'Multiplayer', 'Architecture'],
      published: true,
      metaTitle: 'How Real-Time Multiplayer Games Work | Oreng',
      metaDescription: 'Engineering guide to sub-50ms synchronized multiplayer state.',
    });
    console.log('[seed] Sample blog post inserted');
  }

  console.log('[seed] Done');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
