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
      "You appear on the list AI recommends, then vanish once the buyer adds a requirement. Here is why you get cut at follow-up, what the evidence shows, and how to find your exact drop-off point.",
    framing: "You were on the list, then a requirement removed you.",
    components: ["recommendation-survivability", "vendor-elimination"],
    answer:
      "Because an AI system builds its recommendation in stages. You can sit on the opening list for a broad category question and then be removed the moment the buyer adds a requirement your evidence does not clearly meet. The removal is usually specific and repeatable: one requirement, at one step, dropping the companies that do not visibly meet it.",
    problem:
      "Most companies only see the final answer, not the sequence that produced it. So a loss looks like bad luck rather than a precise cut at a requirement they could name and fix.",
    whyItMatters:
      "If you cannot see the requirement that removed you, you cannot fix it. Budget goes to broad visibility work when the real problem is a single requirement where the AI is not confident you qualify.",
    concluded:
      "Across five categories we have watched the field narrow as requirements are added, and the company leading the opening list is frequently the first removed at a requirement it cannot meet. In one category the entire named field was cut at a single requirement and the recommendation moved up to a higher market tier.",
    unknown:
      "We cannot yet say what about a category predicts who survives, and most of these runs used a single AI system, so the exact drop-off point should be measured for your category rather than assumed.",
    howWeHelp:
      "Upstream Zero runs your category through the same kind of requirement sequence a buyer would, finds the exact requirement where you drop out, and diagnoses the missing proof behind it. That diagnosis is measurement, not a promise about rankings.",
    nextStep:
      "Find your drop-off point with an Evaluation Audit.",
  },
  {
    slug: "another-vendor-won",
    q: "Why did another vendor become the recommendation?",
    title: "Why Did Another Vendor Become the Recommendation? | Upstream Zero",
    description:
      "The lead changed, or a competitor replaced you in the AI recommendation. Here is what the evidence shows about how the lead moves and how to see where you lost the top spot.",
    framing: "The lead changed, or a competitor took your place.",
    components: ["frontrunner-movement", "competitor-displacement"],
    answer:
      "Because the leading position is not fixed. As a buyer adds requirements, the company at the front can be pushed down or replaced by one that more clearly meets the next requirement. The change often targets the leading position itself rather than any single company, so whoever leads is exposed at the first requirement they cannot meet.",
    problem:
      "A competitor becoming the recommendation reads as a branding or awareness loss. More often it is a specific handoff: a requirement appeared that the other company visibly met and you did not.",
    whyItMatters:
      "Knowing which requirement moved the lead tells you exactly where a competitor is out-proving you, instead of guessing that they simply have more visibility.",
    concluded:
      "We have watched the opening leader lose its lead at the first requirement it simply could not meet, sometimes pushed down and sometimes cut. In one category the leader varied between runs, yet whichever company led was removed at the same step, which suggests the position is what is exposed.",
    unknown:
      "Whether the same position-based movement holds across different AI systems is not yet confirmed, so the specific handoff should be measured on the AI systems your buyers use.",
    howWeHelp:
      "Upstream Zero finds the requirement where the lead changes hands and which proof the surviving competitor appears to have that you do not. You receive the diagnosis and a prioritized set of decisions, never a promise about placement.",
    nextStep:
      "See where the lead changes with an Evaluation Audit.",
  },
  {
    slug: "evidence-missing",
    q: "What evidence are we missing?",
    title: "What Evidence Are We Missing for AI Evaluation? | Upstream Zero",
    description:
      "AI systems lean on specific proof when they decide whether a company meets a requirement. Here is how to tell which proof you are missing and where the gap is costing you.",
    framing: "What proof an AI system relies on that you have not shown.",
    components: ["validation-and-evidence", "requirement-interpretation"],
    answer:
      "The proof an AI system needs to confidently connect you with a requirement, and cannot currently find. That is rarely everything at once. It is usually a specific proof for a specific requirement: the thing the AI looks for to back up a claim, that your public footprint does not clearly show.",
    problem:
      "Companies produce a lot of content and still lose, because volume is not the same as the specific proof an AI needs for the requirement that is cutting them.",
    whyItMatters:
      "The missing proof is the difference between claiming a capability and being credited with it. Filling the right gap is far cheaper than a broad content program that does not address the requirement in question.",
    concluded:
      "We have observed that what an AI appears to rely on when checking a company is specific to the requirement being tested, and that its stated reasoning describes how it narrates the answer rather than proving how it actually works inside. So proof gaps are diagnosed one requirement at a time, and held at their honest confidence level.",
    unknown:
      "How much of an AI's stated reasoning reflects what it actually did inside is not established, which is why any recommendation about proof is a candidate tied to an observed gap, not a guaranteed lever.",
    howWeHelp:
      "Upstream Zero maps the requirement that cuts you to the proof an AI appears to need, compares it against what you already publish, and identifies the most likely gap. Which proof to create, and where, is a recommendation grounded in the observed failure, not a generic checklist.",
    nextStep:
      "Get your missing proof diagnosed. See Solutions.",
  },
  {
    slug: "what-must-become-true",
    q: "What must become true to survive evaluation?",
    title:
      "What Must Become True to Survive AI Evaluation? | Upstream Zero",
    description:
      "Surviving AI evaluation means meeting the requirements a buyer adds. Here is how to work out what must become true for your company, and the evidence behind it.",
    framing:
      "The requirements you have to meet, and the proof behind them.",
    components: [
      "recommendation-survivability",
      "requirement-interpretation",
      "validation-and-evidence",
    ],
    answer:
      "The specific things an AI must confidently connect with your company for you to stay on the list as requirements are added. That is a short, concrete list per category: the requirements you have to meet, and the proof that makes each one credible. It is the core question Upstream Zero is built to answer.",
    problem:
      "\"Improve our AI presence\" is not something you can act on. What you can act on is the exact set of requirements a buyer introduces and, for each, whether the AI currently credits you.",
    whyItMatters:
      "This turns an abstract fear about AI into a defined, prioritized list of what to make true first, which is where the leverage is.",
    concluded:
      "We have observed that survival is decided one requirement at a time, that the field can survive, collapse, or move to a different tier depending on the category, and that the leader is exposed at the first requirement it cannot meet. So what must become true is specific and testable, not a universal formula.",
    unknown:
      "What drives a category to behave one way rather than another is not yet established, so the requirements that matter should be measured for your category rather than borrowed from another.",
    howWeHelp:
      "Upstream Zero finds the requirements that decide your category, tells you which ones the AI currently credits you for, and defines what must become true for the rest, with the proof each would need. The fix is recommended, and its effect is something we then measure.",
    nextStep:
      "Define what must become true. Start with Selection Tracking.",
  },
  {
    slug: "measure-position-improved",
    q: "How do we measure whether our position improved?",
    title:
      "How Do We Measure Whether Our AI Recommendation Improved? | Upstream Zero",
    description:
      "After you change something, did your position in AI recommendations actually move? Here is how recommendation movement is measured against a baseline rather than assumed.",
    framing: "Whether your position actually moves after a change.",
    components: ["recommendation-stability", "recommendation-survivability"],
    answer:
      "By running the same requirement sequence again and comparing against a starting point. Improvement is a measured change in how AI recommends you, not an assumption that an action worked. Because results vary run to run, movement only counts when it stands out against that normal variation.",
    problem:
      "Most changes are made on faith. Without a starting point and a repeatable measurement, you cannot tell whether a change moved your position or the result simply varied on its own.",
    whyItMatters:
      "Measured movement is what separates a change that worked from one that only felt productive. It is also what lets you stop spending on things that do not move the outcome.",
    concluded:
      "We have observed that AI recommendations vary across repeated runs, which is exactly why measurement has to be against a starting point and across many runs. Movement reported against a starting point is a real result; a single run is not.",
    unknown:
      "How much variation is normal for a given category, and whether an observed movement was actually caused by a specific change, needs a controlled before-and-after test rather than a single comparison.",
    howWeHelp:
      "Upstream Zero sets a starting point, runs the sequence again after a change, and reports the movement against it: how often you make the shortlist, how often you lead it, and how often you survive to the end. The number is a measured outcome, reported with its limits.",
    nextStep:
      "Measure movement over time with Selection Tracking.",
  },
  {
    slug: "how-ai-evaluates-vendors",
    q: "How do AI systems evaluate and recommend vendors?",
    title:
      "How Do AI Systems Evaluate and Recommend Vendors? | Upstream Zero",
    description:
      "AI systems build a recommendation in stages: form an opening list, apply requirements, cut companies, and settle on a shortlist. Here is what the published evidence shows about each stage.",
    framing: "The full process, from opening list to final recommendation.",
    components: [
      "recommendation-set-formation",
      "vendor-elimination",
      "frontrunner-movement",
      "recommendation-survivability",
    ],
    answer:
      "In stages. An AI first forms an opening list for a broad category question, then narrows it as the buyer adds requirements: cutting companies that do not visibly meet each new requirement, moving the leader when a requirement exposes it, and settling on the companies that survive the full sequence. The final recommendation reflects all the requirements added along the way, not the opening question.",
    problem:
      "Treated as a black box, AI recommendation looks random. Seen as a staged process, it becomes something you can place yourself inside: where you enter, where you are removed, and where you survive.",
    whyItMatters:
      "Understanding the stages is what makes the other questions answerable. Each stage is a place where a company can be won or lost, and we study each one on its own.",
    concluded:
      "We have observed this staged narrowing across several categories: an opening list that is not the final answer, companies cut at specific requirements, the leader exposed at the first requirement it cannot meet, and fields that survive, collapse, or move to a different tier depending on the category. Every observation is held at its honest confidence level and most rest on a single AI system.",
    unknown:
      "How closely this resembles the way a human buying committee evaluates, and how much of it holds across different AI systems and over time, are open questions the research program is built to keep testing.",
    howWeHelp:
      "Upstream Zero studies each stage and turns that into a diagnosis for your company: where you enter, where you are cut, and what must become true to survive. The research is public; the diagnosis is the product.",
    nextStep:
      "See the research, or how the work is done in the methodology.",
  },
];

export function businessQuestionBySlug(slug: string): BusinessQuestion | undefined {
  return BUSINESS_QUESTIONS.find((b) => b.slug === slug);
}
