// api/admin/sheets-append.js
// POST /api/admin/sheets-append — append lead(s) to Google Sheet
// Body: { lead_id?: string, all?: boolean, spreadsheet_id?: string }
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

async function getAccessToken() {
  const rows = await sql`
    SELECT key, value FROM admin_sheets_config
    WHERE key IN ('access_token', 'refresh_token', 'token_expiry')
  `;
  const cfg = Object.fromEntries(rows.rows.map(r => [r.key, r.value]));

  const expiry = parseInt(cfg.token_expiry || '0');
  const isExpired = Date.now() > expiry - 60000;

  if (isExpired && cfg.refresh_token) {
    // Refresh the token
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        client_secret: process.env.GOOGLE_SHEETS_CLIENT_SECRET,
        refresh_token: cfg.refresh_token,
        grant_type: 'refresh_token',
      }).toString(),
    });
    if (resp.ok) {
      const tokens = await resp.json();
      await sql`UPDATE admin_sheets_config SET value = ${tokens.access_token} WHERE key = 'access_token'`;
      await sql`UPDATE admin_sheets_config SET value = ${String(Date.now() + (tokens.expires_in || 3600) * 1000)} WHERE key = 'token_expiry'`;
      return tokens.access_token;
    }
  }

  return cfg.access_token || null;
}

async function appendRows(spreadsheetId, rows, accessToken) {
  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:H:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: rows }),
    }
  );
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Sheets API error: ${err}`);
  }
  return resp.json();
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  await initTables();

  const { lead_id, all, spreadsheet_id: bodySpreadsheetId } = req.body || {};

  // Get spreadsheet ID
  const sidRow = await sql`SELECT value FROM admin_sheets_config WHERE key = 'spreadsheet_id'`;
  const spreadsheetId = bodySpreadsheetId || sidRow.rows[0]?.value;
  if (!spreadsheetId) return res.status(400).json({ error: 'Geen spreadsheet ID ingesteld. Stel dit in bij de Sheets configuratie.' });

  // Get access token
  const accessToken = await getAccessToken();
  if (!accessToken) return res.status(401).json({ error: 'Niet verbonden met Google Sheets. Klik op "Verbind" om opnieuw in te loggen.' });

  try {
    let leads;
    if (all) {
      const result = await sql`SELECT * FROM admin_leads ORDER BY opgeslagen_op DESC`;
      leads = result.rows;
      // Add header row
      const header = [['Naam', 'Adres', 'Telefoonnummer', 'Branche', 'Stad', 'Google Maps', 'Status', 'Datum']];
      const dataRows = leads.map(l => [
        l.naam || '', l.adres || '', l.telefoonnummer || '',
        l.branche || '', l.stad || '', l.google_maps_url || '',
        l.status || '', l.opgeslagen_op ? new Date(l.opgeslagen_op).toISOString().slice(0, 10) : '',
      ]);
      await appendRows(spreadsheetId, [...header, ...dataRows], accessToken);
      return res.status(200).json({ message: `${leads.length} leads geëxporteerd naar Google Sheets` });
    }

    if (lead_id) {
      const result = await sql`SELECT * FROM admin_leads WHERE id = ${lead_id}`;
      if (!result.rows.length) return res.status(404).json({ error: 'Lead niet gevonden' });
      const l = result.rows[0];
      await appendRows(spreadsheetId, [[
        l.naam || '', l.adres || '', l.telefoonnummer || '',
        l.branche || '', l.stad || '', l.google_maps_url || '',
        l.status || '', l.opgeslagen_op ? new Date(l.opgeslagen_op).toISOString().slice(0, 10) : '',
      ]], accessToken);
      return res.status(200).json({ message: `${l.naam} toegevoegd aan Google Sheets` });
    }

    return res.status(400).json({ error: 'lead_id of all=true vereist' });
  } catch (err) {
    console.error('Sheets append error:', err);
    return res.status(500).json({ error: err.message });
  }
}
