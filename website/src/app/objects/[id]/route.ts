export const dynamic = "force-static";
import { byId, byType, backEdges, urlFor } from "@/lib/content";
import { TYPES } from "@/lib/schema";

/** Machine rendering of any object: the full envelope, traversable by
 *  following URLs. Lives at /objects/{id} rather than {url}.json. */
export async function generateStaticParams() {
  return TYPES.flatMap((t) => byType(t).map((o) => ({ id: o.id })));
}

export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const obj = byId(decodeURIComponent(id));
  if (!obj) return new Response("not found", { status: 404 });
  const { body, ...envelope } = obj;
  return Response.json({
    ...envelope,
    body,
    url: urlFor(obj),
    machineUrl: `/objects/${obj.id}`,
    referencedBy: backEdges(obj.id).map((r) => ({
      from: r.from.id,
      rel: r.rel,
    })),
    _meta: {
      site: "Upstream Zero · Commercial Evaluation Research",
      version: "0.1",
      note: "Claims are presented at their evidence tier; Narrated is the lowest. Verify by walking edges, not by trusting us.",
    },
  });
}
