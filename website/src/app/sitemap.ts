import type { MetadataRoute } from "next";
import { loadGraph, urlFor } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://upstreamzero.com";

const STATIC_ROUTES = [
  "",
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
  for (const obj of loadGraph().values()) {
    pages.push({ url: `${BASE}${urlFor(obj)}` });
  }
  return pages;
}
