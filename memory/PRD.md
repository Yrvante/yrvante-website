# Yrvante Lead Finder — PRD

## Origineel Probleemstatement
Build een Lead Finder tool voor Yrvante. Zoek bedrijven op branche en stad via Google Places API. Filter en toon bedrijven zonder website. Uiteindelijk volledig integreren in de bestaande `yrvante.com` Next.js website op Vercel.

---

## User Personas
- **Sales professionals** bij Yrvante: vinden cold-call leads
- **Marketing teams**: outreach naar bedrijven zonder digitale aanwezigheid

---

## Architectuur

### Standalone App (Emergent Preview — volledig werkend)
- **Frontend:** React (`/app/frontend/src/App.js`)
- **Backend:** FastAPI/Python (`/app/backend/server.py`)
- **Database:** MongoDB

### Vercel Migratie (gereed om te pushen naar GitHub)
- **Frontend:** Next.js pagina (`/app/yrvante-admin/frontend/src/AdminPage.jsx`)
- **Backend:** Node.js Serverless Functions (`/app/yrvante-admin/api/admin/`)
- **Database:** Vercel Postgres (`@vercel/postgres`)

---

## Wat Is Geïmplementeerd

### Standalone App — Volledige Feature Set
- ✅ Google Places search (20 per pagina)
- ✅ Paginatie: "Laad meer" (nextPageToken)
- ✅ Lead opslaan in MongoDB (status: Nieuw/Gebeld/Offerte gestuurd/Klant geworden)
- ✅ Notities per lead (inline editeren)
- ✅ Status tracking
- ✅ Dashboard (stats, status verdeling, recente zoekopdrachten — gededupliceerd)
- ✅ CSV export (zoekresultaten + opgeslagen leads)
- ✅ Deel rapport: shareable read-only URL (/share/{token})
- ✅ Social links: Facebook + Instagram via Google Search
- ✅ KVK lookup link (opens kvk.nl)
- ✅ Click-to-call telefoonnummers (tel: links)
- ✅ Google Sheets OAuth geconfigureerd (Client ID + Secret in .env)
- ✅ Auto-opslaan toggle (persistente in localStorage)
- ✅ "Made with Emergent" badge verborgen (CSS — platform-level beperking in preview)
- ✅ Exacte Yrvante.com stijl

### Vercel Migratie Module (`/app/yrvante-admin/`)
- ✅ 11 Node.js Serverless Functions:
  - `_db.js` — Vercel Postgres helpers + auth check
  - `auth.js` — Admin wachtwoord login
  - `zoek.js` — Google Places zoekopdracht
  - `leads.js` — GET/POST leads
  - `lead.js` — PUT/DELETE lead
  - `dashboard.js` — Statistieken
  - `share.js` — Deelbaar rapport
  - `sheets-login.js` — Google OAuth start (met PKCE fix)
  - `sheets-callback.js` — OAuth callback (met PKCE code_verifier)
  - `sheets-append.js` — Lead(s) exporteren naar Sheets
  - `sheets-status.js` — Status controleren + spreadsheet ID opslaan
- ✅ Next.js Admin Pagina (`AdminPage.jsx`) — volledig met login + alle tabs
- ✅ `vercel.json` — Routing configuratie
- ✅ `.env.example` — Alle benodigde environment variables
- ✅ `README.md` — Stap-voor-stap integratiegids

### Bug Fixes (February 2026)
- ✅ Google Sheets `invalid_grant` bug: PKCE geïmplementeerd in sheets-login.js + sheets-callback.js
- ✅ Dashboard zoekgeschiedenis: deduplicatie via MongoDB aggregation pipeline
- ✅ Backend test: stale assertion in test_leads.py gecorrigeerd

---

## Test Resultaten
- Iteratie 5: 100% backend (15/15) + 100% frontend

---

## Credentials
- **Google Places API Key:** `AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM`
- **Google OAuth Client ID:** `1080002902278-vuti2bp60rhhda3e8v2tc5a755asti2k.apps.googleusercontent.com`
- **Google OAuth Client Secret:** `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`
- **Admin Wachtwoord:** `Yv4r02!!yrvantebredewold`

---

## Prioritized Backlog

### P0 — Deployment Vercel
- [ ] Vercel Postgres database aanmaken in Vercel Dashboard
- [ ] Environment variables instellen in Vercel project
- [ ] `AdminPage.jsx` kopiëren naar `pages/admin.jsx` of `app/admin/page.jsx`
- [ ] `api/admin/` map kopiëren naar Next.js project root
- [ ] Deployen via GitHub push

### P1 — Google Sheets Verbinding
- [ ] Na deploy: OAuth flow doorlopen via Dashboard tab
- [ ] Google Redirect URI updaten in Google Cloud Console naar `https://yrvante.com/api/admin/sheets-callback`

### P2 — Future
- [ ] Bulk status update
- [ ] Meer branchen tegelijk zoeken
- [ ] Gedeeld rapport: notities tonen
- [ ] Email leads direct vanuit de tool

---

## Bekende Beperkingen
- **KVK scraping:** Technisch niet haalbaar (anti-scraping). Workaround: directe zoeklink naar kvk.nl
- **"Made with Emergent" badge:** Platform-niveau injectie in preview omgeving. Verschijnt NIET in eigen Vercel deployment.
