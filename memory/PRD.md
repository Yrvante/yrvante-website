# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB available (preview)
- **Styling**: Strict neutral gray palette, glassmorphism, dark/light mode via ThemeContext

## What's Been Implemented

### Phase 1 - Core Website (Complete)
- Landing page with hero, services, process, expertise, hosting, FAQ, contact
- Admin Dashboard (Lead Finder)
- Calculator with live pricing (Rebranding €349, Basis €500, Pro €900, Premium €1400)
- Dark/Light mode, Cookie Banner, 404, lazy loading, SEO, Google Reviews

### Phase 2 - Conversion Features (Complete - Feb 2026)
- Exit-Intent Popup (YRVA10 discount code, localStorage 24h cooldown)
- YRVA10 Discount Code in Calculator (input + URL params)
- Package Quiz (5-question wizard)
- Trust Badges (KVK, Tevredenheid, Reactietijd, Maatwerk)

### Phase 3 - UI Redesign (Complete - Feb 2026)
- Compact Pricing Cards with icons (no more comparison table on homepage)
- Combined Live Examples ("BEKIJK WAT JE KRIJGT") — preview + features panel
- Before & After Slider (ugly → beautiful)
- Competitor Comparison moved to /pakketten page
- Rebranding Page at /rebranding
- Dark mode background opacity 80% (more visible texture)

### Phase 4 - UI Polish (Complete - Feb 2026)
- **Section numbers removed** — No more (03), (04), etc.
- **Pro card unified** — Same white/transparent theme, "Meest gekozen" neutral badge
- **Premium promotes boekingssysteem** — "incl. boekingssysteem" in description
- **"Meer" dropdown** — Navigation has DIENSTEN + MEER. Meer contains: Over Mij, Waarom een Website?, Blog, Pakketten & Prijzen, Privacybeleid
- **Parallax scrolling** — Subtle dot/line patterns on WhyExpensive, Services, Process, Expertise, Hosting, FAQ sections via Framer Motion whileInView
- **Micro-animations** — hover:-translate-y-1 + hover:shadow-lg on all cards (services, hosting, expertise, pricing, voordelen)
- **Section order optimized** — Hero > TrustBadges > WhyExpensive > Pakketten > BekijkWatJeKrijgt > Quiz > VoorNa > Reviews > Services > Process > Expertise > Hosting > FAQ > Contact
- **Mobile menu updated** — Includes "Meer" section with all hidden page links

## Page Structure
- `/` - Landing page
- `/calculator` - Price calculator with YRVA10 discount
- `/rebranding` - Rebranding service page
- `/pakketten` - Packages overview + Competitor Comparison
- `/onderhoud` - Hosting page
- `/diensten` / `/diensten/:type` - Services
- `/over-mij` - About
- `/waarom-website` - Why a Website?
- `/blog` - Blog
- `/privacy` - Privacy
- `/leadfinder` / `/admin` - Admin tools

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

## Backlog (P2)
- Refactor LandingPage.jsx (extract sections to components)
- Refactor DienstenPage.jsx (data to separate file)
- Google Sheets API for lead export
- Vercel production env vars (user action needed)
- Resend email DNS config (user action needed)
