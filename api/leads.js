import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { id } = req.query;

    // PATCH — update single lead (status, notitie)
    if (req.method === 'PATCH') {
      if (!id) return res.status(400).json({ error: 'id query parameter required' });
      const { status, notitie } = req.body;
      const data = {};
      if (status !== undefined) data.status = status;
      if (notitie !== undefined) data.notitie = notitie;
      const lead = await prisma.csvLead.update({ where: { id }, data });
      return res.status(200).json({ success: true, lead });
    }

    // GET — alle leads ophalen
    if (req.method === 'GET') {
      const leads = await prisma.csvLead.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(leads);
    }

    // POST — bulk leads opslaan vanuit CSV
    if (req.method === 'POST') {
      const { leads } = req.body;
      if (!leads || !leads.length) return res.status(200).json({ success: true, total: 0, inserted: 0 });

      // Bestaande telefoons ophalen voor deduplicatie
      const existing = await prisma.csvLead.findMany({ select: { telefoon: true } });
      const existingPhones = new Set(existing.map(r => r.telefoon?.trim()).filter(Boolean));

      let inserted = 0;
      for (const lead of leads) {
        const phone = (lead.telefoon || '').trim();
        if (phone && existingPhones.has(phone)) continue;
        await prisma.csvLead.create({
          data: {
            naam: lead.naam || '',
            categorie: lead.categorie || null,
            plaats: lead.plaats || null,
            telefoon: lead.telefoon || null,
            website: lead.website || null,
            rating: lead.rating || null,
            reviews: lead.reviews || null,
            status: lead.status || 'nieuw',
            notitie: lead.notitie || null,
          }
        });
        if (phone) existingPhones.add(phone);
        inserted++;
      }
      const total = await prisma.csvLead.count();
      return res.status(200).json({ success: true, total, inserted });
    }

    // DELETE — alle leads wissen
    if (req.method === 'DELETE') {
      if (id) {
        await prisma.csvLead.delete({ where: { id } });
      } else {
        await prisma.csvLead.deleteMany();
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Leads API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
