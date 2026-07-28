import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, breadcrumbLd, faqLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import {
  CATEGORIES,
  getCategory,
  resolveRequirements,
} from "@/lib/evaluations";

/** Category page. Purpose: answer "how do buyers actually evaluate this
 *  category?" Show the evaluation, then route into the requirement pages that
 *  decide the outcome. Not a marketing page. */

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
    description: `${c.intro} The requirements that decide ${c.name.toLowerCase()} evaluations, and what would keep you the choice.`,
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

  const reqs = resolveRequirements(c.requirementSlugs);
  const exampleReqs = resolveRequirements(c.example.reqs);

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

            {/* The evaluation, shown */}
            <div className="evex mt-12 max-w-[640px]">
              <div>
                <span className="evex__label">Buyer asks AI</span>
                <p className="evex__q">&ldquo;{c.example.q}&rdquo;</p>
              </div>
              <div>
                <span className="evex__label">AI recommends</span>
                <div className="evex__rec">
                  {c.example.cos.map((co) => (
                    <span key={co} className="evex__co">
                      {co}
                    </span>
                  ))}
                </div>
              </div>
              <div className="evex__steps">
                {exampleReqs.map((r) => (
                  <div key={r.slug} className="evex__step">
                    <span className="evex__req">
                      <b>+</b>{" "}
                      <Link href={`/requirements/${r.slug}`}>{r.name}</Link>
                    </span>
                    <span className="evex__change">Recommendation changes</span>
                  </div>
                ))}
              </div>
              <p className="evex__note">
                <b>The opening answer didn&rsquo;t decide the deal.</b> The
                requirements did.
              </p>
            </div>
            <p className="fade mt-5 text-[0.85rem]">
              Illustrative. Real companies, but the sequence shows the dynamic,
              not a specific AI answer.
            </p>
          </div>
        </section>

        {/* The requirements that decide it */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="eyebrow">What decides it</p>
            <h2 className="mt-5 max-w-[24ch]">
              The requirements that determine {c.name.toLowerCase()}{" "}
              recommendations.
            </h2>
            <ul className="browse mt-10">
              {reqs.map((r) => (
                <li key={r.slug}>
                  <Link href={`/requirements/${r.slug}`}>
                    <span className="browse-title">{r.name}</span>
                    <span className="browse-meta">
                      {r.buyerQuestions[0]}
                    </span>
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
