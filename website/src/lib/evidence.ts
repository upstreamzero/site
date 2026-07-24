import type { UZObject } from "./schema";

/** The evidence-level a reader (or a retrieval system) can read without
 *  opening the record. It normalizes an object's type, status, and tier into
 *  the vocabulary the archive advertises: Hypothesis, Active Experiment,
 *  Experiment, Observation, Finding, Replicated Finding, Archived. The `kind`
 *  drives the visual distinction between evidence types; it never changes the
 *  underlying object, only how it is labelled on a listing. */
export type EvidenceKind =
  | "hypothesis"
  | "experiment"
  | "observation"
  | "finding"
  | "question"
  | "claim"
  | "method";

const REPLICATED_TIERS = new Set([
  "Replicated",
  "Causally Supported",
  "Cross Evaluator",
  "Real World Corroborated",
]);

export function evidenceLevel(obj: UZObject): {
  label: string;
  kind: EvidenceKind;
} {
  const status = (obj.status ?? "").toLowerCase();

  switch (obj.type) {
    case "hypothesis":
      return { label: "Hypothesis", kind: "hypothesis" };
    case "experiment": {
      if (status.includes("archiv"))
        return { label: "Archived", kind: "experiment" };
      // "Closed" is a finished run; anything else (Proposed, Running) is live.
      const finished = status === "closed";
      return {
        label: finished ? "Experiment" : "Active Experiment",
        kind: "experiment",
      };
    }
    case "observation":
      return { label: "Observation", kind: "observation" };
    case "finding": {
      const replicated = obj.tier ? REPLICATED_TIERS.has(obj.tier) : false;
      return {
        label: replicated ? "Replicated Finding" : "Finding",
        kind: "finding",
      };
    }
    case "question":
      return { label: "Open question", kind: "question" };
    case "claim":
      return { label: "Claim", kind: "claim" };
    case "method":
      return { label: "Method", kind: "method" };
    default:
      return { label: obj.type, kind: "observation" };
  }
}
