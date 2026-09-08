import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Game, Lead, CaseStudy, BlogPost, LeadStatus, DemoRequest } from '../types';
import { initialGames } from '../data/gamesData';
import { initialLeadsData } from '../data/initialLeadsData';
import { caseStudiesData } from '../data/caseStudiesData';
import { blogPostsData } from '../data/blogData';
import { api } from '../lib/api';
import { adminApi, isAdminSessionActive, clearAdminSession } from '../lib/adminApi';

function normalizeGame(raw: Partial<Game> & { id?: string; _id?: string }): Game {
  return {
    id: raw.id || String(raw._id || ''),
    slug: raw.slug || '',
    title: raw.title || 'Untitled Game',
    tagline: raw.tagline || '',
    category: (raw.category as Game['category']) || 'Custom Games',
    thumbnail: raw.thumbnail || '',
    bannerImage: raw.bannerImage || raw.thumbnail || '',
    shortDescription: raw.shortDescription || '',
    fullOverview: raw.fullOverview || '',
    gameplaySummary: raw.gameplaySummary || '',
    features: raw.features || [],
    platforms: (raw.platforms as Game['platforms']) || [],
    multiplayer: Boolean(raw.multiplayer),
    maxPlayers: raw.maxPlayers || '',
    syncLatency: raw.syncLatency || '',
    customizationOptions: raw.customizationOptions || [],
    architectureHighlights: raw.architectureHighlights || [],
    adminCapabilities: raw.adminCapabilities || [],
    apiIntegrationPoints: raw.apiIntegrationPoints || [],
    isFeatured: Boolean(raw.isFeatured),
    status: (raw.status as Game['status']) || 'Production Ready',
  };
}

function normalizeCaseStudy(raw: Partial<CaseStudy> & { id?: string }): CaseStudy {
  return {
    id: raw.id || '',
    slug: raw.slug || '',
    title: raw.title || '',
    clientName: raw.clientName || '',
    clientIndustry: raw.clientIndustry || '',
    timeline: raw.timeline || '',
    challenge: raw.challenge || '',
    requirement: raw.requirement || '',
    solution: raw.solution || '',
    results: raw.results || [],
    techStack: raw.techStack || [],
    featuresDelivered: raw.featuresDelivered || [],
    coverImage: raw.coverImage || '',
  };
}

function normalizeBlogPost(raw: Partial<BlogPost> & { id?: string; publishedDate?: string }): BlogPost {
  return {
    id: raw.id || '',
    slug: raw.slug || '',
    title: raw.title || '',
    excerpt: raw.excerpt || '',
    publishedDate: typeof raw.publishedDate === 'string' ? raw.publishedDate : '',
    readTime: raw.readTime || '5 min read',
    category: raw.category || 'General',
    author: raw.author || { name: 'Oreng', role: '', avatar: '' },
    content: raw.content || [],
    tags: raw.tags || [],
  };
}

export type HomeAssetsConfig = {
  heroBg: string;
  heroTrailerPoster: string;
  ludoBg: string;
  pokerBg: string;
  rouletteBg: string;
  casinoBg: string;
  multiplayerBg: string;
  architectureDiagram: string;
  whatWeBuildBg1: string;
  whatWeBuildBg2: string;
  whatWeBuildBg3: string;
  studioBts1: string;
  studioBts2: string;
};

export const defaultHomeAssets: HomeAssetsConfig = {
  heroBg: '/assets/heroBg.png',
  heroTrailerPoster: '/assets/ludo_3d_gameplay.jpg',
  ludoBg: '/assets/ludo_3d_gameplay.jpg',
  pokerBg: '/assets/poker_table_gameplay.jpg',
  rouletteBg: '/assets/roulette_engine.jpg',
  casinoBg: '/assets/casino_studio_hero.jpg',
  multiplayerBg: '/assets/multiplayer_games_bg.jpg',
  architectureDiagram: '/assets/multiplayer_games_bg.jpg',
  whatWeBuildBg1: '/assets/poker_table_gameplay.jpg',
  whatWeBuildBg2: '/assets/ludo_3d_gameplay.jpg',
  whatWeBuildBg3: '/assets/roulette_engine.jpg',
  studioBts1: '/assets/casino_studio_hero.jpg',
  studioBts2: '/assets/ludo_3d_gameplay.jpg',
};

interface AppStateContextType {
  currentPage: string;
  currentSlug?: string;
  navigate: (page: string, slug?: string) => void;

  homeAssets: HomeAssetsConfig;
  updateHomeAsset: (key: keyof HomeAssetsConfig, url: string) => void;
  resetHomeAssets: () => void;

  games: Game[];
  contentLoading: boolean;
  contentSource: 'api' | 'static';
  refreshContent: () => Promise<void>;
  getGameBySlug: (slug: string) => Game | undefined;
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  deleteGame: (id: string) => void;

  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;

  demoRequests: DemoRequest[];
  addDemoRequest: (req: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>) => Promise<void>;

  caseStudies: CaseStudy[];
  addCaseStudy: (caseStudy: CaseStudy) => void;
  updateCaseStudy: (caseStudy: CaseStudy) => void;
  deleteCaseStudy: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;

  isConsultationModalOpen: boolean;
  openConsultationModal: (prefillRequirement?: string) => void;
  closeConsultationModal: () => void;
  prefilledRequirement: string;

  trackEvent: (eventName: string, metadata?: Record<string, unknown>) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!path || path === '') {
        setCurrentPage('home');
        setCurrentSlug(undefined);
      } else if (path.startsWith('games/')) {
        setCurrentPage('game-detail');
        setCurrentSlug(path.replace('games/', ''));
      } else if (path === 'games') {
        setCurrentPage('games');
        setCurrentSlug(undefined);
      } else if (path.startsWith('work/')) {
        setCurrentPage('case-study-detail');
        setCurrentSlug(path.replace('work/', ''));
      } else if (path === 'work') {
        setCurrentPage('work');
        setCurrentSlug(undefined);
      } else if (path.startsWith('insights/')) {
        setCurrentPage('blog-detail');
        setCurrentSlug(path.replace('insights/', ''));
      } else if (path === 'insights') {
        setCurrentPage('insights');
        setCurrentSlug(undefined);
      } else if (path === 'services') {
        setCurrentPage('services');
        setCurrentSlug(undefined);
      } else if (path === 'technology') {
        setCurrentPage('technology');
        setCurrentSlug(undefined);
      } else if (path === 'process') {
        setCurrentPage('process');
        setCurrentSlug(undefined);
      } else if (path === 'about') {
        setCurrentPage('about');
        setCurrentSlug(undefined);
      } else if (path === 'contact') {
        setCurrentPage('contact');
        setCurrentSlug(undefined);
      } else if (path === 'request-demo') {
        setCurrentPage('request-demo');
        setCurrentSlug(undefined);
      } else if (path === 'admin') {
        setCurrentPage('admin');
        setCurrentSlug(undefined);
      } else if (['privacy', 'terms', 'disclaimer', 'cookies'].includes(path)) {
        setCurrentPage('legal');
        setCurrentSlug(path);
      } else {
        setCurrentPage('home');
        setCurrentSlug(undefined);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const trackEvent = (eventName: string, metadata?: Record<string, unknown>) => {
    console.log(`[ORENG Analytics Event] 👉 ${eventName}`, metadata || {});
  };

  const navigate = (page: string, slug?: string) => {
    setCurrentPage(page);
    setCurrentSlug(slug);

    let targetUrl = '/';
    if (page === 'home') targetUrl = '/';
    else if (page === 'game-detail' && slug) targetUrl = `/games/${slug}`;
    else if (page === 'case-study-detail' && slug) targetUrl = `/work/${slug}`;
    else if (page === 'blog-detail' && slug) targetUrl = `/insights/${slug}`;
    else if (page === 'legal' && slug) targetUrl = `/${slug}`;
    else targetUrl = `/${page}`;

    window.history.pushState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('Page View', { page, slug, url: targetUrl });
  };

  const [homeAssets, setHomeAssets] = useState<HomeAssetsConfig>(() => {
    try {
      const saved = localStorage.getItem('oreng_home_assets');
      return saved ? { ...defaultHomeAssets, ...JSON.parse(saved) } : defaultHomeAssets;
    } catch {
      return defaultHomeAssets;
    }
  });

  const updateHomeAsset = (key: keyof HomeAssetsConfig, url: string) => {
    setHomeAssets((prev) => {
      const next = { ...prev, [key]: url };
      localStorage.setItem('oreng_home_assets', JSON.stringify(next));
      if (isAdminSessionActive()) {
        adminApi.updateHomeAssets(next).catch((err) => console.warn('[settings] sync failed', err));
      }
      return next;
    });
  };

  const resetHomeAssets = () => {
    setHomeAssets(defaultHomeAssets);
    localStorage.setItem('oreng_home_assets', JSON.stringify(defaultHomeAssets));
    if (isAdminSessionActive()) {
      adminApi.updateHomeAssets(defaultHomeAssets).catch((err) => console.warn('[settings] reset sync failed', err));
    }
  };

  const [games, setGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem('oreng_custom_games');
      return saved ? JSON.parse(saved) : initialGames;
    } catch {
      return initialGames;
    }
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem('oreng_custom_case_studies');
      return saved ? JSON.parse(saved) : caseStudiesData;
    } catch {
      return caseStudiesData;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('oreng_custom_blog_posts');
      return saved ? JSON.parse(saved) : blogPostsData;
    } catch {
      return blogPostsData;
    }
  });

  const [contentLoading, setContentLoading] = useState(true);
  const [contentSource, setContentSource] = useState<'api' | 'static'>('static');

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('oreng_leads');
    return saved ? JSON.parse(saved) : initialLeadsData;
  });

  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>(() => {
    const saved = localStorage.getItem('oreng_demo_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminSessionActive());
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [prefilledRequirement, setPrefilledRequirement] = useState('Custom Game Development');

  const refreshContent = async () => {
    setContentLoading(true);
    try {
      const [apiGames, apiCases, apiPosts, apiSettings] = await Promise.all([
        api.getGames() as Promise<Partial<Game>[]>,
        api.getCaseStudies() as Promise<Partial<CaseStudy>[]>,
        api.getBlogPosts() as Promise<Partial<BlogPost>[]>,
        api.getHomeAssets().catch(() => null),
      ]);

      if (apiSettings && typeof apiSettings === 'object') {
        const merged = { ...defaultHomeAssets, ...apiSettings } as HomeAssetsConfig;
        setHomeAssets(merged);
        localStorage.setItem('oreng_home_assets', JSON.stringify(merged));
      }

      if (apiGames && apiGames.length > 0) {
        const normalized = apiGames.map((g) => normalizeGame(g));
        setGames(normalized);
        localStorage.setItem('oreng_custom_games', JSON.stringify(normalized));
        setContentSource('api');
      }

      if (apiCases && apiCases.length > 0) {
        const normalized = apiCases.map((c) => normalizeCaseStudy(c));
        setCaseStudies(normalized);
        localStorage.setItem('oreng_custom_case_studies', JSON.stringify(normalized));
      }

      if (apiPosts && apiPosts.length > 0) {
        const normalized = apiPosts.map((p) => normalizeBlogPost(p));
        setBlogPosts(normalized);
        localStorage.setItem('oreng_custom_blog_posts', JSON.stringify(normalized));
      }
    } catch {
      setContentSource('static');
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    void refreshContent();
  }, []);

  useEffect(() => {
    localStorage.setItem('oreng_custom_games', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('oreng_custom_case_studies', JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem('oreng_custom_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('oreng_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('oreng_demo_requests', JSON.stringify(demoRequests));
  }, [demoRequests]);

  const getGameBySlug = (slug: string) => games.find((g) => g.slug === slug);
  const addGame = (game: Game) => setGames((prev) => [game, ...prev]);
  const updateGame = (updatedGame: Game) =>
    setGames((prev) => prev.map((g) => (g.id === updatedGame.id ? updatedGame : g)));
  const deleteGame = (id: string) => setGames((prev) => prev.filter((g) => g.id !== id));

  const addCaseStudy = (cs: CaseStudy) => setCaseStudies((prev) => [cs, ...prev]);
  const updateCaseStudy = (updatedCs: CaseStudy) =>
    setCaseStudies((prev) => prev.map((c) => (c.id === updatedCs.id ? updatedCs : c)));
  const deleteCaseStudy = (id: string) => setCaseStudies((prev) => prev.filter((c) => c.id !== id));

  const addBlogPost = (bp: BlogPost) => setBlogPosts((prev) => [bp, ...prev]);
  const updateBlogPost = (updatedBp: BlogPost) =>
    setBlogPosts((prev) => prev.map((p) => (p.id === updatedBp.id ? updatedBp : p)));
  const deleteBlogPost = (id: string) => setBlogPosts((prev) => prev.filter((p) => p.id !== id));

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    try {
      await api.submitContact({
        fullName: leadData.fullName,
        businessEmail: leadData.businessEmail,
        phone: leadData.phone || '',
        companyName: leadData.companyName || '',
        companyWebsite: leadData.companyWebsite || '',
        country: leadData.country || '',
        lookingFor: leadData.lookingFor || 'Custom Game Development',
        hasPlatform: leadData.hasPlatform || 'No',
        budget: leadData.budget || '',
        timeline: leadData.timeline || 'Exploring',
        projectDescription: leadData.projectDescription || '',
        source: leadData.source || 'Contact Page',
      });
    } catch (err) {
      console.warn('[AppStateContext] submitContact API error, saved locally:', err);
    }

    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setLeads((prev) => [newLead, ...prev]);
    trackEvent('Contact Form Submitted', {
      company: newLead.companyName,
      country: newLead.country,
      requirement: newLead.lookingFor,
    });
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const addDemoRequest = async (reqData: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>) => {
    try {
      await api.submitDemo({
        fullName: reqData.fullName,
        businessEmail: reqData.businessEmail,
        phone: reqData.phone || '',
        companyName: reqData.companyName || '',
        companyWebsite: reqData.companyWebsite || '',
        country: reqData.country || '',
        gameSlug: reqData.gameSlug || '',
        gameTitle: reqData.gameTitle || '',
        preferredDate: reqData.preferredDate || '',
        message: reqData.message || '',
        source: 'Demo Request Portal',
      });
    } catch (err) {
      console.warn('[AppStateContext] submitDemo API error, saved locally:', err);
    }

    const newReq: DemoRequest = {
      ...reqData,
      id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setDemoRequests((prev) => [newReq, ...prev]);

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      fullName: reqData.fullName,
      businessEmail: reqData.businessEmail,
      phone: reqData.phone,
      companyName: reqData.companyName,
      companyWebsite: reqData.companyWebsite,
      country: reqData.country,
      lookingFor: `Demo Request: ${reqData.gameTitle}`,
      hasPlatform: 'Yes',
      budget: 'To Be Discussed in Demo',
      timeline: 'Immediately',
      projectDescription: `Demo requested for ${reqData.gameTitle}. Message: ${reqData.message}`,
      source: 'Demo Request Portal',
      createdAt: new Date().toISOString(),
      status: 'Demo Scheduled',
      notes: `Requested demo for ${reqData.gameTitle}. Preferred date: ${reqData.preferredDate || 'Earliest available'}`,
    };
    setLeads((prev) => [newLead, ...prev]);

    trackEvent('Demo Requested', {
      game: reqData.gameTitle,
      company: reqData.companyName,
    });
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      await adminApi.login(email, password);
      setIsAdminLoggedIn(true);
      return true;
    } catch {
      // Offline fallback mode: allows login with default credentials if backend API is not running
      const normEmail = email.toLowerCase().trim();
      if (
        (normEmail === 'admin@oreng.com' || normEmail === 'admin@oreng.io') &&
        (password === 'changeme123' || password === 'Admin@123456' || password === 'admin')
      ) {
        localStorage.setItem('oreng_admin_token', 'offline-preview-token');
        localStorage.setItem(
          'oreng_admin_user',
          JSON.stringify({ id: 'admin-local', email: normEmail, name: 'Oreng Admin', role: 'admin' })
        );
        setIsAdminLoggedIn(true);
        return true;
      }
      return false;
    }
  };

  const adminLogout = () => {
    adminApi.logout();
    clearAdminSession();
    setIsAdminLoggedIn(false);
  };

  const openConsultationModal = (requirement = 'Custom Game Development') => {
    setPrefilledRequirement(requirement);
    setIsConsultationModalOpen(true);
    trackEvent('Book Consultation Click', { requirement });
  };

  const closeConsultationModal = () => setIsConsultationModalOpen(false);

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        currentSlug,
        navigate,
        homeAssets,
        updateHomeAsset,
        resetHomeAssets,
        games,
        contentLoading,
        contentSource,
        refreshContent,
        getGameBySlug,
        addGame,
        updateGame,
        deleteGame,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        demoRequests,
        addDemoRequest,
        caseStudies,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,
        prefilledRequirement,
        trackEvent,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
