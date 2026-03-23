import { sql } from '@vercel/postgres';
import { initTables, CORS } from './_db.js';

// Nederlandse steden met coördinaten
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
  'zwolle': { lat: 52.5168, lng: 6.0830 },
  'deventer': { lat: 52.2549, lng: 6.1630 },
  'hengelo': { lat: 52.2661, lng: 6.7927 },
  'oldenzaal': { lat: 52.3133, lng: 6.9292 },
  'borne': { lat: 52.3000, lng: 6.7500 },
  'wierden': { lat: 52.3589, lng: 6.5917 },
  'vriezenveen': { lat: 52.4083, lng: 6.6250 },
  'tubbergen': { lat: 52.4044, lng: 6.7833 },
  'rijssen': { lat: 52.3094, lng: 6.5181 },
  'apeldoorn': { lat: 52.2112, lng: 5.9699 },
  'leiden': { lat: 52.1601, lng: 4.4970 },
  'maastricht': { lat: 50.8514, lng: 5.6910 },
  'venlo': { lat: 51.3704, lng: 6.1724 },
  'leeuwarden': { lat: 53.2012, lng: 5.7999 },
};

// Synoniemen voor branches - om meer resultaten te vinden
const BRANCH_SYNONYMS = {
  'kapper': ['kapper', 'kapsalon', 'hairdresser', 'hair salon', 'barbershop', 'barber', 'knippen', 'coiffeur', 'hairstylist', 'kapperszaak'],
  'schoonheidsspecialist': ['schoonheidsspecialist', 'beauty salon', 'schoonheidssalon', 'beautysalon', 'huidverzorging', 'gezichtsbehandeling', 'beauty'],
  'nagelstudio': ['nagelstudio', 'nail salon', 'nagelsalon', 'manicure', 'pedicure', 'nails', 'gelnagels'],
  'masseur': ['masseur', 'massage', 'massagesalon', 'wellness', 'spa', 'ontspanning'],
  'fotograaf': ['fotograaf', 'photographer', 'fotostudio', 'photography', 'foto'],
  'schilder': ['schilder', 'painter', 'schildersbedrijf', 'verfwerk', 'huisschilder'],
  'loodgieter': ['loodgieter', 'plumber', 'installateur', 'sanitair', 'cv monteur', 'verwarming'],
  'elektricien': ['elektricien', 'electrician', 'elektrisch', 'elektra', 'elektrotechniek'],
  'tuinman': ['tuinman', 'hovenier', 'gardener', 'tuinonderhoud', 'tuinaanleg', 'groenvoorziening'],
  'coach': ['coach', 'coaching', 'life coach', 'business coach', 'loopbaancoach', 'mentor'],
  'fysiotherapeut': ['fysiotherapeut', 'fysiotherapie', 'fysio', 'physiotherapy', 'manueel therapeut'],
  'accountant': ['accountant', 'boekhouder', 'administratie', 'belastingadviseur', 'financieel adviseur'],
  'personal trainer': ['personal trainer', 'pt', 'fitness trainer', 'sportcoach', 'fitnessinstructeur'],
  'tandarts': ['tandarts', 'dentist', 'tandartspraktijk', 'mondzorg', 'dental'],
  'restaurant': ['restaurant', 'eetcafe', 'bistro', 'brasserie', 'eten'],
  'cafe': ['cafe', 'bar', 'kroeg', 'horeca', 'drink'],
  'bakker': ['bakker', 'bakkerij', 'bakery', 'brood', 'patisserie'],
  'slager': ['slager', 'slagerij', 'butcher', 'vlees'],
  'garage': ['garage', 'automonteur', 'autobedrijf', 'car repair', 'autowerkplaats'],
  'fietsenmaker': ['fietsenmaker', 'fietsenzaak', 'bike repair', 'fietsenwinkel'],
  'bloemist': ['bloemist', 'bloemenwinkel', 'florist', 'bloemen'],
  'schoonmaker': ['schoonmaker', 'cleaning', 'schoonmaakbedrijf', 'glazenwasser'],
  'timmerman': ['timmerman', 'carpenter', 'houtbewerking', 'meubelmaker'],
  'dierenarts': ['dierenarts', 'veterinarian', 'dierenkliniek', 'huisdier'],
};

// Nearby Search types voor Google Places
const PLACE_TYPES = {
  'kapper': ['hair_care', 'beauty_salon'],
  'schoonheidsspecialist': ['beauty_salon', 'spa'],
  'nagelstudio': ['beauty_salon'],
  'massage': ['spa', 'health'],
  'fotograaf': ['photographer'],
  'restaurant': ['restaurant', 'cafe', 'food'],
  'garage': ['car_repair', 'car_dealer'],
  'tandarts': ['dentist', 'health'],
  'fysiotherapeut': ['physiotherapist', 'health'],
  'dierenarts': ['veterinary_care'],
};

// Geocode stad naar coördinaten
async function getCoordinates(stad, apiKey) {
  const stadLower = stad.toLowerCase().trim();
  if (STAD_COORDS[stadLower]) {
    return STAD_COORDS[stadLower];
  }
  
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

// Text Search API - zoekt op tekst query
async function textSearch(query, coords, radiusKm, apiKey, pageToken = null) {
  const radiusMeters = Math.min(radiusKm * 1000, 50000); // Max 50km
  let url;
  
  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pageToken}&key=${apiKey}`;
    // Google vereist een kleine delay voor pagetoken
    await new Promise(r => setTimeout(r, 300));
  } else {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${coords.lat},${coords.lng}&radius=${radiusMeters}&key=${apiKey}&language=nl&region=nl`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
      return {
        results: data.results || [],
        nextPageToken: data.next_page_token || null,
        status: data.status
      };
    } else {
      console.error('Text Search error:', data.status, data.error_message);
      return { results: [], nextPageToken: null, status: data.status };
    }
  } catch (e) {
    console.error('Text Search fetch error:', e);
    return { results: [], nextPageToken: null, status: 'ERROR' };
  }
}

// Nearby Search API - zoekt op type en locatie
async function nearbySearch(coords, radiusKm, placeType, apiKey, pageToken = null) {
  const radiusMeters = Math.min(radiusKm * 1000, 50000);
  let url;
  
  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pageToken}&key=${apiKey}`;
    await new Promise(r => setTimeout(r, 300));
  } else {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${radiusMeters}&type=${placeType}&key=${apiKey}&language=nl`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
      return {
        results: data.results || [],
        nextPageToken: data.next_page_token || null
      };
    }
    return { results: [], nextPageToken: null };
  } catch (e) {
    console.error('Nearby Search error:', e);
    return { results: [], nextPageToken: null };
  }
}

// Haal details op van een plaats (check of website bestaat)
async function getPlaceDetails(placeId, apiKey) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,formatted_phone_number,formatted_address,name,types,business_status,opening_hours,url&key=${apiKey}&language=nl`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.status === 'OK') {
      return data.result;
    }
  } catch (e) {
    console.error('Place details error:', e);
  }
  return null;
}

// Hoofdfunctie: Zoek leads
export default async function handler(req, res) {
  // CORS
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    branche = '', 
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
    return res.status(500).json({ error: 'Google Maps API key niet geconfigureerd' });
  }

  try {
    await initTables();
    
    const coords = await getCoordinates(stad, apiKey);
    if (!coords) {
      return res.status(400).json({ error: `Kon locatie "${stad}" niet vinden` });
    }
    
    const allLeads = [];
    const seenPlaceIds = new Set();
    let nextToken = null;
    
    // Als we een pageToken hebben, gebruik die voor volgende pagina
    if (pageToken) {
      const { results, nextPageToken } = await textSearch('', null, radius, apiKey, pageToken);
      nextToken = nextPageToken;
      
      for (const place of results) {
        if (seenPlaceIds.has(place.place_id)) continue;
        seenPlaceIds.add(place.place_id);
        
        const details = await getPlaceDetails(place.place_id, apiKey);
        if (details && !details.website) {
          allLeads.push({
            place_id: place.place_id,
            naam: place.name,
            adres: details.formatted_address || place.formatted_address || place.vicinity,
            telefoonnummer: details.formatted_phone_number || null,
            google_maps_url: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            source: 'google',
            types: place.types || [],
            business_status: details.business_status || place.business_status
          });
        }
      }
    } else {
      // NIEUWE ZOEKOPDRACHT - gebruik meerdere strategieën
      
      // 1. Bepaal zoektermen gebaseerd op branche
      let searchTerms = [];
      const brancheLower = branche.toLowerCase().trim();
      
      if (brancheLower && BRANCH_SYNONYMS[brancheLower]) {
        // Gebruik alle synoniemen voor deze branche
        searchTerms = BRANCH_SYNONYMS[brancheLower];
      } else if (brancheLower) {
        // Gebruik de ingevoerde term + variaties
        searchTerms = [brancheLower, `${brancheLower} ${stad}`, `${brancheLower} nederland`];
      } else {
        // Geen branche - zoek algemeen naar lokale bedrijven
        searchTerms = ['bedrijf', 'winkel', 'diensten', 'zakelijk'];
      }
      
      // 2. Text Search voor elke zoekterm (maximaal 5 om rate limits te voorkomen)
      const searchPromises = [];
      const limitedTerms = searchTerms.slice(0, 6);
      
      for (const term of limitedTerms) {
        const query = `${term} in ${stad}`;
        searchPromises.push(
          textSearch(query, coords, radius, apiKey).then(async ({ results, nextPageToken }) => {
            // Bewaar de eerste nextPageToken
            if (nextPageToken && !nextToken) {
              nextToken = nextPageToken;
            }
            
            const leads = [];
            for (const place of results) {
              if (seenPlaceIds.has(place.place_id)) continue;
              seenPlaceIds.add(place.place_id);
              
              // Haal details op om website te checken
              const details = await getPlaceDetails(place.place_id, apiKey);
              
              // Filter: alleen bedrijven ZONDER website
              if (details && !details.website) {
                // Extra filter: alleen actieve bedrijven
                if (details.business_status === 'CLOSED_PERMANENTLY') continue;
                // Filter op telefoonnummer indien gewenst
                if (filters.onlyWithPhone && !details.formatted_phone_number) continue;
                
                leads.push({
                  place_id: place.place_id,
                  naam: place.name,
                  adres: details.formatted_address || place.formatted_address || place.vicinity,
                  telefoonnummer: details.formatted_phone_number || null,
                  google_maps_url: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                  source: 'google',
                  types: place.types || [],
                  business_status: details.business_status || 'OPERATIONAL',
                  zoekterm: term
                });
              }
            }
            return leads;
          }).catch(e => {
            console.error(`Search error for "${term}":`, e);
            return [];
          })
        );
      }
      
      // 3. Nearby Search als we een bekend type hebben
      if (brancheLower && PLACE_TYPES[brancheLower]) {
        for (const placeType of PLACE_TYPES[brancheLower]) {
          searchPromises.push(
            nearbySearch(coords, radius, placeType, apiKey).then(async ({ results }) => {
              const leads = [];
              for (const place of results) {
                if (seenPlaceIds.has(place.place_id)) continue;
                seenPlaceIds.add(place.place_id);
                
                const details = await getPlaceDetails(place.place_id, apiKey);
                if (details && !details.website) {
                  if (details.business_status === 'CLOSED_PERMANENTLY') continue;
                  if (filters.onlyWithPhone && !details.formatted_phone_number) continue;
                  
                  leads.push({
                    place_id: place.place_id,
                    naam: place.name,
                    adres: details.formatted_address || place.vicinity,
                    telefoonnummer: details.formatted_phone_number || null,
                    google_maps_url: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                    source: 'google',
                    types: place.types || [],
                    business_status: details.business_status || 'OPERATIONAL',
                    zoekterm: `nearby:${placeType}`
                  });
                }
              }
              return leads;
            }).catch(e => {
              console.error(`Nearby search error:`, e);
              return [];
            })
          );
        }
      }
      
      // 4. Wacht op alle zoekopdrachten
      const resultsArrays = await Promise.all(searchPromises);
      for (const leads of resultsArrays) {
        allLeads.push(...leads);
      }
      
      // 5. Als we weinig resultaten hebben, probeer nog een paar extra zoekopdrachten
      if (allLeads.length < 10 && brancheLower) {
        // Zoek ook in nabijgelegen steden
        const nearbyCities = ['hengelo', 'enschede', 'oldenzaal', 'borne', 'wierden'].filter(c => c !== stad.toLowerCase());
        
        for (const city of nearbyCities.slice(0, 2)) {
          const cityCoords = STAD_COORDS[city];
          if (!cityCoords) continue;
          
          const { results } = await textSearch(`${brancheLower} in ${city}`, cityCoords, 15, apiKey);
          for (const place of results) {
            if (seenPlaceIds.has(place.place_id)) continue;
            seenPlaceIds.add(place.place_id);
            
            const details = await getPlaceDetails(place.place_id, apiKey);
            if (details && !details.website) {
              if (filters.onlyWithPhone && !details.formatted_phone_number) continue;
              
              allLeads.push({
                place_id: place.place_id,
                naam: place.name,
                adres: details.formatted_address || place.vicinity,
                telefoonnummer: details.formatted_phone_number || null,
                google_maps_url: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                source: 'google',
                types: place.types || [],
                zoekterm: `nearby_city:${city}`
              });
            }
          }
        }
      }
    }

    // Sla zoekgeschiedenis op
    if (!pageToken) {
      try {
        const searchLabel = branche || 'algemeen';
        await sql`
          INSERT INTO leadfinder_search_history (branche, stad, totaal) 
          VALUES (${searchLabel}, ${stad + ' +' + radius + 'km'}, ${allLeads.length}) 
          ON CONFLICT (branche, stad) 
          DO UPDATE SET totaal = ${allLeads.length}, datum = NOW()
        `;
      } catch (e) {
        console.error('History save error:', e);
      }
    }

    return res.status(200).json({ 
      leads: allLeads, 
      totaal_gevonden: allLeads.length, 
      nextPageToken: nextToken,
      zoekgebied: `${stad} + ${radius}km radius`,
      bronnen_doorzocht: ['Google Maps'],
      zoektermen_gebruikt: branche ? (BRANCH_SYNONYMS[branche.toLowerCase()] || [branche]).slice(0, 5) : ['algemeen']
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: error.message });
  }
}
