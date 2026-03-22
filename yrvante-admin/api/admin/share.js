// api/admin/share.js
// POST /api/admin/share — create shareable report token
// GET /api/admin/share?token= — get public share report (no auth)
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';
import { randomBytes } from 'crypto';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  await initTables();

  if (req.method === 'GET') {
    // Public: no auth needed
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Token vereist' });
    const result = await sql`SELECT * FROM admin_share_reports WHERE token = ${token}`;
    if (!result.rows.length) return res.status(404).json({ error: 'Rapport niet gevonden' });
    return res.status(200).json(result.rows[0]);
  }

  if (req.method === 'POST') {
    if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });
    const { titel } = req.body || {};
    const token = randomBytes(6).toString('hex');
    const leads = await sql`SELECT * FROM admin_leads ORDER BY opgeslagen_op DESC`;
    await sql`
      INSERT INTO admin_share_reports (token, titel, leads, totaal)
      VALUES (${token}, ${titel || 'Leadoverzicht'}, ${JSON.stringify(leads.rows)}, ${leads.rows.length})
    `;
    return res.status(201).json({ token, url: `/admin/share/${token}` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
