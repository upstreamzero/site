import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { byId } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { pageMeta, productLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

/** One template for every commercial product page. Each answers a single
 *  executive question and ends with a call to action. All content resolves
 *  from the engagement object's canonical frontmatter. */

function productFor(slug: string) {
  const entry = PRODUCTS.find((p) => p.slug === slug);
  if (!entry) return null;
  const obj = byId(entry.id);
  if (!obj || obj.type !== "engagement") return null;
  return obj;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obj = productFor(slug);
  if (!obj) return {};
  const name = obj.productName ?? obj.title;
  return {
    title: { absolute: `${name} | Upstream Zero` },
    description:
      obj.businessOutcome ??
      `${name}: a fixed-scope Commercial Evaluation engagement from Upstream Zero.`,
    ...pageMeta(`/solutions/${slug}`),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obj = productFor(slug);
  if (!obj) notFound();

  const name = obj.productName ?? obj.title;
  const path = `/solutions/${slug}`;

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productLd({
              name,
              description: obj.businessOutcome ?? name,
              path,
              priceStart: obj.priceStart,
              priceUnit: obj.priceUnit,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Pricing", "/pricing"],
              [name, path],
            ]),
          }}
        />

        {/* ── Hero: the problem, then the product ─────────────── */}
        <section className="section">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="text-[0.8125rem]">
              <Link href="/pricing" className="muted">
                Pricing
              </Link>
              <span className="muted"> / {name}</span>
            </nav>
            <p className="eyebrow mt-6">Commercial Evaluation product</p>
            <h1 className="mt-5 max-w-[20ch]">{name}</h1>
            {obj.businessProblem && (
              <p className="lede mt-7">
                &ldquo;{obj.businessProblem}&rdquo;
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookingButton variant="btn">
                Book a 30 Minute Conversation
              </BookingButton>
              <BookingButton variant="btn-ghost">
                Schedule a Conversation
              </BookingButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {obj.priceStart && (
                <span className="chip chip-accent">
                  From {obj.priceStart}
                  {obj.priceUnit ? ` ${obj.priceUnit}` : ""}
                </span>
              )}
              {obj.timeline && <span className="chip">{obj.timeline}</span>}
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── What you get + who it's for ─────────────────────── */}
        <section className="section">
          <div className="shell grid gap-4 lg:grid-cols-2">
            {obj.businessOutcome && (
              <div className="card">
                <p className="eyebrow">The business outcome</p>
                <p className="mt-4 text-[1.0625rem]">{obj.businessOutcome}</p>
              </div>
            )}
            {obj.idealCustomer && (
              <div className="card">
                <p className="eyebrow">Who it is for</p>
                <p className="muted mt-4">{obj.idealCustomer}</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Scope of work ───────────────────────────────────── */}
        {obj.scopeOfWork && obj.scopeOfWork.length > 0 && (
          <section className="section-tight">
            <div className="shell">
              <p className="eyebrow">Scope of work</p>
              <h2 className="mt-5 max-w-[22ch]">
                A defined question, a fixed scope, a useful answer.
              </h2>
              <ul className="browse mt-10">
                {obj.scopeOfWork.map((s) => (
                  <li key={s}>
                    <span className="flex items-baseline gap-4 py-[1.15rem]">
                      <span className="browse-id" aria-hidden>
                        →
                      </span>
                      <span className="browse-title">{s}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── What we do not promise (the discipline, on the page) ── */}
        {obj.nonPromises && obj.nonPromises.length > 0 && (
          <section className="section-tight">
            <div className="shell">
              <div className="callout max-w-[70ch]">
                <p>
                  <strong>What this does not promise.</strong> We measure and
                  diagnose. You receive evidence and a prioritized set of
                  decisions, never a promise about what an evaluator will do.
                </p>
                <ul className="mt-4 list-none space-y-2 p-0 text-[0.9375rem]">
                  {obj.nonPromises.map((n) => (
                    <li key={n}>· {n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[22ch]">Start with your category.</h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                We confirm category boundaries, complexity, and timing before
                any work begins.
              </p>
            </div>
            <BookingButton variant="btn-lime">
              Schedule a Conversation
            </BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter machineUrl={`/objects/${obj.id}`} />
    </>
  );
}
