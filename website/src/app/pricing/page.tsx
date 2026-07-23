import Link from "next/link";
import type { Metadata } from "next";
import { byId } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { pageMeta, breadcrumbLd, faqLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "Pricing | Upstream Zero" },
  description:
    "Fixed-scope Commercial Evaluation products with published starting prices: Category Intelligence Report, Commercial Evaluation Audit, and Selection Intelligence.",
  ...pageMeta("/pricing"),
};

const FAQ = [
  {
    q: "Are these fixed prices?",
    a: "They are starting prices for the standard scope of one defined category. We confirm category boundaries, complexity, and timing before any work begins, so the final price is agreed up front, never after.",
  },
  {
    q: "Do you promise better rankings or recommendations?",
    a: "No. Every Upstream Zero engagement is measurement and diagnosis. You receive evidence and a prioritized set of decisions, never a promise about what an AI evaluator will do. We are not an AI SEO, GEO, or visibility agency.",
  },
  {
    q: "What is a category?",
    a: "The market your buyers are asking about, for example healthcare customer data platforms or field service management software. Pricing is per category because each one is evaluated on its own.",
  },
  {
    q: "How do I start?",
    a: "Tell us your category and the competitors you are evaluated against. We confirm scope and timing, then begin. The fastest first step is a Category Intelligence Report.",
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
              ["Pricing", "/pricing"],
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
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-5 max-w-[20ch]">
              A defined question. A fixed scope. A useful answer.
            </h1>
            <p className="lede mt-7">
              These engagements measure and diagnose how your company performs
              during AI-mediated commercial evaluation. Every price is for one
              defined category. Starting prices reflect the standard scope for
              that category. We confirm boundaries, complexity, and timing
              before work begins.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Table ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
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
              These are starting prices for the first commercial release and
              may evolve as the business matures. Every engagement is
              measurement and diagnosis, never a promise about rankings,
              inclusion, or selection.
            </p>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-5 max-w-[22ch]">Before you ask.</h2>
            <dl className="mt-10 max-w-[74ch]">
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
            <h2 className="max-w-[24ch]">
              Not sure which one? Start with the map.
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
