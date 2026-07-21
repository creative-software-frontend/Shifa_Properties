import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../assets/image/logo.jpeg';
import { useLanguage } from '../context/LanguageContext';
import { useFloatingStats } from '../hooks/useFloatingStats';
import { useBrochures } from '../hooks/useBrochures';

const content = {
  EN: {
    badge: 'Official Document',
    title: 'Download Our Brochure',
    subtitle: 'Get the complete overview of Shifa Properties Ltd Group — our projects, investment opportunities, and vision for a better Bangladesh.',
    backBtn: '← Back to Home',
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '5000+', label: 'Happy Investors' },
      { value: '15+', label: 'Active Projects' },
    ],
    loading: 'Loading brochures...',
    empty: 'No brochures available.',
    download: 'Download',
  },
  BN: {
    badge: 'অফিসিয়াল ডকুমেন্ট',
    title: 'আমাদের ব্রশিউর ডাউনলোড করুন',
    subtitle: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সম্পূর্ণ তথ্য পান — আমাদের প্রকল্প, বিনিয়োগের সুযোগ এবং একটি সুন্দর বাংলাদেশের স্বপ্ন।',
    backBtn: '← হোমে ফিরে যান',
    stats: [
      { value: '১০+', label: 'বছরের অভিজ্ঞতা' },
      { value: '৫০০০+', label: 'সন্তুষ্ট বিনিয়োগকারী' },
      { value: '১৫+', label: 'সক্রিয় প্রকল্প' },
    ],
    loading: 'ব্রশিউর লোড হচ্ছে...',
    empty: 'কোন ব্রশিউর উপলব্ধ নেই।',
    download: 'ডাউনলোড',
  },
};

const DownloadBrochure: React.FC = () => {
  const { lang } = useLanguage();
  const c = content[lang];
  const { stats, loading: statsLoading } = useFloatingStats();
  const { brochures, loading: brochuresLoading, error } = useBrochures();

  const dynamicStats = [
    { label: c.stats[0].label, value: stats ? stats.years : '-' },
    { label: c.stats[1].label, value: stats ? stats.investors : '-' },
    { label: c.stats[2].label, value: stats ? stats.project : '-' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1a237e 50%, #0D0D1A 100%)' }}>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-3xl">

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            {/* Gold top bar */}
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #1a237e, #C9A84C, #1a237e)' }} />

            <div className="p-8 sm:p-12">
              {/* Logo + Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <img src={logoImg} alt="Logo" className="w-16 h-16 rounded-full object-contain bg-white border-2 border-yellow-400/50 shadow-lg" style={{ padding: '4px' }} />
                <div className="text-center sm:text-left">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-1" style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {c.title}
                  </h1>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-white/65 text-sm leading-relaxed mb-8 text-center sm:text-left">
                {c.subtitle}
              </p>

              {/* Dynamic Brochures Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {brochuresLoading ? (
                  <div className="col-span-full flex justify-center py-4 text-white/60 text-sm">
                    {c.loading}
                  </div>
                ) : error ? (
                  <div className="col-span-full flex justify-center py-4 text-red-400 text-sm">
                    {error}
                  </div>
                ) : brochures.length === 0 ? (
                  <div className="col-span-full flex justify-center py-4 text-white/60 text-sm">
                    {c.empty}
                  </div>
                ) : (
                  brochures.map((b, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <span className="text-3xl">📄</span>
                      <span className="text-white/90 text-xs font-medium leading-tight flex-1 flex items-center justify-center">
                        {b.project_name}
                      </span>
                      <a
                        href={b.full_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto px-4 py-2 w-full rounded-xl font-bold text-[10px] uppercase text-black transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #C9A84C 0%, #fcd34d 50%, #C9A84C 100%)',
                          boxShadow: '0 4px 15px rgba(201,168,76,0.25)',
                        }}
                      >
                        {c.download}
                      </a>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-5 rounded-2xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                {dynamicStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black flex justify-center" style={{ color: '#C9A84C' }}>
                      {statsLoading ? (
                        <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Back link */}
              <div className="text-center">
                <Link
                  to="/"
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200 underline underline-offset-4"
                >
                  {c.backBtn}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DownloadBrochure;
