import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS, comparisonBySlug } from "@/lib/comparisons";
import { PILLARS } from "@/lib/pillars";
import { pageMeta, breadcrumbLd, SITE_URL } from "@/lib/meta";
import { Lifecycle } from "@/components/Lifecycle";
import { ProvenanceFooter } from "@/components/SiteChrome";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) return {};
  const base = pageMeta(`/compare/${slug}`);
  return {
    title: { absolute: c.title },
    description: c.summary,
    robots: { index: true, follow: true },
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: `${c.a} vs ${c.b}`,
      description: c.summary,
    },
    twitter: {
      ...base.twitter,
      title: `${c.a} vs ${c.b}`,
      description: c.summary,
    },
  };
}

function escapeLd(s: string): string {
  return s
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) notFound();
  const url = `${SITE_URL}/compare/${slug}`;
  const related = c.relatedTerms
    .map((s) => PILLARS.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: c.title,
    description: c.summary,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.a, description: c.aDef },
        { "@type": "ListItem", position: 2, name: c.b, description: c.bDef },
      ],
    },
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${c.a} vs ${c.b}`,
    description: c.summary,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
  };

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeLd(JSON.stringify(webPageLd)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeLd(JSON.stringify(articleLd)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Learn", "/learn"],
              [`${c.a} vs ${c.b}`, `/compare/${slug}`],
            ]),
          }}
        />

        {/* ── Answer up top ───────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="voice-mono-data muted mb-4">
              <Link href="/learn">Learn</Link>
              <span> / Compare</span>
            </nav>
            <p className="eyebrow">Comparison</p>
            <h1 className="mt-5 max-w-[20ch]">
              {c.a} vs {c.b}
            </h1>
            <p className="lede mt-7 max-w-[64ch]">{c.answer}</p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The two concepts ────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-4 lg:grid-cols-2">
            <div className="card">
              <p className="eyebrow">What {c.a} is</p>
              <p className="mt-4">{c.aDef}</p>
            </div>
            <div className="card">
              <p className="eyebrow">What {c.b} is</p>
              <p className="mt-4">{c.bDef}</p>
            </div>
          </div>
        </section>

        {/* ── Overlap + difference ────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Where they overlap</p>
              <p className="mt-4 max-w-[52ch]">{c.overlap}</p>
            </div>
            <div>
              <p className="eyebrow">Where they differ</p>
              <p className="mt-4 max-w-[52ch]">{c.difference}</p>
            </div>
          </div>
        </section>

        {/* ── Lifecycle ───────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-12">
              Where both fit in the commercial evaluation lifecycle
            </p>
            <div className="mt-6 max-w-[74ch]">
              <Lifecycle active={c.lifecycleStages} />
            </div>
            <p className="mt-7 max-w-[66ch]">{c.lifecycle}</p>
          </div>
        </section>

        {/* ── Related + go deeper ─────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Related concepts</p>
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
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
              <Link href="/learn/commercial-evaluation">
                What commercial evaluation is
              </Link>
              <Link href="/research">The research evidence</Link>
              <Link href="/solutions">Solutions</Link>
            </p>
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
