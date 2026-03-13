import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, ArrowRight, Check, Plus, Minus, Calculator, Info } from "lucide-react";
import { Link } from "react-router-dom";

const CalculatorPage = () => {
  const { language } = useLanguage();
  
  // State for selections
  const [websiteType, setWebsiteType] = useState('basic'); // 'basic' or 'advanced'
  const [addOns, setAddOns] = useState({
    extraPages: 0,
    contactForm: false,
    seo: false,
    analytics: false,
    multiLanguage: false,
    customDesign: false,
    logoDesign: false,
    copywriting: false,
    maintenance: false
  });

  const content = {
    nl: {
      back: "Terug",
      title: "Wat kost een website?",
      subtitle: "Bereken direct wat jouw website kost",
      step1: "Stap 1: Kies je website type",
      step2: "Stap 2: Voeg extra's toe (optioneel)",
      
      basic: {
        title: "Basis Website",
        price: "€350",
        description: "Perfect voor ZZP'ers en kleine bedrijven",
        includes: [
          "Moderne, responsieve website",
          "Tot 5 pagina's",
          "Mobiel, tablet & desktop",
          "Snelle laadtijd",
          "SSL certificaat"
        ]
      },
      advanced: {
        title: "Geavanceerde Website",
        price: "€450",
        description: "Voor bedrijven die meer nodig hebben",
        includes: [
          "Alles van Basis Website",
          "Tot 10 pagina's",
          "Afspraaksysteem mogelijk",
          "Klantportaal mogelijk",
          "Complexere functionaliteiten"
        ]
      },
      
      addOns: {
        extraPages: {
          title: "Extra pagina's",
          description: "Meer dan 5/10 pagina's nodig?",
          price: "€25",
          unit: "per pagina"
        },
        contactForm: {
          title: "Contactformulier met email",
          description: "Berichten direct in je inbox",
          price: "€35",
          unit: "eenmalig"
        },
        seo: {
          title: "SEO Optimalisatie",
          description: "Beter gevonden worden in Google",
          price: "€75",
          unit: "eenmalig"
        },
        analytics: {
          title: "Website Analytics",
          description: "Inzicht in je bezoekers",
          price: "€45",
          unit: "eenmalig"
        },
        multiLanguage: {
          title: "Meertalig (NL/EN)",
          description: "Website in meerdere talen",
          price: "€100",
          unit: "eenmalig"
        },
        customDesign: {
          title: "Custom Design",
          description: "Uniek ontwerp op maat",
          price: "€150",
          unit: "eenmalig"
        },
        logoDesign: {
          title: "Logo Ontwerp",
          description: "Professioneel logo voor je bedrijf",
          price: "€125",
          unit: "eenmalig"
        },
        copywriting: {
          title: "Teksten Schrijven",
          description: "Professionele webteksten",
          price: "€100",
          unit: "eenmalig"
        },
        maintenance: {
          title: "Maandelijks Onderhoud",
          description: "Hosting, updates & backups",
          price: "€15",
          unit: "per maand"
        }
      },
      
      summary: "Totaaloverzicht",
      basePrice: "Basisprijs",
      extras: "Extra's",
      total: "Totaal",
      oneTime: "Eenmalig",
      monthly: "Maandelijks",
      exclVat: "Alle prijzen zijn excl. BTW",
      
      ctaTitle: "Klaar om te beginnen?",
      ctaText: "Dit is een indicatie. Neem contact op voor een exacte offerte op maat.",
      ctaButton: "Vraag offerte aan",
      
      note: "Let op: dit is een prijsindicatie. De exacte prijs hangt af van jouw specifieke wensen.",
      optional: "(optioneel)"
    },
    en: {
      back: "Back",
      title: "What does a website cost?",
      subtitle: "Calculate directly what your website costs",
      step1: "Step 1: Choose your website type",
      step2: "Step 2: Add extras (optional)",
      
      basic: {
        title: "Basic Website",
        price: "€350",
        description: "Perfect for freelancers and small businesses",
        includes: [
          "Modern, responsive website",
          "Up to 5 pages",
          "Mobile, tablet & desktop",
          "Fast loading time",
          "SSL certificate"
        ]
      },
      advanced: {
        title: "Advanced Website",
        price: "€450",
        description: "For businesses that need more",
        includes: [
          "Everything from Basic Website",
          "Up to 10 pages",
          "Appointment system possible",
          "Client portal possible",
          "More complex functionalities"
        ]
      },
      
      addOns: {
        extraPages: {
          title: "Extra pages",
          description: "Need more than 5/10 pages?",
          price: "€25",
          unit: "per page"
        },
        contactForm: {
          title: "Contact form with email",
          description: "Messages directly in your inbox",
          price: "€35",
          unit: "one-time"
        },
        seo: {
          title: "SEO Optimization",
          description: "Be found better in Google",
          price: "€75",
          unit: "one-time"
        },
        analytics: {
          title: "Website Analytics",
          description: "Insight into your visitors",
          price: "€45",
          unit: "one-time"
        },
        multiLanguage: {
          title: "Multi-language (NL/EN)",
          description: "Website in multiple languages",
          price: "€100",
          unit: "one-time"
        },
        customDesign: {
          title: "Custom Design",
          description: "Unique custom design",
          price: "€150",
          unit: "one-time"
        },
        logoDesign: {
          title: "Logo Design",
          description: "Professional logo for your business",
          price: "€125",
          unit: "one-time"
        },
        copywriting: {
          title: "Copywriting",
          description: "Professional web texts",
          price: "€100",
          unit: "one-time"
        },
        maintenance: {
          title: "Monthly Maintenance",
          description: "Hosting, updates & backups",
          price: "€15",
          unit: "per month"
        }
      },
      
      summary: "Total Overview",
      basePrice: "Base price",
      extras: "Extras",
      total: "Total",
      oneTime: "One-time",
      monthly: "Monthly",
      exclVat: "All prices excl. VAT",
      
      ctaTitle: "Ready to get started?",
      ctaText: "This is an indication. Contact us for an exact customized quote.",
      ctaButton: "Request quote",
      
      note: "Note: this is a price indication. The exact price depends on your specific wishes.",
      optional: "(optional)"
    }
  };

  const t = content[language] || content.nl;

  // Pricing
  const prices = {
    basic: 350,
    advanced: 450,
    extraPages: 25,
    contactForm: 35,
    seo: 75,
    analytics: 45,
    multiLanguage: 100,
    customDesign: 150,
    logoDesign: 125,
    copywriting: 100,
    maintenance: 15
  };

  // Calculate totals
  const calculateTotal = () => {
    let oneTime = websiteType === 'basic' ? prices.basic : prices.advanced;
    let monthly = 0;

    oneTime += addOns.extraPages * prices.extraPages;
    if (addOns.contactForm) oneTime += prices.contactForm;
    if (addOns.seo) oneTime += prices.seo;
    if (addOns.analytics) oneTime += prices.analytics;
    if (addOns.multiLanguage) oneTime += prices.multiLanguage;
    if (addOns.customDesign) oneTime += prices.customDesign;
    if (addOns.logoDesign) oneTime += prices.logoDesign;
    if (addOns.copywriting) oneTime += prices.copywriting;
    if (addOns.maintenance) monthly = prices.maintenance;

    return { oneTime, monthly };
  };

  const totals = calculateTotal();

  const toggleAddOn = (key) => {
    if (key === 'extraPages') return; // Handle separately
    setAddOns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustExtraPages = (delta) => {
    setAddOns(prev => ({
      ...prev,
      extraPages: Math.max(0, Math.min(20, prev.extraPages + delta))
    }));
  };

  return (
    <div className="min-h-screen bg-white" data-testid="calculator-page">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <Link to="/" className="font-heading text-xl font-bold">Yrvante</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-12 px-6 md:px-12 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-16 text-center"
          >
            <Calculator className="mx-auto mb-6 text-gray-500" size={48} strokeWidth={1} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-thin mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Selections */}
          <div className="lg:col-span-2 space-y-12">
            {/* Step 1: Website Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading mb-6">{t.step1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic */}
                <div
                  data-testid="website-type-basic"
                  onClick={() => setWebsiteType('basic')}
                  className={`cursor-pointer p-6 border-2 transition-all ${
                    websiteType === 'basic' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading text-xl">{t.basic.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{t.basic.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      websiteType === 'basic' ? 'border-black bg-black' : 'border-gray-300'
                    }`}>
                      {websiteType === 'basic' && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-3xl font-heading mb-4">{t.basic.price}</p>
                  <ul className="space-y-2">
                    {t.basic.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advanced */}
                <div
                  data-testid="website-type-advanced"
                  onClick={() => setWebsiteType('advanced')}
                  className={`cursor-pointer p-6 border-2 transition-all ${
                    websiteType === 'advanced' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading text-xl">{t.advanced.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{t.advanced.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      websiteType === 'advanced' ? 'border-black bg-black' : 'border-gray-300'
                    }`}>
                      {websiteType === 'advanced' && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-3xl font-heading mb-4">{t.advanced.price}</p>
                  <ul className="space-y-2">
                    {t.advanced.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading mb-2">{t.step2}</h2>
              <p className="text-gray-500 text-sm mb-6">{t.optional}</p>
              
              <div className="space-y-4">
                {/* Extra Pages - Special handler */}
                <div className="p-4 border border-gray-200 hover:border-gray-400 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{t.addOns.extraPages.title}</h4>
                      <p className="text-sm text-gray-500">{t.addOns.extraPages.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">{t.addOns.extraPages.price} {t.addOns.extraPages.unit}</span>
                      <div className="flex items-center gap-2">
                        <button
                          data-testid="extra-pages-minus"
                          onClick={() => adjustExtraPages(-1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-mono" data-testid="extra-pages-count">{addOns.extraPages}</span>
                        <button
                          data-testid="extra-pages-plus"
                          onClick={() => adjustExtraPages(1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other add-ons */}
                {Object.entries(t.addOns).filter(([key]) => key !== 'extraPages').map(([key, addon]) => (
                  <div
                    key={key}
                    data-testid={`addon-${key}`}
                    onClick={() => toggleAddOn(key)}
                    className={`p-4 border cursor-pointer transition-all ${
                      addOns[key] 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{addon.title}</h4>
                        <p className="text-sm text-gray-500">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{addon.price} {addon.unit}</span>
                        <div className={`w-6 h-6 border-2 flex items-center justify-center ${
                          addOns[key] ? 'border-black bg-black' : 'border-gray-300'
                        }`}>
                          {addOns[key] && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sticky top-28"
            >
              <div className="bg-black text-white p-8" data-testid="price-summary">
                <h3 className="font-heading text-xl mb-6">{t.summary}</h3>
                
                {/* Base price */}
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">{t.basePrice}</span>
                  <span>€{websiteType === 'basic' ? prices.basic : prices.advanced}</span>
                </div>

                {/* Add-ons */}
                {addOns.extraPages > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                    <span>€{addOns.extraPages * prices.extraPages}</span>
                  </div>
                )}
                {Object.entries(addOns).filter(([key, value]) => key !== 'extraPages' && key !== 'maintenance' && value).map(([key]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">{t.addOns[key].title}</span>
                    <span>€{prices[key]}</span>
                  </div>
                ))}

                {/* Totals */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{t.oneTime}</span>
                    <span className="text-3xl font-heading" data-testid="total-onetime">€{totals.oneTime}</span>
                  </div>
                  {addOns.maintenance && (
                    <div className="flex justify-between items-center text-gray-400">
                      <span>{t.monthly}</span>
                      <span className="text-xl" data-testid="total-monthly">€{totals.monthly}/mnd</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-6">{t.exclVat}</p>

                {/* CTA */}
                <Link
                  to="/#contact"
                  data-testid="calculator-cta"
                  className="block w-full mt-8 py-4 bg-white text-black text-center font-mono text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  {t.ctaButton}
                </Link>
              </div>

              {/* Note */}
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200">
                <div className="flex gap-3">
                  <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">{t.note}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-heading text-lg">Yrvante</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorPage;
