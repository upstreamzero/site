import Link from "next/link";
import type { Metadata } from "next";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { EmptyState } from "@/components/EmptyState";
import { FounderDecision } from "@/components/FounderDecision";

export const metadata: Metadata = { title: "Philosophy" };

export default function Philosophy() {
  const propagation = byType("propagation");
  const revisions = byType("revision");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Everything on this page is Narrated — the institution describing
            its own philosophy. It is typed as such.
          </p>
          <h1 className="mt-3 text-[1.75rem]">Philosophy</h1>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-8 max-w-[62ch]">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Mission</h2>
          <p className="mt-2">
            Upstream Zero studies commercial evaluation to improve commerce.
            We believe better evaluation leads to better buying decisions,
            and better buying decisions improve commercial outcomes — a
            belief we hold as hypothesis{" "}
            <Link href="/hypotheses/H-2">H-2</Link>, with its refutation
            conditions published.
          </p>
        </section>

        <section className="mt-10 max-w-[62ch]">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>The operating system</h2>
          <p className="mt-2">
            Nothing becomes true because it sounds convincing. Observations
            stay observations; hypotheses stay hypotheses; mechanisms carry
            the highest burden of proof; corrections improve the instrument.
            Claims are always presented at their{" "}
            <Link href="/concepts/evidence-tier">evidence tier</Link> — and
            the build fails if a claim tries to display confidence its
            evidence edges don&apos;t justify.
          </p>
        </section>

        <section className="mt-10 max-w-[62ch]">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Identity, honestly sequenced</h2>
          <p className="mt-2">
            The observatory discovers. The institute organizes. The
            laboratory measures. Standards emerge later. Today&apos;s earned
            identity is the observatory — we are still discovering the
            structures we will eventually measure, and the descriptor under
            our name will change only when that milestone is actually
            reached, as a recorded revision.
          </p>
        </section>

        <section className="mt-10 max-w-[62ch]">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Client Zero</h2>
          <p className="mt-2">
            This website participates in the environment it studies, and we
            measure that rather than deny it — see{" "}
            <Link href="/concepts/client-zero">Client Zero</Link> and draft
            experiment <Link href="/experiments/EXP-0001">EXP-0001</Link>.
            Propagation records: {propagation.length}.
          </p>
        </section>

        <section className="mt-10 max-w-[62ch]">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>The changelog</h2>
          {revisions.length === 0 && (
            <EmptyState>
              No revisions yet — nothing published has needed correction.
              When something does, the correction will get the same
              typographic dignity as a finding. Corrections improve the
              instrument.
            </EmptyState>
          )}
        </section>

        <FounderDecision id="FD-2">
          The firewall statement — the published rule that keeps diagnosis
          from becoming optimization, in the founder&apos;s words — does not
          exist yet. Its structural enforcement already runs (research
          objects cannot cite commercial objects; engagements cannot promise
          outcomes), but the prose commitment is a founder decision.
        </FounderDecision>

        <FounderDecision id="FD-3">
          The name. One reading — &quot;go upstream of the decision, and
          zero the instrument&quot; — is documented in the research record
          (THE_INVARIANT.md) but has not been ratified by the founder. Until
          it is, this site does not explain its own name.
        </FounderDecision>

        <FounderDecision id="FD-4">
          Team and authorship. Whether findings carry the founder&apos;s
          name, and who is publicly part of Upstream Zero, is undecided.
          Objects are institutionally authored until this is resolved.
        </FounderDecision>
      </main>
      <ProvenanceFooter renderedFrom={["content graph", "company documents (Narrated)"]} />
    </>
  );
}
