import React, { useState } from "react";
import ThemeChooserV2 from "../components/ThemeChooserV2";
import { useTheme, useLanguage } from "../App";

const ThemeTestPage = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const [showChooser, setShowChooser] = useState(false);

  const triggerChooser = () => {
    localStorage.removeItem("theme_chosen");
    setShowChooser(false);
    setTimeout(() => setShowChooser(true), 100);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <h1 className="text-3xl font-bold">Theme Chooser Test</h1>
      <p className="text-gray-500">Huidige modus: <strong className={theme === 'dark' ? 'text-indigo-300' : 'text-amber-600'}>{theme}</strong></p>
      
      <button
        onClick={triggerChooser}
        className="px-8 py-4 bg-gray-500 text-white rounded-full font-bold hover:bg-gray-600 transition-all"
      >
        Toon Theme Chooser
      </button>

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="px-6 py-3 border border-gray-300 dark:border-neutral-700 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
      >
        Toggle {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      {showChooser && <ThemeChooserV2 />}
    </div>
  );
};

export default ThemeTestPage;
