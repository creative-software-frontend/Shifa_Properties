'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, type Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick, type LangKey } from '../../data/translations';
import { getProjectImage } from '../../utils/imageUrl';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
// Reusable slide content (image left, info right) used for prev/current/next.
const SlideContent: React.FC<{
  project: Project;
  onView: () => void;
  lang: LangKey;
  p: typeof UI.projects;
}> = ({ project, onView, lang, p }) => (
  <>
    {/* Left: Image */}
    <div className="relative h-64 md:h-full overflow-hidden">
      <img
        src={getProjectImage(project)} alt={project.title ?? project.name}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      {project.tag && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A] shadow-sm">
            {project.tag}
          </span>
        </div>
      )}
    </div>

    {/* Right: Title (top) → Description → View Details */}
    <div
      className="flex flex-col justify-center p-8 md:p-12 text-white"
      style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #1a237e 60%, #0288D1 100%)' }}
    >
      <h3
        className="font-bold text-2xl md:text-3xl mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: '#F4D58D' }}
      >
        {project.title ?? project.name}
      </h3>
      <div className="w-12 h-1 rounded-full bg-[#C9A84C] mb-5" />
      <p className="text-[12px] text-white/90 mb-5 inline-flex items-center gap-1.5 font-medium bg-white/10 w-fit px-3 py-1 rounded-full">
        📍 {project.location?.replace(/^📍\s*/, '') || 'Bangladesh'}
      </p>
      <p className="text-white/85 text-sm leading-relaxed mb-8 line-clamp-4">
        {project.description}
      </p>
      <button
        onClick={onView}
        className="self-start inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#0D0D1A] px-5 py-3 rounded-full transition-all duration-300 hover:brightness-105 hover:shadow-md active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #F4D58D, #C9A84C)' }}
      >
        {pick(p.viewDetails, lang)}
        <span className="text-xs">→</span>
      </button>
    </div>
  </>
);

const ProjectsPreviewSection: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const p = UI.projects;
  const { projects, loading } = useProjects();
  const displayProjects = projects
    .filter((pr) => pr.status === undefined || pr.status === 'active')
    .slice(0, 6);

  const total = displayProjects.length;
  const current = displayProjects[index];

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  // Commit to a slide on release based on drag distance / velocity.
  const handleDragEnd = (_e: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const width = containerRef.current?.offsetWidth ?? 1;
    const threshold = width * 0.3;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -threshold || velocity < -400) {
      // swipe left → next
      animate(x, -width, { type: 'spring', stiffness: 320, damping: 34, velocity: velocity });
      setTimeout(() => {
        setIndex((i) => (i + 1) % total);
        x.set(0);
      }, 320);
    } else if (offset > threshold || velocity > 400) {
      // swipe right → previous
      animate(x, width, { type: 'spring', stiffness: 320, damping: 34, velocity: velocity });
      setTimeout(() => {
        setIndex((i) => (i - 1 + total) % total);
        x.set(0);
      }, 320);
    } else {
      // snap back
      animate(x, 0, { type: 'spring', stiffness: 320, damping: 34, velocity: velocity });
    }
  };

  const goTo = (i: number) => {
    const width = containerRef.current?.offsetWidth ?? 1;
    const step = i > index ? -1 : 1;
    animate(x, step * width, { type: 'spring', stiffness: 320, damping: 34 });
    setTimeout(() => {
      setIndex(i);
      x.set(0);
    }, 320);
  };

  return (
    <section
      id="projects"
      className="gs-section relative py-20 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #eef2ff 0%, #e3ecfb 50%, #e0f2fe 100%)'
      }}
    >
      {/* Decorative soft glows (very subtle, tinted to match background) */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#c7d2fe]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#bae6fd]/40 blur-3xl" />

      <div className="gs-container relative max-w-7xl mx-auto px-4">

        {/* ── HEADER AREA ── */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
            style={{ color: '#C9A84C' }}
          >
            {pick(p.label, lang)}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
          >
            {pick(p.title, lang)}
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">{pick(p.subtitle, lang)}</p>
        </motion.div>

        {/* ── SLIDER LAYOUT (one project at a time) ── */}
        <div className="relative">
          {loading ? (
            <p className="text-center text-gray-400 text-sm py-20">Loading projects…</p>
          ) : total === 0 ? (
            <p className="text-center text-gray-400 text-sm py-20">No projects available.</p>
          ) : (
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-3xl border border-white/60 h-[560px] md:h-[420px] cursor-grab active:cursor-grabbing touch-pan-y"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 20px 45px -20px rgba(30, 41, 59, 0.35)'
              }}
            >
              <motion.div
                className="absolute inset-y-0 w-full flex"
                style={{ x, left: '-100%' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                onClickCapture={(e) => {
                  // Prevent click (e.g. opening modal) right after a drag.
                  if (Math.abs(x.get()) > 4) e.preventDefault();
                }}
              >
                {/* Previous slide (enters from left) */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full h-full shrink-0">
                  <SlideContent project={displayProjects[prevIndex]} onView={() => setSelected(displayProjects[prevIndex])} lang={lang} p={p} />
                </div>

                {/* Current slide */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full h-full shrink-0">
                  <SlideContent project={current} onView={() => setSelected(current)} lang={lang} p={p} />
                </div>

                {/* Next slide (enters from right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full h-full shrink-0">
                  <SlideContent project={displayProjects[nextIndex]} onView={() => setSelected(displayProjects[nextIndex])} lang={lang} p={p} />
                </div>
              </motion.div>
            </div>
          )}

          {/* Dots indicator */}
          {!loading && total > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {displayProjects.map((pr, i) => (
                <button
                  key={pr.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-[#C9A84C]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER VIEW ALL LINK BUTTON ── */}
        <div className="text-center mt-14">
          <Link
            to="/projects"
            className="inline-block text-white font-semibold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider 
                       transition-all duration-300 text-center shadow-md hover:brightness-110 active:scale-[0.98] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
          >
            {pick(p.viewAll, lang)}
          </Link>
        </div>
      </div>

      {/* ── MODAL OVERLAY DETAIL DISPLAY ── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl relative z-10"
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <div className="relative h-64">
                <img src={getProjectImage(selected)} alt={selected.title ?? selected.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 md:p-8">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
                >
                  {selected.title ?? selected.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{selected.description}</p>
                <button
                  onClick={() => { setSelected(null); navigate('/send-message'); }}
                  className="w-full text-center text-white font-semibold text-xs px-6 py-4 rounded-full uppercase tracking-wider 
                             transition-all duration-300 shadow-md hover:brightness-110 active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
                >
                  {pick(p.bookNow, lang)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsPreviewSection;