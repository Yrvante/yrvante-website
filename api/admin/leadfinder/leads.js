import { sql } from '@vercel/postgres';
import { initTables, CORS } from './_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    await initTables();
    
    if (req.method === 'GET') {
      const result = await sql`SELECT * FROM leadfinder_leads ORDER BY opgeslagen_op DESC`;
      return res.status(200).json({ leads: result.rows });
    }
    
    if (req.method === 'POST') {
      const { naam, adres, telefoonnummer, google_maps_url, place_id, branche, stad } = req.body || {};
      
      if (!naam) {
        return res.status(400).json({ error: 'Naam verplicht' });
      }
      
      // Check if lead already exists
      if (place_id) {
        const existing = await sql`SELECT id FROM leadfinder_leads WHERE place_id = ${place_id}`;
        if (existing.rows.length > 0) {
          return res.status(409).json({ error: 'Lead bestaat al' });
        }
      }
      
      const result = await sql`
        INSERT INTO leadfinder_leads (naam, adres, telefoonnummer, google_maps_url, place_id, branche, stad) 
        VALUES (${naam}, ${adres}, ${telefoonnummer}, ${google_maps_url}, ${place_id}, ${branche}, ${stad}) 
        RETURNING id
      `;
      
      return res.status(201).json({ id: result.rows[0].id });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Leads error:', error);
    return res.status(500).json({ error: error.message });
  }
}
