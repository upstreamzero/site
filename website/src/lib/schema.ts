import { z } from "zod";

/** The evidence hierarchy, lowest to highest. */
export const TIERS = [
  "Narrated",
  "Observed",
  "Replicated",
  "Causally Supported",
  "Cross Evaluator",
  "Real World Corroborated",
] as const;
export type Tier = (typeof TIERS)[number];

/** Object types. */
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

/** Closed edge vocabulary — this list is the authoritative source, and
 *  extending it is a Method revision (see docs/CHANGELOG.md).
 *  Method revisions:
 *   - 2026-07-15: added `observes` — the discipline→invariant relation
 *     (a concept that studies an enduring structure, e.g. commercial
 *     evaluation observes requirements). */
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

/** The common envelope plus type-specific optionals. */
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

  // Research objects may carry the translation block
  commercialRelevance: commercialRelevanceSchema.optional(),

  // Observation only: the epistemically loaded type
  observationType: z.enum(["behavioral", "rationale"]).optional(),

  // Question only
  whatWouldCountAsAnAnswer: z.string().optional(),

  // Hypothesis only
  predictions: z.array(z.string()).optional(),
  refutationConditions: z.array(z.string()).optional(),

  // Engagement only: promises are deliverables, never outcomes
  serves: z.string().optional(),
  requiresFromClient: z.string().optional(),
  nonPromises: z.array(z.string()).optional(),

  // Experiment only: closeout outcome, deliberately separate from the
  // lifecycle `status`. Status answers where the experiment is (Proposed /
  // Running / Closed / Archived); outcome answers what happened. Present
  // only once an experiment is closed; a proposed experiment has none.
  // Outcome is not an evidence tier — a Supported experiment can still rest
  // on narrated evidence, and an Inconclusive one can hold real observations.
  outcome: z
    .enum([
      "Supported",
      "Not Supported",
      "Inconclusive",
      "Methods Revision Required",
      "Baseline Complete",
      "Null Result",
    ])
    .optional(),

  // Founder-decision gating: visible placeholder, never silent fill
  founderDecision: z.string().optional(),

  // Publication lifecycle. Only "published" and "superseded" objects
  // enter the public graph, pages, sitemap, JSON, and counts. Existing
  // objects default to "published". Sensitive raw evidence stays outside
  // git entirely — never committed as "draft".
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
