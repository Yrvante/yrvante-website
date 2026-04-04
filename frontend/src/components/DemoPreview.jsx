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
  ChevronRight,
  Home,
  Info,
  MessageCircle,
  Image,
  Scissors,
  Palette,
  Gift,
  Sun,
  Moon,
  Leaf,
  Zap
} from "lucide-react";

// ============================================
// DEMO 1: Basis Pakket - Hondenwandelservice
// Beautiful, warm, inviting design
// ============================================
const BasisDemo = ({ language }) => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50 min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm px-3 py-2 flex items-center justify-between border-b border-amber-100 sticky top-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <Dog size={12} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-[9px] text-amber-900 block leading-tight">Basis Pakket</span>
            <span className="text-[5px] text-amber-600">Hondenuitlaatservice</span>
          </div>
        </div>
        <nav className="flex gap-2 text-[6px] text-amber-700">
          <span className="hover:text-amber-900 cursor-pointer">Home</span>
          <span className="hover:text-amber-900 cursor-pointer">Diensten</span>
          <span className="hover:text-amber-900 cursor-pointer">Over Mij</span>
          <span className="bg-amber-600 text-white px-2 py-0.5 rounded-full">Contact</span>
        </nav>
      </header>

      {/* Hero Section - More elaborate */}
      <div className="relative px-3 py-5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-16 h-16 bg-amber-200/50 rounded-full blur-xl" />
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-orange-200/50 rounded-full blur-xl" />
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[6px] mb-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {language === 'nl' ? 'Beschikbaar' : 'Available'}
          </div>
          
          <h1 className="font-bold text-[12px] text-amber-900 mb-1">
            {language === 'nl' ? 'Hondenwandelen' : 'Dog Walking'}
            <span className="text-amber-500"> met Liefde</span>
          </h1>
          <p className="text-amber-700 text-[7px] mb-3 max-w-[200px] mx-auto">
            {language === 'nl' 
              ? 'Professionele en liefdevolle uitlaatservice voor jouw trouwe viervoeter' 
              : 'Professional and loving walking service for your loyal companion'}
          </p>
          
          <div className="flex justify-center gap-2">
            <button className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-[7px] font-bold shadow-lg shadow-amber-200 flex items-center gap-1">
              <Phone size={8} /> {language === 'nl' ? 'Bel Direct' : 'Call Now'}
            </button>
            <button className="bg-white text-amber-700 px-3 py-1.5 rounded-full text-[7px] font-medium border border-amber-200">
              {language === 'nl' ? 'Meer Info' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-3 px-3 py-2 bg-white/50">
        {[
          { icon: Heart, label: language === 'nl' ? 'Met Liefde' : 'With Love' },
          { icon: Shield, label: language === 'nl' ? 'Verzekerd' : 'Insured' },
          { icon: Award, label: language === 'nl' ? '5 Jaar Ervaring' : '5 Years Exp.' },
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-1 text-[6px] text-amber-700">
            <badge.icon size={10} className="text-amber-500" />
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Services Grid - Enhanced */}
      <div className="px-3 py-3">
        <h2 className="font-bold text-[9px] text-amber-900 mb-2 text-center">
          {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Dog, title: language === 'nl' ? 'Dagelijkse Wandeling' : 'Daily Walk', price: '€15', desc: '30-45 min' },
            { icon: Users, title: language === 'nl' ? 'Groepswandeling' : 'Group Walk', price: '€10', desc: '60 min' },
            { icon: Sun, title: language === 'nl' ? 'Puppyservice' : 'Puppy Care', price: '€20', desc: 'Extra aandacht' },
            { icon: Home, title: language === 'nl' ? 'Huisbezoek' : 'Home Visit', price: '€25', desc: 'Op aanvraag' },
          ].map((service, i) => (
            <div key={i} className="bg-white rounded-xl p-2 text-center shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <service.icon size={14} className="text-amber-600" />
              </div>
              <p className="font-bold text-[7px] text-amber-900">{service.title}</p>
              <p className="text-amber-600 text-[9px] font-bold">{service.price}</p>
              <p className="text-amber-400 text-[5px]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white px-3 py-3">
        <div className="text-center mb-2">
          <p className="font-bold text-[8px] mb-1">{language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}</p>
        </div>
        <div className="flex justify-center gap-4 text-[6px]">
          <span className="flex items-center gap-1">
            <Phone size={8} className="text-amber-300" /> 06-12345678
          </span>
          <span className="flex items-center gap-1">
            <Mail size={8} className="text-amber-300" /> info@basispakket.nl
          </span>
        </div>
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-5 h-5 bg-amber-700 rounded-full flex items-center justify-center">
            <span className="text-[8px]">f</span>
          </div>
          <div className="w-5 h-5 bg-amber-700 rounded-full flex items-center justify-center">
            <span className="text-[8px]">in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEMO 2: Pro Pakket - Schoonmaakbedrijf
// Professional, trustworthy, comprehensive
// ============================================
const ProDemo = ({ language }) => {
  return (
    <div className="bg-slate-50 min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header - Professional */}
      <header className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <SprayCan size={12} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-[9px] text-slate-800 block leading-tight">Pro Pakket</span>
            <span className="text-[5px] text-emerald-600">Schoonmaakdiensten</span>
          </div>
        </div>
        <nav className="flex gap-2 text-[6px] text-slate-600">
          <span>Home</span>
          <span>Diensten</span>
          <span>Prijzen</span>
          <span>Portfolio</span>
          <span>Over Ons</span>
          <span>Blog</span>
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">Contact</span>
        </nav>
      </header>

      {/* Hero - More impactful */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white px-3 py-4 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/30 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-400/20 rounded-full blur-xl" />
        
        <div className="relative flex items-center gap-3">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[6px] mb-2">
              <Zap size={8} className="text-yellow-300" />
              {language === 'nl' ? 'Professioneel & Betrouwbaar' : 'Professional & Reliable'}
            </div>
            <h1 className="font-bold text-[13px] mb-1 leading-tight">
              {language === 'nl' ? 'Schoonmaak die je' : 'Cleaning that you'}
              <span className="text-emerald-200"> {language === 'nl' ? 'écht ziet' : 'can see'}</span>
            </h1>
            <p className="text-emerald-100 text-[7px] mb-3 max-w-[180px]">
              {language === 'nl' 
                ? 'Voor particulieren en bedrijven. Flexibel, betrouwbaar en altijd stipt op tijd.' 
                : 'For homes and businesses. Flexible, reliable and always on time.'}
            </p>
            <div className="flex gap-2">
              <button className="bg-white text-emerald-700 px-3 py-1.5 rounded text-[7px] font-bold shadow-lg flex items-center gap-1">
                {language === 'nl' ? 'Gratis Offerte' : 'Free Quote'} <ArrowRight size={8} />
              </button>
              <button className="bg-emerald-500/30 text-white px-3 py-1.5 rounded text-[7px] font-medium border border-emerald-400/50">
                <Phone size={8} className="inline mr-1" /> Bel Ons
              </button>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
            <SprayCan size={28} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats Bar - More impressive */}
      <div className="grid grid-cols-4 gap-1 px-3 py-3 bg-white border-b border-slate-100">
        {[
          { num: '500+', label: language === 'nl' ? 'Tevreden Klanten' : 'Happy Clients' },
          { num: '10+', label: language === 'nl' ? 'Jaar Ervaring' : 'Years Experience' },
          { num: '24/7', label: language === 'nl' ? 'Bereikbaar' : 'Available' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="font-bold text-emerald-600 text-[11px] flex items-center justify-center gap-0.5">
              {stat.num}
              {stat.icon && <stat.icon size={8} className="fill-yellow-400 text-yellow-400" />}
            </p>
            <p className="text-slate-500 text-[5px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Services Grid - Comprehensive */}
      <div className="px-3 py-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-[9px] text-slate-800">
            {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
          </h2>
          <span className="text-emerald-600 text-[6px]">{language === 'nl' ? 'Bekijk alles →' : 'View all →'}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { icon: SprayCan, title: language === 'nl' ? 'Kantoren' : 'Offices', price: 'Vanaf €80' },
            { icon: Home, title: language === 'nl' ? 'Woningen' : 'Homes', price: 'Vanaf €60' },
            { icon: Shield, title: language === 'nl' ? 'Dieptereiniging' : 'Deep Clean', price: 'Vanaf €150' },
            { icon: Sparkles, title: language === 'nl' ? 'Glazenwassen' : 'Windows', price: 'Vanaf €40' },
            { icon: Leaf, title: language === 'nl' ? 'Eco Schoon' : 'Eco Clean', price: 'Vanaf €90' },
            { icon: Calendar, title: language === 'nl' ? 'Abonnement' : 'Subscription', price: 'Op maat' },
          ].map((service, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-2 text-center hover:bg-emerald-50 transition-colors border border-slate-100 hover:border-emerald-200">
              <div className="w-6 h-6 bg-white rounded-lg mx-auto mb-1 flex items-center justify-center shadow-sm">
                <service.icon size={12} className="text-emerald-600" />
              </div>
              <span className="font-medium text-[6px] text-slate-700 block">{service.title}</span>
              <span className="text-emerald-600 text-[6px] font-bold">{service.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mx-3 mb-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-2 border border-emerald-100">
        <h3 className="font-bold text-[8px] text-emerald-800 mb-1.5">{language === 'nl' ? 'Waarom Pro Pakket?' : 'Why Pro Pakket?'}</h3>
        <div className="grid grid-cols-2 gap-1">
          {[
            language === 'nl' ? 'Eigen materiaal' : 'Own supplies',
            language === 'nl' ? 'Verzekerd tot €1M' : 'Insured up to €1M',
            language === 'nl' ? 'Flexibele tijden' : 'Flexible times',
            language === 'nl' ? 'Geen contracten' : 'No contracts',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1 text-[6px] text-emerald-700">
              <Check size={8} className="text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="mx-3 mb-2 bg-white rounded-xl p-2 shadow-sm border border-slate-100">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Users size={10} className="text-emerald-600" />
          </div>
          <div>
            <div className="flex gap-0.5 mb-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={6} className="text-yellow-500 fill-yellow-500" />)}
            </div>
            <p className="text-slate-600 text-[6px] italic">
              {language === 'nl' 
                ? '"Eindelijk een betrouwbaar schoonmaakbedrijf! Al 2 jaar zeer tevreden."' 
                : '"Finally a reliable cleaning company! Very satisfied for 2 years now."'}
            </p>
            <p className="text-slate-400 text-[5px] mt-0.5">- Kantoor Amsterdam</p>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mx-3 mb-2">
        <h3 className="font-bold text-[8px] text-slate-800 mb-1">Blog</h3>
        <div className="bg-white rounded-lg p-2 border border-slate-100">
          <p className="text-[6px] text-slate-600">{language === 'nl' ? '5 Tips voor een schoon kantoor →' : '5 Tips for a clean office →'}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 text-white px-3 py-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-bold text-[8px] mb-1">Pro Pakket Schoonmaak</p>
            <p className="text-slate-400 text-[5px]">{language === 'nl' ? 'Uw partner in properheid' : 'Your partner in cleanliness'}</p>
          </div>
          <div className="text-right text-[5px] text-slate-400">
            <p>info@propakket.nl</p>
            <p>020-1234567</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-700">
          <div className="flex gap-1">
            {['fb', 'in', 'ig'].map((s, i) => (
              <div key={i} className="w-4 h-4 bg-slate-700 rounded flex items-center justify-center text-[6px]">{s}</div>
            ))}
          </div>
          <p className="text-[5px] text-slate-500">© 2025 Pro Pakket</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEMO 3: Premium Pakket - Nagelstudio
// Luxurious, elegant, full-featured with booking
// EXTENDED VERSION with more pages/sections
// ============================================
const PremiumDemo = ({ language }) => {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-pink-50 to-white min-h-full rounded-2xl overflow-hidden text-[8px] leading-tight">
      {/* Header - Elegant with full navigation */}
      <header className="bg-white/95 backdrop-blur-md px-3 py-2 flex items-center justify-between border-b border-rose-100 sticky top-0 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-[10px] text-rose-900 block leading-tight">Premium Pakket</span>
            <span className="text-[5px] text-rose-500">Luxe Nagelstudio Amsterdam</span>
          </div>
        </div>
        <nav className="flex gap-2 text-[6px] text-rose-700">
          <span className="font-medium">Home</span>
          <span>Behandelingen</span>
          <span>Prijzen</span>
          <span>Gallerij</span>
          <span>Team</span>
          <span>Contact</span>
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2.5 py-1 rounded-full flex items-center gap-1 font-bold shadow-md">
            <Calendar size={8} /> Boeken
          </span>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="text-[6px] text-rose-600 hover:text-rose-800">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <div className="text-[5px] bg-rose-100 px-1.5 py-0.5 rounded text-rose-600 font-medium">NL | EN</div>
        </div>
      </header>

      {/* Hero - Luxurious with promo */}
      <div className="relative px-4 py-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200 to-rose-100 rounded-full blur-2xl opacity-50" />
        
        {/* Promo banner */}
        <div className="relative mb-3">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center py-1.5 rounded-lg text-[6px] font-medium">
            ✨ {language === 'nl' ? 'NIEUWE KLANT? 15% korting op je eerste behandeling!' : 'NEW CLIENT? 15% off your first treatment!'} ✨
          </div>
        </div>
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-1 bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-[6px] mb-2">
            <Sparkles size={8} />
            {language === 'nl' ? 'Luxe Nagelstudio sinds 2019' : 'Luxury Nail Studio since 2019'}
          </div>
          
          <h1 className="font-bold text-[16px] text-rose-900 mb-1 leading-tight">
            {language === 'nl' ? 'Schoonheid' : 'Beauty'}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"> in Detail</span>
          </h1>
          <p className="text-rose-600 text-[7px] mb-4 max-w-[220px] mx-auto">
            {language === 'nl' 
              ? 'Professionele nagelverzorging, nail art & wimperextensions in een ontspannen sfeer in het hart van Amsterdam' 
              : 'Professional nail care, nail art & lash extensions in a relaxed atmosphere in the heart of Amsterdam'}
          </p>
          
          <div className="flex justify-center gap-2 mb-4">
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-[7px] font-bold shadow-lg shadow-rose-200 flex items-center gap-1">
              <Calendar size={9} /> {language === 'nl' ? 'Afspraak Maken' : 'Book Now'}
            </button>
            <button className="bg-white text-rose-600 px-3 py-2 rounded-full text-[7px] font-medium border border-rose-200 shadow-sm flex items-center gap-1">
              <Phone size={8} /> {language === 'nl' ? 'Bel Ons' : 'Call Us'}
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex justify-center gap-6">
            {[
              { num: '4.9', label: 'Google Rating', icon: Star },
              { num: '500+', label: language === 'nl' ? 'Klanten/maand' : 'Clients/month' },
              { num: '5+', label: language === 'nl' ? 'Jaar Ervaring' : 'Years Experience' },
              { num: '3', label: language === 'nl' ? 'Specialisten' : 'Specialists' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-bold text-rose-700 text-[11px] flex items-center justify-center gap-0.5">
                  {stat.num}
                  {stat.icon && <stat.icon size={8} className="fill-yellow-400 text-yellow-400" />}
                </p>
                <p className="text-rose-400 text-[5px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Categories */}
      <div className="bg-white py-3 px-3 border-y border-rose-100">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-[10px] text-rose-900">
            {language === 'nl' ? 'Onze Behandelingen' : 'Our Treatments'}
          </h2>
          <span className="text-rose-400 text-[6px] font-medium">{language === 'nl' ? 'Bekijk alle →' : 'View all →'}</span>
        </div>
        
        {/* Category tabs */}
        <div className="flex gap-1.5 mb-3">
          {[
            language === 'nl' ? 'Nagels' : 'Nails',
            language === 'nl' ? 'Wimpers' : 'Lashes',
            language === 'nl' ? 'Wenkbrauwen' : 'Brows',
            language === 'nl' ? 'Pakketten' : 'Packages',
          ].map((cat, i) => (
            <span key={i} className={`px-2 py-1 rounded-full text-[6px] ${i === 0 ? 'bg-rose-500 text-white font-bold' : 'bg-rose-50 text-rose-600'}`}>
              {cat}
            </span>
          ))}
        </div>

        {/* Treatment cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { title: language === 'nl' ? 'Basis Manicure' : 'Basic Manicure', price: '€35', time: '45 min', popular: false },
            { title: language === 'nl' ? 'Gellak' : 'Gel Polish', price: '€45', time: '60 min', popular: true },
            { title: 'Nail Art Design', price: '€55+', time: '75 min', popular: false },
            { title: language === 'nl' ? 'BIAB Versterking' : 'BIAB Enhancement', price: '€60', time: '70 min', popular: true },
            { title: language === 'nl' ? 'Luxe Pedicure' : 'Luxury Pedicure', price: '€50', time: '60 min', popular: false },
            { title: language === 'nl' ? 'Combi Deal' : 'Combo Deal', price: '€75', time: '90 min', popular: true },
          ].map((service, i) => (
            <div key={i} className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-2 text-center border border-rose-100 hover:shadow-md transition-shadow relative">
              {service.popular && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[4px] px-1 py-0.5 rounded-full font-bold">
                  {language === 'nl' ? 'POPULAIR' : 'POPULAR'}
                </span>
              )}
              <div className="w-7 h-7 bg-white rounded-full mx-auto mb-1 flex items-center justify-center shadow-sm">
                <Sparkles size={12} className="text-rose-500" />
              </div>
              <p className="font-bold text-[6px] text-rose-900 leading-tight">{service.title}</p>
              <p className="text-rose-500 text-[9px] font-bold my-0.5">{service.price}</p>
              <p className="text-rose-300 text-[5px]">{service.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Preview - Enhanced */}
      <div className="px-3 py-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-[9px] text-rose-900">{language === 'nl' ? 'Onze Creaties' : 'Our Creations'}</h3>
          <span className="text-rose-400 text-[6px]">{language === 'nl' ? 'Instagram →' : 'Instagram →'}</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Heart size={8} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-rose-400 text-[5px] mt-1">@premiumpakketnails • 2.5K {language === 'nl' ? 'volgers' : 'followers'}</p>
      </div>

      {/* Team Section */}
      <div className="bg-rose-50 px-3 py-3">
        <h3 className="font-bold text-[9px] text-rose-900 mb-2">{language === 'nl' ? 'Ons Team' : 'Our Team'}</h3>
        <div className="flex gap-2">
          {[
            { name: 'Sophie', role: language === 'nl' ? 'Eigenaar & Nail Artist' : 'Owner & Nail Artist' },
            { name: 'Lisa', role: language === 'nl' ? 'Nail Technician' : 'Nail Technician' },
            { name: 'Emma', role: language === 'nl' ? 'Lash Artist' : 'Lash Artist' },
          ].map((member, i) => (
            <div key={i} className="flex-1 bg-white rounded-xl p-2 text-center border border-rose-100">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full mx-auto mb-1" />
              <p className="font-bold text-[6px] text-rose-900">{member.name}</p>
              <p className="text-rose-400 text-[5px]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Reviews Widget - Enhanced */}
      <div className="mx-3 my-2 bg-white rounded-xl p-3 shadow-sm border border-rose-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-rose-100 rounded-full flex items-center justify-center">
              <Star size={14} className="text-rose-500 fill-rose-500" />
            </div>
            <div>
              <span className="font-bold text-[8px] text-slate-800 block">Google Reviews</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={6} className="text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-rose-600 text-[12px]">4.9/5</p>
            <p className="text-rose-400 text-[5px]">230+ {language === 'nl' ? 'beoordelingen' : 'reviews'}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { text: language === 'nl' ? 'Prachtig resultaat, heel fijne sfeer!' : 'Beautiful result, very nice atmosphere!', name: 'Anna V.' },
            { text: language === 'nl' ? 'Beste nagelsalon van Amsterdam!' : 'Best nail salon in Amsterdam!', name: 'Kim L.' },
          ].map((review, i) => (
            <div key={i} className="bg-rose-50 rounded-lg p-1.5">
              <p className="text-[5px] text-rose-600 italic">"{review.text}"</p>
              <p className="text-rose-400 text-[5px] mt-0.5">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Online Booking CTA */}
      <div className="mx-3 mb-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-xl p-3 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
        <div className="relative">
          <p className="font-bold text-[10px] mb-1">
            {language === 'nl' ? 'Boek 24/7 Online!' : 'Book 24/7 Online!'}
          </p>
          <p className="text-rose-100 text-[6px] mb-2">
            {language === 'nl' ? 'Direct beschikbaarheid zien • Betaal bij afspraak • Gratis herinnering' : 'See availability instantly • Pay at appointment • Free reminder'}
          </p>
          <button className="bg-white text-rose-600 px-5 py-1.5 rounded-full text-[7px] font-bold shadow-lg">
            {language === 'nl' ? 'Direct Boeken' : 'Book Now'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-rose-900 text-white px-3 py-3">
        <div className="grid grid-cols-3 gap-2 mb-2 text-[5px]">
          <div>
            <p className="font-bold text-[7px] mb-1">Premium Pakket Nails</p>
            <p className="text-rose-300">Prinsengracht 123</p>
            <p className="text-rose-300">1015 DT Amsterdam</p>
          </div>
          <div>
            <p className="font-bold text-[6px] mb-1">{language === 'nl' ? 'Openingstijden' : 'Opening Hours'}</p>
            <p className="text-rose-300">Ma-Vr: 9:00 - 20:00</p>
            <p className="text-rose-300">Za: 10:00 - 18:00</p>
            <p className="text-rose-300">Zo: {language === 'nl' ? 'Gesloten' : 'Closed'}</p>
          </div>
          <div>
            <p className="font-bold text-[6px] mb-1">Contact</p>
            <p className="text-rose-300">020-1234567</p>
            <p className="text-rose-300">info@premiumpakket.nl</p>
            <div className="flex gap-1 mt-1">
              {['ig', 'fb', 'tt'].map((s, i) => (
                <div key={i} className="w-4 h-4 bg-rose-800 rounded flex items-center justify-center text-[5px]">{s}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-rose-800 text-[5px] text-rose-400">
          <p>© 2025 Premium Pakket Nails</p>
          <div className="flex gap-2">
            <span>{language === 'nl' ? 'Privacy' : 'Privacy'}</span>
            <span>{language === 'nl' ? 'Voorwaarden' : 'Terms'}</span>
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
      price: '€399',
      description: language === 'nl' ? 'Hondenwandelservice' : 'Dog Walking Service',
      pages: language === 'nl' ? '3 pagina\'s' : '3 pages',
      color: 'amber'
    },
    { 
      id: 'pro', 
      name: 'Pro',
      price: '€699',
      description: language === 'nl' ? 'Schoonmaakbedrijf' : 'Cleaning Company',
      pages: language === 'nl' ? '10 pagina\'s + blog' : '10 pages + blog',
      color: 'emerald',
      popular: true
    },
    { 
      id: 'premium', 
      name: 'Premium',
      price: '€999',
      description: language === 'nl' ? 'Nagelstudio' : 'Nail Studio',
      pages: language === 'nl' ? '15 pagina\'s + boekingssysteem' : '15 pages + booking',
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

  const activeInfo = demos.find(d => d.id === activeDemo);

  return (
    <div data-testid="demo-preview-section" className="mt-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-3">
          {language === 'nl' ? 'Live Voorbeelden' : 'Live Examples'}
        </p>
        <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-black mb-3">
          {language === 'nl' ? 'Bekijk wat je krijgt' : 'See what you get'}
        </h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          {language === 'nl' 
            ? 'Interactieve voorbeelden van elk pakket. Klik op de tabs om te zien wat elk niveau biedt.' 
            : 'Interactive examples of each package. Click the tabs to see what each level offers.'}
        </p>
      </div>

      {/* Demo Selector Tabs - Enhanced */}
      <div className="flex justify-center gap-3 mb-8">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            data-testid={`demo-tab-${demo.id}`}
            className={`relative px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 min-w-[120px] ${
              activeDemo === demo.id
                ? 'bg-gray-600 text-white shadow-xl scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
            }`}
          >
            {demo.popular && activeDemo !== demo.id && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                {language === 'nl' ? 'Populair' : 'Popular'}
              </span>
            )}
            <span className="block font-bold text-base">{demo.name}</span>
            <span className="block text-xs opacity-70 mt-0.5">{demo.price}</span>
            <span className="block text-[10px] opacity-50 mt-1">{demo.pages}</span>
          </button>
        ))}
      </div>

      {/* Demo Preview Container */}
      <div className="max-w-3xl mx-auto">
        {/* Browser Frame - More realistic */}
        <div className="bg-gray-800 rounded-t-2xl px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-700 rounded-lg px-4 py-2 text-gray-300 text-xs text-center flex items-center justify-center gap-2">
              <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              www.{activeDemo === 'basic' ? 'basispakket' : activeDemo === 'pro' ? 'propakket' : 'premiumpakket'}.nl
            </div>
          </div>
          <div className="flex gap-2 text-gray-500">
            <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">←</div>
            <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">→</div>
            <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">↻</div>
          </div>
        </div>

        {/* Demo Content */}
        <div 
          className="bg-white border-2 border-t-0 border-gray-800 rounded-b-2xl overflow-hidden shadow-2xl"
          style={{ height: '480px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Demo Info - Enhanced */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${activeInfo?.color}-50 border border-${activeInfo?.color}-200`}>
            <span className={`w-2 h-2 rounded-full bg-${activeInfo?.color}-500`} />
            <span className={`text-${activeInfo?.color}-700 font-medium`}>
              {activeInfo?.description}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-3 max-w-md mx-auto">
            {language === 'nl' 
              ? 'Dit is een interactief voorbeeld — jouw website wordt volledig op maat gemaakt met jouw branding, kleuren en content.' 
              : 'This is an interactive example — your website will be fully customized with your branding, colors and content.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPreview;
