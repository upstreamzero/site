import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { EmptyState } from "@/components/EmptyState";
import { FounderDecision } from "@/components/FounderDecision";
import { TIERS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Methods",
  ...pageMeta("/methods"),
};

export default function Methods() {
  const methods = byType("method");
  const instruments = byType("instrument");
  const concepts = byType("concept");

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <h1>Methods, instruments, and vocabulary</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            When we say we measure evaluation, this page is what the word
            measure means. It is how anything on this site earns its tier.
            Methods are versioned instruments under development, not
            standards. The observatory is still discovering what should be
            measured, and says so.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

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
