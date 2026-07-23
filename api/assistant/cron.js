import { sql, ensureAssistantSchema } from '../../lib/db.js';
import { formatLocal } from '../../lib/tasks.js';

// Muddati kelgan eslatmalarni topib, foydalanuvchilarga yuboradi.
// Vercel Cron (vercel.json) yoki tashqi cron xizmati chaqiradi.
//
// Ruxsat:
//   - Vercel Cron:  Authorization: Bearer <CRON_SECRET>
//   - Tashqi cron:  /api/assistant/cron?secret=<SETUP_SECRET>

function authorized(req) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization === `Bearer ${cronSecret}`) return true;
  if (process.env.SETUP_SECRET && req.query.secret === process.env.SETUP_SECRET) return true;
  // Ikkala maxfiy kalit ham sozlanmagan bo'lsa — himoyasiz, rad etamiz.
  return false;
}

async function send(chatId, text) {
  const t = process.env.ASSISTANT_BOT_TOKEN;
  if (!t) return;
  await fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export default async function handler(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: 'unauthorized' });

  try {
    await ensureAssistantSchema();

    // Muddati kelgan, hali yuborilmagan va bajarilmagan eslatmalar.
    const due = await sql`
      SELECT id, chat_id, text, due_at FROM assistant_tasks
      WHERE done = false AND notified = false
        AND due_at IS NOT NULL AND due_at <= now()
      ORDER BY due_at ASC
      LIMIT 50
    `;

    let sent = 0;
    for (const t of due) {
      try {
        await send(t.chat_id, `⏰ Eslatma: ${t.text}\n(${formatLocal(t.due_at)})`);
        await sql`UPDATE assistant_tasks SET notified = true WHERE id = ${t.id}`;
        sent++;
      } catch (e) {
        console.error('reminder send error:', e);
        // notified'ni yangilamaymiz — keyingi ishga tushishda qayta uriniladi.
      }
    }

    return res.status(200).json({ ok: true, sent, checked: due.length });
  } catch (e) {
    console.error('assistant/cron error:', e);
    return res.status(500).json({ error: 'Server xatosi' });
  }
}
