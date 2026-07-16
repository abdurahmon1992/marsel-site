import { sql, ensureSchema } from '../../lib/db.js';
import { createSession, sessionCookie } from '../../lib/session.js';

// GET /api/auth/poll?token=...
// Login token holatini tekshiradi. Tasdiqlangan bo'lsa — sessiya cookie beradi.
export default async function handler(req, res) {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ error: 'token kerak' });
  }
  try {
    await ensureSchema();
    const rows = await sql`
      SELECT status, tg_id, tg_first_name
      FROM login_tokens
      WHERE token = ${token}
    `;
    if (rows.length === 0) {
      return res.status(404).json({ status: 'unknown' });
    }
    const row = rows[0];
    if (row.status === 'confirmed') {
      const jwt = await createSession({
        sub: String(row.tg_id),
        name: row.tg_first_name || 'User',
      });
      res.setHeader('Set-Cookie', sessionCookie(jwt));
      // Bir martalik token — ishlatilgach o'chiramiz.
      await sql`DELETE FROM login_tokens WHERE token = ${token}`;
      return res.status(200).json({ authenticated: true });
    }
    return res.status(200).json({ status: row.status });
  } catch (e) {
    console.error('auth/poll error:', e);
    return res.status(500).json({ error: 'Server xatosi' });
  }
}
