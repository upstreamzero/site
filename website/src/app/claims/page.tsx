import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byType, urlFor } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";

export const metadata: Metadata = {
  title: "Claims",
  ...pageMeta("/claims"),
};

export default function Claims() {
  const claims = byType("claim");
  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <h1 className="text-[1.75rem]">The Claim Ledger</h1>
          <p className="measure mt-3" style={{ color: "var(--ink-60)" }}>
            Every claim Upstream Zero publicly stands behind, presented at its
            evidence tier — including the founding claims, which are Narrated
            and say so. A claim&apos;s displayed tier is a floor function: it
            cannot exceed what its evidence edges justify, and the build fails
            if it tries. Confidence is never promoted beyond available
            evidence.
          </p>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

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
          <a href="/graph.json">machine rendering</a> — verification should
          not depend on trusting us.
        </p>
      </main>
      <ProvenanceFooter renderedFrom={["content graph"]} />
    </>
  );
}
