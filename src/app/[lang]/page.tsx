import { notFound } from "next/navigation";
import contacts from "../../../content/contacts.json";
import { AuditOffer } from "@/components/home/AuditOffer";
import { CaseStudy } from "@/components/home/CaseStudy";
import { Clients } from "@/components/home/Clients";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";
import { Problems } from "@/components/home/Problems";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { getCases, getCommon, getHome, hasLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [t, common, cases] = await Promise.all([getHome(lang), getCommon(lang), getCases(lang)]);
  const featured = cases.items.find((c) => c.featured) ?? cases.items[0];

  return (
    <>
      <Hero t={t.hero} />
      <Clients title={t.clients.title} />
      <div className="pt-6 lg:pt-10">
        <Problems t={t.problems} />
      </div>
      <CaseStudy t={t.case} item={featured} href={localizedPath(lang, `/cases/${featured.slug}`)} />
      <Services t={t.services} />
      <Pricing t={t.pricing} />
      <Testimonials t={t.testimonials} />
      <AuditOffer
        t={t.audit}
        form={common.form}
        lang={lang}
        privacyHref={localizedPath(lang, "/privacy")}
        telegramUrl={contacts.socials.telegram}
      />
      <Faq t={t.faq} />
    </>
  );
}
