import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import StatsSection from '../components/sections/StatsSection';
import ProjectsPreviewSection from '../components/sections/ProjectsPreviewSection';
import OwnerBenefitSection from '../components/sections/OwnerBenefitSection';
import NewsPreviewSection from '../components/sections/NewsPreviewSection';
import GallerySection from '../components/sections/GallerySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import PageTransition from '../components/PageTransition';

const LandingPage: React.FC = () => (
  <PageTransition id="landing-page">
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <ProjectsPreviewSection />
      <OwnerBenefitSection />
      <NewsPreviewSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  </PageTransition>
);

export default LandingPage;
