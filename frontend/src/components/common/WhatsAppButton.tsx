import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#121622] border border-white/10 rounded-2xl shadow-2xl p-5 mb-2 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <WhatsAppIcon className="w-5 h-5" />
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
              Looking for custom multiplayer games, backend systems, or platform integration? Let's connect directly on WhatsApp.
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

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          trackEvent('WhatsApp Widget Toggled', { state: !isOpen });
        }}
        className="flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#1B8A5A] hover:bg-[#1fa366] text-white text-sm font-medium shadow-lg shadow-black/40 transition cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span>Chat on WhatsApp</span>
      </button>
    </div>
  );
};
