import contacts from "../../../content/contacts.json";
import type { CommonDict, HomeDict } from "@/lib/i18n";
import { MailIcon, PhoneIcon, PinIcon, TelegramIcon } from "../icons";
import { LeadForm } from "../LeadForm";
import { Accent } from "../ui/Accent";
import { cardContainer, darkCard, sectionTitle } from "../ui/styles";
import { YandexMap } from "../YandexMap";

type Props = {
  t: HomeDict["audit"];
  common: CommonDict;
  lang: string;
  privacyHref: string;
};

export function AuditOffer({ t, common, lang, privacyHref }: Props) {
  const c = common.contactsBlock;
  return (
    <section id="audit" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={darkCard}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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
          <LeadForm t={common.form} lang={lang} privacyHref={privacyHref} telegramUrl={contacts.socials.telegram} />
        </div>

        {/* Kontaktlar + xarita */}
        <div id="contacts" className="mt-12 grid gap-8 border-t border-surface-border pt-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl uppercase">{c.title}</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`tel:${contacts.phone}`} data-track="phone_click" className="inline-flex items-center gap-3 text-xl font-semibold hover:text-accent">
                  <PhoneIcon className="size-5 text-accent" />
                  {contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contacts.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="telegram_click"
                  className="inline-flex items-center gap-3 hover:text-accent"
                >
                  <TelegramIcon className="size-5 text-accent" />@{contacts.socials.telegram.split("/").pop()}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-3 break-all hover:text-accent">
                  <MailIcon className="size-5 shrink-0 text-accent" />
                  {contacts.email}
                </a>
              </li>
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>
                  {common.footer.address}
                  <span className="block text-on-surface-muted">{common.footer.addressNote}</span>
                  <a
                    href={contacts.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold underline underline-offset-4 hover:text-accent"
                  >
                    {c.openMap} →
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <YandexMap
            src={contacts.yandexMapWidget}
            title={c.map}
            loadingLabel={c.mapLoad}
            className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-80"
          />
        </div>
      </div>
    </section>
  );
}
