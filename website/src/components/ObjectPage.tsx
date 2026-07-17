import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { UZObject } from "@/lib/schema";
import { backEdges, byId, urlFor } from "@/lib/content";
import { objectLd } from "@/lib/meta";
import { TierScale } from "./TierScale";
import { ProvenanceFooter } from "./SiteChrome";
import { FounderDecision } from "./FounderDecision";

function RailEntry({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="voice-mono mt-4 first:mt-0" style={{ color: "var(--ink-60)" }}>
        {label}
      </dt>
      <dd className="voice-mono-data m-0 mt-1">{children}</dd>
    </div>
  );
}

/** The shared object renderer: title, datum, apparatus rail, body,
 *  commercial-relevance block, provenance footer. One geometry for all
 *  seventeen types. */
export function ObjectPage({ obj }: { obj: UZObject }) {
  const incoming = backEdges(obj.id);
  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: objectLd(obj, urlFor(obj)) }}
        />
        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-[minmax(0,1fr)_220px]">
          <header className="md:col-span-2">
            <div className="voice-mono flex flex-wrap gap-x-6" style={{ color: "var(--ink-60)" }}>
              <span>{obj.type}</span>
              <span>{obj.id}</span>
              <span>{obj.created}</span>
              <span>status · {obj.status}</span>
            </div>
            <h1 className="mt-3 max-w-[30ch]">{obj.title}</h1>
            <div className="-ml-5 mt-4 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
          </header>

          <article className="min-w-0">
            {obj.founderDecision && (
              <FounderDecision id={obj.founderDecision}>
                This object is gated on a decision only the founder can make.
                Its current content is provisional and marked as such.
              </FounderDecision>
            )}
            {obj.observationType === "rationale" && (
              <p
                className="voice-mono mb-4 border border-dashed p-3"
                style={{ borderColor: "var(--ink-40)", color: "var(--ink-60)" }}
              >
                Evaluator rationale: observed narration, not mechanism.
                Capped at Narrated for mechanism claims.
              </p>
            )}
            <div className="prose-uz">
              <MDXRemote source={obj.body || "*No body text.*"} />
            </div>

            {obj.predictions && obj.predictions.length > 0 && (
              <section className="mt-8">
                <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  Predictions, registered before results
                </h2>
                <ul className="mt-2 max-w-[58ch] list-none space-y-2 p-0">
                  {obj.predictions.map((p) => (
                    <li key={p} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {obj.refutationConditions && obj.refutationConditions.length > 0 && (
              <section className="mt-8">
                <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  What would refute this
                </h2>
                <ul className="mt-2 max-w-[58ch] list-none space-y-2 p-0">
                  {obj.refutationConditions.map((p) => (
                    <li key={p} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {obj.nonPromises && obj.nonPromises.length > 0 && (
              <section className="mt-8">
                <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  Explicit non-promises
                </h2>
                <ul className="mt-2 max-w-[58ch] list-none space-y-2 p-0">
                  {obj.nonPromises.map((p) => (
                    <li key={p} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {obj.runLog && obj.runLog.length > 0 && (
              <section className="mt-10">
                <h2 className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  Run log
                </h2>
                <ul className="mt-3 max-w-[58ch] list-none space-y-4 p-0">
                  {obj.runLog.map((r) => (
                    <li
                      key={r.runId}
                      className="border-l pl-4"
                      style={{ borderColor: "var(--ink-18)" }}
                    >
                      <span className="voice-mono-data" style={{ color: "var(--ink-60)" }}>
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
                        <p className="mt-1 text-[0.9rem]" style={{ color: "var(--ink-60)" }}>
                          Deviations: {r.deviations.join("; ")}
                        </p>
                      )}
                      {r.note && <p className="mt-1 text-[0.9rem]">{r.note}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {obj.commercialRelevance && (
              <section className="mt-10 max-w-[62ch] border p-5" style={{ borderColor: "var(--ink-18)" }}>
                <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                  What this means commercially
                </span>
                <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-[0.95rem]">
                  <dt style={{ color: "var(--ink-60)" }}>Affected buyers</dt>
                  <dd className="m-0">{obj.commercialRelevance.affectedBuyers}</dd>
                  <dt style={{ color: "var(--ink-60)" }}>Affected categories</dt>
                  <dd className="m-0">{obj.commercialRelevance.affectedCategories}</dd>
                  <dt style={{ color: "var(--ink-60)" }}>Potential product impact</dt>
                  <dd className="m-0">{obj.commercialRelevance.potentialProductImpact}</dd>
                  <dt style={{ color: "var(--ink-60)" }}>Current confidence</dt>
                  <dd className="m-0">{obj.commercialRelevance.currentConfidence}</dd>
                  <dt style={{ color: "var(--ink-60)" }}>Evidence tier</dt>
                  <dd className="m-0">{obj.tier ?? "Narrated (untiered type)"}</dd>
                </dl>
              </section>
            )}
          </article>

          <aside className="border-t pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0" style={{ borderColor: "var(--ink-18)" }}>
            <dl className="m-0">
              {obj.tier && (
                <RailEntry label="Evidence tier">
                  <TierScale tier={obj.tier} />
                </RailEntry>
              )}
              {obj.maturity && <RailEntry label="Maturity">{obj.maturity}</RailEntry>}
              {obj.edges.length > 0 && (
                <RailEntry label="Edges">
                  <ul className="m-0 list-none space-y-1 p-0">
                    {obj.edges.map((e, i) => {
                      const t = byId(e.to);
                      return (
                        <li key={i}>
                          {e.rel} →{" "}
                          {t ? <Link href={urlFor(t)}>{e.to}</Link> : e.to}
                        </li>
                      );
                    })}
                  </ul>
                </RailEntry>
              )}
              {incoming.length > 0 && (
                <RailEntry label="Referenced by">
                  <ul className="m-0 list-none space-y-1 p-0">
                    {incoming.map((r, i) => (
                      <li key={i}>
                        <Link href={urlFor(r.from)}>{r.from.id}</Link> ({r.rel})
                      </li>
                    ))}
                  </ul>
                </RailEntry>
              )}
              <RailEntry label="Authors">{obj.authors.join(", ")}</RailEntry>
              <RailEntry label="Revisions">
                None. This object has not been revised.
              </RailEntry>
              <RailEntry label="Machine rendering">
                <a href={`/objects/${obj.id}`}>{obj.id}.json</a>
              </RailEntry>
            </dl>
          </aside>
        </div>
      </main>
      <ProvenanceFooter machineUrl={`/objects/${obj.id}`} />
    </>
  );
}
