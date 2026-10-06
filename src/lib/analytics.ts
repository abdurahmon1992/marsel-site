// Analitika hodisalari: lead_submit, cta_click, phone_click, telegram_click, lang_switch.
// Skriptlar (GA4, Meta Pixel, Yandex Metrika) 4-bosqichda cookie roziligidan keyin ulanadi;
// ungacha bu funksiya hodisani faqat dataLayer'ga yozadi.
export type AnalyticsEvent = "lead_submit" | "cta_click" | "phone_click" | "telegram_click" | "lang_switch";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
