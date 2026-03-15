# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern, production-ready premium business website for Yrvante - a Dutch web development startup. The website should generate new clients and showcase services professionally.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart Web & Software"
- **Founder**: Yvar Bredewold (ZZP'er - Freelancer)
- **Location**: Nederland (NOT showing "Almelo" publicly anymore)
- **Contact Email**: info@yrvante.com
- **Voice**: "ik/mij" (personal freelancer tone, NOT "wij/we")
- **Design Style**: Brutalist-editorial (bold typography, asymmetric layout, black/white)

## Value Proposition
"Ik bouw geen website — ik zorg dat jouw bedrijf er online professioneel uitziet zodat klanten je serieus nemen."

## Current Pricing Structure (December 2025)

### Main Packages
| Package | Price | Delivery | Target | Features |
|---------|-------|----------|--------|----------|
| **Basis** | €500 | ~ 1 week | Starters | 3 pages, responsive, basic contact, fast secure hosting, 6 revisions |
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

### Latest Updates (This Session - Brutalist Redesign)
- [x] **Brutalist-Editorial Design** - Complete homepage redesign with bold typography, asymmetric layout
- [x] **Logo Image** - User's logo image added to header and footer (not text "YRVANTE")
- [x] **Slogan in Hero** - "SMART WEB & SOFTWARE" displayed prominently at top of hero section
- [x] **"Almelo" Removed** - Removed from all locations (header, contact section, footer) - now shows "Nederland"
- [x] **Improved Text Contrast** - Changed gray text from gray-400 to gray-500/600 for better readability
- [x] **Hero Animation Placement** - Video animation integrated into hero section with brutalist black border
- [x] **Stats Section** - €500, 1-2 Weken, green "Beschikbaar" indicator under animation
- [x] **Green Availability Button** - Animated green dot indicating availability

### Previous Updates (This Session)
- [x] **Voice Change** - All "wij/we" changed to "ik/mij" (freelancer tone)
- [x] **New Logo** - User's uploaded logo with name and slogan
- [x] **Basis Package** - Removed Vercel/SSL mentions, now "Snelle en veilige hosting"
- [x] **Maintenance Price** - Updated from €20 to €25/pm everywhere
- [x] **Extended FAQ** - 12 detailed questions with exact user content

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Premium landing page | ✅ |
| `/about` | About page | ✅ |
| `/waarom-website` | Why a website page | ✅ |
| `/calculator` | Price calculator | ✅ |
| `/pakketten` | Detailed packages | ✅ |
| `/blog` | Blog article | ✅ |
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
├── LandingPage.jsx (hero + 12 FAQs + "ik" voice)
├── PackagesPage.jsx (packages + losse prijzen)
├── CalculatorPage.jsx (calculator + losse prijzen)
├── BlogPage.jsx (website necessity article)
├── AboutPage.jsx
├── WhyWebsitePage.jsx
└── AdminDashboard.jsx
```

## P0 Features (Completed)
- [x] Premium homepage with animation
- [x] New pricing structure (€500/€900/€1400)
- [x] Extended FAQ (12 questions)
- [x] Voice change to "ik" (ZZP'er tone)
- [x] New logo integration
- [x] Green glow availability button (top of hero)
- [x] Stats without "100% tevreden"
- [x] **SEO Optimization** - Unique page titles, meta descriptions, sitemap.xml, robots.txt
- [x] **Multi-language** - NL/EN language switcher with dynamic SEO per language
- [x] **Calculator with Quote Form** - Klant kan pakket + extra's kiezen en direct aanvragen
- [x] **Rounded Design** - Alle elementen hebben nu ronde hoeken (rounded-2xl/3xl)
- [x] **Consistent Styling** - Dezelfde kleuren en stijl op alle pagina's

## SEO Implementation
- **sitemap.xml** - All pages with hreflang for NL/EN
- **robots.txt** - Proper crawl rules, sitemap reference
- **Dynamic SEO** - Each page has unique title, description, keywords
- **Structured Data** - Schema.org markup for WebDesignCompany
- **Open Graph** - Social sharing optimization

## P1 Features (Upcoming)
- [ ] Real portfolio projects
- [ ] More blog articles
- [ ] WhatsApp business integration

## P2 Features (Backlog)
- [ ] Google Reviews widget integration
- [ ] Multi-language support expansion
- [ ] Client portal for project status

## Key Design Decisions
1. **Voice**: "ik/mij" for Yrvante (personal ZZP'er tone), "jij/je" for customer
2. **No names on reviews** - Only business type shown
3. **No "100% tevreden klanten"** - Removed as user has no customers yet
4. **Maintenance €25/pm** - Updated from €20
5. **No Vercel/SSL mentions** - Generic "snelle en veilige hosting"
6. **Brutalist-Editorial Style** - Black/white, large typography, asymmetric layouts
7. **No "Almelo"** - Location now just shows "Nederland"
8. **Logo as Image** - Using uploaded logo image, not text
