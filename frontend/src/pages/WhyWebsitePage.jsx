import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowRight, Search, Clock, TrendingUp, Shield, Zap, Globe, Users, CheckCircle, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_272a012d-c2c7-4b19-9d48-7e5cf3696f19/artifacts/8x6unwe5_IMG_1958.png";

const WhyWebsitePage = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      heroTag: "De waarheid",
      heroTitle: "Waarom een website",
      heroTitleHighlight: "geen luxe meer is",
      heroSubtitle: "95% van de consumenten zoekt online voordat ze kopen. Zonder website mis je klanten.",
      
      stats: [
        { value: "95%", label: "zoekt online" },
        { value: "24/7", label: "bereikbaar" },
        { value: "€500", label: "vanaf" }
      ],
      
      section1Title: "Klanten zoeken online",
      section1Text: "Wanneer iemand vandaag een bedrijf zoekt, gebeurt dat bijna altijd online. Of het nu gaat om een kapper, restaurant, aannemer of coach — de eerste stap is bijna altijd een zoekopdracht op Google.",
      section1Warning: "Geen website? Dan gaat je potentiële klant naar een concurrent die wél zichtbaar is.",
      
      benefitsTitle: "Een website werkt 24/7 voor je",
      benefits: [
        { icon: <Globe size={24} />, title: "Altijd zichtbaar", text: "Je website werkt ook als jij slaapt, op vakantie bent of druk aan het werk bent." },
        { icon: <Users size={24} />, title: "Vertrouwen wekken", text: "Een professionele website laat zien dat je serieus bent over je bedrijf." },
        { icon: <TrendingUp size={24} />, title: "Meer klanten", text: "Klanten nemen contact op voordat ze überhaupt met een concurrent praten." }
      ],
      
      mythTitle: "\"Een website is toch duur?\"",
      mythText: "Veel ondernemers denken dat een website automatisch duizenden euro's moet kosten. En eerlijk gezegd is dat bij traditionele bureaus vaak ook zo.",
      
      comparisonTitle: "Het verschil",
      traditional: {
        title: "Traditionele bureaus",
        price: "€3.000 - €8.000+",
        extra: "+ maandelijkse kosten",
        points: [
          { text: "Weken tot maanden wachten", negative: true },
          { text: "Betalen voor overhead", negative: true },
          { text: "Meerdere contactpersonen", negative: true },
          { text: "Vaak overkill voor MKB", negative: true }
        ]
      },
      yrvante: {
        title: "Yrvante",
        price: "Vanaf €500",
        extra: "Geen verplichte abonnementen",
        points: [
          { text: "Klaar binnen 1-2 weken", negative: false },
          { text: "Direct contact met mij", negative: false },
          { text: "Eerlijke, transparante prijzen", negative: false },
          { text: "Precies wat je nodig hebt", negative: false }
        ]
      },
      
      solutionTitle: "Professionele websites, zonder onnodig hoge prijzen",
      solutionText: "Bij Yrvante geloof ik dat een professionele website voor iedere ondernemer bereikbaar moet zijn. Daarom beginnen mijn websites al vanaf €500.",
      solutionText2: "Je krijgt een moderne, snelle website die er professioneel uitziet en perfect werkt op mobiel, tablet en desktop.",
      
      featuresTitle: "Wat krijg je bij Yrvante?",
      features: [
        { icon: <Zap size={28} />, title: "Moderne website", text: "Snel, professioneel en perfect op elk apparaat." },
        { icon: <Shield size={28} />, title: "Volledige eigendom", text: "Je houdt altijd zelf toegang en eigendom van je website." },
        { icon: <Clock size={28} />, title: "Snelle oplevering", text: "Basis website binnen 1 week, Pro/Premium binnen 1-2 weken." }
      ],
      
      goalTitle: "Het belangrijkste:",
      goalHighlight: "meer klanten vinden",
      goalText: "Een goede website is niet alleen een mooie pagina op internet. Het is een plek waar nieuwe klanten jouw bedrijf leren kennen en besluiten om contact op te nemen.",
      goalTagline: "En dat begint met zichtbaar zijn.",
      
      ctaTitle: "Benieuwd wat een website voor jouw bedrijf kan betekenen?",
      ctaText: "Neem gerust contact met mij op. Ik denk graag met je mee — vrijblijvend en zonder verplichtingen.",
      ctaButton: "Neem contact op",
      ctaCalculator: "Bereken je prijs",
      
      packages: [
        { name: "Basis", price: "€500", desc: "Startende ondernemers" },
        { name: "Pro", price: "€900", desc: "Groeiende bedrijven" },
        { name: "Premium", price: "€1400", desc: "Complete oplossing" }
      ]
    },
    en: {
      heroTag: "The truth",
      heroTitle: "Why a website",
      heroTitleHighlight: "is no longer a luxury",
      heroSubtitle: "95% of consumers search online before buying. Without a website you miss customers.",
      
      stats: [
        { value: "95%", label: "search online" },
        { value: "24/7", label: "accessible" },
        { value: "€500", label: "starting from" }
      ],
      
      section1Title: "Customers search online",
      section1Text: "When someone searches for a business today, it almost always happens online. Whether it's a hairdresser, restaurant, contractor, or coach — the first step is almost always a Google search.",
      section1Warning: "No website? Then your potential customer goes to a competitor who is visible online.",
      
      benefitsTitle: "A website works 24/7 for you",
      benefits: [
        { icon: <Globe size={24} />, title: "Always visible", text: "Your website works while you sleep, are on vacation, or are busy working." },
        { icon: <Users size={24} />, title: "Build trust", text: "A professional website shows that you're serious about your business." },
        { icon: <TrendingUp size={24} />, title: "More customers", text: "Customers contact you before they even talk to a competitor." }
      ],
      
      mythTitle: "\"Isn't a website expensive?\"",
      mythText: "Many entrepreneurs think a website automatically costs thousands of euros. And honestly, at traditional agencies that's often true.",
      
      comparisonTitle: "The difference",
      traditional: {
        title: "Traditional agencies",
        price: "€3,000 - €8,000+",
        extra: "+ monthly costs",
        points: [
          { text: "Wait weeks to months", negative: true },
          { text: "Pay for overhead", negative: true },
          { text: "Multiple contact persons", negative: true },
          { text: "Often overkill for SMBs", negative: true }
        ]
      },
      yrvante: {
        title: "Yrvante",
        price: "From €500",
        extra: "No mandatory subscriptions",
        points: [
          { text: "Ready within 1-2 weeks", negative: false },
          { text: "Direct contact with me", negative: false },
          { text: "Fair, transparent prices", negative: false },
          { text: "Exactly what you need", negative: false }
        ]
      },
      
      solutionTitle: "Professional websites, without unnecessarily high prices",
      solutionText: "At Yrvante I believe a professional website should be accessible to every entrepreneur. That's why my websites start from just €500.",
      solutionText2: "You get a modern, fast website that looks professional and works perfectly on mobile, tablet, and desktop.",
      
      featuresTitle: "What do you get at Yrvante?",
      features: [
        { icon: <Zap size={28} />, title: "Modern website", text: "Fast, professional and perfect on any device." },
        { icon: <Shield size={28} />, title: "Full ownership", text: "You always keep access and ownership of your website." },
        { icon: <Clock size={28} />, title: "Fast delivery", text: "Basic website within 1 week, Pro/Premium within 1-2 weeks." }
      ],
      
      goalTitle: "The most important thing:",
      goalHighlight: "finding more customers",
      goalText: "A good website is not just a nice page on the internet. It's a place where new customers get to know your business and decide to get in touch.",
      goalTagline: "And that starts with being visible.",
      
      ctaTitle: "Curious what a website can mean for your business?",
      ctaText: "Feel free to contact me. I'd love to think along with you — no obligations.",
      ctaButton: "Contact me",
      ctaCalculator: "Calculate your price",
      
      packages: [
        { name: "Basic", price: "€500", desc: "Starting entrepreneurs" },
        { name: "Pro", price: "€900", desc: "Growing businesses" },
        { name: "Premium", price: "€1400", desc: "Complete solution" }
      ]
    }
  };

  const t = content[language] || content.nl;

  return (
    <div className="min-h-screen bg-white">
      <SEO page="/waarom-website" />
      {/* Navigation - matching homepage style */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                to="/pakketten" 
                className="hidden md:inline-flex text-sm text-gray-600 hover:text-black transition-colors"
              >
                {language === 'nl' ? 'Pakketten' : 'Packages'}
              </Link>
              <Link 
                to="/calculator" 
                className="px-5 py-2.5 bg-gray-500 text-white text-sm font-medium rounded-full hover:bg-gray-600 transition-all"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Get Quote'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium style */}
      <section className="pt-20">
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 mb-8">
                {t.heroTag}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
                {t.heroTitle}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                  {t.heroTitleHighlight}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                {t.heroSubtitle}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-8 md:gap-16">
                {t.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-3xl md:text-4xl font-heading font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1 - The Problem */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-8">
                <Search size={28} className="text-gray-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                {t.section1Title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t.section1Text}
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
                <p className="text-red-800 font-medium">
                  {t.section1Warning}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl opacity-50 blur-2xl"></div>
              <div className="relative bg-gray-700 text-white p-10 rounded-3xl">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  {t.benefitsTitle}
                </h3>
                <div className="space-y-6">
                  {t.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm">{benefit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Myth & Comparison */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t.mythTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.mythText}
            </p>
          </motion.div>

          <h3 className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
            {t.comparisonTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200"
            >
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{t.traditional.title}</p>
              <p className="text-4xl font-heading font-bold text-red-600 mb-2">{t.traditional.price}</p>
              <p className="text-gray-500 mb-8">{t.traditional.extra}</p>
              <ul className="space-y-4">
                {t.traditional.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <X size={18} className="text-red-500 flex-shrink-0" />
                    {point.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Yrvante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-700 text-white p-8 md:p-10 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
                <span className="text-xs text-green-400 font-medium">Aanbevolen</span>
              </div>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{t.yrvante.title}</p>
              <p className="text-4xl font-heading font-bold text-green-400 mb-2">{t.yrvante.price}</p>
              <p className="text-gray-400 mb-8">{t.yrvante.extra}</p>
              <ul className="space-y-4">
                {t.yrvante.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                    {point.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 - Solution */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              {t.solutionTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {t.solutionText}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.solutionText2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Features */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-16"
          >
            {t.featuresTitle}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-3xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Goal */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {t.goalTitle}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  {t.goalHighlight}
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t.goalText}
              </p>
              <p className="text-2xl font-heading font-bold">
                {t.goalTagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <p className="text-6xl md:text-8xl font-heading font-bold text-gray-100 leading-tight">
                {language === 'nl' ? 'Zichtbaar' : 'Being'}<br />
                {language === 'nl' ? 'zijn.' : 'visible.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-8 rounded-3xl text-center transition-all ${
                index === 1
                  ? 'bg-gray-600 text-white scale-105 shadow-2xl' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className={`text-sm uppercase tracking-wider mb-2 ${index === 1 ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pkg.name}
                </p>
                <p className="text-4xl font-heading font-bold mb-2">{pkg.price}</p>
                <p className={`text-sm ${index === 1 ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pkg.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-gray-500 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-600 transition-all"
              >
                {t.ctaButton}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-3 border-2 border-gray-400 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-all"
              >
                {t.ctaCalculator}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-gray-100 text-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src={LOGO_URL} alt="Yrvante" className="h-10 w-auto" />
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a href="mailto:info@yrvante.com" className="hover:text-gray-700 transition-colors flex items-center gap-2">
                <Mail size={16} />
                info@yrvante.com
              </a>
              <span>Nederland</span>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Yrvante</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhyWebsitePage;
