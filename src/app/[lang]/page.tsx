import Link from "next/link";
import { notFound } from "next/navigation";
import { getHome, hasLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";

// 1-bosqich: faqat Hero. Qolgan bloklar 2-bosqichda qo'shiladi.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { hero } = await getHome(lang);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 md:pt-24 md:pb-28">
      <h1 className="max-w-3xl text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
        {hero.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-pretty text-muted md:text-xl">{hero.subtitle}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="#audit"
          data-cta="hero"
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          {hero.primary}
        </Link>
        <Link
          href={localizedPath(lang, "/cases")}
          className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-7 font-semibold text-text transition-colors hover:bg-border"
        >
          {hero.secondary}
        </Link>
      </div>

      <dl className="mt-14 grid gap-4 sm:grid-cols-3">
        {hero.stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface p-5">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display text-2xl font-bold text-accent md:text-3xl">{s.value}</span>
              <span className="mt-1 block text-sm text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
