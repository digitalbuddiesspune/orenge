import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { X, CheckCircle2, Send, Flame } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, closeConsultationModal, prefilledRequirement, addLead } = useAppState();
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    country: '',
    lookingFor: prefilledRequirement || 'Custom Game Development',
    hasPlatform: 'Yes' as 'Yes' | 'No' | 'Under Development',
    budget: '$30,000 – $60,000',
    timeline: '1–3 Months' as 'Immediately' | '1–3 Months' | '3–6 Months' | '6+ Months' | 'Exploring',
    projectDescription: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isConsultationModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await addLead({
        fullName: formData.fullName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        country: formData.country,
        lookingFor: formData.lookingFor,
        hasPlatform: formData.hasPlatform,
        budget: formData.budget,
        timeline: formData.timeline,
        projectDescription: formData.projectDescription,
        source: 'Quick Consultation Modal',
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    closeConsultationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121622] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0E111B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5">
              <div className="w-full h-full bg-[#0B0D13] rounded-[10px] flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#FF782D]" />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Discuss Your Game Project</h3>
              <p className="text-xs text-gray-400">Connect directly with Oreng's game architects & engineering leads</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">Thank You, {formData.fullName}!</h4>
              <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                Your technical requirements have been received. An Oreng solutions architect will review your project and email you within 24 hours.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-w-md mx-auto text-left text-xs space-y-1 font-mono text-gray-400">
                <p>Company: <span className="text-white">{formData.companyName}</span></p>
                <p>Requirement: <span className="text-[#FF782D]">{formData.lookingFor}</span></p>
                <p>Status: <span className="text-emerald-400">In Review by Oreng Team</span></p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-sm font-semibold hover:opacity-95 transition mt-4 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Gaming Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Company Website</label>
                  <input
                    type="url"
                    placeholder="https://acmegaming.com"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Country / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India, UK, USA, Singapore"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

                {/* What are you looking for? */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-gray-300 mb-1">What Are You Looking For? *</label>
                  <select
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                  >
                    <option value="Custom Game Development">Custom Game Development</option>
                    <option value="Multiplayer Game (Ludo / Board)">Multiplayer Game (Ludo / Board)</option>
                    <option value="Card Game (Rummy / Teen Patti Core)">Card Game (Rummy / Teen Patti Core)</option>
                    <option value="Multiplier / Crash Game Engine">Multiplier / Crash Game Engine</option>
                    <option value="Casual & Strategy Games">Casual & Strategy Games</option>
                    <option value="White-Label Game Solutions">White-Label Game Solutions</option>
                    <option value="Game API Integration">Game API Integration</option>
                    <option value="Existing Game Customization">Existing Game Customization</option>
                    <option value="Other Bespoke Project">Other Bespoke Project</option>
                  </select>
                </div>

                {/* Platform Status */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Do you have a live platform?</label>
                  <select
                    value={formData.hasPlatform}
                    onChange={(e) => setFormData({ ...formData, hasPlatform: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                  >
                    <option value="Yes">Yes, live platform in production</option>
                    <option value="Under Development">Under Development / Pre-launch</option>
                    <option value="No">No, starting from scratch</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Expected Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                  >
                    <option value="Immediately">Immediately (Urgent)</option>
                    <option value="1–3 Months">1–3 Months</option>
                    <option value="3–6 Months">3–6 Months</option>
                    <option value="6+ Months">6+ Months</option>
                    <option value="Exploring">Exploring / Budgeting</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-gray-300 mb-1">Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
                  >
                    <option value="$15,000 – $30,000">$15,000 – $30,000 (Entry White-Label / Prototype)</option>
                    <option value="$30,000 – $60,000">$30,000 – $60,000 (Standard Custom Game + Server)</option>
                    <option value="$60,000 – $100,000">$60,000 – $100,000 (Multi-Table Engine + Full Suite)</option>
                    <option value="$100,000+">$100,000+ (Enterprise Multi-Game Platform SDK)</option>
                  </select>
                </div>

                {/* Project Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-gray-300 mb-1">Project Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the game mechanics, target platforms (Web, iOS, Android), expected player concurrency, or specific integrations required..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14]"
                  />
                </div>

              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-mono">
                  🔒 Strictly Confidential B2B Consultation
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {submitError && (
                <p className="text-sm text-red-400 font-mono mt-2">{submitError}</p>
              )}
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
