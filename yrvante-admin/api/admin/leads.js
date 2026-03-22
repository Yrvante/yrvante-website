// api/admin/leads.js
// GET /api/admin/leads — get all saved leads (optional ?status=)
// POST /api/admin/leads — save a new lead
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });

  await initTables();

  if (req.method === 'GET') {
    const { status } = req.query;
    const result = status && status !== 'Alle'
      ? await sql`SELECT * FROM admin_leads WHERE status = ${status} ORDER BY opgeslagen_op DESC`
      : await sql`SELECT * FROM admin_leads ORDER BY opgeslagen_op DESC`;
    return res.status(200).json(result.rows);
  }

  if (req.method === 'POST') {
    const { naam, adres, telefoonnummer, google_maps_url, place_id, branche, stad } = req.body || {};
    if (!naam) return res.status(422).json({ error: 'Naam is verplicht.' });

    // Check if already saved
    const existing = await sql`SELECT * FROM admin_leads WHERE place_id = ${place_id}`;
    if (existing.rows.length > 0) return res.status(200).json(existing.rows[0]);

    const result = await sql`
      INSERT INTO admin_leads (naam, adres, telefoonnummer, google_maps_url, place_id, branche, stad)
      VALUES (${naam}, ${adres}, ${telefoonnummer || null}, ${google_maps_url}, ${place_id}, ${branche || ''}, ${stad || ''})
      ON CONFLICT (place_id) DO NOTHING
      RETURNING *
    `;
    if (result.rows.length === 0) {
      const found = await sql`SELECT * FROM admin_leads WHERE place_id = ${place_id}`;
      return res.status(200).json(found.rows[0]);
    }
    return res.status(201).json(result.rows[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
