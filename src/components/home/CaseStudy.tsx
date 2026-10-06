import Link from "next/link";
import type { CaseItem, HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

type Props = { t: HomeDict["case"]; item: CaseItem; href: string };

function PhonePlaceholder({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`absolute grid aspect-[9/18] place-items-center rounded-[1.75rem] border-[6px] border-surface bg-subtle text-xs font-semibold tracking-widest text-muted shadow-xl ${className}`}
    >
      {label}
    </div>
  );
}

export function CaseStudy({ t, item, href }: Props) {
  const rows: [string, string][] = [
    [t.labels.type, item.type],
    [t.labels.company, item.company],
    [t.labels.product, item.product],
    [t.labels.platform, item.platform],
  ];

  return (
    <section id="cases" className="relative overflow-hidden py-16 lg:py-24">
      {/* Nuqtali fon pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] bg-size-[22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />
      <div className={`${container} relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]">
          <PhonePlaceholder label={t.imagePlaceholder} className="top-10 left-0 w-[38%] -rotate-6" />
          <PhonePlaceholder label={t.imagePlaceholder} className="top-0 left-1/2 z-10 w-[42%] -translate-x-1/2" />
          <PhonePlaceholder label={t.imagePlaceholder} className="top-12 right-0 w-[38%] rotate-6" />
          <div aria-hidden="true" className="absolute -bottom-2 left-1/2 h-3 w-2/3 -translate-x-1/2 bg-accent" />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{t.eyebrow}</p>
          <h2 className={`mt-3 ${sectionTitle}`}>
            <Accent text={t.title} />
          </h2>

          <dl className="mt-8 border-t-2 border-text">
            <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{t.labels.result}</dt>
              <dd className="font-display text-3xl font-bold text-accent sm:text-4xl">{item.result}</dd>
            </div>
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-muted">{item.summary}</p>
          <Link
            href={href}
            className="mt-6 inline-flex h-12 items-center border-2 border-text px-6 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-text hover:text-bg"
          >
            {t.more} →
          </Link>
        </div>
      </div>
    </section>
  );
}
