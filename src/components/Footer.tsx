import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Building2,
  FileText,
  ShieldAlert,
  BookmarkCheck,
  Globe
} from 'lucide-react';
import { useLogos } from "../hooks/useLogos";
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';

// Inline pure SVGs for social elements to safeguard against third-party library export variances
const SOCIALS = [
  {
    id: 'fb',
    label: 'Facebook',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    href: 'https://facebook.com',
    color: 'hover:bg-[#1877F2] hover:border-[#1877F2]'
  },
  {
    id: 'ig',
    label: 'Instagram',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
      </svg>
    ),
    href: 'https://instagram.com',
    color: 'hover:bg-[#E4405F] hover:border-[#E4405F]'
  },
  {
    id: 'li',
    label: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    href: 'https://linkedin.com',
    color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]'
  },
  {
    id: 'yt',
    label: 'YouTube',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    href: 'https://youtube.com',
    color: 'hover:bg-[#FF0000] hover:border-[#FF0000]'
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
const { footerLogo } = useLogos();
  const CONTACT_INFO = [
    {
      icon: MapPin,
      title: pick(UI.footer.contactTitles.headquarters, lang),
      value: 'Confidence Center, 2nd Building, 13th Floor, Flat-13/A, Shahjadpur, Gulshan, Dhaka.',
      href: 'https://maps.google.com/?q=Confidence+Center+Shahjadpur+Gulshan+Dhaka'
    },
    {
      icon: Globe,
      title: lang === 'BN' ? 'ওয়েবসাইট' : 'Website',
      value: 'www.shifaproperties.com',
      href: 'https://www.shifaproperties.com'
    },
    {
      icon: Mail,
      title: pick(UI.footer.contactTitles.email, lang),
      value: 'info@shifaproperties.com',
      href: 'mailto:info@shifaproperties.com'
    },
    {
      icon: Phone,
      title: pick(UI.footer.contactTitles.pabxHotline, lang),
      value: '02226617229',
      href: 'tel:02226617229'
    },
    {
      icon: BookmarkCheck,
      title: pick(UI.footer.contactTitles.salesDesk, lang),
      value: '01805 019801, 01805 019802',
      href: 'tel:+8801805019801',
      highlight: true
    },
    {
      icon: Clock,
      title: pick(UI.footer.contactTitles.officeHours, lang),
      value: pick(UI.footer.contactTitles.officeHoursValue, lang),
    }
  ];

  const QUICK_LINKS = [
    {
      title: pick(UI.footer.portfolioCol, lang),
      links: [
        { label: pick(UI.footer.quickLinks.coxsBazarHotel, lang), href: '/portfolio/coxs-bazar' },
        { label: pick(UI.footer.quickLinks.kuakataGrand, lang), href: '/portfolio/kuakata' },
        { label: pick(UI.footer.quickLinks.padmaRiverside, lang), href: '/portfolio/padma-view' },
        { label: pick(UI.footer.quickLinks.upcomingProjects, lang), href: '/projects' },
      ]
    },
    {
      title: pick(UI.footer.companyCol, lang),
      links: [
        { label: pick(UI.footer.quickLinks.aboutShifa, lang), href: '/about' },
        { label: pick(UI.footer.quickLinks.boardOfDirectors, lang), href: '/leadership' },
        { label: pick(UI.footer.quickLinks.investorRelations, lang), href: '/investors' },
        { label: pick(UI.footer.quickLinks.careerOpportunities, lang), href: '/careers' },
      ]
    }
  ];

  const OFFICE_LOCATIONS = [
    {
      title: "CORPORATE HEAD OFFICE",
      address: "47, Nassa Heights, Gulshan South Avenue, Gulshan-1, Dhaka.",
      email: "sales@shifapropertiesltd.com.bd",
      cell: "01877715333",
      hotline: "+8809610066666",
      mapSrc: "https://maps.google.com/maps?q=47%20Nassa%20Heights,%20Gulshan%20South%20Avenue,%20Gulshan-1,%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=47+Nassa+Heights+Gulshan+South+Avenue+Gulshan-1+Dhaka"
    },
    {
      title: "MOHAKHALI DOHS OFFICE",
      address: "Plot-39B (1st Floor), Road-29, New DOHS Mohakhali, Dhaka",
      email: "sales@shifapropertiesltd.com.bd",
      cell: "01222845560",
      hotline: "+8809610066666",
      mapSrc: "https://maps.google.com/maps?q=New%20DOHS%20Mohakhali,%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=New+DOHS+Mohakhali+Dhaka"
    },
    {
      title: "UTTARA OFFICE",
      address: "2nd & 3rd Floor, House 18 & 20, Road 6/C, ACM & MF Tower, Dhaka 1230",
      email: "sales@shifapropertiesltd.com.bd",
      cell: "01894944666",
      hotline: "+8809610066666",
      mapSrc: "https://maps.google.com/maps?q=Uttara%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=Uttara+Dhaka"
    }
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-slate-100 border-t border-slate-900 bg-[#060614]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* TOP LAYER: Brand & Expanded Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/60">

          {/* Brand Profile Block */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="relative rounded-2xl border border-[#C9A84C]/40 shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all duration-300 group-hover:border-[#C9A84C] group-hover:shadow-[0_0_25px_rgba(201,168,76,0.25)]">
                <img
                   src={footerLogo || undefined}
                  alt="Shifa Properties Ltd Group Logo"
                  className="w-16 h-16 object-contain rounded-2xl"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-2xl text-white tracking-tight font-serif">
                  Shifa Properties <span className="text-[#C9A84C]">Ltd</span>
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A84C]/90 mt-0.5">
                  G R O U P
                </p>
              </div>
            </Link>

            <p className="text-slate-100 text-sm leading-relaxed max-w-md backdrop-blur-[2px] font-medium">
              {pick(UI.footer.taglineBody, lang)}
            </p>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-200">{pick(UI.footer.connectWith, lang)}</p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-200 hover:text-white transition-all duration-300 border border-slate-700 bg-slate-900/60 backdrop-blur-sm shadow-inner ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Grid System Matrix */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/40 backdrop-blur-md">
            {CONTACT_INFO.map((item, idx) => {
              const IconComponent = item.icon;
              const isLink = !!item.href;
              const Wrapper = isLink ? 'a' : 'div';

              return (
                <Wrapper
                  key={idx}
                  {...(isLink ? { href: item.href, target: item.href?.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                  className={`flex gap-4 p-3.5 rounded-xl transition-all duration-200 border ${item.highlight
                    ? 'bg-[#C9A84C]/10 border-[#C9A84C]/40 hover:bg-[#C9A84C]/20'
                    : 'border-transparent hover:bg-slate-900/80 hover:border-slate-700/50'
                    } ${isLink ? 'group/card cursor-pointer' : ''} ${item.title.includes('Office Hours') || item.title.includes('অফিসের সময়') ? 'sm:col-span-2' : ''}`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover/card:scale-105 ${item.highlight
                    ? 'bg-gradient-to-br from-[#C9A84C]/30 to-[#C9A84C]/10 border-[#C9A84C]/50 text-[#C9A84C]'
                    : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700 text-[#C9A84C]'
                    }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-200">{item.title}</h5>
                    <p className={`text-xs leading-normal font-semibold ${item.highlight
                      ? 'text-white font-bold flex items-center gap-1'
                      : isLink ? 'text-slate-100 group-hover/card:text-white transition-colors flex items-center gap-1' : 'text-slate-200'
                      }`}>
                      {item.value}
                      {isLink && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/card:opacity-100 transition-all text-[#C9A84C]" />}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
          </div>

        </div>

        {/* OFFICE LOCATIONS MAP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-slate-800/40">
          {OFFICE_LOCATIONS.map((loc, idx) => (
            <div key={idx} className="flex flex-col space-y-4">
              <div className="h-40 w-full relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe
                  title={`Map of ${loc.title}`}
                  src={loc.mapSrc}
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-3">{loc.title}</h4>
                <div className="space-y-2 text-xs text-slate-200 mb-4 flex-grow">
                  <div className="grid grid-cols-[60px_1fr] gap-2">
                    <span className="font-semibold text-slate-400">Address:</span>
                    <span className="leading-relaxed text-white">{loc.address}</span>
                  </div>
                  <div className="grid grid-cols-[60px_1fr] gap-2">
                    <span className="font-semibold text-slate-400">Email:</span>
                    <a href={`mailto:${loc.email}`} className="text-[#e0c26c] hover:underline transition-colors">{loc.email}</a>
                  </div>
                  <div className="grid grid-cols-[60px_1fr] gap-2">
                    <span className="font-semibold text-slate-400">Cell:</span>
                    <a href={`tel:${loc.cell}`} className="text-white hover:text-[#C9A84C] transition-colors">{loc.cell}</a>
                  </div>
                  <div className="grid grid-cols-[60px_1fr] gap-2">
                    <span className="font-semibold text-slate-400">Hotline:</span>
                    <a href={`tel:${loc.hotline}`} className="text-white hover:text-[#C9A84C] transition-colors">{loc.hotline}</a>
                  </div>
                </div>
                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-[#C9A84C] transition-colors uppercase tracking-wider"
                >
                  View Map <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE LAYER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-slate-800/40">
          {QUICK_LINKS.map((col) => (
            <div key={col.title} className="space-y-4">
              <div>
                <h4 className="text-white font-bold text-xs tracking-widest uppercase">{col.title}</h4>
                <div className="w-6 h-[2px] mt-2 rounded-full bg-[#C9A84C]" />
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-200 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group/item font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] opacity-0 -ml-2 group-hover/item:opacity-100 group-hover/item:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Compliance Card */}
          <div className="sm:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase">{pick(UI.footer.corporateStatus, lang)}</h4>
            <div className="w-6 h-[2px] mt-2 rounded-full bg-[#C9A84C]" />
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950/80 to-slate-900/80 border border-slate-800/80 space-y-2 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-100 leading-normal font-medium">
                    {pick(UI.footer.complianceText, lang)}
                  </p>
                  <p className="text-[10px] font-mono text-slate-300 tracking-wider font-semibold">
                    REG REGISTRATION NO: C-XXXXXX / RJSC BANGALORE TRADING ID: XXXXX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COMPLIANCE LAYER */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 w-full border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-auto">
            <p className="text-slate-300 text-xs lg:whitespace-nowrap font-medium">
              © {currentYear} Shifa Properties Ltd Group. {pick(UI.footer.copyrightFull, lang)}
            </p>

            <span className="hidden md:inline text-slate-700">|</span>

            <div className="flex items-center justify-center gap-4 flex-shrink-0">
              <Link to="/privacy" className="text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 whitespace-nowrap font-medium">
                <ShieldAlert className="w-3 h-3 text-[#C9A84C]" /> {pick(UI.footer.privacyPolicy, lang)}
              </Link>
              <span className="text-slate-700">|</span>
              <Link to="/terms" className="text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 whitespace-nowrap font-medium">
                <FileText className="w-3 h-3 text-[#C9A84C]" /> {pick(UI.footer.termsOfService, lang)}
              </Link>
            </div>
          </div>

          {/* Software Integrator Seal */}
          <div className="flex items-center gap-2.5 py-2 px-4 bg-slate-950/80 border border-slate-800 rounded-full shadow-inner flex-shrink-0 backdrop-blur-sm">
            <span className="text-slate-200 text-[11px] font-semibold tracking-wide whitespace-nowrap">{pick(UI.footer.techPartner, lang)}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <a
              href="https://osit.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black tracking-wide bg-gradient-to-r from-[#C9A84C] to-[#fde68a] bg-clip-text text-transparent hover:brightness-110 transition-all whitespace-nowrap"
            >
              OS IT Solutions Ltd
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;