import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID verplicht' });
  }

  try {
    await initTables();
    
    if (req.method === 'PUT') {
      const { status, notitie } = req.body || {};
      
      if (status !== undefined) {
        await sql`UPDATE leadfinder_leads SET status = ${status} WHERE id = ${id}`;
      }
      if (notitie !== undefined) {
        await sql`UPDATE leadfinder_leads SET notitie = ${notitie} WHERE id = ${id}`;
      }
      
      return res.status(200).json({ success: true });
    }
    
    if (req.method === 'DELETE') {
      await sql`DELETE FROM leadfinder_leads WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Lead update error:', error);
    return res.status(500).json({ error: error.message });
  }
}
