import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CompetitorComparison = () => {
  const { language } = useLanguage();

  const providers = [
    {
      name: language === "nl" ? "Groot bureau" : "Large agency",
      type: "agency",
    },
    {
      name: "Yrvante",
      type: "yrvante",
      highlight: true,
    },
    {
      name: language === "nl" ? "Goedkope freelancer" : "Cheap freelancer",
      type: "cheap",
    },
  ];

  const features = [
    {
      label: language === "nl" ? "Prijs" : "Price",
      agency: "€3.000 - €8.000",
      yrvante: "€249 - €999",
      cheap: "€100 - €300",
    },
    {
      label: language === "nl" ? "Levertijd" : "Delivery time",
      agency: language === "nl" ? "4-12 weken" : "4-12 weeks",
      yrvante: language === "nl" ? "1-2 weken" : "1-2 weeks",
      cheap: language === "nl" ? "1-4 weken" : "1-4 weeks",
    },
    {
      label: language === "nl" ? "Custom code" : "Custom code",
      agency: true,
      yrvante: true,
      cheap: false,
    },
    {
      label: language === "nl" ? "Responsive design" : "Responsive design",
      agency: true,
      yrvante: true,
      cheap: "~",
    },
    {
      label: language === "nl" ? "Direct contact" : "Direct contact",
      agency: false,
      yrvante: true,
      cheap: "~",
    },
    {
      label: language === "nl" ? "SEO optimalisatie" : "SEO optimization",
      agency: true,
      yrvante: true,
      cheap: false,
    },
    {
      label: language === "nl" ? "Professioneel design" : "Professional design",
      agency: true,
      yrvante: true,
      cheap: false,
    },
    {
      label: language === "nl" ? "Code eigendom" : "Code ownership",
      agency: "~",
      yrvante: true,
      cheap: true,
    },
    {
      label: language === "nl" ? "Onderhoud optie" : "Maintenance option",
      agency: language === "nl" ? "€200+/mnd" : "€200+/mo",
      yrvante: "€25/mnd",
      cheap: false,
    },
    {
      label: language === "nl" ? "Verborgen kosten" : "Hidden costs",
      agency: true,
      yrvante: false,
      cheap: "~",
    },
  ];

  const getVal = (feat, type) => feat[type];

  const renderCell = (val, isHighlight) => {
    if (val === true)
      return <Check size={16} className={isHighlight ? "text-green-500" : "text-gray-400"} />;
    if (val === false)
      return <X size={16} className={isHighlight ? "text-red-400" : "text-gray-300 dark:text-neutral-600"} />;
    if (val === "~")
      return <span className="text-gray-400 text-xs">~</span>;
    return (
      <span className={`text-xs font-semibold ${isHighlight ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
        {val}
      </span>
    );
  };

  return (
    <section data-testid="competitor-comparison-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">&nbsp;</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-4">
            {language === "nl" ? "VERGELIJK" : "COMPARE"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {language === "nl"
              ? "Waarom Yrvante? Bekijk hoe wij ons onderscheiden."
              : "Why Yrvante? See how we stand out."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-neutral-800/50 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-neutral-800">
                  <th className="text-left py-6 px-6 w-[160px]">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      {language === "nl" ? "Kenmerk" : "Feature"}
                    </span>
                  </th>
                  {providers.map((p, i) => (
                    <th key={i} className={`text-center py-6 px-4 ${p.highlight ? "bg-gray-50 dark:bg-neutral-800/50" : ""}`}>
                      <p className={`text-sm font-bold ${p.highlight ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                        {p.name}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feat, fi) => (
                  <tr
                    key={fi}
                    className={`border-b border-gray-50 dark:border-neutral-800/50 ${fi % 2 === 0 ? "bg-gray-50/30 dark:bg-neutral-800/10" : ""}`}
                  >
                    <td className="py-3.5 px-6 text-sm text-gray-700 dark:text-gray-300">
                      {feat.label}
                    </td>
                    {providers.map((p, pi) => (
                      <td
                        key={pi}
                        className={`text-center py-3.5 px-4 ${p.highlight ? "bg-gray-50/50 dark:bg-neutral-800/30" : ""}`}
                      >
                        {renderCell(getVal(feat, p.type), p.highlight)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all"
            data-testid="competitor-comparison-cta"
          >
            {language === "nl" ? "Begin vandaag" : "Start today"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparison;
