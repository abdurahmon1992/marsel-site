import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import contacts from "../../../content/contacts.json";
import { getCommon, getHome, hasLocale, locales } from "@/lib/i18n";
import { BrandMarkSvg } from "@/lib/brandMark";
import { tokens } from "@/lib/tokens";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MarSel Marketing";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));

// Sayt uslubida: oq fon, katta qora UPPERCASE sarlavha (Oswald), *so'zlar* qizil.
export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "uz";
  const [common, home, latin, latinExt, cyr] = await Promise.all([
    getCommon(locale),
    getHome(locale),
    font("oswald-latin-700-normal.woff"),
    font("oswald-latin-ext-700-normal.woff"),
    font("oswald-cyrillic-700-normal.woff"),
  ]);
  const lines = home.hero.title.split("\n");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: tokens.white,
          padding: "56px 72px 56px 88px",
          fontFamily: "Oswald, OswaldCyr, OswaldExt",
          color: tokens.ink,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 20, background: tokens.red }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <BrandMarkSvg size={60} />
            <div style={{ fontSize: 34, letterSpacing: 1 }}>MARSEL MARKETING</div>
          </div>
          <div style={{ fontSize: 28, color: tokens.red, textTransform: "uppercase", letterSpacing: 2 }}>{common.og.tag}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, lineHeight: 1.14, textTransform: "uppercase" }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", columnGap: 22 }}>
              {/* so'zlar alohida — uzun qator o'z-o'zidan keyingi qatorga ko'chadi */}
              {line
                .split(/(\*[^*]+\*)/g)
                .filter(Boolean)
                .flatMap((part) =>
                  part
                    .replace(/\*/g, "")
                    .split(" ")
                    .filter(Boolean)
                    .map((word) => ({ word, accent: part.startsWith("*") })),
                )
                .map(({ word, accent }, j) => (
                  <span key={j} style={{ color: accent ? tokens.red : tokens.ink }}>
                    {word}
                  </span>
                ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 30, color: tokens.card, opacity: 0.7 }}>{common.og.services}</div>
            <div style={{ fontSize: 30 }}>{contacts.phoneDisplay}</div>
          </div>
          <div
            style={{
              display: "flex",
              background: tokens.red,
              color: tokens.white,
              fontSize: 32,
              padding: "18px 30px",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {common.og.cta}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Oswald", data: latin, weight: 700, style: "normal" },
        { name: "OswaldCyr", data: cyr, weight: 700, style: "normal" },
        { name: "OswaldExt", data: latinExt, weight: 700, style: "normal" },
      ],
    },
  );
}
