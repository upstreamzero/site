import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import {
  SCENARIOS,
  getScenario,
  getCategory,
  resolveRequirements,
} from "@/lib/evaluations";

/** Scenario page. A buyer profile and the requirement set that decides its
 *  evaluation. The composition node: it assembles requirement atoms and shows
 *  the evaluation for one real buyer. */

export function generateStaticParams() {
  return Object.values(SCENARIOS).map((s) => ({
    category: s.categorySlug,
    scenario: s.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; scenario: string }>;
}): Promise<Metadata> {
  const { scenario } = await params;
  const s = getScenario(scenario);
  if (!s) return {};
  return {
    title: { absolute: `${s.name} | Upstream Zero` },
    description: `How AI evaluates ${s.name.toLowerCase()}: the requirement set that decides the recommendation, and what would keep you the choice. Illustrative.`,
    ...pageMeta(`/evaluations/${s.categorySlug}/${s.slug}`),
  };
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ category: string; scenario: string }>;
}) {
  const { scenario } = await params;
  const s = getScenario(scenario);
  if (!s) notFound();
  const c = getCategory(s.categorySlug);
  const reqs = resolveRequirements(s.requirementSlugs);

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Evaluations", "/evaluations"],
              ...(c
                ? ([[c.name, `/evaluations/${c.slug}`]] as [string, string][])
                : []),
              [s.name, `/evaluations/${s.categorySlug}/${s.slug}`],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p
              className="font-mono text-[0.72rem] tracking-[0.04em]"
              style={{ color: "var(--ink-muted)" }}
            >
              <Link href="/evaluations">Evaluations</Link> /{" "}
              {c && (
                <>
                  <Link href={`/evaluations/${c.slug}`}>{c.name}</Link> /{" "}
                </>
              )}
              {s.industry}
            </p>
            <h1 className="mt-5 max-w-[22ch]">{s.name}</h1>
            <p className="lede mt-7 max-w-[60ch]">
              {s.persona} evaluate {s.useCase.toLowerCase()}. They open with a
              broad question, then add the requirements that actually decide it.
            </p>

            {/* The evaluation, shown */}
            <div className="evex mt-12 max-w-[640px]">
              <div>
                <span className="evex__label">Buyer asks AI</span>
                <p className="evex__q">&ldquo;{s.buyerQuestion}&rdquo;</p>
              </div>
              <div>
                <span className="evex__label">AI recommends</span>
                <div className="evex__rec">
                  {s.illustrativeRecommendation.map((co) => (
                    <span key={co} className="evex__co">
                      {co}
                    </span>
                  ))}
                </div>
              </div>
              <div className="evex__steps">
                {reqs.map((r) => (
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
                <b>The opening recommendation didn&rsquo;t decide the purchase.</b>{" "}
                The follow-up questions did.
              </p>
            </div>
            <p className="fade mt-5 text-[0.85rem]">
              Illustrative. Real companies, but the sequence shows the dynamic,
              not a specific AI answer.
            </p>
          </div>
        </section>

        {/* The requirement set, as links to the atoms */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="eyebrow">The requirement set</p>
            <h2 className="mt-5 max-w-[24ch]">
              What this buyer is really evaluating.
            </h2>
            <ul className="browse mt-10">
              {reqs.map((r) => (
                <li key={r.slug}>
                  <Link href={`/requirements/${r.slug}`}>
                    <span className="browse-title">{r.name}</span>
                    <span className="browse-meta">{r.whyItMatters.split(".")[0]}.</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                Would you survive this evaluation?
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                We run your market against the requirements that decide it, and
                show you exactly where you get cut, and what would keep you the
                choice.
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
