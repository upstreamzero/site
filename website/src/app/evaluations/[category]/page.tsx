import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import {
  CATEGORIES,
  getCategory,
  scenariosForCategory,
  requirementsForCategory,
} from "@/lib/evaluations";

/** Category page. Answers "how do buyers actually evaluate this category?"
 *  Lists the scenarios (buyer profiles) that decide it, and the typical
 *  requirements. Routes into scenarios and requirements. Not a marketing page. */

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: { absolute: `${c.buyerQuestion} | Upstream Zero` },
    description: `${c.intro} The buyer profiles and requirements that decide ${c.name.toLowerCase()} recommendations, and what would keep you the choice.`,
    ...pageMeta(`/evaluations/${c.slug}`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const scenarios = scenariosForCategory(c.slug);
  const reqs = requirementsForCategory(c.slug);

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Evaluations", "/evaluations"],
              [c.name, `/evaluations/${c.slug}`],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p
              className="font-mono text-[0.72rem] tracking-[0.04em]"
              style={{ color: "var(--ink-muted)" }}
            >
              <Link href="/evaluations">Evaluations</Link> / {c.name}
            </p>
            <h1 className="mt-5 max-w-[22ch]">{c.buyerQuestion}</h1>
            <p className="lede mt-7 max-w-[60ch]">{c.intro}</p>
          </div>
        </section>

        {/* Scenarios: the buyer profiles that decide it */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="eyebrow">Who is evaluating</p>
            <h2 className="mt-5 max-w-[24ch]">
              The buyer profiles that decide the recommendation.
            </h2>
            <ul className="browse mt-10">
              {scenarios.map((s) => (
                <li key={s.slug}>
                  <Link href={`/evaluations/${c.slug}/${s.slug}`}>
                    <span className="browse-title">{s.name}</span>
                    <span className="browse-meta">{s.industry}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Typical requirements */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What decides it</p>
            <h2 className="mt-5 max-w-[26ch]">
              The requirements that typically determine{" "}
              {c.name.toLowerCase()} recommendations.
            </h2>
            <ul className="browse mt-10">
              {reqs.map((r) => (
                <li key={r.slug}>
                  <Link href={`/requirements/${r.slug}`}>
                    <span className="browse-title">{r.name}</span>
                    <span className="browse-meta">{r.buyerQuestions[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[22ch]">
                See where you get cut in {c.name.toLowerCase()}.
              </h2>
              <p
                className="lede mt-4"
                style={{ color: "#ffffff", opacity: 0.9 }}
              >
                We run your market the way a buyer would, and show you the exact
                requirement that removes you, and what would keep you the choice.
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
