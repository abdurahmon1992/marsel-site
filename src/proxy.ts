import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/locales";

// Til prefiksi bo'lmagan har qanday yo'lni (/, /cases, ...) tilli manzilga yo'naltiradi.
// Til: avval foydalanuvchi tanlagan (cookie), aks holda o'zbekcha.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale: Locale = locales.includes(saved as Locale) ? (saved as Locale) : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // API, Next ichki fayllari va nuqtali fayllar (robots.txt, sitemap.xml, icon...) chetlab o'tiladi
  matcher: ["/((?!api|_next|icon|apple-icon|.*\\..*).*)"],
};
