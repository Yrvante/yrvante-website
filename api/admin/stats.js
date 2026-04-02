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

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [totalPV, uniqueV, totalC, unreadC, pvToday, pvWeek, cToday, cWeek] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM page_views`,
      sql`SELECT COUNT(DISTINCT visitor_id) as count FROM page_views`,
      sql`SELECT COUNT(*) as count FROM contact_submissions`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE read = false`,
      sql`SELECT COUNT(*) as count FROM page_views WHERE timestamp >= ${todayStart}`,
      sql`SELECT COUNT(*) as count FROM page_views WHERE timestamp >= ${weekStart}`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE timestamp >= ${todayStart}`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE timestamp >= ${weekStart}`,
    ]);

    return res.status(200).json({
      total_page_views: parseInt(totalPV.rows[0].count),
      unique_visitors: parseInt(uniqueV.rows[0].count),
      total_contacts: parseInt(totalC.rows[0].count),
      unread_contacts: parseInt(unreadC.rows[0].count),
      page_views_today: parseInt(pvToday.rows[0].count),
      page_views_week: parseInt(pvWeek.rows[0].count),
      contacts_today: parseInt(cToday.rows[0].count),
      contacts_week: parseInt(cWeek.rows[0].count),
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
