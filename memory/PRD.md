# Yrvante Website - Product Requirements Document

## Origineel Probleemstatement
Bouw een professionele bedrijfswebsite voor "Yrvante", een webdesign/software studio voor MKB & ZZP'ers. De site moet: pakketten tonen, een prijscalculator bevatten, niche-specifieke landingspagina's hebben, een 'Over Mij' pagina en contactmogelijkheden.

## Technische Stack
- **Frontend:** React (Create React App), Tailwind CSS, Framer Motion, lucide-react
- **Backend:** FastAPI (Python)
- **Database:** Geen (statische content)
- **Email:** Resend API (GEBLOKKEERD: DNS verificatie vereist)
- **Analytics:** PostHog
- **Calendly:** Integratie voor gratis gesprekken

## Kernfunctionaliteiten (Geïmplementeerd)
- Homepage met hero, diensten-overzicht, pakkettenvergelijking, process-sectie en contactformulier
- Pakketpagina met 3 pakketten (Basis €500, Pro €900, Premium €1400)
- Interactieve prijscalculator
- Niche-specifieke landingspagina's (/voor/[niche]) voor 23 branches
- Uitgebreide webdesign-pagina (/diensten/webdesign)
- Website onderhoud/hosting pagina (/onderhoud)
- Over Mij pagina met nieuwe slogan en stats
- Calendly integratie voor gratis gesprekken

## Design Principes
- Cloud gray kleurenschema (bg-gray-500 als accent)
- Abstract achtergrondpatroon (BG_IMAGE) op alle pagina's
- Logo: black-background PNG met mix-blend-mode: screen
- Rounded full buttons, anti-AI-slop esthetiek
- Responsive (mobile-first)

## Geïmplementeerde Wijzigingen (Chronologisch)

### Sessie 1-13 (Eerdere agents)
- Site-brede kleurverandering van zwart/donkerblauw naar cloud gray
- Logo transparantie opgelost via mix-blend-mode: screen
- Navigatie vereenvoudigd naar "Diensten" dropdown
- Homepage hero herontworpen (pill-shaped buttons, €500 VANAF badge, logo)
- Testimonials en Google Reviews verwijderd
- Grayscale filter op achtergrondafbeeldingen voor kleurconsistentie
- Performance verbeterd op DienstenPage (animatievertraging verlaagd)

### Sessie 14-15 (Huidige batch - Februari 2026)
1. WhatsApp-knop kleur → `bg-gray-500`
2. Reactietijd "binnen 8 uur" in alle bestanden (LandingPage, PackagesPage, CalculatorPage - NL én EN)
3. PackagesPage hero: donkere gradient → BG_IMAGE + bg-white/70, logo in nav
4. Over Mij hero: nieuwe slogan "Geen bureau. Geen tussenlagen. Geen bullshit." + 3-kolom stats
5. Webdesign pagina volledig herontworpen (hero, features, process, statistieken, "meer plannen" sectie)
6. 9 nieuwe niches toegevoegd: schoonheidsspecialisten, masseurs, fysiotherapeuten, accountants, electriciens, schilders, timmerlieden, dierenartsen, klusbedrijven
7. SEO data toegevoegd voor alle nieuwe niches en diensten
8. Calendly "Plan een gratis gesprek" knop in contact sectie (CALENDLY_URL = https://calendly.com/yrvante)
9. Centraal data-bestand aangemaakt: `/app/frontend/src/data/siteData.js`

## Bestanden Structuur
```
/app/
├── backend/
│   └── server.py                    # FastAPI + Resend email
├── frontend/
│   ├── public/
│   │   └── index.html               # Calendly scripts/CSS toegevoegd
│   └── src/
│       ├── App.js                   # Routes, LanguageContext
│       ├── App.css                  # Grayscale filter voor BG
│       ├── data/
│       │   └── siteData.js          # NIEUW: Gedeelde constanten & data
│       ├── components/
│       │   ├── SEO.jsx              # SEO voor alle pagina's (uitgebreid)
│       │   └── DemoPreview.jsx
│       └── pages/
│           ├── LandingPage.jsx      # Homepage (groot component)
│           ├── PackagesPage.jsx     # Pakketten & Prijzen (nieuwe hero)
│           ├── CalculatorPage.jsx   # Interactieve prijscalculator
│           ├── DienstenPage.jsx     # Diensten + 23 niches + webdesign page
│           ├── OnderhoudPage.jsx    # Website onderhoud pagina
│           ├── OverMijPage.jsx      # Over Mij (nieuwe slogan + stats)
│           └── WhyWebsitePage.jsx   # Waarom een website pagina
```

## API Endpoints
- `POST /api/contact` - Contactformulier (GEBLOKKEERD: DNS verificatie)
- `POST /api/calculator` - Calculator verzoek (GEBLOKKEERD: zelfde reden)

## Kritieke Informatie voor Nieuwe Agent
1. **Taal:** ALTIJD Nederlands antwoorden
2. **Email (GEBLOKKEERD):** Resend API key aanwezig, maar domain `yrvante.com` heeft DNS records nodig (DKIM/SPF) bij domeinprovider
3. **Calendly URL:** Moet door gebruiker gewijzigd worden naar hun eigen Calendly link (`https://calendly.com/yrvante` als placeholder)
4. **Gebruiker:** Zeer iteratief, maakt kleine, precieze aanvragen
5. **Logo URL:** `https://customer-assets.emergentagent.com/job_272a012d-c2c7-4b19-9d48-7e5cf3696f19/artifacts/rm7xz0dp_IMG_1929.png`
6. **BG Image:** `https://static.prod-images.emergentagent.com/jobs/44213466-a228-4a52-8cfe-b2e9737ed3f4/images/2a34d7236be4e054bd9f0732390c5f3d5391189a4b208e22a6d37de47cadbc9a.png`

## Prioriteiten Backlog

### P0 - Blokkerende Issues
- Email via contactformulier werkt niet (DNS records `yrvante.com` vereist)

### P1 - Komende Taken
- SEO verificatie op dynamische niche pagina's (final sweep)
- Calendly URL aanpassen naar echte Calendly account URL

### P2 - Toekomstige Taken
- `LandingPage.jsx` opsplitsen in sub-componenten (Navigation.jsx, HeroSection.jsx, ContactSection.jsx)
- Content consolideren: package-definities verplaatsen naar `siteData.js`
- Case studies / succesverhalen voor niche-pagina's

## Geteste Iteraties
- iteration_12.json - iteration_13.json - iteration_14.json - iteration_15.json (100% pass)
