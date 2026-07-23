import Link from "next/link";
import type { Metadata } from "next";
import { byId } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "AI Vendor Evaluation Products | Upstream Zero" },
  description:
    "Fixed-scope products to understand how AI systems evaluate, recommend, and eliminate vendors in your category, why you survive or fail requirements, and what must change. See how AI evaluates your category.",
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
            <h1 className="mt-5 max-w-[20ch]">
              Intelligence you can buy, use, and measure.
            </h1>
            <p className="lede mt-7">
              Each product helps a company understand how it is evaluated, why
              it survives or fails specific requirements, and what must become
              true for it to become a logical choice. Every engagement answers a
              defined commercial question, follows a repeatable scope, and ends
              with a clear decision.
            </p>
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
