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
    '/404': {
      title: '404 - Pagina Niet Gevonden | Yrvante',
      description: 'De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de homepage van Yrvante.',
      keywords: '404, pagina niet gevonden, yrvante'
    },
    '/pakketten': {
      title: 'Website Pakketten & Prijzen | Yrvante',
      description: 'Bekijk onze website pakketten: Rebranding (€349), Basis (€500), Pro (€900) en Premium (€1400). Transparante prijzen, geen verborgen kosten.',
      keywords: 'website pakket, website prijzen, website kosten, webdesign prijzen, ZZP website prijs, rebranding website'
    },
    '/calculator': {
      title: 'Website Prijscalculator | Bereken Je Website Kosten | Yrvante',
      description: 'Bereken direct wat jouw website kost. Kies uit 4 pakketten: Rebranding (€349), Basis (€500), Pro (€900) of Premium (€1400) en ontvang een transparante offerte.',
      keywords: 'website calculator, website prijs berekenen, website kosten calculator, webdesign offerte, rebranding website'
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
    },
    '/diensten/webdesign': {
      title: 'Webdesign | Moderne Websites die Werken | Yrvante',
      description: 'Professioneel webdesign dat converteert. Responsive, snel en SEO-vriendelijk. Van €500 — opgeleverd in 1-2 weken.',
      keywords: 'webdesign, website laten maken, professionele website, responsive website, snel website'
    },
    '/diensten/onderhoud': {
      title: 'Website Onderhoud & Hosting | Yrvante',
      description: 'Maandelijks onderhoud voor je website. Hosting, updates, bug fixes en support voor €25/maand.',
      keywords: 'website onderhoud, website hosting, website beheer'
    },
    '/voor/zzp': {
      title: 'Website voor ZZP\'ers | Yrvante',
      description: 'Een betaalbare, professionele website voor ZZP\'ers. Gevonden worden op Google. Vanaf €500.',
      keywords: 'website zzp, zzper website, freelancer website, zelfstandige website'
    },
    '/voor/nagelstylisten': {
      title: 'Website voor Nagelstylisten | Yrvante',
      description: 'Laat je nagel kunst online schitteren. Professionele website met galerij, behandelingen en online afspraken. Vanaf €500.',
      keywords: 'website nagelstyliste, nagelstudio website, nail artist website'
    },
    '/voor/interieurstylisten': {
      title: 'Website voor Interieurstylisten | Yrvante',
      description: 'Toon je portfolio aan potentiële klanten. Elegante website voor interieurontwerpers. Vanaf €500.',
      keywords: 'website interieurontwerpster, interieurdesign website, home staging website'
    },
    '/voor/bloemisten': {
      title: 'Website voor Bloemisten | Yrvante',
      description: 'Laat je bloemen online bloeien. Website met catalogus, bestelmogelijkheid en seizoensaanbiedingen. Vanaf €500.',
      keywords: 'website bloemist, bloemenwinkel website, bloemenzaak website'
    },
    '/voor/personaltrainers': {
      title: 'Website voor Personal Trainers | Yrvante',
      description: 'Inspireer klanten om te starten. Website met transformatiefoto\'s, aanpak en online afspraken. Vanaf €500.',
      keywords: 'website personal trainer, fitness coach website, sportcoach website'
    },
    '/voor/fotografen': {
      title: 'Website voor Fotografen | Yrvante',
      description: 'Je portfolio verdient een podium. Strak, snel ladende website voor fotografen. Vanaf €500.',
      keywords: 'website fotograaf, portfolio website fotograaf, fotografie website'
    },
    '/voor/makelaars': {
      title: 'Website voor Makelaars | Yrvante',
      description: 'Onderscheid je van grote kantoren. Persoonlijke makelaarwebsite met woningaanbod en directe contactmogelijkheden. Vanaf €500.',
      keywords: 'website makelaar, makelaar website, vastgoed website'
    },
    '/voor/tandartsen': {
      title: 'Website voor Tandartsen | Yrvante',
      description: 'Nieuwe patiënten met vertrouwen. Warme, professionele website voor tandartsen met online afspraken. Vanaf €500.',
      keywords: 'website tandarts, tandartspraktijk website, mondhygiënist website'
    },
    '/voor/garages': {
      title: 'Website voor Garages | Yrvante',
      description: 'Meer klanten voor je werkplaats. Duidelijke website met diensten, APK-afspraken en reviews. Vanaf €500.',
      keywords: 'website garage, autogarage website, APK station website'
    },
    '/voor/hondentrimmers': {
      title: 'Website voor Hondentrimsalons | Yrvante',
      description: 'Laat zien hoe mooi je ze maakt. Website met voor-en-na foto\'s, prijslijst en online afspraken. Vanaf €500.',
      keywords: 'website hondentrimmer, trimsalon website, dierenverzorging website'
    },
    '/voor/schoonheidsspecialisten': {
      title: 'Website voor Schoonheidsspecialisten | Yrvante',
      description: 'Laat je expertise glansen. Website met behandelingen, galerij en online afspraken voor schoonheidssalons. Vanaf €500.',
      keywords: 'website schoonheidsspecialist, beauty salon website, huidverzorging website'
    },
    '/voor/masseurs': {
      title: 'Website voor Masseurs | Yrvante',
      description: 'Rust en professionaliteit online. Website voor massagepraktijken met diensten en online afspraken. Vanaf €500.',
      keywords: 'website masseur, massagepraktijk website, wellnesssalon website'
    },
    '/voor/fysiotherapeuten': {
      title: 'Website voor Fysiotherapeuten | Yrvante',
      description: 'Patiënten vinden je makkelijker. Professionele website voor fysiotherapiepraktijken. Vanaf €500.',
      keywords: 'website fysiotherapeut, fysiotherapiepraktijk website, sportfysio website'
    },
    '/voor/accountants': {
      title: 'Website voor Accountants | Yrvante',
      description: 'Vertrouwen uitstralen online. Strakke website voor accountants en boekhouders. Vanaf €500.',
      keywords: 'website accountant, boekhoudkantoor website, belastingadviseur website'
    },
    '/voor/electriciens': {
      title: 'Website voor Elektriciens | Yrvante',
      description: 'Gevonden worden bij elke klus. Duidelijke website voor elektriciensbedrijven. Vanaf €500.',
      keywords: 'website elektricien, installatiebedrijf website, elektrisch bedrijf website'
    },
    '/voor/schilders': {
      title: 'Website voor Schilders | Yrvante',
      description: 'Je werk verdient een podium. Portfolio website voor schildersbedrijven met voor-en-na foto\'s. Vanaf €500.',
      keywords: 'website schilder, schildersbedrijf website, decorateur website'
    },
    '/voor/timmerlieden': {
      title: 'Website voor Timmerlieden | Yrvante',
      description: 'Toon je vakmanschap online. Portfolio website voor timmerbedrijven en aannemers. Vanaf €500.',
      keywords: 'website timmerman, timmerbedrijf website, aannemer website'
    },
    '/voor/dierenartsen': {
      title: 'Website voor Dierenartsen | Yrvante',
      description: 'Baasjes vinden je makkelijker. Warme, professionele website voor dierenkliniek en dierenartsen. Vanaf €500.',
      keywords: 'website dierenarts, dierenkliniek website, veterinair website'
    },
    '/voor/klusbedrijven': {
      title: 'Website voor Klusbedrijven | Yrvante',
      description: 'Altijd gevonden bij de juiste klus. Professionele website voor klusbedrijven met portfolio. Vanaf €500.',
      keywords: 'website klusbedrijf, handyman website, woningrenovatie website'
    }
  },
  en: {
    '/': {
      title: 'Yrvante | Professional Websites for Freelancers & SMBs | Netherlands',
      description: 'Yrvante builds modern, professional websites for freelancers and SMBs. Complete website from €500. Fast, affordable and result-driven.',
      keywords: 'website design, web development Netherlands, freelancer website, SMB website, affordable website'
    },
    '/404': {
      title: '404 - Page Not Found | Yrvante',
      description: 'The page you are looking for does not exist or has been moved. Go back to the Yrvante homepage.',
      keywords: '404, page not found, yrvante'
    },
    '/pakketten': {
      title: 'Website Packages & Pricing | Yrvante',
      description: 'View our website packages: Rebranding (€349), Basic (€500), Pro (€900) and Premium (€1400). Transparent pricing, no hidden costs.',
      keywords: 'website package, website pricing, website costs, web design prices, website rebranding'
    },
    '/calculator': {
      title: 'Website Price Calculator | Calculate Your Website Cost | Yrvante',
      description: 'Calculate your website cost instantly. Choose from 4 packages: Rebranding (€349), Basic (€500), Pro (€900) or Premium (€1400) and get a transparent quote.',
      keywords: 'website calculator, website price calculator, website cost estimate, web design quote, website rebranding'
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
    },
    '/diensten/webdesign': {
      title: 'Web Design | Modern Websites That Work | Yrvante',
      description: 'Professional web design that converts. Responsive, fast and SEO-friendly. From €500 — delivered in 1-2 weeks.',
      keywords: 'web design, website creation, professional website, responsive website'
    },
    '/voor/zzp': {
      title: 'Website for Freelancers | Yrvante',
      description: 'An affordable, professional website for freelancers. Get found on Google. From €500.',
      keywords: 'freelancer website, self-employed website, ZZP website'
    },
    '/voor/nagelstylisten': {
      title: 'Website for Nail Technicians | Yrvante',
      description: 'Let your nail art shine online. Professional website with gallery and online booking. From €500.',
      keywords: 'nail technician website, nail studio website'
    },
    '/voor/fysiotherapeuten': {
      title: 'Website for Physiotherapists | Yrvante',
      description: 'Patients find you more easily. Professional website for physiotherapy practices. From €500.',
      keywords: 'physiotherapist website, physio practice website'
    },
    '/voor/accountants': {
      title: 'Website for Accountants | Yrvante',
      description: 'Radiate trust online. Clean website for accountants and bookkeepers. From €500.',
      keywords: 'accountant website, bookkeeper website, tax advisor website'
    },
    '/voor/electriciens': {
      title: 'Website for Electricians | Yrvante',
      description: 'Found for every job. Clear website for electrical companies. From €500.',
      keywords: 'electrician website, electrical company website'
    },
    '/voor/schilders': {
      title: 'Website for Painters | Yrvante',
      description: 'Your work deserves a stage. Portfolio website for painting companies. From €500.',
      keywords: 'painter website, painting company website'
    },
    '/voor/timmerlieden': {
      title: 'Website for Carpenters | Yrvante',
      description: 'Show your craftsmanship online. Portfolio website for carpentry businesses. From €500.',
      keywords: 'carpenter website, carpentry company website'
    },
    '/voor/dierenartsen': {
      title: 'Website for Veterinarians | Yrvante',
      description: 'Pet owners find you more easily. Warm, professional website for animal clinics. From €500.',
      keywords: 'veterinarian website, animal clinic website, vet website'
    },
    '/voor/klusbedrijven': {
      title: 'Website for Handymen | Yrvante',
      description: 'Always found for the right job. Professional website for handyman services. From €500.',
      keywords: 'handyman website, home renovation website'
    }
  }
};

const SEO = ({ page, noindex }) => {
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
    
    // Update robots meta for noindex pages (404, admin)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://yrvante.com${page || '/'}`);
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
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://yrvante.com${page || '/'}`);
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
    
  }, [page, language, noindex]);
  
  return null; // This component doesn't render anything
};

export default SEO;
