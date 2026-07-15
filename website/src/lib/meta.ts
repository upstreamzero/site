import type { Metadata } from "next";

export const SITE_URL = "https://upstreamzero.com";

/** Explicit per-page canonical + Open Graph URL, always on the apex
 *  domain. Every page must pass its own path — Next has no reliable
 *  pathname-relative canonical, and a layout-level canonical would stamp
 *  every page with the same URL. */
export function pageMeta(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { url: path, siteName: "Upstream Zero" },
  };
}
