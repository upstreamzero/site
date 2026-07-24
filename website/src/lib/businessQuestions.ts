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
 *  The prose here is customer-facing and may describe how Upstream Zero helps
 *  (these are commercial pages, not research objects). The associated evidence
 *  is not stored here; the page derives it from the mapped components, so a
 *  research object is never cited by a commercial record and the build-enforced
 *  firewall stays intact. Like the buyer problem map, these are editorial
 *  navigation, not evidence of what buyers most frequently ask. */
export type BusinessQuestion = {
  slug: string;
  /** the question a company actually arrives with (buyer language) */
  q: string;
  /** SEO title tag */
  title: string;
  /** unique meta / OG description */
  description: string;
  /** one line naming the failure behind the question, for the entry cards */
  framing: string;
  /** research component slugs that study this question (primary first) */
  components: string[];
  /** the direct answer, stated near the top */
  answer: string;
  /** the business problem in plain language */
  problem: string;
  /** why it matters commercially */
  whyItMatters: string;
  /** what can currently be concluded from published evidence (observed) */
  concluded: string;
  /** what remains unknown */
  unknown: string;
  /** how Upstream Zero helps (commercial side of the firewall) */
  howWeHelp: string;
  /** the clear next step */
  nextStep: string;
};

export const BUSINESS_QUESTIONS: BusinessQuestion[] = [
  {
    slug: "disappeared-after-follow-up",
    q: "Why did we disappear after follow-up questions?",
    title: "Why Did We Disappear After Follow-Up Questions? | Upstream Zero",
    description:
      "You appear in the AI recommendation set, then vanish once the buyer adds a requirement. Here is why elimination happens at follow-up, what the evidence shows, and how to find your exact drop-off point.",
    framing: "You were in the set, then a requirement removed you.",
    components: ["selection-survivability", "vendor-elimination"],
    answer:
      "Because an AI evaluator builds its recommendation in stages. You can sit in the opening set for a broad category question and then be removed the moment the buyer adds a requirement your evidence does not clearly satisfy. The removal is usually specific and repeatable: one requirement, at one step, dropping the vendors that do not visibly meet it.",
    problem:
      "Most companies only see the final answer, not the sequence that produced it. So a loss looks like bad luck rather than a precise elimination at a requirement they could name and address.",
    whyItMatters:
      "If you cannot see the requirement that removed you, you cannot fix it. Budget goes to broad visibility work when the real problem is a single requirement where the evaluator is not confident you qualify.",
    concluded:
      "Across five categories we have observed the field narrowing as requirements are added, and the vendor leading the opening list is frequently the first removed at a requirement it cannot satisfy. In one category the entire named field was eliminated at a single requirement and the recommendation relocated to a higher market tier.",
    unknown:
      "We cannot yet say which property of a category predicts who survives, and most of these runs used a single evaluator, so the exact drop-off point should be measured for your category rather than assumed.",
    howWeHelp:
      "Upstream Zero runs your category through the same kind of requirement sequence a buyer would, identifies the exact requirement where you drop out, and diagnoses the evidence gap behind it. That diagnosis is measurement, not a promise about rankings.",
    nextStep:
      "Find your drop-off point with a Commercial Evaluation Audit.",
  },
  {
    slug: "another-vendor-won",
    q: "Why did another vendor become the recommendation?",
    title: "Why Did Another Vendor Become the Recommendation? | Upstream Zero",
    description:
      "The lead changed, or a competitor replaced you in the AI recommendation. Here is what the evidence shows about how the frontrunner moves and how to see where you lost the top position.",
    framing: "The lead changed, or a competitor took your place.",
    components: ["frontrunner-movement", "competitor-displacement"],
    answer:
      "Because the leading position is not fixed. As a buyer adds requirements, the vendor at the front can be demoted or replaced by one that more clearly satisfies the next requirement. The change often targets the leading position itself rather than any single vendor, so whoever leads is exposed at the first requirement they cannot meet.",
    problem:
      "A competitor becoming the recommendation reads as a branding or awareness loss. More often it is a specific handoff: a requirement appeared that the other vendor visibly satisfied and you did not.",
    whyItMatters:
      "Knowing which requirement moved the lead tells you exactly where a competitor is out-evidencing you, instead of guessing that they simply have more visibility.",
    concluded:
      "We have observed the opening leader losing its lead at the first requirement it structurally could not satisfy, sometimes demoted and sometimes eliminated. In one category the leader varied between runs, yet whichever vendor led was removed at the same step, which suggests the position is what is exposed.",
    unknown:
      "Whether the same position-based movement holds across different evaluators is not yet confirmed, so the specific handoff should be measured on the evaluators your buyers use.",
    howWeHelp:
      "Upstream Zero identifies the requirement where the lead changes hands and which evidence the surviving competitor appears to satisfy that you do not. You receive the diagnosis and a prioritized set of decisions, never a promise about placement.",
    nextStep:
      "See where the lead changes with a Commercial Evaluation Audit.",
  },
  {
    slug: "evidence-missing",
    q: "What evidence are we missing?",
    title: "What Evidence Are We Missing for AI Evaluation? | Upstream Zero",
    description:
      "AI evaluators lean on specific proof when they decide whether a vendor meets a requirement. Here is how to tell which evidence you are missing and where the gap is costing you.",
    framing: "What proof an evaluator relies on that you have not shown.",
    components: ["validation-and-evidence", "requirement-interpretation"],
    answer:
      "The evidence that an evaluator needs to confidently associate you with a requirement, and cannot currently find. That is rarely everything at once. It is usually a specific proof for a specific requirement: the thing the evaluator looks for to validate a claim, that your public footprint does not clearly demonstrate.",
    problem:
      "Companies produce a lot of content and still lose, because volume is not the same as the specific proof an evaluator needs for the requirement that is eliminating them.",
    whyItMatters:
      "The missing evidence is the difference between claiming a capability and being credited with it. Filling the right gap is far cheaper than a broad content program that does not address the requirement in question.",
    concluded:
      "We have observed that what an evaluator appears to rely on when validating a vendor is specific to the requirement being tested, and that its stated reasoning is a description of its narration rather than proof of mechanism. So evidence gaps are diagnosed per requirement, and held at their honest confidence level.",
    unknown:
      "How much of an evaluator's stated reasoning reflects the actual mechanism is not established, which is why any evidence recommendation is a candidate tied to an observed gap, not a guaranteed lever.",
    howWeHelp:
      "Upstream Zero maps the requirement that eliminates you to the evidence an evaluator appears to need, compares it against what you already publish, and identifies the most likely gap. Which evidence to create, and where, is a recommendation grounded in the observed failure, not a generic checklist.",
    nextStep:
      "Get your evidence gap diagnosed. See Solutions.",
  },
  {
    slug: "what-must-become-true",
    q: "What must become true to survive evaluation?",
    title:
      "What Must Become True to Survive AI Evaluation? | Upstream Zero",
    description:
      "Surviving AI-mediated evaluation means satisfying the requirements a buyer adds. Here is how to determine what must become true for your company, and the evidence behind it.",
    framing:
      "The requirements you have to satisfy, and the evidence behind them.",
    components: [
      "selection-survivability",
      "requirement-interpretation",
      "validation-and-evidence",
    ],
    answer:
      "The specific things an evaluator must confidently associate with your company for you to remain in the set as requirements are added. That is a short, concrete list per category: the requirements you have to satisfy, and the evidence that makes each one credible. It is the core question Upstream Zero is built to answer.",
    problem:
      "\"Improve our AI presence\" is not actionable. What is actionable is the exact set of requirements a buyer introduces and, for each, whether the evaluator currently credits you.",
    whyItMatters:
      "This turns an abstract fear about AI into a defined, prioritized list of what to make true first, which is where the leverage is.",
    concluded:
      "We have observed that survival is decided requirement by requirement, that the field can survive, collapse, or relocate depending on the category, and that the leader is exposed at the first requirement it cannot meet. So what must become true is specific and testable, not a universal formula.",
    unknown:
      "What drives a category to behave one way rather than another is not yet established, so the requirement set that matters should be measured for your category rather than transferred from another.",
    howWeHelp:
      "Upstream Zero identifies the requirements that decide your category, tells you which ones the evaluator currently credits you for, and defines what must become true for the rest, with the evidence each would need. The intervention is recommended, and its effect is something we then measure.",
    nextStep:
      "Define what must become true. Start with Selection Intelligence.",
  },
  {
    slug: "measure-position-improved",
    q: "How do we measure whether our position improved?",
    title:
      "How Do We Measure Whether Our AI Recommendation Improved? | Upstream Zero",
    description:
      "After you change something, did your position in AI recommendations actually move? Here is how recommendation movement is measured against a baseline rather than assumed.",
    framing: "Whether your position actually moves after a change.",
    components: ["recommendation-stability", "selection-survivability"],
    answer:
      "By re-running the same requirement sequence and comparing against a baseline. Improvement is a measured change in recommendation behavior, not an assumption that an action worked. Because outcomes vary run to run, movement only counts when it shows against the noise of repeated sampling.",
    problem:
      "Most changes are made on faith. Without a baseline and a repeatable measurement, you cannot tell whether an intervention moved your position or the result simply varied.",
    whyItMatters:
      "Measured movement is what separates an intervention that worked from one that felt productive. It is also what lets you stop spending on things that do not move the outcome.",
    concluded:
      "We have observed that recommendation outcomes vary across repeated runs, which is exactly why measurement has to be against a baseline and across multiple draws. Movement reported against a baseline is a real result; a single run is not.",
    unknown:
      "How much variation is normal for a given category, and whether an observed movement is caused by a specific change, requires a controlled before-and-after design rather than a single comparison.",
    howWeHelp:
      "Upstream Zero establishes a baseline, re-runs the sequence after a change, and reports movement in recommendation-set frequency, frontrunner frequency, and survivability against that baseline. The number is a measured outcome, reported with its limits.",
    nextStep:
      "Measure movement over time with Selection Intelligence.",
  },
  {
    slug: "how-ai-evaluates-vendors",
    q: "How do AI systems evaluate and recommend vendors?",
    title:
      "How Do AI Systems Evaluate and Recommend Vendors? | Upstream Zero",
    description:
      "AI systems build a vendor recommendation in stages: form an opening set, apply requirements, eliminate vendors, and settle on a shortlist. Here is what the published evidence shows about each stage.",
    framing: "The full pipeline, from opening set to final recommendation.",
    components: [
      "recommendation-set-formation",
      "vendor-elimination",
      "frontrunner-movement",
      "selection-survivability",
    ],
    answer:
      "In stages. An evaluator first forms an opening set for a broad category question, then narrows it as the buyer adds requirements: eliminating vendors that do not visibly satisfy each new requirement, moving the leader when a requirement exposes it, and settling on the vendors that survive the full sequence. The final recommendation reflects the accumulated requirements, not the opening question.",
    problem:
      "Treated as a black box, AI recommendation looks arbitrary. Seen as a staged process, it becomes something you can locate yourself within: where you enter, where you are removed, and where you survive.",
    whyItMatters:
      "Understanding the stages is what makes the other questions answerable. Each stage is a place where a company can be won or lost, and each is studied as its own research component.",
    concluded:
      "We have observed this staged narrowing across several categories: an opening set that is not the final answer, elimination at specific requirements, the leader exposed at the first requirement it cannot meet, and fields that survive, collapse, or relocate depending on the category. Every observation is held at its evidence level and most rest on a single evaluator.",
    unknown:
      "How closely this resembles human buying-committee evaluation, and how much of it generalizes across evaluators and over time, are open questions the research program is built to keep testing.",
    howWeHelp:
      "Upstream Zero studies each stage as a research component and turns that into a per-company diagnosis: where you enter, where you are eliminated, and what must become true to survive. The research is public; the diagnosis is the product.",
    nextStep:
      "See the research components, or how the work is done in the methodology.",
  },
];

export function businessQuestionBySlug(slug: string): BusinessQuestion | undefined {
  return BUSINESS_QUESTIONS.find((b) => b.slug === slug);
}
