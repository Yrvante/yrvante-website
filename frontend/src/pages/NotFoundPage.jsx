import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage, useTheme } from "../App";

const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";
const BG_IMAGE = "/bg-pattern.jpg";

const NotFoundPage = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const t = {
    nl: {
      back: "Terug",
      code: "404",
      title: "Pagina niet gevonden",
      text: "De pagina die je zoekt bestaat niet of is verplaatst.",
      cta: "Terug naar home",
    },
    en: {
      back: "Back",
      code: "404",
      title: "Page not found",
      text: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back to home",
    },
  };

  const c = t[language] || t.nl;

  return (
    <div className="min-h-screen relative flex flex-col" data-testid="not-found-page">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.4) brightness(1.02)",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-white/70 dark:bg-neutral-950/90" />

      {/* Nav */}
      <nav className="w-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              {c.back}
            </Link>
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" />
              <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-md"
        >
          {/* 404 number */}
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="text-[120px] sm:text-[160px] font-heading font-bold leading-none tracking-tighter text-gray-200 dark:text-neutral-800 select-none"
          >
            {c.code}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white -mt-8 sm:-mt-10 mb-3"
          >
            {c.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8"
          >
            {c.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 active:scale-[0.98] transition-all"
              data-testid="not-found-home-btn"
            >
              <ArrowLeft size={14} />
              {c.cta}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LOGO_URL} alt="Yrvante" className="h-6 w-auto dark:hidden" />
          <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-6 w-auto hidden dark:block" />
          <span className="text-xs text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
