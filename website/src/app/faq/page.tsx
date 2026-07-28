import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "FAQ | Upstream Zero" },
  description:
    "Answers about Upstream Zero, how AI decides which companies to recommend to buyers, how sure we are of each finding, our research methods, and the limits of what we know so far.",
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
      "We study how AI decides which companies to recommend to buyers. Upstream Zero watches how AI systems compare companies, recommend some, and rule others out during buying decisions, and helps you understand why you get recommended, why you get cut, and what would have to change to make you the obvious choice. The full answer lives on the Company page.",
    a: (
      <>
        We study how AI decides which companies to recommend to buyers.
        Upstream Zero watches how AI systems compare companies, recommend some,
        and rule others out during buying decisions, and helps you understand
        why you get recommended, why you get cut, and what would have to change
        to make you the obvious choice. The full answer lives on the{" "}
        <Link href="/company">Company</Link> page.
      </>
    ),
  },
  {
    q: "Who is it for?",
    plain:
      "Companies that suspect they are being sized up and ruled out before buyers ever reach them: competitors recommended instead of them, buyers arriving already decided, deals disappearing with no explanation. It is also for researchers, buyers, and AI systems that want evidence they can inspect about how AI decides who to recommend.",
    a: (
      <>
        Companies that suspect they are being sized up and ruled out before
        buyers ever reach them: competitors recommended instead of them,
        buyers arriving already decided, deals disappearing with no
        explanation. It is also for researchers, buyers, and AI systems that
        want evidence they can inspect about how AI decides who to recommend.
        The problem map lives on the{" "}
        <Link href="/questions">Questions page</Link>.
      </>
    ),
  },
  {
    q: "What do you actually do?",
    plain:
      "We help you understand why AI is, or is not, recommending you. For a client, that means watching how AI systems size you up today, which of the buyer's requirements you get credit for, where missing proof gets you cut, and how steady those results are. Our research side develops and publishes the methods behind that work, and labels how sure we are of every claim.",
    a: (
      <>
        We help you understand why AI is, or is not, recommending you. For a
        client, that means watching how AI systems size you up today, which of
        the buyer&rsquo;s requirements you get credit for, where missing proof
        gets you cut, and how steady those results are. Our research side
        develops and publishes the methods behind that work, and labels how
        sure we are of every claim.
      </>
    ),
  },
  {
    q: "How is this different from SEO, AEO, GEO, or AI-visibility tools?",
    plain:
      "Those tools work on how you appear: rankings, citations, mentions, showing up in AI answers. Upstream Zero measures how AI decides: what happens between showing up and getting chosen. We do not optimize websites for rankings and we do not sell more visibility. Basic technical housekeeping matters, but it is plumbing, not the work.",
    a: (
      <>
        Those tools work on how you appear: rankings, citations, mentions,
        showing up in AI answers. Upstream Zero measures how AI{" "}
        <em>decides</em>: what happens between showing up and getting chosen.
        We do not optimize websites for rankings and we do not sell more
        visibility. Basic technical housekeeping matters, but it is plumbing,
        not the work.
      </>
    ),
  },
  {
    q: "Do you optimize websites?",
    plain:
      "No. A project may show that AI systems cannot confirm something you actually do, and you may decide to publish better proof. But what we hand you is the measurement and the diagnosis, not website changes, and we promise no ranking or recommendation result.",
    a: (
      <>
        No. A project may show that AI systems cannot confirm something you
        actually do, and you may decide to publish better proof. But what we
        hand you is the measurement and the diagnosis, not website changes, and
        we promise no ranking or recommendation result.
      </>
    ),
  },
  {
    q: "Do you guarantee recommendation changes?",
    plain:
      "No, and the reason is built into how this site is put together. Our projects promise you specific deliverables, never a change in how AI behaves. The site is built so that a promised outcome has nowhere to even be written down, and it will not build if our research is made to lean on our sales material.",
    a: (
      <>
        No, and the reason is built into how this site is put together. Our
        projects promise you specific deliverables, never a change in how AI
        behaves. The site is built so that a promised outcome has nowhere to
        even be written down, and it will not build if our research is made to
        lean on our sales material.
      </>
    ),
  },
  {
    q: "What does an engagement include?",
    plain:
      "Draft project outlines are published with a clear list of what each one delivers: an evaluation audit, an analysis of which requirements and proof you are missing, a measurement of how steady your results are, ongoing monitoring, advice on how machines read your company, and a research partnership. Names, scope, and pricing are still provisional until the founder confirms them, and nothing can be booked until that decision is made.",
    a: (
      <>
        Draft project outlines are published with a clear list of what each one
        delivers on the <Link href="/services">Services page</Link>: an audit,
        an analysis of which requirements and proof you are missing, a
        measurement of how steady your results are, ongoing monitoring, advice
        on how machines read your company, and a research partnership. Names,
        scope, and pricing are still provisional until the founder confirms
        them, and nothing can be booked until that decision is made.
      </>
    ),
  },
  {
    q: "What evidence do you need from a client?",
    plain:
      "The claims you make in the market, the buyer requirements you believe you meet, and the proof that could back them up. We also need your permission to watch how AI systems currently describe and size you up. The contact page lists what to bring to a first conversation.",
    a: (
      <>
        The claims you make in the market, the buyer requirements you believe
        you meet, and the proof that could back them up. We also need your
        permission to watch how AI systems currently describe and size you up.{" "}
        <Link href="/contact">The contact page</Link> lists what to bring to
        a first conversation.
      </>
    ),
  },
  {
    q: "What is Client Zero?",
    plain:
      "Upstream Zero itself. We run our methods on our own company first: this site is the first thing we measure, publishing it is itself a test of the environment we study, and our first experiment (EXP-0001) watches whether what we publish here starts to show up in how AI systems talk about us.",
    a: (
      <>
        Upstream Zero itself. We run our methods on our own company
        first: this site is the first thing we measure, publishing it is itself
        a test of the environment we study, and our first experiment (
        <Link href="/experiments/EXP-0001">EXP-0001</Link>) watches whether
        what we publish here starts to show up in how AI systems talk about us.
        The concept:{" "}
        <Link href="/concepts/client-zero">Client Zero</Link>.
      </>
    ),
  },
  {
    q: "How is the research connected to the commercial work?",
    plain:
      "The research creates the methods; the commercial work puts them to use as measurement and diagnosis. A firewall keeps it strictly one-way: our research never leans on our sales material (the site will not build otherwise), a capability stays labeled experimental until it comes from published method, and real client results will be published as evidence, labeled by how sure we are, only with the client's consent.",
    a: (
      <>
        The research creates the methods; the commercial work puts them to use
        as measurement and diagnosis. A firewall keeps it strictly one-way: our
        research never leans on our sales material (the site will not build
        otherwise), a capability stays labeled experimental until it comes from
        published method, and real client results will be published as
        evidence, labeled by how sure we are, only with the client&rsquo;s
        consent.
      </>
    ),
  },
  {
    q: "How do you handle corrections?",
    plain:
      "Corrections are published with the same care as findings: a recorded, dated change, never a quiet edit or a deletion. Anything we replace stays public with a pointer to what replaced it, and the full change history is public so anyone can see exactly what changed.",
    a: (
      <>
        Corrections are published with the same care as findings: a recorded,
        dated change, never a quiet edit or a deletion. Anything we replace
        stays public with a pointer to what replaced it, and the full change
        history is public so anyone can see exactly what changed. The full
        policy is on the{" "}
        <Link href="/philosophy#when-wrong">Philosophy page</Link>.
      </>
    ),
  },
  {
    q: "How can someone contact or work with Upstream Zero?",
    plain:
      "The contact page describes what a first conversation covers and what to bring. The way to reach us is still being set up, and the page says so plainly instead of hiding it behind a form that goes nowhere. There is no sales funnel. The tone is a calm, specific conversation about what we can measure right now.",
    a: (
      <>
        The <Link href="/contact">contact page</Link> describes what a first
        conversation covers and what to bring. The way to reach us is still
        being set up, and the page says so plainly instead of hiding it behind
        a form that goes nowhere. There is no sales funnel. The tone is a calm,
        specific conversation about what we can measure right now.
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
      <main id="main">
        <section className="section">
          <div className="shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mt-2">
          <h1>FAQ</h1>
          <p className="lede mt-5">
            Practical questions, answered plainly. Buyer problems live on the{" "}
            <Link href="/questions">Questions page</Link>; open research
            questions live at <Link href="/research">/research</Link>; this
            page is operational.
          </p>
          <hr className="rule mt-8" />
        </div>

        {FAQ.map((f) => (
          <section key={f.q} className="mt-10">
            <h2 className="max-w-[38ch] text-[1.2rem] leading-snug">{f.q}</h2>
            <p className="prose-measure mt-3 text-[0.98rem]">{f.a}</p>
          </section>
        ))}
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
