import { motion } from 'framer-motion';
import { Users, Award, Building2 } from 'lucide-react';
import TeamsSection from '../components/sections/TeamsSection';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';

const HIGHLIGHTS = [
  {
    icon: Users,
    label: { en: 'Leadership', bn: 'নেতৃত্ব' },
  },
  {
    icon: Award,
    label: { en: 'Excellence', bn: 'উৎকর্ষতা' },
  },
  {
    icon: Building2,
    label: { en: 'Hospitality', bn: 'আতিথেয়তা' },
  },
];

const TeamPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <PageTransition id="team-page">
      <main className="pt-24 bg-white">
        {/* Clean typographic hero — no background image */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% -20%, rgba(26,35,126,0.08), transparent 55%), radial-gradient(ellipse 40% 50% at 0% 80%, rgba(201,168,76,0.08), transparent 45%)',
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
              {pick(UI.team.label, lang)}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#0a1546]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pick(UI.pageHero.team.title, lang)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {pick(UI.pageHero.team.subtitle, lang)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <span
                  key={label.en}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-[#0a1546] shadow-sm"
                >
                  <span className="w-7 h-7 rounded-full bg-[#e8f0fe] text-[#1a237e] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  {pick(label, lang)}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <TeamsSection />
      </main>
    </PageTransition>
  );
};

export default TeamPage;
