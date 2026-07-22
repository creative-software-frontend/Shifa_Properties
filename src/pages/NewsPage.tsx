import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';

// Categories are built from loaded news, but computed safely at render time.
// (Avoids referencing `news` before it's declared.)

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { lang } = useLanguage();
  const { news, loading } = useNews();

  const categories = [
    'All',
    ...Array.from(
      new Set(
        (news || [])
          .map((a) => a?.news_type?.title || '')
          .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      )
    ),
  ];


  const filtered =
    activeCategory === 'All'
      ? news
      : news.filter((a) => a.news_type?.title === activeCategory);



  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
  return (
    <PageTransition id="news-page">
      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="gs-container max-w-7xl mx-auto px-4">

          {/* ── HEADER AREA (Removed gold divider & updated typography to dark black) ── */}
          <div className="text-center mb-14">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
              style={{ color: 'var(--color-primary, #C9A84C)' }}
            >
              {pick(UI.pageHero.news.label, lang)}
            </span>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
            >
              {pick(UI.pageHero.news.title, lang)}
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed mt-4">
              {pick(UI.pageHero.news.subtitle, lang)}
            </p>
          </div>

          {/* ── CATEGORY FILTER TABS ── */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {(categories || []).map((cat) => {
              const safeCat = typeof cat === 'string' ? cat : '';
              const filterId = safeCat.toLowerCase().replace(/\s+/g, '-');
              
              return (
              <button
                key={safeCat || 'All'}
                id={`news-filter-${filterId}`}
                onClick={() => setActiveCategory(safeCat || 'All')}

                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 select-none
                ${activeCategory === safeCat
                    ? 'text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={activeCategory === safeCat ? { background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' } : {}}
              >
                {safeCat === 'All' ? (lang === 'EN' ? 'All' : 'সব') : safeCat}
              </button>
            )})}
          </div>

          {/* ── FEATURED HERO ARTICLE LAYER (First item when view state is set to 'All') ── */}
          {activeCategory === 'All' && filtered.length > 0 && (
            <Link
              to={`/news/${filtered[0].id}`}
              id="news-featured-article"
              className="bg-white rounded-3xl overflow-hidden mb-12 block select-none hover:no-underline transition-all duration-300 group animate-fade-up"
              style={{ boxShadow: 'var(--shadow-card-lg)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-72 lg:h-auto overflow-hidden bg-gray-50">
                  <img
                    src={filtered[0].photo}
                    alt={filtered[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-blue-900 to-sky-600">
                      ✦ {lang === 'EN' ? 'Featured' : 'আলোচিত'}
                    </span>
                  </div>
                </div>

                {/* Info Text Block Side Panel */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A]">
                     {filtered[0].news_type?.title || 'News'}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">📅 {new Date(filtered[0].created_at).toLocaleDateString('en-GB')}</span>
                  </div>
                  <h2
                    className="font-bold text-2xl md:text-3xl mb-4 leading-tight transition-colors duration-200 group-hover:text-amber-600"
                    style={{ color: 'var(--color-dark, #000000)', fontFamily: "'Playfair Display', serif" }}
                  >
                    {filtered[0].title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-4">
                    {filtered[0].description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-6 font-medium">
                    <span>📰 Source: {filtered[0].news_paper_name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#C9A84C] group-hover:translate-x-1.5 transition-transform duration-300">
                    {lang === 'EN' ? 'Read Full Article →' : 'সম্পূর্ণ নিবন্ধটি পড়ুন →'}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ── STANDARD ARTICLES ARCHIVE GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((article, idx) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                id={`news-article-${article.id}`}
                className="bg-white rounded-3xl overflow-hidden block select-none hover:no-underline transition-all duration-300 group animate-fade-up"
                style={{ animationDelay: `${idx * 0.08}s`, boxShadow: 'var(--shadow-card)' }}
              >
                {/* Media Layer Cover */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.photo  }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A]">
                     {article.news_type?.title || 'News'}
                    </span>
                  </div>
                </div>

                {/* Content Block Area */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-400 font-medium">
                    <span>📰 {article.news_paper_name}</span>
                    <span>·</span>
                    <span>📅{new Date(article.created_at).toLocaleDateString('en-GB')}</span>
                  </div>
                  <h3
                    className="font-bold text-base mb-3 leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-amber-600"
                    style={{ color: 'var(--color-dark, #000000)', fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                   {article.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#C9A84C] group-hover:translate-x-1.5 transition-transform duration-300">
                    {pick(UI.news.readMore, lang)} <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── EMPTY DATA STATE DISPLAY ── */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm font-medium">
                {lang === 'BN' ? 'এই বিভাগে কোনো নিবন্ধ পাওয়া যায়নি।' : 'No articles found in this category.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
};

export default NewsPage;