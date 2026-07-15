import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About",
  description:
    "What kind of institution Upstream Zero is, how it works, how corrections and conflicts of interest are handled, and where to find its philosophy, FAQ, and institutional questions.",
  ...pageMeta("/about"),
};

/** Institutional hub (founder item 6): keeps Philosophy and FAQ reachable
 *  without occupying scarce primary navigation. Links, not new claims. */
export default function About() {
  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <h1 className="text-[1.75rem]">About Upstream Zero</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Upstream Zero is a research company studying commercial evaluation
            — how organizations are assessed, recommended, validated, and
            eliminated before selection, observed today through the behavior
            of AI evaluators. It publishes its research as a tiered,
            machine-readable knowledge graph and applies its methods
            commercially through measurement and diagnosis. Today it is,
            honestly, an <strong>observatory</strong>: it discovers; the
            institute organizes and the laboratory measures come later, and
            it claims only the stage it has earned.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>How this institution works</h2>
          <ul className="mt-3 list-none space-y-3 p-0">
            <li className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/philosophy">Philosophy</Link> — why the site publishes
              its own uncertainty, why every claim carries an evidence tier,
              and why you should not have to trust it.
            </li>
            <li className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/philosophy#when-wrong">Corrections</Link> — published
              with the same dignity as findings; nothing is silently edited,
              and the public git history makes every change diffable.
            </li>
            <li className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/philosophy#neutrality">Conflicts of interest</Link> —
              how paid work stays structurally separate from research (the
              build fails if research objects cite commercial ones).
            </li>
            <li className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/concepts/client-zero">Client Zero</Link> — the
              observatory runs its methods on itself first.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Practical &amp; institutional questions</h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            The <Link href="/faq">FAQ</Link> answers practical questions — what
            Upstream Zero is, who it is for, how it differs from SEO/AEO/GEO
            tools, what an engagement includes. Institutional questions (how
            the epistemics, corrections, and identity work) are answered in
            full on the <Link href="/philosophy">Philosophy page</Link> and
            indexed under <Link href="/questions">Questions</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Verify without trusting us</h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Every answer traces to inspectable objects:{" "}
            <Link href="/research">research</Link> ·{" "}
            <Link href="/methods">methods</Link> ·{" "}
            <Link href="/claims">claims ledger</Link> ·{" "}
            <a href="/graph.json">graph.json</a> ·{" "}
            <a href="/company.json">company.json</a> ·{" "}
            <a href="/llms.txt">llms.txt</a>
          </p>
        </section>
      </main>
      <ProvenanceFooter renderedFrom={["content graph", "editorial (buyer revision v1)"]} />
    </>
  );
}
