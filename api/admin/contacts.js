import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

let tablesInit = false;

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (!tablesInit) {
      await initTables();
      tablesInit = true;
    }

    if (req.method === 'GET') {
      const result = await sql`
        SELECT id, name, email, phone, message, package, email_sent, read, timestamp
        FROM contact_submissions
        ORDER BY timestamp DESC
        LIMIT 1000
      `;
      return res.status(200).json(result.rows);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Contacts error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
