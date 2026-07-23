import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: {
    absolute:
      "About Upstream Zero | Commercial Intelligence for AI-Mediated Commercial Evaluation",
  },
  description:
    "Upstream Zero is a commercial intelligence company focused on AI-mediated commercial evaluation. We study how AI systems evaluate, compare, recommend, and eliminate vendors during buying decisions through observed evidence. We help organizations understand why they are recommended, why they are eliminated, and what must become true to become a logical choice.",
  ...pageMeta("/about"),
};

/** Commercial-first identity, research as the credibility beneath it. */
const FACTS = [
  {
    title: "What we do",
    body: "We study how AI systems evaluate, compare, recommend, and eliminate vendors during buying decisions, and help you understand why you are recommended, why you are eliminated, and what must become true to become a logical choice.",
    href: "/solutions",
    hrefLabel: "See the products",
  },
  {
    title: "What you buy",
    body: "Fixed-scope engagements, not open-ended consulting. A Category Intelligence Report, a Commercial Evaluation Audit, or ongoing Selection Intelligence. Each ends with prioritized decisions.",
    href: "/pricing",
    hrefLabel: "Products and pricing",
  },
  {
    title: "What powers it",
    body: "Continuous commercial evaluation research: evidence before opinion, observations recorded with their conditions, and analysis a person has reviewed. Research is the engine; the products are the interface.",
    href: "/research",
    hrefLabel: "The research library",
  },
  {
    title: "What we do not claim",
    body: "We are not an SEO, AEO, GEO, or AI-visibility agency, not an AI consultancy, and not a software company. We measure and diagnose. We never promise rankings, inclusion, or selection.",
    href: "/methodology",
    hrefLabel: "How we work",
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
              "About Upstream Zero | Commercial Intelligence for AI-Mediated Commercial Evaluation",
              "/about",
              "Upstream Zero is a commercial intelligence company focused on AI-mediated commercial evaluation, studying how AI systems evaluate, compare, recommend, and eliminate vendors through observed evidence.",
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["About", "/about"],
            ]),
          }}
        />

        {/* ── Identity ────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">The company</p>
            <h1 className="mt-5 max-w-[22ch]">
              A commercial intelligence company focused on commercial
              evaluation.
            </h1>
            <p className="lede mt-7">
              We study how AI systems evaluate, compare, recommend, and
              eliminate vendors during buying decisions, through observed
              evidence. We help organizations understand why they are
              recommended, why they are eliminated, and what must become true to
              become a logical choice.
            </p>
            <p className="muted mt-6 max-w-[68ch]">
              Commercial decisions increasingly begin before a buyer speaks with
              sales. AI systems are becoming part of how vendors are discovered,
              compared, and recommended. Upstream Zero exists to make that
              evaluation process observable, measurable, and understandable
              through evidence.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/solutions" className="btn">
                See the products
              </Link>
              <Link href="/methodology" className="btn-ghost">
                How we work
              </Link>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The facts ──────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <div className="grid gap-x-[130px] gap-y-[70px] sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.title}>
                  <h2>{f.title}</h2>
                  <p className="muted mt-5 max-w-[46ch]">{f.body}</p>
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
            <div className="callout mt-10 max-w-[72ch]">
              <p>
                <strong>
                  Upstream Zero separates what it observes from what it can
                  prove.
                </strong>{" "}
                We report what an evaluator recommended, eliminated, requested,
                cited, or changed (observed); the requirements, evidence gaps,
                trust signals, and reinforcement patterns associated with those
                results (diagnosed); and the mechanisms most likely to change
                them (hypothesized). We use causal language only when supported
                by a controlled before-and-after experiment. Our direct
                observations are of AI evaluator behavior; where we describe
                human buying committees or procurement, we are characterizing
                the broader process, not claiming to have observed it directly.
              </p>
            </div>
          </div>
        </section>

        {/* ── Verify ─────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell">
            <p className="eyebrow">Verify without trusting us</p>
            <h2 className="mt-5 max-w-[22ch]">Everything above is checkable.</h2>
            <p className="lede mt-6" style={{ color: "#ffffff", opacity: 0.9 }}>
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
