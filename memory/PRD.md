# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB available (preview)
- **Styling**: Strict neutral gray palette, glassmorphism everywhere, dark/light mode via ThemeContext

## What's Been Implemented

### Phase 1 - Core Website (Complete)
- Landing page with hero, services, process, expertise, hosting, FAQ, contact
- Admin Dashboard (Lead Finder)
- Calculator with live pricing (Rebranding €349, Basis €500, Pro €900, Premium €1400)
- Dark/Light mode, 404 page, lazy loading, SEO, Google Reviews

### Phase 2 - Conversion Features (Complete)
- Exit-Intent Popup (YRVA10 discount code, localStorage 24h cooldown)
- YRVA10 Discount Code in Calculator (input + URL params)
- Package Quiz (5-question wizard)
- Trust Badges (KVK, Tevredenheid, Reactietijd, Maatwerk)

### Phase 3 - UI Redesign (Complete)
- Compact Pricing Cards with icons
- Combined Live Examples ("BEKIJK WAT JE KRIJGT")
- Before & After Slider, Competitor Comparison on /pakketten
- Rebranding Page, "Meer" dropdown nav

### Phase 4 - UI Polish (Complete)
- Section numbers removed, Pro card unified, Premium promotes boekingssysteem
- Parallax scrolling + micro-animations
- Section order optimized, mobile menu updated

### Phase 5 - Final Polish (Complete)
- Shopping cart icon in desktop + mobile navigation header
- Dark Mode as €80 add-on in Calculator
- Expanded Premium layout preview in LiveExamples
- Google Reviews repositioned lower on homepage

### Phase 6 - SEO & Refactoring (Complete - Apr 2026)
- SEO: Added /rebranding, /privacy + ~15 missing EN niche translations
- DienstenPage.jsx: 1949 → 880 lines (data extracted to /data/dienstenData.js)

### Phase 7 - Glassmorphism & Cleanup (Complete - Apr 2026)
- **Cookie Banner + Theme Chooser removed** — No more popups on page load
- **Global glassmorphism** — All white card/block backgrounds changed to `bg-white/60 backdrop-blur-sm` with `/50` opacity borders across ALL pages
- **Mobile shopping cart** — Cart icon added next to hamburger menu in mobile header
- Applied to: LandingPage, PackagesPage, CalculatorPage, DienstenPage, OverMijPage, OnderhoudPage, RebrandingPage, WhyWebsitePage, GoogleReviews, PackageQuiz, ExitIntentPopup, LiveExamples

## Page Structure
- `/` - Landing page (glassmorphism throughout)
- `/calculator` - Price calculator with YRVA10 discount
- `/rebranding` - Rebranding service page
- `/pakketten` - Packages overview + Competitor Comparison
- `/onderhoud` - Hosting page
- `/diensten` / `/diensten/:type` - Services
- `/voor/:niche` - Niche pages (40+ industries)
- `/over-mij` - About
- `/waarom-website` - Why a Website?
- `/blog` - Blog
- `/privacy` - Privacy
- `/leadfinder` / `/admin` - Admin tools

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Refactor LandingPage.jsx (extract sections to components)
- Google Sheets API for lead export
- Vercel production env vars (user action needed)
- Resend email DNS config (user action needed)
- Case studies/success stories for niche pages
