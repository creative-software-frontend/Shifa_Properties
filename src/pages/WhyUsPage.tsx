import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { UI, pick } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { img4, img5, img6 } from '../data/landingData';
import PageHero from '../components/PageHero';
import PageTransition from '../components/PageTransition';
import { useWhyUs } from '../hooks/useWhyUs';

// Integrated Lucide React Icons instead of React Icons
import { CheckCircle, TrendingUp, Layers, Target } from 'lucide-react';

import designerImg from '../assets/image/designer.png';
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

const WhyUsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = UI.whyUs;
  const { whyUsItems } = useWhyUs();
  const whyUsData = whyUsItems[0];

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
                <img src={empowerImg} alt="Solutions Graphic" className="w-full h-full object-cover" />
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
                className="w-full h-auto min-h-[380px] md:min-h-[560px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-300 transform scale-105"
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: TEAM PROFESSIONALS */}
        <section
          className="gs-section relative text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A237E, #0288D1)' }}
        >
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img
              src={expertise2Img}
              alt="High-contrast corporate space digital backdrop context"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-0 left-0 w-1/3 h-full bg-white/5 skew-x-12 -ml-20" />

          <div className="gs-container flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="flex-1 flex justify-center w-full relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ ...floatTransition, delay: 0.5 }}
                className="relative z-10 w-full max-w-[500px]"
              >
                <img
                  src={designerImg}
                  alt="UI/UX Designer and Team"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-blue-900/40 blur-3xl rounded-full transform scale-75 z-0" />
            </div>

            <motion.div
              className="flex-1"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-serif leading-snug mb-8 text-blue-50">
                {pick(t.team.desc, lang)}
              </motion.p>
              <motion.ul variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base">
                {t.team.list.map((item, index) => (
                  <motion.li key={index} variants={fadeInUp} className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                    <CheckCircle className="text-xl flex-shrink-0 text-amber-400 w-5 h-5" />
                    <span>{pick(item, lang)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: PROJECT DETAILING */}
        <section className="gs-section bg-white text-center">
          <div className="gs-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="section-label">Our Process</span>
              <h2 className="section-title text-4xl mb-12">
                {pick(t.detailing.title, lang)}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { text: t.detailing.box1, img: img4, icon: <TrendingUp className="w-5 h-5" /> },
                { text: t.detailing.box2, img: img5, icon: <Layers className="w-5 h-5" /> },
                { text: t.detailing.box3, img: img6, icon: <Target className="w-5 h-5" /> }
              ].map((box, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="gs-card group overflow-hidden relative min-h-[320px] flex flex-col justify-end rounded-xl shadow-md"
                >
                  <div className="absolute inset-0 img-overlay z-0">
                    <img src={box.img} alt="Process Phase Context" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/60 to-transparent" />
                  </div>
                  <div className="relative z-10 p-8 text-left">
                    <div className="w-12 h-12 bg-[var(--color-secondary)] text-white flex items-center justify-center rounded-full text-xl mb-4 shadow-gold transform group-hover:-translate-y-2 transition-transform duration-300">
                      {box.icon}
                    </div>
                    <p className="text-white text-xl font-bold leading-snug drop-shadow-md">
                      {pick(box.text, lang)}
                    </p>
                  </div>
                </motion.div>
              ))}
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

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {t.values.items.map((value, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="gs-card p-6 bg-white rounded-xl shadow-sm border-t-4 border-[var(--color-primary)] hover:border-[var(--color-secondary)] transition-colors">
                  <h4 className={`text-lg font-bold mb-3 ${('isHighlighted' in value && value.isHighlighted) ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`}>
                    {pick(value.title, lang)}
                  </h4>
                  <p className="text-[var(--color-gray)] text-sm leading-relaxed">
                    {pick(value.desc, lang)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default WhyUsPage;