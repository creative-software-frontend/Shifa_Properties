import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import brochurePdf from '../assets/image/brochure.pdf';
import logoImg from '../assets/image/logo.jpeg';
import { useLanguage } from '../context/LanguageContext';
import { useFloatingStats } from '../hooks/useFloatingStats';

const content = {
  EN: {
    badge: 'Official Document',
    title: 'Download Our Brochure',
    subtitle: 'Get the complete overview of Shifa Properties Ltd Group — our projects, investment opportunities, and vision for a better Bangladesh.',
    features: [
      { icon: '🏨', label: 'All Projects' },
      { icon: '📈', label: 'Investment Plans' },
      { icon: '🌍', label: 'Our Vision' },
      { icon: '📋', label: 'Full Company Profile' },
    ],
    dlBtn: '⬇  Download Brochure (PDF)',
    dlNote: 'PDF · ~14 MB · Free',
    backBtn: '← Back to Home',
    autoLabel: 'Your download will begin automatically…',
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '5000+', label: 'Happy Investors' },
      { value: '15+', label: 'Active Projects' },
    ],
  },
  BN: {
    badge: 'অফিসিয়াল ডকুমেন্ট',
    title: 'আমাদের ব্রশিউর ডাউনলোড করুন',
    subtitle: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সম্পূর্ণ তথ্য পান — আমাদের প্রকল্প, বিনিয়োগের সুযোগ এবং একটি সুন্দর বাংলাদেশের স্বপ্ন।',
    features: [
      { icon: '🏨', label: 'সকল প্রকল্প' },
      { icon: '📈', label: 'বিনিয়োগ পরিকল্পনা' },
      { icon: '🌍', label: 'আমাদের লক্ষ্য' },
      { icon: '📋', label: 'সম্পূর্ণ কোম্পানি প্রোফাইল' },
    ],
    dlBtn: '⬇  ব্রশিউর ডাউনলোড করুন (PDF)',
    dlNote: 'PDF · ~১৪ MB · বিনামূল্যে',
    backBtn: '← হোমে ফিরে যান',
    autoLabel: 'আপনার ডাউনলোড স্বয়ংক্রিয়ভাবে শুরু হবে…',
    stats: [
      { value: '১০+', label: 'বছরের অভিজ্ঞতা' },
      { value: '৫০০০+', label: 'সন্তুষ্ট বিনিয়োগকারী' },
      { value: '১৫+', label: 'সক্রিয় প্রকল্প' },
    ],
  },
};

const DownloadBrochure: React.FC = () => {
  const { lang } = useLanguage();
  const c = content[lang];
  const [downloaded, setDownloaded] = useState(false);
  const { stats, loading } = useFloatingStats();

  const dynamicStats = [
    { label: c.stats[0].label, value: stats ? stats.years : '-' },
    { label: c.stats[1].label, value: stats ? stats.investors : '-' },
    { label: c.stats[2].label, value: stats ? stats.project : '-' },
  ];

  // Auto-trigger download on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = brochurePdf;
      link.download = 'Shifa-Properties-Group-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleManualDownload = () => {
    const link = document.createElement('a');
    link.href = brochurePdf;
    link.download = 'Shifa-Properties-Group-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

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

              {/* Features grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {c.features.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-2xl">{f.icon}</span>
                    <span className="text-white/75 text-xs font-medium leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-5 rounded-2xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                {dynamicStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black flex justify-center" style={{ color: '#C9A84C' }}>
                      {loading ? (
                        <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Auto-download notice */}
              <div className="flex items-center gap-2 mb-5 text-center justify-center">
                <span className={`w-2 h-2 rounded-full ${downloaded ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                <span className="text-white/50 text-xs">
                  {downloaded ? (lang === 'EN' ? '✓ Download started!' : '✓ ডাউনলোড শুরু হয়েছে!') : c.autoLabel}
                </span>
              </div>

              {/* Download button */}
              <motion.button
                onClick={handleManualDownload}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-black text-sm tracking-wider uppercase text-black mb-3 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #fcd34d 50%, #C9A84C 100%)',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.45)',
                }}
              >
                {c.dlBtn}
              </motion.button>

              <p className="text-white/35 text-xs text-center mb-6">{c.dlNote}</p>

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
