import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { SeoMeta } from '../../components/common/SeoMeta';
import type { Lead, LeadStatus, Game } from '../../types';
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
  X 
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    leads, 
    updateLeadStatus, 
    updateLeadNotes, 
    deleteLead, 
    demoRequests, 
    games, 
    addGame, 
    deleteGame, 
    adminLogout 
  } = useAppState();

  const [activeTab, setActiveTab] = useState<'leads' | 'games' | 'demos'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Lead Details Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotesInput, setLeadNotesInput] = useState('');

  // Add Game Modal
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [newGameForm, setNewGameForm] = useState<Partial<Game>>({
    title: '',
    slug: '',
    tagline: '',
    category: 'Multiplayer Games',
    shortDescription: '',
    fullOverview: '',
    gameplaySummary: '',
    maxPlayers: '2 to 4 Players',
    syncLatency: '< 45ms',
    platforms: ['Web (HTML5/Canvas)', 'Android', 'iOS'],
    multiplayer: true,
    features: ['Real-time Turn Sync', 'Private Rooms', 'Admin Telemetry'],
    customizationOptions: ['Custom Board Branding', 'Custom Rulesets'],
    architectureHighlights: ['PixiJS Client', 'Go Room Server', 'Redis State Cache'],
    adminCapabilities: ['Live Room Inspector', 'Dispute Rollback Replay'],
    apiIntegrationPoints: ['POST /api/v1/session/create', 'POST /api/v1/wallet/settle'],
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    status: 'Production Ready'
  });

  // Calculate CRM KPIs
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const demoScheduledCount = leads.filter((l) => l.status === 'Demo Scheduled').length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lookingFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadNotesInput(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedLead) {
      updateLeadNotes(selectedLead.id, leadNotesInput);
      setSelectedLead({ ...selectedLead, notes: leadNotesInput });
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Country', 'Requirement', 'Budget', 'Timeline', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id,
      `"${l.fullName}"`,
      `"${l.companyName}"`,
      `"${l.businessEmail}"`,
      `"${l.phone}"`,
      `"${l.country}"`,
      `"${l.lookingFor}"`,
      `"${l.budget}"`,
      `"${l.timeline}"`,
      l.status,
      l.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oreng_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameForm.title || !newGameForm.slug) return;

    const gameToAdd: Game = {
      id: `game-${Date.now()}`,
      slug: newGameForm.slug.toLowerCase().replace(/\s+/g, '-'),
      title: newGameForm.title,
      tagline: newGameForm.tagline || 'Custom Game Engine Solution',
      category: (newGameForm.category as any) || 'Multiplayer Games',
      thumbnail: newGameForm.thumbnail || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      bannerImage: newGameForm.bannerImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      shortDescription: newGameForm.shortDescription || 'Custom game engine built for high-concurrency platforms.',
      fullOverview: newGameForm.fullOverview || 'Engineered with authoritative server state and sub-50ms sync.',
      gameplaySummary: newGameForm.gameplaySummary || 'Synchronized player actions with automated matchmaking.',
      features: newGameForm.features || ['Real-time Turn Sync'],
      platforms: newGameForm.platforms || ['Web (HTML5/Canvas)', 'Android', 'iOS'],
      multiplayer: newGameForm.multiplayer ?? true,
      maxPlayers: newGameForm.maxPlayers || '2 to 4 Players',
      syncLatency: newGameForm.syncLatency || '< 45ms',
      customizationOptions: newGameForm.customizationOptions || ['Custom Branding'],
      architectureHighlights: newGameForm.architectureHighlights || ['PixiJS / Go Engine'],
      adminCapabilities: newGameForm.adminCapabilities || ['Live Room Telemetry'],
      apiIntegrationPoints: newGameForm.apiIntegrationPoints || ['POST /api/v1/session/create'],
      status: (newGameForm.status as any) || 'Production Ready'
    };

    addGame(gameToAdd);
    setIsAddGameOpen(false);
  };

  return (
    <>
      <SeoMeta
        title="Admin Command Center — Oreng B2B Portal"
        description="Oreng Lead Management CRM & Content Management System"
      />

      <div className="pt-28 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FF782D]" />
                <h1 className="text-2xl font-display font-bold text-white">
                  Oreng Admin Command Center
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono">
                  Live CRM
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Connected to local state storage • Authenticated as Administrator
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#FF782D]" />
                <span>Export Leads CSV</span>
              </button>

              <button
                onClick={adminLogout}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* KPI Analytics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#121622] border border-white/10 shadow-lg">
              <span className="text-xs font-mono text-gray-400 block mb-1">Total Enquiries</span>
              <span className="text-3xl font-display font-black text-white">{totalLeadsCount}</span>
              <span className="text-[11px] text-gray-500 font-mono block mt-1">All time received</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#121622] border border-white/10 shadow-lg">
              <span className="text-xs font-mono text-gray-400 block mb-1">New Leads (Pending Action)</span>
              <span className="text-3xl font-display font-black text-[#FF782D]">{newLeadsCount}</span>
              <span className="text-[11px] text-emerald-400 font-mono block mt-1">Needs discovery call</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#121622] border border-white/10 shadow-lg">
              <span className="text-xs font-mono text-gray-400 block mb-1">Demos Scheduled</span>
              <span className="text-3xl font-display font-black text-cyan-400">{demoScheduledCount + demoRequests.length}</span>
              <span className="text-[11px] text-cyan-400 font-mono block mt-1">Active evaluations</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#121622] border border-white/10 shadow-lg">
              <span className="text-xs font-mono text-gray-400 block mb-1">Won / Deployed</span>
              <span className="text-3xl font-display font-black text-emerald-400">{wonCount}</span>
              <span className="text-[11px] text-gray-500 font-mono block mt-1">Production contracts</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'leads' ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leads CRM ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'games' ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Game Catalog ({games.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('demos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'demos' ? 'bg-[#FF5B14] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Demo Requests ({demoRequests.length})</span>
            </button>
          </div>

          {/* TAB 1: LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Filter bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121622] p-4 rounded-2xl border border-white/10">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by company, name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-mono text-gray-400">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-[#121622] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#0E111B] text-gray-400 font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Company &amp; Contact</th>
                        <th className="p-3.5">Requirement</th>
                        <th className="p-3.5">Budget</th>
                        <th className="p-3.5">Timeline</th>
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
                            <span className="text-gray-400 block">{lead.fullName} • {lead.country}</span>
                            <span className="text-gray-500 font-mono text-[10px]">{lead.businessEmail}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-200">
                              {lead.lookingFor}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-gray-300">
                            {lead.budget}
                          </td>
                          <td className="p-3.5 font-mono text-gray-400">
                            {lead.timeline}
                          </td>
                          <td className="p-3.5 font-mono text-gray-500 text-[10px]">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border ${
                                lead.status === 'New' ? 'bg-orange-500/10 border-orange-500/40 text-[#FF782D]' :
                                lead.status === 'Won' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                                lead.status === 'Demo Scheduled' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' :
                                lead.status === 'Proposal Sent' ? 'bg-purple-500/10 border-purple-500/40 text-purple-400' :
                                lead.status === 'Qualified' ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' :
                                'bg-gray-500/10 border-gray-500/30 text-gray-400'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Demo Scheduled">Demo Scheduled</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Won">Won</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenLead(lead)}
                              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white"
                              title="View Full Lead Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400"
                              title="Delete Lead"
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
            </div>
          )}

          {/* TAB 2: GAME CATALOG MANAGER */}
          {activeTab === 'games' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#121622] p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-display font-bold text-white">Active Game Titles &amp; Engines</h3>
                  <p className="text-xs text-gray-400">Manage titles showcased on the public website</p>
                </div>
                <button
                  onClick={() => setIsAddGameOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Game Title</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((g) => (
                  <div key={g.id} className="p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#FF5B14]/10 text-[#FF782D] text-[10px] font-mono font-bold">
                        {g.category}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {g.status}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white">{g.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{g.shortDescription}</p>
                    
                    <div className="text-[11px] font-mono text-gray-500 space-y-0.5 pt-2 border-t border-white/5">
                      <p>Slug: <span className="text-gray-300">/games/{g.slug}</span></p>
                      <p>Players: <span className="text-gray-300">{g.maxPlayers}</span></p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">ID: {g.id}</span>
                      <button
                        onClick={() => deleteGame(g.id)}
                        className="text-xs text-red-400 hover:text-red-300 font-mono cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEMO REQUESTS */}
          {activeTab === 'demos' && (
            <div className="space-y-4">
              <div className="bg-[#121622] p-4 rounded-2xl border border-white/10">
                <h3 className="text-sm font-display font-bold text-white">Scheduled Technical Demonstrations</h3>
                <p className="text-xs text-gray-400">Demo booking entries submitted via /request-demo</p>
              </div>

              {demoRequests.length === 0 ? (
                <div className="p-12 text-center bg-[#121622] rounded-2xl border border-white/10 text-gray-400 text-xs font-mono">
                  No demo requests currently in the queue.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoRequests.map((req) => (
                    <div key={req.id} className="p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold">
                          {req.gameTitle}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm">{req.fullName} • {req.companyName}</h4>
                      <p className="text-xs text-gray-400 font-mono">{req.businessEmail} • {req.phone}</p>
                      <div className="p-3 bg-black/40 rounded-xl text-xs text-gray-300">
                        <p className="text-[10px] text-gray-500 font-mono mb-1">Target Date / Note:</p>
                        {req.preferredDate || 'Earliest available slot'} — {req.message || 'No extra notes provided'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLead.companyName}</h3>
                <span className="text-xs text-gray-400">{selectedLead.fullName} • {selectedLead.country}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-300">
              <div className="p-3 bg-black/40 rounded-xl">
                <span className="text-gray-500 block">Email:</span>
                <span className="text-white">{selectedLead.businessEmail}</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl">
                <span className="text-gray-500 block">Phone:</span>
                <span className="text-white">{selectedLead.phone || 'N/A'}</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl">
                <span className="text-gray-500 block">Requirement:</span>
                <span className="text-[#FF782D] font-bold">{selectedLead.lookingFor}</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl">
                <span className="text-gray-500 block">Budget &amp; Timeline:</span>
                <span className="text-white">{selectedLead.budget} • {selectedLead.timeline}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">Project Description:</span>
              <div className="p-4 bg-black/50 rounded-xl border border-white/5 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
                {selectedLead.projectDescription}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">Internal Sales &amp; Tech Notes:</span>
              <textarea
                rows={3}
                value={leadNotesInput}
                onChange={(e) => setLeadNotesInput(e.target.value)}
                placeholder="Add meeting minutes, architecture requirements, next steps..."
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 px-4 py-1.5 rounded-lg bg-[#FF5B14] hover:bg-[#FF782D] text-white text-xs font-semibold cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD GAME MODAL */}
      {isAddGameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Game Title to Catalog</h3>
              <button onClick={() => setIsAddGameOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGameSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Game Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Multiplayer Poker Room"
                    value={newGameForm.title}
                    onChange={(e) => setNewGameForm({ ...newGameForm, title: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. poker-engine"
                    value={newGameForm.slug}
                    onChange={(e) => setNewGameForm({ ...newGameForm, slug: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. High-throughput poker engine with table lobbies"
                  value={newGameForm.tagline}
                  onChange={(e) => setNewGameForm({ ...newGameForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Category</label>
                  <select
                    value={newGameForm.category}
                    onChange={(e) => setNewGameForm({ ...newGameForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                  >
                    <option value="Multiplayer Games">Multiplayer Games</option>
                    <option value="Card Games">Card Games</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Casual Games">Casual Games</option>
                    <option value="Game Engines">Game Engines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Status</label>
                  <select
                    value={newGameForm.status}
                    onChange={(e) => setNewGameForm({ ...newGameForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                  >
                    <option value="Production Ready">Production Ready</option>
                    <option value="SDK Ready">SDK Ready</option>
                    <option value="Custom Engine">Custom Engine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newGameForm.shortDescription}
                  onChange={(e) => setNewGameForm({ ...newGameForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddGameOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-semibold cursor-pointer"
                >
                  Save &amp; Publish Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
};
