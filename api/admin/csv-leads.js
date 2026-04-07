import { sql } from '@vercel/postgres';
import { initTables, CORS } from '../_db.js';

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    await initTables();

    // GET - Fetch all CSV leads
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM csv_leads ORDER BY created_at DESC`;
      const leads = rows.map(r => ({
        id: r.id,
        naam: r.naam || '',
        categorie: r.categorie || '',
        adres: r.adres || '',
        telefoon: r.telefoon || '',
        website: r.website || '',
        rating: r.rating || '',
        aantalReviews: r.aantalreviews || '',
        status: r.status || 'nieuw',
      }));
      return res.status(200).json(leads);
    }

    // POST - Save new CSV leads (with phone dedup)
    if (req.method === 'POST') {
      const { leads } = req.body;
      if (!leads || !leads.length) return res.status(200).json({ success: true, total: 0 });

      // Get existing phones and IDs
      const { rows: existing } = await sql`SELECT id, telefoon FROM csv_leads`;
      const existingIds = new Set(existing.map(r => r.id));
      const existingPhones = new Set(existing.map(r => r.telefoon?.trim()).filter(Boolean));

      let inserted = 0;
      for (const lead of leads) {
        const phone = (lead.telefoon || '').trim();
        if (existingIds.has(lead.id)) continue;
        if (phone && existingPhones.has(phone)) continue;

        await sql`
          INSERT INTO csv_leads (id, naam, categorie, adres, telefoon, website, rating, aantalreviews, status)
          VALUES (${lead.id}, ${lead.naam || ''}, ${lead.categorie || ''}, ${lead.adres || ''}, 
                  ${lead.telefoon || ''}, ${lead.website || ''}, ${lead.rating || ''}, 
                  ${lead.aantalReviews || ''}, ${lead.status || 'nieuw'})
          ON CONFLICT (id) DO NOTHING
        `;
        if (phone) existingPhones.add(phone);
        inserted++;
      }

      const { rows: countResult } = await sql`SELECT COUNT(*) as total FROM csv_leads`;
      return res.status(200).json({ success: true, total: parseInt(countResult[0].total), inserted });
    }

    // DELETE all leads
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
