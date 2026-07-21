import { motion } from 'framer-motion';
import { Trophy, Users, Building } from 'lucide-react';
import { Counter } from '../ui/Counter';
import { useLanguage } from '../../context/LanguageContext';
import { UI } from '../../data/translations';
import { useFloatingStats } from '../../hooks/useFloatingStats';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const StatsSection = () => {
  const { lang } = useLanguage();
  const { stats, loading } = useFloatingStats();

  const dynamicStats = [
    { id: 1, value: stats ? stats.years : '-', icon: <Trophy size={40} /> },
    { id: 2, value: stats ? stats.investors : '-', icon: <Users size={40} /> },
    { id: 3, value: stats ? stats.project : '-', icon: <Building size={40} /> }
  ];

  return (
    /* Changed gradient endpoints to modern premium corporate blue theme configurations */
    <section className="py-16 relative overflow-visible bg-white"
      style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e) 0%, #0d1342 100%)' }}>

      {/* Soft secondary ambient radial light flare */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0288D1 0%, transparent 70%)' }} />

      <div className="gs-container max-w-7xl mx-auto px-4 relative z-10 overflow-visible">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {dynamicStats.map((stat, idx) => (
            <motion.div key={stat.id} variants={itemVariants} className="text-center select-none">
              {/* Icons glowing accent color */}
              <div className="flex justify-center mb-4 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]">
                {stat.icon}
              </div>

              {/* Large high-contrast metric values */}
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 tracking-tight flex justify-center">
                {loading ? (
                  <div className="h-10 w-20 bg-white/20 rounded animate-pulse"></div>
                ) : stat.value === '-' ? (
                  '-'
                ) : (
                  <Counter value={stat.value} />
                )}
              </div>

              {/* Refined subtle description labels */}
              <p className="text-blue-100/80 mt-2.5 font-semibold tracking-wider text-xs uppercase">
                {lang === 'EN' ? UI.stats[idx]?.en : UI.stats[idx]?.bn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
