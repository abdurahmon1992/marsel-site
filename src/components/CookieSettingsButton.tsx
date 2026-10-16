"use client";

import { CONSENT_OPEN_EVENT } from "./Analytics";
import { hasTracking } from "@/lib/site";

// Footer'dagi "Cookie sozlamalari" — banner'ni qayta ochadi (analitika ulangan bo'lsa)
export function CookieSettingsButton({ label }: { label: string }) {
  if (!hasTracking) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className="underline-offset-2 hover:underline">
      {label}
    </button>
  );
}
