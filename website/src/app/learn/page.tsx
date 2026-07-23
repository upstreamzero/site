import Link from "next/link";
import type { Metadata } from "next";
import { PILLARS, HUB_PILLAR } from "@/lib/pillars";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Learn: AI, Search, and Commercial Evaluation | Upstream Zero" },
  description:
    "Plain-language references on AI visibility, GEO, AI SEO, Google AI Mode, ChatGPT recommendations, and how they relate to commercial evaluation: the decision that determines who a buyer selects.",
  ...pageMeta("/learn"),
};

const GROUPS: { label: string; kind: "concept" | "tactic" | "platform" }[] = [
  { label: "Concepts", kind: "concept" },
  { label: "Discoverability tactics", kind: "tactic" },
  { label: "AI buying surfaces", kind: "platform" },
];

export default function Learn() {
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "Learn: AI, Search, and Commercial Evaluation | Upstream Zero",
              "/learn",
              "References on AI visibility, GEO, AI SEO, AI buying surfaces, and commercial evaluation.",
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Learn", "/learn"],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Learn</p>
            <h1 className="mt-5 max-w-[22ch]">
              The vocabulary of AI-mediated buying, defined plainly.
            </h1>
            <p className="lede mt-7">
              Clear references on the terms buyers and marketers use, and how
              each one relates to the question underneath them all: how a buyer
              decides which company to choose.
            </p>
            <p className="mt-8">
              <Link
                href={`/learn/${HUB_PILLAR.slug}`}
                className="btn-ghost"
              >
                Start with commercial evaluation
              </Link>
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell space-y-14">
            {GROUPS.map((g) => (
              <div key={g.kind}>
                <p className="eyebrow">{g.label}</p>
                <ul className="browse mt-6">
                  {PILLARS.filter((p) => p.kind === g.kind).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/learn/${p.slug}`}>
                        <span className="browse-title">
                          {p.term}
                          {p.aka ? ` (${p.aka})` : ""}
                          {p.hub ? " · the anchor" : ""}
                        </span>
                        <span className="browse-meta">Reference</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              Ready to see it applied to your category?
            </h2>
            <Link href="/solutions" className="btn-lime">
              View the products
            </Link>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
