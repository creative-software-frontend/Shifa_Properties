import { motion, type Variants } from 'framer-motion';
import { Hotel, Building2, Map } from 'lucide-react';
import servicesImg from '../../assets/image/1.jfif';
import img1 from '../../assets/image/3.jfif';
import img2 from '../../assets/image/31.jfif';
import img3 from '../../assets/image/4.jfif';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import { useOurInvestorCategories } from '../../hooks/useOurInvestorCategories';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();
  const s = UI.services;
  const { categories } = useOurInvestorCategories();

  // Visual fallback (icons/images/colors) cycled across dynamic backend cards.
  const VISUALS = [
    { icon: <Hotel size={38} />, color: '#1a237e', image: img1, badgeText: '5 Night Stay' },
    { icon: <Building2 size={38} />, color: '#C9A84C', image: img2, badgeText: 'Modern Suite' },
    { icon: <Map size={38} />, color: '#1a237e', image: img3, badgeText: 'Prime Plot' },
  ];

  // Use backend data when available; otherwise fall back to the static set.
  const SERVICES_DATA = categories.length
    ? categories.map((cat, i) => ({
        id: cat.id,
        icon: VISUALS[i % VISUALS.length].icon,
        color: VISUALS[i % VISUALS.length].color,
        image: VISUALS[i % VISUALS.length].image,
        badgeText: VISUALS[i % VISUALS.length].badgeText,
        title: cat.title,
        desc: cat.position,
        rating: cat.rating,
      }))
    : [
        {
          id: 1,
          icon: <Hotel size={38} />,
          color: '#1a237e',
          image: img1,
          badgeText: '5 Night Stay',
          title: pick(s.serviceItems.hotel.title, lang),
          desc: pick(s.serviceItems.hotel.desc, lang),
          rating: '4.9',
        },
        {
          id: 2,
          icon: <Building2 size={38} />,
          color: '#C9A84C',
          image: img2,
          badgeText: 'Modern Suite',
          title: pick(s.serviceItems.apartment.title, lang),
          desc: pick(s.serviceItems.apartment.desc, lang),
          rating: '4.9',
        },
        {
          id: 3,
          icon: <Map size={38} />,
          color: '#1a237e',
          image: img3,
          badgeText: 'Prime Plot',
          title: pick(s.serviceItems.land.title, lang),
          desc: pick(s.serviceItems.land.desc, lang),
          rating: '4.9',
        },
      ];

  // Night-time logic: Activates filter between 6 PM and 6 AM
  const isNight = new Date().getHours() < 6 || new Date().getHours() >= 18;
  const imageFilter = isNight ? 'filter brightness-[0.6] contrast-[1.2]' : '';

  return (
    <section id="services" className="pt-16 pb-12 bg-white">
      <div className="gs-container max-w-7xl mx-auto px-4">

        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase block mb-1" style={{ color: 'var(--color-primary)' }}>
            {pick(s.label, lang)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark)' }}>
            {pick(s.title, lang)}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {pick(s.subtitle, lang)}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SERVICES_DATA.map((service) => {
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                variants={fadeInUp}
                className="group relative flex flex-col justify-end min-h-[440px] p-6 overflow-hidden cursor-pointer bg-neutral-900 select-none"
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-card-lg)' }}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imageFilter}`}
                  />
                </div>

                {/* Removed Gradient Overlay Div from here */}

                <div
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(255, 255, 255, 0.16)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#ffffff' }}
                >
                  {typeof service.icon === 'object' && 'props' in service.icon
                    ? { ...service.icon, props: { ...service.icon.props, size: 20 } }
                    : service.icon
                  }
                </div>

                {/* Content Area with drop-shadows for better contrast against images */}
                <div className="relative z-20 flex flex-col items-start w-full text-left drop-shadow-md">
                  <h3 className="text-white text-xl font-semibold mb-1.5 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-xs font-normal leading-relaxed mb-4 line-clamp-3">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium text-white" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(4px)' }}>
                      ★ {service.rating}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium text-white" style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(4px)' }}>
                      {service.badgeText}
                    </span>
                  </div>
                  <button
                    className="w-full bg-white text-black font-semibold text-xs py-3 rounded-full uppercase tracking-wider transition-all duration-300 active:scale-[0.98] hover:bg-neutral-100"
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                  >
                    {pick(s.learnMore, lang)}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className="mt-16 overflow-hidden relative h-72 md:h-96 flex flex-col justify-center items-center p-6 md:p-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card-lg)' }}
        >
          {/* Background Image - No Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              src={servicesImg}
              alt="Shifa Properties Ltd Group Hotel pool view"
              className={`w-full h-full object-cover origin-center ${imageFilter}`}
            />
          </div>

          {/* Content Area - Ensure text has a text-shadow if it becomes hard to read against the image */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-xl w-full mx-auto">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white drop-shadow-md">
              {pick(s.visionLabel, lang)}
            </span>
            <h3
              className="text-white text-xl md:text-3xl font-semibold mb-6 leading-snug tracking-wide drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pick(s.visionTitle, lang)}
            </h3>
            <Link
              to="/projects"
              id="services-view-projects-btn"
              className="inline-block bg-white text-black font-semibold text-xs px-10 py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 text-center active:scale-[0.98] hover:bg-neutral-100"
              style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.3)', color: 'var(--color-black)' }}
            >
              {pick(s.viewProjects, lang)}
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;