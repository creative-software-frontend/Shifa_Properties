import React from 'react';
import AboutSection from '../components/sections/AboutSection';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import heroImg from '../assets/image/6fa3ef6e-c22d-45b6-a859-b2108f8af13c.jfif';
import { Counter } from '../components/ui/Counter';
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';
import { useOurMissionList } from '../hooks/useOurMissionList';
import { useFloatingStats } from '../hooks/useFloatingStats';

import {
  Award,
  TrendingUp,
  ShieldCheck,
  Users,
  Compass,
  Flag,
  Check,
} from 'lucide-react';

const MISSION_ICONS = [Award, TrendingUp, ShieldCheck, Users, Compass, Flag];
const MISSION_ICON_COLORS = ['#C9A84C', '#0288D1', '#1a237e', '#C9A84C', '#0288D1', '#1a237e'];

const FALLBACK_STATS = [
  { value: '10+', labelKey: 0 as const },
  { value: '5000+', labelKey: 1 as const },
  { value: '15+', labelKey: 2 as const },
  { value: '3', labelKey: 3 as const },
];

const FALLBACK_MISSIONS = [
  {
    icon: Award,
    color: '#C9A84C',
    title: { en: 'Quality First', bn: 'গুণগত মান প্রথমে' },
    body: {
      en: 'Ensure high quality products with the most modern & innovative concepts.',
      bn: 'সবচেয়ে আধুনিক এবং উদ্ভাবনী ধারণার সাথে উচ্চ মানের পণ্য নিশ্চিত করা।',
    },
  },
  {
    icon: TrendingUp,
    color: '#0288D1',
    title: { en: 'Economic Growth', bn: 'অর্থনৈতিক প্রবৃদ্ধি' },
    body: {
      en: 'Grow the economy by reducing poverty & unemployment across Bangladesh.',
      bn: 'বাংলাদেশ জুড়ে দারিদ্র্য ও বেকারত্ব হ্রাস করে অর্থনীতি বৃদ্ধি করা।',
    },
  },
  {
    icon: ShieldCheck,
    color: '#1a237e',
    title: { en: 'Safe Investment', bn: 'নিরাপদ বিনিয়োগ' },
    body: {
      en: 'Create tension-free sources of income by providing guaranteed & safe investment returns.',
      bn: 'নিশ্চিত এবং নিরাপদ বিনিয়োগ আয়ের মাধ্যমে চিন্তামুক্ত আয়ের উৎস তৈরি করা।',
    },
  },
  {
    icon: Users,
    color: '#C9A84C',
    title: { en: 'Client Priority', bn: 'ক্লায়েন্ট অগ্রাধিকার' },
    body: {
      en: 'Give the highest priority and ensure the best service to all our valued clients.',
      bn: 'আমাদের সকল সম্মানিত ক্লায়েন্টকে সর্বোচ্চ অগ্রাধিকার দেওয়া এবং সেরা সেবা নিশ্চিত করা।',
    },
  },
  {
    icon: Compass,
    color: '#0288D1',
    title: { en: 'Tourism Vision', bn: 'পর্যটন ভিশন' },
    body: {
      en: 'Make Bangladesh one of the top tourism destinations in the world.',
      bn: 'বাংলাদেশকে বিশ্বের শীর্ষ পর্যটন গন্তব্যগুলোর একটিতে পরিণত করা।',
    },
  },
  {
    icon: Flag,
    color: '#1a237e',
    title: { en: 'National Pride', bn: 'জাতীয় গর্ব' },
    body: {
      en: 'Make the nation prestigious & wealthy through excellence in hospitality.',
      bn: 'আতিথেয়তায় উৎকর্ষের মাধ্যমে জাতিকে মর্যাদাপূর্ণ ও সমৃদ্ধ করা।',
    },
  },
];

const AboutPage: React.FC = () => {
  const { lang } = useLanguage();
  const {
    missions,
    loading: missionsLoading,
    error: missionsError,
    refetch: refetchMissions,
  } = useOurMissionList();
  const { stats: floatingStats, loading: statsLoading } = useFloatingStats();

  const displayStats = floatingStats
    ? [
        { value: floatingStats.years, labelKey: 0 as const },
        { value: floatingStats.investors, labelKey: 1 as const },
        { value: floatingStats.project, labelKey: 2 as const },
        { value: '3', labelKey: 3 as const },
      ]
    : FALLBACK_STATS;

  const trustInvestors = floatingStats?.investors || '5,000+';

  return (
    <PageTransition id="about-page">
      <main className="pt-24 bg-slate-50">
        <PageHero
          title={pick(UI.pageHero.about.title, lang)}
          subtitle={pick(UI.pageHero.about.subtitle, lang)}
          imageSrc={heroImg}
        />

        <AboutSection />

        {/* Strategic Outlook + Floating Stats (from /floating-list) */}
        <section className="relative py-16 overflow-hidden bg-[#f8f9fc]">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a237e]/5 skew-x-12 -mr-20" />

          <div className="gs-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block py-1 px-3 mb-4 text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
                  {lang === 'EN' ? 'Strategic Outlook' : 'কৌশলগত দৃষ্টিভঙ্গি'}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a237e] mb-8 leading-tight">
                  {lang === 'EN' ? (
                    <>
                      Redefining the Future of{' '}
                      <span className="text-[#0288D1]">Sustainable Living</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#0288D1]">টেকসই জীবনযাপনের</span> ভবিষ্যৎ
                      পুনর্নির্ধারণ
                    </>
                  )}
                </h2>

                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    {lang === 'EN' ? (
                      <>
                        We don’t just build properties; we craft ecosystems. Shifa Properties Ltd
                        Group is committed to transcending traditional real estate by integrating{' '}
                        <strong className="text-[#1a237e]">halal-certified investment models</strong>{' '}
                        with world-class hospitality standards.
                      </>
                    ) : (
                      <>
                        আমরা কেবল সম্পত্তি তৈরি করি না; আমরা ইকোসিস্টেম তৈরি করি। শিফা প্রপার্টিজ
                        লিমিটেড গ্রুপ বিশ্বমানের আতিথেয়তার মানগুলোর সাথে{' '}
                        <strong className="text-[#1a237e]">হালাল-প্রত্যয়িত বিনিয়োগ মডেল</strong>{' '}
                        যুক্ত করে ঐতিহ্যবাহী রিয়েল এস্টেটকে ছাড়িয়ে যেতে প্রতিশ্রুতিবদ্ধ।
                      </>
                    )}
                  </p>
                  <p>
                    {lang === 'EN'
                      ? 'Our vision is to empower thousands of families by bridging the gap between luxury lifestyle aspirations and reliable, long-term financial security.'
                      : 'বিলাসবহুল জীবনযাপনের আকাঙ্ক্ষা এবং নির্ভরযোগ্য, দীর্ঘমেয়াদী আর্থিক সুরক্ষার মধ্যে ব্যবধান দূর করে হাজার হাজার পরিবারকে ক্ষমতায়িত করাই আমাদের ভিশন।'}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-4">
                  {statsLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-pulse"
                        >
                          <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
                          <div className="h-3 w-24 bg-gray-100 rounded" />
                        </div>
                      ))
                    : displayStats.map((stat, index) => (
                        <div
                          key={index}
                          className="group relative p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300"
                        >
                          <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                          </div>
                          <h3 className="text-3xl font-black text-[#1a237e] mb-1">
                            <Counter value={stat.value} />
                          </h3>
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-[#1a237e] transition-colors">
                            {pick(UI.stats[stat.labelKey], lang)}
                          </p>
                        </div>
                      ))}
                </div>

                <div className="mt-8 p-4 bg-[#1a237e] rounded-xl text-white flex items-center gap-4 shadow-lg shadow-blue-900/10">
                  <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/20 text-[#C9A84C]">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-medium">
                    {lang === 'EN'
                      ? `Trusted by ${trustInvestors} investors globally for excellence and integrity.`
                      : `উৎকর্ষতা এবং সততার জন্য বিশ্বব্যাপী ${trustInvestors} বিনিয়োগকারীর দ্বারা বিশ্বস্ত।`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <div className="gs-section pt-10 pb-16 bg-white">
          <div className="gs-container">
            <div className="text-center mb-12">
              <span className="section-label">
                {lang === 'EN' ? 'Our Direction' : 'আমাদের দিকনির্দেশনা'}
              </span>
              <h2 className="section-title text-black">
                {lang === 'EN' ? 'Our Mission' : 'আমাদের লক্ষ্য'}
              </h2>
            </div>
            {missionsError && (
              <div className="mb-8 text-center py-4 px-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm">
                <p>{missionsError}</p>
                <button
                  type="button"
                  onClick={() => refetchMissions()}
                  className="mt-2 text-xs font-bold uppercase tracking-wider underline"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="gs-card p-6 min-h-[160px] rounded-xl bg-neutral-200 animate-pulse"
                  />
                ))
              ) : missions.length > 0 ? (
                missions.map((m, i) => {
                  const Icon = MISSION_ICONS[i % MISSION_ICONS.length];
                  const color = MISSION_ICON_COLORS[i % MISSION_ICON_COLORS.length];
                  return (
                    <div
                      key={m.id}
                      className="gs-card p-6 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 group border border-slate-100 rounded-xl bg-white"
                    >
                      <div className="p-3 bg-slate-50 w-fit rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-100">
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <h3 className="font-black text-sm mb-2 text-black">{m.title}</h3>
                      <p className="text-gray-800 text-xs leading-relaxed">{m.description}</p>
                    </div>
                  );
                })
              ) : (
                FALLBACK_MISSIONS.map((m, i) => (
                  <div
                    key={i}
                    className="gs-card p-6 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 group border border-slate-100 rounded-xl bg-white"
                  >
                    <div className="p-3 bg-slate-50 w-fit rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-100">
                      <m.icon className="w-6 h-6" style={{ color: m.color }} />
                    </div>
                    <h3 className="font-black text-sm mb-2 text-black">{pick(m.title, lang)}</h3>
                    <p className="text-gray-800 text-xs leading-relaxed">{pick(m.body, lang)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default AboutPage;
