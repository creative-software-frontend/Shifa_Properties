'use client';
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import { getProjectImage } from '../../utils/imageUrl';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const ProjectsPreviewSection: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const p = UI.projects;
  const { projects, loading } = useProjects();
  const displayProjects = projects
    .filter((pr) => pr.status === undefined || pr.status === 'active')
    .slice(0, 4);

  return (
    <section id="projects" className="gs-section bg-white py-16">
      <div className="gs-container max-w-7xl mx-auto px-4">

        {/* ── HEADER AREA (Removed divider and switched to elegant dark theme text) ── */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
            style={{ color: 'var(--color-primary, #C9A84C)' }}
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

        {/* ── CARD GRID LAYOUT ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
        >
          {loading ? (
            <p className="col-span-full text-center text-gray-400 text-sm py-10">Loading projects…</p>
          ) : displayProjects.map((project) => (
            <motion.div
              key={project.id} variants={fadeInUp}
              className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group select-none"
              style={{ boxShadow: 'var(--shadow-card)' }}
              whileHover={{ boxShadow: 'var(--shadow-card-lg)', y: -6 }}
              onClick={() => setSelected(project)}
            >
              {/* Media Display Area */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                  src={getProjectImage(project)} alt={project.title ?? project.name} className="w-full h-full object-cover"
                />
                {project.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A84C] text-[#0D0D1A]">
                      {project.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Information Area (Blue elements removed, updated to Black text layout) */}
              <div className="p-5">
                <h3
                  className="font-bold text-base mb-2 transition-colors duration-200 group-hover:text-amber-600"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
                >
                  {project.title ?? project.name}
                </h3>
                <p className="text-[11px] text-gray-400 mb-3 flex items-center gap-1 font-medium">
                  📍 {project.location || 'Bangladesh'}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
                <button className="flex items-center text-[11px] font-bold tracking-wider uppercase text-[#C9A84C] group-hover:translate-x-1.5 transition-transform duration-300">
                  {pick(p.viewDetails, lang)}
                  <span className="ml-1 text-xs">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

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