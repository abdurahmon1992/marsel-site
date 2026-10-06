"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Consent = "all" | "necessary";
type Ids = { ga4?: string; metaPixel?: string; ym?: string };
type Dict = { text: string; accept: string; necessary: string; more: string; label: string };

const COOKIE = "marsel_consent";
export const CONSENT_OPEN_EVENT = "consent:open";

function readConsent(): Consent | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(all|necessary)`));
    return (m?.[1] as Consent) ?? null;
  } catch {
    return null;
  }
}

function saveConsent(value: Consent) {
  try {
    document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* cookie bloklangan bo'lsa — faqat shu sessiya uchun */
  }
}

const TRACKED: AnalyticsEvent[] = ["phone_click", "telegram_click", "cta_click"];

export function Analytics({ ids, t, privacyHref }: { ids: Ids; t: Dict; privacyHref: string }) {
  const enabled = Boolean(ids.ga4 || ids.metaPixel || ids.ym);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(true);

  // Saqlangan tanlovni o'qish (gidratatsiyadan keyin)
  useEffect(() => {
    if (!enabled) return;
    const saved = readConsent();
    queueMicrotask(() => {
      setConsent(saved);
      setOpen(!saved);
    });
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, [enabled]);

  // data-track / data-cta atributli elementlar bosilganda hodisa yuboriladi
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track], [data-cta]");
      if (!el) return;
      const name = el.dataset.track as AnalyticsEvent | undefined;
      if (name && TRACKED.includes(name)) track(name, { page: location.pathname });
      else if (el.dataset.cta) track("cta_click", { source: el.dataset.cta });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // SPA o'tishlarida Pixel va Metrika uchun sahifa ko'rish (GA4 buni o'zi kuzatadi)
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (consent !== "all") return;
    window.fbq?.("track", "PageView");
    if (window.ym && window.__ymId) window.ym(window.__ymId, "hit", location.href);
  }, [pathname, consent]);

  if (!enabled) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setConsent(value);
    setOpen(false);
  };

  return (
    <>
      {consent === "all" && ids.ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids.ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',${JSON.stringify(ids.ga4)},{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "all" && ids.metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(ids.metaPixel)});fbq('track','PageView');`}
        </Script>
      )}
      {consent === "all" && ids.ym && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<e.scripts.length;j++){if(e.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');window.__ymId=${Number(ids.ym)};ym(window.__ymId,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
        </Script>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={t.label}
          className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-3xl bg-surface p-4 text-on-surface shadow-2xl sm:inset-x-4 sm:bottom-4 sm:flex sm:items-center sm:gap-6 sm:p-5"
        >
          <p className="text-sm text-on-surface-muted">
            {t.text}{" "}
            <Link href={privacyHref} className="whitespace-nowrap text-on-surface underline underline-offset-2">
              {t.more}
            </Link>
          </p>
          <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
            <button
              type="button"
              onClick={() => choose("necessary")}
              className="h-10 flex-1 border border-surface-border px-4 text-xs font-semibold tracking-wide uppercase hover:border-on-surface sm:flex-none"
            >
              {t.necessary}
            </button>
            <button
              type="button"
              onClick={() => choose("all")}
              className="h-10 flex-1 bg-accent px-5 text-xs font-semibold tracking-wide text-on-accent uppercase hover:bg-accent-hover sm:flex-none"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
