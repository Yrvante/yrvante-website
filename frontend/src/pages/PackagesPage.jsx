import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, ArrowRight, Check, Star, Zap, Shield, Calendar, Globe, Mail, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const PackagesPage = () => {
  const { language } = useLanguage();

  const packages = [
    {
      id: 'basic',
      name: language === 'nl' ? 'Basis Website Pakket' : 'Basic Website Package',
      price: 500,
      description: language === 'nl' 
        ? 'Perfect voor startende ondernemers die een professionele online aanwezigheid willen.'
        : 'Perfect for starting entrepreneurs who want a professional online presence.',
      includes: [
        language === 'nl' ? 'Moderne responsive website' : 'Modern responsive website',
        language === 'nl' ? 'Tot 3 pagina\'s (bijv. Home, Over mij, Contact)' : 'Up to 3 pages (e.g., Home, About, Contact)',
        language === 'nl' ? 'Werkt perfect op mobiel, tablet en desktop' : 'Works perfectly on mobile, tablet and desktop',
        language === 'nl' ? 'Snelle en veilige hosting' : 'Fast and secure hosting',
        language === 'nl' ? 'Basis contactpagina' : 'Basic contact page',
      ],
      notIncluded: [
        language === 'nl' ? 'SEO-optimalisatie (kan later toegevoegd worden)' : 'SEO optimization (can be added later)',
        language === 'nl' ? 'Contactformulier met email' : 'Contact form with email',
        language === 'nl' ? 'Blog of portfolio pagina' : 'Blog or portfolio page',
      ],
      idealFor: language === 'nl' ? 'ZZP\'ers, Startende ondernemers' : 'Freelancers, Starting entrepreneurs',
      deliveryTime: language === 'nl' ? '~ 1 week' : '~ 1 week',
      popular: false,
    },
    {
      id: 'pro',
      name: language === 'nl' ? 'Pro Website Pakket' : 'Pro Website Package',
      price: 900,
      description: language === 'nl'
        ? 'Mijn meest gekozen optie voor groeiende bedrijven die meer functionaliteit nodig hebben.'
        : 'My most chosen option for growing businesses that need more functionality.',
      includes: [
        language === 'nl' ? 'Alles uit Basis Website Pakket' : 'Everything from Basic Website Package',
        language === 'nl' ? 'Basis SEO-optimalisatie (zoekwoordenonderzoek + on-page SEO)' : 'Basic SEO optimization (keyword research + on-page SEO)',
        language === 'nl' ? 'Tot 10 pagina\'s' : 'Up to 10 pages',
        language === 'nl' ? 'Complexere layout / extra secties' : 'Complex layout / extra sections',
        language === 'nl' ? 'Blog pagina' : 'Blog page',
        language === 'nl' ? 'Portfolio pagina' : 'Portfolio page',
        language === 'nl' ? 'Contactformulier (berichten direct in je email)' : 'Contact form (messages directly to your email)',
      ],
      notIncluded: [
        language === 'nl' ? 'Boekingssysteem' : 'Booking system',
        language === 'nl' ? 'Meertalige website' : 'Multi-language website',
        language === 'nl' ? 'Google Reviews integratie' : 'Google Reviews integration',
      ],
      idealFor: language === 'nl' ? 'Groeiende MKB\'s, Dienstverleners' : 'Growing SMBs, Service providers',
      deliveryTime: language === 'nl' ? '1-2 weken' : '1-2 weeks',
      popular: true,
    },
    {
      id: 'premium',
      name: language === 'nl' ? 'Premium Website Pakket' : 'Premium Website Package',
      price: 1400,
      description: language === 'nl'
        ? 'Complete oplossing met alle mogelijkheden voor ambitieuze bedrijven.'
        : 'Complete solution with all possibilities for ambitious businesses.',
      includes: [
        language === 'nl' ? 'Alles uit Basis + Pro Website Pakket' : 'Everything from Basic + Pro Website Package',
        language === 'nl' ? 'Tot 15 pagina\'s' : 'Up to 15 pages',
        language === 'nl' ? 'Blog' : 'Blog',
        language === 'nl' ? 'Contactformulier' : 'Contact form',
        language === 'nl' ? 'Afspraaksysteem ingebouwd' : 'Booking system built-in',
        language === 'nl' ? 'Google Reviews integratie' : 'Google Reviews integration',
        language === 'nl' ? 'Meertalige optie op je site' : 'Multi-language option on your site',
        language === 'nl' ? 'Snellere reactietijd (binnen 12 uur)' : 'Faster response time (within 12 hours)',
      ],
      notIncluded: [],
      idealFor: language === 'nl' ? 'Gevestigde bedrijven, Professionals' : 'Established businesses, Professionals',
      deliveryTime: language === 'nl' ? '1-2 weken' : '1-2 weeks',
      popular: false,
    }
  ];

  // Losse prijzen voor extra's
  const loosePrices = [
    { name: language === 'nl' ? 'Extra pagina' : 'Extra page', price: '€50' },
    { name: language === 'nl' ? 'Meertalig' : 'Multi-language', price: '€200' },
    { name: language === 'nl' ? 'Extra formulier' : 'Extra form', price: '€80' },
    { name: language === 'nl' ? 'Onderhoud' : 'Maintenance', price: '€25/pm' },
    { name: language === 'nl' ? 'Boekingssysteem' : 'Booking system', price: '€250' },
    { name: 'Google Reviews', price: '€120' },
  ];

  // Extra possibilities - no prices, just what's possible
  const extras = [
    {
      icon: <Zap size={24} />,
      title: language === 'nl' ? 'Extra pagina\'s' : 'Extra pages',
      description: language === 'nl' 
        ? 'Diensten, blog artikelen, portfolio items, of extra informatiepagina\'s.'
        : 'Services, blog posts, portfolio items, or extra information pages.',
    },
    {
      icon: <Globe size={24} />,
      title: language === 'nl' ? 'Meertalige website' : 'Multi-language website',
      description: language === 'nl'
        ? 'Uw website in meerdere talen met een handige taalwisselaar.'
        : 'Your website in multiple languages with a convenient language switcher.',
    },
    {
      icon: <Mail size={24} />,
      title: language === 'nl' ? 'Extra contactformulieren' : 'Extra contact forms',
      description: language === 'nl'
        ? 'Offerte aanvragen, afspraken verzoeken, of specifieke klantvragen.'
        : 'Quote requests, appointment requests, or specific customer questions.',
    },
    {
      icon: <Shield size={24} />,
      title: language === 'nl' ? 'Website onderhoud' : 'Website maintenance',
      description: language === 'nl'
        ? 'Hosting, updates, kleine wijzigingen en beveiliging. Alles geregeld.'
        : 'Hosting, updates, small changes and security. Everything taken care of.',
    },
    {
      icon: <Calendar size={24} />,
      title: language === 'nl' ? 'Online boekingssysteem' : 'Online booking system',
      description: language === 'nl'
        ? 'Laat klanten direct online afspraken maken met automatische bevestigingen.'
        : 'Let customers book appointments directly online with automatic confirmations.',
    },
    {
      icon: <Star size={24} />,
      title: 'Google Reviews',
      description: language === 'nl'
        ? 'Toon uw beste reviews direct op uw website voor meer vertrouwen.'
        : 'Show your best reviews directly on your website for more trust.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO page="/pakketten" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              {language === 'nl' ? 'Terug' : 'Back'}
            </Link>
            <Link to="/" className="font-heading text-xl font-bold">Yrvante</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-20"
          >
            <p className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-4">
              {language === 'nl' ? 'Transparante prijzen' : 'Transparent pricing'}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              {language === 'nl' ? 'Website Pakketten' : 'Website Packages'}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {language === 'nl' 
                ? 'Kies het pakket dat bij uw bedrijf past. Alle prijzen zijn exclusief BTW.'
                : 'Choose the package that fits your business. All prices exclude VAT.'}
            </p>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              {language === 'nl'
                ? '* Prijzen zijn exclusief tekstschrijven en foto\'s. Content wordt door u aangeleverd.'
                : '* Prices exclude copywriting and photos. Content is provided by you.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-6 md:px-12 -mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  pkg.popular 
                    ? 'bg-black text-white scale-105 shadow-2xl z-10' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star size={16} className="fill-current" />
                    {language === 'nl' ? 'Meest Gekozen' : 'Most Popular'}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h2>
                  <p className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-heading font-bold">€{pkg.price}</span>
                  <span className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}> excl. BTW</span>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <Clock size={16} className={pkg.popular ? 'text-gray-400' : 'text-gray-400'} />
                  <span className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {language === 'nl' ? 'Levertijd:' : 'Delivery:'} {pkg.deliveryTime}
                  </span>
                </div>

                <div className="mb-4">
                  <p className={`text-xs uppercase tracking-wider mb-2 ${pkg.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                    {language === 'nl' ? 'Ideaal voor' : 'Ideal for'}
                  </p>
                  <p className={`font-medium ${pkg.popular ? 'text-gray-200' : 'text-gray-700'}`}>
                    {pkg.idealFor}
                  </p>
                </div>

                <div className="space-y-1 mb-4">
                  <p className={`text-xs uppercase tracking-wider mb-3 ${pkg.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                    {language === 'nl' ? 'Inclusief' : 'Included'}
                  </p>
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-1.5">
                      <Check size={16} className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-white' : 'text-black'}`} />
                      <span className={`text-sm ${pkg.popular ? 'text-gray-200' : 'text-gray-600'}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                  <div className="space-y-1 mb-6 pt-4 border-t border-dashed ${pkg.popular ? 'border-gray-700' : 'border-gray-200'}">
                    <p className={`text-xs uppercase tracking-wider mb-3 ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                      {language === 'nl' ? 'Niet inbegrepen (apart te kopen)' : 'Not included (available separately)'}
                    </p>
                    {pkg.notIncluded.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-1">
                        <span className={`text-sm ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>• {item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  to="/calculator"
                  className={`block w-full text-center py-4 rounded-full font-bold transition-all ${
                    pkg.popular
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {language === 'nl' ? 'Selecteer Pakket' : 'Select Package'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Losse Prijzen Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {language === 'nl' ? 'Losse Extra\'s Toevoegen' : 'Add Individual Extras'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Wil je iets extra\'s bij je pakket? Hier zijn de losse prijzen.'
                : 'Want to add something extra to your package? Here are the individual prices.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {loosePrices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-5 bg-white rounded-3xl border border-gray-200"
              >
                <p className="text-2xl font-bold mb-1">{item.price}</p>
                <p className="text-sm text-gray-500">{item.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-yellow-800">
              <span className="font-bold">💡 Tip:</span> {language === 'nl' 
                ? 'Combineer je 2 of meer extra\'s? Dan is een hoger pakket vaak voordeliger. Ik adviseer je graag vrijblijvend.'
                : 'Combining 2 or more extras? A higher package is often more advantageous. I\'d be happy to advise you without obligation.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extra possibilities - centered, no prices */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              {language === 'nl' ? 'Extra Mogelijkheden' : 'Extra Possibilities'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Breid uw website uit met deze handige opties. Vraag naar de mogelijkheden.'
                : 'Expand your website with these useful options. Ask about the possibilities.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extras.map((extra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-3xl border border-gray-200 text-center hover:border-black hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {extra.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{extra.title}</h3>
                <p className="text-sm text-gray-600">{extra.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 text-black font-medium hover:underline"
            >
              {language === 'nl' ? 'Bekijk alle prijzen in de calculator' : 'View all prices in the calculator'}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Booking System Detail */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black text-white rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {language === 'nl' ? 'Online Boekingssysteem' : 'Online Booking System'}
                </h2>
                <p className="text-gray-300 mb-8">
                  {language === 'nl'
                    ? 'Laat klanten direct online afspraken maken. Perfect voor kappers, coaches, therapeuten en andere dienstverleners.'
                    : 'Let customers book appointments directly online. Perfect for hairdressers, coaches, therapists and other service providers.'}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase tracking-wider">
                    {language === 'nl' ? 'Voor bezoekers' : 'For visitors'}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      language === 'nl' ? 'Datum en tijd kiezen' : 'Choose date and time',
                      language === 'nl' ? 'Contactgegevens invullen' : 'Fill in contact details',
                      language === 'nl' ? 'Afspraak aanvragen' : 'Request appointment',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={16} className="text-green-400" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase tracking-wider">
                    {language === 'nl' ? 'Voor u (admin)' : 'For you (admin)'}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      language === 'nl' ? 'Overzicht van alle afspraken' : 'Overview of all appointments',
                      language === 'nl' ? 'Goedkeuren of afwijzen' : 'Approve or reject',
                      language === 'nl' ? 'Email notificaties' : 'Email notifications',
                      language === 'nl' ? 'Kalender overzicht' : 'Calendar overview',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={16} className="text-green-400" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {language === 'nl' ? 'Vragen? Neem contact op' : 'Questions? Get in touch'}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'nl'
                ? 'Ik help je graag bij het kiezen van het juiste pakket. Bel of mail mij — vrijblijvend en zonder verplichtingen.'
                : 'I\'d be happy to help you choose the right package. Call or email me — no obligations.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
              >
                {language === 'nl' ? 'Bereken je prijs' : 'Calculate your price'}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-3 border-2 border-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all"
              >
                {language === 'nl' ? 'Neem contact op' : 'Contact me'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-heading text-lg font-bold">Yrvante</span>
          <span className="text-sm text-gray-400">Almelo, Nederland</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default PackagesPage;
