# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern, production-ready premium business website for Yrvante - a Dutch web development startup based in Almelo, Netherlands. The website should generate new clients and showcase services professionally.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart web & software"
- **Founder**: Yvar Bredewold
- **Location**: Almelo, Overijssel, Netherlands
- **Contact Email**: info@yrvante.com

## Value Proposition
"Wij bouwen geen website — wij zorgen dat jouw bedrijf er online professioneel uitziet zodat klanten je serieus nemen."

## Current Pricing Structure (December 2025)

### Main Packages
| Package | Price | Delivery | Target | Features |
|---------|-------|----------|--------|----------|
| **Basis** | €500 | ~ 1 week | Starters | 3 pages, responsive, basic contact, Vercel hosting, 6 revisions |
| **Pro** | €900 | 1-2 weken | Growing SMBs | 10 pages, SEO (zoekwoordonderzoek + on-page), blog, portfolio, contact form |
| **Premium** | €1400 | 1-2 weken | Ambitious | 15 pages, booking system, Google Reviews, multi-language, priority support (12h) |

### Extra's (Losse Prijzen)
| Extra | Price |
|-------|-------|
| Extra pagina | €50 |
| Meertalig | €200 |
| Extra formulier | €80 |
| Onderhoud | €25/pm |
| Boekingssysteem | €250 |
| Google Reviews | €120 |

*All prices exclude VAT. Client provides content (text, photos). 6 revision rounds included.*

## What's Been Implemented (December 2025)

### Latest Updates (This Session)
- [x] **Extended FAQ** - Expanded from 4 to 12 detailed questions
- [x] **Updated Calculator Prices** - New losse prijzen with tip about combining extras
- [x] **Enhanced Packages Page** - Added delivery times, losse prijzen section with tip
- [x] **New Blog Page** - Article about why websites aren't a luxury + agency pricing comparison

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Premium landing page | ✅ |
| `/about` | About page | ✅ |
| `/waarom-website` | Why a website page | ✅ |
| `/calculator` | Price calculator (all prices + tip) | ✅ |
| `/pakketten` | Detailed packages + losse prijzen | ✅ |
| `/blog` | Blog - "Waarom een website geen luxe meer is" | ✅ NEW |
| `/admin` | Admin dashboard | ✅ |

### FAQ Questions (12 total)
1. Hoe lang duurt het om een website te maken?
2. Wat heb ik nodig om te beginnen?
3. Kan ik de website later nog uitbreiden?
4. Wat gebeurt er als ik niet tevreden ben?
5. Hoe werkt de betaling?
6. Blijft mijn website online als ik geen onderhoudspakket neem?
7. Kan ik zelf teksten en foto's aanpassen?
8. Maak jij ook webshops?
9. Wat is het verschil tussen jou en een groot webbureau?
10. Mijn bedrijf is heel klein, is een website wel de moeite waard?
11. Zit SEO standaard in elke website?
12. Kan ik ook alleen een pagina laten aanpassen?

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
├── LandingPage.jsx (hero + 12 FAQs)
├── PackagesPage.jsx (packages + losse prijzen + tip)
├── CalculatorPage.jsx (calculator + losse prijzen + tip)
├── BlogPage.jsx (NEW - website necessity article)
├── AboutPage.jsx
├── WhyWebsitePage.jsx
└── AdminDashboard.jsx
```

## P0 Features (Completed)
- [x] Premium homepage with animation
- [x] New pricing structure (€500/€900/€1400)
- [x] Extended FAQ (12 questions)
- [x] Calculator with losse prijzen + tip
- [x] Packages page with delivery times + losse prijzen
- [x] Blog page about website necessity

## P1 Features (Upcoming)
- [ ] Real portfolio projects
- [ ] More blog articles
- [ ] WhatsApp business integration

## P2 Features (Backlog)
- [ ] Google Reviews widget integration
- [ ] Multi-language support expansion
- [ ] Client portal for project status

## Key Design Decisions
1. **Voice**: "we/wij" for Yrvante, "jij/je" for customer
2. **No names on reviews** - Only business type shown
3. **Losse prijzen visible** - Calculator and packages page show all individual prices
4. **Tip about combining** - Encourage higher packages when multiple extras selected
5. **Delivery times shown** - ~ 1 week (Basis), 1-2 weken (Pro/Premium)
