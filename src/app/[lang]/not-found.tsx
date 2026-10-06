import Link from "next/link";
import { lang } from "next/root-params";
import { defaultLocale, getCommon, hasLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/site";

export default async function NotFound() {
  const current = await lang();
  const locale = hasLocale(current) ? current : defaultLocale;
  const t = await getCommon(locale);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 md:py-32">
      <p className="font-display text-7xl font-bold text-accent md:text-8xl">
        404<span className="text-accent-2">.</span>
      </p>
      <h1 className="mt-6 text-3xl font-bold md:text-4xl">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-muted">{t.notFound.text}</p>
      <Link
        href={localizedPath(locale)}
        className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-7 font-semibold text-on-accent hover:bg-accent-hover"
      >
        {t.notFound.home}
      </Link>
    </section>
  );
}
