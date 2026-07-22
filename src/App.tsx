import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import ScrollToTop  from './components/ScrollToTop';
import FloatingChat from './components/FloatingChat';
import LandingPage  from './pages/LandingPage';
import CareerPage   from './pages/CareerPage';
import AboutPage    from './pages/AboutPage';
import NewsPage     from './pages/NewsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import ProjectsPage from './pages/ProjectsPage';
import TeamPage     from './pages/TeamPage';
import ContactPage  from './pages/ContactPage';
import DownloadBrochure from './pages/DownloadBrochure';
import SendMessagePage from './pages/SendMessagePage';
import WhyUsPage from './pages/WhyUsPage';

// Helper component to handle scrolling to hash elements
const ScrollToHashElement: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/our-team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/download-brochure" element={<DownloadBrochure />} />
        <Route path="/send-message" element={<SendMessagePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <BrowserRouter>
      <ScrollToHashElement />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingChat />
      <ScrollToTop />
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
