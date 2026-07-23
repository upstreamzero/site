import Link from "next/link";
import type { Metadata } from "next";
import { byId } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "Solutions | Upstream Zero" },
  description:
    "Fixed-scope Commercial Evaluation products: understand how AI defines your market, diagnose why your recommendation fails or survives deeper requirements, and monitor movement over time.",
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
              Each engagement answers a defined commercial question, follows a
              repeatable scope, and ends with a clear decision. Understand the
              market, diagnose why your recommendation fails or survives deeper
              requirements, and monitor movement over time.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <div className="grid gap-4 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} obj={p} />
              ))}
            </div>
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
