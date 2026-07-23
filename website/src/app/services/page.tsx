import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import { EmptyState } from "@/components/EmptyState";
import { FounderDecision } from "@/components/FounderDecision";

/** Metadata unchanged by the redesign: presentation only. */
export const metadata: Metadata = {
  title: { absolute: "Commercial Evaluation Services | Upstream Zero" },
  description:
    "Upstream Zero is a commercial intelligence company focused on AI-mediated commercial evaluation. We help organizations understand how AI systems evaluate, compare, recommend, and eliminate vendors, and what must become true to become a logical choice.",
  ...pageMeta("/services"),
};

/** What an engagement answers. Deliverables, never promised outcomes. */
const ANSWERS = [
  {
    n: "01",
    title: "How you are evaluated today",
    body: "How systems currently represent, compare, include, recommend, and eliminate your company.",
  },
  {
    n: "02",
    title: "Why that result happened",
    body: "The requirements you are measured against, the evidence gaps, and the competitor differences associated with the outcome.",
  },
  {
    n: "03",
    title: "What would have to become true",
    body: "The most important change to test if you want to become a more logical choice.",
  },
  {
    n: "04",
    title: "Whether anything moved",
    body: "Repeated measurement to see whether the recommendation changed, and whether the change survived another evaluation.",
  },
];

export default function Services() {
  const capabilities = byType("capability");
  const engagements = byType("engagement");
  const deliverables = byType("deliverable");
  const outcomes = byType("outcome");

  return (
    <>
      <main id="main">
        {/* ── Intro ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">For companies</p>
            <h1 className="mt-5 max-w-[18ch]">
              Find out why you are not the recommendation.
            </h1>
            <p className="lede mt-7">
              Deals are being decided in evaluations you never see, before your
              team is in the room. If a system cannot verify what you do, you
              are not the recommendation, and you never find out why. We
              measure what is actually happening and explain what produced it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookingButton variant="btn">
                Book a 30 Minute Conversation
              </BookingButton>
              <Link href="/research" className="btn-ghost">
                See the research
              </Link>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── What an engagement answers ──────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">What an engagement answers</p>
            <h2 className="mt-5 max-w-[20ch]">
              Four questions, answered with evidence.
            </h2>
            <ol className="steps steps-4 mt-12">
              {ANSWERS.map((a) => (
                <li key={a.n} className="step">
                  <div className="step-n">{a.n}</div>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── The one rule ───────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <div className="callout max-w-[70ch]">
              <p>
                <strong>The rule behind all of it never moves.</strong> We
                measure and diagnose. We never promise to change what an
                evaluator does. Engagements deliver artifacts, never outcomes,
                and the object model has no field a promised outcome could
                even live in.
              </p>
            </div>
          </div>
        </section>

        {/* ── What we can measure today ──────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What we can measure today</p>
            <h2 className="mt-5 max-w-[22ch]">
              Every capability is still experimental, and we label it.
            </h2>
            <ul className="browse mt-10">
              {capabilities.map((c) => (
                <li key={c.id}>
                  <Link href={urlFor(c)}>
                    <span className="browse-id">{c.maturity}</span>
                    <span className="browse-title">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="muted mt-6 max-w-[62ch] text-[0.9375rem]">
              The build itself forbids marking a capability operational until
              it derives from published method. That is not a promise, it is a
              compiler error.
            </p>
          </div>
        </section>

        {/* ── Engagements ────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What an engagement produces</p>
            <h2 className="mt-5 max-w-[22ch]">
              Artifacts you can inspect before you buy.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {engagements.map((e) => (
                <div key={e.id} className="card">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{e.id}</span>
                    <span className="chip">{e.status}</span>
                  </div>
                  <h3 className="mt-5">
                    <Link href={urlFor(e)}>{e.title}</Link>
                  </h3>
                  {e.serves && <p className="muted mt-3">{e.serves}</p>}
                </div>
              ))}
            </div>
            <p className="muted mt-8 max-w-[62ch] text-[0.9375rem]">
              Deliverable specifications are public before you buy:{" "}
              {deliverables.map((d, i) => (
                <span key={d.id}>
                  {i > 0 && " · "}
                  <Link href={urlFor(d)}>{d.title}</Link>
                </span>
              ))}
              .
            </p>
            <div className="mt-8 max-w-[70ch]">
              <FounderDecision id="FD-6">
                Engagement names, scopes, and pricing are provisional pending
                founder confirmation. No engagement is bookable until that
                decision is made.
              </FounderDecision>
            </div>
          </div>
        </section>

        {/* ── Measured outcomes ──────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Measured outcomes</p>
            <h2 className="mt-5 max-w-[24ch]">
              There are no testimonials on this site.
            </h2>
            {outcomes.length === 0 && (
              <div className="mt-8 max-w-[70ch]">
                <EmptyState>
                  No measured outcomes yet. Engagement results will publish
                  here as tiered evidence, with client consent, as they are
                  measured. This register is what replaces a logo wall. It is
                  slower, and it is worth more.
                </EmptyState>
              </div>
            )}
          </div>
        </section>

        {/* ── Close ──────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                Start with your category, not a pitch.
              </h2>
              <p className="lede mt-5" style={{ color: "#ffffff", opacity: 0.85 }}>
                A first conversation covers your evaluation context, what is
                measurable now, and whether we should work together yet.
                Sometimes the honest answer is not yet.
              </p>
            </div>
            <BookingButton variant="btn-lime">
              Schedule a Conversation
            </BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
