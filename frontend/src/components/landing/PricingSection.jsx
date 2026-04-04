import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../App";
import { Link } from "react-router-dom";
import { Monitor, Zap, RefreshCw, Award, Check, ArrowRight, Calculator, Moon, FileText, Globe as GlobeIcon, MessageSquare, Star as StarIcon, BookOpen } from "lucide-react";

const PricingSection = () => {
  const { language } = useLanguage();

  const pkgs = [
    { key: 'rebranding', name: 'Rebranding', price: '249', icon: RefreshCw, desc: language === 'nl' ? 'Bestaande website, nieuw design' : 'Existing website, new design', features: [language === 'nl' ? 'Nieuw modern design' : 'New modern design', language === 'nl' ? 'Responsive optimalisatie' : 'Responsive optimization', language === 'nl' ? 'Hosting & SSL' : 'Hosting & SSL'] },
    { key: 'basis', name: language === 'nl' ? 'Basis' : 'Basic', price: '399', icon: Monitor, desc: language === 'nl' ? '1-3 pagina\'s, ideaal om te starten' : '1-3 pages, ideal to start', features: ['Responsive design', language === 'nl' ? 'Contactformulier' : 'Contact form', 'Hosting & SSL'] },
    { key: 'pro', name: 'Pro', price: '699', icon: Zap, popular: true, desc: language === 'nl' ? 'Tot 10 pagina\'s, voor groei' : 'Up to 10 pages, for growth', features: [language === 'nl' ? 'SEO optimalisatie' : 'SEO optimization', 'Blog / Portfolio', language === 'nl' ? 'Contactformulier + meer' : 'Contact form + more'] },
    { key: 'premium', name: 'Premium', price: '999', icon: Award, desc: language === 'nl' ? 'Alles inbegrepen, incl. boekingssysteem' : 'Everything included, incl. booking system', features: [language === 'nl' ? 'Boekingssysteem inbegrepen' : 'Booking system included', language === 'nl' ? 'Meertalig' : 'Multi-language', 'Priority support'] },
  ];

  const extras = [
    { name: language === 'nl' ? 'Extra pagina\'s' : 'Extra pages', price: '€49', unit: language === 'nl' ? '/pagina' : '/page', icon: FileText },
    { name: language === 'nl' ? 'Meertalige website' : 'Multi-language website', price: '€149', unit: '', icon: GlobeIcon },
    { name: language === 'nl' ? 'Extra contactformulier' : 'Extra contact form', price: '€69', unit: '', icon: MessageSquare },
    { name: language === 'nl' ? 'Boekingssysteem' : 'Booking system', price: '€249', unit: '', icon: BookOpen },
    { name: 'Google Reviews', price: '€120', unit: '', icon: StarIcon },
    { name: 'Dark mode', price: '€79', unit: '', icon: Moon },
    { name: language === 'nl' ? 'Pop-up (aanbieding/aankondiging)' : 'Pop-up (offer/announcement)', price: '€39', unit: '', icon: MessageSquare },
    { name: language === 'nl' ? 'Voor & na slider' : 'Before & after slider', price: '€39', unit: '', icon: RefreshCw },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gray-50/80 dark:bg-neutral-900/50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 mb-12 sm:mb-16">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">&nbsp;</p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-black dark:text-white">
              {language === 'nl' ? 'PAKKETTEN' : 'PACKAGES'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 max-w-lg text-sm sm:text-base">
              {language === 'nl' ? 'Transparante prijzen. Geen verborgen kosten.' : 'Transparent pricing. No hidden costs.'}
            </p>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="pricing-comparison-table">
          {pkgs.map((pkg, i) => (
            <motion.div key={pkg.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/calculator?package=${pkg.key}`} className={`block h-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm ${pkg.popular ? 'border-gray-400 dark:border-neutral-500 ring-1 ring-gray-200 dark:ring-neutral-600' : 'border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'}`} data-testid={`pricing-cta-${pkg.key}`}>
                {pkg.popular && <span className="inline-block text-[10px] font-bold uppercase tracking-wider mb-3 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300">{language === 'nl' ? 'Meest gekozen' : 'Most popular'}</span>}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-neutral-700"><pkg.icon size={18} strokeWidth={1.5} className="text-gray-500" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">{pkg.name}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">€{pkg.price}</p>
                  </div>
                </div>
                <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">{pkg.desc}</p>
                <ul className="space-y-2 mb-5">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span className="text-xs text-gray-600 dark:text-gray-400">{f}</span></li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:gap-2 transition-all">
                  {language === 'nl' ? 'Selecteer' : 'Select'}<ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Extra's Pricing Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-10" data-testid="extras-pricing">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-5">
            {language === 'nl' ? "Extra's & Add-ons" : 'Extras & Add-ons'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {extras.map((extra, i) => (
              <Link key={i} to="/calculator" className="group block bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl p-4 hover:border-gray-400 dark:hover:border-neutral-500 hover:-translate-y-0.5 hover:shadow-md transition-all" data-testid={`extra-${extra.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="w-9 h-9 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center mb-3">
                  <extra.icon size={16} strokeWidth={1.5} className="text-gray-500" />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 leading-tight">{extra.name}</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{extra.price}<span className="text-xs font-normal text-gray-400">{extra.unit}</span></p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Calculator CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8 sm:mt-10">
          <Link to="/calculator" className="block group" data-testid="pricing-calculator-cta">
            <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 p-5 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-gray-400 dark:hover:border-neutral-500">
              <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center flex-shrink-0"><Calculator size={22} className="text-gray-600 dark:text-gray-300" /></div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{language === 'nl' ? 'Bereken direct je prijs' : 'Calculate your price now'}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'nl' ? 'Kies je pakket, voeg opties toe en ontvang meteen een offerte.' : 'Choose your package, add options and get a quote instantly.'}</p>
                </div>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-wider rounded-full group-hover:bg-gray-600 transition-colors flex-shrink-0">
                  {language === 'nl' ? 'Start calculator' : 'Start calculator'}<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
