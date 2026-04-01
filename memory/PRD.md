# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB available (preview)
- **Styling**: Strict neutral gray palette, glassmorphism, dark/light mode via ThemeContext

## What's Been Implemented

### Phase 1 - Core Website (Complete)
- Landing page with hero, services, process, expertise, hosting, FAQ, contact sections
- Admin Dashboard (Lead Finder) with search, filtering, and lead management
- Calculator page with live pricing for 4 packages (Rebranding €349, Basis €500, Pro €900, Premium €1400)
- Dark/Light mode with ThemeContext and white logo variants
- Cookie Banner, 404 page, lazy loading
- SEO (sitemap, schema.org, canonical URLs)
- Google Reviews integration via Places API

### Phase 2 - Conversion Features (Complete - Feb 2026)
- **Exit-Intent Popup**: YRVA10 discount code (10% off), localStorage 24h cooldown
- **YRVA10 Discount Code**: Calculator input + URL param support (?code=YRVA10)
- **Package Quiz**: 5-question wizard recommending packages
- **Trust Badges**: KVK, 100% Tevredenheid, Reactie < 2 uur, Op Maat Gemaakt

### Phase 3 - UI Redesign (Complete - Feb 2026)
- **Compact Pricing Cards**: Replaced wide comparison table with 4 compact cards with icons (RefreshCw, Monitor, Zap, Award). Pro card highlighted in dark. Each links to /calculator?package={key}
- **Combined Live Examples ("BEKIJK WAT JE KRIJGT")**: Merged live preview + features panel side by side. Left shows browser-chrome preview per industry, right shows included features with icons per tier. Premium shows booking system preview, Pro shows blog preview.
- **Before & After Slider**: Dramatically redesigned — "Before" has gradient nav, Comic Sans, yellow marquee, visitor counter, ugly table. "After" has sleek modern design with stats cards, green availability dot, dual CTAs.
- **Competitor Comparison moved**: Removed from homepage, placed on /pakketten page for better context.
- **Rebranding in navigation**: Added to Diensten dropdown menu.
- **Dark mode background**: Reduced overlay from 95% to 80% for more visible texture/pattern.
- **Rebranding Page**: Standalone at /rebranding — hero, feature cards, included/not-included lists, "Is dit iets voor mij?" checklist.
- **Micro-animations**: Hover lift on cards, parallax dots on process section.

## Page Structure
- `/` - Landing page (hero, trust badges, pricing cards, live examples, reviews, quiz, services, before/after, process, expertise, hosting, FAQ, contact)
- `/calculator` - Live price calculator with YRVA10 discount code support
- `/rebranding` - Dedicated rebranding service page
- `/pakketten` - Packages overview + Competitor Comparison table
- `/onderhoud` - Maintenance/hosting page
- `/diensten` and `/diensten/:type` - Services pages
- `/over-mij` - About page
- `/blog` - Blog
- `/privacy` - Privacy policy
- `/leadfinder` and `/admin` - Admin tools

## Key Files
- `/app/frontend/src/pages/LandingPage.jsx` - Main homepage
- `/app/frontend/src/pages/CalculatorPage.jsx` - Calculator with discount codes
- `/app/frontend/src/pages/RebrandingPage.jsx` - Rebranding service page
- `/app/frontend/src/pages/PackagesPage.jsx` - Packages + Competitor Comparison
- `/app/frontend/src/components/LiveExamples.jsx` - Combined preview + features
- `/app/frontend/src/components/BeforeAfterSlider.jsx` - Dramatic before/after
- `/app/frontend/src/components/ExitIntentPopup.jsx`
- `/app/frontend/src/components/PackageQuiz.jsx`
- `/app/frontend/src/components/CompetitorComparison.jsx`
- `/app/frontend/src/components/TrustBadges.jsx`
- `/app/backend/server.py`

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Refactor `LandingPage.jsx` — extract sections to separate component files
- Refactor `DienstenPage.jsx` — move large niches data to separate data file
- Google Sheets API integration for lead export
- Vercel production environment configuration (requires user to set env vars)
- Resend email DNS configuration (requires user DKIM/SPF setup)
