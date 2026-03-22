# Yrvante Lead Finder — Admin Module

> Klaar-voor-Vercel module om te integreren in je bestaande Next.js website.

## Wat zit erin?

```
yrvante-admin/
├── api/admin/           # 11 Node.js Serverless Functions
│   ├── _db.js           # Postgres helpers + auth
│   ├── auth.js          # Login endpoint
│   ├── zoek.js          # Google Places search
│   ├── leads.js         # GET/POST leads
│   ├── lead.js          # PUT/DELETE lead
│   ├── dashboard.js     # Stats
│   ├── share.js         # Deelbaar rapport
│   ├── sheets-login.js  # Google OAuth (met PKCE)
│   ├── sheets-callback.js
│   ├── sheets-append.js
│   └── sheets-status.js
├── frontend/src/
│   └── AdminPage.jsx    # Complete React component
├── .env.example         # Alle benodigde env vars (MET CREDENTIALS)
├── vercel.json          # Routing config
└── package.json         # Dependencies
```

---

## Snelle Start (5 minuten)

### Stap 1: Kopieer bestanden

```bash
# Vanuit je Next.js project root:

# API routes kopiëren
cp -r yrvante-admin/api/admin ./api/

# Admin pagina kopiëren (kies Pages of App Router)
# Pages Router:
cp yrvante-admin/frontend/src/AdminPage.jsx ./pages/admin.jsx

# App Router:
mkdir -p ./app/admin && cp yrvante-admin/frontend/src/AdminPage.jsx ./app/admin/page.jsx
```

### Stap 2: Installeer dependency

```bash
yarn add @vercel/postgres
```

### Stap 3: Environment Variables in Vercel

Ga naar **Vercel Dashboard → Project → Settings → Environment Variables**

Kopieer-plak deze waarden:

```
ADMIN_PASSWORD=Yv4r02!!yrvantebredewold
POSTGRES_URL=postgresql://neondb_owner:npg_H5ny1vCPFtKo@ep-steep-voice-agyfsguv-pooler.c-2.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
GOOGLE_PLACES_API_KEY=AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM
GOOGLE_SHEETS_CLIENT_ID=1080002902278-vuti2bp60rhhda3e8v2tc5a755asti2k.apps.googleusercontent.com
GOOGLE_SHEETS_CLIENT_SECRET=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
SHEETS_REDIRECT_URI=https://yrvante.com/api/admin/sheets-callback
```

### Stap 4: Deploy

```bash
git add .
git commit -m "Add Lead Finder admin"
git push
```

### Stap 5: Test

1. Ga naar `https://yrvante.com/admin`
2. Login met: `Yv4r02!!yrvantebredewold`
3. Zoek naar bijv. "restaurant" in "Amsterdam"

---

## Alle Environment Variables

| Variable | Waarde | Vereist |
|----------|--------|---------|
| `ADMIN_PASSWORD` | `Yv4r02!!yrvantebredewold` | ✅ |
| `POSTGRES_URL` | `postgresql://neondb_owner:npg_H5ny1vCPFtKo@ep-steep-voice-agyfsguv-pooler.c-2.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require` | ✅ |
| `GOOGLE_PLACES_API_KEY` | `AIzaSyDn1y6-aOzY8NXaTdJAPL0GqI_5rl5XMEM` | ✅ |
| `GOOGLE_SHEETS_CLIENT_ID` | `1080002902278-...` | Optioneel |
| `GOOGLE_SHEETS_CLIENT_SECRET` | `GOCSPX-...` | Optioneel |
| `SHEETS_REDIRECT_URI` | `https://yrvante.com/api/admin/sheets-callback` | Optioneel |

---

## Features

- ✅ Google Places search (bedrijven zonder website filteren)
- ✅ Lead opslaan met status (Nieuw → Gebeld → Offerte → Klant)
- ✅ Notities per lead
- ✅ CSV export
- ✅ Deelbaar rapport (publieke link)
- ✅ Google Sheets integratie (PKCE-beveiligd)
- ✅ Dashboard met statistieken
- ✅ Auto-opslaan toggle
- ✅ KVK, Facebook, Instagram zoeklinks

---

## Google Sheets Setup (na deployment)

1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services → Credentials**
3. Klik op je OAuth Client ID
4. Voeg toe bij **Authorized redirect URIs**:
   ```
   https://yrvante.com/api/admin/sheets-callback
   ```
5. Sla op
6. In de Lead Finder: Dashboard → "Verbind met Google Sheets"

---

## Troubleshooting

| Probleem | Oplossing |
|----------|-----------|
| "Google Places API key niet ingesteld" | Voeg `GOOGLE_PLACES_API_KEY` toe in Vercel env vars |
| "Niet geautoriseerd" | Check `ADMIN_PASSWORD` in Vercel env vars |
| "Sheets: invalid_grant" | PKCE is geïmplementeerd. Klik opnieuw op "Verbind" |
| Database fout | Controleer `POSTGRES_URL` formatting |

---

## Database Schema (automatisch aangemaakt)

```sql
admin_leads (id, naam, adres, telefoonnummer, google_maps_url, place_id, branche, stad, status, notitie, opgeslagen_op)
admin_search_history (id, branche, stad, totaal, datum)
admin_share_reports (token, titel, leads, aangemaakt_op, totaal)
admin_sheets_config (key, value)
```

---

Klaar! Je Lead Finder draait nu op yrvante.com/admin 🚀
