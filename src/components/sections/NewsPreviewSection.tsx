import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import { useNews } from '../../hooks/useNews';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const NewsPreviewSection: React.FC = () => {
  const { lang } = useLanguage();
  const n = UI.news;
  const { news, loading } = useNews();
  const preview = news.slice(0, 3);

  if (loading) {
    return (
      <section id="news-preview" className="gs-section pt-6 pb-12 bg-white">
        <div className="gs-container max-w-7xl mx-auto px-4">
          <div className="text-center py-10 text-gray-500">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="news-preview" className="gs-section pt-6 pb-12 bg-white">
      <div className="gs-container max-w-7xl mx-auto px-4">

        {/* ── HEADER AREA (Removed divider and updated typography to dark black) ── */}
        <motion.div
          className="text-center mb-14"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
            style={{ color: 'var(--color-primary, #C9A84C)' }}
          >
            {pick(n.label, lang)}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
          >
            {pick(n.title, lang)}
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">{pick(n.subtitle, lang)}</p>
        </motion.div>

        {/* ── CARD GRID ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          {preview.map((article) => (
            <motion.div
              key={article.id} variants={fadeInUp}
              whileHover={{ boxShadow: 'var(--shadow-card-lg)', y: -6 }}
            >
            <Link
              to={`/news/${article.id}`}
              id={`news-preview-${article.id}`}
              className="bg-white rounded-3xl overflow-hidden block select-none hover:no-underline transition-all duration-300 group"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                 src={article.photo} alt={article.title} className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A]">
                  {article.news_type?.title || 'News'}
                  </span>
                </div>
              </div>

              {/* Information Content Block (Updated to high-contrast corporate typography) */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-400 font-medium">
                  <span>📰 {article.news_paper_name}

                  </span>
                  <span>·</span>
                  <span>📅{new Date(article.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <h3
                  className="font-bold text-base mb-3 leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-amber-600"
                  style={{ color: 'var(--color-dark, #000000)', fontFamily: "'Playfair Display', serif" }}
                >
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">{article.description}</p>

                <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#C9A84C] group-hover:translate-x-1.5 transition-transform duration-300">
                  {pick(n.readMore, lang)} <span className="text-sm">→</span>
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── FOOTER LINK VIEW ALL BUTTON ── */}
        <div className="text-center mt-14">
          <Link
            to="/news"
            id="news-preview-view-all"
            className="inline-flex items-center gap-2 text-white font-semibold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider 
                       transition-all duration-300 text-center shadow-md hover:brightness-110 active:scale-[0.98] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
          >
            {pick(n.viewAll, lang)}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPreviewSection;