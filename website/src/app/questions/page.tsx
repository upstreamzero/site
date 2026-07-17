import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { PROBLEM_AREAS } from "@/lib/buyerQuestions";

export const metadata: Metadata = {
  title: { absolute: "Research Questions | Upstream Zero" },
  description:
    "The questions guiding Upstream Zero research into AI retrieval, requirement formation, evidence use, recommendation stability, and commercial evaluation.",
  ...pageMeta("/questions"),
};

/** Institutional questions live on /philosophy; this index points at them. */
const INSTITUTIONAL: { label: string; anchor: string }[] = [
  { label: "Can commercial evaluation be studied?", anchor: "can-evaluation-be-studied" },
  { label: "Why should anyone believe what this site says?", anchor: "why-believe" },
  { label: "What happens when this site is wrong?", anchor: "when-wrong" },
  { label: "Doesn't publishing your research change the thing you study?", anchor: "client-zero" },
  { label: "If companies pay you, how is the research neutral?", anchor: "neutrality" },
  { label: "What kind of institution is this?", anchor: "what-institution" },
];

export default function Questions() {
  const research = byType("question");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd("CollectionPage", "Research Questions | Upstream Zero", "/questions", "The questions guiding Upstream Zero research into AI retrieval, requirement formation, evidence use, recommendation stability, and commercial evaluation."),
          }}
        />
        <header className="mt-12">
          <h1>Questions</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Every one of these starts as the same executive problem: you are
            being evaluated before buyers engage you directly, and you cannot
            see how. Below are the specific versions of that problem we are
            built to investigate, then the open research questions behind
            them, and the questions people ask about how Upstream Zero itself
            works.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        {/* 1 · buyer questions */}
        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            1 · Buyer questions
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            The commercial problems Upstream Zero is built to investigate.
            Answer pages are rolling out; questions without one yet are marked.
          </p>
          {PROBLEM_AREAS.map((area) => (
            <div key={area.anchor} id={area.anchor} className="mt-8 scroll-mt-8">
              <h3 className="voice-mono" style={{ color: "var(--needle)" }}>
                {area.label}
              </h3>
              <ul className="mt-3 list-none space-y-3 p-0">
                {area.questions.map((bq) => (
                  <li key={bq.q} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                    {bq.href ? (
                      <div className="max-w-[58ch]">
                        <Link href={bq.href}>{bq.q}</Link>
                      </div>
                    ) : (
                      <div className="max-w-[58ch]">
                        {bq.q}{" "}
                        <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                          · answer page pending
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="measure mt-8 text-[0.85rem]" style={{ color: "var(--ink-60)" }}>
            A note on how these earned their place: we wrote them to help you
            find your problem. None is yet backed by captured evidence that
            buyers actually ask it. When that evidence exists, the question
            moves to observed in a recorded revision.
          </p>
        </section>

        {/* 2 · research questions */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            2 · Research questions
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Open questions the observatory is actively investigating. Each is
            a graph object with declared answer conditions, commercial
            relevance, and machine renderings. The full pipeline lives at{" "}
            <Link href="/research">/research</Link>.
          </p>
          <ul className="mt-4 list-none space-y-4 p-0">
            {research.map((q) => (
              <li key={q.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  {q.id} · {q.status}
                </span>
                <div className="mt-1 max-w-[58ch]">
                  <Link href={urlFor(q)}>{q.title}</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 3 · institutional questions */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            3 · Institutional questions
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            How this institution works: its epistemics, corrections,
            conflicts of interest, and identity. Answered in full on the{" "}
            <Link href="/philosophy">Philosophy page</Link>.
          </p>
          <ul className="mt-4 list-none space-y-3 p-0">
            {INSTITUTIONAL.map((iq) => (
              <li key={iq.anchor} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <div className="max-w-[58ch]">
                  <Link href={`/philosophy#${iq.anchor}`}>{iq.label}</Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="measure mt-4 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Practical questions live on the <Link href="/faq">FAQ</Link>: what
            Upstream Zero is, who it is for, what an engagement includes.
          </p>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
