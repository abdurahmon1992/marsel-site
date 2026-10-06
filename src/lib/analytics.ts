// Analitika hodisalari: lead_submit, cta_click, phone_click, telegram_click, lang_switch.
// GA4 / Meta Pixel / Yandex Metrika skriptlari faqat cookie roziligidan keyin yuklanadi
// (src/components/Analytics.tsx). Skript yuklanmagan bo'lsa, hodisa faqat dataLayer'ga yoziladi.
export type AnalyticsEvent = "lead_submit" | "cta_click" | "phone_click" | "telegram_click" | "lang_switch";

type Params = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
    __ymId?: number;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v));
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...clean });
  window.gtag?.("event", event, clean);
  if (window.fbq) {
    if (event === "lead_submit") window.fbq("track", "Lead", clean);
    else window.fbq("trackCustom", event, clean);
  }
  if (window.ym && window.__ymId) window.ym(window.__ymId, "reachGoal", event, clean);
}
