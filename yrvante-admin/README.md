# Yrvante Lead Finder — Admin Module

Integratiegids voor het toevoegen van de Lead Finder aan de bestaande `yrvante.com` Next.js website.

---

## Stap 1: Vercel Postgres instellen

1. Ga naar je [Vercel Dashboard](https://vercel.com/dashboard)
2. Kies je project → **Storage** → **Create Database** → **Postgres**
3. Kies een naam (bijv. `yrvante-leads`) en een regio (dicht bij je bezoekers)
4. Vercel genereert automatisch de `POSTGRES_URL` environment variable in je project

---

## Stap 2: Environment Variables instellen in Vercel

Ga naar **Project Settings → Environment Variables** en voeg toe:

| Variable | Waarde |
|---|---|
| `ADMIN_PASSWORD` | `Yv4r02!!yrvantebredewold` |
| `GOOGLE_PLACES_API_KEY` | `AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM` |
| `GOOGLE_SHEETS_CLIENT_ID` | `1080002902278-vuti2bp60rhhda3e8v2tc5a755asti2k.apps.googleusercontent.com` |
| `GOOGLE_SHEETS_CLIENT_SECRET` | `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` |
| `SHEETS_REDIRECT_URI` | `https://yrvante.com/api/admin/sheets-callback` |
| `POSTGRES_URL` | *(automatisch aangemaakt door Vercel Postgres)* |

---

## Stap 3: Bestanden kopiëren naar je project

### API (Serverless Functions)
Kopieer de map `api/admin/` naar de root van je Next.js project:

```
jouw-project/
  api/
    admin/
      _db.js
      auth.js
      zoek.js
      leads.js
      lead.js
      dashboard.js
      share.js
      sheets-login.js
      sheets-callback.js
      sheets-append.js
      sheets-status.js
```

### Frontend pagina
Kopieer `frontend/src/AdminPage.jsx` naar je project:

- **Pages Router:** `pages/admin.jsx`
- **App Router:** `app/admin/page.jsx` (houd `'use client'` bovenaan)

---

## Stap 4: Afhankelijkheden installeren

```bash
npm install @vercel/postgres
# of
yarn add @vercel/postgres
```

---

## Stap 5: Google OAuth Redirect URI updaten

Ga naar [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → jouw OAuth client.

Voeg toe aan **Authorized redirect URIs**:
```
https://yrvante.com/api/admin/sheets-callback
```

---

## Stap 6: Deployen

```bash
git add .
git commit -m "Add Lead Finder admin module"
git push
```

Vercel deploy automatisch. De Lead Finder is beschikbaar op:
- **`https://yrvante.com/admin`**

---

## Gebruik

1. Ga naar `https://yrvante.com/admin`
2. Log in met het admin wachtwoord
3. Zoek bedrijven op branche + stad
4. Sla leads op, volg status bij, exporteer naar CSV of Google Sheets

---

## Architectuur

```
Browser → /admin (Next.js pagina, AdminPage.jsx)
             ↓ fetch /api/admin/*
Vercel Serverless Functions (Node.js 20.x)
             ↓ SQL queries
Vercel Postgres (admin_leads, admin_search_history, etc.)
             ↓ externe API
Google Places API (zoeken)
Google Sheets API (exporteren)
```
