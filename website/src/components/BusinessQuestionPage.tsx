import Link from "next/link";
import type { Metadata } from "next";
import type { UZObject } from "@/lib/schema";
import { backEdges, byId, urlFor } from "@/lib/content";
import { pageMeta, breadcrumbLd, SITE_URL } from "@/lib/meta";
import { evidenceLevel } from "@/lib/evidence";
import { businessQuestionBySlug } from "@/lib/businessQuestions";
import type { BusinessQuestion } from "@/lib/businessQuestions";
import { ProvenanceFooter } from "./SiteChrome";
import BookingButton from "./BookingButton";

/** Per-page metadata for a business question. Unique title, description, OG,
 *  and Twitter fields; canonical and indexability set explicitly. */
export function businessQuestionMetadata(slug: string): Metadata {
  const bq = businessQuestionBySlug(slug);
  if (!bq) return {};
  const base = pageMeta(`/questions/${slug}`);
  return {
    title: { absolute: bq.title },
    description: bq.description,
    robots: { index: true, follow: true },
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: bq.q,
      description: bq.description,
    },
    twitter: { ...base.twitter, title: bq.q, description: bq.description },
  };
}

function byDateDesc(a: UZObject, b: UZObject) {
  return (b.created ?? "").localeCompare(a.created ?? "");
}

/** Resolve the published evidence for a business question from its mapped
 *  components. Read-only over research objects: a commercial page derives the
 *  list, but no research record ever points at a commercial one. */
function evidenceFor(bq: BusinessQuestion) {
  const components = bq.components
    .map((slug) => byId(slug))
    .filter((c): c is UZObject => Boolean(c));
  const members = new Map<string, UZObject>();
  for (const c of components) {
    for (const r of backEdges(c.id)) {
      if (r.rel === "part-of") members.set(r.from.id, r.from);
    }
  }
  const all = [...members.values()];
  return {
    components,
    experiments: all.filter((o) => o.type === "experiment").sort(byDateDesc),
    observations: all.filter((o) => o.type === "observation").sort(byDateDesc),
  };
}

export function BusinessQuestionPage({ slug }: { slug: string }) {
  const bq = businessQuestionBySlug(slug);
  if (!bq) return null;
  const { components, experiments, observations } = evidenceFor(bq);
  const primary = components[0];
  const url = `${SITE_URL}/questions/${slug}`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: bq.title,
    description: bq.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(primary
      ? {
          about: {
            "@type": "DefinedTerm",
            name: primary.title,
            url: `${SITE_URL}${urlFor(primary)}`,
            inDefinedTermSet: { "@id": `${SITE_URL}/#website` },
          },
        }
      : {}),
    mainEntity: {
      "@type": "Question",
      name: bq.q,
      acceptedAnswer: { "@type": "Answer", text: bq.answer },
    },
  };

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageLd)
              .replace(/</g, "\\u003c")
              .replace(/>/g, "\\u003e"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Questions", "/questions"],
              [bq.q, `/questions/${slug}`],
            ]),
          }}
        />

        {/* ── Answer near the top ─────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="voice-mono-data muted mb-4">
              <Link href="/questions">Questions</Link>
            </nav>
            <p className="eyebrow">Business question</p>
            <h1 className="mt-5 max-w-[22ch]">{bq.q}</h1>
            <p className="lede mt-7 max-w-[64ch]">{bq.answer}</p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The problem, why it matters ─────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">The problem</p>
              <p className="mt-4 max-w-[52ch]">{bq.problem}</p>
            </div>
            <div>
              <p className="eyebrow">Why it matters</p>
              <p className="mt-4 max-w-[52ch]">{bq.whyItMatters}</p>
            </div>
          </div>
        </section>

        {/* ── Research components ─────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-12">What the research studies</p>
            <h2 className="mt-5 max-w-[24ch]">
              The components behind this question.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {components.map((c) => (
                <Link key={c.id} href={urlFor(c)} className="chip">
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── The published evidence ──────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">The evidence so far</p>
            <h2 className="mt-5 max-w-[24ch]">
              {experiments.length + observations.length > 0
                ? "What we have run, and what we have seen."
                : "No published evidence yet."}
            </h2>
            {experiments.length > 0 && (
              <ul className="browse mt-8">
                {experiments.map((e) => (
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
            )}
            {observations.length > 0 && (
              <ul className="mt-8 list-none space-y-0 p-0">
                {observations.map((o) => (
                  <li
                    key={o.id}
                    className="border-t py-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span className="voice-mono-data muted">
                      Observation · {o.status} · {o.created}
                    </span>
                    <Link href={urlFor(o)} className="mt-1 block">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── Concluded vs unknown ────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">What we can conclude</p>
              <p className="mt-4 max-w-[52ch]">{bq.concluded}</p>
            </div>
            <div>
              <p className="eyebrow">What remains unknown</p>
              <p className="mt-4 max-w-[52ch]">{bq.unknown}</p>
            </div>
          </div>
        </section>

        {/* ── How Upstream Zero helps (commercial side) ───────── */}
        <section className="section-tight">
          <div className="shell">
            <hr className="rule" />
            <p className="eyebrow mt-12">How Upstream Zero helps</p>
            <h2 className="mt-5 max-w-[24ch]">From the evidence to your answer.</h2>
            <p className="lede mt-6 max-w-[62ch]">{bq.howWeHelp}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
              <Link href="/solutions">See solutions</Link>
              <Link href="/methodology">How the work is done</Link>
              {primary && (
                <Link href={urlFor(primary)}>
                  Research: {primary.title}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── Next step ───────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[26ch]">{bq.nextStep}</h2>
            <BookingButton variant="btn-lime">Start With Your Category</BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
