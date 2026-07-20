import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { inventory } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";

/** Metadata, canonical, and structured data are deliberately unchanged by
 *  the redesign: this intervention is presentation only, so the machine
 *  surfaces stay stable and attributable. */
/** Sharing title is the company name alone. The browser/search title keeps
 *  the descriptor for context, but link previews must read "Upstream Zero",
 *  not the descriptor: iMessage strips a site-name prefix from og:title,
 *  which previously left the bare descriptor on screen. */
const SHARE_TITLE = "Upstream Zero";
const SHARE_DESCRIPTION =
  "We study how AI systems evaluate, recommend, validate, and rule out companies before buyers ever make contact.";

export const metadata: Metadata = {
  title: { absolute: "Upstream Zero | Commercial Evaluation Research" },
  description: SHARE_DESCRIPTION,
  ...pageMeta("/"),
  openGraph: {
    ...pageMeta("/").openGraph,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    siteName: "Upstream Zero",
  },
  twitter: {
    ...pageMeta("/").twitter,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

/** The buyer journey, as it now runs. Four steps, plain language. */
const JOURNEY = [
  {
    n: "01",
    title: "The buyer asks",
    body: "They describe a problem, not necessarily a product category.",
  },
  {
    n: "02",
    title: "The system decides what matters",
    body: "The request becomes requirements, priorities, and tradeoffs.",
  },
  {
    n: "03",
    title: "Companies are compared",
    body: "Some are included. Others are quietly removed.",
  },
  {
    n: "04",
    title: "A recommendation forms",
    body: "The buyer may engage only after the field has already narrowed.",
  },
];

/** What a company cannot see today. These are the questions the work exists
 *  to make answerable. */
const BLIND_SPOTS = [
  "Were we considered at all?",
  "Did the system understand what we actually do?",
  "Which requirement removed us?",
  "What evidence did it trust?",
  "Why was a competitor judged a better fit?",
  "Would the answer change if the buyer asked again?",
];

/** What an engagement produces. Deliverables, never promised outcomes. */
const PRODUCES = [
  {
    title: "Current evaluation",
    body: "How systems represent, compare, include, recommend, and eliminate your company today.",
  },
  {
    title: "Reason for the result",
    body: "The requirements, evidence gaps, and competitor differences associated with the outcome.",
  },
  {
    title: "What must become true",
    body: "The most important change to test if you want to become a more logical choice.",
  },
  {
    title: "Whether it moved",
    body: "Repeated measurement to see whether the recommendation changed, and whether it survived another evaluation.",
  },
];

export default function Home() {
  const inv = inventory();

  return (
    <>
      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="section">
          <div className="shell grid items-start gap-10 lg:grid-cols-[1.93fr_1fr] lg:gap-x-[7rem]">
            <div>
              <p className="eyebrow">Upstream Zero</p>
              <h1 className="mt-5">
                Buyers are asking AI which companies they should consider.
              </h1>
              <p className="lede mt-7">
                We study how that question gets answered. Which companies make
                the list. Which ones disappear. What the system believes about
                them. And what evidence changes its recommendation.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/questions" className="btn">
                  See what changed
                </Link>
                <Link href="/research" className="btn-ghost">
                  What we are studying
                </Link>
              </div>
            </div>

            <div className="card lg:mt-24">
              <p className="eyebrow">A simple example</p>
              <p className="mt-3">
                A CFO asks an AI system to recommend software for a 500 person
                company.
              </p>
              <p className="mt-3">
                The system decides what matters, compares vendors, rules some
                out, and presents a shortlist.
              </p>
              <p className="mt-3 font-medium" style={{ color: "var(--ink)" }}>
                That evaluation may happen before any vendor knows the buyer
                exists.
              </p>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The missing part of the journey ───────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">The missing part of the buyer journey</p>
            <h2 className="mt-5 max-w-[20ch]">
              Companies measure what happens after a buyer finds them.
            </h2>
            <p className="lede mt-6">
              We study what happened before. By the time most companies see a
              buyer, the decision that mattered has already been made.
            </p>
            <ol className="steps steps-4 mt-12">
              {JOURNEY.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Blind spots ──────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What businesses cannot currently see</p>
            <h2 className="mt-5 max-w-[22ch]">
              The recommendation is visible. The evaluation behind it is not.
            </h2>
            <ul className="qgrid mt-12">
              {BLIND_SPOTS.map((q, i) => (
                <li key={q}>
                  <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="lede mt-10">
              We turn those invisible questions into experiments we can observe
              and test.
            </p>
          </div>
        </section>

        {/* ── What the work produces ───────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">What the work produces</p>
            <h2 className="mt-5 max-w-[20ch]">
              Not another visibility score. An explanation of how the decision
              formed.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {PRODUCES.map((p) => (
                <div key={p.title} className="card">
                  <h3>{p.title}</h3>
                  <p className="muted mt-2">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10">
              <Link href="/services" className="btn-ghost">
                How this helps a company
              </Link>
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The invariant. AI is the mechanism, not the subject. ── */}
        <section className="section">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">What we actually study</p>
              <h2 className="mt-5 max-w-[18ch]">
                AI is the mechanism. Evaluation is the subject.
              </h2>
            </div>
            <div className="prose-measure">
              <p>
                Every commercial outcome is preceded by an evaluation. Someone
                works out what the buyer needs, weighs what each company has
                shown, and forms the opinion that becomes a recommendation.
                That has always been true.
              </p>
              <p className="mt-5">
                What changed is when it happens and who performs it. Today the
                mechanism is an AI system. Tomorrow it may be procurement
                agents or something we have not seen yet. The mechanism will
                keep changing. The shift underneath it will not.
              </p>
              <p className="mt-5">
                So we are not an AI company. We study commercial evaluation,
                and we study it where it currently happens.
              </p>
            </div>
          </div>
        </section>

        {/* ── Why research, not opinion ────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Why research, not opinion</p>
            <h2 className="mt-5 max-w-[24ch]">
              We run the questions, preserve the answers, and separate what
              happened from what we think it means.
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto]">
              <p className="lede">
                The field is early. We do not promise rankings, visibility, or
                favorable recommendations. We publish the conditions, the
                evidence, and the limitations behind every result, so the
                conclusion can be challenged.
              </p>
              <div className="flex flex-wrap gap-10">
                <div>
                  <div className="stat-n">{inv.experiments}</div>
                  <div className="stat-label">Experiments published</div>
                </div>
                <div>
                  <div className="stat-n">{inv.findings}</div>
                  <div className="stat-label">Accepted findings</div>
                </div>
              </div>
            </div>
            <div className="callout mt-10 max-w-[70ch]">
              <p>
                <strong>Those numbers are honest, including the zero.</strong>{" "}
                We have not accepted a single finding as settled. One gate in
                the entire program has been causally verified. Everything else
                is recorded at the evidence level it actually earned.
              </p>
            </div>
            <p className="prose-measure mt-10">
              A concrete example: in clinical trial software the
              recommendation{" "}
              <Link href="/experiments/E-034">collapsed to a single vendor</Link>{" "}
              once the buyer was described, while in project management
              software the field{" "}
              <Link href="/experiments/E-040">held as a set</Link>. Two
              categories, two different outcomes, both recorded with their
              conditions and limits.
            </p>
            <p className="mt-8">
              <Link href="/research" className="btn-ghost">
                See the research
              </Link>
            </p>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              If AI is helping decide who gets considered, you need a way to
              see that decision form.
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="btn-lime">
                Talk about your category
              </Link>
              <Link href="/services" className="btn-ghost">
                How an engagement works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
