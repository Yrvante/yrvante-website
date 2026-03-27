# Yrvante Website - Product Requirements Document

## Project Overview
Professionele website voor Yrvante - een webdesign & development bedrijf gericht op ZZP'ers en MKB in Nederland.

**Live Preview URL**: https://admin-leads-hub.preview.emergentagent.com

## Core Features (Implemented)

### 1. Landing Page
- Hero section met grote typografie
- Services sectie
- Pricing pakketten (€500/€900/€1400)
- FAQ sectie
- Contact formulier met Resend email integratie
- Footer met privacy link en verborgen admin toegang

### 2. Contact Formulier
- Stuurt interne notificatie naar info@yrvante.com
- Stuurt bevestigingsmail naar klant
- Honeypot spam bescherming
- Resend API integratie

### 3. Admin Dashboard / Lead Finder (MASSIVELY UPDATED)
- Wachtwoord-beveiligde toegang via lock icoon in footer
- **"ZOEK ALLES" functie** - Zoek alle ZZP'ers en bedrijven in één keer
- **Radius zoeken** - Configureerbaar van +5km tot +100km
- **8 BRONNEN geïntegreerd:**
  1. **Google Maps** - Places API met radius zoeken
  2. **KVK** - Via Google site search
  3. **Instagram** - Accounts zonder website in bio
  4. **Facebook** - Pagina's zonder website
  5. **LinkedIn** - Company pages
  6. **Telefoongids.nl** - Traditionele bedrijven
  7. **Gouden Gids** - Oude bedrijven zonder website
  8. **Marktplaats Diensten** - ZZP'ers die adverteren
- **Nearby cities** - Automatisch omliggende steden doorzoeken
- Lead management met status tracking (nieuw/warm/koud/contact/klant)
- Dashboard met statistieken
- CSV export functionaliteit
- Bulk acties (selecteer meerdere leads)

### 4. Extra Pagina's
- `/privacy` - Privacybeleid pagina
- `/pakketten` - Packages overzicht
- `/calculator` - Website prijs calculator
- `/diensten` - Diensten overzicht per branche
- `/over-mij` - About pagina
- `/blog` - Blog overzicht
- `/onderhoud` - Onderhoud & hosting info

## Technical Architecture

### Frontend (React)
- React 18 met React Router
- Tailwind CSS + Shadcn/UI componenten
- Framer Motion animaties
- Sonner toast notifications
- Responsive design

### Backend
**Preview (Python/FastAPI)**:
- MongoDB voor data opslag
- Resend voor emails
- Lead Finder endpoints voor lokale testing

**Production (Vercel Serverless)**:
- Node.js serverless functions in `/api/`
- Vercel Postgres (Neon) database
- Google Places API voor lead zoeken

### Database Schema (Vercel Postgres)
```sql
-- leadfinder_leads
id UUID PRIMARY KEY
naam VARCHAR(255)
adres TEXT
telefoonnummer VARCHAR(50)
google_maps_url TEXT
place_id VARCHAR(255) UNIQUE
branche VARCHAR(100)
stad VARCHAR(100)
status VARCHAR(50) DEFAULT 'nieuw'
notitie TEXT
opgeslagen_op TIMESTAMPTZ

-- leadfinder_search_history
id UUID PRIMARY KEY
branche VARCHAR(100)
stad VARCHAR(100)
totaal INTEGER
datum TIMESTAMPTZ
```

## Environment Variables

### Preview Environment (backend/.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
RESEND_API_KEY=re_bfcpWKc6_HGvwamvGQ2xKWrbdNFFBoicc
SENDER_EMAIL=noreply@yrvante.com
RECIPIENT_EMAIL=info@yrvante.com
```

### Vercel Production (REQUIRED)
```
POSTGRES_URL=postgresql://neondb_owner:npg_H5ny1vCPFtKo@ep-steep-voice-agyfsguv-pooler.c-2.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
ADMIN_PASSWORD=Yv4r02!!yrvantebredewold
GOOGLE_MAPS_API_KEY=AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM
RESEND_API_KEY=re_bfcpWKc6_HGvwamvGQ2xKWrbdNFFBoicc
SENDER_EMAIL=noreply@yrvante.com
RECIPIENT_EMAIL=info@yrvante.com
```

## Deployment Status

### What Works Now
- [x] Homepage en alle pagina's
- [x] Contact formulier met email
- [x] Privacy pagina
- [x] Lead Finder login (preview: yrvante2025)
- [x] Lead Finder zoeken (mock data in preview)
- [x] Lead opslaan en beheren

### Vercel Deployment Checklist
1. [ ] Environment variables instellen in Vercel Dashboard
2. [ ] Deployen naar Vercel
3. [ ] Database tabellen worden automatisch aangemaakt
4. [ ] Testen met productie wachtwoord: `Yv4r02!!yrvantebredewold`

## Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form submission |
| `/api/admin/leadfinder/auth` | POST | Lead Finder login |
| `/api/admin/leadfinder/zoek` | POST | Search for businesses |
| `/api/admin/leadfinder/leads` | GET/POST | List/Create leads |
| `/api/admin/leadfinder/lead/[id]` | PUT/DELETE | Update/Delete lead |
| `/api/admin/leadfinder/dashboard` | GET | Dashboard stats |

## File Structure
```
/app/
├── api/                          # Vercel serverless functions
│   ├── contact.js                # Contact form handler
│   └── admin/leadfinder/         # Lead Finder API
├── backend/                      # Preview environment backend
│   └── server.py
├── frontend/
│   └── src/
│       ├── App.js
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LeadFinderPage.jsx
│       │   ├── PrivacyPage.jsx
│       │   └── ...
│       └── components/
├── vercel.json
├── package.json
└── .nvmrc
```

## Changelog

### Maart 2026
- Alle icons uit infographic gegenereerd en overal op homepage geplaatst (13 custom icons)
- Homepage logo verwijderd naast "JOUW BEDRIJF ONLINE"
- Nieuwe secties toegevoegd aan homepage: Onderhoud, Het Proces, Expertise & Voordelen, Hosting
- 5-sterren reviews verwijderd uit Basis pakket demo (Hondenwandelservice)
- Google Reviews stat verwijderd uit Basis pakket demo
- Homepage logo fade-effect en styling iteraties voltooid
- Telefoonnummer en WhatsApp link sitewide bijgewerkt
- Lead Finder V2: radius search, multi-source scraping, "Zoek Alles"
- Lead Finder UI/UX: Google Sheets export, mobiele responsiviteit

### December 2025
- Lead Finder page restyled to match Yrvante homepage
- Login functionality fixed for preview environment
- Customer confirmation email added to contact form
- Privacy policy page created
- Vercel deployment configuration completed

## Backlog

### P1 (High Priority)
- [ ] SEO review across all pages

### P2 (Medium Priority)
- [ ] Refactor DienstenPage.jsx (extract niches data)
- [ ] Add case studies/success stories

### P3 (Low Priority)
- [ ] Bulk CSV import for Lead Finder
- [ ] WhatsApp templates integration
- [ ] Email campaign feature
