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

// ZZP/Freelancer zoektermen
const ZZP_SEARCH_TERMS = [
  'zzp', 'freelancer', 'zelfstandig', 'eenmanszaak', 'ondernemer',
  'dienstverlening', 'advies', 'consultancy', 'studio', 'praktijk'
];

// Branches
const COMMON_BRANCHES = [
  'kapper', 'schoonheidsspecialist', 'nagelstudio', 'masseur',
  'fotograaf', 'grafisch ontwerper', 'schilder', 'loodgieter',
  'elektricien', 'timmerman', 'tuinman', 'schoonmaker',
  'personal trainer', 'yoga', 'fysiotherapeut', 'accountant',
  'boekhouder', 'coach', 'trainer'
];

// ====== SCRAPER FUNCTIONS ======

// Helper: Simple Google Search via scraping
async function googleSearch(query, maxResults = 10) {
  const results = [];
  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${maxResults}&hl=nl`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
      }
    });
    const html = await res.text();
    
    // Extract URLs from search results
    const urlMatches = html.matchAll(/href="\/url\?q=([^&"]+)/g);
    for (const match of urlMatches) {
      const decodedUrl = decodeURIComponent(match[1]);
      if (!decodedUrl.includes('google.com') && !decodedUrl.includes('youtube.com')) {
        results.push(decodedUrl);
      }
    }
  } catch (e) {
    console.error('Google search error:', e);
  }
  return results.slice(0, maxResults);
}

// Instagram via Google Search
async function scrapeInstagram(branche, stad) {
  const leads = [];
  try {
    const query = `site:instagram.com "${branche}" "${stad}" OR "${branche}" netherlands`;
    const urls = await googleSearch(query, 12);
    
    for (const url of urls) {
      if (url.includes('instagram.com/') && !url.includes('/p/') && !url.includes('/reel/')) {
        const usernameMatch = url.match(/instagram\.com\/([^\/\?]+)/);
        if (usernameMatch) {
          const username = usernameMatch[1];
          if (!['explore', 'accounts', 'about', 'legal', 'privacy', 'directory'].includes(username)) {
            leads.push({
              plaats_id: `ig_${username}`,
              naam: `@${username}`,
              source: 'instagram',
              instagram_url: url,
              adres: stad,
              google_maps_url: null,
            });
          }
        }
      }
    }
  } catch (e) {
    console.error('Instagram scrape error:', e);
  }
  return leads;
}

// Facebook via Google Search
async function scrapeFacebook(branche, stad) {
  const leads = [];
  try {
    const query = `site:facebook.com "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 12);
    
    for (const url of urls) {
      if (url.includes('facebook.com/') && !url.includes('/posts/') && !url.includes('/photos/')) {
        const pageMatch = url.match(/facebook\.com\/([^\/\?]+)/);
        if (pageMatch) {
          const pageName = pageMatch[1];
          if (!['watch', 'marketplace', 'groups', 'events', 'gaming', 'login', 'help', 'story.php'].includes(pageName)) {
            leads.push({
              plaats_id: `fb_${pageName}`,
              naam: pageName.replace(/\./g, ' ').replace(/-/g, ' '),
              source: 'facebook',
              facebook_url: url,
              adres: stad,
              google_maps_url: null,
            });
          }
        }
      }
    }
  } catch (e) {
    console.error('Facebook scrape error:', e);
  }
  return leads;
}

// LinkedIn via Google Search
async function scrapeLinkedIn(branche, stad) {
  const leads = [];
  try {
    const query = `site:linkedin.com/company "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 10);
    
    for (const url of urls) {
      if (url.includes('linkedin.com/company/')) {
        const companyMatch = url.match(/linkedin\.com\/company\/([^\/\?]+)/);
        if (companyMatch) {
          const companySlug = companyMatch[1];
          leads.push({
            plaats_id: `li_${companySlug}`,
            naam: companySlug.replace(/-/g, ' '),
            source: 'linkedin',
            linkedin_url: url,
            adres: stad,
            google_maps_url: null,
          });
        }
      }
    }
  } catch (e) {
    console.error('LinkedIn scrape error:', e);
  }
  return leads;
}

// Telefoongids via Google Search
async function scrapeTelefoongids(branche, stad) {
  const leads = [];
  try {
    const query = `site:detelefoongids.nl "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 10);
    
    for (const url of urls) {
      if (url.includes('detelefoongids.nl')) {
        // Try to extract business name from URL
        const pathMatch = url.match(/detelefoongids\.nl\/[^\/]+\/([^\/\?]+)/);
        const businessName = pathMatch ? decodeURIComponent(pathMatch[1]).replace(/-/g, ' ') : `Telefoongids - ${branche}`;
        leads.push({
          plaats_id: `tg_${Math.random().toString(36).substr(2, 9)}`,
          naam: businessName,
          source: 'telefoongids',
          telefoongids_url: url,
          adres: stad,
          google_maps_url: null,
        });
      }
    }
  } catch (e) {
    console.error('Telefoongids scrape error:', e);
  }
  return leads;
}

// Gouden Gids via Google Search
async function scrapeGoudenGids(branche, stad) {
  const leads = [];
  try {
    const query = `site:goudengids.nl "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 10);
    
    for (const url of urls) {
      if (url.includes('goudengids.nl')) {
        const pathMatch = url.match(/goudengids\.nl\/[^\/]+\/([^\/\?]+)/);
        const businessName = pathMatch ? decodeURIComponent(pathMatch[1]).replace(/-/g, ' ') : `Gouden Gids - ${branche}`;
        leads.push({
          plaats_id: `gg_${Math.random().toString(36).substr(2, 9)}`,
          naam: businessName,
          source: 'goudengids',
          goudengids_url: url,
          adres: stad,
          google_maps_url: null,
        });
      }
    }
  } catch (e) {
    console.error('Gouden Gids scrape error:', e);
  }
  return leads;
}

// Marktplaats via Google Search
async function scrapeMarktplaats(branche, stad) {
  const leads = [];
  try {
    const query = `site:marktplaats.nl/diensten "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 8);
    
    for (const url of urls) {
      if (url.includes('marktplaats.nl')) {
        leads.push({
          plaats_id: `mp_${Math.random().toString(36).substr(2, 9)}`,
          naam: `Marktplaats ZZP - ${branche}`,
          source: 'marktplaats',
          marktplaats_url: url,
          adres: stad,
          google_maps_url: null,
        });
      }
    }
  } catch (e) {
    console.error('Marktplaats scrape error:', e);
  }
  return leads;
}

// KVK via Google Search
async function scrapeKVK(branche, stad) {
  const leads = [];
  try {
    const query = `site:kvk.nl "${branche}" "${stad}"`;
    const urls = await googleSearch(query, 8);
    
    for (const url of urls) {
      if (url.includes('kvk.nl')) {
        leads.push({
          plaats_id: `kvk_${Math.random().toString(36).substr(2, 9)}`,
          naam: `KVK Bedrijf - ${branche}`,
          source: 'kvk',
          kvk_url: url,
          adres: stad,
          google_maps_url: null,
        });
      }
    }
  } catch (e) {
    console.error('KVK scrape error:', e);
  }
  return leads;
}

// ====== GOOGLE PLACES API ======

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
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,formatted_phone_number,formatted_address,types,business_status&key=${apiKey}`;
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

// ====== MAIN HANDLER ======

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
    filters = {},
    sources = ['google', 'instagram', 'facebook', 'linkedin', 'telefoongids', 'goudengids', 'marktplaats', 'kvk']
  } = req.body || {};
  
  if (!stad) {
    return res.status(400).json({ error: 'Stad is verplicht' });
  }
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    await initTables();
    
    let allLeads = [];
    let nextToken = null;
    const seenIds = new Set();
    const scrapedSources = [];
    const searchTerm = branche || 'zzp freelancer diensten';

    // Get coordinates for radius search
    const coords = apiKey ? await getCoordinates(stad, apiKey) : null;
    
    if (pageToken && apiKey) {
      // Continue with pagination (Google only)
      const { results, nextPageToken } = await searchGooglePlaces('', null, radius, apiKey, pageToken);
      nextToken = nextPageToken;
      
      for (const place of results) {
        if (seenIds.has(place.place_id)) continue;
        seenIds.add(place.place_id);
        
        const details = await getPlaceDetails(place.place_id, apiKey);
        if (details && !details.website) {
          allLeads.push({
            place_id: place.place_id,
            naam: place.name,
            adres: details.formatted_address || place.formatted_address,
            telefoonnummer: details.formatted_phone_number || null,
            google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            source: 'google',
          });
        }
      }
      scrapedSources.push('Google Maps');
    } else {
      // ====== PARALLEL SCRAPING OF ALL SOURCES ======
      const scrapePromises = [];
      
      // 1. Google Places API (if key available)
      if (apiKey && sources.includes('google')) {
        scrapePromises.push((async () => {
          const searchQueries = searchAll 
            ? [searchTerm, ...COMMON_BRANCHES.slice(0, 5)] 
            : [branche || 'bedrijven'];
          
          for (const query of searchQueries.slice(0, 3)) {
            const fullQuery = `${query} in ${stad}`;
            const { results, nextPageToken } = await searchGooglePlaces(fullQuery, coords, radius, apiKey);
            if (!nextToken) nextToken = nextPageToken;
            
            for (const place of results) {
              if (seenIds.has(place.place_id)) continue;
              seenIds.add(place.place_id);
              
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
                });
              }
            }
          }
          scrapedSources.push('Google Maps');
        })());
      }
      
      // 2. Instagram
      if (sources.includes('instagram')) {
        scrapePromises.push(
          scrapeInstagram(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('Instagram');
          }).catch(e => console.error('Instagram error:', e))
        );
      }
      
      // 3. Facebook
      if (sources.includes('facebook')) {
        scrapePromises.push(
          scrapeFacebook(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('Facebook');
          }).catch(e => console.error('Facebook error:', e))
        );
      }
      
      // 4. LinkedIn
      if (sources.includes('linkedin')) {
        scrapePromises.push(
          scrapeLinkedIn(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('LinkedIn');
          }).catch(e => console.error('LinkedIn error:', e))
        );
      }
      
      // 5. Telefoongids
      if (sources.includes('telefoongids')) {
        scrapePromises.push(
          scrapeTelefoongids(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('Telefoongids');
          }).catch(e => console.error('Telefoongids error:', e))
        );
      }
      
      // 6. Gouden Gids
      if (sources.includes('goudengids')) {
        scrapePromises.push(
          scrapeGoudenGids(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('Gouden Gids');
          }).catch(e => console.error('Gouden Gids error:', e))
        );
      }
      
      // 7. Marktplaats
      if (sources.includes('marktplaats')) {
        scrapePromises.push(
          scrapeMarktplaats(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('Marktplaats');
          }).catch(e => console.error('Marktplaats error:', e))
        );
      }
      
      // 8. KVK
      if (sources.includes('kvk')) {
        scrapePromises.push(
          scrapeKVK(searchTerm, stad).then(leads => {
            leads.forEach(l => {
              if (!seenIds.has(l.plaats_id)) {
                seenIds.add(l.plaats_id);
                allLeads.push(l);
              }
            });
            if (leads.length > 0) scrapedSources.push('KVK');
          }).catch(e => console.error('KVK error:', e))
        );
      }
      
      // Wait for all scrapes with timeout
      await Promise.race([
        Promise.all(scrapePromises),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 25000))
      ]).catch(e => console.error('Scrape timeout:', e.message));
    }

    // Save search history
    if (!pageToken) {
      try {
        const searchLabel = searchAll ? `ALLES: ${branche || 'alle branches'}` : (branche || 'algemeen');
        await sql`
          INSERT INTO leadfinder_search_history (branche, stad, totaal) 
          VALUES (${searchLabel}, ${stad + ' +' + radius + 'km'}, ${allLeads.length}) 
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
      bronnen_doorzocht: scrapedSources,
      zoekterm: searchTerm,
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: error.message });
  }
}
