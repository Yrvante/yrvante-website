# Yrvante Lead Finder — PRD

## Problem Statement
Build a Lead Finder tool for Yrvante. A webpage where the user can enter an industry (branche) and city (stad). The backend uses Google Places API to find businesses without a website. Show name, address, phone number, and Google Maps link. White/gray design in exact Yrvante.com style.

---

## User Personas
- **Sales professionals** at Yrvante: find cold-call leads
- **Marketing teams**: outreach to businesses without digital presence

---

## Architecture

### Backend (FastAPI — /app/backend/server.py)
- `POST /api/zoek` — Google Places search with pagination (page_token)
- `POST /api/leads`, `GET /api/leads`, `PUT /api/leads/{id}`, `DELETE /api/leads/{id}`
- `GET /api/dashboard` — stats (totaal, status verdeling, recente zoekopdrachten)
- `POST /api/share`, `GET /api/share/{token}` — shareable read-only report
- `GET /api/sheets/status`, `GET /api/sheets/login`, `GET /api/sheets/callback`
- `POST /api/sheets/spreadsheet`, `POST /api/sheets/append/{id}`, `POST /api/sheets/append-all`

### Frontend (React — /app/frontend/src/App.js)
- 3 tabs: Zoeken | Mijn Leads | Dashboard
- Exact Yrvante.com stijl (Playfair Display, smoke achtergrond, gray buttons)

### External Services
- Google Places API (New) — key: AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM
- Google Sheets API + OAuth 2.0 — Client ID: 1080002902278-vuti2bp60rhhda3e8v2tc5a755asti2k

---

## What's Been Implemented

### Complete Feature Set (March 2026)
- ✅ Google Places search (20 per page)
- ✅ Paginatie: "Laad meer" button (nextPageToken)
- ✅ Lead opslaan in MongoDB (status: Nieuw/Gebeld/Offerte gestuurd/Klant geworden)
- ✅ Notities per lead (inline editen)
- ✅ Status tracking
- ✅ Dashboard (stats, status verdeling, recente zoekopdrachten)
- ✅ CSV export (zoekresultaten + opgeslagen leads)
- ✅ Deel rapport: shareable read-only URL (/share/{token})
- ✅ Social links: Facebook + Instagram via Google Search
- ✅ KVK lookup link (opens kvk.nl with search)
- ✅ Click-to-call telefoonnummers (tel: links)
- ✅ Google Sheets OAuth geconfigureerd (Client ID + Secret in .env)
  - "Verbind met Google Sheets" button in Dashboard
  - Per lead "Sheets" button (na verbinden)
  - "Exporteer alle leads → Sheets" button
- ✅ Exact Yrvante.com stijl

### Test Results
- Iteration 2: 100%
- Iteration 3: 100%
- Iteration 4: 100% backend (7/7) + 100% frontend

---

## Prioritized Backlog

### P1 — Volgende stappen
- [ ] Google Sheets: gebruiker moet OAuth flow doorlopen (klik "Verbind" in Dashboard)
- [ ] Spreadsheet ID instellen na OAuth verbinding
- [ ] KVK realtime (technisch niet haalbaar zonder dedicated Playwright infrastructure)

### P2 — Future
- [ ] Bulk status update
- [ ] Email leads direct vanuit de tool
- [ ] Meer branchen tegelijk zoeken
- [ ] Gedeeld rapport: notities tonen
