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
