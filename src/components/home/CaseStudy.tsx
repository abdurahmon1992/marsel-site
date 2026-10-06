import Link from "next/link";
import type { CaseItem, HomeDict } from "@/lib/i18n";
import { CaseCard } from "../CaseCard";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

type Props = {
  t: HomeDict["case"];
  items: CaseItem[];
  caseHref: (slug: string) => string;
  allHref: string;
};

export function CaseStudy({ t, items, caseHref, allHref }: Props) {
  const numeric = items.filter((c) => c.kind === "numeric").slice(0, 4);
  const branding = items.filter((c) => c.branding.name);

  return (
    <section id="cases" className="relative overflow-hidden py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] bg-size-[22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <div className={`${container} relative`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{t.eyebrow}</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              <Accent text={t.title} />
            </h2>
          </div>
          <Link href={allHref} className="hidden text-sm font-semibold tracking-wide uppercase hover:text-accent sm:inline">
            {t.all} →
          </Link>
        </div>

        {/* Mobilda gorizontal slayder, md+ da grid */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {numeric.map((c, i) => (
            <li
              key={c.slug}
              className={`flex w-[82%] shrink-0 snap-start md:w-auto ${
                i === numeric.length - 1 && numeric.length % 2 ? "md:col-span-2" : ""
              }`}
            >
              <CaseCard item={c} href={caseHref(c.slug)} more={t.more} sizes="(min-width: 768px) 50vw, 85vw" frameWidth={600} />
            </li>
          ))}
        </ul>

        {branding.length > 0 && (
          <div className="mt-10 grid gap-4 border-t-2 border-text pt-6 lg:grid-cols-[12rem_1fr] lg:items-start">
            <h3 className="font-display text-2xl font-semibold uppercase">{t.brandingTitle}</h3>
            <ul className="grid gap-3 md:grid-cols-3">
              {branding.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={caseHref(c.slug)}
                    className="group flex items-center justify-between gap-4 border border-border bg-bg px-5 py-4 transition-colors hover:border-text"
                  >
                    <span>
                      <span className="block font-display text-xl font-bold uppercase">{c.branding.name}</span>
                      <span className="text-sm text-muted">{c.branding.items.join(" · ")}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl group-hover:text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={allHref}
            className="inline-flex h-12 items-center bg-text px-7 text-sm font-semibold tracking-wide text-bg uppercase transition-colors hover:bg-accent"
          >
            {t.all} →
          </Link>
        </div>
      </div>
    </section>
  );
}
