# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB available (preview)
- **Styling**: Strict neutral gray palette, glassmorphism everywhere, dark/light mode via ThemeContext

## File Architecture (Post-Refactoring)
```
/app/frontend/src/
├── pages/
│   ├── LandingPage.jsx (48 lines - imports all sections)
│   ├── CalculatorPage.jsx
│   ├── PackagesPage.jsx
│   ├── DienstenPage.jsx (880 lines - data in /data/dienstenData.js)
│   ├── RebrandingPage.jsx
│   ├── OverMijPage.jsx
│   ├── OnderhoudPage.jsx
│   ├── WhyWebsitePage.jsx
│   ├── BlogPage.jsx
│   └── PrivacyPage.jsx
├── components/
│   ├── landing/
│   │   ├── constants.js (URLs, API endpoints)
│   │   ├── Navigation.jsx (Header + mobile menu + cart)
│   │   ├── HeroSection.jsx (Hero with stats + CTAs)
│   │   ├── PricingSection.jsx (4 packages + 6 extras with prices)
│   │   ├── ContactSection.jsx (Form + WhatsApp + Calendly)
│   │   ├── Footer.jsx (Links + copyright)
│   │   └── Sections.jsx (Process, Expertise, Hosting, WhyExpensive, Services, Testimonials, FAQ)
│   ├── LiveExamples.jsx
│   ├── PackageQuiz.jsx
│   ├── TrustBadges.jsx
│   ├── GoogleReviews.jsx
│   ├── ExitIntentPopup.jsx
│   ├── BeforeAfterSlider.jsx
│   └── SEO.jsx
├── data/
│   └── dienstenData.js (services + niches data for DienstenPage)
└── App.js (ThemeContext, LanguageContext, Routing)
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
- **Extra's & Add-ons pricing grid**: 6 items displayed below package cards:
  - Extra pagina's: €50/pagina
  - Meertalige website: €200
  - Extra contactformulier: €80
  - Boekingssysteem: €250
  - Google Reviews: €120
  - Dark mode: €80
- All 27 tests passed (iteration 29)

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Google Sheets API for lead export
- Vercel production env vars (user action needed)
- Resend email DNS config (user action needed)
- Case studies/success stories for niche pages
