import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, ArrowRight, Check, Plus, Minus, Calculator, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CalculatorPage = () => {
  const { language } = useLanguage();
  
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [addOns, setAddOns] = useState({
    extraPages: 0,
    multiLanguage: false,
    extraForm: false,
    maintenance: false,
    bookingSystem: false,
    googleReviews: false,
  });

  const content = {
    nl: {
      back: "Terug",
      title: "Wat kost jouw website?",
      subtitle: "Bereken direct de prijs voor je nieuwe website",
      step1: "Stap 1: Kies je pakket",
      step2: "Stap 2: Voeg extra's toe (optioneel)",
      
      packages: {
        basic: {
          name: "Basis Pakket",
          price: 500,
          description: "Perfect voor startende ondernemers",
          includes: [
            "Moderne responsive website",
            "Tot 3 pagina's",
            "Mobiel, tablet & desktop",
            "Snelle hosting via Vercel",
            "Basis contactpagina",
            "6 correctierondes"
          ]
        },
        pro: {
          name: "Pro Pakket",
          price: 900,
          description: "Meest gekozen door groeiende bedrijven",
          popular: true,
          includes: [
            "Alles uit Basis +",
            "Tot 10 pagina's",
            "Basis SEO-optimalisatie",
            "Blog pagina",
            "Portfolio pagina",
            "Contactformulier met email",
            "Complexere layouts"
          ]
        },
        premium: {
          name: "Premium Pakket",
          price: 1400,
          description: "Complete oplossing voor ambitieuze bedrijven",
          includes: [
            "Alles uit Pro +",
            "Tot 15 pagina's",
            "Afspraaksysteem",
            "Google Reviews integratie",
            "Meertalige website",
            "Snellere reactietijd (12 uur)"
          ]
        }
      },
      
      addOns: {
        extraPages: {
          title: "Extra pagina's",
          description: "Voor extra content (diensten, blog artikelen, portfolio items)",
          price: 40,
          unit: "per pagina"
        },
        multiLanguage: {
          title: "Meertalige website",
          description: "Website in meerdere talen met taalwisselaar",
          price: 100,
          unit: "eenmalig"
        },
        extraForm: {
          title: "Extra contactformulier",
          description: "Voor offerte aanvragen of afspraak verzoeken",
          price: 80,
          unit: "eenmalig"
        },
        maintenance: {
          title: "Onderhoud abonnement",
          description: "Hosting, updates, kleine wijzigingen en beveiliging",
          price: 20,
          unit: "per maand"
        },
        bookingSystem: {
          title: "Online boekingssysteem",
          description: "Afspraken boeken via de website met admin dashboard",
          price: 180,
          unit: "eenmalig"
        },
        googleReviews: {
          title: "Google Reviews op website",
          description: "Toon reviews direct op je website",
          price: 80,
          unit: "eenmalig"
        }
      },
      
      summary: "Jouw offerte",
      basePrice: "Pakket prijs",
      extras: "Extra opties",
      total: "Totaal",
      oneTime: "Eenmalige kosten",
      monthly: "Maandelijks",
      exclVat: "Alle prijzen zijn excl. BTW",
      
      ctaButton: "Vraag offerte aan",
      
      note: "Prijzen zijn exclusief tekstschrijven en foto's. Content wordt door jou aangeleverd. Inclusief 6 correctierondes per project.",
      optional: "(optioneel)"
    },
    en: {
      back: "Back",
      title: "What does your website cost?",
      subtitle: "Calculate the price for your new website directly",
      step1: "Step 1: Choose your package",
      step2: "Step 2: Add extras (optional)",
      
      packages: {
        basic: {
          name: "Basic Package",
          price: 500,
          description: "Perfect for starting entrepreneurs",
          includes: [
            "Modern responsive website",
            "Up to 3 pages",
            "Mobile, tablet & desktop",
            "Fast hosting via Vercel",
            "Basic contact page",
            "6 revision rounds"
          ]
        },
        pro: {
          name: "Pro Package",
          price: 900,
          description: "Most chosen by growing businesses",
          popular: true,
          includes: [
            "Everything from Basic +",
            "Up to 10 pages",
            "Basic SEO optimization",
            "Blog page",
            "Portfolio page",
            "Contact form with email",
            "Complex layouts"
          ]
        },
        premium: {
          name: "Premium Package",
          price: 1400,
          description: "Complete solution for ambitious businesses",
          includes: [
            "Everything from Pro +",
            "Up to 15 pages",
            "Booking system",
            "Google Reviews integration",
            "Multi-language website",
            "Priority support"
          ]
        }
      },
      
      addOns: {
        extraPages: {
          title: "Extra pages",
          description: "For extra content (services, blog posts, portfolio items)",
          price: 40,
          unit: "per page"
        },
        multiLanguage: {
          title: "Multi-language website",
          description: "Website in multiple languages with language switcher",
          price: 100,
          unit: "one-time"
        },
        extraForm: {
          title: "Extra contact form",
          description: "For quote requests or appointment requests",
          price: 80,
          unit: "one-time"
        },
        maintenance: {
          title: "Maintenance subscription",
          description: "Hosting, updates, small changes and security",
          price: 20,
          unit: "per month"
        },
        bookingSystem: {
          title: "Online booking system",
          description: "Book appointments via the website with admin dashboard",
          price: 180,
          unit: "one-time"
        },
        googleReviews: {
          title: "Google Reviews on website",
          description: "Show reviews directly on your website",
          price: 80,
          unit: "one-time"
        }
      },
      
      summary: "Your quote",
      basePrice: "Package price",
      extras: "Extra options",
      total: "Total",
      oneTime: "One-time costs",
      monthly: "Monthly",
      exclVat: "All prices excl. VAT",
      
      ctaButton: "Request quote",
      
      note: "Prices exclude copywriting and photos. Content is provided by you. Includes 6 revision rounds per project.",
      optional: "(optional)"
    }
  };

  const t = content[language] || content.nl;

  const prices = {
    basic: 500,
    pro: 900,
    premium: 1400,
    extraPages: 40,
    multiLanguage: 100,
    extraForm: 80,
    maintenance: 20,
    bookingSystem: 180,
    googleReviews: 80
  };

  const calculateTotal = () => {
    let oneTime = prices[selectedPackage];
    let monthly = 0;

    oneTime += addOns.extraPages * prices.extraPages;
    if (addOns.multiLanguage) oneTime += prices.multiLanguage;
    if (addOns.extraForm) oneTime += prices.extraForm;
    if (addOns.bookingSystem) oneTime += prices.bookingSystem;
    if (addOns.googleReviews) oneTime += prices.googleReviews;
    if (addOns.maintenance) monthly = prices.maintenance;

    return { oneTime, monthly };
  };

  const totals = calculateTotal();

  const toggleAddOn = (key) => {
    if (key === 'extraPages') return;
    setAddOns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustExtraPages = (delta) => {
    setAddOns(prev => ({
      ...prev,
      extraPages: Math.max(0, Math.min(30, prev.extraPages + delta))
    }));
  };

  return (
    <div className="min-h-screen bg-white" data-testid="calculator-page">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
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
      <section className="pt-28 pb-12 px-6 md:px-12 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-16 text-center"
          >
            <Calculator className="mx-auto mb-6 text-gray-400" size={48} strokeWidth={1.5} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
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
            {/* Step 1: Package Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6">{t.step1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(t.packages).map(([key, pkg]) => (
                  <div
                    key={key}
                    data-testid={`package-${key}`}
                    onClick={() => setSelectedPackage(key)}
                    className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      selectedPackage === key 
                        ? 'border-black bg-gray-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles size={12} />
                        {language === 'nl' ? 'Populair' : 'Popular'}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold">{pkg.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage === key ? 'border-black bg-black' : 'border-gray-300'
                      }`}>
                        {selectedPackage === key && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                    
                    <p className="text-3xl font-heading font-bold mb-4">€{pkg.price}</p>
                    
                    <ul className="space-y-2">
                      {pkg.includes.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-black flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                      {pkg.includes.length > 4 && (
                        <li className="text-sm text-gray-400">
                          + {pkg.includes.length - 4} {language === 'nl' ? 'meer' : 'more'}...
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-2">{t.step2}</h2>
              <p className="text-gray-500 text-sm mb-6">{t.optional}</p>
              
              <div className="space-y-4">
                {/* Extra Pages */}
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{t.addOns.extraPages.title}</h4>
                      <p className="text-sm text-gray-500">{t.addOns.extraPages.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 font-mono">€{t.addOns.extraPages.price} {t.addOns.extraPages.unit}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustExtraPages(-1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-lg">{addOns.extraPages}</span>
                        <button
                          onClick={() => adjustExtraPages(1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all"
                        >
                          <Plus size={16} />
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
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      addOns[key] 
                        ? 'border-black bg-gray-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{addon.title}</h4>
                        <p className="text-sm text-gray-500">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono font-bold">€{addon.price} <span className="font-normal text-gray-400">{addon.unit}</span></span>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
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
              <div className="bg-black text-white p-8 rounded-3xl shadow-2xl" data-testid="price-summary">
                <h3 className="font-heading text-xl font-bold mb-6">{t.summary}</h3>
                
                {/* Package */}
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">{t.packages[selectedPackage].name}</span>
                  <span className="font-bold">€{prices[selectedPackage]}</span>
                </div>

                {/* Add-ons */}
                {addOns.extraPages > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                    <span>€{addOns.extraPages * prices.extraPages}</span>
                  </div>
                )}
                {Object.entries(addOns).filter(([key, value]) => key !== 'extraPages' && key !== 'maintenance' && value).map(([key]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300">{t.addOns[key].title}</span>
                    <span>€{prices[key]}</span>
                  </div>
                ))}

                {/* Totals */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{t.oneTime}</span>
                    <span className="text-4xl font-heading font-bold" data-testid="total-onetime">€{totals.oneTime}</span>
                  </div>
                  {addOns.maintenance && (
                    <div className="flex justify-between items-center text-gray-400">
                      <span>{t.monthly}</span>
                      <span className="text-xl font-bold" data-testid="total-monthly">€{totals.monthly}/mnd</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-6">{t.exclVat}</p>

                {/* CTA */}
                <Link
                  to="/#contact"
                  className="block w-full mt-8 py-4 bg-white text-black text-center font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  {t.ctaButton}
                </Link>
              </div>

              {/* Note */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
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
          <span className="font-heading text-lg font-bold">Yrvante</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorPage;
