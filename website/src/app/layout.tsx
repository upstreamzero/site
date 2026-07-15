import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://upstreamzero.com"),
  title: {
    default: "Upstream Zero — Commercial Evaluation Observatory",
    template: "%s · Upstream Zero",
  },
  description:
    "A research company studying commercial evaluation. Version 0.1 — First Light: the instrument is built; observations begin now. Claims are presented at their evidence tier, and most of them are Narrated.",
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
        "A research company studying commercial evaluation: how organizations are assessed, recommended, validated, and eliminated before selection — observed today through the behavior of AI evaluators.",
      email: "hello@upstreamzero.com",
      knowsAbout: [
        "commercial evaluation",
        "AI evaluator behavior",
        "recommendation stability",
        "evidence tiers",
        "machine representation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://upstreamzero.com/#website",
      name: "Upstream Zero — Commercial Evaluation Observatory",
      url: "https://upstreamzero.com",
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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
