import { neon } from '@neondatabase/serverless';

// Neon serverless HTTP driver — Vercel serverless funksiyalari uchun mos.
export const sql = neon(process.env.DATABASE_URL);

let ensured = false;

// Barcha jadvallarni birinchi murojaatda yaratadi va (bo'sh bo'lsa) test
// ma'lumotlari bilan to'ldiradi. "Warm" instansiyada bir marta ishlaydi.
export async function ensureSchema() {
  if (ensured) return;

  // --- Sprint 1: Telegram login tokenlari ---
  await sql`
    CREATE TABLE IF NOT EXISTS login_tokens (
      token         TEXT PRIMARY KEY,
      status        TEXT NOT NULL DEFAULT 'pending',
      tg_id         BIGINT,
      tg_username   TEXT,
      tg_first_name TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      confirmed_at  TIMESTAMPTZ
    )
  `;

  // --- Sprint 2: Maqsadlar ---
  await sql`
    CREATE TABLE IF NOT EXISTS goals (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'active',   -- active | done | archived
      owner_tg_id BIGINT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  // --- Sprint 2: Vazifalar ---
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id          SERIAL PRIMARY KEY,
      goal_id     INTEGER REFERENCES goals(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'todo',     -- todo | in_progress | done
      priority    TEXT NOT NULL DEFAULT 'medium',   -- low | medium | high
      due_date    DATE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await seedIfEmpty();
  ensured = true;
}

// Jadvallar bo'sh bo'lsa, test uchun namuna maqsad/vazifalar qo'shadi.
async function seedIfEmpty() {
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM goals`;
  if (count > 0) return;

  const owner = process.env.ALLOWED_TELEGRAM_ID || '5946966965';

  const goals = [
    ["Saytni MVP darajasida ishga tushirish", "Vercel va Neon asosida ishlaydigan minimal versiyani chiqarish", "active"],
    ["Telegram avtorizatsiyani yakunlash", "Saytga faqat egasi Telegram orqali kira olishi", "done"],
    ["Sprint 2: CRUD modullari", "Maqsad va vazifalar uchun to'liq CRUD backend va frontend", "active"],
  ];

  const goalIds = [];
  for (const [title, description, status] of goals) {
    const rows = await sql`
      INSERT INTO goals (title, description, status, owner_tg_id)
      VALUES (${title}, ${description}, ${status}, ${owner})
      RETURNING id
    `;
    goalIds.push(rows[0].id);
  }

  const tasks = [
    [goalIds[0], "Env o'zgaruvchilarni Vercel'da sozlash", "done", "high"],
    [goalIds[0], "Domenni ulash", "in_progress", "medium"],
    [goalIds[1], "Webhook'ni ro'yxatdan o'tkazish", "todo", "high"],
    [goalIds[1], "Kirish oqimini test qilish", "todo", "medium"],
    [goalIds[2], "Maqsadlar CRUD API'sini yozish", "in_progress", "high"],
    [goalIds[2], "Vazifalar CRUD API'sini yozish", "todo", "high"],
    [goalIds[2], "Frontend boshqaruv sahifasi", "todo", "low"],
  ];

  for (const [goalId, title, status, priority] of tasks) {
    await sql`
      INSERT INTO tasks (goal_id, title, status, priority)
      VALUES (${goalId}, ${title}, ${status}, ${priority})
    `;
  }
}
