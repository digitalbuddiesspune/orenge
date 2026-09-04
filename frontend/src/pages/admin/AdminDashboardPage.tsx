import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { SeoMeta } from '../../components/common/SeoMeta';
import { adminApi } from '../../lib/adminApi';
import type { Lead, LeadStatus, Game, CaseStudy, BlogPost } from '../../types';
import {
  ShieldCheck,
  LogOut,
  Users,
  Gamepad2,
  Calendar,
  Search,
  Plus,
  Trash2,
  Eye,
  Download,
  X,
  BookOpen,
  Briefcase,
  RefreshCw,
  UploadCloud,
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
} from 'lucide-react';

import { initialGames } from '../../data/gamesData';
import { caseStudiesData } from '../../data/caseStudiesData';
import { blogPostsData } from '../../data/blogData';
import { initialLeadsData } from '../../data/initialLeadsData';
import {
  getStoredMedia,
  removeStoredMediaItem,
  type UploadedMediaItem,
  CLOUDINARY_CONFIG,
  downloadImage,
} from '../../lib/cloudinary';
import { HomeVisualEditor } from '../../components/admin/HomeVisualEditor';

type Tab = 'leads' | 'demos' | 'games' | 'portfolio' | 'blog' | 'media' | 'landing';

type DashboardStats = {
  leads: {
    total: number;
    new: number;
    contact: number;
    demo: number;
    byStatus: Record<string, number>;
  };
  content: {
    games: number;
    featuredGames: number;
    caseStudies: number;
    publishedPosts: number;
    draftPosts: number;
  };
};

type ApiLead = Lead & {
  type?: 'contact' | 'demo';
  gameTitle?: string;
  message?: string;
  preferredDate?: string;
};

const LEAD_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Demo Scheduled',
  'Proposal Sent',
  'Won',
  'Lost',
];

const emptyGameForm: Partial<Game> & { published?: boolean; isFeatured?: boolean } = {
  title: '',
  slug: '',
  tagline: '',
  category: 'Multiplayer Games',
  shortDescription: '',
  thumbnail: '/assets/ludo_3d_gameplay.jpg',
  bannerImage: '/assets/ludo_3d_gameplay.jpg',
  multiplayer: true,
  maxPlayers: '2 to 4 Players',
  syncLatency: '< 45ms',
  platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
  features: ['Real-time sync', 'Private rooms'],
  status: 'Production Ready',
  isFeatured: false,
  published: true,
};

function statusClass(status: string) {
  if (status === 'New') return 'bg-orange-500/10 border-orange-500/40 text-[#FF782D]';
  if (status === 'Won') return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
  if (status === 'Demo Scheduled') return 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400';
  if (status === 'Proposal Sent') return 'bg-purple-500/10 border-purple-500/40 text-purple-400';
  if (status === 'Qualified') return 'bg-blue-500/10 border-blue-500/40 text-blue-400';
  return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
}

export const AdminDashboardPage: React.FC = () => {
  const {
    adminLogout,
    navigate,
    refreshContent,
    addGame,
    updateGame,
    deleteGame,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
  } = useAppState();

  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedLead, setSelectedLead] = useState<ApiLead | null>(null);
  const [leadNotesInput, setLeadNotesInput] = useState('');

  // Cloudinary Media Gallery State
  const [mediaItems, setMediaItems] = useState<UploadedMediaItem[]>(() => getStoredMedia());
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(0);

  const handleDirectMediaUpload = async (file: File | undefined) => {
    if (!file) return;
    setMediaUploading(true);
    setMediaProgress(0);
    try {
      const uploaded = await adminApi.uploadImage(file, (p) => setMediaProgress(p));
      const newItems = getStoredMedia();
      setMediaItems(newItems);
      setCopiedUrl(uploaded.url);
      setTimeout(() => setCopiedUrl(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Media upload failed');
    } finally {
      setMediaUploading(false);
      setMediaProgress(0);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleRemoveMedia = (url: string) => {
    const updated = removeStoredMediaItem(url);
    setMediaItems(updated);
  };

  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [newGameForm, setNewGameForm] = useState(emptyGameForm);
  const [saving, setSaving] = useState(false);

  const [isAddCaseOpen, setIsAddCaseOpen] = useState(false);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const emptyCaseForm = {
    title: '',
    slug: '',
    clientName: 'Confidential Gaming Platform',
    clientIndustry: '',
    timeline: '',
    challenge: '',
    requirement: '',
    solution: '',
    coverImage: '/assets/ludo_3d_gameplay.jpg',
    published: true,
  };
  const [caseForm, setCaseForm] = useState(emptyCaseForm);

  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const emptyBlogForm = {
    title: '',
    slug: '',
    excerpt: '',
    category: 'Architecture',
    authorName: 'Oreng Engineering',
    authorRole: 'Game Systems',
    content: '',
    tags: 'Multiplayer, Backend',
    coverImage: '',
    published: true,
  };
  const [blogForm, setBlogForm] = useState(emptyBlogForm);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, leadsRes, gamesData, casesData, postsData] = await Promise.all([
        adminApi.getStats() as Promise<DashboardStats>,
        adminApi.getLeads({ limit: 100 }),
        adminApi.getGames() as Promise<Game[]>,
        adminApi.getCaseStudies() as Promise<CaseStudy[]>,
        adminApi.getBlogPosts() as Promise<BlogPost[]>,
      ]);

      setStats(statsData);
      setLeads((leadsRes.data as ApiLead[]).map((l) => ({
        ...l,
        createdAt: l.createdAt || new Date().toISOString(),
      })));
      setGames(gamesData);
      setCaseStudies(casesData);
      setBlogPosts(postsData);
    } catch {
      // Local fallback when backend API is offline
      const savedLeads = localStorage.getItem('oreng_leads');
      const parsedLeads = savedLeads ? JSON.parse(savedLeads) : (initialLeadsData as unknown as ApiLead[]);
      setLeads(parsedLeads);
      setGames(initialGames);
      setCaseStudies(caseStudiesData);
      setBlogPosts(blogPostsData);

      const newCount = parsedLeads.filter((l: ApiLead) => l.status === 'New').length;
      const demoCount = parsedLeads.filter((l: ApiLead) => l.type === 'demo' || l.lookingFor?.includes('Demo')).length;

      setStats({
        leads: {
          total: parsedLeads.length,
          new: newCount,
          contact: Math.max(0, parsedLeads.length - demoCount),
          demo: demoCount,
          byStatus: {},
        },
        content: {
          games: initialGames.length,
          featuredGames: initialGames.filter((g) => g.isFeatured).length,
          caseStudies: caseStudiesData.length,
          publishedPosts: blogPostsData.length,
          draftPosts: 0,
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const isDemoLead = (l: ApiLead) =>
    l.type === 'demo' ||
    l.lookingFor?.toLowerCase().includes('demo') ||
    l.source?.toLowerCase().includes('demo');

  const demoLeads = useMemo(() => leads.filter(isDemoLead), [leads]);
  const contactLeads = useMemo(() => leads.filter((l) => !isDemoLead(l)), [leads]);

  const filteredLeads = useMemo(() => {
    const source = activeTab === 'demos' ? demoLeads : contactLeads;
    return source.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        lead.fullName?.toLowerCase().includes(q) ||
        lead.companyName?.toLowerCase().includes(q) ||
        lead.businessEmail?.toLowerCase().includes(q) ||
        lead.country?.toLowerCase().includes(q) ||
        lead.lookingFor?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [activeTab, contactLeads, demoLeads, leads, searchQuery, statusFilter]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const updated = (await adminApi.updateLeadStatus(id, status)) as ApiLead;
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
      if (selectedLead?.id === id) setSelectedLead((prev) => (prev ? { ...prev, ...updated } : prev));
      const statsData = (await adminApi.getStats()) as DashboardStats;
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const updated = (await adminApi.updateLeadStatus(
        selectedLead.id,
        selectedLead.status,
        leadNotesInput,
      )) as ApiLead;
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, ...updated } : l)));
      setSelectedLead({ ...selectedLead, ...updated, notes: leadNotesInput });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save notes');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return;
    try {
      await adminApi.deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      const statsData = (await adminApi.getStats()) as DashboardStats;
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead');
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameForm.title || !newGameForm.slug) return;
    setSaving(true);
    try {
      const slug = String(newGameForm.slug).toLowerCase().replace(/\s+/g, '-');
      const payload = {
        ...emptyGameForm,
        ...newGameForm,
        slug,
        thumbnail: newGameForm.thumbnail || '/assets/ludo_3d_gameplay.jpg',
        bannerImage: newGameForm.bannerImage || newGameForm.thumbnail || '/assets/ludo_3d_gameplay.jpg',
        fullOverview: newGameForm.fullOverview || newGameForm.shortDescription || 'Custom game engine.',
        gameplaySummary: newGameForm.gameplaySummary || 'Synchronized multiplayer gameplay.',
        customizationOptions: newGameForm.customizationOptions || ['Custom Branding'],
        architectureHighlights: newGameForm.architectureHighlights || ['Authoritative server'],
        adminCapabilities: newGameForm.adminCapabilities || ['Live telemetry'],
        apiIntegrationPoints: newGameForm.apiIntegrationPoints || ['POST /api/v1/session/create'],
      };

      let savedGame: Game;
      try {
        if (editingGameId) {
          savedGame = (await adminApi.updateGame(editingGameId, payload)) as Game;
        } else {
          savedGame = (await adminApi.createGame(payload)) as Game;
        }
      } catch {
        savedGame = {
          id: editingGameId || `game-${Date.now()}`,
          ...payload,
        } as Game;
      }

      if (editingGameId) {
        updateGame(savedGame);
        setGames((prev) => prev.map((g) => (g.id === editingGameId ? savedGame : g)));
      } else {
        addGame(savedGame);
        setGames((prev) => [savedGame, ...prev]);
      }

      setIsAddGameOpen(false);
      setEditingGameId(null);
      setNewGameForm(emptyGameForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save game');
    } finally {
      setSaving(false);
    }
  };

  const openEditGame = (game: Game) => {
    setEditingGameId(game.id);
    setNewGameForm({
      title: game.title,
      slug: game.slug,
      tagline: game.tagline,
      category: game.category,
      shortDescription: game.shortDescription,
      fullOverview: game.fullOverview,
      gameplaySummary: game.gameplaySummary,
      thumbnail: game.thumbnail,
      bannerImage: game.bannerImage,
      multiplayer: game.multiplayer,
      maxPlayers: game.maxPlayers,
      syncLatency: game.syncLatency,
      platforms: game.platforms,
      features: game.features,
      status: game.status,
      isFeatured: game.isFeatured,
      published: true,
    });
    setIsAddGameOpen(true);
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Delete this game?')) return;
    try {
      await adminApi.deleteGame(id);
    } catch {
      // Local fallback
    }
    deleteGame(id);
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const handleToggleFeatured = async (game: Game) => {
    const nextFeatured = !game.isFeatured;
    const updatedGame = { ...game, isFeatured: nextFeatured };
    try {
      await adminApi.updateGame(game.id, { isFeatured: nextFeatured });
    } catch {
      // Local fallback
    }
    updateGame(updatedGame);
    setGames((prev) => prev.map((g) => (g.id === game.id ? updatedGame : g)));
  };

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = caseForm.slug.toLowerCase().replace(/\s+/g, '-');
      const payload = {
        ...caseForm,
        slug,
        coverImage: caseForm.coverImage || '/assets/casino_studio_hero.jpg',
        results: [],
        techStack: [],
        featuresDelivered: [],
      };

      let savedCase: CaseStudy;
      try {
        if (editingCaseId) {
          savedCase = (await adminApi.updateCaseStudy(editingCaseId, payload)) as CaseStudy;
        } else {
          savedCase = (await adminApi.createCaseStudy(payload)) as CaseStudy;
        }
      } catch {
        savedCase = {
          id: editingCaseId || `case-${Date.now()}`,
          ...payload,
        } as CaseStudy;
      }

      if (editingCaseId) {
        updateCaseStudy(savedCase);
        setCaseStudies((prev) => prev.map((c) => (c.id === editingCaseId ? savedCase : c)));
      } else {
        addCaseStudy(savedCase);
        setCaseStudies((prev) => [savedCase, ...prev]);
      }

      setIsAddCaseOpen(false);
      setEditingCaseId(null);
      setCaseForm(emptyCaseForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save case study');
    } finally {
      setSaving(false);
    }
  };

  const openEditCase = (c: CaseStudy & { published?: boolean }) => {
    setEditingCaseId(c.id);
    setCaseForm({
      title: c.title,
      slug: c.slug,
      clientName: c.clientName,
      clientIndustry: c.clientIndustry,
      timeline: c.timeline,
      challenge: c.challenge,
      requirement: c.requirement,
      solution: c.solution,
      coverImage: c.coverImage || '',
      published: c.published ?? true,
    });
    setIsAddCaseOpen(true);
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try {
      await adminApi.deleteCaseStudy(id);
    } catch {
      // Local fallback
    }
    deleteCaseStudy(id);
    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = blogForm.slug.toLowerCase().replace(/\s+/g, '-');
      const payload = {
        title: blogForm.title,
        slug,
        excerpt: blogForm.excerpt,
        category: blogForm.category,
        author: {
          name: blogForm.authorName,
          role: blogForm.authorRole,
          avatar: '',
        },
        content: blogForm.content.split(/\n\n+/).filter(Boolean),
        tags: blogForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        coverImage: blogForm.coverImage || '/assets/multiplayer_games_bg.jpg',
        published: blogForm.published,
        readTime: '5 min read',
      };

      let savedPost: BlogPost;
      try {
        if (editingBlogId) {
          savedPost = (await adminApi.updateBlogPost(editingBlogId, payload)) as BlogPost;
        } else {
          savedPost = (await adminApi.createBlogPost(payload)) as BlogPost;
        }
      } catch {
        savedPost = {
          id: editingBlogId || `post-${Date.now()}`,
          publishedDate: new Date().toISOString().slice(0, 10),
          ...payload,
        } as BlogPost;
      }

      if (editingBlogId) {
        updateBlogPost(savedPost);
        setBlogPosts((prev) => prev.map((p) => (p.id === editingBlogId ? savedPost : p)));
      } else {
        addBlogPost(savedPost);
        setBlogPosts((prev) => [savedPost, ...prev]);
      }

      setIsAddBlogOpen(false);
      setEditingBlogId(null);
      setBlogForm(emptyBlogForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const openEditBlog = (p: BlogPost & { published?: boolean; coverImage?: string }) => {
    setEditingBlogId(p.id);
    setBlogForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      authorName: p.author?.name || 'Oreng Engineering',
      authorRole: p.author?.role || 'Game Systems',
      content: (p.content || []).join('\n\n'),
      tags: (p.tags || []).join(', '),
      coverImage: p.coverImage || '',
      published: p.published ?? true,
    });
    setIsAddBlogOpen(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      await adminApi.deleteBlogPost(id);
    } catch {
      // Local fallback
    }
    deleteBlogPost(id);
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleTogglePublishBlog = async (post: BlogPost & { published?: boolean; id: string }) => {
    try {
      const updated = (await adminApi.updateBlogPost(post.id, {
        published: !(post as { published?: boolean }).published,
      })) as BlogPost & { published?: boolean };
      setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, ...updated } : p)));
      void refreshContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Type',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Country',
      'Requirement',
      'Budget',
      'Timeline',
      'Status',
      'Date',
    ];
    const rows = leads.map((l) => [
      l.id,
      l.type || 'contact',
      `"${l.fullName}"`,
      `"${l.companyName}"`,
      `"${l.businessEmail}"`,
      `"${l.phone || ''}"`,
      `"${l.country}"`,
      `"${l.lookingFor || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.timeline || ''}"`,
      l.status,
      l.createdAt,
    ]);
    const csv =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `oreng_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'landing', label: '🖼️ Home Images', icon: <Layers className="w-4 h-4" />, count: 10 },
    { id: 'leads', label: '👥 Customer Leads', icon: <Users className="w-4 h-4" />, count: stats?.leads.contact ?? contactLeads.length },
    { id: 'demos', label: '📅 Demo Requests', icon: <Calendar className="w-4 h-4" />, count: stats?.leads.demo ?? demoLeads.length },
    { id: 'games', label: '🎮 Games List', icon: <Gamepad2 className="w-4 h-4" />, count: games.length },
    { id: 'portfolio', label: '💼 Portfolio', icon: <Briefcase className="w-4 h-4" />, count: caseStudies.length },
    { id: 'blog', label: '📝 Blog Posts', icon: <BookOpen className="w-4 h-4" />, count: blogPosts.length },
    { id: 'media', label: '☁️ Media CDN', icon: <UploadCloud className="w-4 h-4" />, count: mediaItems.length },
  ];

  return (
    <>
      <SeoMeta
        title="Admin Command Center — Oreng B2B Portal"
        description="Oreng Lead Management CRM & Content Management System"
      />

      <div className="py-8 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <ShieldCheck className="w-6 h-6 text-[#FF782D]" />
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Oreng Admin Control Center</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                Manage website landing images, game catalog, client inquiries, and media files.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-semibold text-white flex items-center gap-2 transition cursor-pointer shadow-md"
              >
                <span>🌐 View Live Website</span>
              </button>
              <button
                type="button"
                onClick={() => void loadAll()}
                className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 text-[#FF782D] ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF782D]" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={adminLogout}
                className="px-3.5 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm text-red-400 font-mono">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Kpi label="Total Enquiries" value={stats?.leads.total ?? leads.length} hint="All incoming messages" />
            <Kpi
              label="New Leads"
              value={stats?.leads.new ?? leads.filter((l) => l.status === 'New').length}
              hint="Requires follow-up"
              accent="text-[#FF782D]"
            />
            <Kpi
              label="Demo Requests"
              value={stats?.leads.demo ?? demoLeads.length}
              hint="Clients requesting live demo"
              accent="text-cyan-400"
            />
            <Kpi
              label="Won Deals"
              value={stats?.leads.byStatus?.Won ?? leads.filter((l) => l.status === 'Won').length}
              hint="Confirmed contracts"
              accent="text-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 shadow-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/30'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.icon}
                <span>
                  {tab.label} ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="p-16 text-center text-gray-400 font-mono text-sm">Loading admin data…</div>
          ) : (
            <>
              {(activeTab === 'leads' || activeTab === 'demos') && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121622] p-4 rounded-2xl border border-white/10">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search company, name, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]"
                    >
                      <option value="All">All Statuses</option>
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {filteredLeads.length === 0 ? (
                    <EmptyState text="No leads found. Submit a contact/demo form to test." />
                  ) : (
                    <div className="bg-[#121622] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-gray-300">
                          <thead className="bg-[#0E111B] text-gray-400 font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                            <tr>
                              <th className="p-3.5">Company &amp; Contact</th>
                              <th className="p-3.5">Requirement</th>
                              <th className="p-3.5">Budget</th>
                              <th className="p-3.5">Date</th>
                              <th className="p-3.5">Status</th>
                              <th className="p-3.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredLeads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-3.5">
                                  <strong className="text-white block font-medium">{lead.companyName}</strong>
                                  <span className="text-gray-400 block">
                                    {lead.fullName} • {lead.country}
                                  </span>
                                  <span className="text-gray-500 font-mono text-[10px]">{lead.businessEmail}</span>
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-200">
                                    {lead.lookingFor || lead.gameTitle || '—'}
                                  </span>
                                </td>
                                <td className="p-3.5 font-mono text-gray-300">{lead.budget || '—'}</td>
                                <td className="p-3.5 font-mono text-gray-500 text-[10px]">
                                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}
                                </td>
                                <td className="p-3.5">
                                  <select
                                    value={lead.status}
                                    onChange={(e) =>
                                      void handleStatusChange(lead.id, e.target.value as LeadStatus)
                                    }
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border ${statusClass(lead.status)}`}
                                  >
                                    {LEAD_STATUSES.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="p-3.5 text-right space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedLead(lead);
                                      setLeadNotesInput(lead.notes || '');
                                    }}
                                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteLead(lead.id)}
                                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'games' && (
                <CmsSection
                  title="Game Catalog"
                  subtitle="Titles shown on the public website"
                  onAdd={() => {
                    setEditingGameId(null);
                    setNewGameForm(emptyGameForm);
                    setIsAddGameOpen(true);
                  }}
                  addLabel="Add Game"
                >
                  {games.length === 0 ? (
                    <EmptyState text="No games in database. Add one or run npm run seed." />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {games.map((g) => (
                        <div key={g.id} className="p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
                          {g.thumbnail && (
                            <img src={g.thumbnail} alt="" className="w-full h-32 object-cover rounded-xl" />
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#FF5B14]/10 text-[#FF782D] text-[10px] font-mono font-bold">
                              {g.category}
                            </span>
                            <button
                              type="button"
                              onClick={() => void handleToggleFeatured(g)}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border cursor-pointer ${
                                g.isFeatured
                                  ? 'border-amber-500/40 text-amber-400'
                                  : 'border-white/10 text-gray-500'
                              }`}
                            >
                              {g.isFeatured ? '★ Featured' : '☆ Feature'}
                            </button>
                          </div>
                          <h4 className="font-display font-bold text-base text-white">{g.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2">{g.shortDescription}</p>
                          <p className="text-[11px] font-mono text-gray-500">
                            /games/{g.slug}
                          </p>
                          <div className="pt-2 flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => openEditGame(g)}
                              className="text-xs text-[#FF782D] hover:text-white font-mono cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteGame(g.id)}
                              className="text-xs text-red-400 hover:text-red-300 font-mono cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CmsSection>
              )}

              {activeTab === 'portfolio' && (
                <CmsSection
                  title="Portfolio / Case Studies"
                  subtitle="Work page content"
                  onAdd={() => {
                    setEditingCaseId(null);
                    setCaseForm(emptyCaseForm);
                    setIsAddCaseOpen(true);
                  }}
                  addLabel="Add Case Study"
                >
                  {caseStudies.length === 0 ? (
                    <EmptyState text="No case studies yet." />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseStudies.map((c) => (
                        <div key={c.id} className="p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
                          {c.coverImage && (
                            <img src={c.coverImage} alt="" className="w-full h-28 object-cover rounded-xl mb-2" />
                          )}
                          <h4 className="text-white font-bold text-sm">{c.title}</h4>
                          <p className="text-xs text-gray-400">{c.clientName}</p>
                          <p className="text-[11px] font-mono text-gray-500">/work/{c.slug}</p>
                          <div className="flex gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() => openEditCase(c)}
                              className="text-xs text-[#FF782D] font-mono cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteCase(c.id)}
                              className="text-xs text-red-400 font-mono cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CmsSection>
              )}

              {activeTab === 'blog' && (
                <CmsSection
                  title="Insights / Blog"
                  subtitle="SEO content for /insights"
                  onAdd={() => {
                    setEditingBlogId(null);
                    setBlogForm(emptyBlogForm);
                    setIsAddBlogOpen(true);
                  }}
                  addLabel="Add Post"
                >
                  {blogPosts.length === 0 ? (
                    <EmptyState text="No blog posts yet." />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {blogPosts.map((p) => {
                        const published = (p as BlogPost & { published?: boolean }).published;
                        const cover = (p as BlogPost & { coverImage?: string }).coverImage;
                        return (
                          <div key={p.id} className="p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
                            {cover && (
                              <img src={cover} alt="" className="w-full h-28 object-cover rounded-xl mb-2" />
                            )}
                            <div className="flex justify-between gap-2">
                              <span className="text-[10px] font-mono text-[#FF782D]">{p.category}</span>
                              <button
                                type="button"
                                onClick={() => void handleTogglePublishBlog(p as BlogPost & { published?: boolean })}
                                className={`text-[10px] font-mono cursor-pointer ${
                                  published ? 'text-emerald-400' : 'text-gray-500'
                                }`}
                              >
                                {published ? 'Published' : 'Draft'}
                              </button>
                            </div>
                            <h4 className="text-white font-bold text-sm">{p.title}</h4>
                            <p className="text-xs text-gray-400 line-clamp-2">{p.excerpt}</p>
                            <div className="flex gap-3 pt-1">
                              <button
                                type="button"
                                onClick={() => openEditBlog(p as BlogPost & { published?: boolean; coverImage?: string })}
                                className="text-xs text-[#FF782D] font-mono cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteBlog(p.id)}
                                className="text-xs text-red-400 font-mono cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CmsSection>
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* Cloudinary Info Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF5B14]/10 via-[#F59E0B]/5 to-transparent border border-[#FF5B14]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5B14]/20 border border-[#FF5B14]/30 flex items-center justify-center shrink-0">
                        <UploadCloud className="w-5 h-5 text-[#FF782D]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-display font-bold text-base">Cloudinary CDN Media Library</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                            Connected: {CLOUDINARY_CONFIG.cloudName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Images uploaded here are stored on Cloudinary global CDN and can be used in Games, Case Studies, and Blog Posts.
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-gray-400 bg-black/40 px-3 py-2 rounded-xl border border-white/5 space-y-0.5">
                      <div>Preset: <span className="text-white">{CLOUDINARY_CONFIG.uploadPreset}</span></div>
                      <div>Delivery: <span className="text-emerald-400">HTTPS / WebP Auto</span></div>
                    </div>
                  </div>

                  {/* Upload Box */}
                  <div className="p-6 rounded-2xl bg-[#121622] border border-dashed border-white/20 hover:border-[#FF5B14]/50 transition text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#FF782D]">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">Upload New Asset to Cloudinary</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, WebP, GIF, SVG up to 10MB
                      </p>
                    </div>

                    {mediaUploading && (
                      <div className="max-w-md mx-auto space-y-2">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                          <span>Uploading to Cloudinary...</span>
                          <span className="text-[#FF782D]">{mediaProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF5B14] to-[#FF782D] transition-all duration-200"
                            style={{ width: `${mediaProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-[#FF5B14]/25 cursor-pointer transition">
                        <UploadCloud className="w-4 h-4" />
                        <span>{mediaUploading ? `Uploading (${mediaProgress}%)` : 'Select & Upload Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={mediaUploading}
                          className="hidden"
                          onChange={(e) => void handleDirectMediaUpload(e.target.files?.[0])}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Gallery Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-display font-bold text-base flex items-center gap-2">
                        <span>Uploaded Assets</span>
                        <span className="text-xs font-mono text-gray-400 font-normal">({mediaItems.length} items)</span>
                      </h3>
                      {copiedUrl && (
                        <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5 animate-fade-in">
                          <Check className="w-3.5 h-3.5" />
                          <span>Cloudinary URL Copied to Clipboard!</span>
                        </div>
                      )}
                    </div>

                    {mediaItems.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-[#121622] border border-white/5 text-gray-500 text-xs space-y-2">
                        <Sparkles className="w-8 h-8 mx-auto text-gray-600" />
                        <p className="text-gray-400 font-medium">No uploaded images in this session yet.</p>
                        <p>Upload game thumbnails, banners or blog covers above to generate instant CDN links.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mediaItems.map((item) => {
                          const isCopied = copiedUrl === item.url;
                          return (
                            <div
                              key={item.url}
                              className="bg-[#121622] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#FF5B14]/40 transition space-y-3 p-3 flex flex-col justify-between"
                            >
                              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5">
                                <img
                                  src={item.url}
                                  alt={item.filename}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10">
                                  CDN
                                </span>
                              </div>

                              <div className="space-y-1 text-xs">
                                <p className="text-white font-medium truncate" title={item.filename}>
                                  {item.filename}
                                </p>
                                <p className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                                  <span>{(item.bytes / 1024).toFixed(1)} KB</span>
                                  {item.width ? <span>{item.width}×{item.height}</span> : null}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.url)}
                                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                    isCopied
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10'
                                  }`}
                                  title="Copy CDN URL"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => void downloadImage(item.url, item.filename)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                                  title="Download Image File"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>

                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition"
                                  title="Open Full Image"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveMedia(item.url)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition cursor-pointer"
                                  title="Remove from list"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'landing' && <HomeVisualEditor />}
            </>
          )}
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLead.companyName}</h3>
                <span className="text-xs text-gray-400">
                  {selectedLead.fullName} • {selectedLead.country} • {selectedLead.type || 'contact'}
                </span>
              </div>
              <button type="button" onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-300">
              <Info label="Email" value={selectedLead.businessEmail} />
              <Info label="Phone" value={selectedLead.phone || 'N/A'} />
              <Info label="Requirement" value={selectedLead.lookingFor || selectedLead.gameTitle || '—'} accent />
              <Info label="Budget / Timeline" value={`${selectedLead.budget || '—'} • ${selectedLead.timeline || '—'}`} />
            </div>
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
                Description / Message
              </span>
              <div className="p-4 bg-black/50 rounded-xl border border-white/5 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
                {selectedLead.projectDescription || selectedLead.message || '—'}
              </div>
            </div>
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
                Internal Notes
              </span>
              <textarea
                rows={3}
                value={leadNotesInput}
                onChange={(e) => setLeadNotesInput(e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]"
              />
              <button
                type="button"
                onClick={() => void handleSaveNotes()}
                className="mt-2 px-4 py-1.5 rounded-lg bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-semibold cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddGameOpen && (
        <Modal
          title={editingGameId ? 'Edit Game' : 'Add New Game'}
          onClose={() => {
            setIsAddGameOpen(false);
            setEditingGameId(null);
            setNewGameForm(emptyGameForm);
          }}
        >
          <form onSubmit={(e) => void handleAddGame(e)} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title *">
                <input
                  required
                  value={newGameForm.title}
                  onChange={(e) => setNewGameForm({ ...newGameForm, title: e.target.value })}
                  className="field-input"
                />
              </Field>
              <Field label="Slug *">
                <input
                  required
                  value={newGameForm.slug}
                  onChange={(e) => setNewGameForm({ ...newGameForm, slug: e.target.value })}
                  className="field-input"
                />
              </Field>
            </div>
            <Field label="Tagline">
              <input
                value={newGameForm.tagline}
                onChange={(e) => setNewGameForm({ ...newGameForm, tagline: e.target.value })}
                className="field-input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  value={newGameForm.category}
                  onChange={(e) => setNewGameForm({ ...newGameForm, category: e.target.value as Game['category'] })}
                  className="field-input"
                >
                  <option>Multiplayer Games</option>
                  <option>Card Games</option>
                  <option>Board Games</option>
                  <option>Casual Games</option>
                  <option>Game Engines</option>
                  <option>Custom Games</option>
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={newGameForm.status}
                  onChange={(e) => setNewGameForm({ ...newGameForm, status: e.target.value as Game['status'] })}
                  className="field-input"
                >
                  <option>Production Ready</option>
                  <option>SDK Ready</option>
                  <option>Custom Engine</option>
                </select>
              </Field>
            </div>
            <Field label="Short Description">
              <textarea
                rows={2}
                value={newGameForm.shortDescription}
                onChange={(e) => setNewGameForm({ ...newGameForm, shortDescription: e.target.value })}
                className="field-input"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageField
                label="Thumbnail"
                value={newGameForm.thumbnail || ''}
                onChange={(url) => setNewGameForm({ ...newGameForm, thumbnail: url })}
                onError={setError}
              />
              <ImageField
                label="Banner Image"
                value={newGameForm.bannerImage || ''}
                onChange={(url) => setNewGameForm({ ...newGameForm, bannerImage: url })}
                onError={setError}
              />
            </div>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(newGameForm.isFeatured)}
                onChange={(e) => setNewGameForm({ ...newGameForm, isFeatured: e.target.checked })}
              />
              Featured on homepage
            </label>
            <ModalActions
              saving={saving}
              onCancel={() => {
                setIsAddGameOpen(false);
                setEditingGameId(null);
                setNewGameForm(emptyGameForm);
              }}
              submitLabel={editingGameId ? 'Update Game' : 'Save & Publish'}
            />
          </form>
        </Modal>
      )}

      {isAddCaseOpen && (
        <Modal
          title={editingCaseId ? 'Edit Case Study' : 'Add Case Study'}
          onClose={() => {
            setIsAddCaseOpen(false);
            setEditingCaseId(null);
            setCaseForm(emptyCaseForm);
          }}
        >
          <form onSubmit={(e) => void handleAddCase(e)} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title *">
                <input
                  required
                  value={caseForm.title}
                  onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                  className="field-input"
                />
              </Field>
              <Field label="Slug *">
                <input
                  required
                  value={caseForm.slug}
                  onChange={(e) => setCaseForm({ ...caseForm, slug: e.target.value })}
                  className="field-input"
                />
              </Field>
            </div>
            <Field label="Client Name">
              <input
                value={caseForm.clientName}
                onChange={(e) => setCaseForm({ ...caseForm, clientName: e.target.value })}
                className="field-input"
              />
            </Field>
            <Field label="Challenge">
              <textarea
                rows={2}
                value={caseForm.challenge}
                onChange={(e) => setCaseForm({ ...caseForm, challenge: e.target.value })}
                className="field-input"
              />
            </Field>
            <Field label="Solution">
              <textarea
                rows={2}
                value={caseForm.solution}
                onChange={(e) => setCaseForm({ ...caseForm, solution: e.target.value })}
                className="field-input"
              />
            </Field>
            <ImageField
              label="Cover Image"
              value={caseForm.coverImage}
              onChange={(url) => setCaseForm({ ...caseForm, coverImage: url })}
              onError={setError}
            />
            <ModalActions
              saving={saving}
              onCancel={() => {
                setIsAddCaseOpen(false);
                setEditingCaseId(null);
                setCaseForm(emptyCaseForm);
              }}
              submitLabel={editingCaseId ? 'Update Case Study' : 'Save Case Study'}
            />
          </form>
        </Modal>
      )}

      {isAddBlogOpen && (
        <Modal
          title={editingBlogId ? 'Edit Blog Post' : 'Add Blog Post'}
          onClose={() => {
            setIsAddBlogOpen(false);
            setEditingBlogId(null);
            setBlogForm(emptyBlogForm);
          }}
        >
          <form onSubmit={(e) => void handleAddBlog(e)} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title *">
                <input
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="field-input"
                />
              </Field>
              <Field label="Slug *">
                <input
                  required
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  className="field-input"
                />
              </Field>
            </div>
            <Field label="Excerpt">
              <textarea
                rows={2}
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="field-input"
              />
            </Field>
            <Field label="Content (paragraphs separated by blank line)">
              <textarea
                rows={5}
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="field-input"
              />
            </Field>
            <Field label="Tags (comma separated)">
              <input
                value={blogForm.tags}
                onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                className="field-input"
              />
            </Field>
            <ImageField
              label="Cover Image"
              value={blogForm.coverImage}
              onChange={(url) => setBlogForm({ ...blogForm, coverImage: url })}
              onError={setError}
            />
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={blogForm.published}
                onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
              />
              Publish immediately
            </label>
            <ModalActions
              saving={saving}
              onCancel={() => {
                setIsAddBlogOpen(false);
                setEditingBlogId(null);
                setBlogForm(emptyBlogForm);
              }}
              submitLabel={editingBlogId ? 'Update Post' : 'Save Post'}
            />
          </form>
        </Modal>
      )}

      <style>{`
        .field-input {
          width: 100%;
          padding: 0.625rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.75rem;
          color: white;
        }
        .field-input:focus {
          outline: none;
          border-color: #FF5B14;
        }
      `}</style>
    </>
  );
};

function Kpi({
  label,
  value,
  hint,
  accent = 'text-white',
}: {
  label: string;
  value: number;
  hint: string;
  accent?: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#121622] border border-white/10 shadow-lg">
      <span className="text-xs font-mono text-gray-400 block mb-1">{label}</span>
      <span className={`text-3xl font-display font-black ${accent}`}>{value}</span>
      <span className="text-[11px] text-gray-500 font-mono block mt-1">{hint}</span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="p-12 text-center bg-[#121622] rounded-2xl border border-white/10 text-gray-400 text-xs font-mono">
      {text}
    </div>
  );
}

function CmsSection({
  title,
  subtitle,
  onAdd,
  addLabel,
  children,
}: {
  title: string;
  subtitle: string;
  onAdd: () => void;
  addLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-[#121622] p-4 rounded-2xl border border-white/10 gap-3">
        <div>
          <h3 className="text-sm font-display font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addLabel}</span>
        </button>
      </div>
      {children}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onError,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const result = await adminApi.uploadImage(file, (pct) => setProgress(pct));
      onChange(result.url);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Cloudinary upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const isCloudinary = value?.includes('cloudinary.com') || value?.startsWith('https://res.cloudinary.com');

  const copyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Field label={label}>
      <div className="space-y-2">
        <div className="relative group">
          {value ? (
            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <img src={value} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              {isCloudinary && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Cloudinary CDN
                </span>
              )}
              <button
                type="button"
                onClick={() => void downloadImage(value)}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md text-gray-300 hover:text-white border border-white/20 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono shadow-md"
                title="Download Current Image"
              >
                <Download className="w-3.5 h-3.5 text-[#FF782D]" />
                <span>Save</span>
              </button>
            </div>
          ) : (
            <div className="w-full h-28 rounded-xl border border-dashed border-white/15 bg-black/30 flex flex-col items-center justify-center text-gray-500 text-xs gap-1">
              <ImageIcon className="w-6 h-6 text-gray-600" />
              <span>No image selected</span>
            </div>
          )}
        </div>

        {uploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-gray-400">
              <span>Uploading to Cloudinary...</span>
              <span className="text-[#FF782D]">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF5B14] to-[#FF782D] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/... or paste URL"
            className="field-input flex-1 text-xs"
          />

          {value && (
            <>
              <button
                type="button"
                onClick={() => void downloadImage(value)}
                className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs transition cursor-pointer"
                title="Download Current Image"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={copyUrl}
                className={`px-2.5 py-2 rounded-xl text-xs font-mono transition cursor-pointer border ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
                title="Copy Image URL"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition cursor-pointer"
                title="Clear Image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-medium text-xs shadow-md shadow-[#FF5B14]/20 cursor-pointer hover:opacity-95 transition shrink-0">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{uploading ? `${progress}%` : 'Cloudinary Upload'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => void handleFile(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>
    </Field>
  );
}

function ModalActions({
  saving,
  onCancel,
  submitLabel,
}: {
  saving: boolean;
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <div className="pt-2 flex justify-end gap-3">
      <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 cursor-pointer">
        Cancel
      </button>
      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-semibold cursor-pointer disabled:opacity-50"
      >
        {saving ? 'Saving…' : submitLabel}
      </button>
    </div>
  );
}

function Info({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="p-3 bg-black/40 rounded-xl">
      <span className="text-gray-500 block">{label}:</span>
      <span className={accent ? 'text-[#FF782D] font-bold' : 'text-white'}>{value}</span>
    </div>
  );
}
