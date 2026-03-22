// api/admin/sheets-callback.js
// GET /api/admin/sheets-callback — handle Google OAuth callback, exchange code for token
import { CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { code, state, error } = req.query;

  if (error) {
    return res.redirect(302, `/admin?sheets_error=${encodeURIComponent(error)}`);
  }

  if (!code || !state) {
    return res.redirect(302, '/admin?sheets_error=missing_params');
  }

  try {
    await initTables();

    // Retrieve stored state + code_verifier
    const stateRow = await sql`SELECT value FROM admin_sheets_config WHERE key = 'oauth_state'`;
    const verifierRow = await sql`SELECT value FROM admin_sheets_config WHERE key = 'pkce_code_verifier'`;

    if (!stateRow.rows.length || stateRow.rows[0].value !== state) {
      return res.redirect(302, '/admin?sheets_error=invalid_state');
    }

    const codeVerifier = verifierRow.rows[0]?.value;
    if (!codeVerifier) {
      return res.redirect(302, '/admin?sheets_error=missing_verifier');
    }

    const clientId = process.env.GOOGLE_SHEETS_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SHEETS_CLIENT_SECRET;
    const redirectUri = process.env.SHEETS_REDIRECT_URI;

    // Exchange code for tokens WITH code_verifier (PKCE)
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier,
      }).toString(),
    });

    if (!tokenResp.ok) {
      const err = await tokenResp.text();
      console.error('Token exchange error:', err);
      return res.redirect(302, `/admin?sheets_error=${encodeURIComponent('token_exchange_failed')}`);
    }

    const tokens = await tokenResp.json();

    // Store tokens
    await sql`
      INSERT INTO admin_sheets_config (key, value)
      VALUES ('access_token', ${tokens.access_token})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    if (tokens.refresh_token) {
      await sql`
        INSERT INTO admin_sheets_config (key, value)
        VALUES ('refresh_token', ${tokens.refresh_token})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
    }
    await sql`
      INSERT INTO admin_sheets_config (key, value)
      VALUES ('token_expiry', ${String(Date.now() + (tokens.expires_in || 3600) * 1000)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;

    return res.redirect(302, '/admin?sheets_connected=1');
  } catch (err) {
    console.error('Sheets callback error:', err);
    return res.redirect(302, `/admin?sheets_error=${encodeURIComponent(err.message)}`);
  }
}
