import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PILLARS, HUB_PILLAR } from "@/lib/pillars";
import { byId, urlFor } from "@/lib/content";
import { pageMeta, breadcrumbLd, faqLd, SITE_URL } from "@/lib/meta";
import { Lifecycle } from "@/components/Lifecycle";
import { ProvenanceFooter } from "@/components/SiteChrome";

/** One template for every authority page. Structure enforces the rule:
 *  define, explain, say why it matters, then reframe toward commercial
 *  evaluation. Reference material, never an agency pitch. */

export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PILLARS.find((x) => x.slug === slug);
  if (!p) return {};
  const title = p.aka ? `${p.term} (${p.aka})` : p.term;
  return {
    title: { absolute: `${title} | Upstream Zero` },
    description: p.summary,
    ...pageMeta(`/learn/${slug}`),
  };
}

function escapeLd(s: string): string {
  return s
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

/** Render a prose string, turning authored [label](/path) markdown links into
 *  in-body internal links so relationships between entities can be stated in
 *  the explanatory sentence, not only in a related-content block. */
function renderLinks(text: string) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={k++} href={m[2]}>
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function articleLd(slug: string, term: string, summary: string): string {
  return escapeLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: term,
      description: summary,
      url: `${SITE_URL}/learn/${slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: { "@id": `${SITE_URL}/#organization` },
    }),
  );
}

/** These are definitional reference pages, so they also declare the term
 *  itself as a DefinedTerm for entity-level retrieval. */
function definedTermLd(slug: string, term: string, summary: string): string {
  return escapeLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term,
      description: summary,
      url: `${SITE_URL}/learn/${slug}`,
      inDefinedTermSet: { "@id": `${SITE_URL}/#website` },
    }),
  );
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PILLARS.find((x) => x.slug === slug);
  if (!p) notFound();

  const title = p.aka ? `${p.term} (${p.aka})` : p.term;
  const related =
    p.relatedTerms && p.relatedTerms.length > 0
      ? p.relatedTerms
          .map((s) => PILLARS.find((x) => x.slug === s))
          .filter((x): x is NonNullable<typeof x> => Boolean(x))
      : PILLARS.filter((x) => x.slug !== p.slug && !x.hub).slice(0, 6);
  const relatedComponents = (p.relatedComponents ?? [])
    .map((s) => byId(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleLd(p.slug, p.term, p.summary),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: definedTermLd(p.slug, p.term, p.summary),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Learn", "/learn"],
              [p.term, `/learn/${p.slug}`],
            ]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqLd(p.faqs) }}
        />

        {/* ── Definition ──────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="text-[0.8125rem]">
              <Link href="/learn" className="muted">
                Learn
              </Link>
              <span className="muted"> / {p.term}</span>
            </nav>
            <p className="eyebrow mt-6">
              {p.kind === "platform"
                ? "AI buying surface"
                : p.kind === "tactic"
                  ? "Discoverability tactic"
                  : "Concept"}
            </p>
            <h1 className="mt-5 max-w-[22ch]">What is {title}?</h1>
            <p className="lede mt-7">{p.definition}</p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── How it works + why it matters ───────────────────── */}
        <section className="section">
          <div className="shell grid gap-4 lg:grid-cols-2">
            <div className="card">
              <p className="eyebrow">How it works</p>
              <p className="mt-4">{p.mechanics}</p>
            </div>
            <div className="card">
              <p className="eyebrow">Why it matters</p>
              <p className="mt-4">{p.matters}</p>
            </div>
          </div>
        </section>

        {/* ── Limitations ─────────────────────────────────────── */}
        {p.limitations && (
          <section className="section-tight">
            <div className="shell">
              <p className="eyebrow">Limitations</p>
              <h2 className="mt-5 max-w-[24ch]">What it does not do.</h2>
              <p className="mt-6 max-w-[64ch]">{renderLinks(p.limitations)}</p>
            </div>
          </section>
        )}

        {/* ── The reframe (the honest high ground) ────────────── */}
        {!p.hub && (
          <section className="section-tight">
            <div className="shell">
              <p className="eyebrow">The deeper question</p>
              <h2 className="mt-5 max-w-[24ch]">
                Being found is not the same as being chosen.
              </h2>
              <div className="prose-measure mt-8">
                {p.reframe.map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-5" : ""}>
                    {renderLinks(para)}
                  </p>
                ))}
              </div>
              <p className="mt-8">
                <Link
                  href={`/learn/${HUB_PILLAR.slug}`}
                  className="btn-ghost"
                >
                  What commercial evaluation actually is
                </Link>
              </p>
            </div>
          </section>
        )}
        {p.hub && (
          <section className="section-tight">
            <div className="shell">
              <p className="eyebrow">Why this is the anchor</p>
              <div className="prose-measure mt-6">
                {p.reframe.map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-5" : ""}>
                    {renderLinks(para)}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Lifecycle (consistent across every page) ────────── */}
        {(p.lifecycle ||
          (p.lifecycleStages && p.lifecycleStages.length > 0)) && (
          <section className="section-tight">
            <div className="shell">
              <hr className="rule" />
              <p className="eyebrow mt-12">
                Where it fits in the commercial evaluation lifecycle
              </p>
              <div className="mt-6 max-w-[74ch]">
                <Lifecycle active={p.lifecycleStages ?? []} />
              </div>
              {p.lifecycle && (
                <p className="mt-7 max-w-[66ch]">{renderLinks(p.lifecycle)}</p>
              )}
              <p className="muted mt-5 max-w-[66ch] text-[0.9375rem]">
                This is the commercial evaluation lifecycle: how a buyer&rsquo;s
                evaluation unfolds. The{" "}
                <Link href="/solutions">Upstream Zero measurement workflow</Link>{" "}
                is how the company observes, diagnoses, acts on, and measures
                that lifecycle.
              </p>
            </div>
          </section>
        )}

        {/* ── Commercial outcomes (hedged, never a promise) ───── */}
        {p.businessLogic && (
          <section className="section-tight">
            <div className="shell">
              <p className="eyebrow">Commercial outcomes</p>
              <h2 className="mt-5 max-w-[26ch]">
                Where this touches the business.
              </h2>
              <p className="mt-6 max-w-[66ch]">{renderLinks(p.businessLogic)}</p>
            </div>
          </section>
        )}

        {/* ── Go deeper: research, methodology, solutions ─────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-12">Go deeper</p>
            <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedComponents.length > 0 && (
                <div>
                  <p className="eyebrow">Research components</p>
                  <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                    {relatedComponents.map((c) => (
                      <li key={c.id}>
                        <Link href={urlFor(c)}>{c.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="eyebrow">How the work is done</p>
                <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                  <li>
                    <Link href="/methodology">Methodology</Link>
                  </li>
                  <li>
                    <Link href="/research">Research evidence</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="eyebrow">What you can do</p>
                <ul className="mt-3 list-none space-y-1 p-0 text-[0.9375rem]">
                  <li>
                    <Link href="/solutions">Solutions</Link>
                  </li>
                  <li>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Common questions</p>
            <dl className="mt-8 max-w-[74ch]">
              {p.faqs.map((f) => (
                <div
                  key={f.q}
                  className="border-t py-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    {f.q}
                  </dt>
                  <dd className="muted mt-2 max-w-[64ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Related ─────────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Related terms</p>
            <ul className="browse mt-8">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/learn/${r.slug}`}>
                    <span className="browse-title">
                      {r.term}
                      {r.aka ? ` (${r.aka})` : ""}
                    </span>
                    <span className="browse-meta">{r.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              See how AI actually evaluates your company.
            </h2>
            <Link href="/solutions" className="btn-lime">
              View the products
            </Link>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
