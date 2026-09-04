import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { X, CheckCircle2, Send, Sparkles, Phone, Mail, User, Building, MessageSquare } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, closeConsultationModal, prefilledRequirement, addLead } = useAppState();

  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phone: '',
    companyName: '',
    lookingFor: prefilledRequirement || 'Custom Game Development',
    budget: '$15,000 – $30,000',
    projectDescription: '',
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
        companyName: formData.companyName || 'Not Specified',
        companyWebsite: '',
        country: 'Global / Online',
        lookingFor: formData.lookingFor,
        hasPlatform: 'No',
        budget: formData.budget,
        timeline: 'Exploring',
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
      <div className="relative w-full max-w-xl bg-[#121622] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0E111B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5">
              <div className="w-full h-full bg-[#0B0D13] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF782D]" />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Book Free Consultation</h3>
              <p className="text-xs text-gray-400">Discuss your game project & get quick cost & timeline estimates</p>
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
        <div className="p-5 max-h-[78vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">Thank You, {formData.fullName}!</h4>
              <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                Your request has been received. Our team will contact you shortly via email or WhatsApp.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-w-md mx-auto text-left text-xs space-y-1.5 text-gray-300">
                <p><span className="text-gray-500">Service:</span> <span className="text-[#FF782D] font-medium">{formData.lookingFor}</span></p>
                <p><span className="text-gray-500">Contact:</span> <span className="text-white font-medium">{formData.businessEmail || formData.phone}</span></p>
                <p><span className="text-gray-500">Status:</span> <span className="text-emerald-400 font-medium">● We will reply within 24 Hours</span></p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white text-sm font-semibold hover:opacity-95 transition mt-2 cursor-pointer shadow-lg shadow-[#FF5B14]/20"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                    <User className="w-3.5 h-3.5 text-[#FF782D]" />
                    Your Name <span className="text-[#FF5B14]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF782D]" />
                    Phone / WhatsApp <span className="text-[#FF5B14]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition"
                  />
                </div>
              </div>

              {/* Row 2: Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF782D]" />
                    Email Address <span className="text-[#FF5B14]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                    <Building className="w-3.5 h-3.5 text-gray-400" />
                    Company / Brand Name <span className="text-gray-500 text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. My Brand / Studio"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition"
                  />
                </div>
              </div>

              {/* Row 3: Requirement & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    What are you looking for? <span className="text-[#FF5B14]">*</span>
                  </label>
                  <select
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14] transition"
                  >
                    <option value="Custom Game Development">🎲 Custom Game Development</option>
                    <option value="Multiplayer Game (Ludo / Board)">🎯 Ludo / Board Games</option>
                    <option value="Card Game (Rummy / Teen Patti)">🃏 Card Games (Rummy / Teen Patti)</option>
                    <option value="Multiplier / Crash Game Engine">🚀 Crash / Multiplier Game</option>
                    <option value="White-Label Game Solutions">📦 Ready White-Label Game</option>
                    <option value="Game API Integration">🔌 Game API Integration</option>
                    <option value="Other Bespoke Project">💡 Other / New Game Idea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Estimated Budget <span className="text-gray-500 text-[11px]">(Optional)</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14] transition"
                  >
                    <option value="$15,000 – $30,000">Flexible / Starter ($15k - $30k)</option>
                    <option value="$30,000 – $60,000">Standard Project ($30k - $60k)</option>
                    <option value="$60,000 – $100,000">Advanced / Multi-Game ($60k - $100k)</option>
                    <option value="$100,000+">Enterprise Platform ($100k+)</option>
                  </select>
                </div>
              </div>

              {/* Message / Details */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  Tell us a bit about your idea <span className="text-gray-500 text-[11px]">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any details, reference games, or specific features you need..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B14] transition resize-none"
                />
              </div>

              {/* Footer / Submit */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  🔒 100% Free & Confidential Consultation
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Get Free Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {submitError && (
                <p className="text-xs text-red-400 font-mono mt-1 text-center">{submitError}</p>
              )}
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

