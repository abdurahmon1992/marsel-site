import { sql } from './db.js';

// Shaxsiy yordamchi — vazifalar/eslatmalar mantig'i.
// Vaqt mahalliy zona bo'yicha ko'rsatiladi (default: Asia/Tashkent, UTC+5).

export const TZ = process.env.ASSISTANT_TZ || 'Asia/Tashkent';

// Mahalliy zonadagi sanani odam o'qiy oladigan qatorga aylantiradi.
export function formatLocal(date) {
  if (!date) return '';
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: TZ,
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(date));
  } catch {
    return new Date(date).toISOString();
  }
}

// Hozirgi mahalliy vaqt (LLM'ga kontekst sifatida beriladi).
export function nowLocal() {
  return formatLocal(new Date());
}

// Chat uchun ochiq (bajarilmagan) vazifalar — barqaror tartibda.
export async function getOpenTasks(chatId) {
  return await sql`
    SELECT id, text, due_at FROM assistant_tasks
    WHERE chat_id = ${chatId} AND done = false
    ORDER BY created_at ASC, id ASC
  `;
}

// Ochiq vazifalarni raqamlangan ro'yxat matniga aylantiradi.
export function formatTaskList(tasks) {
  if (!tasks.length) return 'Hozircha vazifalaringiz yo\'q. 📭';
  const lines = tasks.map((t, i) => {
    const due = t.due_at ? ` — ⏰ ${formatLocal(t.due_at)}` : '';
    return `${i + 1}. ${t.text}${due}`;
  });
  return '📋 Vazifalaringiz:\n' + lines.join('\n');
}

// due_at qatorini (LLM'dan) tekshiradi. Yaroqsiz bo'lsa null qaytaradi.
export function parseDue(dueRaw) {
  if (!dueRaw) return null;
  const d = new Date(dueRaw);
  return isNaN(d.getTime()) ? null : d.toISOString();
}
