import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { 
  Flame, 
  Menu, 
  X, 
  ChevronRight, 
  Gamepad2, 
  ShieldCheck
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
  const { currentPage, navigate, isAdminLoggedIn } = useAppState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      if (scrolled) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        compact ? 'overflow-x-auto max-w-[calc(100vw-1.5rem)]' : ''
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

  return (
    <>
      {/* Logo + CTAs sit over the hero and scroll away */}
      <header
        className={`absolute top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="bg-gradient-to-b from-black/75 via-black/40 to-transparent py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => goTo('home')}
                className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
              >
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5 shadow-lg shadow-[#FF5B14]/30 transition-transform group-hover:scale-105">
                  <div className="w-full h-full bg-[#0B0D13] rounded-[10px] flex items-center justify-center">
                    <Flame className="w-5 h-5 text-[#FF782D] group-hover:animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                      ORENG
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B14] animate-ping" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-mono text-gray-400 block -mt-1">
                    Game Systems Studio
                  </span>
                </div>
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

                <button
                  type="button"
                  onClick={() => goTo('admin')}
                  title="Admin Portal"
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    isAdminLoggedIn
                      ? 'bg-[#FF5B14]/10 border-[#FF5B14]/40 text-[#FF782D]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>

              <div className="flex lg:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo('admin')}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 cursor-pointer"
                  title="Admin"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Only these links stay pinned while scrolling */}
      <div
        className={`fixed top-3 left-0 right-0 z-50 flex justify-center px-3 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <NavLinks compact />
      </div>

      {mobileMenuOpen && !isScrolled && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-40 bg-[#0B0D13]/98 backdrop-blur-xl border-t border-white/10 p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-2">
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
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-[#FF782D]" />
              <span>Request Game Demo</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
