// api/admin/zoek.js
// POST /api/admin/zoek — Google Places search, returns businesses without website
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

const PLACES_URL = 'https://places.googleapis.com/v1/places:searchText';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { branche, stad, page_token } = req.body || {};
  if (!branche?.trim() || !stad?.trim()) {
    return res.status(422).json({ error: 'Branche en stad zijn verplicht.' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Google Places API key niet ingesteld.' });

  try {
    const body = { textQuery: `${branche.trim()} in ${stad.trim()}`, languageCode: 'nl' };
    if (page_token) body.pageToken = page_token;

    const resp = await fetch(PLACES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,nextPageToken',
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(502).json({ error: `Google Places fout: ${resp.status}` });
    }

    const data = await resp.json();
    const places = data.places || [];
    const nextPageToken = data.nextPageToken || null;

    // Only return places WITHOUT a website
    const leads = places
      .filter(p => !p.websiteUri)
      .map(p => ({
        naam: p.displayName?.text || 'Onbekend',
        adres: p.formattedAddress || '',
        telefoonnummer: p.nationalPhoneNumber || null,
        google_maps_url: p.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(p.displayName?.text || '')}`,
        place_id: p.id || '',
      }));

    // Save search history (upsert)
    if (!page_token) {
      await initTables();
      await sql`
        INSERT INTO admin_search_history (branche, stad, totaal)
        VALUES (${branche.trim()}, ${stad.trim()}, ${places.length})
        ON CONFLICT (branche, stad)
        DO UPDATE SET totaal = EXCLUDED.totaal, datum = NOW()
      `;
    }

    return res.status(200).json({
      totaal_gevonden: places.length,
      leads,
      next_page_token: nextPageToken,
    });
  } catch (err) {
    console.error('Zoek error:', err);
    return res.status(500).json({ error: 'Zoekfout. Probeer opnieuw.' });
  }
}
