import type { TechCategory } from '../types';

export const techCategories: TechCategory[] = [
  {
    title: 'Game Client & Frontend',
    subtitle: 'Ultra-lightweight rendering engines engineered for 60 FPS across budget mobile devices and web browsers.',
    items: [
      {
        name: 'PixiJS & Canvas 2D',
        role: 'Hardware-Accelerated Rendering',
        description: 'Blazing fast WebGL & 2D Canvas rendering for smooth animations with minimal battery drain.',
        badge: 'Client Core',
        iconName: 'Layout'
      },
      {
        name: 'React 19 & Next.js',
        role: 'Web Application & Lobby Shell',
        description: 'Modular UI framework for responsive game lobbies, player statistics, and authentication wrappers.',
        badge: 'UI Framework',
        iconName: 'Component'
      },
      {
        name: 'React Native & Flutter',
        role: 'Cross-Platform Mobile Apps',
        description: 'Native Android and iOS wrappers delivering crisp performance with zero WebView latency.',
        badge: 'Mobile SDK',
        iconName: 'Smartphone'
      },
      {
        name: 'WebAudio API & Howler.js',
        role: 'Dynamic Spatial Audio',
        description: 'Low-latency multi-channel audio synthesis for synchronized dice rolls, card flips, and win fanfares.',
        badge: 'Audio Engine',
        iconName: 'Volume2'
      }
    ]
  },
  {
    title: 'Backend & Game Server Engines',
    subtitle: 'Authoritative server daemons built with typed, compiled languages for deterministic game state resolution.',
    items: [
      {
        name: 'Go (Golang)',
        role: 'High-Concurrency Room Daemons',
        description: 'Lightweight goroutines handle tens of thousands of active game rooms with near-zero memory footprint.',
        badge: 'Server Core',
        iconName: 'Cpu'
      },
      {
        name: 'Node.js & TypeScript',
        role: 'Microservices & Platform APIs',
        description: 'Fast, typed event-driven services for matchmaking, authentication, telemetry, and platform integrations.',
        badge: 'API Layer',
        iconName: 'Server'
      },
      {
        name: 'Rust (Engine Micro-Cores)',
        role: 'Deterministic Math & RNG Modules',
        description: 'Memory-safe cryptographic RNG and heavy state calculation cores where performance is critical.',
        badge: 'Performance Core',
        iconName: 'ShieldCheck'
      }
    ]
  },
  {
    title: 'Real-Time Communication',
    subtitle: 'Sub-30ms bidirectional binary streaming protocols optimized for mobile edge networks.',
    items: [
      {
        name: 'WebSockets (Binary Streams)',
        role: 'Low-Latency Full-Duplex Link',
        description: 'Persistent duplex sockets streaming binary frames for instantaneous turn updates.',
        badge: 'Real-Time',
        iconName: 'Zap'
      },
      {
        name: 'Protocol Buffers (Protobuf)',
        role: 'Compact Payload Serialization',
        description: 'Up to 6x smaller packet sizes compared to JSON, reducing mobile data consumption and latency.',
        badge: 'Network Protocol',
        iconName: 'Binary'
      },
      {
        name: 'gRPC Microservices',
        role: 'Inter-Service High-Speed RPC',
        description: 'Synchronous internal communication between matchmakers, room servers, and wallet processors.',
        badge: 'Internal Network',
        iconName: 'Network'
      }
    ]
  },
  {
    title: 'Databases, Caching & State Storage',
    subtitle: 'Hybrid in-memory cache and transactional ACID storage ensuring zero state desync or balance errors.',
    items: [
      {
        name: 'Redis Cluster',
        role: 'In-Memory State & Pub/Sub',
        description: 'Sub-millisecond room locks, active player lobbies, leaderboard ranking, and multi-node messaging.',
        badge: 'In-Memory',
        iconName: 'Flame'
      },
      {
        name: 'PostgreSQL',
        role: 'Transactional Relational Storage',
        description: 'ACID-compliant storage for financial transactions, user ledgers, game audits, and platform settings.',
        badge: 'Primary DB',
        iconName: 'Database'
      },
      {
        name: 'MongoDB',
        role: 'Match History & Game Logs',
        description: 'Flexible document store for comprehensive turn-by-turn telemetry and historical replay payloads.',
        badge: 'Telemetry DB',
        iconName: 'FileText'
      }
    ]
  },
  {
    title: 'Cloud, DevOps & Security',
    subtitle: 'Resilient cloud infrastructure with automated container auto-scaling and anti-DDoS shields.',
    items: [
      {
        name: 'Amazon Web Services (AWS)',
        role: 'Global Cloud Infrastructure',
        description: 'Containerized workloads on ECS/EKS with Auto-Scaling Groups, RDS Multi-AZ, and ElastiCache.',
        badge: 'Cloud Host',
        iconName: 'Cloud'
      },
      {
        name: 'Docker & Kubernetes',
        role: 'Container Orchestration',
        description: 'Microservice isolation allowing automated rollouts, health checks, and self-healing cluster nodes.',
        badge: 'DevOps',
        iconName: 'Box'
      },
      {
        name: 'Cloudflare Enterprise',
        role: 'Edge CDN & DDoS Mitigation',
        description: 'Global anycast routing, WAF inspection, SSL termination, and protection against layer-7 floods.',
        badge: 'Security',
        iconName: 'Shield'
      }
    ]
  }
];

export const developmentProcess = [
  {
    step: '01',
    title: 'Discovery & Requirements Analysis',
    description: 'We align on your target audience, platform architecture, monetization models, and exact game mechanic specifications.',
    deliverable: 'Technical Scope Document & Architecture Blueprint'
  },
  {
    step: '02',
    title: 'Game Planning & Mathematical Modeling',
    description: 'Our game designers craft the complete Game Design Document (GDD), rule variations, house edge calculations, and economy loop.',
    deliverable: 'GDD & Math Simulation Models'
  },
  {
    step: '03',
    title: 'UI/UX & Motion Prototyping',
    description: 'Interactive wireframes, custom visual styling, responsive layouts, and dynamic animation prototypes for stakeholder review.',
    deliverable: 'Complete Figma Design System & Asset Sprites'
  },
  {
    step: '04',
    title: 'Client & Server Engine Development',
    description: 'Parallel engineering of the lightweight client rendering loop and the authoritative stateful room server daemon.',
    deliverable: 'Working Alpha Build with Core Game Loop'
  },
  {
    step: '05',
    title: 'Multiplayer & Platform API Integration',
    description: 'Wiring up real-time WebSocket communication, wallet debit/credit webhooks, SSO authentication, and admin hooks.',
    deliverable: 'Beta Integration Build with Live Platform APIs'
  },
  {
    step: '06',
    title: 'Exhaustive QA & Load Stress Testing',
    description: 'Automated 100k+ headless bot stress testing, packet-loss latency simulations, and edge-case security audits.',
    deliverable: 'QA Verification & Load Benchmark Report'
  },
  {
    step: '07',
    title: 'Production Staging & Cloud Deployment',
    description: 'Provisioning production cloud infrastructure, configuring auto-scaling clusters, CDN edge routing, and monitoring alerts.',
    deliverable: 'Live Production Release & Domain Pointing'
  },
  {
    step: '08',
    title: '24/7 SLA Support & Optimization',
    description: 'Continuous monitoring, telemetry optimization, OS compatibility patches, and iterative feature enhancements.',
    deliverable: 'Dedicated Support Portal & Ongoing Upgrades'
  }
];
