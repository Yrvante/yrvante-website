import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = process.env.RECIPIENT_EMAIL || 'info@yrvante.com';
const SENDER = process.env.SENDER_EMAIL || 'noreply@yrvante.com';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message, package: selectedPackage } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Naam, email en bericht zijn verplicht.' });
  }

  // Extract first name from full name
  const voornaam = name.split(' ')[0];

  const phoneLine = phone ? `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
        <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefoon</span><br>
        <span style="font-size: 16px; color: #000;">${phone}</span>
      </td>
    </tr>` : '';

  // Internal notification email (to info@yrvante.com)
  const internalHtml = `<!DOCTYPE html>
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
                    ${selectedPackage ? `
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Geselecteerd Pakket</span><br>
                        <span style="font-size:16px;color:#000;font-weight:600;">${selectedPackage}</span>
                      </td>
                    </tr>` : ''}
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

  // Customer confirmation email
  const customerHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color:#000;padding:30px 40px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;">YRVANTE</h1>
            <p style="margin:8px 0 0 0;color:#999;font-size:14px;">Webdesign & Development</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 20px 0;font-size:24px;color:#000;">Bedankt voor je aanvraag, ${voornaam}!</h2>
            <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 20px 0;">
              We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op. Meestal reageren we binnen 24 uur.
            </p>
            
            <div style="background-color:#f9f9f9;border-radius:12px;padding:24px;margin:24px 0;">
              <h3 style="margin:0 0 16px 0;font-size:16px;color:#000;text-transform:uppercase;letter-spacing:1px;">Samenvatting van je aanvraag</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
                    <span style="color:#666;font-size:14px;">Naam:</span>
                    <span style="color:#000;font-size:14px;float:right;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
                    <span style="color:#666;font-size:14px;">Email:</span>
                    <span style="color:#000;font-size:14px;float:right;">${email}</span>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
                    <span style="color:#666;font-size:14px;">Telefoon:</span>
                    <span style="color:#000;font-size:14px;float:right;">${phone}</span>
                  </td>
                </tr>` : ''}
                ${selectedPackage ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
                    <span style="color:#666;font-size:14px;">Pakket:</span>
                    <span style="color:#000;font-size:14px;float:right;">${selectedPackage}</span>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:12px 0 0 0;">
                    <span style="color:#666;font-size:14px;display:block;margin-bottom:8px;">Je bericht:</span>
                    <div style="color:#333;font-size:14px;line-height:1.5;background:#fff;padding:12px;border-radius:8px;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <p style="font-size:16px;line-height:1.6;color:#333;margin:20px 0;">
              Heb je in de tussentijd vragen? Neem gerust contact met ons op via <a href="mailto:info@yrvante.com" style="color:#000;font-weight:600;">info@yrvante.com</a>
            </p>

            <div style="text-align:center;margin-top:32px;">
              <a href="https://yrvante.com" style="display:inline-block;background-color:#000;color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Bezoek onze website</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#000;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 8px 0;color:#fff;font-size:14px;font-weight:600;">YRVANTE</p>
            <p style="margin:0;color:#999;font-size:12px;">
              Professionele websites voor elk budget
            </p>
            <div style="margin-top:16px;">
              <a href="https://yrvante.com" style="color:#999;font-size:12px;text-decoration:none;margin:0 8px;">Website</a>
              <span style="color:#666;">|</span>
              <a href="mailto:info@yrvante.com" style="color:#999;font-size:12px;text-decoration:none;margin:0 8px;">Contact</a>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    // Send internal notification email to info@yrvante.com
    await resend.emails.send({
      from: `Yrvante <${SENDER}>`,
      to: [RECIPIENT],
      subject: `Nieuwe aanvraag van ${name}`,
      html: internalHtml,
      reply_to: email,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: `Yrvante <${SENDER}>`,
      to: [email],
      subject: `Bedankt voor je aanvraag — Yrvante`,
      html: customerHtml,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Verzenden mislukt. Probeer opnieuw.' });
  }
}
