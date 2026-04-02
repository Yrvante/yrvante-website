import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

let tablesInit = false;

async function ensureTables() {
  if (!tablesInit) {
    await initTables();
    tablesInit = true;
  }
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();

    const { id, action } = req.query;

    // GET /api/admin/contacts - List all contacts
    if (req.method === 'GET' && !id) {
      const result = await sql`
        SELECT id, name, email, phone, message, package, email_sent, read, timestamp
        FROM contact_submissions
        ORDER BY timestamp DESC
        LIMIT 1000
      `;
      return res.status(200).json(result.rows);
    }

    // PUT /api/admin/contacts?id=xxx&action=read - Mark as read
    if (req.method === 'PUT' && id && action === 'read') {
      await sql`UPDATE contact_submissions SET read = true WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    // DELETE /api/admin/contacts?id=xxx - Delete contact
    if (req.method === 'DELETE' && id) {
      await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Contacts error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
