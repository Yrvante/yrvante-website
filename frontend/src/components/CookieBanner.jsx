import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../App";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (type) => {
    localStorage.setItem("cookie_consent", type);
    setVisible(false);
  };

  const t = {
    nl: {
      title: "Cookies",
      text: "Wij gebruiken cookies om je ervaring te verbeteren en onze website te analyseren.",
      accept: "Accepteren",
      necessary: "Alleen noodzakelijk",
      privacy: "Privacybeleid",
    },
    en: {
      title: "Cookies",
      text: "We use cookies to improve your experience and analyze our website.",
      accept: "Accept all",
      necessary: "Necessary only",
      privacy: "Privacy policy",
    },
  };

  const c = t[language] || t.nl;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9000] sm:max-w-[380px]"
          data-testid="cookie-banner"
        >
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-800 overflow-hidden">
            {/* Top accent */}
            <div className="h-[2px] bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 dark:from-neutral-700 dark:via-neutral-500 dark:to-neutral-700" />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <Shield size={15} className="text-gray-500" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                    {c.title}
                  </h4>
                </div>
                <button
                  onClick={() => accept("necessary")}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0.5"
                  data-testid="cookie-close"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {c.text}{" "}
                <Link to="/privacy" className="underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  {c.privacy}
                </Link>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => accept("all")}
                  className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                  data-testid="cookie-accept-all"
                >
                  {c.accept}
                </button>
                <button
                  onClick={() => accept("necessary")}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  data-testid="cookie-accept-necessary"
                >
                  {c.necessary}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
