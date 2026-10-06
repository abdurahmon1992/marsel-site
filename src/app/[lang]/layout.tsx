import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Onest, Sora } from "next/font/google";
import { preload } from "react-dom";
import { getCommon, hasLocale, locales } from "@/lib/i18n";
import { htmlLang } from "@/lib/locales";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { alternates, isProduction, localizedPath, openGraphFor, siteUrl } from "@/lib/site";
import "../globals.css";

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
    openGraph: openGraphFor(lang, t.meta.title, t.meta.description),
    twitter: { card: "summary_large_image" },
    robots: isProduction ? undefined : { index: false, follow: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getCommon(lang);

  // Oswald (globals.css): lotin fayli hamma sahifada, kirill — faqat ru'da oldindan yuklanadi
  const fontOpts = { as: "font", type: "font/woff2", crossOrigin: "anonymous" } as const;
  preload("/fonts/oswald-latin-wght-normal.woff2", fontOpts);
  if (lang === "ru") preload("/fonts/oswald-cyrillic-wght-normal.woff2", fontOpts);

  return (
    <html
      lang={htmlLang[lang]}
      data-palette="ref"
      className={`${dmSans.variable} ${onest.variable} ${sora.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
