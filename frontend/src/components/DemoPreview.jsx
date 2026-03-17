import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dog, 
  SprayCan, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Check, 
  Menu, 
  X, 
  Heart,
  Shield,
  Award,
  Users,
  Calendar,
  ArrowRight,
  ChevronRight
} from "lucide-react";

// ============================================
// DEMO 1: Basis Pakket - Hondenwandelservice
// Simple, clean, single-page style
// ============================================
const BasisDemo = ({ language }) => {
  return (
    <div className="bg-amber-50 min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header */}
      <header className="bg-amber-900 text-white px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Dog size={12} className="text-amber-300" />
          <span className="font-bold text-[9px]">Basis Pakket</span>
        </div>
        <div className="flex gap-2 text-[6px]">
          <span>Home</span>
          <span>Over</span>
          <span>Contact</span>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 px-3 py-4 text-center">
        <div className="w-8 h-8 bg-amber-900 rounded-full mx-auto mb-2 flex items-center justify-center">
          <Dog size={16} className="text-amber-300" />
        </div>
        <h1 className="font-bold text-[10px] text-amber-900 mb-1">
          {language === 'nl' ? 'Hondenwandelen met Liefde' : 'Dog Walking with Love'}
        </h1>
        <p className="text-amber-700 text-[7px] mb-2">
          {language === 'nl' ? 'Professionele uitlaatservice in jouw buurt' : 'Professional walking service in your area'}
        </p>
        <button className="bg-amber-900 text-white px-3 py-1 rounded-full text-[7px] font-bold">
          {language === 'nl' ? 'Bel Nu' : 'Call Now'}
        </button>
      </div>

      {/* Services */}
      <div className="px-3 py-3">
        <h2 className="font-bold text-[9px] text-amber-900 mb-2 text-center">
          {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Dog, title: language === 'nl' ? 'Dagelijkse Wandeling' : 'Daily Walk', price: '€15' },
            { icon: Heart, title: language === 'nl' ? 'Groepswandeling' : 'Group Walk', price: '€10' },
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-lg p-2 text-center shadow-sm">
              <service.icon size={14} className="text-amber-600 mx-auto mb-1" />
              <p className="font-bold text-[7px]">{service.title}</p>
              <p className="text-amber-600 text-[8px] font-bold">{service.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-amber-900 text-white px-3 py-2 text-center">
        <p className="text-[7px] mb-1">{language === 'nl' ? 'Neem contact op' : 'Get in touch'}</p>
        <div className="flex justify-center gap-3 text-[6px]">
          <span className="flex items-center gap-1">
            <Phone size={8} /> 06-12345678
          </span>
          <span className="flex items-center gap-1">
            <Mail size={8} /> info@basis.nl
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEMO 2: Pro Pakket - Schoonmaakbedrijf
// More professional, multiple sections
// ============================================
const ProDemo = ({ language }) => {
  return (
    <div className="bg-slate-50 min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <SprayCan size={12} className="text-emerald-600" />
          <span className="font-bold text-[9px] text-slate-800">Pro Pakket</span>
        </div>
        <nav className="flex gap-2 text-[6px] text-slate-600">
          <span>Home</span>
          <span>Diensten</span>
          <span>Prijzen</span>
          <span>Over Ons</span>
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">Contact</span>
        </nav>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="text-emerald-200 text-[6px] uppercase tracking-wider mb-1">Professioneel & Betrouwbaar</p>
            <h1 className="font-bold text-[11px] mb-1">
              {language === 'nl' ? 'Schoonmaak die je ziet' : 'Cleaning you can see'}
            </h1>
            <p className="text-emerald-100 text-[7px] mb-2">
              {language === 'nl' ? 'Voor particulieren en bedrijven' : 'For homes and businesses'}
            </p>
            <button className="bg-white text-emerald-700 px-3 py-1 rounded text-[7px] font-bold">
              {language === 'nl' ? 'Gratis Offerte' : 'Free Quote'}
            </button>
          </div>
          <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
            <SprayCan size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1 px-3 py-2 bg-white">
        {[
          { num: '500+', label: language === 'nl' ? 'Klanten' : 'Clients' },
          { num: '10+', label: language === 'nl' ? 'Jaar' : 'Years' },
          { num: '5/5', label: language === 'nl' ? 'Rating' : 'Rating' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="font-bold text-emerald-600 text-[10px]">{stat.num}</p>
            <p className="text-slate-500 text-[6px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="px-3 py-2">
        <h2 className="font-bold text-[9px] text-slate-800 mb-2">
          {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
        </h2>
        <div className="grid grid-cols-2 gap-1">
          {[
            { icon: SprayCan, title: language === 'nl' ? 'Kantoren' : 'Offices' },
            { icon: Heart, title: language === 'nl' ? 'Woningen' : 'Homes' },
            { icon: Shield, title: language === 'nl' ? 'Dieptereiniging' : 'Deep Clean' },
            { icon: Award, title: language === 'nl' ? 'Glazenwassen' : 'Windows' },
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-lg p-2 flex items-center gap-2 shadow-sm border border-slate-100">
              <service.icon size={12} className="text-emerald-600" />
              <span className="font-medium text-[7px]">{service.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="mx-3 mb-2 bg-emerald-50 rounded-lg p-2 border border-emerald-100">
        <div className="flex gap-0.5 mb-1">
          {[1,2,3,4,5].map(i => <Star key={i} size={8} className="text-yellow-500 fill-yellow-500" />)}
        </div>
        <p className="text-slate-600 text-[6px] italic">
          {language === 'nl' 
            ? '"Eindelijk een betrouwbaar schoonmaakbedrijf!"' 
            : '"Finally a reliable cleaning company!"'}
        </p>
        <p className="text-slate-400 text-[6px] mt-1">- Jan de Vries</p>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 text-white px-3 py-2">
        <div className="flex justify-between items-center">
          <div className="text-[6px]">
            <p className="font-bold mb-0.5">Pro Pakket Schoonmaak</p>
            <p className="text-slate-400">info@propakket.nl</p>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center">
              <Phone size={8} />
            </div>
            <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center">
              <Mail size={8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEMO 3: Premium Pakket - Nagelstudio
// Luxurious, elegant, full-featured
// ============================================
const PremiumDemo = ({ language }) => {
  return (
    <div className="bg-rose-50 min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur px-3 py-2 flex items-center justify-between border-b border-rose-100">
        <div className="flex items-center gap-1">
          <Sparkles size={12} className="text-rose-500" />
          <span className="font-bold text-[9px] text-rose-900">Premium Pakket</span>
        </div>
        <nav className="flex gap-2 text-[6px] text-rose-700">
          <span>Home</span>
          <span>Behandelingen</span>
          <span>Prijzen</span>
          <span>Gallerij</span>
          <span>Over Ons</span>
          <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full">Boeken</span>
        </nav>
      </header>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-rose-200 via-rose-100 to-pink-100 px-3 py-3">
        <div className="absolute top-1 right-2 text-[5px] bg-white/80 px-2 py-0.5 rounded-full text-rose-600 font-medium">
          NL | EN
        </div>
        <div className="text-center">
          <p className="text-rose-400 text-[6px] uppercase tracking-[0.2em] mb-1">Luxe Nagelstudio</p>
          <h1 className="font-bold text-[12px] text-rose-900 mb-1">
            {language === 'nl' ? 'Schoonheid in Detail' : 'Beauty in Detail'}
          </h1>
          <p className="text-rose-600 text-[7px] mb-2">
            {language === 'nl' ? 'Professionele nagelverzorging & nail art' : 'Professional nail care & nail art'}
          </p>
          <div className="flex justify-center gap-2">
            <button className="bg-rose-500 text-white px-3 py-1 rounded-full text-[7px] font-bold flex items-center gap-1">
              <Calendar size={8} /> {language === 'nl' ? 'Afspraak Maken' : 'Book Now'}
            </button>
            <button className="bg-white text-rose-600 px-3 py-1 rounded-full text-[7px] font-bold border border-rose-200">
              {language === 'nl' ? 'Bekijk Werk' : 'View Work'}
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="px-3 py-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-[9px] text-rose-900">
            {language === 'nl' ? 'Behandelingen' : 'Treatments'}
          </h2>
          <span className="text-rose-400 text-[6px]">{language === 'nl' ? 'Bekijk alles' : 'View all'} →</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { title: language === 'nl' ? 'Manicure' : 'Manicure', price: '€35', time: '45 min' },
            { title: language === 'nl' ? 'Gellak' : 'Gel Polish', price: '€45', time: '60 min' },
            { title: 'Nail Art', price: '€55+', time: '75 min' },
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-xl p-2 text-center shadow-sm border border-rose-100">
              <div className="w-6 h-6 bg-rose-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <Sparkles size={10} className="text-rose-500" />
              </div>
              <p className="font-bold text-[7px] text-rose-900">{service.title}</p>
              <p className="text-rose-500 text-[8px] font-bold">{service.price}</p>
              <p className="text-rose-300 text-[5px]">{service.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="px-3 py-1">
        <h3 className="font-bold text-[8px] text-rose-900 mb-1">{language === 'nl' ? 'Ons Werk' : 'Our Work'}</h3>
        <div className="flex gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-3 py-2">
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
              <Users size={10} className="text-rose-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[7px]">Google Reviews</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={6} className="text-yellow-500 fill-yellow-500" />)}
                </div>
              </div>
              <p className="text-rose-400 text-[6px]">4.9/5 - 230+ {language === 'nl' ? 'beoordelingen' : 'reviews'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="mx-3 mb-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-2 text-white text-center">
        <p className="font-bold text-[8px] mb-1">
          {language === 'nl' ? 'Boek nu online!' : 'Book online now!'}
        </p>
        <p className="text-rose-100 text-[6px]">
          {language === 'nl' ? '24/7 afspraken maken via ons systeem' : '24/7 booking via our system'}
        </p>
      </div>

      {/* Footer */}
      <div className="bg-rose-900 text-white px-3 py-2">
        <div className="flex justify-between items-center text-[6px]">
          <div>
            <p className="font-bold">Premium Pakket Nails</p>
            <div className="flex items-center gap-1 text-rose-300 mt-0.5">
              <MapPin size={6} /> Amsterdam
            </div>
          </div>
          <div className="text-right text-rose-300">
            <p>Ma-Za: 9:00 - 18:00</p>
            <p>info@premiumpakket.nl</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT: Demo Preview Selector
// ============================================
const DemoPreview = ({ language = 'nl' }) => {
  const [activeDemo, setActiveDemo] = useState('pro');

  const demos = [
    { 
      id: 'basic', 
      name: language === 'nl' ? 'Basis' : 'Basic',
      price: '€500',
      description: language === 'nl' ? 'Hondenwandelservice' : 'Dog Walking Service',
      color: 'amber'
    },
    { 
      id: 'pro', 
      name: 'Pro',
      price: '€900',
      description: language === 'nl' ? 'Schoonmaakbedrijf' : 'Cleaning Company',
      color: 'emerald',
      popular: true
    },
    { 
      id: 'premium', 
      name: 'Premium',
      price: '€1400',
      description: language === 'nl' ? 'Nagelstudio' : 'Nail Studio',
      color: 'rose'
    },
  ];

  const renderDemo = () => {
    switch(activeDemo) {
      case 'basic':
        return <BasisDemo language={language} />;
      case 'premium':
        return <PremiumDemo language={language} />;
      case 'pro':
      default:
        return <ProDemo language={language} />;
    }
  };

  return (
    <div data-testid="demo-preview-section" className="mt-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-black mb-2">
          {language === 'nl' ? 'Bekijk wat je krijgt' : 'See what you get'}
        </h3>
        <p className="text-gray-500 text-sm">
          {language === 'nl' 
            ? 'Interactieve voorbeelden van elk pakket' 
            : 'Interactive examples of each package'}
        </p>
      </div>

      {/* Demo Selector Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            data-testid={`demo-tab-${demo.id}`}
            className={`relative px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
              activeDemo === demo.id
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {demo.popular && activeDemo !== demo.id && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {language === 'nl' ? 'Populair' : 'Popular'}
              </span>
            )}
            <span className="block font-bold">{demo.name}</span>
            <span className="block text-xs opacity-70">{demo.price}</span>
          </button>
        ))}
      </div>

      {/* Demo Preview Container */}
      <div className="max-w-2xl mx-auto">
        {/* Browser Frame */}
        <div className="bg-gray-800 rounded-t-2xl px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-700 rounded-lg px-3 py-1.5 text-gray-400 text-xs text-center">
              www.{activeDemo === 'basic' ? 'basispakket' : activeDemo === 'pro' ? 'propakket' : 'premiumpakket'}.nl
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div 
          className="bg-white border-2 border-t-0 border-gray-800 rounded-b-2xl overflow-hidden"
          style={{ height: '400px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Demo Info */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            {demos.find(d => d.id === activeDemo)?.description}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {language === 'nl' 
              ? 'Dit is een interactief voorbeeld - jouw website wordt volledig op maat gemaakt' 
              : 'This is an interactive example - your website will be fully customized'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPreview;
