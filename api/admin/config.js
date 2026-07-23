import { sql, ensureAssistantSchema } from '../../lib/db.js';
import { requireOwner } from '../../lib/authGuard.js';

// GET  /api/admin/config      — joriy system prompt'ni qaytaradi
// POST /api/admin/config      — { systemPrompt } ni saqlaydi
// Faqat egasi (owner sessiyasi) kira oladi.
export default async function handler(req, res) {
  const owner = await requireOwner(req);
  if (!owner) return res.status(401).json({ error: 'unauthorized' });

  try {
    await ensureAssistantSchema();

    if (req.method === 'GET') {
      const rows = await sql`SELECT system_prompt, updated_at FROM bot_config WHERE id = 1`;
      const row = rows[0] || { system_prompt: '', updated_at: null };
      return res.status(200).json({ systemPrompt: row.system_prompt, updatedAt: row.updated_at });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const systemPrompt = String(body.systemPrompt ?? '');
      await sql`
        UPDATE bot_config SET system_prompt = ${systemPrompt}, updated_at = now() WHERE id = 1
      `;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('admin/config error:', e);
    return res.status(500).json({ error: 'Server xatosi' });
  }
}
