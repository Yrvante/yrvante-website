import React from "react";
import { motion } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import {
  RefreshCw,
  Palette,
  Smartphone,
  Zap,
  Eye,
  ArrowRight,
  Check,
  X,
  Clock,
  Moon,
  Sun,
} from "lucide-react";

const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";
const BG_IMAGE = "/bg-pattern.jpg";

const RebrandingPage = () => {
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Palette,
      title: language === "nl" ? "Compleet nieuw design" : "Complete new design",
      desc: language === "nl"
        ? "Jouw huidige website krijgt een volledig nieuw uiterlijk dat past bij je merk."
        : "Your current website gets a completely new look that matches your brand.",
    },
    {
      icon: Smartphone,
      title: language === "nl" ? "Responsive optimalisatie" : "Responsive optimization",
      desc: language === "nl"
        ? "Perfect op telefoon, tablet en desktop. Geen gebroken layouts meer."
        : "Perfect on phone, tablet and desktop. No more broken layouts.",
    },
    {
      icon: Zap,
      title: language === "nl" ? "Snelheidsoptimalisatie" : "Speed optimization",
      desc: language === "nl"
        ? "Snellere laadtijden, geoptimaliseerde code en betere prestaties."
        : "Faster load times, optimized code and better performance.",
    },
    {
      icon: Eye,
      title: language === "nl" ? "Verbeterde UX" : "Improved UX",
      desc: language === "nl"
        ? "Betere navigatie, duidelijkere structuur en hogere conversie."
        : "Better navigation, clearer structure and higher conversion.",
    },
  ];

  const included = [
    language === "nl" ? "Analyse van je huidige website" : "Analysis of your current website",
    language === "nl" ? "Compleet nieuw modern design" : "Complete new modern design",
    language === "nl" ? "Responsive voor alle apparaten" : "Responsive for all devices",
    language === "nl" ? "Snelheidsoptimalisatie" : "Speed optimization",
    language === "nl" ? "Hosting & SSL inbegrepen" : "Hosting & SSL included",
    language === "nl" ? "Verbeterde gebruikservaring" : "Improved user experience",
  ];

  const notIncluded = [
    language === "nl" ? "Nieuwe pagina's toevoegen" : "Adding new pages",
    language === "nl" ? "SEO optimalisatie" : "SEO optimization",
    language === "nl" ? "Blog of portfolio pagina" : "Blog or portfolio page",
    language === "nl" ? "Boekingssysteem" : "Booking system",
  ];

  const idealFor = [
    language === "nl" ? "Je website ziet er verouderd uit" : "Your website looks outdated",
    language === "nl" ? "Klanten nemen je niet serieus online" : "Customers don't take you seriously online",
    language === "nl" ? "Je website is niet mobielvriendelijk" : "Your website is not mobile-friendly",
    language === "nl" ? "Je wilt een frisse start met je huidige content" : "You want a fresh start with your current content",
  ];

  return (
    <div className="min-h-screen relative" data-testid="rebranding-page">
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: theme === "dark"
          ? "saturate(0) brightness(0.08)"
          : "saturate(0.55) brightness(1.02) contrast(1.05)",
      }} />
      <div className={`fixed inset-0 -z-10 pointer-events-none ${
        theme === "dark"
          ? "bg-neutral-950/80"
          : "bg-gradient-to-b from-white/55 via-white/60 to-white/70"
      }`} />

      <SEO page="/rebranding" />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <ArrowRight size={14} className="rotate-180" />
              {language === "nl" ? "Terug" : "Back"}
            </Link>
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" />
              <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-500" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">
                {language === "nl" ? "Rebranding Website" : "Rebranding Website"}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter dark:text-white leading-[0.95] mb-6">
                {language === "nl" ? (
                  <>GEEF JE WEBSITE<br /><span className="text-gray-400">EEN NIEUW LEVEN</span></>
                ) : (
                  <>GIVE YOUR WEBSITE<br /><span className="text-gray-400">A NEW LIFE</span></>
                )}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mb-8 leading-relaxed">
                {language === "nl"
                  ? "Je website werkt nog, maar ziet er niet meer uit. Met een rebranding geef ik je bestaande site een compleet nieuw, modern uiterlijk — zonder alles opnieuw te hoeven bouwen."
                  : "Your website still works, but doesn't look the part anymore. With a rebrand, I give your existing site a complete new, modern look — without having to rebuild everything."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/calculator?package=rebranding"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-500 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-600 transition-all"
                  data-testid="rebranding-cta"
                >
                  {language === "nl" ? "Bereken je prijs" : "Calculate your price"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-400 dark:border-neutral-600 text-gray-700 dark:text-gray-300 text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-all"
                >
                  {language === "nl" ? "Neem contact op" : "Get in touch"}
                </a>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black dark:text-white">€349</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {language === "nl" ? "vanaf" : "from"}
                  </span>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-neutral-600" />
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {language === "nl" ? "Klaar in 1 week" : "Ready in 1 week"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mb-5">
                    <f.icon size={22} strokeWidth={1.5} className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">{f.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included / Not Included */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Included */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50"
              >
                <h3 className="text-xl font-bold dark:text-white mb-6">
                  {language === "nl" ? "Wat is inbegrepen" : "What's included"}
                </h3>
                <ul className="space-y-3">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Not included */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50"
              >
                <h3 className="text-xl font-bold dark:text-white mb-3">
                  {language === "nl" ? "Niet inbegrepen" : "Not included"}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  {language === "nl"
                    ? "Deze kan je toevoegen als extra in de calculator"
                    : "You can add these as extras in the calculator"}
                </p>
                <ul className="space-y-3">
                  {notIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <X size={14} className="text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ideal for */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter dark:text-white mb-8">
                {language === "nl" ? "IS DIT IETS VOOR MIJ?" : "IS THIS FOR ME?"}
              </h2>
              <div className="space-y-4 text-left max-w-md mx-auto">
                {idealFor.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-neutral-700"
                  >
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium dark:text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-8 mb-6">
                {language === "nl"
                  ? "Herken je dit? Dan is een rebranding de perfecte oplossing."
                  : "Sound familiar? Then a rebrand is the perfect solution."}
              </p>
              <Link
                to="/calculator?package=rebranding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-500 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-600 transition-all"
              >
                {language === "nl" ? "Start vandaag voor €349" : "Start today for €349"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Before & After */}
        <BeforeAfterSlider />

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-12 border-t border-gray-100 dark:border-neutral-800">
          <div className="max-w-[1800px] mx-auto flex justify-between items-center">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" />
            <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
            <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RebrandingPage;
