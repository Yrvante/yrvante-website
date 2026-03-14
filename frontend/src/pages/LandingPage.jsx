import React, { useState, useEffect } from "react";
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
  Send,
} from "lucide-react";
import HeroAnimation from "../components/HeroAnimation";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = "https://customer-assets.emergentagent.com/job_yrvante-design/artifacts/22y72wxq_Yrvante%20logo.png";

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
    { id: "services", label: language === 'nl' ? 'Diensten' : 'Services' },
    { id: "pricing", label: language === 'nl' ? 'Pakketten' : 'Packages' },
    { id: "testimonials", label: language === 'nl' ? 'Reviews' : 'Reviews' },
    { id: "faq", label: 'FAQ' },
    { id: "contact", label: 'Contact' },
  ];

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 bg-white border-b border-gray-100 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-yrvante">
        <div className="flex items-center justify-between h-20">
          <a href="/" data-testid="nav-logo" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <span className="font-heading text-xl font-bold tracking-tight text-black group-hover:opacity-70 transition-colors">Yrvante</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
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
                  language === "nl" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs font-mono uppercase px-2 py-1 rounded transition-colors ${
                  language === "en" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section - Animation at top, content directly below
const HeroSection = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="pt-20">
      {/* Video/Animation at TOP */}
      <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden bg-black">
        <HeroAnimation />
      </div>
      
      {/* Content directly below - no extra spacing */}
      <div className="bg-white py-12 md:py-16">
        <div className="container-yrvante">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <span className="text-sm font-medium text-black">
                  {language === 'nl' ? 'Beschikbaar voor nieuwe projecten' : 'Available for new projects'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-black">
                {language === 'nl' ? (
                  <>
                    Jouw bedrijf<br />
                    <span className="text-gray-400">professioneel online</span>
                  </>
                ) : (
                  <>
                    Your business<br />
                    <span className="text-gray-400">professionally online</span>
                  </>
                )}
              </h1>
              
              {/* Value proposition - using "we" and "jij" */}
              <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                {language === 'nl' 
                  ? 'Wij bouwen geen website — wij zorgen dat jouw bedrijf er online professioneel uitziet zodat klanten je serieus nemen.'
                  : "We don't build websites — we make sure your business looks professional online so customers take you seriously."}
              </p>
              <p className="text-base md:text-lg text-gray-500 mb-8 max-w-xl mx-auto">
                {language === 'nl'
                  ? 'Dat is het verschil tussen een offerte vergelijken op prijs of op waarde.'
                  : "That's the difference between comparing quotes on price or on value."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <motion.button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 font-medium rounded-full hover:bg-gray-800 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'nl' ? 'Neem Contact Op' : 'Get In Touch'}
                  <ArrowRight size={18} />
                </motion.button>
                <Link
                  to="/pakketten"
                  className="inline-flex items-center justify-center gap-3 border-2 border-black text-black px-8 py-4 font-medium rounded-full hover:bg-black hover:text-white transition-all"
                >
                  {language === 'nl' ? 'Bekijk Pakketten' : 'View Packages'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 md:gap-16 justify-center">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-black">100%</p>
                  <p className="text-sm text-gray-500">{language === 'nl' ? 'Tevreden klanten' : 'Satisfied clients'}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-black">€500</p>
                  <p className="text-sm text-gray-500">{language === 'nl' ? 'Vanaf' : 'Starting from'}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-black">1-2</p>
                  <p className="text-sm text-gray-500">{language === 'nl' ? 'Weken' : 'Weeks'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Expensive Section - Link to separate page
const WhyExpensiveSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container-yrvante">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {language === 'nl' 
                  ? 'Waarom zijn wij goedkoper?' 
                  : 'Why are we more affordable?'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'nl'
                  ? 'Veel webdesignbureaus rekenen €1.500 tot €5.000 of meer voor een website. Wij geloven dat een professionele website voor iedere ondernemer bereikbaar moet zijn.'
                  : 'Many web design agencies charge €1,500 to €5,000 or more for a website. We believe a professional website should be accessible to every entrepreneur.'}
              </p>
              <p className="text-gray-600 mb-6">
                {language === 'nl'
                  ? 'Daarom beginnen onze websites vanaf €500 — zonder kwaliteit in te leveren.'
                  : "That's why our websites start from €500 — without compromising on quality."}
              </p>
              <Link
                to="/waarom-website"
                className="inline-flex items-center gap-2 text-black font-medium hover:underline"
              >
                {language === 'nl' ? 'Lees meer: Waarom een website geen luxe meer is' : 'Read more: Why a website is no longer a luxury'}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-black text-white p-8 rounded-2xl">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                {language === 'nl' ? 'Vergelijk' : 'Compare'}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                  <span className="text-gray-300">{language === 'nl' ? 'Traditionele bureaus' : 'Traditional agencies'}</span>
                  <span className="font-bold">€1.500 - €5.000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Yrvante</span>
                  <span className="font-bold text-xl">Vanaf €500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section - simplified with links
const ServicesSection = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Monitor size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Website Ontwikkeling' : 'Website Development',
      description: language === 'nl' 
        ? 'Moderne, snelle websites die perfect werken op elk apparaat.'
        : 'Modern, fast websites that work perfectly on any device.',
    },
    {
      icon: <Code size={32} strokeWidth={1.5} />,
      title: language === 'nl' ? 'Webapplicaties' : 'Web Applications',
      description: language === 'nl'
        ? 'Boekingssystemen, klantportalen en op maat gemaakte oplossingen.'
        : 'Booking systems, client portals and custom-made solutions.',
    },
  ];

  return (
    <section id="services" data-testid="services-section" className="py-16 bg-white">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'nl' ? 'Wat wij doen' : 'What we do'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-all"
            >
              <div className="mb-4 text-black">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
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
        ? 'Tot 3 pagina\'s, responsive, snelle hosting'
        : 'Up to 3 pages, responsive, fast hosting',
      popular: false,
    },
    {
      name: 'Pro',
      price: '900',
      description: language === 'nl'
        ? 'Tot 10 pagina\'s, SEO, blog, contactformulier'
        : 'Up to 10 pages, SEO, blog, contact form',
      popular: true,
    },
    {
      name: 'Premium',
      price: '1400',
      description: language === 'nl'
        ? 'Tot 15 pagina\'s, boekingssysteem, meertalig'
        : 'Up to 15 pages, booking system, multi-language',
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white border-t border-gray-100">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'nl' ? 'Pakketten' : 'Packages'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {language === 'nl' 
              ? 'Prijzen excl. BTW. Jij levert de teksten en foto\'s aan.'
              : 'Prices excl. VAT. You provide the texts and photos.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
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
                  : 'border border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'nl' ? 'Populair' : 'Popular'}
                </div>
              )}
              
              <h3 className="text-xl font-heading font-bold mb-2">{pkg.name}</h3>
              <div className="mb-3">
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

// FAQ Section - removed CMS question, using "we" and "jij"
const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: language === 'nl' ? 'Hoe lang duurt het om een website te maken?' : 'How long does it take to build a website?',
      a: language === 'nl' 
        ? 'Een basis website is meestal binnen 1-2 weken klaar. Voor complexere projecten rekenen we 2-3 weken.'
        : 'A basic website is usually ready within 1-2 weeks. For more complex projects we estimate 2-3 weeks.'
    },
    {
      q: language === 'nl' ? 'Wat heb ik nodig om te starten?' : 'What do I need to get started?',
      a: language === 'nl'
        ? 'Jij levert de teksten, foto\'s en eventueel je logo aan. Heb je deze niet? Dan kunnen wij helpen met tekstschrijven en stockfoto\'s.'
        : 'You provide the texts, photos and possibly your logo. Don\'t have these? We can help with copywriting and stock photos.'
    },
    {
      q: language === 'nl' ? 'Zijn er maandelijkse kosten?' : 'Are there monthly costs?',
      a: language === 'nl'
        ? 'De website zelf is een eenmalige investering. Optioneel bieden wij een onderhoudsabonnement van €20/maand voor hosting, updates en kleine wijzigingen.'
        : 'The website itself is a one-time investment. Optionally we offer a maintenance subscription of €20/month for hosting, updates and small changes.'
    },
    {
      q: language === 'nl' ? 'Hoe kan ik contact opnemen?' : 'How can I get in touch?',
      a: language === 'nl'
        ? 'Je kunt ons bereiken via email of telefoon. Heb je vragen? We bellen je graag terug om alles door te nemen — vrijblijvend en zonder verplichtingen.'
        : 'You can reach us via email or phone. Have questions? We\'d be happy to call you back to discuss everything — no obligations.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white border-t border-gray-100">
      <div className="container-yrvante">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'nl' ? 'Veelgestelde vragen' : 'FAQ'}
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-gray-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
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
                    <p className="px-5 pb-5 text-gray-600">{faq.a}</p>
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

// Contact Section - using "we" and "jij"
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
    <section id="contact" className="py-16 bg-white border-t border-gray-100">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {language === 'nl' ? 'Neem contact op' : "Get in touch"}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'nl' 
                ? 'Heb je vragen of wil je weten wat we voor je kunnen betekenen? Stuur een bericht of bel ons — we reageren binnen 24 uur.'
                : 'Have questions or want to know what we can do for you? Send a message or call us — we respond within 24 hours.'}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@yrvante.com" className="text-gray-600 hover:text-black">
                    info@yrvante.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Telefoon' : 'Phone'}</p>
                  <p className="text-gray-600">{language === 'nl' ? 'Bel of app ons' : 'Call or message us'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Locatie' : 'Location'}</p>
                  <p className="text-gray-600">Almelo, Nederland</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">{language === 'nl' ? 'Reactietijd' : 'Response'}</p>
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
              <div className="border border-gray-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {language === 'nl' ? 'Bericht verzonden!' : 'Message sent!'}
                </h3>
                <p className="text-gray-600">
                  {language === 'nl' 
                    ? 'Bedankt! We nemen binnen 24 uur contact met je op.'
                    : 'Thanks! We will contact you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{language === 'nl' ? 'Naam' : 'Name'} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black"
                      placeholder={language === 'nl' ? 'Je naam' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black"
                      placeholder={language === 'nl' ? 'je@email.nl' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'nl' ? 'Telefoon' : 'Phone'}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black"
                    placeholder="06 12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'nl' ? 'Bericht' : 'Message'} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black resize-none"
                    placeholder={language === 'nl' ? 'Vertel over je project...' : 'Tell us about your project...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{language === 'nl' ? 'Verzenden...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{language === 'nl' ? 'Verstuur bericht' : 'Send message'}</span>
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

// Footer
const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto invert" />
              <span className="font-heading text-xl font-bold">Yrvante</span>
            </div>
            <p className="text-gray-400 text-sm">
              {language === 'nl'
                ? 'Professionele websites voor ZZP\'ers en MKB. Betaalbaar en resultaatgericht.'
                : 'Professional websites for freelancers and SMBs. Affordable and result-driven.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{language === 'nl' ? 'Pagina\'s' : 'Pages'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pakketten" className="text-gray-400 hover:text-white">{language === 'nl' ? 'Pakketten' : 'Packages'}</Link></li>
              <li><Link to="/calculator" className="text-gray-400 hover:text-white">Calculator</Link></li>
              <li><Link to="/waarom-website" className="text-gray-400 hover:text-white">{language === 'nl' ? 'Waarom een website?' : 'Why a website?'}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">{language === 'nl' ? 'Over ons' : 'About us'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:info@yrvante.com" className="hover:text-white">info@yrvante.com</a></li>
              <li>Almelo, Nederland</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} Yrvante. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <WhyExpensiveSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
