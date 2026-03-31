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
- LandingPage.jsx — Homepage with Google Reviews section
- PackagesPage.jsx — Pricing: Rebranding Website €349, Basis Website €500, Pro Website €900, Premium Website €1400
- CalculatorPage.jsx — Interactive price calculator with 4 packages + quote form
- DienstenPage.jsx — Services + 17+ niche detail pages
- OverMijPage.jsx — About me (mobile-first)
- NotFoundPage.jsx — Custom 404 page (noindex)
- Admin Dashboard (Lead Finder) — Password protected

## Key Components
- GoogleReviews.jsx — Auto-refreshing Google Reviews (via Places API, 1hr cache)
- ThemeChooser.jsx — First-visit light/dark mode selector
- CookieBanner.jsx — GDPR-compliant cookie consent
- SEO.jsx — Per-page meta tags, canonical URLs, noindex support

## Completed (Mar 31, 2026)
### Google Reviews Integration
- Backend: GET /api/reviews with 1-hour in-memory cache
- Google Places API with Place ID: ChIJ5XkLWE8HuEcRItzZPcgtM-8
- Frontend: GoogleReviews.jsx with star ratings, author info, review text
- Responsive grid (1-3 columns), dark mode support
- "Bekijk op Google" + "Laat een review achter" CTA buttons
- Auto-refreshes: new Google reviews appear within 1 hour

### Package Renaming
- All packages renamed: Rebranding Website, Basis Website, Pro Website, Premium Website

### SEO Optimization
- Sitemap.xml: 34 URLs, Schema.org with all 4 packages, canonical URLs, noindex on 404

### Cookie Banner + 404 + Performance
- GDPR cookie banner, custom 404 page, React.lazy() code splitting

## API Keys (Backend .env)
- GOOGLE_PLACES_API_KEY — Google Places API for reviews
- GOOGLE_PLACE_ID — ChIJ5XkLWE8HuEcRItzZPcgtM-8
- RESEND_API_KEY — Email delivery

## Pending Issues
- P0: Vercel Production env vars — BLOCKED on user
- P1: Web scraping in production — depends on P0
- P1: Resend DNS configuration

## Upcoming Tasks
- P2: Case studies / success stories for niche pages
- P2: Refactor DienstenPage.jsx (move data to separate file)
- P2: Google Sheets API integration for lead export

## Credentials
- Admin Dashboard (Preview): password `yrvante2025`
