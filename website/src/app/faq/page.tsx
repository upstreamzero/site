import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "FAQ | Upstream Zero" },
  description:
    "Answers about Upstream Zero, commercial evaluation, AI-mediated vendor selection, evidence tiers, research methods, and the limits of current findings.",
  ...pageMeta("/faq"),
};

/** Operational FAQ (buyer revision v1). Distinct from buyer questions
 *  (/questions) and research questions (/research): these are practical
 *  what/who/how questions, answered plainly. The visible content below is
 *  the sole source of the FAQPage JSON-LD. */
const FAQ: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: "What is Upstream Zero?",
    plain:
      "A research company built around one market shift: more and more of commercial evaluation happens before buyers engage anyone directly. Upstream Zero measures how organizations are evaluated, recommended, and ruled out in that layer, and helps them understand why they are or are not becoming the logical recommendation. The full answer lives on the What is Upstream Zero? page (/about).",
    a: (
      <>
        A research company built around one market shift: more and more of
        commercial evaluation happens before buyers engage anyone directly.
        Upstream Zero measures how organizations are evaluated, recommended,
        and ruled out in that layer, and helps them understand why they are
        or are not becoming the logical recommendation. The full answer lives
        on the <Link href="/about">What is Upstream Zero?</Link> page.
      </>
    ),
  },
  {
    q: "Who is it for?",
    plain:
      "Organizations that suspect they are being evaluated and ruled out before buyers ever reach them: competitors recommended instead of them, buyers arriving already decided, deals disappearing without explanation. It is also for researchers, buyers, and machine systems who want inspectable evidence about how commercial evaluation behaves.",
    a: (
      <>
        Organizations that suspect they are being evaluated and ruled out
        before buyers ever reach them: competitors recommended instead of
        them, buyers arriving already decided, deals disappearing without
        explanation. It is also for researchers, buyers, and machine systems
        who want inspectable evidence about how commercial evaluation
        behaves. The problem map lives on the{" "}
        <Link href="/questions">Questions page</Link>.
      </>
    ),
  },
  {
    q: "What do you actually do?",
    plain:
      "We help organizations understand why they are, or are not, becoming the recommendation. For a client, that means observing how evaluators currently assess them, which requirements they are credited with, where evidence gaps rule them out, and how stable those outcomes are. The research side develops and publishes the methods behind that work, with every claim at its evidence tier.",
    a: (
      <>
        We help organizations understand why they are, or are not, becoming
        the recommendation. For a client, that means observing how evaluators
        currently assess them, which requirements they are credited with,
        where evidence gaps rule them out, and how stable those outcomes are.
        The research side develops and publishes the methods behind that
        work, with every claim at its evidence tier.
      </>
    ),
  },
  {
    q: "How is this different from SEO, AEO, GEO, or AI-visibility tools?",
    plain:
      "Those disciplines optimize appearance: rankings, citations, mentions, visibility. Upstream Zero measures evaluation: what happens between appearing and being selected. It does not optimize websites for rankings and does not sell visibility improvement. Normal technical hygiene matters, but it is infrastructure, not the work.",
    a: (
      <>
        Those disciplines optimize appearance: rankings, citations, mentions,
        visibility. Upstream Zero measures <em>evaluation</em>: what happens
        between appearing and being selected. It does not optimize websites
        for rankings and does not sell visibility improvement. Normal
        technical hygiene matters, but it is infrastructure, not the work.
      </>
    ),
  },
  {
    q: "Do you optimize websites?",
    plain:
      "No. An engagement may reveal that evaluators cannot verify a requirement you satisfy, and you may choose to publish better evidence. But the deliverable is the measurement and diagnosis, not site changes, and no ranking or recommendation outcome is promised.",
    a: (
      <>
        No. An engagement may reveal that evaluators cannot verify a
        requirement you satisfy, and you may choose to publish better
        evidence. But the deliverable is the measurement and diagnosis, not
        site changes, and no ranking or recommendation outcome is promised.
      </>
    ),
  },
  {
    q: "Do you guarantee recommendation changes?",
    plain:
      "No, and the reason is built into the site itself. Engagements promise deliverables (artifacts), never evaluator behavior. The object model has no field an outcome-promise could live in, and the build fails if research objects cite commercial ones.",
    a: (
      <>
        No, and the reason is built into the site itself. Engagements promise
        deliverables (artifacts), never evaluator behavior. The object model
        has no field an outcome-promise could live in, and the build fails if
        research objects cite commercial ones.
      </>
    ),
  },
  {
    q: "What does an engagement include?",
    plain:
      "Provisional engagement shapes are published with their deliverable specifications: commercial evaluation audit, requirement and evidence gap analysis, evaluation stability measurement, ongoing monitoring, machine representation advisory, and research partnership. Names, scopes, and pricing are provisional pending founder confirmation, and nothing is bookable until that decision is made.",
    a: (
      <>
        Provisional engagement shapes are published with their deliverable
        specifications on the <Link href="/services">Services page</Link>:
        audit, requirement and evidence gap analysis, stability measurement,
        ongoing monitoring, machine representation advisory, and research
        partnership. Names, scopes, and pricing are provisional pending
        founder confirmation, and nothing is bookable until that
        decision is made.
      </>
    ),
  },
  {
    q: "What evidence do you need from a client?",
    plain:
      "The claims you make commercially, the requirements you believe you satisfy, and the artifacts that could verify them. We also need permission to observe how evaluators currently describe and assess you. The contact page lists what to bring to a first conversation.",
    a: (
      <>
        The claims you make commercially, the requirements you believe you
        satisfy, and the artifacts that could verify them. We also need
        permission to observe how evaluators currently describe and assess you.{" "}
        <Link href="/contact">The contact page</Link> lists what to bring to
        a first conversation.
      </>
    ),
  },
  {
    q: "What is Client Zero?",
    plain:
      "Upstream Zero itself. We run our methods on ourselves first: this site is the first measured subject, its publication is treated as an intervention in the environment it studies, and the first experiment (EXP-0001) observes whether its own published objects propagate into evaluator behavior.",
    a: (
      <>
        Upstream Zero itself. We run our methods on ourselves
        first: this site is the first measured subject, its publication is
        treated as an intervention in the environment it studies, and the
        first experiment (<Link href="/experiments/EXP-0001">EXP-0001</Link>)
        observes whether its own published objects propagate into evaluator
        behavior. The concept:{" "}
        <Link href="/concepts/client-zero">Client Zero</Link>.
      </>
    ),
  },
  {
    q: "How is the research connected to the commercial work?",
    plain:
      "The research produces methods; the commercial work applies them as measurement and diagnosis. A firewall keeps the direction one-way: research objects never cite commercial objects (build-enforced), capabilities stay marked experimental until they derive from published method, and measured engagement outcomes will publish as tiered evidence with client consent.",
    a: (
      <>
        The research produces methods; the commercial work applies them as
        measurement and diagnosis. A firewall keeps the direction one-way:
        research objects never cite commercial objects (build-enforced),
        capabilities stay marked experimental until they derive from
        published method, and measured engagement outcomes will publish as
        tiered evidence with client consent.
      </>
    ),
  },
  {
    q: "How do you handle corrections?",
    plain:
      "Corrections are published with the same dignity as findings: a recorded revision object, never a silent edit or deletion. Superseded material remains public with a forward pointer, and the public git history makes every change diffable.",
    a: (
      <>
        Corrections are published with the same dignity as findings: a
        recorded revision object, never a silent edit or deletion.
        Superseded material remains public with a forward pointer, and the
        public git history makes every change diffable. The full policy is
        on the <Link href="/philosophy#when-wrong">Philosophy page</Link>.
      </>
    ),
  },
  {
    q: "How can someone contact or work with Upstream Zero?",
    plain:
      "The contact page describes what a first conversation covers and what to bring. The contact channel itself is still being set up, and the page says so plainly instead of hiding it behind a dead form. There is no sales funnel; the register is a calm, specific conversation about what can currently be measured.",
    a: (
      <>
        The <Link href="/contact">contact page</Link> describes what a first
        conversation covers and what to bring. The contact channel itself is
        still being set up, and the page says so plainly instead of hiding it
        behind a dead form. There is no sales funnel; the register is a calm,
        specific conversation about what can currently be measured.
      </>
    ),
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: "https://upstreamzero.com/faq",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <>
      <main id="main" className="shell section-tight">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mt-2">
          <h1>FAQ</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Practical questions, answered plainly. Buyer problems live on the{" "}
            <Link href="/questions">Questions page</Link>; open research
            questions live at <Link href="/research">/research</Link>; this
            page is operational.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </div>

        {FAQ.map((f) => (
          <section key={f.q} className="mt-10">
            <h2 className="max-w-[38ch] text-[1.2rem] leading-snug">{f.q}</h2>
            <p className="measure mt-3 text-[0.98rem]">{f.a}</p>
          </section>
        ))}
      </main>
      <ProvenanceFooter />
    </>
  );
}
