export type GameCategory = 
  | 'All'
  | 'Multiplayer Games'
  | 'Card Games'
  | 'Board Games'
  | 'Casual Games'
  | 'Game Engines'
  | 'Custom Games';

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Multiplayer Games' | 'Card Games' | 'Board Games' | 'Casual Games' | 'Game Engines' | 'Custom Games';
  thumbnail: string;
  bannerImage: string;
  shortDescription: string;
  fullOverview: string;
  gameplaySummary: string;
  features: string[];
  platforms: ('Web (HTML5/Canvas)' | 'Android' | 'iOS' | 'Desktop SDK' | 'React Native/Flutter')[];
  multiplayer: boolean;
  maxPlayers: string;
  syncLatency: string;
  customizationOptions: string[];
  architectureHighlights: string[];
  adminCapabilities: string[];
  apiIntegrationPoints: string[];
  isFeatured?: boolean;
  status: 'Production Ready' | 'SDK Ready' | 'Custom Engine';
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  technicalSpecs: string[];
  businessBenefits: string[];
}

export interface TechItem {
  name: string;
  role: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface TechCategory {
  title: string;
  subtitle: string;
  items: TechItem[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  clientIndustry: string;
  timeline: string;
  challenge: string;
  requirement: string;
  solution: string;
  results: { metric: string; label: string }[];
  techStack: string[];
  featuresDelivered: string[];
  coverImage: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
  tags: string[];
}

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Demo Scheduled'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost';

export interface Lead {
  id: string;
  fullName: string;
  businessEmail: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  country: string;
  lookingFor: string;
  hasPlatform: 'Yes' | 'No' | 'Under Development';
  budget: string;
  timeline: 'Immediately' | '1–3 Months' | '3–6 Months' | '6+ Months' | 'Exploring';
  projectDescription: string;
  source: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
}

export interface DemoRequest {
  id: string;
  fullName: string;
  businessEmail: string;
  phone: string;
  companyName: string;
  country: string;
  companyWebsite: string;
  gameSlug: string;
  gameTitle: string;
  preferredDate?: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
}
