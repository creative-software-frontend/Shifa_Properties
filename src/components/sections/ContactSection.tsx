import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
// Premium Icons replacing primitive emojis to handle alignment cleaner
import { Phone, Mail, MessageSquare, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { UI, pick } from '../../data/translations';
import api from '../../utils/api';
import { useInvestmentCategories } from '../../hooks/useInvestmentCategories';
import { useContactManages } from '../../hooks/useContactManages';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const ContactSection: React.FC = () => {
  const { lang } = useLanguage();
  const c = UI.contact;

  const { categories, loading: categoriesLoading } = useInvestmentCategories();
  const { contactData, loading: contactLoading } = useContactManages();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', investment_category_id: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmitError('');
    setIsSubmitting(true);

    const investment_category_id = Number(formData.investment_category_id);

    if (!investment_category_id) {
      setSubmitError('Please select a valid investment category.');
      setIsSubmitting(false);
      return;
    }


    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        investment_category_id,
        message: formData.message,
      };

      const res = await api.post('/v1/contact-store', payload);
      const data = res?.data as { success?: boolean; message?: string };

      if (data?.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setSubmitError('');
          setFormData({ name: '', email: '', phone: '', investment_category_id: '', message: '' });
          setIsSubmitting(false);
        }, 4000);
      } else {
        setSubmitError(data?.message ?? 'Contact submission failed.');
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: Record<string, unknown> } };

      const validationErrors = axiosErr?.response?.data?.errors as Record<string, string[]> | undefined;
      const firstValidationMessage: string | undefined = validationErrors
        ? (Object.values(validationErrors)[0]?.[0] as string | undefined)
        : undefined;

      setSubmitError(firstValidationMessage ?? (axiosErr?.response?.data?.message as string | undefined) ?? 'Contact submission failed.');

      setIsSubmitting(false);
    }

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <section id="contact" className="overflow-hidden">

      {/* ── HERO BANNER & CONTACT QUICK LINKS ── */}
      <div className="relative overflow-hidden bg-white">
        <div className="relative z-10 py-16 px-4 flex flex-col items-center">
          {/* Expanded max-w-2xl to max-w-4xl to prevent layout breaks on long text blocks */}
          <motion.div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-4xl border border-sky-100"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <h2 className="text-center font-black text-2xl md:text-3xl mb-1 text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              {pick(c.title, lang)}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">{pick(c.subtitle, lang)}</p>

            {/* Changed from 2-column grid directly to clean responsive wrapper layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Call Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-black truncate">{pick(c.callUs, lang)}</p>
                    {contactLoading ? (
                      <div className="h-4 bg-gray-200 rounded animate-pulse mt-0.5 w-24"></div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-0.5">{contactData?.call_use || '01877715333'}</p>
                    )}
                  </div>
                </div>
                <a href={`tel:${contactData?.call_use || '01877715333'}`} className="text-white text-xs font-bold px-5 py-2.5 rounded-xl flex-shrink-0 text-center shadow-sm bg-black hover:bg-neutral-800 transition-colors">
                  {pick(c.callBtn, lang)}
                </a>
              </div>

              {/* Email Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-black truncate">{pick(c.email, lang)}</p>
                    {contactLoading ? (
                      <div className="h-4 bg-gray-200 rounded animate-pulse mt-0.5 w-40"></div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px] sm:max-w-xs">{contactData?.email || 'info@shifapropertiesltdgroup.com'}</p>
                    )}
                  </div>
                </div>
                <a href={`mailto:${contactData?.email || 'info@shifapropertiesltdgroup.com'}`} className="text-white text-xs font-bold px-5 py-2.5 rounded-xl flex-shrink-0 text-center shadow-sm bg-black hover:bg-neutral-800 transition-colors">
                  {pick(c.emailBtn, lang)}
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-black truncate">{pick(c.whatsapp, lang)}</p>
                    {contactLoading ? (
                      <div className="h-4 bg-gray-200 rounded animate-pulse mt-0.5 w-24"></div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-0.5">{contactData?.whatsapp || '01877715333'}</p>
                    )}
                  </div>
                </div>
                <a href={`https://wa.me/${contactData?.whatsapp || '8801877715333'}`} target="_blank" rel="noopener noreferrer"
                  className="text-white text-xs font-bold px-5 py-2.5 rounded-xl flex-shrink-0 text-center shadow-sm bg-black hover:bg-neutral-800 transition-colors">
                  {pick(c.waBtn, lang)}
                </a>
              </div>

              {/* Careers Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-black truncate">{pick(c.career, lang)}</p>
                    {contactLoading ? (
                      <div className="h-4 bg-gray-200 rounded animate-pulse mt-0.5 w-40"></div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px] sm:max-w-xs">{contactData?.career || 'career@shifapropertiesltdgroup.com'}</p>
                    )}
                  </div>
                </div>
                <a href={`mailto:${contactData?.career || 'career@shifapropertiesltdgroup.com'}`} className="text-white text-xs font-bold px-5 py-2.5 rounded-xl flex-shrink-0 text-center shadow-sm bg-black hover:bg-neutral-800 transition-colors">
                  {pick(c.emailBtn, lang)}
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ── INQUIRY FORM ── */}
      <div className="py-16 px-4 bg-white border-t border-sky-100">
        <div className="max-w-4xl mx-auto">
          <motion.div className="bg-white rounded-3xl p-8 md:p-12 border border-sky-100 shadow-sm"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

            <div>
              <h2 className="text-center font-black text-2xl md:text-3xl mb-2 text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                {pick(c.formTitle, lang)}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">{pick(c.formSubtitle, lang)}</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mb-4 text-green-600">✓</div>
                  <h3 className="font-extrabold text-xl mb-2 text-black">{pick(c.thankYou, lang)}</h3>
                  <p className="text-gray-600 text-sm max-w-sm">{pick(c.thankYouMsg, lang)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black">{pick(c.nameLabel, lang)}</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange}
                        placeholder={pick(c.namePlaceholder, lang)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black">{pick(c.phoneLabel, lang)}</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                        placeholder={pick(c.phonePlaceholder, lang)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black">{pick(c.emailInputLabel, lang)}</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange}
                        placeholder={pick(c.emailPlaceholder, lang)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black">{pick(c.interestLabel, lang)}</label>
                      <select name="investment_category_id" value={formData.investment_category_id} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                        <option value="" disabled>{categoriesLoading ? 'Loading categories...' : 'Select Investment Category'}</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black">{pick(c.msgLabel, lang)}</label>
                      <textarea name="message" required rows={1} value={formData.message} onChange={handleInputChange}
                        placeholder={pick(c.msgPlaceholder, lang)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y min-h-[46px]" />
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 hover:from-blue-950 hover:to-sky-600 text-white px-14 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 rounded-full transform hover:scale-[1.01]"
                    >
                      <span>{pick(c.sendBtn, lang)}</span>
                      <span className="text-sm font-light select-none">→</span>
                    </button>
                    <p className="mt-2 text-xs text-red-600 min-h-[14px]" aria-live="polite">
                      {submitError ? submitError : ''}
                    </p>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;