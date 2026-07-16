import { clearCookie } from '../../lib/session.js';

// POST /api/auth/logout — sessiya cookie'sini o'chiradi.
export default async function handler(req, res) {
  res.setHeader('Set-Cookie', clearCookie());
  return res.status(200).json({ ok: true });
}
