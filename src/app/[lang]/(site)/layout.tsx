import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCommon, hasLocale } from "@/lib/i18n";

// Asosiy sayt: to'liq header (menyu) va footer.
export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getCommon(lang);

  return (
    <>
      <Header locale={lang} t={t} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={lang} t={t} />
    </>
  );
}
