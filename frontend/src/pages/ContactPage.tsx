import React, { useState } from 'react';
import { SeoMeta } from '../components/common/SeoMeta';
import { useAppState } from '../contexts/AppStateContext';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addLead } = useAppState();

  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    country: '',
    lookingFor: 'Custom Game Development',
    hasPlatform: 'Yes' as 'Yes' | 'No' | 'Under Development',
    budget: '$30,000 – $60,000',
    timeline: '1–3 Months' as 'Immediately' | '1–3 Months' | '3–6 Months' | '6+ Months' | 'Exploring',
    projectDescription: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await addLead({
        ...formData,
        source: 'Dedicated Contact Page',
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
        title="Contact Us & Project Consultation — Oreng Game Engineering"
        description="Tell us what you're building. Connect with Oreng's game architects and engineering leads for custom multiplayer games, backend systems, and platform integration."
        keywords="Contact Game Developers, Game Consultation, Hire Game Studio, B2B Game Inquiry"
      />

      <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#07090E] text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT TECHNICAL INQUIRY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Let's Build Your Next Game.
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Tell us what you're building and our team will discuss the technical requirements, architecture design, and commercial terms with you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-8 bg-[#101420] border border-white/10 rounded-3xl p-5 sm:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Inquiry Received, {formData.fullName}!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for sharing your project requirements. An Oreng solutions architect has been assigned to your inquiry and will reach out via <strong className="text-white">{formData.businessEmail}</strong> within 24 business hours.
                  </p>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-w-md mx-auto text-left text-xs text-gray-300 space-y-1">
                    <p>Company: <span className="text-white">{formData.companyName}</span></p>
                    <p>Requirement: <span className="text-[#FF782D]">{formData.lookingFor}</span></p>
                    <p>Timeline: <span className="text-white">{formData.timeline}</span></p>
                    <p>Ref ID: <span className="text-cyan-400">ORG-{Date.now().toString().slice(-6)}</span></p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        businessEmail: '',
                        phone: '',
                        companyName: '',
                        companyWebsite: '',
                        country: '',
                        lookingFor: 'Custom Game Development',
                        hasPlatform: 'Yes',
                        budget: '$30,000 – $60,000',
                        timeline: '1–3 Months',
                        projectDescription: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-display font-bold text-white pb-3 border-b border-white/10">
                    Project Specifications Form
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Johnathan Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition"
                      />
                    </div>

                    {/* Business Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="j.doe@enterprise.com"
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
                        placeholder="+1 (555) 234-5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Gaming Global"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Company Website */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Company Website</label>
                      <input
                        type="url"
                        placeholder="https://apexgaming.io"
                        value={formData.companyWebsite}
                        onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Country / Operating Region *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. India, United Kingdom, Singapore"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>

                    {/* Looking for */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">What Are You Looking For? *</label>
                      <select
                        value={formData.lookingFor}
                        onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                      >
                        <option value="Custom Game Development">Custom Game Development</option>
                        <option value="Multiplayer Game">Multiplayer Game</option>
                        <option value="Card Game">Card Game (Rummy / Teen Patti Core)</option>
                        <option value="Board Game">Board Game (Ludo, Chess, Snakes)</option>
                        <option value="Ludo">Ludo Engine Specialized Build</option>
                        <option value="White-Label Game">White-Label Game Solution</option>
                        <option value="Game API Integration">Game API Integration & SSO</option>
                        <option value="Existing Game Customization">Existing Game Customization</option>
                        <option value="Other">Other Bespoke Project</option>
                      </select>
                    </div>

                    {/* Platform Status */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Do You Already Have a Gaming Platform?</label>
                      <select
                        value={formData.hasPlatform}
                        onChange={(e) => setFormData({ ...formData, hasPlatform: e.target.value as any })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                      >
                        <option value="Yes">Yes, Live in Production</option>
                        <option value="Under Development">Under Development / Pre-Launch</option>
                        <option value="No">No, Starting New Project</option>
                      </select>
                    </div>

                    {/* Expected Timeline */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Expected Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                      >
                        <option value="Immediately">Immediately (Urgent)</option>
                        <option value="1–3 Months">1–3 Months</option>
                        <option value="3–6 Months">3–6 Months</option>
                        <option value="6+ Months">6+ Months</option>
                        <option value="Exploring">Exploring / Budgeting</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Estimated Project Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                      >
                        <option value="$15,000 – $30,000">$15,000 – $30,000 (White-Label / Prototype)</option>
                        <option value="$30,000 – $60,000">$30,000 – $60,000 (Standard Custom Game + Server)</option>
                        <option value="$60,000 – $100,000">$60,000 – $100,000 (Multi-Table Engine + Full Suite)</option>
                        <option value="$100,000+">$100,000+ (Enterprise Multi-Game Platform SDK)</option>
                      </select>
                    </div>

                    {/* Project Description */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">Project Description *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your game idea, target audience, expected player concurrency, target platforms (Web, Android, iOS), and any specific wallet or backend integrations needed..."
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-500 font-mono">
                      🔒 All submissions subject to strict mutual NDA
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Request Consultation</span>
                          <Send className="w-4 h-4" />
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

            {/* Right Column: Trust & Contact Information */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Contact Card */}
              <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Direct Inquiries
                </h4>
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Mail className="w-4 h-4 text-[#FF782D]" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Business Development</span>
                      <span className="text-white font-mono">solutions@oreng.io</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">WhatsApp Direct Desk</span>
                      <span className="text-white font-mono">+91 98201 99999</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-gray-400 block text-[10px]">Headquarters &amp; Delivery</span>
                      <span className="text-white">Pune, India (Global Remote Support)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  What Happens Next?
                </h4>
                <div className="space-y-3 text-xs text-gray-300 font-mono">
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF782D] font-bold">1.</span>
                    <span>Requirement intake &amp; feasibility assessment (24h)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF782D] font-bold">2.</span>
                    <span>NDA execution &amp; technical scope discovery call</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF782D] font-bold">3.</span>
                    <span>Architecture blueprint, math model &amp; milestone proposal</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center text-xs text-gray-400 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-semibold text-white">Enterprise Privacy Guarantee</p>
                <p className="text-[11px] leading-relaxed">
                  We never disclose client proprietary mechanics or platform data. Sensitive game products are demonstrated exclusively under signed NDA.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
