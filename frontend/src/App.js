import React, { useState, createContext, useContext, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

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
      },
      business: {
        title: "Zakelijke Websites",
        description: "Professionele websites die vertrouwen opbouwen en klanten aantrekken.",
      },
      software: {
        title: "Maatwerk Software",
        description: "Slimme tools en systemen die de efficiëntie van uw bedrijf verbeteren.",
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
      description: "Yrvante is opgericht door Yvar Bredewold, een technisch onderlegde professional met ervaring in high-precision manufacturing omgevingen, momenteel in transitie naar software engineering.",
      description2: "",
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
      },
      business: {
        title: "Business Websites",
        description: "Professional websites that build trust and attract customers.",
      },
      software: {
        title: "Custom Software",
        description: "Smart tools and systems that improve your business efficiency.",
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
      description: "Yrvante was founded by Yvar Bredewold, a technically skilled professional with experience in high-precision manufacturing environments, currently transitioning into software engineering.",
      description2: "",
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

function App() {
  const [language, setLanguage] = useState("nl");
  const t = translations[language];

  // Track page view on mount
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
