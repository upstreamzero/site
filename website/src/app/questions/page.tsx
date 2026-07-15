import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { PROBLEM_AREAS } from "@/lib/buyerQuestions";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "The human entry point into the knowledge graph: buyer questions, research questions, and institutional questions — kept distinct, each labeled by how it earned its place.",
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
        <header className="mt-12">
          <h1 className="text-[1.75rem]">Questions</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Questions are the human interface to this site; the graph is the
            machine interface. Three kinds live here, kept deliberately
            distinct: <strong>buyer questions</strong> (the commercial
            problems this work exists to address), <strong>research
            questions</strong> (what the observatory is investigating), and{" "}
            <strong>institutional questions</strong> (how Upstream Zero
            itself works). Each is labeled by how it earned its place.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        {/* 1 · buyer questions */}
        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            1 · Buyer questions
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            These are questions that represent the commercial problems
            Upstream Zero is currently built to investigate. Classification
            honesty: they are <strong>editorial navigation</strong>, not
            observed in captured buyer or evaluator behavior — no claim is
            made that they are frequently asked, common, or top buyer
            questions. When admissible evidence shows a question actually
            arising in evaluation, it will be reclassified in a recorded
            revision. Answer pages are rolling out; questions without one yet
            are marked.
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
        </section>

        {/* 2 · research questions */}
        <section className="mt-14">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
            2 · Research questions
          </h2>
          <p className="measure mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            Open questions the observatory is actively investigating — graph
            objects with declared answer conditions, commercial relevance,
            and machine renderings. The full pipeline lives at{" "}
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
            Practical questions — what Upstream Zero is, who it is for, what
            an engagement includes — live on the <Link href="/faq">FAQ</Link>.
          </p>
        </section>
      </main>
      <ProvenanceFooter renderedFrom={["content graph", "editorial problem map (buyer revision v1)"]} />
    </>
  );
}
