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

---

## Architecture

### Backend (FastAPI — /app/backend/server.py)
- `POST /api/zoek` — accepts `{branche, stad}`, calls Google Places API, returns leads without websites
- Fetches up to 3 pages (60 results max) from Google Places Text Search
- Filters: only includes places where `websiteUri` is absent/empty
- Returns: `{totaal_gevonden, leads: [{naam, adres, telefoonnummer, google_maps_url, place_id}]}`
- API Key: stored in `backend/.env` as `GOOGLE_PLACES_API_KEY`

### Frontend (React — /app/frontend/src/)
- Single page: hero + search form + results
- Exact Yrvante.com style (Playfair Display serif, smoke background, gray-500 buttons, rounded-full pills)
- CSV export via browser Blob download

### External Services
- Google Places API (New) — Text Search endpoint: `https://places.googleapis.com/v1/places:searchText`

---

## What's Been Implemented (March 2026)

### ✅ MVP Complete
- Backend: `POST /api/zoek` endpoint with Google Places API integration
- Frontend: Full Yrvante.com-style UI (Playfair Display, smoke bg, nav, badge, serif hero)
- Google Places: 3-page pagination (up to 60 results)
- Filtering: only businesses without website returned
- Results table: naam, adres, telefoonnummer, Maps link
- CSV export: browser blob download with Dutch headers
- Loading skeleton, error state, empty state, initial state
- Responsive layout (mobile + desktop)
- All data-testid attributes on interactive elements

### Test Results (iteration 2)
- Backend: 100% (10/10 tests pass)
- Frontend: 100% (all flows working)

---

## Prioritized Backlog

### P0 — Done
- ✅ Google Places API integration
- ✅ Website filtering
- ✅ CSV export
- ✅ Yrvante brand UI

### P1 — Next Steps
- [ ] Add pagination / "Laad meer" button (currently max 60 results)
- [ ] Search history (save previous searches via MongoDB)
- [ ] Phone number click-to-call links
- [ ] Multiple cities support in one search

### P2 — Future
- [ ] Save leads to MongoDB with notes/status
- [ ] Email leads directly from the tool
- [ ] Whitelist/blacklist companies
- [ ] Integration with CRM (e.g., HubSpot)
