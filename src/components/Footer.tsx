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
  const links = [
    { href: `${home}#services`, label: t.nav.services },
    { href: `${home}#cases`, label: t.nav.cases },
    { href: `${home}#pricing`, label: t.nav.pricing },
    { href: `${home}#audit`, label: t.cta.audit },
    { href: localizedPath(locale, "/privacy"), label: t.footer.privacy },
  ];

  return (
    <footer id="contacts" className="mt-6 bg-surface text-on-surface lg:mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
        <Link href={home} aria-label="MarSel Marketing">
          <Logo tone="light" />
        </Link>
        <p className="mt-4 max-w-sm text-sm text-on-surface-muted">{t.footer.tagline}</p>

        <nav aria-label="Footer" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold tracking-wide uppercase">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <h2 className="sr-only">{t.footer.contacts}</h2>
        <ul className="mt-10 flex flex-col items-center gap-x-10 gap-y-4 text-sm md:flex-row md:flex-wrap md:justify-center">
          <li>
            <a href={`tel:${contacts.phone}`} data-track="phone_click" className="inline-flex items-center gap-2 font-semibold hover:text-accent">
              <PhoneIcon className="size-4 text-accent" />
              {contacts.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-2 hover:text-accent">
              <MailIcon className="size-4 text-accent" />
              {contacts.email}
            </a>
          </li>
          <li>
            <a
              href={contacts.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 text-left hover:text-accent"
            >
              <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {t.footer.address}
                <span className="text-on-surface-muted"> · {t.footer.addressNote}</span>
              </span>
            </a>
          </li>
        </ul>

        <ul className="mt-10 flex gap-3" aria-label={t.footer.follow}>
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-track={label === "Telegram" ? "telegram_click" : undefined}
                className="grid size-11 place-items-center border border-surface-border transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-surface-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-on-surface-muted sm:px-6 lg:px-8">
          © {year} {contacts.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
