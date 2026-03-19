import { useEffect } from 'react';
import { useLanguage } from '../App';

// SEO meta data for each page
const seoData = {
  nl: {
    '/': {
      title: 'Yrvante | Professionele Websites voor ZZP\'ers & MKB | Nederland',
      description: 'Yrvante bouwt moderne, professionele websites voor ZZP\'ers en MKB. Vanaf €500 een complete website. Snel, betaalbaar en resultaatgericht.',
      keywords: 'website laten maken, webdesign Nederland, ZZP website, MKB website, goedkope website, professionele website'
    },
    '/pakketten': {
      title: 'Website Pakketten & Prijzen | Yrvante',
      description: 'Bekijk onze website pakketten: Basis (€500), Pro (€900) en Premium (€1400). Transparante prijzen, geen verborgen kosten. Inclusief hosting en support.',
      keywords: 'website pakket, website prijzen, website kosten, webdesign prijzen, ZZP website prijs'
    },
    '/calculator': {
      title: 'Website Prijscalculator | Bereken Je Website Kosten | Yrvante',
      description: 'Bereken direct wat jouw website kost met onze prijscalculator. Kies je pakket en extra opties voor een transparante prijsindicatie.',
      keywords: 'website calculator, website prijs berekenen, website kosten calculator, webdesign offerte'
    },
    '/waarom-website': {
      title: 'Waarom Heb Je Een Website Nodig? | Yrvante',
      description: 'Ontdek waarom een professionele website essentieel is voor jouw bedrijf. Meer klanten, meer omzet, en een professionele uitstraling.',
      keywords: 'waarom website, website voordelen, online zichtbaarheid, klanten werven'
    },
    '/blog': {
      title: 'Blog: Waarom Een Website Geen Luxe Meer Is | Yrvante',
      description: 'Lees waarom een website in 2025 geen luxe meer is maar een noodzaak. Tips en inzichten voor ZZP\'ers en kleine bedrijven.',
      keywords: 'website blog, website tips, ZZP tips, kleine bedrijven online'
    },
    '/about': {
      title: 'Over Yrvante | Smart Web & Software',
      description: 'Maak kennis met Yrvante. Ik bouw moderne websites voor ZZP\'ers en MKB. Persoonlijke aanpak, snelle levering, eerlijke prijzen.',
      keywords: 'over yrvante, webdesigner nederland, freelance webdesigner'
    },
    '/over-mij': {
      title: 'Over Mij | Yrvante Webdesign',
      description: 'Ik ben Yrvante — freelance webdesigner uit Almelo. Ik bouw snelle, professionele websites voor ZZP\'ers en MKB\'ers. Persoonlijk, betaalbaar en resultaatgericht.',
      keywords: 'over yrvante, freelance webdesigner almelo, webdesigner nederland, ZZP website, MKB website'
    },
    '/onderhoud': {
      title: 'Website Onderhoud & Hosting | €25/maand | Yrvante',
      description: 'Ontspannen achterover leunen terwijl ik jouw website bijhoudt. Updates, beveiliging, back-ups en snelle hulp voor slechts €25 per maand.',
      keywords: 'website onderhoud, website hosting, website beheer, website updates, website support'
    },
    '/diensten': {
      title: 'Webdesign Diensten | Yrvante',
      description: 'Ontdek alle webdesign diensten van Yrvante. Van landingspagina\'s tot webshops en boekingssystemen. Voor elke branche een passende oplossing.',
      keywords: 'webdesign diensten, website laten maken, landingspagina, webshop, boekingssysteem'
    },
    '/voor/kappers': {
      title: 'Website voor Kappers | Yrvante',
      description: 'Een professionele website laten maken als kapper? Yrvante bouwt stijlvolle kapperssites met online afspraken, galerij en meer. Vanaf €500.',
      keywords: 'website kapper, kapperszaak website, kapper online afspraken, webdesign kapper'
    },
    '/voor/loodgieters': {
      title: 'Website voor Loodgieters | Yrvante',
      description: 'Meer klanten als loodgieter via een professionele website. Met contactformulier, diensten en snel vindbaar op Google. Vanaf €500.',
      keywords: 'website loodgieter, loodgietersbedrijf website, loodgieter online, webdesign loodgieter'
    },
    '/voor/electriciens': {
      title: 'Website voor Electriciëns | Yrvante',
      description: 'Professionele website voor electriciëns. Laat klanten je vinden via Google en vergroot je opdrachten. Vanaf €500.',
      keywords: 'website electricien, elektricien website, webdesign electricien'
    },
    '/voor/coaches': {
      title: 'Website voor Coaches | Yrvante',
      description: 'Een professionele coachingswebsite laten maken? Met online boeken, diensten en testimonials. Yrvante helpt je groeien. Vanaf €500.',
      keywords: 'website coach, coaching website, life coach website, webdesign coach'
    },
    '/voor/nagelstudios': {
      title: 'Website voor Nagelstudio\'s | Yrvante',
      description: 'Laat je nagelstudio online schitteren. Professionele website met galerij, behandelingen en online afspraken. Vanaf €500.',
      keywords: 'website nagelstudio, nagelstudio online, nail studio website'
    },
    '/voor/restaurants': {
      title: 'Website voor Restaurants | Yrvante',
      description: 'Een professionele restaurantwebsite met menu, reserveringen en sfeerfotos. Meer gasten via Google. Vanaf €500.',
      keywords: 'website restaurant, restaurant website, horeca website, menu website'
    }
  },
  en: {
    '/': {
      title: 'Yrvante | Professional Websites for Freelancers & SMBs | Netherlands',
      description: 'Yrvante builds modern, professional websites for freelancers and SMBs. Complete website from €500. Fast, affordable and result-driven.',
      keywords: 'website design, web development Netherlands, freelancer website, SMB website, affordable website'
    },
    '/pakketten': {
      title: 'Website Packages & Pricing | Yrvante',
      description: 'View our website packages: Basic (€500), Pro (€900) and Premium (€1400). Transparent pricing, no hidden costs. Including hosting and support.',
      keywords: 'website package, website pricing, website costs, web design prices'
    },
    '/calculator': {
      title: 'Website Price Calculator | Calculate Your Website Cost | Yrvante',
      description: 'Calculate your website cost instantly with our price calculator. Choose your package and extras for a transparent quote.',
      keywords: 'website calculator, website price calculator, website cost estimate, web design quote'
    },
    '/waarom-website': {
      title: 'Why Do You Need A Website? | Yrvante',
      description: 'Discover why a professional website is essential for your business. More customers, more revenue, and a professional appearance.',
      keywords: 'why website, website benefits, online visibility, attract customers'
    },
    '/blog': {
      title: 'Blog: Why A Website Is No Longer A Luxury | Yrvante',
      description: 'Read why a website in 2025 is no longer a luxury but a necessity. Tips and insights for freelancers and small businesses.',
      keywords: 'website blog, website tips, freelancer tips, small business online'
    },
    '/about': {
      title: 'About Yrvante | Smart Web & Software',
      description: 'Meet Yrvante. I build modern websites for freelancers and SMBs. Personal approach, fast delivery, fair prices.',
      keywords: 'about yrvante, web designer netherlands, freelance web designer'
    },
    '/over-mij': {
      title: 'About Me | Yrvante Web Design',
      description: 'I\'m Yrvante — freelance web designer from Almelo. I build fast, professional websites for freelancers and SMBs. Personal, affordable and result-driven.',
      keywords: 'about yrvante, freelance web designer almelo, web designer netherlands'
    },
    '/onderhoud': {
      title: 'Website Maintenance & Hosting | €25/month | Yrvante',
      description: 'Relax while I take care of your website. Updates, security, backups and quick support for just €25 per month.',
      keywords: 'website maintenance, website hosting, website management, website updates'
    },
    '/diensten': {
      title: 'Web Design Services | Yrvante',
      description: 'Discover all web design services from Yrvante. From landing pages to webshops and booking systems. A fitting solution for every industry.',
      keywords: 'web design services, website creation, landing page, webshop, booking system'
    },
    '/voor/kappers': {
      title: 'Website for Hair Salons | Yrvante',
      description: 'A professional website for hair salons with online booking, gallery and more. From €500.',
      keywords: 'hair salon website, barber website, hairdresser website'
    },
    '/voor/loodgieters': {
      title: 'Website for Plumbers | Yrvante',
      description: 'More customers as a plumber with a professional website. Contact form, services and easy to find on Google. From €500.',
      keywords: 'plumber website, plumbing business website'
    },
    '/voor/coaches': {
      title: 'Website for Coaches | Yrvante',
      description: 'A professional coaching website with online booking, services and testimonials. From €500.',
      keywords: 'coach website, coaching website, life coach website'
    },
    '/voor/restaurants': {
      title: 'Website for Restaurants | Yrvante',
      description: 'A professional restaurant website with menu, reservations and photos. More guests via Google. From €500.',
      keywords: 'restaurant website, hospitality website, menu website'
    }
  }
};

const SEO = ({ page }) => {
  const { language } = useLanguage();
  
  useEffect(() => {
    const data = seoData[language]?.[page] || seoData['nl']['/'];
    
    // Update document title
    document.title = data.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', data.keywords);
    }
    
    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', data.title);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', data.description);
    }
    
    // Update Twitter tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', data.title);
    }
    
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', data.description);
    }
    
    // Update html lang attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'nl';
    
    // Update og:locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'en' ? 'en_US' : 'nl_NL');
    }
    
  }, [page, language]);
  
  return null; // This component doesn't render anything
};

export default SEO;
