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

/** The minimal shape of a research object needed for machine surfaces.
 *  Structural on purpose: no import from content.ts, so meta stays
 *  dependency-free. */
type LdObject = {
  id: string;
  type: string;
  title: string;
  status: string;
  tier?: string;
};

/** One derivation for the object description, shared by page metadata and
 *  object-level JSON-LD so the two can never drift apart. Everything comes
 *  from the object's own frontmatter; tier is omitted when absent. */
export function objectDescription(obj: LdObject): string {
  const typeLabel = obj.type.charAt(0).toUpperCase() + obj.type.slice(1);
  const tierNote = obj.tier ? ` Presented at evidence tier: ${obj.tier}.` : "";
  return `${typeLabel} ${obj.id} in the Upstream Zero commercial evaluation research graph. Status: ${obj.status}.${tierNote}`;
}

/** Object-level WebPage JSON-LD, fully derived from frontmatter.
 *  additionalProperty was verified against the schema.org vocabulary and is
 *  NOT valid on WebPage (domainIncludes: MerchantReturnPolicy, Offer, Place,
 *  Product, QualitativeValue, QuantitativeValue; WebPage inherits only from
 *  CreativeWork and Thing), so epistemic state travels in the derived
 *  description string instead, which already carries type, ID, status, and
 *  tier verbatim. Serialization escapes &, <, and > so titles can never
 *  break out of the script element. */
export function objectLd(obj: LdObject, path: string): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: obj.title,
    description: objectDescription(obj),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
  return JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
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
