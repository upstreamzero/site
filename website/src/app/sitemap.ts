import type { MetadataRoute } from "next";
import { publicObjects, urlFor } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { PILLARS } from "@/lib/pillars";

export const dynamic = "force-static";

const BASE = "https://upstreamzero.com";

/** Commercial surfaces lead, priority-ordered: these are the pages the
 *  launch wants indexed first. Product pages are derived from the registry
 *  so the sitemap can never fall out of sync with the catalog. */
const STATIC_ROUTES = [
  "",
  "/solutions",
  "/pricing",
  "/methodology",
  "/learn",
  "/glossary",
  "/questions",
  "/questions/why-are-some-companies-recommended",
  "/research",
  "/about",
  "/services",
  "/contact",
  "/faq",
  "/philosophy",
  "/methods",
  "/claims",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...PRODUCTS.map((p) => `/solutions/${p.slug}`),
    ...PILLARS.map((p) => `/learn/${p.slug}`),
  ];
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
  }));
  for (const obj of publicObjects()) {
    pages.push({ url: `${BASE}${urlFor(obj)}` });
  }
  return pages;
}
