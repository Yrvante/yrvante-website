import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

let tablesInit = false;

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!tablesInit) {
      await initTables();
      tablesInit = true;
    }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const result = await sql`
      SELECT page, visitor_id, timestamp
      FROM page_views
      WHERE timestamp >= ${thirtyDaysAgo}
      ORDER BY timestamp DESC
      LIMIT 1000
    `;

    const dailyViews = {};
    const pageBreakdown = {};

    for (const row of result.rows) {
      const date = new Date(row.timestamp).toISOString().slice(0, 10);
      dailyViews[date] = (dailyViews[date] || 0) + 1;
      pageBreakdown[row.page] = (pageBreakdown[row.page] || 0) + 1;
    }

    return res.status(200).json({
      daily_views: dailyViews,
      page_breakdown: pageBreakdown,
      total: result.rows.length,
    });
  } catch (err) {
    console.error('Pageviews error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
