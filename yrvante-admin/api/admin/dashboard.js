// api/admin/dashboard.js
// GET /api/admin/dashboard — lead stats
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  await initTables();

  const [totaalRes, statusRes, historyRes, branchenRes] = await Promise.all([
    sql`SELECT COUNT(*) as totaal FROM admin_leads`,
    sql`SELECT status, COUNT(*) as aantal FROM admin_leads GROUP BY status`,
    sql`SELECT branche, stad, totaal, datum FROM admin_search_history ORDER BY datum DESC LIMIT 5`,
    sql`SELECT branche, COUNT(*) as aantal FROM admin_leads GROUP BY branche ORDER BY aantal DESC LIMIT 5`,
  ]);

  const statusVerdeling = { 'Nieuw': 0, 'Gebeld': 0, 'Offerte gestuurd': 0, 'Klant geworden': 0 };
  statusRes.rows.forEach(r => { statusVerdeling[r.status] = parseInt(r.aantal); });

  return res.status(200).json({
    totaal_opgeslagen: parseInt(totaalRes.rows[0].totaal),
    status_verdeling: statusVerdeling,
    recente_zoekopdrachten: historyRes.rows.map(r => ({
      branche: r.branche, stad: r.stad, totaal: r.totaal, datum: r.datum
    })),
    top_branchen: branchenRes.rows.map(r => ({ branche: r.branche, aantal: parseInt(r.aantal) })),
  });
}
