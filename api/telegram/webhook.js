import { sql, ensureSchema } from '../../lib/db.js';

// Faqat shu Telegram ID saytga kira oladi. Env orqali o'zgartirsa bo'ladi.
const ALLOWED = String(process.env.ALLOWED_TELEGRAM_ID || '5946966965');

async function reply(chatId, text) {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error('sendMessage error:', e);
  }
}

// POST /api/telegram/webhook — Telegram yangilanishlarini qabul qiladi.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Webhook maxfiy header tekshiruvi (Telegram setWebhook secret_token).
  const secret = req.headers['x-telegram-bot-api-secret-token'];
  if (process.env.TELEGRAM_WEBHOOK_SECRET && secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return res.status(401).end();
  }

  try {
    const update = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const msg = update.message || update.edited_message;
    if (!msg || !msg.text) return res.status(200).json({ ok: true });

    const text = String(msg.text).trim();
    const from = msg.from || {};
    const chatId = msg.chat && msg.chat.id;

    const m = text.match(/^\/start\s+(\S+)/);
    if (!m) {
      await reply(chatId, 'Saytga kirish uchun avval saytdagi «Telegram orqali kirish» tugmasini bosing.');
      return res.status(200).json({ ok: true });
    }

    const token = m[1];
    await ensureSchema();

    if (String(from.id) === ALLOWED) {
      const upd = await sql`
        UPDATE login_tokens
        SET status = 'confirmed',
            tg_id = ${from.id},
            tg_username = ${from.username || null},
            tg_first_name = ${from.first_name || null},
            confirmed_at = now()
        WHERE token = ${token}
          AND status = 'pending'
          AND created_at > now() - interval '10 minutes'
        RETURNING token
      `;
      if (upd.length) {
        await reply(chatId, '✅ Kirish tasdiqlandi. Saytga qayting — u avtomatik ochiladi.');
      } else {
        await reply(chatId, '⚠️ Havola eskirgan yoki yaroqsiz. Saytda qaytadan urinib ko‘ring.');
      }
    } else {
      await sql`
        UPDATE login_tokens SET status = 'rejected'
        WHERE token = ${token} AND status = 'pending'
      `;
      await reply(chatId, '⛔ Kechirasiz, sizda bu saytga kirish huquqi yo‘q.');
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('telegram/webhook error:', e);
    // Telegram qayta urinmasligi uchun baribir 200 qaytaramiz.
    return res.status(200).json({ ok: true });
  }
}
