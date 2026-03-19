import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { MapPin, ArrowLeft, Target, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

// Free to use code/tech images from Unsplash (no credit required for Unsplash license)
const codeImages = [
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Code on screen"
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    alt: "Programming code"
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    alt: "Computer screen code"
  }
];

const AboutPage = () => {
  const { language } = useLanguage();
  
  const content = {
    nl: {
      back: "Terug naar home",
      subtitle: "Over Ons",
      title: "Wie is Yrvante?",
      intro: "Achter Yrvante schuilt een passie voor techniek en resultaat. Met een achtergrond in high-precision manufacturing weten wij als geen ander dat de kleinste details het grootste verschil maken. Vandaag de dag vertalen wij die nauwkeurigheid naar de digitale wereld.",
      goal: "Ons doel? Kleine bedrijven helpen groeien met websites die niet alleen mooi zijn, maar ook écht werken. Wij zien een website niet als een statisch visitekaartje, maar als een oplossing voor een probleem.",
      approach: "Of het nu gaat om een technisch struikelblok of een ontwerp dat niet converteert: wij duiken erin tot het is opgelost. Zo kunt u zich focussen op uw onderneming, terwijl uw online fundering staat als een huis.",
      values: {
        title: "Onze Waarden",
        items: [
          {
            icon: <Target size={28} strokeWidth={1.5} />,
            title: "Precisie",
            description: "Elk detail telt. Van code tot design, wij werken nauwkeurig en gestructureerd."
          },
          {
            icon: <Wrench size={28} strokeWidth={1.5} />,
            title: "Oplossingen",
            description: "Wij zien problemen als uitdagingen. We stoppen niet tot het werkt."
          },
          {
            icon: <Users size={28} strokeWidth={1.5} />,
            title: "Samenwerking",
            description: "Uw succes is ons succes. We denken mee en communiceren helder."
          }
        ]
      },
      location: "Almelo, Nederland",
      cta: "Neem contact op"
    },
    en: {
      back: "Back to home",
      subtitle: "About Us",
      title: "Who is Yrvante?",
      intro: "Behind Yrvante lies a passion for technology and results. With a background in high-precision manufacturing, we know better than anyone that the smallest details make the biggest difference. Today, we translate that precision to the digital world.",
      goal: "Our goal? Help small businesses grow with websites that are not only beautiful, but actually work. We see a website not as a static business card, but as a solution to a problem.",
      approach: "Whether it's a technical hurdle or a design that doesn't convert: we dive in until it's solved. This way you can focus on your business, while your online foundation stands solid.",
      values: {
        title: "Our Values",
        items: [
          {
            icon: <Target size={28} strokeWidth={1.5} />,
            title: "Precision",
            description: "Every detail counts. From code to design, we work accurately and structured."
          },
          {
            icon: <Wrench size={28} strokeWidth={1.5} />,
            title: "Solutions",
            description: "We see problems as challenges. We don't stop until it works."
          },
          {
            icon: <Users size={28} strokeWidth={1.5} />,
            title: "Collaboration",
            description: "Your success is our success. We think along and communicate clearly."
          }
        ]
      },
      location: "Almelo, Netherlands",
      cta: "Get in touch"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <SEO page="/about" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <Link to="/" className="font-heading text-xl font-bold">Yrvante</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">
              {t.subtitle}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-thin mb-4">
              {t.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 space-y-8"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                {t.intro}
              </p>
              <div className="w-16 h-px bg-black"></div>
              <p className="text-lg leading-relaxed text-gray-600">
                {t.goal}
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                {t.approach}
              </p>
              
              <div className="flex items-center gap-2 pt-4 text-gray-400">
                <MapPin size={16} />
                <span className="font-mono text-sm">{t.location}</span>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 overflow-hidden">
                  <img
                    src={codeImages[0].url}
                    alt={codeImages[0].alt}
                    className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src={codeImages[1].url}
                    alt={codeImages[1].alt}
                    className="w-full h-32 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src={codeImages[2].url}
                    alt={codeImages[2].alt}
                    className="w-full h-32 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-thin mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.values.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((value, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-white p-8 rounded-3xl border border-gray-200 h-full transition-all duration-300 hover:border-black hover:shadow-lg">
                  <div className="mb-6 text-gray-400 group-hover:text-black transition-colors">{value.icon}</div>
                  <h3 className="text-xl font-heading mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-700 text-white rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-thin mb-8">
              {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
            </h2>
            <Link
              to="/#contact"
              className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-mono text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              {t.cta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-heading text-lg">Yrvante</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
