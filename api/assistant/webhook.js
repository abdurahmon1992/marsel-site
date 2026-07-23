import { sql, ensureAssistantSchema } from '../../lib/db.js';
import { generate, buildKnowledgeBlock } from '../../lib/llm.js';
import {
  TZ, nowLocal, getOpenTasks, formatTaskList, formatLocal, parseDue,
} from '../../lib/tasks.js';

// Shaxsiy yordamchi bot — har bir foydalanuvchi (chat) o'z vazifalari va
// eslatmalarini yuritadi, bot ular bilan tabiiy tilda suhbatlashadi.
//
// Env: ASSISTANT_BOT_TOKEN, ASSISTANT_WEBHOOK_SECRET, LLM kaliti (llm.js)

const HISTORY_LIMIT = 10;
const MAX_INPUT = 4000;

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

const GREETING =
  'Assalomu alaykum! Men sizning shaxsiy yordamchingizman. 🤖\n\n' +
  'Men bilan tabiiy tilda gaplashing:\n' +
  '• «Ertaga soat 9da shifokorga qo\'ng\'iroq qilishimni eslat» — vazifa qo\'shaman\n' +
  '• «Vazifalarim» — ro\'yxatni ko\'rsataman\n' +
  '• «1-chisini bajardim» — bajarilganini belgilayman\n' +
  '• Yoki shunchaki savol bering — javob beraman.';

// LLM javobidan JSON obyektni ajratib oladi (kod bloklarini tozalaydi).
function extractJson(text) {
  if (!text) return null;
  let s = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const a = s.indexOf('{');
  const b = s.lastIndexOf('}');
  if (a === -1 || b === -1 || b < a) return null;
  try {
    return JSON.parse(s.slice(a, b + 1));
  } catch {
    return null;
  }
}

// Foydalanuvchi niyatini aniqlash uchun boshqaruv ko'rsatmasi.
function plannerPrompt(basePrompt, kbBlock, tasks) {
  return [
    basePrompt,
    kbBlock,
    `Sen foydalanuvchining shaxsiy yordamchisisan. U bilan suhbatlashasan va ` +
    `uning vazifalari/eslatmalarini boshqarasan.\n\n` +
    `Hozirgi vaqt (${TZ}): ${nowLocal()}\n\n` +
    `Foydalanuvchining ochiq vazifalari (tartib raqami bilan):\n` +
    (tasks.length
      ? tasks.map((t, i) => `${i + 1}. ${t.text}${t.due_at ? ` (⏰ ${formatLocal(t.due_at)})` : ''}`).join('\n')
      : '(bo\'sh)') +
    `\n\nHar bir xabarga FAQAT bitta JSON obyekt bilan javob ber, boshqa hech qanday matnsiz:\n` +
    `{\n` +
    `  "action": "add" | "list" | "complete" | "delete" | "chat",\n` +
    `  "text": "vazifa matni (action=add uchun)",\n` +
    `  "due_at": "ISO 8601 sana-vaqt +05:00 offset bilan, agar aniq vaqt aytilgan bo'lsa; aks holda null",\n` +
    `  "task_number": <butun son> (complete/delete uchun, yuqoridagi ro'yxat raqami),\n` +
    `  "reply": "foydalanuvchiga ko'rsatiladigan qisqa javob"\n` +
    `}\n\n` +
    `Qoidalar:\n` +
    `- Foydalanuvchi biror ishni eslatishni so'rasa yoki vazifa qo'shsa: action=add. ` +
    `Vaqt aytilgan bo'lsa due_at ni to'ldiring (hozirgi vaqtga nisbatan hisobla).\n` +
    `- «vazifalarim», «ro'yxat», «nima qilishim kerak» — action=list.\n` +
    `- «bajardim», «tugatdim», «o'chir» + raqam yoki nom — action=complete yoki delete, ` +
    `mos task_number bilan.\n` +
    `- Boshqa hollarda oddiy suhbat: action=chat.\n` +
    `- reply doim foydalanuvchi tilida (o'zbek yoki rus), samimiy va qisqa bo'lsin.`,
  ].filter(Boolean).join('\n\n');
}

// Aniqlangan action'ni bajaradi va foydalanuvchiga yuboriladigan matnni qaytaradi.
async function runAction(chatId, plan, tasks) {
  const action = plan && plan.action;

  if (action === 'list') {
    return formatTaskList(tasks);
  }

  if (action === 'add') {
    const text = plan.text && String(plan.text).trim();
    if (!text) return plan.reply || 'Vazifa matni tushunarsiz. Qaytadan yozing.';
    const due = parseDue(plan.due_at);
    await sql`INSERT INTO assistant_tasks (chat_id, text, due_at) VALUES (${chatId}, ${text}, ${due})`;
    return due
      ? `✅ Qo'shildi: ${text}\n⏰ Eslataman: ${formatLocal(due)}`
      : `✅ Vazifa qo'shildi: ${text}`;
  }

  if (action === 'complete' || action === 'delete') {
    const n = Number(plan.task_number);
    if (!n || n < 1 || n > tasks.length) {
      return 'Qaysi vazifani nazarda tutyapsiz? «Vazifalarim» deb yozib, raqamini ayting.';
    }
    const target = tasks[n - 1];
    if (action === 'complete') {
      await sql`UPDATE assistant_tasks SET done = true WHERE id = ${target.id}`;
      return `✅ Bajarildi: ${target.text}`;
    }
    await sql`DELETE FROM assistant_tasks WHERE id = ${target.id}`;
    return `🗑 O'chirildi: ${target.text}`;
  }

  // action=chat yoki noma'lum — LLM javobini ishlatamiz.
  return (plan && plan.reply) || 'Kechirasiz, tushunmadim. Qaytadan yozib ko\'ring.';
}

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

    if (/^\/(start|help)\b/.test(text)) {
      await reply(chatId, GREETING);
      return res.status(200).json({ ok: true });
    }

    await ensureAssistantSchema();
    await tg('sendChatAction', { chat_id: chatId, action: 'typing' });

    const userMessage = text.slice(0, MAX_INPUT);

    const [cfgRows, kbRows, histRows, tasks] = await Promise.all([
      sql`SELECT system_prompt FROM bot_config WHERE id = 1`,
      sql`SELECT title, content FROM kb_entries ORDER BY id DESC`,
      sql`
        SELECT role, content FROM assistant_messages
        WHERE chat_id = ${chatId} ORDER BY id DESC LIMIT ${HISTORY_LIMIT}
      `,
      getOpenTasks(chatId),
    ]);

    const basePrompt = (cfgRows[0] && cfgRows[0].system_prompt) || '';
    const kbBlock = buildKnowledgeBlock(kbRows);
    const systemPrompt = plannerPrompt(basePrompt, kbBlock, tasks);
    const history = histRows.reverse().map((m) => ({ role: m.role, text: m.content }));

    let answer;
    try {
      const raw = await generate({ systemPrompt, history, userMessage });
      const plan = extractJson(raw);
      answer = plan
        ? await runAction(chatId, plan, tasks)
        // JSON chiqmasa — xom matnni suhbat javobi sifatida beramiz.
        : raw;
    } catch (e) {
      console.error('LLM error:', e);
      await reply(chatId, 'Kechirasiz, javob berishda xatolik yuz berdi. Birozdan so‘ng qayta urinib ko‘ring.');
      return res.status(200).json({ ok: true });
    }

    await reply(chatId, answer);

    await sql`
      INSERT INTO assistant_messages (chat_id, role, content)
      VALUES (${chatId}, 'user', ${userMessage}), (${chatId}, 'model', ${answer})
    `;

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('assistant/webhook error:', e);
    return res.status(200).json({ ok: true });
  }
}
