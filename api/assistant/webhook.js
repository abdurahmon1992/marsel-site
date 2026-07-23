import { sql, ensureAssistantSchema } from '../../lib/db.js';
import { generate, buildKnowledgeBlock } from '../../lib/llm.js';

// AI assistant boti — alohida Telegram bot (login botidan mustaqil).
// Har qanday foydalanuvchi yozishi mumkin; bot bilim bazasi + system prompt
// asosida javob beradi.
//
// Env: ASSISTANT_BOT_TOKEN, ASSISTANT_WEBHOOK_SECRET, GEMINI_API_KEY

const HISTORY_LIMIT = 10; // suhbat kontekstiga kiritiladigan oxirgi xabarlar
const MAX_INPUT = 4000;   // foydalanuvchi xabari uzunligi chegarasi

async function tg(method, payload) {
  const t = process.env.ASSISTANT_BOT_TOKEN;
  if (!t) return;
  try {
    await fetch(`https://api.telegram.org/bot${t}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error(`telegram ${method} error:`, e);
  }
}

const reply = (chatId, text) => tg('sendMessage', { chat_id: chatId, text });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = req.headers['x-telegram-bot-api-secret-token'];
  if (process.env.ASSISTANT_WEBHOOK_SECRET && secret !== process.env.ASSISTANT_WEBHOOK_SECRET) {
    return res.status(401).end();
  }

  try {
    const update = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const msg = update.message || update.edited_message;
    const chatId = msg && msg.chat && msg.chat.id;
    const text = msg && msg.text ? String(msg.text).trim() : '';

    if (!chatId || !text) return res.status(200).json({ ok: true });

    // /start yoki /help — qisqa tanishtiruv.
    if (/^\/(start|help)\b/.test(text)) {
      await reply(chatId, 'Assalomu alaykum! Men AI assistentman. Savolingizni yozing — bilim bazamiz asosida javob beraman.');
      return res.status(200).json({ ok: true });
    }

    await ensureAssistantSchema();

    // "Yozmoqda..." indikatori (javob biroz vaqt olishi mumkin).
    await tg('sendChatAction', { chat_id: chatId, action: 'typing' });

    const userMessage = text.slice(0, MAX_INPUT);

    // System prompt + bilim bazasi + oxirgi suhbat tarixini yig'amiz.
    const [cfgRows, kbRows, histRows] = await Promise.all([
      sql`SELECT system_prompt FROM bot_config WHERE id = 1`,
      sql`SELECT title, content FROM kb_entries ORDER BY id DESC`,
      sql`
        SELECT role, content FROM assistant_messages
        WHERE chat_id = ${chatId} ORDER BY id DESC LIMIT ${HISTORY_LIMIT}
      `,
    ]);

    const basePrompt = (cfgRows[0] && cfgRows[0].system_prompt) || '';
    const kbBlock = buildKnowledgeBlock(kbRows);
    const systemPrompt = [basePrompt, kbBlock].filter(Boolean).join('\n\n');
    const history = histRows.reverse().map((m) => ({ role: m.role, text: m.content }));

    let answer;
    try {
      answer = await generate({ systemPrompt, history, userMessage });
    } catch (e) {
      console.error('LLM error:', e);
      await reply(chatId, 'Kechirasiz, javob berishda xatolik yuz berdi. Birozdan so‘ng qayta urinib ko‘ring.');
      return res.status(200).json({ ok: true });
    }

    await reply(chatId, answer);

    // Suhbat tarixini saqlaymiz (kelgusi kontekst uchun).
    await sql`
      INSERT INTO assistant_messages (chat_id, role, content)
      VALUES (${chatId}, 'user', ${userMessage}), (${chatId}, 'model', ${answer})
    `;

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('assistant/webhook error:', e);
    // Telegram qayta urinmasligi uchun baribir 200.
    return res.status(200).json({ ok: true });
  }
}
