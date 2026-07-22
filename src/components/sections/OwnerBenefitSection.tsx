import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Play,
  X,
  Wallet,
  FileText,
  Calendar,
  Umbrella,
  HandCoins,
  Building2,
  Home,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useOwnerBenefitList, resolveVideoAction } from '../../hooks/useOwnerBenefitList';
import thinkingInvestor from '../../assets/image/thinking-investor.png';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const BENEFIT_ICONS = [Wallet, FileText, HandCoins, Calendar, Umbrella, HandCoins];

const FALLBACK_BENEFITS = [
  'SAB KABLA REGISTRATION OWNERSHIP',
  'LIFE TIME PROFIT',
  'ENJOY YOUR VACATION AT YOUR HOTEL',
  'PRESTIGIOUS LIFE WITH INTEREST FREE INCOME',
  'ANYTIME TRANSFER OF OWNERSHIP AND RESALE IN CASE OF EMERGENCY',
  'EVERY YEAR THE VALUE OF ASSETS WILL INCREASE SEVERAL TIMES',
  'RECEIVE ANNUAL PROFITS FOR A LIFETIME, ENSURING A HALAL INCOME STREAM',
  'OWNERS ENJOY EQUAL DISTRIBUTION OF HOTEL PROFITS, GUARANTEEING LIFETIME RETURNS',
];

const OwnerBenefitSection: React.FC = () => {
  const { lang } = useLanguage();
  const { ownerBenefit, loading, error, refetch } = useOwnerBenefitList();
  const [videoOpen, setVideoOpen] = useState(false);

  const { mode: videoMode, embedUrl, externalUrl } = resolveVideoAction(ownerBenefit?.video_url);

  const benefitItems = ownerBenefit?.items?.length
    ? ownerBenefit.items
    : FALLBACK_BENEFITS.map((name, i) => ({
        id: i,
        owner_benefit_id: 0,
        benefit_name: name,
        icon: '',
      }));

  const benefitsTitle =
    ownerBenefit?.title ||
    (lang === 'EN' ? 'Ownership Benefits' : 'মালিকানার সুবিধাসমূহ');

  const whyTitle =
    lang === 'EN'
      ? 'Why Should You Invest in Shifa Properties Ltd Group?'
      : 'কেন শিফা প্রপার্টিজ লিমিটেড গ্রুপে বিনিয়োগ করবেন?';

  const whyDesc =
    ownerBenefit?.description ||
    (lang === 'EN'
      ? 'We offer trusted investment opportunities in premium hotel suites and real estate — combining halal returns, legal ownership, and world-class hospitality under one transparent platform.'
      : 'আমরা প্রিমিয়াম হোটেল স্যুট ও রিয়েল এস্টেটে বিশ্বস্ত বিনিয়োগের সুযোগ দিই — হালাল আয়, আইনগত মালিকানা ও বিশ্বমানের আতিথেয়তা এক স্বচ্ছ প্ল্যাটফর্মে।');

  const groupName = 'SHIFA PROPERTIES';

  const handlePlayClick = () => {
    if (videoMode === 'embed') {
      setVideoOpen(true);
    } else if (videoMode === 'external' && externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* ── SECTION 1: WHY INVEST ── */}
      <section id="why-invest" className="relative py-16 bg-white overflow-hidden">
        <motion.div
          className="gs-container max-w-7xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft} className="lg:pt-6">
              <span className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-[#0288D1]">
                {lang === 'EN' ? 'Investment Opportunity' : 'বিনিয়োগের সুযোগ'}
              </span>
              <h2
                className="text-2xl md:text-3xl lg:text-[2rem] font-bold leading-tight mb-6 text-[#1a237e]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {whyTitle}
              </h2>
              <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                {whyDesc}
              </p>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-[32px] p-2 md:p-3 shadow-[0_25px_60px_rgba(10,21,70,0.18)]"
                style={{ background: '#dcefff' }}
              >
                <motion.div
                  className="relative rounded-[26px] overflow-hidden bg-[#0a1546] min-h-[300px] md:min-h-[340px]"
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Abstract blob background accent */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#c7e3fb]/15 blur-2xl pointer-events-none" />

                  <div className="relative grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] items-center h-full">
                    {/* Left: illustration */}
                    <div className="relative flex justify-center sm:justify-end items-end h-full pt-6 sm:pt-0">
                      <img
                        src={thinkingInvestor}
                        alt="Thinking about investment"
                        className="w-36 sm:w-44 lg:w-52 h-auto object-contain drop-shadow-2xl"
                        draggable={false}
                      />
                    </div>

                    {/* Right: text content */}
                    <div className="relative flex flex-col items-center sm:items-start text-center sm:text-left px-6 sm:px-2 pb-8 sm:pb-0">
                      <p className="text-[#4fb3f0] font-extrabold text-base md:text-xl tracking-wide leading-tight mb-0">
                        {lang === 'EN' ? 'WHY SHOULD YOU' : 'কেন আপনি বিনিয়োগ'}
                      </p>
                      <h3
                        className="text-white font-black leading-[0.95] tracking-tight mb-3"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
                      >
                        {lang === 'EN' ? 'INVEST' : 'করবেন'}
                      </h3>

                      {/* Icon strip */}
                      <div className="flex items-center gap-2.5 mb-4">
                        {[Building2, Home, MapPin].map((IconEl, i) => (
                          <span
                            key={i}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-white text-[#0a1546] shadow-md"
                          >
                            <IconEl className="w-4 h-4" strokeWidth={2} />
                          </span>
                        ))}
                      </div>

                      <span className="inline-block bg-[#0288D1] text-white text-[10px] md:text-xs font-extrabold uppercase tracking-wide px-4 py-2 rounded-full shadow-lg">
                        {lang === 'EN' ? `IN ${groupName} GROUP` : 'শিফা প্রপার্টিজ গ্রুপে'}
                      </span>
                    </div>

                    {/* Center play button */}
                    {videoMode !== 'none' && (
                      <button
                        type="button"
                        onClick={handlePlayClick}
                        className="absolute inset-0 flex items-center justify-center group"
                        aria-label="Play investment video"
                      >
                        <span className="relative flex items-center justify-center">
                          <motion.span
                            className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/25"
                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                          />
                          <motion.span
                            className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30"
                            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                          />
                          <motion.span
                            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white"
                            style={{ background: '#1f6fe0' }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-5 h-5 md:w-6 md:h-6 fill-white ml-0.5" />
                          </motion.span>
                        </span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: OWNERSHIP BENEFITS ── */}
      <section id="owner-benefits" className="relative py-16 bg-white overflow-hidden">
        <motion.div
          className="gs-container max-w-7xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div
            className="relative rounded-[28px] p-8 md:p-12 lg:p-14"
            style={{ background: '#eef1fa' }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-12">
              <span className="block text-[#0288D1] font-bold text-xs md:text-sm tracking-[0.28em] uppercase mb-2">
              {benefitsTitle}
              </span>
            
            </motion.div>

            {error && (
              <motion.div
                variants={fadeInUp}
                className="mb-8 text-center py-4 px-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm"
              >
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-2 text-xs font-bold uppercase tracking-wider underline"
                >
                  Try again
                </button>
              </motion.div>
            )}

            <motion.div
              key={loading ? 'loading' : `data-${benefitItems.length}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-7"
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-14 rounded-xl bg-white/70 animate-pulse" />
                ))
              ) : (
                benefitItems.map((item, idx) => {
                  const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="flex items-start gap-4 group"
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ color: '#0f2942' }}
                      >
                        <Icon className="w-7 h-7" strokeWidth={1.75} />
                      </div>
                      <p className="text-[#0f2942] text-[12px] md:text-[13px] font-bold uppercase tracking-wide leading-relaxed pt-1.5">
                        {item.benefit_name}
                      </p>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {videoOpen && videoMode === 'embed' && embedUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={embedUrl}
                title="Investment video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OwnerBenefitSection;
