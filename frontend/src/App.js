import React, { useState, createContext, useContext, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import axios from "axios";

// Lazy-loaded pages for better performance
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WhyWebsitePage = lazy(() => import("./pages/WhyWebsitePage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const OverMijPage = lazy(() => import("./pages/OverMijPage"));
const DienstenPage = lazy(() => import("./pages/DienstenPage"));
const OnderhoudPage = lazy(() => import("./pages/OnderhoudPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const LeadFinderPage = lazy(() => import("./pages/LeadFinderPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const RebrandingPage = lazy(() => import("./pages/RebrandingPage"));

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Generate or get visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

// Track page view
const trackPageView = async (page) => {
  try {
    await axios.post(`${API}/analytics/pageview`, {
      page,
      visitor_id: getVisitorId(),
      referrer: document.referrer || ""
    });
  } catch (e) {
    console.log("Analytics tracking failed");
  }
};

// Translations
const translations = {
  nl: {
    nav: {
      services: "Diensten",
      about: "Over Ons",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      slogan: '"Smart web & software"',
      description: "Yrvante bouwt moderne websites en slimme digitale oplossingen voor freelancers en bedrijven. Strak design, betrouwbare technologie en websites die uw bedrijf laten groeien.",
      cta: "Website Aanvragen",
    },
    services: {
      title: "Onze Diensten",
      subtitle: "Wat wij bieden",
      web: {
        title: "Website Ontwikkeling",
        description: "Moderne, responsieve websites gebouwd voor freelancers en bedrijven.",
        price: "Vanaf €399 excl. BTW"
      },
      business: {
        title: "Geavanceerde Websites",
        description: "Websites met werkende functionaliteiten: afspraken maken, klantportalen, app development en meer.",
        price: "Vanaf €699 excl. BTW"
      },
      software: {
        title: "Maandelijks Onderhoud",
        description: "Hosting, updates, beveiliging en backups. Dit abonnement is optioneel — zonder dit plan ben je na oplevering zelf verantwoordelijk voor het onderhoud van je website.",
        price: "€20 per maand excl. BTW"
      },
    },
    target: {
      title: "Voor Wie Bouwen Wij?",
      subtitle: "Onze doelgroep",
      zzp: {
        title: "ZZP'ers",
        description: "Freelancers zonder website die professioneel online willen verschijnen.",
      },
      outdated: {
        title: "Verouderde Websites",
        description: "Bedrijven met een website die toe is aan een moderne update.",
      },
      startup: {
        title: "Startups",
        description: "Nieuwe bedrijven die een sterke online aanwezigheid nodig hebben.",
      },
    },
    about: {
      title: "Over Yrvante",
      subtitle: "Onze achtergrond",
      description: "Achter Yrvante schuilt een passie voor techniek en resultaat. Met een achtergrond in high-precision manufacturing weten wij als geen ander dat de kleinste details het grootste verschil maken.",
      description2: "Ons doel? Kleine bedrijven helpen groeien met websites die niet alleen mooi zijn, maar ook écht werken. Wij zien een website niet als een statisch visitekaartje, maar als een oplossing voor een probleem.",
      location: "Almelo, Nederland",
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Recent werk",
      comingSoon: "Binnenkort Beschikbaar",
    },
    why: {
      title: "Waarom Yrvante?",
      subtitle: "Onze voordelen",
      design: {
        title: "Modern Webdesign",
        description: "Strak, minimalistisch en professionele websites.",
      },
      expertise: {
        title: "Technische Expertise",
        description: "Gebouwd met een sterke technische achtergrond en engineering mindset.",
      },
      affordable: {
        title: "Perfect voor MKB",
        description: "Betaalbare oplossingen voor freelancers en groeiende bedrijven.",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Neem contact op",
      formTitle: "Vraag een website aan voor uw bedrijf.",
      name: "Naam",
      email: "E-mail",
      message: "Bericht",
      send: "Versturen",
      sending: "Verzenden...",
      success: "Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.",
      error: "Er is een fout opgetreden. Probeer het later opnieuw.",
    },
    footer: {
      rights: "Alle rechten voorbehouden.",
      location: "Almelo, Nederland",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      slogan: '"Smart web & software"',
      description: "Yrvante builds modern websites and smart digital solutions for freelancers and businesses. Clean design, reliable technology, and websites that help your business grow.",
      cta: "Request a Website",
    },
    services: {
      title: "Our Services",
      subtitle: "What we offer",
      web: {
        title: "Website Development",
        description: "Modern, responsive websites built for freelancers and businesses.",
        price: "From €399 excl. VAT"
      },
      business: {
        title: "Advanced Websites",
        description: "Websites with working features: appointment booking, client portals, app development and more.",
        price: "From €699 excl. VAT"
      },
      software: {
        title: "Monthly Maintenance",
        description: "Hosting, updates, security and backups. This subscription is optional — without this plan you are responsible for maintaining your website yourself after delivery.",
        price: "€20 per month excl. VAT"
      },
    },
    target: {
      title: "Who Do We Build For?",
      subtitle: "Our target audience",
      zzp: {
        title: "Freelancers",
        description: "Self-employed professionals without a website who want to appear professional online.",
      },
      outdated: {
        title: "Outdated Websites",
        description: "Businesses with a website that needs a modern update.",
      },
      startup: {
        title: "Startups",
        description: "New companies that need a strong online presence.",
      },
    },
    about: {
      title: "About Yrvante",
      subtitle: "Our background",
      description: "Behind Yrvante lies a passion for technology and results. With a background in high-precision manufacturing, we know better than anyone that the smallest details make the biggest difference.",
      description2: "Our goal? Help small businesses grow with websites that are not only beautiful, but actually work. We see a website not as a static business card, but as a solution to a problem.",
      location: "Almelo, Netherlands",
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Recent work",
      comingSoon: "Coming Soon",
    },
    why: {
      title: "Why Yrvante?",
      subtitle: "Our advantages",
      design: {
        title: "Modern Web Design",
        description: "Clean, minimalist and professional websites.",
      },
      expertise: {
        title: "Technical Expertise",
        description: "Built with a strong technical background and engineering mindset.",
      },
      affordable: {
        title: "Perfect for SMBs",
        description: "Affordable solutions for freelancers and growing companies.",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch",
      formTitle: "Request a website for your business.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      success: "Thank you for your message! We will contact you as soon as possible.",
      error: "An error occurred. Please try again later.",
    },
    footer: {
      rights: "All rights reserved.",
      location: "Almelo, Netherlands",
    },
  },
};

// ThemeChooser and CookieBanner removed per user request

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 dark:border-neutral-700 border-t-gray-600 dark:border-t-neutral-400 rounded-full animate-spin" />
  </div>
);

function App() {
  // Auto language detection based on browser language
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem("language");
    if (stored) return stored;
    const browserLang = navigator.language || navigator.userLanguage || "nl";
    return browserLang.startsWith("nl") ? "nl" : "en";
  });
  
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    // Auto night mode: dark between 20:00 and 06:00
    const hour = new Date().getHours();
    return (hour >= 20 || hour < 6) ? "dark" : "light";
  });
  
  const t = translations[language];

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto night mode check every 30 minutes (only if user hasn't manually toggled)
  useEffect(() => {
    const checkNightMode = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 20 || hour < 6;
      const manuallySet = localStorage.getItem("theme_manual");
      if (!manuallySet) {
        setTheme(shouldBeDark ? "dark" : "light");
      }
    };
    const interval = setInterval(checkNightMode, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    localStorage.setItem("theme_manual", "true");
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Track page view on mount
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  // Interactive background: mouse tracking for subtle parallax on bg-pattern
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="App relative" onMouseMove={handleMouseMove}>
        {/* Global background pattern - interactive parallax on mouse/touch */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute -inset-5 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out ${theme === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.25]'}`}
            style={{
              backgroundImage: `url(/bg-pattern.jpg)`,
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          />
        </div>
        <div className="relative z-10">
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<Navigate to="/over-mij" replace />} />
            <Route path="/over-mij" element={<OverMijPage />} />
            <Route path="/waarom-website" element={<WhyWebsitePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/pakketten" element={<PackagesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/onderhoud" element={<OnderhoudPage />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/diensten/onderhoud" element={<Navigate to="/onderhoud" replace />} />
            <Route path="/diensten/:type" element={<DienstenPage />} />
            <Route path="/voor/:niche" element={<DienstenPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/rebranding" element={<RebrandingPage />} />
            <Route path="/leadfinder" element={<LeadFinderPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
        </div>
        <ScrollToTop />
        <Toaster position="bottom-right" />
      </div>
    </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
