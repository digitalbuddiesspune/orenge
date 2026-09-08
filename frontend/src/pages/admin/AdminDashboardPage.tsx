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
  Mail,
  Phone,
  Globe,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
  Menu,
  TrendingUp,
  Activity,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const [notesSaved, setNotesSaved] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyText = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCopyAllLeadDetails = (lead: ApiLead) => {
    const summary = [
      `=== ORENG LEAD DETAILS ===`,
      `Type: ${lead.type === 'demo' ? 'Game Demo Request' : 'Project Inquiry'}`,
      `Company: ${lead.companyName || 'Not Specified'}`,
      `Contact Name: ${lead.fullName}`,
      `Email: ${lead.businessEmail}`,
      `Phone: ${lead.phone || 'N/A'}`,
      `Country: ${lead.country || 'N/A'}`,
      `Website: ${lead.companyWebsite || 'N/A'}`,
      `Requirement: ${lead.lookingFor || lead.gameTitle || 'N/A'}`,
      `Existing Platform: ${lead.hasPlatform || 'N/A'}`,
      `Budget: ${lead.budget || 'N/A'}`,
      `Timeline: ${lead.timeline || 'N/A'}`,
      lead.preferredDate ? `Preferred Demo Date: ${lead.preferredDate}` : null,
      `Source: ${lead.source || 'Website'}`,
      `Submitted: ${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'N/A'}`,
      `Status: ${lead.status}`,
      `Description / Message:\n${lead.projectDescription || lead.message || 'No description provided.'}`,
      lead.notes ? `Internal Notes:\n${lead.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(summary);
    setCopiedField('all_details');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

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
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 3000);
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
        title="Admin Command Center — Oreng Studio Portal"
        description="Oreng Lead Management CRM & Content Management System"
      />

      <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col lg:flex-row">
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation (Desktop Fixed / Mobile Slide-over) */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0B0E17] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
            isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5B14] to-[#FF782D] flex items-center justify-center text-white shadow-lg shadow-[#FF5B14]/30 border border-white/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-white text-lg tracking-wider">ORENG</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FF5B14]/20 text-[#FF782D] text-[9px] font-mono font-bold tracking-widest border border-[#FF5B14]/30">
                    CORE
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Admin Console v1.2
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Nav Links */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
            {/* Section: Website Experience */}
            <div>
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2 font-semibold">
                Studio &amp; Visuals
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('landing');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'landing'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 ${activeTab === 'landing' ? 'text-white' : 'text-[#FF782D]'}`} />
                    <span>Home Visual Editor</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      activeTab === 'landing' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Live
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('media');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'media'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UploadCloud className={`w-4 h-4 ${activeTab === 'media' ? 'text-white' : 'text-cyan-400'}`} />
                    <span>Cloudinary Media CDN</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      activeTab === 'media' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {mediaItems.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Section: CRM & Sales Pipeline */}
            <div>
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2 font-semibold">
                CRM &amp; Inquiries
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('leads');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'leads'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className={`w-4 h-4 ${activeTab === 'leads' ? 'text-white' : 'text-orange-400'}`} />
                    <span>Customer Inquiries</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-[#FF5B14]/15 text-[#FF782D]'
                    }`}
                  >
                    {stats?.leads.contact ?? contactLeads.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('demos');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'demos'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className={`w-4 h-4 ${activeTab === 'demos' ? 'text-white' : 'text-cyan-400'}`} />
                    <span>Demo Bookings</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      activeTab === 'demos' ? 'bg-white/20 text-white' : 'bg-cyan-500/15 text-cyan-400'
                    }`}
                  >
                    {stats?.leads.demo ?? demoLeads.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Section: Content Management */}
            <div>
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2 font-semibold">
                Content Management
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('games');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'games'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className={`w-4 h-4 ${activeTab === 'games' ? 'text-white' : 'text-purple-400'}`} />
                    <span>Game Catalog</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      activeTab === 'games' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {games.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('portfolio');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'portfolio'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className={`w-4 h-4 ${activeTab === 'portfolio' ? 'text-white' : 'text-emerald-400'}`} />
                    <span>Case Studies</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      activeTab === 'portfolio' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {caseStudies.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer group ${
                    activeTab === 'blog'
                      ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className={`w-4 h-4 ${activeTab === 'blog' ? 'text-white' : 'text-blue-400'}`} />
                    <span>Technical Insights</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      activeTab === 'blog' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {blogPosts.length}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Bottom Profile */}
          <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FF782D]" />
                <span>Live Website</span>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </button>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                  AD
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight">Admin Console</span>
                  <span className="text-[10px] text-gray-400 font-mono">Super Administrator</span>
                </div>
              </div>
              <button
                type="button"
                onClick={adminLogout}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-30 bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{tabs.find((t) => t.id === activeTab)?.label}</span>
                </h2>
                <span className="text-[11px] text-gray-400 font-mono hidden sm:inline-block">
                  Oreng B2B Gaming Platform Management Control
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => void loadAll()}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#FF782D] ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
                title="Export Leads CSV"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </header>

          {/* Dashboard Body */}
          <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm text-red-400 font-mono">
                {error}
              </div>
            )}

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Kpi
                label="Total Inquiries"
                value={stats?.leads.total ?? leads.length}
                hint="Total submissions"
                icon={<Users className="w-4 h-4" />}
              />
              <Kpi
                label="New Inquiries"
                value={stats?.leads.new ?? leads.filter((l) => l.status === 'New').length}
                hint="Requires follow-up"
                accent="text-[#FF782D]"
                icon={<TrendingUp className="w-4 h-4 text-[#FF782D]" />}
              />
              <Kpi
                label="Demo Requests"
                value={stats?.leads.demo ?? demoLeads.length}
                hint="Live sandbox demos"
                accent="text-cyan-400"
                icon={<Calendar className="w-4 h-4 text-cyan-400" />}
              />
              <Kpi
                label="Deals Won"
                value={stats?.leads.byStatus?.Won ?? leads.filter((l) => l.status === 'Won').length}
                hint="Confirmed partnerships"
                accent="text-emerald-400"
                icon={<Activity className="w-4 h-4 text-emerald-400" />}
              />
            </div>

            {loading ? (
              <div className="p-20 text-center text-gray-400 font-mono text-sm flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#FF782D]" />
                <span>Loading admin data &amp; system status...</span>
              </div>
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
                        <table className="w-full min-w-[700px] text-left text-xs text-gray-300">
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
                              <tr
                                key={lead.id}
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setLeadNotesInput(lead.notes || '');
                                  setNotesSaved(false);
                                }}
                                className="hover:bg-white/[0.04] transition cursor-pointer group"
                              >
                                <td className="p-3.5">
                                  <div className="flex items-center gap-2">
                                    <strong className="text-white block font-medium group-hover:text-[#FF782D] transition">
                                      {lead.companyName || '—'}
                                    </strong>
                                    {isDemoLead(lead) && (
                                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase">
                                        Demo
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-gray-400 block">
                                    {lead.fullName} {lead.country ? `• ${lead.country}` : ''}
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
                                <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                                  <select
                                    value={lead.status}
                                    onChange={(e) =>
                                      void handleStatusChange(lead.id, e.target.value as LeadStatus)
                                    }
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border cursor-pointer ${statusClass(lead.status)}`}
                                  >
                                    {LEAD_STATUSES.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="p-3.5 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedLead(lead);
                                      setLeadNotesInput(lead.notes || '');
                                      setNotesSaved(false);
                                    }}
                                    title="View Lead in Detail"
                                    className="px-2.5 py-1.5 bg-[#FF5B14]/10 hover:bg-[#FF5B14]/20 border border-[#FF5B14]/30 rounded-lg text-[#FF782D] hover:text-white text-[11px] font-medium inline-flex items-center gap-1.5 transition cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteLead(lead.id)}
                                    title="Delete Lead"
                                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition cursor-pointer"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {games.map((g) => (
                        <div
                          key={g.id}
                          className="p-5 rounded-2xl bg-gradient-to-br from-[#101420] to-[#0A0D15] border border-white/10 hover:border-[#FF5B14]/40 hover:shadow-xl hover:shadow-[#FF5B14]/10 transition-all duration-300 space-y-3 flex flex-col justify-between group"
                        >
                          <div className="space-y-3">
                            {g.thumbnail && (
                              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                <img
                                  src={g.thumbnail}
                                  alt=""
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#FF782D] text-[10px] font-mono font-bold border border-[#FF5B14]/30">
                                  {g.category}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-display font-bold text-base text-white group-hover:text-[#FF782D] transition">
                                {g.title}
                              </h4>
                              <button
                                type="button"
                                onClick={() => void handleToggleFeatured(g)}
                                className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition cursor-pointer shrink-0 ${
                                  g.isFeatured
                                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                }`}
                              >
                                {g.isFeatured ? '★ Featured' : '☆ Feature'}
                              </button>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              {g.shortDescription}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-gray-500 truncate max-w-[150px]">
                              /games/{g.slug}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditGame(g)}
                                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#FF5B14]/20 hover:text-[#FF782D] text-xs font-semibold text-gray-300 transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteGame(g.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
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
                  subtitle="Client showcases & platform integrations for /case-studies"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {caseStudies.map((c) => (
                        <div
                          key={c.id}
                          className="p-5 rounded-2xl bg-gradient-to-br from-[#101420] to-[#0A0D15] border border-white/10 hover:border-[#FF5B14]/40 hover:shadow-xl transition-all duration-300 space-y-3 flex flex-col justify-between group"
                        >
                          <div className="space-y-2.5">
                            {c.coverImage && (
                              <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                <img
                                  src={c.coverImage}
                                  alt=""
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-bold text-sm group-hover:text-[#FF782D] transition">
                                {c.title}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
                                {c.clientName}
                              </span>
                            </div>
                            <p className="text-[11px] font-mono text-gray-500">/work/{c.slug}</p>
                          </div>

                          <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditCase(c)}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#FF5B14]/20 hover:text-[#FF782D] text-xs font-semibold text-gray-300 transition cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteCase(c.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition cursor-pointer"
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
                  title="Insights / Technical Blog"
                  subtitle="Engineering articles & platform insights for /insights"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {blogPosts.map((p) => {
                        const published = (p as BlogPost & { published?: boolean }).published;
                        const cover = (p as BlogPost & { coverImage?: string }).coverImage;
                        return (
                          <div
                            key={p.id}
                            className="p-5 rounded-2xl bg-gradient-to-br from-[#101420] to-[#0A0D15] border border-white/10 hover:border-[#FF5B14]/40 hover:shadow-xl transition-all duration-300 space-y-3 flex flex-col justify-between group"
                          >
                            <div className="space-y-2.5">
                              {cover && (
                                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                  <img
                                    src={cover}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5B14]/10 text-[#FF782D] border border-[#FF5B14]/20 font-bold">
                                  {p.category}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    void handleTogglePublishBlog(p as BlogPost & { published?: boolean })
                                  }
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition cursor-pointer ${
                                    published
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                                      : 'bg-white/5 border-white/10 text-gray-500'
                                  }`}
                                >
                                  {published ? '● Published' : '○ Draft'}
                                </button>
                              </div>
                              <h4 className="text-white font-bold text-sm group-hover:text-[#FF782D] transition">
                                {p.title}
                              </h4>
                              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                            </div>

                            <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditBlog(p as BlogPost & { published?: boolean; coverImage?: string })
                                }
                                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#FF5B14]/20 hover:text-[#FF782D] text-xs font-semibold text-gray-300 transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteBlog(p.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition cursor-pointer"
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
        </main>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
          <div className="w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-[#101420] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg shrink-0 border ${
                    isDemoLead(selectedLead)
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-[#FF5B14]/10 border-[#FF5B14]/30 text-[#FF782D]'
                  }`}
                >
                  {isDemoLead(selectedLead) ? <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-base sm:text-xl font-display font-bold text-white tracking-tight break-words">
                      {selectedLead.companyName || selectedLead.fullName || 'Lead Details'}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider border shrink-0 ${
                        isDemoLead(selectedLead)
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : 'bg-[#FF5B14]/10 border-[#FF5B14]/30 text-[#FF782D]'
                      }`}
                    >
                      {isDemoLead(selectedLead) ? 'Demo Request' : 'Project Inquiry'}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span>
                      Contact: <strong className="text-gray-200">{selectedLead.fullName}</strong>
                    </span>
                    {selectedLead.country && <span>• {selectedLead.country}</span>}
                    <span>• {formatDate(selectedLead.createdAt)}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                {/* Status Dropdown */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 uppercase">Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      void handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                    }
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-semibold border cursor-pointer ${statusClass(selectedLead.status)}`}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#0B0E17] border-b border-white/5 shrink-0 flex flex-wrap items-center gap-2 text-xs">
              <a
                href={`mailto:${selectedLead.businessEmail}?subject=Regarding your inquiry with Oreng Game Studio`}
                className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white flex items-center gap-1.5 transition text-center"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF782D]" />
                <span>Email Prospect</span>
              </a>

              {selectedLead.phone && (
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white flex items-center gap-1.5 transition text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">Call {selectedLead.phone}</span>
                </a>
              )}

              {selectedLead.companyWebsite && (
                <a
                  href={
                    selectedLead.companyWebsite.startsWith('http')
                      ? selectedLead.companyWebsite
                      : `https://${selectedLead.companyWebsite}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white flex items-center gap-1.5 transition text-center"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              )}

              <button
                type="button"
                onClick={() => handleCopyAllLeadDetails(selectedLead)}
                className="w-full sm:w-auto sm:ml-auto justify-center px-3 py-1.5 rounded-xl bg-[#FF5B14]/10 hover:bg-[#FF5B14]/20 border border-[#FF5B14]/30 text-[#FF782D] hover:text-white flex items-center gap-1.5 font-medium transition cursor-pointer"
              >
                {copiedField === 'all_details' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Summary Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Details</span>
                  </>
                )}
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto min-h-0">
              {/* Client & Contact Information */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5 sm:mb-3 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#FF5B14]" />
                  <span>Contact &amp; Company Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Full Name</span>
                    <span className="text-xs sm:text-sm font-semibold text-white break-words">{selectedLead.fullName}</span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between min-w-0">
                    <div className="min-w-0 flex-1 mr-2">
                      <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Business Email</span>
                      <a
                        href={`mailto:${selectedLead.businessEmail}`}
                        className="text-xs sm:text-sm font-medium text-cyan-400 hover:underline break-all block"
                      >
                        {selectedLead.businessEmail}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(selectedLead.businessEmail, 'email')}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white cursor-pointer shrink-0"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between min-w-0">
                    <div className="min-w-0 flex-1 mr-2">
                      <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Phone / WhatsApp</span>
                      <span className="text-xs sm:text-sm font-medium text-white break-all block">{selectedLead.phone || '—'}</span>
                    </div>
                    {selectedLead.phone && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(selectedLead.phone, 'phone')}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white cursor-pointer shrink-0"
                        title="Copy Phone"
                      >
                        {copiedField === 'phone' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Company Name</span>
                    <span className="text-xs sm:text-sm font-semibold text-white break-words">{selectedLead.companyName || '—'}</span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Country / Location</span>
                    <span className="text-xs sm:text-sm font-medium text-white break-words">{selectedLead.country || '—'}</span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Company Website</span>
                    {selectedLead.companyWebsite ? (
                      <a
                        href={
                          selectedLead.companyWebsite.startsWith('http')
                            ? selectedLead.companyWebsite
                            : `https://${selectedLead.companyWebsite}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-[#FF782D] hover:underline flex items-center gap-1 min-w-0"
                      >
                        <span className="truncate">{selectedLead.companyWebsite}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm text-gray-500">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Scope & Specifications */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5 sm:mb-3 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF5B14]" />
                  <span>Project Scope &amp; Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Service / Requirement</span>
                    <span className="text-xs sm:text-sm font-bold text-[#FF782D] break-words block">
                      {selectedLead.lookingFor || selectedLead.gameTitle || 'Custom Game Development'}
                    </span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Existing Platform</span>
                    <span
                      className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold ${
                        selectedLead.hasPlatform === 'Yes'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : selectedLead.hasPlatform === 'Under Development'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-white/5 text-gray-300 border border-white/10'
                      }`}
                    >
                      {selectedLead.hasPlatform || 'Not Specified'}
                    </span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Estimated Budget</span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-emerald-400 break-words block">
                      {selectedLead.budget || '—'}
                    </span>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Target Timeline</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 break-words block">{selectedLead.timeline || '—'}</span>
                  </div>

                  {selectedLead.preferredDate && (
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Preferred Demo Date</span>
                      <span className="text-xs sm:text-sm font-medium text-cyan-400 break-words block">{selectedLead.preferredDate}</span>
                    </div>
                  )}

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 block mb-0.5">Source / Origin</span>
                    <span className="text-[11px] sm:text-xs font-mono text-gray-300 break-words block">{selectedLead.source || 'Website'}</span>
                  </div>
                </div>
              </div>

              {/* Description / Message */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF5B14]" />
                  <span>Project Description / Message</span>
                </h4>
                <div className="p-3.5 sm:p-4 bg-black/60 rounded-xl sm:rounded-2xl border border-white/10 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap break-words font-sans">
                  {selectedLead.projectDescription || selectedLead.message || (
                    <span className="text-gray-500 italic">No description provided with this inquiry.</span>
                  )}
                </div>
              </div>

              {/* Internal Notes & CRM section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#FF5B14]" />
                    <span>Internal CRM Notes &amp; Next Steps</span>
                  </h4>
                  {notesSaved && (
                    <span className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Notes Saved!
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={leadNotesInput}
                  onChange={(e) => setLeadNotesInput(e.target.value)}
                  placeholder="Add internal notes about client meeting, deal stage, requirements discussed, next follow-up..."
                  className="w-full p-3 sm:p-3.5 bg-black/50 border border-white/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition leading-relaxed"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] text-gray-500 font-mono truncate mr-2">ID: {selectedLead.id}</span>
                  <button
                    type="button"
                    onClick={() => void handleSaveNotes()}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-90 text-white text-xs font-bold transition cursor-pointer shadow-md shadow-[#FF5B14]/20 shrink-0"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-5 border-t border-white/10 bg-[#0E111B] shrink-0 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => void handleDeleteLead(selectedLead.id)}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                Close
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
  icon,
}: {
  label: string;
  value: number;
  hint: string;
  accent?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#101420] to-[#0A0D15] border border-white/10 hover:border-[#FF5B14]/40 transition-all duration-300 shadow-xl group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5B14]/5 rounded-full blur-2xl group-hover:bg-[#FF5B14]/15 transition" />
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        {icon && <div className="p-2 rounded-xl bg-white/5 border border-white/10">{icon}</div>}
      </div>
      <div className={`text-3xl font-display font-black tracking-tight ${accent}`}>{value}</div>
      <span className="text-[11px] text-gray-500 font-mono block mt-1.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        {hint}
      </span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="p-12 text-center bg-[#101420] rounded-2xl border border-dashed border-white/10 text-gray-400 text-xs font-mono space-y-2">
      <div className="w-10 h-10 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-gray-500">
        <Search className="w-5 h-5" />
      </div>
      <p>{text}</p>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-[#101420] to-[#0B0E17] p-5 rounded-2xl border border-white/10 gap-3 shadow-lg">
        <div>
          <h3 className="text-base font-display font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#FF5B14]/25 transition cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-[#121622] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1">
          {children}
        </div>
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

