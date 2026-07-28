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
    "Why isn't ChatGPT recommending your company? Because AI evaluates vendors against what the buyer needs, and it doesn't yet believe you fit those requirements best. Upstream Zero shows how AI is reading your company across ChatGPT and Google AI, which requirements are cutting you, what proof AI relies on, and what would make you the company AI recommends. It measures the AI behavior that may influence pipeline, win rate, and revenue, and does not promise those outcomes.",
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
              "Fixed-scope ways to see how AI is deciding your deals.",
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
              Why isn&rsquo;t ChatGPT recommending your company?
            </h1>
            <p className="lede mt-7">
              Your buyers ask AI for the best option, and it puts a few
              companies forward. If yours isn&rsquo;t one of them, the reason is
              simple. AI evaluates vendors against what the buyer actually needs,
              and right now it doesn&rsquo;t believe you fit those requirements
              as well as the companies it names. Upstream Zero shows you how AI
              is reading your company, which requirements are cutting you, and
              what would make you the company AI recommends.
            </p>
            <p className="muted mt-5 max-w-[64ch]">
              You can weigh this alongside qualified pipeline, ICP fit, win
              rate, sales-cycle movement, revenue, retention, and expansion.
              Upstream Zero measures the AI behavior that may influence those
              results. It does not promise that changing how AI recommends you
              will produce them.
            </p>

            <dl className="mt-10 grid max-w-[76ch] gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-[max-content_1fr]">
              <dt className="font-medium">How do AI models evaluate vendors?</dt>
              <dd className="muted m-0">
                Your buyer&rsquo;s problem comes with requirements, the specific
                things they need a vendor to do. AI compares companies against
                those requirements and puts forward the ones it believes fit
                best. We make that hidden evaluation something you can watch.
              </dd>
              <dt className="font-medium">Why is AI recommending competitors?</dt>
              <dd className="muted m-0">
                We show which requirements are getting them put forward instead
                of you, where AI can&rsquo;t tell that you meet a requirement,
                and what proof it is trusting to make the call.
              </dd>
              <dt className="font-medium">How do I become the recommended company?</dt>
              <dd className="muted m-0">
                For every requirement that removes you, we tell you what would
                have to be true, and provable, for AI to recommend you instead.
                That is the path to becoming the logical choice.
              </dd>
              <dt className="font-medium">What you can buy</dt>
              <dd className="muted m-0">
                Three fixed-scope products, from a first category read to
                ongoing measurement. See them below.
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
              Every project follows the same path. Each step is diagnosis or
              measurement. The recommendations it produces are possible fixes
              tied to a specific failure we observed and a specific gap in your
              proof, not guaranteed levers.
            </p>
            <p className="muted mt-5 max-w-[64ch] text-[0.9375rem]">
              See{" "}
              <Link href="/learn/commercial-evaluation">
                how AI decides who to recommend
              </Link>
              , step by step, from the first shortlist to the final pick.
              This measurement workflow is how we observe, diagnose, act on, and
              measure that lifecycle. They are two layers, not two competing
              versions of the same thing.
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
              how one company being cut becomes a specific, prioritized set of
              possible fixes.
            </p>

            <div className="card mt-10 max-w-[74ch]">
              <dl className="exrec">
                <dt className="eyebrow">Observed evaluation failure</dt>
                <dd>
                  A healthcare software company shows up on the initial
                  shortlist but disappears when the buyer adds Epic integration
                  and HIPAA compliance.
                </dd>

                <dt className="eyebrow mt-6">Evidence diagnosis</dt>
                <dd>
                  The company claims Epic compatibility, but the available
                  evidence does not clearly demonstrate native integration,
                  implementation depth, or independent validation.
                </dd>

                <dt className="eyebrow mt-6">What must become true</dt>
                <dd>
                  AI systems must consistently connect the company with native
                  Epic integration and successful healthcare deployments.
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
                  Run the same set of requirements again and measure how often
                  you make the shortlist, how often you lead it, how often you
                  survive to the end, how often a competitor takes your place,
                  where the AI stops trusting your claims, and how your
                  recommendations moved before and after.
                </dd>
              </dl>
            </div>

            <p className="muted mt-8 max-w-[70ch] text-[0.9375rem]">
              Recommended proof may include technical documentation, product and
              integration pages, customer case studies, video walkthroughs,
              partner directories, marketplace listings, PR and industry
              coverage, review sites, developer documentation, and structured
              data. Each is a possible fix chosen because of a specific failure
              we observed and a specific gap in your proof, not a generic
              tactic. The system does not recommend every kind of proof for
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
            <p className="eyebrow">How this differs from AI-search and visibility tools</p>
            <h2 className="mt-5 max-w-[24ch]">
              Those are tactics, not our category.
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">AI-search and visibility tools typically focus on</p>
                <ul className="mt-3 list-none space-y-2 p-0 text-[0.9375rem]">
                  <li className="muted">Visibility</li>
                  <li className="muted">Mentions and citations</li>
                  <li className="muted">Getting found</li>
                  <li className="muted">Content structure</li>
                  <li className="muted">Schema</li>
                </ul>
              </div>
              <div>
                <p className="eyebrow">Upstream Zero focuses on</p>
                <ul className="mt-3 list-none space-y-2 p-0 text-[0.9375rem]">
                  <li>How the shortlist forms</li>
                  <li>Why companies get cut</li>
                  <li>How the lead changes hands</li>
                  <li>Whether you survive to the end</li>
                  <li>Gaps in your proof</li>
                  <li>Measured change in what AI recommends</li>
                </ul>
              </div>
            </div>
            <p className="muted mt-8 max-w-[70ch] text-[0.9375rem]">
              Schema, PR, video, documentation, case studies, and outside
              validation may be recommended when the evidence supports them.
              They are possible tactics, not our product category. The platform
              decides whether a tactic is relevant based on what we actually
              observe.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <div className="callout max-w-[70ch]">
              <p>
                <strong>Every project ends in a plan, not a promise.</strong>{" "}
                You get the ranked list of what would make you the company AI
                recommends, never a guarantee that AI will change its answer or
                that you&rsquo;ll rank, get included, or get chosen. We show you
                what to change. We don&rsquo;t sell the AI SEO, GEO, or
                visibility work itself. See how the work is done in the{" "}
                <Link href="/methodology">methodology</Link>.
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
