// Central data file for Yrvante website
// Shared constants and site-wide data

export const LOGO_URL = "/logo-nav.png";
export const BG_IMAGE = "/bg-pattern.jpg";
export const WHATSAPP_URL = "https://wa.me/31855055314";
export const EMAIL = "info@yrvante.com";
export const CALENDLY_URL = "https://calendly.com/yrvante";
export const PHONE = "+31 85 505 5314";

// Package pricing
export const PACKAGE_PRICES = {
  basic: 500,
  pro: 900,
  premium: 999,
};

// Package names (used across pages)
export const PACKAGE_NAMES = {
  nl: {
    basic: 'Basis',
    pro: 'Pro',
    premium: 'Premium',
  },
  en: {
    basic: 'Basic',
    pro: 'Pro',
    premium: 'Premium',
  },
};

// Base feature lists per package (shared, extended per page)
export const BASE_FEATURES = {
  nl: {
    basic: [
      'Responsive design',
      'Tot 3 pagina\'s',
      'Contactformulier',
      'Google Maps integratie',
      'Basisoptimalisatie voor Google',
      '1 revisieronde',
    ],
    pro: [
      'Responsive design',
      'Tot 7 pagina\'s',
      'Contactformulier + emailnotificatie',
      'Google Maps & Analytics',
      'Geavanceerde SEO',
      '3 revisierondes',
      'Blog/Nieuws sectie',
    ],
    premium: [
      'Responsive design',
      'Onbeperkte pagina\'s',
      'Alle Pro-functies',
      'Custom animaties',
      'Snellere reactietijd (binnen 8 uur)',
      '6 revisierondes',
      'Prioriteitsondersteuning',
      'Prestatieoptimalisatie',
    ],
  },
  en: {
    basic: [
      'Responsive design',
      'Up to 3 pages',
      'Contact form',
      'Google Maps integration',
      'Basic Google optimization',
      '1 revision round',
    ],
    pro: [
      'Responsive design',
      'Up to 7 pages',
      'Contact form + email notification',
      'Google Maps & Analytics',
      'Advanced SEO',
      '3 revision rounds',
      'Blog/News section',
    ],
    premium: [
      'Responsive design',
      'Unlimited pages',
      'All Pro features',
      'Custom animations',
      'Faster response time (within 8 hours)',
      '6 revision rounds',
      'Priority support',
      'Performance optimization',
    ],
  },
};

// Services offered (used in navigation and landing page)
export const DIENSTEN_LINKS = (language) => [
  { to: '/pakketten', label: language === 'nl' ? 'Pakketten & Prijzen' : 'Packages & Pricing' },
  { to: '/calculator', label: language === 'nl' ? 'Prijscalculator' : 'Price Calculator' },
  { divider: true },
  { to: '/diensten/webdesign', label: language === 'nl' ? 'Webdesign' : 'Web Design' },
  { to: '/onderhoud', label: language === 'nl' ? 'Onderhoud & Hosting' : 'Maintenance & Hosting' },
  { to: '/diensten', label: language === 'nl' ? 'Alle Branches' : 'All Industries' },
];

// Contact info for footer / contact sections
export const CONTACT_INFO = {
  email: EMAIL,
  phone: PHONE,
  whatsapp: WHATSAPP_URL,
  location: 'Nederland',
};
