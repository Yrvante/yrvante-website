import React from "react";
import { motion } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { MacBookMockup, IPhoneMockup, MiniWebsite } from "../components/DeviceMockups";
import {
  Heart,
  Target,
  ArrowRight,
  Zap,
  Shield,
  Mail,
  Wrench,
  Code,
  Rocket,
} from "lucide-react";

const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";
const BG_IMAGE = "/bg-pattern.jpg";

const OverMijPage = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const values = [
    {
      icon: Heart,
      title: language === 'nl' ? 'Persoonlijk' : 'Personal',
      description: language === 'nl' 
        ? 'Rechtstreeks contact, geen tussenpersonen.'
        : 'Direct contact, no intermediaries.',
    },
    {
      icon: Target,
      title: language === 'nl' ? 'Resultaatgericht' : 'Result-focused',
      description: language === 'nl'
        ? 'Websites die klanten opleveren.'
        : 'Websites that bring customers.',
    },
    {
      icon: Shield,
      title: language === 'nl' ? 'Betrouwbaar' : 'Reliable',
      description: language === 'nl'
        ? 'Deadlines gehaald, budgetten gerespecteerd.'
        : 'Deadlines met, budgets respected.',
    },
    {
      icon: Zap,
      title: language === 'nl' ? 'Snel' : 'Fast',
      description: language === 'nl'
        ? 'Korte lijntjes, snelle beslissingen.'
        : 'Short lines, quick decisions.',
    },
  ];

  const timeline = [
    {
      icon: Wrench,
      tag: language === 'nl' ? 'Achtergrond' : 'Background',
      title: language === 'nl' ? 'High-Precision Manufacturing' : 'High-Precision Manufacturing',
      description: language === 'nl'
        ? 'Mijn carrière begon in de high-precision manufacturing industrie. Daar leerde ik dat de kleinste details het grootste verschil maken.'
        : 'My career started in the high-precision manufacturing industry. There I learned that the smallest details make the biggest difference.',
    },
    {
      icon: Code,
      tag: language === 'nl' ? 'Passie' : 'Passion',
      title: language === 'nl' ? 'Web Development' : 'Web Development',
      description: language === 'nl'
        ? 'Mijn passie voor technologie vertaalde zich naar webdevelopment. Ik zag hoe veel kleine bedrijven geen goede online aanwezigheid hadden.'
        : 'My passion for technology translated into web development. I saw how many small businesses lacked a good online presence.',
    },
    {
      icon: Rocket,
      tag: 'Yrvante',
      title: language === 'nl' ? 'De Start' : 'The Start',
      description: language === 'nl'
        ? 'Yrvante ontstond uit de wens om ZZP\'ers en kleine bedrijven te helpen met betaalbare, professionele websites.'
        : 'Yrvante was born from the desire to help freelancers and small businesses with affordable, professional websites.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="over-mij-page">
      <SEO page="/over-mij" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-700">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" />
              <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
            <Link 
              to="/" 
              className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {language === 'nl' ? 'Terug' : 'Back'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile First */}
      <section className="pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/75 dark:bg-neutral-950/95" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
            {/* Visual - Hidden on small mobile, compact on larger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-40 h-40 sm:w-56 sm:h-56 lg:w-auto lg:h-auto lg:flex-shrink-0"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_b98c0d0c-fb8e-40fb-9730-82d2b9d337c9/artifacts/3j9k5too_yrvante%20%28%3C%3A%3E%29%20logo%20style%202.webp" 
                alt="Yrvante Web Development" 
                className="w-full h-full object-contain lg:max-w-[500px]"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center lg:text-left w-full"
            >
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
                {language === 'nl' ? 'Over Mij' : 'About Me'}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 leading-[1.1] dark:text-white">
                {language === 'nl' ? (
                  <>Geen bureau.<br/>Geen tussenlagen.<br/><span className="text-gray-400">Geen bullshit.</span></>
                ) : (
                  <>No agency.<br/>No middlemen.<br/><span className="text-gray-400">No bullshit.</span></>
                )}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-6 max-w-md mx-auto lg:mx-0">
                {language === 'nl'
                  ? 'Ik ben Yvar, de oprichter van Yrvante. Bij mij werk je rechtstreeks met de persoon die jouw website bouwt.'
                  : "I'm Yvar, the founder of Yrvante. With me you work directly with the person who builds your website."}
              </p>

              {/* Stats - Compact for mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-8 p-3 sm:p-5 bg-white/80 dark:bg-neutral-900/80 rounded-2xl border border-gray-100 dark:border-neutral-800 max-w-sm mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">1</p>
                  <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{language === 'nl' ? 'contact' : 'contact'}</p>
                </div>
                <div className="text-center border-x border-gray-200 dark:border-neutral-700">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">0</p>
                  <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{language === 'nl' ? 'verrassingen' : 'surprises'}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">&infin;</p>
                  <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{language === 'nl' ? 'directe lijn' : 'direct line'}</p>
                </div>
              </div>

              {/* CTA Buttons - Full width on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm mx-auto lg:mx-0">
                <button
                  onClick={scrollToContact}
                  data-testid="contact-cta"
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
                  <ArrowRight size={14} />
                </button>
                <a
                  href="mailto:info@yrvante.com"
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-3 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Mail size={14} />
                  info@yrvante.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - 2x2 grid on mobile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
              {language === 'nl' ? 'Mijn Aanpak' : 'My Approach'}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight dark:text-white">
              {language === 'nl' ? 'Waar ik voor sta' : 'What I stand for'}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/40 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:bg-white/60 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-neutral-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <value.icon className="text-gray-600 dark:text-gray-400" size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Story Section - Stacked on mobile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
              {language === 'nl' ? 'Mijn Verhaal' : 'My Story'}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight dark:text-white">
              {language === 'nl' ? 'Van precisie naar pixels' : 'From precision to pixels'}
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-neutral-700/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-white dark:text-gray-900" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-neutral-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
            <div className="lg:flex-1">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
                {language === 'nl' ? 'Eerlijk Gezegd' : 'Honestly'}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 sm:mb-6 dark:text-white">
                {language === 'nl' 
                  ? 'Waarom ik goedkoper ben' 
                  : 'Why I am more affordable'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {language === 'nl'
                  ? 'Bij een bureau betaal je voor overhead, kantoorruimte en vergaderingen. Bij mij betaal je alleen voor wat ertoe doet: een goed gebouwde website.'
                  : 'At an agency you pay for overhead, office space and meetings. With me, you only pay for what matters: a well-built website.'}
              </p>
            </div>

            <div className="w-full lg:flex-1 space-y-3 sm:space-y-4">
              {/* Device mockup showing website quality */}
              <MacBookMockup url="jouwbedrijf.nl" className="mb-4 hidden lg:block">
                <MiniWebsite variant="default" />
              </MacBookMockup>
              <div className="bg-gray-200 dark:bg-neutral-700 rounded-2xl p-4 sm:p-6 border border-gray-300 dark:border-neutral-600">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{language === 'nl' ? 'Gemiddeld bureau' : 'Average agency'}</span>
                  <span className="text-red-500 text-xl sm:text-2xl font-black line-through">€3.000+</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {language === 'nl' ? 'Manager + designer + developer + overhead' : 'Manager + designer + developer + overhead'}
                </p>
              </div>

              <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 ring-2 ring-green-500">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Yrvante</span>
                  <span className="text-green-600 text-xl sm:text-2xl font-black">{language === 'nl' ? 'Vanaf' : 'From'} €349</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {language === 'nl' ? 'Rechtstreeks met de maker — 100% waarde' : 'Directly with the maker — 100% value'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 sm:mb-6 dark:text-white">
            {language === 'nl' 
              ? 'Klaar om samen te werken?' 
              : 'Ready to work together?'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
            {language === 'nl'
              ? 'Laten we in gesprek gaan over jouw project. Geen verplichtingen, gewoon een eerlijk advies.'
              : "Let's talk about your project. No obligations, just honest advice."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 active:scale-[0.98] transition-all"
            >
              {language === 'nl' ? 'Start een Project' : 'Start a Project'}
            </button>
            <Link
              to="/calculator"
              className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
            >
              {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <img src={LOGO_URL} alt="Yrvante" className="h-7 sm:h-8 w-auto dark:hidden" />
            <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-7 sm:h-8 w-auto hidden dark:block" />
            <p className="text-[10px] sm:text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OverMijPage;
