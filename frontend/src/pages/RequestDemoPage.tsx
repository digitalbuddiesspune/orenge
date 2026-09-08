import React, { useState } from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { useAppState } from '../contexts/AppStateContext';
import { 
  Gamepad2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock 
} from 'lucide-react';

export const RequestDemoPage: React.FC = () => {
  const { games, addDemoRequest } = useAppState();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    country: '',
    companyWebsite: '',
    gameSlug: 'ludo',
    preferredDate: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const selectedGame = games.find((g) => g.slug === formData.gameSlug);
    const gameTitle = selectedGame ? selectedGame.title : 'General Game Suite';

    try {
      await addDemoRequest({
        fullName: formData.fullName,
        companyName: formData.companyName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
        country: formData.country,
        companyWebsite: formData.companyWebsite,
        gameSlug: formData.gameSlug,
        gameTitle,
        preferredDate: formData.preferredDate,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoMeta
        title="Request Live Game Demo — Test Oreng Real-Time Engines"
        description="Book a live technical walkthrough of Oreng's game engines. Test sub-50ms multiplayer rooms, RNG shuffling, back-office telemetry, and wallet API endpoints."
        keywords="Game Demo Request, Test Game Engine, Ludo Demo, Rummy Engine Demo"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>LIVE TECHNICAL DEMONSTRATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Request a Live Game Demo.
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Experience our live room synchronization, inspect anti-cheat server telemetry, and test our unified platform APIs in a dedicated sandbox environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Demo Booking Form */}
            <div className="lg:col-span-8 bg-[#101420] border border-white/10 rounded-3xl p-5 sm:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Demo Scheduled, {formData.fullName}!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    We have received your demonstration request. A calendar invitation and temporary sandbox access credentials will be sent to <strong className="text-white">{formData.businessEmail}</strong>.
                  </p>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-w-md mx-auto text-left text-xs font-mono text-gray-400 space-y-1">
                    <p>Company: <span className="text-white">{formData.companyName}</span></p>
                    <p>Game Demo: <span className="text-[#FF782D]">{games.find(g => g.slug === formData.gameSlug)?.title}</span></p>
                    <p>Target Date: <span className="text-emerald-400">{formData.preferredDate || 'Earliest Available'}</span></p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        businessEmail: '',
                        phone: '',
                        country: '',
                        companyWebsite: '',
                        gameSlug: 'ludo',
                        preferredDate: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition"
                  >
                    Request Another Game Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-display font-bold text-white pb-3 border-b border-white/10">
                    Schedule Your Technical Walkthrough
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PlayZen Interactive"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Business Email */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@playzen.com"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Country / Jurisdiction *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. India, Malta, UK, Mexico"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Company Website */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Company Website</label>
                      <input
                        type="url"
                        placeholder="https://playzen.com"
                        value={formData.companyWebsite}
                        onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Game Interested In */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Game Interested In *</label>
                      <select
                        value={formData.gameSlug}
                        onChange={(e) => setFormData({ ...formData, gameSlug: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                      >
                        {games.map((g) => (
                          <option key={g.id} value={g.slug}>
                            {g.title} ({g.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Preferred Date / Timezone</label>
                      <input
                        type="text"
                        placeholder="e.g. Next Tuesday at 3 PM IST / 10 AM BST"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Specific Focus Areas / Questions</label>
                      <textarea
                        rows={3}
                        placeholder="What specific aspects would you like demonstrated? (e.g. WebSocket latency benchmarks, admin dispute tools, custom wallet hooks, bot algorithms...)"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-500 font-mono">
                      🔒 Strictly Confidential B2B Demonstration
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Scheduling Demo...</span>
                      ) : (
                        <>
                          <Gamepad2 className="w-4 h-4" />
                          <span>Request Game Demo</span>
                        </>
                      )}
                    </button>
                  </div>
                  {submitError && (
                    <p className="text-sm text-red-400 font-mono">{submitError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Right Column: Demo Highlights */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  What We Cover in the Demo
                </h4>
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-start gap-2.5 p-3 bg-white/5 rounded-xl">
                    <Zap className="w-4 h-4 text-[#FF782D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Live Room Synchronizer</strong>
                      <span>Inspect turn payloads and packet latency over simulated 3G networks.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-white/5 rounded-xl">
                    <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Admin Telemetry Portal</strong>
                      <span>Review live CCU meters, room state inspectors, and replay audit logs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-white/5 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Wallet &amp; API Webhooks</strong>
                      <span>Step-by-step review of JWT SSO and signed transaction endpoints.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center text-xs text-gray-400 space-y-2">
                <Lock className="w-6 h-6 text-[#FF782D] mx-auto" />
                <p className="font-semibold text-white">Private Sandbox Access</p>
                <p className="text-[11px] leading-relaxed">
                  Following the demo, your technical team will be granted sandbox API keys and interactive staging access for independent testing.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
