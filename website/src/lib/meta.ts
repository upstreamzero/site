import type { Metadata } from "next";

export const SITE_URL = "https://upstreamzero.com";

/** Explicit per-page canonical + Open Graph URL, always on the apex
 *  domain. Every page must pass its own path — Next has no reliable
 *  pathname-relative canonical, and a layout-level canonical would stamp
 *  every page with the same URL. og:title/og:description and the Twitter
 *  card are derived by Next from the page's title/description, so pages
 *  only declare those once. */
/** One branded preview image for the whole site. Nested route segments do
 *  not inherit a root-segment `opengraph-image` file convention, so the
 *  image is referenced explicitly here instead: every page that calls
 *  pageMeta gets it, while keeping its own title and description. */
const SHARE_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Upstream Zero. Commercial intelligence for AI-mediated commercial evaluation.",
};

export function pageMeta(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      url: path,
      siteName: "Upstream Zero",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [SHARE_IMAGE] },
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
  return `${typeLabel} ${obj.id} in the Upstream Zero commercial evaluation evidence graph. Status: ${obj.status}.${tierNote}`;
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

/** Escape a serialized JSON-LD string so titles/descriptions can never
 *  break out of the <script> element. */
function escapeLd(s: string): string {
  return s
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

/** Product + Offer JSON-LD for a commercial product page, derived from the
 *  engagement object. Offer carries the starting price truthfully via
 *  priceSpecification with a "starting from" note; we do not assert a fixed
 *  price the way a fixed SKU would. */
export function productLd(p: {
  name: string;
  description: string;
  path: string;
  priceStart?: string; // "$5,000"
  priceUnit?: string; // "per category"
}): string {
  const amount = p.priceStart ? p.priceStart.replace(/[^0-9.]/g, "") : undefined;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}${p.path}#product`,
    name: p.name,
    description: p.description,
    brand: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}${p.path}`,
  };
  if (amount) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price: amount,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: amount,
        priceCurrency: "USD",
        valueAddedTaxIncluded: false,
        description: `Starting price${p.priceUnit ? `, ${p.priceUnit}` : ""}. Confirmed before work begins.`,
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${p.path}`,
    };
  }
  return escapeLd(JSON.stringify(data));
}

/** BreadcrumbList JSON-LD. Pass ordered [name, path] pairs, apex-rooted. */
export function breadcrumbLd(trail: [string, string][]): string {
  return escapeLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map(([name, path], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: `${SITE_URL}${path}`,
      })),
    }),
  );
}

/** FAQPage JSON-LD from question/answer pairs. */
export function faqLd(qa: { q: string; a: string }[]): string {
  return escapeLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: qa.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    }),
  );
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
