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
const STAGES = [
  {
    n: "01",
    name: "Discovery",
    q: "Who should I look at?",
    d: "AI builds the first shortlist. If you're not on it, you never enter, and never find out.",
  },
  {
    n: "02",
    name: "Evaluation",
    q: "Which of these fits?",
    d: "The buyer adds requirements. AI cuts everyone who doesn't fit. Most companies disappear here.",
  },
  {
    n: "03",
    name: "Validation",
    q: "Am I sure?",
    d: "The buyer double-checks. Does it integrate, is it secure, can it scale. Confidence firms up or cracks.",
  },
  {
    n: "04",
    name: "Selection",
    q: "This is the one.",
    d: "Whoever survives every cut is the obvious choice. Not because they were picked, but because no one could rule them out.",
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
                For companies losing deals they should be winning
              </p>
              <h1 className="mt-5 max-w-[16ch]">
                The deal is decided before you know it exists.
              </h1>
              <p className="lede mt-7">
                Your buyers now start with AI, not with you. It builds their
                shortlist, decides who fits, and rules companies out, long
                before anyone calls. You can be the best choice and never make
                the list.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Upstream Zero shows you where you stand, and what would change
                  it.
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
              <p className="eyebrow">What is really happening</p>
              <h2 className="mt-5 max-w-[16ch]">
                Companies aren&rsquo;t chosen. They&rsquo;re eliminated.
              </h2>
              <p className="muted mt-7 max-w-[52ch]">
                AI doesn&rsquo;t reward the best option. It removes whatever
                doesn&rsquo;t fit the buyer&rsquo;s requirements, until a few are
                left. Being visible, or being the biggest name, doesn&rsquo;t
                protect you.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  What matters is whether you survive each cut, and most
                  companies have never checked whether they do.
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
                  Early evidence, on a small number of markets and mostly one AI
                  system so far. We hold it as a strong pattern, not a law.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        {/* ── AI is in every step, not just the first ─────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">And it doesn&rsquo;t stop at the first search</p>
            <h2 className="mt-5 max-w-[26ch]">
              AI is in every step of the decision, not just the first one.
            </h2>
            <p className="lede mt-6">
              The moment AI first names you is not the decision. It keeps
              re-deciding as your buyer gets specific, and again as they
              double-check their choice.
            </p>
            <ol className="steps steps-4 mt-12">
              {STAGES.map((s) => (
                <li key={s.n} className="step">
                  <div className="step-n">{s.n}</div>
                  <h3>{s.name}</h3>
                  <span className="step-q">&ldquo;{s.q}&rdquo;</span>
                  <p>{s.d}</p>
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

        {/* ── Products (from canonical engagement data) ───────── */}
        <section className="dark-band">
          <div className="shell">
            <p className="eyebrow">Find out where you stand</p>
            <h2 className="mt-5 max-w-[24ch]">
              Three ways to see how AI is deciding your deals.
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
                See where you stand in your category.
              </h2>
              <p className="lede mt-4" style={{ color: "#ffffff", opacity: 0.9 }}>
                Tell us your market and who you&rsquo;re up against. We&rsquo;ll
                show you where AI is putting you, where you&rsquo;re being cut,
                and what would change it.
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
