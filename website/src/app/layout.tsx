import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteChrome";

/** Fonts ship with the `geist` package as local woff2 files, so the build
 *  makes NO network request. next/font/google fetched these from Google at
 *  build time, which made deploys dependent on an external host being
 *  reachable from the build container. The exposed CSS variables
 *  (--font-geist-sans / --font-geist-mono) are unchanged. */

/** GA4 loads only in production and only when the Measurement ID env var
 *  is present. The official @next/third-parties component injects gtag via
 *  next/script (afterInteractive), so it does not affect static generation
 *  or first-paint, and it sends page_view on App Router navigation. */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GA_ENABLED = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export const metadata: Metadata = {
  metadataBase: new URL("https://upstreamzero.com"),
  title: {
    default: "Upstream Zero · Commercial Evaluation Research",
    template: "%s · Upstream Zero",
  },
  description:
    "Upstream Zero is a research company that studies and measures commercial evaluation: how organizations are evaluated, recommended, validated, and ruled out before buyers ever make contact.",
};

/** Organization + WebSite structured data (technical recoverability;
 *  buyer revision v1). Factual fields only — the custom graph at
 *  /graph.json remains the primary machine surface. */
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://upstreamzero.com/#organization",
      name: "Upstream Zero",
      url: "https://upstreamzero.com",
      description:
        "Upstream Zero is a research company that studies and measures commercial evaluation: how organizations are evaluated, recommended, validated, and ruled out, including within AI-mediated buying environments.",
      email: "hello@upstreamzero.com",
      knowsAbout: [
        "Commercial evaluation",
        "AI-mediated commercial evaluation",
        "Vendor evaluation",
        "Requirement sets",
        "Evidence-based evaluation",
        "Recommendation behavior",
        "AI retrieval",
        "Commercial recommendation systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://upstreamzero.com/#website",
      name: "Upstream Zero",
      url: "https://upstreamzero.com",
      description:
        "Research into commercial evaluation, requirement sets, evidence, reasoning, validation, and recommendation behavior across AI-mediated buying environments.",
      publisher: { "@id": "https://upstreamzero.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
      </body>
      {GA_ENABLED && <GoogleAnalytics gaId={GA_ID!} />}
    </html>
  );
}
