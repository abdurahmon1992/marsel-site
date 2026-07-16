import { sql, ensureSchema } from '../../lib/db.js';
import { requireUser, readBody } from '../../lib/auth.js';

// /api/tasks
//   GET  — barcha vazifalar (?goalId= bilan filtrlash mumkin)
//   POST — yangi vazifa { title, goal_id?, description?, status?, priority?, due_date? }
export default async function handler(req, res) {
  const user = await requireUser(req, res);
  if (!user) return;
  await ensureSchema();

  if (req.method === 'GET') {
    const goalId = req.query.goalId;
    const rows = goalId
      ? await sql`SELECT * FROM tasks WHERE goal_id = ${goalId} ORDER BY created_at`
      : await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const b = readBody(req);
    if (!b.title) return res.status(400).json({ error: 'title kerak' });
    const rows = await sql`
      INSERT INTO tasks (goal_id, title, description, status, priority, due_date)
      VALUES (
        ${b.goal_id || null},
        ${b.title},
        ${b.description || null},
        ${b.status || 'todo'},
        ${b.priority || 'medium'},
        ${b.due_date || null}
      )
      RETURNING *
    `;
    return res.status(201).json(rows[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
