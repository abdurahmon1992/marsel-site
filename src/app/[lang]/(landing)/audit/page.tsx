import type { Metadata } from "next";
import { notFound } from "next/navigation";
import contacts from "../../../../../content/contacts.json";
import pricing from "../../../../../content/pricing.json";
import { LeadForm } from "@/components/LeadForm";
import { Accent } from "@/components/ui/Accent";
import { cardContainer, darkCard } from "@/components/ui/styles";
import { getCommon, getHome, hasLocale } from "@/lib/i18n";
import { alternates, localizedPath } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/audit">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { pages } = await getCommon(lang);
  return {
    title: pages.audit.title,
    description: pages.audit.description,
    alternates: alternates(lang, "/audit"),
    openGraph: { title: pages.audit.title, description: pages.audit.description },
  };
}

export default async function AuditPage({ params }: PageProps<"/[lang]/audit">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [common, home] = await Promise.all([getCommon(lang), getHome(lang)]);
  const serviceOptions = [...home.services.items.map((s) => s.name), ...pricing.plans.map((p) => p.name)];

  return (
    <section id="audit" className={`${cardContainer} py-3 sm:py-6 lg:py-10`}>
      <div className={`${darkCard} grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16`}>
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl">
            <Accent text={home.audit.title} />
          </h1>
          <p className="mt-6 max-w-lg text-lg text-on-surface-muted">{home.audit.text}</p>
          <ul className="mt-8 space-y-3">
            {home.audit.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2.5 shrink-0 bg-accent" />
                {p}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid gap-4 border-t border-surface-border pt-6 sm:grid-cols-3">
            {home.hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-on-surface-muted">{s.label}</dt>
                <dd className="font-display text-2xl font-bold whitespace-nowrap xl:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {home.process.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="font-display text-2xl leading-none font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{step.title}</span>
              </li>
            ))}
          </ol>
        </div>

        <LeadForm
          t={common.form}
          lang={lang}
          privacyHref={localizedPath(lang, "/privacy")}
          telegramUrl={contacts.socials.telegram}
          variant="full"
          serviceOptions={serviceOptions}
        />
      </div>
    </section>
  );
}
