"use client";

import { useState, type ReactNode } from "react";

type Item = { slug: string; tags: string[]; card: ReactNode };
type Props = { items: Item[]; filters: { all: string; smm: string; target: string; branding: string }; label: string };

const keys = ["all", "smm", "target", "branding"] as const;

// /cases filtri. Barcha kartochkalar HTML'da bor (SEO), filtr faqat ko'rinishni o'zgartiradi.
export function CasesGrid({ items, filters, label }: Props) {
  const [active, setActive] = useState<(typeof keys)[number]>("all");

  return (
    <>
      <h2 className="sr-only">{label}</h2>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={active === k}
            onClick={() => setActive(k)}
            className={`h-10 border px-4 text-sm font-semibold tracking-wide uppercase transition-colors ${
              active === k ? "border-text bg-text text-bg" : "border-border hover:border-text"
            }`}
          >
            {filters[k]}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.slug} hidden={active !== "all" && !it.tags.includes(active)} className="flex">
            {it.card}
          </li>
        ))}
      </ul>
    </>
  );
}
