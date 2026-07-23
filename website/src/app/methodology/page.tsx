import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Methodology | Upstream Zero" },
  description:
    "How Upstream Zero works: define the commercial problem, observe the initial recommendation, apply real buyer requirements, observe how the recommendation evolves, and prioritize evidence-based decisions.",
  ...pageMeta("/methodology"),
};

/** The public method. Simplified on purpose: it builds trust without
 *  revealing proprietary protocols. */
const STEPS = [
  {
    n: "01",
    title: "Understand the buyer problem",
    body: "We begin with the category, buyer, competitor, or selection outcome your leadership team needs to understand.",
  },
  {
    n: "02",
    title: "Observe the initial recommendation",
    body: "We determine how major AI platforms interpret the problem, compare alternatives, and form an initial recommendation set.",
  },
  {
    n: "03",
    title: "Apply requirement pressure",
    body: "We introduce the security, integration, scale, geography, budget, and operational requirements a real buyer adds as the evaluation advances.",
  },
  {
    n: "04",
    title: "Observe how the recommendation evolves",
    body: "We identify the exact follow-up where a company is removed, displaced, or remains the logical choice.",
  },
  {
    n: "05",
    title: "Prioritize evidence-based decisions",
    body: "We translate what we observed into a ranked set of decisions: what matters most, what to test next, and what the evidence does not yet support.",
  },
];

/** Illustrative flow. Representative, names no vendors as an outcome. */
const FLOW = [
  {
    k: "Initial buyer question",
    v: "“What is the best customer data platform for a healthcare organization?”",
  },
  {
    k: "Initial recommendation",
    v: "A broad set of enterprise CDPs, before any real requirement is introduced.",
  },
  {
    k: "Requirement follow-up",
    v: "The buyer adds detail: their EHR, where data already lives, who builds audiences, batch or real time.",
  },
  {
    k: "The set narrows",
    v: "Platforms that do not fit the stated architecture drop out.",
  },
  {
    k: "More requirements",
    v: "Compliance, data residency, and activation targets are introduced.",
  },
  {
    k: "Final recommendation",
    v: "It reflects the buyer's complete requirement set, not the opening question. The recommendation evolved because the requirements did.",
  },
];

export default function Methodology() {
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "WebPage",
              "Methodology | Upstream Zero",
              "/methodology",
              "How Upstream Zero observes commercial evaluation and turns it into prioritized, evidence-based decisions.",
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Methodology", "/methodology"],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Methodology</p>
            <h1 className="mt-5 max-w-[20ch]">
              A defensible answer to what your company should do next.
            </h1>
            <p className="lede mt-7">
              We evaluate your company across the commercial questions real
              buyers ask, then add requirements through follow-up questions to
              determine whether the recommendation holds or collapses.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <p className="eyebrow">The process</p>
            <h2 className="mt-5 max-w-[22ch]">Five steps, the same every time.</h2>
            <ol className="steps steps-3 mt-12">
              {STEPS.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Shown, not told ─────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">The method, shown</p>
            <h2 className="mt-5 max-w-[24ch]">
              A recommendation is built one requirement at a time.
            </h2>
            <ol className="steps steps-2 mt-12">
              {FLOW.map((s, i) => (
                <li key={s.k} className="step">
                  <div className="step-n">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{s.k}</h3>
                  <p>{s.v}</p>
                </li>
              ))}
            </ol>
            <p className="muted mt-6 max-w-[62ch] text-[0.875rem]">
              Illustrative example, shown to explain how commercial evaluation
              narrows. It is not a record of a specific evaluation and names no
              companies as an observed outcome. Real, condition-specific runs
              live in the <Link href="/research">research library</Link>.
            </p>
          </div>
        </section>

        {/* ── Discipline ──────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <div className="callout max-w-[70ch]">
              <p>
                <strong>What the method does not do.</strong> It does not tell
                you how to game an evaluator, and it does not promise a result.
                It records what happened under stated conditions and turns it
                into decisions you can act on. Evidence before opinion.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              See the method applied to your category.
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
