import { sql, ensureSchema } from '../../lib/db.js';
import { requireUser, readBody } from '../../lib/auth.js';

// /api/goals/:id
//   GET    — bitta maqsad (vazifalari bilan)
//   PUT    — yangilash { title?, description?, status? }
//   DELETE — o'chirish (vazifalari ham kaskad o'chadi)
export default async function handler(req, res) {
  const user = await requireUser(req, res);
  if (!user) return;
  await ensureSchema();

  const id = req.query.id;

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM goals WHERE id = ${id}`;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    const tasks = await sql`SELECT * FROM tasks WHERE goal_id = ${id} ORDER BY created_at`;
    return res.status(200).json({ ...rows[0], tasks });
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const b = readBody(req);
    const rows = await sql`
      UPDATE goals SET
        title       = COALESCE(${b.title ?? null}, title),
        description = COALESCE(${b.description ?? null}, description),
        status      = COALESCE(${b.status ?? null}, status),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    return res.status(200).json(rows[0]);
  }

  if (req.method === 'DELETE') {
    const rows = await sql`DELETE FROM goals WHERE id = ${id} RETURNING id`;
    if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
