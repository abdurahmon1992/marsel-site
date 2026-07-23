// GET /api/assistant/set-webhook?secret=SETUP_SECRET
// AI assistant botining webhook'ini joriy deployment manziliga ro'yxatdan
// o'tkazadi. Bir marta (yoki domen o'zgarganda) chaqiriladi.
export default async function handler(req, res) {
  if (!process.env.SETUP_SECRET || req.query.secret !== process.env.SETUP_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const token = process.env.ASSISTANT_BOT_TOKEN;
  if (!token) return res.status(500).json({ error: 'ASSISTANT_BOT_TOKEN yo‘q' });

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const webhookUrl = `https://${host}/api/assistant/webhook`;

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: process.env.ASSISTANT_WEBHOOK_SECRET,
        allowed_updates: ['message'],
      }),
    });
    const data = await r.json();
    return res.status(200).json({ webhookUrl, telegram: data });
  } catch (e) {
    console.error('assistant/set-webhook error:', e);
    return res.status(500).json({ error: 'Telegram bilan bog‘lanishda xato' });
  }
}
