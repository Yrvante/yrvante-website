# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern, production-ready premium business website for Yrvante - a Dutch web development startup based in Almelo, Netherlands. The website should generate new clients and showcase services professionally.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart web & software"
- **Founder**: Yvar Bredewold
- **Location**: Almelo, Overijssel, Netherlands
- **Contact Email**: info@yrvante.com

## User Personas
1. **ZZP'ers (Freelancers)** - Starting professionals needing affordable online presence
2. **Small Businesses (MKB)** - Companies with outdated or no websites
3. **Growing Companies** - Businesses needing advanced features (booking, portals)

## Current Pricing Structure (December 2025)

### Main Packages
| Package | Price | Target | Features |
|---------|-------|--------|----------|
| **Basis** | €500 | Starters | 3 pages, responsive, basic contact, Vercel hosting, 6 revisions |
| **Pro** | €900 | Growing SMBs | 10 pages, SEO, blog, portfolio, contact form with email |
| **Premium** | €1400 | Ambitious | 15 pages, booking system, Google Reviews, multi-language, priority support |

### Add-ons
| Add-on | Price | Description |
|--------|-------|-------------|
| Extra page | €40 | Additional content page |
| Multi-language | €100 | Website in multiple languages |
| Extra form | €80 | Quote request, appointment form |
| Maintenance | €20/mnd | Hosting, updates, security, small changes |
| Booking System | €180 | Online appointments with admin dashboard |
| Google Reviews | €80 | Display reviews from Google on site |

*All prices exclude VAT. Client provides content (text, photos). 6 revision rounds included.*

## What's Been Implemented (December 2025)

### Core Website Features
- [x] Premium responsive design (mobile, tablet, desktop)
- [x] Sticky navigation with smooth scroll
- [x] Dutch/English language toggle
- [x] Contact form with phone field + honeypot spam protection
- [x] Resend email integration

### Premium Features
- [x] Hero section with floating elements and stats
- [x] Services section (4 cards)
- [x] Pricing section with 3 packages
- [x] Testimonials slider (3 reviews)
- [x] FAQ accordion (5 questions)
- [x] Newsletter signup
- [x] CTA sections throughout
- [x] Premium footer with links

### SEO Optimization
- [x] Meta tags (title, description, keywords)
- [x] Open Graph / Social media tags
- [x] Structured data (JSON-LD)
- [x] sitemap.xml
- [x] robots.txt
- [x] Google Search Console verification placeholder
- [x] Semantic HTML structure

### Analytics Ready
- [x] Google Analytics placeholder in index.html
- [x] Internal page view tracking
- [x] Admin dashboard with analytics

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Premium landing page | ✅ |
| `/about` | About page | ✅ |
| `/waarom-website` | Why a website page | ✅ |
| `/calculator` | Price calculator | ✅ |
| `/pakketten` | Detailed packages | ✅ |
| `/admin` | Admin dashboard | ✅ |

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lucide icons
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **Email**: Resend
- **Deployment Ready**: Vercel compatible

## Admin Dashboard
- **URL**: `/admin`
- **Password**: `yrvante2025`
- **Features**: Page view analytics, contact messages, read/unread status

## File Structure
```
/app/frontend/
├── public/
│   ├── index.html (SEO meta tags, GA placeholder)
│   ├── sitemap.xml
│   └── robots.txt
└── src/
    ├── pages/
    │   ├── LandingPage.jsx (premium homepage)
    │   ├── CalculatorPage.jsx (price calculator)
    │   ├── PackagesPage.jsx (detailed packages)
    │   ├── AboutPage.jsx
    │   ├── WhyWebsitePage.jsx
    │   └── AdminDashboard.jsx
    ├── App.js (routes + translations)
    └── index.css (premium styles)

/app/backend/
├── server.py (FastAPI with all endpoints)
└── tests/test_yrvante_api.py
```

## Testing Status
- **Backend**: 100% (15/15 tests passed)
- **Frontend**: 100% (14/14 features verified)
- **Test Report**: `/app/test_reports/iteration_3.json`

## P0 Features (Completed)
- [x] Premium homepage with all sections
- [x] New pricing structure (€500/€900/€1400)
- [x] Calculator with add-ons
- [x] Contact form with spam protection
- [x] SEO optimization
- [x] Mobile responsive

## P1 Features (Upcoming)
- [ ] Calendly integration for consultations
- [ ] Real customer testimonials
- [ ] Real portfolio projects
- [ ] Google Analytics activation (needs GA ID)

## P2 Features (Backlog)
- [ ] Blog section
- [ ] Online booking system implementation
- [ ] WhatsApp integration
- [ ] Cookie consent banner
- [ ] Client portal

## Deployment Notes
- Ready for Vercel deployment
- Environment variables needed:
  - `MONGO_URL` - MongoDB connection
  - `DB_NAME` - Database name
  - `RESEND_API_KEY` - Email notifications
  - `SENDER_EMAIL` - From email
  - `RECIPIENT_EMAIL` - Notification recipient
