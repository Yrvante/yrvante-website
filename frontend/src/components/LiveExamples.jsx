import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Monitor, Smartphone, ArrowRight, Check, Calendar, Globe, FileText, Search, Mail, Image, Users, Star, Clock, Phone, MapPin, Scissors, Wrench, Heart, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const industries = {
  nl: [
    { key: "kapper", label: "Kapper", icon: Scissors },
    { key: "loodgieter", label: "Loodgieter", icon: Wrench },
    { key: "coach", label: "Coach", icon: Heart },
    { key: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  ],
  en: [
    { key: "kapper", label: "Hairdresser", icon: Scissors },
    { key: "loodgieter", label: "Plumber", icon: Wrench },
    { key: "coach", label: "Coach", icon: Heart },
    { key: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  ],
};

const tiers = [
  { key: "basic", label: "Basis", price: "500" },
  { key: "pro", label: "Pro", price: "900" },
  { key: "premium", label: "Premium", price: "1400" },
];

const tierFeatures = {
  basic: {
    pages: 3,
    features: (l) => [
      { icon: Monitor, label: l === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: l === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Image, label: l === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: () => [],
  },
  pro: {
    pages: 10,
    features: (l) => [
      { icon: Monitor, label: l === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: l === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Search, label: l === "nl" ? "SEO optimalisatie" : "SEO optimization" },
      { icon: FileText, label: l === "nl" ? "Blog / Portfolio" : "Blog / Portfolio" },
      { icon: Image, label: l === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: (l) => [l === "nl" ? "Google Analytics" : "Google Analytics", l === "nl" ? "Social media links" : "Social media links"],
  },
  premium: {
    pages: 15,
    features: (l) => [
      { icon: Monitor, label: l === "nl" ? "Responsive design" : "Responsive design" },
      { icon: Mail, label: l === "nl" ? "Contactformulier" : "Contact form" },
      { icon: Search, label: l === "nl" ? "SEO optimalisatie" : "SEO optimization" },
      { icon: FileText, label: l === "nl" ? "Blog / Portfolio" : "Blog / Portfolio" },
      { icon: Calendar, label: l === "nl" ? "Boekingssysteem" : "Booking system" },
      { icon: Globe, label: l === "nl" ? "Meertalig" : "Multi-language" },
      { icon: Users, label: l === "nl" ? "Priority support" : "Priority support" },
      { icon: Image, label: l === "nl" ? "Hosting & SSL" : "Hosting & SSL" },
    ],
    extras: (l) => [
      "Google Analytics", l === "nl" ? "Social media links" : "Social media links",
      l === "nl" ? "Live chat widget" : "Live chat widget",
      l === "nl" ? "WhatsApp integratie" : "WhatsApp integration",
    ],
  },
};

/* ===== KAPPER — Elegant, warm, serif typography, rose/gold accents ===== */
const KapperPreview = ({ tier, lang, mobile }) => (
  <div className="h-full flex flex-col bg-gradient-to-b from-[#fdf6f0] to-[#f9ece2] dark:from-[#1a1412] dark:to-[#0f0c0a] min-h-[480px]">
    {/* Elegant nav with gold accent */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8d5c4] dark:border-[#2a2018]">
      <span className="text-xs tracking-[0.3em] uppercase text-[#8a6d52] dark:text-[#c4a882]" style={{ fontFamily: "Georgia, serif" }}>Salon Bella</span>
      <div className="hidden sm:flex gap-3 text-[9px] uppercase tracking-wider text-[#a08870] dark:text-[#8a7560]">
        <span>Home</span><span>{lang === "nl" ? "Diensten" : "Services"}</span><span>{lang === "nl" ? "Galerij" : "Gallery"}</span>
        {tier !== "basic" && <span>Blog</span>}
        {tier === "premium" && <span>{lang === "nl" ? "Boek" : "Book"}</span>}
      </div>
    </div>
    {/* Hero — large centered with elegant typography */}
    <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c4a882] to-[#8a6d52] mb-4 flex items-center justify-center">
        <Scissors size={22} className="text-white" />
      </div>
      <p className="text-[9px] uppercase tracking-[0.4em] text-[#a08870] dark:text-[#8a7560] mb-2">
        {lang === "nl" ? "Welkom bij" : "Welcome to"}
      </p>
      <h3 className={`${mobile ? "text-2xl" : "text-3xl sm:text-4xl"} font-bold text-[#3a2a1a] dark:text-[#e8d5c4] leading-tight mb-2`} style={{ fontFamily: "Georgia, serif" }}>
        Salon Bella
      </h3>
      <p className="text-xs text-[#8a6d52] dark:text-[#a08870] max-w-xs mb-5 italic" style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl" ? "Waar schoonheid en vakmanschap samenkomen" : "Where beauty meets craftsmanship"}
      </p>
      <div className="flex gap-2">
        <div className="px-5 py-2 bg-[#3a2a1a] dark:bg-[#e8d5c4] text-white dark:text-[#1a1412] text-[10px] font-bold uppercase tracking-wider rounded-full">
          {lang === "nl" ? "Maak afspraak" : "Book now"}
        </div>
        <div className="px-5 py-2 border border-[#c4a882] text-[#8a6d52] dark:text-[#c4a882] text-[10px] font-bold uppercase tracking-wider rounded-full">
          {lang === "nl" ? "Bekijk werk" : "View work"}
        </div>
      </div>
    </div>
    {/* Services — elegant cards */}
    <div className={`grid ${mobile ? "grid-cols-2" : "grid-cols-4"} gap-2 px-5 pb-3`}>
      {(lang === "nl" ? ["Knippen", "Kleuren", "Stylen", "Bridal"] : ["Haircut", "Color", "Styling", "Bridal"]).slice(0, mobile ? 2 : 4).map((s, i) => (
        <div key={i} className="bg-white/60 dark:bg-[#1a1412]/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#e8d5c4] dark:border-[#2a2018]">
          <p className="text-[10px] font-bold text-[#3a2a1a] dark:text-[#e8d5c4]" style={{ fontFamily: "Georgia, serif" }}>{s}</p>
          <p className="text-[8px] text-[#a08870] mt-0.5">{lang === "nl" ? "Vanaf" : "From"} €{25 + i * 10}</p>
        </div>
      ))}
    </div>
    {/* Reviews bar */}
    <div className="flex items-center justify-center gap-2 px-5 py-3 bg-[#3a2a1a]/5 dark:bg-white/5">
      <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#c4a882" className="text-[#c4a882]" />)}</div>
      <span className="text-[9px] text-[#8a6d52] dark:text-[#a08870]">4.9 - 127 reviews</span>
    </div>
    {/* Portfolio grid for pro+ */}
    {tier !== "basic" && (
      <div className={`grid ${mobile ? "grid-cols-3" : "grid-cols-6"} gap-1 px-5 pb-3`}>
        {[...Array(mobile ? 3 : 6)].map((_, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: `linear-gradient(${135 + i * 20}deg, #e8d5c4, #c4a882)` }} />
        ))}
      </div>
    )}
    {/* Booking for premium */}
    {tier === "premium" && (
      <div className="mx-5 mb-3 bg-white dark:bg-[#1a1412] rounded-xl p-3 border border-[#e8d5c4] dark:border-[#2a2018]">
        <p className="text-[9px] font-bold text-[#3a2a1a] dark:text-[#e8d5c4] mb-2" style={{ fontFamily: "Georgia, serif" }}>
          {lang === "nl" ? "Online reserveren" : "Book online"}
        </p>
        <div className="flex gap-1">
          {(lang === "nl" ? ["Ma", "Di", "Wo", "Do", "Vr", "Za"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]).map((d, i) => (
            <div key={d} className={`flex-1 text-center py-1.5 rounded text-[8px] ${i === 2 ? "bg-[#c4a882] text-white" : "bg-[#f9ece2] dark:bg-[#1a1412] text-[#8a6d52]"}`}>{d}</div>
          ))}
        </div>
      </div>
    )}
    {/* Footer */}
    <div className="px-5 py-2 border-t border-[#e8d5c4] dark:border-[#2a2018] flex justify-between items-center">
      <span className="text-[8px] text-[#a08870]">© Salon Bella</span>
      <div className="flex gap-2">
        {["Fb", "Ig"].map((s) => <span key={s} className="text-[8px] text-[#a08870]">{s}</span>)}
      </div>
    </div>
  </div>
);

/* ===== LOODGIETER — Industrial, bold, blue/steel accents, trust-focused ===== */
const LoodgieterPreview = ({ tier, lang, mobile }) => (
  <div className="h-full flex flex-col bg-white dark:bg-[#0c1117] min-h-[480px]">
    {/* Industrial top bar */}
    <div className="bg-[#1a2332] px-5 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Phone size={10} className="text-[#4dabf7]" />
        <span className="text-[9px] text-gray-300 font-bold">06-12345678</span>
      </div>
      <span className="text-[9px] text-[#4dabf7] font-bold uppercase tracking-wider">
        24/7 {lang === "nl" ? "Bereikbaar" : "Available"}
      </span>
    </div>
    {/* Nav */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-[#1a2332]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#4dabf7] flex items-center justify-center">
          <Wrench size={14} className="text-white" />
        </div>
        <div>
          <span className="text-xs font-black text-[#1a2332] dark:text-white block leading-none">JANSEN</span>
          <span className="text-[8px] text-gray-400 uppercase tracking-wider">{lang === "nl" ? "Loodgieters" : "Plumbing"}</span>
        </div>
      </div>
      <div className="hidden sm:flex gap-3 text-[9px] font-bold uppercase text-gray-500">
        <span>{lang === "nl" ? "Diensten" : "Services"}</span>
        <span>{lang === "nl" ? "Spoed" : "Emergency"}</span>
        {tier !== "basic" && <span>{lang === "nl" ? "Projecten" : "Projects"}</span>}
        <span>Contact</span>
      </div>
    </div>
    {/* Hero — split with emergency CTA */}
    <div className="flex-1 px-5 py-5 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="px-2 py-0.5 bg-green-500 rounded-full flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-[8px] text-white font-bold">{lang === "nl" ? "Beschikbaar" : "Available"}</span>
        </div>
        <span className="text-[9px] text-gray-400">{lang === "nl" ? "Reactie binnen 30 min" : "Response within 30 min"}</span>
      </div>
      <h3 className={`${mobile ? "text-xl" : "text-2xl sm:text-3xl"} font-black text-[#1a2332] dark:text-white leading-tight mb-2`}>
        {lang === "nl" ? "Vakmanschap.\nBetrouwbaar.\nSnel." : "Craftsmanship.\nReliable.\nFast."}
      </h3>
      <p className="text-[10px] text-gray-500 max-w-xs mb-4 leading-relaxed">
        {lang === "nl"
          ? "Van lekkages tot complete badkamerverbouwingen. Gecertificeerd en verzekerd."
          : "From leaks to complete bathroom renovations. Certified and insured."}
      </p>
      <div className="flex gap-2 flex-wrap">
        <div className="px-4 py-2 bg-[#4dabf7] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
          {lang === "nl" ? "Bel direct" : "Call now"}
        </div>
        <div className="px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
          {lang === "nl" ? "Spoed? Klik hier" : "Emergency?"}
        </div>
      </div>
    </div>
    {/* Services grid — industrial style */}
    <div className={`grid ${mobile ? "grid-cols-2" : "grid-cols-4"} gap-2 px-5 pb-3`}>
      {[
        { name: lang === "nl" ? "Lekkages" : "Leaks", icon: "💧" },
        { name: lang === "nl" ? "CV-ketel" : "Boiler", icon: "🔥" },
        { name: lang === "nl" ? "Riool" : "Sewer", icon: "🔧" },
        { name: lang === "nl" ? "Badkamer" : "Bathroom", icon: "🚿" },
      ].slice(0, mobile ? 2 : 4).map((s, i) => (
        <div key={i} className="bg-[#f0f4f8] dark:bg-[#1a2332] rounded-xl p-3 border border-gray-200 dark:border-[#2a3342]">
          <p className="text-sm mb-1">{s.icon}</p>
          <p className="text-[10px] font-black text-[#1a2332] dark:text-white uppercase">{s.name}</p>
          <div className="h-1 w-1/2 bg-[#4dabf7] rounded mt-1" />
        </div>
      ))}
    </div>
    {/* Trust badges */}
    <div className="flex items-center justify-center gap-4 px-5 py-3 bg-[#f0f4f8] dark:bg-[#1a2332]">
      {[
        { n: "500+", l: lang === "nl" ? "Klanten" : "Clients" },
        { n: "24/7", l: lang === "nl" ? "Service" : "Service" },
        { n: "4.8", l: "Google" },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <p className="text-sm font-black text-[#1a2332] dark:text-white">{s.n}</p>
          <p className="text-[7px] text-gray-400 uppercase tracking-wider">{s.l}</p>
        </div>
      ))}
    </div>
    {/* Blog for pro+ */}
    {tier !== "basic" && (
      <div className="mx-5 my-2 bg-[#f0f4f8] dark:bg-[#1a2332] rounded-xl p-3 border border-gray-200 dark:border-[#2a3342]">
        <div className="flex items-center gap-2 mb-1.5">
          <FileText size={10} className="text-[#4dabf7]" />
          <span className="text-[9px] font-bold text-[#1a2332] dark:text-white uppercase">{lang === "nl" ? "Laatste projecten" : "Latest projects"}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex-1 h-2 bg-gray-200 dark:bg-[#2a3342] rounded" />
          ))}
        </div>
      </div>
    )}
    {/* Booking for premium */}
    {tier === "premium" && (
      <div className="mx-5 mb-2 bg-white dark:bg-[#0c1117] rounded-xl p-3 border-2 border-[#4dabf7]">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={11} className="text-[#4dabf7]" />
          <span className="text-[9px] font-bold text-[#1a2332] dark:text-white">{lang === "nl" ? "Plan een afspraak" : "Schedule appointment"}</span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {["09:00", "10:00", "11:00", "14:00", "15:00"].map((t, i) => (
            <div key={t} className={`text-center py-1 rounded text-[8px] font-bold ${i === 1 ? "bg-[#4dabf7] text-white" : "bg-[#f0f4f8] dark:bg-[#1a2332] text-gray-500"}`}>{t}</div>
          ))}
        </div>
      </div>
    )}
    {/* Footer */}
    <div className="px-5 py-2 border-t border-gray-200 dark:border-[#1a2332] flex justify-between items-center mt-auto">
      <span className="text-[8px] text-gray-400">© Jansen Loodgieters</span>
      <div className="flex items-center gap-1">
        <MapPin size={8} className="text-gray-400" />
        <span className="text-[8px] text-gray-400">Amsterdam</span>
      </div>
    </div>
  </div>
);

/* ===== COACH — Serene, minimal, green/teal, lots of whitespace ===== */
const CoachPreview = ({ tier, lang, mobile }) => (
  <div className="h-full flex flex-col bg-[#f7faf8] dark:bg-[#0a100e] min-h-[480px]">
    {/* Minimal nav */}
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-xs font-light text-[#2d5a45] dark:text-[#7bc4a5] tracking-widest uppercase">Lisa</span>
      <div className="hidden sm:flex gap-4 text-[9px] text-[#6b8f7e] dark:text-[#5a8b72]">
        <span>{lang === "nl" ? "Over mij" : "About"}</span>
        <span>{lang === "nl" ? "Aanbod" : "Services"}</span>
        {tier !== "basic" && <span>{lang === "nl" ? "Verhalen" : "Stories"}</span>}
        {tier === "premium" && <span>{lang === "nl" ? "Boek sessie" : "Book session"}</span>}
        <span>Contact</span>
      </div>
    </div>
    {/* Hero — lots of breathing room, centered, minimal */}
    <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-8">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7bc4a5] to-[#2d5a45] mb-5 flex items-center justify-center">
        <Heart size={28} className="text-white" />
      </div>
      <p className="text-[9px] uppercase tracking-[0.5em] text-[#6b8f7e] dark:text-[#5a8b72] mb-3">
        Mindset Coach
      </p>
      <h3 className={`${mobile ? "text-xl" : "text-2xl sm:text-4xl"} font-light text-[#1a3a2a] dark:text-[#d4e8dc] leading-tight mb-3`} style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl" ? "Vind rust.\nVind balans.\nVind jezelf." : "Find peace.\nFind balance.\nFind yourself."}
      </h3>
      <p className="text-[10px] text-[#6b8f7e] dark:text-[#5a8b72] max-w-xs mb-6 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl"
          ? "Persoonlijke coaching om je te begeleiden naar een leven vol vertrouwen en rust."
          : "Personal coaching to guide you to a life of confidence and peace."}
      </p>
      <div className="px-8 py-3 border border-[#7bc4a5] text-[#2d5a45] dark:text-[#7bc4a5] text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#2d5a45] hover:text-white transition-colors">
        {lang === "nl" ? "Gratis kennismaking" : "Free introduction"}
      </div>
    </div>
    {/* Approach cards — clean, spaced */}
    <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-3"} gap-3 px-5 pb-4`}>
      {[
        { title: lang === "nl" ? "1-op-1 coaching" : "1-on-1 coaching", sub: lang === "nl" ? "Persoonlijk traject" : "Personal journey" },
        { title: lang === "nl" ? "Workshops" : "Workshops", sub: lang === "nl" ? "In groep leren" : "Group learning" },
        { title: lang === "nl" ? "Online sessies" : "Online sessions", sub: lang === "nl" ? "Waar je ook bent" : "Wherever you are" },
      ].slice(0, mobile ? 2 : 3).map((s, i) => (
        <div key={i} className="bg-white/70 dark:bg-[#0a100e]/70 rounded-2xl p-4 text-center border border-[#d4e8dc] dark:border-[#1a3a2a]">
          <p className="text-[10px] font-bold text-[#2d5a45] dark:text-[#7bc4a5] mb-0.5">{s.title}</p>
          <p className="text-[8px] text-[#6b8f7e]">{s.sub}</p>
        </div>
      ))}
    </div>
    {/* Testimonial */}
    <div className="mx-5 mb-3 bg-white dark:bg-[#0f1a15] rounded-2xl p-4 border border-[#d4e8dc] dark:border-[#1a3a2a] text-center">
      <div className="flex justify-center gap-0.5 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={9} fill="#7bc4a5" className="text-[#7bc4a5]" />)}</div>
      <p className="text-[9px] text-[#6b8f7e] italic" style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl"
          ? '"Lisa heeft mij geholpen om weer rust te vinden in mijn leven."'
          : '"Lisa helped me find peace in my life again."'}
      </p>
      <p className="text-[8px] text-[#6b8f7e] mt-1">— {lang === "nl" ? "Anne, 34" : "Anne, 34"}</p>
    </div>
    {/* Blog for pro+ */}
    {tier !== "basic" && (
      <div className="mx-5 mb-3 flex gap-2">
        {[lang === "nl" ? "5 tips voor meer rust" : "5 tips for peace", lang === "nl" ? "Loslaten in 3 stappen" : "Letting go in 3 steps"].map((t, i) => (
          <div key={i} className="flex-1 bg-white/70 dark:bg-[#0f1a15] rounded-xl p-2.5 border border-[#d4e8dc] dark:border-[#1a3a2a]">
            <p className="text-[8px] font-bold text-[#2d5a45] dark:text-[#7bc4a5]">{t}</p>
            <div className="h-1 w-2/3 bg-[#d4e8dc] dark:bg-[#1a3a2a] rounded mt-1" />
          </div>
        ))}
      </div>
    )}
    {/* Booking for premium */}
    {tier === "premium" && (
      <div className="mx-5 mb-3 bg-[#2d5a45] rounded-2xl p-4 text-center">
        <Calendar size={14} className="text-[#7bc4a5] mx-auto mb-2" />
        <p className="text-[9px] text-[#7bc4a5] font-bold mb-1">{lang === "nl" ? "Plan je sessie" : "Book your session"}</p>
        <div className="flex gap-1 justify-center">
          {["10:00", "13:00", "16:00"].map((t, i) => (
            <div key={t} className={`px-3 py-1 rounded-full text-[8px] ${i === 0 ? "bg-[#7bc4a5] text-[#0a100e]" : "bg-[#1a3a2a] text-[#7bc4a5]"}`}>{t}</div>
          ))}
        </div>
      </div>
    )}
    {/* Footer */}
    <div className="px-5 py-3 text-center">
      <p className="text-[8px] text-[#6b8f7e] tracking-widest uppercase">© Coach Lisa — {lang === "nl" ? "Groei begint bij jou" : "Growth starts with you"}</p>
    </div>
  </div>
);

/* ===== RESTAURANT — Warm, rich, amber/burgundy, food-focused ===== */
const RestaurantPreview = ({ tier, lang, mobile }) => (
  <div className="h-full flex flex-col bg-[#faf5f0] dark:bg-[#120e0a] min-h-[480px]">
    {/* Top bar */}
    <div className="bg-[#2c1810] px-5 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock size={9} className="text-[#d4a574]" />
        <span className="text-[8px] text-[#d4a574]">{lang === "nl" ? "Di-Zo: 17:00 - 23:00" : "Tue-Sun: 5PM - 11PM"}</span>
      </div>
      <span className="text-[8px] text-[#d4a574]">020-1234567</span>
    </div>
    {/* Nav */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8ddd0] dark:border-[#2c1810]">
      <div className="text-center">
        <span className="text-lg font-bold text-[#2c1810] dark:text-[#d4a574] block leading-none" style={{ fontFamily: "Georgia, serif" }}>Trattoria</span>
        <span className="text-[8px] tracking-[0.4em] uppercase text-[#a0866a] dark:text-[#8a7050]">Napoli</span>
      </div>
      <div className="hidden sm:flex gap-3 text-[9px] uppercase tracking-wider text-[#a0866a]">
        <span>Menu</span>
        <span>{lang === "nl" ? "Over ons" : "About"}</span>
        {tier !== "basic" && <span>Blog</span>}
        <span>{lang === "nl" ? "Reserveer" : "Reserve"}</span>
      </div>
    </div>
    {/* Hero — atmospheric */}
    <div className="bg-gradient-to-br from-[#2c1810] to-[#1a0f08] px-5 py-6 text-center">
      <p className="text-[9px] tracking-[0.5em] uppercase text-[#d4a574] mb-2">{lang === "nl" ? "Authentiek Italiaans" : "Authentic Italian"}</p>
      <h3 className={`${mobile ? "text-xl" : "text-2xl sm:text-3xl"} font-bold text-white leading-tight mb-2`} style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl" ? "Proef het verschil" : "Taste the difference"}
      </h3>
      <p className="text-[9px] text-[#a0866a] mb-4 italic" style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl" ? "Familierecept sinds 1968" : "Family recipe since 1968"}
      </p>
      <div className="flex gap-2 justify-center">
        <div className="px-5 py-2 bg-[#d4a574] text-[#2c1810] text-[10px] font-bold uppercase tracking-wider rounded-full">
          {lang === "nl" ? "Reserveer nu" : "Reserve now"}
        </div>
        <div className="px-5 py-2 border border-[#d4a574] text-[#d4a574] text-[10px] font-bold uppercase tracking-wider rounded-full">
          Menu
        </div>
      </div>
    </div>
    {/* Menu highlights */}
    <div className="flex-1 px-5 py-4">
      <p className="text-[9px] uppercase tracking-[0.3em] text-[#a0866a] mb-3 text-center">{lang === "nl" ? "Uit onze keuken" : "From our kitchen"}</p>
      <div className={`grid ${mobile ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
        {[
          { name: lang === "nl" ? "Pasta Carbonara" : "Pasta Carbonara", price: "€16" },
          { name: lang === "nl" ? "Pizza Margherita" : "Pizza Margherita", price: "€14" },
          { name: lang === "nl" ? "Ossobuco" : "Ossobuco", price: "€24" },
          { name: lang === "nl" ? "Tiramisu" : "Tiramisu", price: "€9" },
        ].slice(0, mobile ? 2 : 4).map((d, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-[#e8ddd0] dark:border-[#2c1810]">
            <span className="text-[10px] text-[#2c1810] dark:text-[#d4a574]" style={{ fontFamily: "Georgia, serif" }}>{d.name}</span>
            <span className="text-[10px] font-bold text-[#a0866a]">{d.price}</span>
          </div>
        ))}
      </div>
    </div>
    {/* Reviews */}
    <div className="mx-5 mb-3 bg-[#2c1810] rounded-xl p-3 text-center">
      <div className="flex justify-center gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} size={9} fill="#d4a574" className="text-[#d4a574]" />)}</div>
      <p className="text-[8px] text-[#a0866a] italic" style={{ fontFamily: "Georgia, serif" }}>
        {lang === "nl" ? '"Beste Italiaan van Amsterdam!"' : '"Best Italian in Amsterdam!"'}
      </p>
    </div>
    {/* Reservation for premium */}
    {tier === "premium" && (
      <div className="mx-5 mb-3 bg-white dark:bg-[#120e0a] rounded-xl p-3 border-2 border-[#d4a574]">
        <p className="text-[9px] font-bold text-[#2c1810] dark:text-[#d4a574] mb-2" style={{ fontFamily: "Georgia, serif" }}>
          {lang === "nl" ? "Online reserveren" : "Reserve online"}
        </p>
        <div className="flex gap-1">
          {["18:00", "19:00", "20:00", "21:00"].map((t, i) => (
            <div key={t} className={`flex-1 text-center py-1.5 rounded text-[8px] font-bold ${i === 1 ? "bg-[#d4a574] text-white" : "bg-[#faf5f0] dark:bg-[#1a0f08] text-[#a0866a]"}`}>{t}</div>
          ))}
        </div>
      </div>
    )}
    {/* Footer */}
    <div className="px-5 py-2 border-t border-[#e8ddd0] dark:border-[#2c1810] flex justify-between items-center mt-auto">
      <span className="text-[8px] text-[#a0866a]">© Trattoria Napoli</span>
      <div className="flex items-center gap-1">
        <MapPin size={8} className="text-[#a0866a]" />
        <span className="text-[8px] text-[#a0866a]">Amsterdam</span>
      </div>
    </div>
  </div>
);

const previewComponents = {
  kapper: KapperPreview,
  loodgieter: LoodgieterPreview,
  coach: CoachPreview,
  restaurant: RestaurantPreview,
};

const LiveExamples = () => {
  const { language } = useLanguage();
  const [activeIndustry, setActiveIndustry] = useState("kapper");
  const [activeTier, setActiveTier] = useState("pro");
  const [viewMode, setViewMode] = useState("desktop");

  const ind = industries[language] || industries.nl;
  const lang = language || "nl";
  const tier = tierFeatures[activeTier];
  const tierInfo = tiers.find((t) => t.key === activeTier);
  const features = tier.features(lang);
  const extras = tier.extras ? tier.extras(lang) : [];
  const PreviewComponent = previewComponents[activeIndustry];

  return (
    <section data-testid="live-examples-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-3">
            {language === "nl" ? "BEKIJK WAT JE KRIJGT" : "SEE WHAT YOU GET"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm">
            {language === "nl"
              ? "Elke branche krijgt een uniek design. Kies hieronder en bekijk het live."
              : "Each industry gets a unique design. Choose below and see it live."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="flex gap-1.5 flex-wrap justify-center">
            {ind.map((i) => (
              <button
                key={i.key}
                onClick={() => setActiveIndustry(i.key)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeIndustry === i.key
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
                data-testid={`example-industry-${i.key}`}
              >
                <i.icon size={12} />
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

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Preview */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndustry}-${activeTier}-${viewMode}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={`bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-lg mx-auto ${
                  viewMode === "mobile" ? "max-w-[320px]" : "w-full"
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
                    {activeIndustry === "kapper" ? "salonbella.nl" : activeIndustry === "loodgieter" ? "jansenloodgieters.nl" : activeIndustry === "coach" ? "coachlisa.nl" : "trattorianapoli.nl"}
                  </div>
                </div>
                <PreviewComponent tier={activeTier} lang={lang} mobile={viewMode === "mobile"} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features panel */}
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
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">{lang === "nl" ? "Inbegrepen" : "Included"}</p>
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
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">{lang === "nl" ? "Extra's inbegrepen" : "Extras included"}</p>
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
