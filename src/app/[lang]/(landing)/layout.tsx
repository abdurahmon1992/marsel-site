import Link from "next/link";
import { notFound } from "next/navigation";
import contacts from "../../../../content/contacts.json";
import { PhoneIcon } from "@/components/icons";
import { LangSwitcher } from "@/components/LangSwitcher";
import { Logo } from "@/components/Logo";
import { getCommon, hasLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";

// Reklama lendingi: menyusiz, chalg'ituvchi havolalarsiz — faqat taklif va forma.
export default async function LandingLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getCommon(lang);

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex h-(--header-h) max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href={localizedPath(lang)} aria-label="MarSel Marketing" className="mr-auto">
            <Logo />
          </Link>
          <LangSwitcher current={lang} label={t.lang.label} className="hidden sm:flex" />
          <a
            href={`tel:${contacts.phone}`}
            data-track="phone_click"
            aria-label={contacts.phoneDisplay}
            className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap hover:text-accent"
          >
            <PhoneIcon className="size-4 text-accent" />
            <span className="hidden min-[420px]:inline">{contacts.phoneDisplay}</span>
          </a>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {contacts.brand}. {t.footer.rights}
          </p>
          <Link href={localizedPath(lang, "/privacy")} className="underline hover:text-text">
            {t.footer.privacy}
          </Link>
        </div>
      </footer>
    </>
  );
}
