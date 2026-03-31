import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme, useLanguage } from "../App";

const ThemeChooser = () => {
  const [visible, setVisible] = useState(false);
  const { setTheme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    const hasChosen = localStorage.getItem("theme_chosen");
    if (!hasChosen) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme_chosen", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm"
            onClick={() => choose("light")}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed z-[10000] inset-0 flex items-center justify-center pointer-events-none px-5"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 w-full max-w-[320px] pointer-events-auto">
              {/* Header gradient */}
              <div className="h-1 bg-gradient-to-r from-amber-300 via-gray-300 to-gray-500" />

              <div className="px-6 pt-6 pb-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-2">
                  Yrvante
                </p>
                <h3 className="text-lg font-black tracking-tight text-gray-900 mb-1">
                  {language === "nl" ? "Welkom" : "Welcome"}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === "nl"
                    ? "Hoe wil je de site bekijken?"
                    : "How would you like to view the site?"}
                </p>
              </div>

              {/* Options */}
              <div className="px-5 pb-5 pt-3 flex gap-3">
                {/* Light */}
                <button
                  onClick={() => choose("light")}
                  className="flex-1 group relative rounded-2xl border-2 border-gray-200 hover:border-amber-400 bg-gradient-to-b from-gray-50 to-white p-4 transition-all duration-200 active:scale-[0.97]"
                >
                  <div className="w-10 h-10 mx-auto mb-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <Sun size={20} className="text-amber-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-800 tracking-wide">
                    {language === "nl" ? "Licht" : "Light"}
                  </p>
                </button>

                {/* Dark */}
                <button
                  onClick={() => choose("dark")}
                  className="flex-1 group relative rounded-2xl border-2 border-gray-200 hover:border-gray-500 bg-gradient-to-b from-gray-900 to-gray-800 p-4 transition-all duration-200 active:scale-[0.97]"
                >
                  <div className="w-10 h-10 mx-auto mb-2.5 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                    <Moon size={20} className="text-gray-300" />
                  </div>
                  <p className="text-xs font-bold text-gray-200 tracking-wide">
                    {language === "nl" ? "Donker" : "Dark"}
                  </p>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeChooser;
