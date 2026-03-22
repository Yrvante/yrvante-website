import { sql } from '@vercel/postgres';
import { initTables, CORS } from './_db.js';

// Nederlandse steden met coördinaten voor radius zoeken
const STAD_COORDS = {
  'almelo': { lat: 52.3567, lng: 6.6625 },
  'amsterdam': { lat: 52.3676, lng: 4.9041 },
  'rotterdam': { lat: 51.9244, lng: 4.4777 },
  'den haag': { lat: 52.0705, lng: 4.3007 },
  'utrecht': { lat: 52.0907, lng: 5.1214 },
  'eindhoven': { lat: 51.4416, lng: 5.4697 },
  'groningen': { lat: 53.2194, lng: 6.5665 },
  'tilburg': { lat: 51.5555, lng: 5.0913 },
  'almere': { lat: 52.3508, lng: 5.2647 },
  'breda': { lat: 51.5719, lng: 4.7683 },
  'nijmegen': { lat: 51.8426, lng: 5.8546 },
  'enschede': { lat: 52.2215, lng: 6.8937 },
  'haarlem': { lat: 52.3874, lng: 4.6462 },
  'arnhem': { lat: 51.9851, lng: 5.8987 },
  'zaanstad': { lat: 52.4559, lng: 4.8286 },
  'amersfoort': { lat: 52.1561, lng: 5.3878 },
  'apeldoorn': { lat: 52.2112, lng: 5.9699 },
  'hoofddorp': { lat: 52.3025, lng: 4.6889 },
  'maastricht': { lat: 50.8514, lng: 5.6910 },
  'leiden': { lat: 52.1601, lng: 4.4970 },
  'dordrecht': { lat: 51.8133, lng: 4.6901 },
  'zoetermeer': { lat: 52.0575, lng: 4.4931 },
  'zwolle': { lat: 52.5168, lng: 6.0830 },
  'deventer': { lat: 52.2549, lng: 6.1630 },
  'delft': { lat: 52.0116, lng: 4.3571 },
  'hengelo': { lat: 52.2661, lng: 6.7927 },
  'oss': { lat: 51.7649, lng: 5.5181 },
  'helmond': { lat: 51.4792, lng: 5.6614 },
  'hilversum': { lat: 52.2292, lng: 5.1669 },
};

// ZZP/Freelancer zoektermen voor uitgebreider zoeken
const ZZP_SEARCH_TERMS = [
  'zzp', 'freelancer', 'zelfstandig', 'eenmanszaak', 'ondernemer',
  'dienstverlening', 'advies', 'consultancy', 'studio', 'praktijk',
  'atelier', 'coach', 'trainer', 'therapeut', 'specialist'
];

// Branches om te doorzoeken
const COMMON_BRANCHES = [
  'kapper', 'schoonheidsspecialist', 'nagelstudio', 'masseur',
  'fotograaf', 'grafisch ontwerper', 'schilder', 'loodgieter',
  'elektricien', 'timmerman', 'tuinman', 'schoonmaker',
  'personal trainer', 'yoga', 'fysiotherapeut', 'accountant',
  'boekhouder', 'administratie', 'coach', 'trainer'
];

async function getCoordinates(stad, apiKey) {
  const stadLower = stad.toLowerCase().trim();
  if (STAD_COORDS[stadLower]) {
    return STAD_COORDS[stadLower];
  }
  
  // Geocode de stad als niet in onze lijst
  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(stad + ', Nederland')}&key=${apiKey}`;
    const res = await fetch(geocodeUrl);
    const data = await res.json();
    if (data.results && data.results[0]) {
      return data.results[0].geometry.location;
    }
  } catch (e) {
    console.error('Geocode error:', e);
  }
  return null;
}

async function searchGooglePlaces(query, coords, radiusKm, apiKey, pageToken = null) {
  const radiusMeters = radiusKm * 1000;
  let url;
  
  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pageToken}&key=${apiKey}`;
  } else if (coords) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${coords.lat},${coords.lng}&radius=${radiusMeters}&key=${apiKey}&language=nl`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=nl`;
  }

  const placesRes = await fetch(url);
  const placesData = await placesRes.json();
  
  if (placesData.status !== 'OK' && placesData.status !== 'ZERO_RESULTS') {
    console.error('Google Places error:', placesData.status);
    return { results: [], nextPageToken: null };
  }
  
  return {
    results: placesData.results || [],
    nextPageToken: placesData.next_page_token || null
  };
}

async function getPlaceDetails(placeId, apiKey) {
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,formatted_phone_number,formatted_address,types,business_status,opening_hours&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();
    
    if (detailsData.status === 'OK') {
      return detailsData.result;
    }
  } catch (e) {
    console.error('Place details error:', e);
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    branche, 
    stad, 
    pageToken, 
    radius = 25,
    searchAll = false,
    filters = {}
  } = req.body || {};
  
  if (!stad) {
    return res.status(400).json({ error: 'Stad is verplicht' });
  }
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Maps API key niet ingesteld' });
  }

  try {
    await initTables();
    
    // Get coordinates for radius search
    const coords = await getCoordinates(stad, apiKey);
    
    let allLeads = [];
    let nextToken = null;
    const seenPlaceIds = new Set();
    
    if (pageToken) {
      // Continue with pagination
      const { results, nextPageToken } = await searchGooglePlaces('', null, radius, apiKey, pageToken);
      nextToken = nextPageToken;
      
      for (const place of results) {
        if (seenPlaceIds.has(place.place_id)) continue;
        seenPlaceIds.add(place.place_id);
        
        const details = await getPlaceDetails(place.place_id, apiKey);
        if (details && !details.website) {
          allLeads.push({
            place_id: place.place_id,
            naam: place.name,
            adres: details.formatted_address || place.formatted_address,
            telefoonnummer: details.formatted_phone_number || null,
            google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            source: 'google',
            types: details.types || []
          });
        }
      }
    } else if (searchAll) {
      // UNIFIED SEARCH - Zoek alles tegelijk
      const searchQueries = [];
      
      // Add main branche if provided
      if (branche && branche.trim()) {
        searchQueries.push(branche);
        // Add ZZP variants
        searchQueries.push(`${branche} zzp`);
        searchQueries.push(`${branche} freelancer`);
        searchQueries.push(`${branche} zelfstandig`);
      }
      
      // Add ZZP general searches
      searchQueries.push('zzp');
      searchQueries.push('freelancer');
      searchQueries.push('eenmanszaak');
      searchQueries.push('zelfstandig ondernemer');
      
      // Add common branches without websites
      COMMON_BRANCHES.forEach(b => {
        if (!branche || !b.includes(branche.toLowerCase())) {
          searchQueries.push(b);
        }
      });
      
      // Limit to prevent rate limiting, but search broadly
      const limitedQueries = searchQueries.slice(0, 8);
      
      for (const query of limitedQueries) {
        const fullQuery = `${query} in ${stad}`;
        const { results } = await searchGooglePlaces(fullQuery, coords, radius, apiKey);
        
        for (const place of results) {
          if (seenPlaceIds.has(place.place_id)) continue;
          seenPlaceIds.add(place.place_id);
          
          const details = await getPlaceDetails(place.place_id, apiKey);
          
          // Filter: alleen zonder website
          if (details && !details.website) {
            // Extra filters
            if (filters.onlyWithPhone && !details.formatted_phone_number) continue;
            if (filters.onlyOpen && details.business_status !== 'OPERATIONAL') continue;
            
            allLeads.push({
              place_id: place.place_id,
              naam: place.name,
              adres: details.formatted_address || place.formatted_address,
              telefoonnummer: details.formatted_phone_number || null,
              google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
              source: 'google',
              types: details.types || [],
              matchedQuery: query
            });
          }
        }
        
        // Small delay to prevent rate limiting
        await new Promise(r => setTimeout(r, 100));
      }
    } else {
      // Standard single search with radius
      const query = branche ? `${branche} in ${stad}` : `bedrijven in ${stad}`;
      const { results, nextPageToken } = await searchGooglePlaces(query, coords, radius, apiKey);
      nextToken = nextPageToken;
      
      for (const place of results) {
        if (seenPlaceIds.has(place.place_id)) continue;
        seenPlaceIds.add(place.place_id);
        
        const details = await getPlaceDetails(place.place_id, apiKey);
        
        if (details && !details.website) {
          if (filters.onlyWithPhone && !details.formatted_phone_number) continue;
          
          allLeads.push({
            place_id: place.place_id,
            naam: place.name,
            adres: details.formatted_address || place.formatted_address,
            telefoonnummer: details.formatted_phone_number || null,
            google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            source: 'google',
            types: details.types || []
          });
        }
      }
    }

    // Save search history
    if (!pageToken) {
      try {
        const searchTerm = searchAll ? `ALLES: ${branche || 'alle branches'}` : (branche || 'algemeen');
        await sql`
          INSERT INTO leadfinder_search_history (branche, stad, totaal) 
          VALUES (${searchTerm}, ${stad + ' +' + radius + 'km'}, ${allLeads.length}) 
          ON CONFLICT (branche, stad) 
          DO UPDATE SET totaal = ${allLeads.length}, datum = NOW()
        `;
      } catch (historyError) {
        console.error('Error saving search history:', historyError);
      }
    }

    return res.status(200).json({ 
      leads: allLeads, 
      totaal_gevonden: allLeads.length, 
      nextPageToken: nextToken,
      zoekgebied: coords ? `${stad} + ${radius}km radius` : stad,
      bronnen_doorzocht: searchAll ? ['Google Maps', 'ZZP varianten', 'Algemene branches'] : ['Google Maps']
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: error.message });
  }
}
