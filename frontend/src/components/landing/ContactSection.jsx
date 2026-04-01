import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../App";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Check, Phone, Clock, Mail } from "lucide-react";
import { API, CALENDLY_URL } from "./constants";

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", honeypot: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/contact`, { name: formData.name, email: formData.email, phone: formData.phone, message: formData.message });
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
        toast.success(t.contact.success);
      }
    } catch (error) {
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="col-span-12 lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-6">&nbsp;</p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter dark:text-white mb-8">CONTACT</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-12 max-w-md">
              {language === 'nl' ? 'Heb je vragen of wil je weten wat ik voor je kan betekenen? Stuur een bericht — ik reageer binnen 2 uur.' : 'Have questions or want to know what I can do for you? Send a message — I respond within 2 hours.'}
            </p>
            <div className="space-y-4">
              <a href="https://wa.me/31855055314" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl p-5 transition-colors group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div><p className="font-bold dark:text-white text-lg">WhatsApp Business</p><p className="text-gray-300 text-sm">{language === 'nl' ? 'Snel antwoord op je vragen' : 'Quick answers to your questions'}</p></div>
              </a>
              <button data-testid="calendly-book-button" onClick={() => { if (window.Calendly) { window.Calendly.initPopupWidget({ url: CALENDLY_URL }); } else { window.open(CALENDLY_URL, '_blank'); } }} className="w-full flex items-center gap-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-700/60 text-gray-900 dark:text-white border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl p-5 transition-colors group text-left">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><Clock size={22} className="text-gray-600" /></div>
                <div><p className="font-bold dark:text-white text-lg">{language === 'nl' ? 'Plan een gratis gesprek' : 'Schedule a free call'}</p><p className="text-gray-500 dark:text-gray-400 text-sm">{language === 'nl' ? '15 minuten kennismaking' : '15-minute intro call'}</p></div>
              </button>
              <a href="tel:+31855055314" data-testid="contact-phone-link" className="flex items-center gap-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-700/60 border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl p-5 transition-colors group">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><Phone size={22} className="text-gray-600" /></div>
                <div><p className="font-bold dark:text-white text-lg">+31 85 505 5314</p><p className="text-gray-500 dark:text-gray-400 text-sm">{language === 'nl' ? 'Bel me gerust!' : 'Feel free to call me!'}</p></div>
              </a>
              <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Email</p>
                <a href="mailto:info@yrvante.com" className="dark:text-white text-lg hover:underline underline-offset-4">info@yrvante.com</a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'nl' ? 'Locatie' : 'Location'}</p>
                  <p className="text-base font-medium dark:text-white">Nederland</p>
                </div>
                <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'nl' ? 'Reactietijd' : 'Response'}</p>
                  <p className="text-base font-medium dark:text-white">{language === 'nl' ? 'binnen 2 uur' : 'within 2 hours'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="col-span-12 lg:col-span-7">
            {submitted ? (
              <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-12 text-center rounded-3xl border border-gray-200/50 dark:border-neutral-700/50">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"><Check size={32} className="text-green-500" /></div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">{language === 'nl' ? 'Bericht verzonden' : 'Message sent'}</h3>
                <p className="text-gray-500">{language === 'nl' ? 'Ik neem binnen 2 uur contact met je op.' : 'I will contact you within 2 hours.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 lg:p-12 rounded-3xl border border-gray-200/50 dark:border-neutral-700/50">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">{language === 'nl' ? 'Naam' : 'Name'} *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-4 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-2xl focus:border-black dark:focus:border-white dark:text-white focus:outline-none transition-colors" placeholder={language === 'nl' ? 'Je naam' : 'Your name'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-4 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-2xl focus:border-black dark:focus:border-white dark:text-white focus:outline-none transition-colors" placeholder={language === 'nl' ? 'je@email.nl' : 'your@email.com'} />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">{language === 'nl' ? 'Telefoon' : 'Phone'}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-4 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-2xl focus:border-black dark:focus:border-white dark:text-white focus:outline-none transition-colors" placeholder="06 12345678" />
                </div>
                <div className="mb-10">
                  <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">{language === 'nl' ? 'Bericht' : 'Message'} *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-4 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-2xl focus:border-black dark:focus:border-white dark:text-white focus:outline-none transition-colors resize-none" placeholder={language === 'nl' ? 'Vertel over je project...' : 'Tell me about your project...'} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-2xl hover:bg-gray-600 transition-colors disabled:opacity-50">
                  {isSubmitting ? (language === 'nl' ? 'Verzenden...' : 'Sending...') : (language === 'nl' ? 'Verstuur Bericht' : 'Send Message')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
