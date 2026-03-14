import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
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
  TrendingUp,
  Send,
  MessageCircle
} from "lucide-react";
import HeroAnimation from "../components/HeroAnimation";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = "https://customer-assets.emergentagent.com/job_yrvante-design/artifacts/22y72wxq_Yrvante%20logo.png";

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation
const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
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

  const navLinks = [
    { id: "services", label: t.nav.services },
    { id: "pricing", label: language === 'nl' ? 'Pakketten' : 'Packages' },
    { id: "why-us", label: language === 'nl' ? 'Waarom Yrvante' : 'Why Yrvante' },
    { id: "testimonials", label: language === 'nl' ? 'Reviews' : 'Reviews' },
    { id: "faq", label: 'FAQ' },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container-yrvante">
        <div className="flex items-center justify-between h-20">
          <a href="/" data-testid="nav-logo" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <span className={`font-heading text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-black' : 'text-white'} group-hover:opacity-70`}>Yrvante</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors relative group ${scrolled ? 'text-gray-600 hover:text-black' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${scrolled ? 'bg-black' : 'bg-white'}`} />
              </button>
            ))}
            
            <Link
              to="/calculator"
              className="ml-4 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-105"
            >
              {language === 'nl' ? 'Bereken Prijs' : 'Get Quote'}
            </Link>

            <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
              <button
                onClick={() => setLanguage("nl")}
                className={`text-xs font-mono uppercase px-2 py-1 rounded transition-colors ${
                  language === "nl" 
                    ? "bg-white text-black" 
                    : scrolled ? "text-gray-500 hover:bg-gray-100" : "text-white/60 hover:text-white"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs font-mono uppercase px-2 py-1 rounded transition-colors ${
                  language === "en" 
                    ? "bg-white text-black" 
                    : scrolled ? "text-gray-500 hover:bg-gray-100" : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-gray-100 text-black' : 'text-white hover:bg-white/10'}`}
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
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container-yrvante py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-lg font-medium py-2 hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/calculator"
                className="block w-full text-center py-3 bg-black text-white font-medium rounded-lg mt-4"
              >
                {language === 'nl' ? 'Bereken Prijs' : 'Get Quote'}
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setLanguage("nl"); setMobileMenuOpen(false); }}
                  className={`text-sm font-mono ${language === "nl" ? "font-bold" : "opacity-50"}`}
                >
                  NL
                </button>
                <span className="text-gray-300">/</span>
                <button
                  onClick={() => { setLanguage("en"); setMobileMenuOpen(false); }}
                  className={`text-sm font-mono ${language === "en" ? "font-bold" : "opacity-50"}`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section with Video Animation
const HeroSection = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center">
      {/* Video/Animation Background */}
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="container-yrvante relative z-20">
        <div className="max-w-3xl py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white">
                {language === 'nl' ? 'Beschikbaar voor nieuwe projecten' : 'Available for new projects'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-white">
              {language === 'nl' ? (
                <>
                  Uw bedrijf<br />
                  <span className="text-gray-300">professioneel online</span>
                </>
              ) : (
                <>
                  Your business<br />
                  <span className="text-gray-300">professionally online</span>
                </>
              )}
            </h1>
            
            {/* Value proposition - NEW */}
            <p className="text-xl text-gray-200 mb-4 max-w-xl leading-relaxed">
              {language === 'nl' 
                ? 'Ik bouw geen website — ik zorg dat uw bedrijf er online professioneel uitziet zodat klanten u serieus nemen.'
                : "I don't build websites — I make sure your business looks professional online so customers take you seriously."}
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              {language === 'nl'
                ? 'Dat is het verschil tussen een offerte vergelijken op prijs of op waarde.'
                : "That's the difference between comparing quotes on price or on value."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language === 'nl' ? 'Neem Contact Op' : 'Get In Touch'}
                <ArrowRight size={18} />
              </motion.button>
              <Link
                to="/pakketten"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 font-medium rounded-full hover:bg-white hover:text-black transition-all"
              >
                {language === 'nl' ? 'Bekijk Pakketten' : 'View Packages'}
              </Link>
            </div>

            {/* Simple stats - removed 50+ */}
            <div className="flex gap-8 text-white/80">
              <div>
                <p className="text-2xl font-heading font-bold text-white">100%</p>
                <p className="text-sm">{language === 'nl' ? 'Tevreden klanten' : 'Satisfied clients'}</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-white">€500</p>
                <p className="text-sm">{language === 'nl' ? 'Vanaf' : 'Starting from'}</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-white">1-2</p>
                <p className="text-sm">{language === 'nl' ? 'Weken' : 'Weeks'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section - simplified
const ServicesSection = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Monitor size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Website Ontwikkeling' : 'Website Development',
      description: language === 'nl' 
        ? 'Moderne, snelle websites die perfect werken op elk apparaat. Van simpele landingspagina tot uitgebreide bedrijfswebsite.'
        : 'Modern, fast websites that work perfectly on any device. From simple landing pages to extensive business websites.',
    },
    {
      icon: <Code size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Webapplicaties' : 'Web Applications',
      description: language === 'nl'
        ? 'Complexe functionaliteiten zoals boekingssystemen, klantportalen en op maat gemaakte oplossingen.'
        : 'Complex features like booking systems, client portals and custom-made solutions.',
    },
  ];

  return (
    <section id="services" data-testid="services-section" className="py-24 bg-white">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">
            {language === 'nl' ? 'Wat ik bied' : 'What I offer'}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            {language === 'nl' ? 'Diensten' : 'Services'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
            >
              <div className="mb-6 text-gray-400 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section - simplified, links to /pakketten
const PricingSection = () => {
  const { language } = useLanguage();

  const packages = [
    {
      name: language === 'nl' ? 'Basis' : 'Basic',
      price: '500',
      description: language === 'nl' 
        ? 'Tot 3 pagina\'s, responsive design, snelle hosting'
        : 'Up to 3 pages, responsive design, fast hosting',
      popular: false,
    },
    {
      name: 'Pro',
      price: '900',
      description: language === 'nl'
        ? 'Tot 10 pagina\'s, SEO, blog, portfolio, contactformulier'
        : 'Up to 10 pages, SEO, blog, portfolio, contact form',
      popular: true,
    },
    {
      name: 'Premium',
      price: '1400',
      description: language === 'nl'
        ? 'Tot 15 pagina\'s, boekingssysteem, meertalig, priority support'
        : 'Up to 15 pages, booking system, multi-language, priority support',
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">
            {language === 'nl' ? 'Transparante prijzen' : 'Transparent pricing'}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            {language === 'nl' ? 'Pakketten' : 'Packages'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {language === 'nl' 
              ? 'Prijzen zijn exclusief BTW. Content (teksten en foto\'s) wordt door u aangeleverd.'
              : 'Prices exclude VAT. Content (texts and photos) is provided by you.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl text-center ${
                pkg.popular 
                  ? 'bg-black text-white' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'nl' ? 'Populair' : 'Popular'}
                </div>
              )}
              
              <h3 className="text-xl font-heading font-bold mb-2">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-heading font-bold">€{pkg.price}</span>
              </div>
              <p className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                {pkg.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pakketten"
            className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all"
          >
            {language === 'nl' ? 'Bekijk alle details' : 'View all details'}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Why Us Section - brings back the old text about being affordable
const WhyUsSection = () => {
  const { language } = useLanguage();

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">
              {language === 'nl' ? 'Waarom Yrvante' : 'Why Yrvante'}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {language === 'nl' 
                ? 'Professioneel, zonder de hoge prijzen'
                : 'Professional, without the high prices'}
            </h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                {language === 'nl'
                  ? 'Veel ondernemers denken dat een website automatisch duizenden euro\'s moet kosten. En eerlijk gezegd is dat vaak ook zo — veel webdesignbureaus rekenen €1.500 tot €5.000 of meer.'
                  : 'Many entrepreneurs think a website automatically costs thousands of euros. And honestly, that\'s often true — many web design agencies charge €1,500 to €5,000 or more.'}
              </p>
              <p className="text-lg">
                {language === 'nl'
                  ? 'Bij Yrvante geloof ik dat een professionele website voor iedere ondernemer bereikbaar moet zijn. Daarom beginnen mijn websites al vanaf €500. U krijgt een moderne, snelle website die er professioneel uitziet en perfect werkt op mobiel, tablet en desktop.'
                  : 'At Yrvante, I believe a professional website should be accessible to every entrepreneur. That\'s why my websites start from just €500. You get a modern, fast website that looks professional and works perfectly on mobile, tablet and desktop.'}
              </p>
              <p className="text-lg font-medium text-black">
                {language === 'nl'
                  ? 'Het belangrijkste: een website waar nieuwe klanten uw bedrijf leren kennen, vertrouwen krijgen en besluiten om contact op te nemen.'
                  : 'The most important thing: a website where new customers get to know your business, gain trust and decide to get in touch.'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                title: language === 'nl' ? 'Snelle oplevering' : 'Fast delivery',
                description: language === 'nl' ? 'Uw website binnen 1-2 weken online' : 'Your website online within 1-2 weeks'
              },
              {
                title: language === 'nl' ? 'Persoonlijk contact' : 'Personal contact',
                description: language === 'nl' ? 'Direct contact via telefoon of email, geen lange wachttijden' : 'Direct contact via phone or email, no long waiting times'
              },
              {
                title: language === 'nl' ? '6 correctierondes' : '6 revision rounds',
                description: language === 'nl' ? 'Tot u 100% tevreden bent met het resultaat' : 'Until you are 100% satisfied with the result'
              },
              {
                title: language === 'nl' ? 'Geen verborgen kosten' : 'No hidden costs',
                description: language === 'nl' ? 'Transparante prijzen, u weet precies waar u aan toe bent' : 'Transparent prices, you know exactly what to expect'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials - without names and company
const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      text: language === 'nl'
        ? "Binnen 2 weken was mijn website online en de kwaliteit is uitstekend. Heel tevreden met het resultaat!"
        : "Within 2 weeks my website was online and the quality is excellent. Very satisfied with the result!",
      type: language === 'nl' ? 'Bouwbedrijf' : 'Construction company',
      rating: 5
    },
    {
      text: language === 'nl'
        ? "Als ZZP'er had ik een betaalbare maar professionele website nodig. Dit was precies wat ik zocht."
        : "As a freelancer I needed an affordable but professional website. This was exactly what I was looking for.",
      type: language === 'nl' ? 'ZZP\'er' : 'Freelancer',
      rating: 5
    },
    {
      text: language === 'nl'
        ? "De communicatie was top en het resultaat overtrof mijn verwachtingen. Mijn nieuwe website trekt merkbaar meer klanten aan."
        : "The communication was great and the result exceeded my expectations. My new website noticeably attracts more customers.",
      type: language === 'nl' ? 'Coach' : 'Coach',
      rating: 5
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-black text-white overflow-hidden">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-4">
            {language === 'nl' ? 'Wat klanten zeggen' : 'What clients say'}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            {language === 'nl' ? 'Reviews' : 'Reviews'}
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
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-heading mb-8 leading-relaxed">
                "{testimonials[current].text}"
              </p>
              <p className="text-gray-400">
                — {testimonials[current].type}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'w-8 bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section - updated answers
const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: language === 'nl' ? 'Hoe lang duurt het om een website te maken?' : 'How long does it take to build a website?',
      a: language === 'nl' 
        ? 'Een basis website is meestal binnen 1-2 weken klaar. Voor complexere projecten met extra functionaliteiten rekenen we 2-3 weken.'
        : 'A basic website is usually ready within 1-2 weeks. For more complex projects with extra features we estimate 2-3 weeks.'
    },
    {
      q: language === 'nl' ? 'Wat heb ik nodig om te starten?' : 'What do I need to get started?',
      a: language === 'nl'
        ? 'U levert de teksten, foto\'s en eventueel uw logo aan. Heeft u deze niet? Dan kan ik helpen met tekstschrijven en stockfoto\'s.'
        : 'You provide the texts, photos and possibly your logo. Don\'t have these? I can help with copywriting and stock photos.'
    },
    {
      q: language === 'nl' ? 'Zijn er maandelijkse kosten?' : 'Are there monthly costs?',
      a: language === 'nl'
        ? 'De website zelf is een eenmalige investering. Optioneel bied ik een onderhoudsabonnement van €20/maand voor hosting, updates en kleine wijzigingen.'
        : 'The website itself is a one-time investment. Optionally I offer a maintenance subscription of €20/month for hosting, updates and small changes.'
    },
    {
      q: language === 'nl' ? 'Kan ik zelf de website aanpassen?' : 'Can I edit the website myself?',
      a: language === 'nl'
        ? 'Ja, ik kan een CMS (content management systeem) inbouwen zodat u zelf eenvoudig teksten en foto\'s kunt aanpassen.'
        : 'Yes, I can build in a CMS (content management system) so you can easily edit texts and photos yourself.'
    },
    {
      q: language === 'nl' ? 'Hoe kan ik contact opnemen?' : 'How can I get in touch?',
      a: language === 'nl'
        ? 'U kunt mij bereiken via email of telefoon. Heeft u vragen? Ik bel u graag terug om alles door te nemen — vrijblijvend en zonder verplichtingen.'
        : 'You can reach me via email or phone. Have questions? I\'d be happy to call you back to discuss everything — no obligations.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            {language === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{faq.q}</span>
                <ChevronDown 
                  className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section - updated CTA text
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
    
    if (formData.honeypot) {
      return;
    }

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
      console.error("Contact form error:", error);
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">
              {t.contact.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {language === 'nl' ? 'Neem contact op' : "Get in touch"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'nl' 
                ? 'Heeft u vragen of wilt u weten wat ik voor u kan betekenen? Stuur een bericht of bel mij — ik reageer binnen 24 uur.'
                : 'Have questions or want to know what I can do for you? Send a message or call me — I respond within 24 hours.'}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@yrvante.com" className="text-gray-600 hover:text-black transition-colors">
                    info@yrvante.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Telefoon' : 'Phone'}</p>
                  <p className="text-gray-600">{language === 'nl' ? 'Bel of app mij' : 'Call or message me'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Locatie' : 'Location'}</p>
                  <p className="text-gray-600">Almelo, Nederland</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Reactietijd' : 'Response time'}</p>
                  <p className="text-gray-600">{language === 'nl' ? 'Binnen 24 uur' : 'Within 24 hours'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">
                  {language === 'nl' ? 'Bericht verzonden!' : 'Message sent!'}
                </h3>
                <p className="text-gray-600">
                  {language === 'nl' 
                    ? 'Bedankt voor uw bericht. Ik neem binnen 24 uur contact met u op.'
                    : 'Thank you for your message. I will contact you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.name} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                      placeholder={language === 'nl' ? 'Uw naam' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.email} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                      placeholder={language === 'nl' ? 'uw@email.nl' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'nl' ? 'Telefoonnummer' : 'Phone number'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    placeholder={language === 'nl' ? '06 12345678' : '+31 6 12345678'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.message} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder={language === 'nl' ? 'Vertel over uw project...' : 'Tell us about your project...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>{t.contact.sending}</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container-yrvante text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            {language === 'nl' 
              ? 'Klaar om online te gaan?' 
              : 'Ready to go online?'}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {language === 'nl'
              ? 'Bereken direct uw prijs of neem contact op. Ik denk graag met u mee.'
              : 'Calculate your price directly or get in touch. I\'d love to help you.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-105"
            >
              {language === 'nl' ? 'Bereken uw prijs' : 'Calculate your price'}
              <ArrowRight size={18} />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 border border-white px-8 py-4 font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              {language === 'nl' ? 'Neem contact op' : 'Contact me'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const links = {
    pages: [
      { name: language === 'nl' ? 'Home' : 'Home', href: '/' },
      { name: language === 'nl' ? 'Pakketten' : 'Packages', href: '/pakketten' },
      { name: language === 'nl' ? 'Calculator' : 'Calculator', href: '/calculator' },
      { name: language === 'nl' ? 'Over Mij' : 'About Me', href: '/about' },
      { name: language === 'nl' ? 'Waarom een Website?' : 'Why a Website?', href: '/waarom-website' },
    ],
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto invert" />
              <span className="font-heading text-xl font-bold">Yrvante</span>
            </div>
            <p className="text-gray-400 mb-4">
              {language === 'nl'
                ? 'Professionele websites voor ZZP\'ers en MKB. Betaalbaar en resultaatgericht.'
                : 'Professional websites for freelancers and SMBs. Affordable and result-driven.'}
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>Almelo, Nederland</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">{language === 'nl' ? 'Pagina\'s' : 'Pages'}</h4>
            <ul className="space-y-3">
              {links.pages.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:info@yrvante.com" className="hover:text-white transition-colors">
                  info@yrvante.com
                </a>
              </li>
              <li>Almelo, Nederland</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Yrvante. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
