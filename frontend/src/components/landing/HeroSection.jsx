import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { Phone, Mail, Star } from "lucide-react";

const HeroSection = () => {
  const { language } = useLanguage();
  const [googleRating, setGoogleRating] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL || ''}/api/reviews`)
      .then(res => { if (res.data?.rating) setGoogleRating(res.data); })
      .catch(() => {});
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="min-h-screen pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-120px)] flex flex-col justify-center relative">
          {/* Availability Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 sm:mb-6">
            <button onClick={scrollToContact} className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 hover:border-gray-400 dark:hover:border-neutral-500 transition-all duration-300 text-xs sm:text-sm" style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.25), 0 2px 10px rgba(0, 0, 0, 0.03)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
              </span>
              <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                {language === 'nl' ? 'Beschikbaar voor nieuwe projecten' : 'Available for new projects'}
              </span>
            </button>
          </motion.div>

          {/* Slogan */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[11px] sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
            {language === 'nl' ? 'Alles wat je nog nodig hebt is' : 'Everything you still need is'}
          </motion.p>

          {/* Main Headline */}
          <div className="relative mb-6 sm:mb-10">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[16vw] sm:text-[14vw] lg:text-[9vw] font-black leading-[0.95] tracking-tighter dark:text-white">
              {language === 'nl' ? (
                <span className="flex flex-col"><span>JOUW</span><span>BEDRIJF</span><span className="text-gray-500 dark:text-gray-400">ONLINE</span></span>
              ) : (
                <span className="flex flex-col"><span>YOUR</span><span>BUSINESS</span><span className="text-gray-500 dark:text-gray-400">ONLINE</span></span>
              )}
            </motion.h1>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:flex absolute right-0 inset-y-0 items-center justify-center w-1/3">
              <img src="/yrvante-logo-code.png" alt="Yrvante" className="w-72 h-auto object-contain opacity-80" />
            </motion.div>
          </div>

          {/* Value Prop */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-sm lg:text-base text-gray-500 max-w-lg leading-relaxed mb-4">
            {language === 'nl' ? 'Ik bouw niet alleen je website — ik zorg dat jouw bedrijf online de indruk maakt die het verdient, zodat klanten je serieus nemen en jij met een gerust hart kunt doen waar je goed in bent.' : "I don't just build your website — I make sure your business makes the impression it deserves online, so customers take you seriously and you can do what you're good at with peace of mind."}
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }} className="flex items-center flex-wrap gap-2 sm:gap-4 mb-8">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>€349</span><span className="text-gray-400 font-normal">{language === 'nl' ? 'VANAF' : 'FROM'}</span>
            </span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-neutral-600 rounded-full hidden sm:block" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>1-2</span><span className="text-gray-400 font-normal">{language === 'nl' ? 'WEKEN' : 'WEEKS'}</span>
            </span>
            {googleRating && (
              <>
                <span className="w-1 h-1 bg-gray-300 dark:bg-neutral-600 rounded-full hidden sm:block" />
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className={`w-3 h-3 ${i < Math.round(googleRating.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}`}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </span>
                  <span>{googleRating.rating}</span><span className="text-gray-400 font-normal">GOOGLE</span>
                </span>
              </>
            )}
          </motion.div>

          {/* Trust badges - mobile compact */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.48 }} className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6 sm:mb-8 lg:hidden">
            {[
              { icon: '✓', text: language === 'nl' ? 'KVK Geregistreerd' : 'Chamber of Commerce' },
              { icon: '✓', text: language === 'nl' ? '100% Tevredenheid' : '100% Satisfaction' },
              { icon: '✓', text: language === 'nl' ? 'Reactie < 2 uur' : 'Response < 2h' },
              { icon: '✓', text: language === 'nl' ? '100% Maatwerk' : '100% Custom' },
            ].map((b, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                <span className="text-gray-400">{b.icon}</span>
                <span>{b.text}</span>
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6 sm:mb-8">
            <button onClick={scrollToContact} className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 active:scale-[0.98] transition-all rounded-full text-center">
              {language === 'nl' ? 'Start Project' : 'Start Project'}<span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <Link to="/pakketten" className="px-6 sm:px-8 py-3.5 sm:py-4 border border-gray-400 dark:border-neutral-600 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-500 hover:text-white hover:border-gray-500 active:scale-[0.98] transition-all rounded-full text-center">
              {language === 'nl' ? 'Bekijk Werk' : 'View Work'}
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="tel:+31855055314" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Phone size={14} /><span>+31 85 505 5314</span></a>
            <a href="mailto:info@yrvante.com" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Mail size={14} /><span>info@yrvante.com</span></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
