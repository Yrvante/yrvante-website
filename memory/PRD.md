# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch web design company website. Focus on pixel-perfect UI, brand consistency, responsive design, and dark/light mode support.

## Architecture
- **Frontend**: React + Tailwind CSS (Shadcn UI components)
- **Backend**: FastAPI (Preview), Node.js (Vercel Production)
- **Database**: MongoDB (Preview), Vercel Postgres (Production)
- **Styling**: Tailwind with `dark:` variants, ThemeContext, LanguageContext (NL/EN)

## Key Pages
- LandingPage.jsx — Homepage with hero, process, services, pricing, testimonials, FAQ, contact
- PackagesPage.jsx — Detailed pricing with 4 packages (Rebranding, Basis, Pro, Premium)
- CalculatorPage.jsx — Interactive price calculator
- DienstenPage.jsx — Services overview + niche detail pages
- OverMijPage.jsx — About me page
- WhyWebsitePage.jsx — Why you need a website
- BlogPage.jsx — Blog article
- OnderhoudPage.jsx — Maintenance plan
- PrivacyPage.jsx — Privacy policy
- AboutPage.jsx — About/values page
- Admin Dashboard (Lead Finder) — Password protected

## What's Been Implemented
- Full homepage with editorial design
- 4-tier pricing: Rebranding (349), Basis (500), Pro (900), Premium (1400)
- Global Dark/Light mode toggle with proper text contrast on ALL pages
- Rebranding service added to services section and pricing
- SEO component across all pages
- Admin Lead Finder dashboard
- Contact form integration
- Price calculator with quote request
- 17+ niche-specific landing pages (kappers, restaurants, etc.)
- Multilingual support (NL/EN)

## Completed (Latest Session - Feb 2026)
- Added Rebranding package (349 EUR) to PackagesPage and LandingPage pricing
- Added Rebranding service card to LandingPage services section
- Fixed dark mode text contrast on ALL pages (black text in light, white text in dark)
- Pages fixed: LandingPage, PackagesPage, CalculatorPage, DienstenPage, OverMijPage, WhyWebsitePage, BlogPage, OnderhoudPage, PrivacyPage, AboutPage
- All 12 automated tests passed (100% success rate)

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
