import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Hotel, Building2, Map, ChevronLeft, ChevronRight, Star, X, MapPin } from 'lucide-react';
import servicesImg from '../../assets/image/1.jfif';
import img1 from '../../assets/image/3.jfif';
import img2 from '../../assets/image/31.jfif';
import img3 from '../../assets/image/4.jfif';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick, type LangKey } from '../../data/translations';
import { useOurInvestmentList, type OurInvestmentItem } from '../../hooks/useOurInvestmentList';
import { useOurVision } from '../../hooks/useOurVision';
import { getImageUrl } from '../../utils/imageUrl';
import { useState, useEffect, useCallback } from 'react';

const SLIDE_INTERVAL_MS = 4200;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const VISUALS = [
  { icon: Hotel, image: img1 },
  { icon: Building2, image: img2 },
  { icon: Map, image: img3 },
];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '12%' : '-12%',
    opacity: 0,
    scale: 1.06,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-8%' : '8%',
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  }),
};

const ServiceCard: React.FC<{
  service: OurInvestmentItem;
  index: number;
  lang: LangKey;
  s: typeof UI.services;
  onLearnMore: (service: OurInvestmentItem) => void;
}> = ({ service, index, lang, s, onLearnMore }) => {
  const images = service.images ?? [];
  const hasSlides = images.length > 1;
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgFailed, setImgFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const fallbackImage = VISUALS[index % VISUALS.length].image;
  const Icon = VISUALS[index % VISUALS.length].icon;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (!images.length) return;
      setDirection(dir);
      setImgFailed(false);
      setCurrentImgIdx(((next % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(currentImgIdx - 1, -1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(currentImgIdx + 1, 1);
  };

  useEffect(() => {
    if (!hasSlides || paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setImgFailed(false);
      setCurrentImgIdx((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [hasSlides, paused, images.length, currentImgIdx]);

  const remoteSrc = images[currentImgIdx]?.image_path
    ? getImageUrl(images[currentImgIdx].image_path)
    : '';
  const imageSrc = !imgFailed && remoteSrc ? remoteSrc : fallbackImage;

  const isNight = new Date().getHours() < 6 || new Date().getHours() >= 18;

  return (
    <motion.article
      id={`service-card-${service.id}`}
      variants={fadeInUp}
      className="group relative flex flex-col justify-end min-h-[460px] p-6 overflow-hidden select-none"
      style={{
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
      }}
      whileHover={{ y: -8, boxShadow: 'var(--shadow-card-lg)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Image slider */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={`${service.id}-${currentImgIdx}-${imageSrc}`}
            src={imageSrc}
            alt={service.title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onError={() => setImgFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover brightness-[1.08] ${isNight ? 'brightness-[0.85] contrast-[1.1]' : ''}`}
            draggable={false}
          />
        </AnimatePresence>

        {/* Gradients — lightened so the photo stays visible, with an extra dark pool behind the text block for legibility */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] z-[1] pointer-events-none bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 z-[1] pointer-events-none bg-gradient-to-b from-black/25 to-transparent" />

        {/* Subtle shine on hover */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          }}
          animate={{ x: ['-30%', '130%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
        />

        {/* Controls */}
        {hasSlides && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Progress dots */}
            <div className="absolute top-5 left-0 right-0 z-30 flex justify-center gap-2 px-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i, i > currentImgIdx ? 1 : -1);
                  }}
                  className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: i === currentImgIdx ? 28 : 8,
                    background: 'rgba(255,255,255,0.28)',
                  }}
                >
                  {i === currentImgIdx && !paused && (
                    <motion.span
                      key={`progress-${currentImgIdx}`}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: 'var(--color-gold)' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {i === currentImgIdx && paused && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--color-gold)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Category icon badge */}
      <motion.div
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-2xl flex items-center justify-center text-white"
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.28)',
          backdropFilter: 'blur(12px)',
        }}
        whileHover={{ scale: 1.08, rotate: 3 }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start w-full text-left">
        <motion.p
          className="text-[11px] font-extrabold uppercase tracking-[0.22em] mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
          style={{ color: 'var(--color-gold)' }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {pick(s.label, lang)}
        </motion.p>

        <h3
          className="text-white text-2xl md:text-[1.7rem] font-bold mb-2 tracking-wide leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {service.category?.title || service.title}
        </h3>

        <p className="text-white text-sm font-medium leading-relaxed mb-5 line-clamp-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
          {service.title}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
            style={{
              background: 'rgba(201,168,76,0.4)',
              border: '1px solid rgba(201,168,76,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Star size={12} fill="currentColor" style={{ color: 'var(--color-gold)' }} />
            {service.rating}
          </span>
          {service.category?.title && (
            <span
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {service.category.title}
            </span>
          )}
        </div>

        <motion.button
          type="button"
          onClick={() => onLearnMore(service)}
          className="w-full font-semibold text-xs py-3.5 rounded-full uppercase tracking-[0.14em] transition-colors cursor-pointer"
          style={{
            background: 'linear-gradient(90deg, #fff 0%, #f5f5f5 100%)',
            color: 'var(--color-black)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
          whileHover={{ scale: 1.015, y: -1 }}
          whileTap={{ scale: 0.985 }}
        >
          {pick(s.learnMore, lang)}
        </motion.button>
      </div>
    </motion.article>
  );
};

const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();
  const s = UI.services;
  const { investments, loading, error, refetch } = useOurInvestmentList();
  const { visionData } = useOurVision();
  const [selected, setSelected] = useState<OurInvestmentItem | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  const isNight = new Date().getHours() < 6 || new Date().getHours() >= 18;

  const handleLearnMore = (service: OurInvestmentItem) => {
    setModalImgIdx(0);
    setSelected(service);
  };

  return (
    <section
      id="services"
      className="relative pt-20 pb-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(26,35,126,0.06), transparent 60%), #ffffff',
      }}
    >
      <div className="gs-container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{
              color: 'var(--color-primary)',
              background: 'rgba(26,35,126,0.06)',
              border: '1px solid rgba(26,35,126,0.12)',
            }}
          >
            {pick(s.label, lang)}
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark)' }}
          >
            {pick(s.title, lang)}
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {pick(s.subtitle, lang)}
          </p>
        </motion.div>

        <motion.div
          key={loading ? 'loading' : error ? 'error' : `data-${investments.length}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative min-h-[460px] overflow-hidden animate-pulse bg-neutral-200"
                style={{ borderRadius: 'var(--radius-xl)' }}
              />
            ))
          ) : error ? (
            <motion.div variants={fadeInUp} className="col-span-full text-center py-12 px-4 rounded-2xl border border-red-100 bg-red-50 text-red-600">
              <p className="font-medium text-lg">Unable to load investment list.</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
              >
                Try again
              </button>
            </motion.div>
          ) : investments.length === 0 ? (
            <motion.div variants={fadeInUp} className="col-span-full text-center py-16 px-4 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="font-medium text-lg text-gray-600">
                No investment categories available at the moment.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please check back later for new opportunities.
              </p>
            </motion.div>
          ) : (
            investments.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                lang={lang}
                s={s}
                onLearnMore={handleLearnMore}
              />
            ))
          )}
        </motion.div>

        <motion.div
          className="mt-16 overflow-hidden relative h-72 md:h-[420px] flex flex-col justify-center items-center p-6 md:p-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card-lg)' }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src={visionData?.image ? getImageUrl(visionData.image) : servicesImg}
              alt="Shifa Properties Ltd Group Hotel pool view"
              className={`w-full h-full object-cover origin-center brightness-[1.05] ${isNight ? 'brightness-[0.8] contrast-[1.1]' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          </div>

          <div className="relative z-20 flex flex-col items-center text-center max-w-2xl w-full mx-auto">
            <span className="text-[10px] md:text-xs font-extrabold tracking-[0.22em] uppercase mb-3 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {visionData?.title || pick(s.visionLabel, lang)}
            </span>
            <h3
              className="text-white text-xl md:text-3xl font-bold mb-7 leading-snug tracking-wide [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {visionData?.description || pick(s.visionTitle, lang)}
            </h3>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/projects"
                id="services-view-projects-btn"
                className="inline-block bg-white font-semibold text-xs px-10 py-3.5 rounded-full uppercase tracking-[0.14em] text-center"
                style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.35)', color: 'var(--color-black)' }}
              >
                {pick(s.viewProjects, lang)}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── LEARN MORE MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80 bg-neutral-900 overflow-hidden">
                {(() => {
                  const imgs = selected.images ?? [];
                  const src = imgs[modalImgIdx]?.image_path
                    ? getImageUrl(imgs[modalImgIdx].image_path)
                    : VISUALS[0].image;
                  return (
                    <img
                      src={src}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = VISUALS[0].image;
                      }}
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {(selected.images ?? []).length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {(selected.images ?? []).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setModalImgIdx(i)}
                        aria-label={`View image ${i + 1}`}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: i === modalImgIdx ? 24 : 8,
                          background: i === modalImgIdx ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                    style={{ background: 'var(--color-gold)' }}
                  >
                    <Star size={12} fill="currentColor" />
                    {selected.rating}
                  </span>
                  {selected.category?.title && (
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                      {selected.category.title}
                    </span>
                  )}
                </div>

                <h3
                  className="text-2xl md:text-3xl font-bold mb-2 text-[#0a1546]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selected.category?.title || selected.title}
                </h3>

                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {selected.title}
                </p>

                {selected.position && (
                  <div className="flex items-start gap-2 text-gray-500 text-sm mb-6">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{selected.position}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/projects"
                    onClick={() => setSelected(null)}
                    className="flex-1 text-center font-semibold text-xs py-3.5 rounded-full uppercase tracking-[0.14em] text-white"
                    style={{ background: 'linear-gradient(135deg, #1a237e, #0288D1)' }}
                  >
                    {pick(s.viewProjects, lang)}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="flex-1 text-center font-semibold text-xs py-3.5 rounded-full uppercase tracking-[0.14em] border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
