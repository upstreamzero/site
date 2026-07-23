/**
 * The commercial product catalog: a presentation-layer ordering over the
 * engagement objects that carry the canonical data. Slugs give products
 * clean marketing URLs (/solutions/<slug>) while price, scope, timeline,
 * and non-promises all resolve from the engagement's own frontmatter, so
 * nothing here can drift from the canonical source.
 *
 * Order is the order shown on /pricing and /solutions: entry, core,
 * ongoing. Adding a product is one line here plus the engagement object.
 */
export const PRODUCTS: { slug: string; id: string }[] = [
  { slug: "category-intelligence-report", id: "ENG-7" },
  { slug: "commercial-evaluation-audit", id: "ENG-1" },
  { slug: "selection-intelligence", id: "ENG-4" },
];

export function productSlugFor(id: string): string | undefined {
  return PRODUCTS.find((p) => p.id === id)?.slug;
}
