import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/CaseCard";
import { CasesGrid } from "@/components/CasesGrid";
import { AuditOffer } from "@/components/home/AuditOffer";
import { PageHeader } from "@/components/PageHeader";
import { container } from "@/components/ui/styles";
import { getCases, getCommon, getHome, hasLocale } from "@/lib/i18n";
import { alternates, localizedPath } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/cases">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { pages } = await getCommon(lang);
  return {
    title: pages.cases.title,
    description: pages.cases.description,
    alternates: alternates(lang, "/cases"),
    openGraph: { title: pages.cases.title, description: pages.cases.description },
  };
}

export default async function CasesPage({ params }: PageProps<"/[lang]/cases">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [common, home, cases] = await Promise.all([getCommon(lang), getHome(lang), getCases(lang)]);

  return (
    <>
      <PageHeader title={common.pages.cases.h1} intro={common.pages.cases.intro} />
      <section className={`${container} pb-16 lg:pb-24`}>
        <CasesGrid
          label={common.pages.cases.title}
          filters={common.pages.cases.filters}
          items={cases.items.map((c) => ({
            slug: c.slug,
            tags: c.tags,
            card: <CaseCard item={c} href={localizedPath(lang, `/cases/${c.slug}`)} more={home.case.more} />,
          }))}
        />
      </section>
      <AuditOffer t={home.audit} common={common} lang={lang} privacyHref={localizedPath(lang, "/privacy")} />
    </>
  );
}
