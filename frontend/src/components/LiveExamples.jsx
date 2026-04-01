import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Monitor, Smartphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const industries = {
  nl: [
    { key: "kapper", label: "Kapper", icon: "scissors" },
    { key: "loodgieter", label: "Loodgieter", icon: "wrench" },
    { key: "coach", label: "Coach", icon: "heart" },
    { key: "restaurant", label: "Restaurant", icon: "utensils" },
  ],
  en: [
    { key: "kapper", label: "Hairdresser", icon: "scissors" },
    { key: "loodgieter", label: "Plumber", icon: "wrench" },
    { key: "coach", label: "Coach", icon: "heart" },
    { key: "restaurant", label: "Restaurant", icon: "utensils" },
  ],
};

const tiers = ["Basis", "Pro", "Premium"];

const siteContent = {
  kapper: {
    name: { nl: "Salon Bella", en: "Salon Bella" },
    tagline: { nl: "Jouw haar, onze passie", en: "Your hair, our passion" },
    color: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
    accent: "bg-pink-500",
    services: { nl: ["Knippen", "Kleuren", "Stylen"], en: ["Cut", "Color", "Style"] },
  },
  loodgieter: {
    name: { nl: "Jansen Loodgieters", en: "Jansen Plumbing" },
    tagline: { nl: "24/7 beschikbaar voor spoedklussen", en: "24/7 available for emergencies" },
    color: "from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20",
    accent: "bg-sky-500",
    services: { nl: ["Lekkages", "CV-ketel", "Riool"], en: ["Leaks", "Boiler", "Sewer"] },
  },
  coach: {
    name: { nl: "Mindset Coach Lisa", en: "Mindset Coach Lisa" },
    tagline: { nl: "Vind balans in je leven", en: "Find balance in your life" },
    color: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    accent: "bg-emerald-500",
    services: { nl: ["1-op-1 coaching", "Workshops", "Online sessies"], en: ["1-on-1 coaching", "Workshops", "Online sessions"] },
  },
  restaurant: {
    name: { nl: "Trattoria Napoli", en: "Trattoria Napoli" },
    tagline: { nl: "Authentiek Italiaans in het hart van de stad", en: "Authentic Italian in the heart of the city" },
    color: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    accent: "bg-amber-500",
    services: { nl: ["Menu", "Reserveren", "Catering"], en: ["Menu", "Reserve", "Catering"] },
  },
};

const tierFeatures = {
  Basis: { pages: 3, hasNav: true, hasContact: false, hasBooking: false, hasBlog: false },
  Pro: { pages: 7, hasNav: true, hasContact: true, hasBooking: false, hasBlog: true },
  Premium: { pages: 12, hasNav: true, hasContact: true, hasBooking: true, hasBlog: true },
};

const LiveExamples = () => {
  const { language } = useLanguage();
  const [activeIndustry, setActiveIndustry] = useState("kapper");
  const [activeTier, setActiveTier] = useState("Pro");
  const [viewMode, setViewMode] = useState("desktop");

  const ind = industries[language] || industries.nl;
  const site = siteContent[activeIndustry];
  const features = tierFeatures[activeTier];
  const lang = language || "nl";

  return (
    <section data-testid="live-examples-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">(12)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-4">
            {language === "nl" ? "LIVE VOORBEELDEN" : "LIVE EXAMPLES"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {language === "nl"
              ? "Kies een branche en pakket om te zien hoe jouw website eruit kan zien."
              : "Choose an industry and package to see what your website could look like."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Industry selector */}
          <div className="flex gap-2 flex-wrap justify-center">
            {ind.map((i) => (
              <button
                key={i.key}
                onClick={() => setActiveIndustry(i.key)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeIndustry === i.key
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
                data-testid={`example-industry-${i.key}`}
              >
                {i.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300 dark:bg-neutral-600 hidden sm:block" />

          {/* Tier selector */}
          <div className="flex gap-2">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTier === t
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
                data-testid={`example-tier-${t}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300 dark:bg-neutral-600 hidden sm:block" />

          {/* View mode */}
          <div className="flex gap-1 bg-gray-100 dark:bg-neutral-800 rounded-full p-1">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-2 rounded-full transition-all ${viewMode === "desktop" ? "bg-white dark:bg-neutral-700 shadow-sm" : ""}`}
            >
              <Monitor size={16} className={viewMode === "desktop" ? "text-gray-800 dark:text-gray-200" : "text-gray-400"} />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-2 rounded-full transition-all ${viewMode === "mobile" ? "bg-white dark:bg-neutral-700 shadow-sm" : ""}`}
            >
              <Smartphone size={16} className={viewMode === "mobile" ? "text-gray-800 dark:text-gray-200" : "text-gray-400"} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeIndustry}-${activeTier}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-3xl overflow-hidden shadow-xl transition-all ${
                viewMode === "mobile" ? "w-[320px]" : "w-full max-w-4xl"
              }`}
              data-testid="live-example-preview"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white dark:bg-neutral-700 rounded-lg px-3 py-1 text-xs text-gray-400 text-center">
                  {site.name[lang].toLowerCase().replace(/\s/g, "")}.nl
                </div>
              </div>

              {/* Website content */}
              <div className={`bg-gradient-to-br ${site.color} p-6 sm:p-8 min-h-[400px] flex flex-col`}>
                {/* Nav */}
                {features.hasNav && (
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${site.accent}`} />
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {site.name[lang]}
                      </span>
                    </div>
                    <div className="hidden sm:flex gap-4 text-xs text-gray-500">
                      {site.services[lang].map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                      {features.hasContact && <span>Contact</span>}
                      {features.hasBlog && <span>Blog</span>}
                    </div>
                  </div>
                )}

                {/* Hero */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{site.name[lang]}</p>
                  <h3 className={`${viewMode === "mobile" ? "text-xl" : "text-2xl sm:text-4xl"} font-black text-gray-900 dark:text-white mb-3 leading-tight`}>
                    {site.tagline[lang]}
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <div className={`px-5 py-2.5 ${site.accent} text-white text-xs font-bold rounded-full`}>
                      {language === "nl" ? "Contact" : "Contact"}
                    </div>
                    {features.hasBooking && (
                      <div className="px-5 py-2.5 border border-gray-300 dark:border-neutral-600 text-xs font-bold rounded-full text-gray-600 dark:text-gray-400">
                        {language === "nl" ? "Afspraak maken" : "Book appointment"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Services cards */}
                <div className={`grid ${viewMode === "mobile" ? "grid-cols-1" : "grid-cols-3"} gap-3 mt-8`}>
                  {site.services[lang].map((s, i) => (
                    <div key={i} className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-neutral-700/50">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{s}</p>
                      <div className="h-2 w-3/4 bg-gray-200 dark:bg-neutral-600 rounded mt-2" />
                    </div>
                  ))}
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 bg-white/50 dark:bg-neutral-800/50 rounded-full text-[10px] font-medium text-gray-600 dark:text-gray-400">
                    {activeTier} Website
                  </span>
                  <span className="px-3 py-1 bg-white/50 dark:bg-neutral-800/50 rounded-full text-[10px] font-medium text-gray-600 dark:text-gray-400">
                    {features.pages} {language === "nl" ? "pagina's" : "pages"}
                  </span>
                  {features.hasBooking && (
                    <span className="px-3 py-1 bg-white/50 dark:bg-neutral-800/50 rounded-full text-[10px] font-medium text-gray-600 dark:text-gray-400">
                      {language === "nl" ? "Boekingssysteem" : "Booking system"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            data-testid="live-examples-cta"
          >
            {language === "nl" ? "Start met jouw website" : "Start with your website"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveExamples;
