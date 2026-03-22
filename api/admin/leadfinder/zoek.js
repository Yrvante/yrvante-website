import { sql } from '@vercel/postgres';
import { initTables, CORS } from './_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { branche, stad, pageToken } = req.body || {};
  
  if (!branche || !stad) {
    return res.status(400).json({ error: 'Branche en stad verplicht' });
  }
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Maps API key niet ingesteld' });
  }

  try {
    await initTables();
    
    const query = `${branche} in ${stad}`;
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=nl`;
    
    if (pageToken) {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pageToken}&key=${apiKey}`;
    }

    const placesRes = await fetch(url);
    const placesData = await placesRes.json();
    
    if (placesData.status !== 'OK' && placesData.status !== 'ZERO_RESULTS') {
      return res.status(500).json({ error: `Google API: ${placesData.status}` });
    }

    const leadsWithoutWebsite = [];
    
    for (const place of (placesData.results || [])) {
      try {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=website,formatted_phone_number,formatted_address&key=${apiKey}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();
        
        if (detailsData.status === 'OK' && !detailsData.result?.website) {
          leadsWithoutWebsite.push({
            place_id: place.place_id,
            naam: place.name,
            adres: detailsData.result?.formatted_address || place.formatted_address,
            telefoonnummer: detailsData.result?.formatted_phone_number || null,
            google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
          });
        }
      } catch (detailError) {
        console.error('Error fetching place details:', detailError);
      }
    }

    // Save search history (only for new searches, not pagination)
    if (!pageToken) {
      try {
        await sql`
          INSERT INTO leadfinder_search_history (branche, stad, totaal) 
          VALUES (${branche}, ${stad}, ${leadsWithoutWebsite.length}) 
          ON CONFLICT (branche, stad) 
          DO UPDATE SET totaal = ${leadsWithoutWebsite.length}, datum = NOW()
        `;
      } catch (historyError) {
        console.error('Error saving search history:', historyError);
      }
    }

    return res.status(200).json({ 
      leads: leadsWithoutWebsite, 
      totaal_gevonden: leadsWithoutWebsite.length, 
      nextPageToken: placesData.next_page_token || null 
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: error.message });
  }
}
