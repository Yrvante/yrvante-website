import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import SEO from "../components/SEO";
import {
  Monitor,
  Code,
  Menu,
  X,
  ArrowRight,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a2868257-4a63-4a64-87b7-72ff6867dc17/artifacts/gwcgd4lw_Yrvante%20logo%20en%20naam%20en%20slogan%20.jpeg";

// Navigation - Brutalist, minimal
const Navigation = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-black" : "bg-white"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" data-testid="nav-logo" className="flex items-center">
            <img 
              src={LOGO_URL} 
              alt="Yrvante" 
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation - Brutalist style */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
            >
              Diensten
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
            >
              Pakketten
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
            >
              Contact
            </button>
            
            <div className="w-px h-4 bg-gray-300" />
            
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors"
            >
              Start Project
            </button>

            <div className="flex text-xs font-mono">
              <button
                onClick={() => setLanguage("nl")}
                className={`px-2 py-1 ${language === "nl" ? "text-black" : "text-gray-400"}`}
              >
                NL
              </button>
              <span className="text-gray-300">/</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 ${language === "en" ? "text-black" : "text-gray-400"}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-black"
          >
            <div className="px-6 py-8 space-y-6">
              <button
                onClick={() => scrollToSection("services")}
                className="block text-xs font-medium uppercase tracking-[0.2em]"
              >
                Diensten
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block text-xs font-medium uppercase tracking-[0.2em]"
              >
                Pakketten
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-xs font-medium uppercase tracking-[0.2em]"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.15em]"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section - Brutalist Editorial Style
const HeroSection = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="min-h-screen bg-white pt-20 relative overflow-hidden">
      {/* Main Hero Content - Asymmetric Layout */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-80px)] items-center">
          
          {/* Left Side - Typography Heavy */}
          <div className="col-span-12 lg:col-span-8 py-12 lg:py-0">
            {/* Availability Badge - Elegant pill at top */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <button 
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-green-300 transition-all duration-300 text-sm"
                style={{
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.25), 0 2px 10px rgba(0, 0, 0, 0.03)'
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-gray-600 group-hover:text-green-700 transition-colors">
                  {language === 'nl' ? 'Beschikbaar voor nieuwe projecten' : 'Available for new projects'}
                </span>
              </button>
            </motion.div>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-medium uppercase tracking-[0.25em] text-gray-600 mb-6"
            >
              Smart Web & Software
            </motion.p>
            
            {/* Main Headline - Brutalist Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8"
            >
              {language === 'nl' ? (
                <>
                  JOUW<br />
                  BEDRIJF<br />
                  <span className="text-gray-400">ONLINE</span>
                </>
              ) : (
                <>
                  YOUR<br />
                  BUSINESS<br />
                  <span className="text-gray-400">ONLINE</span>
                </>
              )}
            </motion.h1>

            {/* Value Prop - Small Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm lg:text-base text-gray-500 max-w-md leading-relaxed mb-10"
            >
              {language === 'nl' 
                ? 'Ik bouw geen website — ik zorg dat jouw bedrijf er online professioneel uitziet zodat klanten je serieus nemen.'
                : "I don't build websites — I make sure your business looks professional online so customers take you seriously."}
            </motion.p>

            {/* CTA - Brutalist Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={scrollToContact}
                className="group px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-900 transition-all"
              >
                {language === 'nl' ? 'Start Project' : 'Start Project'}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <Link
                to="/pakketten"
                className="px-8 py-4 border border-black text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all"
              >
                {language === 'nl' ? 'Bekijk Werk' : 'View Work'}
              </Link>
            </motion.div>

            {/* Stats Grid - Below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              <div>
                <span className="text-3xl font-black">€500</span>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">
                  {language === 'nl' ? 'Vanaf' : 'From'}
                </p>
              </div>
              <div>
                <span className="text-3xl font-black">1-2</span>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">
                  {language === 'nl' ? 'Weken' : 'Weeks'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Empty for asymmetric layout */}
          <div className="hidden lg:block col-span-4" />
        </div>
      </div>

      {/* Bottom Border Line */}
      <div className="border-b border-gray-200" />
    </section>
  );
};

// Why Expensive Section - Brutalist
const WhyExpensiveSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Big Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6">
              (03)
            </p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-8">
              {language === 'nl' 
                ? 'WAAROM BEN IK GOEDKOPER?' 
                : 'WHY AM I MORE AFFORDABLE?'}
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-xl mb-8">
              {language === 'nl'
                ? 'Veel webdesignbureaus rekenen €3.000 tot €8.000 voor een simpele website. Je betaalt voor overhead, managers en vergaderingen — niet voor je website.'
                : 'Many web design agencies charge €3,000 to €8,000 for a simple website. You pay for overhead, managers and meetings — not for your website.'}
            </p>
            <Link
              to="/waarom-website"
              className="text-xs uppercase tracking-[0.2em] hover:underline underline-offset-4"
            >
              {language === 'nl' ? 'Lees meer →' : 'Read more →'}
            </Link>
          </motion.div>

          {/* Right - Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="border-t border-black pt-8 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                {language === 'nl' ? 'Bureaus' : 'Agencies'}
              </p>
              <p className="text-5xl font-black line-through decoration-gray-300">€3.000+</p>
            </div>
            <div className="border-t border-black pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                Yrvante
              </p>
              <p className="text-5xl font-black">€500</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                {language === 'nl' ? 'Vanaf' : 'Starting from'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section - Editorial Grid
const ServicesSection = () => {
  const { language } = useLanguage();

  return (
    <section id="services" data-testid="services-section" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header - Asymmetric */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              (01)
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
              {language === 'nl' ? 'DIENSTEN' : 'SERVICES'}
            </h2>
          </div>
        </div>

        {/* Services Grid - Editorial Layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Service 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-6 group"
          >
            <div className="border-t border-black pt-8">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">01</span>
                <Monitor size={24} strokeWidth={1} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {language === 'nl' ? 'Website Ontwikkeling' : 'Website Development'}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {language === 'nl' 
                  ? 'Moderne, snelle websites die perfect werken op elk apparaat. Van simpele landingspagina tot complete bedrijfswebsite.'
                  : 'Modern, fast websites that work perfectly on any device. From simple landing page to complete business website.'}
              </p>
            </div>
          </motion.div>

          {/* Service 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-6 group"
          >
            <div className="border-t border-black pt-8">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">02</span>
                <Code size={24} strokeWidth={1} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {language === 'nl' ? 'Web Applicaties' : 'Web Applications'}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {language === 'nl'
                  ? 'Boekingssystemen, klantportalen en op maat gemaakte oplossingen voor jouw specifieke bedrijfsbehoeften.'
                  : 'Booking systems, client portals and custom solutions for your specific business needs.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section - Brutalist Editorial
const PricingSection = () => {
  const { language } = useLanguage();

  const packages = [
    {
      name: language === 'nl' ? 'BASIS' : 'BASIC',
      price: '500',
      features: language === 'nl' 
        ? ['Tot 3 pagina\'s', 'Responsive design', 'Snelle hosting', '6 revisies']
        : ['Up to 3 pages', 'Responsive design', 'Fast hosting', '6 revisions'],
    },
    {
      name: 'PRO',
      price: '900',
      popular: true,
      features: language === 'nl'
        ? ['Tot 10 pagina\'s', 'SEO optimalisatie', 'Blog & Portfolio', 'Contactformulier']
        : ['Up to 10 pages', 'SEO optimization', 'Blog & Portfolio', 'Contact form'],
    },
    {
      name: 'PREMIUM',
      price: '1400',
      features: language === 'nl'
        ? ['Tot 15 pagina\'s', 'Boekingssysteem', 'Meertalig', 'Priority support']
        : ['Up to 15 pages', 'Booking system', 'Multi-language', 'Priority support'],
    }
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              (02)
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
              {language === 'nl' ? 'PAKKETTEN' : 'PACKAGES'}
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg">
              {language === 'nl' 
                ? 'Transparante prijzen. Geen verborgen kosten. Jij levert teksten en foto\'s.'
                : 'Transparent pricing. No hidden costs. You provide texts and photos.'}
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-800">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 lg:p-12 ${pkg.popular ? 'bg-white text-black' : 'bg-black'}`}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                    {pkg.popular && (language === 'nl' ? 'Populair' : 'Popular')}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight">{pkg.name}</h3>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  0{index + 1}
                </span>
              </div>

              <div className="mb-12">
                <span className="text-6xl lg:text-7xl font-black">€{pkg.price}</span>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
                  {language === 'nl' ? 'Excl. BTW' : 'Excl. VAT'}
                </p>
              </div>

              <ul className="space-y-4 mb-12">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className={`w-1 h-1 ${pkg.popular ? 'bg-black' : 'bg-white'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/calculator"
                className={`block w-full py-4 text-center text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  pkg.popular 
                    ? 'bg-black text-white hover:bg-gray-900' 
                    : 'border border-white hover:bg-white hover:text-black'
                }`}
              >
                {language === 'nl' ? 'Selecteer' : 'Select'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Extra Link */}
        <div className="mt-12 text-center">
          <Link
            to="/pakketten"
            className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
          >
            {language === 'nl' ? 'Bekijk alle details →' : 'View all details →'}
          </Link>
        </div>
      </div>
    </section>
  );
};

// Testimonials - without names, using "we"
const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      text: language === 'nl'
        ? "Binnen 2 weken was mijn website online. De kwaliteit is uitstekend en de communicatie was top!"
        : "Within 2 weeks my website was online. The quality is excellent and communication was great!",
      type: language === 'nl' ? 'Bouwbedrijf' : 'Construction company',
      rating: 5
    },
    {
      text: language === 'nl'
        ? "Eindelijk een betaalbare maar professionele website. Precies wat ik als ZZP'er nodig had."
        : "Finally an affordable but professional website. Exactly what I needed as a freelancer.",
      type: language === 'nl' ? 'ZZP\'er' : 'Freelancer',
      rating: 5
    },
    {
      text: language === 'nl'
        ? "Het resultaat overtrof mijn verwachtingen. Mijn nieuwe website trekt merkbaar meer klanten aan."
        : "The result exceeded my expectations. My new website noticeably attracts more customers.",
      type: language === 'nl' ? 'Coach' : 'Coach',
      rating: 5
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-16 bg-black text-white">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'nl' ? 'Wat klanten zeggen' : 'What clients say'}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center px-8"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="text-white fill-white" size={20} />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-heading mb-6 leading-relaxed">
                "{testimonials[current].text}"
              </p>
              <p className="text-gray-400">
                — {testimonials[current].type}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section - comprehensive FAQs, using "ik" and "jij"
const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: language === 'nl' ? 'Hoe lang duurt het om een website te maken?' : 'How long does it take to build a website?',
      a: language === 'nl' 
        ? 'Een basis website is meestal binnen 1 week klaar. Voor Pro en Premium pakketten reken ik 1 tot 2 weken.'
        : 'A basic website is usually ready within 1 week. For Pro and Premium packages I estimate 1 to 2 weeks.'
    },
    {
      q: language === 'nl' ? 'Wat heb ik nodig om te beginnen?' : 'What do I need to get started?',
      a: language === 'nl'
        ? 'Om te starten heb ik een paar simpele dingen van je nodig:\n\n• Teksten voor je website (bijvoorbeeld een korte beschrijving van je bedrijf en diensten)\n• Foto\'s of afbeeldingen die je wilt gebruiken\n• Je logo (als je die al hebt)\n\nHeb je dit nog niet allemaal? Geen probleem. Ik kan je helpen met goede teksten en professionele stockfoto\'s.\n\nVoor je website heb je ook een domeinnaam nodig (bijvoorbeeld jouwbedrijf.nl). Je koopt een domeinnaam zelf bij een provider zoals TransIP of Antagonist. Dit kost maximaal ongeveer €10–€15 per jaar. Ik help je daarna met het koppelen van de domeinnaam aan je website. Zo blijft de domeinnaam altijd op jouw naam staan en blijf jij volledig eigenaar!'
        : 'To get started I need a few simple things from you:\n\n• Texts for your website (e.g. a brief description of your business and services)\n• Photos or images you want to use\n• Your logo (if you have one)\n\nDon\'t have all of this yet? No problem. I can help you with good texts and professional stock photos.\n\nYou also need a domain name for your website (e.g. yourbusiness.com). You buy a domain name yourself from a provider like TransIP or Antagonist. This costs about €10-€15 per year max. I\'ll then help you connect the domain name to your website. This way the domain name always stays in your name and you remain the full owner!'
    },
    {
      q: language === 'nl' ? 'Kan ik de website later nog uitbreiden?' : 'Can I expand the website later?',
      a: language === 'nl'
        ? 'Ja, je kan altijd de website aanpassen. Als je weet hoe dit werkt en je koopt alleen de website, dan moet je zelf dingen laten aanpassen. Maar kies je voor het maandelijkse abonnement? Dan hoef je niet alleen niks te betalen aan hosting en bugs — ik regel dan alles voor je.'
        : 'Yes, you can always adjust the website. If you know how this works and you only buy the website, you\'ll need to make adjustments yourself. But if you choose the monthly subscription? Then you don\'t have to pay anything for hosting and bugs — I take care of everything for you.'
    },
    {
      q: language === 'nl' ? 'Wat gebeurt er als ik niet tevreden ben?' : 'What happens if I\'m not satisfied?',
      a: language === 'nl'
        ? 'Ik blijf de website aanpassen tot jij tevreden bent. Je kan altijd voorbeelden laten zien en ik blijf een test website sturen tot ik jouw volledige goedkeuring heb op de voorwaarden die ondertekend zijn. Alleen dan ga ik verder — tot jij tevreden bent.'
        : 'I keep adjusting the website until you\'re satisfied. You can always show examples and I\'ll keep sending a test website until I have your full approval based on the signed terms. Only then do I proceed — until you\'re satisfied.'
    },
    {
      q: language === 'nl' ? 'Hoe werkt de betaling?' : 'How does payment work?',
      a: language === 'nl'
        ? 'Ik werk met 40% aanbetaling nadat alles voor je duidelijk is bij de start van het project. De resterende 60% betaal je bij oplevering van de website. Na betaling maak ik je de host/co-host.'
        : 'I work with a 40% deposit after everything is clear to you at the start of the project. You pay the remaining 60% upon delivery of the website. After payment, I\'ll make you the host/co-host.'
    },
    {
      q: language === 'nl' ? 'Blijft mijn website online als ik geen onderhoudspakket neem?' : 'Will my website stay online if I don\'t take a maintenance package?',
      a: language === 'nl'
        ? 'Ja, je website blijft gewoon online. Het onderhoudspakket is optioneel maar zorgt ervoor dat ik kleine aanpassingen doe, updates bijhoud en je website veilig en snel blijft.'
        : 'Yes, your website will stay online. The maintenance package is optional but ensures that I make small adjustments, keep updates current, and your website stays safe and fast.'
    },
    {
      q: language === 'nl' ? 'Kan ik zelf teksten en foto\'s aanpassen?' : 'Can I edit texts and photos myself?',
      a: language === 'nl'
        ? 'Dat is mogelijk, maar vraagt een uitgebreidere technische oplossing. Daar maak ik een aparte offerte voor. Het beste is dat we dat regelen via het onderhoudspakket. Zo hoef jij je geen zorgen te maken over technische zaken en ben je binnen no-time geholpen.'
        : 'That\'s possible, but requires a more extensive technical solution. I\'ll make a separate quote for that. It\'s best that we arrange this via the maintenance package. This way you don\'t have to worry about technical matters and you\'ll be helped in no time.'
    },
    {
      q: language === 'nl' ? 'Maak jij ook webshops?' : 'Do you also make webshops?',
      a: language === 'nl'
        ? 'Op dit moment richt ik mij volledig op professionele websites voor ZZP\'ers en kleine bedrijven. Webshops vallen buiten mijn huidige aanbod.'
        : 'At the moment I focus entirely on professional websites for freelancers and small businesses. Webshops are outside my current offering.'
    },
    {
      q: language === 'nl' ? 'Wat is het verschil tussen jou en een groot webbureau?' : 'What\'s the difference between you and a large web agency?',
      a: language === 'nl'
        ? 'Bij een groot webbureau ben je één van de vele klanten. Je betaalt voor overhead, account managers en vergaderingen — niet voor je website. Bij Yrvante werk je rechtstreeks met mij. Geen tussenpersonen, geen wachtrijen, geen verrassingen achteraf. Ik lever snel, denk met je mee en ben altijd persoonlijk bereikbaar.\n\nGrote bureaus rekenen voor dezelfde website al snel €3000 tot €8000. Bij Yrvante betaal je een eerlijke prijs en krijg je een resultaat waar je trots op bent. Elke ZZP\'er verdient een website voor een eerlijke prijs.'
        : 'At a large web agency, you\'re one of many clients. You pay for overhead, account managers and meetings — not for your website. At Yrvante you work directly with me. No intermediaries, no queues, no surprises afterwards. I deliver fast, think along with you and am always personally available.\n\nLarge agencies quickly charge €3000 to €8000 for the same website. At Yrvante you pay a fair price and get a result you\'re proud of. Every freelancer deserves a website for a fair price.'
    },
    {
      q: language === 'nl' ? 'Mijn bedrijf is heel klein, is een website wel de moeite waard?' : 'My business is very small, is a website worth it?',
      a: language === 'nl'
        ? 'Juist dan. Mensen googlen tegenwoordig alles — ook de kapper om de hoek, de lokale schoonmaker of de startende coach. Als jij niet online staat, kiest de klant gewoon voor iemand die dat wel is. Een website is je 24/7 visitekaartje. Hij werkt ook als jij slaapt, op vakantie bent of druk aan het werk bent.\n\nJe hoeft geen groot bedrijf te zijn om er professioneel uit te zien — je hoeft alleen gevonden te worden. En met een basiswebsite vanaf €500 is de stap kleiner dan je denkt.'
        : 'Especially then. People google everything nowadays — including the local hairdresser, the local cleaner, or the starting coach. If you\'re not online, the customer simply chooses someone who is. A website is your 24/7 business card. It works while you sleep, are on vacation, or are busy working.\n\nYou don\'t need to be a big company to look professional — you just need to be found. And with a basic website from €500, the step is smaller than you think.'
    },
    {
      q: language === 'nl' ? 'Zit SEO standaard in elke website?' : 'Is SEO included in every website?',
      a: language === 'nl'
        ? 'Elke website die ik bouw heeft een solide technische basis — snelle laadtijd, mobielvriendelijk en correcte opbouw. Dat zijn de fundamenten die Google belangrijk vindt.\n\nUitgebreide SEO-optimalisatie, zoals zoekwoordonderzoek en het optimaliseren van alle pagina\'s voor Google, zit standaard in het Pro en Premium pakket. Bij het Basis pakket kan je dit altijd later toevoegen als extra.'
        : 'Every website I build has a solid technical foundation — fast loading time, mobile-friendly and correct structure. These are the fundamentals Google finds important.\n\nExtensive SEO optimization, such as keyword research and optimizing all pages for Google, is included as standard in the Pro and Premium package. With the Basic package you can always add this later as an extra.'
    },
    {
      q: language === 'nl' ? 'Kan ik ook alleen een pagina laten aanpassen van mijn bestaande site?' : 'Can I also have just one page adjusted from my existing site?',
      a: language === 'nl'
        ? 'Ja, dat kan. Heb je een bestaande website die een opfrisbeurt nodig heeft, of wil je één pagina laten aanpassen of toevoegen? Neem gewoon contact op en ik kijk wat ik voor je kan doen. Ik geef je altijd eerst een eerlijke prijsindicatie voordat er iets van start gaat.'
        : 'Yes, that\'s possible. Do you have an existing website that needs a refresh, or do you want one page adjusted or added? Just get in touch and I\'ll see what I can do for you. I\'ll always give you an honest price indication first before anything starts.'
    }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              (05)
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
              FAQ
            </h2>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 max-w-5xl">
          {faqs.slice(0, 6).map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-[0.2em] block mb-3">
                      0{index + 1}
                    </span>
                    <span className="font-bold text-lg block">{faq.q}</span>
                  </div>
                  <ChevronDown 
                    className={`flex-shrink-0 transform transition-transform mt-1 ${openIndex === index ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 mt-4 leading-relaxed whitespace-pre-line">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12">
          <button
            onClick={() => setOpenIndex(openIndex === 'all' ? null : 'all')}
            className="text-xs uppercase tracking-[0.2em] hover:underline underline-offset-4"
          >
            {language === 'nl' ? 'Bekijk alle vragen →' : 'View all questions →'}
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section - using "ik" and "jij"
const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
        toast.success(t.contact.success);
      }
    } catch (error) {
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-6">
              (04)
            </p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">
              {language === 'nl' ? 'CONTACT' : 'CONTACT'}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-12 max-w-md">
              {language === 'nl' 
                ? 'Heb je vragen of wil je weten wat ik voor je kan betekenen? Stuur een bericht — ik reageer binnen 24 uur.'
                : 'Have questions or want to know what I can do for you? Send a message — I respond within 24 hours.'}
            </p>

            <div className="space-y-8">
              <div className="border-t border-black pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Email</p>
                <a href="mailto:info@yrvante.com" className="text-lg hover:underline underline-offset-4">
                  info@yrvante.com
                </a>
              </div>
              <div className="border-t border-black pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  {language === 'nl' ? 'Locatie' : 'Location'}
                </p>
                <p className="text-lg">Nederland</p>
              </div>
              <div className="border-t border-black pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  {language === 'nl' ? 'Reactietijd' : 'Response'}
                </p>
                <p className="text-lg">{language === 'nl' ? 'Binnen 24 uur' : 'Within 24 hours'}</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7"
          >
            {submitted ? (
              <div className="bg-white p-12 text-center">
                <div className="w-16 h-16 border border-black flex items-center justify-center mx-auto mb-6">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'nl' ? 'Bericht verzonden' : 'Message sent'}
                </h3>
                <p className="text-gray-500">
                  {language === 'nl' 
                    ? 'Ik neem binnen 24 uur contact met je op.'
                    : 'I will contact you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                      {language === 'nl' ? 'Naam' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                      placeholder={language === 'nl' ? 'Je naam' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                      placeholder={language === 'nl' ? 'je@email.nl' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                    {language === 'nl' ? 'Telefoon' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder="06 12345678"
                  />
                </div>

                <div className="mb-10">
                  <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                    {language === 'nl' ? 'Bericht' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                    placeholder={language === 'nl' ? 'Vertel over je project...' : 'Tell me about your project...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  {isSubmitting 
                    ? (language === 'nl' ? 'Verzenden...' : 'Sending...') 
                    : (language === 'nl' ? 'Verstuur Bericht' : 'Send Message')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer - Brutalist
const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white border-t border-black">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo & Info */}
          <div className="col-span-12 lg:col-span-4">
            <img 
              src={LOGO_URL} 
              alt="Yrvante" 
              className="h-12 w-auto object-contain"
            />
            <p className="text-xs text-gray-500 mt-4 max-w-xs leading-relaxed">
              {language === 'nl'
                ? 'Professionele websites voor ZZP\'ers en MKB. Betaalbaar en resultaatgericht.'
                : 'Professional websites for freelancers and SMBs. Affordable and result-driven.'}
            </p>
          </div>

          {/* Links */}
          <div className="col-span-6 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
              {language === 'nl' ? 'Pagina\'s' : 'Pages'}
            </p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/pakketten" className="hover:underline underline-offset-4">{language === 'nl' ? 'Pakketten' : 'Packages'}</Link></li>
              <li><Link to="/calculator" className="hover:underline underline-offset-4">Calculator</Link></li>
              <li><Link to="/waarom-website" className="hover:underline underline-offset-4">{language === 'nl' ? 'Waarom?' : 'Why?'}</Link></li>
              <li><Link to="/blog" className="hover:underline underline-offset-4">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-6 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:info@yrvante.com" className="hover:underline underline-offset-4">info@yrvante.com</a></li>
              <li>Nederland</li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="text-xs text-gray-500">
              © {currentYear} Yrvante
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'nl' ? 'Alle rechten voorbehouden' : 'All rights reserved'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page - Brutalist Editorial
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white">
      <SEO page="/" />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyExpensiveSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
