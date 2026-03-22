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

### Vercel Migratie Module (KLAAR VOOR DEPLOYMENT)
- **Locatie:** `/app/yrvante-admin/`
- **Frontend:** React component (`AdminPage.jsx`)
- **Backend:** 11 Node.js Serverless Functions (`api/admin/*.js`)
- **Database:** Vercel Postgres (Neon)

---

## Wat Is Geïmplementeerd

### Standalone App — Volledige Feature Set
- ✅ Google Places search (20 per pagina)
- ✅ Paginatie: "Laad meer" (nextPageToken)
- ✅ Lead opslaan in MongoDB
- ✅ Status tracking (Nieuw/Gebeld/Offerte gestuurd/Klant geworden)
- ✅ Notities per lead (inline editeren)
- ✅ Dashboard (stats, status verdeling, recente zoekopdrachten)
- ✅ CSV export (zoekresultaten + opgeslagen leads)
- ✅ Deel rapport: shareable read-only URL
- ✅ Social links: Facebook + Instagram via Google Search
- ✅ KVK lookup link
- ✅ Click-to-call telefoonnummers
- ✅ Auto-opslaan toggle
- ✅ **UI: 4-regel titeltekst (VIND / BEDRIJVEN / ZONDER / WEBSITE.)**
- ✅ **UI: Logo watermark rechts**

### Vercel Module (PRODUCTIE-KLAAR)
- ✅ 11 Node.js Serverless Functions met Postgres
- ✅ PKCE OAuth voor Google Sheets (fixed invalid_grant)
- ✅ Complete AdminPage.jsx met login
- ✅ Environment variables gedocumenteerd
- ✅ README met stap-voor-stap integratie-instructies
- ✅ vercel.json voor routing

---

## Test Resultaten
- Iteratie 5: 100% backend (15/15) + 100% frontend
- API Search: ✅ Werkend (kapper Utrecht: 20 resultaten)
- UI: ✅ Verified via screenshot

---

## Credentials (OPGESLAGEN IN .env.example)
- **Admin Wachtwoord:** `Yv4r02!!yrvantebredewold`
- **Postgres URL:** `postgresql://neondb_owner:npg_H5ny1vCPFtKo@ep-steep-voice-agyfsguv-pooler...`
- **Google Places API Key:** `AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM`
- **Google OAuth Client ID:** `1080002902278-...`
- **Google OAuth Client Secret:** `GOCSPX-...`

---

## Prioritized Backlog

### P0 — VOLTOOID (Klaar voor Vercel deployment)
- [x] Vercel module met Node.js serverless functions
- [x] Postgres database integratie
- [x] Environment variables gedocumenteerd
- [x] UI tekst-aanpassing (4-regel layout)
- [x] PKCE OAuth voor Google Sheets

### P1 — Na Deployment
- [ ] Google Redirect URI updaten in Google Cloud Console
- [ ] End-to-end OAuth flow testen

### P2 — Future
- [ ] Bulk status update
- [ ] Meer branches tegelijk zoeken
- [ ] Gedeeld rapport: notities tonen
- [ ] Email leads direct vanuit de tool

---

## Bekende Beperkingen
- **KVK scraping:** Technisch niet haalbaar (anti-scraping). Workaround: directe zoeklink
- **"Made with Emergent" badge:** Alleen in Emergent preview, niet in Vercel

---

## Integratie Instructies voor Vercel

1. Kopieer `/app/yrvante-admin/api/admin/` naar je Next.js project
2. Kopieer `AdminPage.jsx` naar `pages/admin.jsx` of `app/admin/page.jsx`
3. Installeer: `yarn add @vercel/postgres`
4. Voeg environment variables toe in Vercel Dashboard
5. Push naar GitHub → Vercel deployed automatisch

Zie `/app/yrvante-admin/README.md` voor volledige instructies.
