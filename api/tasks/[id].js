import { sql, ensureSchema } from '../../lib/db.js';
import { requireUser, readBody } from '../../lib/auth.js';

// /api/tasks/:id
//   GET    — bitta vazifa
//   PUT    — yangilash { title?, description?, status?, priority?, due_date?, goal_id? }
//   DELETE — o'chirish
export default async function handler(req, res) {
  const user = await requireUser(req, res);
  if (!user) return;
  await ensureSchema();

  const id = req.query.id;

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM tasks WHERE id = ${id}`;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    return res.status(200).json(rows[0]);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const b = readBody(req);
    const rows = await sql`
      UPDATE tasks SET
        title       = COALESCE(${b.title ?? null}, title),
        description = COALESCE(${b.description ?? null}, description),
        status      = COALESCE(${b.status ?? null}, status),
        priority    = COALESCE(${b.priority ?? null}, priority),
        due_date    = COALESCE(${b.due_date ?? null}, due_date),
        goal_id     = COALESCE(${b.goal_id ?? null}, goal_id),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    return res.status(200).json(rows[0]);
  }

  if (req.method === 'DELETE') {
    const rows = await sql`DELETE FROM tasks WHERE id = ${id} RETURNING id`;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
