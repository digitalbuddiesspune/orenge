import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import orengLogo from '../../assets/orengelogo.png';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Gamepad2
} from 'lucide-react';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'Games', page: 'games' },
  { label: 'Services', page: 'services' },
  { label: 'Technology', page: 'technology' },
  { label: 'Process', page: 'process' },
  { label: 'Portfolio', page: 'work' },
  { label: 'About', page: 'about' },
  { label: 'Insights', page: 'insights' },
];

export const Navbar: React.FC = () => {
  const { currentPage, navigate } = useAppState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const goTo = (page: string) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  const linkClass = (page: string) => {
    const isActive = currentPage === page;
    return `shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white shadow-md shadow-[#FF5B14]/25'
        : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`;
  };

  const NavLinks: React.FC<{ compact?: boolean }> = ({ compact }) => (
    <nav
      className={`flex items-center gap-1 bg-[#0B0D13]/80 border border-white/10 rounded-full px-2 sm:px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/30 ${
        compact ? 'overflow-x-auto max-w-[calc(100vw-1.5rem)] no-scrollbar' : ''
      }`}
    >
      {navItems.map((item) => (
        <button
          key={item.page}
          onClick={() => goTo(item.page)}
          className={linkClass(item.page)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  const MobileActions = () => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Hero header — logo + nav */}
      <header
        className={`absolute top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="bg-gradient-to-b from-black/75 via-black/40 to-transparent py-4 sm:py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goTo('home')}
                className="flex items-center group text-left cursor-pointer focus:outline-none shrink-0"
              >
                <img
                  src={orengLogo}
                  alt="Oreng"
                  className="h-10 sm:h-12 md:h-14 w-auto max-w-[140px] sm:max-w-none object-contain transition-transform group-hover:scale-105"
                />
              </button>

              <div className="hidden lg:block">
                <NavLinks />
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo('request-demo')}
                  className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-[#FF782D]" />
                  <span>Request Demo</span>
                </button>
              </div>

              <div className="flex lg:hidden items-center">
                <MobileActions />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky mobile header when scrolled */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
          isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="bg-[#0B0D13]/95 border-b border-white/10 backdrop-blur-xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo('home')}
              className="shrink-0 cursor-pointer focus:outline-none"
            >
              <img src={orengLogo} alt="Oreng" className="h-9 w-auto max-w-[120px] object-contain" />
            </button>
            <MobileActions />
          </div>
        </div>
      </header>

      {/* Desktop sticky nav pills */}
      <div
        className={`hidden lg:flex fixed top-3 left-0 right-0 z-50 justify-center px-3 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <NavLinks compact />
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 bottom-0 mt-[60px] bg-[#0B0D13]/98 backdrop-blur-xl border-t border-white/10 p-5 overflow-y-auto flex flex-col justify-between safe-bottom">
            <div className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => goTo(item.page)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-base transition cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF5B14]/20 to-transparent text-[#FF782D] border-l-4 border-[#FF5B14]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => goTo('request-demo')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B14]/25 transition cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Request Game Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
