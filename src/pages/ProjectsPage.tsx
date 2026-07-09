import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';

type Filter = 'All' | 'Hotel' | 'Apartment' | 'Land';

const FILTERS: { value: Filter; label: { en: string; bn: string } }[] = [
  { value: 'All', label: { en: 'All', bn: 'সব' } },
  { value: 'Hotel', label: { en: 'Hotel', bn: 'হোটেল' } },
  { value: 'Apartment', label: { en: 'Apartment', bn: 'অ্যাপার্টমেন্ট' } },
  { value: 'Land', label: { en: 'Land', bn: 'জমি' } },
];

const ProjectsPage: React.FC = () => {

  const { lang } = useLanguage();

  const pick = (obj: { en: string; bn: string }) =>
    lang === 'EN' ? obj.en : obj.bn;

  const navigate = useNavigate();

  const { projects, loading } = useProjects();

  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const [selected, setSelected] = useState<Project | null>(null);


  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(
        (project) =>
          project.category?.title === activeFilter
      );


  return (
    <PageTransition id="projects-page">

      <main className="min-h-screen pt-28 pb-20 bg-white">

        <div className="gs-container max-w-7xl mx-auto px-4">


          {/* HEADER */}

          <div className="text-center mb-14">

            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-1"
              style={{ color: 'var(--color-primary, #C9A84C)' }}
            >
              Our Portfolio
            </span>


            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--color-dark, #000000)'
              }}
            >
              All Shifa Properties Ltd Projects
            </h1>


            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed mt-4">

              Explore our full portfolio of world-class hospitality and real estate developments across Bangladesh's most sought-after destinations.

            </p>

          </div>



          {/* FILTER */}

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">

            {FILTERS.map((filter)=>(

              <button

                key={filter.value}

                onClick={() => setActiveFilter(filter.value)}

                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300

                ${
                  activeFilter === filter.value
                  ?
                  'text-white shadow-md scale-105'
                  :
                  'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}

                style={
                  activeFilter === filter.value
                  ?
                  {
                    background:
                    'linear-gradient(135deg,var(--color-primary,#1a237e),#0288D1)'
                  }
                  :
                  {}
                }

              >

                {pick(filter.label)}

              </button>

            ))}

          </div>




          {/* LOADING */}

          {loading && (

            <div className="text-center py-20 text-gray-400">

              Loading projects...

            </div>

          )}




          {/* PROJECT GRID */}

          {!loading && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


            {filtered.map((project,idx)=>(


              <div

                key={project.id}

                className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group select-none animate-fade-up"

                style={{
                  animationDelay:`${idx*0.1}s`,
                  boxShadow:'var(--shadow-card)'
                }}

                onClick={()=>setSelected(project)}

              >


                <div className="relative h-64 overflow-hidden">


                  <img

                    src={project.image || ''}

                    alt={project.title}

                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"

                  />



                  <div className="absolute top-4 left-4">

                    <span

                      className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white"

                      style={{
                        background:'rgba(26,35,126,0.85)'
                      }}

                    >

                      {project.category?.title}

                    </span>


                  </div>


                </div>




                <div className="p-6">


                  <h3

                    className="font-bold text-lg"

                    style={{
                      color:'var(--color-dark,#000000)',
                      fontFamily:"'Playfair Display', serif"
                    }}

                  >

                    {project.title}

                  </h3>



                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3 font-medium">

                    <span>📍</span>

                    <span>{project.location}</span>

                  </div>



                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">

                    {project.description}

                  </p>



                  <button

                    className="text-xs font-bold tracking-wider uppercase text-[#C9A84C]"

                  >

                    View Details →

                  </button>



                </div>


              </div>


            ))}


          </div>

          )}





          {/* EMPTY */}

          {!loading && filtered.length === 0 && (

            <div className="text-center py-20">

              <p className="text-gray-400">

                No projects found.

              </p>

            </div>

          )}






          {/* CTA */}

          <div
            className="mt-20 p-8 md:p-12 rounded-3xl text-center shadow-card-lg"
            style={{
              background:
              'linear-gradient(135deg,var(--color-primary,#1a237e) 0%,#0288D1 100%)'
            }}
          >

            <h2 className="text-white font-bold text-2xl md:text-3xl mb-4">

              Own a Premium Hotel Suite or Property

            </h2>


            <button

              onClick={()=>navigate('/send-message')}

              className="inline-block text-white bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-xs px-8 py-3.5 rounded-full uppercase"

            >

              BOOK NOW →

            </button>


          </div>




        </div>






        {/* MODAL */}


        {selected && (

        <div

          className="fixed inset-0 z-50 flex items-center justify-center p-4"

          style={{
            background:'rgba(0,0,0,0.65)'
          }}

          onClick={()=>setSelected(null)}

        >


          <div

            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full"

            onClick={(e)=>e.stopPropagation()}

          >


            <img

              src={selected.image || ''}

              alt={selected.title}

              className="w-full h-64 object-cover"

            />


            <div className="p-6">


              <h3 className="text-2xl font-bold mb-2">

                {selected.title}

              </h3>


              <p className="text-gray-400">

                📍 {selected.location}

              </p>


              <p className="text-gray-500 mt-4">

                {selected.description}

              </p>


              <button

                onClick={()=>setSelected(null)}

                className="mt-6 px-6 py-3 rounded-full border"

              >

                Close

              </button>


            </div>


          </div>


        </div>

        )}


      </main>


    </PageTransition>
  );
};


export default ProjectsPage;