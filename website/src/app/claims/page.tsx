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
      <main id="main" className="shell section-tight">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd("CollectionPage", "What We Claim | Upstream Zero", "/claims", "A version-controlled ledger of Upstream Zero research claims, evidence tiers, observations, experiment status, uncertainty, and current findings."),
          }}
        />
        <div className="mt-2">
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
          <p className="lede mt-5">
            A claim can never be shown as stronger than its evidence. That is
            not a promise we make, it is a rule the site is built to enforce:
            if a claim ever displayed more confidence than its evidence
            supports, the build would fail.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </div>

        <ul className="mt-10 list-none space-y-8 p-0">
          {claims.map((c) => (
            <li key={c.id} className="border-l pl-5" style={{ borderColor: "var(--ink-18)" }}>
              <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
                {c.id} · {c.status} · {c.created}
              </span>
              <div className="mt-1 max-w-[58ch] text-[1.1rem]">
                <Link href={urlFor(c)}>{c.title}</Link>
              </div>
              <div className="mt-2">{c.tier && <TierScale tier={c.tier} />}</div>
            </li>
          ))}
        </ul>

        <p className="measure mt-10 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
          Why is everything Narrated? Because no observation has been
          published yet, and by our own rules a claim with no evidence edges
          is Narrated by construction. The ledger is designed to be doubted:
          walk any claim&apos;s edges, check its revision history, fetch its{" "}
          <a href="/graph.json">machine rendering</a>. Verification should not
          depend on trusting us.
        </p>
      </main>
      <ProvenanceFooter />
    </>
  );
}
