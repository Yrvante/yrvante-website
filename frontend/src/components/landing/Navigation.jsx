import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, useTheme } from "../../App";
import { Link } from "react-router-dom";
import {
  Menu, X, ChevronDown, Moon, Sun, ShoppingCart,
} from "lucide-react";
import { LOGO_URL, LOGO_URL_WHITE } from "./constants";

const Navigation = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const dienstenLinks = [
    { to: '/pakketten', label: language === 'nl' ? 'Pakketten, Prijzen & Calculator' : 'Packages, Pricing & Calculator' },
    { divider: true },
    { to: '/diensten/webdesign', label: language === 'nl' ? 'Webdesign' : 'Web Design' },
    { to: '/rebranding', label: 'Rebranding' },
    { to: '/onderhoud', label: language === 'nl' ? 'Onderhoud & Hosting' : 'Maintenance & Hosting' },
    { divider: true },
    { to: '/diensten', label: language === 'nl' ? 'Alle Branches →' : 'All Industries →' },
  ];

  const overLinks = [
    { to: '/over-mij', label: language === 'nl' ? 'Over Mij' : 'About Me' },
    { to: '/waarom-website', label: language === 'nl' ? 'Waarom een Website?' : 'Why a Website?' },
    { to: '/blog', label: 'Blog' },
    { divider: true },
    { to: '/pakketten', label: language === 'nl' ? 'Pakketten & Prijzen' : 'Packages & Pricing' },
    { to: '/privacy', label: language === 'nl' ? 'Privacybeleid' : 'Privacy Policy' },
  ];

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-black/10 dark:border-neutral-700/50" : "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <img src={LOGO_URL} alt="Yrvante" className="h-10 w-auto object-contain dark:hidden" />
            <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-10 w-auto object-contain hidden dark:block" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {/* Diensten Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('diensten')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                {language === 'nl' ? 'Diensten' : 'Services'}
                <ChevronDown size={14} className={`transition-transform ${openDropdown === 'diensten' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'diensten' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl shadow-xl py-3 min-w-[220px]"
                    data-testid="diensten-dropdown"
                  >
                    {dienstenLinks.map((link, i) =>
                      link.divider ? <div key={i} className="h-px bg-gray-100 dark:bg-neutral-700 my-2 mx-3" /> :
                      <Link key={i} to={link.to} className="block px-5 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">{link.label}</Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Meer Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('meer')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                {language === 'nl' ? 'Meer' : 'More'}
                <ChevronDown size={14} className={`transition-transform ${openDropdown === 'meer' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'meer' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl shadow-xl py-3 min-w-[220px]"
                    data-testid="meer-dropdown"
                  >
                    {overLinks.map((link, i) =>
                      link.divider ? <div key={i} className="h-px bg-gray-100 dark:bg-neutral-700 my-2 mx-3" /> :
                      <Link key={i} to={link.to} className="block px-5 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">{link.label}</Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => scrollToSection("contact")} className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Contact</button>
            <div className="w-px h-4 bg-gray-300 dark:bg-neutral-600" />
            <Link to="/calculator" className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" title={language === 'nl' ? 'Wat kost jouw website?' : 'What does your website cost?'} data-testid="nav-cart-icon"><ShoppingCart size={18} /></Link>
            <button onClick={() => scrollToSection("contact")} className="px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 transition-colors rounded-full">Start Project</button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <button onClick={() => setLanguage("nl")} className={`px-2 py-1 ${language === "nl" ? "text-black dark:text-white" : "text-gray-400"}`}>NL</button>
              <span className="text-gray-300 dark:text-neutral-600">/</span>
              <button onClick={() => setLanguage("en")} className={`px-2 py-1 ${language === "en" ? "text-black dark:text-white" : "text-gray-400"}`}>EN</button>
            </div>
            <button data-testid="theme-toggle" onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700/60 dark:hover:bg-neutral-800 transition-colors" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
              {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-500" />}
            </button>
          </div>

          {/* Mobile Cart + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/calculator" className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" data-testid="mobile-cart-icon"><ShoppingCart size={22} /></Link>
            <button data-testid="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-black dark:text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-t border-gray-200/50 dark:border-neutral-700/50 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <Link to="/pakketten" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">{language === 'nl' ? 'Pakketten & Prijzen' : 'Packages & Pricing'}</Link>
              <Link to="/diensten/webdesign" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">Webdesign</Link>
              <Link to="/rebranding" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">Rebranding</Link>
              <Link to="/onderhoud" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">{language === 'nl' ? 'Onderhoud & Hosting' : 'Maintenance & Hosting'}</Link>
              <Link to="/diensten" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">{language === 'nl' ? 'Alle Branches' : 'All Industries'}</Link>
              <div className="h-px bg-gray-200 dark:bg-neutral-700" />
              <Link to="/over-mij" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">{language === 'nl' ? 'Over Mij' : 'About Me'}</Link>
              <Link to="/waarom-website" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">{language === 'nl' ? 'Waarom een Website?' : 'Why a Website?'}</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">Blog</Link>
              <Link to="/calculator" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700 dark:text-gray-300">Calculator</Link>
              <div className="h-px bg-gray-200 dark:bg-neutral-700" />
              <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="block text-sm text-gray-700 dark:text-gray-300">Contact</button>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <button onClick={() => setLanguage("nl")} className={`px-2 py-1 ${language === "nl" ? "text-black dark:text-white font-bold" : "text-gray-400"}`}>NL</button>
                  <span className="text-gray-300 dark:text-neutral-600">/</span>
                  <button onClick={() => setLanguage("en")} className={`px-2 py-1 ${language === "en" ? "text-black dark:text-white font-bold" : "text-gray-400"}`}>EN</button>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                  {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-500" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
