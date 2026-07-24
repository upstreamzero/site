import Link from "next/link";
import type { Metadata } from "next";
import { byId } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { WORKFLOW } from "@/lib/workflow";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "AI Vendor Evaluation Products | Upstream Zero" },
  description:
    "Companies are evaluated by AI before a buyer speaks with sales. Upstream Zero shows whether your company enters the recommendation set, which requirements strengthen or eliminate your position, what evidence AI systems rely on, and what must become true to remain a logical choice. It measures the evaluation behavior that may influence pipeline, win rate, and revenue, and does not promise those outcomes.",
  ...pageMeta("/solutions"),
};

export default function Solutions() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "Solutions | Upstream Zero",
              "/solutions",
              "Fixed-scope Commercial Evaluation products from Upstream Zero.",
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Solutions", "/solutions"],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Solutions</p>
            <h1 className="mt-5 max-w-[24ch]">
              See how AI evaluates your company before a buyer calls.
            </h1>
            <p className="lede mt-7">
              Companies are increasingly evaluated before a buyer speaks with
              sales. Upstream Zero shows whether your company enters the
              recommendation set, which requirements strengthen or eliminate
              your position, what evidence AI systems rely on, and what must
              become true for your company to remain a logical choice as the
              evaluation continues.
            </p>
            <p className="muted mt-5 max-w-[64ch]">
              This intelligence can be evaluated alongside qualified pipeline,
              ICP alignment, win rate, sales-cycle movement, revenue, retention,
              and expansion. Upstream Zero measures the evaluation behavior that
              may influence those outcomes. It does not promise that changing
              recommendation behavior will produce them.
            </p>

            <dl className="mt-10 grid max-w-[76ch] gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-[max-content_1fr]">
              <dt className="font-medium">What it solves</dt>
              <dd className="muted m-0">
                You cannot see the AI evaluation that decides whether you make
                the shortlist. This makes it observable.
              </dd>
              <dt className="font-medium">What you learn</dt>
              <dd className="muted m-0">
                Whether you enter the recommendation set, which requirements
                move or eliminate you, what evidence the evaluator relies on,
                and what must become true to remain a logical choice.
              </dd>
              <dt className="font-medium">What you can buy</dt>
              <dd className="muted m-0">
                Three fixed-scope products, from a first category read to
                ongoing measurement. See them below.
              </dd>
              <dt className="font-medium">Decisions it supports</dt>
              <dd className="muted m-0">
                Where to invest evidence, which requirements to prioritize, and
                whether a change moved your recommendation position over time.
              </dd>
            </dl>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── The commercial workflow ─────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">The Upstream Zero measurement workflow</p>
            <h2 className="mt-5 max-w-[26ch]">
              From observed behavior to measured movement.
            </h2>
            <p className="lede mt-6 max-w-[62ch]">
              Every engagement follows the same path. Each step is diagnosis or
              measurement. The recommendations it produces are candidate
              interventions tied to an observed failure and a specific evidence
              gap, not guaranteed levers.
            </p>
            <p className="muted mt-5 max-w-[64ch] text-[0.9375rem]">
              The{" "}
              <Link href="/learn/commercial-evaluation">
                commercial evaluation lifecycle
              </Link>{" "}
              describes how a buyer&rsquo;s evaluation unfolds. This is the
              Upstream Zero measurement workflow: how we observe, diagnose, act
              on, and measure that lifecycle. They are two layers, not two
              competing versions of the same process.
            </p>
            <ol className="steps steps-2 mt-12">
              {WORKFLOW.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.name}</h3>
                  <p>{s.plain}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section-tight">
          <div className="shell">
            <ol className="num-list">
              {products.map((p, i) => {
                const slug = productSlugFor(p.id);
                return (
                  <li key={p.id} className="num-row num-row--rail">
                    <span className="num-row__n">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="eyebrow">Business problem</p>
                      <h2 className="num-row__title mt-3">
                        {p.productName ?? p.title}
                      </h2>
                      {p.businessProblem && (
                        <p className="num-row__quote">
                          &ldquo;{p.businessProblem}&rdquo;
                        </p>
                      )}
                      {p.businessOutcome && (
                        <>
                          <span className="num-row__lead">What this gives you</span>
                          <p className="num-row__desc">{p.businessOutcome}</p>
                        </>
                      )}
                    </div>
                    <div className="num-row__rail">
                      {p.priceStart && (
                        <>
                          <p className="rail-label">Starting price</p>
                          <p className="rail-price">{p.priceStart}</p>
                        </>
                      )}
                      {p.timeline && (
                        <>
                          <p className="rail-label">Timeline</p>
                          <p className="rail-val">{p.timeline}</p>
                        </>
                      )}
                      {slug && (
                        <Link href={`/solutions/${slug}`} className="btn">
                          Request {p.productName ?? p.title}
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10">
              <Link href="/pricing" className="btn-ghost">
                Compare timelines and pricing
              </Link>
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Evidence-recommendation worked example ──────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Recommendation output · example</p>
            <h2 className="mt-5 max-w-[26ch]">
              From an observed failure to a prioritized set of evidence.
            </h2>
            <p className="muted mt-5 max-w-[64ch] text-[0.9375rem]">
              Illustrative, not a real company or a promised result. It shows
              how one observed elimination becomes a specific, prioritized set
              of candidate interventions.
            </p>

            <div className="card mt-10 max-w-[74ch]">
              <dl className="exrec">
                <dt className="eyebrow">Observed evaluation failure</dt>
                <dd>
                  A healthcare software company appears in the initial
                  recommendation set but disappears when the buyer adds Epic
                  integration and HIPAA compliance.
                </dd>

                <dt className="eyebrow mt-6">Evidence diagnosis</dt>
                <dd>
                  The company claims Epic compatibility, but the available
                  evidence does not clearly demonstrate native integration,
                  implementation depth, or independent validation.
                </dd>

                <dt className="eyebrow mt-6">What must become true</dt>
                <dd>
                  AI evaluators must consistently associate the company with
                  native Epic integration and successful healthcare deployments.
                </dd>

                <dt className="eyebrow mt-6">Existing evidence</dt>
                <dd>
                  General integrations page, a HIPAA statement, and product
                  documentation.
                </dd>

                <dt className="eyebrow mt-6">Missing or weak evidence</dt>
                <dd>
                  Dedicated Epic technical documentation, an implementation
                  walkthrough, healthcare customer proof, and independent
                  ecosystem validation.
                </dd>

                <dt className="eyebrow mt-6">Recommended evidence actions</dt>
                <dd>
                  <ol className="mt-2 list-none space-y-3 p-0">
                    <li>
                      <span className="voice-mono-data muted">Priority 1</span>
                      <br />
                      Publish a dedicated Epic integration page with technical
                      details, supported workflows, architecture, and
                      implementation requirements.
                    </li>
                    <li>
                      <span className="voice-mono-data muted">Priority 2</span>
                      <br />
                      Create a customer case study showing a real Epic
                      deployment and a measurable outcome.
                    </li>
                    <li>
                      <span className="voice-mono-data muted">Priority 3</span>
                      <br />
                      Publish a video walkthrough demonstrating the integration.
                    </li>
                    <li>
                      <span className="voice-mono-data muted">Priority 4</span>
                      <br />
                      Secure an ecosystem or partner reference that
                      independently validates the capability.
                    </li>
                  </ol>
                </dd>

                <dt className="eyebrow mt-6">Recommended placement</dt>
                <dd>
                  Canonical technical evidence on the company website, detailed
                  support in product documentation, a demonstration on YouTube,
                  independent validation through partner directories, customer
                  stories, or industry publications, and structured data on the
                  relevant product and integration pages where appropriate.
                </dd>

                <dt className="eyebrow mt-6">Measurement</dt>
                <dd>
                  Re-run the same requirement sequence and measure
                  recommendation-set frequency, frontrunner frequency, selection
                  survivability, competitor displacement, validation failure
                  points, and before-and-after recommendation movement.
                </dd>
              </dl>
            </div>

            <p className="muted mt-8 max-w-[70ch] text-[0.9375rem]">
              Evidence recommendations may include technical documentation,
              product and integration pages, customer case studies, video
              walkthroughs, partner directories, marketplace listings, PR and
              industry coverage, review platforms, developer documentation, and
              structured data. Each is a candidate intervention selected because
              of an observed failure and a specific evidence gap, not a generic
              tactic. The system does not recommend every evidence type for
              every problem.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── How this differs from GEO and AEO ───────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">How this differs from GEO and AEO</p>
            <h2 className="mt-5 max-w-[24ch]">
              Mechanisms, not the category.
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">GEO and AEO typically focus on</p>
                <ul className="mt-3 list-none space-y-2 p-0 text-[0.9375rem]">
                  <li className="muted">Visibility</li>
                  <li className="muted">Mentions and citations</li>
                  <li className="muted">Retrieval</li>
                  <li className="muted">Content structure</li>
                  <li className="muted">Schema</li>
                </ul>
              </div>
              <div>
                <p className="eyebrow">Upstream Zero focuses on</p>
                <ul className="mt-3 list-none space-y-2 p-0 text-[0.9375rem]">
                  <li>Recommendation set formation</li>
                  <li>Vendor elimination</li>
                  <li>Frontrunner movement</li>
                  <li>Selection survivability</li>
                  <li>Evidence gaps</li>
                  <li>Measured recommendation movement</li>
                </ul>
              </div>
            </div>
            <p className="muted mt-8 max-w-[70ch] text-[0.9375rem]">
              Schema, PR, video, documentation, case studies, and third-party
              validation may be recommended when the evidence supports them.
              They are candidate mechanisms, not the product category. The
              platform decides whether a mechanism is relevant based on the
              observed evaluation evidence.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <div className="callout max-w-[70ch]">
              <p>
                <strong>Every engagement is measurement and diagnosis.</strong>{" "}
                You receive evidence and a prioritized set of decisions, never a
                promise about rankings, inclusion, or selection. We are not an
                AI SEO, GEO, or visibility agency. See how the work is done in
                the <Link href="/methodology">methodology</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              Not sure which fits? Start with your category.
            </h2>
            <BookingButton variant="btn-lime">
              Schedule a Conversation
            </BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
