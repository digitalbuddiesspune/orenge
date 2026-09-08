import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-custom-game-dev',
    slug: 'custom-game-development',
    title: 'Custom Game Development',
    tagline: 'Turn your unique game idea into a complete, ready-to-play mobile & web game.',
    description: 'Have an original game idea? We design the rules, draw all characters and screens, add fun sound effects, and build the entire game from scratch. You get 100% full ownership of the complete code and design.',
    iconName: 'Gamepad2',
    deliverables: [
      'Complete Ready-to-Play Game (Android, iPhone & Web)',
      'Eye-Catching Graphics, Characters & Sound FX',
      'Clear Game Rules & Fair Winning Logic',
      '100% Full Code & Design Ownership'
    ],
    technicalSpecs: ['Smooth on all Mobile Phones', 'Eye-Catching Graphics & Sound', 'Play on App or Browser', 'Quick Loading under 5MB'],
    businessBenefits: ['100% Full Ownership of your game', 'Unique game that stands out from competitors', 'Freedom to add new features anytime']
  },
  {
    id: 'srv-multiplayer',
    slug: 'multiplayer-game-development',
    title: 'Real-Time Multiplayer Systems',
    tagline: 'Connect thousands of online players with zero lag and zero cheating.',
    description: 'We create fast online multiplayer rooms where friends or players across the world can play together in real-time. Turns happen instantly with no lag, and automatic anti-cheat ensures 100% fair play.',
    iconName: 'Users',
    deliverables: [
      'Instant Online Matchmaking with Real Players',
      'Private Rooms with Shareable 6-Digit Codes',
      'Built-in Anti-Cheat & 100% Fair Play Protection',
      'Auto-Reconnect if Player’s Internet drops'
    ],
    technicalSpecs: ['Instant Turn Reactions (< 40ms)', 'Play with Friends or Online', 'Handles 50,000+ Live Players', 'Works on Weak Internet'],
    businessBenefits: ['Zero lag keeps players happy', 'Fair gameplay builds player trust', 'Easily handles huge tournament crowds']
  },
  {
    id: 'srv-ui-ux',
    slug: 'game-ui-ux-design',
    title: 'Game UI/UX & Motion Design',
    tagline: 'Simple, beautiful screens and exciting animations that players love.',
    description: 'We design clean, easy-to-use game screens so any player can start playing in 5 seconds without feeling confused. Includes exciting coin animations, celebration effects, and large, clear buttons.',
    iconName: 'Sparkles',
    deliverables: [
      'Simple Menus & Big, Easy-to-Tap Buttons',
      'Exciting Winning & Coin Flying Animations',
      'Perfect Look on Small, Medium & Big Phones',
      'Multi-Language Support (Hindi, English & Regional)'
    ],
    technicalSpecs: ['1-Tap Easy Controls', 'Smooth 60 FPS Animations', 'Clear Hindi & English Text', 'Modern Vibrant Visuals'],
    businessBenefits: ['Players understand the game instantly', 'Exciting win celebrations increase playtime', 'Works smoothly on budget mobile phones']
  },
  {
    id: 'srv-backend-dev',
    slug: 'backend-development',
    title: 'Game Backend & Engine Logic',
    tagline: 'Rock-solid cloud servers that handle millions of game turns safely.',
    description: 'The secure brain behind your game. Our cloud servers calculate every move, dice roll, score, and wallet balance instantly without errors, crashes, or data loss.',
    iconName: 'Server',
    deliverables: [
      '100% Accurate Score & Balance Calculations',
      'Zero-Crash 24/7 Server Reliability',
      'Instant Wallet Deposit & Win Payout Updates',
      'Automatic Daily Data Backup & Top Security'
    ],
    technicalSpecs: ['99.99% Guaranteed Server Uptime', '100% Safe & Encrypted Data', 'Instant Balance Updates', 'Automated Daily Backups'],
    businessBenefits: ['Zero money calculation mistakes', 'Game never crashes during peak hours', 'Safe from server overloads']
  },
  {
    id: 'srv-api-integration',
    slug: 'api-development-integration',
    title: 'Game API & Platform Integration',
    tagline: 'Easily connect our games into your existing website, app, or wallet in days.',
    description: 'Already have a website or mobile app? We make it super easy to drop our games right into your platform. Players can use their existing login, and money/points connect automatically.',
    iconName: 'Code2',
    deliverables: [
      '1-Click Login using your existing User Accounts',
      'Automatic Wallet Deposit & Withdrawal Sync',
      'Instant Match Result & Winner Alerts',
      'Full Setup & Testing completed in under 7 Days'
    ],
    technicalSpecs: ['Quick 7-Day Fast Setup', 'Works with UPI & Payment Gateways', 'Simple Plug & Play Connection', 'Instant Match Alerts'],
    businessBenefits: ['Launch fast without rebuilding your app', 'Seamless experience for your existing users', 'Safe and verified wallet transactions']
  },
  {
    id: 'srv-admin-panel',
    slug: 'game-admin-panel',
    title: 'Game Admin & Telemetry Systems',
    tagline: 'Your master control dashboard to see live players, earnings, and game rules.',
    description: 'Manage your entire gaming business from a simple dashboard on your phone or laptop. See how many players are online, check daily revenue, change winning rates, and block fraudsters with one click.',
    iconName: 'ShieldAlert',
    deliverables: [
      'Live Screen showing Active Players & Rooms',
      '1-Click Game Rules & Winning Rate Adjuster',
      'Daily Revenue & Player Activity Reports',
      'Anti-Fraud & Suspicious Player Blocker'
    ],
    technicalSpecs: ['No Coding Knowledge Required', 'Live Real-Time Earnings', 'Works on Mobile & Laptop', 'Manager & Staff Access Roles'],
    businessBenefits: ['Control your entire game without developers', 'Instantly check profits and player counts', 'Stop cheaters and fraudsters immediately']
  },
  {
    id: 'srv-white-label',
    slug: 'white-label-game-solutions',
    title: 'White-Label Game Solutions',
    tagline: 'Ready-to-launch games customized with your brand logo and colors in 2 weeks.',
    description: 'Want to launch quickly? Choose from our proven, ready-made games (Ludo, Rummy, Teen Patti, Roulette, Crash). We add your company logo, customize colors, set your rules, and launch it for you.',
    iconName: 'Layers',
    deliverables: [
      'Customized with Your Logo, Brand Colors & Name',
      'Ready Android App, iPhone App & Web Link',
      'Your Custom Table Limits & Commission Rates',
      'Complete Setup & Launch in under 14 Days'
    ],
    technicalSpecs: ['Fast 2-Week Launch', 'Certified Fair Random Dice/Cards', 'Multiple Language & Currency Options', 'Ready App Store Builds'],
    businessBenefits: ['Start earning in under 2 weeks', 'Much lower upfront development cost', 'Battle-tested games with zero bugs']
  },
  {
    id: 'srv-qa-testing',
    slug: 'game-testing-qa',
    title: 'Game QA & Load Testing',
    tagline: 'Rigorous testing on 100+ phone models so your game never crashes.',
    description: 'Before your real players join, we test your game with 100,000 automated virtual players, weak 2G/3G internet simulations, and budget smartphones to ensure a 100% bug-free experience.',
    iconName: 'CheckCircle2',
    deliverables: [
      'Tested with 100,000 Virtual Online Players',
      'Tested on Cheap Androids, iPhones & Tablets',
      'Tested on Weak & Slow Internet Connections',
      'Complete Bug-Free Quality Guarantee'
    ],
    technicalSpecs: ['Tested up to 100,000 Live Players', 'Tested on Budget & High-End Phones', 'Slow Internet Resilience Test', '100% Bug-Free Report'],
    businessBenefits: ['Zero embarrassing crashes on launch day', 'Smooth gameplay even on cheap mobile phones', 'Complete confidence in game stability']
  },
  {
    id: 'srv-deployment',
    slug: 'cloud-deployment-devops',
    title: 'Cloud Deployment & DevOps',
    tagline: 'Fast and secure cloud hosting that automatically expands with player growth.',
    description: 'We set up and host your game on world-class cloud platforms (AWS / Google Cloud). When player traffic surges during weekends or festivals, the servers automatically expand so the game never slows down.',
    iconName: 'Cloud',
    deliverables: [
      'Complete Cloud Server Setup (AWS or Google Cloud)',
      'Automatic Server Expansion during Festival Traffic',
      'High-Speed Global Loading across India & Worldwide',
      '24/7 Auto-Restart Protection against Downtime'
    ],
    technicalSpecs: ['Fast 1-Second Game Load Time', 'Auto-Scales for Any Traffic Spike', 'Low Monthly Cloud Server Cost', 'Global High-Speed Servers'],
    businessBenefits: ['Players enjoy instant, lag-free loading', 'Never worry about server crashes during big events', 'Optimized monthly hosting bills']
  },
  {
    id: 'srv-maintenance',
    slug: 'maintenance-support',
    title: '24/7 SLA Maintenance & Support',
    tagline: 'Round-the-clock technical support team always reachable on WhatsApp & call.',
    description: 'We stand by you after launch. Our technical team monitors your servers 24/7, fixes any urgent issues within minutes, and provides regular updates to keep your game running smoothly on new phone models.',
    iconName: 'LifeBuoy',
    deliverables: [
      'Direct WhatsApp & Phone Line to Senior Engineers',
      '24/7 Continuous Server Health Monitoring',
      'Urgent Issues Fixed within 15 Minutes',
      'Regular Updates for New Android & iOS Versions'
    ],
    technicalSpecs: ['Guaranteed < 15 Min Urgent Response', '24/7 Live Server Monitoring', 'Direct WhatsApp & Phone Channel', 'Free Security Updates'],
    businessBenefits: ['Complete peace of mind for your business', 'Zero downtime means zero loss of revenue', 'Friendly technical experts always ready to help']
  }
];
