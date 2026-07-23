import { neon } from '@neondatabase/serverless';

// Neon serverless HTTP driver — Vercel serverless funksiyalari uchun mos.
export const sql = neon(process.env.DATABASE_URL);

let ensured = false;

// Jadval(lar)ni birinchi murojaatda yaratadi. "Warm" instansiyada bir marta
// ishlaydi (ensured bayrog'i orqali).
export async function ensureSchema() {
  if (ensured) return;
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
  ensured = true;
}

let ensuredAssistant = false;

// AI assistant uchun jadvallar: bilim bazasi, bot sozlamalari (system prompt)
// va suhbat tarixi. Birinchi murojaatda yaratiladi.
export async function ensureAssistantSchema() {
  if (ensuredAssistant) return;
  await sql`
    CREATE TABLE IF NOT EXISTS kb_entries (
      id         SERIAL PRIMARY KEY,
      title      TEXT NOT NULL,
      content    TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS bot_config (
      id            INT PRIMARY KEY DEFAULT 1,
      system_prompt TEXT NOT NULL DEFAULT '',
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT bot_config_singleton CHECK (id = 1)
    )
  `;
  await sql`INSERT INTO bot_config (id, system_prompt) VALUES (1, '') ON CONFLICT (id) DO NOTHING`;
  await sql`
    CREATE TABLE IF NOT EXISTS assistant_messages (
      id         BIGSERIAL PRIMARY KEY,
      chat_id    BIGINT NOT NULL,
      role       TEXT NOT NULL,
      content    TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS assistant_messages_chat_idx ON assistant_messages (chat_id, id)`;
  await sql`
    CREATE TABLE IF NOT EXISTS assistant_tasks (
      id         BIGSERIAL PRIMARY KEY,
      chat_id    BIGINT NOT NULL,
      text       TEXT NOT NULL,
      due_at     TIMESTAMPTZ,
      done       BOOLEAN NOT NULL DEFAULT false,
      notified   BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS assistant_tasks_chat_idx ON assistant_tasks (chat_id, done, created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS assistant_tasks_due_idx ON assistant_tasks (due_at) WHERE done = false AND notified = false`;
  ensuredAssistant = true;
}
