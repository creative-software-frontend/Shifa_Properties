import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBanners } from '../../hooks/useBanners';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { lang } = useLanguage();
  const { banners } = useBanners();
  useEffect(() => {
  if (!banners.length) return;

  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'image';
  preload.href = banners[0].image;

  document.head.appendChild(preload);

  return () => {
    document.head.removeChild(preload);
  };
}, [banners]);


  const safeIndex =
  banners.length > 0
    ? current % banners.length
    : 0;

const slideData = banners[safeIndex] ?? {
  image: '',
  title: '',
  description: '',
  ctaLink: '',
  id: 0,
  cta: {},
};






  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 400);
  };

  const next = () => {
  if (banners.length === 0) return;
  goTo((current + 1) % banners.length);
};

const prev = () => {
  if (banners.length === 0) return;
  goTo((current - 1 + banners.length) % banners.length);
};

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, banners.length]);

  const slide = UI.heroSlides[current] || UI.heroSlides[0];
  const ctaHref = slideData.ctaLink?.trim() || '/projects';
  const ctaLabel = pick(slide.cta, lang);
  const ctaClassName =
    'btn-gold font-semibold text-sm px-8 py-3.5 uppercase tracking-wider transition-transform duration-200 hover:scale-105';
  const ctaStyle = { boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)' };

  const renderExploreCta = () => {
    if (ctaHref.startsWith('#')) {
      return (
        <a
          href={ctaHref}
          id={`hero-cta-${slideData.id}`}
          className={ctaClassName}
          style={ctaStyle}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {ctaLabel}
        </a>
      );
    }

    if (ctaHref.startsWith('http://') || ctaHref.startsWith('https://')) {
      return (
        <a
          href={ctaHref}
          id={`hero-cta-${slideData.id}`}
          className={ctaClassName}
          style={ctaStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
      );
    }

    return (
      <Link
        to={ctaHref}
        id={`hero-cta-${slideData.id}`}
        className={ctaClassName}
        style={ctaStyle}
      >
        {ctaLabel}
      </Link>
    );
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* ── Background image ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${safeIndex}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ zIndex: 1 }}
        >
          <img
            src={slideData.image || undefined}
            alt={slideData.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Content Container ── */}
      <div className="absolute top-[32%] md:top-[28%] left-0 right-0 z-20 flex flex-col items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${safeIndex}-${lang}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                         text-xs font-semibold tracking-[0.18em] uppercase"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                color: '#1a237e',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
              Shifa Properties Ltd
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-white font-semibold mb-4 leading-[1.15]"
              style={{
                textShadow: '0px 4px 24px rgba(0, 0, 0, 0.65), 0px 2px 6px rgba(0, 0, 0, 0.45)',
              }}
            >
              {slideData.title || pick(slide.title, lang)}
            </motion.h1>

            {/* Gold accent divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.40, duration: 0.45 }}
              className="w-14 h-0.5 rounded-full mb-5"
              style={{ backgroundColor: '#C9A84C' }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              className="text-white text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
              style={{
                textShadow: '0px 2px 14px rgba(0, 0, 0, 0.60), 0px 1px 4px rgba(0, 0, 0, 0.40)',
              }}
            >
              {slideData.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.60 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {renderExploreCta()}

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
             text-sm font-semibold uppercase tracking-wider
             transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  textShadow: 'none',
                }}
              >
                {pick(UI.services.learnMore, lang)}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            id={`hero-dot-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === safeIndex ? '28px' : '8px',
              height: '8px',
              backgroundColor: i === safeIndex ? '#C9A84C' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-6 right-8 z-30 hidden md:flex items-center gap-1.5">
        <span className="text-white font-semibold text-sm tabular-nums"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
          {String(safeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-white/50 text-xs">/</span>
        <span className="text-white/60 text-xs tabular-nums">
          {String(banners.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Arrow controls: White background, Black text ── */}
      <button
        onClick={prev}
        id="hero-prev"
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30
                   w-11 h-11 rounded-full flex items-center justify-center
                   bg-white/80 text-black text-xl font-bold transition-all duration-300 
                   hover:scale-110 hover:bg-white"
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          textShadow: 'none',
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        id="hero-next"
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30
                   w-11 h-11 rounded-full flex items-center justify-center
                   bg-white/80 text-black text-xl font-bold transition-all duration-300 
                   hover:scale-110 hover:bg-white"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
        }}
      >
        ›
      </button>

      {/* ── Gold progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/20">
        <motion.div
          key={`bar-${safeIndex}`}
          className="h-full"
          style={{ backgroundColor: '#C9A84C' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </section >
  );
};

export default HeroSection;