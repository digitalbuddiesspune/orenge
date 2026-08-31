import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent } = useAppState();
  const defaultMessage = "Hi Oreng, I'm interested in discussing a game development project for our platform.";

  const handleWhatsAppClick = () => {
    trackEvent('WhatsApp Click', { source: 'Floating Button' });
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/919820199999?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#121622] border border-white/10 rounded-2xl shadow-2xl p-5 mb-2 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-sm">Oreng Solutions Desk</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Technical team online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-gray-300 space-y-2">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-gray-200">
              👋 Hello! Looking for custom multiplayer games, backend systems, or platform integration? Let's connect directly on WhatsApp.
            </div>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </button>
          
          <p className="text-[10px] text-gray-500 text-center font-mono mt-2">
            Instant B2B Inquiry • Response within 15 min
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          trackEvent('WhatsApp Widget Toggled', { state: !isOpen });
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition cursor-pointer relative group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#FF5B14] border-2 border-[#0B0D13] flex items-center justify-center text-[9px] font-bold">
          1
        </span>
      </button>

    </div>
  );
};
