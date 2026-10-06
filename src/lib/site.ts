import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, type Locale } from "./locales";

// Prod domen NEXT_PUBLIC_SITE_URL orqali beriladi; bo'lmasa Vercel avtomatik URL'i.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** `path` — tilsiz yo'l: "" (bosh sahifa), "/cases", "/privacy" ... */
export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

/** Joriy sahifa uchun canonical + hreflang (har bir til + x-default). */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = localizedPath(l, path);
  languages["x-default"] = localizedPath(defaultLocale, path);
  return { canonical: localizedPath(locale, path), languages };
}
