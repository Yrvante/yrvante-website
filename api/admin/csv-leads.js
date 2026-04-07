import { sql } from '@vercel/postgres';
import { initTables } from '../_db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).json({});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    await initTables();
    const { id } = req.query;

    // Single lead operations (when ?id= is provided)
    if (id) {
      if (req.method === 'PUT') {
        const { status, notitie, benaderdOp } = req.body;
        const updates = [];
        const values = [];
        if (status !== undefined) { updates.push('status'); values.push(status); }
        if (notitie !== undefined) { updates.push('notitie'); values.push(notitie); }
        if (benaderdOp !== undefined) { updates.push('benaderdop'); values.push(benaderdOp); }
        
        if (updates.length === 1) {
          await sql.query(`UPDATE csv_leads SET ${updates[0]} = $1 WHERE id = $2`, [...values, id]);
        } else if (updates.length === 2) {
          await sql.query(`UPDATE csv_leads SET ${updates[0]} = $1, ${updates[1]} = $2 WHERE id = $3`, [...values, id]);
        } else if (updates.length === 3) {
          await sql.query(`UPDATE csv_leads SET ${updates[0]} = $1, ${updates[1]} = $2, ${updates[2]} = $3 WHERE id = $4`, [...values, id]);
        }
        return res.status(200).json({ success: true });
      }
      if (req.method === 'DELETE') {
        await sql`DELETE FROM csv_leads WHERE id = ${id}`;
        return res.status(200).json({ success: true });
      }
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Bulk operations (no id)
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM csv_leads ORDER BY created_at DESC`;
      return res.status(200).json(rows.map(r => ({
        id: r.id, naam: r.naam || '', categorie: r.categorie || '',
        adres: r.adres || '', telefoon: r.telefoon || '', website: r.website || '',
        rating: r.rating || '', aantalReviews: r.aantalreviews || '',
        status: r.status || 'nieuw', notitie: r.notitie || '', benaderdOp: r.benaderdop || '',
      })));
    }

    if (req.method === 'POST') {
      const { leads } = req.body;
      if (!leads || !leads.length) return res.status(200).json({ success: true, total: 0 });
      const { rows: existing } = await sql`SELECT id, telefoon FROM csv_leads`;
      const existingIds = new Set(existing.map(r => r.id));
      const existingPhones = new Set(existing.map(r => r.telefoon?.trim()).filter(Boolean));
      let inserted = 0;
      for (const lead of leads) {
        const phone = (lead.telefoon || '').trim();
        if (existingIds.has(lead.id)) continue;
        if (phone && existingPhones.has(phone)) continue;
        await sql`INSERT INTO csv_leads (id, naam, categorie, adres, telefoon, website, rating, aantalreviews, status, notitie)
          VALUES (${lead.id}, ${lead.naam || ''}, ${lead.categorie || ''}, ${lead.adres || ''},
                  ${lead.telefoon || ''}, ${lead.website || ''}, ${lead.rating || ''},
                  ${lead.aantalReviews || ''}, ${lead.status || 'nieuw'}, ${lead.notitie || ''})
          ON CONFLICT (id) DO NOTHING`;
        if (phone) existingPhones.add(phone);
        inserted++;
      }
      const { rows: c } = await sql`SELECT COUNT(*) as total FROM csv_leads`;
      return res.status(200).json({ success: true, total: parseInt(c[0].total), inserted });
    }

    if (req.method === 'DELETE') {
      await sql`DELETE FROM csv_leads`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('CSV leads error:', error);
    return res.status(500).json({ error: error.message });
  }
}
