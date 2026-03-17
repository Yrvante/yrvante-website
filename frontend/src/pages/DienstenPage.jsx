import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Monitor,
  Palette,
  Code,
  Layers,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Target,
  Heart,
  Users,
  Briefcase,
  Dumbbell,
  Scissors,
  Camera,
  Home,
  Car,
  Coffee,
} from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a2868257-4a63-4a64-87b7-72ff6867dc17/artifacts/gwcgd4lw_Yrvante%20logo%20en%20naam%20en%20slogan%20.jpeg";

// Service data
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
  webflow: {
    icon: Layers,
    color: 'purple',
    title: { nl: 'Webflow Development', en: 'Webflow Development' },
    subtitle: { nl: 'No-code websites met professionele kwaliteit', en: 'No-code websites with professional quality' },
    description: {
      nl: 'Webflow combineert het beste van beide werelden: de flexibiliteit van custom code met de eenvoud van een visuele builder. Perfect voor bedrijven die later zelf kleine aanpassingen willen doen.',
      en: 'Webflow combines the best of both worlds: the flexibility of custom code with the simplicity of a visual builder. Perfect for businesses that want to make small adjustments themselves later.'
    },
    features: {
      nl: [
        'Visuele CMS voor content beheer',
        'Ingebouwde hosting',
        'Automatische backups',
        'Eenvoudig zelf teksten aanpassen',
        'Geavanceerde animaties',
        'E-commerce mogelijkheden',
      ],
      en: [
        'Visual CMS for content management',
        'Built-in hosting',
        'Automatic backups',
        'Easy to edit texts yourself',
        'Advanced animations',
        'E-commerce capabilities',
      ],
    },
    price: '€900',
  },
  branding: {
    icon: Palette,
    color: 'pink',
    title: { nl: 'Branding', en: 'Branding' },
    subtitle: { nl: 'Een merk dat blijft hangen', en: 'A brand that sticks' },
    description: {
      nl: 'Je merk is meer dan een logo. Het is hoe klanten je herinneren, wat ze over je vertellen en waarom ze terugkomen. Ik help je een consistente visuele identiteit te creëren.',
      en: "Your brand is more than a logo. It's how customers remember you, what they tell others about you and why they come back. I help you create a consistent visual identity."
    },
    features: {
      nl: [
        'Logo ontwerp',
        'Kleurenpalet',
        'Typografie selectie',
        'Huisstijl handboek',
        'Social media templates',
        'Visitekaartje ontwerp',
      ],
      en: [
        'Logo design',
        'Color palette',
        'Typography selection',
        'Brand style guide',
        'Social media templates',
        'Business card design',
      ],
    },
    price: '€300',
  },
};

// Niche data
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
      nl: ['Loodgieters', 'Elektriciens', 'Schilders', 'Kappers', 'Personal trainers', 'Fotografen'],
      en: ['Plumbers', 'Electricians', 'Painters', 'Hairdressers', 'Personal trainers', 'Photographers'],
    },
  },
};

const DienstenPage = () => {
  const { language } = useLanguage();
  const { type, niche } = useParams();

  // Determine what content to show
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
        
        {/* Navigation */}
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

        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <service.icon size={32} className={`text-${service.color}-600`} />
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

        {/* Features */}
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

        {/* CTA */}
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

        {/* Footer */}
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
        
        {/* Navigation */}
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

        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className={`w-16 h-16 bg-${nicheData.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <nicheData.icon size={32} className={`text-${nicheData.color}-600`} />
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

        {/* Benefits */}
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

        {/* Examples */}
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

        {/* CTA */}
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

        {/* Footer */}
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
      
      {/* Navigation */}
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

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
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
                ? 'Van webdesign tot branding — alles wat je nodig hebt om online te groeien.'
                : 'From web design to branding — everything you need to grow online.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold mb-8">
            {language === 'nl' ? 'Diensten' : 'Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="block bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-12 h-12 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon size={24} className={`text-${service.color}-600`} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{service.title[language]}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.subtitle[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {language === 'nl' ? 'Vanaf' : 'From'} {service.price}
                    </span>
                    <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold mb-8">
            {language === 'nl' ? 'Websites voor' : 'Websites for'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(niches).map(([key, nicheData], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/voor/${key}`}
                  className="block bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow border border-gray-200 group"
                >
                  <div className={`w-12 h-12 bg-${nicheData.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <nicheData.icon size={24} className={`text-${nicheData.color}-600`} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{nicheData.title[language]}</h3>
                  <p className="text-gray-600 text-sm mb-4">{nicheData.subtitle[language]}</p>
                  <div className="flex flex-wrap gap-1">
                    {nicheData.examples[language].slice(0, 3).map((example, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {example}
                      </span>
                    ))}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      +{nicheData.examples[language].length - 3}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'nl' ? 'Niet gevonden wat je zocht?' : "Didn't find what you were looking for?"}
          </h2>
          <p className="text-gray-400 mb-6">
            {language === 'nl'
              ? 'Neem contact op en we bespreken jouw specifieke wensen.'
              : "Get in touch and we'll discuss your specific needs."}
          </p>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-100 transition-colors"
          >
            {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
          </button>
        </div>
      </section>

      {/* Footer */}
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
