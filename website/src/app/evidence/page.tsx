import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, breadcrumbLd } from "@/lib/meta";
import { byId, byType, urlFor } from "@/lib/content";
import { FEATURED_EXPERIMENT_IDS } from "@/lib/featured";
import { ProvenanceFooter } from "@/components/SiteChrome";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: { absolute: "Evidence: What We've Observed About AI Recommendations" },
  description:
    "Our evidence, not a blog. Every test is dated, every claim is held at its honest level, and we say plainly what we've proven versus what we're still watching. The market leader is often the first one cut.",
  ...pageMeta("/evidence"),
};

export default function Evidence() {
  const featured = FEATURED_EXPERIMENT_IDS.map((id) => byId(id)).filter(
    (o): o is NonNullable<typeof o> => Boolean(o) && o!.type === "experiment",
  );
  const total = byType("experiment").length;

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Evidence", "/evidence"],
            ]),
          }}
        />

        {/* ── Intro ───────────────────────────────────────────── */}
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Evidence</p>
            <h1 className="mt-5 max-w-[16ch]">
              We can see how AI decides. Here&rsquo;s the proof.
            </h1>
            <p className="lede mt-7">
              AI weighs companies against what your buyers need, and we can watch
              it happen. This is our evidence, not a blog. Every test is dated,
              and we&rsquo;re clear about what we&rsquo;ve proven versus what
              we&rsquo;re still watching, even when what we find is nothing.
            </p>
          </div>
        </section>

        {/* ── The finding ─────────────────────────────────────── */}
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="shell">
            <div className="card">
              <p className="eyebrow">The finding</p>
              <p className="bigquote mt-5">
                The market leader is often the <mark>first one cut</mark>.
              </p>
              <div className="proofpts">
                <p className="proofpt">
                  In the markets we&rsquo;ve tested so far, the company AI named
                  first was often the first removed the moment it hit a
                  requirement it couldn&rsquo;t meet.
                </p>
                <p className="proofpt">
                  In one market the leader changed between tests, and whichever
                  company led was cut at the same step.
                </p>
                <p className="proofpt">
                  <strong>
                    We hold this as a strong, repeated pattern, seen on both
                    ChatGPT and Google AI so far, and we say so.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How we hold evidence ────────────────────────────── */}
        <section className="section-tight">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">How careful we are with evidence</p>
              <h2 className="mt-5 max-w-[20ch]">
                We separate what we&rsquo;ve seen from what we believe.
              </h2>
              <p className="muted mt-7 max-w-[52ch]">
                A pattern we&rsquo;ve watched is not a law we&rsquo;ve proven,
                and we always tell you which is which. We only say something
                &ldquo;caused&rdquo; a result when a real test backs it up. When
                we find nothing, we say we found nothing. It&rsquo;s slower, and
                it&rsquo;s the only way the work is worth trusting.
              </p>
            </div>
            <div>
              <details className="persona">
                <summary>How we measure it</summary>
                <div className="persona-body">
                  <p>
                    We run your category the way a real buyer would, adding
                    requirements the way they do, and we record what AI does at
                    each step: where you enter, where you&rsquo;re cut, who
                    survives instead of you, and what changed the outcome.
                  </p>
                  <p>
                    Take a healthcare software company that can meet Epic and
                    HIPAA, but can&rsquo;t prove it in a form AI can read. It
                    gets cut, not for what it lacks, but for what it can&rsquo;t
                    prove. We find that exact moment and name the requirement
                    that removed it. This is an illustration of the method, not
                    a real company or a promised result.
                  </p>
                </div>
              </details>
              <details className="persona">
                <summary>What a dated test looks like</summary>
                <div className="persona-body">
                  <p>
                    Every experiment is recorded with its question, the exact
                    conditions it ran under, what we saw, and how sure we are.
                    Nothing is presented as more certain than the test supports.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── The public record (real library) ────────────────── */}
        <section className="section-tight">
          <div className="shell">
            <p className="eyebrow">The public record</p>
            <h2 className="mt-5 max-w-[24ch]">
              Every test in the program is dated and public.
            </h2>
            <ul className="browse">
              {featured.map((e) => (
                <li key={e.id}>
                  <Link href={urlFor(e)}>
                    <span className="browse-id">{e.id}</span>
                    <span className="browse-title">{e.title}</span>
                    <span className="browse-meta">
                      {[e.category, e.status].filter(Boolean).join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-9">
              <Link href="/research" className="btn-ghost">
                Browse all {total} experiments
              </Link>
            </p>
          </div>
        </section>

        {/* ── Close ───────────────────────────────────────────── */}
        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[22ch]">See it run on your category.</h2>
            <BookingButton variant="btn-lime">Request an Audit</BookingButton>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
