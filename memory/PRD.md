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
- **Exit-Intent Popup**: Shows YRVA10 discount code (10% off) when user tries to leave. localStorage prevents re-showing for 24h.
- **YRVA10 Discount Code**: Works in Calculator page. Input field + URL param support (?code=YRVA10). Shows strikethrough original price.
- **Package Quiz**: 5-question wizard ("Welk pakket past bij mij?") that recommends Rebranding/Basis/Pro/Premium based on answers. Links to calculator with pre-selected package.
- **Live Examples**: Interactive industry switcher (Kapper, Loodgieter, Coach, Restaurant) x tier (Basis/Pro/Premium) x view mode (desktop/mobile). Shows browser-chrome preview of what the website would look like.
- **Before & After Slider**: Draggable slider showing old (Times New Roman, ugly) vs new (modern, clean) website mockup.
- **Competitor Comparison Table**: Groot bureau vs Yrvante vs Goedkope freelancer — comparing price, speed, custom code, SEO, direct contact, etc.
- **Trust Badges**: KVK Geregistreerd, 100% Tevredenheid, Reactie < 2 uur, Op Maat Gemaakt.
- **Rebranding Page**: Standalone page at /rebranding with hero, features, included/not-included lists, "Is dit iets voor mij?" section, and CTA to calculator.
- **Glassmorphism CTA Banner**: Calculator CTA on homepage replaced from dark navy to transparent glass (bg-white/60 backdrop-blur-xl).
- **Micro-animations**: Hover lift effects on service cards, parallax background dots on process section.

## Page Structure
- `/` - Landing page (hero, trust badges, pricing, reviews, quiz, live examples, services, before/after, process, competitor comparison, expertise, hosting, FAQ, contact)
- `/calculator` - Live price calculator with discount code support
- `/rebranding` - Dedicated rebranding service page
- `/pakketten` - Packages overview
- `/onderhoud` - Maintenance/hosting page
- `/diensten` and `/diensten/:type` - Services pages
- `/over-mij` - About page
- `/blog` - Blog
- `/privacy` - Privacy policy
- `/leadfinder` and `/admin` - Admin tools

## Key Files
- `/app/frontend/src/pages/LandingPage.jsx` (~1700 lines, houses all homepage sections)
- `/app/frontend/src/pages/CalculatorPage.jsx` (discount code + URL params)
- `/app/frontend/src/pages/RebrandingPage.jsx` (standalone rebranding page)
- `/app/frontend/src/components/ExitIntentPopup.jsx`
- `/app/frontend/src/components/PackageQuiz.jsx`
- `/app/frontend/src/components/BeforeAfterSlider.jsx`
- `/app/frontend/src/components/LiveExamples.jsx`
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
