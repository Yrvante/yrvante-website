import React from "react";
import { motion } from "framer-motion";
import { useLanguage, useTheme } from "../App";
import { ArrowLeft, ArrowRight, Calendar, Clock, TrendingUp, Users, Target, DollarSign, Search, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const LOGO_URL = "/logo.png";
const LOGO_URL_WHITE = "/logo-white.png";

const BlogPage = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      back: "Terug",
      hero: {
        tag: "Blog",
        title: "Waarom een website geen luxe meer is",
        subtitle: "En waarom andere bedrijven zo duur zijn",
        readTime: "5 min leestijd",
        date: "December 2025"
      },
      intro: {
        title: "Een website is geen optie meer — het is een noodzaak",
        text: "Vroeger was een website iets voor grote bedrijven met grote budgetten. Tegenwoordig is het andersom: als je geen website hebt, word je niet serieus genomen. Klanten verwachten dat ze je kunnen googlen. En als ze je niet vinden? Dan kiezen ze voor je concurrent die dat wel heeft."
      },
      section1: {
        title: "Iedereen zoekt online",
        points: [
          {
            icon: <Search size={24} />,
            title: "93% begint met Google",
            text: "Bijna iedereen begint zijn zoektocht naar een product of dienst op Google. Als jij daar niet staat, besta je niet."
          },
          {
            icon: <Users size={24} />,
            title: "Vertrouwen begint online",
            text: "Potentiële klanten willen eerst zien wie je bent voordat ze contact opnemen. Een professionele website wekt vertrouwen."
          },
          {
            icon: <Clock size={24} />,
            title: "24/7 bereikbaar",
            text: "Je website werkt ook als jij slaapt. Klanten kunnen op elk moment informatie vinden en contact opnemen."
          }
        ]
      },
      section2: {
        title: "Waarom zijn traditionele webbureaus zo duur?",
        intro: "Je hebt vast wel eens een offerte aangevraagd bij een webbureau. €3.000, €5.000, soms zelfs €10.000+ voor een simpele website. Hoe kan dat?",
        reasons: [
          {
            title: "Overhead kosten",
            text: "Grote bureaus hebben kantoren, managers, accountmanagers, designers, developers, projectmanagers... Al die salarissen worden doorberekend in jouw factuur."
          },
          {
            title: "Lange vergaderingen",
            text: "Voor elke kleine beslissing zijn er meetings, calls en e-mails heen en weer. Die tijd wordt allemaal gefactureerd."
          },
          {
            title: "Generieke processen",
            text: "Ze bouwen elke website met hetzelfde uitgebreide proces, of je nu 3 pagina's nodig hebt of 50."
          },
          {
            title: "Premium prijsstrategie",
            text: "Veel bureaus rekenen bewust hoge prijzen om een 'exclusief' imago te behouden. Dat betekent niet dat de kwaliteit beter is."
          }
        ]
      },
      section3: {
        title: "Wat maakt Yrvante anders?",
        intro: "Bij Yrvante werk je rechtstreeks met mij. Geen tussenpersonen, geen overbodige overhead.",
        points: [
          {
            title: "Direct contact",
            text: "Je praat met degene die ook daadwerkelijk je website bouwt. Snelle communicatie, geen misverstanden."
          },
          {
            title: "Geen onnodige franje",
            text: "Ik focus op wat je echt nodig hebt: een mooie, werkende website die klanten aantrekt."
          },
          {
            title: "Eerlijke prijzen",
            text: "Ik reken geen 'premium' marge. Wat je betaalt gaat naar je website, niet naar kantoorkosten."
          },
          {
            title: "Snelle oplevering",
            text: "Zonder bureaucratie en eindeloze vergaderingen is je website binnen 1-2 weken klaar."
          }
        ]
      },
      comparison: {
        title: "De prijsvergelijking",
        traditional: {
          title: "Traditioneel webbureau",
          price: "€3.000 - €8.000+",
          points: [
            "Weken tot maanden wachten",
            "Meerdere contactpersonen",
            "Betalen voor overhead",
            "Complexe processen",
            "Moeilijk bereikbaar"
          ]
        },
        yrvante: {
          title: "Yrvante",
          price: "Vanaf €500",
          points: [
            "Klaar binnen 1-2 weken",
            "Direct contact met de bouwer",
            "Geen onnodige kosten",
            "Simpel en effectief",
            "Persoonlijk bereikbaar"
          ]
        }
      },
      stats: {
        title: "De cijfers liegen niet",
        items: [
          { value: "81%", label: "van consumenten onderzoekt online voordat ze kopen" },
          { value: "75%", label: "beoordeelt geloofwaardigheid op basis van websitedesign" },
          { value: "6x", label: "meer kans op contact met een professionele website" }
        ]
      },
      conclusion: {
        title: "Een website is een investering, geen kostenpost",
        text: "Een goede website verdient zichzelf terug. Eén nieuwe klant kan de investering al waard zijn. En met prijzen vanaf €500 is de drempel lager dan ooit.",
        cta: "Bekijk de pakketten"
      }
    },
    en: {
      back: "Back",
      hero: {
        tag: "Blog",
        title: "Why a website is no longer a luxury",
        subtitle: "And why other companies are so expensive",
        readTime: "5 min read",
        date: "December 2025"
      },
      intro: {
        title: "A website is no longer optional — it's a necessity",
        text: "In the past, a website was something for large companies with big budgets. Today it's the opposite: if you don't have a website, you won't be taken seriously. Customers expect to be able to Google you. And if they can't find you? They'll choose your competitor who does have one."
      },
      section1: {
        title: "Everyone searches online",
        points: [
          {
            icon: <Search size={24} />,
            title: "93% starts with Google",
            text: "Almost everyone starts their search for a product or service on Google. If you're not there, you don't exist."
          },
          {
            icon: <Users size={24} />,
            title: "Trust starts online",
            text: "Potential customers want to see who you are before they contact you. A professional website builds trust."
          },
          {
            icon: <Clock size={24} />,
            title: "Available 24/7",
            text: "Your website works while you sleep. Customers can find information and contact you at any time."
          }
        ]
      },
      section2: {
        title: "Why are traditional web agencies so expensive?",
        intro: "You've probably requested a quote from a web agency. €3,000, €5,000, sometimes even €10,000+ for a simple website. How is that possible?",
        reasons: [
          {
            title: "Overhead costs",
            text: "Large agencies have offices, managers, account managers, designers, developers, project managers... All those salaries are passed on in your invoice."
          },
          {
            title: "Long meetings",
            text: "Every small decision requires meetings, calls, and emails back and forth. All that time is billed."
          },
          {
            title: "Generic processes",
            text: "They build every website with the same extensive process, whether you need 3 pages or 50."
          },
          {
            title: "Premium pricing strategy",
            text: "Many agencies deliberately charge high prices to maintain an 'exclusive' image. That doesn't mean the quality is better."
          }
        ]
      },
      section3: {
        title: "What makes Yrvante different?",
        intro: "At Yrvante you work directly with me. No intermediaries, no unnecessary overhead.",
        points: [
          {
            title: "Direct contact",
            text: "You talk to the person who actually builds your website. Fast communication, no misunderstandings."
          },
          {
            title: "No unnecessary frills",
            text: "I focus on what you really need: a beautiful, working website that attracts customers."
          },
          {
            title: "Fair prices",
            text: "I don't charge a 'premium' margin. What you pay goes to your website, not office costs."
          },
          {
            title: "Fast delivery",
            text: "Without bureaucracy and endless meetings, your website is ready within 1-2 weeks."
          }
        ]
      },
      comparison: {
        title: "The price comparison",
        traditional: {
          title: "Traditional web agency",
          price: "€3,000 - €8,000+",
          points: [
            "Wait weeks to months",
            "Multiple contact persons",
            "Pay for overhead",
            "Complex processes",
            "Hard to reach"
          ]
        },
        yrvante: {
          title: "Yrvante",
          price: "From €500",
          points: [
            "Ready within 1-2 weeks",
            "Direct contact with builder",
            "No unnecessary costs",
            "Simple and effective",
            "Personally reachable"
          ]
        }
      },
      stats: {
        title: "The numbers don't lie",
        items: [
          { value: "81%", label: "of consumers research online before buying" },
          { value: "75%", label: "judge credibility based on website design" },
          { value: "6x", label: "more likely to contact with a professional website" }
        ]
      },
      conclusion: {
        title: "A website is an investment, not an expense",
        text: "A good website pays for itself. One new customer can already be worth the investment. And with prices from €500, the barrier is lower than ever.",
        cta: "View packages"
      }
    }
  };

  const t = content[language] || content.nl;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO page="/blog" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-10 lg:h-12 w-auto object-contain dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-10 lg:h-12 w-auto object-contain hidden dark:block" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">{t.hero.tag}</span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Calendar size={14} />
                {t.hero.date}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Clock size={14} />
                {t.hero.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-400">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-6 dark:text-white">{t.intro.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{t.intro.text}</p>
        </motion.section>

        {/* Section 1 - Everyone searches online */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-8 dark:text-white">{t.section1.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.section1.points.map((point, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl">
                <div className="w-12 h-12 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-xl flex items-center justify-center mb-4">
                  {point.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">{point.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{point.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2 - Why expensive */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">{t.section2.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t.section2.intro}</p>
          <div className="space-y-6">
            {t.section2.reasons.map((reason, index) => (
              <div key={index} className="flex gap-4 p-6 border border-gray-200 dark:border-neutral-700 rounded-2xl">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 dark:text-white">{reason.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Price Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-8 text-center dark:text-white">{t.comparison.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="p-8 border border-gray-200 dark:border-neutral-700 rounded-2xl">
              <h3 className="font-bold text-xl mb-2 dark:text-white">{t.comparison.traditional.title}</h3>
              <p className="text-3xl font-heading font-bold text-red-600 mb-6">{t.comparison.traditional.price}</p>
              <ul className="space-y-3">
                {t.comparison.traditional.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Yrvante */}
            <div className="p-8 bg-gray-700 text-white rounded-2xl">
              <h3 className="font-bold text-xl mb-2">{t.comparison.yrvante.title}</h3>
              <p className="text-3xl font-heading font-bold text-green-400 mb-6">{t.comparison.yrvante.price}</p>
              <ul className="space-y-3">
                {t.comparison.yrvante.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={18} className="text-green-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 3 - What makes Yrvante different */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">{t.section3.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t.section3.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.section3.points.map((point, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl">
                <h3 className="font-bold text-lg mb-2 dark:text-white">{point.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{point.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 py-12 px-8 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-3xl"
        >
          <h2 className="text-2xl font-heading font-bold mb-8 text-center">{t.stats.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-heading font-bold mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">{t.conclusion.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">{t.conclusion.text}</p>
          <Link
            to="/pakketten"
            className="inline-flex items-center justify-center gap-3 bg-gray-500 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-600 transition-all"
          >
            {t.conclusion.cta}
            <ArrowRight size={18} />
          </Link>
        </motion.section>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto dark:hidden" /><img src={LOGO_URL_WHITE} alt="Yrvante" className="h-8 w-auto hidden dark:block" />
          <span className="text-sm text-gray-400">Almelo, Nederland</span>
          <span className="text-sm text-gray-400 font-mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
