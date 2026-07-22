import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import { useNews } from '../hooks/useNews';

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const { news, loading } = useNews();

  const article = news.find((a) => String(a.id) === id);
  const related = news.filter((a) => String(a.id) !== id).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!article) {
    return (
      <PageTransition id="news-details-page">
        <main className="min-h-screen pt-32 pb-20 bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-6">
              {lang === 'EN' ? 'Article not found.' : 'নিবন্ধটি পাওয়া যায়নি।'}
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-white font-semibold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'EN' ? 'Back to News' : 'সংবাদে ফিরে যান'}
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition id="news-details-page">
      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="gs-container max-w-4xl mx-auto px-4">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#C9A84C] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'EN' ? 'Back to News' : 'সংবাদে ফিরে যান'}
          </Link>

          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A]">
              {article.news_type?.title || 'News'}
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500 font-medium pb-8 border-b border-gray-100">
            <span className="inline-flex items-center gap-1.5">
              <Newspaper className="w-4 h-4" />
              {article.news_paper_name}
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg">
            <img
              src={article.photo}
              alt={article.title}
              className="w-full h-64 md:h-[420px] object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {article.description}
            </p>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h2
                className="text-xl md:text-2xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
              >
                {lang === 'EN' ? 'More News' : 'আরও সংবাদ'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="block rounded-2xl overflow-hidden bg-white group"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
};

export default NewsDetailsPage;
