import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, ArrowRight, Check, Plus, Minus, Calculator, Info, Sparkles, Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import axios from "axios";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const BG_IMAGE = "https://static.prod-images.emergentagent.com/jobs/44213466-a228-4a52-8cfe-b2e9737ed3f4/images/2a34d7236be4e054bd9f0732390c5f3d5391189a4b208e22a6d37de47cadbc9a.png";

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
  
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
            "Snelle en veilige hosting",
            "Basis contactpagina"
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
            "Meertalige website",
            "Snellere reactietijd (binnen 2 uur)"
          ]
        }
      },
      
      addOns: {
        extraPages: {
          title: "Extra pagina's",
          description: "Voor extra content (diensten, blog artikelen, portfolio items)",
          price: 50,
          unit: "per pagina"
        },
        multiLanguage: {
          title: "Meertalige website",
          description: "Website in meerdere talen met taalwisselaar",
          price: 200,
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
          price: 25,
          unit: "per maand"
        },
        bookingSystem: {
          title: "Online boekingssysteem",
          description: "Afspraken boeken via de website met admin dashboard",
          price: 250,
          unit: "eenmalig"
        },
        googleReviews: {
          title: "Google Reviews op website",
          description: "Toon reviews direct op je website",
          price: 120,
          unit: "eenmalig",
          hidden: true
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
      
      note: "Prijzen zijn exclusief tekstschrijven en foto's. Content wordt door jou aangeleverd.",
      optional: "(optioneel)",
      
      // Form translations
      formTitle: "Bijna klaar!",
      formSubtitle: "Vul je gegevens in en ik neem binnen 2 uur contact met je op",
      nameLabel: "Naam",
      namePlaceholder: "Je naam",
      emailLabel: "E-mail",
      emailPlaceholder: "je@email.com",
      phoneLabel: "Telefoon",
      phonePlaceholder: "+31 6 12345678",
      messageLabel: "Bericht (optioneel)",
      messagePlaceholder: "Vertel iets over je project...",
      submitButton: "Verstuur aanvraag",
      submitting: "Versturen...",
      successTitle: "Aanvraag verzonden!",
      successMessage: "Bedankt voor je aanvraag. Ik neem binnen 2 uur contact met je op.",
      backToCalc: "Terug naar calculator",
      yourSelection: "Jouw selectie"
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
            "Fast and secure hosting",
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
            "Multi-language website",
            "Priority support"
          ]
        }
      },
      
      addOns: {
        extraPages: {
          title: "Extra pages",
          description: "For extra content (services, blog posts, portfolio items)",
          price: 50,
          unit: "per page"
        },
        multiLanguage: {
          title: "Multi-language website",
          description: "Website in multiple languages with language switcher",
          price: 200,
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
          price: 25,
          unit: "per month"
        },
        bookingSystem: {
          title: "Online booking system",
          description: "Book appointments via the website with admin dashboard",
          price: 250,
          unit: "one-time"
        },
        googleReviews: {
          title: "Google Reviews on website",
          description: "Show reviews directly on your website",
          price: 120,
          unit: "one-time",
          hidden: true
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
      
      note: "Prices exclude copywriting and photos. Content is provided by you.",
      optional: "(optional)",
      
      // Form translations
      formTitle: "Almost there!",
      formSubtitle: "Fill in your details and I'll contact you within 2 hours",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+31 6 12345678",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Tell me about your project...",
      submitButton: "Send request",
      submitting: "Sending...",
      successTitle: "Request sent!",
      successMessage: "Thank you for your request. I will contact you within 2 hours.",
      backToCalc: "Back to calculator",
      yourSelection: "Your selection"
    }
  };

  const t = content[language] || content.nl;

  const prices = {
    basic: 500,
    pro: 900,
    premium: 1400,
    extraPages: 50,
    multiLanguage: 200,
    extraForm: 80,
    maintenance: 25,
    bookingSystem: 250,
    googleReviews: 120
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

  // Generate quote summary for email
  const generateQuoteSummary = () => {
    const packageName = t.packages[selectedPackage].name;
    const packagePrice = prices[selectedPackage];
    
    let summary = `📦 PAKKET: ${packageName} - €${packagePrice}\n\n`;
    
    // Add extras
    let extras = [];
    if (addOns.extraPages > 0) {
      extras.push(`• ${t.addOns.extraPages.title} (x${addOns.extraPages}) - €${addOns.extraPages * prices.extraPages}`);
    }
    if (addOns.multiLanguage) {
      extras.push(`• ${t.addOns.multiLanguage.title} - €${prices.multiLanguage}`);
    }
    if (addOns.extraForm) {
      extras.push(`• ${t.addOns.extraForm.title} - €${prices.extraForm}`);
    }
    if (addOns.bookingSystem) {
      extras.push(`• ${t.addOns.bookingSystem.title} - €${prices.bookingSystem}`);
    }
    if (addOns.googleReviews) {
      extras.push(`• ${t.addOns.googleReviews.title} - €${prices.googleReviews}`);
    }
    if (addOns.maintenance) {
      extras.push(`• ${t.addOns.maintenance.title} - €${prices.maintenance}/maand`);
    }
    
    if (extras.length > 0) {
      summary += `➕ EXTRA'S:\n${extras.join('\n')}\n\n`;
    }
    
    summary += `💰 TOTAAL EENMALIG: €${totals.oneTime}`;
    if (addOns.maintenance) {
      summary += `\n💳 MAANDELIJKS: €${totals.monthly}/maand`;
    }
    
    return summary;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const quoteSummary = generateQuoteSummary();
    const fullMessage = `${quoteSummary}\n\n📝 BERICHT:\n${formData.message || 'Geen extra bericht'}`;
    
    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage
      });
      
      setSubmitted(true);
      toast.success(language === 'nl' ? 'Aanvraag verzonden!' : 'Request sent!');
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error(language === 'nl' ? 'Er ging iets mis. Probeer opnieuw.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="calculator-page">
      <SEO page="/calculator" />
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

      {/* Header with Abstract Background */}
      <section className="pt-28 pb-12 px-6 md:px-12 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/40" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-16 text-center"
          >
            <Calculator className="mx-auto mb-6 text-gray-600" size={48} strokeWidth={1.5} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-gray-900">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                    className={`relative cursor-pointer p-6 rounded-3xl border-2 transition-all ${
                      selectedPackage === key 
                        ? 'border-black bg-gray-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
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
                        selectedPackage === key ? 'border-gray-500 bg-gray-500' : 'border-gray-300'
                      }`}>
                        {selectedPackage === key && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                    
                    <p className="text-3xl font-heading font-bold mb-4">€{pkg.price}</p>
                    
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
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
              
              {/* Losse prijzen overzicht */}
              <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-3xl">
                <h3 className="font-bold text-lg mb-4">
                  {language === 'nl' ? 'Losse prijzen voor extra\'s' : 'Individual prices for extras'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-2xl">
                    <p className="text-2xl font-bold">€50</p>
                    <p className="text-sm text-gray-500">{language === 'nl' ? 'Extra pagina' : 'Extra page'}</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-2xl">
                    <p className="text-2xl font-bold">€200</p>
                    <p className="text-sm text-gray-500">{language === 'nl' ? 'Meertalig' : 'Multi-language'}</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-2xl">
                    <p className="text-2xl font-bold">€80</p>
                    <p className="text-sm text-gray-500">{language === 'nl' ? 'Extra formulier' : 'Extra form'}</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-2xl">
                    <p className="text-2xl font-bold">€25<span className="text-sm text-gray-500">/pm</span></p>
                    <p className="text-sm text-gray-500">{language === 'nl' ? 'Onderhoud' : 'Maintenance'}</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-2xl">
                    <p className="text-2xl font-bold">€250</p>
                    <p className="text-sm text-gray-500">{language === 'nl' ? 'Boekingssysteem' : 'Booking system'}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-bold">💡 Tip:</span> {language === 'nl' 
                      ? 'Combineer je 2 of meer extra\'s? Dan is een hoger pakket vaak voordeliger. Ik adviseer je graag vrijblijvend.'
                      : 'Combining 2 or more extras? A higher package is often more advantageous. I\'d be happy to advise you without obligation.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Extra Pages */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
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
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-500 hover:text-white transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-lg">{addOns.extraPages}</span>
                        <button
                          onClick={() => adjustExtraPages(1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-500 hover:text-white transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other add-ons */}
                {Object.entries(t.addOns).filter(([key, addon]) => key !== 'extraPages' && !addon.hidden).map(([key, addon]) => (
                  <div
                    key={key}
                    data-testid={`addon-${key}`}
                    onClick={() => toggleAddOn(key)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
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
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          addOns[key] ? 'border-gray-500 bg-gray-500' : 'border-gray-300'
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
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 p-8 rounded-3xl shadow-xl border border-gray-300" data-testid="price-summary">
                <h3 className="font-heading text-xl font-bold mb-6">{t.summary}</h3>
                
                {/* Package */}
                <div className="flex justify-between items-center py-3 border-b border-gray-300">
                  <span className="text-gray-600">{t.packages[selectedPackage].name}</span>
                  <span className="font-bold">€{prices[selectedPackage]}</span>
                </div>

                {/* Add-ons */}
                {addOns.extraPages > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="text-gray-600">{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                    <span>€{addOns.extraPages * prices.extraPages}</span>
                  </div>
                )}
                {Object.entries(addOns).filter(([key, value]) => key !== 'extraPages' && key !== 'maintenance' && value).map(([key]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="text-gray-600">{t.addOns[key].title}</span>
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
                    <div className="flex justify-between items-center text-gray-500">
                      <span>{t.monthly}</span>
                      <span className="text-xl font-bold" data-testid="total-monthly">€{totals.monthly}/mnd</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-6">{t.exclVat}</p>

                {/* CTA */}
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="block w-full mt-8 py-4 bg-gray-500 text-white text-center font-bold rounded-full hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                  {t.ctaButton}
                </button>
              </div>

              {/* Note */}
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex gap-3">
                  <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">{t.note}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && !submitted && setShowQuoteForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {submitted ? (
                // Success State
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t.successTitle}</h3>
                  <p className="text-gray-500 mb-8">{t.successMessage}</p>
                  <button
                    onClick={() => {
                      setShowQuoteForm(false);
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="px-8 py-3 bg-gray-500 text-white rounded-full font-bold hover:bg-gray-600 transition-colors"
                  >
                    {t.backToCalc}
                  </button>
                </div>
              ) : (
                // Form
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{t.formTitle}</h3>
                      <p className="text-gray-500 text-sm mt-1">{t.formSubtitle}</p>
                    </div>
                    <button
                      onClick={() => setShowQuoteForm(false)}
                      className="text-gray-400 hover:text-black transition-colors p-2"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Selection Summary */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t.yourSelection}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{t.packages[selectedPackage].name}</span>
                        <span>€{prices[selectedPackage]}</span>
                      </div>
                      {addOns.extraPages > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                          <span>€{addOns.extraPages * prices.extraPages}</span>
                        </div>
                      )}
                      {addOns.multiLanguage && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.multiLanguage.title}</span>
                          <span>€{prices.multiLanguage}</span>
                        </div>
                      )}
                      {addOns.extraForm && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.extraForm.title}</span>
                          <span>€{prices.extraForm}</span>
                        </div>
                      )}
                      {addOns.bookingSystem && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.bookingSystem.title}</span>
                          <span>€{prices.bookingSystem}</span>
                        </div>
                      )}
                      {addOns.googleReviews && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.googleReviews.title}</span>
                          <span>€{prices.googleReviews}</span>
                        </div>
                      )}
                      {addOns.maintenance && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.addOns.maintenance.title}</span>
                          <span>€{prices.maintenance}/mnd</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                        <span>{t.oneTime}</span>
                        <span>€{totals.oneTime}</span>
                      </div>
                      {addOns.maintenance && (
                        <div className="flex justify-between text-gray-600">
                          <span>{t.monthly}</span>
                          <span>€{totals.monthly}/mnd</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.nameLabel} *</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.namePlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{t.emailLabel} *</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{t.phoneLabel}</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.phonePlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{t.messageLabel}</label>
                      <div className="relative">
                        <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t.messagePlaceholder}
                          rows={3}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gray-500 text-white font-bold rounded-full hover:bg-gray-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t.submitting}
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          {t.submitButton}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
