import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "About Upstream Zero | Commercial Evaluation Research" },
  description:
    "Upstream Zero observes how commercial evaluations are formed, including requirement sets, evidence, reasoning, validation, and recommendation outcomes.",
  ...pageMeta("/about"),
};

/** The canonical identity page. Every other page summarises identity in one
 *  line and links back here. */
const FACTS = [
  {
    title: "What we study",
    body: "Commercial evaluation, and the requirements underneath it. Models change and interfaces change. What a buyer needs to see satisfied does not. That is what makes it worth studying properly.",
    href: "/concepts/requirements",
    hrefLabel: "Requirements",
  },
  {
    title: "What we publish",
    body: "A tiered, inspectable record of claims, questions, hypotheses, experiments, and methods. Every claim carries an evidence tier and is never shown above it. The evidence is public. How we produce it is not.",
    href: "/claims",
    hrefLabel: "The claims ledger",
  },
  {
    title: "What we sell",
    body: "Measurement and diagnosis of how an organization is evaluated. Never optimization promises. The commercial work applies the research; it does not turn us into an agency.",
    href: "/services",
    hrefLabel: "For companies",
  },
  {
    title: "What we do not claim",
    body: "We are not an SEO, AEO, GEO, or AI-visibility agency, not an AI consultancy, and not a software company. We do not promise better rankings, recommendations, visibility, or selection. We measure evaluation; we do not sell standing with evaluators.",
    href: "/faq",
    hrefLabel: "Common questions",
  },
];

export default function About() {
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "AboutPage",
              "About Upstream Zero | Commercial Evaluation Research",
              "/about",
              "Upstream Zero observes how commercial evaluations are formed, including requirement sets, evidence, reasoning, validation, and recommendation outcomes.",
            ),
          }}
        />

        {/* ── Identity ────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">The company behind the work</p>
            <h1 className="mt-5 max-w-[15ch]">What is Upstream Zero?</h1>
            <p className="lede mt-7">
              Every commercial outcome is preceded by an evaluation, and more
              and more often that evaluation concludes before a buyer engages
              anyone. We measure why organizations are, or are not, becoming
              the logical recommendation, and what would have to become true
              for that to change.
            </p>
            <p className="lede mt-5">
              The work comes first. The company exists to do it.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The facts ──────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <div className="grid gap-4 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.title} className="card">
                  <h2 className="text-[1.375rem] font-medium tracking-[-0.02em]">
                    {f.title}
                  </h2>
                  <p className="muted mt-3">{f.body}</p>
                  <p className="mt-5">
                    <Link href={f.href} className="btn-ghost">
                      {f.hrefLabel}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Honesty about stage ────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Where we actually are</p>
            <h2 className="mt-5 max-w-[24ch]">
              We only claim the stage we have reached.
            </h2>
            <div className="callout mt-10 max-w-[70ch]">
              <p>
                <strong>The job right now is to discover.</strong> Organizing
                what we find, and running measurements against settled
                standards, come later. Zero findings have been accepted as
                settled, one gate in the entire program has been causally
                verified, and we print both numbers rather than rounding them
                up. Why we work in that order, and why we publish our own
                uncertainty, is on the{" "}
                <Link href="/philosophy">philosophy page</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── Verify ─────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-14">Verify without trusting us</p>
            <h2 className="mt-5 max-w-[22ch]">
              Everything above is checkable.
            </h2>
            <p className="lede mt-6">
              The machine-readable counterpart of this page is{" "}
              <a href="/company.json">company.json</a>. The full graph is{" "}
              <a href="/graph.json">graph.json</a>, and orientation for machine
              readers is <a href="/llms.txt">llms.txt</a>.
            </p>
            <p className="muted mt-6 text-[0.9375rem]">
              Corrections and conflicts of interest:{" "}
              <Link href="/philosophy#when-wrong">how we handle being wrong</Link>{" "}
              · <Link href="/philosophy#neutrality">neutrality</Link> ·{" "}
              <Link href="/concepts/client-zero">Client Zero</Link>
            </p>
          </div>
        </section>
      </main>
      <ProvenanceFooter machineUrl="/company.json" />
    </>
  );
}
