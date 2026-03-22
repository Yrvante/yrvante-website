// api/admin/lead.js
// PUT /api/admin/lead?id= — update status/notitie
// DELETE /api/admin/lead?id= — delete lead
import { checkAuth, CORS, initTables } from './_db.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!checkAuth(req, res)) return res.status(401).json({ error: 'Niet geautoriseerd' });

  await initTables();
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID vereist' });

  if (req.method === 'PUT') {
    const { status, notitie } = req.body || {};
    const updates = [];
    const values = [];
    if (status !== undefined) { updates.push(`status = $${updates.length + 1}`); values.push(status); }
    if (notitie !== undefined) { updates.push(`notitie = $${updates.length + 1}`); values.push(notitie); }
    if (!updates.length) return res.status(422).json({ error: 'Niets te updaten' });

    values.push(id);
    const query = `UPDATE admin_leads SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;
    const result = await sql.query(query, values);
    if (!result.rows.length) return res.status(404).json({ error: 'Lead niet gevonden' });
    return res.status(200).json(result.rows[0]);
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM admin_leads WHERE id = ${id}`;
    return res.status(200).json({ message: 'Verwijderd' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
