import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { MapPin, ArrowLeft, Code, Target, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Free to use code/tech images from Unsplash
const codeImages = [
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Code on screen",
    credit: "Ilya Pavlov"
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    alt: "Laptop coding",
    credit: "Christopher Gower"
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    alt: "Programming code",
    credit: "Arnold Francisca"
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    alt: "Computer screen code",
    credit: "Clément H"
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

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
            icon: <Target size={24} strokeWidth={1.5} />,
            title: "Precisie",
            description: "Elk detail telt. Van code tot design, wij werken nauwkeurig en gestructureerd."
          },
          {
            icon: <Wrench size={24} strokeWidth={1.5} />,
            title: "Oplossingen",
            description: "Wij zien problemen als uitdagingen. We stoppen niet tot het werkt."
          },
          {
            icon: <Users size={24} strokeWidth={1.5} />,
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
            icon: <Target size={24} strokeWidth={1.5} />,
            title: "Precision",
            description: "Every detail counts. From code to design, we work accurately and structured."
          },
          {
            icon: <Wrench size={24} strokeWidth={1.5} />,
            title: "Solutions",
            description: "We see problems as challenges. We don't stop until it works."
          },
          {
            icon: <Users size={24} strokeWidth={1.5} />,
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <span className="font-heading text-xl font-bold">Yrvante</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
              {t.subtitle}
            </p>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              {t.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl leading-relaxed text-gray-700">
                {t.intro}
              </p>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {codeImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ aspectRatio: i === 0 ? '16/9' : '1/1' }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 text-white text-xs font-mono">
                    {img.credit}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-12"
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
                className="bg-white p-8 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
            </h2>
            <Link
              to="/#contact"
              className="inline-block bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              {t.cta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-heading font-bold">Yrvante</span>
          <span className="text-sm text-gray-500">© {new Date().getFullYear()} Yrvante</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
