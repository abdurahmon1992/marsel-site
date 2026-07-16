import crypto from 'node:crypto';
import { sql, ensureSchema } from '../../lib/db.js';

// POST /api/auth/start
// Vaqtinchalik login tokeni yaratadi va Telegram deep-link'ni qaytaradi.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const botUsername = process.env.TELEGRAM_BOT_USERNAME;
  if (!botUsername) {
    return res.status(500).json({ error: 'Bot sozlanmagan (TELEGRAM_BOT_USERNAME yo‘q)' });
  }
  try {
    await ensureSchema();
    const token = crypto.randomBytes(24).toString('hex');
    await sql`INSERT INTO login_tokens (token) VALUES (${token})`;
    const deepLink = `https://t.me/${botUsername}?start=${token}`;
    return res.status(200).json({ token, deepLink });
  } catch (e) {
    console.error('auth/start error:', e);
    return res.status(500).json({ error: 'Server xatosi' });
  }
}
