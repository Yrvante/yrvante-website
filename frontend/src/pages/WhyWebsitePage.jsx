import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, CheckCircle, ArrowRight, Search, Clock, TrendingUp, Shield, Zap, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";

const WhyWebsitePage = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      back: "Terug",
      heroTitle: "Waarom een website tegenwoordig",
      heroTitleHighlight: "geen luxe meer is",
      heroSubtitle: "95% van de consumenten zoekt online voordat ze kopen",
      
      // Section 1 - The problem
      section1Title: "Klanten zoeken online",
      section1Text: "Wanneer iemand vandaag een bedrijf zoekt, gebeurt dat bijna altijd online. Of het nu gaat om een kapper, restaurant, aannemer of coach — de eerste stap is bijna altijd een zoekopdracht op Google. Als jouw bedrijf daar geen professionele website heeft, is de kans groot dat een potentiële klant simpelweg naar een concurrent gaat die wél online zichtbaar is.",
      section1Warning: "Geen website? Dan gaat je potentiële klant naar een concurrent die wél zichtbaar is.",
      
      // Section 2 - The value
      section2Title: "Een website werkt 24/7 voor je",
      section2Text: "Veel ondernemers realiseren zich alleen niet hoe groot dat verschil kan zijn. Een website werkt namelijk 24 uur per dag voor je: hij laat zien wat je doet, wekt vertrouwen bij nieuwe klanten en zorgt ervoor dat mensen contact opnemen voordat ze überhaupt met een concurrent praten.",
      section2Benefits: [
        "Laat zien wat je doet",
        "Wekt vertrouwen bij klanten",
        "Klanten nemen contact op voordat ze naar een concurrent gaan"
      ],
      
      // Section 3 - The cost myth
      section3Title: "\"Een website is toch duur?\"",
      section3Text: "Toch denken veel ondernemers dat een website automatisch duizenden euro's moet kosten. En eerlijk gezegd is dat vaak ook zo. Veel webdesignbureaus rekenen €1.500 tot €5.000 of meer voor een website, met daarbovenop maandelijkse kosten voor onderhoud en hosting.",
      section3Highlight: "Dat is precies waar wij het anders willen doen.",
      traditional: "Traditionele bureaus",
      traditionalPrice: "€1.500 - €5.000+",
      traditionalExtra: "+ maandelijkse kosten",
      traditionalPoints: ["Lange doorlooptijd", "Hoge opstartkosten", "Vaak overkill voor MKB"],
      
      // Section 4 - Our solution
      section4Title: "Professionele websites, zonder onnodig hoge prijzen",
      section4Text: "Bij Yrvante geloven wij dat een professionele website voor iedere ondernemer bereikbaar moet zijn. Daarom beginnen onze websites al vanaf €350. Je krijgt een moderne, snelle website die er professioneel uitziet en perfect werkt op mobiel, tablet en desktop.",
      section4Text2: "Daarnaast helpen wij je ook met het online houden van je website. Voor slechts €15 per maand regelen wij de hosting en zorgen we dat je website veilig, snel en altijd bereikbaar blijft.",
      ourApproach: "Onze aanpak",
      ourPrice: "Vanaf €350",
      ourExtra: "Geen verplichte abonnementen",
      ourPoints: ["Snel opgeleverd", "Professioneel resultaat", "Betaalbaar voor iedereen"],
      
      // Section 5 - What you get
      section5Title: "Wat krijg je bij Yrvante?",
      card1Title: "Moderne website",
      card1Text: "Snel, professioneel en perfect op mobiel, tablet en desktop.",
      card2Title: "Volledige toegang",
      card2Text: "Je houdt altijd zelf toegang. Wil je later zelf een tekst aanpassen of een foto veranderen? Dan kan dat gewoon. Liever dat wij het voor je regelen? Dat kan ook — veel klanten kiezen voor een klein onderhoudsabonnement zodat wij updates en aanpassingen voor hen doen.",
      card3Title: "Onderhoud optioneel",
      card3Text: "€15/mnd als je wilt dat wij updates regelen. Dit is niet verplicht — zonder abonnement ben je zelf verantwoordelijk voor onderhoud na oplevering.",
      
      // Section 6 - The goal
      section6Title: "Het belangrijkste:",
      section6Highlight: "meer klanten vinden",
      section6Text: "Een goede website is uiteindelijk niet alleen een mooie pagina op internet. Het is een plek waar nieuwe klanten jouw bedrijf leren kennen, vertrouwen krijgen in je diensten en besluiten om contact op te nemen.",
      section6Tagline: "En dat begint met zichtbaar zijn.",
      
      // CTA
      ctaTitle: "Benieuwd wat een website voor jouw bedrijf kan betekenen?",
      ctaText: "Neem gerust contact met ons op. Wij denken graag met je mee en laten zien hoe jouw bedrijf professioneel online kan staan — zonder dat je daar duizenden euro's voor hoeft te betalen.",
      ctaButton: "Neem contact op",
      
      // Calculator link
      calculatorText: "Wil je weten wat een website precies kost?",
      calculatorButton: "Bekijk onze calculator",
      
      // Pricing cards
      basicWebsite: "Basis website",
      advancedWebsite: "Geavanceerd",
      maintenance: "Onderhoud",
      optional: "optioneel",
      exclVat: "excl. BTW"
    },
    en: {
      back: "Back",
      heroTitle: "Why a website nowadays",
      heroTitleHighlight: "is no longer a luxury",
      heroSubtitle: "95% of consumers search online before buying",
      
      section1Title: "Customers search online",
      section1Text: "When someone searches for a business today, it almost always happens online. Whether it's a hairdresser, restaurant, contractor, or coach — the first step is almost always a Google search. If your business doesn't have a professional website there, chances are a potential customer will simply go to a competitor who is visible online.",
      section1Warning: "No website? Then your potential customer goes to a competitor who is visible online.",
      
      section2Title: "A website works 24/7 for you",
      section2Text: "Many entrepreneurs don't realize how big that difference can be. A website works 24 hours a day for you: it shows what you do, builds trust with new customers, and ensures people contact you before they even talk to a competitor.",
      section2Benefits: [
        "Shows what you do",
        "Builds trust with customers",
        "Customers contact you before going to a competitor"
      ],
      
      section3Title: "\"Isn't a website expensive?\"",
      section3Text: "Yet many entrepreneurs think a website automatically costs thousands of euros. And honestly, that's often true. Many web design agencies charge €1,500 to €5,000 or more for a website, plus monthly costs for maintenance and hosting.",
      section3Highlight: "That's exactly where we want to do things differently.",
      traditional: "Traditional agencies",
      traditionalPrice: "€1,500 - €5,000+",
      traditionalExtra: "+ monthly costs",
      traditionalPoints: ["Long lead time", "High startup costs", "Often overkill for SMBs"],
      
      section4Title: "Professional websites, without unnecessarily high prices",
      section4Text: "At Yrvante, we believe a professional website should be accessible to every entrepreneur. That's why our websites start from just €350. You get a modern, fast website that looks professional and works perfectly on mobile, tablet, and desktop.",
      section4Text2: "We also help you keep your website online. For just €15 per month, we handle the hosting and ensure your website stays secure, fast, and always accessible.",
      ourApproach: "Our approach",
      ourPrice: "From €350",
      ourExtra: "No mandatory subscriptions",
      ourPoints: ["Fast delivery", "Professional result", "Affordable for everyone"],
      
      section5Title: "What do you get at Yrvante?",
      card1Title: "Modern website",
      card1Text: "Fast, professional, and perfect on mobile, tablet, and desktop.",
      card2Title: "Full access",
      card2Text: "You always keep access yourself. Want to change a text or photo later? You can do that. Prefer us to handle it? That's also possible — many customers choose a small maintenance subscription so we handle updates and changes for them.",
      card3Title: "Maintenance optional",
      card3Text: "€15/month if you want us to handle updates. This is not mandatory — without subscription you are responsible for maintenance after delivery.",
      
      section6Title: "The most important thing:",
      section6Highlight: "finding more customers",
      section6Text: "A good website is ultimately not just a nice page on the internet. It's a place where new customers get to know your business, gain trust in your services, and decide to get in touch.",
      section6Tagline: "And that starts with being visible.",
      
      ctaTitle: "Curious what a website can mean for your business?",
      ctaText: "Feel free to contact us. We'd love to think along with you and show you how your business can be professionally online — without having to pay thousands of euros.",
      ctaButton: "Contact us",
      
      calculatorText: "Want to know exactly what a website costs?",
      calculatorButton: "Check our calculator",
      
      basicWebsite: "Basic website",
      advancedWebsite: "Advanced",
      maintenance: "Maintenance",
      optional: "optional",
      exclVat: "excl. VAT"
    }
  };

  const t = content[language] || content.nl;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <Link to="/" className="font-heading text-xl font-bold">Yrvante</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-8 px-6 md:px-12 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-16 md:py-24"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">
              {language === 'nl' ? 'De waarheid over online zichtbaarheid' : 'The truth about online visibility'}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-thin leading-tight mb-8">
              {t.heroTitle}<br />
              <span className="text-gray-500">{t.heroTitleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <motion.div 
              className="py-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl md:text-4xl font-heading font-thin">95%</p>
              <p className="text-xs text-gray-500 mt-1">{language === 'nl' ? 'zoekt online' : 'search online'}</p>
            </motion.div>
            <motion.div 
              className="py-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl md:text-4xl font-heading font-thin">24/7</p>
              <p className="text-xs text-gray-500 mt-1">{language === 'nl' ? 'online bereikbaar' : 'online accessible'}</p>
            </motion.div>
            <motion.div 
              className="py-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-heading font-thin">€350</p>
              <p className="text-xs text-gray-500 mt-1">{language === 'nl' ? 'al vanaf' : 'starting from'}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1 - The Problem */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Search className="text-gray-300 mb-6" size={48} strokeWidth={1} />
              <h2 className="text-3xl md:text-4xl font-heading font-thin mb-6">
                {t.section1Title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t.section1Text}
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-medium">
                  {t.section1Warning}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 text-white p-8 md:p-12"
            >
              <Clock className="text-gray-500 mb-6" size={32} strokeWidth={1} />
              <h3 className="text-2xl font-heading font-thin leading-relaxed mb-4">
                {t.section2Title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t.section2Text}
              </p>
              <ul className="space-y-4">
                {t.section2Benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 - The Cost Myth */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-thin mb-4">
              {t.section3Title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t.section3Text}
            </p>
            <p className="text-xl font-heading">
              {t.section3Highlight}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional agencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-gray-200"
            >
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">{t.traditional}</p>
              <p className="text-4xl font-heading mb-2">{t.traditionalPrice}</p>
              <p className="text-gray-500 mb-6">{t.traditionalExtra}</p>
              <ul className="space-y-3 text-gray-600">
                {t.traditionalPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    {point}
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
              className="bg-black text-white p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-mono uppercase">
                Yrvante
              </div>
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">{t.ourApproach}</p>
              <p className="text-4xl font-heading mb-2">{t.ourPrice}</p>
              <p className="text-gray-400 mb-6">{t.ourExtra}</p>
              <ul className="space-y-3 text-gray-300">
                {t.ourPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4 - Our Solution Text */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-thin mb-8">
              {t.section4Title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t.section4Text}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.section4Text2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - What you get */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-thin">
              {t.section5Title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 border border-gray-200 h-full transition-all hover:border-black">
                <Zap className="text-gray-400 mb-6 group-hover:text-black transition-colors" size={32} strokeWidth={1} />
                <h3 className="font-heading text-xl mb-3">{t.card1Title}</h3>
                <p className="text-gray-600">
                  {t.card1Text}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="bg-white p-8 border border-gray-200 h-full transition-all hover:border-black">
                <Eye className="text-gray-400 mb-6 group-hover:text-black transition-colors" size={32} strokeWidth={1} />
                <h3 className="font-heading text-xl mb-3">{t.card2Title}</h3>
                <p className="text-gray-600">
                  {t.card2Text}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-white p-8 border border-gray-200 h-full transition-all hover:border-black">
                <Shield className="text-gray-400 mb-6 group-hover:text-black transition-colors" size={32} strokeWidth={1} />
                <h3 className="font-heading text-xl mb-3">{t.card3Title}</h3>
                <p className="text-gray-600">
                  {t.card3Text}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6 - The goal */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <TrendingUp className="text-gray-600 mb-6" size={48} strokeWidth={1} />
              <h2 className="text-3xl md:text-4xl font-heading font-thin mb-6">
                {t.section6Title}<br />
                <span className="text-white">{t.section6Highlight}</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {t.section6Text}
              </p>
              <p className="text-white text-xl font-heading">
                {t.section6Tagline}
              </p>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-6xl md:text-8xl font-heading font-thin text-gray-700">
                {language === 'nl' ? 'Zichtbaar' : 'Being'}<br />{language === 'nl' ? 'zijn.' : 'visible.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-thin mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-3 bg-white text-black border-2 border-black px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                {t.calculatorButton}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-8 border border-gray-200 text-center hover:border-black transition-colors"
              whileHover={{ y: -4 }}
            >
              <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">{t.basicWebsite}</p>
              <p className="text-4xl font-heading">€350</p>
              <p className="text-sm text-gray-500 mt-1">{t.exclVat}</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 border border-gray-200 text-center hover:border-black transition-colors"
              whileHover={{ y: -4 }}
            >
              <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">{t.advancedWebsite}</p>
              <p className="text-4xl font-heading">€450</p>
              <p className="text-sm text-gray-500 mt-1">{t.exclVat}</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 border border-gray-200 text-center hover:border-black transition-colors"
              whileHover={{ y: -4 }}
            >
              <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">{t.maintenance}</p>
              <p className="text-4xl font-heading">€15<span className="text-xl">/mnd</span></p>
              <p className="text-sm text-gray-500 mt-1">{t.optional}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-heading text-lg">Yrvante</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default WhyWebsitePage;
