# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch web design company website. Focus on pixel-perfect UI, brand consistency, responsive design, dark/light mode support, and mobile-first experience.

## Architecture
- **Frontend**: React + Tailwind CSS (Shadcn UI components)
- **Backend**: FastAPI (Preview), Node.js (Vercel Production)
- **Database**: MongoDB (Preview), Vercel Postgres (Production)
- **Styling**: Tailwind with `dark:` variants, ThemeContext, LanguageContext (NL/EN)
- **Performance**: React.lazy() code splitting for all pages except LandingPage

## Key Pages
- LandingPage.jsx — Homepage (eagerly loaded for fast first paint)
- PackagesPage.jsx — Detailed pricing: Rebranding €349, Basis €500, Pro €900, Premium €1400
- CalculatorPage.jsx — Interactive price calculator with 4 packages, add-ons, and quote submission
- DienstenPage.jsx — Services overview + 17+ niche detail pages
- OverMijPage.jsx — About me (mobile-first redesign)
- WhyWebsitePage.jsx — Why you need a website
- BlogPage.jsx — Blog article
- OnderhoudPage.jsx — Maintenance plan €25/mnd
- PrivacyPage.jsx — Privacy policy
- NotFoundPage.jsx — Custom 404 page
- Admin Dashboard (Lead Finder) — Password protected

## Key Components
- ThemeChooser.jsx — First-visit light/dark mode selector popup
- CookieBanner.jsx — GDPR-compliant cookie consent banner
- SEO.jsx — Page-specific meta tags

## Completed (Latest Session - Mar 2026)
- Cookie Banner: GDPR-compliant, Accepteren/Alleen noodzakelijk, links to /privacy, dark mode support
- 404 Page: Custom styled with animated 404 watermark, "Pagina niet gevonden", Terug naar home button
- Performance: React.lazy() code splitting for 11 pages, Suspense with loading spinner
- Dark mode text fixes: PrivacyPage, PackagesPage check icons, CalculatorPage background overlay
- Testing: 100% pass rate on iteration_21 (15/15 frontend)

## Previously Completed
- Added Rebranding package (€349) to PackagesPage, LandingPage, and CalculatorPage
- CalculatorPage: All 4 packages selectable with correct pricing, add-ons, and quote form
- Quote/offerte submission via POST /api/contact working end-to-end
- ThemeChooser popup for first-time visitors
- All pages iPhone-friendly (390x844 viewport)
- Redesigned OverMijPage: mobile-first
- Removed duplicate /about page → redirects to /over-mij

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
