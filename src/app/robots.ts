import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deploylar indekslanmaydi
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
