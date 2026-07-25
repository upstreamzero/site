import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, faqLd } from "@/lib/meta";
import { byId, byType } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { WORKFLOW } from "@/lib/workflow";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

/** Per-product call to action for the dark products band. Keyed by
 *  engagement id so it stays with the canonical product, not its position. */
const PRODUCT_CTA: Record<string, string> = {
  "ENG-7": "Request a Category Report",
  "ENG-1": "Book an Evaluation Audit",
  "ENG-4": "Discuss Selection Intelligence",
};

/** Outcome-led headline for each product on the home band. The canonical
 *  product name still renders as the secondary label, so /solutions,
 *  /pricing, and the Product schema stay the source of truth for names. */
const PRODUCT_HEADLINE: Record<string, string> = {
  "ENG-7": "Understand How AI Sees Your Category",
  "ENG-1": "Find Out Why You're Recommended or Eliminated",
  "ENG-4": "Measure Whether You're Becoming the Logical Choice",
};

/** Home shares a customer-first message. The company classification
 *  ("commercial intelligence company focused on AI-mediated commercial
 *  evaluation") is carried by the Organization schema, llms.txt, and
 *  company.json, so the visible surfaces can lead with the outcome. */
const base = pageMeta("/");
const SHARE_TITLE = "Why Is AI Recommending Your Competitors Instead of You?";
const SHARE_DESC =
  "You show up in ChatGPT and Google AI. You are still not the one they recommend. Upstream Zero shows you why AI recommends competitors over you, and what changes it.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Upstream Zero | Why AI Recommends Your Competitors, and What Changes It",
  },
  description:
    "You have tried AEO, GEO, and AI visibility tools to show up in ChatGPT and Google AI. You appear, and still lose the recommendation. Upstream Zero studies why AI recommends competitors over you, which requirement removes you, and what evidence changes the outcome.",
  ...base,
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESC },
  twitter: { ...base.twitter, title: SHARE_TITLE, description: SHARE_DESC },
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

/** Buyer questions, answered plainly, and emitted as FAQPage schema for
 *  snippet and AI retrieval. Buyer language first. */
const HOME_FAQS = [
  {
    q: "Why is AI recommending my competitors instead of me?",
    a: "AI does not rank a fixed list. It builds a recommendation from the buyer's requirements and recommends the company that best fits them. You can appear in the opening answer and be eliminated the moment a real requirement is applied. Upstream Zero shows you which requirement removes you and why a competitor survives.",
  },
  {
    q: "Is this AEO, GEO, or AI visibility?",
    a: "Those are tactics for being found, and they are the floor. Upstream Zero works one level up: not whether you appear, but why you are chosen or eliminated once you do. We are not an AEO, GEO, or visibility agency, we do not sell a tool, and we do not promise rankings.",
  },
  {
    q: "Which AI systems does Upstream Zero study?",
    a: "Version 1 focuses on ChatGPT and Google AI (AI Mode and AI Overviews), where our evidence is strongest and where buyers most commonly begin. Perplexity, Gemini, and Copilot are planned expansions.",
  },
  {
    q: "What do I actually get?",
    a: "A read on why AI recommends competitors over you, which requirements eliminate you, and what evidence would change the recommendation, with the conditions of each observation. It is diagnosis and measurement, not a promise about rankings or pipeline.",
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
                For companies losing deals they should be winning
              </p>
              <h1 className="mt-5">
                You&rsquo;re doing everything right. So why does AI keep
                recommending your competitors?
              </h1>
              <p className="lede mt-7">
                You invested in showing up when buyers ask AI for
                recommendations, and you are showing up. And yet competitors
                keep getting recommended instead of you. Here is the part no one
                explains: AI does not decide the moment it first mentions you.
                It keeps weighing companies as the buyer asks follow-up
                questions and spells out what they really need. With each new
                requirement, the list narrows to whoever still fits, and the
                most visible company is often not the one left standing. That is
                why showing up has not turned into winning.
              </p>
              <p className="muted mt-5 max-w-[58ch]">
                It is happening in deals you are chasing right now, and you
                never see the moment you drop off the list.{" "}
                <Link href="/learn/how-ai-recommends-vendors">
                  See how the decision really gets made.
                </Link>
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingButton variant="btn">
                  Find Out Where You Stand
                </BookingButton>
                <Link href="/pricing" className="btn-ghost">
                  See products and pricing
                </Link>
              </div>
            </div>

            <div className="decision-card lg:mt-20">
              <div className="decision-card__head">
                <span>The buying decision</span>
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
                By the time a buyer talks to you, the shortlist is set. We show
                you why, and what would change it.
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
            <p className="eyebrow">How the shortlist forms</p>
            <h2 className="mt-5 max-w-[24ch]">
              The shortlist narrows one requirement at a time.
            </h2>
            <p className="lede mt-6">
              The first answer is never the final one. Every follow-up question
              adds a requirement and quietly changes who stays on the list.
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
            <p className="mt-6 max-w-[64ch]">
              <strong>What this proves.</strong> AI recommendations are not
              fixed. They change as requirements emerge, so you can win the
              general question and lose the specific one.
            </p>
            <p className="muted mt-4 max-w-[64ch] text-[0.9375rem]">
              How we know: in a controlled test we removed a single requirement
              and the recommendation set changed. It is the one relationship we
              have verified causally. The walkthrough above is a representative
              illustration of that behavior and names no companies; the
              documented runs are in the <Link href="/research">research</Link>.
            </p>
          </div>
        </section>

        {/* ── What you can buy ────────────────────────────────── */}
        <section className="dark-band">
          <div className="shell">
            <p className="eyebrow">What you can buy</p>
            <h2 className="mt-5 max-w-[22ch]">
              Three ways to find out where you stand.
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
                      {PRODUCT_HEADLINE[p.id] ?? p.productName ?? p.title}
                    </h3>
                    <span className="product-col__label">
                      {p.productName ?? p.title}
                    </span>
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
              <p className="eyebrow">What we have learned</p>
              <h2 className="mt-5 max-w-[20ch]">
                The category leader is not safe.
              </h2>
            </div>
            <div className="prose-measure">
              <p>
                Leading the opening AI answer does not protect you. When a
                requirement appears that the leader cannot meet, it is often the
                first removed, and a lesser-known competitor takes the
                recommendation.
              </p>
              <p className="mt-5">
                How we know: across five categories, the vendor that led the
                opening recommendation lost its lead at the first requirement it
                could not satisfy. In one category the leader changed between
                runs, yet whichever vendor led was removed at the same step. We
                hold this as a strong, repeated pattern, mostly on one AI system.
                It is not yet a proven universal rule, and we say so.
              </p>
              <p className="mt-5">
                We can say this plainly because we are independent. We do not
                sell traffic, content, or rankings, so we have no stake in the
                answer. Every observation is recorded with its conditions and
                its confidence, across the {experiments} runs we have published.
              </p>
              <p className="mt-5">
                <Link href="/research" className="btn-ghost">
                  See the evidence
                </Link>
              </p>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── How the work is done (demoted below the buyer story) ── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">How the work is done</p>
            <h2 className="mt-5 max-w-[30ch]">
              Why a competitor is recommended, what would change it, and whether
              it moved.
            </h2>
            <p className="lede mt-6 max-w-[64ch]">
              Every engagement follows the same path: see why a competitor is
              recommended over you, find where you are eliminated, define what
              would need to change, and measure whether it moved.
            </p>
            <ol className="steps steps-2 mt-12">
              {WORKFLOW.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.name}</h3>
                  <p>{s.plain}</p>
                </li>
              ))}
            </ol>
            <p className="mt-9">
              <Link href="/solutions" className="btn-ghost">
                See the full workflow and products
              </Link>
            </p>
          </div>
        </section>

        {/* ── FAQ (buyer questions + FAQPage schema for retrieval) ── */}
        <section className="section">
          <div className="shell">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: faqLd(HOME_FAQS) }}
            />
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-5 max-w-[24ch]">
              What buyers ask before they book.
            </h2>
            <dl className="mt-10 max-w-[74ch]">
              {HOME_FAQS.map((f) => (
                <div
                  key={f.q}
                  className="border-t py-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    {f.q}
                  </dt>
                  <dd className="muted mt-2 max-w-[64ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                See where you stand in your category.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your category and who you're up against. We'll show you
                exactly where you stand, and what it takes to win.
              </p>
            </div>
            <BookingButton variant="btn-lime">
              Start With Your Category
            </BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
