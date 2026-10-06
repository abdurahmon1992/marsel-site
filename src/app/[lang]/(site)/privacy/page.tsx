import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { container } from "@/components/ui/styles";
import { getCommon, getPrivacy, hasLocale } from "@/lib/i18n";
import { alternates, openGraphFor } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { pages } = await getCommon(lang);
  return {
    title: pages.privacy.title,
    description: pages.privacy.description,
    alternates: alternates(lang, "/privacy"),
    openGraph: openGraphFor(lang, pages.privacy.title, pages.privacy.description),
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getPrivacy(lang);

  return (
    <>
      <PageHeader title={t.title} intro={`${t.updatedLabel}: ${t.updated.split("-").reverse().join(".")}`} />
      <article className={`${container} pb-16 lg:pb-24`}>
        <div className="max-w-3xl border-t border-line">
          {t.sections.map((s, i) => (
            <section key={s.h} className="border-b border-line py-8">
              <h2 className="text-xl sm:text-2xl">
                <span className="mr-1 text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span> {s.h}
              </h2>
              <div className="mt-4 space-y-3 text-muted">
                {s.p.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
