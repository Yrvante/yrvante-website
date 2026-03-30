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
- CalculatorPage.jsx — Interactive price calculator
- DienstenPage.jsx — Services overview + 17+ niche detail pages
- OverMijPage.jsx — About me (mobile-first redesign)
- WhyWebsitePage.jsx — Why you need a website
- BlogPage.jsx — Blog article
- OnderhoudPage.jsx — Maintenance plan €25/mnd
- PrivacyPage.jsx — Privacy policy
- AboutPage.jsx — Redirects to /over-mij
- Admin Dashboard (Lead Finder) — Password protected

## Completed (Latest Session - Feb 2026)
- Added Rebranding package (€349) to PackagesPage and LandingPage
- Fixed dark mode text contrast on ALL pages (black on light, white on dark)
- Redesigned OverMijPage: mobile-first with 2x2 values grid, stacked timeline, compact hero
- Removed duplicate /about page → redirects to /over-mij
- Made ALL pages iPhone-friendly (390x844 viewport):
  - Compact navbars (h-14 on mobile)
  - Reduced hero padding (pt-20 on mobile)
  - Full-width CTA buttons on mobile
  - Responsive text sizes (text-2xl/3xl on mobile)
  - Proper content padding (px-4 on mobile)
  - Pages: Homepage, Packages, Calculator, Onderhoud, Blog, WhyWebsite, OverMij, Diensten, Privacy
- All 10 mobile tests passed (100% success rate) - iteration_19

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
