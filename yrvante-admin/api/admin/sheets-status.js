// api/admin/sheets-status.js
// GET /api/admin/sheets-status — check Google Sheets connection status
// POST /api/admin/sheets-status — save spreadsheet ID
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });

  await initTables();

  if (req.method === 'GET') {
    const rows = await sql`SELECT key, value FROM admin_sheets_config WHERE key IN ('access_token', 'spreadsheet_id')`;
    const cfg = Object.fromEntries(rows.rows.map(r => [r.key, r.value]));
    return res.status(200).json({
      configured: !!(process.env.GOOGLE_SHEETS_CLIENT_ID && process.env.GOOGLE_SHEETS_CLIENT_SECRET),
      connected: !!cfg.access_token,
      spreadsheet_id: cfg.spreadsheet_id || null,
    });
  }

  if (req.method === 'POST') {
    const { spreadsheet_id } = req.body || {};
    if (!spreadsheet_id) return res.status(422).json({ error: 'Spreadsheet ID vereist' });
    await sql`
      INSERT INTO admin_sheets_config (key, value)
      VALUES ('spreadsheet_id', ${spreadsheet_id})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    return res.status(200).json({ message: 'Spreadsheet ID opgeslagen', spreadsheet_id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
