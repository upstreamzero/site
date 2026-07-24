import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byId, byType, inventory, urlFor } from "@/lib/content";
import { evidenceLevel } from "@/lib/evidence";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { ExperimentCard } from "@/components/ExperimentCard";
import { FEATURED_EXPERIMENT_IDS } from "@/lib/featured";

export const metadata: Metadata = {
  title: {
    absolute: "Research: How AI Evaluates & Recommends Vendors | Upstream Zero",
  },
  description:
    "Upstream Zero's public evidence layer documenting dated experiments, observations, findings, and hypotheses about how AI systems evaluate companies, apply requirements, eliminate vendors, and build recommendation sets.",
  ...pageMeta("/research"),
};

export default function Research() {
  const experiments = byType("experiment");
  const inv = inventory();

  /** Featured is a deliberate communication choice, resolved from a small
   *  ID-only list. The framing fields make an experiment eligible for the
   *  card format; they do not make it featured, because auto-featuring every
   *  framed experiment would rebuild the same wall of research as the
   *  library grows. All content still resolves from canonical frontmatter,
   *  and anything not featured remains in the generated library below.
   *  Unresolvable or unpublished IDs are skipped rather than breaking. */
  const featured = FEATURED_EXPERIMENT_IDS.map((id) => byId(id)).filter(
    (e): e is NonNullable<typeof e> => Boolean(e) && e!.type === "experiment",
  );

  const observations = byType("observation");
  const questions = byType("question");
  const hypotheses = byType("hypothesis");
  const methods = byType("method");
  const claims = byType("claim");

  /** Source runs behind a derived record, read from its authored edges. */
  const sourcesOf = (id: string) => {
    const o = byId(id);
    return (o?.edges ?? [])
      .filter((e) => e.rel === "derives-from" || e.rel === "evidenced-by")
      .map((e) => e.to);
  };

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "What We Study | Upstream Zero",
              "/research",
              "Research into how AI systems and reasoning engines evaluate companies, construct requirements, retrieve evidence, and generate commercial recommendations.",
            ),
          }}
        />

        {/* ── Intro ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">The public evidence layer</p>
            <h1 className="mt-5 max-w-[20ch]">
              What we have tested, and what we have only observed.
            </h1>
            <p className="lede mt-7">
              This is Upstream Zero's public evidence layer, not a blog. Every
              experiment, observation, and hypothesis is preserved and dated, so
              the chronology of what we have learned about AI-mediated
              commercial evaluation stays transparent.
            </p>
            <p className="muted mt-5 max-w-[64ch]">
              We study how AI systems evaluate, compare, recommend, and
              eliminate vendors during buying decisions. The records below are
              sorted by evidence level so you can tell, at a glance, what has
              been tested, what has only been observed, and what remains under
              investigation.
            </p>

            <p className="eyebrow mt-10">How to read the evidence</p>
            <dl className="mt-4 grid max-w-[76ch] gap-x-8 gap-y-3 text-[0.9375rem] sm:grid-cols-[max-content_1fr]">
              <dt><span className="ev ev-hypothesis">Hypothesis</span></dt>
              <dd className="muted m-0">Proposed and still under test.</dd>
              <dt><span className="ev ev-experiment">Experiment</span></dt>
              <dd className="muted m-0">
                A dated run with a recorded result and its conditions.
              </dd>
              <dt><span className="ev ev-observation">Observation</span></dt>
              <dd className="muted m-0">
                A pattern seen across runs, not yet established.
              </dd>
              <dt><span className="ev ev-finding">Finding</span></dt>
              <dd className="muted m-0">
                Accepted only after replication and scrutiny.
              </dd>
            </dl>
            <p className="muted mt-6 max-w-[64ch] text-[0.9375rem]">
              We separate what we observed from what we infer, hypothesize, or
              have replicated. Nothing here implies cause unless a controlled
              test supports it, and we print the zeros.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Featured ────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Featured experiments</p>
            <h2 className="mt-5 max-w-[22ch]">
              The runs that answer the biggest business questions.
            </h2>
            {featured.length > 0 ? (
              <div className="mt-12 grid gap-4 lg:grid-cols-2">
                {featured.map((e) => (
                  <ExperimentCard key={e.id} obj={e} />
                ))}
              </div>
            ) : (
              <p className="lede mt-8">
                No experiment has been reviewed into the business framing yet.
                This section fills as experiments are reviewed, not by
                selection.
              </p>
            )}
          </div>
        </section>

        {/* ── Browse all ──────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Browse all experiments</p>
            <h2 className="mt-5 max-w-[24ch]">
              The complete library, generated automatically.
            </h2>
            <p className="lede mt-6">
              Every experiment in the program, including the runs still being
              reviewed into the format above.
            </p>
            <ul className="browse mt-10">
              {experiments.map((e) => (
                <li key={e.id}>
                  <Link href={urlFor(e)}>
                    <span className="browse-id">{e.id}</span>
                    <span className="browse-title">
                      {e.category ? `${e.category}: ` : ""}
                      {e.title}
                    </span>
                    <span className="browse-meta">
                      {e.status}
                      {e.outcome ? ` · ${e.outcome}` : ""}
                      {e.created ? ` · ${e.created}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="callout mt-12 max-w-[70ch]">
              <p>
                <strong>What Closed means.</strong> A completed experiment is
                evidence of what occurred under its recorded conditions. Closed
                means the run is finished, not that the result is a universal
                truth. Replication, causal support, cross-evaluator agreement,
                and real-world corroboration are what let a conclusion travel
                further.
              </p>
            </div>
          </div>
        </section>

        {/* ── Observations ────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="mt-12">
              <span className="ev ev-observation">Observations</span>
            </p>
            <h2 className="mt-5 max-w-[26ch]">
              Patterns seen across runs, not yet established.
            </h2>
            <p className="lede mt-6">
              Candidate observations drawn from more than one experiment. Each is
              held at its honest level, names the runs it derives from, and is
              not a finding.
            </p>
            {observations.length > 0 ? (
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {observations.map((o) => {
                  const src = sourcesOf(o.id);
                  return (
                    <article key={o.id} className="card exp-card">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="ev ev-observation">
                          {evidenceLevel(o).label}
                        </span>
                        <span className="chip">{o.status}</span>
                        {o.created && (
                          <time className="chip" dateTime={o.created}>
                            {o.created}
                          </time>
                        )}
                      </div>
                      <h3 className="mt-6">
                        <Link href={urlFor(o)}>{o.title}</Link>
                      </h3>
                      {src.length > 0 && (
                        <p className="muted mt-3 text-[0.9375rem]">
                          Derived from{" "}
                          {src.map((s, i) => {
                            const t = byId(s);
                            return (
                              <span key={s}>
                                {i > 0 && ", "}
                                {t ? (
                                  <Link href={urlFor(t)}>{s}</Link>
                                ) : (
                                  s
                                )}
                              </span>
                            );
                          })}
                          .
                        </p>
                      )}
                      {o.commercialRelevance?.currentConfidence && (
                        <p className="mt-3 text-[0.9375rem]">
                          {o.commercialRelevance.currentConfidence}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="lede mt-8">No observations published yet.</p>
            )}
          </div>
        </section>

        {/* ── Hypotheses and open questions ───────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div>
                <p>
                  <span className="ev ev-hypothesis">Hypotheses under test</span>
                </p>
                <h2 className="mt-5 max-w-[20ch]">
                  What we are actively testing.
                </h2>
                <ul className="mt-8 list-none space-y-0 p-0">
                  {hypotheses.map((h) => (
                    <li
                      key={h.id}
                      className="border-t py-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span className="voice-mono-data muted">
                        {h.id} · {h.created}
                      </span>
                      <Link href={urlFor(h)} className="mt-1 block">
                        {h.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">Open questions</p>
                <h2 className="mt-5 max-w-[20ch]">What remains unknown.</h2>
                <ul className="mt-8 list-none space-y-0 p-0">
                  {questions.map((q) => (
                    <li
                      key={q.id}
                      className="border-t py-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span className="voice-mono-data muted">
                        {q.id} · {q.created}
                      </span>
                      <Link href={urlFor(q)} className="mt-1 block">
                        {q.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Findings and methods ────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="card">
                <p>
                  <span className="ev ev-finding">Findings</span>
                </p>
                <div className="stat-n mt-4">{inv.findings}</div>
                <div className="stat-label">Accepted findings</div>
                <p className="muted mt-4 text-[0.9375rem]">
                  Zero, and we print it. A finding is accepted only after
                  replication and scrutiny we have not yet accumulated.{" "}
                  {claims.length} founding claims are published at their tier in
                  the <Link href="/claims">claims ledger</Link>.
                </p>
              </div>
              <div className="card">
                <div className="stat-n">{methods.length}</div>
                <div className="stat-label">Methods</div>
                <p className="muted mt-4 text-[0.9375rem]">
                  How anything here earns its evidence tier.{" "}
                  <Link href="/methods">How we work</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
