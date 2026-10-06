"use client";

import { useState, type ReactNode } from "react";

type Item = { slug: string; tags: string[]; card: ReactNode };
type Props = { items: Item[]; filters: { all: string; smm: string; target: string; branding: string; strategy: string }; label: string };

const keys = ["all", "smm", "target", "branding", "strategy"] as const;

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
            className={`h-9 rounded-full border px-4 text-sm font-semibold transition-colors ${
              active === k ? "border-accent bg-surface-2 text-accent" : "border-line text-muted hover:border-accent/40 hover:text-text"
            }`}
          >
            {filters[k]}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.slug} hidden={active !== "all" && !it.tags.includes(active)} className="flex">
            {it.card}
          </li>
        ))}
      </ul>
    </>
  );
}
