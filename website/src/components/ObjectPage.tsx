import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { UZObject } from "@/lib/schema";
import { backEdges, byId, urlFor } from "@/lib/content";
import { objectLd, breadcrumbLd } from "@/lib/meta";
import { evidenceLevel } from "@/lib/evidence";
import { RESEARCH_COMPONENTS, componentStateClass } from "@/lib/researchComponents";
import { BUSINESS_QUESTIONS } from "@/lib/businessQuestions";
import { TierScale } from "./TierScale";
import { ProvenanceFooter } from "./SiteChrome";
import { FounderDecision } from "./FounderDecision";

const COMPONENT_SET = new Set<string>(RESEARCH_COMPONENTS);

/** One renderer for all seventeen object types. Every future experiment,
 *  observation, finding, method, or concept inherits this presentation and
 *  the design system automatically, with no per-object work.
 *
 *  The title block is a plain container rather than a <header> so each page
 *  exposes exactly one banner landmark (the site header). */
export function ObjectPage({ obj }: { obj: UZObject }) {
  const incoming = backEdges(obj.id);
  const hasRelationships = obj.edges.length > 0 || incoming.length > 0;

  // ── Research-component wiring (Phase 2) ──
  const isComponent = obj.type === "concept" && COMPONENT_SET.has(obj.id);

  // For a research object: the components it is part of (primary first).
  const partOfComponents = obj.edges
    .filter((e) => e.rel === "part-of" && COMPONENT_SET.has(e.to))
    .map((e) => byId(e.to))
    .filter((c): c is UZObject => Boolean(c));
  const primaryComponent = partOfComponents[0] ?? null;
  const relatedObjComponents = partOfComponents.slice(1);
  const objComponentSlugs = partOfComponents.map((c) => c.id);
  const objBusinessQuestions = BUSINESS_QUESTIONS.filter((bq) =>
    bq.components.some((c) => objComponentSlugs.includes(c)),
  );

  // For a component page: the evidence that is part of it, and siblings.
  const members = incoming.filter((r) => r.rel === "part-of").map((r) => r.from);
  const sortByDate = (a: UZObject, b: UZObject) =>
    (b.created ?? "").localeCompare(a.created ?? "");
  const memberExperiments = members
    .filter((o) => o.type === "experiment")
    .sort(sortByDate);
  const memberObservations = members
    .filter((o) => o.type === "observation")
    .sort(sortByDate);
  const componentBusinessQuestions = isComponent
    ? BUSINESS_QUESTIONS.filter((bq) => bq.components.includes(obj.id))
    : [];
  const relatedComponents = isComponent
    ? [
        ...new Set(
          members.flatMap((m) =>
            m.edges
              .filter((e) => e.rel === "part-of" && e.to !== obj.id)
              .map((e) => e.to),
          ),
        ),
      ]
        .filter((slug) => COMPONENT_SET.has(slug))
        .map((slug) => byId(slug))
        .filter((c): c is UZObject => Boolean(c))
    : [];

  const RESEARCH_LISTING = new Set([
    "experiment",
    "observation",
    "finding",
    "hypothesis",
  ]);
  const crumbComponent = isComponent ? obj : primaryComponent;

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: objectLd(obj, urlFor(obj), {
              isComponent,
              summary: obj.summary,
              components: partOfComponents.map((c) => ({
                path: urlFor(c),
                name: c.title,
              })),
              members: isComponent
                ? [...memberExperiments, ...memberObservations].map((m) => ({
                    path: urlFor(m),
                    name: m.title,
                  }))
                : undefined,
            }),
          }}
        />
        {(RESEARCH_LISTING.has(obj.type) || isComponent) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: breadcrumbLd(
                isComponent
                  ? [
                      ["Research", "/research"],
                      [obj.title, urlFor(obj)],
                    ]
                  : primaryComponent
                    ? [
                        ["Research", "/research"],
                        [primaryComponent.title, urlFor(primaryComponent)],
                        [obj.title, urlFor(obj)],
                      ]
                    : [
                        ["Research", "/research"],
                        [obj.title, urlFor(obj)],
                      ],
              ),
            }}
          />
        )}

        {/* ── Title block ─────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            {(RESEARCH_LISTING.has(obj.type) || isComponent) && (
              <nav
                aria-label="Breadcrumb"
                className="voice-mono-data muted mb-4"
              >
                <Link href="/research">Research</Link>
                {isComponent ? (
                  <> {" / "} Components</>
                ) : (
                  crumbComponent && (
                    <>
                      {" / "}
                      <Link href={urlFor(crumbComponent)}>
                        {crumbComponent.title}
                      </Link>
                    </>
                  )
                )}
              </nav>
            )}
            {/* The category leads when it exists; otherwise the object type.
                Either way the ID stays visible in the chip row. */}
            <p className="eyebrow">{obj.category ?? obj.type}</p>
            <h1 className="mt-5 max-w-[24ch]">{obj.title}</h1>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="chip">{obj.id}</span>
              <span className="chip">status · {obj.status}</span>
              {obj.outcome && (
                <span className="chip chip-accent">
                  outcome · {obj.outcome}
                </span>
              )}
              <span className="chip">{obj.created}</span>
            </div>
            {isComponent && obj.summary && (
              <p className="lede mt-7 max-w-[62ch]">{obj.summary}</p>
            )}
            {obj.tier && (
              <div className="mt-6">
                <p className="eyebrow">Evidence tier</p>
                <div className="mt-2">
                  <TierScale tier={obj.tier} />
                </div>
              </div>
            )}

            {/* ── Executive summary. Scannable in seconds, and the first
                 thing both a reader and a retrieval system meet. ────── */}
            {(obj.question || obj.businessProblem || obj.observedResult) && (
              <>
                <dl className="summary mt-12">
                {obj.question && (
                  <div className="summary-row">
                    <dt className="eyebrow">Question</dt>
                    <dd>{obj.question}</dd>
                  </div>
                )}
                {obj.businessProblem && (
                  <div className="summary-row">
                    <dt className="eyebrow">Business problem</dt>
                    <dd>{obj.businessProblem}</dd>
                  </div>
                )}
                {obj.observedResult && (
                  <div className="summary-row">
                    <dt className="eyebrow">Observed result</dt>
                    <dd>{obj.observedResult}</dd>
                  </div>
                )}
              </dl>

                {obj.roles && obj.roles.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow">Who this matters to</p>
                    {/* The tag is the navigation. A deeper per-role
                        explanation is the future destination, so roles stay
                        structured data and this list becomes links when
                        those pages exist. */}
                    <ul className="mt-3 flex flex-wrap gap-2 p-0">
                      {obj.roles.map((r) => (
                        <li key={r} className="tag">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {primaryComponent && (
              <div className="mt-10 max-w-[68ch]">
                <p className="eyebrow">Research components</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={urlFor(primaryComponent)}
                    className="chip chip-accent"
                  >
                    Primary · {primaryComponent.title}
                  </Link>
                  {relatedObjComponents.map((c) => (
                    <Link key={c.id} href={urlFor(c)} className="chip">
                      {c.title}
                    </Link>
                  ))}
                </div>
                {objBusinessQuestions.length > 0 && (
                  <div className="mt-6">
                    <p className="eyebrow">Answers business questions</p>
                    <ul className="mt-2 list-none space-y-1 p-0 text-[0.9375rem]">
                      {objBusinessQuestions.map((bq) => (
                        <li key={bq.slug} className="muted">
                          {bq.q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            {obj.founderDecision && (
              <div className="mb-10 max-w-[68ch]">
                <FounderDecision id={obj.founderDecision}>
                  This object is gated on a decision only the founder can make.
                  Its current content is provisional and marked as such.
                </FounderDecision>
              </div>
            )}

            {obj.observationType === "rationale" && (
              <div className="callout mb-10 max-w-[68ch]">
                <p>
                  <strong>Evaluator rationale.</strong> This records observed
                  narration, not mechanism. It is capped at Narrated for any
                  claim about how the system actually works.
                </p>
              </div>
            )}

            <div className="prose-uz">
              <MDXRemote source={obj.body || "*No body text.*"} />
            </div>

            {obj.predictions && obj.predictions.length > 0 && (
              <div className="mt-14 max-w-[68ch]">
                <p className="eyebrow">Predictions, registered before results</p>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {obj.predictions.map((p) => (
                    <li
                      key={p}
                      className="border-l pl-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {obj.refutationConditions &&
              obj.refutationConditions.length > 0 && (
                <div className="mt-14 max-w-[68ch]">
                  <p className="eyebrow">What would refute this</p>
                  <ul className="mt-4 list-none space-y-3 p-0">
                    {obj.refutationConditions.map((p) => (
                      <li
                        key={p}
                        className="border-l pl-4"
                        style={{ borderColor: "var(--line)" }}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {obj.nonPromises && obj.nonPromises.length > 0 && (
              <div className="mt-14 max-w-[68ch]">
                <p className="eyebrow">Explicit non-promises</p>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {obj.nonPromises.map((p) => (
                    <li
                      key={p}
                      className="border-l pl-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {obj.runLog && obj.runLog.length > 0 && (
              <div className="mt-14 max-w-[68ch]">
                <p className="eyebrow">Run log</p>
                <ul className="mt-4 list-none space-y-5 p-0">
                  {obj.runLog.map((r) => (
                    <li
                      key={r.runId}
                      className="border-l pl-4"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span className="voice-mono-data muted">
                        {r.runId} · {r.date} · {r.environment} · {r.status}
                        {r.supersedes ? ` · supersedes ${r.supersedes}` : ""}
                      </span>
                      {r.evidence.length > 0 && (
                        <div className="voice-mono-data mt-1">
                          evidence:{" "}
                          {r.evidence.map((eid, i) => {
                            const t = byId(eid);
                            return (
                              <span key={eid}>
                                {i > 0 && " · "}
                                {t ? <Link href={urlFor(t)}>{eid}</Link> : eid}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      {r.deviations.length > 0 && (
                        <p className="muted mt-1 text-[0.9rem]">
                          Deviations: {r.deviations.join("; ")}
                        </p>
                      )}
                      {r.note && <p className="mt-1 text-[0.9rem]">{r.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {obj.commercialRelevance && (
              <div className="card mt-14 max-w-[70ch]">
                <p className="eyebrow">What this means commercially</p>
                <dl className="mt-4 grid grid-cols-[max-content_1fr] gap-x-8 gap-y-3 text-[0.9375rem]">
                  <dt className="muted">Affected buyers</dt>
                  <dd className="m-0">
                    {obj.commercialRelevance.affectedBuyers}
                  </dd>
                  <dt className="muted">Affected categories</dt>
                  <dd className="m-0">
                    {obj.commercialRelevance.affectedCategories}
                  </dd>
                  <dt className="muted">Potential product impact</dt>
                  <dd className="m-0">
                    {obj.commercialRelevance.potentialProductImpact}
                  </dd>
                  <dt className="muted">Current confidence</dt>
                  <dd className="m-0">
                    {obj.commercialRelevance.currentConfidence}
                  </dd>
                  <dt className="muted">Evidence tier</dt>
                  <dd className="m-0">
                    {obj.tier ?? "Narrated (untiered type)"}
                  </dd>
                </dl>
              </div>
            )}
          </div>
        </section>

        {/* ── Component evidence rollup (Phase 2) ─────────────── */}
        {isComponent && (
          <section className="section-tight">
            <div className="shell">
              <hr className="rule" />
              <p className="eyebrow mt-12">Evidence in this component</p>
              <h2 className="mt-5 max-w-[26ch]">
                {memberExperiments.length + memberObservations.length > 0
                  ? "What we have run, and what we have seen."
                  : "No published evidence yet."}
              </h2>

              {memberExperiments.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow">
                    <span className="ev ev-experiment">Experiments</span>
                  </p>
                  <ul className="browse mt-6">
                    {memberExperiments.map((e) => (
                      <li key={e.id}>
                        <Link href={urlFor(e)}>
                          <span className="browse-id">{e.id}</span>
                          <span className="browse-title">
                            {e.category ? `${e.category}: ` : ""}
                            {e.title}
                          </span>
                          <span className="browse-meta">
                            {evidenceLevel(e).label}
                            {e.outcome ? ` · ${e.outcome}` : ""}
                            {e.created ? ` · ${e.created}` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {memberObservations.length > 0 && (
                <div className="mt-12">
                  <p className="eyebrow">
                    <span className="ev ev-observation">Observations</span>
                  </p>
                  <ul className="mt-6 list-none space-y-0 p-0">
                    {memberObservations.map((o) => (
                      <li
                        key={o.id}
                        className="border-t py-4"
                        style={{ borderColor: "var(--line)" }}
                      >
                        <span className="voice-mono-data muted">
                          {o.status} · {o.created}
                        </span>
                        <Link href={urlFor(o)} className="mt-1 block">
                          {o.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                {relatedComponents.length > 0 && (
                  <div>
                    <p className="eyebrow">Related components</p>
                    <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                      {relatedComponents.map((c) => (
                        <li key={c.id}>
                          <Link href={urlFor(c)}>{c.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {componentBusinessQuestions.length > 0 && (
                  <div>
                    <p className="eyebrow">Relevant business questions</p>
                    <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                      {componentBusinessQuestions.map((bq) => (
                        <li key={bq.slug} className="muted">
                          {bq.q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Relationships and provenance ────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {hasRelationships && (
                <>
                  {obj.edges.length > 0 && (
                    <div>
                      <p className="eyebrow">This object references</p>
                      <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                        {obj.edges.map((e, i) => {
                          const t = byId(e.to);
                          return (
                            <li key={i}>
                              <span className="muted">{e.rel} → </span>
                              {t ? (
                                <Link href={urlFor(t)}>{e.to}</Link>
                              ) : (
                                e.to
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {incoming.length > 0 && (
                    <div>
                      <p className="eyebrow">Referenced by</p>
                      <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                        {incoming.map((r, i) => (
                          <li key={i}>
                            <Link href={urlFor(r.from)}>{r.from.id}</Link>{" "}
                            <span className="muted">({r.rel})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
              <div>
                <p className="eyebrow">Authors</p>
                <p className="mt-3 text-[0.9375rem]">{obj.authors.join(", ")}</p>
              </div>
              <div>
                <p className="eyebrow">Machine rendering</p>
                <p className="mt-3 text-[0.9375rem]">
                  <a href={`/objects/${obj.id}`}>{obj.id}.json</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter machineUrl={`/objects/${obj.id}`} />
    </>
  );
}
