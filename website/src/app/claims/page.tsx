import Link from "next/link";
import type { Metadata } from "next";
import { pageLd, pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";

export const metadata: Metadata = {
  title: { absolute: "What We Claim | Upstream Zero" },
  description:
    "A version-controlled ledger of Upstream Zero research claims, evidence tiers, observations, experiment status, uncertainty, and current findings.",
  ...pageMeta("/claims"),
};

export default function Claims() {
  const claims = byType("claim");
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "What We Claim | Upstream Zero",
              "/claims",
              "A version-controlled ledger of Upstream Zero research claims, evidence tiers, observations, experiment status, uncertainty, and current findings.",
            ),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">What we claim</p>
            <h1 className="mt-5 max-w-[20ch]">
              Everything we say, and how sure we are.
            </h1>
            <p className="lede mt-7">
              Every claim we publicly stand behind, each one labelled with how
              strong the evidence for it actually is. That includes our own
              founding claims, which currently rest on the weakest label we
              have, and say so.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <p className="eyebrow">The claims</p>
            <h2 className="mt-5 max-w-[24ch]">
              Each one carries its evidence level.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {claims.map((c) => (
                <article key={c.id} className="card">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{c.id}</span>
                    <span className="chip">{c.status}</span>
                    <span className="chip">{c.created}</span>
                  </div>
                  <h3 className="mt-5">
                    <Link href={urlFor(c)}>{c.title}</Link>
                  </h3>
                  {c.tier && (
                    <div className="mt-5">
                      <TierScale tier={c.tier} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="shell">
            <div className="callout max-w-[70ch]">
              <p>
                <strong>Why is everything at the weakest level?</strong>{" "}
                Because no observation has been published yet, and by our own
                rules a claim with nothing supporting it stays at the bottom of
                the scale. The list is designed to be doubted: follow any
                claim to what supports it, check its history, or fetch the{" "}
                <a href="/graph.json">machine version</a>. Verification should
                never depend on trusting us.
              </p>
            </div>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
