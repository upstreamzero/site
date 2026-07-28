import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { CATEGORIES, REQUIREMENTS } from "@/lib/evaluations";

export const metadata: Metadata = {
  title: { absolute: "How AI Evaluates Enterprise Vendors | Upstream Zero" },
  description:
    "How buyers actually evaluate enterprise software with AI: the categories, the requirements that decide the outcome, and what it takes to remain the recommendation as the evaluation gets specific.",
  ...pageMeta("/evaluations"),
};

export default function EvaluationsIndex() {
  const reqs = Object.values(REQUIREMENTS);

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Evaluations", "/evaluations"],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Evaluations</p>
            <h1 className="mt-5 max-w-[22ch]">
              How buyers actually evaluate with AI.
            </h1>
            <p className="lede mt-7 max-w-[62ch]">
              Buyers open with a broad question, then add the requirements that
              decide the purchase. Pick a category to see the evaluation, or a
              requirement to see how it changes the recommendation.
            </p>
          </div>
        </section>

        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">By category</p>
              <ul className="browse mt-8">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/evaluations/${c.slug}`}>
                      <span className="browse-title">{c.name}</span>
                      <span className="browse-meta">{c.buyerQuestion}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">By requirement</p>
              <ul className="browse mt-8">
                {reqs.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/requirements/${r.slug}`}>
                      <span className="browse-title">{r.name}</span>
                      <span className="browse-meta">Requirement</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
