import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PILLARS, HUB_PILLAR } from "@/lib/pillars";
import { pageMeta, breadcrumbLd, faqLd, SITE_URL } from "@/lib/meta";
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

function articleLd(slug: string, term: string, summary: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: term,
    description: summary,
    url: `${SITE_URL}/learn/${slug}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#organization` },
  })
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
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
  const related = PILLARS.filter((x) => x.slug !== p.slug && !x.hub).slice(0, 6);

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
                    {para}
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
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

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
