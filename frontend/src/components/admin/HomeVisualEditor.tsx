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
  Layers,
  Sparkles,
  Gamepad2,
  Shield,
  Cpu,
  Tv,
} from 'lucide-react';

type SectionCategory = 'all' | 'hero' | 'build' | 'portfolio' | 'why' | 'architecture' | 'decor';

type SlotMeta = {
  key: keyof HomeAssetsConfig;
  title: string;
  category: SectionCategory;
  section: string;
  recommendedSize: string;
  description: string;
};

const SLOT_CONFIGS: Record<keyof HomeAssetsConfig, SlotMeta> = {
  // 1. Hero Showreel
  heroBg: {
    key: 'heroBg',
    category: 'hero',
    title: 'Hero Main Studio Background',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1672 × 941 px',
    description: 'The master top background image seen on the homepage hero banner.',
  },
  ludoBg: {
    key: 'ludoBg',
    category: 'hero',
    title: 'Showreel: 3D Ludo Game Board',
    section: 'Section 1: Hero Showreel (Tab 1)',
    recommendedSize: '1280 × 800 px',
    description: '3D Ludo board visual artwork displayed in the interactive showreel tab.',
  },
  pokerBg: {
    key: 'pokerBg',
    category: 'hero',
    title: 'Showreel: Cards & Rummy Game Table',
    section: 'Section 1: Hero Showreel (Tab 2)',
    recommendedSize: '1280 × 800 px',
    description: 'Multi-table Poker and Rummy felt artwork displayed in the showreel.',
  },
  rouletteBg: {
    key: 'rouletteBg',
    category: 'hero',
    title: 'Showreel: Live European Roulette Wheel',
    section: 'Section 1: Hero Showreel (Tab 3)',
    recommendedSize: '1280 × 800 px',
    description: '3D Roulette spinning wheel artwork in the interactive showreel.',
  },
  multiplayerBg: {
    key: 'multiplayerBg',
    category: 'hero',
    title: 'Showreel: Crash Multiplier / Rocket Engine',
    section: 'Section 1: Hero Showreel (Tab 4)',
    recommendedSize: '1280 × 800 px',
    description: 'Multiplier chart and high-speed multiplayer engine graphic in the showreel.',
  },
  heroTrailerPoster: {
    key: 'heroTrailerPoster',
    category: 'hero',
    title: 'Hero Video / Trailer Poster',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1280 × 720 px',
    description: 'Preview poster thumbnail for the video showreel player.',
  },
  heroLudo: {
    key: 'heroLudo',
    category: 'hero',
    title: 'Hero Ludo Showcase Asset',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1280 × 800 px',
    description: 'Dedicated 3D Ludo graphic used in flagship hero showcases.',
  },
  heroCards: {
    key: 'heroCards',
    category: 'hero',
    title: 'Hero Cards Showcase Asset',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1280 × 800 px',
    description: 'Dedicated Card deck visual asset for hero showcases.',
  },
  heroRoulette: {
    key: 'heroRoulette',
    category: 'hero',
    title: 'Hero Roulette Showcase Asset',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1280 × 800 px',
    description: 'Dedicated Roulette wheel visual asset for hero showcases.',
  },
  heroCrash: {
    key: 'heroCrash',
    category: 'hero',
    title: 'Hero Crash Rocket Showcase Asset',
    section: 'Section 1: Hero Showreel',
    recommendedSize: '1280 × 800 px',
    description: 'Dedicated Crash multiplier visual asset for hero showcases.',
  },

  // 2. What We Build
  whatWeBuild1: {
    key: 'whatWeBuild1',
    category: 'build',
    title: 'What We Build: Multiplayer Games Banner',
    section: 'Section 2: What We Build (Card 1)',
    recommendedSize: '1280 × 800 px',
    description: 'Image for the Multiplayer Games card (e.g. Ludo, room engine).',
  },
  whatWeBuild2: {
    key: 'whatWeBuild2',
    category: 'build',
    title: 'What We Build: Card & Table Games Banner',
    section: 'Section 2: What We Build (Card 2)',
    recommendedSize: '1280 × 800 px',
    description: 'Image for Card & Table Games card (e.g. Poker, Rummy tables).',
  },
  whatWeBuild3: {
    key: 'whatWeBuild3',
    category: 'build',
    title: 'What We Build: Board & Casual Games Banner',
    section: 'Section 2: What We Build (Card 3)',
    recommendedSize: '1280 × 800 px',
    description: 'Image for Board & Casual Games card (e.g. 3D Ludo, Dice).',
  },
  whatWeBuildBackdrop: {
    key: 'whatWeBuildBackdrop',
    category: 'build',
    title: 'What We Build: Section Ambient Backdrop',
    section: 'Section 2: What We Build (Backdrop)',
    recommendedSize: '1920 × 1080 px',
    description: 'Ambient background glow and texture behind the What We Build section.',
  },
  whatWeBuildBg1: {
    key: 'whatWeBuildBg1',
    category: 'build',
    title: 'What We Build: Left Floating Accent',
    section: 'Section 2: What We Build (Accents)',
    recommendedSize: '600 × 400 px',
    description: 'Floating background card decor on the top left side of the section.',
  },
  whatWeBuildBg2: {
    key: 'whatWeBuildBg2',
    category: 'build',
    title: 'What We Build: Right Floating Accent',
    section: 'Section 2: What We Build (Accents)',
    recommendedSize: '600 × 400 px',
    description: 'Floating background board decor on the bottom right side of the section.',
  },
  whatWeBuildBg3: {
    key: 'whatWeBuildBg3',
    category: 'build',
    title: 'What We Build: Turnkey Platform Visual',
    section: 'Section 2: What We Build (Accents)',
    recommendedSize: '800 × 600 px',
    description: 'Turnkey gaming platform visual texture.',
  },
  casinoBg: {
    key: 'casinoBg',
    category: 'build',
    title: 'Casino Studio & Platform Master Backdrop',
    section: 'Section 2: What We Build',
    recommendedSize: '1920 × 1080 px',
    description: 'High-res casino studio platform background image.',
  },

  // 3. Featured Games / Portfolio
  portfolioBackdrop: {
    key: 'portfolioBackdrop',
    category: 'portfolio',
    title: 'Portfolio Section Ambient Backdrop',
    section: 'Section 3: Portfolio Bento Grid',
    recommendedSize: '1920 × 1080 px',
    description: 'Atmospheric ambient backdrop texture behind the portfolio bento grid.',
  },
  portfolioLudo: {
    key: 'portfolioLudo',
    category: 'portfolio',
    title: 'Portfolio Left Accent Decor (Ludo)',
    section: 'Section 3: Portfolio Bento Grid',
    recommendedSize: '600 × 400 px',
    description: 'Left floating backdrop decor behind the portfolio grid.',
  },
  portfolioCards: {
    key: 'portfolioCards',
    category: 'portfolio',
    title: 'Portfolio Right Accent Decor (Cards)',
    section: 'Section 3: Portfolio Bento Grid',
    recommendedSize: '600 × 400 px',
    description: 'Right floating backdrop decor behind the portfolio grid.',
  },
  portfolioRoulette: {
    key: 'portfolioRoulette',
    category: 'portfolio',
    title: 'Portfolio Roulette Showcase',
    section: 'Section 3: Portfolio Bento Grid',
    recommendedSize: '1280 × 800 px',
    description: 'Roulette showcase artwork for portfolio tile fallback.',
  },
  portfolioCrash: {
    key: 'portfolioCrash',
    category: 'portfolio',
    title: 'Portfolio Crash Multiplier Showcase',
    section: 'Section 3: Portfolio Bento Grid',
    recommendedSize: '1280 × 800 px',
    description: 'Crash multiplier showcase artwork for portfolio tile fallback.',
  },

  // 4. Why Oreng (6 Pillars)
  whyOrengBg1: {
    key: 'whyOrengBg1',
    category: 'why',
    title: 'Pillar 1: Built for Your Brand',
    section: 'Section 4: Why Oreng (Pillar 01)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 1 "Built for Your Brand" is active.',
  },
  whyOrengBg2: {
    key: 'whyOrengBg2',
    category: 'why',
    title: 'Pillar 2: Custom Game Rules',
    section: 'Section 4: Why Oreng (Pillar 02)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 2 "Custom Game Rules" is active.',
  },
  whyOrengBg3: {
    key: 'whyOrengBg3',
    category: 'why',
    title: 'Pillar 3: Play Together Online',
    section: 'Section 4: Why Oreng (Pillar 03)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 3 "Play Together Online" is active.',
  },
  whyOrengBg4: {
    key: 'whyOrengBg4',
    category: 'why',
    title: 'Pillar 4: Easy to Connect',
    section: 'Section 4: Why Oreng (Pillar 04)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 4 "Easy to Connect" is active.',
  },
  whyOrengBg5: {
    key: 'whyOrengBg5',
    category: 'why',
    title: 'Pillar 5: Handles Many Players',
    section: 'Section 4: Why Oreng (Pillar 05)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 5 "Handles Many Players" is active.',
  },
  whyOrengBg6: {
    key: 'whyOrengBg6',
    category: 'why',
    title: 'Pillar 6: Complete Partner',
    section: 'Section 4: Why Oreng (Pillar 06)',
    recommendedSize: '1920 × 1080 px',
    description: 'Background artwork displayed when Pillar 6 "Complete Partner" is active.',
  },

  // 5. System Architecture
  architectureDiagram: {
    key: 'architectureDiagram',
    category: 'architecture',
    title: 'System Netcode & Architecture Blueprint Banner',
    section: 'Section 5: System Architecture',
    recommendedSize: '1600 × 900 px',
    description: 'Wide banner illustrating authoritative netcode, WebSockets, Go loops, and Redis room manager.',
  },

  // 6. Floating Global Decors & Studio BTS
  floatingDecor1: {
    key: 'floatingDecor1',
    category: 'decor',
    title: 'Global Floating Decor 1 (Top-Right)',
    section: 'Section 6: Ambient Global Background Decors',
    recommendedSize: '600 × 400 px',
    description: 'Floating ambient backdrop image positioned on the top-right of the homepage.',
  },
  floatingDecor2: {
    key: 'floatingDecor2',
    category: 'decor',
    title: 'Global Floating Decor 2 (Mid-Left)',
    section: 'Section 6: Ambient Global Background Decors',
    recommendedSize: '600 × 400 px',
    description: 'Floating ambient backdrop image positioned on the mid-left of the homepage.',
  },
  floatingDecor3: {
    key: 'floatingDecor3',
    category: 'decor',
    title: 'Global Floating Decor 3 (Mid-Right)',
    section: 'Section 6: Ambient Global Background Decors',
    recommendedSize: '600 × 400 px',
    description: 'Floating ambient backdrop image positioned on the mid-right of the homepage.',
  },
  floatingDecor4: {
    key: 'floatingDecor4',
    category: 'decor',
    title: 'Global Floating Decor 4 (Bottom-Left)',
    section: 'Section 6: Ambient Global Background Decors',
    recommendedSize: '600 × 400 px',
    description: 'Floating ambient backdrop image positioned on the lower-left of the homepage.',
  },
  studioBts1: {
    key: 'studioBts1',
    category: 'decor',
    title: 'Studio Tech Lab & 3D Modeling Photo',
    section: 'Section 6: Studio Technology Behind The Scenes',
    recommendedSize: '1000 × 625 px',
    description: 'Photo showing 3D game art modeling and mathematical simulation lab.',
  },
  studioBts2: {
    key: 'studioBts2',
    category: 'decor',
    title: '100k CCU Server Stress Testing Telemetry',
    section: 'Section 6: Studio Technology Behind The Scenes',
    recommendedSize: '1000 × 625 px',
    description: 'Photo showing live server concurrency and telemetry dashboards.',
  },
};

const CATEGORIES: { id: SectionCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Sections (All Images)', icon: Layers },
  { id: 'hero', label: '1. Hero Showreel', icon: Sparkles },
  { id: 'build', label: '2. What We Build', icon: Gamepad2 },
  { id: 'portfolio', label: '3. Portfolio / Bento', icon: Tv },
  { id: 'why', label: '4. Why Oreng (6 Pillars)', icon: Shield },
  { id: 'architecture', label: '5. System Architecture', icon: Cpu },
  { id: 'decor', label: '6. Global Decors & Studio', icon: Camera },
];

export const HomeVisualEditor: React.FC = () => {
  const { homeAssets, updateHomeAsset, resetHomeAssets, navigate } = useAppState();

  const [selectedCategory, setSelectedCategory] = useState<SectionCategory>('all');
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
    showToast(`"${SLOT_CONFIGS[editingKey]?.title || editingKey}" saved live!`);
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
      showToast(`Image uploaded and applied live!`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const currentMeta = editingKey ? SLOT_CONFIGS[editingKey] : null;

  // Filter slot entries by category
  const allSlotEntries = Object.entries(SLOT_CONFIGS) as [keyof HomeAssetsConfig, SlotMeta][];
  const filteredSlots = selectedCategory === 'all'
    ? allSlotEntries
    : allSlotEntries.filter(([, meta]) => meta.category === selectedCategory);

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
                All Homepage Images Admin Control
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                Live Cloudinary CDN
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Change any image across all 6 sections of the home screen. Upload directly or paste custom links.
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
              if (confirm('Reset all homepage images back to original studio artwork?')) {
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

      {/* Category Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 bg-[#0F121C] border border-white/10 rounded-2xl">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-lg shadow-[#FF5B14]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/95 text-white text-sm font-bold flex items-center gap-3 shadow-2xl animate-fade-in backdrop-blur-md border border-white/20">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of All Configurable Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlots.map(([key, meta]) => {
          const currentUrl = homeAssets[key] || defaultHomeAssets[key];
          const isModified = Boolean(homeAssets[key] && homeAssets[key] !== defaultHomeAssets[key]);

          return (
            <div
              key={key}
              className="bg-[#121622] border-2 border-white/10 hover:border-[#FF5B14]/70 rounded-3xl overflow-hidden p-5 flex flex-col justify-between space-y-4 shadow-xl group transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF5B14]/15 border border-[#FF5B14]/30 text-[#FF782D]">
                    {meta.section}
                  </span>
                  {isModified ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      Customized
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-mono">Default</span>
                  )}
                </div>

                {/* Title & Desc */}
                <div>
                  <h4 className="font-display font-bold text-white text-base group-hover:text-[#FF782D] transition-colors line-clamp-1">
                    {meta.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {meta.description}
                  </p>
                </div>

                {/* Image Preview Box */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-inner group/img">
                  <img
                    src={currentUrl}
                    alt={meta.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultHomeAssets[key] || '/assets/ludo_3d_gameplay.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <button
                      type="button"
                      onClick={() => openEditor(key)}
                      className="px-4 py-2 rounded-xl bg-[#FF5B14] hover:bg-[#FF782D] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xl cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void downloadImage(currentUrl, `${key}.png`)}
                      className="p-2 rounded-xl bg-black/70 hover:bg-black text-white text-xs flex items-center justify-center cursor-pointer border border-white/20"
                      title="Download Image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] font-mono text-gray-300 border border-white/10">
                    {meta.recommendedSize}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openEditor(key)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#FF5B14]/25 hover:opacity-95 transition cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>✏️ Change Image</span>
                </button>

                {isModified && (
                  <button
                    type="button"
                    onClick={() => {
                      updateHomeAsset(key, defaultHomeAssets[key]);
                      showToast(`Reset "${meta.title}" to default!`);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition cursor-pointer"
                    title="Reset to default image"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* POPUP MODAL FOR DIRECT FILE UPLOAD OR URL REPLACEMENT */}
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
