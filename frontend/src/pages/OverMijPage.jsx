import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  User,
  Code,
  Heart,
  Target,
  Award,
  Clock,
  MessageCircle,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Shield,
  Mail,
  Phone,
} from "lucide-react";

const LOGO_URL = "/logo.png";
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
        ? 'Je werkt rechtstreeks met mij, geen tussenpersonen of account managers.'
        : 'You work directly with me, no intermediaries or account managers.',
    },
    {
      icon: Target,
      title: language === 'nl' ? 'Resultaatgericht' : 'Result-focused',
      description: language === 'nl'
        ? 'Ik bouw geen mooie websites om mooi te zijn. Ik bouw websites die klanten opleveren.'
        : "I don't build beautiful websites to be beautiful. I build websites that bring customers.",
    },
    {
      icon: Shield,
      title: language === 'nl' ? 'Betrouwbaar' : 'Reliable',
      description: language === 'nl'
        ? 'Wat ik beloof, doe ik. Deadlines worden gehaald, budgetten worden gerespecteerd.'
        : 'What I promise, I deliver. Deadlines are met, budgets are respected.',
    },
    {
      icon: Zap,
      title: language === 'nl' ? 'Snel' : 'Fast',
      description: language === 'nl'
        ? 'Geen eindeloze vergaderingen. Korte lijntjes, snelle beslissingen, snel resultaat.'
        : 'No endless meetings. Short lines, quick decisions, fast results.',
    },
  ];

  const timeline = [
    {
      year: language === 'nl' ? 'Achtergrond' : 'Background',
      title: language === 'nl' ? 'High-Precision Manufacturing' : 'High-Precision Manufacturing',
      description: language === 'nl'
        ? 'Mijn carrière begon in de high-precision manufacturing industrie. Daar leerde ik dat de kleinste details het grootste verschil maken.'
        : 'My career started in the high-precision manufacturing industry. There I learned that the smallest details make the biggest difference.',
    },
    {
      year: language === 'nl' ? 'Passie' : 'Passion',
      title: language === 'nl' ? 'Web Development' : 'Web Development',
      description: language === 'nl'
        ? 'Mijn passie voor technologie en oog voor detail vertaalde zich naar webdevelopment. Ik zag hoe veel kleine bedrijven geen goede online aanwezigheid hadden.'
        : 'My passion for technology and eye for detail translated into web development. I saw how many small businesses lacked a good online presence.',
    },
    {
      year: 'Yrvante',
      title: language === 'nl' ? 'De Start' : 'The Start',
      description: language === 'nl'
        ? 'Yrvante ontstond uit de wens om ZZP\'ers en kleine bedrijven te helpen met betaalbare, professionele websites. Geen overpriced bureaus meer.'
        : "Yrvante was born from the desire to help freelancers and small businesses with affordable, professional websites. No more overpriced agencies.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO page="/over-mij" />
      
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/70" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Photo/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="https://customer-assets.emergentagent.com/job_b98c0d0c-fb8e-40fb-9730-82d2b9d337c9/artifacts/3j9k5too_yrvante%20%28%3C%3A%3E%29%20logo%20style%202.webp" 
                  alt="Yrvante Web Development" 
                  className="w-full max-w-[500px] mx-auto drop-shadow-2xl"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {language === 'nl' ? 'Beschikbaar' : 'Available'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-bold">{language === 'nl' ? 'Voor projecten' : 'For projects'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
                {language === 'nl' ? 'Over Mij' : 'About Me'}
              </p>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
                {language === 'nl' ? (
                  <>Geen bureau.<br/>Geen tussenlagen.<br/><span className="text-gray-400">Geen bullshit.</span></>
                ) : (
                  <>No agency.<br/>No middlemen.<br/><span className="text-gray-400">No bullshit.</span></>
                )}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                {language === 'nl'
                  ? 'Ik ben Yvar, de oprichter van Yrvante. Bij mij werk je rechtstreeks met de persoon die jouw website bouwt — geen account managers, geen vergaderingen, geen verrassingen.'
                  : "I'm Yvar, the founder of Yrvante. With me you work directly with the person who builds your website — no account managers, no meetings, no surprises."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-white/80 rounded-2xl border border-gray-100">
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-900">1</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{language === 'nl' ? 'aanspreekpunt' : 'point of contact'}</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-3xl font-black text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{language === 'nl' ? 'verrassingen' : 'surprises'}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-900">∞</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{language === 'nl' ? 'directe lijn' : 'direct line'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
                  <ArrowRight size={14} />
                </button>
                <a
                  href="mailto:info@yrvante.com"
                  className="px-6 py-3 border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  info@yrvante.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
              {language === 'nl' ? 'Mijn Aanpak' : 'My Approach'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              {language === 'nl' ? 'Waar ik voor sta' : 'What I stand for'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                  <value.icon className="text-gray-600" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
              {language === 'nl' ? 'Mijn Verhaal' : 'My Story'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              {language === 'nl' ? 'Van precisie naar pixels' : 'From precision to pixels'}
            </h2>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Big Agencies Section */}
      <section className="py-20 bg-gray-100 text-gray-800">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
                {language === 'nl' ? 'Eerlijk Gezegd' : 'Honestly'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6">
                {language === 'nl' 
                  ? 'Waarom ik goedkoper ben dan bureaus' 
                  : 'Why I am cheaper than agencies'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {language === 'nl'
                  ? 'Bij een groot bureau betaal je voor overhead, kantoorruimte, account managers, projectmanagers en vergaderingen over vergaderingen. Al die kosten worden doorberekend in jouw factuur.'
                  : 'At a big agency you pay for overhead, office space, account managers, project managers and meetings about meetings. All those costs are passed on in your invoice.'}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {language === 'nl'
                  ? 'Bij mij betaal je alleen voor wat er toe doet: een goed gebouwde website die resultaat oplevert. Geen overhead, geen tussenlagen, geen verrassingen.'
                  : 'With me, you only pay for what matters: a well-built website that delivers results. No overhead, no middle layers, no surprises.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-200 rounded-2xl p-6 border border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">{language === 'nl' ? 'Gemiddeld bureau' : 'Average agency'}</span>
                  <span className="text-red-500 text-2xl font-black line-through">€3.000 - €8.000</span>
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'nl' 
                    ? 'Account manager + projectmanager + designer + developer + overhead'
                    : 'Account manager + project manager + designer + developer + overhead'}
                </div>
              </div>

              <div className="bg-white text-black rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Yrvante</span>
                  <span className="text-green-600 text-2xl font-black">{language === 'nl' ? 'Vanaf' : 'From'} €500</span>
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'nl'
                    ? 'Rechtstreeks met de maker — jij krijgt 100% waarde'
                    : 'Directly with the maker — you get 100% value'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6">
            {language === 'nl' 
              ? 'Klaar om samen te werken?' 
              : 'Ready to work together?'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {language === 'nl'
              ? 'Laten we in gesprek gaan over jouw project. Geen verplichtingen, gewoon een eerlijk advies.'
              : "Let's talk about your project. No obligations, just honest advice."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
            >
              {language === 'nl' ? 'Start een Project' : 'Start a Project'}
            </button>
            <Link
              to="/calculator"
              className="px-8 py-4 border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 transition-colors"
            >
              {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OverMijPage;
