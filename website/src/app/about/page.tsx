import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "What is Upstream Zero?",
  description:
    "Upstream Zero is a research company studying commercial evaluation. This is its canonical identity page: what it is, what it studies, what it publishes, what it offers commercially, and what it does not claim.",
  ...pageMeta("/about"),
};

/** Canonical institutional identity page (the single home for "What is
 *  Upstream Zero?"). The institution sits behind the discipline: the site
 *  progresses from the buyer's problem through commercial evaluation,
 *  requirements, evidence, and commercial application, and arrives here.
 *  Other pages summarize identity in one line and link back to this page. */
export default function About() {
  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            The institution conducting the work
          </p>
          <h1 className="mt-3 text-[1.75rem]">What is Upstream Zero?</h1>
          <p className="measure mt-4 text-[1.05rem]">
            Every company is assessed, recommended, validated, and ruled out
            before it is selected. Studying how that happens is{" "}
            <Link href="/concepts/commercial-evaluation">commercial evaluation</Link>,
            and it is the work Upstream Zero exists to do. The work comes
            first. Upstream Zero is the institution conducting it.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What kind of organization</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Today it is an <strong>observatory</strong>: it discovers. The
            institute that organizes and the laboratory that measures come
            later — it claims only the stage it has earned. Why that sequence,
            and why it publishes its own uncertainty, is the{" "}
            <Link href="/philosophy">Philosophy</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it studies</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Commercial evaluation, and the enduring structure beneath it —{" "}
            <Link href="/concepts/requirements">requirements</Link>. Models
            change and interfaces change. The requirements a buyer needs
            satisfied don't. That persistence is what makes the work worth an
            observatory. The open questions it is pointed at live in{" "}
            <Link href="/research">Research</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it publishes</h2>
          <p className="measure mt-2 text-[0.98rem]">
            A tiered, inspectable knowledge graph — claims, questions,
            hypotheses, experiments, methods, and (as they accrue)
            observations and findings. Every claim carries an{" "}
            <Link href="/concepts/evidence-tier">evidence tier</Link> and is
            never shown above it. The evidence is public. How we produce it is
            not. Start at the <Link href="/claims">Claims Ledger</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it offers commercially</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Measurement and diagnosis of how an organization is evaluated —
            never optimization promises. The commercial work applies the
            research; it does not redefine the institution as an agency.{" "}
            <Link href="/services">Services</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it does not claim</h2>
          <p className="measure mt-2 text-[0.98rem]">
            It is <strong>not</strong> an SEO, AEO, GEO, or AI-visibility
            optimization agency, <strong>not</strong> an AI consultancy, and{" "}
            <strong>not</strong> a software company selling a product. It does
            not promise better rankings, recommendations, visibility, or
            selection. It measures evaluation; it does not sell standing with
            evaluators. Why the build itself enforces that line is in the{" "}
            <Link href="/faq">FAQ</Link> and on{" "}
            <Link href="/services">Services</Link>.
          </p>
        </section>

        <section className="mt-10 max-w-[62ch] border p-5" style={{ borderColor: "var(--ink-18)" }}>
          <h2 className="voice-mono m-0" style={{ color: "var(--ink-60)" }}>Verify without trusting us</h2>
          <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            The machine-readable counterpart of this page is{" "}
            <a href="/company.json">company.json</a>. The full graph is{" "}
            <a href="/graph.json">graph.json</a>; orientation for machine
            readers is <a href="/llms.txt">llms.txt</a>. Corrections and
            conflicts of interest:{" "}
            <Link href="/philosophy#when-wrong">how we handle being wrong</Link>{" "}
            · <Link href="/philosophy#neutrality">neutrality</Link> ·{" "}
            <Link href="/concepts/client-zero">Client Zero</Link>.
          </p>
        </section>
      </main>
      <ProvenanceFooter renderedFrom={["content graph", "canonical identity page"]} machineUrl="/company.json" />
    </>
  );
}
