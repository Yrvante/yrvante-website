# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern tech company website for Yrvante - a Dutch web development startup based in Almelo, Netherlands. The website should generate new clients that need a website.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart web & software"
- **Founder**: Yvar Bredewold
- **Location**: Almelo, Overijssel, Netherlands
- **Contact Email**: yvar@yrvante.com

## User Personas
1. **ZZP'ers (Freelancers)** - Self-employed professionals needing a professional online presence
2. **Small Businesses** - Companies with outdated or no websites
3. **Startups** - New companies needing modern web presence

## Core Requirements (Static)
- Dutch as default language with English toggle
- Black & white minimalist design matching the logo
- Sticky navigation with smooth scrolling
- Mobile responsive layout
- Contact form with email notification
- Sections: Hero, Services, Target Audience, About, Portfolio, Why Choose Us, Contact

## What's Been Implemented

### Core Website (December 2025)
- [x] Full landing page with all required sections
- [x] Dutch/English language toggle functionality
- [x] Sticky navigation with smooth scroll to sections
- [x] Contact form with MongoDB storage + Resend email integration
- [x] Mobile responsive design with hamburger menu
- [x] Playfair Display serif headings, DM Sans body text
- [x] Framer Motion animations
- [x] Logo integration from CDN
- [x] Portfolio placeholders for future projects
- [x] Custom hero animation (user-provided)
- [x] Admin dashboard at /admin (password: yrvante2025)
- [x] Page view analytics tracking

### New Pages & Features (December 2025)
- [x] **"Waarom een website?" page** (`/waarom-website`) - Informative page explaining why a website is no longer a luxury, with pricing comparison
- [x] **Price Calculator** (`/calculator`) - Interactive tool for clients to calculate website costs with add-ons
- [x] **Updated Services description** - "Maandelijks Onderhoud" now clearly states it's optional
- [x] **Navigation links** - "Bereken je prijs" and "Waarom een website?" buttons added below Services section

## Services & Pricing
| Service | Price | Note |
|---------|-------|------|
| Website Ontwikkeling | Vanaf €350 excl. BTW | Basic responsive website |
| Geavanceerde Websites | Vanaf €450 excl. BTW | With advanced features |
| Maandelijks Onderhoud | €15/mnd excl. BTW | **Optional** - without this, client maintains site themselves |

## Calculator Add-ons
- Extra pagina's: €25 per pagina
- Contactformulier met email: €35 eenmalig
- SEO Optimalisatie: €75 eenmalig
- Website Analytics: €45 eenmalig
- Meertalig (NL/EN): €100 eenmalig
- Custom Design: €150 eenmalig
- Logo Ontwerp: €125 eenmalig
- Teksten Schrijven: €100 eenmalig
- Maandelijks Onderhoud: €15/mnd

## Tech Stack
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lucide icons
- **Backend**: FastAPI + Motor (MongoDB async)
- **Database**: MongoDB
- **Email**: Resend

## Page Structure
| Route | Description |
|-------|-------------|
| `/` | Landing page with all sections |
| `/about` | About page with founder info |
| `/waarom-website` | Why a website is not a luxury |
| `/calculator` | Interactive price calculator |
| `/admin` | Admin dashboard (protected) |

## P0 Features (Completed)
- [x] Landing page with all sections
- [x] Language toggle (NL/EN)
- [x] Contact form with email notification
- [x] Mobile responsive design
- [x] Admin dashboard with analytics
- [x] "Waarom een website?" informative page
- [x] Price calculator with add-ons

## P1 Features (Upcoming - User Paused)
- [ ] Calendly integration for free consultation booking
- [ ] Clear CTA on every page
- [ ] SEO information page/section

## P2 Features (Backlog)
- [ ] Blog/News section
- [ ] Client testimonials with real reviews
- [ ] Portfolio project pages (when projects completed)
- [ ] WhatsApp integration
- [ ] Cookie consent banner

## Admin Dashboard
- **URL**: `/admin`
- **Password**: `yrvante2025`
- **Features**: Page view analytics (with charts), contact message management

## Files Reference
```
/app/frontend/src/
├── App.js                    # Routes + translations
├── pages/
│   ├── LandingPage.jsx       # Homepage
│   ├── AboutPage.jsx         # About page
│   ├── WhyWebsitePage.jsx    # Why a website page
│   ├── CalculatorPage.jsx    # Price calculator
│   └── AdminDashboard.jsx    # Admin panel
└── components/
    └── HeroAnimation.js      # Custom hero animation

/app/backend/
└── server.py                 # FastAPI with all endpoints
```

## Testing Status
- Last test: All frontend tests passed (100% success rate)
- Test report: `/app/test_reports/iteration_2.json`
