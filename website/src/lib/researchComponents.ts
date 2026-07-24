/** The enduring components of AI-mediated commercial evaluation that Upstream
 *  Zero studies. Ordered along the evaluation pipeline, from how a requirement
 *  is read to how a competitor is displaced. Each is a `concept` object; this
 *  list is the curated organizing spine for the evidence archive, so a new
 *  concept does not silently become a top-level component. */
export const RESEARCH_COMPONENTS = [
  "requirement-interpretation",
  "recommendation-set-formation",
  "vendor-elimination",
  "frontrunner-movement",
  "selection-survivability",
  "recommendation-stability",
  "competitor-displacement",
  "validation-and-evidence",
] as const;

/** Maps a component's declared state to the dot-colour modifier class. The
 *  state is carried on the concept's `status`, so the definition stays the
 *  single source of truth. */
export function componentStateClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("available")) return "ev-available";
  if (s.includes("active")) return "ev-active";
  if (s.includes("hypothesis")) return "ev-defined";
  return "ev-none";
}
