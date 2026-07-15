import { z } from "zod";

/** The evidence hierarchy (HOW_WE_WORK.md), lowest to highest. */
export const TIERS = [
  "Narrated",
  "Observed",
  "Replicated",
  "Causally Supported",
  "Cross Evaluator",
  "Real World Corroborated",
] as const;
export type Tier = (typeof TIERS)[number];

/** Object types (INFORMATION_ARCHITECTURE.md §2–3). */
export const RESEARCH_TYPES = [
  "claim",
  "question",
  "hypothesis",
  "observation",
  "experiment",
  "finding",
  "evidence",
  "method",
  "instrument",
  "concept",
  "revision",
  "propagation",
  "note",
] as const;
export const COMMERCIAL_TYPES = [
  "capability",
  "engagement",
  "deliverable",
  "outcome",
] as const;
export const TYPES = [...RESEARCH_TYPES, ...COMMERCIAL_TYPES] as const;
export type ObjectType = (typeof TYPES)[number];

/** Closed edge vocabulary (IA §4.2). Extending it is a Method revision.
 *  Method revisions:
 *   - 2026-07-15: added `observes` — the discipline→invariant relation
 *     (a concept that studies an enduring structure, e.g. commercial
 *     evaluation observes requirements). See docs/CHANGELOG.md. */
export const EDGE_RELS = [
  "supports",
  "weakens",
  "refutes",
  "tests",
  "derives-from",
  "depends-on",
  "observes",
  "supersedes",
  "revises",
  "made-with",
  "part-of",
  "follows",
  "defines",
  "cites",
  "propagates",
  "corroborated-by",
  "evidenced-by",
  "exercises",
  "produces",
  "delivered-by",
  "measured-by",
  "investigated-by",
] as const;

export const edgeSchema = z.object({
  rel: z.enum(EDGE_RELS),
  to: z.string(),
});
export type Edge = z.infer<typeof edgeSchema>;

export const commercialRelevanceSchema = z.object({
  affectedBuyers: z.string(),
  affectedCategories: z.string(),
  potentialProductImpact: z.string(),
  currentConfidence: z.string(),
});

/** The common envelope (IA §4.1) plus type-specific optionals. */
export const objectSchema = z.object({
  id: z.string().min(1),
  type: z.enum(TYPES),
  title: z.string().min(1),
  created: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.string().min(1),
  authors: z.array(z.string()).default(["Upstream Zero"]),
  edges: z.array(edgeSchema).default([]),

  // Tier-bearing types only (claim, finding, observation, outcome)
  tier: z.enum(TIERS).optional(),

  // Capability only
  maturity: z.enum(["experimental", "operational"]).optional(),

  // Research objects may carry the translation block (IA §3.6)
  commercialRelevance: commercialRelevanceSchema.optional(),

  // Observation only: the epistemically loaded type (IA §2.4)
  observationType: z.enum(["behavioral", "rationale"]).optional(),

  // Question only
  whatWouldCountAsAnAnswer: z.string().optional(),

  // Hypothesis only
  predictions: z.array(z.string()).optional(),
  refutationConditions: z.array(z.string()).optional(),

  // Engagement only (IA §3.2: promises are deliverables, never outcomes)
  serves: z.string().optional(),
  requiresFromClient: z.string().optional(),
  nonPromises: z.array(z.string()).optional(),

  // Founder-decision gating: visible placeholder, never silent fill
  founderDecision: z.string().optional(),

  // Publication lifecycle (docs/EXPERIMENT_PIPELINE_V1.md). Only
  // "published" and "superseded" objects enter the public graph, pages,
  // sitemap, JSON, and counts. Existing objects default to "published".
  // Sensitive raw evidence stays outside git entirely — never committed
  // as "draft".
  pubState: z
    .enum(["draft", "approved", "published", "superseded"])
    .default("published"),

  // Experiment only: append-only run log. Later runs append; corrections
  // supersede or annotate earlier entries, never replace them.
  runLog: z
    .array(
      z.object({
        runId: z.string(),
        date: z.string(),
        environment: z.string(),
        status: z.string(),
        evidence: z.array(z.string()).default([]),
        deviations: z.array(z.string()).default([]),
        note: z.string().optional(),
        supersedes: z.string().optional(),
      }),
    )
    .optional(),
});

export type UZObject = z.infer<typeof objectSchema> & { body: string };
