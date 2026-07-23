import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId, byType } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

/** Per-product call to action for the dark products band. Keyed by
 *  engagement id so it stays with the canonical product, not its position. */
const PRODUCT_CTA: Record<string, string> = {
  "ENG-7": "Request a Category Report",
  "ENG-1": "Book an Evaluation Audit",
  "ENG-4": "Discuss Selection Intelligence",
};

export const metadata: Metadata = {
  title: {
    absolute:
      "Upstream Zero | Commercial Intelligence for AI-Mediated Commercial Evaluation",
  },
  description:
    "Upstream Zero is a commercial intelligence company focused on AI-mediated commercial evaluation. We help organizations understand how AI systems evaluate, compare, recommend, and eliminate vendors, and what must become true to become the logical choice.",
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
          <div className="shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_341px] lg:gap-x-[100px]">
            <div>
              <p className="eyebrow">
                Commercial intelligence · AI-mediated commercial evaluation
              </p>
              <h1 className="mt-5">
                Help your business become the logical choice.
              </h1>
              <p className="lede mt-7">
                Upstream Zero is a commercial intelligence company focused on
                AI-mediated commercial evaluation. Companies can be removed from
                consideration before a buyer ever speaks with sales. We help you
                understand why you are recommended, why you are eliminated, and
                what must become true to become a logical choice.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingButton variant="btn">
                  Book a 30 Minute Conversation
                </BookingButton>
                <Link href="/pricing" className="btn-ghost">
                  See products and pricing
                </Link>
              </div>
            </div>

            <div className="decision-card lg:mt-20">
              <div className="decision-card__head">
                <span>The commercial decision</span>
                <span className="decision-card__live">Before you</span>
              </div>
              {[
                ["01", "Problem", "What does the buyer need to solve?"],
                ["02", "Require", "What must the right company provide?"],
                ["03", "Compare", "Which company best fits?"],
                ["04", "Select", "Who is the logical choice?"],
              ].map(([n, k, q]) => (
                <div key={n} className="decision-row">
                  <span className="decision-row__n">{n}</span>
                  <span className="decision-row__k">{k}</span>
                  <span className="decision-row__q">{q}</span>
                </div>
              ))}
              <p className="decision-card__foot">
                By the time you meet the buyer, this has already happened. We
                show you why it forms the way it does, and what would change it.
              </p>
            </div>
          </div>

          <div className="shell mt-14 border-t" style={{ borderColor: "var(--line)" }}>
            <div className="built-for">
              <span className="built-for__label">Built for</span>
              <span className="built-for__item">Revenue leaders</span>
              <span className="built-for__item">Marketing leaders</span>
              <span className="built-for__item">Category owners</span>
              <span className="built-for__item">Enterprise teams</span>
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
        <section className="dark-band">
          <div className="shell">
            <p className="eyebrow">What you can buy</p>
            <h2 className="mt-5 max-w-[22ch]">
              Fixed-scope products, not open-ended consulting.
            </h2>
            <div className="product-grid mt-14">
              {products.map((p, i) => {
                const slug = productSlugFor(p.id);
                return (
                  <div key={p.id} className="product-col">
                    <div className="product-col__meta">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {p.timeline && <span>{p.timeline}</span>}
                    </div>
                    <h3 className="product-col__name">
                      {p.productName ?? p.title}
                    </h3>
                    {p.businessProblem && (
                      <p className="product-col__quote">
                        &ldquo;{p.businessProblem}&rdquo;
                      </p>
                    )}
                    {p.businessOutcome && (
                      <p className="product-col__desc">{p.businessOutcome}</p>
                    )}
                    <div className="product-col__price-row">
                      <div>
                        <div className="product-col__price-label">
                          Starting at
                        </div>
                        {p.priceUnit && (
                          <div className="product-col__price-label">
                            {p.priceUnit}
                          </div>
                        )}
                      </div>
                      {p.priceStart && (
                        <div className="product-col__price">{p.priceStart}</div>
                      )}
                    </div>
                    {slug && (
                      <Link
                        href={`/solutions/${slug}`}
                        className="product-col__cta"
                      >
                        {PRODUCT_CTA[p.id] ?? "View scope"}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-12">
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
            <BookingButton variant="btn-lime">
              Schedule a Conversation
            </BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
