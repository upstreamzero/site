import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { PROBLEM_AREAS } from "@/lib/buyerQuestions";

/** Title and description now match what the page actually promises in
 *  navigation. The old "Research Questions" framing described a research
 *  index; this page answers why the shift matters commercially. */
export const metadata: Metadata = {
  title: { absolute: "Why Commercial Evaluation Changed | Upstream Zero" },
  description:
    "Why buyers now evaluate companies before contacting them, what that costs you, and the specific commercial problems Upstream Zero investigates.",
  ...pageMeta("/questions"),
};

/** The executive's reality, in their own words. Recognition before
 *  explanation: nothing of ours is introduced yet. */
const SYMPTOMS = [
  "Competitors get recommended before you are even mentioned.",
  "Buyers arrive with their minds already half made up.",
  "Traffic declines while the answers stay inside AI systems.",
  "Sales enters deals later than it used to, when it enters at all.",
  "Stronger products lose to better represented ones.",
  "Opportunities disappear before you knew they existed.",
];

export default function Questions() {
  const research = byType("question");

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "Why Commercial Evaluation Changed | Upstream Zero",
              "/questions",
              "Why buyers now evaluate companies before contacting them, what that costs you, and the specific commercial problems Upstream Zero investigates.",
            ),
          }}
        />

        {/* ── The reality ─────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Why this matters</p>
            <h1 className="mt-5 max-w-[17ch]">
              You are losing deals you never knew you were in.
            </h1>
            <p className="lede mt-7">
              It shows up in ways that do not seem connected, and none of the
              usual explanations quite fit.
            </p>
            <ul className="qgrid mt-12">
              {SYMPTOMS.map((s, i) => (
                <li key={s}>
                  <span className="step-n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The one shift ───────────────────────────────────── */}
        <section className="section">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">What changed</p>
              <h2 className="mt-5 max-w-[18ch]">
                The evaluation that used to happen with you now happens without
                you.
              </h2>
            </div>
            <div className="prose-measure">
              <p>
                Every commercial outcome is preceded by an evaluation. Someone
                works out what the buyer needs, weighs what each company has
                shown, and forms the opinion that becomes a recommendation.
                That has always been true, and it is not what changed.
              </p>
              <p className="mt-5">
                What changed is when it happens and who performs it. Buyers
                used to do most of that evaluating in direct contact with you.
                Now much of it concludes before they engage anyone. Today the
                mechanism is an AI system. Tomorrow it may be procurement
                agents. The mechanism will keep changing. The shift underneath
                it will not.
              </p>
              <p className="mt-5">
                Every symptom above is the same shift, seen from a different
                seat.
              </p>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The specific problems ───────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Where this shows up</p>
            <h2 className="mt-5 max-w-[22ch]">
              The specific commercial problems we investigate.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {PROBLEM_AREAS.map((area) => (
                <div key={area.anchor} id={area.anchor} className="card">
                  <p className="eyebrow">{area.label}</p>
                  <ul className="mt-4 list-none space-y-3 p-0 text-[0.9688rem]">
                    {area.questions.map((bq) => (
                      <li key={bq.q}>
                        {bq.href ? (
                          <Link href={bq.href}>{bq.q}</Link>
                        ) : (
                          <span className="muted">{bq.q}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="muted mt-8 max-w-[62ch] text-[0.9375rem]">
              How these earned their place: we wrote them to help you find your
              problem. None is yet backed by captured evidence that buyers
              actually ask it. When that evidence exists, the question moves to
              observed in a recorded revision. Linked questions have an answer
              page; the rest are still being written.
            </p>
          </div>
        </section>

        {/* ── What we are investigating ───────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What we are investigating</p>
            <h2 className="mt-5 max-w-[24ch]">
              The open questions behind those problems.
            </h2>
            <ul className="browse mt-10">
              {research.map((q) => (
                <li key={q.id}>
                  <Link href={urlFor(q)}>
                    <span className="browse-id">{q.id}</span>
                    <span className="browse-title">{q.title}</span>
                    <span className="browse-meta">{q.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="prose-measure mt-10">
              Some of this is already measurable. We have watched a
              recommendation{" "}
              <Link href="/experiments/E-034">narrow to one vendor</Link> as
              soon as a buyer was described, and watched a stated explanation{" "}
              <Link href="/experiments/E-042">stay unchanged while the
              recommendation moved</Link>.
            </p>
            <p className="mt-8">
              <Link href="/research" className="btn-ghost">
                See what we have observed
              </Link>
            </p>
          </div>
        </section>

        {/* ── Close ──────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <hr className="rule" />
            <h2 className="mt-14 max-w-[24ch]">
              If this is already costing you deals, start by measuring it.
            </h2>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/services" className="btn">
                How this helps your company
              </Link>
              <Link href="/faq" className="btn-ghost">
                Common questions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
