import type { MetadataRoute } from "next";
import { publicObjects, urlFor, byId } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { PILLARS } from "@/lib/pillars";
import { BUSINESS_QUESTIONS } from "@/lib/businessQuestions";
import { COMPARISONS } from "@/lib/comparisons";
import { CATEGORIES, REQUIREMENTS, SCENARIOS } from "@/lib/evaluations";

export const dynamic = "force-static";

const BASE = "https://upstreamzero.com";

/** Commercial surfaces lead, priority-ordered: these are the pages the
 *  launch wants indexed first. Product pages are derived from the registry
 *  so the sitemap can never fall out of sync with the catalog. */
const STATIC_ROUTES = [
  "",
  "/solutions",
  "/pricing",
  "/evaluations",
  "/methodology",
  "/learn",
  "/glossary",
  "/questions",
  "/questions/why-are-some-companies-recommended",
  "/research",
  "/evidence",
  "/company",
  "/services",
  "/contact",
  "/faq",
  "/philosophy",
  "/methods",
  "/claims",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static + registry-driven routes carry no per-item content date, so we omit
  // lastModified rather than fabricate a uniform build date (a lastmod that is
  // always "today" on every page is a weak, distrusted signal).
  const routes = [
    ...STATIC_ROUTES,
    ...PILLARS.map((p) => `/learn/${p.slug}`),
    ...BUSINESS_QUESTIONS.map((b) => `/questions/${b.slug}`),
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
    ...CATEGORIES.map((c) => `/evaluations/${c.slug}`),
    ...Object.values(SCENARIOS).map(
      (s) => `/evaluations/${s.categorySlug}/${s.slug}`,
    ),
    ...Object.keys(REQUIREMENTS).map((slug) => `/requirements/${slug}`),
  ];
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
  }));
  // Product pages: dated by their engagement object when we have a real date.
  for (const p of PRODUCTS) {
    const eng = byId(p.id);
    const date = eng?.updated ?? eng?.created;
    pages.push({
      url: `${BASE}/solutions/${p.slug}`,
      ...(date ? { lastModified: date } : {}),
    });
  }
  // Research objects: real publication / revision dates, so crawlers can see
  // freshness and re-crawl updated evidence.
  for (const obj of publicObjects()) {
    const date = obj.updated ?? obj.created;
    pages.push({
      url: `${BASE}${urlFor(obj)}`,
      ...(date ? { lastModified: date } : {}),
    });
  }
  return pages;
}
