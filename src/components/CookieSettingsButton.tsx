"use client";

import { CONSENT_OPEN_EVENT } from "./Analytics";

// Footer'dagi "Cookie sozlamalari" — banner'ni qayta ochadi (analitika ulangan bo'lsa)
export function CookieSettingsButton({ label }: { label: string }) {
  if (!(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.NEXT_PUBLIC_YM_ID)) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className="underline-offset-2 hover:underline">
      {label}
    </button>
  );
}
