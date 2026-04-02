import React, { lazy, Suspense } from "react";
import Navigation from "../components/landing/Navigation";
import HeroSection from "../components/landing/HeroSection";
import PricingSection from "../components/landing/PricingSection";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";
import { ProcessSection, WhyExpensiveSection, ServicesSection, FAQSection } from "../components/landing/Sections";
import SEO from "../components/SEO";
import { useTheme } from "../App";

const PackageQuiz = lazy(() => import("../components/PackageQuiz"));
const LiveExamples = lazy(() => import("../components/LiveExamples"));
const TrustBadges = lazy(() => import("../components/TrustBadges"));
const GoogleReviews = lazy(() => import("../components/GoogleReviews"));
const ExitIntentPopup = lazy(() => import("../components/ExitIntentPopup"));
const CookieBanner = lazy(() => import("../components/CookieBanner"));
const ThemeChooser = lazy(() => import("../components/ThemeChooser"));

const LandingPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <SEO page="/" />

      <div className="relative flex flex-col">
        <Navigation />
        <HeroSection />
        <ProcessSection />
        <WhyExpensiveSection />
        <ServicesSection />
        <Suspense fallback={null}><LiveExamples /></Suspense>
        <PricingSection />
        <Suspense fallback={null}><PackageQuiz /></Suspense>
        <FAQSection />
        <Suspense fallback={null}><GoogleReviews /></Suspense>
        <ContactSection />
        <Footer />
      </div>
      <Suspense fallback={null}><ExitIntentPopup /></Suspense>
      <Suspense fallback={null}><CookieBanner /></Suspense>
      <Suspense fallback={null}><ThemeChooser /></Suspense>
    </div>
  );
};

export default LandingPage;
