import contacts from "../../content/contacts.json";
import pricing from "../../content/pricing.json";
import type { CaseItem, CommonDict, HomeDict, Locale } from "./i18n";
import { siteUrl } from "./site";

export const orgId = `${siteUrl}/#organization`;
const abs = (path: string) => `${siteUrl}${path}`;

export function localBusinessSchema(locale: Locale, t: CommonDict) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": orgId,
    name: contacts.brand,
    description: t.meta.description,
    url: abs(`/${locale}`),
    logo: abs("/apple-icon"),
    image: abs(`/${locale}/opengraph-image`),
    telephone: contacts.phone,
    email: contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contacts.address.street,
      addressLocality: contacts.address.city,
      addressRegion: contacts.address.district,
      addressCountry: contacts.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: contacts.geo.latitude, longitude: contacts.geo.longitude },
    hasMap: contacts.yandexMaps,
    sameAs: Object.values(contacts.socials),
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    priceRange: `${pricing.currency}${Math.min(...pricing.plans.map((p) => p.price))}–${pricing.currency}${Math.max(...pricing.plans.map((p) => p.price))}`,
  };
}

export function servicesSchema(locale: Locale, t: HomeDict) {
  return t.services.items.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: `${s.includes}. ${s.result}.`,
    audience: { "@type": "Audience", audienceType: s.for },
    provider: { "@id": orgId },
    areaServed: { "@type": "City", name: "Tashkent" },
    url: abs(`/${locale}#services`),
    // SMM paketlari — content/pricing.json dagi haqiqiy narxlar
    ...(s.id === "smm" && {
      offers: pricing.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price,
        priceCurrency: "USD",
        description: t.pricing.features[p.id as keyof HomeDict["pricing"]["features"]].join(", "),
      })),
    }),
  }));
}

export function caseSchema(locale: Locale, item: CaseItem) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: abs(`/${locale}/cases/${item.slug}`),
    inLanguage: locale,
    genre: item.type,
    creator: { "@id": orgId },
    ...(item.name && { about: { "@type": "Organization", name: item.name } }),
    ...(item.cover && { image: abs(item.cover.src) }),
    ...(item.period && { temporalCoverage: item.period }),
  };
}
