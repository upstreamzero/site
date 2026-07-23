import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byId, byType, inventory, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { ExperimentCard } from "@/components/ExperimentCard";
import { FEATURED_EXPERIMENT_IDS } from "@/lib/featured";

/** Metadata and structured data are unchanged by the redesign: presentation
 *  only, so the machine surfaces stay stable and attributable. */
export const metadata: Metadata = {
  title: { absolute: "What We Study | Upstream Zero" },
  description:
    "Research into how AI systems and reasoning engines evaluate companies, construct requirements, retrieve evidence, and generate commercial recommendations.",
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

  const questions = byType("question");
  const hypotheses = byType("hypothesis");
  const methods = byType("method");
  const claims = byType("claim");

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
            <p className="eyebrow">The research program</p>
            <h1 className="mt-5 max-w-[16ch]">
              What are we trying to learn?
            </h1>
            <p className="lede mt-7">
              Research is the public evidence layer behind Upstream Zero. Every
              experiment is preserved so observations, limitations, uncertainty,
              and findings remain transparent.
            </p>
            <p className="muted mt-5 max-w-[64ch]">
              We conduct this research to better understand how AI systems
              evaluate, compare, recommend, and eliminate vendors during
              commercial buying decisions. Those observations help organizations
              understand why they are recommended, why they are eliminated, and
              what must become true to become a logical choice.
            </p>
            <dl className="mt-9 grid max-w-[72ch] gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-[max-content_1fr]">
              <dt className="font-medium">Research</dt>
              <dd className="muted m-0">contains observed evidence.</dd>
              <dt className="font-medium">Learn</dt>
              <dd className="muted m-0">
                explains concepts and terminology.
              </dd>
              <dt className="font-medium">Methodology</dt>
              <dd className="muted m-0">
                explains how the evidence is produced.
              </dd>
              <dt className="font-medium">Experiments</dt>
              <dd className="muted m-0">
                are the individual preserved records that make up the research.
              </dd>
            </dl>
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

        {/* ── The rest of the library ─────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-12">The rest of the library</p>
            <h2 className="mt-5 max-w-[22ch]">
              Everything the experiments rest on.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card">
                <div className="stat-n">{questions.length}</div>
                <div className="stat-label">Open questions</div>
                <ul className="mt-4 list-none space-y-2 p-0 text-[0.9375rem]">
                  {questions.map((q) => (
                    <li key={q.id}>
                      <Link href={urlFor(q)}>{q.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <div className="stat-n">{hypotheses.length}</div>
                <div className="stat-label">Hypotheses under test</div>
                <ul className="mt-4 list-none space-y-2 p-0 text-[0.9375rem]">
                  {hypotheses.map((h) => (
                    <li key={h.id}>
                      <Link href={urlFor(h)}>{h.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <div className="stat-n">{methods.length}</div>
                <div className="stat-label">Methods</div>
                <p className="muted mt-4 text-[0.9375rem]">
                  How anything here earns its evidence tier.{" "}
                  <Link href="/methods">How we work</Link>
                </p>
              </div>
              <div className="card">
                <div className="stat-n">{inv.findings}</div>
                <div className="stat-label">Accepted findings</div>
                <p className="muted mt-4 text-[0.9375rem]">
                  Zero, and we print it. A finding requires evidence we have
                  not yet accumulated. {claims.length} founding claims are
                  published at their tier in the{" "}
                  <Link href="/claims">claims ledger</Link>.
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
