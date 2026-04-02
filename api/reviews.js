const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

let cache = { data: null, fetchedAt: null };
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Return cached data if fresh
  if (cache.data && cache.fetchedAt && (Date.now() - cache.fetchedAt < CACHE_DURATION)) {
    return res.status(200).json(cache.data);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: 'Google Places not configured' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}&language=nl&reviews_sort=newest`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.status !== 'OK') {
      return res.status(502).json({ error: 'Google Places API error' });
    }

    const result = data.result;
    const reviews = (result.reviews || []).map(r => ({
      author_name: r.author_name || '',
      profile_photo_url: r.profile_photo_url || '',
      rating: r.rating || 5,
      text: r.text || '',
      relative_time_description: r.relative_time_description || '',
      time: r.time || 0,
    }));

    const response = {
      name: result.name || 'Yrvante',
      rating: result.rating || 5,
      total_reviews: result.user_ratings_total || 0,
      google_url: result.url || '',
      reviews,
    };

    cache = { data: response, fetchedAt: Date.now() };
    return res.status(200).json(response);
  } catch (err) {
    console.error('Google Places error:', err);
    if (cache.data) return res.status(200).json(cache.data);
    return res.status(502).json({ error: 'Could not fetch reviews' });
  }
}
