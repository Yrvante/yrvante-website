import { sql } from '@vercel/postgres';
import { initTables } from '../../_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).json({});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing lead ID' });

  try {
    await initTables();

    // PUT - Update status
    if (req.method === 'PUT') {
      const { status } = req.body;
      const result = await sql`UPDATE csv_leads SET status = ${status || 'nieuw'} WHERE id = ${id}`;
      if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found' });
      return res.status(200).json({ success: true });
    }

    // DELETE - Remove lead
    if (req.method === 'DELETE') {
      const result = await sql`DELETE FROM csv_leads WHERE id = ${id}`;
      if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found' });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('CSV lead error:', error);
    return res.status(500).json({ error: error.message });
  }
}
