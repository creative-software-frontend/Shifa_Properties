import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight, X, UploadCloud, Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react';
import groupImg from '../assets/image/6fa3ef6e-c22d-45b6-a859-b2108f8af13c.jfif';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { useJobs, type Job } from '../hooks/useJobs';
import api from '../utils/api';

// Architectural Fluid Floating Keyframe Constants
const fluidFloatVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    x: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const secondaryFloatVariants: Variants = {
  animate: {
    y: [0, 12, 0],
    x: [0, -6, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const CareerPage: React.FC = () => {
  const { lang } = useLanguage();
  const pick = (obj: { en: string; bn: string } | string) => {
    if (typeof obj === 'string') return obj;
    return lang === 'EN' ? obj.en : obj.bn;
  };

  const { jobs: JOBS_LIST, loading: jobsLoading, error: jobsError, refetch: refetchJobs } = useJobs();

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    if (Number.isNaN(date.getTime())) return deadline;
    return date.toLocaleDateString(lang === 'EN' ? 'en-US' : 'bn-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Application Form Core Logic State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');
  void formErrorMessage;












  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setIsDrawerOpen(true);
    // Preserve existing UX behavior.
    if (typeof document !== 'undefined') {
      void (document.body.style.overflow = 'hidden');

    }


  };



  const closeDrawer = () => {
    setIsDrawerOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
    setTimeout(() => {
      setSelectedJob(null);
      setSelectedFile(null);
      setSubmitSuccess(false);
      setSubmitMessage('');
      setFormErrorMessage('');
    }, 400);
  };


  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Modern Dynamic Form Submission API Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJob) return;
    if (!selectedFile) return;

    setIsSubmitting(true);
    setSubmitMessage('');


    try {
      const formEl = e.currentTarget;

      const formData = new FormData();
      formData.append('id', String(selectedJob.id));

      const fullName = formEl.querySelector<HTMLInputElement>('input[type="text"]');
      const email = formEl.querySelector<HTMLInputElement>('input[type="email"]');
      const phone = formEl.querySelector<HTMLInputElement>('input[type="tel"]');
      const coverLetter = formEl.querySelector<HTMLTextAreaElement>('textarea');

      formData.append('full_name', fullName?.value ?? '');
      formData.append('email', email?.value ?? '');
      formData.append('phone', phone?.value ?? '');
      formData.append('cover_letter', coverLetter?.value ?? '');
      formData.append('resume', selectedFile);
      formData.append('resume_name', selectedFile.name);

      type LaravelErrors = Record<string, string[] | string>;
      type ApplicationResponse = {
        success?: boolean;
        message?: string;
        errors?: LaravelErrors;
      };

      const { data } = await api.post<ApplicationResponse>('/job-applications', formData);

      const successMsg = data?.message ? String(data.message) : '';
      setSubmitMessage(successMsg);
      setSubmitSuccess(true);

    } catch (err) {
      type LaravelErrors = Record<string, string[] | string>;
      type ApplicationErrorResponse = {
        message?: string;
        errors?: LaravelErrors;
      };

      let msg = 'Request failed';
      if (axios.isAxiosError<ApplicationErrorResponse>(err)) {
        const resData = err.response?.data;
        const errors = resData?.errors;
        let firstMsg = '';
        if (errors && typeof errors === 'object') {
          const firstKey = Object.keys(errors)[0];
          const val = errors[firstKey];
          if (Array.isArray(val) && val.length > 0) firstMsg = String(val[0]);
          else if (typeof val === 'string') firstMsg = val;
        }
        msg = firstMsg || resData?.message || (err.response?.status === 429 ? 'Too many requests. Please wait a moment and try again.' : err.message);
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setFormErrorMessage(msg);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <PageTransition>
      <main id="career-page" className="pt-24 bg-[var(--color-light)]">

        {/* ── 1. WE ARE HIRING HERO BANNER ───────────────────────────────── */}
        <PageHero
          title={lang === 'EN' ? "WE ARE HIRING" : "আমরা নিয়োগ দিচ্ছি"}
          subtitle={lang === 'EN' ? "Build Your Future with Shifa Properties Ltd Group" : "শিফা প্রপার্টিজ লিমিটেড গ্রুপের সাথে আপনার ভবিষ্যৎ গড়ুন"}
          imageSrc={groupImg}
        />

        {/* ── 2. FIND YOUR OPPORTUNITY SECTION ───────────────────────────── */}
        <section className="gs-section relative overflow-hidden">
          {/* Animated floating organic visual blur frames */}
          <motion.div
            variants={fluidFloatVariants}
            animate="animate"
            className="absolute -top-20 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            variants={secondaryFloatVariants}
            animate="animate"
            className="absolute bottom-10 -left-10 w-56 h-56 bg-[var(--color-secondary)]/15 rounded-full blur-2xl pointer-events-none"
          />

          <div className="gs-container relative z-10">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-card-lg border border-white flex flex-col lg:flex-row gap-12 items-center">
              {/* Left — Text */}
              <div className="flex-1 space-y-6">
                <h2 className="section-title text-2xl md:text-4xl leading-tight">
                  {lang === 'EN' ? "Find Your Opportunity with Shifa Properties Ltd Group" : "শিফা প্রপার্টিজ লিমিটেড গ্রুপে আপনার সুযোগ খুঁজুন"}
                </h2>
                <div className="gold-divider" />
                <p className="text-[var(--color-gray)] text-sm md:text-base leading-relaxed">
                  {lang === 'EN' ?
                    "Shifa Properties Ltd is a leading real estate/property developer company in Bangladesh. Established in 2016 and with an experience of more than 3 decades, Shifa Properties Ltd has garnered the reputation of a branded company who values hard work, honesty, talent and passion for work. Our vision is to build a world class organization and for that we are constantly on the lookout for talented people who want to build their career in one of the leading companies in the country."
                    :
                    "শিফা প্রপার্টিজ লিমিটেড বাংলাদেশের একটি শীর্ষস্থানীয় রিয়েল এস্টেট/প্রপার্টি ডেভেলপার কোম্পানি। ২০১৬ সালে প্রতিষ্ঠিত এবং ৩ দশকেরও বেশি অভিজ্ঞতার সাথে, শিফা প্রপার্টিজ লিমিটেড এমন একটি ব্র্যান্ডেড কোম্পানির খ্যাতি অর্জন করেছে যা কঠোর পরিশ্রম, সততা, প্রতিভা এবং কাজের প্রতি আবেগকে মূল্য দেয়। আমাদের লক্ষ্য একটি বিশ্বমানের সংস্থা গড়ে তোলা এবং এর জন্য আমরা প্রতিনিয়ত প্রতিভাবান ব্যক্তিদের খুঁজছি যারা দেশের অন্যতম শীর্ষস্থানীয় কোম্পানিতে তাদের ক্যারিয়ার গড়তে চান।"
                  }
                </p>
                <a
                  href="#jobs-list"
                  className="btn-primary inline-flex mt-4"
                >
                  {lang === 'EN' ? "Explore Openings" : "খালি পদগুলো দেখুন"} <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Right — Floating Container Photo Card frame */}
              <motion.div
                variants={fluidFloatVariants}
                animate="animate"
                className="flex-1 w-full max-w-lg relative group"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] relative z-10 bg-white">
                  <img
                    src={groupImg}
                    alt="Shifa Properties Ltd Employees Workspace View"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                {/* Decorative floating dots behind image */}
                <div className="absolute -bottom-6 -right-6 text-[var(--color-secondary)] opacity-40 text-6xl tracking-widest leading-none z-0 select-none pointer-events-none">
                  ..........<br />..........<br />..........
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. JOBS LISTING TABLE ──────────────────────────────────────── */}
        <section id="jobs-list" className="gs-section pt-0 relative z-10">
          <div className="gs-container">
            <div className="mb-10 text-center">
              <span className="section-label">{lang === 'EN' ? 'Current Openings' : 'বর্তমান খালি পদ'}</span>
              <h2 className="section-title text-3xl">{lang === 'EN' ? 'Join Our Team' : 'আমাদের দলে যোগ দিন'}</h2>
            </div>

            <div className="bg-white rounded-[var(--radius-lg)] shadow-card border border-gray-100 overflow-hidden">
              {/* Header (Hidden on Mobile, Grid on Desktop) */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 bg-sky-50/60 border-b border-gray-100 px-8 py-5 text-sm font-bold tracking-wider uppercase text-[var(--color-primary)]">
                <div className="col-span-4">{lang === 'EN' ? 'Role' : 'পদবী'}</div>
                <div className="col-span-3">{lang === 'EN' ? 'Department' : 'বিভাগ'}</div>
                <div className="col-span-2">{lang === 'EN' ? 'Deadline' : 'শেষ তারিখ'}</div>
                <div className="col-span-1">{lang === 'EN' ? 'Status' : 'অবস্থা'}</div>
                <div className="col-span-2 text-right">{lang === 'EN' ? 'Action' : 'পদক্ষেপ'}</div>
              </div>

              {/* Loading state */}
              {jobsLoading && (
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="px-6 md:px-8 py-6">
                      <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse mb-2" />
                      <div className="h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error state */}
              {!jobsLoading && jobsError && (
                <div className="text-center py-14 px-6">
                  <p className="text-rose-600 font-medium">
                    {lang === 'EN' ? 'Unable to load job openings.' : 'চাকরির তালিকা লোড করা যায়নি।'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{jobsError}</p>
                  <button
                    type="button"
                    onClick={() => refetchJobs()}
                    className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors"
                  >
                    {lang === 'EN' ? 'Try again' : 'আবার চেষ্টা করুন'}
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!jobsLoading && !jobsError && JOBS_LIST.length === 0 && (
                <div className="text-center py-14 px-6">
                  <p className="text-[var(--color-gray)]">
                    {lang === 'EN' ? 'No open positions right now. Please check back soon.' : 'এই মুহূর্তে কোনো খালি পদ নেই। শীঘ্রই আবার দেখুন।'}
                  </p>
                </div>
              )}

              {/* Rows (Card on Mobile, Row on Desktop Layout) */}
              {!jobsLoading && !jobsError && JOBS_LIST.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {JOBS_LIST.map((job) => (
                    <div
                      key={job.id}
                      className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 md:items-center px-6 md:px-8 py-5 md:py-6 hover:bg-sky-50/20 transition-all duration-300 group"
                    >
                      {/* Role & Adaptive Typography Controls */}
                      <div className="col-span-4 flex flex-col gap-0.5">
                        <div className="font-bold text-[var(--color-dark)] text-base sm:text-lg tracking-tight group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 md:line-clamp-none">
                          {pick(job.role)}
                        </div>
                        <div className="md:hidden flex items-center text-xs sm:text-sm text-[var(--color-gray)] gap-1 mt-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {pick(job.department)}
                        </div>
                        <div className="flex items-center text-xs text-[var(--color-gray)] gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)]" /> {pick(job.location)}
                        </div>
                      </div>

                      {/* Department Desktop */}
                      <div className="hidden md:flex col-span-3 items-center text-sm font-medium text-[var(--color-gray)]">
                        <Briefcase className="w-4 h-4 mr-2 text-[var(--color-accent)]/80 flex-shrink-0" /> {pick(job.department)}
                      </div>

                      {/* Deadline Desktop/Mobile */}
                      <div className="col-span-2 flex items-center text-xs sm:text-sm text-[var(--color-gray)] md:font-medium mt-1 md:mt-0">
                        <Clock className="w-4 h-4 mr-2 text-rose-400 flex-shrink-0" /> {formatDeadline(job.deadline)}
                      </div>

                      {/* Status */}
                      <div className="col-span-1 flex items-center mt-1 md:mt-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {job.status === 'active' ? (lang === 'EN' ? 'Active' : 'সক্রিয়') : job.status}
                        </span>
                      </div>

                      {/* Action Apply Trigger Button */}
                      <div className="col-span-2 flex justify-start md:justify-end mt-3 md:mt-0">
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="group/btn relative w-full md:w-auto inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-[var(--color-accent)] px-5 py-2 text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
                        >
                          <span className="font-bold text-xs tracking-wide whitespace-nowrap">
                            {lang === 'EN' ? 'Apply Now' : 'আবেদন করুন'}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. ACTION CARDS (UPLOAD CV & LINKEDIN) ────────────────────── */}
        <section className="gs-section bg-white">
          <div className="gs-container grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Upload CV */}
            <div className="gs-card p-10 border-2 border-dashed border-sky-100 hover:border-[var(--color-secondary)] flex flex-col items-center text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center text-[var(--color-accent)] text-3xl">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="font-extrabold text-2xl text-[var(--color-primary)]">
                {lang === 'EN' ? 'General Submission' : 'সাধারণ আবেদন'}
              </h3>
              <p className="text-[var(--color-gray)] text-base max-w-sm">
                {lang === 'EN' ? "Don't see a matching role? Upload your CV and our HR will be in touch with you." : "উপযুক্ত পদ পাননি? আপনার সিভি আপলোড করুন এবং আমাদের এইচআর আপনার সাথে যোগাযোগ করবে।"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                {selectedFile ? (lang === 'EN' ? 'CV Selected ✓' : 'সিভি নির্বাচিত ✓') : (lang === 'EN' ? 'Upload CV' : 'সিভি আপলোড করুন')}
              </button>
            </div>

            {/* Card 2 — LinkedIn */}
            <div className="gs-card p-10 border-2 border-dashed border-sky-100 hover:border-[var(--color-primary)] flex flex-col items-center text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center text-[#0A66C2] text-4xl font-black">
                in
              </div>
              <h3 className="font-extrabold text-2xl text-[var(--color-primary)]">
                {lang === 'EN' ? 'Follow us on LinkedIn' : 'লিংকডইনে আমাদের অনুসরণ করুন'}
              </h3>
              <p className="text-[var(--color-gray)] text-base max-w-sm">
                {lang === 'EN' ? 'Stay connected with us and our latest news by connecting on LinkedIn.' : 'লিংকডইনে যুক্ত হয়ে আমাদের এবং আমাদের সর্বশেষ খবরের সাথে সংযুক্ত থাকুন।'}
              </p>
              <a
                href="https://www.linkedin.com/company/shifa-properties-ltd-group"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {lang === 'EN' ? 'Follow Us' : 'অনুসরণ করুন'}
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── SIDE DRAWER WITH TRANSACTIONAL STATE LOGIC ── */}
      <AnimatePresence>
        {isDrawerOpen && selectedJob && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-[var(--color-primary)]/40 backdrop-blur-sm z-[100]"
            />

            {/* Drawer Sliding Context Frame Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.9 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] overflow-y-auto flex flex-col"
            >
              {/* Header Box wrapper layout */}
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-start justify-between bg-sky-50/50">
                <div className="pr-4">
                  <span className="gs-badge mb-2.5 inline-block">
                    {lang === 'EN' ? 'Job Application' : 'চাকরির আবেদন'}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)] leading-snug">
                    {pick(selectedJob.role)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-[var(--color-gray)] font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)]" /> {pick(selectedJob.location)}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {pick(selectedJob.department)}</span>
                  </div>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors shadow-sm flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Transactional Logic View Switching Block */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                {!submitSuccess ? (
                  /* Form Input View State */
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                          {lang === 'EN' ? 'Full Name' : 'পুরো নাম'} *
                        </label>
                        <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all outline-none text-sm" placeholder="John Doe" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                          {lang === 'EN' ? 'Email Address' : 'ইমেইল ঠিকানা'} *
                        </label>
                        <input required type="email" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all outline-none text-sm" placeholder="john@example.com" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                          {lang === 'EN' ? 'Phone Number' : 'ফোন নম্বর'} *
                        </label>
                        <input required type="tel" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all outline-none text-sm" placeholder="+880 1XXX XXXXXX" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                          {lang === 'EN' ? 'Upload Resume (PDF/DOC)' : 'জীবনবৃত্তান্ত আপলোড করুন (PDF/DOC)'} *
                        </label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[var(--color-accent)] hover:bg-sky-50/40 transition-all bg-gray-50/50"
                        >
                          <UploadCloud className="w-7 h-7 text-gray-400" />
                          <span className="text-xs text-gray-500 font-semibold text-center max-w-xs truncate px-2">
                            {selectedFile ? selectedFile.name : (lang === 'EN' ? 'Click to browse files' : 'ফাইল ব্রাউজ করতে ক্লিক করুন')}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                          {lang === 'EN' ? 'Cover Letter (Optional)' : 'কভার লেটার (ঐচ্ছিক)'}
                        </label>
                        <textarea rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all outline-none text-sm resize-none" placeholder={lang === 'EN' ? "Tell us why you're a great fit..." : "কেন আপনি এই পদের জন্য যোগ্য তা আমাদের জানান..."}></textarea>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary justify-center text-base font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{lang === 'EN' ? 'Sending Application...' : 'আবেদন পাঠানো হচ্ছে...'}</span>
                          </>
                        ) : (
                          <span>{lang === 'EN' ? 'Submit Application' : 'আবেদন জমা দিন'}</span>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-gray-400 mt-2.5">
                        {lang === 'EN' ? 'By submitting, you agree to our processing data storage metrics.' : 'জমা দেওয়ার মাধ্যমে, আপনি আমাদের ডেটা প্রক্রিয়াকরণ নীতিতে সম্মত হন।'}
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Live Success State View Feedback Module */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-4 my-auto"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle className="w-9 h-9" />
                    </div>
                    <h4 className="text-xl font-bold text-[var(--color-primary)]">
                      {lang === 'EN' ? 'Application Transmitted!' : 'আবেদন সফলভাবে পাঠানো হয়েছে!'}
                    </h4>
                    <p className="text-sm text-[var(--color-gray)] max-w-sm leading-relaxed">
                      {submitMessage
                        ? submitMessage
                        : (lang === 'EN'
                          ? 'Thank you for your interest. Shifa Properties Ltd acquisition unit has cataloged your resume and credentials successfully.'
                          : 'আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। শিফা প্রপার্টিজ লিমিটেডের নিয়োগকারী দল আপনার জীবনবৃত্তান্ত সফলভাবে সংরক্ষণ করেছে।'
                        )}
                    </p>

                    <button
                      onClick={closeDrawer}
                      className="mt-4 text-sm font-bold text-[var(--color-accent)] bg-sky-50 hover:bg-sky-100 px-6 py-2.5 rounded-full transition-colors"
                    >
                      {lang === 'EN' ? 'Back to Job List' : 'খালি পদের তালিকায় ফিরুন'}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default CareerPage;