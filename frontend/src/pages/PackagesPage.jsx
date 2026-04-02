import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { ArrowLeft, ArrowRight, Check, Star, Zap, Shield, Calendar, Globe, Mail, Users, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import CompetitorComparison from "../components/CompetitorComparison";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";
const BG_IMAGE = "/bg-pattern.jpg";

const BookingDemoWidget = ({ language }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const days = [
    { day: 'Ma', date: '16', avail: true },
    { day: 'Di', date: '17', avail: true },
    { day: 'Wo', date: '18', avail: false },
    { day: 'Do', date: '19', avail: true },
    { day: 'Vr', date: '20', avail: true },
  ];
  const times = ['09:00', '10:30', '12:00', '14:00', '15:30'];

  const reset = () => { setConfirmed(false); setSelectedDay(null); setSelectedTime(null); };

  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
      {/* App header bar */}
      <div className="bg-gray-900 px-5 py-4 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 text-center">
          jouwbedrijf.nl/afspraken
        </div>
      </div>

      {/* Booking content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="confirmed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check size={28} className="text-green-600" />
              </motion.div>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                {language === 'nl' ? 'Afspraak bevestigd!' : 'Appointment confirmed!'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                {language === 'nl' ? 'Bevestiging verstuurd naar jouw email' : 'Confirmation sent to your email'}
              </p>
              <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-700 dark:text-gray-300 underline transition-colors">
                {language === 'nl' ? 'Nieuwe afspraak maken' : 'Make new appointment'}
              </button>
            </motion.div>
          ) : (
            <motion.div key="booking" initial={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  {language === 'nl' ? 'Afspraak maken' : 'Book appointment'}
                </p>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                  {language === 'nl' ? 'Feb 2026' : 'Feb 2026'}
                </span>
              </div>

              {/* Day selector */}
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                {language === 'nl' ? 'Kies een dag' : 'Choose a day'}
              </p>
              <div className="flex gap-1.5 mb-4">
                {days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => { if (d.avail) { setSelectedDay(i); setSelectedTime(null); } }}
                    disabled={!d.avail}
                    className={`flex-1 py-2.5 rounded-xl text-center transition-all ${
                      selectedDay === i
                        ? 'bg-gray-900 dark:bg-neutral-800 text-white shadow-lg'
                        : d.avail
                        ? 'bg-gray-100 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                    }`}
                  >
                    <p className="text-xs font-medium leading-none mb-0.5">{d.day}</p>
                    <p className="text-sm font-bold leading-none">{d.date}</p>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDay !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      {language === 'nl' ? 'Kies een tijd' : 'Choose a time'}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {times.map((time, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTime(i)}
                          className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === i
                              ? 'bg-gray-900 dark:bg-neutral-800 text-white shadow-md'
                              : 'border border-gray-200 dark:border-neutral-700 text-gray-600 hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm button */}
              <AnimatePresence>
                {selectedTime !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setConfirmed(true)}
                    className="w-full py-3.5 bg-gray-900 dark:bg-neutral-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors mb-3"
                  >
                    <Check size={16} />
                    {language === 'nl' ? 'Afspraak bevestigen' : 'Confirm appointment'}
                  </motion.button>
                )}
              </AnimatePresence>

              {selectedDay === null && (
                <p className="text-xs text-center text-gray-400 py-2">
                  {language === 'nl' ? 'Klik op een dag om te beginnen' : 'Click a day to get started'}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RebrandingPakketDemo = ({ isPopular, language }) => (
  <div className={`mt-5 rounded-2xl overflow-hidden border ${isPopular ? 'border-gray-500' : 'border-gray-200 dark:border-neutral-700'}`}>
    <div className={`${isPopular ? 'bg-gray-800' : 'bg-gray-900'} px-3 py-2 flex items-center justify-between`}>
      <p className="text-xs text-gray-400">{language === 'nl' ? 'Voor' : 'Before'}</p>
      <ArrowRight size={12} className="text-gray-500" />
      <p className="text-xs text-green-400 font-medium">{language === 'nl' ? 'Na' : 'After'}</p>
    </div>
    <div className="grid grid-cols-2">
      <div className={`${isPopular ? 'bg-gray-700' : 'bg-gray-100 dark:bg-neutral-800'} p-3 border-r ${isPopular ? 'border-gray-600' : 'border-gray-200 dark:border-neutral-700'}`}>
        <div className="space-y-1.5 opacity-50">
          <div className={`h-2 w-16 ${isPopular ? 'bg-gray-500' : 'bg-gray-300 dark:bg-neutral-600'} rounded-full`} />
          <div className={`h-1.5 ${isPopular ? 'bg-gray-600' : 'bg-gray-200 dark:bg-neutral-700'} rounded-full`} />
          <div className={`h-1.5 ${isPopular ? 'bg-gray-600' : 'bg-gray-200 dark:bg-neutral-700'} rounded-full w-4/5`} />
          <div className={`h-6 ${isPopular ? 'bg-gray-600' : 'bg-gray-200 dark:bg-neutral-700'} rounded mt-2`} />
        </div>
      </div>
      <div className={`${isPopular ? 'bg-gray-700' : 'bg-gray-50 dark:bg-neutral-800'} p-3`}>
        <div className="space-y-1.5">
          <div className={`h-2 w-16 ${isPopular ? 'bg-gray-400' : 'bg-gray-900 dark:bg-white'} rounded-full`} />
          <div className={`h-1.5 ${isPopular ? 'bg-gray-500' : 'bg-gray-400 dark:bg-neutral-400'} rounded-full`} />
          <div className={`h-1.5 ${isPopular ? 'bg-gray-500' : 'bg-gray-400 dark:bg-neutral-400'} rounded-full w-4/5`} />
          <div className={`h-6 ${isPopular ? 'bg-green-600' : 'bg-gray-900 dark:bg-white'} rounded mt-2`} />
        </div>
      </div>
    </div>
  </div>
);

// --- Pakket Demo Components (monochroom) ---

const BasisPakketDemo = ({ isPopular, language }) => (
  <div className={`mt-5 rounded-2xl overflow-hidden border ${isPopular ? 'border-gray-500' : 'border-gray-200'}`}>
    <div className={`${isPopular ? 'bg-gray-800' : 'bg-gray-900'} px-3 py-2 flex items-center gap-3`}>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
      </div>
      <div className="flex gap-1.5">
        {['Home', language === 'nl' ? 'Over' : 'About', 'Contact'].map((page, i) => (
          <span key={i} className={`text-xs px-2 py-0.5 rounded transition-all ${i === 0 ? 'bg-white/20 text-white font-medium' : 'text-gray-500'}`}>{page}</span>
        ))}
      </div>
    </div>
    <div className={`${isPopular ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
      <div className={`h-2.5 w-32 mx-auto ${isPopular ? 'bg-gray-500' : 'bg-gray-300'} rounded-full mb-3`} />
      <div className="space-y-1.5 mb-3">
        <div className={`h-1.5 ${isPopular ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`} />
        <div className={`h-1.5 ${isPopular ? 'bg-gray-600' : 'bg-gray-200'} rounded-full w-4/5`} />
        <div className={`h-1.5 ${isPopular ? 'bg-gray-600' : 'bg-gray-200'} rounded-full w-3/5`} />
      </div>
      <div className={`text-center text-xs pt-2 border-t ${isPopular ? 'border-gray-600 text-gray-400' : 'border-gray-100 text-gray-400'}`}>
        {language === 'nl' ? 'Mobiel & Desktop' : 'Mobile & Desktop'}
      </div>
    </div>
  </div>
);

const ProPakketDemo = ({ isPopular, language }) => {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className={`mt-5 rounded-2xl border p-4 text-center ${isPopular ? 'border-gray-500 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${isPopular ? 'bg-gray-500' : 'bg-gray-900'}`}>
        <Check size={14} className="text-white" />
      </div>
      <p className={`text-xs font-bold ${isPopular ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{language === 'nl' ? 'Bericht ontvangen!' : 'Message received!'}</p>
      <button onClick={(e) => { e.stopPropagation(); setSent(false); }} className={`text-xs underline mt-1 ${isPopular ? 'text-gray-400' : 'text-gray-400'}`}>{language === 'nl' ? 'opnieuw' : 'again'}</button>
    </motion.div>
  );
  return (
    <div className={`mt-5 rounded-2xl overflow-hidden border ${isPopular ? 'border-gray-500' : 'border-gray-200'}`}>
      <div className={`${isPopular ? 'bg-gray-800' : 'bg-gray-900'} px-3 py-2 text-center`}>
        <p className="text-xs text-gray-400">{language === 'nl' ? 'Contactformulier' : 'Contact form'}</p>
      </div>
      <div className={`${isPopular ? 'bg-gray-700' : 'bg-gray-50'} p-3 space-y-2`}>
        <div className={`rounded-xl border px-3 py-2 ${isPopular ? 'border-gray-600 bg-gray-600' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isPopular ? 'text-gray-500' : 'text-gray-300'}`}>Naam...</p>
        </div>
        <div className={`rounded-xl border px-3 py-2 ${isPopular ? 'border-gray-600 bg-gray-600' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isPopular ? 'text-gray-500' : 'text-gray-300'}`}>Email...</p>
        </div>
        <div className={`rounded-xl border px-3 py-2 h-10 ${isPopular ? 'border-gray-600 bg-gray-600' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isPopular ? 'text-gray-500' : 'text-gray-300'}`}>Bericht...</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setSent(true); }}
          className={`w-full py-2 text-xs font-bold rounded-xl transition-colors ${isPopular ? 'bg-gray-500 text-white hover:bg-gray-400' : 'bg-gray-900 dark:bg-neutral-800 text-white hover:bg-gray-700'}`}>
          {language === 'nl' ? 'Verstuur' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const PremiumPakketDemo = ({ isPopular, language }) => {
  const [lang, setLang] = useState('nl');
  const [selDay, setSelDay] = useState(1);
  const texts = { nl: 'Welkom!', en: 'Welcome!', de: 'Willkommen!' };
  const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr'];
  return (
    <div className={`mt-5 rounded-2xl overflow-hidden border ${isPopular ? 'border-gray-500' : 'border-gray-200'}`}>
      <div className={`${isPopular ? 'bg-gray-800' : 'bg-gray-900'} px-3 py-2 flex items-center justify-between`}>
        <div className="flex gap-1">
          {[['nl', 'NL'], ['en', 'EN'], ['de', 'DE']].map(([code, label]) => (
            <button key={code} onClick={(e) => { e.stopPropagation(); setLang(code); }}
              className={`text-xs px-2 py-0.5 rounded transition-all ${lang === code ? 'bg-white/20 text-white font-medium' : 'text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
        <motion.span key={lang} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-gray-400">{texts[lang]}</motion.span>
      </div>
      <div className={`${isPopular ? 'bg-gray-700' : 'bg-gray-50'} p-3`}>
        <p className={`text-xs text-center mb-2 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'nl' ? 'Afspraak maken' : 'Book appointment'}</p>
        <div className="flex gap-1.5">
          {days.map((d, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setSelDay(i); }}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                selDay === i
                  ? isPopular ? 'bg-gray-500 text-white' : 'bg-gray-900 dark:bg-neutral-800 text-white'
                  : isPopular ? 'bg-gray-600 text-gray-400' : 'bg-white/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 text-gray-600'
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Extra Mogelijkheden Demo Components ---

const ExtraPagesDemo = ({ language }) => (
  <div className="mt-4 rounded-xl overflow-hidden border border-gray-100">
    <div className="bg-gray-900 px-3 py-2 flex items-center gap-2">
      <div className="flex gap-1 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex gap-1.5 overflow-x-auto">
        {['Home', 'Over', 'Diensten', 'Blog +', 'Portfolio +', 'FAQ +'].map((p, i) => (
          <span key={i} className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${i >= 3 ? 'bg-green-500/25 text-green-400 font-semibold' : 'text-gray-500'}`}>{p}</span>
        ))}
      </div>
    </div>
    <div className="bg-gray-50 px-3 py-2 flex items-center gap-2">
      <Check size={12} className="text-green-500 flex-shrink-0" />
      <p className="text-xs text-green-700 font-medium">{language === 'nl' ? '3 extra pagina\'s toegevoegd' : '3 extra pages added'}</p>
    </div>
  </div>
);

const MultiLangDemo = ({ language }) => {
  const [lang, setLang] = useState('nl');
  const texts = {
    nl: { g: 'Welkom op mijn website', s: 'Neem gerust contact op' },
    en: { g: 'Welcome to my website', s: 'Feel free to contact me' },
    de: { g: 'Willkommen auf meiner Website', s: 'Kontakt aufnehmen' },
  };
  return (
    <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-900 px-3 py-2 flex items-center justify-center gap-2">
        {[['nl', '🇳🇱'], ['en', '🇬🇧'], ['de', '🇩🇪']].map(([code, flag]) => (
          <button key={code} onClick={(e) => { e.stopPropagation(); setLang(code); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${lang === code ? 'bg-white text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-white'}`}>
            {flag} {code.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="bg-gray-50 p-3 text-center">
        <motion.p key={lang} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">{texts[lang].g}</motion.p>
        <p className="text-xs text-gray-400">{texts[lang].s}</p>
      </div>
    </div>
  );
};

const ContactFormDemo = ({ language }) => {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
      <Check size={18} className="text-green-600 mx-auto mb-1" />
      <p className="text-xs font-bold text-green-700">{language === 'nl' ? 'Bericht verzonden!' : 'Message sent!'}</p>
      <button onClick={(e) => { e.stopPropagation(); setSent(false); }} className="text-xs text-green-500 underline mt-1">{language === 'nl' ? 'opnieuw' : 'again'}</button>
    </motion.div>
  );
  return (
    <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 p-3 space-y-2">
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2"><p className="text-xs text-gray-300">{language === 'nl' ? 'Jouw naam...' : 'Your name...'}</p></div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2"><p className="text-xs text-gray-300">{language === 'nl' ? 'jij@email.nl' : 'you@email.com'}</p></div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2 h-10"><p className="text-xs text-gray-300">{language === 'nl' ? 'Jouw bericht...' : 'Your message...'}</p></div>
        <button onClick={(e) => { e.stopPropagation(); setSent(true); }}
          className="w-full py-2 bg-gray-900 dark:bg-neutral-800 text-white text-xs font-bold rounded-lg hover:bg-gray-700 transition-colors">
          {language === 'nl' ? 'Verstuur bericht' : 'Send message'}
        </button>
      </div>
    </div>
  );
};

const MaintenanceDemo = ({ language }) => (
  <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
    <div className="bg-gray-900 px-3 py-2 flex items-center justify-between">
      <p className="text-xs font-bold text-green-400">{language === 'nl' ? 'Alles Operationeel' : 'All Systems Go'}</p>
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    </div>
    <div className="bg-gray-50 px-3 py-2 divide-y divide-gray-100">
      {[language === 'nl' ? 'Server Online' : 'Server Online', 'SSL Certificaat', language === 'nl' ? 'Backup Vandaag' : 'Backup Today', language === 'nl' ? 'Updates: OK' : 'Updates: OK'].map((label, i) => (
        <div key={i} className="flex items-center justify-between py-1.5">
          <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
          <span className="text-xs text-green-600 font-bold flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> OK</span>
        </div>
      ))}
    </div>
  </div>
);

const BookingMiniDemo = ({ language }) => {
  const [sel, setSel] = useState(1);
  const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr'];
  return (
    <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-900 px-3 py-2">
        <p className="text-xs text-gray-400 text-center">{language === 'nl' ? 'Afspraak maken' : 'Book appointment'}</p>
      </div>
      <div className="bg-gray-50 p-3">
        <div className="flex gap-1.5 mb-2">
          {days.map((d, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setSel(i); }}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${sel === i ? 'bg-gray-900 dark:bg-neutral-800 text-white' : 'bg-white/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 text-gray-600 hover:border-gray-400'}`}>
              {d}
            </button>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400">{language === 'nl' ? 'Kies een tijdslot →' : 'Choose a time slot →'}</p>
      </div>
    </div>
  );
};

const FastDeliveryDemo = ({ language }) => {
  const steps = [
    { label: language === 'nl' ? 'Gesprek' : 'Consult', done: true },
    { label: language === 'nl' ? 'Week 1' : 'Week 1', done: true },
    { label: language === 'nl' ? 'Week 2' : 'Week 2', done: false, active: true },
    { label: language === 'nl' ? 'Live!' : 'Live!', done: false },
  ];
  return (
    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
      <div className="flex items-center gap-1 mb-1.5">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.done ? 'bg-gray-900 dark:bg-neutral-800 text-white' : s.active ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
              {s.done ? <Check size={12} /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${s.done ? 'bg-gray-900' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <span key={i} className={`text-xs flex-1 text-center ${s.active ? 'text-gray-900 dark:text-gray-100 font-bold' : s.done ? 'text-gray-500' : 'text-gray-300'}`}>{s.label}</span>
        ))}
      </div>
    </div>
  );
};

// --- End Demo Components ---

const PackagesPage = () => {
  const { language } = useLanguage();

  const packages = [
    {
      id: 'rebranding',
      name: language === 'nl' ? 'Rebranding Website' : 'Rebranding Website',
      price: 349,
      description: language === 'nl' 
        ? 'Heeft je website een opfrisbeurt nodig? Ik geef je bestaande site een compleet nieuw uiterlijk.'
        : 'Does your website need a refresh? I give your existing site a completely new look.',
      includes: [
        language === 'nl' ? 'Compleet nieuw design voor bestaande website' : 'Complete new design for existing website',
        language === 'nl' ? 'Moderne layout & styling' : 'Modern layout & styling',
        language === 'nl' ? 'Responsive optimalisatie (mobiel, tablet, desktop)' : 'Responsive optimization (mobile, tablet, desktop)',
        language === 'nl' ? 'Verbeterde gebruikservaring (UX)' : 'Improved user experience (UX)',
        language === 'nl' ? 'Snelheidsoptimalisatie' : 'Speed optimization',
      ],
      notIncluded: [
        language === 'nl' ? 'Extra pagina\'s toevoegen' : 'Adding extra pages',
        language === 'nl' ? 'SEO-optimalisatie' : 'SEO optimization',
        language === 'nl' ? 'Nieuwe content / teksten schrijven' : 'New content / copywriting',
      ],
      idealFor: language === 'nl' ? 'Bestaande bedrijven, Website vernieuwing' : 'Existing businesses, Website renewal',
      deliveryTime: language === 'nl' ? '~ 1 week' : '~ 1 week',
      popular: false,
    },
    {
      id: 'basic',
      name: language === 'nl' ? 'Basis Website' : 'Basic Website',
      price: 500,
      description: language === 'nl' 
        ? 'Perfect voor startende ondernemers die een professionele online aanwezigheid willen.'
        : 'Perfect for starting entrepreneurs who want a professional online presence.',
      includes: [
        language === 'nl' ? 'Moderne responsive website' : 'Modern responsive website',
        language === 'nl' ? 'Tot 3 pagina\'s (bijv. Home, Over mij, Contact)' : 'Up to 3 pages (e.g., Home, About, Contact)',
        language === 'nl' ? 'Werkt perfect op mobiel, tablet en desktop' : 'Works perfectly on mobile, tablet and desktop',
        language === 'nl' ? 'Snelle en veilige hosting' : 'Fast and secure hosting',
        language === 'nl' ? 'Basis contactpagina' : 'Basic contact page',
      ],
      notIncluded: [
        language === 'nl' ? 'SEO-optimalisatie (kan later toegevoegd worden)' : 'SEO optimization (can be added later)',
        language === 'nl' ? 'Contactformulier met email' : 'Contact form with email',
        language === 'nl' ? 'Blog of portfolio pagina' : 'Blog or portfolio page',
      ],
      idealFor: language === 'nl' ? 'ZZP\'ers, Startende ondernemers' : 'Freelancers, Starting entrepreneurs',
      deliveryTime: language === 'nl' ? '~ 1 week' : '~ 1 week',
      popular: false,
    },
    {
      id: 'pro',
      name: language === 'nl' ? 'Pro Website' : 'Pro Website',
      price: 900,
      description: language === 'nl'
        ? 'Mijn meest gekozen optie voor groeiende bedrijven die meer functionaliteit nodig hebben.'
        : 'My most chosen option for growing businesses that need more functionality.',
      includes: [
        language === 'nl' ? 'Alles uit Basis Website' : 'Everything from Basic Website',
        language === 'nl' ? 'Basis SEO-optimalisatie (zoekwoordenonderzoek + on-page SEO)' : 'Basic SEO optimization (keyword research + on-page SEO)',
        language === 'nl' ? 'Tot 10 pagina\'s' : 'Up to 10 pages',
        language === 'nl' ? 'Complexere layout / extra secties' : 'Complex layout / extra sections',
        language === 'nl' ? 'Blog pagina' : 'Blog page',
        language === 'nl' ? 'Portfolio pagina' : 'Portfolio page',
        language === 'nl' ? 'Contactformulier (berichten direct in je email)' : 'Contact form (messages directly to your email)',
      ],
      notIncluded: [
        language === 'nl' ? 'Boekingssysteem' : 'Booking system',
        language === 'nl' ? 'Meertalige website' : 'Multi-language website',
      ],
      idealFor: language === 'nl' ? 'Groeiende MKB\'s, Dienstverleners' : 'Growing SMBs, Service providers',
      deliveryTime: language === 'nl' ? '1-2 weken' : '1-2 weeks',
      popular: true,
    },
    {
      id: 'premium',
      name: language === 'nl' ? 'Premium Website' : 'Premium Website',
      price: 1400,
      description: language === 'nl'
        ? 'Complete oplossing met alle mogelijkheden voor ambitieuze bedrijven.'
        : 'Complete solution with all possibilities for ambitious businesses.',
      includes: [
        language === 'nl' ? 'Alles uit Basis + Pro Website' : 'Everything from Basic + Pro Website',
        language === 'nl' ? 'Tot 15 pagina\'s' : 'Up to 15 pages',
        language === 'nl' ? 'Blog' : 'Blog',
        language === 'nl' ? 'Contactformulier' : 'Contact form',
        language === 'nl' ? 'Afspraaksysteem ingebouwd' : 'Booking system built-in',
        language === 'nl' ? 'Meertalige optie op je site' : 'Multi-language option on your site',
        language === 'nl' ? 'Snellere reactietijd (binnen 2 uur)' : 'Faster response time (within 2 hours)',
      ],
      notIncluded: [],
      idealFor: language === 'nl' ? 'Gevestigde bedrijven, Professionals' : 'Established businesses, Professionals',
      deliveryTime: language === 'nl' ? '1-2 weken' : '1-2 weeks',
      popular: false,
    }
  ];

  // Losse prijzen voor extra's
  const loosePrices = [
    { name: language === 'nl' ? 'Extra pagina' : 'Extra page', price: '€50' },
    { name: language === 'nl' ? 'Meertalig' : 'Multi-language', price: '€200' },
    { name: language === 'nl' ? 'Extra formulier' : 'Extra form', price: '€80' },
    { name: language === 'nl' ? 'Dark mode' : 'Dark mode', price: '€80' },
    { name: language === 'nl' ? 'Onderhoud' : 'Maintenance', price: '€25/pm' },
    { name: language === 'nl' ? 'Boekingssysteem' : 'Booking system', price: '€250' },
  ];

  // Extra possibilities - no prices, just what's possible
  const extras = [
    {
      key: 'pages',
      icon: <FileText size={24} />,
      title: language === 'nl' ? 'Extra pagina\'s' : 'Extra pages',
      description: language === 'nl' 
        ? 'Diensten, blog artikelen, portfolio items, of extra informatiepagina\'s.'
        : 'Services, blog posts, portfolio items, or extra information pages.',
    },
    {
      key: 'multilang',
      icon: <Globe size={24} />,
      title: language === 'nl' ? 'Meertalige website' : 'Multi-language website',
      description: language === 'nl'
        ? 'Uw website in meerdere talen met een handige taalwisselaar.'
        : 'Your website in multiple languages with a convenient language switcher.',
    },
    {
      key: 'form',
      icon: <Mail size={24} />,
      title: language === 'nl' ? 'Extra contactformulieren' : 'Extra contact forms',
      description: language === 'nl'
        ? 'Offerte aanvragen, afspraken verzoeken, of specifieke klantvragen.'
        : 'Quote requests, appointment requests, or specific customer questions.',
    },
    {
      key: 'maintenance',
      icon: <Shield size={24} />,
      title: language === 'nl' ? 'Website onderhoud' : 'Website maintenance',
      description: language === 'nl'
        ? 'Hosting, updates, kleine wijzigingen en beveiliging. Alles geregeld.'
        : 'Hosting, updates, small changes and security. Everything taken care of.',
    },
    {
      key: 'booking',
      icon: <Calendar size={24} />,
      title: language === 'nl' ? 'Online boekingssysteem' : 'Online booking system',
      description: language === 'nl'
        ? 'Laat klanten direct online afspraken maken met automatische bevestigingen.'
        : 'Let customers book appointments directly online with automatic confirmations.',
    },
    {
      key: 'delivery',
      icon: <Zap size={24} />,
      title: language === 'nl' ? 'Snelle levering' : 'Fast delivery',
      description: language === 'nl'
        ? 'Jouw website online in 1-2 weken. Klaar voor gebruik vanaf dag één.'
        : 'Your website online in 1-2 weeks. Ready to use from day one.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO page="/pakketten" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-700">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 sm:h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
            <Link 
              to="/" 
              className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ← {language === 'nl' ? 'Terug' : 'Back'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 lg:pb-20 relative" style={{backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-white/70 dark:bg-neutral-950/95" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-6 sm:py-10 md:py-20"
          >
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
              {language === 'nl' ? 'Transparante Prijzen' : 'Transparent Pricing'}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-6 dark:text-white">
              {language === 'nl' ? 'Pakketten & Prijzen' : 'Packages & Pricing'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-2 sm:mb-4">
              {language === 'nl' 
                ? 'Kies het pakket dat bij je bedrijf past. Alle prijzen zijn exclusief BTW.'
                : 'Choose the package that fits your business. All prices exclude VAT.'}
            </p>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              {language === 'nl'
                ? '* Prijzen zijn exclusief tekstschrijven en foto\'s. Content wordt door jou aangeleverd.'
                : '* Prices exclude copywriting and photos. Content is provided by you.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-7 ${
                  pkg.popular 
                    ? 'bg-gray-100/60 dark:bg-neutral-800/60 backdrop-blur-sm border-2 border-gray-300/50 dark:border-neutral-600/50 shadow-2xl z-10' 
                    : 'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-gray-300 dark:border-neutral-600">
                    <Star size={16} className="fill-current" />
                    {language === 'nl' ? 'Meest Gekozen' : 'Most Popular'}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-heading font-bold mb-2 dark:text-white">{pkg.name}</h2>
                  <p className={`text-sm ${pkg.popular ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-heading font-bold dark:text-white">€{pkg.price}</span>
                  <span className={`text-sm ${pkg.popular ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500'}`}> excl. BTW</span>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className={`text-sm ${pkg.popular ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500'}`}>
                    {language === 'nl' ? 'Levertijd:' : 'Delivery:'} {pkg.deliveryTime}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider mb-2 text-gray-400">
                    {language === 'nl' ? 'Ideaal voor' : 'Ideal for'}
                  </p>
                  <p className={`font-medium ${pkg.popular ? 'text-gray-700 dark:text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {pkg.idealFor}
                  </p>
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-xs uppercase tracking-wider mb-3 text-gray-400">
                    {language === 'nl' ? 'Inclusief' : 'Included'}
                  </p>
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-1.5">
                      <Check size={16} className="flex-shrink-0 mt-0.5 text-black dark:text-white" />
                      <span className={`text-sm ${pkg.popular ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                  <div className="space-y-1 mb-6 pt-4 border-t border-dashed border-gray-200 dark:border-neutral-700">
                    <p className="text-xs uppercase tracking-wider mb-3 text-gray-400">
                      {language === 'nl' ? 'Niet inbegrepen (apart te kopen)' : 'Not included (available separately)'}
                    </p>
                    {pkg.notIncluded.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-1">
                        <span className="text-sm text-gray-400">• {item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {pkg.id === 'rebranding' && <RebrandingPakketDemo isPopular={pkg.popular} language={language} />}
                {pkg.id === 'basic'   && <BasisPakketDemo   isPopular={pkg.popular} language={language} />}
                {pkg.id === 'pro'     && <ProPakketDemo     isPopular={pkg.popular} language={language} />}
                {pkg.id === 'premium' && <PremiumPakketDemo isPopular={pkg.popular} language={language} />}

                <Link
                  to="/calculator"
                  className="block w-full text-center py-4 rounded-full font-bold transition-all bg-gray-500 text-white hover:bg-gray-600"
                >
                  {language === 'nl' ? 'Selecteer Pakket' : 'Select Package'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Losse Prijzen Section */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
              {language === 'nl' ? 'Losse Extra\'s Toevoegen' : 'Add Individual Extras'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Wil je iets extra\'s bij je pakket? Hier zijn de losse prijzen.'
                : 'Want to add something extra to your package? Here are the individual prices.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {loosePrices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-5 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-neutral-700/50"
              >
                <p className="text-2xl font-bold mb-1 dark:text-white">{item.price}</p>
                <p className="text-sm text-gray-500">{item.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-3xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-yellow-800 dark:text-yellow-200">
              <span className="font-bold">💡 Tip:</span> {language === 'nl' 
                ? 'Combineer je 2 of meer extra\'s? Dan is een hoger pakket vaak voordeliger. Ik adviseer je graag vrijblijvend.'
                : 'Combining 2 or more extras? A higher package is often more advantageous. I\'d be happy to advise you without obligation.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extra possibilities - centered, no prices */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
              {language === 'nl' ? 'Extra Mogelijkheden' : 'Extra Possibilities'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Breid uw website uit met deze handige opties. Vraag naar de mogelijkheden.'
                : 'Expand your website with these useful options. Ask about the possibilities.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extras.map((extra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-neutral-700/50 hover:border-black hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {extra.icon}
                  </div>
                  <h3 className="font-bold text-base dark:text-white">{extra.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{extra.description}</p>
                {extra.key === 'pages'       && <ExtraPagesDemo language={language} />}
                {extra.key === 'multilang'   && <MultiLangDemo language={language} />}
                {extra.key === 'form'        && <ContactFormDemo language={language} />}
                {extra.key === 'maintenance' && <MaintenanceDemo language={language} />}
                {extra.key === 'booking'     && <BookingMiniDemo language={language} />}
                {extra.key === 'delivery'    && <FastDeliveryDemo language={language} />}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:underline"
            >
              {language === 'nl' ? 'Bekijk alle prijzen in de calculator' : 'View all prices in the calculator'}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Booking System Detail - with live interactive demo */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-700 text-white rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-400 mb-4">
                  {language === 'nl' ? 'Interactieve Demo' : 'Interactive Demo'}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {language === 'nl' ? 'Online Boekingssysteem' : 'Online Booking System'}
                </h2>
                <p className="text-gray-300 mb-8">
                  {language === 'nl'
                    ? 'Laat klanten direct online afspraken maken. Perfect voor kappers, coaches, therapeuten en andere dienstverleners. Probeer het zelf →'
                    : 'Let customers book appointments directly online. Perfect for hairdressers, coaches, therapists and other service providers. Try it yourself →'}
                </p>

                <div className="space-y-3">
                  {[
                    language === 'nl' ? 'Klant kiest datum & tijd' : 'Customer chooses date & time',
                    language === 'nl' ? 'Automatische bevestiging per email' : 'Automatic email confirmation',
                    language === 'nl' ? 'Jij ziet alle afspraken in een overzicht' : 'You see all appointments in one overview',
                    language === 'nl' ? 'Afwijzen of accepteren met één klik' : 'Reject or accept with one click',
                    language === 'nl' ? '24/7 beschikbaar voor je klanten' : '24/7 available for your customers',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-600">
                  <p className="text-gray-400 text-xs">
                    {language === 'nl'
                      ? 'Inbegrepen in Premium pakket of als add-on voor €250 eenmalig.'
                      : 'Included in Premium package or as add-on for €250 one-time.'}
                  </p>
                </div>
              </div>

              {/* Live interactive demo */}
              <div>
                <BookingDemoWidget language={language} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfterSlider />

      {/* Competitor Comparison */}
      <CompetitorComparison />

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 dark:text-white">
              {language === 'nl' ? 'Vragen? Neem contact op' : 'Questions? Get in touch'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {language === 'nl'
                ? 'Ik help je graag bij het kiezen van het juiste pakket. Bel of mail mij — vrijblijvend en zonder verplichtingen.'
                : 'I\'d be happy to help you choose the right package. Call or email me — no obligations.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-3 bg-gray-500 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-600 transition-all"
              >
                {language === 'nl' ? 'Bereken je prijs' : 'Calculate your price'}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-3 border-2 border-gray-400 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-neutral-7000 hover:text-white hover:border-gray-500 transition-all"
              >
                {language === 'nl' ? 'Neem contact op' : 'Contact me'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 md:px-12 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} Yrvante</span>
        </div>
      </footer>
    </div>
  );
};

export default PackagesPage;
