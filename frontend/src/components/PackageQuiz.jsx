import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../App";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, HelpCircle, Check, RotateCcw } from "lucide-react";

const questions = {
  nl: [
    {
      q: "Heb je al een website?",
      options: [
        { label: "Ja, maar die is verouderd", value: "rebranding" },
        { label: "Nee, ik begin helemaal opnieuw", value: "new" },
      ],
    },
    {
      q: "Hoeveel pagina's heb je nodig?",
      options: [
        { label: "1-3 pagina's (simpel)", value: "few" },
        { label: "4-10 pagina's (uitgebreid)", value: "medium" },
        { label: "10+ pagina's (groot)", value: "many" },
      ],
    },
    {
      q: "Heb je een boekingssysteem nodig?",
      options: [
        { label: "Ja, klanten moeten online afspraken maken", value: "yes" },
        { label: "Nee, dat is niet nodig", value: "no" },
      ],
    },
    {
      q: "Moet je website meertalig zijn?",
      options: [
        { label: "Ja, meerdere talen", value: "yes" },
        { label: "Nee, alleen Nederlands", value: "no" },
      ],
    },
    {
      q: "Wat is je budget?",
      options: [
        { label: "Tot €400", value: "low" },
        { label: "€400 - €700", value: "mid" },
        { label: "€700 - €1000", value: "high" },
        { label: "€1000+", value: "premium" },
      ],
    },
  ],
  en: [
    {
      q: "Do you already have a website?",
      options: [
        { label: "Yes, but it's outdated", value: "rebranding" },
        { label: "No, I'm starting from scratch", value: "new" },
      ],
    },
    {
      q: "How many pages do you need?",
      options: [
        { label: "1-3 pages (simple)", value: "few" },
        { label: "4-10 pages (extended)", value: "medium" },
        { label: "10+ pages (large)", value: "many" },
      ],
    },
    {
      q: "Do you need a booking system?",
      options: [
        { label: "Yes, clients should book online", value: "yes" },
        { label: "No, not needed", value: "no" },
      ],
    },
    {
      q: "Should your website be multi-language?",
      options: [
        { label: "Yes, multiple languages", value: "yes" },
        { label: "No, just one language", value: "no" },
      ],
    },
    {
      q: "What is your budget?",
      options: [
        { label: "Up to €400", value: "low" },
        { label: "€400 - €700", value: "mid" },
        { label: "€700 - €1000", value: "high" },
        { label: "€1000+", value: "premium" },
      ],
    },
  ],
};

const recommendations = {
  nl: {
    rebranding: {
      name: "Rebranding Website",
      price: "€349",
      desc: "Perfect voor jou! Je bestaande website krijgt een compleet nieuw design.",
      link: "/calculator?package=rebranding",
    },
    basic: {
      name: "Basis Website",
      price: "€500",
      desc: "Ideaal voor een startende ondernemer met een simpele maar professionele website.",
      link: "/calculator?package=basic",
    },
    pro: {
      name: "Pro Website",
      price: "€900",
      desc: "De beste keuze voor groeiende bedrijven die meer willen dan het basis.",
      link: "/calculator?package=pro",
    },
    premium: {
      name: "Premium Website",
      price: "€1400",
      desc: "De complete oplossing met alle features die je nodig hebt.",
      link: "/calculator?package=premium",
    },
  },
  en: {
    rebranding: {
      name: "Rebranding Website",
      price: "€349",
      desc: "Perfect for you! Your existing website gets a complete new design.",
      link: "/calculator?package=rebranding",
    },
    basic: {
      name: "Basic Website",
      price: "€500",
      desc: "Ideal for starting entrepreneurs with a simple but professional website.",
      link: "/calculator?package=basic",
    },
    pro: {
      name: "Pro Website",
      price: "€900",
      desc: "The best choice for growing businesses that want more than the basics.",
      link: "/calculator?package=pro",
    },
    premium: {
      name: "Premium Website",
      price: "€1400",
      desc: "The complete solution with all the features you need.",
      link: "/calculator?package=premium",
    },
  },
};

function getRecommendation(answers) {
  let score = { rebranding: 0, basic: 0, pro: 0, premium: 0 };

  // Q1: existing website?
  if (answers[0] === "rebranding") {
    score.rebranding += 3;
  } else {
    score.basic += 1;
    score.pro += 1;
    score.premium += 1;
  }

  // Q2: pages
  if (answers[1] === "few") {
    score.basic += 2;
    score.rebranding += 1;
  } else if (answers[1] === "medium") {
    score.pro += 3;
  } else {
    score.premium += 3;
  }

  // Q3: booking
  if (answers[2] === "yes") {
    score.premium += 3;
  } else {
    score.basic += 1;
    score.pro += 1;
  }

  // Q4: multi-language
  if (answers[3] === "yes") {
    score.premium += 3;
  } else {
    score.basic += 1;
    score.pro += 1;
  }

  // Q5: budget
  if (answers[4] === "low") {
    score.rebranding += 3;
    score.basic += 1;
  } else if (answers[4] === "mid") {
    score.basic += 2;
    score.pro += 1;
  } else if (answers[4] === "high") {
    score.pro += 3;
  } else {
    score.premium += 3;
  }

  const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  return best;
}

const PackageQuiz = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);

  const qs = questions[language] || questions.nl;
  const recs = recommendations[language] || recommendations.nl;

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < qs.length - 1) {
      setStep(step + 1);
    } else {
      const rec = getRecommendation(newAnswers);
      setResult(rec);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setStarted(false);
  };

  if (!started) {
    return (
      <section data-testid="package-quiz-section" className="py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">
              (10)
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-4">
              {language === "nl" ? "WELK PAKKET?" : "WHICH PACKAGE?"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {language === "nl"
                ? "Beantwoord 5 korte vragen en ontdek welk pakket het beste bij jou past."
                : "Answer 5 short questions and discover which package suits you best."}
            </p>
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105"
              data-testid="quiz-start-btn"
            >
              <HelpCircle size={18} />
              {language === "nl" ? "Start de quiz" : "Start the quiz"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (result) {
    const rec = recs[result];
    return (
      <section data-testid="package-quiz-section" className="py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl border border-gray-200 dark:border-neutral-700 p-8 text-center shadow-xl"
              data-testid="quiz-result"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-green-600" />
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {language === "nl" ? "Ons advies voor jou" : "Our advice for you"}
              </p>
              <h3 className="text-3xl font-black dark:text-white mb-1">
                {rec.name}
              </h3>
              <p className="text-4xl font-black text-gray-500 mb-4">{rec.price}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                {rec.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={rec.link}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all"
                  data-testid="quiz-result-cta"
                >
                  {language === "nl" ? "Bereken je prijs" : "Calculate your price"}
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider rounded-full hover:border-gray-500 transition-all"
                  data-testid="quiz-retry-btn"
                >
                  <RotateCcw size={14} />
                  {language === "nl" ? "Opnieuw" : "Retry"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="package-quiz-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="max-w-lg mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {qs.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= step
                    ? "bg-gray-500"
                    : "bg-gray-200 dark:bg-neutral-700"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                {language === "nl" ? `Vraag ${step + 1} van ${qs.length}` : `Question ${step + 1} of ${qs.length}`}
              </p>
              <h3 className="text-2xl font-bold dark:text-white mb-6">
                {qs[step].q}
              </h3>
              <div className="space-y-3">
                {qs[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-5 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl hover:border-gray-500 dark:hover:border-neutral-500 transition-all group"
                    data-testid={`quiz-option-${i}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium dark:text-white">
                        {opt.label}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <button
              onClick={goBack}
              className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              data-testid="quiz-back-btn"
            >
              <ArrowLeft size={14} />
              {language === "nl" ? "Vorige vraag" : "Previous question"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageQuiz;
