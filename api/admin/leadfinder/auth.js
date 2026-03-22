import { CORS } from './_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD niet ingesteld' });
  }
  
  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  }
  
  return res.status(401).json({ success: false, error: 'Ongeldig wachtwoord' });
}
