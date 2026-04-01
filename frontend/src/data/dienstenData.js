import {
  Monitor,
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
  Zap,
  Activity,
  BarChart2,
  Paintbrush,
  Hammer,
  Star,
  Globe,
  Shield,
  Hand,
  Dog,
  Terminal,
  Palette,
  Video,
  Megaphone,
  Database,
  FileText,
  Music,
  BookOpen,
  Users,
  TrendingUp,
  Brain,
  HeartPulse,
  Leaf,
  Truck,
  Droplet,
  Wind,
  Headphones,
} from "lucide-react";

// Service data - Only Webdesign and Onderhoud
export const services = {
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
export const niches = {
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
      nl: ['Professionele uitstraling die vertrouwen wekt', 'Duidelijk overzicht van je diensten en tarieven', 'Makkelijk afspraken inplannen (optioneel boekingssysteem)', 'Blog om je expertise te delen', 'Testimonials van tevreden klanten', 'Contact mogelijkheden die werken'],
      en: ['Professional appearance that builds trust', 'Clear overview of your services and rates', 'Easy appointment scheduling (optional booking system)', 'Blog to share your expertise', 'Testimonials from satisfied clients', 'Contact options that work'],
    },
    examples: {
      nl: ['Life coaches', 'Business coaches', 'Mindset coaches', 'Health coaches', 'Relatie coaches'],
      en: ['Life coaches', 'Business coaches', 'Mindset coaches', 'Health coaches', 'Relationship coaches'],
    },
  },
  zzp: {
    icon: Briefcase, color: 'amber',
    title: { nl: "Website voor ZZP'ers", en: 'Website for Freelancers' },
    subtitle: { nl: 'Jouw bedrijf verdient online zichtbaarheid', en: 'Your business deserves online visibility' },
    description: {
      nl: "Als ZZP'er ben je je eigen merk. Klanten googlen je voordat ze contact opnemen. Zonder website mis je kansen — elke dag opnieuw. Een professionele website kost minder dan je denkt én verdient zichzelf terug.",
      en: "As a freelancer, you are your own brand. Clients google you before they get in touch. Without a website, you miss opportunities — every single day. A professional website costs less than you think and pays for itself."
    },
    benefits: {
      nl: ['Gevonden worden in Google', 'Professionele eerste indruk', 'Je diensten duidelijk presenteren', 'Contact mogelijkheden 24/7', 'Onderscheiden van concurrentie', 'Eigen domein (jouwbedrijf.nl)'],
      en: ['Be found on Google', 'Professional first impression', 'Present your services clearly', 'Contact options 24/7', 'Stand out from competition', 'Own domain (yourbusiness.com)'],
    },
    examples: {
      nl: ['Consultants', 'Adviseurs', 'Trainers', 'Therapeuten', 'Vertalers'],
      en: ['Consultants', 'Advisors', 'Trainers', 'Therapists', 'Translators'],
    },
  },
  kappers: {
    icon: Scissors, color: 'violet',
    title: { nl: 'Website voor Kappers', en: 'Website for Hairdressers' },
    subtitle: { nl: 'Trek meer klanten naar je salon', en: 'Attract more clients to your salon' },
    description: {
      nl: 'Een kapsalon draait om stijl en uitstraling. Laat dat zien met een website die net zo goed verzorgd is als je werk. Klanten willen je werk zien, je prijzen kennen en makkelijk een afspraak kunnen maken.',
      en: "A hair salon is all about style and appearance. Show that with a website as well-groomed as your work. Clients want to see your work, know your prices and easily book an appointment."
    },
    benefits: {
      nl: ['Portfolio met je beste kapsels', 'Online afspraken boeken', 'Duidelijke prijslijst', 'Locatie en openingstijden', 'Reviews van tevreden klanten', 'Instagram integratie'],
      en: ['Portfolio with your best hairstyles', 'Online appointment booking', 'Clear price list', 'Location and opening hours', 'Reviews from satisfied clients', 'Instagram integration'],
    },
    examples: {
      nl: ['Kapsalons', 'Barbershops', 'Mobiele kappers', 'Bruidskapper', 'Herenkapper'],
      en: ['Hair salons', 'Barbershops', 'Mobile hairdressers', 'Bridal hairdresser', "Men's barber"],
    },
  },
  nagelstylisten: {
    icon: Sparkles, color: 'pink',
    title: { nl: 'Website voor Nagelstylisten', en: 'Website for Nail Technicians' },
    subtitle: { nl: 'Laat je nagel kunst online schitteren', en: 'Let your nail art shine online' },
    description: {
      nl: 'Als nagelstyliste is je werk visueel. Klanten willen zien wat je kunt voordat ze een afspraak maken. Een professionele website met een mooie galerij en online booking is essentieel om nieuwe klanten aan te trekken.',
      en: "As a nail technician, your work is visual. Clients want to see what you can do before booking. A professional website with a beautiful gallery and online booking is essential to attract new clients."
    },
    benefits: {
      nl: ['Galerij met nail art voorbeelden', 'Online afspraken boeken', 'Behandelingen en prijzen', "Voor en na foto's", 'Klantreviews', 'Social media links'],
      en: ['Gallery with nail art examples', 'Online appointment booking', 'Treatments and prices', 'Before and after photos', 'Client reviews', 'Social media links'],
    },
    examples: {
      nl: ["Nagelstudio's", 'Beauty salons', "Thuisstudio's", 'Nagelstylist aan huis'],
      en: ['Nail studios', 'Beauty salons', 'Home studios', 'Mobile nail technician'],
    },
  },
  interieurstylisten: {
    icon: Home, color: 'emerald',
    title: { nl: 'Website voor Interieurstylisten', en: 'Website for Interior Designers' },
    subtitle: { nl: 'Toon je portfolio aan potentiële klanten', en: 'Show your portfolio to potential clients' },
    description: {
      nl: 'Als interieurstyliste verkoop je visie en smaak. Klanten moeten jouw stijl kunnen ervaren voordat ze contact opnemen. Een elegante website met je beste projecten is je digitale showroom.',
      en: "As an interior designer, you sell vision and taste. Clients need to experience your style before contacting you. An elegant website with your best projects is your digital showroom."
    },
    benefits: {
      nl: ["Portfolio met projectfoto's", 'Voor en na transformaties', 'Je werkwijze uitgelegd', 'Tarieven en pakketten', 'Klantgetuigenissen', 'Blog met interieur tips'],
      en: ['Portfolio with project photos', 'Before and after transformations', 'Your working method explained', 'Rates and packages', 'Client testimonials', 'Blog with interior tips'],
    },
    examples: {
      nl: ['Interieurontwerpers', 'Home stagers', 'Kleuradvies', 'Woonstylisten'],
      en: ['Interior designers', 'Home stagers', 'Color consultants', 'Home stylists'],
    },
  },
  bloemisten: {
    icon: Flower2, color: 'rose',
    title: { nl: 'Website voor Bloemisten', en: 'Website for Florists' },
    subtitle: { nl: 'Laat je bloemen online bloeien', en: 'Let your flowers bloom online' },
    description: {
      nl: 'Bloemen zijn emotie. Klanten zoeken de perfecte bos voor een speciale gelegenheid. Met een mooie website kunnen ze jouw creaties bewonderen en direct bestellen — ook buiten openingstijden.',
      en: "Flowers are emotion. Clients are looking for the perfect bouquet for a special occasion. With a beautiful website, they can admire your creations and order directly — even outside opening hours."
    },
    benefits: {
      nl: ["Productcatalogus met foto's", 'Online bestellen (optioneel)', 'Bezorggebied en tarieven', 'Seizoensaanbiedingen', 'Bruiloft en event service', 'Abonnementen uitgelicht'],
      en: ['Product catalog with photos', 'Online ordering (optional)', 'Delivery area and rates', 'Seasonal offers', 'Wedding and event service', 'Subscriptions highlighted'],
    },
    examples: {
      nl: ['Bloemenwinkels', 'Bruiloft bloemisten', 'Event decorateurs', 'Plantenwinkels'],
      en: ['Flower shops', 'Wedding florists', 'Event decorators', 'Plant shops'],
    },
  },
  loodgieters: {
    icon: Wrench, color: 'blue',
    title: { nl: 'Website voor Loodgieters', en: 'Website for Plumbers' },
    subtitle: { nl: 'Bereikbaar wanneer klanten je nodig hebben', en: 'Reachable when clients need you' },
    description: {
      nl: 'Als loodgieter word je gebeld in noodgevallen. Klanten googlen "loodgieter bij mij in de buurt" en kiezen de eerste die professioneel overkomt. Zonder website verlies je die klanten aan de concurrent.',
      en: 'As a plumber, you get called in emergencies. Clients google "plumber near me" and choose the first one that looks professional. Without a website, you lose those clients to the competition.'
    },
    benefits: {
      nl: ['Direct vindbaar in Google', 'Duidelijk telefoonnummer', 'Werkgebied vermeld', 'Diensten en prijsindicatie', 'Reviews van klanten', '24/7 spoedservice uitgelicht'],
      en: ['Directly findable on Google', 'Clear phone number', 'Service area listed', 'Services and price indication', 'Customer reviews', '24/7 emergency service highlighted'],
    },
    examples: {
      nl: ['Loodgieters', 'CV-monteurs', 'Rioolservice', 'Ontstoppingsdienst'],
      en: ['Plumbers', 'Heating engineers', 'Drain services', 'Unclogging service'],
    },
  },
  restaurants: {
    icon: Utensils, color: 'orange',
    title: { nl: 'Website voor Restaurants', en: 'Website for Restaurants' },
    subtitle: { nl: 'Maak hongerige gasten nieuwsgierig', en: 'Make hungry guests curious' },
    description: {
      nl: 'Mensen besluiten binnen seconden of ze bij jou willen eten. Een smakelijke website met je menukaart, sfeerbeelden en reserveringsmogelijkheid kan het verschil maken tussen een lege of volle zaak.',
      en: "People decide within seconds if they want to eat at your place. A tasty website with your menu, atmosphere photos and reservation option can make the difference between an empty or full restaurant."
    },
    benefits: {
      nl: ['Digitale menukaart', 'Online reserveren', "Sfeervolle foto's", 'Locatie en openingstijden', 'Speciale events en acties', 'Google Maps integratie'],
      en: ['Digital menu', 'Online reservations', 'Atmospheric photos', 'Location and opening hours', 'Special events and promotions', 'Google Maps integration'],
    },
    examples: {
      nl: ['Restaurants', 'Cafés', "Bistro's", 'Foodtrucks', 'Catering'],
      en: ['Restaurants', 'Cafés', 'Bistros', 'Food trucks', 'Catering'],
    },
  },
  personaltrainers: {
    icon: Dumbbell, color: 'red',
    title: { nl: 'Website voor Personal Trainers', en: 'Website for Personal Trainers' },
    subtitle: { nl: 'Inspireer klanten om te starten', en: 'Inspire clients to get started' },
    description: {
      nl: 'Als personal trainer verkoop je transformatie. Potentiële klanten willen bewijs zien dat je resultaten levert. Een website met succesverhalen, je aanpak en makkelijk contact opnemen is onmisbaar.',
      en: "As a personal trainer, you sell transformation. Potential clients want to see proof that you deliver results. A website with success stories, your approach and easy contact is essential."
    },
    benefits: {
      nl: ["Transformatie foto's", 'Trainingsaanbod en prijzen', 'Jouw verhaal en certificeringen', 'Online afspraken maken', 'Klantresultaten en reviews', 'Gratis tips of proefles'],
      en: ['Transformation photos', 'Training packages and prices', 'Your story and certifications', 'Online appointment booking', 'Client results and reviews', 'Free tips or trial lesson'],
    },
    examples: {
      nl: ['Personal trainers', 'Fitness coaches', 'Voedingscoaches', 'Groepstrainers'],
      en: ['Personal trainers', 'Fitness coaches', 'Nutrition coaches', 'Group trainers'],
    },
  },
  fotografen: {
    icon: Camera, color: 'slate',
    title: { nl: 'Website voor Fotografen', en: 'Website for Photographers' },
    subtitle: { nl: 'Je portfolio verdient een podium', en: 'Your portfolio deserves a stage' },
    description: {
      nl: "Als fotograaf IS je website je visitekaartje. Klanten beoordelen je werk binnen seconden. Een strak, snel ladend portfolio zonder afleiding laat je foto's spreken.",
      en: "As a photographer, your website IS your business card. Clients judge your work within seconds. A clean, fast-loading portfolio without distractions lets your photos speak."
    },
    benefits: {
      nl: ['Galerij die je werk laat schitteren', "Snelle laadtijden voor grote foto's", 'Prijspakketten', 'Contactformulier', 'Over mij pagina', 'Blog met shoots'],
      en: ['Gallery that showcases your work', 'Fast loading times for large photos', 'Price packages', 'Contact form', 'About me page', 'Blog with shoots'],
    },
    examples: {
      nl: ['Bruiloftsfotografen', 'Portretfotografen', 'Product fotografen', 'Eventfotografen'],
      en: ['Wedding photographers', 'Portrait photographers', 'Product photographers', 'Event photographers'],
    },
  },
  makelaars: {
    icon: Building, color: 'indigo',
    title: { nl: 'Website voor Makelaars', en: 'Website for Real Estate Agents' },
    subtitle: { nl: 'Onderscheid je van de grote kantoren', en: 'Stand out from the big offices' },
    description: {
      nl: 'Als zelfstandig makelaar concurreer je met grote kantoren. Een professionele, persoonlijke website laat zien dat jij de betrokken aanpak biedt die klanten zoeken.',
      en: "As an independent real estate agent, you compete with large offices. A professional, personal website shows that you offer the dedicated approach that clients are looking for."
    },
    benefits: {
      nl: ['Woningaanbod presenteren', 'Je werkgebied tonen', 'Persoonlijke aanpak uitleggen', 'Klantreviews', 'Waardebepaling aanvragen', 'Direct contact mogelijk'],
      en: ['Present property listings', 'Show your service area', 'Explain personal approach', 'Client reviews', 'Request valuation', 'Direct contact possible'],
    },
    examples: {
      nl: ['Aankoopmakelaar', 'Verkoopmakelaar', 'Taxateur', 'Huurmakelaar'],
      en: ["Buyer's agent", "Seller's agent", 'Appraiser', 'Rental agent'],
    },
  },
  tandartsen: {
    icon: Stethoscope, color: 'cyan',
    title: { nl: 'Website voor Tandartsen', en: 'Website for Dentists' },
    subtitle: { nl: 'Nieuwe patiënten met vertrouwen', en: 'New patients with confidence' },
    description: {
      nl: 'Tandarts kiezen is eng voor veel mensen. Een warme, professionele website met je team, praktijk en behandelingen neemt angst weg en overtuigt nieuwe patiënten om een afspraak te maken.',
      en: "Choosing a dentist is scary for many people. A warm, professional website with your team, practice and treatments takes away fear and convinces new patients to make an appointment."
    },
    benefits: {
      nl: ['Team en praktijk voorstellen', 'Behandelingen uitleggen', 'Online afspraken maken', 'Tarieven en vergoedingen', 'Patiëntreviews', 'Spoedgevallen info'],
      en: ['Introduce team and practice', 'Explain treatments', 'Online appointments', 'Rates and insurance info', 'Patient reviews', 'Emergency info'],
    },
    examples: {
      nl: ['Tandartspraktijken', 'Mondhygiënisten', 'Orthodontisten', 'Implantologen'],
      en: ['Dental practices', 'Dental hygienists', 'Orthodontists', 'Implantologists'],
    },
  },
  garages: {
    icon: Car, color: 'zinc',
    title: { nl: 'Website voor Garages', en: 'Website for Auto Shops' },
    subtitle: { nl: 'Meer klanten voor je werkplaats', en: 'More customers for your workshop' },
    description: {
      nl: 'Als garage wil je dat mensen je vinden wanneer hun auto problemen heeft. Een duidelijke website met je diensten, locatie en contactgegevens zorgt dat klanten naar jou komen in plaats van naar de concurrent.',
      en: "As an auto shop, you want people to find you when their car has problems. A clear website with your services, location and contact details ensures customers come to you instead of the competition."
    },
    benefits: {
      nl: ['Diensten duidelijk vermeld', 'APK afspraak online maken', 'Locatie met route', 'Prijsindicaties', 'Klantreviews', 'Merkspecialisme vermelden'],
      en: ['Services clearly listed', 'Book inspection online', 'Location with directions', 'Price indications', 'Customer reviews', 'Brand specialization mentioned'],
    },
    examples: {
      nl: ['Autogaragages', 'APK stations', 'Bandenwisselaars', 'Autodetailers'],
      en: ['Auto repair shops', 'MOT stations', 'Tire shops', 'Auto detailers'],
    },
  },
  hondentrimmers: {
    icon: PawPrint, color: 'amber',
    title: { nl: 'Website voor Hondentrimsalons', en: 'Website for Dog Groomers' },
    subtitle: { nl: 'Laat zien hoe mooi je ze maakt', en: 'Show how beautiful you make them' },
    description: {
      nl: "Baasjes willen het beste voor hun hond. Met een website vol schattige voor-en-na foto's, duidelijke prijzen en makkelijk boeken, kiezen ze voor jouw trimsalon.",
      en: "Pet owners want the best for their dog. With a website full of cute before-and-after photos, clear prices and easy booking, they choose your grooming salon."
    },
    benefits: {
      nl: ["Voor en na foto's", 'Prijslijst per ras', 'Online afspraken', 'Behandelingen uitgelegd', 'Klantreviews', 'Locatie en parkeren'],
      en: ['Before and after photos', 'Price list by breed', 'Online appointments', 'Treatments explained', 'Customer reviews', 'Location and parking'],
    },
    examples: {
      nl: ['Hondentrimsalons', 'Kattentrimsalons', 'Mobiele trimmers', 'Dierenpensions'],
      en: ['Dog grooming salons', 'Cat grooming salons', 'Mobile groomers', 'Pet boarding'],
    },
  },
  schoonheidsspecialisten: {
    icon: Star, color: 'pink',
    title: { nl: 'Website voor Schoonheidsspecialisten', en: 'Website for Beauty Specialists' },
    subtitle: { nl: 'Laat je expertise glansen', en: 'Let your expertise shine' },
    description: {
      nl: 'Als schoonheidsspecialist lever je vertrouwen en persoonlijke aandacht. Een mooie website laat je behandelingen zien, bouwt vertrouwen op en zorgt voor meer boekingen.',
      en: "As a beauty specialist you deliver trust and personal attention. A beautiful website showcases your treatments, builds trust and generates more bookings."
    },
    benefits: {
      nl: ['Behandelingen overzichtelijk gepresenteerd', 'Online afspraken boeken', 'Prijslijst per behandeling', "Voor en na foto's", 'Sfeervolle beelden van je salon', 'Social media integratie'],
      en: ['Treatments clearly presented', 'Online appointment booking', 'Price list per treatment', 'Before and after photos', 'Atmospheric images of your salon', 'Social media integration'],
    },
    examples: {
      nl: ['Schoonheidssalons', 'Beautysalons', 'Waxingsalons', "Huidverzorgingsstudio's"],
      en: ['Beauty salons', 'Skincare studios', 'Waxing studios', 'Esthetic studios'],
    },
  },
  masseurs: {
    icon: Hand, color: 'teal',
    title: { nl: 'Website voor Masseurs', en: 'Website for Massage Therapists' },
    subtitle: { nl: 'Rust en professionaliteit online', en: 'Peace and professionalism online' },
    description: {
      nl: 'Massagetherapie draait om vertrouwen en ontspanning. Klanten willen weten wie je bent en wat je aanpak is. Een rustige, professionele website geeft precies dat gevoel.',
      en: "Massage therapy is about trust and relaxation. Clients want to know who you are and what your approach is. A calm, professional website gives exactly that feeling."
    },
    benefits: {
      nl: ['Behandelingen uitgelegd', 'Online afspraken boeken', 'Tarieven transparant', 'Locatie en sfeer getoond', 'Klantgetuigenissen', 'Certificaten en opleidingen'],
      en: ['Treatments explained', 'Online appointment booking', 'Transparent pricing', 'Location and atmosphere shown', 'Client testimonials', 'Certificates and training'],
    },
    examples: {
      nl: ['Massagepraktijken', 'Sportmasseurs', 'Wellnesspraktijken', 'Thuismassage'],
      en: ['Massage practices', 'Sports masseurs', 'Wellness practices', 'Home massage'],
    },
  },
  fysiotherapeuten: {
    icon: Activity, color: 'blue',
    title: { nl: 'Website voor Fysiotherapeuten', en: 'Website for Physiotherapists' },
    subtitle: { nl: 'Patiënten vinden je makkelijker', en: 'Patients find you more easily' },
    description: {
      nl: 'Patiënten zoeken een fysiotherapeut via Google. Een professionele website met je specialisaties, team en contactgegevens maakt dat ze voor jou kiezen.',
      en: "Patients search for a physiotherapist via Google. A professional website with your specializations, team and contact details makes them choose you."
    },
    benefits: {
      nl: ['Specialisaties duidelijk vermeld', 'Team en aanpak voorgesteld', 'Online afspraken plannen', 'Klachten en behandelingen uitgelegd', 'Patiëntreviews', 'Vergoedingen en verzekeringen info'],
      en: ['Specializations clearly listed', 'Team and approach introduced', 'Online appointment planning', 'Complaints and treatments explained', 'Patient reviews', 'Reimbursement and insurance info'],
    },
    examples: {
      nl: ['Fysiotherapiepraktijken', 'Sportfysio', 'Kinderfysio', 'Manueel therapeuten'],
      en: ['Physiotherapy practices', 'Sports physio', 'Pediatric physio', 'Manual therapists'],
    },
  },
  accountants: {
    icon: BarChart2, color: 'slate',
    title: { nl: 'Website voor Accountants', en: 'Website for Accountants' },
    subtitle: { nl: 'Vertrouwen uitstralen online', en: 'Radiate trust online' },
    description: {
      nl: 'Als accountant of boekhouder is vertrouwen alles. Een strakke, professionele website toont je expertise en haalt nieuwe klanten over om contact op te nemen.',
      en: "As an accountant or bookkeeper, trust is everything. A clean, professional website shows your expertise and convinces new clients to get in touch."
    },
    benefits: {
      nl: ['Diensten duidelijk uitgelegd', 'Tarieven transparant', 'Branche specialisaties', 'Contactformulier voor offertes', 'Klantreviews', 'Blog met fiscale tips'],
      en: ['Services clearly explained', 'Transparent pricing', 'Industry specializations', 'Contact form for quotes', 'Client reviews', 'Blog with tax tips'],
    },
    examples: {
      nl: ['Accountantskantoren', 'Boekhouders', 'Belastingadviseurs', 'Administratiekantoren'],
      en: ['Accounting firms', 'Bookkeepers', 'Tax advisors', 'Administrative offices'],
    },
  },
  electriciens: {
    icon: Zap, color: 'yellow',
    title: { nl: 'Website voor Elektriciens', en: 'Website for Electricians' },
    subtitle: { nl: 'Gevonden worden bij elke klus', en: 'Found for every job' },
    description: {
      nl: 'Klanten zoeken een elektricien wanneer het mis gaat. Zorg dat jij als eerste verschijnt met een duidelijke website vol reviews, diensten en een makkelijk te bereiken telefoonnummer.',
      en: "Clients search for an electrician when something goes wrong. Make sure you appear first with a clear website full of reviews, services and an easy-to-reach phone number."
    },
    benefits: {
      nl: ['Snel vindbaar op Google', 'Duidelijk telefoonnummer', 'Diensten en tarieven', 'Werkgebied vermeld', 'Klantreviews', 'Spoed service uitgelicht'],
      en: ['Quickly findable on Google', 'Clear phone number', 'Services and rates', 'Service area listed', 'Customer reviews', 'Emergency service highlighted'],
    },
    examples: {
      nl: ['Elektriciensbedrijven', 'Installatiebedrijven', 'Storingsservice', 'Domotica installateurs'],
      en: ['Electrical companies', 'Installation companies', 'Breakdown service', 'Domotics installers'],
    },
  },
  schilders: {
    icon: Paintbrush, color: 'orange',
    title: { nl: 'Website voor Schilders', en: 'Website for Painters' },
    subtitle: { nl: 'Je werk verdient een podium', en: 'Your work deserves a stage' },
    description: {
      nl: "Als schilder spreken de resultaten voor zichzelf. Laat je portfolio online zien met mooie voor-en-na foto's en win nieuwe klanten via Google.",
      en: "As a painter, the results speak for themselves. Show your portfolio online with beautiful before-and-after photos and win new customers via Google."
    },
    benefits: {
      nl: ["Portfolio met voor-en-na foto's", 'Diensten overzicht', 'Werkgebied vermeld', 'Offerte aanvragen via formulier', 'Klantreviews', 'Bereikbaarheid duidelijk'],
      en: ['Portfolio with before-and-after photos', 'Services overview', 'Service area listed', 'Request quote via form', 'Customer reviews', 'Availability clear'],
    },
    examples: {
      nl: ['Schildersbedrijven', 'Binnen schilders', 'Buiten schilders', 'Decorateurs'],
      en: ['Painting companies', 'Interior painters', 'Exterior painters', 'Decorators'],
    },
  },
  timmerlieden: {
    icon: Hammer, color: 'amber',
    title: { nl: 'Website voor Timmerlieden', en: 'Website for Carpenters' },
    subtitle: { nl: 'Toon je vakmanschap online', en: 'Show your craftsmanship online' },
    description: {
      nl: "Mensen googlen voor een keuken, een dakkapel of maatwerk meubels. Met een professionele website vol projectfoto's ben jij de eerste keuze in de buurt.",
      en: "People google for a kitchen, dormer window or custom furniture. With a professional website full of project photos, you are the first choice in the area."
    },
    benefits: {
      nl: ['Projecten portfolio', "Voor en na foto's", 'Specialisaties vermeld', 'Offerte aanvragen', 'Klantreviews', 'Werkgebied en contactgegevens'],
      en: ['Projects portfolio', 'Before and after photos', 'Specializations listed', 'Request quotes', 'Customer reviews', 'Work area and contact details'],
    },
    examples: {
      nl: ['Timmerbedrijven', 'Keukenmonteurs', 'Dakkapel specialisten', 'Maatwerk meubels'],
      en: ['Carpentry companies', 'Kitchen installers', 'Dormer specialists', 'Custom furniture'],
    },
  },
  dierenartsen: {
    icon: Dog, color: 'green',
    title: { nl: 'Website voor Dierenartsen', en: 'Website for Veterinarians' },
    subtitle: { nl: 'Baasjes vinden je makkelijker', en: 'Pet owners find you more easily' },
    description: {
      nl: 'Baasjes zoeken een dierenarts die ze vertrouwen. Een warme, professionele website met je team en diensten maakt dat ze voor jou kiezen.',
      en: "Pet owners look for a vet they can trust. A warm, professional website with your team and services makes them choose you."
    },
    benefits: {
      nl: ['Team en praktijk voorgesteld', 'Diensten en behandelingen', 'Online afspraken plannen', 'Spoedcontact duidelijk', 'Patiëntreviews', 'Openingstijden en locatie'],
      en: ['Team and practice introduced', 'Services and treatments', 'Online appointment planning', 'Emergency contact clear', 'Patient reviews', 'Opening hours and location'],
    },
    examples: {
      nl: ['Dierenkliniek', 'Huisdierenarts', 'Mobiele dierenarts', 'Exoten specialist'],
      en: ['Animal clinic', 'Pet vet', 'Mobile vet', 'Exotic specialist'],
    },
  },
  klusbedrijven: {
    icon: Wrench, color: 'gray',
    title: { nl: 'Website voor Klusbedrijven', en: 'Website for Handymen' },
    subtitle: { nl: 'Altijd gevonden bij de juiste klus', en: 'Always found for the right job' },
    description: {
      nl: 'Als klusbedrijf kom je bij mensen thuis. Vertrouwen is alles. Een professionele website met reviews en een duidelijk dienstenoverzicht zorgt dat klanten zonder twijfel contact opnemen.',
      en: "As a handyman service you enter people's homes. Trust is everything. A professional website with reviews and a clear overview of services ensures clients contact you without hesitation."
    },
    benefits: {
      nl: ['Diensten helder omschreven', 'Werkgebied vermeld', 'Offerte aanvragen', 'Klantreviews voor vertrouwen', 'Contactgegevens prominent', 'Portfolio van uitgevoerd werk'],
      en: ['Services clearly described', 'Service area listed', 'Request quotes', 'Customer reviews for trust', 'Contact details prominent', 'Portfolio of completed work'],
    },
    examples: {
      nl: ['Klusbedrijven', 'Allround klusser', 'Woningrenovatie', 'Kleine verbouwingen'],
      en: ['Handyman services', 'All-round handyman', 'Home renovation', 'Small renovations'],
    },
  },
  developers: {
    icon: Terminal, color: 'blue',
    title: { nl: 'Website voor ZZP Developers', en: 'Website for Freelance Developers' },
    subtitle: { nl: 'Jouw skills verdienen een podium', en: 'Your skills deserve a stage' },
    description: { nl: 'Als freelance developer verkoop je jezelf. Klanten googlen op naam of specialisatie. Een strakke portfolio-website laat zien wie je bent, wat je bouwt en hoe ze je inhuren.', en: 'As a freelance developer you sell yourself. A clean portfolio website shows who you are, what you build and how to hire you.' },
    benefits: { nl: ['Portfolio met projecten', 'Tech stack vermeld', 'GitHub koppeling', 'Uurtarief en beschikbaarheid', 'Contactformulier', 'Klantcases uitgelicht'], en: ['Portfolio with projects', 'Tech stack listed', 'GitHub link', 'Hourly rate and availability', 'Contact form', 'Client cases highlighted'] },
    examples: { nl: ['Frontend developers', 'Backend developers', 'Full-stack developers', 'App developers', 'WordPress developers'], en: ['Frontend developers', 'Backend developers', 'Full-stack developers', 'App developers'] },
  },
  grafisch_designers: {
    icon: Palette, color: 'purple',
    title: { nl: 'Website voor Grafisch Designers', en: 'Website for Graphic Designers' },
    subtitle: { nl: 'Laat je werk voor je spreken', en: 'Let your work speak for you' },
    description: { nl: 'Als grafisch designer is je website je mooiste visitekaartje. Een strakke portfolio met jouw stijl trekt de juiste klanten aan.', en: 'As a graphic designer your website is your best business card. A clean portfolio with your style attracts the right clients.' },
    benefits: { nl: ['Visueel sterk portfolio', 'Projecten per categorie', 'Stijl en specialisaties zichtbaar', 'Tarieven en diensten', 'Contactformulier', 'Social media koppelingen'], en: ['Visually strong portfolio', 'Projects per category', 'Style and specializations visible', 'Rates and services', 'Contact form', 'Social media links'] },
    examples: { nl: ['Logo designers', 'Brand designers', 'Motion designers', 'Print designers'], en: ['Logo designers', 'Brand designers', 'Motion designers', 'Print designers'] },
  },
  ux_designers: {
    icon: Monitor, color: 'indigo',
    title: { nl: 'Website voor UX/UI Designers', en: 'Website for UX/UI Designers' },
    subtitle: { nl: 'Design thinking begint bij jouw site', en: 'Design thinking starts at your site' },
    description: { nl: 'UX/UI designers worden ingehuurd op basis van hun process en resultaten. Toon casestudies en wireframes in een portfolio dat exact weergeeft hoe jij werkt.', en: 'UX/UI designers are hired based on their process and results. Show case studies and wireframes in a portfolio that exactly reflects how you work.' },
    benefits: { nl: ['Casestudies met process', 'Wireframes en mockups', 'Tools en methoden vermeld', 'Beschikbaarheid zichtbaar', 'Contactformulier', 'LinkedIn koppeling'], en: ['Case studies with process', 'Wireframes and mockups', 'Tools and methods listed', 'Availability visible', 'Contact form', 'LinkedIn link'] },
    examples: { nl: ['UX designers', 'UI designers', 'Product designers', 'Interaction designers'], en: ['UX designers', 'UI designers', 'Product designers', 'Interaction designers'] },
  },
  social_media_managers: {
    icon: Megaphone, color: 'pink',
    title: { nl: 'Website voor Social Media Managers', en: 'Website for Social Media Managers' },
    subtitle: { nl: 'Bewijs je impact met cijfers', en: 'Prove your impact with numbers' },
    description: { nl: 'Bedrijven willen resultaten zien. Een website met concrete cases, groeicijfers en reviews overtuigt sneller dan een LinkedIn-profiel alleen.', en: 'Companies want to see results. A website with concrete cases and reviews convinces faster than a LinkedIn profile alone.' },
    benefits: { nl: ['Resultaten en statistieken', 'Platforms waarop je werkt', 'Klantcases', 'Diensten en tarieven', 'Contactformulier', 'Sociale bewijskracht'], en: ['Results and statistics', 'Platforms you work on', 'Client cases', 'Services and rates', 'Contact form', 'Social proof'] },
    examples: { nl: ['Social media managers', 'Content creators', 'Community managers', 'TikTok specialisten'], en: ['Social media managers', 'Content creators', 'Community managers', 'TikTok specialists'] },
  },
  data_analisten: {
    icon: Database, color: 'cyan',
    title: { nl: 'Website voor Data Analisten', en: 'Website for Data Analysts' },
    subtitle: { nl: 'Data vertaalt zich naar opdrachten', en: 'Data translates into assignments' },
    description: { nl: "Data analisten worden steeds vaker ingehuurd als ZZP'er. Een professionele website met je specialisaties en tools maakt jou de eerste keuze.", en: 'Data analysts are increasingly hired as freelancers. A professional website with your specializations and tools makes you the first choice.' },
    benefits: { nl: ['Specialisaties en tools vermeld', 'Projecten en resultaten', 'Sectoren waarin je werkt', 'Uurtarief en beschikbaarheid', 'Contactformulier', 'Portfolio met analyses'], en: ['Specializations and tools listed', 'Projects and results', 'Sectors you work in', 'Hourly rate and availability', 'Contact form', 'Portfolio with analyses'] },
    examples: { nl: ['Data analisten', 'BI developers', 'Data scientists', 'Analytics consultants'], en: ['Data analysts', 'BI developers', 'Data scientists', 'Analytics consultants'] },
  },
  it_consultants: {
    icon: Shield, color: 'slate',
    title: { nl: 'Website voor IT Consultants', en: 'Website for IT Consultants' },
    subtitle: { nl: 'Expertise die klanten kunnen vinden', en: 'Expertise clients can find' },
    description: { nl: 'IT consultants worden gevonden via netwerk en Google. Een professionele website versterkt je geloofwaardigheid en haalt directe aanvragen op.', en: 'IT consultants are found through network and Google. A professional website strengthens your credibility and captures direct inquiries.' },
    benefits: { nl: ['Specialisaties duidelijk', 'Certificaten en opleiding', 'Referenties van klanten', 'Tarieven en beschikbaarheid', 'Sectoren vermeld', 'Contactformulier'], en: ['Specializations clear', 'Certificates and training', 'Client references', 'Rates and availability', 'Sectors listed', 'Contact form'] },
    examples: { nl: ['IT consultants', 'Cybersecurity experts', 'Cloud architects', 'IT projectmanagers'], en: ['IT consultants', 'Cybersecurity experts', 'Cloud architects', 'IT project managers'] },
  },
  videografen: {
    icon: Video, color: 'red',
    title: { nl: 'Website voor Videografen', en: 'Website for Videographers' },
    subtitle: { nl: 'Laat je werk bewegen', en: 'Let your work move' },
    description: { nl: "Een videomaker die zichzelf niet op video presenteert, mist een kans. Laat je showreel zien op een snelle website en trek direct de juiste opdrachtgevers aan.", en: "A videographer who doesn't present themselves on video misses an opportunity. Show your showreel and attract the right clients immediately." },
    benefits: { nl: ['Embedded video showreel', 'Portfolio per categorie', 'Uitrusting en stijl vermeld', 'Tarieven en pakketten', 'Beschikbaarheidskalender', 'Contactformulier'], en: ['Embedded video showreel', 'Portfolio per category', 'Equipment and style listed', 'Rates and packages', 'Availability calendar', 'Contact form'] },
    examples: { nl: ['Trouwvideografen', 'Bedrijfsfilms', 'Drone videografen', 'Social media video'], en: ['Wedding videographers', 'Corporate films', 'Drone videographers', 'Social media video'] },
  },
  verpleegkundigen: {
    icon: HeartPulse, color: 'rose',
    title: { nl: 'Website voor ZZP Verpleegkundigen', en: 'Website for Freelance Nurses' },
    subtitle: { nl: 'Vertrouwen begint online', en: 'Trust starts online' },
    description: { nl: "Steeds meer verpleegkundigen werken als ZZP'er. Een professionele website met je specialisaties maakt het makkelijker om opdrachten te vinden.", en: 'More and more nurses work as freelancers. A professional website with your specializations makes it easier to find assignments.' },
    benefits: { nl: ['Specialisaties en ervaringen', 'BIG-registratie vermeld', 'Sectoren vermeld', 'Beschikbaarheid en tarieven', 'Contactformulier', 'Professionele uitstraling'], en: ['Specializations and experiences', 'Registration listed', 'Sectors listed', 'Availability and rates', 'Contact form', 'Professional appearance'] },
    examples: { nl: ['Wijkverpleegkundigen', 'IC verpleegkundigen', 'GGZ verpleegkundigen', 'Gespecialiseerd verpleegkundigen'], en: ['District nurses', 'ICU nurses', 'Mental health nurses', 'Specialized nurses'] },
  },
  psychologen: {
    icon: Brain, color: 'violet',
    title: { nl: 'Website voor Psychologen', en: 'Website for Psychologists' },
    subtitle: { nl: 'Patiënten vinden de juiste hulp', en: 'Patients find the right help' },
    description: { nl: 'Mensen zoeken een psycholoog online die bij hen past. Een warme, betrouwbare website beschrijft jouw aanpak en maakt het laagdrempelig om contact op te nemen.', en: 'People search online for a psychologist that suits them. A warm, trustworthy website describes your approach and makes it easy to get in touch.' },
    benefits: { nl: ['Aanpak en methoden uitgelegd', 'Specialisaties vermeld', 'BIG-registratie', 'Online afspraken plannen', 'Tarieven en vergoedingen', 'Warme uitstraling'], en: ['Approach and methods explained', 'Specializations listed', 'Registration', 'Online appointment planning', 'Rates and reimbursements', 'Warm appearance'] },
    examples: { nl: ['GZ-psychologen', 'Klinisch psychologen', 'Sportpsychologen', 'Kinderpsychologen'], en: ['Clinical psychologists', 'Sports psychologists', 'Child psychologists', 'Organizational psychologists'] },
  },
  diëtisten: {
    icon: Leaf, color: 'lime',
    title: { nl: 'Website voor Diëtisten', en: 'Website for Dietitians' },
    subtitle: { nl: 'Gezonde keuzes beginnen bij jou vinden', en: 'Healthy choices start with finding you' },
    description: { nl: 'Mensen zoeken een diëtist die bij hun situatie past. Een website met jouw specialisaties en aanpak maakt dat ze sneller contact opnemen.', en: 'People search for a dietitian that fits their situation. A website with your specializations and approach makes them contact you sooner.' },
    benefits: { nl: ['Specialisaties uitgelegd', 'Online consults mogelijk', 'Vergoeding info', 'Aanpak en werkwijze', 'Tarieven transparant', 'Contactformulier'], en: ['Specializations explained', 'Online consultations possible', 'Reimbursement info', 'Approach and method', 'Transparent pricing', 'Contact form'] },
    examples: { nl: ['Sportdiëtisten', 'Klinisch diëtisten', 'Diëtisten voor diabetes'], en: ['Sports dietitians', 'Clinical dietitians', 'Diabetes dietitians'] },
  },
  logopedisten: {
    icon: Headphones, color: 'teal',
    title: { nl: 'Website voor Logopedisten', en: 'Website for Speech Therapists' },
    subtitle: { nl: 'Gevonden worden door wie je nodig heeft', en: 'Found by those who need you' },
    description: { nl: 'Ouders zoeken een logopedist voor hun kind, volwassenen zoeken hulp bij stotteren of stemklachten. Een heldere website maakt de keuze voor jou makkelijk.', en: 'Parents search for a speech therapist for their child, adults look for help with stuttering. A clear website makes choosing you easy.' },
    benefits: { nl: ['Klachten en behandelingen', 'Leeftijdsgroepen vermeld', 'Online afspraken', 'Vergoeding informatie', 'Aanpak uitgelegd', 'Contactformulier'], en: ['Complaints and treatments', 'Age groups listed', 'Online appointments', 'Reimbursement information', 'Approach explained', 'Contact form'] },
    examples: { nl: ['Kindertaal logopedisten', 'Stottertherapeuten', 'Stemtherapeuten', 'Dyslexiespecialisten'], en: ['Child speech therapists', 'Stuttering therapists', 'Voice therapists', 'Dyslexia specialists'] },
  },
  thuiszorg: {
    icon: Home, color: 'amber',
    title: { nl: 'Website voor Thuiszorgmedewerkers', en: 'Website for Home Care Workers' },
    subtitle: { nl: 'Vertrouwen thuis begint online', en: 'Trust at home starts online' },
    description: { nl: 'Gezinnen zoeken betrouwbare thuiszorg voor hun geliefden. Een warme, persoonlijke website bouwt dat vertrouwen en laat zien wat je doet en hoe ze je bereiken.', en: 'Families search for reliable home care for their loved ones. A warm, personal website builds trust and shows what you do and how to reach you.' },
    benefits: { nl: ['Diensten duidelijk omschreven', 'Doelgroep vermeld', 'Vergoeding info', 'Referenties', 'Persoonlijke uitstraling', 'Contactformulier'], en: ['Services clearly described', 'Target group listed', 'Reimbursement info', 'References', 'Personal appearance', 'Contact form'] },
    examples: { nl: ['Persoonlijke verzorgers', 'Huishoudelijke hulp', 'Kraamverzorgsters', 'Begeleiders thuis'], en: ['Personal carers', 'Domestic helpers', 'Maternity nurses', 'Home companions'] },
  },
  tekstschrijvers: {
    icon: FileText, color: 'stone',
    title: { nl: 'Website voor Tekstschrijvers', en: 'Website for Copywriters' },
    subtitle: { nl: 'De schrijver die zichzelf verkoopt', en: 'The writer who sells themselves' },
    description: { nl: 'Als tekstschrijver of copywriter is je eigen website je beste portfolio. Laat zien wat je schrijft, voor wie je hebt geschreven en waarom klanten voor jou kiezen.', en: 'As a copywriter your own website is your best portfolio. Show what you write, who you have written for and why clients choose you.' },
    benefits: { nl: ['Portfolio met teksten', 'Niches en specialisaties', 'Klantreviews', 'Tarieven en werkwijze', 'Contactformulier', 'Blog als showcase'], en: ['Portfolio with texts', 'Niches and specializations', 'Client reviews', 'Rates and method', 'Contact form', 'Blog as showcase'] },
    examples: { nl: ['SEO-tekstschrijvers', 'Content marketeers', 'Webtekstschrijvers', 'UX writers'], en: ['SEO copywriters', 'Content marketers', 'Web copywriters', 'UX writers'] },
  },
  illustratoren: {
    icon: Palette, color: 'orange',
    title: { nl: 'Website voor Illustratoren', en: 'Website for Illustrators' },
    subtitle: { nl: 'Je stijl verdient een podium', en: 'Your style deserves a stage' },
    description: { nl: 'Klanten kiezen een illustrator op stijl. Een visueel verbluffende portfolio-website laat direct zien wat je uniek maakt.', en: 'Clients choose an illustrator based on style. A visually stunning portfolio website immediately shows what makes you unique.' },
    benefits: { nl: ['Visueel portfolio per stijl', 'Opdrachten en klanten', 'Stijlen en technieken', 'Tarieven en levertijden', 'Contactformulier', 'Shop voor prints (optioneel)'], en: ['Visual portfolio per style', 'Assignments and clients', 'Styles and techniques', 'Rates and delivery times', 'Contact form', 'Shop for prints (optional)'] },
    examples: { nl: ['Kinderboekillustratoren', 'Editorial illustratoren', 'Character designers', 'Comic artists'], en: ["Children's book illustrators", 'Editorial illustrators', 'Character designers', 'Comic artists'] },
  },
  muzikanten: {
    icon: Music, color: 'purple',
    title: { nl: 'Website voor Muzikanten', en: 'Website for Musicians' },
    subtitle: { nl: 'Boekingen beginnen bij een goede website', en: 'Bookings start with a good website' },
    description: { nl: 'Event planners en particulieren zoeken muzikanten online. Met een professionele website met audio/video fragmenten ben jij makkelijker te boeken.', en: 'Event planners and individuals search for musicians online. With a professional website with audio/video clips you are easier to book.' },
    benefits: { nl: ['Audio en video fragmenten', 'Genres en repertoire', 'Beschikbaarheidskalender', 'Pakketten en tarieven', 'Contactformulier', 'Referenties van events'], en: ['Audio and video clips', 'Genres and repertoire', 'Availability calendar', 'Packages and rates', 'Contact form', 'Event references'] },
    examples: { nl: ['Bruiloftmuzikanten', 'Bands', "DJ's", 'Strijkstellen', 'Zangers/zangeressen'], en: ['Wedding musicians', 'Bands', 'DJs', 'String quartets', 'Singers'] },
  },
  vertalers: {
    icon: Globe, color: 'blue',
    title: { nl: 'Website voor Vertalers', en: 'Website for Translators' },
    subtitle: { nl: 'Elke taal verdient een professional', en: 'Every language deserves a professional' },
    description: { nl: 'Bedrijven en uitgevers zoeken vertalers op taalcombinatie en specialisatie. Een heldere website met jouw taalparen trekt direct de juiste klanten aan.', en: 'Companies search for translators by language combination and specialization. A clear website with your language pairs attracts the right clients.' },
    benefits: { nl: ['Taalparen duidelijk vermeld', 'Vakgebieden en specialisaties', 'Certificaten vermeld', 'Tarieven per woord/uur', 'Contactformulier', 'Referenties'], en: ['Language pairs clearly listed', 'Fields and specializations', 'Certificates listed', 'Rates per word/hour', 'Contact form', 'References'] },
    examples: { nl: ['Juridisch vertalers', 'Medisch vertalers', 'Technisch vertalers', 'Literair vertalers'], en: ['Legal translators', 'Medical translators', 'Technical translators', 'Literary translators'] },
  },
  stylisten: {
    icon: Scissors, color: 'pink',
    title: { nl: 'Website voor Stylisten', en: 'Website for Stylists' },
    subtitle: { nl: 'Stijl begint bij een mooie website', en: 'Style starts with a beautiful website' },
    description: { nl: 'Of je nu persoonlijk stylist of fashionstylist bent — klanten willen jouw werk zien. Een visueel portfolio met voor-en-na resultaten spreekt boekdelen.', en: 'Whether you are a personal stylist or fashion stylist — clients want to see your work. A visual portfolio with before-and-after results speaks volumes.' },
    benefits: { nl: ['Portfolio met voor-en-na', 'Diensten en pakketten', 'Doelgroep vermeld', 'Tarieven transparant', 'Online afspraken', 'Social media koppeling'], en: ['Portfolio with before-and-after', 'Services and packages', 'Target group listed', 'Transparent pricing', 'Online appointments', 'Social media link'] },
    examples: { nl: ['Personal stylisten', 'Fashion stylisten', 'Visagisten', 'Kleuranalisten'], en: ['Personal stylists', 'Fashion stylists', 'Make-up artists', 'Color analysts'] },
  },
  consultants: {
    icon: Briefcase, color: 'gray',
    title: { nl: 'Website voor Consultants', en: 'Website for Consultants' },
    subtitle: { nl: 'Expertise die online gevonden wordt', en: 'Expertise found online' },
    description: { nl: 'Opdrachtgevers zoeken een consultant op expertise en ervaring. Een professionele website met je achtergrond en referenties haalt directe aanvragen op.', en: 'Clients search for a consultant by expertise and experience. A professional website with your background and references captures direct inquiries.' },
    benefits: { nl: ['Expertise en achtergrond', 'Werkwijze uitgelegd', 'Sectoren vermeld', 'Referenties en cases', 'Tarieven en beschikbaarheid', 'Contactformulier'], en: ['Expertise and background', 'Method explained', 'Sectors listed', 'References and cases', 'Rates and availability', 'Contact form'] },
    examples: { nl: ['Strategie consultants', 'HR consultants', 'Financieel consultants', 'Change managers'], en: ['Strategy consultants', 'HR consultants', 'Financial consultants', 'Change managers'] },
  },
  trainers: {
    icon: BookOpen, color: 'amber',
    title: { nl: 'Website voor Trainers & Sprekers', en: 'Website for Trainers & Speakers' },
    subtitle: { nl: 'Laat je expertise landen', en: 'Let your expertise land' },
    description: { nl: 'Bedrijven boeken trainers en sprekers op basis van onderwerp en reputatie. Een krachtige website met video-fragmenten en referenties maakt dat ze direct boeken.', en: 'Companies book trainers and speakers based on topic and reputation. A powerful website with video clips and references makes them book directly.' },
    benefits: { nl: ["Trainingen en thema's overzicht", 'Video van optreden', 'Referenties van opdrachtgevers', 'Beschikbaarheid en tarieven', 'Contactformulier', 'Downloads'], en: ['Training and theme overview', 'Video of performance', 'Client references', 'Availability and rates', 'Contact form', 'Downloads'] },
    examples: { nl: ['Teamtrainers', 'Keynote sprekers', 'Verkooptrainers', 'Leiderschapstrainers'], en: ['Team trainers', 'Keynote speakers', 'Sales trainers', 'Leadership trainers'] },
  },
  financieel_adviseurs: {
    icon: TrendingUp, color: 'emerald',
    title: { nl: 'Website voor Financieel Adviseurs', en: 'Website for Financial Advisors' },
    subtitle: { nl: 'Vertrouwen verdien je met uitstraling', en: 'Trust is earned with presence' },
    description: { nl: 'Als financieel adviseur draait alles om vertrouwen. Een strakke website toont je kennis en haalt nieuwe klanten over om contact op te nemen.', en: 'As a financial advisor, trust is everything. A clean website shows your knowledge and convinces new clients to get in touch.' },
    benefits: { nl: ['Diensten helder uitgelegd', 'Specialisaties vermeld', 'Klantreviews', 'Blogs als autoriteit', 'Gratis kennismaking aangeboden', 'Contactformulier'], en: ['Services clearly explained', 'Specializations listed', 'Client reviews', 'Blogs as authority', 'Free intro offered', 'Contact form'] },
    examples: { nl: ['Financieel planners', 'Hypotheekadviseurs', 'Pensioenadviseurs', 'Belastingadviseurs ZZP'], en: ['Financial planners', 'Mortgage advisors', 'Pension advisors', 'Tax advisors for freelancers'] },
  },
  recruiters: {
    icon: Users, color: 'blue',
    title: { nl: 'Website voor ZZP Recruiters', en: 'Website for Freelance Recruiters' },
    subtitle: { nl: 'Jij verbindt mensen — begin online', en: 'You connect people — start online' },
    description: { nl: 'ZZP recruiters werken voor opdrachtgevers en kandidaten. Een website die beide doelgroepen aanspreekt vergroot je bereik aanzienlijk.', en: 'Freelance recruiters work for clients and candidates. A website addressing both target groups increases your reach significantly.' },
    benefits: { nl: ['Sectoren en niches vermeld', 'Voor bedrijven en kandidaten', 'Vacatures plaatsen', 'Werkwijze uitgelegd', 'Referenties', 'Contactformulier'], en: ['Sectors and niches listed', 'For companies and candidates', 'Post vacancies', 'Method explained', 'References', 'Contact form'] },
    examples: { nl: ['IT recruiters', 'Zorg recruiters', 'Techniek recruiters', 'Interim recruiters'], en: ['IT recruiters', 'Healthcare recruiters', 'Technical recruiters', 'Interim recruiters'] },
  },
  marketing_specialisten: {
    icon: Megaphone, color: 'orange',
    title: { nl: 'Website voor Marketing Specialisten', en: 'Website for Marketing Specialists' },
    subtitle: { nl: 'Marketeers die zichzelf goed marketen', en: 'Marketers who market themselves well' },
    description: { nl: 'Als freelance marketeer is je eigen website direct bewijs van je kunnen. Toon concrete resultaten en cases die laten zien wat je hebt bereikt.', en: 'As a freelance marketer your own website is direct proof of your ability. Show concrete results and cases that show what you have achieved.' },
    benefits: { nl: ['Cases met resultaten', 'Specialisaties vermeld', 'Diensten en tarieven', 'Klantreviews', 'Blog of kennisbank', 'Contactformulier'], en: ['Cases with results', 'Specializations listed', 'Services and rates', 'Client reviews', 'Blog or knowledge base', 'Contact form'] },
    examples: { nl: ['SEO specialisten', 'Google Ads specialisten', 'Email marketeers', 'Performance marketeers'], en: ['SEO specialists', 'Google Ads specialists', 'Email marketers', 'Performance marketers'] },
  },
  stukadoors: {
    icon: Droplet, color: 'stone',
    title: { nl: 'Website voor Stukadoors', en: 'Website for Plasterers' },
    subtitle: { nl: 'Laat je vakmanschap spreken', en: 'Let your craftsmanship speak' },
    description: { nl: "Mensen zoeken een stukadoor via Google. Met projectfoto's, reviews en een contactformulier kiezen klanten eerder voor jou.", en: 'People search for a plasterer via Google. With project photos, reviews and a contact form, clients choose you more quickly.' },
    benefits: { nl: ["Projectfoto's", 'Specialisaties', 'Werkgebied', 'Offerte aanvragen', 'Klantreviews', 'Contactgegevens'], en: ['Project photos', 'Specializations', 'Service area', 'Request quote', 'Customer reviews', 'Contact details'] },
    examples: { nl: ['Stukadoors', 'Sierpleister specialisten', 'Gipsplaat verwerkers'], en: ['Plasterers', 'Decorative plaster specialists', 'Drywall processors'] },
  },
  dakdekkers: {
    icon: Wind, color: 'slate',
    title: { nl: 'Website voor Dakdekkers', en: 'Website for Roofers' },
    subtitle: { nl: 'Gevonden bij elke lekkage', en: 'Found for every leak' },
    description: { nl: 'Mensen zoeken een dakdekker wanneer het regent. Zorg dat jij als eerste verschijnt met een professionele website met directe contactmogelijkheden.', en: 'People search for a roofer when it rains. Make sure you appear first with a professional website with direct contact options.' },
    benefits: { nl: ['Diensten duidelijk vermeld', 'Werkgebied', 'Spoedreparaties uitgelicht', "Projectfoto's", 'Klantreviews', 'Direct bellen knop'], en: ['Services clearly listed', 'Service area', 'Emergency repairs highlighted', 'Project photos', 'Customer reviews', 'Direct call button'] },
    examples: { nl: ['Plat dak specialisten', 'Dakpannen vervangers', 'Dakgoten reparateurs'], en: ['Flat roof specialists', 'Roof tile replacers', 'Gutter repairers'] },
  },
  tuiniers: {
    icon: Leaf, color: 'green',
    title: { nl: 'Website voor Tuiniers', en: 'Website for Gardeners' },
    subtitle: { nl: 'Toon je groenste werk', en: 'Show your greenest work' },
    description: { nl: "Mensen dromen van een mooie tuin. Met voor-en-na foto's, duidelijke diensten en een contactformulier haal je die klanten binnen via Google.", en: 'People dream of a beautiful garden. With before-and-after photos, clear services and a contact form you attract those clients via Google.' },
    benefits: { nl: ["Voor-en-na foto's", 'Diensten overzicht', 'Werkgebied vermeld', 'Seizoensaanbiedingen', 'Offerte aanvragen', 'Klantreviews'], en: ['Before-and-after photos', 'Services overview', 'Service area listed', 'Seasonal offers', 'Request quote', 'Customer reviews'] },
    examples: { nl: ['Hovenier ZZP', 'Tuinonderhoud', 'Tuinontwerp', 'Gazononderhoud'], en: ['Freelance gardener', 'Garden maintenance', 'Garden design', 'Lawn care'] },
  },
  schoonmakers: {
    icon: Sparkles, color: 'cyan',
    title: { nl: 'Website voor Schoonmakers', en: 'Website for Cleaners' },
    subtitle: { nl: 'Vertrouwen binnenshuis begint online', en: 'Trust indoors starts online' },
    description: { nl: 'Particulieren en bedrijven zoeken betrouwbare schoonmakers. Een professionele website met tarieven en reviews geeft het vertrouwen dat nodig is om te boeken.', en: 'Individuals and companies search for reliable cleaners. A professional website with rates and reviews gives the trust needed to book.' },
    benefits: { nl: ['Diensten duidelijk vermeld', 'Tarieven per dienst', 'Werkgebied', 'Klantreviews', 'Online offerte aanvragen', 'Professionele uitstraling'], en: ['Services clearly listed', 'Rates per service', 'Service area', 'Customer reviews', 'Online quote request', 'Professional appearance'] },
    examples: { nl: ['Particulier schoonmakers', 'Kantoor schoonmakers', 'Raam wassers', 'Na-bouw schoonmakers'], en: ['Residential cleaners', 'Office cleaners', 'Window cleaners', 'Post-construction cleaners'] },
  },
  chauffeurs: {
    icon: Truck, color: 'blue',
    title: { nl: 'Website voor ZZP Chauffeurs', en: 'Website for Freelance Drivers' },
    subtitle: { nl: 'Klanten vinden je op de weg', en: 'Clients find you on the road' },
    description: { nl: "Of je nu taxichauffeur, bezorger of transport ZZP'er bent — een professionele website laat zien wat je doet en hoe klanten snel kunnen boeken.", en: "Whether you are a taxi driver, delivery driver or transport freelancer — a professional website shows what you do and how clients can quickly book." },
    benefits: { nl: ['Diensten en voertuigen vermeld', 'Werkgebied', 'Tarieven en zones', 'Online boeken', 'Reviews', 'Direct bellen knop'], en: ['Services and vehicles listed', 'Service area', 'Rates and zones', 'Online booking', 'Reviews', 'Direct call button'] },
    examples: { nl: ['Taxichauffeurs', 'Trouwkoetsen', 'Koeriers', 'Leerlingenvervoer'], en: ['Taxi drivers', 'Wedding cars', 'Couriers', 'Student transport'] },
  },
};
