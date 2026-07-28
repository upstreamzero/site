import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, breadcrumbLd, faqLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import {
  REQUIREMENTS,
  getRequirement,
  resolveRequirements,
  categoriesForRequirement,
} from "@/lib/evaluations";

/** Requirement page. The durable asset. Answers a single buyer question and
 *  links to the requirements evaluated next, the categories it appears in, and
 *  the audit. */

export function generateStaticParams() {
  return Object.keys(REQUIREMENTS).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRequirement(slug);
  if (!r) return {};
  return {
    title: {
      absolute: `${r.name}: how it changes which vendor AI recommends | Upstream Zero`,
    },
    description: `${r.whatItIs} ${r.whyItMatters}`,
    ...pageMeta(`/requirements/${r.slug}`),
  };
}

export default async function RequirementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getRequirement(slug);
  if (!r) notFound();

  const related = resolveRequirements(r.related);
  const cats = categoriesForRequirement(r.slug);

  const faqs = [
    { q: `Why does ${r.name} matter in AI vendor evaluation?`, a: r.whyItMatters },
    {
      q: `How does ${r.name} change which vendor AI recommends?`,
      a: r.howItChangesRecs,
    },
  ];

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Requirements", "/evaluations"],
              [r.name, `/requirements/${r.slug}`],
            ]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqLd(faqs) }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Requirement</p>
            <h1 className="mt-4 max-w-[20ch]">{r.name}</h1>
            {r.full && r.full !== r.name && (
              <p className="mt-3 text-[0.9375rem]" style={{ color: "var(--ink-muted)" }}>
                {r.full}
              </p>
            )}
            <p className="lede mt-7 max-w-[60ch]">{r.whatItIs}</p>
            <p className="mt-5 max-w-[60ch]" style={{ color: "var(--ink-muted)" }}>
              {r.whyItMatters}
            </p>
          </div>
        </section>

        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">What buyers ask AI</p>
              <ul className="mt-6 list-none space-y-3 p-0">
                {r.buyerQuestions.map((q) => (
                  <li
                    key={q}
                    className="border-t pt-3 text-[1.0625rem]"
                    style={{ borderColor: "var(--line)" }}
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-12">How it changes the recommendation</p>
              <p className="mt-5 max-w-[52ch]" style={{ color: "var(--ink-muted)" }}>
                {r.howItChangesRecs}
              </p>
            </div>
            <div className="card">
              <p className="eyebrow">The evidence that proves it</p>
              <p className="mt-4 text-[0.9375rem]" style={{ color: "var(--ink-muted)" }}>
                What makes a buyer, and the AI reading your market, confident you
                satisfy this:
              </p>
              <ul className="mt-5 list-none space-y-4 p-0">
                {r.evidence.map((e) => (
                  <li key={e} className="proofpt">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related requirements + categories: the graph */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            {related.length > 0 && (
              <div>
                <p className="eyebrow">Evaluated next</p>
                <ul className="browse mt-8">
                  {related.map((rr) => (
                    <li key={rr.slug}>
                      <Link href={`/requirements/${rr.slug}`}>
                        <span className="browse-title">{rr.name}</span>
                        <span className="browse-meta">Requirement</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cats.length > 0 && (
              <div>
                <p className="eyebrow">Where it comes up</p>
                <ul className="browse mt-8">
                  {cats.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/evaluations/${c.slug}`}>
                        <span className="browse-title">{c.name}</span>
                        <span className="browse-meta">Category</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                Does AI believe you meet {r.name}?
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                We show you whether AI can tell you satisfy the requirements that
                decide your deals, and what evidence would make it certain.
              </p>
            </div>
            <BookingButton variant="btn-lime">Request an Audit</BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
