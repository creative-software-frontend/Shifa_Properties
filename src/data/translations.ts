/**
 * Central EN / BN translations for every section of the site.
 * Usage:  const { t } = useLanguage();   then  t(UI.hero.whoWeAre)
 *
 * Each key maps to  { en: string; bn: string }
 */

export const UI = {

  /* ─── HERO ─────────────────────────────────────────────────────── */
  hero: {
    scrollDown: { en: 'Scroll Down', bn: 'নিচে স্ক্রোল করুন' },
    whoWeAre: { en: 'Who We Are', bn: 'আমরা কারা' },
  },
  heroSlides: [
    {
      badge: { en: 'Shifa Properties Ltd Group', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপ' },
      title: { en: 'Welcome to Our Green Kingdom', bn: 'আমাদের সবুজ রাজ্যে স্বাগতম' },
      subtitle: { en: 'Experience world-class luxury Hotels and investment opportunities along the breathtaking Padma riverside.', bn: 'পদ্মা নদীর ধারে বিশ্বমানের বিলাসবহুল হোটেল এবং বিনিয়োগের সুযোগ অনুভব করুন।' },
      cta: { en: 'Explore Projects', bn: 'প্রকল্প অন্বেষণ করুন' }
    },
    {
      badge: { en: 'Bay Sands', bn: 'বে স্যান্ডস' },
      title: { en: 'Lifetime Halal Income & Facilities', bn: 'আজীবন হালাল আয় ও সুবিধা' },
      subtitle: { en: 'Own a 5-star hotel suite and enjoy lifelong halal returns and world-class amenities.', bn: 'একটি ৫-তারা হোটেল স্যুটের মালিক হোন এবং আজীবন হালাল আয় ও বিশ্বমানের সুযোগ-সুবিধা উপভোগ করুন।' },
      cta: { en: 'Learn More', bn: 'আরও জানুন' }
    },
    {
      badge: { en: 'Padma Grand Hotel', bn: 'পদ্মা গ্র্যান্ড হোটেল' },
      title: { en: 'A Natural Paradise by the Padma', bn: 'পদ্মার তীরে একটি প্রাকৃতিক স্বর্গ' },
      subtitle: { en: 'Situated near the Jazira point of the Padma bridge — recreation and relaxation away from city life.', bn: 'পদ্মা সেতুর জাজিরা পয়েন্টের কাছে অবস্থিত — শহরের জীবন থেকে দূরে বিনোদন এবং বিশ্রাম।' },
      cta: { en: 'Book Now', bn: 'এখনই বুক করুন' }
    }
  ],
  pageHero: {
    about: {
      title: { en: 'ABOUT Shifa Properties Ltd', bn: 'শিফা প্রপার্টিজ লিমিটেড সম্পর্কে' },
      subtitle: { en: "Bangladesh's leading hotel development & investment company", bn: 'বাংলাদেশের শীর্ষ হোটেল উন্নয়ন ও বিনিয়োগ কোম্পানি' },
    },
    contact: {
      label: { en: 'Get In Touch', bn: 'যোগাযোগ করুন' },
      title: { en: 'CONTACT US', bn: 'যোগাযোগ করুন' },
      subtitle: { en: 'Get in touch with Shifa Properties Ltd Group', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সাথে যোগাযোগ করুন' },
    },
    news: {
      label: { en: 'Media & Updates', bn: 'মিডিয়া এবং আপডেট' },
      title: { en: 'Shifa Properties Ltd News Room', bn: 'শিফা প্রপার্টিজ লিমিটেড নিউজ রুম' },
      subtitle: { en: 'The latest news, partnership announcements, project milestones, and corporate updates from Shifa Properties Ltd Group.', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সর্বশেষ সংবাদ, অংশীদারি ঘোষণা, প্রকল্পের মাইলফলক এবং কর্পোরেট আপডেট।' },
    },
    team: {
      title: { en: 'OUR TEAM', bn: 'আমাদের দল' },
      subtitle: { en: 'Meet the leaders behind Shifa Properties Ltd Group', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের নেতৃত্বের সাথে পরিচিত হোন' },
    },
  },
  team: {
    label: { en: 'Leadership', bn: 'নেতৃত্ব' },
    title: { en: 'Our Teams', bn: 'আমাদের দল' },
    subtitle: { en: "Meet the dedicated professionals driving Shifa Properties Ltd Group's vision for world-class hospitality and investment excellence.", bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের বিশ্বমানের আতিথেয়তা ও বিনিয়োগ শ্রেষ্ঠত্বের লক্ষ্যে নিবেদিত পেশাদারদের সাথে পরিচিত হোন।' },
    members: [
      {
        role: { en: 'Managing Director & CEO', bn: 'ব্যবস্থাপনা পরিচালক ও সিইও' },
        description: { en: "Visionary leader with over 15 years of experience in real estate and hotel development, driving Shifa Properties Ltd Group to become Bangladesh's premier investment company.", bn: 'রিয়েল এস্টেট ও হোটেল উন্নয়নে ১৫ বছরেরও বেশি অভিজ্ঞতাসম্পন্ন দূরদর্শী নেতা, যিনি শিফা প্রপার্টিজ লিমিটেড গ্রুপকে বাংলাদেশের শীর্ষ বিনিয়োগ প্রতিষ্ঠানে পরিণত করছেন।' }
      },
      {
        role: { en: 'Chairman & Coordinator', bn: 'চেয়ারম্যান ও সমন্বয়কারী' },
        description: { en: 'Strategic chairman overseeing all major partnerships, including the landmark Best Western Plus hotel development collaboration.', bn: 'কৌশলগত চেয়ারম্যান যিনি বেস্ট ওয়েস্টার্ন প্লাস হোটেল উন্নয়ন সহযোগিতাসহ সকল প্রধান অংশীদারিত্ব তদারকি করেন।' }
      },
      {
        role: { en: 'Principal Advisor', bn: 'প্রধান উপদেষ্টা' },
        description: { en: 'Expert advisor specializing in investment strategy, legal compliance, and ensuring the highest standards of client service.', bn: 'বিনিয়োগ কৌশল, আইনি সম্মতি ও সর্বোচ্চ মানের ক্লায়েন্ট সেবা নিশ্চিতে বিশেষজ্ঞ উপদেষ্টা।' }
      },
      {
        role: { en: 'Senior Investment Advisor', bn: 'জ্যেষ্ঠ বিনিয়োগ উপদেষ্টা' },
        description: { en: 'Leading investor relations and share recuperation programs, building trust with thousands of Bangladeshi investors.', bn: 'বিনিয়োগকারী সম্পর্ক ও শেয়ার পুনরুদ্ধার কার্যক্রম পরিচালনা করে হাজার হাজার বাংলাদেশি বিনিয়োগকারীর বিশ্বাস অর্জন করছেন।' }
      },
      {
        role: { en: 'Business Development Manager', bn: 'ব্যবসায়িক উন্নয়ন ব্যবস্থাপক' },
        description: { en: 'Driving business partnerships and event management, connecting Shifa Properties Ltd with national and international stakeholders.', bn: 'ব্যবসায়িক অংশীদারিত্ব ও ইভেন্ট ম্যানেজমেন্ট পরিচালনা করে শিফা প্রপার্টিজ লিমিটেডকে জাতীয় ও আন্তর্জাতিক স্টেকহোল্ডারদের সাথে সংযুক্ত করছেন।' }
      },
      {
        role: { en: 'Strategic Coordinator', bn: 'কৌশলগত সমন্বয়কারী' },
        description: { en: 'Ensuring seamless operations, hotel registration processes, and stakeholder coordination across all Shifa Properties Ltd projects.', bn: 'সকল শিফা প্রপার্টিজ লিমিটেড প্রকল্পে নিরবচ্ছিন্ন কার্যক্রম, হোটেল নিবন্ধন প্রক্রিয়া ও স্টেকহোল্ডার সমন্বয় নিশ্চিত করছেন।' }
      },
    ],
  },

  /* ─── WHY US PAGE ────────────────────────────────────────────────── */
  whyUs: {
    heroTitle: { en: 'Why Choose US?', bn: 'কেন আমাদের বেছে নেবেন?' },
    
    empower: {
      title: { en: 'Empower Your Business With Our Solutions', bn: 'আমাদের সমাধানের মাধ্যমে আপনার ব্যবসাকে শক্তিশালী করুন' },
      desc: { en: "We're in the business of providing best ITeS services whether you use our simplified products, solutions, or both, we will take care of your business needs.", bn: 'আমরা সেরা আইটিইএস (ITeS) পরিষেবা প্রদানের ব্যবসায় নিয়োজিত। আপনি আমাদের সরলীকৃত পণ্য, সমাধান বা উভয়ই ব্যবহার করুন না কেন, আমরা আপনার ব্যবসায়িক চাহিদার যত্ন নেব।' }
    },
    
    expertise: {
      label: { en: 'Area of our Expertise', bn: 'আমাদের দক্ষতার ক্ষেত্র' },
      title: { en: 'Conduct Admirable Product Management', bn: 'প্রশংসনীয় পণ্য ব্যবস্থাপনা পরিচালনা' },
      badge1: { en: 'Design & provide solution architecture', bn: 'সমাধান আর্কিটেকচার ডিজাইন এবং প্রদান' },
      badge2: { en: 'Consulting & Training', bn: 'পরামর্শ এবং প্রশিক্ষণ' }
    },

    team: {
      desc: { en: 'We are comprised of 30+ Professionals. We develop enterprise applications and provide services for database & cloud technology.', bn: 'আমরা ৩০ জনেরও বেশি পেশাদারদের নিয়ে গঠিত। আমরা এন্টারপ্রাইজ অ্যাপ্লিকেশন তৈরি করি এবং ডাটাবেস ও ক্লাউড প্রযুক্তির জন্য পরিষেবা প্রদান করি।' },
      list: [
        { en: 'Project Manager', bn: 'প্রজেক্ট ম্যানেজার' },
        { en: 'Architect', bn: 'আর্কিটেক্ট' },
        { en: 'Developer', bn: 'ডেভেলপার' },
        { en: 'SQA', bn: 'এসকিউএ (SQA)' },
        { en: 'UI & UX Designer', bn: 'ইউআই এবং ইউএক্স ডিজাইনার' },
        { en: 'Blockchain Experts', bn: 'ব্লকচেইন বিশেষজ্ঞ' },
        { en: 'Consultants', bn: 'পরামর্শক' },
        { en: 'Web designer', bn: 'ওয়েব ডিজাইনার' }
      ]
    },

    detailing: {
      title: { en: 'We Focus on Project detailing', bn: 'আমরা প্রকল্পের পুঙ্খানুপুঙ্খ বিবরণে ফোকাস করি' },
      box1: { en: 'No hidden costs & strong market credibility.', bn: 'কোনো লুকানো খরচ নেই এবং বাজারে শক্তিশালী নির্ভরযোগ্যতা।' },
      box2: { en: 'Our solutions add value to customers.', bn: 'আমাদের সমাধান গ্রাহকদের মূল্য সংযোজন করে।' },
      box3: { en: 'Single point of contact (SPOC).', bn: 'একক যোগাযোগ মাধ্যম (SPOC)।' }
    },

    values: {
      title: { en: 'Our Values', bn: 'আমাদের মূল্যবোধ' },
      items: [
        { title: { en: 'Customer', bn: 'গ্রাহক' }, desc: { en: 'Treat customers, employees and society with integrity and transparency.', bn: 'গ্রাহক, কর্মচারী এবং সমাজকে সততা ও স্বচ্ছতার সাথে মূল্যায়ন করা।' }, isHighlighted: true },
        { title: { en: 'Team Work', bn: 'দলগত কাজ' }, desc: { en: 'We believe that we will be strong if we work as a team, nurturing, encouraging and assisting each other.', bn: 'আমরা বিশ্বাস করি যে আমরা একটি দল হিসাবে কাজ করলে শক্তিশালী হব, একে অপরকে লালন, উত্সাহিত এবং সহায়তা করব।' } },
        { title: { en: 'Community', bn: 'সম্প্রদায়' }, desc: { en: 'We are living and working in a community where we should contribute within our scope and vision.', bn: 'আমরা এমন এক সমাজে বাস ও কাজ করছি যেখানে আমাদের লক্ষ্য ও পরিধির মধ্যে অবদান রাখা উচিত।' } },
        { title: { en: 'Entrepreneurship', bn: 'উদ্যোক্তা' }, desc: { en: 'We believe in entrepreneurship. We encourage our employees to think outside the box and continuously innovate to achieve the goals.', bn: 'আমরা উদ্যোক্তাবৃত্তিতে বিশ্বাস করি। আমরা আমাদের কর্মীদের নতুন কিছু চিন্তা করতে এবং লক্ষ্য অর্জনে ক্রমাগত উদ্ভাবন করতে উত্সাহিত করি।' } },
        { title: { en: 'Partner', bn: 'অংশীদার' }, desc: { en: 'We value their contribution and try to help in achieving their organizational goal within our scope.', bn: 'আমরা তাদের অবদানকে মূল্য দিই এবং আমাদের পরিধির মধ্যে তাদের প্রাতিষ্ঠানিক লক্ষ্য অর্জনে সহায়তা করার চেষ্টা করি।' } },
        { title: { en: 'Employee', bn: 'কর্মচারী' }, desc: { en: 'Establishing an organization based on caring, innovation and quality.', bn: 'যত্ন, উদ্ভাবন এবং গুণমানের উপর ভিত্তি করে একটি প্রতিষ্ঠান প্রতিষ্ঠা করা।' } },
        { title: { en: 'Efficiency', bn: 'দক্ষতা' }, desc: { en: 'Enabling employees to reach their full potential and reward wealth creation.', bn: 'কর্মীদের তাদের পূর্ণ সম্ভাবনায় পৌঁছাতে সক্ষম করা এবং সম্পদ সৃষ্টিতে পুরস্কৃত করা।' } },
        { title: { en: 'Cost-Efficiency', bn: 'ব্যয়-দক্ষতা' }, desc: { en: 'Reducing cost of clients and enhancing performance.', bn: 'ক্লায়েন্টদের খরচ কমানো এবং কর্মক্ষমতা বৃদ্ধি করা।' } }
      ]
    }
  },

  /* ─── SERVICES ──────────────────────────────────────────────────── */
  services: {
    label: { en: 'What We Offer', bn: 'আমরা কী দিই' },
    title: { en: 'Our Investment Categories', bn: 'আমাদের বিনিয়োগ বিভাগ' },
    subtitle: { en: 'Choose from premium hotel suites, modern apartments, and strategic land plots across Bangladesh\'s most coveted destinations.', bn: 'বাংলাদেশের সবচেয়ে আকর্ষণীয় গন্তব্যে প্রিমিয়াম হোটেল সুইট, আধুনিক অ্যাপার্টমেন্ট এবং কৌশলগত জমি বেছে নিন।' },
    learnMore: { en: 'Learn More →', bn: 'আরও জানুন →' },
    visionLabel: { en: 'Our Vision', bn: 'আমাদের লক্ষ্য' },
    visionTitle: { en: 'World-Class Hotels Across Bangladesh', bn: 'বাংলাদেশজুড়ে বিশ্বমানের রিসোর্ট' },
    viewProjects: { en: 'View All Projects', bn: 'সব প্রকল্প দেখুন' },
    serviceItems: {
      hotel: { title: { en: 'Hotel', bn: 'হোটেল' }, desc: { en: 'Premium 5-star hotel suites with guaranteed halal income and world-class hospitality services.', bn: 'নিশ্চিত হালাল আয় এবং বিশ্বমানের আতিথেয়তা সেবা সহ প্রিমিয়াম ৫-তারা হোটেল সুইট।' } },
      apartment: { title: { en: 'Apartment', bn: 'অ্যাপার্টমেন্ট' }, desc: { en: 'Modern luxury apartments designed for comfortable urban living with premium facilities.', bn: 'প্রিমিয়াম সুবিধাসহ আরামদায়ক নগর জীবনযাপনের জন্য আধুনিক বিলাসবহুল অ্যাপার্টমেন্ট।' } },
      land: { title: { en: 'Land', bn: 'জমি' }, desc: { en: 'Strategic land plots in prime locations — Cox\'s Bazar, Kuakata, and Padma riverside.', bn: 'কক্সবাজার, কুয়াকাটা ও পদ্মা তীরে কৌশলগত প্রিমিয়াম জমির প্লট।' } },
    },
  },

  /* ─── ABOUT ─────────────────────────────────────────────────────── */
  about: {
    label: { en: 'Who We Are', bn: 'আমরা কারা' },
    title: { en: 'Bangladesh\'s Leading Hotel Development & Investment Company', bn: 'বাংলাদেশের শীর্ষ হোটেল উন্নয়ন ও বিনিয়োগ কোম্পানি' },
    p1: { en: 'Shifa Properties Ltd Group is Bangladesh\'s number one hotel developer and investment company, shaping the future of hospitality, tourism, and real estate since 2015. Alongside premium hotel projects like Best Western Plus Bay Hills Himchhari, Bay Sands, Bay Marina, and Bay Breeze, we have also developed landmark residential projects, including Amin City Purbachol and Gold City Mawa.', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপ ২০১৫ সাল থেকে বাংলাদেশের এক নম্বর হোটেল ডেভেলপার ও বিনিয়োগ প্রতিষ্ঠান হিসেবে আতিথেয়তা, পর্যটন ও রিয়েল এস্টেটের ভবিষ্যৎ গড়ে তুলছে। বেস্ট ওয়েস্টার্ন প্লাস বে হিলস হিমছড়ি, বে স্যান্ডস, বে মারিনা ও বে ব্রিজের মতো প্রিমিয়াম হোটেল প্রকল্পের পাশাপাশি আমরা আমিন সিটি পূর্বাচল ও গোল্ড সিটি মাওয়ার মতো ল্যান্ডমার্ক আবাসন প্রকল্পও গড়েছি।' },
    p2: { en: 'Driven by quality, innovation, and long-term vision, we create profitable investment opportunities that combine luxury, trust, and sustainable growth. Through legally secured ownership, we make premium property and hotel investments accessible for everyday Bangladeshis.', bn: 'গুণমান, উদ্ভাবন ও দীর্ঘমেয়াদী দৃষ্টিভঙ্গি দ্বারা পরিচালিত, আমরা বিলাস, বিশ্বাস ও টেকসই প্রবৃদ্ধির সমন্বয়ে লাভজনক বিনিয়োগের সুযোগ তৈরি করি। আইনগতভাবে সুরক্ষিত মালিকানার মাধ্যমে আমরা সাধারণ বাংলাদেশীদের জন্য প্রিমিয়াম সম্পত্তি ও হোটেল বিনিয়োগকে সহজলভ্য করে তুলি।' },
    bullets: [
      { en: 'Halal income & lifetime facilities', bn: 'হালাল আয় ও আজীবন সুবিধা' },
      { en: 'International standard hospitality', bn: 'আন্তর্জাতিক মানের আতিথেয়তা' },
      { en: 'Transparent investment process', bn: 'স্বচ্ছ বিনিয়োগ প্রক্রিয়া' },
      { en: 'Strategic prime-location projects', bn: 'কৌশলগত প্রধান অবস্থানে প্রকল্প' },
    ],
    seeProjects: { en: 'See Our Projects', bn: 'আমাদের প্রকল্প দেখুন' },
    years: { en: 'Years', bn: 'বছর' },
    investors: { en: 'Investors', bn: 'বিনিয়োগকারী' },
    projects: { en: 'Projects', bn: 'প্রকল্প' },
    familyLabel: { en: 'Our Family', bn: 'আমাদের পরিবার' },
    familyTitle: { en: 'Shifa Properties Ltd Group Sister Concern', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সহযোগী প্রতিষ্ঠান' },
    sisterConcerns: [
      { name: { en: 'One City Developer Ltd', bn: 'ওয়ান সিটি ডেভেলপার লিমিটেড' }, sub: { en: 'A Trusted Destination for Affordable Land Buying', bn: 'সাশ্রয়ী মূল্যে জমি কেনার বিশ্বস্ত গন্তব্য' } },
      { name: { en: 'Shifa Properties Ltd Project Management', bn: 'শিফা প্রপার্টিজ প্রজেক্ট ম্যানেজমেন্ট' }, sub: { en: 'Comprehensive and efficient project execution', bn: 'ব্যাপক ও দক্ষ প্রকল্প বাস্তবায়ন' } },
      { name: { en: 'Shifa Properties Ltd Properties', bn: 'শিফা প্রপার্টিজ লিমিটেড প্রপার্টিস' }, sub: { en: 'Luxury apartment project in Dhaka', bn: 'ঢাকায় বিলাসবহুল অ্যাপার্টমেন্ট প্রকল্প' } },
      { name: { en: 'Shifa Properties Ltd Hotels and Hotels', bn: 'শিফা প্রপার্টিজ হোটেলস অ্যান্ড রিসোর্টস' }, sub: { en: 'Number one hotel developer company in Bangladesh', bn: 'বাংলাদেশের এক নম্বর হোটেল ডেভেলপার কোম্পানি' } },
    ],
  },

  /* ─── STATS ─────────────────────────────────────────────────────── */
  stats: [
    { en: 'Years Experience', bn: 'বছরের অভিজ্ঞতা' },
    { en: 'Happy Investors', bn: 'সন্তুষ্ট বিনিয়োগকারী' },
    { en: 'Active Projects', bn: 'সক্রিয় প্রকল্প' },
    { en: 'Countries', bn: 'দেশ' },
  ],

  /* ─── PROJECTS PREVIEW ──────────────────────────────────────────── */
  projects: {
    label: { en: 'Our Portfolio', bn: 'আমাদের পোর্টফোলিও' },
    title: { en: 'Our Project Overview', bn: 'আমাদের প্রকল্পের সংক্ষিপ্ত বিবরণ' },
    subtitle: { en: 'Explore our portfolio of world-class hospitality and real estate projects across Bangladesh.', bn: 'বাংলাদেশজুড়ে বিশ্বমানের আতিথেয়তা ও রিয়েল এস্টেট প্রকল্পের আমাদের পোর্টফোলিও অন্বেষণ করুন।' },
    viewDetails: { en: 'View Details →', bn: 'বিস্তারিত দেখুন →' },
    viewAll: { en: 'View All Projects', bn: 'সব প্রকল্প দেখুন' },
    bookNow: { en: 'Book Now', bn: 'এখনই বুক করুন' },
  },

  /* ─── NEWS ──────────────────────────────────────────────────────── */
  news: {
    label: { en: 'Latest Updates', bn: 'সর্বশেষ আপডেট' },
    title: { en: 'News Room', bn: 'নিউজ রুম' },
    subtitle: { en: 'Stay updated with the latest news, project announcements, and milestones from Shifa Properties Ltd Group.', bn: 'শিফা প্রপার্টিজ লিমিটেড গ্রুপের সর্বশেষ সংবাদ, প্রকল্পের ঘোষণা ও মাইলফলকগুলো সম্পর্কে আপডেট থাকুন।' },
    readMore: { en: 'Read More →', bn: 'আরও পড়ুন →' },
    viewAll: { en: 'View All News', bn: 'সব সংবাদ দেখুন' },
  },

  /* ─── TESTIMONIALS ──────────────────────────────────────────────── */
  testimonials: {
    label: { en: 'Client Stories', bn: 'ক্লায়েন্টের গল্প' },
    title: { en: 'What Our Investors Say', bn: 'আমাদের বিনিয়োগকারীরা কী বলেন' },
    subscribe: { en: 'Subscribe for Investment Updates', bn: 'বিনিয়োগ আপডেটের জন্য সাবস্ক্রাইব করুন' },
    subscribeSubtitle: { en: 'Get the latest project news delivered to your inbox.', bn: 'সর্বশেষ প্রকল্পের সংবাদ আপনার ইনবক্সে পান।' },
    placeholder: { en: 'Enter Email Or Mobile', bn: 'ইমেইল বা মোবাইল নম্বর দিন' },
    subscribeBtnLabel: { en: 'Subscribe', bn: 'সাবস্ক্রাইব' },
  },

  /* ─── CONTACT ───────────────────────────────────────────────────── */
  contact: {
    watermark: { en: 'CONTACT US', bn: 'যোগাযোগ করুন' },
    title: { en: 'CONTACT US', bn: 'যোগাযোগ করুন' },
    subtitle: { en: 'Got a question? We\'re just a message away at Shifa Properties Ltd Group Ltd.', bn: 'কোনো প্রশ্ন আছে? শিফা প্রপার্টিজ লিমিটেড গ্রুপে একটি বার্তাই যথেষ্ট।' },
    callUs: { en: 'CALL US', bn: 'কল করুন' },
    email: { en: 'EMAIL', bn: 'ইমেইল' },
    whatsapp: { en: 'WHATSAPP', bn: 'হোয়াটসঅ্যাপ' },
    career: { en: 'CAREER', bn: 'ক্যারিয়ার' },
    callBtn: { en: 'Call', bn: 'কল' },
    emailBtn: { en: 'Email', bn: 'ইমেইল' },
    waBtn: { en: 'WhatsApp', bn: 'হোয়াটসঅ্যাপ' },
    formTitle: { en: 'SEND US A MESSAGE', bn: 'আমাদের একটি বার্তা পাঠান' },
    formSubtitle: { en: 'Interested in investment plans or have general queries? Send a message and our consultant will get back to you shortly.', bn: 'বিনিয়োগ পরিকল্পনায় আগ্রহী বা সাধারণ প্রশ্ন আছে? একটি বার্তা পাঠান, আমাদের পরামর্শদাতা শীঘ্রই যোগাযোগ করবেন।' },
    namePlaceholder: { en: 'John Doe', bn: 'আপনার নাম' },
    phonePlaceholder: { en: '+880 1XXX XXXXXX', bn: '+৮৮০ ১XXX XXXXXX' },
    emailPlaceholder: { en: 'john@example.com', bn: 'example@email.com' },
    msgPlaceholder: { en: 'Tell us about your requirements...', bn: 'আপনার প্রয়োজনীয়তা জানান...' },
    nameLabel: { en: 'Name', bn: 'নাম' },
    phoneLabel: { en: 'Phone Number', bn: 'ফোন নম্বর' },
    emailInputLabel: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
    interestLabel: { en: 'I am Interested In', bn: 'আমি আগ্রহী' },
    msgLabel: { en: 'Your Message', bn: 'আপনার বার্তা' },
    sendBtn: { en: 'SEND INQUIRY →', bn: 'অনুসন্ধান পাঠান →' },
    thankYou: { en: 'Thank You!', bn: 'ধন্যবাদ!' },
    thankYouMsg: { en: 'Your message has been submitted successfully. A Shifa Properties Ltd Investment Specialist will contact you within 24 hours.', bn: 'আপনার বার্তা সফলভাবে জমা হয়েছে। একজন শিফা প্রপার্টিজ বিনিয়োগ বিশেষজ্ঞ ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।' },
    interests: [
      { en: 'Hotel Suite Investment', bn: 'হোটেল স্যুট বিনিয়োগ' },
      { en: 'Hotel Booking', bn: 'রিসোর্ট বুকিং' },
      { en: 'Affordable Land Buying', bn: 'সাশ্রয়ী জমি ক্রয়' },
      { en: 'Careers & Placement', bn: 'ক্যারিয়ার ও নিয়োগ' },
      { en: 'General Inquiry', bn: 'সাধারণ অনুসন্ধান' },
    ],
  },

  /* ─── SEND MESSAGE PAGE ─────────────────────────────────────────── */
  sendMessage: {
    badge: { en: 'Get in Touch', bn: 'যোগাযোগ করুন' },
    title: { en: 'Send us a message', bn: 'আমাদের একটি বার্তা পাঠান' },
    subtitle: { en: 'We\'d love to hear from you. Fill out the form and our team will get back to you shortly.', bn: 'আমরা আপনার কাছ থেকে শুনতে চাই। ফর্মটি পূরণ করুন এবং আমাদের টিম শীঘ্রই যোগাযোগ করবে।' },
    firstName: { en: 'First Name', bn: 'প্রথম নাম' },
    lastName: { en: 'Last Name', bn: 'শেষ নাম' },
    email: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
    message: { en: 'Your Message...', bn: 'আপনার বার্তা...' },
    sendBtn: { en: 'Send Message', bn: 'বার্তা পাঠান' },
  },

  /* ─── FOOTER ────────────────────────────────────────────────────── */
  footer: {
    tagline: { en: 'Bangladesh\'s #1 Hotel Developer & Investment Company', bn: 'বাংলাদেশের #১ হোটেল ডেভেলপার ও বিনিয়োগ কোম্পানি' },
    hotline: { en: 'Hotline', bn: 'হটলাইন' },
    copyright: { en: '© 2025 Shifa Properties Ltd Group. All rights reserved.', bn: '© ২০২৫ শিফা প্রপার্টিজ লিমিটেড গ্রুপ। সমস্ত অধিকার সংরক্ষিত।' },
    followUs: { en: 'Follow Us', bn: 'আমাদের অনুসরণ করুন' },
    connectWith: { en: 'Connect With Us', bn: 'আমাদের সাথে যুক্ত হোন' },
    taglineBody: { en: "Bangladesh's premier luxury hospitality development and property asset management enterprise. Engineering signature, world-class Hotel architectures across Cox's Bazar, Kuakata, and premium structural landscapes.", bn: "বাংলাদেশের প্রিমিয়াম বিলাসবহুল আতিথেয়তা উন্নয়ন ও সম্পত্তি ব্যবস্থাপনা প্রতিষ্ঠান। কক্সবাজার, কুয়াকাটা এবং প্রিমিয়াম কাঠামোগত ল্যান্ডস্কেপ জুড়ে বিশ্বমানের হোটেল স্থাপত্য নির্মাণ করছে।" },
    portfolioCol: { en: 'Our Portfolio', bn: 'আমাদের পোর্টফোলিও' },
    companyCol: { en: 'Company', bn: 'কোম্পানি' },
    corporateStatus: { en: 'Corporate Status', bn: 'কর্পোরেট মর্যাদা' },
    complianceText: { en: "Registered Joint Stock Company Entity under the Government of the People's Republic of Bangladesh. Regulated under the Companies Act 1994.", bn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের অধীনে নিবন্ধিত যৌথমূলধনী কোম্পানি সত্তা। কোম্পানি আইন ১৯৯৪ অনুযায়ী নিয়ন্ত্রিত।' },
    privacyPolicy: { en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' },
    termsOfService: { en: 'Terms of Service', bn: 'সেবার শর্তাবলী' },
    techPartner: { en: 'Technology Partner', bn: 'প্রযুক্তি অংশীদার' },
    copyrightFull: { en: 'All real estate and hotel holdings follow dynamic local property ordinances.', bn: 'সকল রিয়েল এস্টেট ও হোটেল সম্পদ স্থানীয় সম্পত্তি অধ্যাদেশ অনুসরণ করে।' },
    contactTitles: {
      headquarters: { en: 'Corporate Headquarters', bn: 'কর্পোরেট সদর দফতর' },
      salesDesk: { en: 'Sales & Hotel Booking Desk', bn: 'বিক্রয় ও হোটেল বুকিং ডেস্ক' },
      whatsapp: { en: 'Official WhatsApp Business', bn: 'অফিসিয়াল হোয়াটসঅ্যাপ ব্যবসা' },
      pabxHotline: { en: 'Central IP PABX Hotline', bn: 'কেন্দ্রীয় আইপি পিএবিএক্স হটলাইন' },
      email: { en: 'General & Investor Relations', bn: 'সাধারণ ও বিনিয়োগকারী সম্পর্ক' },
      pressRoom: { en: 'Media & PR Press Room', bn: 'মিডিয়া ও পিআর প্রেস রুম' },
      officeHours: { en: 'Corporate Office Hours', bn: 'কর্পোরেট অফিসের সময়' },
      officeHoursValue: { en: 'Saturday - Thursday: 09:00 AM - 06:00 PM (GMT+6)', bn: 'শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকেল ৬:০০ (জিএমটি+৬)' },
    },
    quickLinks: {
      coxsBazarHotel: { en: "Cox's Bazar Hotel", bn: 'কক্সবাজার হোটেল' },
      kuakataGrand: { en: 'Kuakata Grand Hotel', bn: 'কুয়াকাটা গ্র্যান্ড হোটেল' },
      padmaRiverside: { en: 'Padma Riverside Vista', bn: 'পদ্মা রিভারসাইড ভিস্তা' },
      upcomingProjects: { en: 'Upcoming Mega Projects', bn: 'আসন্ন মেগা প্রকল্প' },
      aboutShifa: { en: 'About Shifa Group', bn: 'শিফা গ্রুপ সম্পর্কে' },
      boardOfDirectors: { en: 'Board of Directors', bn: 'পরিচালনা পর্ষদ' },
      investorRelations: { en: 'Investor Relations', bn: 'বিনিয়োগকারী সম্পর্ক' },
      careerOpportunities: { en: 'Career Opportunities', bn: 'ক্যারিয়ারের সুযোগ' },
    },
  },

  /* ─── NAV LABELS ────────────────────────────────────────────────── */
  nav: {
    home: { en: 'Home', bn: 'হোম' },
    company: { en: 'Company', bn: 'কোম্পানি' },
    whyUs: { en: 'Why Us', bn: 'কেন আমরা' },
    aboutUs: { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
    ourTeams: { en: 'Our Teams', bn: 'আমাদের দল' },
    career: { en: 'Career', bn: 'ক্যারিয়ার' },
    projects: { en: 'Projects', bn: 'প্রকল্প' },
    news: { en: 'News', bn: 'সংবাদ' },
    contact: { en: 'Contact', bn: 'যোগাযোগ' },
    downloadBrochure: { en: 'Download Brochure', bn: 'ব্রশিউর ডাউনলোড' },
    bookNow: { en: 'BOOK NOW →', bn: 'এখনই বুক করুন →' },
  },
} as const;

/** Helper to extract the right language string from a {en, bn} pair */
export type LangKey = 'EN' | 'BN';
export const pick = (obj: { en: string; bn: string }, lang: LangKey) =>
  lang === 'EN' ? obj.en : obj.bn;
