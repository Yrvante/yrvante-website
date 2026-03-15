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
