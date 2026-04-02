import { sql } from '@vercel/postgres';
import { CORS } from '../../../_db.js';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID required' });

  try {
    await sql`UPDATE contact_submissions SET read = true WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact read error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
