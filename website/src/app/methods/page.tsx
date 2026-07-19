import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { EmptyState } from "@/components/EmptyState";
import { FounderDecision } from "@/components/FounderDecision";
import { TIERS } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "How We Work | Upstream Zero" },
  description:
    "How Upstream Zero observes, records, and measures commercial evaluation events across AI systems while separating observation from optimization.",
  ...pageMeta("/methods"),
};

export default function Methods() {
  const methods = byType("method");
  const instruments = byType("instrument");
  const concepts = byType("concept");

  return (
    <>
      <main id="main" className="shell section-tight">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd("CollectionPage", "How We Work | Upstream Zero", "/methods", "How Upstream Zero observes, records, and measures commercial evaluation events across AI systems while separating observation from optimization."),
          }}
        />
        <div className="mt-2">
          <p className="eyebrow">How we work</p>
          <h1 className="mt-5 max-w-[20ch]">The experiments are the evidence.</h1>
          <p className="lede mt-7">
            Our method decides what that evidence can support. We record the
            exact question, the evaluator, and the conditions, we keep the
            original output, and we keep what happened separate from what we
            think it means.
          </p>
          <p className="lede mt-5">
            The instruments are standardized and still being validated. That
            means we report what we observed. It does not mean we certify it.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </div>

        <section className="mt-10">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>The evidence hierarchy</h2>
          <ol className="mt-3 max-w-[58ch] list-none space-y-1 p-0 voice-mono-data">
            {TIERS.map((t, i) => (
              <li key={t} className="flex gap-4 border-b py-2" style={{ borderColor: "var(--ink-18)" }}>
                <span style={{ color: "var(--ink-60)" }}>{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <p className="measure mt-3 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
            The order is settled. What each tier requires is not. See M-1
            below.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Methods · {methods.length}</h2>
          <ul className="mt-3 list-none space-y-4 p-0">
            {methods.map((m) => (
              <li key={m.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{m.id} · {m.status}</span>
                <div className="mt-1 max-w-[58ch]"><Link href={urlFor(m)}>{m.title}</Link></div>
              </li>
            ))}
          </ul>
          <FounderDecision id="FD-1">
            M-1&apos;s tier definitions are a founder decision, still being
            worked out. They cover what qualifies a claim for each tier, how
            many runs count as replication, and what counts as real-world
            corroboration. Until they exist, every claim on this site is
            presented at Narrated.
          </FounderDecision>
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Instrument registry · {instruments.length}</h2>
          {instruments.length === 0 && (
            <EmptyState>
              No instruments are registered. When observation begins, each
              evaluator becomes a distinct instrument record, carrying its
              model, version, and access mode, and every observation carries
              that stamp. AI evaluators are the current instrument class. The
              registry is not AI-specific.
            </EmptyState>
          )}
        </section>

        <section className="mt-12">
          <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>Vocabulary · {concepts.length}</h2>
          <ul className="mt-3 list-none space-y-3 p-0">
            {concepts.map((c) => (
              <li key={c.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
                <div className="max-w-[58ch]"><Link href={urlFor(c)}>{c.title}</Link></div>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>{c.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
