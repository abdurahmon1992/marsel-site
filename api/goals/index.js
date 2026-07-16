import { sql, ensureSchema } from '../../lib/db.js';
import { requireUser, readBody } from '../../lib/auth.js';

// /api/goals
//   GET  — barcha maqsadlar ro'yxati (har biriga vazifalar soni bilan)
//   POST — yangi maqsad yaratish { title, description?, status? }
export default async function handler(req, res) {
  const user = await requireUser(req, res);
  if (!user) return;
  await ensureSchema();

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT g.*,
             COUNT(t.id)::int AS task_count,
             COUNT(t.id) FILTER (WHERE t.status = 'done')::int AS done_count
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `;
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const b = readBody(req);
    if (!b.title) return res.status(400).json({ error: 'title kerak' });
    const rows = await sql`
      INSERT INTO goals (title, description, status, owner_tg_id)
      VALUES (${b.title}, ${b.description || null}, ${b.status || 'active'}, ${user.sub})
      RETURNING *
    `;
    return res.status(201).json(rows[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
