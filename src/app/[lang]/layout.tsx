import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Manrope, Onest, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCommon, hasLocale, locales } from "@/lib/i18n";
import { htmlLang } from "@/lib/locales";
import { alternates, siteUrl } from "@/lib/site";
import "../globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
// Faqat kirill glifi uchun (ru). preload o'chiq — uz/en sahifalarda umuman yuklanmaydi.
const manrope = Manrope({ subsets: ["cyrillic"], variable: "--font-manrope", display: "swap", preload: false });
const onest = Onest({ subsets: ["cyrillic"], variable: "--font-onest", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getCommon(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: "%s — MarSel Marketing" },
    description: t.meta.description,
    alternates: alternates(lang),
    openGraph: {
      type: "website",
      siteName: "MarSel Marketing",
      locale: htmlLang[lang],
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getCommon(lang);

  return (
    <html
      lang={htmlLang[lang]}
      className={`${sora.variable} ${dmSans.variable} ${manrope.variable} ${onest.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.skipLink}
        </a>
        <Header locale={lang} t={t} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} t={t} />
      </body>
    </html>
  );
}
