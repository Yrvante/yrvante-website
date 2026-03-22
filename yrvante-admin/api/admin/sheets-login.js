// api/admin/sheets-login.js
// GET /api/admin/sheets-login — start Google OAuth with PKCE (fixes invalid_grant Missing code verifier)
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';
import { randomBytes, createHash } from 'crypto';

const SCOPES = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/spreadsheets',
].join(' ');

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });

  const clientId = process.env.GOOGLE_SHEETS_CLIENT_ID;
  const redirectUri = process.env.SHEETS_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(400).json({ error: 'Google Sheets niet geconfigureerd (CLIENT_ID of REDIRECT_URI ontbreekt)' });
  }

  await initTables();

  // PKCE: generate code_verifier and code_challenge
  const codeVerifier = randomBytes(48).toString('base64url');
  const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');

  // State for CSRF protection
  const state = randomBytes(16).toString('hex');

  // Store verifier + state in DB
  await sql`
    INSERT INTO admin_sheets_config (key, value)
    VALUES ('pkce_code_verifier', ${codeVerifier})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
  await sql`
    INSERT INTO admin_sheets_config (key, value)
    VALUES ('oauth_state', ${state})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return res.status(200).json({ auth_url: authUrl });
}
