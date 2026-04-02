import React from "react";
import { motion } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { MacBookMockup, MiniWebsite } from "../components/DeviceMockups";
import {
  Shield,
  Zap,
  Clock,
  Server,
  Bug,
  RefreshCw,
  Lock,
  HeadphonesIcon,
  AlertTriangle,
  Check,
  X,
  ArrowRight,
  Code,
  Database,
  Globe,
  Terminal,
  Wrench,
  DollarSign,
} from "lucide-react";

const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";
const BG_IMAGE = "/bg-pattern.jpg";

const OnderhoudPage = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const maintenanceFeatures = [
    {
      icon: Server,
      title: language === 'nl' ? 'Hosting & Uptime' : 'Hosting & Uptime',
      description: language === 'nl'
        ? 'Snelle, betrouwbare hosting met 99.9% uptime. Jouw website is altijd online.'
        : 'Fast, reliable hosting with 99.9% uptime. Your website is always online.',
    },
    {
      icon: Shield,
      title: language === 'nl' ? 'Beveiliging' : 'Security',
      description: language === 'nl'
        ? 'SSL certificaat, beveiligingsupdates en bescherming tegen hackers.'
        : 'SSL certificate, security updates and protection against hackers.',
    },
    {
      icon: RefreshCw,
      title: language === 'nl' ? 'Backups' : 'Backups',
      description: language === 'nl'
        ? 'Dagelijkse automatische backups. Nooit meer data kwijt.'
        : 'Daily automatic backups. Never lose data again.',
    },
    {
      icon: Bug,
      title: language === 'nl' ? 'Bug Fixes' : 'Bug Fixes',
      description: language === 'nl'
        ? 'Iets werkt niet? Ik los het op — zonder extra kosten.'
        : "Something doesn't work? I fix it — at no extra cost.",
    },
    {
      icon: Wrench,
      title: language === 'nl' ? 'Kleine Aanpassingen' : 'Small Changes',
      description: language === 'nl'
        ? 'Tekst wijzigen, foto vervangen, openingstijden aanpassen — geregeld.'
        : 'Change text, replace photo, update opening hours — done.',
    },
    {
      icon: HeadphonesIcon,
      title: language === 'nl' ? 'Support' : 'Support',
      description: language === 'nl'
        ? 'Heb je vragen? Ik reageer binnen 24 uur (vaak sneller).'
        : 'Have questions? I respond within 24 hours (often faster).',
    },
  ];

  const techIssues = [
    {
      icon: Code,
      title: language === 'nl' ? 'Code Updates' : 'Code Updates',
      description: language === 'nl'
        ? 'Browsers updaten constant. Code die vandaag werkt, kan morgen kapot zijn. Ik houd alles up-to-date.'
        : "Browsers update constantly. Code that works today can break tomorrow. I keep everything up-to-date.",
    },
    {
      icon: Lock,
      title: language === 'nl' ? 'SSL Certificaten' : 'SSL Certificates',
      description: language === 'nl'
        ? 'Zonder SSL toont Chrome "Niet veilig" en vertrouwen bezoekers je niet. Ik regel de verlenging.'
        : 'Without SSL Chrome shows "Not secure" and visitors don\'t trust you. I handle renewal.',
    },
    {
      icon: Database,
      title: language === 'nl' ? 'Server Problemen' : 'Server Issues',
      description: language === 'nl'
        ? 'Servers crashen soms. Ik monitor en herstel problemen voordat je het merkt.'
        : 'Servers sometimes crash. I monitor and fix issues before you notice.',
    },
    {
      icon: Globe,
      title: language === 'nl' ? 'Domein Beheer' : 'Domain Management',
      description: language === 'nl'
        ? 'Domein verloopt? DNS verkeerd ingesteld? Ik houd alles in de gaten.'
        : 'Domain expiring? DNS misconfigured? I keep track of everything.',
    },
  ];

  const comparisonData = [
    { 
      feature: language === 'nl' ? 'Hosting' : 'Hosting',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Zelf regelen (€5-20/maand)' : 'Handle yourself (€5-20/month)',
    },
    { 
      feature: language === 'nl' ? 'SSL Certificaat' : 'SSL Certificate',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Zelf verlengen & installeren' : 'Renew & install yourself',
    },
    { 
      feature: language === 'nl' ? 'Backups' : 'Backups',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Zelf instellen' : 'Set up yourself',
    },
    { 
      feature: language === 'nl' ? 'Bug fixes' : 'Bug fixes',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Betalen per fix (€50-150)' : 'Pay per fix (€50-150)',
    },
    { 
      feature: language === 'nl' ? 'Tekst wijzigingen' : 'Text changes',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Betalen per wijziging' : 'Pay per change',
    },
    { 
      feature: language === 'nl' ? 'Support' : 'Support',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Betalen per uur (€75+)' : 'Pay per hour (€75+)',
    },
    { 
      feature: language === 'nl' ? 'Updates' : 'Updates',
      withPlan: true,
      withoutPlan: language === 'nl' ? 'Zelf bijhouden' : 'Track yourself',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO page="/onderhoud" />
      
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-16 lg:pb-24 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/60 dark:bg-neutral-950/95" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
                {language === 'nl' ? 'Maandelijks Onderhoud' : 'Monthly Maintenance'}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
                {language === 'nl' 
                  ? 'Jij runt je bedrijf. Ik regel je website.' 
                  : 'You run your business. I handle your website.'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-8">
                {language === 'nl'
                  ? 'Een website bouwen is één ding. Hem online houden, veilig houden en werkend houden is iets heel anders. Met het onderhoudspakket hoef jij je daar geen zorgen over te maken.'
                  : "Building a website is one thing. Keeping it online, secure and working is something else entirely. With the maintenance plan, you don't have to worry about any of that."}
              </p>

              <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100">€25</span>
                <span className="text-gray-500">/ {language === 'nl' ? 'maand' : 'month'}</span>
                <span className="text-xs text-gray-400 ml-2">{language === 'nl' ? 'excl. BTW' : 'excl. VAT'}</span>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 active:scale-[0.98] transition-all"
              >
                {language === 'nl' ? 'Start Onderhoudspakket' : 'Start Maintenance Plan'}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <MacBookMockup url={language === 'nl' ? 'jouwsite.nl/status' : 'yoursite.com/status'}>
                <MiniWebsite variant="status" />
              </MacBookMockup>

              <div className="mt-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50 shadow-xl">
                <div className="space-y-4">
                  {maintenanceFeatures.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon size={20} className="text-green-600" />
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

      {/* Why Maintenance Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
              {language === 'nl' ? 'De Waarheid' : 'The Truth'}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 dark:text-white">
              {language === 'nl' 
                ? 'Een website is nooit "klaar"' 
                : 'A website is never "finished"'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'De meeste mensen denken: website gebouwd = klaar. Maar de realiteit is anders. Technologie verandert constant, en zonder onderhoud gaat je website langzaam kapot.'
                : 'Most people think: website built = done. But reality is different. Technology changes constantly, and without maintenance your website slowly breaks down.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-neutral-800/60 rounded-3xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <issue.icon size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">{issue.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{issue.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Horror Stories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-red-50 dark:bg-red-950/30">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 dark:text-white">
              {language === 'nl' 
                ? 'Wat er mis kan gaan (zonder onderhoud)' 
                : 'What can go wrong (without maintenance)'}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                title: language === 'nl' ? 'SSL Certificaat Verlopen' : 'SSL Certificate Expired',
                description: language === 'nl'
                  ? 'Chrome toont "NIET VEILIG" in grote rode letters. Bezoekers vertrekken direct. Google rankt je lager.'
                  : 'Chrome shows "NOT SECURE" in big red letters. Visitors leave immediately. Google ranks you lower.',
              },
              {
                title: language === 'nl' ? 'Website Gehackt' : 'Website Hacked',
                description: language === 'nl'
                  ? 'Geen updates = kwetsbaarheden. Hackers plaatsen spam links of malware. Google blacklist je domein.'
                  : 'No updates = vulnerabilities. Hackers place spam links or malware. Google blacklists your domain.',
              },
              {
                title: language === 'nl' ? 'Server Down' : 'Server Down',
                description: language === 'nl'
                  ? 'Je hosting provider heeft problemen. Zonder monitoring merk je het pas als klanten bellen.'
                  : "Your hosting provider has issues. Without monitoring you only notice when customers call.",
              },
              {
                title: language === 'nl' ? 'Contactformulier Werkt Niet' : 'Contact Form Not Working',
                description: language === 'nl'
                  ? 'Maanden lang krijg je geen leads. Blijkt dat je formulier al die tijd niet werkte.'
                  : "For months you don't get leads. Turns out your form wasn't working all that time.",
              },
            ].map((horror, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50"
              >
                <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">{horror.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{horror.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 dark:text-white">
              {language === 'nl' 
                ? 'Met vs. Zonder Onderhoudspakket' 
                : 'With vs. Without Maintenance Plan'}
            </h2>
          </div>

          <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 py-4 px-6">
              <div className="font-bold dark:text-white">{language === 'nl' ? 'Onderdeel' : 'Item'}</div>
              <div className="font-bold text-center text-green-400">
                {language === 'nl' ? 'Met Pakket (€25/m)' : 'With Plan (€25/m)'}
              </div>
              <div className="font-bold text-center text-red-400">
                {language === 'nl' ? 'Zonder Pakket' : 'Without Plan'}
              </div>
            </div>

            {comparisonData.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 py-4 px-6 items-center ${index % 2 === 0 ? 'bg-gray-50 dark:bg-neutral-800/40' : 'bg-white dark:bg-neutral-800/60'}`}
              >
                <div className="font-medium dark:text-white">{row.feature}</div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check size={16} className="text-green-600" />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  {row.withoutPlan}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Comparison */}
      <section className="py-20 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
              {language === 'nl' ? 'Even Vergelijken' : 'Just Comparing'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 dark:text-white">
              {language === 'nl' 
                ? 'Wat bureaus rekenen voor onderhoud' 
                : 'What agencies charge for maintenance'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Veel webdesign bureaus rekenen absurde bedragen voor onderhoud. Ze noemen het "retainer fees" of "service level agreements". In werkelijkheid betaal je voor overhead.'
                : 'Many web design agencies charge absurd amounts for maintenance. They call it "retainer fees" or "service level agreements". In reality you pay for overhead.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-neutral-700 rounded-3xl p-6 border border-gray-200 dark:border-neutral-600">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {language === 'nl' ? 'Klein Bureau' : 'Small Agency'}
              </p>
              <p className="text-3xl font-black text-red-500 mb-2">€100-250</p>
              <p className="text-sm text-gray-500">/ {language === 'nl' ? 'maand' : 'month'}</p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-xs text-gray-500">
                {language === 'nl' 
                  ? 'Vaak alleen hosting + "support op aanvraag"'
                  : 'Often just hosting + "support on request"'}
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-neutral-700 rounded-3xl p-6 border border-gray-200 dark:border-neutral-600">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {language === 'nl' ? 'Middelgroot Bureau' : 'Medium Agency'}
              </p>
              <p className="text-3xl font-black text-red-500 mb-2">€250-500</p>
              <p className="text-sm text-gray-500">/ {language === 'nl' ? 'maand' : 'month'}</p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-xs text-gray-500">
                {language === 'nl'
                  ? 'Inclusief "X uur support per maand"'
                  : 'Including "X hours support per month"'}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm text-black dark:text-white rounded-3xl p-6 ring-4 ring-green-500">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Yrvante
              </p>
              <p className="text-3xl font-black text-green-600 mb-2">€25</p>
              <p className="text-sm text-gray-400">/ {language === 'nl' ? 'maand' : 'month'}</p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-xs text-gray-600 dark:text-gray-400">
                {language === 'nl'
                  ? 'Alles inclusief. Geen verrassingen.'
                  : 'Everything included. No surprises.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 dark:text-white">
              {language === 'nl' ? 'Alles wat je krijgt' : 'Everything you get'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceFeatures.map((feature, index) => (
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 sm:mb-6 dark:text-white">
            {language === 'nl' 
              ? 'Nooit meer zorgen over je website' 
              : 'Never worry about your website again'}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {language === 'nl'
              ? 'Voor €25 per maand regel ik alles. Jij focust op je klanten, ik focus op je website.'
              : "For €25 per month I handle everything. You focus on your customers, I focus on your website."}
          </p>
          
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-3xl p-8 mb-8 max-w-md mx-auto shadow-sm dark:shadow-neutral-900">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-5xl font-black text-gray-800 dark:text-gray-200">€25</span>
              <span className="text-gray-500">/ {language === 'nl' ? 'maand' : 'month'}</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
              {[
                language === 'nl' ? 'Hosting inclusief' : 'Hosting included',
                language === 'nl' ? 'SSL & beveiliging' : 'SSL & security',
                language === 'nl' ? 'Backups & updates' : 'Backups & updates',
                language === 'nl' ? 'Bug fixes & support' : 'Bug fixes & support',
                language === 'nl' ? 'Kleine aanpassingen' : 'Small changes',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
          >
            {language === 'nl' ? 'Start Onderhoudspakket' : 'Start Maintenance Plan'}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            {language === 'nl' 
              ? 'Maandelijks opzegbaar. Geen langlopende contracten.'
              : 'Cancel monthly. No long-term contracts.'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnderhoudPage;
