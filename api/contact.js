const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = process.env.RECIPIENT_EMAIL || 'info@yrvante.com';
const SENDER = process.env.SENDER_EMAIL || 'noreply@yrvante.com';

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Naam, email en bericht zijn verplicht.' });
  }

  const phoneLine = phone ? `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
        <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefoon</span><br>
        <span style="font-size: 16px; color: #000;">${phone}</span>
      </td>
    </tr>` : '';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color:#000;padding:30px 40px;">
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">YRVANTE</h1>
            <p style="margin:8px 0 0 0;color:#999;font-size:14px;">Nieuwe Website Aanvraag</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:30px;">
                  <h2 style="margin:0 0 20px 0;font-size:18px;color:#000;border-bottom:2px solid #000;padding-bottom:10px;">Klant Gegevens</h2>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Naam</span><br>
                        <span style="font-size:16px;color:#000;font-weight:600;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                        <a href="mailto:${email}" style="font-size:16px;color:#000;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    ${phoneLine}
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <h2 style="margin:0 0 20px 0;font-size:18px;color:#000;border-bottom:2px solid #000;padding-bottom:10px;">Aanvraag Details</h2>
                  <div style="background-color:#f9f9f9;border-radius:12px;padding:20px;font-size:15px;line-height:1.6;color:#333;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
            <p style="margin:0;color:#999;font-size:12px;text-align:center;">
              Dit bericht werd verzonden via het contactformulier op yrvante.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: `Yrvante <${SENDER}>`,
      to: [RECIPIENT],
      subject: `Nieuwe aanvraag van ${name}`,
      html,
      reply_to: email,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Verzenden mislukt. Probeer opnieuw.' });
  }
};
