import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Building2,
  BookmarkCheck,
  Globe
} from 'lucide-react';
import { useLogos } from "../hooks/useLogos";
import { useSocialLinks } from "../hooks/useSocialLinks";
import { useFooterInfo } from "../hooks/useFooterInfo";
import { useLanguage } from '../context/LanguageContext';
import { UI, pick } from '../data/translations';

// Inline pure SVGs for social elements to safeguard against third-party library export variances
const FacebookIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const InstagramIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </svg>
);
const LinkedInIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const YouTubeIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const XTwitterIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.227-8.451L1.5 2.25h7.04l4.213 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const WhatsAppIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Maps a backend platform slug to its inline SVG icon + hover color.
const SOCIAL_PLATFORM_MAP: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  facebook: { icon: FacebookIcon, color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
  fb: { icon: FacebookIcon, color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
  instagram: { icon: InstagramIcon, color: 'hover:bg-[#E4405F] hover:border-[#E4405F]' },
  ig: { icon: InstagramIcon, color: 'hover:bg-[#E4405F] hover:border-[#E4405F]' },
  linkedin: { icon: LinkedInIcon, color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]' },
  youtube: { icon: YouTubeIcon, color: 'hover:bg-[#FF0000] hover:border-[#FF0000]' },
  twitter: { icon: XTwitterIcon, color: 'hover:bg-[#000000] hover:border-[#000000]' },
  x: { icon: XTwitterIcon, color: 'hover:bg-[#000000] hover:border-[#000000]' },
  whatsapp: { icon: WhatsAppIcon, color: 'hover:bg-[#25D366] hover:border-[#25D366]' },
};

// Fallback used when the backend returns no active links.
const FALLBACK_SOCIALS = [
  { id: 'fb', label: 'Facebook', href: 'https://facebook.com', platform: 'facebook' },
  { id: 'ig', label: 'Instagram', href: 'https://instagram.com', platform: 'instagram' },
  { id: 'li', label: 'LinkedIn', href: 'https://linkedin.com', platform: 'linkedin' },
  { id: 'yt', label: 'YouTube', href: 'https://youtube.com', platform: 'youtube' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const { footerLogo } = useLogos();
  const { socialLinks } = useSocialLinks();
  const { footerInfo } = useFooterInfo();

  // Use backend links when available; otherwise fall back to the static set.
  const SOCIALS = socialLinks.length
    ? socialLinks.map((link) => {
        const platform = link.platform.toLowerCase();
        return {
          id: link.id,
          label: link.platform,
          href: link.url,
          platform,
        };
      })
    : FALLBACK_SOCIALS;

  const regNo = footerInfo?.reg_no?.trim() || 'C-XXXXXX';
  const tradingId = footerInfo?.trading_id?.trim() || '—';
  const salesTel = footerInfo?.sales_hotline
    ? `tel:${footerInfo.sales_hotline.split(/[\s,]+/)[0]}`
    : 'tel:+8801805019801';

  const CONTACT_INFO = [
    {
      icon: MapPin,
      title: pick(UI.footer.contactTitles.headquarters, lang),
      value: footerInfo?.address || 'Confidence Center, 2nd Building, 13th Floor, Flat-13/A, Shahjadpur, Gulshan, Dhaka.',
      href: footerInfo?.map_url || 'https://maps.google.com/?q=Confidence+Center+Shahjadpur+Gulshan+Dhaka'
    },
    {
      icon: Globe,
      title: lang === 'BN' ? 'ওয়েবসাইট' : 'Website',
      value: footerInfo?.website_label || 'www.shifaproperties.com',
      href: footerInfo?.website_url || 'https://www.shifaproperties.com'
    },
    {
      icon: Mail,
      title: pick(UI.footer.contactTitles.email, lang),
      value: footerInfo?.email || 'info@shifaproperties.com',
      href: footerInfo?.email ? `mailto:${footerInfo.email}` : 'mailto:info@shifaproperties.com'
    },
    {
      icon: Phone,
      title: pick(UI.footer.contactTitles.pabxHotline, lang),
      value: footerInfo?.pabx_hotline || '02226617229',
      href: footerInfo?.pabx_hotline ? `tel:${footerInfo.pabx_hotline}` : 'tel:02226617229'
    },
    {
      icon: BookmarkCheck,
      title: pick(UI.footer.contactTitles.salesDesk, lang),
      value: footerInfo?.sales_hotline || '01805 019801, 01805 019802',
      href: salesTel,
      highlight: true
    },
    {
      icon: Clock,
      title: pick(UI.footer.contactTitles.officeHours, lang),
      value: footerInfo?.office_hours || pick(UI.footer.contactTitles.officeHoursValue, lang),
    }
  ];

  const QUICK_LINKS = [
    {
      title: pick(UI.footer.portfolioCol, lang),
      links: [
        { label: pick(UI.footer.quickLinks.coxsBazarHotel, lang), href: '/projects?q=cox' },
        { label: pick(UI.footer.quickLinks.kuakataGrand, lang), href: '/projects?q=kuakata' },
        { label: pick(UI.footer.quickLinks.padmaRiverside, lang), href: '/projects?q=padma' },
        { label: pick(UI.footer.quickLinks.upcomingProjects, lang), href: '/projects' },
      ],
    },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-slate-700 border-t border-slate-300 bg-slate-100"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* TOP LAYER: Brand & Expanded Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">

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
                <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight font-serif">
                  Shifa Properties <span className="text-[#C9A84C]">Ltd</span>
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A84C]/90 mt-0.5">
                  G R O U P
                </p>
              </div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-md font-medium">
              {pick(UI.footer.taglineBody, lang)}
            </p>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600">{pick(UI.footer.connectWith, lang)}</p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 border border-slate-200 bg-white shadow-sm ${SOCIAL_PLATFORM_MAP[s.platform]?.color ?? 'hover:bg-[#C9A84C] hover:border-[#C9A84C]'}`}
                  >
                    {SOCIAL_PLATFORM_MAP[s.platform]?.icon ?? FacebookIcon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Grid System Matrix */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Contact Details Left/Top */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {footerInfo?.office_name && (
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A84C] mb-4">
                  {footerInfo.office_name}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                        } ${isLink ? 'group/card cursor-pointer' : ''} ${item.title.includes('Office Hours') || item.title.includes('অফিসের সময়') ? 'sm:col-span-2' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover/card:scale-105 ${item.highlight
                        ? 'bg-gradient-to-br from-[#C9A84C]/30 to-[#C9A84C]/10 border-[#C9A84C]/50 text-[#C9A84C]'
                        : 'bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200 text-[#C9A84C]'
                        }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">{item.title}</h5>
                        <p className={`text-xs leading-normal font-semibold ${item.highlight
                          ? 'text-slate-900 font-bold flex items-center gap-1'
                          : isLink ? 'text-slate-700 group-hover/card:text-slate-900 transition-colors flex items-center gap-1' : 'text-slate-600'
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

            {/* Map Block Right/Bottom */}
            {footerInfo?.map_url && (
              <div className="lg:col-span-1 w-full min-h-[250px] rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 group">
                {footerInfo.map_url.includes('<iframe') ? (
                  <div dangerouslySetInnerHTML={{ __html: footerInfo.map_url }} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
                ) : (
                  <>
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(footerInfo.address || 'Dhaka')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location Map"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <a
                      href={footerInfo.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-xs font-bold px-3.5 py-2 rounded-lg shadow-md border border-slate-200 text-slate-700 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-all flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      View Large Map
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* MIDDLE LAYER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b border-slate-200">
          {QUICK_LINKS.map((col) => (
            <div key={col.title} className="space-y-4">
              <div>
                <h4 className="text-slate-900 font-bold text-xs tracking-widest uppercase">{col.title}</h4>
                <div className="w-6 h-[2px] mt-2 rounded-full bg-[#C9A84C]" />
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-600 text-sm hover:text-slate-900 transition-colors duration-200 flex items-center gap-2 group/item font-medium"
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
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-slate-900 font-bold text-xs tracking-widest uppercase">{pick(UI.footer.corporateStatus, lang)}</h4>
            <div className="w-6 h-[2px] mt-2 rounded-full bg-[#C9A84C]" />
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-600 leading-normal font-medium">
                    {footerInfo?.corporate_status || pick(UI.footer.complianceText, lang)}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 tracking-wider font-semibold">
                    REG REGISTRATION NO: {regNo} / RJSC TRADING ID: {tradingId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COMPLIANCE LAYER */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 w-full border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-auto">
            <p className="text-slate-600 text-xs lg:whitespace-nowrap font-medium">
              © {currentYear} Shifa Properties Ltd Group. {pick(UI.footer.copyrightFull, lang)}
            </p>
          </div>

          {/* Software Integrator Seal */}
          <div className="flex items-center gap-2.5 py-2 px-4 bg-white border border-slate-200 rounded-full shadow-sm flex-shrink-0">
            <span className="text-slate-600 text-[11px] font-semibold tracking-wide whitespace-nowrap">{pick(UI.footer.techPartner, lang)}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <a
              href="https://ositsltd.com"
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