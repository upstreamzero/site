import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";
import { QPart, RelatedQuestions } from "@/components/ResolvedQuestion";

export const metadata: Metadata = {
  title: "Why are some companies recommended while others are left out?",
  description:
    "Because being visible is not the same as being selected: recommendations are shaped by how an evaluator interprets your fit, evidence, and ability to satisfy the requirements of the situation. The current answer, its evidence tier, and its limitations.",
  ...pageMeta("/questions/why-are-some-companies-recommended"),
};

/** The first full buyer question page (buyer revision v1).
 *  Rendering model: QUESTION → DIRECT ANSWER → EXPLANATION → EVIDENCE →
 *  LIMITATIONS → RELATED QUESTIONS → RELATED RESEARCH → COMMERCIAL NEXT
 *  STEP. Classification: editorial navigation (not an observed question). */
export default function Page() {
  const h1 = byId("H-1");
  const c1 = byId("C-0001");
  const c3 = byId("C-0003");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Buyer question · editorial navigation · answered at the evidence
            tier shown below
          </p>
          <h1 className="mt-3 max-w-[30ch] text-[1.75rem] leading-tight">
            Why are some companies recommended while others are left out?
          </h1>
          <p className="measure mt-5 text-[1.05rem]">
            <strong className="font-semibold">
              Because being visible is not the same as being selected.
            </strong>{" "}
            Recommendations are shaped by how an evaluator interprets your
            fit, your evidence, and your ability to satisfy the requirements
            of the situation. Ranking and visibility can get you retrieved and
            considered; they do not, on their own, explain whether you are
            recommended.
          </p>
          <div className="-ml-5 mt-6 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <QPart label="Explanation">
          <p>
            Rankings matter — they are not irrelevant. Visibility and
            authority affect whether an evaluator retrieves you at all, and a
            company that is never retrieved is rarely recommended. But
            retrieval does not guarantee recommendation. Once you are in
            view, the evaluator does something further: it interprets whether
            you satisfy the requirements of the specific situation, weighs the
            evidence available for each, and forms a recommendation. Rankings
            and visibility do not fully explain that step.
          </p>
          <p>
            The exact mechanisms and weights — how much source availability,
            authority, phrasing, and evidence each contribute, and how they
            interact — remain under investigation. Upstream Zero measures the
            resulting behavior rather than claiming the mechanism is settled.
            That is why rankings, visibility, citations, and recommendations
            can produce different results: they are different measurements,
            and moving one does not reliably move another.
          </p>
        </QPart>

        <QPart label="Evidence — and its current tier">
          <p>
            Honestly: this answer is currently a <strong>founding
            position</strong>, not a demonstrated result. The observatory has
            published zero observations (the front page prints its zeros).
            The claims beneath this answer are on the public ledger at the
            lowest evidence tier:
          </p>
          <ul className="m-0 list-none space-y-4 p-0">
            {[c1, c3].filter(Boolean).map((c) => (
              <li key={c!.id} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
                <Link href={`/claims/${c!.id}`}>{c!.title}</Link>
                <div className="mt-2">{c!.tier && <TierScale tier={c!.tier} />}</div>
              </li>
            ))}
          </ul>
          <p>
            The first experiment against this framing is pre-registered in
            draft: <Link href="/experiments/EXP-0001">EXP-0001</Link>,
            observing whether and how this site&apos;s own published objects
            propagate into evaluator behavior (Client Zero — we run the
            method on ourselves first).
          </p>
        </QPart>

        <QPart label="Limitations — what this answer does not establish">
          <p>
            It does not establish that AI evaluation resembles or influences
            human buying-committee evaluation — that is the open bridge
            hypothesis (<Link href="/hypotheses/H-1">{h1 ? h1.title : "H-1"}</Link>),
            held as a hypothesis, not a finding. It does not establish which
            requirements dominate eliminations in any category, nor that
            changing evidence changes recommendations. No intervention effect
            of any kind has been measured.
          </p>
          <p>
            What would change this answer: published observations of
            evaluator inclusion/exclusion behavior contradicting the
            requirement-and-evidence framing; stability measurements showing
            recommendation outcomes too noisy to attribute to evaluation at
            all (<Link href="/questions/Q-3">Q-3</Link>); or failure of the
            propagation experiment&apos;s predictions. Corrections publish as
            recorded revisions, not silent edits.
          </p>
        </QPart>

        <RelatedQuestions
          items={[
            { href: "/questions#requirements", label: "Which requirements are eliminating us from consideration?" },
            { href: "/questions#stability", label: "Why do rankings, visibility, citations, and recommendations produce different results?" },
            { href: "/questions#misrepresentation", label: "How do we know whether our commercial representation is faithful to the real company?" },
            { href: "/questions/Q-2", label: "What is the relationship between AI evaluation and human buying-committee evaluation?" },
          ]}
        />

        <QPart label="Related research">
          <ul className="m-0 list-none space-y-2 p-0">
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/hypotheses/H-1">H-1 — the bridge claim</Link>
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/experiments/EXP-0001">EXP-0001 — Client Zero propagation baseline</Link>
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/methods/M-1">M-1 — evidence tier definitions</Link>
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/concepts/commercial-evaluation">Concept — commercial evaluation</Link>
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <a href="/objects/C-0001">machine rendering — /objects/C-0001</a>
            </li>
          </ul>
        </QPart>

        <QPart label="Commercial next step">
          <p>
            If this is your situation, the measurable starting point is
            observation, not optimization: capture how evaluators currently
            assess your organization, which requirements they believe you
            satisfy, and where evidence gaps eliminate you. That is what{" "}
            <Link href="/services">an engagement measures</Link>{" — "}it does not
            promise to change any evaluator&apos;s behavior. This answer is
            meant to be useful even if you never work with us.
          </p>
        </QPart>
      </main>
      <ProvenanceFooter
        renderedFrom={["content graph", "editorial answer (buyer revision v1)"]}
        machineUrl="/objects/C-0001"
      />
    </>
  );
}
