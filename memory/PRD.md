# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build and iteratively develop the Yrvante web platform — a Dutch freelance web design agency website. Focus on pixel-perfect UI, brand consistency, and conversion-optimized features with a strict neutral/gray/glassmorphism aesthetic. NO blue or navy colors.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (preview) + Node.js (Vercel production)
- **Database**: Vercel Postgres (production), MongoDB (preview)
- **Styling**: Strict neutral gray palette, glassmorphism everywhere, dark/light mode via ThemeContext

## File Architecture
```
/app/
├── frontend/src/
│   ├── App.js (ThemeContext, LanguageContext, Global BG pattern, Routing)
│   ├── pages/
│   │   ├── LandingPage.jsx (container - imports sections)
│   │   ├── CalculatorPage.jsx
│   │   ├── PackagesPage.jsx (with Dark Mode section)
│   │   ├── DienstenPage.jsx (data in /data/dienstenData.js)
│   │   ├── RebrandingPage.jsx (with BeforeAfterSlider)
│   │   ├── OverMijPage.jsx
│   │   ├── OnderhoudPage.jsx
│   │   ├── WhyWebsitePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── LeadFinderPage.jsx
│   ├── components/
│   │   ├── landing/ (Modular homepage sections)
│   │   │   ├── constants.js, Navigation.jsx, HeroSection.jsx
│   │   │   ├── PricingSection.jsx, ContactSection.jsx
│   │   │   ├── Footer.jsx, Sections.jsx
│   │   ├── LiveExamples.jsx, PackageQuiz.jsx
│   │   ├── GoogleReviews.jsx, BeforeAfterSlider.jsx
│   │   ├── TrustBadges.jsx, CompetitorComparison.jsx
│   │   ├── DeviceMockups.jsx
│   │   └── SEO.jsx
│   ├── data/
│   │   └── dienstenData.js
│   └── index.css (Global styles, dark mode)
├── api/ (Vercel Serverless Functions - MAX 12 allowed)
│   ├── _db.js (Shared Postgres init)
│   ├── contact.js, reviews.js
│   ├── analytics/pageview.js
│   ├── admin/login.js, stats.js, contacts.js
│   └── admin/leadfinder/ (Lead Finder endpoints)
├── backend/server.py (Preview FastAPI backend)
└── vercel.json
```

## What's Been Implemented

### Phase 1-5 - Core Features (Complete)
- Full homepage with all sections, pricing, FAQ, contact
- Admin Dashboard (Lead Finder), Calculator with YRVA10 discount
- Dark/Light mode, Exit-Intent Popup, Package Quiz, Trust Badges
- Live Examples, Before/After Slider, Competitor Comparison

### Phase 6 - SEO & Refactoring (Complete)
- SEO entries for all pages
- DienstenPage.jsx data extracted to dienstenData.js

### Phase 7 - Glassmorphism & Cleanup (Complete)
- Cookie Banner + Theme Chooser popups
- Global glassmorphism on all card elements

### Phase 8 - LandingPage Refactoring + Extras (Complete)
- LandingPage split into modular components
- Extra's & Add-ons pricing grid

### Phase 9 - Production Deployment Fix (Complete - Apr 2026)
- Fixed REACT_APP_BACKEND_URL fallback (was undefined on Vercel)
- Created ALL missing Vercel serverless functions
- CI=true build passes

### Phase 10 - Mobile + Content Updates (Complete - Apr 2026)
- Rebranding on Diensten page as 3rd service
- BeforeAfterSlider on Rebranding page
- Dark Mode section on Packages page
- Mobile section ordering optimization
- 17/17 tests passed (iteration 31)

### Phase 11 - Global Glassmorphism + Hero Redesign (Complete - Apr 2026)
- **Global BG Pattern**: Moved from LandingPage to App.js so ALL pages show the bg-pattern.jpg
- **All page wrappers transparent**: Removed solid `bg-white dark:bg-neutral-950` from all public pages
- **Section backgrounds**: Converted all `bg-gray-50`, `bg-gray-100` sections to semi-transparent with `backdrop-blur-sm`
- **Hero logo redesign**: Logo placed prominently ABOVE MacBook mockup on desktop
- **Mobile logo-in-text**: On mobile/iPhone, the "O" in "JOUW" is replaced with the round Yrvante logo (since desktop right-side mockups are hidden on mobile)
- **CSS cleanup**: Removed `!important` overrides from dark mode that blocked glassmorphism

### Phase 12 - UI Polish (Complete - Apr 2026)
- **FAQ "Zie meer"**: Eerste 3 vragen zichtbaar, rest achter "Zie meer" knop
- **Groen beschikbaarheidbolletje**: `bg-gray-400` → `bg-green-500` met pulse animatie
- **Google Reviews fallback**: Toont altijd reviews, zelfs als API niet geconfigureerd is op productie
- **Nav opschoning**: "Alle Branches" en "Blog" verwijderd uit header dropdown menu's
- **Mobile logo-in-text**: Logo in "JOUW" op mobiel (O → Yrvante logo)

### Phase 13 - Lead Finder Synoniem-Uitbreiding (Complete - Apr 2026)
- **Synoniem-dictionary**: 30+ branches met automatische zoekterm-uitbreiding (bijv. "nagelstudio" → nagels, nail salon, manicure, gelnagels, pedicure nagels)
- **Multi-term scraping**: Alle scrapers (Instagram, Facebook, LinkedIn, Telefoongids, Gouden Gids, Marktplaats, KVK) doorzoeken nu ELKE synoniem per branche
- **Deduplicatie**: Dubbele resultaten worden automatisch verwijderd via place_id en URL tracking
- **UI indicator**: Blauw "Synoniem-uitbreiding actief" banner toont alle gebruikte zoektermen na het zoeken

### Phase 14 - Lead Finder Pro Upgrade (Complete - Apr 2026)
- **ECHTE Google Places API**: Vervangt mock-data met live Text Search API + paginering (3 pagina's × 3 zoektermen = tot ~180 resultaten)
- **OpenStreetMap / Nominatim**: Gratis extra databron naast Google Maps, zoekt per synoniem
- **Radius verwijderd**: Zoekt nu op stadsnaam (slimmer en eenvoudiger)
- **Resultaten**: "nagelstudio almelo" → 93 echte leads, "kapper almelo" → 75 echte leads

### Phase 15 - Prijzen Update + Pakket Features + Website Functies (Complete - Apr 2026)
**Prijzen bijgewerkt over alle pagina's:**
- Rebranding €249, Basis €399, Pro €699, Premium €999
- Extra pagina €39, Dark mode €69, Meertalig €109, Extra formulier €59, Boekingssysteem €199
- Nieuwe extra's: Pop-up €29, Voor & na slider €29

**Pakket features uitgebreid:**
- Elk pakket: gratis Cookie melding, 404 pagina, Prijstabel, Sticky WhatsApp/social/bel-knop, Click-to-call
- Pro + Premium: FAQ sectie (t.w.v. €39) + Scroll animaties (t.w.v. €49) inbegrepen
- Maandabonnement: Onderhoudspagina, Welkomst popup, Announcement bar, Urgentie timer, Seizoensthema

**Website features toegevoegd:**
- Terug naar boven knop (ScrollToTop)
- Automatische nachtmodus (20:00-06:00 → dark mode)
- Automatische taaldetectie (browser taal NL/EN)
- Geanimeerde achtergrond (5 zwevende gradient-orbs met langzame organische CSS drift-animaties, 22-35s cycli)
- Hover card CSS effect

## Vercel Environment Variables Required
- `POSTGRES_URL` — Vercel Postgres connection string
- `ADMIN_PASSWORD` — Admin dashboard password
- `GOOGLE_PLACES_API_KEY` — For Google Reviews
- `GOOGLE_PLACE_ID` — Yrvante's Google Business Place ID
- `RESEND_API_KEY` — For email delivery
- `SENDER_EMAIL` — noreply@yrvante.com
- `RECIPIENT_EMAIL` — info@yrvante.com

## Credentials
- Admin Dashboard Password (Preview): `yrvante2025`

### Phase 17 - Admin Dashboard Glassmorphism + CSV (Complete - Feb 2026)
- **Glassmorphism redesign**: Volledig Admin Dashboard herschreven met frosted glass effect (`bg-white/60 backdrop-blur-xl border-white/40`)
- **CSV Leads tab**: Toegevoegd aan admin dashboard met import, tabel, zoeken, statusfilter, WhatsApp knoppen
- **Overzicht tab**: CSV Leads Overzicht kaart met snelle statistieken + "Bekijk alles" link
- **4 tabs**: Overzicht, CSV Leads, Berichten, Analytics — allemaal glassmorphism
- **Dark mode**: Volledig werkend op alle tabs + login scherm
- **Bug fix**: Analytics tab crash gefixt (null check op pageviews.daily_views)
- **100% tests geslaagd** (iteration 34)

### Phase 16c - Dark Mode Lead Finder + Admin (Complete - Feb 2026)
- Volledige dark mode ondersteuning toegevoegd aan LeadFinderPage.jsx (alle 5 tabs)
- Admin Dashboard login scherm herontworpen met glassmorphism
- Witte logo variant (`logo-nav-white.png`) in dark mode

### Phase 16 - CSV Import Feature (Complete - Feb 2026)
- **CSV Import tab**: Nieuwe tab in Lead Finder dashboard voor het importeren van Google Maps Scraper CSV's
- **Filtering**: Bedrijven MET website worden automatisch gefilterd — alleen bedrijven zonder website worden getoond
- **Tabel**: Bedrijfsnaam, Categorie, Plaats (automatisch uit adres), Telefoon, Status dropdown, WhatsApp knop
- **Status**: 4 opties (Nieuw/Benaderd/Gereageerd/Overgeslagen) — opgeslagen in localStorage
- **WhatsApp**: Groene knop met gepersonaliseerd Nederlands bericht en automatisch geformateerd telefoonnummer (0→31)
- **Statistieken**: 4 kaarten: Totaal, Zonder Website, Benaderd, Gereageerd
- **Zoeken & Filteren**: Zoek op naam/plaats + filter op status
- **34/34 tests geslaagd** (iteration 32)

### Phase 16b - Achtergrond Animatie (Complete - Feb 2026)
- Statische achtergrond vervangen door 5 zwevende gradient-orbs met CSS drift-animaties (22-35s cycli)
- Originele bg-pattern.jpg transparant behouden als overlay

### Phase 18 - Smart Upgrade Tip (Complete - Apr 2026)
- **Smart Upgrade Tip**: `getUpgradeTip()` functie in CalculatorPage.jsx berekent of upgraden naar een hoger pakket goedkoper is dan het huidige pakket + geselecteerde add-ons
- **Voorbeeld**: Pro (€699) + Meertalig (€149) + Boekingssysteem (€249) = €1097 → Tip: "Upgrade naar Premium (€999) en bespaar €98!"
- **Upgrade knop**: Klik om direct naar het aanbevolen pakket te wisselen, inbegrepen add-ons worden automatisch gereset
- **Slim**: Tip verschijnt ALLEEN wanneer upgrade echt goedkoper is; verborgen bij laagste tier of als upgrade duurder is
- **42/42 tests geslaagd** (iteration 35)

### Phase 20 - LeadFinder Verbeteringen (Complete - Apr 2026)
- **CSV Export**: Download alle leads als CSV backup bestand
- **Notitie per lead**: Type direct notities onder elke lead in de tabel (opgeslagen in DB)
- **Telefoon kopiëren**: 1-klik kopieer-knop naast telefoonnummers
- **"Geen interesse" stat**: Teller toegevoegd in stats balk (5 stats nu: Totaal, Zonder Website, Benaderd, Gereageerd, Geen Interesse)
- **Datum bij "Benaderd"**: Automatisch tijdstempel wanneer WhatsApp is verstuurd
- **Vercel API**: CSV leads endpoints aangemaakt voor productie (`/api/admin/csv-leads.js`, `[id].js`)
- **localStorage backup**: Altijd lokale backup als vangnet + automatische migratie bij eerste load

### Phase 19 - CSV Database Sync + Statusverbeteringen (Complete - Apr 2026)
- **CSV leads naar MongoDB**: Alle CSV leads worden nu opgeslagen in MongoDB (`csv_leads` collection) i.p.v. localStorage. Zichtbaar op elk apparaat na inloggen.
- **API endpoints**: GET/POST/PUT/DELETE `/api/admin/csv-leads` voor volledige CRUD
- **"Geen interesse" status**: Nieuwe rode status optie in CSV tabellen (AdminDashboard + LeadFinder)
- **WhatsApp auto-status**: Klik op WhatsApp knop → status automatisch naar "Benaderd" + WhatsApp opent
- **Cross-device sync**: Leads geïmporteerd op Admin Dashboard verschijnen automatisch op LeadFinder
- **37/37 tests geslaagd** (iteration 37, backend + frontend)

### Phase 18b - WhatsApp & CSV Tabel Verbeteringen (Complete - Apr 2026)
- **WhatsApp direct app**: `wa.me` vervangen door `api.whatsapp.com/send` voor directe app-opening op alle WhatsApp-knoppen
- **Nieuwe WhatsApp template**: Persoonlijk verkoopbericht met automatische bedrijfsnaam ("Hoi {naam}!"), prijsinformatie, en Yrvante contactgegevens
- **Rating afronding**: `formatRating()` functie — ratings als max 1 decimaal (5.0 i.p.v. 5.0000000) op AdminDashboard + LeadFinder
- **Sorteerbare CSV kolommen**: Klik op kolomheaders (Bedrijfsnaam, Categorie, Plaats, Website, Rating, Reviews, Status) om te sorteren met richting-pijltjes
- **42/42 tests geslaagd** (iteration 36)

### Phase 23 - LeadFinder Herstructurering + Email Automatisering (Complete - Feb 2026)
- **Tab herstructurering**: CSV en Google Maps tabs samengevoegd tot één "LEADS" tab met source toggle (CSV Leads / Google Maps)
- **Email Campagne tab**: Nieuw dashboard met dagelijkse email limiet (10-50), batch send, email wachtrij, status tracking (niet_verstuurd/verstuurd/gereageerd)
- **Email API**: /api/leads/email-stats (GET/POST), /api/leads/send-email, /api/leads/send-batch via Resend (info@yrvante.com)
- **Prisma schema**: CsvLead uitgebreid met email, emailStatus, emailSentAt + nieuw EmailDailyLog model
- **Email statistieken**: Toegevoegd aan STATS dashboard (vandaag, resterend, totaal verstuurd, gereageerd)
- **Berichten**: Automatisch correct bericht gebaseerd op website status (met website → €249 rebranding, zonder → €399 nieuw)
- **Mobiel responsief**: Alle tabs werken op iPhone (390px)
- **16/16 backend + alle frontend tests geslaagd** (iteratie 41)

### Phase 24 - LeadFinder Cleanup & Dead Code Removal (Complete - Feb 2026)
- **Tools tab verwijderd**: Volledige onbereikbare "Tools & Integraties" tab verwijderd (5 van 6 items waren "COMING SOON", CSV Export al beschikbaar via andere knoppen)
- **Google Maps Leads sectie verwijderd**: Onbereikbare `leadSource === 'maps'` sectie verwijderd (toggle was nooit zichtbaar in UI)
- **Ongebruikte functies verwijderd**: `updateLead`, `deleteLead`, `bulkUpdateStatus`, `bulkDelete`, `toggleSelectLead`, `selectAllLeads`, `exportToGoogleSheets`, `openInGoogleSheets`, `copyToClipboard`
- **Ongebruikte state verwijderd**: `editingLead`, `editData`, `showLeadModal`, `showBulkActions`, `statusFilter`, `sourceFilter`, `priorityFilter`, `searchLeadsQuery`, `sortBy`, `selectedLeads`, `leadSource`
- **Imports opgeschoond**: 15+ ongebruikte Lucide icons verwijderd
- **Resultaat**: ~2000 → ~1663 regels (-337 regels dode code, -17%)
- **36/36 tests geslaagd** (iteratie 42)

## Backlog (P2)
- Google Sheets API for lead export
- Case studies/success stories for niche pages
- Split LiveExamples.jsx into separate component files
- Resend email DNS config (DKIM/SPF for yrvante.com)
- Dark mode edge cases review on all subpages
- SEO verification on all pages
- Split CalculatorPage.jsx, LeadFinderPage.jsx, AdminDashboard.jsx into smaller sub-components

## Critical Design Rules
- **Glassmorphism**: Use `bg-white/40 backdrop-blur-sm` (NOT solid `bg-white`)
- **Dark mode logos**: Use white `.png` variants (NOT CSS `invert`)
- **Vercel API limit**: MAX 12 serverless functions. Merge before adding.
- **No blue/navy**: Strictly neutral gray palette
