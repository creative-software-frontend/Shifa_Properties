import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useGallery } from '../../hooks/useGallery';
import { getImageUrl } from '../../utils/imageUrl';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const GallerySection: React.FC = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { gallery: apiGallery, loading } = useGallery();

  const galleryItems = apiGallery.map(item => ({
    id: item.id,
    src: getImageUrl(item.file_path),
    title: item.title,
    tag: item.description || 'Gallery'
  }));

  const close = () => setLightbox(null);
  const prev = () => setLightbox((p) => p !== null ? (p - 1 + galleryItems.length) % galleryItems.length : 0);
  const next = () => setLightbox((p) => p !== null ? (p + 1) % galleryItems.length : 0);

  // Keyboard navigation for better UX
  useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  return (
    <section id="gallery" className="pt-0 pb-9" style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f0f4ff 100%)' }}>
      <div className="gs-container">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-label">Visual Showcase</span>
          <h2 className="section-title">Project Image Gallery</h2>
          <p className="section-subtitle mx-auto mt-3">
            Explore our stunning collection of architectural renders and real imagery from our premium hotel developments.
          </p>
        </motion.div>

        {/* Uniform gallery grid */}
        <motion.div
          key={galleryItems.length ? 'loaded' : 'loading'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loading ? (
             <div className="text-center py-8 text-gray-500 col-span-full">Loading gallery...</div>
          ) : (
             galleryItems.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/3]"
              onClick={() => setLightbox(idx)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-start justify-end p-6"
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold mb-2 uppercase bg-[#C9A84C] text-[#060614]">
                  {item.tag}
                </span>
                <p className="text-white text-sm font-semibold">{item.title}</p>
              </div>
            </motion.div>
          )))}
        </motion.div>
      </div>

      {/* Lightbox Wrapper */}
      <AnimatePresence>
        {lightbox !== null && galleryItems.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            style={{ background: 'rgba(13,13,26,0.92)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative max-w-5xl w-full cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={galleryItems[lightbox]?.src}
                alt={galleryItems[lightbox]?.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-card-lg"
              />

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mr-3 tracking-wider uppercase"
                    style={{ background: 'linear-gradient(135deg,#C9A84C,#fde68a)', color: '#0D0D1A' }}>
                    {galleryItems[lightbox]?.tag}
                  </span>
                  <span className="text-white font-semibold">{galleryItems[lightbox]?.title}</span>
                </div>
                <span className="text-white/50 text-sm">{lightbox + 1} / {galleryItems.length}</span>
              </div>

              {/* Close Button */}
              <button
                onClick={close}
                id="gallery-lightbox-close"
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-black/60 text-white text-xl
                           flex items-center justify-center hover:bg-gold-500 transition-colors duration-300"
              >
                ×
              </button>

              {/* Prev Button */}
              <button
                onClick={prev}
                id="gallery-lightbox-prev"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                           bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white text-2xl
                           flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={next}
                id="gallery-lightbox-next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                           bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white text-2xl
                           flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;