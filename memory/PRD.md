# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch web design company website. Focus on pixel-perfect UI, brand consistency, responsive design, dark/light mode support, and mobile-first experience.

## Architecture
- **Frontend**: React + Tailwind CSS (Shadcn UI components)
- **Backend**: FastAPI (Preview), Node.js (Vercel Production)
- **Database**: MongoDB (Preview), Vercel Postgres (Production)
- **Styling**: Tailwind with `dark:` variants, ThemeContext, LanguageContext (NL/EN)
- **Performance**: React.lazy() code splitting, optimized font loading

## Key Pages
- LandingPage.jsx — Homepage (eagerly loaded for fast first paint)
- PackagesPage.jsx — Pricing: Rebranding €349, Basis €500, Pro €900, Premium €1400
- CalculatorPage.jsx — Interactive price calculator with 4 packages + quote form
- DienstenPage.jsx — Services + 17+ niche detail pages
- OverMijPage.jsx — About me (mobile-first)
- WhyWebsitePage.jsx — Why you need a website
- BlogPage.jsx — Blog article
- OnderhoudPage.jsx — Maintenance €25/mnd
- PrivacyPage.jsx — Privacy policy
- NotFoundPage.jsx — Custom 404 page (noindex)
- Admin Dashboard (Lead Finder) — Password protected

## Key Components
- ThemeChooser.jsx — First-visit light/dark mode selector
- CookieBanner.jsx — GDPR-compliant cookie consent
- SEO.jsx — Per-page meta tags, canonical URLs, noindex support

## Completed (Mar 31, 2026)
### SEO Optimization (P1)
- Sitemap.xml expanded from 6 to 34 URLs (all pages + niche pages)
- Schema.org structured data updated with Rebranding package €349
- Meta descriptions updated: pakketten/calculator mention all 4 packages
- Canonical URLs dynamically set per page
- 404 page has noindex/nofollow meta tag
- Font loading optimized: removed unused Inter font, reduced weight variants
- robots.txt properly configured with crawl-delay

### Cookie Banner + 404 + Performance
- Cookie Banner: GDPR-compliant, Accepteren/Alleen noodzakelijk, dark mode
- 404 Page: Custom styled, animated, Yrvante branding, dark mode
- React.lazy() code splitting for 11 pages with Suspense loader

### Previous Sessions
- Rebranding package (€349) on all pages
- CalculatorPage: 4 packages, add-ons, quote form, POST /api/contact
- ThemeChooser popup, iPhone-friendly layouts
- OverMijPage redesign, duplicate page cleanup
- Dark mode text contrast fixes across all pages

## Pending Issues
- P0: Vercel Production env vars — BLOCKED on user
- P1: Web scraping in production — depends on P0
- P1: Resend DNS configuration for email delivery

## Upcoming Tasks
- P2: Case studies / success stories for niche pages
- P2: Refactor DienstenPage.jsx (move data to separate file)
- P2: Google Sheets API integration for lead export

## Credentials
- Admin Dashboard (Preview): password `yrvante2025`
- Admin Dashboard (Production): set via env var
