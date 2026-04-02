# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB (preview)
- **Styling**: Strict neutral gray palette, glassmorphism everywhere, dark/light mode via ThemeContext

## File Architecture
```
/app/
├── frontend/src/
│   ├── pages/
│   │   ├── LandingPage.jsx (container - imports sections)
│   │   ├── CalculatorPage.jsx
│   │   ├── PackagesPage.jsx (with Dark Mode section)
│   │   ├── DienstenPage.jsx (data in /data/dienstenData.js)
│   │   ├── RebrandingPage.jsx (with BeforeAfterSlider)
│   │   ├── OverMijPage.jsx
│   │   ├── OnderhoudPage.jsx
│   │   ├── WhyWebsitePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── LeadFinderPage.jsx
│   ├── components/
│   │   ├── landing/ (Modular homepage sections)
│   │   │   ├── constants.js, Navigation.jsx, HeroSection.jsx
│   │   │   ├── PricingSection.jsx, ContactSection.jsx
│   │   │   ├── Footer.jsx, Sections.jsx
│   │   ├── LiveExamples.jsx, PackageQuiz.jsx
│   │   ├── GoogleReviews.jsx, BeforeAfterSlider.jsx
│   │   ├── TrustBadges.jsx, CompetitorComparison.jsx
│   │   └── SEO.jsx
│   ├── data/
│   │   └── dienstenData.js (Webdesign + Rebranding + Onderhoud + niches)
│   └── App.js (ThemeContext, LanguageContext, Routing)
├── api/ (Vercel Serverless Functions - Production)
│   ├── _db.js (Shared Postgres init)
│   ├── contact.js, reviews.js
│   ├── analytics/pageview.js
│   ├── admin/login.js, stats.js, contacts.js, pageviews.js
│   ├── admin/contacts/[id].js, admin/contacts/[id]/read.js
│   └── admin/leadfinder/ (Lead Finder endpoints)
├── backend/server.py (Preview FastAPI backend)
└── vercel.json
```

## What's Been Implemented

### Phase 1-5 - Core Features (Complete)
- Full homepage with all sections, pricing, FAQ, contact
- Admin Dashboard (Lead Finder), Calculator with YRVA10 discount
- Dark/Light mode, Exit-Intent Popup, Package Quiz, Trust Badges
- Live Examples, Before/After Slider, Competitor Comparison

### Phase 6 - SEO & Refactoring (Complete)
- SEO entries for all pages
- DienstenPage.jsx data extracted to dienstenData.js

### Phase 7 - Glassmorphism & Cleanup (Complete)
- Cookie Banner + Theme Chooser removed
- Global glassmorphism on all card elements

### Phase 8 - LandingPage Refactoring + Extras (Complete)
- LandingPage split into modular components
- Extra's & Add-ons pricing grid

### Phase 9 - Production Deployment Fix (Complete - Apr 2026)
- Fixed REACT_APP_BACKEND_URL fallback (was undefined on Vercel)
- Created ALL missing Vercel serverless functions
- CI=true build passes

### Phase 10 - Mobile + Content Updates (Complete - Apr 2026)
- **Rebranding on Diensten page**: Added as 3rd service (Webdesign, Rebranding, Onderhoud)
- **BeforeAfterSlider on Rebranding page**: "VOOR & NA" section added
- **Dark Mode section on Packages page**: Feature highlight with €80 price and visual demo
- **Mobile section ordering**: Expertise/Voordelen/Hosting moved to bottom on mobile (hidden/block CSS), stays at top on desktop
- 17/17 tests passed (iteration 31)

## Vercel Environment Variables Required
- `POSTGRES_URL` — Vercel Postgres connection string
- `ADMIN_PASSWORD` — Admin dashboard password
- `GOOGLE_PLACES_API_KEY` — For Google Reviews
- `GOOGLE_PLACE_ID` — Yrvante's Google Business Place ID
- `RESEND_API_KEY` — For email delivery
- `SENDER_EMAIL` — noreply@yrvante.com
- `RECIPIENT_EMAIL` — info@yrvante.com

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Google Sheets API for lead export
- Case studies/success stories for niche pages
- Split LiveExamples.jsx into separate component files
- Resend email DNS config (DKIM/SPF for yrvante.com)
- Dark mode edge cases review on all subpages
