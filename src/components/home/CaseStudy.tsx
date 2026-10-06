import Link from "next/link";
import type { CaseItem, HomeDict } from "@/lib/i18n";
import { CaseCard } from "../CaseCard";
import { Accent } from "../ui/Accent";
import { btnSecondary, container, eyebrow, sectionTitle, textLink } from "../ui/styles";

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
    <section id="cases" className="py-16 lg:py-24">
      <div className={container}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={eyebrow}>{t.eyebrow}</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              <Accent text={t.title} highlight />
            </h2>
          </div>
          <Link href={allHref} className={`hidden text-sm sm:inline ${textLink}`}>
            {t.all} →
          </Link>
        </div>

        {/* Mobilda gorizontal slayder, md+ da grid */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
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

        {t.enterprise && (
          <p className="mt-8 flex flex-col gap-1 rounded-2xl bg-surface px-5 py-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-2">
            <span className="text-muted">{t.enterprise.text}</span>
            <Link href={caseHref(t.enterprise.slug)} className={textLink}>
              {t.enterprise.link} →
            </Link>
          </p>
        )}

        {branding.length > 0 && (
          <div className="mt-10 grid gap-4 border-t border-line pt-6 lg:grid-cols-[12rem_1fr] lg:items-start">
            <h3 className="text-xl">{t.brandingTitle}</h3>
            <ul className="grid gap-3 md:grid-cols-3">
              {branding.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={caseHref(c.slug)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg px-5 py-4 transition-colors hover:border-accent/40"
                  >
                    <span>
                      <span className="block text-lg font-semibold">{c.branding.name}</span>
                      <span className="text-sm text-muted">{c.branding.items.join(" · ")}</span>
                    </span>
                    <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href={allHref} className={btnSecondary}>
            {t.all} →
          </Link>
        </div>
      </div>
    </section>
  );
}
