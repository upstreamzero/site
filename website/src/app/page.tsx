import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import Shortlist from "@/components/Shortlist";

/** Outcome-led headline for each product on the dark band. Canonical product
 *  name renders as the secondary label, so /solutions, /pricing, and the
 *  Product schema stay the source of truth for names. */
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
const SHARE_TITLE = "Why do competitors keep winning deals you should have won?";
const SHARE_DESC =
  "Your buyers evaluate you with AI before they ever call sales. Upstream Zero shows you why AI recommends competitors instead of you, and what it takes to become the choice.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Upstream Zero | AI Visibility & Commercial Intelligence for Revenue Teams",
  },
  description:
    "Your buyers evaluate you with AI before they ever call sales. ChatGPT, Claude, and Gemini compare vendors, test your evidence, and narrow the list, often putting competitors ahead of you. Upstream Zero shows you why AI recommends competitors instead of you, and what it takes to become the logical choice, so you win more of the deals you should. AI visibility, AEO, and GEO are the entry point; becoming the choice is the outcome.",
  ...base,
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESC },
  twitter: { ...base.twitter, title: SHARE_TITLE, description: SHARE_DESC },
};

/** The buying journey, stage by stage, in the language executives use. AI
 *  now shapes each one, which is where the recognizable business problems
 *  come from. */
const FUNNEL = [
  {
    stage: "Getting considered",
    d: "AI decides who makes the shortlist. If it doesn't put you forward, you never enter the deal, and you never see the qualified pipeline you lost.",
  },
  {
    stage: "Getting evaluated",
    d: "As buyers add requirements, AI rules vendors out, exposes your messaging and product gaps, and introduces competitors, all before sales can shape the story. This is where strong discovery calls stall.",
  },
  {
    stage: "Getting chosen",
    d: "AI reinforces or challenges the decision, moves buyer confidence, and tips the close calls. It shows up in your win rate and your sales cycle.",
  },
];

/** What Upstream Zero does, stated as the locked thesis in the buyer's order:
 *  problem, requirements, how AI reads fit, why competitors win, and what
 *  would make you the logical choice. This is the product. */
const WHAT_WE_DO = [
  {
    t: "The problem your buyer is solving",
    d: "The job your buyers are actually trying to get done, in their words.",
  },
  {
    t: "The requirements it creates",
    d: "The specific things they need a vendor to do, which change by industry and by who is making the call.",
  },
  {
    t: "How AI reads your fit",
    d: "Whether AI can tell you meet those requirements, and where it cannot tell.",
  },
  {
    t: "Why competitors get recommended",
    d: "Which requirements are getting them put forward instead of you.",
  },
  {
    t: "What must become true",
    d: "The shortest path to becoming the logical choice for the buyers you want to win.",
  },
];

export default function Home() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );

  return (
    <>
      <main id="main">
        {/* ── Hero: the executive pain, then the hidden cause ─── */}
        <section className="section">
          <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-[80px]">
            <div>
              <p className="eyebrow">For revenue and marketing leaders</p>
              <h1 className="mt-5 max-w-[16ch]">
                Your competitors keep winning deals you should have won.
              </h1>
              <p className="lede mt-7">
                You have the better product. Your discovery calls go well. Then
                deals stall, or you never see them at all. More and more, the
                reason is something you can&rsquo;t see: your buyers run their
                evaluation with AI before they ever call you, and it&rsquo;s
                putting your competitors ahead.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Upstream Zero shows you why, and what it takes to become the
                  one they choose.
                </strong>
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingButton variant="btn">Request an Audit</BookingButton>
                <a href="#shift" className="btn-ghost">
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

        {/* ── The shift: AI is now in the evaluation ──────────── */}
        <section className="section" id="shift">
          <div className="shell">
            <p className="eyebrow">What changed</p>
            <h2 className="mt-5 max-w-[24ch]">
              Most of the decision now happens before your first sales call.
            </h2>
            <p className="lede mt-7 max-w-[64ch]">
              Buyers used to call you to learn. Now they spend hours with AI
              first. ChatGPT, Claude, and Gemini have become participants in the
              evaluation: they compare vendors, refine requirements, test your
              claims, surface your weaknesses, and narrow the list. By the time
              a buyer books a meeting, much of the evaluation is already done,
              and sales is walking into a conversation it never got to shape.
            </p>
          </div>
        </section>

        {/* ── Where it's costing you: the funnel, in exec terms ─ */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="eyebrow">Where it is costing you</p>
            <h2 className="mt-5 max-w-[24ch]">
              AI is shaping every stage of the deal.
            </h2>
            <ol className="steps steps-3 mt-12">
              {FUNNEL.map((s, i) => (
                <li key={s.stage} className="step">
                  <div className="step-n">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{s.stage}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── The thesis: why AI picks who it picks ───────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Why AI chooses who it chooses</p>
              <h2 className="mt-5 max-w-[18ch]">
                AI recommends the best fit, not the most visible.
              </h2>
              <p className="muted mt-7 max-w-[54ch]">
                Your buyer has a problem, and that problem comes with
                requirements: the specific things they need a vendor to do. AI
                compares companies against those requirements and puts forward
                the ones it believes fit best. The company that fits best
                becomes the logical choice.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Being recommended is the result of fitting what the buyer
                  needs, not of being the loudest or the biggest name.
                </strong>
              </p>
            </div>
            <div className="card">
              <p className="eyebrow">How we know</p>
              <p className="bigquote mt-5">
                Even the market <mark>leader</mark> is often the{" "}
                <mark>first</mark> one cut.
              </p>
              <div className="proofpts">
                <p className="proofpt">
                  In the markets we&rsquo;ve tested so far, the company AI named
                  first was often the first removed the moment it hit a
                  requirement it couldn&rsquo;t meet.
                </p>
                <p className="proofpt">
                  <strong>Being on top was the risk, not the protection.</strong>
                </p>
                <p className="proofpt is-quiet">
                  Early evidence, on a small number of markets, seen on both
                  ChatGPT and Google AI so far. We hold it as a strong pattern,
                  not a law.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── Why AI visibility isn't the whole answer ────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Why AI visibility isn&rsquo;t the whole answer</p>
            <h2 className="mt-5 max-w-[24ch]">
              Getting found is not the same as getting chosen.
            </h2>
            <p className="lede mt-6 max-w-[64ch]">
              AI visibility, AEO, GEO, and LLM optimization work on whether AI
              can find you and mention you. That is necessary, but it is the
              entry point, not the win. The moment a buyer adds a real
              requirement, AI narrows to the vendors that fit, and the most
              visible name is often the first one cut. Visibility gets you into
              the room. Fit is what wins the deal.
            </p>
          </div>
        </section>

        {/* ── What we do: the thesis, as the product ──────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5 max-w-[26ch]">
              We show you how to become the company AI recommends.
            </h2>
            <p className="lede mt-6 max-w-[62ch]">
              Upstream Zero improves how you are evaluated across the entire
              buying journey. For the buyers you want to win, we find what is
              really deciding who AI puts forward, and what would put you there.
            </p>
            <ol className="method-list mt-4">
              {WHAT_WE_DO.map((s, i) => (
                <li key={s.t} className="method-row">
                  <span className="num-row__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="method-row__body">
                    <div className="method-row__title">{s.t}</div>
                    <div className="method-row__desc">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="muted mt-8 max-w-[64ch]">
              The result shows up where you already measure it: more qualified
              pipeline, higher win rates, shorter sales cycles, and clearer
              product and messaging decisions. We can&rsquo;t promise you a
              number. We can show you what is moving all of them.
            </p>
          </div>
        </section>

        {/* ── Why us: independent, no agenda ──────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <div className="decision-card">
              <p className="eyebrow" style={{ color: "var(--highlight)" }}>
                Why us
              </p>
              <h2 className="mt-4 max-w-[22ch]" style={{ color: "#ffffff" }}>
                The answer comes with no agenda.
              </h2>
              <p
                className="mt-5 max-w-[62ch]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                We sell no SEO, no content, no optimization. So when we tell you
                why AI is putting competitors ahead of you and what would change
                it, there is no product behind the advice.{" "}
                <strong style={{ color: "#ffffff", fontWeight: 600 }}>
                  A company that sells you the fix can&rsquo;t be trusted to
                  grade it. We can, because we don&rsquo;t.
                </strong>
              </p>
              <div className="founder">
                <span className="founder__av">SM</span>
                <div>
                  <div className="founder__nm">Skyler Meyer, Founder</div>
                  <div className="founder__role">
                    Accountable for every claim on this site
                  </div>
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
              Find out why you&rsquo;re losing deals you should win.
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
                See why you&rsquo;re losing deals you should win.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your market and who you&rsquo;re up against. We&rsquo;ll
                show you how AI is evaluating you, why competitors are getting
                put forward, and what it would take to become the choice.
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
