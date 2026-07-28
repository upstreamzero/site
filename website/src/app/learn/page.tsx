import Link from "next/link";
import type { Metadata } from "next";
import { PILLARS, HUB_PILLAR } from "@/lib/pillars";
import { COMPARISONS } from "@/lib/comparisons";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Learn: How AI Decides Who Buyers Choose | Upstream Zero" },
  description:
    "Plain-language guides to showing up in AI answers, Google AI Mode, and ChatGPT recommendations, and how AI decides which companies buyers end up choosing.",
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
              "Learn: How AI Decides Who Buyers Choose | Upstream Zero",
              "/learn",
              "Guides to showing up in AI answers, AI buying tools, and how AI decides who buyers choose.",
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
              How buyers use AI to choose companies, in plain words.
            </h1>
            <p className="lede mt-7">
              Clear explanations of the terms buyers and marketers throw around,
              and how each one connects to the question underneath them all: how
              a buyer decides which company to choose.
            </p>
            <p className="muted mt-5 max-w-[64ch]">
              Learn explains the ideas and the words behind how AI decides who
              to recommend. Research is where we keep what we have actually
              observed.
            </p>
            <p className="mt-8">
              <Link
                href={`/learn/${HUB_PILLAR.slug}`}
                className="btn-ghost"
              >
                Start with how AI decides who wins
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

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Comparisons</p>
            <h2 className="mt-5 max-w-[24ch]">
              How the terms relate, side by side.
            </h2>
            <p className="lede mt-6 max-w-[62ch]">
              The questions buyers actually ask, answered by putting two terms
              side by side and showing where each one sits in how a buyer
              decides.
            </p>
            <ul className="browse mt-8">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/compare/${c.slug}`}>
                    <span className="browse-title">
                      {c.a} vs {c.b}
                    </span>
                    <span className="browse-meta">Comparison</span>
                  </Link>
                </li>
              ))}
            </ul>
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
