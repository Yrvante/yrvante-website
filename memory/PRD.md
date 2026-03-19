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
/app/frontend/src/
├── components/
│   ├── DemoPreview.jsx (Improved - Interactive demo previews for each package with more content)
│   ├── SEO.jsx
│   └── ui/ (shadcn components)
├── pages/
│   ├── LandingPage.jsx (hero + FAQs + Navigation with dropdowns + Expanded footer)
│   ├── PackagesPage.jsx (packages + losse prijzen)
│   ├── CalculatorPage.jsx (calculator + losse prijzen)
│   ├── BlogPage.jsx (website necessity article)
│   ├── AboutPage.jsx
│   ├── WhyWebsitePage.jsx
│   ├── AdminDashboard.jsx
│   ├── OverMijPage.jsx (NEW - "Mensen kopen van mensen" personal page)
│   ├── OnderhoudPage.jsx (NEW - Why maintenance is important €25/month)
│   └── DienstenPage.jsx (NEW - Services + Niche pages with dynamic routing)
```

## New Pages (December 2025)

### Over Mij Page (/over-mij)
- "Mensen kopen van mensen" - personal introduction
- Yvar's background and story
- "Mijn Aanpak" section: Persoonlijk, Resultaatgericht, Betrouwbaar, Snel
- "Mijn Verhaal" timeline: Background → Passion → Yrvante
- Agency comparison (€3.000+ vs €500)

### Onderhoud Page (/onderhoud)
- **Price**: €25/maand excl. BTW
- **Features**: Hosting & Uptime, Beveiliging, Backups, Bug Fixes, Kleine Aanpassingen, Support
- **Why maintenance matters**: Code Updates, SSL Certificates, Server Problems, Domain Management
- **Horror stories**: What can go wrong without maintenance
- **Comparison table**: With vs Without maintenance plan
- **Agency comparison**: Small (€100-250), Medium (€250-500), Yrvante (€25)

### Diensten Pages (/diensten, /diensten/:type)
| Service | Price | Features |
|---------|-------|----------|
| Webdesign | €500 | Responsive, SEO-friendly, Fast loading |
| Webflow Development | €900 | Visual CMS, Auto backups, Easy editing |
| Branding | €300 | Logo, Colors, Typography, Style guide |

### Niche Pages (/voor/:niche)
| Niche | Target | Key Benefits |
|-------|--------|--------------|
| Coaches | Life/Business/Health coaches | Professional presence, Service overview, Booking |
| ZZP'ers | Freelancers | Google visibility, 24/7 contact, Own domain |

## UI Updates (February 2026 - Phase 4)
- [x] **Mobiel menu vereenvoudigd** - Platte lijst zonder kopjes (DIENSTEN, OVER headers verwijderd)
- [x] **Logo homepage** - Zwart en zichtbaar als elegant witte card rechts van de hero
- [x] **Testimonials verwijderd** - "Wat klanten zeggen" sectie verwijderd van homepage

## UI Updates (February 2026 - Phase 3)
- [x] **Header vereenvoudigd** - Alleen Diensten (grote dropdown met alles), Over, Contact, Start Project
- [x] **Diensten dropdown uitgebreid** - Pakketten, Calculator, alle niches en diensten in één dropdown
- [x] **Logo transparant hero** - Yrvante logo als watermark rechts van de hero (opacity 6%, blend mode multiply)
- [x] **Stats als pills** - €500 VANAF en 1-2 WEKEN direct onder subtitle als pill badges
- [x] **Pill-shaped knoppen** - START PROJECT en BEKIJK WERK zijn volledig afgerond (rounded-full)
- [x] **Google Reviews verwijderd** - Uit calculator add-ons, pakketten features, en losse prijslijst
- [x] **Resend config bevestigd** - API key en e-mailadressen correct in backend/.env

## UI Updates (February 2026 - Phase 2)
- [x] **Cloud Gray Color Scheme** - Alle knoppen en interactieve elementen bijgewerkt naar bg-gray-500 (cloud gray)
- [x] **Light Section Backgrounds** - Alle donkere secties (bg-gray-900) omgezet naar lichtgrijs (bg-gray-100/bg-gray-50)
- [x] **Logo bijgewerkt** - Nieuw PNG logo (circulair icoon) door de gehele site geïmplementeerd
- [x] **Testimonials sectie toegevoegd** - Zichtbaar op de homepage tussen Pakketten en FAQ
- [x] **Diensten performance** - Framer Motion animaties verwijderd uit de niche/diensten grid (soepeler scrollen)
- [x] **Calculator CTA** - Summary sidebar knop bijgewerkt naar cloud gray

## UI Updates (February 2026 - Phase 1)
- [x] **Grey Color Scheme** - Alle bg-black elementen vervangen door bg-gray-900 en bg-gray-800
- [x] **Package Card Hover** - Pakket kaarten worden nu GRIJS bij hover (hover:bg-gray-800) i.p.v. zwart
- [x] **Grey CTA Sections** - Alle CTA secties op alle pagina's nu bg-gray-900
- [x] **Grey Hero Gradients** - Hero gradient secties in PackagesPage, BlogPage, WhyWebsitePage geüpdated
- [x] **Grey Demo Tabs** - Actieve demo tab in DemoPreview nu bg-gray-900 i.p.v. bg-black
- [x] **SEO Expanded** - SEO data toegevoegd voor /over-mij, /onderhoud, /diensten en niche pagina's
- [x] **WhatsApp** - Nummer bijgewerkt naar +31642453859

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
- [x] **Demo Website Previews** - Interactieve voorbeelden van elk pakket in de Pakketten sectie (December 2025)
- [x] **Improved Demo Previews** - Uitgebreidere en mooiere demo's met meer content (December 2025)
- [x] **Over Mij Page** - "Mensen kopen van mensen" - persoonlijke introductie pagina
- [x] **Diensten Pages** - Webdesign, Webflow Development, Branding service pagina's
- [x] **Expanded Niche Pages** - 14 niche pagina's voor specifieke branches (December 2025):
  - Coaches, ZZP'ers, Kappers, Nagelstylisten, Interieurstylisten, Bloemisten
  - Loodgieters, Restaurants, Personal Trainers, Fotografen, Makelaars
  - Tandartsen, Garages, Hondentrimsalons
- [x] **Abstract Background Image** - Mooie vloeiende achtergrondafbeelding in wit/grijs tinten
- [x] **WhatsApp Business** - Groene knop in contact sectie met wa.me link
- [x] **Extended Nagelstudio Demo** - Uitgebreide Premium demo met promo banner, 6 behandelingen, team sectie, Instagram
- [x] **Organized Niches Layout** - "Websites voor" sectie in 3 kolommen: Beauty & Wellness, Zakelijke Diensten, Ambacht & Horeca
- [x] **Webflow Removed** - Vervangen door Onderhoud & Hosting service (€25/maand)
- [x] **All FAQs Visible** - Alle 12 FAQ's zijn nu zichtbaar en klikbaar (geen "bekijk alle" knop)
- [x] **Abstract Background Everywhere** - Vloeiende achtergrond op homepage, Over Mij, Diensten, Onderhoud pagina's
- [x] **Reduced Spacing** - Ruimte tussen hero en diensten sectie verkleind (33%)
- [x] **Onderhoud Page** - Uitgebreide pagina over waarom onderhoud belangrijk is
- [x] **Navigation Dropdowns** - Diensten en Over dropdown menu's in header
- [x] **Expanded Footer** - 5 kolommen met alle nieuwe pagina links

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
