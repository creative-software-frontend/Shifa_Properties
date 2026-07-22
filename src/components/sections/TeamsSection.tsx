import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import { useTeamList } from '../../hooks/useTeamList';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const FALLBACK_MEMBERS = [
  {
    id: 1,
    name: 'Md. Moniruzzaman',
    designation: 'Director',
    description: 'Leading strategic growth and investment excellence.',
    photoUrl:
      'https://ui-avatars.com/api/?name=Md+Moniruzzaman&background=1a237e&color=fff&size=160&bold=true',
  },
  {
    id: 2,
    name: 'Kazi Md. Zia Uddin',
    designation: 'Director',
    description: 'Driving operational excellence across projects.',
    photoUrl:
      'https://ui-avatars.com/api/?name=Kazi+Zia&background=C9A84C&color=fff&size=160&bold=true',
  },
  {
    id: 3,
    name: 'Md. Mehedi Hasan Emon',
    designation: 'Director',
    description: 'Focused on client success and hospitality standards.',
    photoUrl:
      'https://ui-avatars.com/api/?name=Mehedi+Emon&background=0288D1&color=fff&size=160&bold=true',
  },
];

const TeamsSection: React.FC = () => {
  const { lang } = useLanguage();
  const { members, loading, error, refetch } = useTeamList();

  const displayMembers =
    members.length > 0
      ? members
      : FALLBACK_MEMBERS.map((m) => ({
          ...m,
          photo: '',
        }));

  return (
    <div id="teams" className="gs-section py-16 bg-white">
      <div className="gs-container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span
            className="inline-block text-[11px] font-bold tracking-[0.24em] uppercase mb-3"
            style={{ color: 'var(--color-primary, #1a237e)' }}
          >
            {pick(UI.team.label, lang)}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a1546] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pick(UI.team.title, lang)}
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            {pick(UI.team.subtitle, lang)}
          </p>
        </motion.div>

        {error && (
          <div className="mb-8 text-center py-4 px-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 text-xs font-bold uppercase tracking-wider underline"
            >
              Try again
            </button>
          </div>
        )}

        <motion.div
          key={loading ? 'loading' : `data-${displayMembers.length}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 text-center bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-pulse min-h-[260px]"
                >
                  <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-slate-100" />
                  <div className="h-4 w-32 mx-auto bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-20 mx-auto bg-slate-100 rounded mb-3" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                </div>
              ))
            : displayMembers.map((member) => (
                <motion.div
                  key={member.id}
                  id={`team-member-${member.id}`}
                  variants={fadeInUp}
                  className="group relative p-7 text-center bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(26,35,126,0.12)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(90deg, #1a237e, #0288D1, #C9A84C)' }}
                  />
                  <div className="relative w-28 h-28 mx-auto mb-5">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,35,126,0.15), rgba(201,168,76,0.25))',
                        transform: 'scale(1.08)',
                      }}
                    />
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="relative w-28 h-28 rounded-full object-cover border-[3px] border-white shadow-md transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a237e&color=fff&size=160&bold=true`;
                      }}
                    />
                  </div>

                  <h3
                    className="font-bold text-lg mb-1 text-[#0a1546]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3 text-[#C9A84C]">
                    {member.designation}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamsSection;
