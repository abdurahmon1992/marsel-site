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

// Sayt uslubida: oq fon, ink sarlavha (Manrope), *so'zlar* kobalt, marsel. logotipi.
export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "uz";
  const [common, home, ...fonts] = await Promise.all([
    getCommon(locale),
    getHome(locale),
    font("manrope-latin-700-normal.woff"),
    font("manrope-cyrillic-700-normal.woff"),
    font("manrope-latin-ext-700-normal.woff"),
    font("manrope-latin-500-normal.woff"),
    font("manrope-cyrillic-500-normal.woff"),
    font("sora-latin-700-normal.woff"),
  ]);
  const [m700, m700cyr, m700ext, m500, m500cyr, sora] = fonts;
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
          padding: "60px 76px",
          fontFamily: "Manrope, ManropeCyr, ManropeExt",
          color: tokens.ink,
          position: "relative",
        }}
      >
        {/* juda och dekor doira */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: tokens.surface2,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <BrandMarkSvg size={56} />
            <div style={{ display: "flex", fontFamily: "Sora", fontSize: 40, letterSpacing: -1 }}>
              marsel<span style={{ color: tokens.logoDot }}>.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              color: tokens.accent,
              background: tokens.white,
              border: `1.5px solid ${tokens.line}`,
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            {common.og.tag}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.12, letterSpacing: -2 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", columnGap: 18 }}>
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
                  <span key={j} style={{ color: accent ? tokens.accent : tokens.ink }}>
                    {word}
                  </span>
                ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 500 }}>
            <div style={{ fontSize: 26, color: tokens.muted }}>{common.og.services}</div>
            <div style={{ fontSize: 26 }}>{contacts.phoneDisplay}</div>
          </div>
          <div
            style={{
              display: "flex",
              background: tokens.accent,
              color: tokens.white,
              fontSize: 26,
              fontWeight: 700,
              padding: "18px 30px",
              borderRadius: 14,
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
        { name: "Manrope", data: m700, weight: 700, style: "normal" },
        { name: "Manrope", data: m500, weight: 500, style: "normal" },
        { name: "ManropeCyr", data: m700cyr, weight: 700, style: "normal" },
        { name: "ManropeCyr", data: m500cyr, weight: 500, style: "normal" },
        { name: "ManropeExt", data: m700ext, weight: 700, style: "normal" },
        { name: "Sora", data: sora, weight: 700, style: "normal" },
      ],
    },
  );
}
