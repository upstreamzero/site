import Link from "next/link";
import type { Metadata } from "next";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { EmptyState } from "@/components/EmptyState";
import { FounderDecision } from "@/components/FounderDecision";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  const capabilities = byType("capability");
  const engagements = byType("engagement");
  const deliverables = byType("deliverable");
  const outcomes = byType("outcome");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <h1 className="text-[1.75rem]">Working with Upstream Zero</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            This is a company, and this page is its commercial wing —
            structured as the seven questions a serious buyer asks, each
            answered by inspectable objects rather than copy. The register
            never changes: we measure and diagnose; we do not promise
            evaluator behavior.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>1 · What do you study?</h2>
          <p className="measure mt-2">
            <Link href="/concepts/commercial-evaluation">Commercial evaluation</Link> —
            how organizations are assessed, recommended, validated, and
            eliminated — observed today through AI evaluators. The research
            program lives at <Link href="/research">/research</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>2 · What have you observed?</h2>
          <p className="measure mt-2" style={{ color: "var(--ink-60)" }}>
            Honestly: nothing yet. The observatory is at First Light — zero
            published observations, and the front page prints that number.
            What exists is the instrument and its rules. Buyers deserve that
            answer straight.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>3 · How might this affect my company?</h2>
          <p className="measure mt-2">
            If AI evaluators mediate what buyers in your category see (the
            open bridge hypothesis, <Link href="/hypotheses/H-1">H-1</Link>),
            then unverifiable claims and invisible capabilities cost you
            consideration you never knew you lost. Each research object
            carries a Commercial Relevance block translating it into buyer
            terms — without borrowing the object&apos;s evidence tier.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>4 · What can you measure for us today?</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {capabilities.map((c) => (
              <li key={c.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--needle)" }}>{c.maturity}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(c)}>{c.title}</Link></div>
              </li>
            ))}
          </ul>
          <p className="measure mt-3 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Every capability is currently <strong>experimental</strong> — the
            build itself forbids marking a capability operational until it
            derives from published method. That enforcement is not a promise;
            it is a compiler error.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>5 · What would a paid engagement produce?</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {engagements.map((e) => (
              <li key={e.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{e.id} · {e.status}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(e)}>{e.title}</Link></div>
                {e.serves && (
                  <p className="mt-1 max-w-[58ch] text-[0.92rem]" style={{ color: "var(--ink-60)" }}>{e.serves}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="measure mt-3 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Deliverable specifications are inspectable before buying:{" "}
            {deliverables.map((d, i) => (
              <span key={d.id}>
                {i > 0 && " · "}
                <Link href={urlFor(d)}>{d.title}</Link>
              </span>
            ))}
            . Engagements promise artifacts, never outcomes — the object
            model has no field an outcome-promise could live in.
          </p>
          <FounderDecision id="FD-6">
            Engagement names, scopes, and pricing are provisional pending
            founder confirmation. No engagement is bookable until this
            decision is made.
          </FounderDecision>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>6 · What is still experimental?</h2>
          <p className="measure mt-2" style={{ color: "var(--ink-60)" }}>
            Everything commercial, currently — see the maturity labels above.
            And the measured-outcome register is empty:
          </p>
          {outcomes.length === 0 && (
            <EmptyState>
              No measured outcomes yet. Engagement results will publish here
              as tiered evidence, with client consent, as they are measured.
              There are no testimonials or logo walls on this site — this
              register is what replaces them. Slower, and worth more.
            </EmptyState>
          )}
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>7 · How do we start?</h2>
          <p className="measure mt-2">
            A calm, specific path: <Link href="/contact">what to bring and what a first conversation covers →</Link>
          </p>
        </section>
      </main>
      <ProvenanceFooter renderedFrom={["content graph"]} />
    </>
  );
}
