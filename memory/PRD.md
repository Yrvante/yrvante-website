# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern, production-ready premium business website for Yrvante - a Dutch web development startup based in Almelo, Netherlands. The website should generate new clients and showcase services professionally.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart web & software"
- **Founder**: Yvar Bredewold
- **Location**: Almelo, Overijssel, Netherlands
- **Contact Email**: info@yrvante.com

## Value Proposition (NEW)
"Ik bouw geen website — ik zorg dat uw bedrijf er online professioneel uitziet zodat klanten u serieus nemen. Dat is het verschil tussen een offerte vergelijken op prijs of op waarde."

## Current Pricing Structure (December 2025)

### Main Packages
| Package | Price | Target | Features |
|---------|-------|--------|----------|
| **Basis** | €500 | Starters | 3 pages, responsive, basic contact, Vercel hosting, 6 revisions |
| **Pro** | €900 | Growing SMBs | 10 pages, SEO, blog, portfolio, contact form with email |
| **Premium** | €1400 | Ambitious | 15 pages, booking system, Google Reviews, multi-language, priority support |

### Extra Possibilities (shown without prices on /pakketten)
- Extra pagina's
- Meertalige website  
- Extra contactformulieren
- Website onderhoud
- Online boekingssysteem
- Google Reviews integratie

*All prices exclude VAT. Client provides content (text, photos). 6 revision rounds included.*

## What's Been Implemented (December 2025)

### Hero Section
- [x] Video/animation background (HeroAnimation component)
- [x] New value proposition message
- [x] "Neem Contact Op" button (not "Adviesgesprek")
- [x] Stats: 100% Tevreden, €500 Vanaf, 1-2 Weken (removed 50+)

### Sections
- [x] Services (simplified to 2 cards)
- [x] Pricing (quick overview, links to /pakketten)
- [x] Why Yrvante (text about being affordable, competitive pricing)
- [x] Testimonials (slider without names, only business type)
- [x] FAQ (updated timelines: 1-2 weeks basic, 2-3 weeks complex)
- [x] Contact (phone/email focus, not in-person appointments)

### Removed Features
- [x] Logo design service (removed)
- [x] Names and company names from testimonials
- [x] "50+ Websites" stat
- [x] Google Analytics placeholder
- [x] "Blijf op de hoogte" newsletter section
- [x] Large logo in hero (replaced with animation)
- [x] "Gratis Adviesgesprek" (changed to "Neem Contact Op")
- [x] Portfolio section from homepage (moved to separate)

### Updated Content
- [x] Doorlooptijd: 1-2 weken (was 2-4)
- [x] FAQ "Wat heb ik nodig?": Simplified answer about content provision
- [x] Contact: "Bel of app mij" instead of consultation meetings
- [x] /pakketten page: Extra's shown as possibilities without prices

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Premium landing page | ✅ |
| `/about` | About page | ✅ |
| `/waarom-website` | Why a website page | ✅ |
| `/calculator` | Price calculator (with all prices) | ✅ |
| `/pakketten` | Detailed packages + extras as possibilities | ✅ |
| `/admin` | Admin dashboard | ✅ |

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lucide icons
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **Email**: Resend

## Admin Dashboard
- **URL**: `/admin`
- **Password**: `yrvante2025`
- **Features**: Page view analytics, contact messages

## File Structure
```
/app/frontend/src/pages/
├── LandingPage.jsx (updated with new hero + sections)
├── PackagesPage.jsx (packages + extras as possibilities)
├── CalculatorPage.jsx (all prices detailed)
├── AboutPage.jsx
├── WhyWebsitePage.jsx
└── AdminDashboard.jsx
```

## P0 Features (Completed)
- [x] Premium homepage with animation
- [x] New pricing structure (€500/€900/€1400)
- [x] Value proposition messaging
- [x] Simplified services
- [x] Anonymous testimonials
- [x] Updated FAQ with shorter timelines
- [x] Clean /pakketten page with extras

## P1 Features (Upcoming)
- [ ] Real customer testimonials (just type, no names)
- [ ] Real portfolio projects
- [ ] Calendly or booking integration

## P2 Features (Backlog)
- [ ] Blog section
- [ ] Online booking system implementation
- [ ] WhatsApp integration

## Key Design Decisions
1. **No adviesgesprek** - Contact via phone or email, not in-person
2. **No names on reviews** - Only business type shown
3. **No portfolio on homepage** - Link to separate page
4. **Extra's without prices** - Shown as possibilities, link to calculator for pricing
5. **Shorter timelines** - 1-2 weeks basic, 2-3 weeks complex
