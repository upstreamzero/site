import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId } from "@/lib/content";
import { PRODUCTS, productSlugFor } from "@/lib/products";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";
import Shortlist from "@/components/Shortlist";

/** Outcome-led headline for each product on the home band. The canonical
 *  product name still renders as the secondary label, so /solutions,
 *  /pricing, and the Product schema stay the source of truth for names. */
const PRODUCT_HEADLINE: Record<string, string> = {
  "ENG-7": "Understand how AI reads your category",
  "ENG-1": "Find out where you're being cut, and why",
  "ENG-4": "Track whether you're gaining or losing ground",
};

const PRODUCT_CTA: Record<string, string> = {
  "ENG-7": "See the Category Report",
  "ENG-1": "See the Evaluation Audit",
  "ENG-4": "See Selection Tracking",
};

const base = pageMeta("/");
const SHARE_TITLE = "Companies aren't chosen. They're eliminated.";
const SHARE_DESC =
  "Your buyers start with AI, not with you. It builds their shortlist and rules companies out before anyone calls. Upstream Zero measures where you stand, where you're being cut, and what would change it.";

export const metadata: Metadata = {
  title: {
    absolute: "Upstream Zero | See Where AI Puts You Before Buyers Ever Call",
  },
  description:
    "Your buyers start with AI, not with you. It builds their shortlist and rules companies out before anyone calls. Upstream Zero measures where you stand across ChatGPT and Google AI, where you're being cut, and what would change it. Independent: we measure and diagnose, and we never sell the fix.",
  ...base,
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESC },
  twitter: { ...base.twitter, title: SHARE_TITLE, description: SHARE_DESC },
};

/** The four stages of an AI-mediated buying decision. One thing (AI weighing
 *  a company against the buyer's requirements) seen at four points. */
/** What Upstream Zero does, stated as the thesis, in the buyer's order:
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

/** Consequences a buyer already tracks, each tied to what we can measure.
 *  Framed by the section intro, which scopes it to the AI input we observe. */
const OUTCOMES = [
  {
    t: "The pipeline forming without you.",
    d: "Some of your best-fit buyers are pointed at you. Others are pointed elsewhere, and you never find out.",
    chip: "We measure this",
  },
  {
    t: "The deals you never knew you were in.",
    d: "You're being cut in evaluations that never reach your CRM. Real losses, with no name yet.",
    chip: "We measure this",
  },
  {
    t: "A warning before revenue moves.",
    d: "If AI shifts toward a competitor, you feel it in pipeline months later. When we track it, we can catch the shift well before it reaches revenue.",
    chip: "We measure this",
  },
  {
    t: "Whether your marketing is working on AI.",
    d: "You spend on content, PR, and brand. Is any of it changing whether AI recommends you?",
    chip: "We can test this",
  },
];

export default function Home() {
  const products = PRODUCTS.map((p) => byId(p.id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "engagement",
  );

  return (
    <>
      <main id="main">
        {/* ── Hero: the shift, and the signature visual ───────── */}
        <section className="section">
          <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-[80px]">
            <div>
              <p className="eyebrow">
                For companies AI isn&rsquo;t recommending
              </p>
              <h1 className="mt-5 max-w-[15ch]">
                AI recommends your competitors. Not you.
              </h1>
              <p className="lede mt-7">
                When your buyers ask AI for the best option, it puts a few
                companies forward. Right now it&rsquo;s putting your competitors
                forward, not you, and not because they have better SEO or more
                content. It&rsquo;s because AI believes they fit what the buyer
                needs.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  We show you why, and what would make you the company AI
                  recommends.
                </strong>
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingButton variant="btn">Request an Audit</BookingButton>
                <a href="#belief" className="btn-ghost">
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
                We measure across ChatGPT and Google AI today
              </p>
            </div>
            <div className="lg:mt-0">
              <Shortlist />
            </div>
          </div>
        </section>

        {/* ── Audience band: full-bleed inset strip ───────────── */}
        <section className="built-for-band">
          <div className="shell">
            <div className="built-for">
              <span className="built-for__label">Built for</span>
              <span className="built-for__item">Revenue leaders</span>
              <span className="built-for__item">Marketing leaders</span>
              <span className="built-for__item">Category owners</span>
              <span className="built-for__item">Enterprise teams</span>
            </div>
          </div>
        </section>

        {/* ── Belief + the first hard proof ───────────────────── */}
        <section className="section" id="belief">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">How AI chooses who to recommend</p>
              <h2 className="mt-5 max-w-[18ch]">
                AI recommends the best fit, not the most visible.
              </h2>
              <p className="muted mt-7 max-w-[54ch]">
                Your buyer has a problem, and that problem comes with
                requirements: the specific things they need a vendor to do. When
                they ask AI for the best option, AI compares companies against
                those requirements and puts forward the ones that fit. The
                company that fits best becomes the logical choice.{" "}
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

        {/* ── Differentiation: why AI visibility isn't enough ── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Why AI visibility isn&rsquo;t enough</p>
            <h2 className="mt-5 max-w-[24ch]">
              Getting found is not the same as getting chosen.
            </h2>
            <p className="lede mt-6 max-w-[64ch]">
              AI visibility, AEO, GEO, and LLM optimization all work on one
              thing: whether AI can find you and mention you. That matters, but
              it is only the first step. The moment your buyer adds a real
              requirement, AI narrows to the companies that fit, and the most
              visible name is often the first one cut. You can show up
              everywhere in ChatGPT and Google AI and still lose the
              recommendation.
            </p>
          </div>
        </section>

        {/* ── What we do: the thesis, as the product ──────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5 max-w-[26ch]">
              We show you what it takes to become the company AI recommends.
            </h2>
            <p className="lede mt-6 max-w-[62ch]">
              For the buyers you want to win, we find what is really deciding who
              AI puts forward, and what would put you there.
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
          </div>
        </section>

        {/* ── Why it matters: the numbers you report ──────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-5 max-w-[24ch]">
              This is already moving the numbers you report.
            </h2>
            <p className="lede mt-6 max-w-[60ch]">
              The shortlist AI builds before anyone calls moves the same numbers
              you manage. We can&rsquo;t promise you a number. But we can show
              you what is quietly moving all of them.
            </p>
            <ul className="outcomes">
              {OUTCOMES.map((o) => (
                <li key={o.t} className="outcome">
                  <p>
                    <strong>{o.t}</strong> {o.d}
                  </p>
                  <span className="chip chip-accent">{o.chip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why us: independence + founder accountability ───── */}
        <section className="section-tight">
          <div className="shell">
            <div className="decision-card">
              <p className="eyebrow" style={{ color: "var(--highlight)" }}>
                Why us
              </p>
              <h2
                className="mt-4 max-w-[22ch]"
                style={{ color: "#ffffff" }}
              >
                You want to fix it. We show you exactly what to fix.
              </h2>
              <p
                className="mt-5 max-w-[62ch]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Then you fix it your way, with whoever you trust. We don&rsquo;t
                sell SEO, content, or optimization, so when we tell you where
                you&rsquo;re being cut and what would change it, there&rsquo;s no
                product behind the advice.{" "}
                <strong style={{ color: "#ffffff", fontWeight: 600 }}>
                  Just the honest answer, with no agenda.
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
              <p
                className="mt-5 max-w-[62ch]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Every finding we publish comes with exactly how and when we saw
                it. If we can&rsquo;t show it, we don&rsquo;t claim it. That
                standard is the whole company.
              </p>
            </div>
          </div>
        </section>

        {/* ── What you do about it: what must become true ────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">What you do about it</p>
            <h2 className="mt-5 max-w-[26ch]">
              You leave knowing what would put you back on the list.
            </h2>
            <p className="lede mt-6 max-w-[60ch]">
              Being cut isn&rsquo;t the end of it. For every requirement that
              removes you, we tell you what would have to be true, and provable,
              for AI to recommend you instead. That&rsquo;s your plan, most
              important first. You fix what matters.
            </p>
            <ul className="outcomes">
              <li className="outcome">
                <p>
                  <strong>
                    Something you already do, that AI can&rsquo;t see.
                  </strong>{" "}
                  Put the proof where AI will read it, and you move back into the
                  running.
                </p>
                <span className="chip chip-accent">Usually fixable</span>
              </li>
              <li className="outcome">
                <p>
                  <strong>A competitor&rsquo;s claim AI trusts over yours.</strong>{" "}
                  Show the evidence that outweighs it.
                </p>
                <span className="chip chip-accent">Usually fixable</span>
              </li>
              <li className="outcome">
                <p>
                  <strong>A real gap.</strong> Now you know it&rsquo;s real, and
                  you can decide whether it&rsquo;s worth closing.
                </p>
                <span className="chip chip-accent">Worth knowing</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── Products (from canonical engagement data) ───────── */}
        <section className="dark-band">
          <div className="shell">
            <p className="eyebrow">Find out why AI skips you</p>
            <h2 className="mt-5 max-w-[24ch]">
              Three ways to find out why, and what would change it.
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
                Find out why AI isn&rsquo;t recommending you.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your market and who you&rsquo;re up against. We&rsquo;ll
                show you why AI is leaving you off, and what would put you on the
                list.
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
