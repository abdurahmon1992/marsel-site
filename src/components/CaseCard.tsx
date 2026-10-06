import Link from "next/link";
import type { CaseItem } from "@/lib/i18n";
import { CaseImage } from "./CaseImage";

type Props = { item: CaseItem; href: string; more: string; className?: string; sizes?: string; frameWidth?: number };

/** Kartochka sarlavhasi: mijoz nomi (bo'lsa) yoki soha, va xizmat turi. */
export const caseMeta = (item: CaseItem) => [item.name || item.industry, item.type].filter(Boolean).join(" · ");

// Muqova rasmi bo'lsa — rasm + matn; bo'lmasa — tipografik kartochka (katta qizil raqam yoki brend nomi).
export function CaseCard({
  item,
  href,
  more,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw",
  frameWidth = 400,
}: Props) {
  const branding = item.kind === "branding";
  return (
    <Link
      href={href}
      className={`group relative flex w-full flex-col border border-border bg-bg transition-colors hover:border-text ${className}`}
    >
      <span aria-hidden="true" className="absolute top-0 left-0 z-10 h-1.5 w-12 bg-accent transition-all group-hover:w-full" />
      {item.badge && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 bg-accent px-2.5 py-1 text-xs font-semibold tracking-wide text-on-accent uppercase">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-on-accent motion-safe:animate-pulse" />
          {item.badge}
        </span>
      )}
      {item.cover && <CaseImage image={item.cover} sizes={sizes} frameWidth={frameWidth} />}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
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
      </div>
    </Link>
  );
}
