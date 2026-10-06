import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Sora } from "next/font/google";
import { getCommon, hasLocale, locales } from "@/lib/i18n";
import { htmlLang } from "@/lib/locales";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { alternates, isProduction, localizedPath, openGraphFor, siteUrl } from "@/lib/site";
import "../globals.css";

// Yagona shrift: Manrope (lotin + kirill) — ruscha ham o'zbekcha bilan bir xil ko'rinadi
const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope", display: "swap" });
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
    openGraph: openGraphFor(lang, t.meta.title, t.meta.description),
    twitter: { card: "summary_large_image" },
    robots: isProduction ? undefined : { index: false, follow: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getCommon(lang);

  return (
    <html
      lang={htmlLang[lang]}
      className={`${manrope.variable} ${sora.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-[10px] bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.skipLink}
        </a>
        <JsonLd data={localBusinessSchema(lang, t)} />
        {children}
        <Analytics
          ids={{
            ga4: process.env.NEXT_PUBLIC_GA4_ID,
            metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID,
            ym: process.env.NEXT_PUBLIC_YM_ID,
          }}
          t={t.consent}
          privacyHref={localizedPath(lang, "/privacy")}
        />
      </body>
    </html>
  );
}
