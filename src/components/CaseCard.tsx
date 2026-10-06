import Link from "next/link";
import type { CaseItem } from "@/lib/i18n";

type Props = { item: CaseItem; href: string; more: string; className?: string };

/** Kartochka sarlavhasi: mijoz nomi (bo'lsa) yoki soha, va xizmat turi. */
export const caseMeta = (item: CaseItem) => [item.name || item.industry, item.type].filter(Boolean).join(" · ");

// Rasmsiz, tipografik kartochka: katta qizil raqam (yoki brending uchun nom).
export function CaseCard({ item, href, more, className = "" }: Props) {
  const branding = item.kind === "branding";
  return (
    <Link
      href={href}
      className={`group relative flex w-full flex-col border border-border bg-bg p-6 transition-colors hover:border-text sm:p-8 ${className}`}
    >
      <span aria-hidden="true" className="absolute top-0 left-0 h-1.5 w-12 bg-accent transition-all group-hover:w-full" />
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">
        {branding ? item.type : caseMeta(item)}
      </p>
      {branding ? (
        <>
          <h3 className="mt-4 font-display text-3xl leading-none font-bold uppercase sm:text-4xl">{item.name}</h3>
          <p className="mt-3 text-accent">{item.done.join(" · ")}</p>
        </>
      ) : (
        <>
          <p className="mt-5 font-display text-[2.5rem] leading-none font-bold whitespace-nowrap text-accent min-[400px]:text-5xl md:text-[2.75rem] xl:text-6xl">
            {item.result.value}
          </p>
          <h3 className="mt-2 font-sans text-base font-semibold">{item.result.label}</h3>
        </>
      )}
      <p className="mt-4 flex-1 text-sm text-muted">{item.summary}</p>
      <span className="mt-6 text-sm font-semibold tracking-wide uppercase group-hover:text-accent">{more} →</span>
    </Link>
  );
}
