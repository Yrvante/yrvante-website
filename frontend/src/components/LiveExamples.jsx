import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Monitor, Smartphone, ArrowRight, Check, Calendar, Globe, FileText, Search, MessageSquare, Image, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const industries = {
  nl: [
    { key: "kapper", label: "Kapper" },
    { key: "loodgieter", label: "Loodgieter" },
    { key: "coach", label: "Coach" },
    { key: "restaurant", label: "Restaurant" },
  ],
  en: [
    { key: "kapper", label: "Hairdresser" },
    { key: "loodgieter", label: "Plumber" },
    { key: "coach", label: "Coach" },
    { key: "restaurant", label: "Restaurant" },
  ],
};

const tiers = [
  { key: "basic", label: "Basis", price: "500" },
  { key: "pro", label: "Pro", price: "900" },
  { key: "premium", label: "Premium", price: "1400" },
];

const siteContent = {
  kapper: {
    name: { nl: "Salon Bella", en: "Salon Bella" },
    tagline: { nl: "Jouw haar, onze passie", en: "Your hair, our passion" },
    accent: "bg-rose-500",
    accentLight: "bg-rose-50 dark:bg-rose-950/20",
    services: { nl: ["Knippen", "Kleuren", "Stylen", "Behandelingen"], en: ["Cut", "Color", "Style", "Treatments"] },
  },
  loodgieter: {
    name: { nl: "Jansen Loodgieters", en: "Jansen Plumbing" },
    tagline: { nl: "24/7 beschikbaar voor spoedklussen", en: "24/7 available for emergencies" },
    accent: "bg-sky-500",
    accentLight: "bg-sky-50 dark:bg-sky-950/20",
    services: { nl: ["Lekkages", "CV-ketel", "Riool", "Badkamer"], en: ["Leaks", "Boiler", "Sewer", "Bathroom"] },
  },
  coach: {
    name: { nl: "Coach Lisa", en: "Coach Lisa" },
    tagline: { nl: "Vind balans in je leven", en: "Find balance in your life" },
    accent: "bg-emerald-500",
    accentLight: "bg-emerald-50 dark:bg-emerald-950/20",
    services: { nl: ["1-op-1", "Workshops", "Online", "Groepssessies"], en: ["1-on-1", "Workshops", "Online", "Group"] },
  },
  restaurant: {
    name: { nl: "Trattoria Napoli", en: "Trattoria Napoli" },
    tagline: { nl: "Authentiek Italiaans", en: "Authentic Italian" },
    accent: "bg-amber-500",
    accentLight: "bg-amber-50 dark:bg-amber-950/20",
    services: { nl: ["Menu", "Reserveren", "Catering", "Events"], en: ["Menu", "Reserve", "Catering", "Events"] },
  },
};

const tierFeatures = {
  basic: {
    pages: 3,
    features: (lang) => [
      { icon: Monitor, label: lang === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: lang === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Image, label: lang === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: [],
  },
  pro: {
    pages: 10,
    features: (lang) => [
      { icon: Monitor, label: lang === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: lang === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Search, label: lang === "nl" ? "SEO optimalisatie" : "SEO optimization" },
      { icon: FileText, label: lang === "nl" ? "Blog / Portfolio" : "Blog / Portfolio" },
      { icon: Image, label: lang === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: (lang) => [
      lang === "nl" ? "Google Analytics" : "Google Analytics",
      lang === "nl" ? "Social media links" : "Social media links",
    ],
  },
  premium: {
    pages: 15,
    features: (lang) => [
      { icon: Monitor, label: lang === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: lang === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Search, label: lang === "nl" ? "SEO optimalisatie" : "SEO optimization" },
      { icon: FileText, label: lang === "nl" ? "Blog / Portfolio" : "Blog / Portfolio" },
      { icon: Calendar, label: lang === "nl" ? "Boekingssysteem" : "Booking system" },
      { icon: Globe, label: lang === "nl" ? "Meertalig" : "Multi-language" },
      { icon: Users, label: lang === "nl" ? "Priority support" : "Priority support" },
      { icon: Image, label: lang === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: (lang) => [
      lang === "nl" ? "Google Analytics" : "Google Analytics",
      lang === "nl" ? "Social media links" : "Social media links",
      lang === "nl" ? "Live chat widget" : "Live chat widget",
      lang === "nl" ? "WhatsApp integratie" : "WhatsApp integration",
    ],
  },
};

const LiveExamples = () => {
  const { language } = useLanguage();
  const [activeIndustry, setActiveIndustry] = useState("kapper");
  const [activeTier, setActiveTier] = useState("pro");
  const [viewMode, setViewMode] = useState("desktop");

  const ind = industries[language] || industries.nl;
  const site = siteContent[activeIndustry];
  const tier = tierFeatures[activeTier];
  const lang = language || "nl";
  const tierInfo = tiers.find((t) => t.key === activeTier);
  const features = tier.features(lang);
  const extras = tier.extras && typeof tier.extras === "function" ? tier.extras(lang) : [];

  return (
    <section data-testid="live-examples-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">&nbsp;</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-3">
            {language === "nl" ? "BEKIJK WAT JE KRIJGT" : "SEE WHAT YOU GET"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm">
            {language === "nl"
              ? "Kies een branche en pakket. Bekijk het live voorbeeld en alle features die erbij horen."
              : "Choose an industry and package. See the live preview and all included features."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="flex gap-1.5 flex-wrap justify-center">
            {ind.map((i) => (
              <button
                key={i.key}
                onClick={() => setActiveIndustry(i.key)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeIndustry === i.key
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
                data-testid={`example-industry-${i.key}`}
              >
                {i.label}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-gray-300 dark:bg-neutral-600 hidden sm:block" />
          <div className="flex gap-1.5">
            {tiers.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTier(t.key)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTier === t.key
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
                data-testid={`example-tier-${t.key}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-gray-300 dark:bg-neutral-600 hidden sm:block" />
          <div className="flex gap-1 bg-gray-100 dark:bg-neutral-800 rounded-full p-1">
            <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded-full transition-all ${viewMode === "desktop" ? "bg-white dark:bg-neutral-700 shadow-sm" : ""}`}>
              <Monitor size={14} className={viewMode === "desktop" ? "text-gray-800 dark:text-gray-200" : "text-gray-400"} />
            </button>
            <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded-full transition-all ${viewMode === "mobile" ? "bg-white dark:bg-neutral-700 shadow-sm" : ""}`}>
              <Smartphone size={14} className={viewMode === "mobile" ? "text-gray-800 dark:text-gray-200" : "text-gray-400"} />
            </button>
          </div>
        </div>

        {/* Content: Preview + Features side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Preview - takes 3/5 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndustry}-${activeTier}-${viewMode}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-lg mx-auto ${
                  viewMode === "mobile" ? "max-w-[300px]" : "w-full"
                }`}
                data-testid="live-example-preview"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-neutral-700 rounded px-2 py-0.5 text-[10px] text-gray-400 text-center">
                    {site.name[lang].toLowerCase().replace(/\s/g, "")}.nl
                  </div>
                </div>

                {/* Website */}
                <div className={`${site.accentLight} p-5 sm:p-6 min-h-[340px] flex flex-col`}>
                  {/* Nav */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg ${site.accent}`} />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{site.name[lang]}</span>
                    </div>
                    <div className="hidden sm:flex gap-3 text-[10px] text-gray-500">
                      {site.services[lang].slice(0, 3).map((s) => <span key={s}>{s}</span>)}
                      {activeTier !== "basic" && <span>Blog</span>}
                      {activeTier === "premium" && (
                        <>
                          <span>{lang === "nl" ? "Afspraak" : "Book"}</span>
                          <span className="flex items-center gap-0.5"><Globe size={8} /> EN</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{site.name[lang]}</p>
                    <h3 className={`${viewMode === "mobile" ? "text-lg" : "text-xl sm:text-3xl"} font-black text-gray-900 dark:text-white leading-tight mb-3`}>
                      {site.tagline[lang]}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <div className={`px-4 py-2 ${site.accent} text-white text-[10px] font-bold rounded-full`}>
                        Contact
                      </div>
                      {activeTier === "premium" && (
                        <div className="px-4 py-2 border border-gray-300 dark:border-neutral-600 text-[10px] font-bold rounded-full text-gray-600 dark:text-gray-400">
                          {lang === "nl" ? "Reserveren" : "Book now"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services */}
                  <div className={`grid ${viewMode === "mobile" ? "grid-cols-2" : "grid-cols-4"} gap-2 mt-5`}>
                    {site.services[lang].slice(0, viewMode === "mobile" ? 2 : 4).map((s, i) => (
                      <div key={i} className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-neutral-700/50">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{s}</p>
                        <div className="h-1.5 w-2/3 bg-gray-200 dark:bg-neutral-600 rounded mt-1.5" />
                      </div>
                    ))}
                  </div>

                  {/* Booking system preview for premium */}
                  {activeTier === "premium" && (
                    <div className="mt-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-neutral-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={12} className="text-gray-500" />
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                          {lang === "nl" ? "Afspraak maken" : "Book appointment"}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {["Ma", "Di", "Wo", "Do"].map((d) => (
                          <div key={d} className="flex-1 text-center py-1.5 bg-gray-100 dark:bg-neutral-700 rounded text-[9px] text-gray-600 dark:text-gray-400">{d}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blog preview for pro+ */}
                  {(activeTier === "pro" || activeTier === "premium") && viewMode === "desktop" && (
                    <div className="mt-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-neutral-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={12} className="text-gray-500" />
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Blog</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="flex-1 h-2 bg-gray-200 dark:bg-neutral-600 rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features panel - takes 2/5 */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 p-6 h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">{tierInfo.label}</p>
                    <p className="text-2xl font-black dark:text-white">€{tierInfo.price}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-full text-[10px] font-bold text-gray-500 dark:text-gray-400">
                    {tier.pages} {lang === "nl" ? "pagina's" : "pages"}
                  </span>
                </div>

                <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  {lang === "nl" ? "Inbegrepen" : "Included"}
                </p>
                <ul className="space-y-2.5 mb-5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <f.icon size={13} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{f.label}</span>
                    </li>
                  ))}
                </ul>

                {extras.length > 0 && (
                  <>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                      {lang === "nl" ? "Extra's inbegrepen" : "Extras included"}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {extras.map((e, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check size={13} className="text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link
                  to={`/calculator?package=${activeTier}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-600 transition-colors"
                  data-testid="live-examples-cta"
                >
                  {lang === "nl" ? "Selecteer pakket" : "Select package"}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveExamples;
