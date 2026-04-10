import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER = 'info@yrvante.com';

function getEmailHtml(lead) {
  const hasWebsite = lead.website && lead.website.trim() !== '';
  const naam = lead.naam || 'daar';

  if (hasWebsite) {
    return {
      subject: `${naam} — uw website kan beter`,
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
        <img src="https://yrvante.com/logo-nav.png" alt="Yrvante" style="height:28px;margin-bottom:24px" />
        <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Hallo ${naam},</p>
        <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Ik ben Yvar van Yrvante.</p>
        <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Ik kwam uw website tegen en zag dat die wel een opfrisbeurt kan gebruiken. Een moderne website maakt echt het verschil — meer vertrouwen, meer klanten.</p>
        <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Ik help kleine bedrijven in Overijssel met een professionele online aanwezigheid, voor een vaste prijs van <strong>€249</strong> — snel en persoonlijk.</p>
        <a href="https://yrvante.com" style="display:inline-block;background:#000;color:#fff;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px;margin:16px 0">BEKIJK YRVANTE.COM</a>
        <p style="font-size:16px;line-height:1.7;margin:16px 0 0">App of mail mij gerust terug!</p>
        <p style="font-size:14px;color:#666;margin-top:32px;border-top:1px solid #eee;padding-top:16px">Yvar — Yrvante<br>Smart Web & Software<br>085-5055314</p>
      </div>`
    };
  }

  return {
    subject: `${naam} — online zichtbaar worden?`,
    html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
      <img src="https://yrvante.com/logo-nav.png" alt="Yrvante" style="height:28px;margin-bottom:24px" />
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Hoi ${naam}!</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Ik ben Yvar. Ik bouw websites voor kleine bedrijven in Nederland.</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Ik zag dat ${naam} nog geen website heeft. Jullie bedrijf ziet er geweldig uit — het zou zonde zijn om onzichtbaar te blijven.</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Elke dag dat jullie geen website hebben loopt er een klant naar de concurrent — niet omdat jullie minder goed zijn, maar omdat die wél online staat.</p>
      <table style="margin:20px 0;font-size:15px;line-height:2">
        <tr><td>🌐</td><td style="padding-left:8px">Professionele website vanaf <strong>€399</strong></td></tr>
        <tr><td>⚡</td><td style="padding-left:8px">Binnen 2 weken live</td></tr>
        <tr><td>🤝</td><td style="padding-left:8px">Eerst 40% — de rest pas als je blij bent</td></tr>
        <tr><td>💯</td><td style="padding-left:8px">Niet tevreden? Ik ga door tot je dat wél bent</td></tr>
      </table>
      <a href="https://yrvante.com" style="display:inline-block;background:#000;color:#fff;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px;margin:16px 0">BEKIJK YRVANTE.COM</a>
      <p style="font-size:16px;line-height:1.7;margin:16px 0 0">Mail of app mij gerust terug!</p>
      <p style="font-size:14px;color:#666;margin-top:32px;border-top:1px solid #eee;padding-top:16px">Yvar — Yrvante<br>Smart Web & Software<br>085-5055314</p>
    </div>`
  };
}

async function getDailyCount() {
  const today = new Date().toISOString().split('T')[0];
  let log = await prisma.emailDailyLog.findUnique({ where: { date: today } });
  if (!log) {
    log = await prisma.emailDailyLog.create({ data: { date: today, count: 0, dailyLimit: 30 } });
  }
  return log;
}

async function getWhatsAppDailyCount() {
  const today = new Date().toISOString().split('T')[0];
  let log = await prisma.whatsAppDailyLog.findUnique({ where: { date: today } });
  if (!log) {
    log = await prisma.whatsAppDailyLog.create({ data: { date: today, count: 0, dailyLimit: 30 } });
  }
  return log;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { id, action } = req.query;

    // ===== WHATSAPP ACTIONS =====
    if (action === 'whatsapp-stats') {
      const daily = await getWhatsAppDailyCount();
      return res.status(200).json({
        vandaag: daily.count,
        limiet: daily.dailyLimit,
        resterend: Math.max(0, daily.dailyLimit - daily.count),
      });
    }

    if (action === 'whatsapp-limit' && req.method === 'POST') {
      const { limit } = req.body;
      const today = new Date().toISOString().split('T')[0];
      await prisma.whatsAppDailyLog.upsert({
        where: { date: today },
        update: { dailyLimit: limit },
        create: { date: today, count: 0, dailyLimit: limit }
      });
      return res.status(200).json({ success: true });
    }

    if (action === 'whatsapp-click' && req.method === 'POST') {
      const daily = await getWhatsAppDailyCount();
      if (daily.count >= daily.dailyLimit) {
        return res.status(429).json({ success: false, error: 'Dagelijkse limiet bereikt', vandaag: daily.count, limiet: daily.dailyLimit, resterend: 0 });
      }
      await prisma.whatsAppDailyLog.update({
        where: { date: daily.date },
        data: { count: daily.count + 1 }
      });
      return res.status(200).json({ success: true, vandaag: daily.count + 1, limiet: daily.dailyLimit, resterend: Math.max(0, daily.dailyLimit - daily.count - 1) });
    }

    // ===== EMAIL ACTIONS =====
    if (action === 'email-stats') {
      const daily = await getDailyCount();
      const totalSent = await prisma.csvLead.count({ where: { emailStatus: 'verstuurd' } });
      const totalResponded = await prisma.csvLead.count({ where: { emailStatus: 'gereageerd' } });
      const emailableLeads = await prisma.csvLead.count({ where: { email: { not: null }, emailStatus: 'niet_verstuurd' } });
      return res.status(200).json({
        vandaag: daily.count,
        limiet: daily.dailyLimit,
        resterend: Math.max(0, daily.dailyLimit - daily.count),
        totaalVerstuurd: totalSent,
        totaalGereageerd: totalResponded,
        emailableLeads
      });
    }

    if (action === 'update-limit' && req.method === 'POST') {
      const { limit } = req.body;
      const today = new Date().toISOString().split('T')[0];
      await prisma.emailDailyLog.upsert({
        where: { date: today },
        update: { dailyLimit: limit },
        create: { date: today, count: 0, dailyLimit: limit }
      });
      return res.status(200).json({ success: true });
    }

    if (action === 'send-email' && req.method === 'POST') {
      const { leadId } = req.body;
      if (!leadId) return res.status(400).json({ error: 'leadId required' });

      const daily = await getDailyCount();
      if (daily.count >= daily.dailyLimit) {
        return res.status(429).json({ error: 'Dagelijkse limiet bereikt', vandaag: daily.count, limiet: daily.dailyLimit });
      }

      const lead = await prisma.csvLead.findUnique({ where: { id: leadId } });
      if (!lead) return res.status(404).json({ error: 'Lead niet gevonden' });
      if (!lead.email) return res.status(400).json({ error: 'Lead heeft geen email adres' });

      const { subject, html } = getEmailHtml(lead);
      await resend.emails.send({ from: SENDER, to: lead.email, subject, html });

      await prisma.csvLead.update({
        where: { id: leadId },
        data: { emailStatus: 'verstuurd', emailSentAt: new Date() }
      });
      await prisma.emailDailyLog.update({
        where: { date: daily.date },
        data: { count: daily.count + 1 }
      });

      return res.status(200).json({ success: true, remaining: daily.dailyLimit - daily.count - 1 });
    }

    if (action === 'send-batch' && req.method === 'POST') {
      const daily = await getDailyCount();
      const remaining = daily.dailyLimit - daily.count;
      if (remaining <= 0) {
        return res.status(429).json({ error: 'Dagelijkse limiet bereikt', vandaag: daily.count, limiet: daily.dailyLimit });
      }

      const leads = await prisma.csvLead.findMany({
        where: { email: { not: null }, emailStatus: 'niet_verstuurd' },
        take: remaining,
        orderBy: { createdAt: 'asc' }
      });

      let sent = 0;
      for (const lead of leads) {
        if (!lead.email) continue;
        try {
          const { subject, html } = getEmailHtml(lead);
          await resend.emails.send({ from: SENDER, to: lead.email, subject, html });
          await prisma.csvLead.update({
            where: { id: lead.id },
            data: { emailStatus: 'verstuurd', emailSentAt: new Date() }
          });
          sent++;
        } catch (e) {
          console.error(`Email failed for ${lead.naam}:`, e.message);
        }
      }

      await prisma.emailDailyLog.update({
        where: { date: daily.date },
        data: { count: daily.count + sent }
      });

      return res.status(200).json({ success: true, sent, remaining: remaining - sent });
    }

    // ===== EXISTING CRUD =====
    if (req.method === 'PATCH') {
      if (!id) return res.status(400).json({ error: 'id query parameter required' });
      const { status, notitie, emailStatus } = req.body;
      const data = {};
      if (status !== undefined) data.status = status;
      if (notitie !== undefined) data.notitie = notitie;
      if (emailStatus !== undefined) data.emailStatus = emailStatus;
      const lead = await prisma.csvLead.update({ where: { id }, data });
      return res.status(200).json({ success: true, lead });
    }

    if (req.method === 'GET') {
      const leads = await prisma.csvLead.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(leads);
    }

    if (req.method === 'POST') {
      const { leads } = req.body;
      if (!leads || !leads.length) return res.status(200).json({ success: true, total: 0, inserted: 0 });

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
            email: lead.email || null,
            rating: lead.rating || null,
            reviews: lead.reviews || null,
            status: lead.status || 'nieuw',
            notitie: lead.notitie || null,
            emailStatus: lead.emailStatus || 'niet_verstuurd',
            whatsappBeschikbaar: lead.whatsappBeschikbaar || 'onbekend',
          }
        });
        if (phone) existingPhones.add(phone);
        inserted++;
      }
      const total = await prisma.csvLead.count();
      return res.status(200).json({ success: true, total, inserted });
    }

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
