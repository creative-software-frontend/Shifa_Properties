import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogos } from "../hooks/useLogos";
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';


// Bilingual nav structure — labels come from translations, hrefs stay static
const getNavLinks = (lang: 'EN' | 'BN') => [
  { label: pick(UI.nav.home, lang), href: '/' },
  {
    label: pick(UI.nav.company, lang),
    href: '#',
    children: [
      { label: pick(UI.nav.whyUs, lang), href: '/why-us' },
      { label: pick(UI.nav.aboutUs, lang), href: '/about' },
      { label: pick(UI.nav.ourTeams, lang), href: '/our-team' },
      { label: pick(UI.nav.career, lang), href: '/careers' },
    ],
  },
  { label: pick(UI.nav.projects, lang), href: '/projects' },
  { label: pick(UI.nav.news, lang), href: '/news' },
  { label: pick(UI.nav.contact, lang), href: '/contact' },
  { label: pick(UI.nav.downloadBrochure, lang), href: '/download-brochure' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { lang } = useLanguage();
  const { websiteLogo, headerLogo } = useLogos();

  const NAV_LINKS = getNavLinks(lang);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);


  const isScrolledPage = location.pathname !== '/';

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => {
      if (isScrolledPage) {
        setScrolled(true);
      } else {
        setScrolled(window.scrollY > 60);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, isScrolledPage]);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setActiveHash(location.hash);
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const getHref = (href: string) => {
    if (href.startsWith('#') && location.pathname !== '/') {
      return '/' + href;
    }
    return href;
  };

  const isNavActive = (href: string) =>
    location.pathname === href || (location.pathname === '/' && activeHash === href);

  const isLight = scrolled || isScrolledPage;

  return (
    <nav
      ref={navRef}
      id="main-navbar"
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 rounded-full
        bg-white py-1.5 px-4
        ${scrolled
          ? 'shadow-lg border border-gray-100'
          : 'shadow-md border border-gray-100/80'}`}
    >
      <div className="flex items-center justify-between w-full gap-2">

        {/* ── LEFT LOGO ── */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" id="nav-logo-left">
          <img
            src={websiteLogo || undefined}
            alt="Shifa Properties Ltd Group Logo"
            className="w-14 h-14 rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="leading-tight hidden sm:block">
            <p
              className="font-black text-lg tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: 'var(--color-dark)' }}
            >
              Shifa Properties Ltd
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#C9A84C' }}>
              GROUP
            </p>
          </div>
        </Link>

        {/* ── DESKTOP NAV (centre) ── */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" ref={dropRef as any}>
          {NAV_LINKS.map((link) => {
            const hasChildren = link.children && link.children.length > 0;
            const isActive = isNavActive(link.href);

            if (hasChildren) {
              return (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
                    onClick={(e) => { e.preventDefault(); setOpenDropdown(link.label); }}
                    className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      text-[#1a1a1a] hover:text-navy-500 hover:bg-navy-50 border border-transparent"
                  >
                    {link.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300
                    ${openDropdown === link.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
                    <div className="w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* Navy accent bar */}
                      <div className="h-1 w-full" style={{ backgroundColor: '#1a237e' }} />
                      <div className="py-2">
                        {link.children!.map((child) => (
                          <a
                            key={child.label}
                            href={getHref(child.href)}
                            id={`nav-${child.href.replace(/\//g, '').replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                              if (child.href.startsWith('#') || child.href.includes('#')) {
                                e.preventDefault();
                                const hash = child.href.includes('#') ? '#' + child.href.split('#')[1] : child.href;
                                if (child.href.startsWith('/') && child.href.includes('#')) {
                                  navigate(child.href);
                                } else {
                                  handleLinkClick(hash);
                                }
                              } else {
                                setOpenDropdown(null);
                              }
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1a1a1a] hover:bg-navy-50 hover:text-navy-600 transition-colors duration-200 group/link"
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" style={{ backgroundColor: '#1a237e' }} />
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <a
                  href={getHref(link.href)}
                  id={`nav-${link.href.replace(/\//g, '').replace(/\s+/g, '-') || 'home'}`}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }
                  }}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    text-[#1a1a1a] hover:text-navy-500 hover:bg-navy-50
                    ${isActive
                      ? 'text-navy-600 font-bold bg-navy-50 shadow-sm border border-navy-100/60'
                      : 'border border-transparent'}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── RIGHT: Language Toggle + Logo + CTA (desktop) ── */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* Right-side secondary logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo-right">
            <img
              src={headerLogo || undefined}
              alt="Shifa Properties Ltd Group"
              className="w-10 h-10 rounded-full object-contain bg-white border border-gold-300 shadow-gold transition-transform duration-300 group-hover:scale-105"
              style={{ padding: '0px' }}
            />
          </Link>

          {/* Neo-Brutalist Language Toggle */}
          <LanguageToggle />

          {/* Book Now CTA */}
          <button
            onClick={() => navigate('/send-message')}
            id="nav-book-btn"
            className="btn-gold text-xs font-bold px-5 py-2.5 whitespace-nowrap"
          >
            {pick(UI.nav.bookNow, lang)}
          </button>
        </div>

        {/* ── MOBILE hamburger ── */}
        <button
          id="nav-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className={`lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-300
            ${isLight ? 'text-gray-700' : 'text-white'}`}
        >
          <span className={`block h-0.5 w-6 transition-all duration-300 bg-current ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 transition-all duration-300 bg-current ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 transition-all duration-300 bg-current ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out
        ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/98 backdrop-blur-md border border-gray-100 shadow-lg mt-2 rounded-2xl overflow-hidden">
          <div className="py-4 px-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const isActive = isNavActive(link.href);

              if (hasChildren) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-navy-50 hover:text-navy-600 transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openDropdown === link.label ? 'max-h-64' : 'max-h-0'}`}>
                      <div className="pl-4 pb-1 flex flex-col gap-0.5 border-l-2 ml-4 mb-1" style={{ borderColor: '#C9A84C' }}>
                        {link.children!.map((child) => (
                          <a
                            key={child.label}
                            href={getHref(child.href)}
                            onClick={(e) => {
                              if (child.href.startsWith('#') || child.href.includes('#')) {
                                e.preventDefault();
                                const hash = child.href.includes('#') ? '#' + child.href.split('#')[1] : child.href;
                                if (child.href.startsWith('/') && child.href.includes('#')) {
                                  navigate(child.href);
                                  setMenuOpen(false);
                                } else {
                                  handleLinkClick(hash);
                                }
                              } else {
                                setMenuOpen(false);
                              }
                            }}
                            className="block px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-600 transition-colors duration-200"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }
                  }}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200
                    ${isActive
                      ? 'bg-navy-50 text-navy-600 font-bold'
                      : 'text-gray-700 hover:bg-navy-50 hover:text-navy-600'}`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Mobile Language Toggle */}
            <div className="flex items-center justify-between px-4 py-3 mt-1 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">
                {lang === 'BN' ? 'ভাষা / Language' : 'Language / ভাষা'}
              </span>
              <LanguageToggle />
            </div>

            <button
              onClick={() => { navigate('/send-message'); setMenuOpen(false); }}
              className="btn-gold text-center mt-2 w-full"
            >
              {pick(UI.nav.bookNow, lang)}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
