import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";
import { webpSize } from "./imageSize";

import { defaultLocale, locales, type Locale } from "./locales";
import uzCommon from "../../content/uz/common.json";
import uzHome from "../../content/uz/home.json";
import uzCases from "../../content/uz/cases.json";
import uzPrivacy from "../../content/uz/privacy.json";

export { defaultLocale, locales, type Locale };

// O'zbekcha kontent asosiy: ru/en fayllar xuddi shu tuzilmada bo'lishi shart
// (kalit yetishmasa, TypeScript build vaqtida xato beradi).
export type CommonDict = typeof uzCommon;
export type HomeDict = typeof uzHome;
export type CasesDict = typeof uzCases;
type RawCase = CasesDict["items"][number];
/** width/height — manba fayl o'lchami (px), build paytida o'qiladi.
 *  bg: "dark" — qora fon (contain uchun); wide — galereyada to'liq enda, asl nisbatda. */
export type CaseImage = {
  src: string;
  alt: string;
  fit: string;
  bg?: string;
  wide?: boolean;
  width?: number;
  height?: number;
};
export type CaseItem = Omit<RawCase, "cover" | "gallery" | "beforeAfter"> & {
  cover: CaseImage | null;
  gallery: CaseImage[];
  beforeAfter: { before: CaseImage; after: CaseImage } | null;
};
export type PrivacyDict = typeof uzPrivacy;

const common: Record<Locale, () => Promise<CommonDict>> = {
  uz: async () => uzCommon,
  ru: () => import("../../content/ru/common.json").then((m) => m.default),
  en: () => import("../../content/en/common.json").then((m) => m.default),
};

const home: Record<Locale, () => Promise<HomeDict>> = {
  uz: async () => uzHome,
  ru: () => import("../../content/ru/home.json").then((m) => m.default),
  en: () => import("../../content/en/home.json").then((m) => m.default),
};

const cases: Record<Locale, () => Promise<CasesDict>> = {
  uz: async () => uzCases,
  ru: () => import("../../content/ru/cases.json").then((m) => m.default),
  en: () => import("../../content/en/cases.json").then((m) => m.default),
};

const privacy: Record<Locale, () => Promise<PrivacyDict>> = {
  uz: async () => uzPrivacy,
  ru: () => import("../../content/ru/privacy.json").then((m) => m.default),
  en: () => import("../../content/en/privacy.json").then((m) => m.default),
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getCommon = (locale: Locale) => common[locale]();
export const getHome = (locale: Locale) => home[locale]();
// Rasm fayli public/ da bo'lmasa, u e'tiborsiz qoldiriladi -> rasmsiz (tipografik) ko'rinish.
// Sahifalar statik: yangi rasm qo'shilgach, keyingi deployda avtomatik chiqadi.
const imageExists = (img: CaseImage | null | undefined): img is CaseImage =>
  !!img && existsSync(join(process.cwd(), "public", img.src));

const withWidth = (img: CaseImage): CaseImage => ({ ...img, ...webpSize(join(process.cwd(), "public", img.src)) });

/** Mijozlar lentasidagi rasmli logotip: fayl mavjud bo'lsa o'lchami bilan, aks holda null. */
export function logoImage(src: string) {
  const path = join(process.cwd(), "public", src);
  if (!existsSync(path)) return null;
  const size = webpSize(path);
  return size ? { src, ...size } : null;
}

export async function getCases(locale: Locale): Promise<{ items: CaseItem[] }> {
  const data = await cases[locale]();
  return {
    items: data.items.map((c) => {
      const ba = c.beforeAfter as CaseItem["beforeAfter"];
      return {
        ...c,
        cover: imageExists(c.cover) ? withWidth(c.cover) : null,
        gallery: (c.gallery as CaseImage[]).filter(imageExists).map(withWidth),
        beforeAfter:
          ba && imageExists(ba.before) && imageExists(ba.after)
            ? { before: withWidth(ba.before), after: withWidth(ba.after) }
            : null,
      };
    }),
  };
}
export const getPrivacy = (locale: Locale) => privacy[locale]();
