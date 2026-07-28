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
  description: `Three fixed-scope ways to understand what would make you the company AI recommends. ${PRICE_SUMMARY}. Each ends in a plan you can act on, never a promise about where you'll rank.`,
  ...pageMeta("/pricing"),
};

/** Buyer-facing objections, closed at the buying moment. Honesty-forward:
 *  the independence answer and the "what if the read is wrong" answer are
 *  the trust assets, not disclaimers. */
const FAQ = [
  {
    q: "Are these fixed prices?",
    a: "They are starting prices for the standard version, covering one market. We agree on exactly what's included and the timing before any work begins, so the final price is set up front, never after.",
  },
  {
    q: "How is this different from an AI-visibility tool?",
    a: "A visibility tool tells you whether you appear in AI answers. That is one step of four. We measure the whole decision, where you're cut and why, and we sell you no tool to fix it, so our read has no agenda.",
  },
  {
    q: "Why pay for this if you won't do the fix?",
    a: "Because you leave with the plan, not just a problem. We tell you exactly what would make AI recommend you, ranked by what matters most, so your team or whoever you trust can start on day one. And because we sell no fix, nothing in that plan is steering you toward something we're selling.",
  },
  {
    q: "What if the read is wrong, or unhelpful?",
    a: "Everything we report is tied to something we actually saw, with the conditions it happened under. We tell you plainly what we've proven versus what we're only guessing, so you are never asked to take anything on faith.",
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
            <h1 className="mt-5 max-w-[16ch]">
              Buy the plan to become the choice.
            </h1>
            <p className="lede mt-7">
              Three ways to understand what would make you the company AI
              recommends to the buyers you want. Pick the one that fits where
              you are. You&rsquo;ll know the price before we start, and each one
              ends in a plan you can act on, never a promise about where
              you&rsquo;ll rank.
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
              These are starting prices and may change as we grow. Every one
              ends the same way: what we saw, and a ranked list of what to do
              about it, most important first.
            </p>
          </div>
        </section>

        {/* ── What you get ────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="mt-5 max-w-[18ch]">
                A straight answer, and the plan to act on it.
              </h2>
              <p className="muted mt-7 max-w-[52ch]">
                Every one ends the same way. You learn where you stand with AI,
                why you&rsquo;re being put forward or cut, and the ranked list of
                what would make you the logical choice, most important first.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Never a promise about where you&rsquo;ll rank or who wins. Just
                  what it would take to become the company AI recommends.
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
              <h2 className="max-w-[20ch]">Start with your market.</h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                We confirm your market, who you&rsquo;re up against, and
                what&rsquo;s included. Then we start.
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
