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
│   ├── App.js (ThemeContext, LanguageContext, Global BG pattern, Routing)
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
│   │   ├── DeviceMockups.jsx
│   │   └── SEO.jsx
│   ├── data/
│   │   └── dienstenData.js
│   └── index.css (Global styles, dark mode)
├── api/ (Vercel Serverless Functions - MAX 12 allowed)
│   ├── _db.js (Shared Postgres init)
│   ├── contact.js, reviews.js
│   ├── analytics/pageview.js
│   ├── admin/login.js, stats.js, contacts.js
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
- Cookie Banner + Theme Chooser popups
- Global glassmorphism on all card elements

### Phase 8 - LandingPage Refactoring + Extras (Complete)
- LandingPage split into modular components
- Extra's & Add-ons pricing grid

### Phase 9 - Production Deployment Fix (Complete - Apr 2026)
- Fixed REACT_APP_BACKEND_URL fallback (was undefined on Vercel)
- Created ALL missing Vercel serverless functions
- CI=true build passes

### Phase 10 - Mobile + Content Updates (Complete - Apr 2026)
- Rebranding on Diensten page as 3rd service
- BeforeAfterSlider on Rebranding page
- Dark Mode section on Packages page
- Mobile section ordering optimization
- 17/17 tests passed (iteration 31)

### Phase 11 - Global Glassmorphism + Hero Redesign (Complete - Apr 2026)
- **Global BG Pattern**: Moved from LandingPage to App.js so ALL pages show the bg-pattern.jpg
- **All page wrappers transparent**: Removed solid `bg-white dark:bg-neutral-950` from all public pages
- **Section backgrounds**: Converted all `bg-gray-50`, `bg-gray-100` sections to semi-transparent with `backdrop-blur-sm`
- **Hero logo redesign**: Logo placed prominently ABOVE MacBook mockup on desktop
- **Mobile logo-in-text**: On mobile/iPhone, the "O" in "JOUW" is replaced with the round Yrvante logo (since desktop right-side mockups are hidden on mobile)
- **CSS cleanup**: Removed `!important` overrides from dark mode that blocked glassmorphism

### Phase 12 - UI Polish (Complete - Apr 2026)
- **FAQ "Zie meer"**: Eerste 3 vragen zichtbaar, rest achter "Zie meer" knop
- **Groen beschikbaarheidbolletje**: `bg-gray-400` → `bg-green-500` met pulse animatie
- **Google Reviews fallback**: Toont altijd reviews, zelfs als API niet geconfigureerd is op productie
- **Nav opschoning**: "Alle Branches" en "Blog" verwijderd uit header dropdown menu's
- **Mobile logo-in-text**: Logo in "JOUW" op mobiel (O → Yrvante logo)

### Phase 13 - Lead Finder Synoniem-Uitbreiding (Complete - Apr 2026)
- **Synoniem-dictionary**: 30+ branches met automatische zoekterm-uitbreiding (bijv. "nagelstudio" → nagels, nail salon, manicure, gelnagels, pedicure nagels)
- **Multi-term scraping**: Alle scrapers (Instagram, Facebook, LinkedIn, Telefoongids, Gouden Gids, Marktplaats, KVK) doorzoeken nu ELKE synoniem per branche
- **Deduplicatie**: Dubbele resultaten worden automatisch verwijderd via place_id en URL tracking
- **UI indicator**: Blauw "Synoniem-uitbreiding actief" banner toont alle gebruikte zoektermen na het zoeken

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
- SEO verification on all pages

## Critical Design Rules
- **Glassmorphism**: Use `bg-white/40 backdrop-blur-sm` (NOT solid `bg-white`)
- **Dark mode logos**: Use white `.png` variants (NOT CSS `invert`)
- **Vercel API limit**: MAX 12 serverless functions. Merge before adding.
- **No blue/navy**: Strictly neutral gray palette
