import { motion } from 'framer-motion';
import ContactSection from '../components/sections/ContactSection';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';

const ContactPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <PageTransition id="contact-page">
      <main className="pt-24 bg-white">
        {/* Clean typographic hero — no background image */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% -20%, rgba(26,35,126,0.08), transparent 55%), radial-gradient(ellipse 40% 50% at 100% 50%, rgba(2,136,209,0.06), transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(26,35,126,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,35,126,0.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative gs-container max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.28em] uppercase mb-4"
              style={{ color: 'var(--color-primary, #1a237e)' }}
            >
              {pick(UI.pageHero.contact.label, lang)}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#0a1546]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pick(UI.pageHero.contact.title, lang)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              {pick(UI.pageHero.contact.subtitle, lang)}
            </motion.p>
          </div>
        </section>

        <div className="py-12 bg-white">
          <ContactSection />
        </div>
      </main>
    </PageTransition>
  );
};

export default ContactPage;
