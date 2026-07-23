import { verifySession, readCookie } from './session.js';

// Diqqat: /api/* yo'llari Edge middleware bilan HIMOYALANMAGAN
// (middleware matcher'i api/ ni chetlab o'tadi). Shu sababli admin
// endpointlari sessiyani O'ZI tekshirishi shart.
//
// requireOwner — so'rovda haqiqiy egaga tegishli sessiya cookie'si bo'lsa
// payload'ni qaytaradi, aks holda null (chaqiruvchi 401 beradi).
export async function requireOwner(req) {
  const token = readCookie(req.headers.cookie);
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;
  const allowed = String(process.env.ALLOWED_TELEGRAM_ID || '5946966965');
  if (String(payload.sub) !== allowed) return null;
  return payload;
}
