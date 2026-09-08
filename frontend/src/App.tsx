import React from 'react';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ConsultationModal } from './components/common/ConsultationModal';
import { CursorGlowEffect } from './components/common/CursorGlowEffect';

// Pages
import { HomePage } from './pages/HomePage';
import { GamesPage } from './pages/GamesPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { ProcessPage } from './pages/ProcessPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RequestDemoPage } from './pages/RequestDemoPage';
import { InsightsPage } from './pages/InsightsPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LegalPage } from './pages/LegalPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage, isAdminLoggedIn } = useAppState();

  // If on admin route, render clean Admin Portal without public Navbar, Footer, or WhatsApp button
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-[#0B0D13] text-gray-100 overflow-x-hidden selection:bg-[#FF5B14]/30 selection:text-[#FF782D]">
        {isAdminLoggedIn ? <AdminDashboardPage /> : <AdminLoginPage />}
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'games':
        return <GamesPage />;
      case 'game-detail':
        return <GameDetailPage />;
      case 'services':
        return <ServicesPage />;
      case 'technology':
        return <TechnologyPage />;
      case 'process':
        return <ProcessPage />;
      case 'work':
        return <CaseStudiesPage />;
      case 'case-study-detail':
        return <CaseStudyDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'request-demo':
        return <RequestDemoPage />;
      case 'insights':
        return <InsightsPage />;
      case 'blog-detail':
        return <BlogPostPage />;
      case 'legal':
        return <LegalPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D13] text-gray-100 overflow-x-hidden selection:bg-[#FF5B14]/30 selection:text-[#FF782D]">
      <CursorGlowEffect />
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        {renderCurrentPage()}
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsultationModal />
    </div>
  );
};

export function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}

export default App;
