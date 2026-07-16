import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "What is Upstream Zero?",
  description:
    "Upstream Zero measures how organizations are evaluated, recommended, and ruled out before buyers engage them directly. What the company is, what it studies, what it publishes, what it offers, and what it refuses to claim.",
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
            The company behind the work
          </p>
          <h1 className="mt-3">What is Upstream Zero?</h1>
          <p className="measure mt-4 text-[1.05rem]">
            Every commercial outcome is preceded by an evaluation. More and
            more often, that evaluation concludes before a buyer engages
            anyone directly. Today the mechanism is a language model; tomorrow
            it may be something else. The process it performs is{" "}
            <Link href="/concepts/commercial-evaluation">commercial evaluation</Link>,
            and it is what Upstream Zero measures: why organizations are, or
            are not, becoming the logical recommendation, and what would have
            to become true for that to change. The work comes first; the
            company exists to do it.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What kind of organization</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Right now it&apos;s an <strong>observatory</strong>: its job is to
            discover. The institute that will organize what it finds, and the
            laboratory that will run the measurements, come later. It only
            claims the stage it has actually reached. Why it works in that
            order, and why it publishes its own uncertainty, is the{" "}
            <Link href="/philosophy">Philosophy</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it studies</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Commercial evaluation, and the{" "}
            <Link href="/concepts/requirements">requirements</Link> underneath
            it. Models change, interfaces change. What a buyer needs to see
            satisfied doesn&apos;t. That&apos;s what makes it worth studying
            properly. The open questions it&apos;s pointed at live in{" "}
            <Link href="/research">Research</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it publishes</h2>
          <p className="measure mt-2 text-[0.98rem]">
            A tiered, inspectable knowledge graph. It holds claims,
            questions, hypotheses, experiments, methods, and (as they accrue)
            observations and findings. Every claim carries an{" "}
            <Link href="/concepts/evidence-tier">evidence tier</Link> and is
            never shown above it. The evidence is public. How we produce it is
            not. Start at the <Link href="/claims">Claims Ledger</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>What it offers commercially</h2>
          <p className="measure mt-2 text-[0.98rem]">
            Measurement and diagnosis of how an organization is evaluated.
            Never optimization promises. The commercial work applies the
            research. It does not redefine Upstream Zero as an agency.{" "}
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
      <ProvenanceFooter machineUrl="/company.json" />
    </>
  );
}
