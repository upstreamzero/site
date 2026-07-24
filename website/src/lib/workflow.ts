/** The Upstream Zero commercial workflow: observe recommendation behavior,
 *  diagnose where a company is eliminated, define what must become true, and
 *  measure whether the intervention moves the outcome. Rendered on the
 *  homepage (plain language) and Solutions (named stages) so the two never
 *  drift. Deliberately hedged: interventions are recommended and their effect
 *  is measured, never guaranteed. */
export type WorkflowStep = {
  n: string;
  name: string;
  plain: string;
};

export const WORKFLOW: WorkflowStep[] = [
  {
    n: "01",
    name: "Recommendation Audit",
    plain:
      "Observe how you enter, move through, and exit AI recommendation sets.",
  },
  {
    n: "02",
    name: "Evaluation Diagnosis",
    plain:
      "Identify the requirements, trust gaps, and validation failures affecting selection.",
  },
  {
    n: "03",
    name: "Evidence Strategy",
    plain:
      "Define what must become true, and the evidence required to support it.",
  },
  {
    n: "04",
    name: "Evidence Placement",
    plain:
      "Recommend where that evidence should live, across owned, technical, partner, community, and third-party environments.",
  },
  {
    n: "05",
    name: "Action Plan",
    plain:
      "Prioritize the interventions most likely to change recommendation outcomes.",
  },
  {
    n: "06",
    name: "Measurement",
    plain:
      "Measure whether recommendation position, survivability, and selection frequency change after implementation.",
  },
];
