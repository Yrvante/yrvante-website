import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Monitor,
  Layers,
  ArrowRight,
  Check,
  Heart,
  Briefcase,
  Scissors,
  Sparkles,
  Flower2,
  Wrench,
  Home,
  Utensils,
  Dumbbell,
  Camera,
  Building,
  Stethoscope,
  Car,
  PawPrint,
} from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a2868257-4a63-4a64-87b7-72ff6867dc17/artifacts/gwcgd4lw_Yrvante%20logo%20en%20naam%20en%20slogan%20.jpeg";
const BG_IMAGE = "https://static.prod-images.emergentagent.com/jobs/44213466-a228-4a52-8cfe-b2e9737ed3f4/images/bd9ccb92eb46d5ed1a97a900c245c5b7666be86f56e6b6623a1e1da2f4bf67d5.png";

// Service data - Only Webdesign and Onderhoud
const services = {
  webdesign: {
    icon: Monitor,
    color: 'blue',
    title: { nl: 'Webdesign', en: 'Web Design' },
    subtitle: { nl: 'Moderne websites die converteren', en: 'Modern websites that convert' },
    description: {
      nl: 'Een website is meer dan een online visitekaartje. Het is je 24/7 verkoper die nooit slaapt. Ik ontwerp websites die niet alleen mooi zijn, maar ook daadwerkelijk klanten opleveren.',
      en: "A website is more than an online business card. It's your 24/7 salesperson that never sleeps. I design websites that are not only beautiful but actually bring in customers."
    },
    features: {
      nl: [
        'Responsive design (mobiel, tablet, desktop)',
        'Snelle laadtijden',
        'SEO-vriendelijke structuur',
        'Moderne, strakke vormgeving',
        'Gebruiksvriendelijke navigatie',
        'Call-to-actions die werken',
      ],
      en: [
        'Responsive design (mobile, tablet, desktop)',
        'Fast loading times',
        'SEO-friendly structure',
        'Modern, clean design',
        'User-friendly navigation',
        'Call-to-actions that work',
      ],
    },
    price: '€500',
  },
  onderhoud: {
    icon: Wrench,
    color: 'emerald',
    title: { nl: 'Onderhoud & Hosting', en: 'Maintenance & Hosting' },
    subtitle: { nl: 'Jij focust op je bedrijf, ik op je website', en: 'You focus on your business, I focus on your website' },
    description: {
      nl: 'Een website bouwen is één ding. Hem online houden, veilig houden en werkend houden is iets heel anders. Met het onderhoudspakket hoef jij je daar geen zorgen over te maken. Plus: ik doe aanpassingen wanneer jij dat wilt.',
      en: "Building a website is one thing. Keeping it online, secure and working is something else entirely. With the maintenance package, you don't have to worry about any of that. Plus: I make adjustments whenever you want."
    },
    features: {
      nl: [
        'Hosting & 99.9% uptime',
        'SSL certificaat & beveiliging',
        'Dagelijkse backups',
        'Bug fixes zonder extra kosten',
        'Kleine aanpassingen op aanvraag',
        'Support binnen 24 uur',
      ],
      en: [
        'Hosting & 99.9% uptime',
        'SSL certificate & security',
        'Daily backups',
        'Bug fixes at no extra cost',
        'Small adjustments on request',
        'Support within 24 hours',
      ],
    },
    price: '€25/maand',
  },
};

// Expanded Niche data
const niches = {
  coaches: {
    icon: Heart,
    color: 'rose',
    title: { nl: 'Website voor Coaches', en: 'Website for Coaches' },
    subtitle: { nl: 'Laat je expertise online stralen', en: 'Let your expertise shine online' },
    description: {
      nl: 'Als coach verkoop je vertrouwen. Potentiële klanten willen weten wie je bent, wat je aanbiedt en of ze zich bij jou op hun gemak voelen. Een professionele website is je eerste indruk — en die moet kloppen.',
      en: "As a coach, you sell trust. Potential clients want to know who you are, what you offer, and whether they feel comfortable with you. A professional website is your first impression — and it needs to be right."
    },
    benefits: {
      nl: [
        'Professionele uitstraling die vertrouwen wekt',
        'Duidelijk overzicht van je diensten en tarieven',
        'Makkelijk afspraken inplannen (optioneel boekingssysteem)',
        'Blog om je expertise te delen',
        'Testimonials van tevreden klanten',
        'Contact mogelijkheden die werken',
      ],
      en: [
        'Professional appearance that builds trust',
        'Clear overview of your services and rates',
        'Easy appointment scheduling (optional booking system)',
        'Blog to share your expertise',
        'Testimonials from satisfied clients',
        'Contact options that work',
      ],
    },
    examples: {
      nl: ['Life coaches', 'Business coaches', 'Mindset coaches', 'Health coaches', 'Relatie coaches'],
      en: ['Life coaches', 'Business coaches', 'Mindset coaches', 'Health coaches', 'Relationship coaches'],
    },
  },
  zzp: {
    icon: Briefcase,
    color: 'amber',
    title: { nl: 'Website voor ZZP\'ers', en: 'Website for Freelancers' },
    subtitle: { nl: 'Jouw bedrijf verdient online zichtbaarheid', en: 'Your business deserves online visibility' },
    description: {
      nl: 'Als ZZP\'er ben je je eigen merk. Klanten googlen je voordat ze contact opnemen. Zonder website mis je kansen — elke dag opnieuw. Een professionele website kost minder dan je denkt én verdient zichzelf terug.',
      en: "As a freelancer, you are your own brand. Clients google you before they get in touch. Without a website, you miss opportunities — every single day. A professional website costs less than you think and pays for itself."
    },
    benefits: {
      nl: [
        'Gevonden worden in Google',
        'Professionele eerste indruk',
        'Je diensten duidelijk presenteren',
        'Contact mogelijkheden 24/7',
        'Onderscheiden van concurrentie',
        'Eigen domein (jouwbedrijf.nl)',
      ],
      en: [
        'Be found on Google',
        'Professional first impression',
        'Present your services clearly',
        'Contact options 24/7',
        'Stand out from competition',
        'Own domain (yourbusiness.com)',
      ],
    },
    examples: {
      nl: ['Consultants', 'Adviseurs', 'Trainers', 'Therapeuten', 'Vertalers'],
      en: ['Consultants', 'Advisors', 'Trainers', 'Therapists', 'Translators'],
    },
  },
  kappers: {
    icon: Scissors,
    color: 'violet',
    title: { nl: 'Website voor Kappers', en: 'Website for Hairdressers' },
    subtitle: { nl: 'Trek meer klanten naar je salon', en: 'Attract more clients to your salon' },
    description: {
      nl: 'Een kapsalon draait om stijl en uitstraling. Laat dat zien met een website die net zo goed verzorgd is als je werk. Klanten willen je werk zien, je prijzen kennen en makkelijk een afspraak kunnen maken.',
      en: "A hair salon is all about style and appearance. Show that with a website as well-groomed as your work. Clients want to see your work, know your prices and easily book an appointment."
    },
    benefits: {
      nl: [
        'Portfolio met je beste kapsels',
        'Online afspraken boeken',
        'Duidelijke prijslijst',
        'Locatie en openingstijden',
        'Reviews van tevreden klanten',
        'Instagram integratie',
      ],
      en: [
        'Portfolio with your best hairstyles',
        'Online appointment booking',
        'Clear price list',
        'Location and opening hours',
        'Reviews from satisfied clients',
        'Instagram integration',
      ],
    },
    examples: {
      nl: ['Kapsalons', 'Barbershops', 'Mobiele kappers', 'Bruidskapper', 'Herenkapper'],
      en: ['Hair salons', 'Barbershops', 'Mobile hairdressers', 'Bridal hairdresser', 'Men\'s barber'],
    },
  },
  nagelstylisten: {
    icon: Sparkles,
    color: 'pink',
    title: { nl: 'Website voor Nagelstylisten', en: 'Website for Nail Technicians' },
    subtitle: { nl: 'Laat je nagel kunst online schitteren', en: 'Let your nail art shine online' },
    description: {
      nl: 'Als nagelstyliste is je werk visueel. Klanten willen zien wat je kunt voordat ze een afspraak maken. Een professionele website met een mooie galerij en online booking is essentieel om nieuwe klanten aan te trekken.',
      en: "As a nail technician, your work is visual. Clients want to see what you can do before booking. A professional website with a beautiful gallery and online booking is essential to attract new clients."
    },
    benefits: {
      nl: [
        'Galerij met nail art voorbeelden',
        'Online afspraken boeken',
        'Behandelingen en prijzen',
        'Voor en na foto\'s',
        'Klantreviews',
        'Social media links',
      ],
      en: [
        'Gallery with nail art examples',
        'Online appointment booking',
        'Treatments and prices',
        'Before and after photos',
        'Client reviews',
        'Social media links',
      ],
    },
    examples: {
      nl: ['Nagelstudio\'s', 'Beauty salons', 'Thuisstudio\'s', 'Nagelstylist aan huis'],
      en: ['Nail studios', 'Beauty salons', 'Home studios', 'Mobile nail technician'],
    },
  },
  interieurstylisten: {
    icon: Home,
    color: 'emerald',
    title: { nl: 'Website voor Interieurstylisten', en: 'Website for Interior Designers' },
    subtitle: { nl: 'Toon je portfolio aan potentiële klanten', en: 'Show your portfolio to potential clients' },
    description: {
      nl: 'Als interieurstyliste verkoop je visie en smaak. Klanten moeten jouw stijl kunnen ervaren voordat ze contact opnemen. Een elegante website met je beste projecten is je digitale showroom.',
      en: "As an interior designer, you sell vision and taste. Clients need to experience your style before contacting you. An elegant website with your best projects is your digital showroom."
    },
    benefits: {
      nl: [
        'Portfolio met projectfoto\'s',
        'Voor en na transformaties',
        'Je werkwijze uitgelegd',
        'Tarieven en pakketten',
        'Klantgetuigenissen',
        'Blog met interieur tips',
      ],
      en: [
        'Portfolio with project photos',
        'Before and after transformations',
        'Your working method explained',
        'Rates and packages',
        'Client testimonials',
        'Blog with interior tips',
      ],
    },
    examples: {
      nl: ['Interieurontwerpers', 'Home stagers', 'Kleuradvies', 'Woonstylisten'],
      en: ['Interior designers', 'Home stagers', 'Color consultants', 'Home stylists'],
    },
  },
  bloemisten: {
    icon: Flower2,
    color: 'rose',
    title: { nl: 'Website voor Bloemisten', en: 'Website for Florists' },
    subtitle: { nl: 'Laat je bloemen online bloeien', en: 'Let your flowers bloom online' },
    description: {
      nl: 'Bloemen zijn emotie. Klanten zoeken de perfecte bos voor een speciale gelegenheid. Met een mooie website kunnen ze jouw creaties bewonderen en direct bestellen — ook buiten openingstijden.',
      en: "Flowers are emotion. Clients are looking for the perfect bouquet for a special occasion. With a beautiful website, they can admire your creations and order directly — even outside opening hours."
    },
    benefits: {
      nl: [
        'Productcatalogus met foto\'s',
        'Online bestellen (optioneel)',
        'Bezorggebied en tarieven',
        'Seizoensaanbiedingen',
        'Bruiloft en event service',
        'Abonnementen uitgelicht',
      ],
      en: [
        'Product catalog with photos',
        'Online ordering (optional)',
        'Delivery area and rates',
        'Seasonal offers',
        'Wedding and event service',
        'Subscriptions highlighted',
      ],
    },
    examples: {
      nl: ['Bloemenwinkels', 'Bruiloft bloemisten', 'Event decorateurs', 'Plantenwinkels'],
      en: ['Flower shops', 'Wedding florists', 'Event decorators', 'Plant shops'],
    },
  },
  loodgieters: {
    icon: Wrench,
    color: 'blue',
    title: { nl: 'Website voor Loodgieters', en: 'Website for Plumbers' },
    subtitle: { nl: 'Bereikbaar wanneer klanten je nodig hebben', en: 'Reachable when clients need you' },
    description: {
      nl: 'Als loodgieter word je gebeld in noodgevallen. Klanten googlen "loodgieter bij mij in de buurt" en kiezen de eerste die professioneel overkomt. Zonder website verlies je die klanten aan de concurrent.',
      en: 'As a plumber, you get called in emergencies. Clients google "plumber near me" and choose the first one that looks professional. Without a website, you lose those clients to the competition.'
    },
    benefits: {
      nl: [
        'Direct vindbaar in Google',
        'Duidelijk telefoonnummer',
        'Werkgebied vermeld',
        'Diensten en prijsindicatie',
        'Reviews van klanten',
        '24/7 spoedservice uitgelicht',
      ],
      en: [
        'Directly findable on Google',
        'Clear phone number',
        'Service area listed',
        'Services and price indication',
        'Customer reviews',
        '24/7 emergency service highlighted',
      ],
    },
    examples: {
      nl: ['Loodgieters', 'CV-monteurs', 'Rioolservice', 'Ontstoppingsdienst'],
      en: ['Plumbers', 'Heating engineers', 'Drain services', 'Unclogging service'],
    },
  },
  restaurants: {
    icon: Utensils,
    color: 'orange',
    title: { nl: 'Website voor Restaurants', en: 'Website for Restaurants' },
    subtitle: { nl: 'Maak hongerige gasten nieuwsgierig', en: 'Make hungry guests curious' },
    description: {
      nl: 'Mensen besluiten binnen seconden of ze bij jou willen eten. Een smakelijke website met je menukaart, sfeerbeelden en reserveringsmogelijkheid kan het verschil maken tussen een lege of volle zaak.',
      en: "People decide within seconds if they want to eat at your place. A tasty website with your menu, atmosphere photos and reservation option can make the difference between an empty or full restaurant."
    },
    benefits: {
      nl: [
        'Digitale menukaart',
        'Online reserveren',
        'Sfeervolle foto\'s',
        'Locatie en openingstijden',
        'Speciale events en acties',
        'Google Maps integratie',
      ],
      en: [
        'Digital menu',
        'Online reservations',
        'Atmospheric photos',
        'Location and opening hours',
        'Special events and promotions',
        'Google Maps integration',
      ],
    },
    examples: {
      nl: ['Restaurants', 'Cafés', 'Bistro\'s', 'Foodtrucks', 'Catering'],
      en: ['Restaurants', 'Cafés', 'Bistros', 'Food trucks', 'Catering'],
    },
  },
  personaltrainers: {
    icon: Dumbbell,
    color: 'red',
    title: { nl: 'Website voor Personal Trainers', en: 'Website for Personal Trainers' },
    subtitle: { nl: 'Inspireer klanten om te starten', en: 'Inspire clients to get started' },
    description: {
      nl: 'Als personal trainer verkoop je transformatie. Potentiële klanten willen bewijs zien dat je resultaten levert. Een website met succesverhalen, je aanpak en makkelijk contact opnemen is onmisbaar.',
      en: "As a personal trainer, you sell transformation. Potential clients want to see proof that you deliver results. A website with success stories, your approach and easy contact is essential."
    },
    benefits: {
      nl: [
        'Transformatie foto\'s',
        'Trainingsaanbod en prijzen',
        'Jouw verhaal en certificeringen',
        'Online afspraken maken',
        'Klantresultaten en reviews',
        'Gratis tips of proefles',
      ],
      en: [
        'Transformation photos',
        'Training packages and prices',
        'Your story and certifications',
        'Online appointment booking',
        'Client results and reviews',
        'Free tips or trial lesson',
      ],
    },
    examples: {
      nl: ['Personal trainers', 'Fitness coaches', 'Voedingscoaches', 'Groepstrainers'],
      en: ['Personal trainers', 'Fitness coaches', 'Nutrition coaches', 'Group trainers'],
    },
  },
  fotografen: {
    icon: Camera,
    color: 'slate',
    title: { nl: 'Website voor Fotografen', en: 'Website for Photographers' },
    subtitle: { nl: 'Je portfolio verdient een podium', en: 'Your portfolio deserves a stage' },
    description: {
      nl: 'Als fotograaf IS je website je visitekaartje. Klanten beoordelen je werk binnen seconden. Een strak, snel ladend portfolio zonder afleiding laat je foto\'s spreken.',
      en: "As a photographer, your website IS your business card. Clients judge your work within seconds. A clean, fast-loading portfolio without distractions lets your photos speak."
    },
    benefits: {
      nl: [
        'Galerij die je werk laat schitteren',
        'Snelle laadtijden voor grote foto\'s',
        'Prijspakketten',
        'Contactformulier',
        'Over mij pagina',
        'Blog met shoots',
      ],
      en: [
        'Gallery that showcases your work',
        'Fast loading times for large photos',
        'Price packages',
        'Contact form',
        'About me page',
        'Blog with shoots',
      ],
    },
    examples: {
      nl: ['Bruiloftsfotografen', 'Portretfotografen', 'Product fotografen', 'Eventfotografen'],
      en: ['Wedding photographers', 'Portrait photographers', 'Product photographers', 'Event photographers'],
    },
  },
  makelaars: {
    icon: Building,
    color: 'indigo',
    title: { nl: 'Website voor Makelaars', en: 'Website for Real Estate Agents' },
    subtitle: { nl: 'Onderscheid je van de grote kantoren', en: 'Stand out from the big offices' },
    description: {
      nl: 'Als zelfstandig makelaar concurreer je met grote kantoren. Een professionele, persoonlijke website laat zien dat jij de betrokken aanpak biedt die klanten zoeken.',
      en: "As an independent real estate agent, you compete with large offices. A professional, personal website shows that you offer the dedicated approach that clients are looking for."
    },
    benefits: {
      nl: [
        'Woningaanbod presenteren',
        'Je werkgebied tonen',
        'Persoonlijke aanpak uitleggen',
        'Klantreviews',
        'Waardebepaling aanvragen',
        'Direct contact mogelijk',
      ],
      en: [
        'Present property listings',
        'Show your service area',
        'Explain personal approach',
        'Client reviews',
        'Request valuation',
        'Direct contact possible',
      ],
    },
    examples: {
      nl: ['Aankoopmakelaar', 'Verkoopmakelaar', 'Taxateur', 'Huurmakelaar'],
      en: ['Buyer\'s agent', 'Seller\'s agent', 'Appraiser', 'Rental agent'],
    },
  },
  tandartsen: {
    icon: Stethoscope,
    color: 'cyan',
    title: { nl: 'Website voor Tandartsen', en: 'Website for Dentists' },
    subtitle: { nl: 'Nieuwe patiënten met vertrouwen', en: 'New patients with confidence' },
    description: {
      nl: 'Tandarts kiezen is eng voor veel mensen. Een warme, professionele website met je team, praktijk en behandelingen neemt angst weg en overtuigt nieuwe patiënten om een afspraak te maken.',
      en: "Choosing a dentist is scary for many people. A warm, professional website with your team, practice and treatments takes away fear and convinces new patients to make an appointment."
    },
    benefits: {
      nl: [
        'Team en praktijk voorstellen',
        'Behandelingen uitleggen',
        'Online afspraken maken',
        'Tarieven en vergoedingen',
        'Patiëntreviews',
        'Spoedgevallen info',
      ],
      en: [
        'Introduce team and practice',
        'Explain treatments',
        'Online appointments',
        'Rates and insurance info',
        'Patient reviews',
        'Emergency info',
      ],
    },
    examples: {
      nl: ['Tandartspraktijken', 'Mondhygiënisten', 'Orthodontisten', 'Implantologen'],
      en: ['Dental practices', 'Dental hygienists', 'Orthodontists', 'Implantologists'],
    },
  },
  garages: {
    icon: Car,
    color: 'zinc',
    title: { nl: 'Website voor Garages', en: 'Website for Auto Shops' },
    subtitle: { nl: 'Meer klanten voor je werkplaats', en: 'More customers for your workshop' },
    description: {
      nl: 'Als garage wil je dat mensen je vinden wanneer hun auto problemen heeft. Een duidelijke website met je diensten, locatie en contactgegevens zorgt dat klanten naar jou komen in plaats van naar de concurrent.',
      en: "As an auto shop, you want people to find you when their car has problems. A clear website with your services, location and contact details ensures customers come to you instead of the competition."
    },
    benefits: {
      nl: [
        'Diensten duidelijk vermeld',
        'APK afspraak online maken',
        'Locatie met route',
        'Prijsindicaties',
        'Klantreviews',
        'Merkspecialisme vermelden',
      ],
      en: [
        'Services clearly listed',
        'Book inspection online',
        'Location with directions',
        'Price indications',
        'Customer reviews',
        'Brand specialization mentioned',
      ],
    },
    examples: {
      nl: ['Autogaragages', 'APK stations', 'Bandenwisselaars', 'Autodetailers'],
      en: ['Auto repair shops', 'MOT stations', 'Tire shops', 'Auto detailers'],
    },
  },
  hondentrimmers: {
    icon: PawPrint,
    color: 'amber',
    title: { nl: 'Website voor Hondentrimsalons', en: 'Website for Dog Groomers' },
    subtitle: { nl: 'Laat zien hoe mooi je ze maakt', en: 'Show how beautiful you make them' },
    description: {
      nl: 'Baasjes willen het beste voor hun hond. Met een website vol schattige voor-en-na foto\'s, duidelijke prijzen en makkelijk boeken, kiezen ze voor jouw trimsalon.',
      en: "Pet owners want the best for their dog. With a website full of cute before-and-after photos, clear prices and easy booking, they choose your grooming salon."
    },
    benefits: {
      nl: [
        'Voor en na foto\'s',
        'Prijslijst per ras',
        'Online afspraken',
        'Behandelingen uitgelegd',
        'Klantreviews',
        'Locatie en parkeren',
      ],
      en: [
        'Before and after photos',
        'Price list by breed',
        'Online appointments',
        'Treatments explained',
        'Customer reviews',
        'Location and parking',
      ],
    },
    examples: {
      nl: ['Hondentrimsalons', 'Kattentrimsalons', 'Mobiele trimmers', 'Dierenpensions'],
      en: ['Dog grooming salons', 'Cat grooming salons', 'Mobile groomers', 'Pet boarding'],
    },
  },
};

const DienstenPage = () => {
  const { language } = useLanguage();
  const { type, niche } = useParams();

  const isServicePage = type && services[type];
  const isNichePage = niche && niches[niche];

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  // Service Detail Page
  if (isServicePage) {
    const service = services[type];
    return (
      <div className="min-h-screen bg-white">
        <SEO page={`/diensten/${type}`} />
        
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-10 lg:h-12 w-auto object-contain" />
              </Link>
              <Link 
                to="/diensten" 
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
              >
                ← {language === 'nl' ? 'Alle Diensten' : 'All Services'}
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="absolute inset-0 bg-white/80" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <service.icon size={32} className="text-gray-700" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                {service.title[language]}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {service.subtitle[language]}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {service.description[language]}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-center mb-10">
              {language === 'nl' ? 'Wat je krijgt' : 'What you get'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features[language].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'nl' ? `${service.title[language]} nodig?` : `Need ${service.title[language]}?`}
            </h2>
            <p className="text-gray-400 mb-6">
              {language === 'nl' ? `Vanaf ${service.price} excl. BTW` : `From ${service.price} excl. VAT`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-100 transition-colors"
              >
                {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
              </button>
              <Link
                to="/calculator"
                className="px-6 py-3 border border-white text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-black transition-colors"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Niche Detail Page
  if (isNichePage) {
    const nicheData = niches[niche];
    return (
      <div className="min-h-screen bg-white">
        <SEO page={`/voor/${niche}`} />
        
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-10 lg:h-12 w-auto object-contain" />
              </Link>
              <Link 
                to="/diensten" 
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
              >
                ← {language === 'nl' ? 'Alle Websites' : 'All Websites'}
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="absolute inset-0 bg-white/80" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <nicheData.icon size={32} className="text-gray-700" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                {nicheData.title[language]}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {nicheData.subtitle[language]}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {nicheData.description[language]}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-center mb-10">
              {language === 'nl' ? 'Wat een website je oplevert' : 'What a website delivers'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nicheData.benefits[language].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'nl' ? 'Perfect voor' : 'Perfect for'}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {nicheData.examples[language].map((example, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'nl' ? 'Klaar voor jouw website?' : 'Ready for your website?'}
            </h2>
            <p className="text-gray-400 mb-6">
              {language === 'nl' ? 'Vanaf €500 excl. BTW' : 'From €500 excl. VAT'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-100 transition-colors"
              >
                {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
              </button>
              <Link
                to="/calculator"
                className="px-6 py-3 border border-white text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-black transition-colors"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Main Services Overview Page
  return (
    <div className="min-h-screen bg-white">
      <SEO page="/diensten" />
      
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-10 lg:h-12 w-auto object-contain" />
            </Link>
            <Link 
              to="/" 
              className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
            >
              ← {language === 'nl' ? 'Terug naar Home' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero with Background */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
              {language === 'nl' ? 'Diensten' : 'Services'}
            </p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
              {language === 'nl' ? 'Wat ik voor je kan doen' : 'What I can do for you'}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {language === 'nl'
                ? 'Van webdesign tot complete website oplossingen — alles wat je nodig hebt om online te groeien.'
                : 'From web design to complete website solutions — everything you need to grow online.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Without Branding */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold mb-8">
            {language === 'nl' ? 'Diensten' : 'Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(services).map(([key, service], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/diensten/${key}`}
                  className="block bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <service.icon size={28} className="text-gray-700" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2">{service.title[language]}</h3>
                  <p className="text-gray-600 mb-4">{service.subtitle[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {language === 'nl' ? 'Vanaf' : 'From'} {service.price}
                    </span>
                    <ArrowRight size={20} className="text-gray-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches Grid - Organized in 3 columns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">
              {language === 'nl' ? 'Websites voor' : 'Websites for'}
            </h2>
            <p className="text-gray-500">
              {language === 'nl' ? 'Speciale expertise voor jouw branche' : 'Special expertise for your industry'}
            </p>
          </div>
          
          {/* Organized in 3 category columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Beauty & Wellness */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 pb-2 border-b border-gray-200">
                {language === 'nl' ? 'Beauty & Wellness' : 'Beauty & Wellness'}
              </h3>
              <div className="space-y-2">
                {['kappers', 'nagelstylisten', 'interieurstylisten'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
                        <p className="text-gray-400 text-xs truncate">{nicheData.subtitle[language]}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Zakelijke Diensten */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 pb-2 border-b border-gray-200">
                {language === 'nl' ? 'Zakelijke Diensten' : 'Business Services'}
              </h3>
              <div className="space-y-2">
                {['coaches', 'zzp', 'fotografen', 'makelaars'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
                        <p className="text-gray-400 text-xs truncate">{nicheData.subtitle[language]}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Ambacht & Horeca */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 pb-2 border-b border-gray-200">
                {language === 'nl' ? 'Ambacht & Horeca' : 'Craft & Hospitality'}
              </h3>
              <div className="space-y-2">
                {['loodgieters', 'restaurants', 'bloemisten', 'garages'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
                        <p className="text-gray-400 text-xs truncate">{nicheData.subtitle[language]}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional niches row */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">
              {language === 'nl' ? 'Meer Branches' : 'More Industries'}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['personaltrainers', 'tandartsen', 'hondentrimmers'].map((key) => {
                const nicheData = niches[key];
                if (!nicheData) return null;
                return (
                  <Link
                    key={key}
                    to={`/voor/${key}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:shadow-md transition-all border border-gray-200 group"
                  >
                    <nicheData.icon size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600 group-hover:text-black">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'nl' ? 'Jouw branche niet gevonden?' : "Didn't find your industry?"}
          </h2>
          <p className="text-gray-400 mb-6">
            {language === 'nl'
              ? 'Geen probleem! Ik maak websites voor elke branche. Neem contact op en we bespreken jouw wensen.'
              : "No problem! I create websites for any industry. Get in touch and we'll discuss your needs."}
          </p>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-100 transition-colors"
          >
            {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
          </button>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DienstenPage;
