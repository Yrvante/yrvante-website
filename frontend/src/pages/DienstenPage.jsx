import React from "react";
import { motion } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { services, niches } from "../data/dienstenData";
import {
  Monitor,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Code,
  Shield,
  Search,
  Clock,
  Layers,
} from "lucide-react";

const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";
const BG_IMAGE = "https://static.prod-images.emergentagent.com/jobs/44213466-a228-4a52-8cfe-b2e9737ed3f4/images/bd9ccb92eb46d5ed1a97a900c245c5b7666be86f56e6b6623a1e1da2f4bf67d5.png";

// Data imported from ../data/dienstenData.js

const DienstenPage = () => {
  const { language } = useLanguage();
  const { type, niche } = useParams();

  const isServicePage = type && services[type];
  const isNichePage = niche && niches[niche];

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  // Special Webdesign Page (comprehensive, like OnderhoudPage)
  if (type === 'webdesign') {
    const webdesignFeatures = [
      {
        icon: Monitor,
        title: language === 'nl' ? 'Responsive Design' : 'Responsive Design',
        description: language === 'nl'
          ? 'Perfect op elk scherm: mobiel, tablet en desktop. Geen compromissen.'
          : 'Perfect on every screen: mobile, tablet and desktop. No compromises.',
      },
      {
        icon: Zap,
        title: language === 'nl' ? 'Snelle Laadtijden' : 'Fast Loading Times',
        description: language === 'nl'
          ? 'Geoptimaliseerd voor snelheid. Bezoekers blijven — Google waardeert je hoger.'
          : 'Optimized for speed. Visitors stay — Google ranks you higher.',
      },
      {
        icon: Search,
        title: language === 'nl' ? 'SEO-Vriendelijk' : 'SEO-Friendly',
        description: language === 'nl'
          ? 'Elke website heeft een solide technische basis zodat Google je goed kan indexeren.'
          : 'Every website has a solid technical foundation so Google can index you well.',
      },
      {
        icon: Shield,
        title: language === 'nl' ? 'Veilig & Betrouwbaar' : 'Safe & Reliable',
        description: language === 'nl'
          ? 'SSL-certificaat, veilige hosting en een website die altijd online is.'
          : 'SSL certificate, secure hosting and a website that is always online.',
      },
      {
        icon: Globe,
        title: language === 'nl' ? 'Mobielvriendelijk' : 'Mobile-Friendly',
        description: language === 'nl'
          ? 'Meer dan 60% van de bezoekers komt via mobiel. Jouw website is er klaar voor.'
          : 'More than 60% of visitors come via mobile. Your website is ready for it.',
      },
      {
        icon: Code,
        title: language === 'nl' ? 'Schone Code' : 'Clean Code',
        description: language === 'nl'
          ? 'Geen bloated plugins of page builders. Pure, geoptimaliseerde code die razendsnel laadt.'
          : 'No bloated plugins or page builders. Pure, optimized code that loads lightning fast.',
      },
    ];

    const processSteps = [
      {
        step: '01',
        title: language === 'nl' ? 'Intake gesprek' : 'Intake conversation',
        description: language === 'nl'
          ? 'We bespreken jouw bedrijf, doelen en wensen. Ik stel vragen, jij geeft antwoorden. Samen bepalen we de richting.'
          : "We discuss your business, goals and wishes. I ask questions, you give answers. Together we determine the direction.",
      },
      {
        step: '02',
        title: language === 'nl' ? 'Ontwerp & Structuur' : 'Design & Structure',
        description: language === 'nl'
          ? 'Ik ontwerp de lay-out van je website. Je krijgt een preview te zien voordat ik ga bouwen.'
          : 'I design the layout of your website. You get to see a preview before I start building.',
      },
      {
        step: '03',
        title: language === 'nl' ? 'Bouwen' : 'Building',
        description: language === 'nl'
          ? 'Ik bouw je website — snel, schoon en met aandacht voor elk detail. Jij levert de content aan.'
          : "I build your website — fast, clean and with attention to every detail. You supply the content.",
      },
      {
        step: '04',
        title: language === 'nl' ? 'Feedback & Aanpassingen' : 'Feedback & Revisions',
        description: language === 'nl'
          ? 'Je krijgt de testversie te zien. Wijzigingen? Ik pas het aan. Je hebt 6 revisierondes.'
          : 'You get to see the test version. Changes? I adjust it. You have 6 revision rounds.',
      },
      {
        step: '05',
        title: language === 'nl' ? 'Live zetten' : 'Going live',
        description: language === 'nl'
          ? 'Na jouw goedkeuring gaat je website online. Binnen 1-2 weken ben je live.'
          : 'After your approval, your website goes live. Within 1-2 weeks you are live.',
      },
    ];

    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <SEO page="/diensten/webdesign" />

        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-neutral-700/50">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
              </Link>
              <Link
                to="/diensten"
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                ← {language === 'nl' ? 'Alle Diensten' : 'All Services'}
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-16 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="absolute inset-0 bg-white/65" />
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
                  {language === 'nl' ? 'Webdesign' : 'Web Design'}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-gray-900 dark:text-gray-100">
                  {language === 'nl'
                    ? 'Webdesign die werkt — niet alleen mooi is'
                    : 'Web design that works — not just looks good'}
                </h1>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {language === 'nl'
                    ? 'Een website is je 24/7 verkoper. Ik ontwerp websites die jouw bedrijf professioneel neerzetten, bezoekers omzetten in klanten en je helpen gevonden te worden op Google.'
                    : "A website is your 24/7 salesperson. I design websites that position your business professionally, convert visitors into customers and help you get found on Google."}
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-gray-900 dark:text-gray-100">€500</span>
                  <span className="text-gray-500">/ {language === 'nl' ? 'vanaf' : 'from'}</span>
                  <span className="text-xs text-gray-400 ml-2">{language === 'nl' ? 'excl. BTW' : 'excl. VAT'}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={scrollToContact}
                    className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
                  >
                    {language === 'nl' ? 'Start Project' : 'Start Project'}
                  </button>
                  <Link
                    to="/pakketten"
                    className="px-8 py-4 border border-gray-300 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {language === 'nl' ? 'Bekijk Pakketten' : 'View Packages'}
                  </Link>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
                <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50 shadow-xl">
                  <div className="space-y-4">
                    {webdesignFeatures.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <feature.icon size={20} className="text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{feature.title}</p>
                          <p className="text-gray-500 text-xs">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* All Features */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
                {language === 'nl' ? 'Wat je krijgt' : 'What you get'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 dark:text-white">
                {language === 'nl' ? 'Alles wat je nodig hebt' : 'Everything you need'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === 'nl'
                  ? 'Elke website die ik bouw is volledig op maat — geen templates, geen compromissen.'
                  : "Every website I build is completely custom — no templates, no compromises."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webdesignFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-neutral-800/60 rounded-3xl p-6"
                >
                  <div className="w-12 h-12 bg-gray-200 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="text-gray-600 dark:text-gray-400" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
                {language === 'nl' ? 'Hoe het werkt' : 'How it works'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight dark:text-white">
                {language === 'nl' ? 'Van intake tot live' : 'From intake to live'}
              </h2>
            </div>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-neutral-700 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-700 dark:text-white text-xs font-bold">{step.step}</span>
                  </div>
                  <div className="flex-1 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-neutral-700/50">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Good Design Matters */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
                  {language === 'nl' ? 'De Realiteit' : 'The Reality'}
                </p>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6 dark:text-white">
                  {language === 'nl'
                    ? 'Je hebt 3 seconden om een eerste indruk te maken'
                    : 'You have 3 seconds to make a first impression'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {language === 'nl'
                    ? 'Bezoekers beslissen binnen 3 seconden of ze blijven of weggaan. Een amateuristisch design, trage laadtijden of een verwarrende navigatie en ze zijn weg — naar je concurrent.'
                    : "Visitors decide within 3 seconds whether they stay or leave. An amateurish design, slow loading times or confusing navigation and they're gone — to your competitor."}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {language === 'nl'
                    ? 'Ik zorg voor een website die bezoekers vasthoudt, vertrouwen opbouwt en ze aanzet tot actie — contact opnemen, een afspraak maken of direct bellen.'
                    : "I ensure a website that keeps visitors engaged, builds trust and prompts them to take action — get in touch, make an appointment or call directly."}
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { stat: '3s', label: language === 'nl' ? 'om een eerste indruk te maken' : 'to make a first impression' },
                  { stat: '75%', label: language === 'nl' ? 'beoordeelt geloofwaardigheid op design' : 'judge credibility based on design' },
                  { stat: '60%+', label: language === 'nl' ? 'bezoekt eerst via mobiel' : 'visits via mobile first' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-6">
                    <span className="text-4xl font-black text-gray-900 dark:text-gray-100 w-20 flex-shrink-0">{item.stat}</span>
                    <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Plans Note */}
        <section className="py-16 bg-gray-100 dark:bg-neutral-900">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Layers size={24} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 dark:text-white">
                    {language === 'nl' ? 'Meer diensten in ontwikkeling' : 'More services in development'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                    {language === 'nl'
                      ? 'Naast webdesign werk ik momenteel aan uitgebreidere diensten: van landingspagina\'s en webapplicaties tot e-commerce oplossingen.'
                      : "Besides web design, I am currently working on more extensive services: from landing pages and web applications to e-commerce solutions."}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {language === 'nl'
                      ? 'Heb je een specifieke wens? Neem contact op — ik denk graag met je mee over de beste oplossing voor jouw situatie.'
                      : "Do you have a specific request? Get in touch — I am happy to think along with you about the best solution for your situation."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6 dark:text-white">
              {language === 'nl' ? 'Klaar voor een website die werkt?' : 'Ready for a website that works?'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {language === 'nl'
                ? 'Vanaf €500 excl. BTW. Opgeleverd in 1-2 weken.'
                : 'From €500 excl. VAT. Delivered in 1-2 weeks.'}
            </p>
            <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-3xl p-8 mb-8 max-w-md mx-auto shadow-sm dark:shadow-neutral-900">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-black text-gray-800 dark:text-gray-200">€500</span>
                <span className="text-gray-500">/ {language === 'nl' ? 'vanaf' : 'from'}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
                {(language === 'nl' ? [
                  'Responsive design',
                  'SEO-vriendelijke opbouw',
                  'Snelle laadtijden',
                  'Contactformulier',
                  '6 revisierondes',
                ] : [
                  'Responsive design',
                  'SEO-friendly structure',
                  'Fast loading times',
                  'Contact form',
                  '6 revision rounds',
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
              >
                {language === 'nl' ? 'Start Project' : 'Start Project'}
              </button>
              <Link
                to="/calculator"
                className="px-8 py-4 border border-gray-300 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Service Detail Page
  if (isServicePage) {
    const service = services[type];
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <SEO page={`/diensten/${type}`} />
        
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-neutral-700/50">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
              </Link>
              <Link 
                to="/diensten" 
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                ← {language === 'nl' ? 'Alle Diensten' : 'All Services'}
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-16 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="absolute inset-0 bg-white/80 dark:bg-neutral-950/95" />
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <service.icon size={32} className="text-gray-700 dark:text-gray-300" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 dark:text-white">
                {service.title[language]}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {service.subtitle[language]}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {service.description[language]}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-center mb-10 dark:text-white">
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
                  className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-4"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {language === 'nl' ? `${service.title[language]} nodig?` : `Need ${service.title[language]}?`}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {language === 'nl' ? `Vanaf ${service.price} excl. BTW` : `From ${service.price} excl. VAT`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
              >
                {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
              </button>
              <Link
                to="/calculator"
                className="px-6 py-3 border border-gray-400 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-7000 hover:text-white hover:border-gray-500 transition-colors"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
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
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <SEO page={`/voor/${niche}`} />
        
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-neutral-700/50">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
              </Link>
              <Link 
                to="/diensten" 
                className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                ← {language === 'nl' ? 'Alle Websites' : 'All Websites'}
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-16 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="absolute inset-0 bg-white/80 dark:bg-neutral-950/95" />
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <nicheData.icon size={32} className="text-gray-700 dark:text-gray-300" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 dark:text-white">
                {nicheData.title[language]}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {nicheData.subtitle[language]}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {nicheData.description[language]}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-center mb-10 dark:text-white">
              {language === 'nl' ? 'Wat een website je oplevert' : 'What a website delivers'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nicheData.benefits[language].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-4 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {language === 'nl' ? 'Perfect voor' : 'Perfect for'}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {nicheData.examples[language].map((example, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-neutral-700/50"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {language === 'nl' ? 'Klaar voor jouw website?' : 'Ready for your website?'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {language === 'nl' ? 'Vanaf €500 excl. BTW' : 'From €500 excl. VAT'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
              >
                {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
              </button>
              <Link
                to="/calculator"
                className="px-6 py-3 border border-gray-400 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-50 dark:hover:bg-neutral-7000 hover:text-white hover:border-gray-500 transition-colors"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Calculate Price'}
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
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
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO page="/diensten" />
      
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-700">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
            <Link 
              to="/" 
              className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ← {language === 'nl' ? 'Terug' : 'Back'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero with Background */}
      <section className="pt-20 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 lg:pb-20 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/70 dark:bg-neutral-950/95" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
              {language === 'nl' ? 'Diensten' : 'Services'}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 dark:text-white">
              {language === 'nl' ? 'Wat ik voor je kan doen' : 'What I can do for you'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {language === 'nl'
                ? 'Van webdesign tot complete website oplossingen — alles wat je nodig hebt om online te groeien.'
                : 'From web design to complete website solutions — everything you need to grow online.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Without Branding */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">
            {language === 'nl' ? 'Diensten' : 'Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(services).map(([key, service], index) => (
              <div key={key}>
                <Link
                  to={`/diensten/${key}`}
                  className="block bg-gray-50 dark:bg-neutral-800/60 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <div className="w-14 h-14 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm dark:shadow-neutral-900">
                    <service.icon size={28} className="text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2 dark:text-white">{service.title[language]}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.subtitle[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {language === 'nl' ? 'Vanaf' : 'From'} {service.price}
                    </span>
                    <ArrowRight size={20} className="text-gray-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches Grid - Organized in 3 columns */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b border-gray-200 dark:border-neutral-700">
                {language === 'nl' ? 'Beauty & Wellness' : 'Beauty & Wellness'}
              </h3>
              <div className="space-y-2">
                {['kappers', 'nagelstylisten', 'interieurstylisten', 'schoonheidsspecialisten', 'masseurs'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl hover:shadow-md transition-all border border-gray-100/50 dark:border-neutral-700/50 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 dark:bg-neutral-800/60 rounded-lg flex items-center justify-center group-hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm dark:text-white">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b border-gray-200 dark:border-neutral-700">
                {language === 'nl' ? 'Zakelijke Diensten' : 'Business Services'}
              </h3>
              <div className="space-y-2">
                {['coaches', 'zzp', 'fotografen', 'makelaars', 'fysiotherapeuten', 'accountants'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl hover:shadow-md transition-all border border-gray-100/50 dark:border-neutral-700/50 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 dark:bg-neutral-800/60 rounded-lg flex items-center justify-center group-hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm dark:text-white">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b border-gray-200 dark:border-neutral-700">
                {language === 'nl' ? 'Ambacht & Horeca' : 'Craft & Hospitality'}
              </h3>
              <div className="space-y-2">
                {['loodgieters', 'restaurants', 'bloemisten', 'garages', 'electriciens', 'schilders'].map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-3 p-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl hover:shadow-md transition-all border border-gray-100/50 dark:border-neutral-700/50 group"
                    >
                      <div className="w-10 h-10 bg-gray-50 dark:bg-neutral-800/60 rounded-lg flex items-center justify-center group-hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                        <nicheData.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm dark:text-white">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</h4>
                        <p className="text-gray-400 text-xs truncate">{nicheData.subtitle[language]}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Meer Branches */}
          {[
            { label: { nl: 'Meer Branches', en: 'More Industries' }, keys: ['personaltrainers', 'tandartsen', 'hondentrimmers', 'timmerlieden', 'dierenartsen', 'klusbedrijven'] },
            { label: { nl: 'IT & Digitaal', en: 'IT & Digital' }, keys: ['developers', 'grafisch_designers', 'ux_designers', 'social_media_managers', 'data_analisten', 'it_consultants', 'videografen'] },
            { label: { nl: 'Zorg & Welzijn', en: 'Health & Wellbeing' }, keys: ['verpleegkundigen', 'psychologen', 'diëtisten', 'logopedisten', 'thuiszorg'] },
            { label: { nl: 'Creatief & Communicatie', en: 'Creative & Communication' }, keys: ['tekstschrijvers', 'illustratoren', 'muzikanten', 'vertalers', 'stylisten'] },
            { label: { nl: 'Consultancy & Training', en: 'Consultancy & Training' }, keys: ['consultants', 'trainers', 'financieel_adviseurs', 'recruiters', 'marketing_specialisten'] },
            { label: { nl: 'Vakmanschap', en: 'Craftsmanship' }, keys: ['stukadoors', 'dakdekkers', 'tuiniers', 'schoonmakers', 'chauffeurs'] },
          ].map((group) => (
            <div key={group.label.nl} className="mt-8 pt-8 border-t border-gray-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-4 text-center">
                {group.label[language]}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {group.keys.map((key) => {
                  const nicheData = niches[key];
                  if (!nicheData) return null;
                  return (
                    <Link
                      key={key}
                      to={`/voor/${key}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-full hover:shadow-md transition-all border border-gray-200/50 dark:border-neutral-700/50 group"
                    >
                      <nicheData.icon size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{nicheData.title[language].replace('Website voor ', '').replace('Website for ', '')}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'nl' ? 'Jouw branche niet gevonden?' : "Didn't find your industry?"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {language === 'nl'
              ? 'Geen probleem! Ik maak websites voor elke branche. Neem contact op en we bespreken jouw wensen.'
              : "No problem! I create websites for any industry. Get in touch and we'll discuss your needs."}
          </p>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
          >
            {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
          </button>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
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
