"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export const SERVICE_EVENT = "lead:service";

/** #audit formasiga o'tadi va formada shu xizmat/paketni tanlangan holda ko'rsatadi. */
export function SelectService({
  value,
  source,
  className,
  children,
}: {
  value?: string;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#audit"
      className={className}
      onClick={() => {
        if (value) window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: value }));
        track("cta_click", { source, service: value });
      }}
    >
      {children}
    </a>
  );
}
