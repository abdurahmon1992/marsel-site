import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/CaseCard";
import { CaseImage } from "@/components/CaseImage";
import { JsonLd } from "@/components/JsonLd";
import { caseSchema } from "@/lib/schema";
import { AuditOffer } from "@/components/home/AuditOffer";
import { PageHeader } from "@/components/PageHeader";
import { container } from "@/components/ui/styles";
import { getCases, getCommon, getHome, hasLocale, type Locale } from "@/lib/i18n";
import { alternates, localizedPath, openGraphFor } from "@/lib/site";

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
    openGraph: openGraphFor(lang, item.title, item.summary, "article"),
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
      [l.period, item.period],
    ] as [string, string][]
  ).filter(([, v]) => v);
  // "Vazifa" (task) bo'lsa, birinchi bosqich sifatida "Oldin" o'rnida chiqadi
  const task: string[] = item.task;
  const before: string[] = task.length ? task : item.before;
  const firstLabel = task.length ? l.task : l.before;
  const related = item.related as { slug: string; text: string } | null;
  const done: string[] = item.done;
  const metrics: { value: string; label: string }[] = item.metrics;
  // Bo'sh bosqich (masalan, brendingda "Oldin") bo'lsa, setkada bo'sh katak qolmasin
  const stepCount = 1 + (before.length ? 1 : 0) + (done.length ? 1 : 0);
  const stepCols = ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3"][stepCount];

  return (
    <>
      <JsonLd data={caseSchema(lang, item)} />
      <PageHeader
        title={item.title}
        eyebrow={home.case.eyebrow}
        back={{ href: localizedPath(lang, "/cases"), label: common.pages.back }}
      />

      <section className={`${container} pb-16 lg:pb-24`}>
        {item.badge && (
          <p className="mb-4">
            <Badge>{item.badge}</Badge>
          </p>
        )}
        <dl className="flex flex-wrap gap-x-10 gap-y-3 border-y border-line py-4 text-sm">
          {facts.map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="text-muted">{label}:</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        {(item.result.value || item.cover) && (
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {item.result.value && (
              <div>
                <p
                  className={`leading-none font-bold tracking-tight text-accent ${
                    item.kind === "strategy" ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl"
                  }`}
                >
                  {item.result.value}
                </p>
                <p className="mt-3 text-xl font-semibold">{item.result.label}</p>
              </div>
            )}
            {item.cover && !item.beforeAfter && (
              <CaseImage
                image={item.cover}
                sizes="(min-width: 1024px) 50vw, 100vw"
                frameWidth={600}
                eager
                className={item.result.value ? "" : "lg:col-span-2 lg:max-w-4xl"}
              />
            )}
          </div>
        )}

        {/* Oldin / Keyin — yonma-yon */}
        {item.beforeAfter && (
          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4">
            {(
              [
                [l.before, item.beforeAfter.before],
                [l.after, item.beforeAfter.after],
              ] as const
            ).map(([label, img], i) => (
              <figure key={img.src}>
                <CaseImage image={img} sizes="(min-width: 1024px) 450px, 50vw" frameWidth={450} eager aspect="aspect-square" />
                <figcaption
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    i ? "bg-surface-2 text-accent" : "bg-surface text-muted"
                  }`}
                >
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Oldin -> Qildik -> Natija */}
        <ol className={`mt-12 grid gap-4 ${stepCols}`}>
          {before.length > 0 && (
            <li className="rounded-2xl border border-line bg-bg p-6 sm:p-7">
              <h2 className="text-xl">
                <span className="mr-1 text-sm font-semibold text-accent tabular-nums">01</span> {firstLabel}
              </h2>
              <ul className="mt-5 space-y-3">
                {before.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {done.length > 0 && (
            <li className="rounded-2xl border border-line bg-bg p-6 sm:p-7">
              <h2 className="text-xl">
                <span className="mr-1 text-sm font-semibold text-accent tabular-nums">{before.length ? "02" : "01"}</span> {l.done}
              </h2>
              <ul className="mt-5 space-y-3">
                {done.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li className="rounded-2xl border border-line bg-bg p-6 sm:p-7">
            <h2 className="text-xl">
              <span className="mr-1 text-sm font-semibold text-accent tabular-nums">{String((before.length ? 1 : 0) + (done.length ? 1 : 0) + 1).padStart(2, "0")}</span>{" "}
              {l.result}
            </h2>
            {metrics.length > 0 ? (
              <ul className={`mt-5 grid gap-px overflow-hidden rounded-xl bg-line ${metrics.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {metrics.map((m) => (
                  <li key={m.label} className="bg-bg p-3">
                    <p className="text-xl font-bold tracking-tight text-accent sm:text-2xl">{m.value}</p>
                    <p className="mt-1 text-sm text-muted">{m.label}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5">{item.resultText || item.summary}</p>
            )}
            {related && (
              <Link
                href={localizedPath(lang, `/cases/${related.slug}`)}
                className="mt-6 inline-flex items-start gap-2 rounded-xl bg-surface-2 px-4 py-3 text-sm font-semibold text-accent hover:underline"
              >
                {related.text} →
              </Link>
            )}
          </li>
        </ol>

        {item.gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl">{home.case.galleryTitle}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {item.gallery.map((img) => (
                <li key={img.src} className={img.wide ? "sm:col-span-2 lg:col-span-3" : undefined}>
                  <CaseImage
                    image={img}
                    sizes={img.wide ? "(min-width: 1280px) 1216px, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    frameWidth={img.wide ? 0 : 400}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <p className="text-2xl font-bold tracking-tight lg:text-[1.75rem]">{common.pages.caseCta}</p>
          <a
            href="#audit"
            data-cta={`case_${item.slug}`}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-[10px] bg-accent px-7 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover"
          >
            {common.pages.caseCtaButton}
          </a>
        </div>
      </section>

      <AuditOffer t={home.audit} common={common} lang={lang} privacyHref={localizedPath(lang, "/privacy")} />
    </>
  );
}
