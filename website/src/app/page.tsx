import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId, byType } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: { absolute: "Upstream Zero | Commercial Evaluation Research" },
  description:
    "Upstream Zero identifies why AI systems recommend one company over another, where you lose consideration during evaluation, and what would have to change. Research is the engine; fixed-scope products are what you buy.",
  ...pageMeta("/"),
};

/** The executive questions the products answer. Problems first. */
const PROBLEMS = [
  "Why are we not being recommended?",
  "Why are competitors being selected instead of us?",
  "How does AI understand our category?",
  "What evidence actually influences recommendations?",
  "Why do recommendations change after buyer follow-up questions?",
  "How do we know if our strategy is working?",
];

/** An illustrative evaluation flow. Representative, not an observed result:
 *  it teaches how commercial evaluation narrows, without naming vendors or
 *  claiming a specific run. */
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
    k: "The set narrows again",
    v: "Only the companies that match the buyer's full requirement set remain.",
  },
  {
    k: "Final recommendation",
    v: "It reflects the buyer's complete requirements, not the opening question. The recommendation evolved because the requirements did.",
  },
];

export default function Home() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );
  const experiments = byType("experiment").length;

  return (
    <>
      <main id="main">
        {/* ── Hero: the problem, why now ──────────────────────── */}
        <section className="section">
          <div className="shell grid items-start gap-10 lg:grid-cols-[1.9fr_1fr] lg:gap-x-[6rem]">
            <div>
              <p className="eyebrow">Commercial Evaluation Research</p>
              <h1 className="mt-5">
                Find out why AI recommends other companies, and what would
                change it.
              </h1>
              <p className="lede mt-7">
                Upstream Zero identifies why AI systems recommend one company
                over another, where you lose consideration during evaluation,
                and what would have to become true for you to be the logical
                choice. Research is our engine. Fixed-scope products are what
                you buy.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn">
                  Schedule a strategy session
                </Link>
                <Link href="/pricing" className="btn-ghost">
                  See products and pricing
                </Link>
              </div>
            </div>

            <div className="card lg:mt-20">
              <p className="eyebrow">Why now</p>
              <p className="mt-3">
                Buyers increasingly ask an AI system which companies to
                consider, and it answers before you know the buyer exists.
              </p>
              <p className="mt-3 font-medium" style={{ color: "var(--ink)" }}>
                By the time you meet the buyer, the evaluation that shaped
                their shortlist has already happened.
              </p>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The problems (executive questions) ──────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">The questions we answer</p>
            <h2 className="mt-5 max-w-[22ch]">
              The recommendation is visible. The evaluation behind it is not.
            </h2>
            <ul className="qgrid mt-12">
              {PROBLEMS.map((q, i) => (
                <li key={q}>
                  <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works (shown, illustrative) ──────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">How evaluation actually happens</p>
            <h2 className="mt-5 max-w-[24ch]">
              A recommendation is built one requirement at a time.
            </h2>
            <p className="lede mt-6">
              The first answer is only a starting point. Every follow-up adds a
              requirement, tests the companies already recommended, and changes
              who remains.
            </p>
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
              companies as an observed outcome. See the{" "}
              <Link href="/research">research library</Link> for real,
              condition-specific runs.
            </p>
          </div>
        </section>

        {/* ── What you can buy ────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">What you can buy</p>
            <h2 className="mt-5 max-w-[22ch]">
              Fixed-scope products, not open-ended consulting.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} obj={p} />
              ))}
            </div>
            <p className="mt-10">
              <Link href="/pricing" className="btn-ghost">
                Compare all products and pricing
              </Link>
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Why trust us (research as credibility) ──────────── */}
        <section className="section">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Why trust the answer</p>
              <h2 className="mt-5 max-w-[20ch]">
                Research is the engine. The products are the interface.
              </h2>
            </div>
            <div className="prose-measure">
              <p>
                Every engagement rests on continuous commercial evaluation
                research: evidence before opinion, observations recorded with
                their conditions, and analysis a person has reviewed. We
                publish what we can defend and print the limits plainly.
              </p>
              <p className="mt-5">
                {experiments} experiments are public today, each stating what
                was observed and what it does not prove. That is the standard
                behind every product.
              </p>
              <p className="mt-5">
                <Link href="/research" className="btn-ghost">
                  See the research library
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                Find out how your category is being evaluated.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your category and who you compete with. We confirm scope
                and timing, then begin.
              </p>
            </div>
            <Link href="/contact" className="btn-lime">
              Schedule a strategy session
            </Link>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
