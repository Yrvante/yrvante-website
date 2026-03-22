import { sql } from '@vercel/postgres';
import { initTables, CORS } from './_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await initTables();
    
    // Get total leads
    const totalResult = await sql`SELECT COUNT(*) as count FROM leadfinder_leads`;
    
    // Get status distribution
    const statusResult = await sql`SELECT status, COUNT(*) as count FROM leadfinder_leads GROUP BY status`;
    
    // Get recent searches
    const searchResult = await sql`SELECT branche, stad, totaal FROM leadfinder_search_history ORDER BY datum DESC LIMIT 10`;
    
    const statusVerdeling = {};
    statusResult.rows.forEach(r => { 
      statusVerdeling[r.status || 'nieuw'] = parseInt(r.count); 
    });

    return res.status(200).json({
      totaal_leads: parseInt(totalResult.rows[0].count),
      status_verdeling: statusVerdeling,
      recente_zoekopdrachten: searchResult.rows
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: error.message });
  }
}
