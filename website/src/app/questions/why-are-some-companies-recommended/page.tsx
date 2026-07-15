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
            Buyer question · editorial navigation · answered at the evidence
            tier shown below
          </p>
          <h1 className="mt-3 max-w-[32ch] text-[1.75rem] leading-tight">
            Why do some companies consistently make the shortlist while others
            are never evaluated?
          </h1>
          {/* direct answer, first sentence, buyer language */}
          <p className="measure mt-5 text-[1.05rem]">
            <strong className="font-semibold">
              Companies make the shortlist when evaluators can connect what
              they offer to the requirements that matter — and when that
              connection is missing, weak, or unsupported by evidence, a
              company may never enter the evaluation set at all.
            </strong>{" "}
            The company may genuinely satisfy the requirement; what decides its
            fate earlier is whether an evaluator can establish that from the
            representation and evidence available to it. Being left out is not
            proof that a company fell short — often it is proof only that its
            fit could not be reconstructed.
          </p>
          <div className="-ml-5 mt-6 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        {/* the discipline */}
        <QPart label="What is actually happening">
          <p>
            Making the shortlist is not a ranking outcome; it is the output of
            an evaluation. That process — surfacing, screening, comparison,
            validation — is{" "}
            <Link href="/concepts/commercial-evaluation">commercial evaluation</Link>,
            the discipline this observatory studies. Visibility can get you
            surfaced; it does not carry you through the screening that decides
            whether you are evaluated at all.
          </p>
        </QPart>

        {/* the invariant — introduced only now that the problem needs it */}
        <QPart label="The structure beneath it">
          <p>
            Run enough of those evaluations and the same layer keeps
            appearing underneath them:{" "}
            <Link href="/concepts/requirements">requirements</Link> — the
            specific conditions a buyer needs satisfied. An RFP is a
            requirements list; a procurement workflow is a requirements
            filter; an AI screening a vendor is matching it against inferred
            requirements. The interfaces differ; the structure does not.
          </p>
          <p>
            This is why the pattern is consistent rather than random. The
            companies that recur on shortlists are the ones whose fit against
            the operative requirements is easy to recognize and verify; the
            ones that are never evaluated are the ones whose fit cannot be
            reconstructed from what an evaluator can reach. Models and
            interfaces change; the requirements persist — which is what makes
            this worth studying rather than chasing.
          </p>
        </QPart>

        {/* evidence — honest tier */}
        <QPart label="Evidence — and its current tier">
          <p>
            Honestly, this answer is a <strong>founding position</strong>, not
            a demonstrated result. The observatory has published zero
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

        <QPart label="Limitations — what this does not establish">
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
            If this is your situation, the measurable starting point is
            observation, not optimization: capture how evaluators currently
            assess you, which requirements they appear to credit, and where
            the gaps are that keep you from being evaluated. That is what{" "}
            <Link href="/services">an engagement measures</Link>{" — "}it does not
            promise to change any evaluator&apos;s behavior, and the answer
            above is meant to be useful even if you never work with us.
          </p>
        </QPart>

        {/* the institution, last */}
        <QPart label="Who is behind this">
          <p>
            <Link href="/about">Upstream Zero</Link> is the research company
            conducting this work — the institution behind the discipline, not
            the subject of it.
          </p>
        </QPart>

        {/* this page is editorial navigation, not a research object — its
            answer is informed by the graph, it is not identical to any node */}
        <QPart label="Related research objects">
          <p>
            This is an editorial navigation page, not a research object. Its
            answer is informed by the claim{" "}
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
        renderedFrom={["editorial navigation page (discipline-first buyer journey)", "informed by C-0001, commercial-evaluation, requirements"]}
        machineUrl="/graph.json"
      />
    </>
  );
}
