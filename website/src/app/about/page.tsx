import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "About Upstream Zero | Commercial Evaluation Research" },
  description:
    "Upstream Zero is a commercial evaluation research company. We identify why AI systems recommend one company over another and turn it into fixed-scope products executives can buy.",
  ...pageMeta("/about"),
};

/** Commercial-first identity, research as the credibility beneath it. */
const FACTS = [
  {
    title: "What we do",
    body: "We identify why AI systems recommend one company over another, where you lose consideration during evaluation, and what would have to become true for you to be the logical choice.",
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
              "About Upstream Zero | Commercial Evaluation Research",
              "/about",
              "Upstream Zero is a commercial evaluation research company packaging its research into fixed-scope products.",
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
            <h1 className="mt-5 max-w-[18ch]">
              A commercial evaluation research company.
            </h1>
            <p className="lede mt-7">
              Every commercial outcome is preceded by an evaluation, and more
              and more often that evaluation concludes before a buyer engages
              anyone. Upstream Zero measures it, and packages what it learns
              into products executives can buy today.
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
                <strong>The register is measurement and diagnosis.</strong> Our
                findings are published with their supporting evidence,
                limitations, and confidence level. We distinguish between
                observed behavior, emerging patterns, and established
                conclusions so customers can evaluate the evidence for
                themselves.
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
