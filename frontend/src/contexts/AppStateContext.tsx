import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Game, Lead, CaseStudy, BlogPost, LeadStatus, DemoRequest } from '../types';
import { initialGames } from '../data/gamesData';
import { initialLeadsData } from '../data/initialLeadsData';
import { caseStudiesData } from '../data/caseStudiesData';
import { blogPostsData } from '../data/blogData';

interface AppStateContextType {
  // Navigation
  currentPage: string;
  currentSlug?: string;
  navigate: (page: string, slug?: string) => void;

  // Games
  games: Game[];
  getGameBySlug: (slug: string) => Game | undefined;
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  deleteGame: (id: string) => void;

  // Leads CRM
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;

  // Demo Requests
  demoRequests: DemoRequest[];
  addDemoRequest: (req: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>) => void;

  // Case Studies & Blog
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Modals & Triggers
  isConsultationModalOpen: boolean;
  openConsultationModal: (prefillRequirement?: string) => void;
  closeConsultationModal: () => void;
  prefilledRequirement: string;

  // Analytics tracking helper
  trackEvent: (eventName: string, metadata?: Record<string, unknown>) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Route state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  // Initialize route from current window pathname
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

    // Track page view event
    trackEvent('Page View', { page, slug, url: targetUrl });
  };

  // State Persistence with localStorage
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('oreng_games');
    return saved ? JSON.parse(saved) : initialGames;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('oreng_leads');
    return saved ? JSON.parse(saved) : initialLeadsData;
  });

  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>(() => {
    const saved = localStorage.getItem('oreng_demo_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [caseStudies] = useState<CaseStudy[]>(caseStudiesData);
  const [blogPosts] = useState<BlogPost[]>(blogPostsData);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('oreng_admin_auth') === 'true';
  });

  // Modal State
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [prefilledRequirement, setPrefilledRequirement] = useState('Custom Game Development');

  // Save games to storage
  useEffect(() => {
    localStorage.setItem('oreng_games', JSON.stringify(games));
  }, [games]);

  // Save leads to storage
  useEffect(() => {
    localStorage.setItem('oreng_leads', JSON.stringify(leads));
  }, [leads]);

  // Save demo requests to storage
  useEffect(() => {
    localStorage.setItem('oreng_demo_requests', JSON.stringify(demoRequests));
  }, [demoRequests]);

  const getGameBySlug = (slug: string) => {
    return games.find((g) => g.slug === slug);
  };

  const addGame = (game: Game) => {
    setGames((prev) => [game, ...prev]);
  };

  const updateGame = (updatedGame: Game) => {
    setGames((prev) => prev.map((g) => (g.id === updatedGame.id ? updatedGame : g)));
  };

  const deleteGame = (id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
    trackEvent('Contact Form Submitted', {
      company: newLead.companyName,
      country: newLead.country,
      requirement: newLead.lookingFor
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

  const addDemoRequest = (reqData: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: DemoRequest = {
      ...reqData,
      id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setDemoRequests((prev) => [newReq, ...prev]);

    // Also register as a high-intent lead in CRM
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
      notes: `Requested demo for ${reqData.gameTitle}. Preferred date: ${reqData.preferredDate || 'Earliest available'}`
    };
    setLeads((prev) => [newLead, ...prev]);

    trackEvent('Demo Requested', {
      game: reqData.gameTitle,
      company: reqData.companyName
    });
  };

  const adminLogin = (password: string): boolean => {
    if (password === 'oreng2026' || password === 'admin123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('oreng_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('oreng_admin_auth');
  };

  const openConsultationModal = (requirement = 'Custom Game Development') => {
    setPrefilledRequirement(requirement);
    setIsConsultationModalOpen(true);
    trackEvent('Book Consultation Click', { requirement });
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  const trackEvent = (eventName: string, metadata?: Record<string, unknown>) => {
    // Structured analytics logger for GA4, GTM, Pixel, LinkedIn Insight Tag
    console.log(`[ORENG Analytics Event] 👉 ${eventName}`, metadata || {});
  };

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        currentSlug,
        navigate,
        games,
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
        blogPosts,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,
        prefilledRequirement,
        trackEvent
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
