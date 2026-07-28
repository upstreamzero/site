import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import Shortlist from "@/components/Shortlist";

/** Outcome-led headline for each product on the dark band. Canonical product
 *  name renders as the secondary label. */
const PRODUCT_HEADLINE: Record<string, string> = {
  "ENG-7": "See how AI reads your market",
  "ENG-1": "Find out where you're being cut, and why",
  "ENG-4": "Track whether you're gaining or losing ground",
};

const PRODUCT_CTA: Record<string, string> = {
  "ENG-7": "See the Category Report",
  "ENG-1": "See the Evaluation Audit",
  "ENG-4": "See Selection Tracking",
};

const base = pageMeta("/");
const SHARE_TITLE = "You made the shortlist. You still lost the deal.";
const SHARE_DESC =
  "Your buyers evaluate you with AI before they ever call sales. As they add real requirements, the recommendation changes, and the best-fit company is often eliminated first. Upstream Zero shows you where you get eliminated, and what would keep you the choice.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Upstream Zero | AI Visibility & Commercial Intelligence for Revenue Teams",
  },
  description:
    "Enterprise buyers now run their evaluation with AI before they ever call sales. As they add real requirements, the recommendation changes and companies are eliminated. Upstream Zero shows you where your company gets eliminated during AI-mediated evaluation, why competitors survive, and what would keep you the logical choice. AI visibility gets you considered; surviving the requirements wins the deal.",
  ...base,
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESC },
  twitter: { ...base.twitter, title: SHARE_TITLE, description: SHARE_DESC },
};

/** The examples are the product. Real category leaders as the opening set;
 *  each requirement changes the recommendation. Illustrative of the dynamic,
 *  not a record of a specific AI answer. */
const EXAMPLES = [
  {
    q: "Best travel management company for a global law firm",
    cos: ["CTM", "Navan", "Amex GBT", "FCM"],
    reqs: [
      "Integrates with Elite 3E",
      "VIP executive servicing",
      "Global 24/7 servicing",
    ],
  },
  {
    q: "Best customer data platform for a hospital network",
    cos: ["Segment", "Tealium", "Salesforce", "Adobe"],
    reqs: [
      "Integrates with Epic",
      "HIPAA and data residency",
      "Real-time activation",
    ],
  },
  {
    q: "Best endpoint security for a global bank",
    cos: ["CrowdStrike", "SentinelOne", "Defender", "Palo Alto"],
    reqs: [
      "FedRAMP authorized",
      "24/7 managed response",
      "Air-gapped deployment",
    ],
  },
  {
    q: "Best CRM for a manufacturing enterprise",
    cos: ["Salesforce", "HubSpot", "Dynamics", "SAP"],
    reqs: [
      "Integrates with SAP ERP",
      "Field service module",
      "Multi-region compliance",
    ],
  },
];

export default function Home() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );

  return (
    <>
      <main id="main">
        {/* ── Hero: recognition, then the offer ───────────────── */}
        <section className="section">
          <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-[80px]">
            <div>
              <p className="eyebrow">For revenue and marketing leaders</p>
              <h1 className="mt-5 max-w-[15ch]">
                You made the shortlist. You still lost the deal.
              </h1>
              <p className="lede mt-7">
                Your buyer evaluates with AI before they ever call you. As they
                add requirements, the best-fit company is often eliminated
                before sales gets involved.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Upstream Zero shows you where you get cut, and what would keep
                  you the choice.
                </strong>
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingButton variant="btn">Request an Audit</BookingButton>
                <a href="#examples" className="btn-ghost">
                  See how it works
                </a>
              </div>
              <p className="mt-8 flex items-center gap-2 text-[0.75rem] tracking-[0.02em] text-ink-muted font-mono">
                <span
                  aria-hidden="true"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flex: "none",
                  }}
                />
                We track this across ChatGPT and Google AI today
              </p>
            </div>
            <div className="lg:mt-0">
              <Shortlist />
            </div>
          </div>
        </section>

        {/* ── Audience band ───────────────────────────────────── */}
        <section className="built-for-band">
          <div className="shell">
            <div className="built-for">
              <span className="built-for__label">Built for</span>
              <span className="built-for__item">CEOs</span>
              <span className="built-for__item">Revenue leaders</span>
              <span className="built-for__item">Marketing leaders</span>
              <span className="built-for__item">Product leaders</span>
            </div>
          </div>
        </section>

        {/* ── The examples are the product ────────────────────── */}
        <section className="section" id="examples">
          <div className="shell">
            <p className="eyebrow">This is how buyers evaluate now</p>
            <h2 className="mt-5 max-w-[22ch]">
              The first recommendation isn&rsquo;t the one that wins.
            </h2>
            <div className="evex-grid">
              {EXAMPLES.map((ex) => (
                <div key={ex.q} className="evex">
                  <div>
                    <span className="evex__label">Buyer asks AI</span>
                    <p className="evex__q">&ldquo;{ex.q}&rdquo;</p>
                  </div>
                  <div>
                    <span className="evex__label">AI recommends</span>
                    <div className="evex__rec">
                      {ex.cos.map((c) => (
                        <span key={c} className="evex__co">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="evex__steps">
                    {ex.reqs.map((r) => (
                      <div key={r} className="evex__step">
                        <span className="evex__req">
                          <b>+</b> {r}
                        </span>
                        <span className="evex__change">
                          Recommendation changes
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="evex__note">
                    <b>The opening answer didn&rsquo;t decide the deal.</b> The
                    follow-up questions did.
                  </p>
                </div>
              ))}
            </div>
            <p className="fade mt-6 max-w-[64ch] text-[0.85rem]">
              Illustrative. Real companies, but the sequence shows the dynamic,
              not a specific AI answer.
            </p>
          </div>
        </section>

        {/* ── The one idea ────────────────────────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="eyebrow">Why it matters</p>
                <h2 className="mt-5 max-w-[16ch]">
                  Visibility gets you considered. It doesn&rsquo;t keep you in.
                </h2>
                <p className="muted mt-7 max-w-[52ch]">
                  The question was never whether you show up.{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    It&rsquo;s whether you&rsquo;re still the choice when the
                    requirements get specific.
                  </strong>
                </p>
              </div>
              <div className="card">
                <p className="eyebrow">What we keep seeing</p>
                <p className="bigquote mt-5">
                  Even the market <mark>leader</mark> is often the{" "}
                  <mark>first</mark> one cut.
                </p>
                <div className="proofpts">
                  <p className="proofpt">
                    The company AI named first was often the first removed the
                    moment it hit a requirement it couldn&rsquo;t meet.
                  </p>
                  <p className="proofpt is-quiet">
                    Early evidence, seen on both ChatGPT and Google AI so far. We
                    hold it as a strong pattern, not a law.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Products ────────────────────────────────────────── */}
        <section className="dark-band">
          <div className="shell">
            <p className="eyebrow">Where to start</p>
            <h2 className="mt-5 max-w-[24ch]">
              Find out where your company gets eliminated.
            </h2>
            <div className="product-grid mt-14">
              {products.map((p, i) => {
                const slug = productSlugFor(p.id);
                return (
                  <div key={p.id} className="product-col">
                    <div className="product-col__meta">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {p.timeline && <span>{p.timeline}</span>}
                    </div>
                    <h3 className="product-col__name">
                      {PRODUCT_HEADLINE[p.id] ?? p.productName ?? p.title}
                    </h3>
                    <span className="product-col__label">
                      {p.productName ?? p.title}
                    </span>
                    {p.businessProblem && (
                      <p className="product-col__quote">
                        &ldquo;{p.businessProblem}&rdquo;
                      </p>
                    )}
                    {p.businessOutcome && (
                      <p className="product-col__desc">{p.businessOutcome}</p>
                    )}
                    <div className="product-col__price-row">
                      <div>
                        <div className="product-col__price-label">
                          Starting at
                        </div>
                        {p.priceUnit && (
                          <div className="product-col__price-label">
                            {p.priceUnit}
                          </div>
                        )}
                      </div>
                      {p.priceStart && (
                        <div className="product-col__price">{p.priceStart}</div>
                      )}
                    </div>
                    {slug && (
                      <Link
                        href={`/solutions/${slug}`}
                        className="product-col__cta"
                      >
                        {PRODUCT_CTA[p.id] ?? "View scope"}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-12">
              <Link href="/pricing" className="btn-ghost">
                Compare products and pricing
              </Link>
            </p>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[24ch]">
                See where your company gets eliminated.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your market and your competitors. We&rsquo;ll show you
                where AI cuts you, why competitors survive, and what would keep
                you the choice.
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
