import { sql, ensureAssistantSchema } from '../../lib/db.js';
import { requireOwner } from '../../lib/authGuard.js';

// Bilim bazasi (knowledge base) CRUD — faqat egasi uchun.
//   GET    /api/admin/kb            — barcha yozuvlar ro'yxati
//   POST   /api/admin/kb            — { title, content } yangi yozuv
//   PUT    /api/admin/kb?id=<id>    — { title, content } tahrirlash
//   DELETE /api/admin/kb?id=<id>    — o'chirish
export default async function handler(req, res) {
  const owner = await requireOwner(req);
  if (!owner) return res.status(401).json({ error: 'unauthorized' });

  try {
    await ensureAssistantSchema();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, title, content, updated_at FROM kb_entries ORDER BY id DESC
      `;
      return res.status(200).json({ entries: rows });
    }

    if (req.method === 'POST') {
      const { title, content } = parseBody(req);
      if (!title || !content) return res.status(400).json({ error: 'title va content kerak' });
      const rows = await sql`
        INSERT INTO kb_entries (title, content) VALUES (${title}, ${content})
        RETURNING id, title, content, updated_at
      `;
      return res.status(200).json({ entry: rows[0] });
    }

    if (req.method === 'PUT') {
      const id = Number(req.query.id);
      if (!id) return res.status(400).json({ error: 'id kerak' });
      const { title, content } = parseBody(req);
      if (!title || !content) return res.status(400).json({ error: 'title va content kerak' });
      const rows = await sql`
        UPDATE kb_entries SET title = ${title}, content = ${content}, updated_at = now()
        WHERE id = ${id}
        RETURNING id, title, content, updated_at
      `;
      if (!rows.length) return res.status(404).json({ error: 'topilmadi' });
      return res.status(200).json({ entry: rows[0] });
    }

    if (req.method === 'DELETE') {
      const id = Number(req.query.id);
      if (!id) return res.status(400).json({ error: 'id kerak' });
      await sql`DELETE FROM kb_entries WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('admin/kb error:', e);
    return res.status(500).json({ error: 'Server xatosi' });
  }
}

function parseBody(req) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  return {
    title: body.title != null ? String(body.title).trim() : '',
    content: body.content != null ? String(body.content).trim() : '',
  };
}
