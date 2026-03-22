// Universal Lead Scraper - Multiple Sources
// Scrapes KVK, Instagram, Facebook, LinkedIn, Marktplaats, Telefoongids, Gouden Gids

import { CORS } from './_db.js';

// Helper: Parse Google Search Results
async function googleSearch(query, maxResults = 10) {
  const results = [];
  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${maxResults}&hl=nl`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
      }
    });
    const html = await res.text();
    
    // Extract URLs and titles from search results
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

// Source 1: KVK Scraper
async function scrapeKVK(branche, stad, radius) {
  const leads = [];
  try {
    const searchUrl = `https://www.kvk.nl/zoeken/?source=all&q=${encodeURIComponent(branche)}&plaats=${encodeURIComponent(stad)}`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      }
    });
    const html = await res.text();
    
    // Parse KVK results - look for business cards
    const businessMatches = html.matchAll(/<h3[^>]*class="[^"]*kvk-result[^"]*"[^>]*>([^<]+)<\/h3>/gi);
    for (const match of businessMatches) {
      const naam = match[1].trim();
      if (naam) {
        leads.push({
          naam,
          source: 'kvk',
          adres: stad,
          hasWebsite: false, // KVK listings without website field
          kvk_url: searchUrl,
        });
      }
    }
    
    // Alternative: Search Google for KVK listings
    if (leads.length === 0) {
      const googleResults = await googleSearch(`site:kvk.nl ${branche} ${stad}`, 5);
      for (const url of googleResults) {
        if (url.includes('kvk.nl')) {
          leads.push({
            naam: `KVK Bedrijf - ${branche}`,
            source: 'kvk',
            adres: stad,
            kvk_url: url,
          });
        }
      }
    }
  } catch (e) {
    console.error('KVK scrape error:', e);
  }
  return leads;
}

// Source 2: Instagram via Google Search
async function scrapeInstagram(branche, stad) {
  const leads = [];
  try {
    const query = `site:instagram.com ${branche} ${stad} Nederland`;
    const urls = await googleSearch(query, 15);
    
    for (const url of urls) {
      if (url.includes('instagram.com/') && !url.includes('/p/') && !url.includes('/reel/')) {
        // Extract username from URL
        const usernameMatch = url.match(/instagram\.com\/([^\/\?]+)/);
        if (usernameMatch) {
          const username = usernameMatch[1];
          if (!['explore', 'accounts', 'about', 'legal', 'privacy'].includes(username)) {
            leads.push({
              naam: `@${username}`,
              source: 'instagram',
              instagram_url: url,
              adres: stad,
              branche: branche,
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

// Source 3: Facebook via Google Search
async function scrapeFacebook(branche, stad) {
  const leads = [];
  try {
    const query = `site:facebook.com ${branche} ${stad} Nederland`;
    const urls = await googleSearch(query, 15);
    
    for (const url of urls) {
      if (url.includes('facebook.com/') && !url.includes('/posts/') && !url.includes('/photos/')) {
        const pageMatch = url.match(/facebook\.com\/([^\/\?]+)/);
        if (pageMatch) {
          const pageName = pageMatch[1];
          if (!['watch', 'marketplace', 'groups', 'events', 'gaming', 'login', 'help'].includes(pageName)) {
            leads.push({
              naam: pageName.replace(/-/g, ' '),
              source: 'facebook',
              facebook_url: url,
              adres: stad,
              branche: branche,
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

// Source 4: LinkedIn Company Pages via Google Search
async function scrapeLinkedIn(branche, stad) {
  const leads = [];
  try {
    const query = `site:linkedin.com/company ${branche} ${stad} Nederland`;
    const urls = await googleSearch(query, 10);
    
    for (const url of urls) {
      if (url.includes('linkedin.com/company/')) {
        const companyMatch = url.match(/linkedin\.com\/company\/([^\/\?]+)/);
        if (companyMatch) {
          const companySlug = companyMatch[1];
          leads.push({
            naam: companySlug.replace(/-/g, ' '),
            source: 'linkedin',
            linkedin_url: url,
            adres: stad,
            branche: branche,
          });
        }
      }
    }
  } catch (e) {
    console.error('LinkedIn scrape error:', e);
  }
  return leads;
}

// Source 5: Marktplaats Diensten
async function scrapeMarktplaats(branche, stad) {
  const leads = [];
  try {
    const searchUrl = `https://www.marktplaats.nl/q/${encodeURIComponent(branche)}/#q:${encodeURIComponent(branche)}|postcode:${encodeURIComponent(stad)}`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    const html = await res.text();
    
    // Parse listings - simplified extraction
    const titleMatches = html.matchAll(/<h3[^>]*class="[^"]*mp-Listing-title[^"]*"[^>]*>([^<]+)<\/h3>/gi);
    for (const match of titleMatches) {
      leads.push({
        naam: match[1].trim(),
        source: 'marktplaats',
        adres: stad,
        marktplaats_url: searchUrl,
      });
    }
    
    // Fallback: Google search
    if (leads.length === 0) {
      const googleResults = await googleSearch(`site:marktplaats.nl diensten ${branche} ${stad}`, 5);
      for (const url of googleResults) {
        leads.push({
          naam: `Marktplaats - ${branche}`,
          source: 'marktplaats',
          marktplaats_url: url,
          adres: stad,
        });
      }
    }
  } catch (e) {
    console.error('Marktplaats scrape error:', e);
  }
  return leads;
}

// Source 6: Telefoongids.nl
async function scrapeTelefoongids(branche, stad) {
  const leads = [];
  try {
    const searchUrl = `https://www.detelefoongids.nl/${encodeURIComponent(branche)}/${encodeURIComponent(stad)}/`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      }
    });
    const html = await res.text();
    
    // Extract business names and phone numbers
    const businessRegex = /<h2[^>]*class="[^"]*business-name[^"]*"[^>]*>([^<]+)<\/h2>/gi;
    const phoneRegex = /(\+31|0[0-9]{2})[- ]?[0-9]{3}[- ]?[0-9]{4}/g;
    
    let match;
    while ((match = businessRegex.exec(html)) !== null) {
      const naam = match[1].trim();
      // Try to find phone near this listing
      const nearbyHtml = html.substring(match.index, match.index + 500);
      const phoneMatch = nearbyHtml.match(phoneRegex);
      
      leads.push({
        naam,
        source: 'telefoongids',
        telefoonnummer: phoneMatch ? phoneMatch[0] : null,
        adres: stad,
        telefoongids_url: searchUrl,
      });
    }
    
    // Fallback: Google search for telefoongids results
    if (leads.length === 0) {
      const googleResults = await googleSearch(`site:detelefoongids.nl ${branche} ${stad}`, 8);
      for (const url of googleResults) {
        leads.push({
          naam: `Telefoongids - ${branche}`,
          source: 'telefoongids',
          telefoongids_url: url,
          adres: stad,
        });
      }
    }
  } catch (e) {
    console.error('Telefoongids scrape error:', e);
  }
  return leads;
}

// Source 7: Gouden Gids
async function scrapeGoudenGids(branche, stad) {
  const leads = [];
  try {
    const searchUrl = `https://www.goudengids.nl/nl/zoeken/${encodeURIComponent(branche)}/${encodeURIComponent(stad)}/`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    const html = await res.text();
    
    // Extract business info
    const businessRegex = /<span[^>]*class="[^"]*company-name[^"]*"[^>]*>([^<]+)<\/span>/gi;
    let match;
    while ((match = businessRegex.exec(html)) !== null) {
      leads.push({
        naam: match[1].trim(),
        source: 'goudengids',
        adres: stad,
        goudengids_url: searchUrl,
      });
    }
    
    // Fallback: Google search
    if (leads.length === 0) {
      const googleResults = await googleSearch(`site:goudengids.nl ${branche} ${stad}`, 8);
      for (const url of googleResults) {
        leads.push({
          naam: `Gouden Gids - ${branche}`,
          source: 'goudengids',
          goudengids_url: url,
          adres: stad,
        });
      }
    }
  } catch (e) {
    console.error('Gouden Gids scrape error:', e);
  }
  return leads;
}

// Source 8: Yelp Nederland
async function scrapeYelp(branche, stad) {
  const leads = [];
  try {
    const searchUrl = `https://www.yelp.nl/search?find_desc=${encodeURIComponent(branche)}&find_loc=${encodeURIComponent(stad)}`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    const html = await res.text();
    
    // Extract business names
    const businessRegex = /<a[^>]*class="[^"]*business-name[^"]*"[^>]*>([^<]+)<\/a>/gi;
    let match;
    while ((match = businessRegex.exec(html)) !== null) {
      leads.push({
        naam: match[1].trim(),
        source: 'yelp',
        adres: stad,
        yelp_url: searchUrl,
      });
    }
    
    // Fallback
    if (leads.length === 0) {
      const googleResults = await googleSearch(`site:yelp.nl ${branche} ${stad}`, 5);
      for (const url of googleResults) {
        leads.push({
          naam: `Yelp - ${branche}`,
          source: 'yelp',
          yelp_url: url,
          adres: stad,
        });
      }
    }
  } catch (e) {
    console.error('Yelp scrape error:', e);
  }
  return leads;
}

// Main handler - Scrape all sources
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
    branche = '', 
    stad, 
    radius = 25,
    sources = ['all'] // 'all' or specific: ['kvk', 'instagram', 'facebook', 'linkedin', 'marktplaats', 'telefoongids', 'goudengids', 'yelp']
  } = req.body || {};
  
  if (!stad) {
    return res.status(400).json({ error: 'Stad is verplicht' });
  }

  const allLeads = [];
  const scrapedSources = [];
  const searchTerm = branche || 'zzp freelancer diensten';
  
  const shouldScrape = (source) => sources.includes('all') || sources.includes(source);

  try {
    // Scrape all selected sources in parallel
    const scrapePromises = [];
    
    if (shouldScrape('kvk')) {
      scrapePromises.push(
        scrapeKVK(searchTerm, stad, radius).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('KVK');
        })
      );
    }
    
    if (shouldScrape('instagram')) {
      scrapePromises.push(
        scrapeInstagram(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Instagram');
        })
      );
    }
    
    if (shouldScrape('facebook')) {
      scrapePromises.push(
        scrapeFacebook(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Facebook');
        })
      );
    }
    
    if (shouldScrape('linkedin')) {
      scrapePromises.push(
        scrapeLinkedIn(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('LinkedIn');
        })
      );
    }
    
    if (shouldScrape('marktplaats')) {
      scrapePromises.push(
        scrapeMarktplaats(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Marktplaats');
        })
      );
    }
    
    if (shouldScrape('telefoongids')) {
      scrapePromises.push(
        scrapeTelefoongids(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Telefoongids');
        })
      );
    }
    
    if (shouldScrape('goudengids')) {
      scrapePromises.push(
        scrapeGoudenGids(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Gouden Gids');
        })
      );
    }
    
    if (shouldScrape('yelp')) {
      scrapePromises.push(
        scrapeYelp(searchTerm, stad).then(leads => {
          allLeads.push(...leads);
          if (leads.length > 0) scrapedSources.push('Yelp');
        })
      );
    }
    
    // Wait for all scrapes to complete (with timeout)
    await Promise.race([
      Promise.all(scrapePromises),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 25000))
    ]).catch(e => console.error('Scrape timeout or error:', e));

    // Deduplicate by name
    const seenNames = new Set();
    const uniqueLeads = allLeads.filter(lead => {
      const normalizedName = lead.naam.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenNames.has(normalizedName)) return false;
      seenNames.add(normalizedName);
      return true;
    });

    return res.status(200).json({
      leads: uniqueLeads,
      totaal_gevonden: uniqueLeads.length,
      bronnen_doorzocht: scrapedSources,
      zoekgebied: `${stad} + ${radius}km`,
      zoekterm: searchTerm,
    });
  } catch (error) {
    console.error('Scraper error:', error);
    return res.status(500).json({ error: error.message });
  }
}
