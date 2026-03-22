// api/admin/auth.js
// POST /api/admin/auth — verify admin password, return base64 token
import { createHash } from 'crypto';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  const adminPw = process.env.ADMIN_PASSWORD;

  if (!adminPw) return res.status(500).json({ error: 'Server misconfigured' });
  if (!password || password !== adminPw) {
    return res.status(401).json({ error: 'Ongeldig wachtwoord' });
  }

  // Simple token: base64 of password (sufficient for internal tool)
  const token = Buffer.from(password).toString('base64');
  return res.status(200).json({ token });
}
