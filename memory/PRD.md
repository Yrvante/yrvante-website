# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch web design company website. Focus on pixel-perfect UI, brand consistency, responsive design, dark/light mode support, and mobile-first experience.

## Architecture
- **Frontend**: React + Tailwind CSS (Shadcn UI components)
- **Backend**: FastAPI (Preview), Node.js (Vercel Production)
- **Database**: MongoDB (Preview), Vercel Postgres (Production)
- **Styling**: Tailwind with `dark:` variants, ThemeContext, LanguageContext (NL/EN)

## Key Pages
- LandingPage.jsx — Homepage with hero, process, services (3 incl. Rebranding), pricing (4 tiers), testimonials, FAQ, contact
- PackagesPage.jsx — Detailed pricing: Rebranding €349, Basis €500, Pro €900, Premium €1400
- CalculatorPage.jsx — Interactive price calculator with 4 packages, add-ons, and quote submission
- DienstenPage.jsx — Services overview + 17+ niche detail pages
- OverMijPage.jsx — About me (mobile-first redesign)
- WhyWebsitePage.jsx — Why you need a website
- BlogPage.jsx — Blog article
- OnderhoudPage.jsx — Maintenance plan €25/mnd
- PrivacyPage.jsx — Privacy policy
- AboutPage.jsx — Redirects to /over-mij
- Admin Dashboard (Lead Finder) — Password protected

## Completed (Latest Session - Feb 2026)
- Added Rebranding package (€349) to PackagesPage, LandingPage, and CalculatorPage
- CalculatorPage: All 4 packages selectable with correct pricing, add-ons, and quote form
- Fixed dark mode text contrast on ALL pages (no black text on dark backgrounds)
- Fixed PrivacyPage dark mode: text-black → dark:text-white
- Fixed PackagesPage check icons: dark:text-white for non-popular packages
- Fixed CalculatorPage background overlay for dark mode
- Quote/offerte submission via POST /api/contact working end-to-end
- ThemeChooser popup for first-time visitors
- All pages iPhone-friendly (390x844 viewport)
- Redesigned OverMijPage: mobile-first
- Removed duplicate /about page → redirects to /over-mij
- Testing: 100% pass rate on iteration_20 (15/15 frontend, 10/10 backend)

## Pending Issues
- P0: Vercel Production env vars (POSTGRES_URL, ADMIN_PASSWORD, GOOGLE_MAPS_API_KEY) — BLOCKED on user
- P1: Web scraping in production — depends on P0
- P1: Resend DNS configuration for email delivery

## Upcoming Tasks
- P1: SEO metadata review across all pages
- P2: Case studies / success stories for niche pages
- P2: Refactor DienstenPage.jsx (move niches data to separate file)
- P2: Google Sheets API integration for lead export

## Credentials
- Admin Dashboard (Preview): password `yrvante2025`
- Admin Dashboard (Production): set via env var
