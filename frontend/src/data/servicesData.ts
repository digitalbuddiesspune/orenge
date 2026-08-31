import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-custom-game-dev',
    slug: 'custom-game-development',
    title: 'Custom Game Development',
    tagline: 'End-to-end bespoke game engineering engineered to your exact product specs.',
    description: 'We develop custom 2D/3D games from original concepts or licensed IP. Our multidisciplinary engineering team delivers client-side rendering, game loop optimization, mathematics, sound design, and full source code handover.',
    iconName: 'Gamepad2',
    deliverables: [
      'Game Design Document (GDD) & Math Specification',
      'Production-ready Game Client (Web HTML5/Canvas/WebGL & Native)',
      'Custom Sound Effects, FX Particles & Visual Assets',
      'Full Source Code Handover & IP Rights'
    ],
    technicalSpecs: ['PixiJS / Phaser / Canvas 2D', '60 FPS Mobile Optimization', 'Responsive Dynamic Viewports', 'Asset Bundle Compression < 5MB'],
    businessBenefits: ['100% Proprietary IP ownership', 'Differentiate from generic white-label competitors', 'Full freedom to iterate game mechanics']
  },
  {
    id: 'srv-multiplayer',
    slug: 'multiplayer-game-development',
    title: 'Real-Time Multiplayer Systems',
    tagline: 'Sub-50ms synchronized room engines capable of scaling to hundreds of thousands of concurrent users.',
    description: 'Specialized multiplayer architecture using authoritative server logic, deterministic state interpolation, and binary WebSocket protocols. Protect your games from client tampering while guaranteeing flawless peer synchronization.',
    iconName: 'Users',
    deliverables: [
      'Stateful Game Room Servers (Go / Node.js / Rust)',
      'Dynamic Matchmaking & ELO Rating Microservices',
      'Private Custom Rooms with Shareable Passcodes',
      'Auto-Reconnect Buffering & Disconnection Guards'
    ],
    technicalSpecs: ['WebSockets & Protobuf binary encoding', 'Redis Cluster pub/sub synchronization', 'Low-latency global edge routing', 'Sub-50ms turn synchronization'],
    businessBenefits: ['Eliminates player sync lag & drops', 'Ensures provably fair cheating-free gameplay', 'Seamlessly handles massive traffic spikes']
  },
  {
    id: 'srv-ui-ux',
    slug: 'game-ui-ux-design',
    title: 'Game UI/UX & Motion Design',
    tagline: 'Modern, high-conversion game interfaces and kinetic motion graphics tailored for maximum engagement.',
    description: 'We craft intuitive player onboarding, frictionless betting or turn controls, captivating particle animations, and tactile haptic feedback designed to maximize player retention and session length.',
    iconName: 'Sparkles',
    deliverables: [
      'Interactive Figma Prototypes & Design Systems',
      'Motion Spritesheets, Spine 2D Animations & Lottie FX',
      'Responsive Mobile-First HUD & Table Layouts',
      'Localized Multi-Language Typography & Layouts'
    ],
    technicalSpecs: ['Spine 2D / DragonBones integration', 'High DPI Retina vector rendering', 'CSS3 & Canvas shader lighting effects'],
    businessBenefits: ['Higher player retention & lower bounce rates', 'Effortless navigation on low-end mobile devices', 'Polished international studio aesthetic']
  },
  {
    id: 'srv-backend-dev',
    slug: 'backend-development',
    title: 'Game Backend & Engine Logic',
    tagline: 'Robust, distributed server architectures with bulletproof state persistence and security.',
    description: 'Game logic belongs on the server. We engineer fault-tolerant backend infrastructures that process millions of game turns, handle player wallets, validate game rules, and maintain rock-solid uptime.',
    iconName: 'Server',
    deliverables: [
      'Deterministic Game State Engines',
      'Distributed Session Managers & Microservices',
      'High-throughput Transactional Databases',
      'Automated Disaster Recovery & Data Replication'
    ],
    technicalSpecs: ['Go / Node.js / Rust backend daemons', 'PostgreSQL / MongoDB / Redis clusters', 'Docker / Kubernetes containerization'],
    businessBenefits: ['Zero financial discrepancies', '99.99% server uptime SLA', 'Horizontal scaling without downtime']
  },
  {
    id: 'srv-api-integration',
    slug: 'api-development-integration',
    title: 'Game API & Platform Integration',
    tagline: 'Seamlessly plug our games into your existing platform, user database, and wallet systems.',
    description: 'We provide modular REST, GraphQL, and Webhook APIs that allow you to drop Oreng games directly into your existing web, iOS, or Android gaming platform in days rather than months.',
    iconName: 'Code2',
    deliverables: [
      'Single Sign-On (SSO) & JWT Token Integration',
      'Seamless Wallet / Credit Hooks (Debit, Credit, Rollback)',
      'Real-Time Webhook Notification Streams',
      'Comprehensive Interactive Postman & OpenAPI Docs'
    ],
    technicalSpecs: ['HMAC SHA-256 Signature Verification', 'Idempotent Transaction Endpoints', 'Sub-100ms API Response Times'],
    businessBenefits: ['Fast time-to-market (integrate in < 1 week)', 'No need to rewrite your existing platform auth', 'Zero-leak financial reconciliation']
  },
  {
    id: 'srv-admin-panel',
    slug: 'game-admin-panel',
    title: 'Game Admin & Telemetry Systems',
    tagline: 'Comprehensive real-time command center for telemetry, RTP tweaking, player management, and fraud detection.',
    description: 'Gain total control over your game operations with a dedicated admin portal. Monitor active rooms, configure game parameters on the fly, inspect suspicious behavior, and generate financial reports.',
    iconName: 'ShieldAlert',
    deliverables: [
      'Real-Time Match & Player Inspector Dashboard',
      'Live Parameter & Rule Configuration Editor',
      'Suspicious Activity & Anti-Collusion Flagging',
      'Automated Financial, Rake & Retention Reports'
    ],
    technicalSpecs: ['React / Vite Admin Interface', 'Role-Based Access Control (RBAC)', 'Audit Log Tracing & Replay Player'],
    businessBenefits: ['Empower operations without engineer dependency', 'Instant dispute resolution with replay verification', 'Complete operational transparency']
  },
  {
    id: 'srv-white-label',
    slug: 'white-label-game-solutions',
    title: 'White-Label Game Solutions',
    tagline: 'Production-ready game titles customized with your branding, colors, and platform rules.',
    description: 'Accelerate your go-to-market with battle-tested game engines. We rebrand our proven titles (Ludo, Card Engines, Dice, Casual) to match your visual identity, configure your custom rules, and deploy onto your servers.',
    iconName: 'Layers',
    deliverables: [
      'Custom Theming & Brand Assets Integration',
      'Configured House Commission & Table Tiers',
      'White-label Mobile App Builds (Android/iOS)',
      'Direct Cloud Staging & Production Deployment'
    ],
    technicalSpecs: ['Pre-certified RNG logic', 'Automated build pipeline (CI/CD)', 'Turnkey multi-currency support'],
    businessBenefits: ['Launch in under 2 weeks', 'Significantly lower upfront capital investment', 'Battle-tested stability under heavy load']
  },
  {
    id: 'srv-qa-testing',
    slug: 'game-testing-qa',
    title: 'Game QA & Load Testing',
    tagline: 'Exhaustive functional, edge-case, and high-concurrency stress testing before public launch.',
    description: 'Our QA engineers subject every game build to rigorous headless bot simulations, packet-loss testing, device fragmentation verification, and automated security penetration tests.',
    iconName: 'CheckCircle2',
    deliverables: [
      'Automated Headless Bot Simulation up to 100k Users',
      'Network Chaos & Packet-Loss Tolerance Tests',
      'Cross-Device & Cross-Browser Verification Matrices',
      'Comprehensive Security & Penetration Audit Reports'
    ],
    technicalSpecs: ['K6 & Artillery load testing engines', 'Device farm automation', 'WebSocket stress benchmarks'],
    businessBenefits: ['Zero launch-day crashes or server meltdowns', 'Flawless performance across tier-2/3 network connections', 'Confidence in critical financial state logic']
  },
  {
    id: 'srv-deployment',
    slug: 'cloud-deployment-devops',
    title: 'Cloud Deployment & DevOps',
    tagline: 'Enterprise cloud infrastructure designed for automatic horizontal scaling and global edge delivery.',
    description: 'We architect and provision production environments on AWS, Google Cloud, or your private servers using infrastructure-as-code, automatic cluster autoscaling, and global CDN caching.',
    iconName: 'Cloud',
    deliverables: [
      'Terraform / Kubernetes Infrastructure Scripts',
      'Auto-scaling Server Clusters with Zero Downtime',
      'Global Cloudflare / CloudFront CDN Configuration',
      'Continuous Integration & Continuous Delivery (CI/CD)'
    ],
    technicalSpecs: ['AWS ECS / EKS / Fargate', 'Prometheus & Grafana Monitoring', 'Automated Health Checks & Self-Healing'],
    businessBenefits: ['Optimized cloud costs (scale on demand)', 'Low latency for players across the globe', 'Zero-downtime rolling updates']
  },
  {
    id: 'srv-maintenance',
    slug: 'maintenance-support',
    title: '24/7 SLA Maintenance & Support',
    tagline: 'Dedicated engineering support, proactive monitoring, and continuous game feature upgrades.',
    description: 'We don’t abandon you post-launch. Our team provides dedicated SLA support packages, real-time alert monitoring, security patches, OS compatibility updates, and ongoing feature enhancements.',
    iconName: 'LifeBuoy',
    deliverables: [
      'Dedicated Engineering Response Channels (Slack / WhatsApp / Jira)',
      '24/7 Server Alert Monitoring & Incident Response',
      'Quarterly Performance & Engine Optimization Reviews',
      'Regular Android/iOS OS Compatibility Upgrades'
    ],
    technicalSpecs: ['Tier-1 Priority SLA (< 15 min response for critical)', 'Automated Error Reporting Sentry Integration'],
    businessBenefits: ['Total peace of mind for your executive team', 'Continuous product improvements and longevity', 'Consistent player satisfaction']
  }
];
