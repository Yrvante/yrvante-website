import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Monitor,
  Code,
  Rocket,
  User,
  Building2,
  Palette,
  Cpu,
  DollarSign,
  Menu,
  X,
  ArrowRight,
  Globe,
  Shield,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Zap,
  Users,
  Award,
  TrendingUp,
  Send
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

// Premium Navigation
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
    { id: "portfolio", label: t.nav.portfolio },
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
          : "bg-white"
      }`}
    >
      <div className="container-yrvante">
        <div className="flex items-center justify-between h-20">
          <a href="/" data-testid="nav-logo" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <span className="font-heading text-xl font-bold tracking-tight group-hover:text-gray-600 transition-colors">Yrvante</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="nav-link text-sm font-medium hover:text-black transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
              </button>
            ))}
            
            <Link
              to="/calculator"
              className="ml-4 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105"
            >
              {language === 'nl' ? 'Bereken Prijs' : 'Get Quote'}
            </Link>

            <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              <button
                onClick={() => setLanguage("nl")}
                className={`text-xs font-mono uppercase px-2 py-1 rounded transition-colors ${
                  language === "nl" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs font-mono uppercase px-2 py-1 rounded transition-colors ${
                  language === "en" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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

// Premium Hero Section
const HeroSection = () => {
  const { t, language } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: "50+", label: language === 'nl' ? 'Websites' : 'Websites' },
    { value: "100%", label: language === 'nl' ? 'Tevreden' : 'Satisfied' },
    { value: "24/7", label: language === 'nl' ? 'Support' : 'Support' },
  ];

  return (
    <section data-testid="hero-section" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/5 to-transparent" />
      
      <div className="container-yrvante relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {language === 'nl' ? 'Beschikbaar voor nieuwe projecten' : 'Available for new projects'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
              {language === 'nl' ? (
                <>
                  Websites die<br />
                  <span className="text-gray-400">resultaat</span> leveren
                </>
              ) : (
                <>
                  Websites that<br />
                  <span className="text-gray-400">deliver</span> results
                </>
              )}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-black/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language === 'nl' ? 'Gratis Adviesgesprek' : 'Free Consultation'}
                <ArrowRight size={18} />
              </motion.button>
              <Link
                to="/pakketten"
                className="inline-flex items-center justify-center gap-3 border-2 border-black px-8 py-4 font-medium rounded-full hover:bg-black hover:text-white transition-all"
              >
                {language === 'nl' ? 'Bekijk Pakketten' : 'View Packages'}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p className="text-3xl font-heading font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 shadow-2xl">
              <img 
                src={LOGO_URL} 
                alt="Yrvante" 
                className="w-full h-full object-contain opacity-90"
                loading="lazy"
              />
            </div>
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="font-bold">5.0</span>
              </div>
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-black text-white p-4 rounded-2xl shadow-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <p className="font-mono text-sm">Vanaf €500</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: <Monitor size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Website Ontwikkeling' : 'Website Development',
      description: language === 'nl' 
        ? 'Moderne, snelle websites die perfect werken op elk apparaat.'
        : 'Modern, fast websites that work perfectly on any device.',
      features: ['Responsive Design', 'SEO Ready', 'Snelle Hosting']
    },
    {
      icon: <Code size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Webapplicaties' : 'Web Applications',
      description: language === 'nl'
        ? 'Complexe functionaliteiten zoals boekingssystemen en dashboards.'
        : 'Complex features like booking systems and dashboards.',
      features: ['Boekingssysteem', 'Klantportaal', 'Admin Dashboard']
    },
    {
      icon: <Palette size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'UI/UX Design' : 'UI/UX Design',
      description: language === 'nl'
        ? 'Strak, modern design dat uw merk versterkt.'
        : 'Clean, modern design that strengthens your brand.',
      features: ['Custom Design', 'Branding', 'Logo Ontwerp']
    },
    {
      icon: <TrendingUp size={32} strokeWidth={1.5} />,
      title: 'SEO & Marketing',
      description: language === 'nl'
        ? 'Gevonden worden in Google en meer klanten trekken.'
        : 'Get found in Google and attract more customers.',
      features: ['SEO Optimalisatie', 'Google Analytics', 'Content']
    }
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
            {language === 'nl' ? 'Wat wij bieden' : 'What we offer'}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Van concept tot lancering, wij zorgen voor alles.'
              : 'From concept to launch, we handle everything.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <p className="text-gray-600 group-hover:text-gray-300 mb-6 transition-colors">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400">
                    <Check size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section with New Packages
const PricingSection = () => {
  const { language } = useLanguage();

  const packages = [
    {
      name: language === 'nl' ? 'Basis' : 'Basic',
      price: '500',
      description: language === 'nl' 
        ? 'Perfect voor startende ondernemers'
        : 'Perfect for starting entrepreneurs',
      features: [
        language === 'nl' ? 'Moderne responsive website' : 'Modern responsive website',
        language === 'nl' ? 'Tot 3 pagina\'s' : 'Up to 3 pages',
        language === 'nl' ? 'Mobiel, tablet & desktop' : 'Mobile, tablet & desktop',
        language === 'nl' ? 'Snelle hosting via Vercel' : 'Fast hosting via Vercel',
        language === 'nl' ? 'Basis contactpagina' : 'Basic contact page',
        language === 'nl' ? '6 correctierondes' : '6 revision rounds',
      ],
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: '900',
      description: language === 'nl'
        ? 'Meest gekozen door groeiende bedrijven'
        : 'Most chosen by growing businesses',
      features: [
        language === 'nl' ? 'Alles uit Basis +' : 'Everything from Basic +',
        language === 'nl' ? 'Tot 10 pagina\'s' : 'Up to 10 pages',
        language === 'nl' ? 'Basis SEO-optimalisatie' : 'Basic SEO optimization',
        language === 'nl' ? 'Blog pagina' : 'Blog page',
        language === 'nl' ? 'Portfolio pagina' : 'Portfolio page',
        language === 'nl' ? 'Contactformulier met email' : 'Contact form with email',
        language === 'nl' ? 'Complexere layouts' : 'Complex layouts',
      ],
      popular: true,
      color: 'black'
    },
    {
      name: 'Premium',
      price: '1400',
      description: language === 'nl'
        ? 'Complete oplossing voor ambitieuze bedrijven'
        : 'Complete solution for ambitious businesses',
      features: [
        language === 'nl' ? 'Alles uit Pro +' : 'Everything from Pro +',
        language === 'nl' ? 'Tot 15 pagina\'s' : 'Up to 15 pages',
        language === 'nl' ? 'Afspraaksysteem' : 'Booking system',
        language === 'nl' ? 'Google Reviews integratie' : 'Google Reviews integration',
        language === 'nl' ? 'Meertalige website' : 'Multi-language website',
        language === 'nl' ? 'Priority support' : 'Priority support',
      ],
      popular: false,
      color: 'gray'
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
            {language === 'nl' ? 'Website Pakketten' : 'Website Packages'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Prijzen zijn exclusief tekstschrijven en foto\'s. Content wordt door de klant aangeleverd. Inclusief 6 correctierondes per project.'
              : 'Prices exclude copywriting and photos. Content is provided by the client. Includes 6 revision rounds per project.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl ${
                pkg.popular 
                  ? 'bg-black text-white scale-105 shadow-2xl' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  {language === 'nl' ? 'Meest Gekozen' : 'Most Popular'}
                </div>
              )}
              
              <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                {pkg.description}
              </p>
              
              <div className="mb-8">
                <span className="text-5xl font-heading font-bold">€{pkg.price}</span>
                <span className={`text-sm ${pkg.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                  {' '}excl. BTW
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check 
                      size={18} 
                      className={`mt-0.5 ${pkg.popular ? 'text-green-400' : 'text-green-500'}`} 
                    />
                    <span className={pkg.popular ? 'text-gray-200' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/calculator"
                className={`block w-full text-center py-4 rounded-full font-medium transition-all ${
                  pkg.popular
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {language === 'nl' ? 'Selecteer Pakket' : 'Select Package'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Extra Options */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-heading font-bold text-center mb-8">
            {language === 'nl' ? 'Extra Opties' : 'Extra Options'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: language === 'nl' ? 'Extra pagina' : 'Extra page', price: '€40' },
              { name: language === 'nl' ? 'Meertalig' : 'Multi-language', price: '€100' },
              { name: language === 'nl' ? 'Extra formulier' : 'Extra form', price: '€80' },
              { name: language === 'nl' ? 'Onderhoud' : 'Maintenance', price: '€20/mnd' },
              { name: language === 'nl' ? 'Boekingssysteem' : 'Booking system', price: '€180' },
              { name: 'Google Reviews', price: '€80' },
            ].map((option, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <p className="font-medium text-sm">{option.name}</p>
                <p className="text-lg font-bold mt-1">{option.price}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Slider
const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Jan de Vries",
      company: "De Vries Bouw",
      role: "Eigenaar",
      text: language === 'nl'
        ? "Yrvante heeft een prachtige website voor ons bedrijf gemaakt. Binnen 2 weken waren we online en de kwaliteit is uitstekend. Heel tevreden!"
        : "Yrvante created a beautiful website for our company. Within 2 weeks we were online and the quality is excellent. Very satisfied!",
      rating: 5
    },
    {
      name: "Lisa Jansen",
      company: "Kapsalon Lisa",
      role: "ZZP'er",
      text: language === 'nl'
        ? "Als ZZP'er had ik een betaalbare maar professionele website nodig. Yrvante leverde precies dat. Het boekingssysteem werkt perfect!"
        : "As a freelancer I needed an affordable but professional website. Yrvante delivered exactly that. The booking system works perfectly!",
      rating: 5
    },
    {
      name: "Mark Peters",
      company: "Peters Coaching",
      role: "Coach",
      text: language === 'nl'
        ? "De communicatie was top en het resultaat overtrof mijn verwachtingen. Mijn nieuwe website trekt merkbaar meer klanten aan."
        : "The communication was great and the result exceeded my expectations. My new website noticeably attracts more customers.",
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
            {language === 'nl' ? 'Klantreviews' : 'Client Reviews'}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
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
              <div>
                <p className="font-bold text-lg">{testimonials[current].name}</p>
                <p className="text-gray-400">
                  {testimonials[current].role} - {testimonials[current].company}
                </p>
              </div>
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

// FAQ Section
const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: language === 'nl' ? 'Hoe lang duurt het om een website te maken?' : 'How long does it take to build a website?',
      a: language === 'nl' 
        ? 'Een basis website is meestal binnen 1-2 weken klaar. Voor complexere projecten rekenen we 2-4 weken, afhankelijk van de functionaliteiten.'
        : 'A basic website is usually ready within 1-2 weeks. For more complex projects we estimate 2-4 weeks, depending on the features.'
    },
    {
      q: language === 'nl' ? 'Wat heb ik nodig om te starten?' : 'What do I need to get started?',
      a: language === 'nl'
        ? 'U levert de teksten, foto\'s en eventueel uw logo aan. Heeft u deze niet? Dan kunnen wij helpen met tekstschrijven en stockfoto\'s tegen meerprijs.'
        : 'You provide the texts, photos and possibly your logo. Don\'t have these? We can help with copywriting and stock photos for an additional fee.'
    },
    {
      q: language === 'nl' ? 'Zijn er maandelijkse kosten?' : 'Are there monthly costs?',
      a: language === 'nl'
        ? 'De website zelf is een eenmalige investering. Optioneel bieden we een onderhoudsabonnement van €20/maand voor hosting, updates en kleine wijzigingen.'
        : 'The website itself is a one-time investment. Optionally we offer a maintenance subscription of €20/month for hosting, updates and small changes.'
    },
    {
      q: language === 'nl' ? 'Kan ik zelf de website aanpassen?' : 'Can I edit the website myself?',
      a: language === 'nl'
        ? 'Ja, we kunnen een CMS (content management systeem) inbouwen zodat u zelf eenvoudig teksten en foto\'s kunt aanpassen.'
        : 'Yes, we can build in a CMS (content management system) so you can easily edit texts and photos yourself.'
    },
    {
      q: language === 'nl' ? 'Wat als ik niet tevreden ben?' : 'What if I\'m not satisfied?',
      a: language === 'nl'
        ? 'Elk pakket bevat 6 correctierondes. We werken net zo lang door tot u 100% tevreden bent met het resultaat.'
        : 'Each package includes 6 revision rounds. We keep working until you are 100% satisfied with the result.'
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

// Newsletter Section
const NewsletterSection = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container-yrvante">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold mb-4">
            {language === 'nl' ? 'Blijf op de hoogte' : 'Stay updated'}
          </h3>
          <p className="text-gray-400 mb-6">
            {language === 'nl' 
              ? 'Ontvang tips over webdesign en digitale marketing.'
              : 'Receive tips about web design and digital marketing.'}
          </p>
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-green-400"
            >
              <Check size={20} />
              <span>{language === 'nl' ? 'Bedankt voor uw aanmelding!' : 'Thanks for subscribing!'}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'nl' ? 'Uw e-mailadres' : 'Your email address'}
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                {language === 'nl' ? 'Aanmelden' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// Enhanced Contact Section with spam protection
const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "", // Spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      console.log('Bot detected');
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
              {language === 'nl' ? 'Laten we praten' : "Let's talk"}
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              {language === 'nl' 
                ? 'Klaar om uw online aanwezigheid naar het volgende niveau te tillen? Neem contact op voor een gratis adviesgesprek.'
                : 'Ready to take your online presence to the next level? Contact us for a free consultation.'}
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
                    ? 'Bedankt voor uw bericht. We nemen binnen 24 uur contact met u op.'
                    : 'Thank you for your message. We will contact you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
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
                    placeholder={language === 'nl' ? 'Vertel ons over uw project...' : 'Tell us about your project...'}
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
              ? 'Klaar om te beginnen?' 
              : 'Ready to get started?'}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {language === 'nl'
              ? 'Laat ons uw bedrijf online laten groeien. Vraag vandaag nog een gratis offerte aan.'
              : 'Let us help your business grow online. Request a free quote today.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-105"
            >
              {language === 'nl' ? 'Bereken je prijs' : 'Calculate your price'}
              <ArrowRight size={18} />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 border border-white px-8 py-4 font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              {language === 'nl' ? 'Neem contact op' : 'Contact us'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Portfolio Section placeholder
const PortfolioSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-4">
            {t.portfolio.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">{t.portfolio.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden relative">
                <span className="font-mono text-sm text-gray-400 uppercase">
                  {t.portfolio.comingSoon}
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {language === 'nl' ? 'Binnenkort' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Premium Footer
const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: language === 'nl' ? 'Website Ontwikkeling' : 'Website Development', href: '#services' },
      { name: language === 'nl' ? 'Webapplicaties' : 'Web Applications', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'SEO & Marketing', href: '#services' },
    ],
    company: [
      { name: language === 'nl' ? 'Over Ons' : 'About Us', href: '/about' },
      { name: language === 'nl' ? 'Waarom een Website?' : 'Why a Website?', href: '/waarom-website' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
    packages: [
      { name: language === 'nl' ? 'Basis Pakket' : 'Basic Package', href: '#pricing' },
      { name: 'Pro Pakket', href: '#pricing' },
      { name: 'Premium Pakket', href: '#pricing' },
      { name: language === 'nl' ? 'Calculator' : 'Calculator', href: '/calculator' },
    ],
  };

  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="Yrvante" className="h-10 w-auto invert" />
              <span className="font-heading text-2xl font-bold">Yrvante</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              {language === 'nl'
                ? 'Moderne websites voor ZZP\'ers en MKB. Professioneel, betaalbaar en resultaatgericht.'
                : 'Modern websites for freelancers and SMBs. Professional, affordable and result-driven.'}
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>Almelo, Nederland</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">{language === 'nl' ? 'Diensten' : 'Services'}</h4>
            <ul className="space-y-3">
              {links.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{language === 'nl' ? 'Bedrijf' : 'Company'}</h4>
            <ul className="space-y-3">
              {links.company.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{language === 'nl' ? 'Pakketten' : 'Packages'}</h4>
            <ul className="space-y-3">
              {links.packages.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Yrvante. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">
              {language === 'nl' ? 'Voorwaarden' : 'Terms'}
            </a>
            <a href="#" className="hover:text-white transition-colors">KvK: 12345678</a>
          </div>
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
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
