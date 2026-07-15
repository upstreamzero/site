import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, inventory, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";
import { PROBLEM_AREAS } from "@/lib/buyerQuestions";

export const metadata: Metadata = pageMeta("/");

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
        {/* first screen: one buyer problem, one answer, why visibility fails
            (buyer revision v1 — revised per founder items 1 & 2) */}
        <section className="mt-14">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Commercial Evaluation Observatory · Version 0.1 · First Light
          </p>
          <h1 className="mt-4 max-w-[30ch] text-[2rem] leading-tight">
            Why are some companies recommended while others never make the
            shortlist?
          </h1>
          <p className="measure mt-5 text-[1.05rem]">
            <strong className="font-semibold">
              Because being visible is not the same as being selected.
            </strong>{" "}
            Recommendations are shaped by how an evaluator — human or AI —
            interprets your fit, your evidence, and your ability to satisfy
            the requirements of the situation. Rankings and visibility can get
            you retrieved; they do not, by themselves, explain whether you are
            selected.
          </p>
          <p className="measure mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            This is Upstream Zero&apos;s founding position, and like every claim
            on this site it carries an evidence tier — currently{" "}
            <span className="voice-mono" style={{ color: "var(--needle)" }}>Narrated</span>,
            the lowest one, because the measurement program is just beginning.{" "}
            <Link href="/questions/why-are-some-companies-recommended">
              The full answer, with its evidence and limitations →
            </Link>
          </p>
        </section>

        {/* what is measured instead, and what is not promised — kept on the
            first screen so the buyer sees the alternative to visibility metrics */}
        <section className="mt-12 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: "var(--ink-18)", background: "var(--ink-18)" }}>
          <div className="p-5" style={{ background: "var(--paper)" }}>
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              What we measure
            </h2>
            <p className="measure mt-2 text-[0.95rem]">
              Evaluation behavior rather than visibility: which requirements
              evaluators believe an organization satisfies, where evidence
              gaps eliminate it, how stable recommendations are across
              evaluators, prompts, and time, and how faithfully its
              representation is reconstructed. Method and instruments are
              public: <Link href="/methods">/methods</Link>.
            </p>
          </div>
          <div className="p-5" style={{ background: "var(--paper)" }}>
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              What we do not promise
            </h2>
            <p className="measure mt-2 text-[0.95rem]">
              Better rankings, recommendations, visibility, or selection. This
              is not an SEO, AEO, GEO, or AI-visibility agency. Engagements
              promise deliverables — measurements, diagnoses, evidence-gap
              analyses — never evaluator behavior.{" "}
              <Link href="/faq">More in the FAQ</Link>.
            </p>
          </div>
        </section>

        {/* the six problem areas — below the first screen (founder item 2);
            the fuller question map lives on /questions */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            The problems this work investigates
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            These are the commercial problems Upstream Zero is currently built
            to investigate — not a claim about what buyers most often ask.
          </p>
          <ul className="mt-4 grid list-none grid-cols-1 gap-px border p-0 sm:grid-cols-2" style={{ borderColor: "var(--ink-18)", background: "var(--ink-18)" }}>
            {PROBLEM_AREAS.map((area) => (
              <li key={area.anchor} className="p-5" style={{ background: "var(--paper)" }}>
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
            The full question map: <Link href="/questions">the Questions index →</Link>
          </p>
        </section>

        {/* the honest inventory — retained, after the buyer has oriented */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            The observatory currently holds
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-px border sm:grid-cols-5" style={{ borderColor: "var(--ink-18)", background: "var(--ink-18)" }}>
            {board.map(([label, n]) => (
              <div key={label} className="p-4" style={{ background: "var(--paper)" }}>
                <div className="voice-mono-data text-[1.6rem]">{n}</div>
                <div className="voice-mono mt-1" style={{ color: "var(--ink-60)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p className="measure mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Zeros are printed, not hidden. The instrument came first; the
            holdings accumulate in public, revision by revision.{" "}
            <Link href="/notes/first-light">Why we publish at N=0 →</Link>
          </p>
        </section>

        {/* what the observatory is pointed at */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Research questions — what the observatory is pointed at
          </h2>
          <ul className="mt-4 list-none space-y-5 p-0">
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
        </section>

        {/* the claim ledger, surfaced */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            The claim ledger — including our own founding claims
          </h2>
          <ul className="mt-4 list-none space-y-5 p-0">
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
            A visitor who doubts us should start here: <Link href="/claims">every claim, tiered →</Link>
          </p>
        </section>

        {/* notes */}
        {notes.length > 0 && (
          <section className="mt-14">
            <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
              Notes — narrated by construction
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

        {/* verification path (buyer revision v1: the observatory as proof layer) */}
        <section className="mt-14 max-w-[62ch] border p-5" style={{ borderColor: "var(--ink-18)" }}>
          <h2 className="voice-mono m-0" style={{ color: "var(--ink-60)" }}>
            How do you know? — verify without trusting us
          </h2>
          <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Every answer above traces to inspectable objects:{" "}
            <Link href="/research">research</Link> ·{" "}
            <Link href="/methods">methods</Link> ·{" "}
            <Link href="/claims">claims ledger</Link> ·{" "}
            <Link href="/philosophy">philosophy</Link> ·{" "}
            <a href="/graph.json">graph.json</a> ·{" "}
            <a href="/llms.txt">llms.txt</a> ·{" "}
            <a href="/company.json">company.json</a>
          </p>
        </section>

        {/* the company, acknowledged plainly */}
        <section className="mt-8 max-w-[62ch] border p-5" style={{ borderColor: "var(--ink-18)" }}>
          <p className="m-0" style={{ color: "var(--ink-60)" }}>
            Upstream Zero works with organizations navigating AI-mediated
            evaluation — measurement and diagnosis, never optimization
            promises. <Link href="/services">Services →</Link>
          </p>
        </section>
      </main>
      <ProvenanceFooter renderedFrom={["content graph", "inventory computed at build"]} />
    </>
  );
}
