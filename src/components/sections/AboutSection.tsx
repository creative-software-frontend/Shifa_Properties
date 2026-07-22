import { motion, type Variants } from 'framer-motion';
import logoImg from '../../assets/image/logo.jpeg';
import img2 from '../../assets/image/6fa3ef6e-c22d-45b6-a859-b2108f8af13c.jfif';
import { Counter } from '../ui/Counter';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import { useSisterConcerns } from '../../hooks/useSisterConcerns';
import { useFloatingStats } from '../../hooks/useFloatingStats';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};
const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const AboutSection: React.FC = () => {
  const { lang } = useLanguage();
  const a = UI.about;
  const { sisterConcerns } = useSisterConcerns();
  const { stats, loading: statsLoading } = useFloatingStats();

  // Use backend data when available; otherwise fall back to the static set.
  // Both branches normalize to plain strings so the cards render consistently.
  const concerns = sisterConcerns.length
    ? sisterConcerns.map((c) => ({ name: c.title, sub: c.description }))
    : a.sisterConcerns.map((c) => ({ name: pick(c.name, lang), sub: pick(c.sub, lang) }));

  return (
    /* Changed overflow-hidden to visible to let the metric card float freely outside the block boundaries */
    <section id="about" className="overflow-visible bg-white">

      {/* ── 1. WHO WE ARE SECTION ── */}
      <div className="gs-section py-12 overflow-visible">
        <div className="gs-container max-w-7xl mx-auto px-4 overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content Area */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
                style={{ color: 'var(--color-primary)' }}
              >
                {pick(a.label, lang)}
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark)' }}
              >
                {pick(a.title, lang)}
              </h2>

              <p className="text-gray-500 text-sm mt-5 mb-5 leading-relaxed">{pick(a.p1, lang)}</p>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">{pick(a.p2, lang)}</p>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-8">
                {a.bullets.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                      style={{ background: 'linear-gradient(135deg, #C9A84C, #fde68a)' }}
                    >
                      ✓
                    </span>
                    {pick(item, lang)}
                  </li>
                ))}
              </ul>

              {/* View Projects Link Button Layout - Changed to Blue Theme */}
              <a
                href="/projects"
                id="about-see-projects-btn"
                className="inline-block text-white font-semibold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider 
                           transition-all duration-300 text-center shadow-md hover:brightness-110 active:scale-[0.98] hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
              >
                {pick(a.seeProjects, lang)}
              </a>
            </motion.div>

            {/* Right Media Display Area */}
            <motion.div
              className="relative mt-4 lg:mt-0 lg:pl-6 overflow-visible"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Image with gentle float */}
              <motion.div
                className="rounded-3xl overflow-hidden img-overlay shadow-card-lg h-80 md:h-[480px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7 }}
                  src={img2}
                  alt="Shifa Properties Ltd luxury Hotel pool and facade"
                  className="w-full h-full object-cover origin-center brightness-[1.06]"
                />
              </motion.div>

              {/* Floating Brand & Performance Metric Card */}
              <motion.div
                className="absolute -bottom-12 -left-4 md:-bottom-8 md:-left-10 glass-card p-5 shadow-card z-30 w-[calc(100%-16px)] sm:w-auto min-w-[290px]"
                style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card-lg)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Shifa Properties Ltd Group Logo"
                    className="w-14 h-14 rounded-full object-contain bg-white border border-neutral-100"
                    style={{ padding: '2px' }}
                  />
                  <div>
                    <p
                      className="font-bold text-sm leading-tight text-black"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Shifa Properties Ltd
                    </p>
                    <p
                      className="text-[10px] tracking-widest uppercase font-semibold mt-0.5"
                      style={{ color: '#C9A84C' }}
                    >
                      GROUP
                    </p>
                  </div>
                </div>

                {/* Counter Metric Section */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex gap-6 justify-between">
                  {statsLoading ? (
                    <>
                      <div className="text-left animate-pulse">
                        <div className="h-6 w-12 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded mt-1.5"></div>
                      </div>
                      <div className="text-left animate-pulse">
                        <div className="h-6 w-12 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded mt-1.5"></div>
                      </div>
                      <div className="text-left animate-pulse">
                        <div className="h-6 w-12 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded mt-1.5"></div>
                      </div>
                    </>
                  ) : stats ? (
                    <>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900"><Counter value={stats.years} /></div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.years, lang)}</p>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900"><Counter value={stats.investors} /></div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.investors, lang)}</p>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900"><Counter value={stats.project} /></div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.projects, lang)}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900">-</div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.years, lang)}</p>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900">-</div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.investors, lang)}</p>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base text-neutral-900">-</div>
                        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-0.5">{pick(a.projects, lang)}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── 2. SISTER CONCERN SECTION (Clean Premium Background Gradient) ── */}
      <div
        className="gs-section py-12"
        style={{ background: 'linear-gradient(180deg, rgba(240, 244, 255, 0.4) 0%, rgba(255, 255, 255, 1) 100%)' }}
      >
        <div className="gs-container max-w-7xl mx-auto px-4">

          {/* Header Area */}
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
              style={{ color: 'var(--color-primary)' }}
            >
              {pick(a.familyLabel, lang)}
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark)' }}
            >
              {pick(a.familyTitle, lang)}
            </h2>
          </motion.div>

          {/* Grid Layout Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {concerns.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 group select-none"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-card)',
                }}
                whileHover={{ boxShadow: 'var(--shadow-card-lg)' }}
              >
                {/* Numeric Indicator Ball */}
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
                >
                  {i + 1}
                </div>
                <h3
                  className="font-semibold text-sm mb-2 leading-snug transition-colors duration-200 group-hover:text-amber-600"
                  style={{ color: 'var(--color-dark, #1a237e)' }}
                >
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default AboutSection;