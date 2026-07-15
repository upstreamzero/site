import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, inventory, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";

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
        {/* mission — the site's first line (IA §3.6) */}
        <section className="mt-14">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Commercial Evaluation Observatory · Version 0.1 · First Light
          </p>
          <h1 className="mt-4 max-w-[26ch] text-[2rem]">
            Upstream Zero studies commercial evaluation to improve commerce.
          </h1>
          <p className="measure mt-5" style={{ color: "var(--ink-60)" }}>
            Organizations have always been evaluated before they are chosen.
            That process is becoming observable for the first time — through
            the behavior of AI evaluators — and this observatory exists to
            measure it. Every significant claim here carries an evidence tier,
            and most of them are currently the lowest one. That is not a
            weakness of the site; it is the point of it.
          </p>
        </section>

        {/* the honest inventory */}
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
            Open questions — what we are pointed at
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

        {/* the company, acknowledged plainly (IA §5) */}
        <section className="mt-14 max-w-[62ch] border p-5" style={{ borderColor: "var(--ink-18)" }}>
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
