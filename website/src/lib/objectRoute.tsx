import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { byId, byType, urlFor } from "./content";
import type { ObjectType } from "./schema";
import { ObjectPage } from "@/components/ObjectPage";
import { EmptyState } from "@/components/EmptyState";
import { objectDescription, pageMeta } from "./meta";

/** Static export cannot build a dynamic route with zero params (empty
 *  generateStaticParams is an ISR-only pattern). When a register has no
 *  published objects yet, we emit one unlinked, noindexed sentinel page
 *  that renders the honest N=0 register — so the route exists, the build
 *  passes, and first publication Just Works with no 404s. */
const EMPTY_SENTINEL = "none-published-yet";

/** One factory for all flat-by-type object routes. */
export function makeObjectRoute(type: ObjectType) {
  async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id: rawId } = await params;
    const id = decodeURIComponent(rawId);
    if (id === EMPTY_SENTINEL) {
      if (byType(type).length > 0) notFound();
      return (
        <main id="main" className="shell section-tight">
          <div className="mt-2">
            <h1 className="text-[1.75rem]">
              No published {type} objects yet
            </h1>
          </div>
          <EmptyState>
            This register exists and is wired into the graph, the machine
            layer, and the sitemap. It is simply empty. Objects appear here
            only after founder-approved publication.
          </EmptyState>
        </main>
      );
    }
    const obj = byId(id);
    if (!obj || obj.type !== type) notFound();
    return <ObjectPage obj={obj} />;
  }
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ id: string }>;
  }): Promise<Metadata> {
    const { id: rawId } = await params;
    const id = decodeURIComponent(rawId);
    if (id === EMPTY_SENTINEL)
      return {
        title: `No published ${type} objects yet`,
        robots: { index: false, follow: false },
      };
    const obj = byId(id);
    if (!obj) return {};
    return {
      title: obj.title,
      description: objectDescription(obj),
      ...pageMeta(urlFor(obj)),
    };
  }
  function generateStaticParams() {
    const items = byType(type).map((o) => ({ id: o.id }));
    return items.length ? items : [{ id: EMPTY_SENTINEL }];
  }
  return { Page, generateStaticParams, generateMetadata };
}
