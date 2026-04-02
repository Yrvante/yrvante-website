import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { ArrowLeft, ArrowRight, Check, Plus, Minus, Calculator, Info, Sparkles, Send, User, Mail, Phone, MessageSquare, Calendar, Clock, Globe, Shield, Star, Tag, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { IPhoneMockup, MiniWebsite } from "../components/DeviceMockups";
import axios from "axios";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;
// On Vercel (production), use relative path for serverless functions
// In development/preview, use the full backend URL
const API_BASE = API_URL ? `${API_URL}/api` : '/api';
const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";

// Which add-ons are already included per package (don't show as extra)
const excludedAddOns = {
  rebranding: ['multiLanguage', 'bookingSystem', 'extraForm', 'googleReviews'], // Rebranding = alleen design opfrisbeurt
  basic: ['googleReviews'],                                      // Te geavanceerd voor Basis
  pro: ['extraForm'],                                            // Contactformulier zit al in Pro
  premium: ['multiLanguage', 'bookingSystem', 'extraForm']       // Alles inbegrepen in Premium
};

// Interactive Booking System Preview
const BookingSystemPreview = ({ language }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);

  const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr'];
  const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-neutral-700/50 bg-white/60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900"
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {language === 'nl' ? 'Voorbeeld: Boekingssysteem' : 'Preview: Booking System'}
            </p>
            <p className="text-xs text-gray-400">
              {language === 'nl' ? '24/7 afspraken op jouw website' : '24/7 bookings on your website'}
            </p>
          </div>
        </div>

        {/* Day selector */}
        <div className="flex gap-1.5 mb-3">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setSelectedDay(i); setSelectedTime(null); }}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedDay === i ? 'bg-gray-900 dark:bg-neutral-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Time slots */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {times.map((time, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setSelectedTime(i); }}
              className={`py-2 rounded-xl text-xs transition-all ${
                selectedTime === i
                  ? 'bg-gray-900 dark:bg-neutral-800 text-white'
                  : 'bg-gray-50 border border-gray-200 dark:border-neutral-700 text-gray-600 hover:border-gray-400'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedTime !== null && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mb-3"
            >
              <button className="w-full py-2.5 bg-gray-900 dark:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                <Check size={14} />
                {language === 'nl' ? 'Afspraak bevestigen' : 'Confirm Appointment'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-400">
          {language === 'nl' ? 'Klik op een dag en tijdslot — zo werkt het op jouw website' : 'Click a day and time slot — this is how it works on your website'}
        </p>
      </div>
    </motion.div>
  );
};

// Multi-language Preview
const MultiLangPreview = ({ language }) => {
  const [lang, setLang] = useState('nl');
  const texts = { nl: 'Welkom!', en: 'Welcome!', de: 'Willkommen!' };
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
      className="mt-3 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-neutral-700/50 bg-white/60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"><Globe size={16} className="text-gray-600" /></div>
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{language === 'nl' ? 'Voorbeeld: Meertalige website' : 'Preview: Multi-language website'}</p>
            <p className="text-xs text-gray-400">{language === 'nl' ? 'Bereik klanten in hun eigen taal' : 'Reach customers in their own language'}</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {[['nl', '🇳🇱'], ['en', '🇬🇧'], ['de', '🇩🇪']].map(([code, flag]) => (
            <button key={code} onClick={(e) => { e.stopPropagation(); setLang(code); }}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1 ${lang === code ? 'bg-gray-900 dark:bg-neutral-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {flag} {code.toUpperCase()}
            </button>
          ))}
        </div>
        <motion.div key={lang} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="bg-white/40 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-3 text-center">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{texts[lang]}</p>
          <p className="text-xs text-gray-400 mt-0.5">{language === 'nl' ? 'Alle tekst automatisch vertaald' : 'All text auto-translated'}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Contact Form Preview
const ContactFormPreview = ({ language }) => {
  const [sent, setSent] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
      className="mt-3 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-neutral-700/50 bg-white/60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"><Mail size={16} className="text-gray-600" /></div>
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{language === 'nl' ? 'Voorbeeld: Contactformulier' : 'Preview: Contact form'}</p>
            <p className="text-xs text-gray-400">{language === 'nl' ? 'Berichten direct in jouw inbox' : 'Messages directly in your inbox'}</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"><Check size={18} className="text-green-600" /></div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{language === 'nl' ? 'Bericht ontvangen!' : 'Message received!'}</p>
              <button onClick={(e) => { e.stopPropagation(); setSent(false); }} className="text-xs text-gray-400 underline mt-1">{language === 'nl' ? 'opnieuw' : 'again'}</button>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-2">
              <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-xl border border-gray-200 dark:border-neutral-700 px-3 py-2"><p className="text-xs text-gray-300">Naam...</p></div>
              <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-xl border border-gray-200 dark:border-neutral-700 px-3 py-2"><p className="text-xs text-gray-300">Email...</p></div>
              <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-xl border border-gray-200 dark:border-neutral-700 px-3 py-2 h-10"><p className="text-xs text-gray-300">Bericht...</p></div>
              <button onClick={(e) => { e.stopPropagation(); setSent(true); }} className="w-full py-2 bg-gray-900 dark:bg-neutral-800 text-white text-xs font-bold rounded-xl">
                {language === 'nl' ? 'Verstuur' : 'Send'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Maintenance Preview
const MaintenancePreview = ({ language }) => (
  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
    className="mt-3 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-neutral-700/50 bg-white/60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900">
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"><Shield size={16} className="text-gray-600" /></div>
        <div>
          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{language === 'nl' ? 'Status: Alles Operationeel' : 'Status: All Systems Go'}</p>
          <p className="text-xs text-gray-400">{language === 'nl' ? 'Ik houd alles voor je bij' : 'I keep track of everything for you'}</p>
        </div>
      </div>
      <div className="space-y-2">
        {[language === 'nl' ? 'Server Online' : 'Server Online', 'SSL Certificaat', language === 'nl' ? 'Backup Vandaag' : 'Backup Today', language === 'nl' ? 'Updates Geïnstalleerd' : 'Updates Installed'].map((label, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800/60 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            <span className="flex items-center gap-1 text-xs text-green-600 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> OK</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Google Reviews Preview
const GoogleReviewsPreview = ({ language }) => (
  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
    className="mt-3 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-neutral-700/50 bg-white/60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900">
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"><Star size={16} className="text-gray-600" /></div>
        <div>
          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{language === 'nl' ? 'Voorbeeld: Google Reviews' : 'Preview: Google Reviews'}</p>
          <p className="text-xs text-gray-400">{language === 'nl' ? 'Bouw vertrouwen met klantbeoordelingen' : 'Build trust with reviews'}</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Anna de Vries', review: language === 'nl' ? 'Geweldige website, precies wat ik zocht!' : 'Amazing website, exactly what I needed!' },
          { name: 'Thomas B.', review: language === 'nl' ? 'Snel geleverd en top kwaliteit.' : 'Fast delivery and top quality.' },
        ].map((r, i) => (
          <div key={i} className="bg-white/40 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">{r.name[0]}</div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{r.name}</span>
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />)}</div>
            </div>
            <p className="text-xs text-gray-500">{r.review}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const VALID_DISCOUNT_CODES = {
  YRVA10: { discount: 0.10, label: "10% korting", labelEn: "10% discount" },
};

const CalculatorPage = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [addOns, setAddOns] = useState({
    extraPages: 0,
    multiLanguage: false,
    extraForm: false,
    maintenance: false,
    bookingSystem: false,
    googleReviews: false,
    darkMode: false,
  });
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');

  // Read package from URL params (from quiz)
  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg && ['rebranding', 'basic', 'pro', 'premium'].includes(pkg)) {
      setSelectedPackage(pkg);
    }
    const code = searchParams.get('code');
    if (code) {
      setDiscountCode(code.toUpperCase());
      const valid = VALID_DISCOUNT_CODES[code.toUpperCase()];
      if (valid) setAppliedDiscount({ code: code.toUpperCase(), ...valid });
    }
  }, [searchParams]);

  const applyDiscountCode = () => {
    const code = discountCode.trim().toUpperCase();
    const valid = VALID_DISCOUNT_CODES[code];
    if (valid) {
      setAppliedDiscount({ code, ...valid });
      setDiscountError('');
      toast.success(language === 'nl' ? `Kortingscode ${code} toegepast!` : `Discount code ${code} applied!`);
    } else {
      setDiscountError(language === 'nl' ? 'Ongeldige kortingscode' : 'Invalid discount code');
      setAppliedDiscount(null);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  const handlePackageChange = (key) => {
    setSelectedPackage(key);
    const excluded = excludedAddOns[key] || [];
    if (excluded.length > 0) {
      setAddOns(prev => {
        const updated = { ...prev };
        excluded.forEach(addon => {
          if (typeof updated[addon] === 'boolean') updated[addon] = false;
        });
        return updated;
      });
    }
  };
  
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
        rebranding: {
          name: "Rebranding Website",
          price: 349,
          description: "Bestaande website een nieuw uiterlijk",
          includes: [
            "Compleet nieuw design",
            "Moderne layout & styling",
            "Responsive optimalisatie",
            "Verbeterde gebruikservaring",
            "Snelheidsoptimalisatie"
          ]
        },
        basic: {
          name: "Basis Website",
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
          name: "Pro Website",
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
          name: "Premium Website",
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
        },
        darkMode: {
          title: "Dark mode",
          description: "Licht/donker modus schakelaar op je website",
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
        rebranding: {
          name: "Rebranding Website",
          price: 349,
          description: "Give your existing website a new look",
          includes: [
            "Complete new design",
            "Modern layout & styling",
            "Responsive optimization",
            "Improved user experience",
            "Speed optimization"
          ]
        },
        basic: {
          name: "Basic Website",
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
          name: "Pro Website",
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
          name: "Premium Website",
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
        },
        darkMode: {
          title: "Dark mode",
          description: "Light/dark mode toggle on your website",
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
    rebranding: 349,
    basic: 500,
    pro: 900,
    premium: 1400,
    extraPages: 50,
    multiLanguage: 200,
    extraForm: 80,
    maintenance: 25,
    bookingSystem: 250,
    googleReviews: 120,
    darkMode: 80,
  };

  const calculateTotal = () => {
    let oneTime = prices[selectedPackage];
    let monthly = 0;

    oneTime += addOns.extraPages * prices.extraPages;
    if (addOns.multiLanguage) oneTime += prices.multiLanguage;
    if (addOns.extraForm) oneTime += prices.extraForm;
    if (addOns.bookingSystem) oneTime += prices.bookingSystem;
    if (addOns.googleReviews) oneTime += prices.googleReviews;
    if (addOns.darkMode) oneTime += prices.darkMode;
    if (addOns.maintenance) monthly = prices.maintenance;

    let discountAmount = 0;
    if (appliedDiscount) {
      discountAmount = Math.round(oneTime * appliedDiscount.discount);
      oneTime = oneTime - discountAmount;
    }

    return { oneTime, monthly, discountAmount };
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
    if (addOns.darkMode) {
      extras.push(`• ${t.addOns.darkMode.title} - €${prices.darkMode}`);
    }
    if (addOns.maintenance) {
      extras.push(`• ${t.addOns.maintenance.title} - €${prices.maintenance}/maand`);
    }
    
    if (extras.length > 0) {
      summary += `Extra's:\n${extras.join('\n')}\n\n`;
    }
    
    if (appliedDiscount) {
      summary += `KORTINGSCODE: ${appliedDiscount.code} (-${Math.round(appliedDiscount.discount * 100)}%)\nKorting: -€${totals.discountAmount}\n\n`;
    }
    
    summary += `TOTAAL EENMALIG: €${totals.oneTime}`;
    if (addOns.maintenance) {
      summary += `\nMAANDELIJKS: €${totals.monthly}/maand`;
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
      await axios.post(`${API_BASE}/contact`, {
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
    <div className="min-h-screen relative bg-gray-50 dark:bg-neutral-950" data-testid="calculator-page">
      <SEO page="/calculator" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <ArrowLeft size={14} />
              {t.back}
            </Link>
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-12 px-4 sm:px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-4 sm:py-8 md:py-16 text-center"
          >
            <Calculator className="mx-auto mb-4 sm:mb-6 text-gray-600" size={36} strokeWidth={1.5} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
              {t.title}
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Selections */}
          <div className="lg:col-span-2 space-y-12">
            {/* Step 1: Package Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6 dark:text-white">{t.step1}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(t.packages).map(([key, pkg]) => (
                  <div
                    key={key}
                    data-testid={`package-${key}`}
                    onClick={() => handlePackageChange(key)}
                    className={`relative cursor-pointer p-6 rounded-3xl border-2 transition-all ${
                      selectedPackage === key 
                        ? 'border-black dark:border-white bg-gray-50 dark:bg-neutral-800 shadow-lg' 
                        : 'border-gray-200 dark:border-neutral-700 hover:border-gray-400'
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
                        <h3 className="font-bold dark:text-white">{pkg.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage === key ? 'border-gray-500 bg-gray-500' : 'border-gray-300'
                      }`}>
                        {selectedPackage === key && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                    
                    <p className="text-3xl font-heading font-bold mb-4 dark:text-white">€{pkg.price}</p>
                    
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
              <h2 className="text-2xl font-heading font-bold mb-2 dark:text-white">{t.step2}</h2>
              <p className="text-gray-500 text-sm mb-6">{t.optional}</p>
              
              {/* Tip */}
              <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-2xl">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">Tip:</span> {language === 'nl' 
                    ? 'Combineer je 2 of meer extra\'s? Dan is een hoger pakket vaak voordeliger. Ik adviseer je graag vrijblijvend.'
                    : 'Combining 2 or more extras? A higher package is often more advantageous. I\'d be happy to advise you without obligation.'}
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Extra Pages */}
                <div className="p-5 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl border border-gray-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium dark:text-white">{t.addOns.extraPages.title}</h4>
                      <p className="text-sm text-gray-500">{t.addOns.extraPages.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 font-mono">€{t.addOns.extraPages.price} {t.addOns.extraPages.unit}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustExtraPages(-1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-7000 hover:text-white transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-lg dark:text-white">{addOns.extraPages}</span>
                        <button
                          onClick={() => adjustExtraPages(1)}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-7000 hover:text-white transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Included-in-package notice */}
                {(excludedAddOns[selectedPackage] || []).length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl">
                    <Check size={14} className="text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      {language === 'nl'
                        ? `Al inbegrepen in dit pakket: ${(excludedAddOns[selectedPackage] || []).map(k => t.addOns[k]?.title).filter(Boolean).join(', ')}`
                        : `Already included in this package: ${(excludedAddOns[selectedPackage] || []).map(k => t.addOns[k]?.title).filter(Boolean).join(', ')}`}
                    </p>
                  </div>
                )}

                {/* Other add-ons - filtered per package */}
                {Object.entries(t.addOns)
                  .filter(([key, addon]) =>
                    key !== 'extraPages' &&
                    !addon.hidden &&
                    !(excludedAddOns[selectedPackage] || []).includes(key)
                  )
                  .map(([key, addon]) => (
                  <div key={key}>
                    <div
                      data-testid={`addon-${key}`}
                      onClick={() => toggleAddOn(key)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        addOns[key] 
                          ? 'border-black dark:border-white bg-gray-50 dark:bg-neutral-800 shadow-md' 
                          : 'border-gray-200/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium dark:text-white">{addon.title}</h4>
                          <p className="text-sm text-gray-500">{addon.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-mono font-bold dark:text-white">€{addon.price} <span className="font-normal text-gray-400">{addon.unit}</span></span>
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            addOns[key] ? 'border-gray-500 bg-gray-500' : 'border-gray-300'
                          }`}>
                            {addOns[key] && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Show preview when add-on is selected */}
                    <AnimatePresence>
                      {key === 'bookingSystem'  && addOns.bookingSystem  && <BookingSystemPreview language={language} />}
                      {key === 'multiLanguage'  && addOns.multiLanguage  && <MultiLangPreview language={language} />}
                      {key === 'extraForm'      && addOns.extraForm      && <ContactFormPreview language={language} />}
                      {key === 'maintenance'    && addOns.maintenance    && <MaintenancePreview language={language} />}
                      {key === 'googleReviews'  && addOns.googleReviews  && <GoogleReviewsPreview language={language} />}
                    </AnimatePresence>
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
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900 text-gray-900 dark:text-gray-100 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-neutral-700" data-testid="price-summary">
                <h3 className="font-heading text-xl font-bold mb-6 dark:text-white">{t.summary}</h3>
                
                {/* Package */}
                <div className="flex justify-between items-center py-3 border-b border-gray-300 dark:border-neutral-700">
                  <span className="text-gray-600 dark:text-gray-400">{t.packages[selectedPackage].name}</span>
                  <span className="font-bold">€{prices[selectedPackage]}</span>
                </div>

                {/* Add-ons */}
                {addOns.extraPages > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-300 dark:border-neutral-700">
                    <span className="text-gray-600 dark:text-gray-400">{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                    <span>€{addOns.extraPages * prices.extraPages}</span>
                  </div>
                )}
                {Object.entries(addOns).filter(([key, value]) => key !== 'extraPages' && key !== 'maintenance' && value).map(([key]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-300 dark:border-neutral-700">
                    <span className="text-gray-600 dark:text-gray-400">{t.addOns[key].title}</span>
                    <span>€{prices[key]}</span>
                  </div>
                ))}

                {/* Discount code + Totals */}
                {appliedDiscount && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-300 dark:border-neutral-700">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-green-600" />
                      <span className="text-green-600 font-medium text-sm">{appliedDiscount.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">-€{totals.discountAmount}</span>
                      <button onClick={removeDiscount} className="text-gray-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Discount code input */}
                {!appliedDiscount && (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError(''); }}
                        placeholder={language === 'nl' ? 'Kortingscode' : 'Discount code'}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-xl text-sm focus:outline-none focus:border-gray-500 dark:text-white"
                        data-testid="discount-code-input"
                      />
                      <button
                        onClick={applyDiscountCode}
                        className="px-4 py-2.5 bg-gray-500 text-white text-xs font-bold rounded-xl hover:bg-gray-600 transition-colors"
                        data-testid="apply-discount-btn"
                      >
                        {language === 'nl' ? 'Toepassen' : 'Apply'}
                      </button>
                    </div>
                    {discountError && (
                      <p className="text-red-500 text-xs mt-1">{discountError}</p>
                    )}
                  </div>
                )}

                {/* Totals */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{t.oneTime}</span>
                    <div className="text-right">
                      {appliedDiscount && (
                        <span className="text-sm text-gray-400 line-through mr-2">€{totals.oneTime + totals.discountAmount}</span>
                      )}
                      <span className="text-4xl font-heading font-bold dark:text-white" data-testid="total-onetime">€{totals.oneTime}</span>
                    </div>
                  </div>
                  {addOns.maintenance && (
                    <div className="flex justify-between items-center text-gray-500">
                      <span>{t.monthly}</span>
                      <span className="text-xl font-bold dark:text-white" data-testid="total-monthly">€{totals.monthly}/mnd</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-6">{t.exclVat}</p>

                {/* Domain reminder */}
                <div className="mt-4 p-3 bg-gray-50 dark:bg-neutral-700/40 rounded-xl border border-gray-200/50 dark:border-neutral-600/50">
                  <div className="flex items-start gap-2">
                    <Globe size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      {language === 'nl'
                        ? 'Je hebt een domeinnaam nodig (±€10/jaar). Koop bij TransIP of Antagonist — ik help gratis met koppelen.'
                        : 'You need a domain name (±€10/yr). Buy at TransIP or Antagonist — I help connect it for free.'}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="block w-full mt-8 py-4 bg-gray-500 text-white text-center font-bold rounded-full hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                  {t.ctaButton}
                </button>
              </div>

              {/* Note */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl border border-gray-200 dark:border-neutral-700">
                <div className="flex gap-3">
                  <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">{t.note}</p>
                </div>
              </div>

              {/* Mini preview of what you're building */}
              <div className="mt-6 hidden lg:flex justify-center gap-4">
                <IPhoneMockup className="w-24">
                  <MiniWebsite variant="mobile-app" />
                </IPhoneMockup>
                <div className="self-center text-center">
                  <p className="text-[10px] text-gray-400 font-medium">{language === 'nl' ? 'Jouw website' : 'Your website'}</p>
                  <p className="text-[9px] text-gray-300 dark:text-gray-500">{language === 'nl' ? 'op elk apparaat' : 'on any device'}</p>
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
              className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {submitted ? (
                // Success State
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">{t.successTitle}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">{t.successMessage}</p>
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
                      <h3 className="text-2xl font-bold dark:text-white">{t.formTitle}</h3>
                      <p className="text-gray-500 text-sm mt-1">{t.formSubtitle}</p>
                    </div>
                    <button
                      onClick={() => setShowQuoteForm(false)}
                      className="text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Selection Summary */}
                  <div className="bg-white/40 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-4 mb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">{t.yourSelection}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{t.packages[selectedPackage].name}</span>
                        <span>€{prices[selectedPackage]}</span>
                      </div>
                      {addOns.extraPages > 0 && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.extraPages.title} (x{addOns.extraPages})</span>
                          <span>€{addOns.extraPages * prices.extraPages}</span>
                        </div>
                      )}
                      {addOns.multiLanguage && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.multiLanguage.title}</span>
                          <span>€{prices.multiLanguage}</span>
                        </div>
                      )}
                      {addOns.extraForm && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.extraForm.title}</span>
                          <span>€{prices.extraForm}</span>
                        </div>
                      )}
                      {addOns.bookingSystem && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.bookingSystem.title}</span>
                          <span>€{prices.bookingSystem}</span>
                        </div>
                      )}
                      {addOns.googleReviews && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.googleReviews.title}</span>
                          <span>€{prices.googleReviews}</span>
                        </div>
                      )}
                      {addOns.maintenance && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.addOns.maintenance.title}</span>
                          <span>€{prices.maintenance}/mnd</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 dark:border-neutral-800 pt-2 mt-2">
                        {appliedDiscount && (
                          <div className="flex justify-between text-green-600 mb-1">
                            <span className="flex items-center gap-1"><Tag size={12} /> {appliedDiscount.code}</span>
                            <span>-€{totals.discountAmount}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold">
                          <span>{t.oneTime}</span>
                          <span>€{totals.oneTime}</span>
                        </div>
                      </div>
                      {addOns.maintenance && (
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>{t.monthly}</span>
                          <span>€{totals.monthly}/mnd</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">{t.nameLabel} *</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.namePlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white dark:bg-neutral-800 dark:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">{t.emailLabel} *</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white dark:bg-neutral-800 dark:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">{t.phoneLabel}</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.phonePlaceholder}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white dark:bg-neutral-800 dark:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">{t.messageLabel}</label>
                      <div className="relative">
                        <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t.messagePlaceholder}
                          rows={3}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-black dark:focus:border-white dark:bg-neutral-800 dark:text-white transition-colors resize-none"
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
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorPage;
