import React from 'react';
import { Mail } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({
  onClick,
  children,
}) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className="text-[15px] text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer text-left"
    >
      {children}
    </button>
  </li>
);

export const Footer: React.FC = () => {
  const { navigate } = useAppState();

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: 'https://x.com',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#08090A] overflow-hidden">
      <div className="absolute top-0 left-0 w-[420px] h-[280px] bg-[#FF5B14]/[0.07] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FF5B14] flex items-center justify-center shadow-lg shadow-[#FF5B14]/25">
                <span className="text-white font-display font-bold text-[22px] leading-none -mt-0.5">o</span>
              </div>
              <span className="font-display font-semibold text-[22px] tracking-tight text-white">
                Oreng<span className="text-[#FF5B14]">.</span>
              </span>
            </button>

            <p className="text-[13px] leading-relaxed text-neutral-500 max-w-[220px]">
              Custom game development for gaming platforms, publishers and businesses.
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-[6px] border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <a
              href="mailto:business@oreng.com"
              className="inline-flex items-center gap-2 text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={1.6} />
              <span>business@oreng.com</span>
            </a>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-500 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <FooterLink onClick={() => navigate('about')}>About</FooterLink>
              <FooterLink onClick={() => navigate('work')}>Work</FooterLink>
              <FooterLink onClick={() => navigate('technology')}>Technology</FooterLink>
              <FooterLink onClick={() => navigate('insights')}>Insights</FooterLink>
              <FooterLink onClick={() => navigate('contact')}>Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-500 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              <FooterLink onClick={() => navigate('services')}>Game Development</FooterLink>
              <FooterLink onClick={() => navigate('services')}>Multiplayer Games</FooterLink>
              <FooterLink onClick={() => navigate('services')}>Game Backend</FooterLink>
              <FooterLink onClick={() => navigate('services')}>API Integration</FooterLink>
              <FooterLink onClick={() => navigate('services')}>White Label Solutions</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-500 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              <FooterLink onClick={() => navigate('legal', 'privacy')}>Privacy Policy</FooterLink>
              <FooterLink onClick={() => navigate('legal', 'terms')}>Terms of Use</FooterLink>
              <FooterLink onClick={() => navigate('legal', 'cookies')}>Cookie Policy</FooterLink>
              <FooterLink onClick={() => navigate('legal', 'disclaimer')}>Disclaimer</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant watermark + bottom legal strip */}
      <div className="relative mt-16 sm:mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden leading-none"
        >
          <p className="font-display font-black uppercase text-center tracking-[-0.04em] text-white/[0.045] text-[clamp(5rem,22vw,16rem)] leading-[0.82]">
            ORENG
          </p>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 -mt-6 sm:-mt-10 pb-10">
          <p className="text-[12px] leading-relaxed text-neutral-500 max-w-4xl">
            Oreng is a business-to-business game development studio. This website does not offer
            real-money play, deposits, withdrawals or any form of gambling. Clients are responsible
            for compliance in the jurisdictions in which they operate.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-neutral-500 pr-0 sm:pr-52">
            <p>© 2026 Oreng. All Rights Reserved.</p>
            <p>India — Serving global gaming platforms</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
