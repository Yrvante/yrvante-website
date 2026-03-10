import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import axios from "axios";
import { toast } from "sonner";
import { 
  Monitor, 
  Briefcase, 
  Code, 
  User, 
  Building2, 
  Rocket,
  Palette,
  Cpu,
  DollarSign,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Globe
} from "lucide-react";
import HeroAnimation from "../components/HeroAnimation";
import BackgroundDecorations from "../components/BackgroundDecorations";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_yrvante-design/artifacts/22y72wxq_Yrvante%20logo.png";

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
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

// Navigation Component
const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="container-yrvante">
        <div className="flex items-center justify-between h-20">
          {/* Logo - moved to left side, smaller */}
          <a href="/" data-testid="nav-logo" className="flex items-center">
            <span className="font-heading text-xl font-bold tracking-tight">Yrvante</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              data-testid="nav-services"
              onClick={() => scrollToSection("services")}
              className="nav-link text-sm font-medium"
            >
              {t.nav.services}
            </button>
            <button
              data-testid="nav-about"
              onClick={() => scrollToSection("about")}
              className="nav-link text-sm font-medium"
            >
              {t.nav.about}
            </button>
            <button
              data-testid="nav-portfolio"
              onClick={() => scrollToSection("portfolio")}
              className="nav-link text-sm font-medium"
            >
              {t.nav.portfolio}
            </button>
            <button
              data-testid="nav-contact"
              onClick={() => scrollToSection("contact")}
              className="nav-link text-sm font-medium"
            >
              {t.nav.contact}
            </button>

            {/* Language Toggle */}
            <div className="lang-toggle flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              <button
                data-testid="lang-nl"
                onClick={() => setLanguage("nl")}
                className={`text-xs font-mono uppercase ${language === "nl" ? "active font-bold" : ""}`}
              >
                NL
              </button>
              <span className="text-gray-300">/</span>
              <button
                data-testid="lang-en"
                onClick={() => setLanguage("en")}
                className={`text-xs font-mono uppercase ${language === "en" ? "active font-bold" : ""}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 top-20 bg-white z-40 md:hidden ${
          mobileMenuOpen ? "open" : ""
        }`}
      >
        <div className="container-yrvante py-8 flex flex-col space-y-6">
          <button
            data-testid="mobile-nav-services"
            onClick={() => scrollToSection("services")}
            className="text-left text-2xl font-heading"
          >
            {t.nav.services}
          </button>
          <button
            data-testid="mobile-nav-about"
            onClick={() => scrollToSection("about")}
            className="text-left text-2xl font-heading"
          >
            {t.nav.about}
          </button>
          <button
            data-testid="mobile-nav-portfolio"
            onClick={() => scrollToSection("portfolio")}
            className="text-left text-2xl font-heading"
          >
            {t.nav.portfolio}
          </button>
          <button
            data-testid="mobile-nav-contact"
            onClick={() => scrollToSection("contact")}
            className="text-left text-2xl font-heading"
          >
            {t.nav.contact}
          </button>

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <button
              data-testid="mobile-lang-nl"
              onClick={() => setLanguage("nl")}
              className={`text-sm font-mono ${language === "nl" ? "font-bold" : "opacity-50"}`}
            >
              NL
            </button>
            <span className="text-gray-300">/</span>
            <button
              data-testid="mobile-lang-en"
              onClick={() => setLanguage("en")}
              className={`text-sm font-mono ${language === "en" ? "font-bold" : "opacity-50"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section data-testid="hero-section" className="py-16 md:py-20">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-6">
              Web Development & Software
            </p>
            <h1 className="hero-title font-heading mb-4">
              Yrvante
            </h1>
            <p className="font-mono text-lg md:text-xl text-yrvante-text-secondary mb-8">
              <span className="text-gray-400">(</span>
              <span className="italic">"Smart web & software"</span>
              <span className="text-gray-400">);</span>
            </p>
            <p className="text-base md:text-lg text-yrvante-text-secondary max-w-2xl mb-10 leading-relaxed">
              {t.hero.description}
            </p>
            <motion.button
              data-testid="hero-cta"
              onClick={scrollToContact}
              className="btn-primary inline-flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.cta}
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
          <motion.div
            className="lg:col-span-4 hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={LOGO_URL} alt="Yrvante Logo" className="w-72 h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Monitor size={32} strokeWidth={1} />,
      title: t.services.web.title,
      description: t.services.web.description,
    },
    {
      icon: <Briefcase size={32} strokeWidth={1} />,
      title: t.services.business.title,
      description: t.services.business.description,
    },
    {
      icon: <Code size={32} strokeWidth={1} />,
      title: t.services.software.title,
      description: t.services.software.description,
    },
  ];

  return (
    <section id="services" data-testid="services-section" className="section-padding bg-yrvante-surface">
      <div className="container-yrvante">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-4">
            {t.services.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading">{t.services.title}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-testid={`service-card-${index}`}
              className="service-card card-yrvante"
              variants={fadeUp}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-heading mb-4">{service.title}</h3>
              <p className="text-yrvante-text-secondary">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Target Audience Section
const TargetSection = () => {
  const { t } = useLanguage();

  const targets = [
    {
      icon: <User size={32} strokeWidth={1} />,
      title: t.target.zzp.title,
      description: t.target.zzp.description,
    },
    {
      icon: <Building2 size={32} strokeWidth={1} />,
      title: t.target.outdated.title,
      description: t.target.outdated.description,
    },
    {
      icon: <Rocket size={32} strokeWidth={1} />,
      title: t.target.startup.title,
      description: t.target.startup.description,
    },
  ];

  return (
    <section data-testid="target-section" className="section-padding">
      <div className="container-yrvante">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-4">
            {t.target.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading">{t.target.title}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {targets.map((target, index) => (
            <motion.div
              key={index}
              data-testid={`target-card-${index}`}
              className="flex flex-col"
              variants={fadeUp}
            >
              <div className="mb-4">{target.icon}</div>
              <h3 className="text-xl font-heading mb-3">{target.title}</h3>
              <p className="text-yrvante-text-secondary">{target.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" data-testid="about-section" className="section-padding bg-black text-white">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
              {t.about.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading mb-8">{t.about.title}</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin size={16} />
              <span className="font-mono text-sm">{t.about.location}</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              {t.about.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section - Empty placeholders
const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" data-testid="portfolio-section" className="section-padding">
      <div className="container-yrvante">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-4">
            {t.portfolio.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading">{t.portfolio.title}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              data-testid={`portfolio-card-${index}`}
              className="portfolio-card card-yrvante group"
              variants={fadeUp}
            >
              <div className="aspect-video bg-yrvante-surface flex items-center justify-center border border-gray-200">
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                  {t.portfolio.comingSoon}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhySection = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <Palette size={32} strokeWidth={1} />,
      title: t.why.design.title,
      description: t.why.design.description,
    },
    {
      icon: <Cpu size={32} strokeWidth={1} />,
      title: t.why.expertise.title,
      description: t.why.expertise.description,
    },
    {
      icon: <DollarSign size={32} strokeWidth={1} />,
      title: t.why.affordable.title,
      description: t.why.affordable.description,
    },
  ];

  return (
    <section data-testid="why-section" className="section-padding bg-yrvante-surface">
      <div className="container-yrvante">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-4">
            {t.why.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading">{t.why.title}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              data-testid={`why-card-${index}`}
              className="text-center md:text-left"
              variants={fadeUp}
            >
              <div className="mb-4 inline-block">{reason.icon}</div>
              <h3 className="text-xl font-heading mb-3">{reason.title}</h3>
              <p className="text-yrvante-text-secondary">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success(t.contact.success);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="section-padding">
      <div className="container-yrvante">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-4">
              {t.contact.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading mb-8">{t.contact.title}</h2>
            <p className="text-lg text-yrvante-text-secondary mb-8">{t.contact.formTitle}</p>
            
            <div className="flex items-center space-x-2 text-yrvante-text-secondary">
              <Globe size={16} />
              <span className="font-mono text-sm">yrvante.com</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-yrvante"
                  placeholder={t.contact.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-yrvante"
                  placeholder={t.contact.email}
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-yrvante-text-secondary mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  data-testid="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-yrvante resize-none"
                  placeholder={t.contact.message}
                />
              </div>

              <motion.button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? t.contact.sending : t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="py-12 border-t border-gray-200">
      <div className="container-yrvante">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-yrvante-text-secondary">
            <span className="font-mono text-xs">{t.footer.location}</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>© {currentYear} Yrvante. {t.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white relative">
      <BackgroundDecorations showShapes={true} showCode={true} showDots={false} />
      <Navigation />
      <HeroAnimation />
      <HeroSection />
      <ServicesSection />
      <TargetSection />
      <AboutSection />
      <PortfolioSection />
      <WhySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
