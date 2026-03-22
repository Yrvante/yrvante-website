# Yrvante Lead Finder — PRD

## Problem Statement
Build a Lead Finder tool for Yrvante. A webpage where the user can enter an industry (branche) and city (stad). The backend uses Google Places API to find businesses without a website. Show name, address, phone number, and Google Maps link. White/gray design in exact Yrvante.com style. CSV export.

---

## User Personas
- **Sales professionals** at Yrvante who need leads for businesses without digital presence
- **Marketing teams** looking for cold outreach targets in specific sectors and cities

---

## Core Requirements (Static)
1. Search form: branche + stad inputs
2. Backend: Google Places API (New) Text Search + Place Details
3. Filter: only show businesses WITHOUT a `websiteUri` field
4. Display: naam, adres, telefoonnummer, Google Maps link
5. CSV export functionality
6. Dutch language interface
7. Exact Yrvante.com visual style
8. No authentication required
9. Lead opslaan (MongoDB) with status tracking
10. Dashboard with statistics
11. Social quick-search links (Facebook/Instagram via Google)
12. KVK lookup link per lead

---

## Architecture

### Backend (FastAPI — /app/backend/server.py)
- `POST /api/zoek` — zoek op branche + stad via Google Places API
- `POST /api/leads` — sla lead op in MongoDB
- `GET /api/leads` — haal opgeslagen leads op (met optioneel status filter)
- `PUT /api/leads/{id}` — update status/notitie
- `DELETE /api/leads/{id}` — verwijder lead
- `GET /api/dashboard` — statistieken (totaal, status verdeling, recente zoekopdrachten)
- `GET /api/sheets/status` — Google Sheets verbindingsstatus
- `GET /api/sheets/login` — start Google OAuth flow (vereist credentials)
- `GET /api/sheets/callback` — OAuth callback
- `POST /api/sheets/spreadsheet` — sla spreadsheet ID op
- `POST /api/sheets/append/{lead_id}` — stuur één lead naar Sheets
- `POST /api/sheets/append-all` — stuur alle leads naar Sheets

### Frontend (React — /app/frontend/src/App.js)
- 3 tabs: **Zoeken** (hero + zoekformulier + resultaten), **Mijn Leads** (saved leads), **Dashboard** (stats + Sheets)
- Per lead in resultaten: Maps, KVK, Facebook, Instagram, Opslaan buttons
- Telefoons als `tel:` link (klikbaar)
- Status dropdown: Nieuw/Gebeld/Offerte gestuurd/Klant geworden
- Notities editen in-line
- CSV export
- Exact Yrvante.com stijl (Playfair Display, smoke bg, gray-500 buttons)

### External Services
- Google Places API (New) — Text Search
- Google Sheets API (OAuth 2.0 — requires user credentials)

---

## What's Been Implemented

### MVP Complete (March 2026)
- ✅ Google Places API search + website filtering
- ✅ Results table: naam, adres, telefoon, Maps link
- ✅ CSV export
- ✅ Exact Yrvante.com visual style
- ✅ Lead opslaan in MongoDB
- ✅ Status tracking (Nieuw/Gebeld/Offerte gestuurd/Klant geworden)
- ✅ Notities per lead
- ✅ Dashboard (totaal, status verdeling, recente zoekopdrachten)
- ✅ Social quick links: Facebook + Instagram via Google Search
- ✅ KVK lookup link
- ✅ Click-to-call telefoonnummers
- ✅ Search history opslaan
- ✅ Google Sheets backend (wacht op OAuth credentials)
- ✅ 3-tab navigatie

### Test Results
- Iteration 2: 100% (basic search)
- Iteration 3: 100% backend (8/8) + 100% frontend

---

## Prioritized Backlog

### P0 — Done
- ✅ Alle bovenstaande features

### P1 — In Progress / Needs Action
- [ ] Google Sheets OAuth: vereist GOOGLE_SHEETS_CLIENT_ID + GOOGLE_SHEETS_CLIENT_SECRET + SHEETS_REDIRECT_URI in backend/.env
  - Setup: Google Cloud Console → Enable Sheets API → OAuth credentials
  - Redirect URI: https://{app-url}/api/sheets/callback

### P2 — Future
- [ ] Pagination ("Laad meer") voor meer dan 60 resultaten
- [ ] KVK realtime scraping (momenteel link button, JS-rendering blokkeert server-side scraping)
- [ ] Filter resultaten per stad/branche in Mijn Leads
- [ ] Bulk status update
- [ ] Email leads rechtstreeks vanuit de tool
