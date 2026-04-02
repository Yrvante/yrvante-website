import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

let tablesInit = false;

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!tablesInit) {
      await initTables();
      tablesInit = true;
    }

    const { page, visitor_id, referrer } = req.body || {};
    if (!page || !visitor_id) {
      return res.status(400).json({ error: 'page and visitor_id required' });
    }

    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || '';

    await sql`
      INSERT INTO page_views (page, visitor_id, user_agent, ip_address, referrer)
      VALUES (${page}, ${visitor_id}, ${userAgent}, ${ip}, ${referrer || ''})
    `;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Pageview error:', err);
    return res.status(200).json({ success: false });
  }
}
