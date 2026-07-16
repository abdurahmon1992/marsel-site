import { next } from '@vercel/edge';
import { verifySession, readCookie } from './lib/session.js';

// Quyidagilardan tashqari BARCHA so'rovlar sessiya cookie'sini talab qiladi:
//  - /api/*            (auth endpointlari)
//  - /login.html       (kirish sahifasi, o'zi ichida CSS/JS bilan)
//  - favicon / robots
export const config = {
  matcher: ['/((?!api/|login\\.html|favicon\\.ico|robots\\.txt).*)'],
};

export default async function middleware(request) {
  const token = readCookie(request.headers.get('cookie'));
  if (token) {
    const payload = await verifySession(token);
    if (payload) return next();
  }
  const url = new URL('/login.html', request.url);
  return Response.redirect(url, 302);
}
