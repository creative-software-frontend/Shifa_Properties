import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { UI, pick } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { img4, img5, img6 } from '../data/landingData';
import PageHero from '../components/PageHero';
import PageTransition from '../components/PageTransition';
import { useWhyUs } from '../hooks/useWhyUs';
import { useOurProcessList } from '../hooks/useOurProcessList';
import { useOurValues } from '../hooks/useOurValues';

// Integrated Lucide React Icons instead of React Icons
import { TrendingUp, Layers, Target } from 'lucide-react';

import expertise2Img from '../assets/image/expertise2.png';
import empowerImg from '../assets/image/empower.png';

// Direct animate values for infinite float (variant-based animate does not loop reliably)
const floatTransition = { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const PROCESS_ICONS = [TrendingUp, Layers, Target];

const WhyUsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = UI.whyUs;
  const { whyUsItems } = useWhyUs();
  const { processItems, loading: processLoading, error: processError, refetch: refetchProcess } = useOurProcessList();
  const { values, loading: valuesLoading, error: valuesError, refetch: refetchValues } = useOurValues();
  const whyUsData = whyUsItems[0];

  const fallbackProcess = [
    { text: t.detailing.box1, img: img4, icon: TrendingUp },
    { text: t.detailing.box2, img: img5, icon: Layers },
    { text: t.detailing.box3, img: img6, icon: Target },
  ];

  return (
    <PageTransition id="why-us-page">
      <div className="bg-[var(--color-light)] pt-24 text-[var(--color-dark)] antialiased">

        {/* SECTION 1: HERO BANNER */}
        <PageHero
          title={whyUsData ? whyUsData.title : pick(t.heroTitle, lang)}
          subtitle={whyUsData ? whyUsData.description : "Discover why we are the best choice for your investment"}
          imageSrc={whyUsData ? whyUsData.image : img4}
        />

        {/* SECTION 2: EMPOWER SOLUTIONS */}
        <section className="gs-section bg-white border-b border-[var(--color-border)]">
          <div className="gs-container flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="flex-1 max-w-xl"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            >
              <h2 className="text-[var(--color-primary)] text-3xl md:text-4xl font-bold leading-tight mb-6 font-serif">
                {pick(t.empower.title, lang)}
              </h2>
              <p className="text-[var(--color-gray)] text-base md:text-lg leading-relaxed">
                {pick(t.empower.desc, lang)}
              </p>
            </motion.div>
            <div className="flex-1 flex justify-center w-full">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={floatTransition}
                className="w-full max-w-[500px] aspect-video rounded-2xl shadow-card-lg overflow-hidden border-4 border-white"
              >
                <img src={empowerImg} alt="Solutions Graphic" className="w-full h-full object-cover brightness-[1.06]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3 & 4: AREA OF EXPERTISE */}
        <section className="gs-section relative overflow-hidden bg-white">
          <div className="gs-container text-center flex flex-col items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="section-label">{pick(t.expertise.label, lang)}</span>
              <h2 className="section-title text-4xl mb-12">
                {pick(t.expertise.title, lang)}
              </h2>
            </motion.div>

            <motion.div
              className="mt-8 relative w-full max-w-5xl h-auto flex justify-center px-4"
              animate={{ y: [0, -14, 0] }}
              transition={{ ...floatTransition, delay: 1 }}
            >
              <img
                src={expertise2Img}
                alt="Modern Next-Gen Solutions Blueprint Map Layout"
                className="w-full h-auto min-h-[380px] md:min-h-[560px] object-contain brightness-[1.05] drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-300 transform scale-105"
              />
            </motion.div>
          </div>
        </section>
        {/* SECTION 5: TEAM PROFESSIONALS (disabled)
        <section
          className="gs-section relative text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A237E, #0288D1)' }}
        >
          ...
        </section>
        */}

        {/* SECTION 6: PROJECT DETAILING */}
        <section className="gs-section bg-white text-center">
          <div className="gs-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="section-label">Our Process</span>
              <h2 className="section-title text-4xl mb-12">
                {pick(t.detailing.title, lang)}
              </h2>
            </motion.div>

            {processError && (
              <div className="mb-8 text-center py-4 px-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm">
                <p>{processError}</p>
                <button
                  type="button"
                  onClick={() => refetchProcess()}
                  className="mt-2 text-xs font-bold uppercase tracking-wider underline"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {processLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="min-h-[320px] rounded-xl bg-neutral-200 animate-pulse"
                  />
                ))
              ) : processItems.length > 0 ? (
                processItems.map((item, idx) => {
                  const Icon = PROCESS_ICONS[idx % PROCESS_ICONS.length];
                  return (
                    <motion.div
                      key={item.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInUp}
                      className="gs-card group overflow-hidden relative min-h-[320px] flex flex-col justify-end rounded-xl shadow-md"
                    >
                      <div className="absolute inset-0 img-overlay z-0">
                        <img
                          src={item.imageUrl || undefined}
                          alt={item.title}
                          className="w-full h-full object-cover brightness-[1.08] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-[var(--color-primary)]/25 to-transparent" />
                      </div>
                      <div className="relative z-10 p-8 text-left">
                        <div className="w-12 h-12 bg-[var(--color-secondary)] text-white flex items-center justify-center rounded-full text-xl mb-4 shadow-gold transform group-hover:-translate-y-2 transition-transform duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-white text-xl font-bold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                          {item.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                fallbackProcess.map((box, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="gs-card group overflow-hidden relative min-h-[320px] flex flex-col justify-end rounded-xl shadow-md"
                  >
                    <div className="absolute inset-0 img-overlay z-0">
                      <img src={box.img} alt="Process Phase Context" className="w-full h-full object-cover brightness-[1.08] transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-[var(--color-primary)]/25 to-transparent" />
                    </div>
                    <div className="relative z-10 p-8 text-left">
                      <div className="w-12 h-12 bg-[var(--color-secondary)] text-white flex items-center justify-center rounded-full text-xl mb-4 shadow-gold transform group-hover:-translate-y-2 transition-transform duration-300">
                        <box.icon className="w-5 h-5" />
                      </div>
                      <p className="text-white text-xl font-bold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                        {pick(box.text, lang)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SECTION 7: OUR VALUES */}
        <section className="gs-section bg-[var(--color-light)]">
          <div className="gs-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
              <span className="section-label">Core Principles</span>
              <h2 className="section-title text-4xl mb-14 text-gradient-navy inline-block">
                {pick(t.values.title, lang)}
              </h2>
            </motion.div>

            {valuesError && (
              <div className="mb-8 text-center py-4 px-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm">
                <p>{valuesError}</p>
                <button
                  type="button"
                  onClick={() => refetchValues()}
                  className="mt-2 text-xs font-bold uppercase tracking-wider underline"
                >
                  Try again
                </button>
              </div>
            )}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {valuesLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="gs-card p-6 bg-white rounded-xl shadow-sm min-h-[140px] animate-pulse bg-neutral-200" />
                ))
              ) : values.length > 0 ? (
                values.map((value, idx) => (
                  <motion.div
                    key={value.id}
                    variants={fadeInUp}
                    className={`gs-card p-6 bg-white rounded-xl shadow-sm border-t-4 transition-colors ${
                      idx === 0
                        ? 'border-[var(--color-secondary)] hover:border-[var(--color-primary)]'
                        : 'border-[var(--color-primary)] hover:border-[var(--color-secondary)]'
                    }`}
                  >
                    <h4 className={`text-lg font-bold mb-3 ${idx === 0 ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>
                      {value.title}
                    </h4>
                    <p className="text-[var(--color-gray)] text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))
              ) : (
                t.values.items.map((value, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="gs-card p-6 bg-white rounded-xl shadow-sm border-t-4 border-[var(--color-primary)] hover:border-[var(--color-secondary)] transition-colors">
                    <h4 className={`text-lg font-bold mb-3 ${('isHighlighted' in value && value.isHighlighted) ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>
                      {pick(value.title, lang)}
                    </h4>
                    <p className="text-[var(--color-gray)] text-sm leading-relaxed">
                      {pick(value.desc, lang)}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default WhyUsPage;