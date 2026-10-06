import { notFound } from "next/navigation";
import { AuditOffer } from "@/components/home/AuditOffer";
import { CaseStudy } from "@/components/home/CaseStudy";
import { Clients } from "@/components/home/Clients";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";
import { Problems } from "@/components/home/Problems";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/JsonLd";
import { getCases, getCommon, getHome, hasLocale } from "@/lib/i18n";
import { servicesSchema } from "@/lib/schema";
import { localizedPath } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [t, common, cases] = await Promise.all([getHome(lang), getCommon(lang), getCases(lang)]);

  return (
    <>
      <JsonLd data={servicesSchema(lang, t)} />
      <Hero t={t.hero} />
      <Clients title={t.clients.title} />
      <div className="pt-6 lg:pt-10">
        <Problems t={t.problems} />
      </div>
      <CaseStudy
        t={t.case}
        items={cases.items}
        caseHref={(slug) => localizedPath(lang, `/cases/${slug}`)}
        allHref={localizedPath(lang, "/cases")}
      />
      <Process t={t.process} />
      <Services t={t.services} />
      <Pricing t={t.pricing} />
      <Testimonials t={t.testimonials} />
      <AuditOffer t={t.audit} common={common} lang={lang} privacyHref={localizedPath(lang, "/privacy")} />
      {/* FAQ: content'da items bo'sh bo'lsa chizilmaydi */}
      <Faq t={t.faq} />
    </>
  );
}
