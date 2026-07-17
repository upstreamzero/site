import type { Metadata } from "next";

export const SITE_URL = "https://upstreamzero.com";

/** Explicit per-page canonical + Open Graph URL, always on the apex
 *  domain. Every page must pass its own path — Next has no reliable
 *  pathname-relative canonical, and a layout-level canonical would stamp
 *  every page with the same URL. og:title/og:description and the Twitter
 *  card are derived by Next from the page's title/description, so pages
 *  only declare those once. */
export function pageMeta(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { url: path, siteName: "Upstream Zero", type: "website" },
    twitter: { card: "summary" },
  };
}

/** Page-type JSON-LD for hub pages, linked to the site-wide Organization
 *  and WebSite nodes declared in the root layout. Truthful typing only:
 *  AboutPage for /about, CollectionPage for object registers. */
export function pageLd(
  type: "AboutPage" | "CollectionPage" | "WebPage",
  name: string,
  path: string,
  description: string,
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    name,
    url: `${SITE_URL}${path}`,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  });
}
