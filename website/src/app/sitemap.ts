import type { MetadataRoute } from "next";
import { publicObjects, urlFor } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://upstreamzero.com";

const STATIC_ROUTES = [
  "",
  "/questions",
  "/questions/why-are-some-companies-recommended",
  "/faq",
  "/about",
  "/philosophy",
  "/research",
  "/methods",
  "/claims",
  "/services",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r}`,
  }));
  for (const obj of publicObjects()) {
    pages.push({ url: `${BASE}${urlFor(obj)}` });
  }
  return pages;
}
