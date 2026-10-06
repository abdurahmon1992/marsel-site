// Mijoz komponentlari va proxy ham ishlatadi, shuning uchun bu fayl "server-only" emas.
export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export const localeLabels: Record<Locale, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

// <html lang> va hreflang uchun
export const htmlLang: Record<Locale, string> = {
  uz: "uz-Latn",
  ru: "ru",
  en: "en",
};

export const LOCALE_COOKIE = "NEXT_LOCALE";
