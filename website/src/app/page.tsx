import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, inventory, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";
import { JourneyShift } from "@/components/JourneyShift";
import { PROBLEM_AREAS } from "@/lib/buyerQuestions";

export const metadata: Metadata = {
  description:
    "Competitors recommended before you. Buyers arriving already decided. Deals lost before you knew they existed. More and more of commercial evaluation happens before buyers engage directly. Upstream Zero measures why organizations do or don't become the logical recommendation.",
  ...pageMeta("/"),
};

/** The executive's reality, in their own terms. No mechanism, no vocabulary.
 *  This list is beat 1 of the narrative: recognition before explanation. */
const SYMPTOMS = [
  "Competitors get recommended before you're even mentioned.",
  "Buyers arrive with their minds already half made up.",
  "Website traffic declines while the answers stay inside AI systems.",
  "Sales enters deals later than it used to, when it enters at all.",
  "Stronger products lose to better-represented ones.",
  "Opportunities disappear before you knew they existed.",
];

/** Beat 3: each felt symptom traced to the same cause. */
const TRACES: { symptom: string; why: string }[] = [
  {
    symptom: "Competitors recommended before you",
    why: "The evaluation concluded before you knew it was happening, and they survived it.",
  },
  {
    symptom: "Buyers arriving already decided",
    why: "Their opinion was formed during an evaluation you never saw and couldn't participate in.",
  },
  {
    symptom: "Traffic down, answers elsewhere",
    why: "The questions your website used to answer are being answered inside the evaluating system.",
  },
  {
    symptom: "Sales entering later",
    why: "The shortlist already exists by first contact. You're negotiating position, not building it.",
  },
  {
    symptom: "Stronger products losing",
    why: "An evaluator recommends what it can understand and verify, not what is best. Unverifiable strength reads as absence.",
  },
];

export default function Observatory() {
  const inv = inventory();
  const questions = byType("question");
  const claims = byType("claim");
  const notes = byType("note");

  const board: [string, number][] = [
    ["Observations", inv.observations],
    ["Experiments", inv.experiments],
    ["Findings", inv.findings],
    ["Questions", inv.questions],
    ["Hypotheses", inv.hypotheses],
    ["Claims", inv.claims],
    ["Claims above Narrated", inv.claimsAboveNarrated],
    ["Revisions", inv.revisions],
    ["Propagation records", inv.propagation],
    ["Measured outcomes", inv.outcomes],
  ];

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        {/* 1 · the executive's reality. Full room, plain language, nothing
            of ours introduced yet. */}
        <section className="mt-16">
          <p className="voice-mono rise" style={{ color: "var(--needle)" }}>
            For leaders watching good pipeline quietly disappear
          </p>
          <h1 className="rise rise-2 mt-6 max-w-[22ch]">
            You&apos;re losing deals you never knew you were in.
          </h1>
          <p className="lead measure rise rise-3 mt-7">
            It shows up in ways that don&apos;t seem connected, and none of the
            usual explanations quite fit:
          </p>
          <ul className="rise rise-3 mt-6 grid list-none grid-cols-1 gap-x-12 gap-y-4 p-0 sm:grid-cols-2">
            {SYMPTOMS.map((s) => (
              <li key={s} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 2 · what changed. Anchored to evaluation, not any mechanism.
            LLMs named as today's mechanism, explicitly not the point. */}
        <section className="mt-24">
          <h2 className="max-w-[26ch]">
            The evaluation that used to happen with you now happens without
            you.
          </h2>
          <p className="lead measure mt-5">
            Every commercial outcome is preceded by an evaluation. Someone
            works out what the buyer needs, weighs what each company has shown,
            and forms the opinion that becomes a recommendation. That has
            always been true, and it isn&apos;t what changed.
          </p>
          <p className="lead measure mt-5">
            What changed is <strong>when it happens, and who performs it</strong>.
            Buyers used to do most of that evaluating themselves, in direct
            contact with you: your site, your demos, your people. Now much of
            it happens before they ever engage. Today the mechanism is a
            language model that retrieves companies, compares them, and
            recommends a shortlist. Tomorrow it may be enterprise agents,
            procurement systems, or autonomous buyers. The mechanism will keep
            changing. The shift underneath it won&apos;t.
          </p>
          <JourneyShift />
        </section>

        {/* 3 · why that one shift produces every symptom above */}
        <section className="mt-24">
          <h2 className="max-w-[30ch]">
            One shift, every symptom.
          </h2>
          <ul className="mt-7 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {TRACES.map((t) => (
              <li key={t.symptom} className="card p-6">
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  {t.symptom}
                </span>
                <p className="mt-2 max-w-[58ch]">{t.why}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 · the discipline, earned. The concept ladder: each term is
            introduced as the answer to a question the reader now has. */}
        <section className="mt-24">
          <h2 className="max-w-[26ch]">
            This is measurable. We built the discipline that measures it.
          </h2>
          {/* the concept ladder, set as architecture: each term is one rung,
              read top to bottom as a system rather than a paragraph */}
          <ul className="mt-8 max-w-[74ch] list-none p-0">
            {[
              {
                term: "Commercial evaluation",
                href: "/concepts/commercial-evaluation",
                text: "is the process that decides every one of those outcomes, and it can be studied directly.",
              },
              {
                term: "Requirements",
                href: "/concepts/requirements",
                text: "are what any evaluation actually turns on: the specific things a buyer needs to be true.",
              },
              {
                term: "Evidence",
                href: "/concepts/evidence-tier",
                text: "is how an evaluator establishes that you meet them.",
              },
              {
                term: "Machine representation",
                href: "/concepts/machine-representation",
                text: "is what an evaluator can reconstruct about you from what it can reach.",
              },
              {
                term: "Recommendation survivability",
                href: "/concepts/recommendation-survivability",
                text: "is whether a recommendation of you persists under a second look, a newer model, a harder question.",
              },
            ].map((rung, i, all) => (
              <li
                key={rung.term}
                className={`flex flex-col gap-1 border-t py-5 sm:flex-row sm:items-baseline sm:gap-8${i === all.length - 1 ? " border-b" : ""}`}
                style={{ borderColor: "var(--ink-18)" }}
              >
                <span className="shrink-0 sm:w-[15.5rem]">
                  <Link href={rung.href} className="font-medium">
                    {rung.term}
                  </Link>
                </span>
                <span className="max-w-[46ch]" style={{ color: "var(--ink-60)" }}>
                  {rung.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="lead measure mt-5">
            Nobody needs to believe our explanation on faith. It is published as
            claims with evidence tiers, and the point of the work is practical:
            to explain why you are, or are not, becoming the{" "}
            <strong>logical recommendation</strong>, and what would have to
            become true for that to change.
          </p>
        </section>

        {/* 5 · how organizations respond: what we measure, what we refuse
            to promise, and the specific shapes the problem takes */}
        <section className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="card p-6">
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              What we measure
            </h2>
            <p className="measure mt-2 text-[0.95rem]">
              How evaluators currently assess you. Which requirements they
              credit you with. Where one missing piece of evidence quietly
              rules you out. Where a competitor is chosen over you, and what
              drove it. Whether a recommendation of you survives re-asking.
              How accurately what you do is reconstructed. Our method is
              public: <Link href="/methods">/methods</Link>.
            </p>
          </div>
          <div className="card p-6">
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              What we do not promise
            </h2>
            <p className="measure mt-2 text-[0.95rem]">
              Better rankings, recommendations, visibility, or selection. We
              measure and diagnose; we don&apos;t sell standing with
              evaluators. An engagement gets you measurements, diagnoses, and
              evidence-gap analyses. Never a promise about what an evaluator
              will do. <Link href="/faq">More in the FAQ</Link>.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="max-w-[30ch]">
            Where this shows up for you
          </h2>
          <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {PROBLEM_AREAS.map((area) => (
              <li key={area.anchor} className="card card-lift p-6">
                <div className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  {area.label}
                </div>
                <div className="mt-2 max-w-[46ch]">
                  <Link href={area.href ?? `/questions#${area.anchor}`}>
                    {area.lead}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="measure mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            All of them, mapped: <Link href="/questions">the problem index →</Link>
          </p>
        </section>

        {/* 6 · proof. Everything below exists so nothing above has to be
            taken on faith. */}
        <section className="mt-16">
          <h2 className="max-w-[30ch]">
            What we can prove today
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Almost nothing yet, and we print the number. The instrument came
            first; the evidence accumulates in public, revision by revision.{" "}
            <Link href="/notes/first-light">Why we publish at N=0 →</Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {board.map(([label, n]) => (
              <div key={label} className="card p-4">
                <div className="figure">{n}</div>
                <div className="voice-mono mt-1" style={{ color: "var(--ink-60)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 gap-x-14 gap-y-14 lg:grid-cols-2">
          <div>
            <h2 className="max-w-[30ch]">
              What we are investigating
            </h2>
            <ul className="mt-5 list-none space-y-5 p-0">
              {questions.map((q) => (
                <li key={q.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                  <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                    {q.id}
                  </span>
                  <div className="mt-1 max-w-[58ch]">
                    <Link href={urlFor(q)}>{q.title}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="max-w-[30ch]">
              Every claim we make, tiered
            </h2>
            <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
              Including our own founding claims. If you doubt us, this is where to
              start.
            </p>
            <ul className="mt-5 list-none space-y-5 p-0">
              {claims.map((c) => (
                <li key={c.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                  <div className="max-w-[58ch]">
                    <Link href={urlFor(c)}>{c.title}</Link>
                  </div>
                  <div className="mt-2">{c.tier && <TierScale tier={c.tier} />}</div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
              <Link href="/claims">The full ledger →</Link>
            </p>
          </div>
        </section>

        {notes.length > 0 && (
          <section className="mt-16">
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              Notes
            </h2>
            <ul className="mt-4 list-none space-y-2 p-0">
              {notes.map((n) => (
                <li key={n.id}>
                  <Link href={urlFor(n)}>{n.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* the closing screen: one decision, two doors. Inspect the proof,
            or start measuring. Both momentum, neither a dead end. */}
        <section className="card mt-20 grid grid-cols-1 gap-10 p-8 sm:p-10 md:grid-cols-2">
          <div>
            <p className="lead m-0">
              If you suspect this is already costing you deals, the place to
              start is measurement, not optimization. We capture how evaluators
              currently assess you, and where the gaps are.
            </p>
            <p className="mb-0 mt-6">
              <Link href="/services" className="btn">
                How an engagement works
              </Link>
            </p>
          </div>
          <div className="md:border-l md:pl-10" style={{ borderColor: "var(--ink-18)" }}>
            <h2 className="voice-mono m-0" style={{ color: "var(--ink-60)" }}>
              Verify without trusting us
            </h2>
            <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
              Every claim above traces to an inspectable object:{" "}
              <Link href="/research">research</Link> ·{" "}
              <Link href="/methods">methods</Link> ·{" "}
              <Link href="/claims">claims ledger</Link> ·{" "}
              <Link href="/philosophy">philosophy</Link> ·{" "}
              <a href="/graph.json">graph.json</a> ·{" "}
              <a href="/llms.txt">llms.txt</a> ·{" "}
              <a href="/company.json">company.json</a>
            </p>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
