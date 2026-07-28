import Link from "next/link";
import type { Metadata } from "next";
import { byId } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { pageMeta, breadcrumbLd, faqLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

/** Prices are derived from the canonical engagement objects so the meta
 *  description can never drift from the on-page table or the Product schema.
 *  Change a price in the object and the snippet updates with it. */
const PRICED_PRODUCTS = PRODUCTS.map((p) => byId(p.id)).filter(
  (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
);
const PRICE_SUMMARY = PRICED_PRODUCTS.filter((p) => p.priceStart)
  .map((p) => `${p.productName ?? p.title} from ${p.priceStart}`)
  .join(", ");

export const metadata: Metadata = {
  title: { absolute: "Product & Pricing: See Where AI Puts You | Upstream Zero" },
  description: `Fixed-scope ways to see how AI is deciding your deals. ${PRICE_SUMMARY}. Independent measurement and diagnosis, never a promise about rankings or inclusion.`,
  ...pageMeta("/pricing"),
};

/** Buyer-facing objections, closed at the buying moment. Honesty-forward:
 *  the independence answer and the "what if the read is wrong" answer are
 *  the trust assets, not disclaimers. */
const FAQ = [
  {
    q: "Are these fixed prices?",
    a: "They are starting prices for the standard scope of one defined category. We confirm boundaries, complexity, and timing before any work begins, so the final price is agreed up front, never after.",
  },
  {
    q: "How is this different from an AI-visibility tool?",
    a: "A visibility tool tells you whether you appear in AI answers. That is one step of four. We measure the whole decision, where you're cut and why, and we sell you no tool to fix it, so our read has no agenda.",
  },
  {
    q: "Why pay for a diagnosis if you won't fix it?",
    a: "For the same reason you trust it. A company that sells the cure can't honestly grade the disease. We measure and diagnose only, which is what makes the read worth having.",
  },
  {
    q: "What if the read is wrong, or unhelpful?",
    a: "Everything we report is tied to something we actually observed, with its conditions. We tell you plainly what we've seen versus what we infer, so you are never asked to take an unsupported claim on faith.",
  },
  {
    q: "How is our data handled?",
    a: "We work from your category and your named competitors. We do not require access to your systems, your CRM, or any customer data to run an evaluation.",
  },
];

export default function Pricing() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Product & Pricing", "/pricing"],
            ]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqLd(FAQ) }}
        />

        {/* ── Intro ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Product &amp; pricing</p>
            <h1 className="mt-5 max-w-[16ch]">Find out where you stand.</h1>
            <p className="lede mt-7">
              Three fixed-scope ways to see how AI is deciding your deals. Pick
              the one that matches your situation. The price is set before we
              start, and every engagement is measurement and diagnosis, never a
              promise about rankings or inclusion.
            </p>

            <table className="ptable">
              <thead>
                <tr>
                  <th scope="col">Offering</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Timeline</th>
                  <th scope="col">Starting price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const slug = PRODUCTS.find((x) => x.id === p.id)!.slug;
                  const name = p.productName ?? p.title;
                  return (
                    <tr key={p.id}>
                      <td className="p-name">
                        <Link href={`/solutions/${slug}`}>{name}</Link>
                        <Link href={`/solutions/${slug}`} className="p-view">
                          View scope
                        </Link>
                      </td>
                      <td className="p-best">{p.businessProblem}</td>
                      <td>{p.timeline}</td>
                      <td>
                        <span className="p-price">{p.priceStart}</span>
                        <span className="p-unit">{p.priceUnit}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="muted mt-8 max-w-[62ch] text-[0.9375rem]">
              These are starting prices for the first commercial release and may
              evolve as the business matures. Every engagement ends the same
              way: what we observed, and a prioritized set of decisions, most
              important first.
            </p>
          </div>
        </section>

        {/* ── What you get ────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="mt-5 max-w-[18ch]">
                Evidence, and a ranked set of decisions.
              </h2>
              <p className="muted mt-7 max-w-[52ch]">
                Every engagement ends the same way. You receive what we
                observed, and a prioritized set of decisions, most important
                first.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Never a promise about rankings, inclusion, or who wins. Just an
                  honest read on where you stand and what would move it.
                </strong>
              </p>
            </div>
            <dl className="max-w-[74ch]">
              {FAQ.map((f) => (
                <div
                  key={f.q}
                  className="border-t py-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    {f.q}
                  </dt>
                  <dd className="muted mt-2 max-w-[64ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[20ch]">Start with your category.</h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                We confirm your category, your competitors, and the scope. Then
                we begin.
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
