import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuditOffer } from "@/components/home/AuditOffer";
import { PageHeader } from "@/components/PageHeader";
import { container } from "@/components/ui/styles";
import { getCases, getCommon, getHome, hasLocale, type Locale } from "@/lib/i18n";
import { alternates, localizedPath } from "@/lib/site";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return [];
  const cases = await getCases(params.lang);
  return cases.items.map((c) => ({ slug: c.slug }));
}

async function findCase(lang: Locale, slug: string) {
  const cases = await getCases(lang);
  return cases.items.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/cases/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = await findCase(lang, slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: alternates(lang, `/cases/${slug}`),
    openGraph: { title: item.title, description: item.summary },
  };
}

export default async function CasePage({ params }: PageProps<"/[lang]/cases/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const item = await findCase(lang, slug);
  if (!item) notFound();
  const [common, home] = await Promise.all([getCommon(lang), getHome(lang)]);
  const l = home.case.labels;
  const facts = (
    [
      [l.company, item.name],
      [l.industry, item.industry],
      [l.type, item.type],
      [l.product, item.product],
      [l.platform, item.platform],
    ] as [string, string][]
  ).filter(([, v]) => v);
  const before: string[] = item.before;
  const done: string[] = item.done;
  const metrics: { value: string; label: string }[] = item.metrics;

  return (
    <>
      <PageHeader
        title={item.title}
        eyebrow={home.case.eyebrow}
        back={{ href: localizedPath(lang, "/cases"), label: common.pages.back }}
      />

      <section className={`${container} pb-16 lg:pb-24`}>
        <dl className="flex flex-wrap gap-x-10 gap-y-3 border-y border-border py-4 text-sm">
          {facts.map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="text-muted">{label}:</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        {item.result.value && (
          <div className="mt-10">
            <p className="font-display text-[3.25rem] leading-none font-bold text-accent sm:text-8xl lg:text-9xl">{item.result.value}</p>
            <p className="mt-3 text-xl font-semibold">{item.result.label}</p>
          </div>
        )}

        {/* Oldin -> Qildik -> Natija */}
        <ol className="mt-12 grid gap-px bg-border lg:grid-cols-3">
          {before.length > 0 && (
            <li className="bg-bg py-8 lg:pr-8">
              <h2 className="text-3xl">
                <span className="text-accent">01</span> {l.before}
              </h2>
              <ul className="mt-5 space-y-3">
                {before.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-muted" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {done.length > 0 && (
            <li className="bg-bg py-8 lg:px-8">
              <h2 className="text-3xl">
                <span className="text-accent">{before.length ? "02" : "01"}</span> {l.done}
              </h2>
              <ul className="mt-5 space-y-3">
                {done.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li className="bg-bg py-8 lg:pl-8">
            <h2 className="text-3xl">
              <span className="text-accent">{String((before.length ? 1 : 0) + (done.length ? 1 : 0) + 1).padStart(2, "0")}</span>{" "}
              {l.result}
            </h2>
            {metrics.length > 0 ? (
              <ul className="mt-5 grid grid-cols-2 gap-px bg-border">
                {metrics.map((m) => (
                  <li key={m.label} className="bg-bg py-3 pr-3">
                    <p className="font-display text-2xl font-bold sm:text-3xl">{m.value}</p>
                    <p className="mt-1 text-sm text-muted">{m.label}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5">{item.summary}</p>
            )}
          </li>
        </ol>

        <div className="mt-12 flex flex-col gap-5 bg-surface p-8 text-on-surface sm:flex-row sm:items-center sm:justify-between lg:p-12">
          <p className="font-display text-3xl font-bold uppercase lg:text-4xl">{common.pages.caseCta}</p>
          <a
            href="#audit"
            className="inline-flex h-14 shrink-0 items-center justify-center bg-accent px-8 text-sm font-semibold tracking-wide text-on-accent uppercase transition-colors hover:bg-accent-hover"
          >
            {common.pages.caseCtaButton}
          </a>
        </div>
      </section>

      <AuditOffer t={home.audit} common={common} lang={lang} privacyHref={localizedPath(lang, "/privacy")} />
    </>
  );
}
