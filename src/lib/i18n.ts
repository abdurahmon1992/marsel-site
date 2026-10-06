import "server-only";

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
export type CaseItem = CasesDict["items"][number];
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
export const getCases = (locale: Locale) => cases[locale]();
export const getPrivacy = (locale: Locale) => privacy[locale]();
