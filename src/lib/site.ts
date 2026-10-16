import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "./locales";

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
  for (const l of locales) languages[l] = localizedPath(l, path);
  languages["x-default"] = localizedPath(defaultLocale, path);
  return { canonical: localizedPath(locale, path), languages };
}

/** Open Graph locale kodlari */
export const ogLocale: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };

/**
 * Analitika va qidiruv tizimlari ID'lari — BITTA JOY.
 * Vercel'da NEXT_PUBLIC_* berilsa, o'sha ustun turadi; bo'lmasa shu yerdagi qiymat ishlaydi.
 * Bo'sh qolgan hisoblagich yuklanmaydi; hammasi bo'sh bo'lsa cookie banner ham chiqmaydi.
 */
export const tracking = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "", // G-XXXXXXXXXX
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "", // faqat raqamlar
  ym: process.env.NEXT_PUBLIC_YM_ID || "", // Yandex Metrika hisoblagich raqami
  // Search Console / Yandex Webmaster "HTML-teg" usulidagi tasdiq kodlari (content="..." ichidagi qiymat)
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
};
export const hasTracking = Boolean(tracking.ga4 || tracking.metaPixel || tracking.ym);

/** Preview (Vercel) deploylarni qidiruv tizimlari indekslamasin */
export const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

/** Sahifa uchun to'liq Open Graph (sahifa meta'si layout'dagini ustidan yozgani uchun hammasi shu yerda) */
export function openGraphFor(
  locale: Locale,
  title: string,
  description: string,
  type: "website" | "article" = "website",
): NonNullable<Metadata["openGraph"]> {
  return {
    type,
    siteName: "MarSel Marketing",
    locale: ogLocale[locale],
    alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    title,
    description,
    images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: "MarSel Marketing" }],
  };
}
