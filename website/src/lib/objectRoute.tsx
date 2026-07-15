import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { byId, byType, urlFor } from "./content";
import type { ObjectType } from "./schema";
import { ObjectPage } from "@/components/ObjectPage";
import { pageMeta } from "./meta";

/** One factory for all flat-by-type object routes (FRICTION_LOG FR-5). */
export function makeObjectRoute(type: ObjectType) {
  async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const obj = byId(decodeURIComponent(id));
    if (!obj || obj.type !== type) notFound();
    return <ObjectPage obj={obj} />;
  }
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ id: string }>;
  }): Promise<Metadata> {
    const { id } = await params;
    const obj = byId(decodeURIComponent(id));
    if (!obj) return {};
    return { title: obj.title, ...pageMeta(urlFor(obj)) };
  }
  function generateStaticParams() {
    return byType(type).map((o) => ({ id: o.id }));
  }
  return { Page, generateStaticParams, generateMetadata };
}
