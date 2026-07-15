import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Client Zero policy: machine readers are welcome — the propagation of
 *  published objects into evaluator behavior is a research subject
 *  (EXP-0001), so nothing is blocked. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://upstreamzero.com/sitemap.xml",
  };
}
