"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeLabels, locales, type Locale } from "@/lib/locales";

// Tanlangan til eslab qolinadi: keyingi safar "/" ochilganda proxy shu tilga yo'naltiradi.
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

type Props = { current: Locale; label: string; className?: string };

// Joriy sahifaning o'zini boshqa tilda ochadi (/uz/cases -> /ru/cases).
export function LangSwitcher({ current, label, className = "" }: Props) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className={`flex items-center rounded-full bg-surface p-1 ${className}`}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            lang={locale}
            title={localeLabels[locale]}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active ? "bg-bg text-text shadow-sm" : "text-muted hover:text-text"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
