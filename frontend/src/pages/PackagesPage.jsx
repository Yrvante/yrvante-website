import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { ArrowLeft, ArrowRight, Check, Star, Zap, Shield, Clock, Users, Phone, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

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
        language === 'nl' ? 'Tot 3 pagina\'s (bijv. Home, Over ons, Contact)' : 'Up to 3 pages (e.g., Home, About, Contact)',
        language === 'nl' ? 'Werkt perfect op mobiel, tablet en desktop' : 'Works perfectly on mobile, tablet and desktop',
        language === 'nl' ? 'Snelle hosting via Vercel' : 'Fast hosting via Vercel',
        language === 'nl' ? 'Basis contactpagina' : 'Basic contact page',
        language === 'nl' ? '6 correctierondes' : '6 revision rounds',
      ],
      notIncluded: [
        language === 'nl' ? 'SEO optimalisatie' : 'SEO optimization',
        language === 'nl' ? 'Blog functionaliteit' : 'Blog functionality',
        language === 'nl' ? 'Contactformulier met email' : 'Contact form with email',
      ],
      color: 'gray',
      popular: false,
      idealFor: language === 'nl' ? 'ZZP\'ers, Startende ondernemers' : 'Freelancers, Starting entrepreneurs'
    },
    {
      id: 'pro',
      name: language === 'nl' ? 'Pro Website Pakket' : 'Pro Website Package',
      price: 900,
      description: language === 'nl'
        ? 'Onze meest gekozen optie voor groeiende bedrijven die meer functionaliteit nodig hebben.'
        : 'Our most chosen option for growing businesses that need more functionality.',
      includes: [
        language === 'nl' ? 'Alles uit Basis Website Pakket' : 'Everything from Basic Website Package',
        language === 'nl' ? 'Basis SEO-optimalisatie' : 'Basic SEO optimization',
        language === 'nl' ? 'Tot 10 pagina\'s' : 'Up to 10 pages',
        language === 'nl' ? 'Complexere layout / extra secties' : 'Complex layout / extra sections',
        language === 'nl' ? 'Blog pagina' : 'Blog page',
        language === 'nl' ? 'Portfolio pagina' : 'Portfolio page',
        language === 'nl' ? 'Contactformulier (berichten direct in uw email)' : 'Contact form (messages directly to your email)',
      ],
      notIncluded: [
        language === 'nl' ? 'Afspraaksysteem' : 'Booking system',
        language === 'nl' ? 'Google Reviews integratie' : 'Google Reviews integration',
        language === 'nl' ? 'Meertalige website' : 'Multi-language website',
      ],
      color: 'black',
      popular: true,
      idealFor: language === 'nl' ? 'Groeiende MKB\'s, Dienstverleners' : 'Growing SMBs, Service providers'
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
        language === 'nl' ? 'Afspraaksysteem' : 'Booking system',
        language === 'nl' ? 'Google Reviews integratie' : 'Google Reviews integration',
        language === 'nl' ? 'Meertalige optie op uw site' : 'Multi-language option on your site',
        language === 'nl' ? 'Priority support' : 'Priority support',
      ],
      notIncluded: [],
      color: 'gradient',
      popular: false,
      idealFor: language === 'nl' ? 'Gevestigde bedrijven, Professionals' : 'Established businesses, Professionals'
    }
  ];

  const extras = [
    {
      name: language === 'nl' ? 'Extra pagina' : 'Extra page',
      price: '€40',
      description: language === 'nl' 
        ? 'Voor extra content zoals diensten, blog artikelen, portfolio items of extra informatiepagina\'s.'
        : 'For extra content like services, blog posts, portfolio items or extra information pages.',
      icon: <Zap size={20} />
    },
    {
      name: language === 'nl' ? 'Meertalige website' : 'Multi-language website',
      price: '€100',
      description: language === 'nl'
        ? 'Website beschikbaar in meerdere talen met taalwisselaar.'
        : 'Website available in multiple languages with language switcher.',
      icon: <Users size={20} />
    },
    {
      name: language === 'nl' ? 'Extra contactformulier' : 'Extra contact form',
      price: '€80',
      description: language === 'nl'
        ? 'Extra formulier voor offerte aanvragen, afspraken verzoek via email of klantvragen.'
        : 'Extra form for quote requests, appointment requests via email or customer questions.',
      icon: <Mail size={20} />
    },
    {
      name: language === 'nl' ? 'Website onderhoud' : 'Website maintenance',
      price: '€20/mnd',
      description: language === 'nl'
        ? 'Inclusief hosting, updates, kleine wijzigingen en beveiliging.'
        : 'Including hosting, updates, small changes and security.',
      icon: <Shield size={20} />
    },
    {
      name: language === 'nl' ? 'Online boekingssysteem' : 'Online booking system',
      price: '€180',
      description: language === 'nl'
        ? 'Afspraken boeken via de website met automatische bevestiging en admin dashboard.'
        : 'Book appointments via the website with automatic confirmation and admin dashboard.',
      icon: <Calendar size={20} />
    },
    {
      name: 'Google Reviews',
      price: '€80',
      description: language === 'nl'
        ? 'Toon reviews direct op de website van Google Maps of social media.'
        : 'Show reviews directly on the website from Google Maps or social media.',
      icon: <Star size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                ? '* Prijzen zijn exclusief tekstschrijven en foto\'s. Content wordt door de klant aangeleverd. Inclusief 6 correctierondes per project.'
                : '* Prices exclude copywriting and photos. Content is provided by the client. Includes 6 revision rounds per project.'}
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

                <div className="mb-8">
                  <span className="text-5xl font-heading font-bold">€{pkg.price}</span>
                  <span className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}> excl. BTW</span>
                </div>

                <div className="mb-6">
                  <p className={`text-xs uppercase tracking-wider mb-2 ${pkg.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                    {language === 'nl' ? 'Ideaal voor' : 'Ideal for'}
                  </p>
                  <p className={`font-medium ${pkg.popular ? 'text-gray-200' : 'text-gray-700'}`}>
                    {pkg.idealFor}
                  </p>
                </div>

                <div className="space-y-1 mb-8">
                  <p className={`text-xs uppercase tracking-wider mb-3 ${pkg.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                    {language === 'nl' ? 'Inclusief' : 'Included'}
                  </p>
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-green-400' : 'text-green-500'}`} />
                      <span className={`text-sm ${pkg.popular ? 'text-gray-200' : 'text-gray-600'}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {pkg.notIncluded.length > 0 && (
                  <div className="mb-8">
                    <p className={`text-xs uppercase tracking-wider mb-3 ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                      {language === 'nl' ? 'Niet inclusief' : 'Not included'}
                    </p>
                    {pkg.notIncluded.map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 py-1 text-sm ${pkg.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                        <span className="w-4 h-0.5 bg-current" />
                        {item}
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

      {/* Extras */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              {language === 'nl' ? 'Extra Opties' : 'Extra Options'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Breid uw website uit met deze handige extra\'s.'
                : 'Expand your website with these useful extras.'}
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
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    {extra.icon}
                  </div>
                  <span className="text-xl font-bold">{extra.price}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{extra.name}</h3>
                <p className="text-sm text-gray-600">{extra.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking System Detail */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
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
                <div className="text-4xl font-heading font-bold mb-8">€180 <span className="text-lg font-normal text-gray-400">{language === 'nl' ? 'eenmalig' : 'one-time'}</span></div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase tracking-wider">
                    {language === 'nl' ? 'Voor bezoekers' : 'For visitors'}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      language === 'nl' ? 'Datum kiezen' : 'Choose date',
                      language === 'nl' ? 'Tijd kiezen' : 'Choose time',
                      language === 'nl' ? 'Naam + telefoonnummer/email invullen' : 'Fill in name + phone/email',
                      language === 'nl' ? 'Afspraak request versturen' : 'Send appointment request',
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
                    {language === 'nl' ? 'Voor de eigenaar (admin)' : 'For the owner (admin)'}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      language === 'nl' ? 'Speciale inloggegevens' : 'Special login credentials',
                      language === 'nl' ? 'Overzicht van afspraken' : 'Overview of appointments',
                      language === 'nl' ? 'Afspraken aanpassen/verwijderen/afwijzen/goedkeuren' : 'Edit/delete/reject/approve appointments',
                      language === 'nl' ? 'Meldingen via email' : 'Notifications via email',
                      language === 'nl' ? 'Kalender included' : 'Calendar included',
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
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to get started?'}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'nl'
                ? 'Bereken direct uw prijs of neem contact op voor een gratis adviesgesprek.'
                : 'Calculate your price directly or contact us for a free consultation.'}
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
                {language === 'nl' ? 'Neem contact op' : 'Contact us'}
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
