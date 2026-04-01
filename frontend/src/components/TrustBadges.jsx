import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { Shield, Award, Clock, ThumbsUp } from "lucide-react";

const TrustBadges = () => {
  const { language } = useLanguage();

  const badges = [
    {
      icon: Shield,
      title: language === "nl" ? "KVK Geregistreerd" : "Chamber of Commerce",
      desc: language === "nl" ? "Geverifieerd bedrijf" : "Verified business",
    },
    {
      icon: ThumbsUp,
      title: language === "nl" ? "100% Tevredenheid" : "100% Satisfaction",
      desc: language === "nl" ? "Niet tevreden? Ik pas aan tot je dat wel bent" : "Not satisfied? I adjust until you are",
    },
    {
      icon: Clock,
      title: language === "nl" ? "Reactie < 2 uur" : "Response < 2 hours",
      desc: language === "nl" ? "Snel en persoonlijk contact" : "Fast and personal contact",
    },
    {
      icon: Award,
      title: language === "nl" ? "Op Maat Gemaakt" : "Custom Built",
      desc: language === "nl" ? "Geen templates, 100% maatwerk" : "No templates, 100% custom",
    },
  ];

  return (
    <section data-testid="trust-badges-section" className="py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/60 dark:bg-neutral-800/40 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-neutral-700/50"
              data-testid={`trust-badge-${i}`}
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <badge.icon size={22} strokeWidth={1.5} className="text-gray-500" />
              </div>
              <h4 className="font-bold text-sm dark:text-white mb-1">{badge.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
