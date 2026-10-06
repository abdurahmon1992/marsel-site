import type { MetadataRoute } from "next";
import { defaultLocale, getCases, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Har bir sahifa uch tilda; har yozuvda hreflang muqobillari (x-default = uz).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await getCases(defaultLocale);
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/audit", priority: 0.9 },
    { path: "/cases", priority: 0.8 },
    ...items.map((c) => ({ path: `/cases/${c.slug}`, priority: 0.7 })),
    { path: "/privacy", priority: 0.3 },
  ];
  const now = new Date();

  return paths.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
      ["x-default", `${siteUrl}/${defaultLocale}${path}`],
    ]);
    return locales.map((l) => ({
      url: `${siteUrl}/${l}${path}`,
      lastModified: now,
      changeFrequency: path.startsWith("/cases/") || path === "/privacy" ? ("monthly" as const) : ("weekly" as const),
      priority,
      alternates: { languages },
    }));
  });
}
