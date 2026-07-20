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

/** How a run is conducted, in plain language. */
const STEPS = [
  {
    n: "01",
    title: "Start with a commercial question",
    body: "The run has to connect to a real decision, exclusion, requirement, or evidence problem.",
  },
  {
    n: "02",
    title: "Define the conditions",
    body: "We record the exact wording, the evaluator, its version, access mode, date, and sampling conditions.",
  },
  {
    n: "03",
    title: "Run it fresh, more than once",
    body: "Repeated runs reduce the chance that one favourable or unfavourable answer gets mistaken for a pattern.",
  },
  {
    n: "04",
    title: "Keep the original output",
    body: "The raw answer stays available for inspection. A summary is never treated as the source.",
  },
  {
    n: "05",
    title: "Record only what occurred",
    body: "Inclusion, recommendation, exclusion, evidence use, and next-step behaviour are recorded separately.",
  },
  {
    n: "06",
    title: "State the limitation",
    body: "A system's stated reason is evidence of what it said, not proof of how it actually works.",
  },
];

export default function Methods() {
  const methods = byType("method");
  const instruments = byType("instrument");
  const concepts = byType("concept");

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "How We Work | Upstream Zero",
              "/methods",
              "How Upstream Zero observes, records, and measures commercial evaluation events across AI systems while separating observation from optimization.",
            ),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">How we work</p>
            <h1 className="mt-5 max-w-[20ch]">
              The experiments are the evidence.
            </h1>
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
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <p className="eyebrow">How a run is conducted</p>
            <h2 className="mt-5 max-w-[22ch]">
              Six steps, the same way every time.
            </h2>
            <ol className="steps steps-3 mt-12">
              {STEPS.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">How strong is the evidence</p>
            <h2 className="mt-5 max-w-[24ch]">
              Six levels, weakest to strongest.
            </h2>
            <ol className="browse mt-10">
              {TIERS.map((t, i) => (
                <li key={t}>
                  <span className="flex items-baseline gap-5 py-[1.15rem]">
                    <span className="browse-id">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="browse-title">{t}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="muted mt-8 max-w-[62ch] text-[0.9375rem]">
              The order is settled. What each level requires is not. Everything
              on this site currently sits at the weakest level.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Published methods</p>
            <h2 className="mt-5 max-w-[24ch]">
              The procedures behind the runs.
            </h2>
            <ul className="browse mt-10">
              {methods.map((m) => (
                <li key={m.id}>
                  <Link href={urlFor(m)}>
                    <span className="browse-id">{m.id}</span>
                    <span className="browse-title">{m.title}</span>
                    <span className="browse-meta">{m.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-[70ch]">
              <FounderDecision id="FD-1">
                What each evidence level requires is a founder decision, still
                being worked out: how many runs count as replication, and what
                counts as real-world corroboration. Until that exists,
                everything here stays at the weakest level.
              </FounderDecision>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Instruments · {instruments.length}</p>
              <h2 className="mt-5 max-w-[20ch]">What does the measuring.</h2>
              {instruments.length === 0 && (
                <div className="mt-8">
                  <EmptyState>
                    None registered yet. As observation scales, each evaluator
                    becomes its own record carrying model, version, and access
                    mode, and every observation carries that stamp. AI systems
                    are the current instrument class, not the only possible
                    one.
                  </EmptyState>
                </div>
              )}
            </div>
            <div>
              <p className="eyebrow">Vocabulary · {concepts.length}</p>
              <h2 className="mt-5 max-w-[20ch]">The terms we use precisely.</h2>
              <ul className="mt-8 list-none space-y-3 p-0 text-[0.9688rem]">
                {concepts.map((c) => (
                  <li key={c.id}>
                    <Link href={urlFor(c)}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
