import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "Company: Become the Company AI Recommends | Upstream Zero" },
  description:
    "Upstream Zero finds why AI leaves you off your buyers' shortlists, and exactly what would put you on them. The only thing we sell is that answer, so you can trust it. Founded 2026 by Skyler Meyer, California.",
  ...pageMeta("/company"),
};

export default function Company() {
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Company", "/company"],
            ]),
          }}
        />

        {/* ── Intro ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Company</p>
            <h1 className="mt-5 max-w-[19ch]">
              We show you what it takes to become the company AI recommends.
            </h1>
            <p className="lede mt-7">
              That&rsquo;s the whole company. We find why AI leaves you off your
              buyers&rsquo; shortlists, and exactly what would put you on them.
              The only thing we sell is that answer, so you can trust it.
            </p>
          </div>
        </section>

        {/* ── What we do / why independence matters ───────────── */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <ol className="steps steps-2">
              <li className="step">
                <div className="step-n">What we do</div>
                <p className="mt-3">
                  We study how AI decides which companies to put in front of
                  buyers, and why some get left off. Then we show you exactly
                  what would put you on the list. Everything we say, we&rsquo;ve
                  watched happen.
                </p>
              </li>
              <li className="step">
                <div className="step-n">Why you can trust it</div>
                <p className="mt-3">
                  A company that sells you content, links, or rankings
                  can&rsquo;t honestly tell you whether they work. We don&rsquo;t
                  sell any of that, so nothing we tell you is steering you toward
                  something we&rsquo;re selling. Just the plan that would put you
                  on the list.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* ── Where we actually are + founder ─────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Where we actually are</p>
              <h2 className="mt-5 max-w-[18ch]">
                We only claim what we can prove.
              </h2>
              <p className="muted mt-7 max-w-[52ch]">
                We tell you what we&rsquo;ve seen, we&rsquo;re careful about
                what we&rsquo;re only guessing, and we never promise revenue,
                growth, or rankings.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  If that sounds like less than other vendors promise, it is.
                  It&rsquo;s also why you can trust the one thing we do give you:
                  the real reason you&rsquo;re being left off, and what would
                  put you on the list.
                </strong>
              </p>
            </div>
            <div className="decision-card">
              <p className="eyebrow" style={{ color: "var(--highlight)" }}>
                The founder
              </p>
              <div className="founder" style={{ marginTop: "1.25rem", borderTop: 0, paddingTop: 0 }}>
                <span
                  className="founder__av"
                  style={{ width: 56, height: 56, fontSize: "1.2rem" }}
                >
                  SM
                </span>
                <div>
                  <div className="founder__nm" style={{ fontSize: "1.1rem" }}>
                    Skyler Meyer
                  </div>
                  <div className="founder__role">Founder</div>
                </div>
              </div>
              <p
                className="mt-6 max-w-[54ch]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Upstream Zero was founded in 2026 to make one invisible thing
                visible: how AI now decides which companies get recommended,
                before a buyer ever makes contact. Based in California, United
                States.
              </p>
            </div>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[22ch]">
              Find out why AI isn&rsquo;t recommending you.
            </h2>
            <BookingButton variant="btn-lime">Request an Audit</BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
