'use client';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTestimonials } from '../../hooks/useTestimonials';
import testimonialsBg from '../../assets/image/3.jfif';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const { lang } = useLanguage();
  const { testimonials, loading } = useTestimonials();
  if (loading || testimonials.length === 0) {
    return null;
  }
  const tm = UI.testimonials;


  return (
    <section id="testimonials" className="gs-section" style={{ background: 'linear-gradient(180deg,#f8f9ff 0%,#e8eaf6 100%)' }}>
      <div className="gs-container ">
        <motion.div className="text-center mb-14" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label text-slate-800">{pick(tm.label, lang)}</span>
          <h2 className="section-title rgba(0,0,0,0.05)">{pick(tm.title, lang)}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              onClick={() => setActive(idx)}
              variants={fadeInUp}
              className={`gs-card p-6 cursor-pointer transition-all duration-300 ${active === idx ? 'ring-2 ring-[#C9A84C] scale-[1.02]' : ''}`}
            >
              {(t as { badge?: string }).badge && (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-4 tracking-wider uppercase"
                  style={{ background: 'linear-gradient(135deg,#C9A84C,#fde68a)', color: '#0D0D1A' }}>
                  ✦ {(t as { badge?: string }).badge}
                </span>
              )}


              <div className="flex items-center gap-3 mb-4">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  t.model
                )}&background=1a237e&color=fff&size=80`}
                  alt={t.model} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#C9A84C]" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.model}</h4>
                  <p className="text-xs text-slate-500">{t.name}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(Number(t.rating))].map((_, i) => (
                  <span key={`${t.id}-star-${i}`} className="text-yellow-400 text-base">★</span>
                ))}
              </div>
              <blockquote className="text-gray-500 text-sm leading-relaxed italic">"{t.message}"</blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Subscribe Strip */}
        <motion.div
          className="relative rounded-3xl overflow-hidden h-56 md:h-72 img-overlay shadow-card-lg"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}
            src={testimonialsBg} alt="Investment project view" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e]/15 to-[#0288D1]/55" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#1a237e]/90 to-[#0288D1]/85">
            <div>
              <p className="text-white font-bold text-lg font-serif">{pick(tm.subscribe, lang)}</p>
              <p className="text-white/70 text-xs">{pick(tm.subscribeSubtitle, lang)}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder={pick(tm.placeholder, lang)}
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-full text-sm bg-white/10 border border-white/30 text-white placeholder-white/50 outline-none focus:border-[#C9A84C]" />
              <button className="btn-gold text-sm font-bold px-5 py-2.5 whitespace-nowrap">{pick(tm.subscribeBtnLabel, lang)}</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
