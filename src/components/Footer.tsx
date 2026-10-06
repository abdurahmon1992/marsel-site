import Link from "next/link";
import contacts from "../../content/contacts.json";
import type { CommonDict, Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";
import { InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon, TelegramIcon } from "./icons";
import { Logo } from "./Logo";

type Props = { locale: Locale; t: CommonDict };

const socials = [
  { href: contacts.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: contacts.socials.telegram, label: "Telegram", Icon: TelegramIcon },
  { href: contacts.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

export function Footer({ locale, t }: Props) {
  const home = localizedPath(locale);
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="mt-auto bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
        <div className="space-y-4">
          <Link href={home} aria-label="MarSel Marketing" className="inline-block">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          <ul className="flex gap-2" aria-label={t.footer.follow}>
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-track={label === "Telegram" ? "telegram_click" : undefined}
                  className="grid size-10 place-items-center rounded-full bg-bg text-text transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold">{t.footer.contacts}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`tel:${contacts.phone}`}
                data-track="phone_click"
                className="inline-flex items-center gap-2 font-semibold hover:text-accent"
              >
                <PhoneIcon className="size-4 text-accent" />
                {contacts.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-2 break-all hover:text-accent">
                <MailIcon className="size-4 shrink-0 text-accent" />
                {contacts.email}
              </a>
            </li>
            <li>
              <a
                href={contacts.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                data-track="telegram_click"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <TelegramIcon className="size-4 text-accent" />
                @{contacts.socials.telegram.split("/").pop()}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold">{t.footer.addressTitle}</h2>
          <address className="flex gap-2 text-sm not-italic">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>
              {t.footer.address}
              <span className="block text-muted">{t.footer.addressNote}</span>
              <a
                href={contacts.yandexMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-medium text-accent hover:underline"
              >
                {t.footer.openMap} →
              </a>
            </span>
          </address>
        </div>

        <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
          <Link href={`${home}#services`} className="hover:text-accent">{t.nav.services}</Link>
          <Link href={localizedPath(locale, "/cases")} className="hover:text-accent">{t.nav.cases}</Link>
          <Link href={`${home}#pricing`} className="hover:text-accent">{t.nav.pricing}</Link>
          <Link href={localizedPath(locale, "/privacy")} className="hover:text-accent">{t.footer.privacy}</Link>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {year} {contacts.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
