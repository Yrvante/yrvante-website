import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { X, Gift, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "yrvante_exit_popup_shown";
const DISCOUNT_CODE = "YRVA10";

const ExitIntentPopup = () => {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown && Date.now() - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return;
    }

    let triggered = false;

    // Desktop: mouse leaves viewport from top
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setShow(true);
      }
    };

    // Mobile: detect scroll up quickly (intent to leave)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY && currentY < 200 && window.scrollY > 0) {
        scrollUpCount++;
        if (scrollUpCount > 3 && !triggered) {
          triggered = true;
          setShow(true);
        }
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentY;
    };

    // Delay adding listeners so popup doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          data-testid="exit-intent-popup"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200/50 dark:border-neutral-800/50"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
              data-testid="exit-popup-close"
            >
              <X size={20} />
            </button>

            {/* Top accent */}
            <div className="h-1.5 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600" />

            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift size={28} className="text-gray-600 dark:text-gray-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black tracking-tight dark:text-white mb-2">
                {language === "nl" ? "Wacht even!" : "Wait a moment!"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                {language === "nl"
                  ? "Ontvang 10% korting op je nieuwe website. Gebruik de code bij het aanvragen van een offerte."
                  : "Get 10% off your new website. Use the code when requesting a quote."}
              </p>

              {/* Discount code */}
              <div
                onClick={copyCode}
                className="cursor-pointer group bg-gray-50 dark:bg-neutral-800 border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-2xl p-4 mb-6 hover:border-gray-500 dark:hover:border-neutral-400 transition-colors"
                data-testid="exit-popup-discount-code"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles size={16} className="text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {language === "nl" ? "Kortingscode" : "Discount code"}
                  </span>
                </div>
                <p className="text-3xl font-black tracking-wider dark:text-white">
                  {DISCOUNT_CODE}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {copied
                    ? (language === "nl" ? "Gekopieerd!" : "Copied!")
                    : (language === "nl" ? "Klik om te kopieren" : "Click to copy")}
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/calculator"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105"
                data-testid="exit-popup-cta"
              >
                {language === "nl" ? "Bereken je prijs" : "Calculate your price"}
                <ArrowRight size={16} />
              </Link>

              <p className="text-xs text-gray-400 mt-4">
                {language === "nl"
                  ? "10% korting op alle pakketten"
                  : "10% discount on all packages"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
