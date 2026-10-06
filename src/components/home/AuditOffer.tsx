import type { CommonDict, HomeDict } from "@/lib/i18n";
import { LeadForm } from "../LeadForm";
import { Accent } from "../ui/Accent";
import { cardContainer, darkCard, sectionTitle } from "../ui/styles";

type Props = {
  t: HomeDict["audit"];
  form: CommonDict["form"];
  lang: string;
  privacyHref: string;
  telegramUrl: string;
};

export function AuditOffer({ t, form, lang, privacyHref, telegramUrl }: Props) {
  return (
    <section id="audit" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={`${darkCard} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <h2 className={sectionTitle}>
            <Accent text={t.title} />
          </h2>
          <p className="mt-6 max-w-md text-lg text-on-surface-muted">{t.text}</p>
          <ul className="mt-8 space-y-3">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2.5 shrink-0 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm t={form} lang={lang} privacyHref={privacyHref} telegramUrl={telegramUrl} />
      </div>
    </section>
  );
}
