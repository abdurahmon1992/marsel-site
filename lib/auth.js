import { verifySession, readCookie } from './session.js';

// Joriy sessiya foydalanuvchisini qaytaradi (yoki null).
export async function getUser(req) {
  const token = readCookie(req.headers.cookie);
  if (!token) return null;
  return await verifySession(token);
}

// Sessiya bo'lmasa 401 qaytaradi va null beradi. /api/* middleware bilan
// himoyalanmagani uchun har bir CRUD endpointida chaqiriladi.
export async function requireUser(req, res) {
  const user = await getUser(req);
  if (!user) {
    res.status(401).json({ error: 'unauthorized' });
    return null;
  }
  return user;
}

// So'rov tanasini xavfsiz o'qish (JSON).
export function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body || '{}'); } catch { return {}; }
  }
  return req.body;
}
