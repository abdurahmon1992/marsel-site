import Link from "next/link";
import type { CommonDict, Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

type Props = { locale: Locale; t: CommonDict };

export function Header({ locale, t }: Props) {
  const home = localizedPath(locale);
  const items = [
    { href: `${home}#services`, label: t.nav.services },
    { href: localizedPath(locale, "/cases"), label: t.nav.cases },
    { href: `${home}#pricing`, label: t.nav.pricing },
    { href: `${home}#contacts`, label: t.nav.contacts },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/85">
      <div className="relative mx-auto flex h-(--header-h) max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link href={home} aria-label="MarSel Marketing" className="mr-auto shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LangSwitcher current={locale} label={t.lang.label} className="hidden md:flex" />

        {/* Mobilda ham doim ko'rinadi */}
        <Link
          href={`${home}#audit`}
          data-cta="header"
          className="inline-flex h-10 shrink-0 items-center rounded-[10px] bg-accent px-3.5 text-sm font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-hover sm:px-5"
        >
          {t.cta.audit}
        </Link>

        <MobileNav items={items} openLabel={t.menu.open} closeLabel={t.menu.close}>
          <LangSwitcher current={locale} label={t.lang.label} className="w-fit" />
        </MobileNav>
      </div>
    </header>
  );
}
