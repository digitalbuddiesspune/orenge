import React, { useState } from 'react';
import { useAppState, type HomeAssetsConfig, defaultHomeAssets } from '../../contexts/AppStateContext';
import { adminApi } from '../../lib/adminApi';
import { downloadImage } from '../../lib/cloudinary';
import {
  UploadCloud,
  RotateCcw,
  Check,
  Download,
  X,
  Eye,
  Camera,
  CheckCircle2,
} from 'lucide-react';

type SlotMeta = {
  key: keyof HomeAssetsConfig;
  title: string;
  section: string;
  recommendedSize: string;
};

const SLOT_CONFIGS: Partial<Record<keyof HomeAssetsConfig, SlotMeta>> = {
  heroBg: {
    key: 'heroBg',
    title: 'Hero Main Studio Background',
    section: '1. Top Hero Section',
    recommendedSize: '1672 × 941 px',
  },
  ludoBg: {
    key: 'ludoBg',
    title: '3D Ludo Game Board Banner',
    section: '2. Showcase Game: Ludo',
    recommendedSize: '1280 × 800 px',
  },
  pokerBg: {
    key: 'pokerBg',
    title: 'Cards & Rummy Game Table',
    section: '2. Showcase Game: Cards & Poker',
    recommendedSize: '1280 × 800 px',
  },
  rouletteBg: {
    key: 'rouletteBg',
    title: 'Live European Roulette Wheel',
    section: '2. Showcase Game: Roulette',
    recommendedSize: '1280 × 800 px',
  },
  multiplayerBg: {
    key: 'multiplayerBg',
    title: 'Crash Rocket & Multiplayer Engine',
    section: '2. Showcase Game: Multiplayer Crash',
    recommendedSize: '1280 × 800 px',
  },
  casinoBg: {
    key: 'casinoBg',
    title: 'Casino Studio & Platform Backdrop',
    section: '3. What We Build: Studio Backdrop',
    recommendedSize: '1920 × 1080 px',
  },
  whatWeBuildBg1: {
    key: 'whatWeBuildBg1',
    title: 'Custom Games 3D Artwork',
    section: '3. What We Build: Custom 3D Art',
    recommendedSize: '800 × 600 px',
  },
  architectureDiagram: {
    key: 'architectureDiagram',
    title: 'System Infrastructure Visual',
    section: '4. System Architecture Section',
    recommendedSize: '1600 × 900 px',
  },
  studioBts1: {
    key: 'studioBts1',
    title: 'Studio Tech Lab & 3D Math',
    section: '5. Studio Behind The Scenes (Lab)',
    recommendedSize: '1000 × 625 px',
  },
  studioBts2: {
    key: 'studioBts2',
    title: 'Server Load & Telemetry Test',
    section: '5. Studio Behind The Scenes (Stress Test)',
    recommendedSize: '1000 × 625 px',
  },
};

export const HomeVisualEditor: React.FC = () => {
  const { homeAssets, updateHomeAsset, resetHomeAssets, navigate } = useAppState();

  const [activeTab, setActiveTab] = useState<'ludo' | 'cards' | 'roulette' | 'multiplier'>('ludo');
  const [editingKey, setEditingKey] = useState<keyof HomeAssetsConfig | null>(null);
  const [tempUrl, setTempUrl] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openEditor = (key: keyof HomeAssetsConfig) => {
    setEditingKey(key);
    setTempUrl(homeAssets[key] || defaultHomeAssets[key]);
  };

  const saveCurrentSlot = () => {
    if (!editingKey) return;
    updateHomeAsset(editingKey, tempUrl);
    showToast(`"${SLOT_CONFIGS[editingKey]?.title || editingKey}" updated live!`);
    setEditingKey(null);
  };

  const handleFileUpload = async (file: File | undefined) => {
    if (!file || !editingKey) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const result = await adminApi.uploadImage(file, (pct: number) => setUploadProgress(pct));
      setTempUrl(result.url);
      updateHomeAsset(editingKey, result.url);
      showToast(`Image uploaded to Cloudinary and saved!`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const currentMeta = editingKey ? SLOT_CONFIGS[editingKey] : null;

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Sticky Instructions Header Bar */}
      <div className="sticky top-4 z-40 p-4 sm:p-5 rounded-3xl bg-[#121622]/95 border-2 border-[#FF5B14] backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-[#FF5B14] text-white flex items-center justify-center font-extrabold shadow-lg shadow-[#FF5B14]/30 shrink-0">
            <Camera className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-display font-extrabold text-white">
                Interactive Visual Landing Page
              </h3>
            </div>
            <p className="text-xs text-gray-300">
              Scroll down the exact homepage below. Click the glowing <strong className="text-[#FF782D]">"✏️ Change Image"</strong> button on any photo to replace it.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-white/15"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF782D]" />
            <span>View Live Site</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all landing page images back to original studio artwork?')) {
                resetHomeAssets();
                showToast('All images reset to original defaults!');
              }
            }}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-red-500/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Defaults</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/90 text-white text-sm font-bold flex items-center gap-3 shadow-2xl animate-fade-in backdrop-blur-md border border-white/20">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. EXACT SECTION 1: HERO SECTION & SHOWREEL */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-white/10 overflow-hidden bg-[#0B0D13] relative shadow-2xl">
        {/* Section Label */}
        <div className="bg-[#161B28] px-6 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-[#FF782D] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5B14]" />
            SECTION 1: HERO SHOWREEL &amp; MAIN BANNER
          </span>
          <span className="text-xs font-mono text-gray-400">Homepage Top</span>
        </div>

        {/* Hero Background with Edit Overlay */}
        <div className="relative min-h-[480px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
          {/* Main Hero Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={homeAssets.heroBg || defaultHomeAssets.heroBg}
              alt="Hero Backdrop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0B0D13]" />

            {/* Direct Edit Button for Hero Background */}
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => openEditor('heroBg')}
                className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border-2 border-white/30 animate-pulse hover:animate-none"
              >
                <Camera className="w-4 h-4" />
                <span>✏️ Change Hero Background (1672×941)</span>
              </button>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-[#FF5B14] animate-ping" />
              <span>We Build Custom Games for Platforms &amp; Businesses</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              We Build Custom Games for Gaming Platforms
            </h1>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Real-time multiplayer engines, deterministic math, and sub-45ms responsive gameplay.
            </p>
          </div>

          {/* Interactive Showreel Card */}
          <div className="relative z-10 max-w-4xl mx-auto w-full mt-6 bg-[#121622]/95 border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Showreel Tabs */}
            <div className="flex border-b border-white/10 bg-black/40 p-2 gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'ludo', label: '🎲 3D Ludo Game', key: 'ludoBg' as const },
                { id: 'cards', label: '🃏 Cards & Rummy Table', key: 'pokerBg' as const },
                { id: 'roulette', label: '🎡 Live Roulette Wheel', key: 'rouletteBg' as const },
                { id: 'multiplier', label: '🚀 Crash Multiplier', key: 'multiplayerBg' as const },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#FF5B14] text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Showreel Active Viewport */}
            <div className="p-6">
              {activeTab === 'ludo' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-[#FF5B14] shadow-2xl group">
                    <img
                      src={homeAssets.ludoBg || defaultHomeAssets.ludoBg}
                      alt="Ludo"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => openEditor('ludoBg')}
                        className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                      >
                        <Camera className="w-4 h-4" />
                        <span>✏️ Change Ludo Image</span>
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-6 space-y-2 text-left">
                    <span className="px-2.5 py-0.5 rounded bg-[#FF5B14]/15 text-[#FF782D] text-xs font-bold">ONLINE MULTIPLAYER</span>
                    <h3 className="text-2xl font-display font-bold text-white">3D Ludo Game Board</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Custom 3D dice physics, private rooms, turn timers, and auto-play offline protection.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-[#FF5B14] shadow-2xl group">
                    <img
                      src={homeAssets.pokerBg || defaultHomeAssets.pokerBg}
                      alt="Cards & Rummy"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => openEditor('pokerBg')}
                        className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                      >
                        <Camera className="w-4 h-4" />
                        <span>✏️ Change Cards &amp; Rummy Image</span>
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-6 space-y-2 text-left">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-xs font-bold">FAIR &amp; TRUSTED</span>
                    <h3 className="text-2xl font-display font-bold text-white">Card &amp; Rummy Games</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Certified RNG shuffling, multi-table seat layouts, and smooth card dealing animations.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'roulette' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-[#FF5B14] shadow-2xl group">
                    <img
                      src={homeAssets.rouletteBg || defaultHomeAssets.rouletteBg}
                      alt="Roulette"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => openEditor('rouletteBg')}
                        className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                      >
                        <Camera className="w-4 h-4" />
                        <span>✏️ Change Roulette Image</span>
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-6 space-y-2 text-left">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-xs font-bold">LIVE CASINO</span>
                    <h3 className="text-2xl font-display font-bold text-white">Live Roulette Engine</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      European 37-pocket roulette wheel with real-time wheel ball physics and synchronized betting grid.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'multiplier' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-[#FF5B14] shadow-2xl group">
                    <img
                      src={homeAssets.multiplayerBg || defaultHomeAssets.multiplayerBg}
                      alt="Crash Multiplier"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => openEditor('multiplayerBg')}
                        className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                      >
                        <Camera className="w-4 h-4" />
                        <span>✏️ Change Crash Multiplier Image</span>
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-6 space-y-2 text-left">
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/15 text-purple-400 text-xs font-bold">HIGH SPEED MULTIPLAYER</span>
                    <h3 className="text-2xl font-display font-bold text-white">Crash Rocket Engine</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Exponential multiplier curve with sub-20ms instant auto cash-out.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EXACT SECTION 2: WHAT WE BUILD & PLATFORM */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-white/10 overflow-hidden bg-[#0D111A] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#FF782D] uppercase tracking-wider">
              SECTION 2: WHAT WE BUILD
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mt-0.5">
              Turnkey Gaming Platforms &amp; Custom 3D Art
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">Homepage Section 2</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Casino Studio Backdrop */}
          <div className="bg-[#141926] border-2 border-white/10 hover:border-[#FF5B14] rounded-2xl overflow-hidden p-5 space-y-4 relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={homeAssets.casinoBg || defaultHomeAssets.casinoBg}
                alt="Casino Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
                <button
                  type="button"
                  onClick={() => openEditor('casinoBg')}
                  className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                >
                  <Camera className="w-4 h-4" />
                  <span>✏️ Change Casino Backdrop (1920×1080)</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Casino Platform &amp; Live Studio Backdrop</h4>
              <p className="text-xs text-gray-400 mt-1">Used as the primary backdrop texture behind turnkey platform offerings.</p>
            </div>
          </div>

          {/* Card 2: Custom 3D Artwork */}
          <div className="bg-[#141926] border-2 border-white/10 hover:border-[#FF5B14] rounded-2xl overflow-hidden p-5 space-y-4 relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={homeAssets.whatWeBuildBg1 || defaultHomeAssets.whatWeBuildBg1}
                alt="Custom 3D Art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
                <button
                  type="button"
                  onClick={() => openEditor('whatWeBuildBg1')}
                  className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                >
                  <Camera className="w-4 h-4" />
                  <span>✏️ Change Custom 3D Art (800×600)</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Custom Games 3D Artwork</h4>
              <p className="text-xs text-gray-400 mt-1">Showcase artwork for customized bespoke client game builds.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EXACT SECTION 3: SYSTEM ARCHITECTURE */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-white/10 overflow-hidden bg-[#0D111A] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#FF782D] uppercase tracking-wider">
              SECTION 3: SYSTEM ARCHITECTURE
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mt-0.5">
              Sub-45ms Real-Time Authoritative Architecture
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">Homepage Section 3</span>
        </div>

        <div className="bg-[#141926] border-2 border-white/10 hover:border-[#FF5B14] rounded-2xl overflow-hidden p-5 space-y-4 relative group">
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-black/60 border border-white/10">
            <img
              src={homeAssets.architectureDiagram || defaultHomeAssets.architectureDiagram}
              alt="Architecture Diagram"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
              <button
                type="button"
                onClick={() => openEditor('architectureDiagram')}
                className="px-5 py-3 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
              >
                <Camera className="w-4 h-4" />
                <span>✏️ Change Architecture Diagram (1600×900)</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-300">
            This diagram showcases the authoritative Go game loop, WebSocket synchronization, and Redis room manager.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EXACT SECTION 4: STUDIO BEHIND THE SCENES */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-white/10 overflow-hidden bg-[#0D111A] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#FF782D] uppercase tracking-wider">
              SECTION 4: STUDIO BEHIND THE SCENES
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mt-0.5">
              Live Game Technology Lab &amp; Stress Testing
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">Homepage Section 4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BTS 1: Studio Math & Rigging */}
          <div className="bg-[#141926] border-2 border-white/10 hover:border-[#FF5B14] rounded-2xl overflow-hidden p-5 space-y-4 relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={homeAssets.studioBts1 || defaultHomeAssets.studioBts1}
                alt="Studio BTS 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
                <button
                  type="button"
                  onClick={() => openEditor('studioBts1')}
                  className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                >
                  <Camera className="w-4 h-4" />
                  <span>✏️ Change Studio Lab Photo (1000×625)</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Game Math &amp; 3D Modeling Lab</h4>
              <p className="text-xs text-gray-400 mt-1">Showcases certified mathematical modeling and 3D character design.</p>
            </div>
          </div>

          {/* BTS 2: Server Telemetry */}
          <div className="bg-[#141926] border-2 border-white/10 hover:border-[#FF5B14] rounded-2xl overflow-hidden p-5 space-y-4 relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={homeAssets.studioBts2 || defaultHomeAssets.studioBts2}
                alt="Studio BTS 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
                <button
                  type="button"
                  onClick={() => openEditor('studioBts2')}
                  className="px-4 py-2.5 rounded-2xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl cursor-pointer border border-white/30"
                >
                  <Camera className="w-4 h-4" />
                  <span>✏️ Change Server Testing Photo (1000×625)</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100k CCU Server Stress Testing</h4>
              <p className="text-xs text-gray-400 mt-1">Live telemetry and real-time multiplayer server load testing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. POPUP MODAL FOR DIRECT FILE UPLOAD */}
      {/* ========================================================================= */}
      {editingKey && currentMeta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-[#141824] border-2 border-[#FF5B14]/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#FF782D] uppercase tracking-wider bg-[#FF5B14]/15 px-2.5 py-0.5 rounded-full border border-[#FF5B14]/30">
                  {currentMeta.section}
                </span>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1">
                  Replace "{currentMeta.title}"
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingKey(null)}
                className="p-2 rounded-2xl bg-white/5 text-gray-400 hover:text-white cursor-pointer hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Image Preview */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-gray-300">
                <span className="font-bold">Current Photo:</span>
                <span className="text-gray-400 font-mono text-[11px]">Recommended: {currentMeta.recommendedSize}</span>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/80 border-2 border-white/15 shadow-inner">
                <img
                  src={tempUrl || defaultHomeAssets[editingKey]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => void downloadImage(tempUrl || defaultHomeAssets[editingKey], `${editingKey}.png`)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-gray-200 hover:text-white flex items-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF782D]" />
                  <span>Download Image</span>
                </button>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {uploading && (
              <div className="p-4 rounded-2xl bg-[#FF5B14]/15 border border-[#FF5B14]/30 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Uploading to Cloudinary CDN...</span>
                  <span className="text-[#FF782D] font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF5B14] to-[#FF782D] transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Big Upload Area */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#181E2E] to-[#121622] border-2 border-dashed border-[#FF5B14]/50 text-center space-y-3 shadow-lg">
              <UploadCloud className="w-10 h-10 text-[#FF782D] mx-auto animate-bounce" />
              <h4 className="text-white font-bold text-sm sm:text-base">
                Click below to select a new image from your device
              </h4>
              <p className="text-xs text-gray-400">
                Supports PNG, JPG, WebP, SVG • Auto-resizes and optimizes via CDN
              </p>

              <label className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-[#FF5B14]/35 transition cursor-pointer">
                <UploadCloud className="w-5 h-5" />
                <span>{uploading ? `Uploading (${uploadProgress}%)` : '📁 Choose New Photo File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  className="hidden"
                  onChange={(e) => void handleFileUpload(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* Optional URL Input */}
            <div className="space-y-1.5">
              <label className="block text-xs text-gray-400 font-medium">
                Or paste web image link (URL):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... or /assets/..."
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5B14]"
                />
                <button
                  type="button"
                  onClick={() => setTempUrl(defaultHomeAssets[editingKey])}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-gray-300 transition cursor-pointer shrink-0"
                >
                  Reset Default
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingKey(null)}
                className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs sm:text-sm font-semibold cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCurrentSlot}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#FF5B14]/35 hover:opacity-95 transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save &amp; Apply Immediately</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
