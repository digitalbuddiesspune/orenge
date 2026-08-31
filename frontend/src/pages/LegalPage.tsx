import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { ShieldCheck } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const { currentSlug, navigate } = useAppState();

  const tab = currentSlug || 'privacy';

  return (
    <>
      <SeoMeta
        title="Corporate Compliance, Legal Terms & Privacy Policy — Oreng"
        description="Review Oreng's B2B Terms of Service, Privacy Policy, Cookie Policy, and Regulatory Compliance statements."
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>REGULATORY &amp; COMPLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Legal &amp; Compliance Information
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-2">
              Last Updated: August 2026 • Oreng Game Technology Systems
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-white/10">
            <button
              onClick={() => navigate('legal', 'privacy')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                tab === 'privacy' ? 'bg-[#FF5B14] text-white font-semibold' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('legal', 'terms')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                tab === 'terms' ? 'bg-[#FF5B14] text-white font-semibold' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Terms of Use
            </button>
            <button
              onClick={() => navigate('legal', 'disclaimer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                tab === 'disclaimer' ? 'bg-[#FF5B14] text-white font-semibold' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              B2B Disclaimer &amp; Compliance
            </button>
            <button
              onClick={() => navigate('legal', 'cookies')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                tab === 'cookies' ? 'bg-[#FF5B14] text-white font-semibold' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Cookie Policy
            </button>
          </div>

          {/* Legal Content Body */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121622] border border-white/10 text-gray-300 text-sm leading-relaxed space-y-6">
            
            {tab === 'privacy' && (
              <>
                <h2 className="text-2xl font-display font-bold text-white">Privacy Policy</h2>
                <p>
                  Oreng ("we", "our", or "us") is dedicated to safeguarding the privacy of visitors and business partners who interact with our website and software evaluation portals. This Privacy Policy details how we collect, store, and utilize enterprise contact information.
                </p>
                <h3 className="text-lg font-bold text-white">1. Information Collection</h3>
                <p>
                  We collect information voluntarily submitted through our Lead Intake Forms, Demo Request forms, and email communications, including full name, business email address, phone/WhatsApp number, company name, website, country, and project specifications.
                </p>
                <h3 className="text-lg font-bold text-white">2. Purpose of Processing</h3>
                <p>
                  Contact information is used solely for responding to commercial inquiries, scheduling technical architecture demonstrations, preparing customized development proposals, and sending occasional technical updates. We do not sell or lease business contact information to third parties.
                </p>
                <h3 className="text-lg font-bold text-white">3. Data Security</h3>
                <p>
                  We implement TLS 1.3 encryption, secure database access control, and strict internal authorization protocols to safeguard your business information.
                </p>
              </>
            )}

            {tab === 'terms' && (
              <>
                <h2 className="text-2xl font-display font-bold text-white">Terms of Use</h2>
                <p>
                  By accessing the Oreng website, you agree to comply with and be bound by the following terms and conditions governing the evaluation of our corporate services.
                </p>
                <h3 className="text-lg font-bold text-white">1. Intellectual Property</h3>
                <p>
                  All proprietary game engines, graphics, architecture diagrams, code demonstrations, and written content displayed on this website are the intellectual property of Oreng. Custom game intellectual property transfers occur solely under signed Master Services Agreements (MSA).
                </p>
                <h3 className="text-lg font-bold text-white">2. Permitted Use</h3>
                <p>
                  This website is intended exclusively for businesses, gaming platform owners, publishers, and developers evaluating software development partnerships.
                </p>
              </>
            )}

            {tab === 'disclaimer' && (
              <>
                <h2 className="text-2xl font-display font-bold text-white">B2B Disclaimer &amp; Regulatory Compliance Statement</h2>
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-[#FF782D] text-xs font-mono">
                  NOTICE: STRICTLY B2B TECHNOLOGY &amp; SOFTWARE DEVELOPMENT SERVICES
                </div>
                <p>
                  Oreng is a business-to-business (B2B) custom software development studio and technology provider. Oreng develops proprietary gaming engines, client rendering applications, server architectures, and API integrations for licensed platform operators and commercial businesses.
                </p>
                <h3 className="text-lg font-bold text-white">No Consumer Gaming or Betting Facilities</h3>
                <p>
                  Oreng does not operate consumer gaming platforms, consumer wagering facilities, financial deposit/withdrawal gateways, or gambling services on this website. No real money can be wagered or won on this website.
                </p>
                <h3 className="text-lg font-bold text-white">Jurisdictional Responsibility</h3>
                <p>
                  Clients who license or commission software from Oreng are solely responsible for ensuring that their operational deployment, game rule parameters, player age verification, and licensing comply fully with the local laws and regulations of the jurisdictions in which they operate.
                </p>
              </>
            )}

            {tab === 'cookies' && (
              <>
                <h2 className="text-2xl font-display font-bold text-white">Cookie Policy</h2>
                <p>
                  Our website utilizes essential and analytical cookies to ensure optimal performance, remember your navigation preferences, and measure traffic engagement.
                </p>
                <h3 className="text-lg font-bold text-white">Managing Cookies</h3>
                <p>
                  You can configure your browser settings to decline or delete cookies at any time. Disabling cookies will not restrict your access to our corporate game catalog or inquiry forms.
                </p>
              </>
            )}

          </div>

        </div>
      </div>
    </>
  );
};
