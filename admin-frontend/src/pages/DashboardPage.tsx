import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { adminApi } from '../lib/adminApi';
import type { LeadStatus } from '../lib/adminApi';
import {
  LogOut, RefreshCw, Download, Users, Calendar, Gamepad2,
  Briefcase, BookOpen, Search, Plus, Trash2, Eye, X, ShieldCheck,
} from 'lucide-react';

/* ─── Types ─── */
type Tab = 'leads' | 'demos' | 'games' | 'portfolio' | 'blog';

type Lead = {
  id: string; type?: 'contact' | 'demo'; fullName: string; companyName: string;
  businessEmail: string; phone?: string; country: string; lookingFor?: string;
  gameTitle?: string; budget?: string; timeline?: string; status: LeadStatus;
  projectDescription?: string; message?: string; notes?: string; createdAt?: string;
};

type Game = {
  id: string; title: string; slug: string; tagline?: string; category: string;
  shortDescription: string; thumbnail?: string; bannerImage?: string;
  multiplayer?: boolean; isFeatured?: boolean; published?: boolean; status?: string;
  maxPlayers?: string; platforms?: string[]; features?: string[];
};

type CaseStudy = {
  id: string; title: string; slug: string; clientName: string; clientIndustry?: string;
  timeline?: string; challenge?: string; solution?: string; coverImage?: string; published?: boolean;
};

type BlogPost = {
  id: string; title: string; slug: string; excerpt: string; category: string;
  author?: { name: string; role: string }; tags?: string[]; coverImage?: string;
  published?: boolean;
};

type Stats = {
  leads: { total: number; new: number; contact: number; demo: number; byStatus: Record<string, number> };
  content: { games: number; featuredGames: number; caseStudies: number; publishedPosts: number; draftPosts: number };
};

const LEAD_STATUSES: LeadStatus[] = ['New','Contacted','Qualified','Demo Scheduled','Proposal Sent','Won','Lost'];

function statusClass(s: string) {
  if (s === 'New') return 'bg-orange-500/10 border-orange-500/40 text-orange-400';
  if (s === 'Won') return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
  if (s === 'Demo Scheduled') return 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400';
  if (s === 'Proposal Sent') return 'bg-purple-500/10 border-purple-500/40 text-purple-400';
  if (s === 'Qualified') return 'bg-blue-500/10 border-blue-500/40 text-blue-400';
  return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
}

/* ─── Shared mini components ─── */
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14] transition ${props.className ?? ''}`} />
);
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className={`w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14] transition ${props.className ?? ''}`} />
);
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }> = ({ children, ...props }) => (
  <select {...props} className={`w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14] transition ${props.className ?? ''}`}>
    {children}
  </select>
);
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs text-gray-400 mb-1">{children}</label>
);
const FieldBox: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div><Label>{label}</Label>{children}</div>
);

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[88vh] overflow-y-auto space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ saving, onCancel, label }: { saving: boolean; onCancel: () => void; label: string }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm cursor-pointer">Cancel</button>
      <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white text-sm font-semibold cursor-pointer disabled:opacity-50">
        {saving ? 'Saving…' : label}
      </button>
    </div>
  );
}

function ImageField({ label, value, onChange, onError }: { label: string; value: string; onChange: (url: string) => void; onError: (msg: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try { onChange((await adminApi.uploadImage(file)).url); }
    catch (e) { onError(e instanceof Error ? e.message : 'Upload failed'); }
    finally { setUploading(false); }
  };
  return (
    <FieldBox label={label}>
      <div className="space-y-2">
        {value ? <img src={value} alt="" className="w-full h-28 object-cover rounded-xl border border-white/10" /> : (
          <div className="w-full h-28 rounded-xl border border-dashed border-white/15 bg-black/30 flex items-center justify-center text-gray-500 text-xs">No image</div>
        )}
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder="/uploads/... or https://..." />
        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs cursor-pointer hover:bg-white/10">
          <span>{uploading ? 'Uploading…' : 'Upload image'}</span>
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={e => void upload(e.target.files?.[0])} />
        </label>
      </div>
    </FieldBox>
  );
}

function Kpi({ label, value, hint, accent = 'text-white' }: { label: string; value: number; hint?: string; accent?: string }) {
  return (
    <div className="p-5 rounded-2xl bg-[#121622] border border-white/10">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="p-12 text-center rounded-2xl bg-[#121622] border border-white/10 text-gray-400 text-sm">{text}</div>;
}

/* ─── Main Dashboard ─── */
export const DashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState('');

  // Game form
  const emptyGame: Partial<Game> = { title:'', slug:'', category:'Multiplayer Games', shortDescription:'', isFeatured:false, published:true, multiplayer:true };
  const [gameOpen, setGameOpen] = useState(false);
  const [editGameId, setEditGameId] = useState<string|null>(null);
  const [gameForm, setGameForm] = useState(emptyGame);

  // Case form
  const emptyCase = { title:'', slug:'', clientName:'Confidential Gaming Platform', challenge:'', solution:'', coverImage:'', published:true };
  const [caseOpen, setCaseOpen] = useState(false);
  const [editCaseId, setEditCaseId] = useState<string|null>(null);
  const [caseForm, setCaseForm] = useState(emptyCase);

  // Blog form
  const emptyBlog = { title:'', slug:'', excerpt:'', category:'Architecture', authorName:'Oreng Engineering', authorRole:'Game Systems', content:'', tags:'', coverImage:'', published:true };
  const [blogOpen, setBlogOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState<string|null>(null);
  const [blogForm, setBlogForm] = useState(emptyBlog);

  const [saving, setSaving] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [s, l, g, c, p] = await Promise.all([
        adminApi.getStats() as Promise<Stats>,
        adminApi.getLeads({ limit: '200' }),
        adminApi.getGames() as Promise<Game[]>,
        adminApi.getCaseStudies() as Promise<CaseStudy[]>,
        adminApi.getBlogPosts() as Promise<BlogPost[]>,
      ]);
      setStats(s);
      setLeads((l.data as Lead[]).map(lead => ({ ...lead, createdAt: lead.createdAt ?? new Date().toISOString() })));
      setGames(g); setCases(c); setPosts(p);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load';
      setError(msg);
      if (msg.includes('401') || msg.toLowerCase().includes('auth')) { adminApi.logout(); onLogout(); }
    } finally { setLoading(false); }
  }, [onLogout]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const demoLeads = useMemo(() => leads.filter(l => l.type === 'demo'), [leads]);
  const contactLeads = useMemo(() => leads.filter(l => l.type !== 'demo'), [leads]);

  const filteredLeads = useMemo(() => {
    const src = activeTab === 'demos' ? demoLeads : contactLeads.length ? contactLeads : leads;
    return src.filter(l => {
      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || [l.fullName, l.companyName, l.businessEmail, l.country].some(v => v?.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [activeTab, leads, contactLeads, demoLeads, search, statusFilter]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const updated = await adminApi.updateLeadStatus(id, status) as Lead;
      setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l));
      if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, ...updated } : prev);
    } catch (e) { setError(e instanceof Error ? e.message : 'Update failed'); }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const updated = await adminApi.updateLeadStatus(selectedLead.id, selectedLead.status, leadNotes) as Lead;
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...updated } : l));
      setSelectedLead({ ...selectedLead, ...updated, notes: leadNotes });
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed'); }
  };

  const exportCSV = () => {
    const rows = leads.map(l => [l.id, l.type, `"${l.fullName}"`, `"${l.companyName}"`, `"${l.businessEmail}"`, l.country, l.status, l.createdAt].join(','));
    const csv = 'data:text/csv;charset=utf-8,ID,Type,Name,Company,Email,Country,Status,Date\n' + rows.join('\n');
    const a = document.createElement('a'); a.href = encodeURI(csv);
    a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`; a.click();
  };

  // Game handlers
  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...emptyGame, ...gameForm, slug: String(gameForm.slug).toLowerCase().replace(/\s+/g,'-') };
      if (editGameId) {
        const updated = await adminApi.updateGame(editGameId, payload) as Game;
        setGames(prev => prev.map(g => g.id === editGameId ? { ...g, ...updated } : g));
      } else {
        const created = await adminApi.createGame(payload) as Game;
        setGames(prev => [created, ...prev]);
      }
      setGameOpen(false); setEditGameId(null); setGameForm(emptyGame);
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Delete this game?')) return;
    try { await adminApi.deleteGame(id); setGames(prev => prev.filter(g => g.id !== id)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Delete failed'); }
  };

  const toggleFeatured = async (g: Game) => {
    try {
      const updated = await adminApi.updateGame(g.id, { isFeatured: !g.isFeatured }) as Game;
      setGames(prev => prev.map(x => x.id === g.id ? { ...x, ...updated } : x));
    } catch (e) { setError(e instanceof Error ? e.message : 'Update failed'); }
  };

  // Case handlers
  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...caseForm, slug: caseForm.slug.toLowerCase().replace(/\s+/g,'-'), results:[], techStack:[], featuresDelivered:[] };
      if (editCaseId) {
        const updated = await adminApi.updateCaseStudy(editCaseId, payload) as CaseStudy;
        setCases(prev => prev.map(c => c.id === editCaseId ? { ...c, ...updated } : c));
      } else {
        const created = await adminApi.createCaseStudy(payload) as CaseStudy;
        setCases(prev => [created, ...prev]);
      }
      setCaseOpen(false); setEditCaseId(null); setCaseForm(emptyCase);
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try { await adminApi.deleteCaseStudy(id); setCases(prev => prev.filter(c => c.id !== id)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Delete failed'); }
  };

  // Blog handlers
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = {
        title: blogForm.title, slug: blogForm.slug.toLowerCase().replace(/\s+/g,'-'),
        excerpt: blogForm.excerpt, category: blogForm.category,
        author: { name: blogForm.authorName, role: blogForm.authorRole, avatar: '' },
        content: blogForm.content.split(/\n\n+/).filter(Boolean),
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        coverImage: blogForm.coverImage, published: blogForm.published, readTime: '5 min read',
      };
      if (editBlogId) {
        const updated = await adminApi.updateBlogPost(editBlogId, payload) as BlogPost;
        setPosts(prev => prev.map(p => p.id === editBlogId ? { ...p, ...updated } : p));
      } else {
        const created = await adminApi.createBlogPost(payload) as BlogPost;
        setPosts(prev => [created, ...prev]);
      }
      setBlogOpen(false); setEditBlogId(null); setBlogForm(emptyBlog);
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try { await adminApi.deleteBlogPost(id); setPosts(prev => prev.filter(p => p.id !== id)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Delete failed'); }
  };

  const togglePublishBlog = async (p: BlogPost) => {
    try {
      const updated = await adminApi.updateBlogPost(p.id, { published: !p.published }) as BlogPost;
      setPosts(prev => prev.map(x => x.id === p.id ? { ...x, ...updated } : x));
    } catch (e) { setError(e instanceof Error ? e.message : 'Update failed'); }
  };

  const tabs = [
    { id: 'leads' as Tab, label: 'Leads CRM', icon: <Users className="w-4 h-4" />, count: stats?.leads.contact ?? contactLeads.length },
    { id: 'demos' as Tab, label: 'Demo Requests', icon: <Calendar className="w-4 h-4" />, count: stats?.leads.demo ?? demoLeads.length },
    { id: 'games' as Tab, label: 'Games', icon: <Gamepad2 className="w-4 h-4" />, count: games.length },
    { id: 'portfolio' as Tab, label: 'Portfolio', icon: <Briefcase className="w-4 h-4" />, count: cases.length },
    { id: 'blog' as Tab, label: 'Blog', icon: <BookOpen className="w-4 h-4" />, count: posts.length },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D13] text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-[#0E1118] px-4 sm:px-8 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">Oreng Admin</h1>
              <p className="text-[11px] text-gray-500 mt-0.5">Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void loadAll()} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 flex items-center gap-1.5 hover:bg-white/10 transition cursor-pointer">
              <RefreshCw className={`w-3.5 h-3.5 text-[#FF782D] ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={exportCSV} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 flex items-center gap-1.5 hover:bg-white/10 transition cursor-pointer">
              <Download className="w-3.5 h-3.5 text-[#FF782D]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button onClick={() => { adminApi.logout(); onLogout(); }} className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-1.5 hover:bg-red-500/20 transition cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">{error}</div>
        )}

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label="Total Enquiries" value={stats?.leads.total ?? leads.length} hint="All time" />
          <Kpi label="New Leads" value={stats?.leads.new ?? leads.filter(l=>l.status==='New').length} hint="Needs action" accent="text-[#FF782D]" />
          <Kpi label="Demo Requests" value={stats?.leads.demo ?? demoLeads.length} hint="Active evaluations" accent="text-cyan-400" />
          <Kpi label="Won" value={stats?.leads.byStatus?.Won ?? leads.filter(l=>l.status==='Won').length} hint="Contracts signed" accent="text-emerald-400" />
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${activeTab === t.id ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
              {t.icon} {t.label} ({t.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-400 text-sm">Loading…</div>
        ) : (
          <>
            {/* ── LEADS / DEMOS ── */}
            {(activeTab === 'leads' || activeTab === 'demos') && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 bg-[#121622] p-4 rounded-2xl border border-white/10">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search name, company, email…" value={search} onChange={e => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]" />
                  </div>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]">
                    <option value="All">All Statuses</option>
                    {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {filteredLeads.length === 0 ? <EmptyState text="No leads found." /> : (
                  <div className="rounded-2xl bg-[#121622] border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left text-gray-300">
                        <thead className="bg-[#0E111B] text-gray-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                          <tr>
                            <th className="p-3.5">Company & Contact</th>
                            <th className="p-3.5">Requirement</th>
                            <th className="p-3.5">Budget</th>
                            <th className="p-3.5">Date</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredLeads.map(lead => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                              <td className="p-3.5">
                                <strong className="text-white block">{lead.companyName}</strong>
                                <span className="text-gray-400">{lead.fullName} · {lead.country}</span>
                                <span className="text-gray-500 block text-[10px]">{lead.businessEmail}</span>
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-200">{lead.lookingFor || lead.gameTitle || '—'}</span>
                              </td>
                              <td className="p-3.5 text-gray-300">{lead.budget || '—'}</td>
                              <td className="p-3.5 text-gray-500 text-[10px]">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}</td>
                              <td className="p-3.5">
                                <select value={lead.status} onChange={e => void handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${statusClass(lead.status)}`}>
                                  {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                <button onClick={() => { setSelectedLead(lead); setLeadNotes(lead.notes ?? ''); }}
                                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button onClick={() => void adminApi.deleteLead(lead.id).then(() => setLeads(prev => prev.filter(l => l.id !== lead.id)))}
                                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
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

            {/* ── GAMES ── */}
            {activeTab === 'games' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#121622] p-4 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold text-white">Game Catalog</p>
                    <p className="text-xs text-gray-400">Manage games shown on the public site</p>
                  </div>
                  <button onClick={() => { setEditGameId(null); setGameForm(emptyGame); setGameOpen(true); }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Game
                  </button>
                </div>
                {games.length === 0 ? <EmptyState text="No games yet. Click Add Game to start." /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {games.map(g => (
                      <div key={g.id} className="p-4 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
                        {g.thumbnail && <img src={g.thumbnail} alt="" className="w-full h-32 object-cover rounded-xl" />}
                        <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 rounded bg-[#FF5B14]/10 text-[#FF782D] text-[10px] font-bold">{g.category}</span>
                          <button onClick={() => void toggleFeatured(g)} className={`text-[10px] px-2 py-0.5 rounded border cursor-pointer ${g.isFeatured ? 'border-amber-500/40 text-amber-400' : 'border-white/10 text-gray-500'}`}>
                            {g.isFeatured ? '★ Featured' : '☆ Feature'}
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-white">{g.title}</h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{g.shortDescription}</p>
                        <div className="flex justify-end gap-3 pt-1">
                          <button onClick={() => { setEditGameId(g.id); setGameForm(g); setGameOpen(true); }} className="text-xs text-[#FF782D] cursor-pointer">Edit</button>
                          <button onClick={() => void handleDeleteGame(g.id)} className="text-xs text-red-400 cursor-pointer">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── PORTFOLIO ── */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#121622] p-4 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold text-white">Portfolio / Case Studies</p>
                    <p className="text-xs text-gray-400">Shown on /work page</p>
                  </div>
                  <button onClick={() => { setEditCaseId(null); setCaseForm(emptyCase); setCaseOpen(true); }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Case Study
                  </button>
                </div>
                {cases.length === 0 ? <EmptyState text="No case studies yet." /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cases.map(c => (
                      <div key={c.id} className="p-4 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
                        {c.coverImage && <img src={c.coverImage} alt="" className="w-full h-28 object-cover rounded-xl" />}
                        <h4 className="text-white font-bold text-sm">{c.title}</h4>
                        <p className="text-xs text-gray-400">{c.clientName}</p>
                        <div className="flex gap-3 pt-1">
                          <button onClick={() => { setEditCaseId(c.id); setCaseForm({ title:c.title, slug:c.slug, clientName:c.clientName, challenge:c.challenge??'', solution:c.solution??'', coverImage:c.coverImage??'', published:c.published??true }); setCaseOpen(true); }} className="text-xs text-[#FF782D] cursor-pointer">Edit</button>
                          <button onClick={() => void handleDeleteCase(c.id)} className="text-xs text-red-400 cursor-pointer">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── BLOG ── */}
            {activeTab === 'blog' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#121622] p-4 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold text-white">Insights / Blog</p>
                    <p className="text-xs text-gray-400">SEO articles for /insights</p>
                  </div>
                  <button onClick={() => { setEditBlogId(null); setBlogForm(emptyBlog); setBlogOpen(true); }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Post
                  </button>
                </div>
                {posts.length === 0 ? <EmptyState text="No blog posts yet." /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map(p => (
                      <div key={p.id} className="p-4 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
                        {p.coverImage && <img src={p.coverImage} alt="" className="w-full h-28 object-cover rounded-xl" />}
                        <div className="flex justify-between">
                          <span className="text-[10px] text-[#FF782D]">{p.category}</span>
                          <button onClick={() => void togglePublishBlog(p)} className={`text-[10px] cursor-pointer ${p.published ? 'text-emerald-400' : 'text-gray-500'}`}>
                            {p.published ? 'Published' : 'Draft'}
                          </button>
                        </div>
                        <h4 className="text-white font-bold text-sm">{p.title}</h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{p.excerpt}</p>
                        <div className="flex gap-3 pt-1">
                          <button onClick={() => { setEditBlogId(p.id); setBlogForm({ title:p.title, slug:p.slug, excerpt:p.excerpt, category:p.category, authorName:p.author?.name??'', authorRole:p.author?.role??'', content:(Array.isArray(p.content) ? (p.content as string[]).join('\n\n') : ''), tags:(p.tags??[]).join(', '), coverImage:p.coverImage??'', published:p.published??true }); setBlogOpen(true); }} className="text-xs text-[#FF782D] cursor-pointer">Edit</button>
                          <button onClick={() => void handleDeleteBlog(p.id)} className="text-xs text-red-400 cursor-pointer">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Lead detail modal */}
      {selectedLead && (
        <Modal title={selectedLead.companyName} onClose={() => setSelectedLead(null)}>
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
            {[['Name', selectedLead.fullName], ['Email', selectedLead.businessEmail], ['Phone', selectedLead.phone??'N/A'], ['Country', selectedLead.country], ['Requirement', selectedLead.lookingFor??selectedLead.gameTitle??'—'], ['Budget / Timeline', `${selectedLead.budget??'—'} · ${selectedLead.timeline??'—'}`]].map(([l,v]) => (
              <div key={l} className="p-3 bg-black/40 rounded-xl">
                <span className="text-gray-500 block">{l}:</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
          {(selectedLead.projectDescription || selectedLead.message) && (
            <div>
              <Label>Description / Message</Label>
              <div className="p-3 bg-black/50 rounded-xl border border-white/5 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedLead.projectDescription || selectedLead.message}</div>
            </div>
          )}
          <div>
            <Label>Internal Notes</Label>
            <Textarea rows={3} value={leadNotes} onChange={e => setLeadNotes(e.target.value)} />
            <button onClick={() => void handleSaveNotes()} className="mt-2 px-4 py-1.5 rounded-lg bg-[#FF5B14] text-white text-xs font-semibold cursor-pointer">Save Notes</button>
          </div>
        </Modal>
      )}

      {/* Game modal */}
      {gameOpen && (
        <Modal title={editGameId ? 'Edit Game' : 'Add Game'} onClose={() => { setGameOpen(false); setEditGameId(null); setGameForm(emptyGame); }}>
          <form onSubmit={e => void handleSaveGame(e)} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Title *"><Input required value={gameForm.title??''} onChange={e => setGameForm({...gameForm, title:e.target.value})} /></FieldBox>
              <FieldBox label="Slug *"><Input required value={gameForm.slug??''} onChange={e => setGameForm({...gameForm, slug:e.target.value})} /></FieldBox>
            </div>
            <FieldBox label="Category">
              <Select value={gameForm.category??''} onChange={e => setGameForm({...gameForm, category:e.target.value})}>
                {['Multiplayer Games','Card Games','Board Games','Casual Games','Game Engines','Custom Games'].map(c => <option key={c}>{c}</option>)}
              </Select>
            </FieldBox>
            <FieldBox label="Short Description"><Textarea rows={2} value={gameForm.shortDescription??''} onChange={e => setGameForm({...gameForm, shortDescription:e.target.value})} /></FieldBox>
            <div className="grid grid-cols-2 gap-4">
              <ImageField label="Thumbnail" value={gameForm.thumbnail??''} onChange={url => setGameForm({...gameForm, thumbnail:url})} onError={setError} />
              <ImageField label="Banner Image" value={gameForm.bannerImage??''} onChange={url => setGameForm({...gameForm, bannerImage:url})} onError={setError} />
            </div>
            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
              <input type="checkbox" checked={Boolean(gameForm.isFeatured)} onChange={e => setGameForm({...gameForm, isFeatured:e.target.checked})} />
              Show as Featured on homepage
            </label>
            <ModalActions saving={saving} onCancel={() => { setGameOpen(false); setEditGameId(null); setGameForm(emptyGame); }} label={editGameId ? 'Update Game' : 'Save Game'} />
          </form>
        </Modal>
      )}

      {/* Case modal */}
      {caseOpen && (
        <Modal title={editCaseId ? 'Edit Case Study' : 'Add Case Study'} onClose={() => { setCaseOpen(false); setEditCaseId(null); setCaseForm(emptyCase); }}>
          <form onSubmit={e => void handleSaveCase(e)} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Title *"><Input required value={caseForm.title} onChange={e => setCaseForm({...caseForm, title:e.target.value})} /></FieldBox>
              <FieldBox label="Slug *"><Input required value={caseForm.slug} onChange={e => setCaseForm({...caseForm, slug:e.target.value})} /></FieldBox>
            </div>
            <FieldBox label="Client Name"><Input value={caseForm.clientName} onChange={e => setCaseForm({...caseForm, clientName:e.target.value})} /></FieldBox>
            <FieldBox label="Challenge"><Textarea rows={2} value={caseForm.challenge} onChange={e => setCaseForm({...caseForm, challenge:e.target.value})} /></FieldBox>
            <FieldBox label="Solution"><Textarea rows={2} value={caseForm.solution} onChange={e => setCaseForm({...caseForm, solution:e.target.value})} /></FieldBox>
            <ImageField label="Cover Image" value={caseForm.coverImage} onChange={url => setCaseForm({...caseForm, coverImage:url})} onError={setError} />
            <ModalActions saving={saving} onCancel={() => { setCaseOpen(false); setEditCaseId(null); setCaseForm(emptyCase); }} label={editCaseId ? 'Update' : 'Save Case Study'} />
          </form>
        </Modal>
      )}

      {/* Blog modal */}
      {blogOpen && (
        <Modal title={editBlogId ? 'Edit Post' : 'Add Blog Post'} onClose={() => { setBlogOpen(false); setEditBlogId(null); setBlogForm(emptyBlog); }}>
          <form onSubmit={e => void handleSaveBlog(e)} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Title *"><Input required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title:e.target.value})} /></FieldBox>
              <FieldBox label="Slug *"><Input required value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug:e.target.value})} /></FieldBox>
            </div>
            <FieldBox label="Excerpt"><Textarea rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt:e.target.value})} /></FieldBox>
            <FieldBox label="Content (blank line = new paragraph)"><Textarea rows={5} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content:e.target.value})} /></FieldBox>
            <FieldBox label="Tags (comma separated)"><Input value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags:e.target.value})} /></FieldBox>
            <ImageField label="Cover Image" value={blogForm.coverImage} onChange={url => setBlogForm({...blogForm, coverImage:url})} onError={setError} />
            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
              <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm({...blogForm, published:e.target.checked})} />
              Publish immediately
            </label>
            <ModalActions saving={saving} onCancel={() => { setBlogOpen(false); setEditBlogId(null); setBlogForm(emptyBlog); }} label={editBlogId ? 'Update Post' : 'Save Post'} />
          </form>
        </Modal>
      )}
    </div>
  );
};
