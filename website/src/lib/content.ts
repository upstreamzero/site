import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  objectSchema,
  type UZObject,
  type ObjectType,
  RESEARCH_TYPES,
  COMMERCIAL_TYPES,
  TIERS,
} from "./schema";

/**
 * Content lives OUTSIDE the app root, at <repo>/content — the website is
 * one rendering of the company's knowledge, not its container. (This
 * choice has a dev-reload cost.)
 */
const CONTENT_DIR = [
  path.resolve(process.cwd(), "..", "content"),
  path.resolve(process.cwd(), "content"),
].find((p) => fs.existsSync(p)) ?? path.resolve(process.cwd(), "..", "content");

const TYPE_DIRS: Record<string, ObjectType> = {
  claims: "claim",
  questions: "question",
  hypotheses: "hypothesis",
  observations: "observation",
  experiments: "experiment",
  findings: "finding",
  evidence: "evidence",
  methods: "method",
  instruments: "instrument",
  concepts: "concept",
  revisions: "revision",
  propagation: "propagation",
  notes: "note",
  capabilities: "capability",
  engagements: "engagement",
  deliverables: "deliverable",
  outcomes: "outcome",
};

export const TYPE_TO_DIR: Record<ObjectType, string> = Object.fromEntries(
  Object.entries(TYPE_DIRS).map(([dir, t]) => [t, dir]),
) as Record<ObjectType, string>;

const COMMERCIAL = new Set<string>(COMMERCIAL_TYPES);
const RESEARCH = new Set<string>(RESEARCH_TYPES);

let cache: Map<string, UZObject> | null = null;

/** Load, validate, and cross-check the whole graph. Throws on violation:
 *  the operating system as a compiler error. */
export function loadGraph(): Map<string, UZObject> {
  if (cache) return cache;
  const objects = new Map<string, UZObject>();

  for (const dir of Object.keys(TYPE_DIRS)) {
    const abs = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(abs, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = objectSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `[ontology] ${dir}/${file}: invalid envelope — ${parsed.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ")}`,
        );
      }
      const obj = { ...parsed.data, body: content.trim() } as UZObject;
      const expectedType = TYPE_DIRS[dir];
      if (obj.type !== expectedType)
        throw new Error(
          `[ontology] ${dir}/${file}: type "${obj.type}" filed under "${dir}"`,
        );
      const basename = file.replace(/\.(mdx|md)$/, "");
      if (obj.id !== basename)
        throw new Error(
          `[ontology] ${dir}/${file}: id "${obj.id}" ≠ filename "${basename}"`,
        );
      if (objects.has(obj.id))
        throw new Error(`[ontology] duplicate id ${obj.id}`);
      objects.set(obj.id, obj);
    }
  }

  // ── Graph rules — build fails on violation ──
  for (const obj of objects.values()) {
    for (const edge of obj.edges) {
      const target = objects.get(edge.to);
      if (!target)
        throw new Error(
          `[ontology] ${obj.id}: dangling edge ${edge.rel} → ${edge.to}`,
        );
      // Firewall: research objects never cite commercial objects.
      if (RESEARCH.has(obj.type) && COMMERCIAL.has(target.type))
        throw new Error(
          `[firewall] research object ${obj.id} cites commercial object ${edge.to}`,
        );
    }

    // Tier floor: a claim with no supporting evidence is Narrated. Full
    // stop. (Untested by real evidence at N=0.)
    if (obj.type === "claim") {
      const hasSupport = obj.edges.some((e) => e.rel === "supports");
      const supported = [...objects.values()].some((o) =>
        o.edges.some((e) => e.rel === "supports" && e.to === obj.id),
      );
      if (!hasSupport && !supported && obj.tier !== "Narrated")
        throw new Error(
          `[tier-floor] ${obj.id} displays "${obj.tier}" with no evidence edges`,
        );
    }

    // A capability without research derivation cannot be operational.
    if (obj.type === "capability" && obj.maturity === "operational") {
      const derived = obj.edges.some((e) => e.rel === "derives-from");
      if (!derived)
        throw new Error(
          `[maturity] ${obj.id} is "operational" without derives-from edges`,
        );
    }

    if (obj.tier && !TIERS.includes(obj.tier))
      throw new Error(`[tier] ${obj.id}: unknown tier ${obj.tier}`);
  }

  // Publication-state consistency (second pass): a public object may
  // never edge to a non-public one — publishing must not create dangling
  // public links or leak the existence of unreviewed material.
  for (const obj of objects.values()) {
    if (!isPublic(obj)) continue;
    for (const edge of obj.edges) {
      const target = objects.get(edge.to);
      if (target && !isPublic(target))
        throw new Error(
          `[pub-state] public object ${obj.id} edges to non-public ${edge.to} (pubState: ${target.pubState})`,
        );
    }
  }

  cache = objects;
  return objects;
}

/** Public-graph membership: published and superseded objects only.
 *  Draft and approved-but-unpublished objects never reach pages, the
 *  sitemap, graph.json, llms.txt, object JSON, or counts. */
export function isPublic(o: UZObject): boolean {
  return o.pubState === "published" || o.pubState === "superseded";
}

/** The public graph — the only view rendering surfaces may use. */
export function publicObjects(): UZObject[] {
  return [...loadGraph().values()].filter(isPublic);
}

export function byType(type: ObjectType): UZObject[] {
  return publicObjects()
    .filter((o) => o.type === type)
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Lookup by id. Public objects only unless includeNonPublic is set
 *  (validation/internal use). */
export function byId(
  id: string,
  opts?: { includeNonPublic?: boolean },
): UZObject | undefined {
  const o = loadGraph().get(id);
  if (!o) return undefined;
  if (!opts?.includeNonPublic && !isPublic(o)) return undefined;
  return o;
}

/** Back-edges: who points at this object.
 *  Public referencing objects only — rendering surface. */
export function backEdges(id: string): { from: UZObject; rel: string }[] {
  const out: { from: UZObject; rel: string }[] = [];
  for (const o of publicObjects())
    for (const e of o.edges) if (e.to === id) out.push({ from: o, rel: e.rel });
  return out;
}

/** The honest inventory for the Observatory status board (public only). */
export function inventory() {
  const g = publicObjects();
  const count = (t: ObjectType) => g.filter((o) => o.type === t).length;
  const claims = g.filter((o) => o.type === "claim");
  return {
    observations: count("observation"),
    experiments: count("experiment"),
    findings: count("finding"),
    questions: count("question"),
    hypotheses: count("hypothesis"),
    claims: claims.length,
    claimsAboveNarrated: claims.filter((c) => c.tier !== "Narrated").length,
    revisions: count("revision"),
    propagation: count("propagation"),
    outcomes: count("outcome"),
  };
}

/** Object URL — machine rendering lives at /objects/{id}. */
export function urlFor(obj: UZObject): string {
  return `/${TYPE_TO_DIR[obj.type]}/${obj.id}`;
}
