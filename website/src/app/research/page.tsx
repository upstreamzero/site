import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: { absolute: "Commercial Evaluation Research | Upstream Zero" },
  description:
    "Research into how AI systems and reasoning engines evaluate companies, construct requirements, retrieve evidence, and generate commercial recommendations.",
  ...pageMeta("/research"),
};

export default function Research() {
  const questions = byType("question");
  const hypotheses = byType("hypothesis");
  const experiments = byType("experiment");
  const findings = byType("finding");
  const observations = byType("observation");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd("CollectionPage", "Commercial Evaluation Research | Upstream Zero", "/research", "Research into how AI systems and reasoning engines evaluate companies, construct requirements, retrieve evidence, and generate commercial recommendations."),
          }}
        />
        <header className="mt-12">
          <h1>Research</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Everything the rest of this site tells you rests on what is
            published here. Every project starts with a question. If the
            question survives scrutiny, it becomes a hypothesis. Then an
            experiment we can run. Observations accumulate from there;
            findings come last, if they come at all. An experiment we have
            registered but not yet run still belongs here. The first thing we
            test is our own premise. See H-1.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Questions · {questions.length}</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {questions.map((q) => (
              <li key={q.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{q.id} · {q.status}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(q)}>{q.title}</Link></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Hypotheses · {hypotheses.length}</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {hypotheses.map((h) => (
              <li key={h.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{h.id} · {h.status}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(h)}>{h.title}</Link></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Experiments · {experiments.length}</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {experiments.map((e) => (
              <li key={e.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{e.id} · {e.status}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(e)}>{e.title}</Link></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Observations · {observations.length}</h2>
          {observations.length === 0 && (
            <EmptyState>
              No observations have been published. The first one will carry
              its instrument stamp. That records the evaluator, version,
              access mode, date, and sampling conditions. This empty state
              will be replaced by data, not by copy.
            </EmptyState>
          )}
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Findings · {findings.length}</h2>
          {findings.length === 0 && (
            <EmptyState>
              No findings exist. A finding requires observations to derive
              from, and there are none yet. Nothing on this site will imply
              otherwise.
            </EmptyState>
          )}
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
