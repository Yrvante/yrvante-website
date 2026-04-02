import React, { lazy, Suspense } from "react";
import { BG_IMAGE } from "../components/landing/constants";
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

const LandingPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-black'}`}>
      <SEO page="/" />

      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${theme === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.25]'}`} style={{ backgroundImage: `url(${BG_IMAGE})` }} />
      </div>

      <div className="relative z-10 flex flex-col">
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
    </div>
  );
};

export default LandingPage;
