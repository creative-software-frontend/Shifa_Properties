import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getProjectImage } from '../../utils/imageUrl';

type Filter = 'All' | 'Hotel' | 'Apartment' | 'Land';

const FILTERS: { value: Filter; label: { en: string; bn: string } }[] = [
  { value: 'All', label: { en: 'All', bn: 'সব' } },
  { value: 'Hotel', label: { en: 'Hotel', bn: 'হোটেল' } },
  { value: 'Apartment', label: { en: 'Apartment', bn: 'অ্যাপার্টমেন্ট' } },
  { value: 'Land', label: { en: 'Land', bn: 'জমি' } },
];

const ProjectsSection: React.FC = () => {
  const { lang } = useLanguage();
  const pick = (obj: { en: string; bn: string }) => lang === 'EN' ? obj.en : obj.bn;

  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const { projects, loading } = useProjects();

  // Only show projects marked active by the backend.
  const activeProjects = projects.filter((p) => p.status === undefined || p.status === 'active');

const filtered = activeFilter === 'All'
    ? activeProjects
    : activeProjects.filter((p) => {
        const cat = p.category;
        return typeof cat === 'string' ? cat === activeFilter : cat?.title === activeFilter;
      });


  return (
    <section id="projects" className="gs-section bg-white py-20">
      <div className="gs-container max-w-7xl mx-auto px-4">

        {/* ── HEADER AREA (Removed divider and switched to elegant dark theme text) ── */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
            style={{ color: 'var(--color-primary, #C9A84C)' }}
          >
            Our Portfolio
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-dark, #000000)' }}
          >
            Our Project Overview
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of world-class hospitality and real estate projects across Bangladesh's most sought-after destinations.
          </p>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              id={`projects-filter-${filter.value.toLowerCase()}`}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 select-none
                ${activeFilter === filter.value
                  ? 'text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={activeFilter === filter.value
                ? { background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }
                : {}}
            >
              {pick(filter.label)}
            </button>
          ))}
        </div>

        {/* ── PROJECT GRID ── */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-gray-400 text-sm">Loading projects…</span>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group select-none animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s`, boxShadow: 'var(--shadow-card)' }}
              onClick={() => setSelected(project)}
            >
              {/* Image & Tags display */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img src={getProjectImage(project)} alt={project.title ?? project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white"
                    style={{ background: 'rgba(26,35,126,0.85)' }}>
                    {typeof project.category === 'string' ? project.category : project.category?.title}

                  </span>
                  {project.tag && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                      style={{ background: 'linear-gradient(135deg,#C9A84C,#fde68a)', color: '#0D0D1A' }}>
                      {project.tag}
                    </span>
                  )}
                </div>

                {/* Hover overlay micro-interaction */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <span className="text-white font-semibold text-xs bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full uppercase tracking-wider">
                    Learn More →
                  </span>
                </div>
              </div>

              {/* Information Content Block (Updated to crisp Black text typography) */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3
                    className="font-bold text-lg transition-colors duration-200 group-hover:text-amber-600"
                    style={{ color: 'var(--color-dark, #000000)', fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.title ?? project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3 font-medium">
                  <span>📍</span>
                  <span>{project.location}</span>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-4">
                  <button className="text-xs font-bold tracking-wider uppercase text-[#C9A84C] group-hover:translate-x-1 transition-transform duration-300">
                    View Details →
                  </button>
                  <span className="text-xs text-gray-200">|</span>
                  <button className="text-xs font-medium text-gray-400 hover:text-black transition-colors">📍 Location</button>
                  <button className="text-xs font-medium text-gray-400 hover:text-black transition-colors">🎥 Video</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* ── DOT NAVIGATION DISPLAY ── */}
        <div className="flex justify-center gap-2 mt-12">
          {filtered.map((_, i) => (
            <span key={i}
              className={`rounded-full transition-all duration-300 ${i === 0 ? 'w-6 h-2' : 'w-2 h-2 bg-gray-200'}`}
              style={i === 0 ? { background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' } : {}} />
          ))}
        </div>
      </div>

      {/* ── MODAL COMPONENT ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64">
              <img src={getProjectImage(selected)} alt={selected.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white
                           flex items-center justify-center hover:bg-black/60 transition-colors font-bold text-sm">
                ✕
              </button>
            </div>
            <div className="p-6 md:p-8">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 mb-3">
                {typeof selected.category === 'string' ? selected.category : selected.category?.title}

              </span>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-dark, #000000)', fontFamily: "'Playfair Display', serif" }}
              >
                {selected.title ?? selected.name}
              </h3>
              <p className="text-xs text-gray-400 mb-4 font-medium">📍 {selected.location}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{selected.description}</p>
              <div className="mt-6 flex gap-4">
                <button
                  className="flex-1 text-center text-white font-semibold text-xs px-6 py-3.5 rounded-full uppercase tracking-wider 
                             transition-all duration-300 shadow-md hover:brightness-110 active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary, #1a237e), #0288D1)' }}
                >
                  Book Now
                </button>
                <button className="flex-1 text-center text-gray-700 border border-gray-200 font-semibold text-xs px-6 py-3.5 rounded-full uppercase tracking-wider hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;