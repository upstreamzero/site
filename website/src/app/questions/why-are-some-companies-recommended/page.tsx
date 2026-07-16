import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";
import { QPart, RelatedQuestions } from "@/components/ResolvedQuestion";

export const metadata: Metadata = {
  title: "Why do some companies consistently make the shortlist while others are never evaluated?",
  description:
    "Because evaluation runs on requirements: companies whose fit can't be verified against the requirements of the situation are filtered out before anyone compares them. The current answer, its evidence tier, and its limitations.",
  ...pageMeta("/questions/why-are-some-companies-recommended"),
};

/** Buyer journey template (buyer revision v2 — discipline-first).
 *  Spine: buyer problem → commercial evaluation (the discipline) →
 *  requirements (the invariant) → evidence → commercial application →
 *  Upstream Zero (the institution, last). Buyer language first; concepts
 *  linked, never re-defined; Requirements introduced only once the problem
 *  makes it necessary. Classification: editorial navigation. */
export default function Page() {
  const c1 = byId("C-0001");
  const c3 = byId("C-0003");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            A buyer question, answered at the evidence tier shown below
          </p>
          <h1 className="mt-3 max-w-[28ch]">
            Why do some companies consistently make the shortlist while others
            are never evaluated?
          </h1>
          {/* direct answer, first sentence, buyer language */}
          <p className="measure mt-5 text-[1.05rem]">
            <strong className="font-semibold">
              You can lose before anyone compares you to a competitor.
            </strong>{" "}
            More and more, the first thing evaluating you is a language model.
            It reads what it can find, decides whether you fit, and builds a
            shortlist. You make that shortlist when the evaluator can connect
            what you do to the requirements that matter. When that link is
            missing, weak, or unbacked by evidence, you drop out before the
            real comparison starts. You might genuinely meet the requirement.
            What decides it this early is whether the evaluator can tell, from
            what it can see. Getting left out doesn&apos;t mean you fell short.
            Often it just means nobody could piece together why you fit.
          </p>
          <div className="-ml-5 mt-6 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        {/* the discipline */}
        <QPart label="What is actually happening">
          <p>
            Making the shortlist isn&apos;t about rankings. It&apos;s the
            result of an evaluation. That process is{" "}
            <Link href="/concepts/commercial-evaluation">commercial evaluation</Link>,
            what this observatory studies. It runs through surfacing,
            screening, comparison, and validation. Visibility can get you
            surfaced. It won&apos;t carry you through the screening that
            decides whether you&apos;re really in the running.
          </p>
        </QPart>

        {/* the invariant — introduced only now that the problem needs it */}
        <QPart label="The structure beneath it">
          <p>
            Run enough of these evaluations and you keep hitting the same
            layer underneath:{" "}
            <Link href="/concepts/requirements">requirements</Link>, the
            specific things a buyer needs to be true. An RFP is a list of them.
            A procurement process filters for them. An AI screening a vendor is
            checking it against the ones it thinks apply. Different surfaces,
            same structure.
          </p>
          <p>
            That&apos;s why the pattern holds up instead of being random. The
            companies that keep showing up on shortlists are the ones whose fit
            is easy to see and check. The ones that never get evaluated are the
            ones whose fit an evaluator can&apos;t piece together from what it
            can reach. Models and interfaces change; the requirements stay.
            That&apos;s what makes this worth studying properly.
          </p>
        </QPart>

        {/* evidence, honest tier */}
        <QPart label="Evidence and its tier">
          <p>
            This answer is a <strong>founding position</strong>, not a
            demonstrated result. The observatory has published zero
            observations, and the claims beneath this answer sit at the lowest{" "}
            <Link href="/concepts/evidence-tier">evidence tier</Link>:
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
            Whether AI evaluation reaches human shortlists at all runs through
            the open bridge hypothesis{" "}
            <Link href="/hypotheses/H-1">H-1</Link>, and the first experiment
            against this framing is pre-registered in draft as{" "}
            <Link href="/experiments/EXP-0001">EXP-0001</Link>. The full ledger
            is at <Link href="/claims">Claims</Link>.
          </p>
        </QPart>

        <QPart label="Limitations">
          <p>
            It does not establish which requirements dominate any specific
            category, that AI evaluation resembles or drives human committee
            evaluation (that is H-1, held as a hypothesis), or that changing
            what an evaluator can verify changes the outcome. No intervention
            effect has been measured. What would change the answer: published
            observations of evaluator screening that contradict the
            requirement framing, or stability results too noisy to attribute
            to evaluation at all (<Link href="/questions/Q-3">Q-3</Link>).
          </p>
        </QPart>

        {/* commercial application */}
        <QPart label="Commercial next step">
          <p>
            If this is your situation, the place to start is observation:
            capture how evaluators assess you today, which requirements they
            seem to credit you with, and where the gaps are that keep you out.
            That is what{" "}
            <Link href="/services">an engagement measures</Link>. It doesn&apos;t
            promise to change any evaluator&apos;s behavior, and the answer
            above should be useful even if you never work with us.
          </p>
        </QPart>

        {/* the institution, last */}
        <QPart label="Who is behind this">
          <p>
            <Link href="/about">Upstream Zero</Link> is the research company
            doing this work. The work is what matters here, not the company.
          </p>
        </QPart>

        {/* this page is editorial navigation, not a research object — its
            answer is informed by the graph, it is not identical to any node */}
        <QPart label="Related research objects">
          <p>
            The answer above is informed by the claim{" "}
            <Link href="/claims/C-0001">C-0001</Link> and relates to{" "}
            <Link href="/concepts/commercial-evaluation">commercial evaluation</Link>,
            which <em>observes</em>{" "}
            <Link href="/concepts/requirements">requirements</Link>. The bridge
            hypothesis <Link href="/hypotheses/H-1">H-1</Link> and experiment{" "}
            <Link href="/experiments/EXP-0001">EXP-0001</Link> carry the open
            evidence. The full machine graph is{" "}
            <a href="/graph.json">graph.json</a>.
          </p>
        </QPart>

        <RelatedQuestions
          items={[
            { href: "/questions#requirements", label: "Which requirements are eliminating us from consideration?" },
            { href: "/questions#misrepresentation", label: "Why are we difficult for AI systems to understand?" },
            { href: "/questions/Q-2", label: "What is the relationship between AI evaluation and human buying-committee evaluation?" },
          ]}
        />
      </main>
      <ProvenanceFooter
        machineUrl="/graph.json"
      />
    </>
  );
}
