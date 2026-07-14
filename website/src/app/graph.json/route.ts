export const dynamic = "force-static";
import { loadGraph, urlFor } from "@/lib/content";
import { TIERS, EDGE_RELS, TYPES } from "@/lib/schema";

/** The full typed graph in one export (IA §4.4). */
export async function GET() {
  const objects = [...loadGraph().values()].map((o) => {
    const { body, ...envelope } = o;
    void body;
    return { ...envelope, url: urlFor(o), machineUrl: `/objects/${o.id}` };
  });
  return Response.json({
    site: "Upstream Zero — Commercial Evaluation Observatory",
    version: "0.1",
    firstLight: "2026-07-13",
    vocabulary: { types: TYPES, tiers: TIERS, edgeRels: EDGE_RELS },
    counts: Object.fromEntries(
      TYPES.map((t) => [t, objects.filter((o) => o.type === t).length]),
    ),
    objects,
  });
}
