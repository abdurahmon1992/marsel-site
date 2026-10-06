import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Onest, Oswald, Sora } from "next/font/google";
import { getCommon, hasLocale, locales } from "@/lib/i18n";
import { htmlLang } from "@/lib/locales";
import { alternates, siteUrl } from "@/lib/site";
import "../globals.css";

// Sarlavhalar: Oswald. CSS'da barcha subsetlar (kirill ham) bor; `subsets` faqat qaysi
// fayl oldindan yuklanishini belgilaydi — kirill fayli faqat ru sahifada yuklanadi.
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });
// Matn: DM Sans; kirill glifi Onest'dan (preload o'chiq — uz/en sahifalarda yuklanmaydi)
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const onest = Onest({ subsets: ["cyrillic"], variable: "--font-onest", display: "swap", preload: false });
// Faqat "marsel." wordmark uchun (logotip o'zgarmaydi)
const sora = Sora({ subsets: ["latin"], weight: "700", variable: "--font-sora", display: "swap", preload: false });

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
      data-palette="ref"
      className={`${oswald.variable} ${dmSans.variable} ${onest.variable} ${sora.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
