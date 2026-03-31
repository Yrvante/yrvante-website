import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "../App";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const GoogleReviews = () => {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/reviews`)
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) return null;

  const { rating, total_reviews, reviews, google_url } = data;

  const t = {
    nl: {
      title: "Wat Klanten Zeggen",
      subtitle: "GOOGLE REVIEWS",
      based: `Gebaseerd op ${total_reviews} review${total_reviews !== 1 ? "s" : ""}`,
      noText: "Heeft een beoordeling achtergelaten zonder tekst.",
      viewAll: "Bekijk op Google",
      leaveReview: "Laat een review achter",
    },
    en: {
      title: "What Clients Say",
      subtitle: "GOOGLE REVIEWS",
      based: `Based on ${total_reviews} review${total_reviews !== 1 ? "s" : ""}`,
      noText: "Left a rating without text.",
      viewAll: "View on Google",
      leaveReview: "Leave a review",
    },
  };
  const c = t[language] || t.nl;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12" data-testid="google-reviews-section">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-3">
            {c.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-5">
            {c.title}
          </h2>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-neutral-700"}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{rating}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">{c.based}</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        {reviews.length > 0 && (
          <div className={`grid gap-5 mb-10 ${
            reviews.length === 1 ? "max-w-lg mx-auto" :
            reviews.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" :
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 hover:shadow-lg transition-shadow"
                data-testid={`review-card-${i}`}
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {review.author_name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-neutral-700"}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {review.text || <span className="italic text-gray-400 dark:text-gray-500">{c.noText}</span>}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {google_url && (
            <a
              href={google_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-neutral-700 rounded-full hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              data-testid="reviews-view-google"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {c.viewAll}
              <ExternalLink size={12} />
            </a>
          )}
          {google_url && (
            <a
              href={google_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wide uppercase bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
              data-testid="reviews-leave-review"
            >
              <Star size={12} />
              {c.leaveReview}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
