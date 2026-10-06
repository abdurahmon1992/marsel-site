import Link from "next/link";
import type { CaseItem } from "@/lib/i18n";
import { CaseImage } from "./CaseImage";

type Props = {
  item: CaseItem;
  href: string;
  more: string;
  className?: string;
  sizes?: string;
  frameWidth?: number;
  /** Birinchi ekrandagi kartochka (LCP) — rasm darhol yuklanadi */
  eager?: boolean;
};

/** Kartochka sarlavhasi: mijoz nomi (bo'lsa) yoki soha, va xizmat turi. */
export const caseMeta = (item: CaseItem) => [item.name || item.industry, item.type].filter(Boolean).join(" · ");

/** "Hozir ishlayapmiz" kabi nishon: kobalt-soft fon, marjon nuqta (faqat dekor) */
export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-accent ${className}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-2" />
      {children}
    </span>
  );
}

// Muqova rasmi bo'lsa — rasm + matn; bo'lmasa — tipografik kartochka (katta kobalt raqam yoki brend nomi).
export function CaseCard({
  item,
  href,
  more,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw",
  frameWidth = 400,
  eager = false,
}: Props) {
  const branding = item.kind === "branding";
  return (
    <Link
      href={href}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-soft transition-colors duration-200 hover:border-accent/40 ${className}`}
    >
      {item.badge && <Badge className="absolute top-4 right-4 z-10 shadow-soft">{item.badge}</Badge>}
      {item.cover && <CaseImage image={item.cover} sizes={sizes} frameWidth={frameWidth} eager={eager} flush />}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">{branding ? item.type : caseMeta(item)}</p>
        {branding ? (
          <>
            <h3 className="mt-3 text-2xl font-bold sm:text-[1.75rem]">{item.name}</h3>
            <p className="mt-2 text-sm text-muted">{item.done.join(" · ")}</p>
          </>
        ) : (
          <>
            {/* Raqam bo'lmasa (strategiya) — matn qatorga sig'masa ko'chadi */}
            <p
              className={`mt-4 leading-none font-bold tracking-tight text-accent ${
                item.kind === "strategy"
                  ? "text-3xl"
                  : "text-[2.25rem] whitespace-nowrap min-[400px]:text-[2.5rem] md:text-[2.25rem] xl:text-5xl"
              }`}
            >
              {item.result.value}
            </p>
            <h3 className="mt-2 text-base font-semibold tracking-normal">{item.result.label}</h3>
          </>
        )}
        <p className="mt-3 flex-1 text-sm text-muted">{item.summary}</p>
        <span className="mt-5 text-sm font-semibold text-accent">
          {more} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
