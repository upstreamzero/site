/** The customer-facing entry layer above the research components.
 *
 *  Research components (concepts) are the canonical internal ontology. A
 *  buyer does not arrive asking about "frontrunner movement"; they arrive
 *  asking "why did another vendor win?". Each business question is a
 *  commercial entry point that maps down to one or more research components,
 *  and from there to the evidence:
 *
 *    Business question -> Research component -> Evidence -> Recommendations
 *    -> Measurement
 *
 *  This is a navigation mapping, not a content object, so it references the
 *  research components by slug without a research object ever citing a
 *  commercial one (the build-enforced firewall stays intact). Like the buyer
 *  problem map, these are editorial navigation, not evidence of what buyers
 *  most frequently ask. */
export type BusinessQuestion = {
  slug: string;
  /** the question a company actually arrives with */
  q: string;
  /** one line naming the failure behind the question */
  framing: string;
  /** research component slugs that study this question */
  components: string[];
};

export const BUSINESS_QUESTIONS: BusinessQuestion[] = [
  {
    slug: "disappeared-after-follow-up",
    q: "Why did we disappear after follow-up questions?",
    framing: "You were in the set, then a requirement removed you.",
    components: ["selection-survivability", "vendor-elimination"],
  },
  {
    slug: "never-in-the-set",
    q: "Why weren't we in the recommendation set at all?",
    framing: "The opening set formed without you.",
    components: ["recommendation-set-formation", "vendor-elimination"],
  },
  {
    slug: "another-vendor-won",
    q: "Why did another vendor become the recommendation?",
    framing: "The lead changed, or a competitor took your place.",
    components: ["frontrunner-movement", "competitor-displacement"],
  },
  {
    slug: "evidence-missing",
    q: "What evidence are we missing?",
    framing: "What proof an evaluator relies on that you have not shown.",
    components: ["validation-and-evidence", "requirement-interpretation"],
  },
  {
    slug: "what-must-become-true",
    q: "What must become true for us to survive evaluation?",
    framing: "The requirements you have to satisfy, and the evidence behind them.",
    components: [
      "selection-survivability",
      "requirement-interpretation",
      "validation-and-evidence",
    ],
  },
  {
    slug: "measure-improvement",
    q: "How do we measure improvement?",
    framing: "Whether your position actually moves after a change.",
    components: ["recommendation-stability", "selection-survivability"],
  },
];
