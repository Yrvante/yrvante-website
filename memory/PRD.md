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
│   │   ├── LandingPage.jsx (48 lines - imports all sections)
│   │   ├── CalculatorPage.jsx
│   │   ├── PackagesPage.jsx
│   │   ├── DienstenPage.jsx (880 lines - data in /data/dienstenData.js)
│   │   ├── RebrandingPage.jsx
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
│   │   └── dienstenData.js
│   └── App.js (ThemeContext, LanguageContext, Routing)
├── api/ (Vercel Serverless Functions - Production)
│   ├── _db.js (Shared Postgres init)
│   ├── contact.js (Contact form + Resend email)
│   ├── reviews.js (Google Reviews via Places API)
│   ├── analytics/pageview.js (Page view tracking)
│   ├── admin/login.js (Admin auth)
│   ├── admin/stats.js (Dashboard stats)
│   ├── admin/contacts.js (List contacts)
│   ├── admin/contacts/[id].js (Delete contact)
│   ├── admin/contacts/[id]/read.js (Mark read)
│   ├── admin/pageviews.js (Analytics data)
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
- Parallax scrolling, micro-animations

### Phase 6 - SEO & Refactoring (Complete - Apr 2026)
- SEO entries for /rebranding, /privacy + ~15 missing EN niche translations
- DienstenPage.jsx: 1949 → 880 lines (data to /data/dienstenData.js)

### Phase 7 - Glassmorphism & Cleanup (Complete - Apr 2026)
- Cookie Banner + Theme Chooser removed (no popups)
- Global glassmorphism on all card elements across ALL pages
- Mobile shopping cart icon in header

### Phase 8 - LandingPage Refactoring + Extras (Complete - Apr 2026)
- **LandingPage.jsx**: 1753 → 48 lines — all sections extracted to /components/landing/
- **Extra's & Add-ons pricing grid**: 6 items
- All 27 tests passed (iteration 29)

### Phase 9 - Production Deployment Fix (Complete - Apr 2026)
- Fixed `REACT_APP_BACKEND_URL` fallback in App.js, AdminDashboard, GoogleReviews, HeroSection (was `undefined` on Vercel → now falls back to relative `/api` paths)
- Created ALL missing Vercel serverless functions: reviews, analytics/pageview, admin/login, admin/stats, admin/contacts, admin/contacts/[id], admin/contacts/[id]/read, admin/pageviews
- Created shared `_db.js` for Vercel Postgres table initialization
- CI=true build passes (Vercel-compatible)
- 36/36 frontend tests passed (iteration 30)

## Vercel Environment Variables Required
The user MUST set these in the Vercel Dashboard (Settings → Environment Variables):
- `POSTGRES_URL` — Vercel Postgres connection string
- `ADMIN_PASSWORD` — Admin dashboard password
- `GOOGLE_PLACES_API_KEY` — For Google Reviews
- `GOOGLE_PLACE_ID` — Yrvante's Google Business Place ID
- `RESEND_API_KEY` — For email delivery
- `SENDER_EMAIL` — Sender email (e.g., noreply@yrvante.com)
- `RECIPIENT_EMAIL` — Where contact forms go (e.g., info@yrvante.com)

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Google Sheets API for lead export
- Case studies/success stories for niche pages
- Split LiveExamples.jsx into separate component files
- Resend email DNS config (DKIM/SPF for yrvante.com)
