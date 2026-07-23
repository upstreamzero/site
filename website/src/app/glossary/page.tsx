import Link from "next/link";
import type { Metadata } from "next";
import { byType, urlFor } from "@/lib/content";
import { PILLARS } from "@/lib/pillars";
import { pageMeta, pageLd, breadcrumbLd } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Glossary | Upstream Zero" },
  description:
    "Definitions for commercial evaluation, AI visibility, GEO, AI SEO, recommendation survivability, and the terms buyers and marketers use in AI-mediated buying.",
  ...pageMeta("/glossary"),
};

/** One alphabetical reference. Entries link to the fuller pillar page or the
 *  concept object, so the glossary is both a quick lookup and a map into the
 *  deeper material. */
type Entry = { term: string; def: string; href: string };

export default function Glossary() {
  const conceptEntries: Entry[] = byType("concept").map((c) => ({
    term: c.title,
    def: (c.body.split("\n").find((l) => l.trim().length > 0) ?? "")
      .replace(/[*_`#]/g, "")
      .slice(0, 180),
    href: urlFor(c),
  }));
  const pillarEntries: Entry[] = PILLARS.map((p) => ({
    term: p.aka ? `${p.term} (${p.aka})` : p.term,
    def: p.summary,
    href: `/learn/${p.slug}`,
  }));

  const entries = [...conceptEntries, ...pillarEntries].sort((a, b) =>
    a.term.localeCompare(b.term),
  );

  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageLd(
              "CollectionPage",
              "Glossary | Upstream Zero",
              "/glossary",
              "Definitions for commercial evaluation and AI-mediated buying.",
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbLd([
              ["Home", "/"],
              ["Glossary", "/glossary"],
            ]),
          }}
        />

        <section className="section">
          <div className="shell">
            <p className="eyebrow">Glossary</p>
            <h1 className="mt-5 max-w-[20ch]">
              The terms, defined once and consistently.
            </h1>
            <p className="lede mt-7">
              Plain definitions for the vocabulary of AI-mediated buying, each
              linking to the fuller reference.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <dl className="max-w-[80ch]">
              {entries.map((e) => (
                <div
                  key={e.term + e.href}
                  className="border-t py-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <dt className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    <Link href={e.href}>{e.term}</Link>
                  </dt>
                  <dd className="muted mt-2 max-w-[70ch]">{e.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              From definitions to your category.
            </h2>
            <Link href="/solutions" className="btn-lime">
              View the products
            </Link>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
