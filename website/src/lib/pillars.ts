/**
 * The authority layer: reference pages for the search terms buyers already
 * use. Each is written to be genuinely useful and citable, and to reframe
 * toward commercial evaluation without ever claiming Upstream Zero is an
 * AI-SEO, GEO, or visibility agency.
 *
 * The rule, enforced by the template: define the term accurately, explain
 * how it works, say why it matters, then reframe. Tactics are about being
 * *found*; commercial evaluation is about being *chosen*. "commercial
 * evaluation" is the hub the others link up to.
 *
 * Content lives here so ten pages are data plus one component.
 */
export type Pillar = {
  slug: string;
  term: string;
  aka?: string;
  kind: "tactic" | "platform" | "concept";
  hub?: boolean;
  summary: string; // meta description
  definition: string;
  mechanics: string;
  matters: string;
  reframe: string[]; // the commercial-evaluation angle, one paragraph per item
  faqs: { q: string; a: string }[];
  // ── Deeper structure (optional; being backfilled across the set) ──
  limitations?: string; // what the concept does not solve (#4)
  lifecycle?: string; // how it influences the lifecycle, in prose (#3)
  lifecycleStages?: LifecycleStageKey[]; // which stages it acts on (#3)
  businessLogic?: string; // hedged commercial logic, never an outcome promise (#7)
  relatedComponents?: string[]; // research component (concept) slugs (#6)
  relatedTerms?: string[]; // explicit related pillar/comparison slugs (#5)
};

/** The single commercial evaluation lifecycle, shared by every Learn page so
 *  the graph reads consistently. It is a loop: measurement feeds back into
 *  business outcomes. Each page highlights the stage(s) it acts on. */
export type LifecycleStageKey =
  | "business-outcomes"
  | "ai-mediated-buying"
  | "discovery"
  | "retrieval"
  | "recommendation"
  | "requirement-evaluation"
  | "validation"
  | "selection"
  | "measurement";

export const LIFECYCLE: { key: LifecycleStageKey; label: string }[] = [
  { key: "business-outcomes", label: "Business outcomes" },
  { key: "ai-mediated-buying", label: "AI-mediated buying" },
  { key: "discovery", label: "Discovery" },
  { key: "retrieval", label: "Retrieval" },
  { key: "recommendation", label: "Recommendation" },
  { key: "requirement-evaluation", label: "Requirement evaluation" },
  { key: "validation", label: "Validation" },
  { key: "selection", label: "Selection" },
  { key: "measurement", label: "Measurement" },
];

export const PILLARS: Pillar[] = [
  {
    slug: "commercial-evaluation",
    term: "Commercial Evaluation",
    kind: "concept",
    hub: true,
    summary:
      "Commercial evaluation is the process that decides which company a buyer considers, validates, and selects. In AI-mediated buying, much of it happens before you know the buyer exists.",
    definition:
      "Commercial Evaluation is the process through which a buyer, or a system acting on behalf of a buyer, compares, evaluates, and narrows a large field of possible vendors into a smaller recommendation set based on the buyer's requirements.",
    mechanics:
      "A buyer describes a problem. Requirements are inferred and applied. Companies are compared against those requirements. Some are eliminated, one becomes the recommendation. Each new requirement can change who remains.",
    matters:
      "The recommendation a buyer arrives with was produced by an evaluation you usually never see. Understanding that evaluation is how you learn why competitors are chosen and where you are eliminated.",
    reframe: [
      "Most of the terms below (AI visibility, GEO, AI SEO) describe tactics for being found. Commercial evaluation is about being chosen. Being retrieved is necessary; it is not the same as surviving a real buyer's requirements.",
      "Upstream Zero studies commercial evaluation directly. AI systems are today's mechanism, the place the evaluation is currently easiest to observe. The mechanism will change; the evaluation will not.",
    ],
    faqs: [
      {
        q: "Is commercial evaluation the same as AI visibility?",
        a: "No. Visibility is whether a system can find and mention you. Commercial evaluation is whether you survive the requirements a real buyer applies and become the recommendation. You can be highly visible and still eliminated at the first real requirement.",
      },
      {
        q: "Can commercial evaluation be measured?",
        a: "Parts of it can be observed today through AI evaluators: which companies are recommended, which requirements eliminate them, and how the recommendation changes as requirements are added. Upstream Zero measures that layer and reports it with its conditions and limits.",
      },
    ],
  },
  {
    slug: "ai-visibility",
    term: "AI Visibility",
    kind: "tactic",
    summary:
      "AI visibility is whether AI systems can find, mention, and describe your company. It is necessary but not sufficient: being visible is not the same as being recommended.",
    definition:
      "AI visibility is the degree to which AI systems can find, mention, and correctly describe your company when a user asks a related question. It is the AI-era descendant of search visibility.",
    mechanics:
      "It depends on whether your information is reachable, machine-readable, consistent across sources, and current. A system that cannot reconstruct what you do cannot surface you accurately.",
    matters:
      "If a system cannot find or correctly describe you, you cannot be considered at all. Visibility is the entry ticket to the evaluation, not the outcome of it.",
    reframe: [
      "Visibility answers 'can the system find me?' It does not answer 'does the system recommend me when a real buyer describes their requirements?' Those are different questions, and the second is the one that closes deals.",
      "A commercial evaluation audit starts where visibility work ends: it observes what happens after you are found, when requirements are applied and companies are eliminated.",
    ],
    faqs: [
      {
        q: "Do you improve AI visibility?",
        a: "We are not a visibility agency and we do not promise rankings or inclusion. We measure and diagnose how AI systems currently evaluate you, including whether visibility is even your constraint, and hand you prioritized decisions.",
      },
      {
        q: "Is more visibility always better?",
        a: "Not on its own. Being visible into an evaluation you then lose at the first requirement does not help. The useful question is where in the evaluation you are actually being removed.",
      },
    ],
  },
  {
    slug: "generative-engine-optimization",
    term: "Generative Engine Optimization",
    aka: "GEO",
    kind: "tactic",
    summary:
      "GEO (Generative Engine Optimization) is the practice of shaping content so generative AI systems cite and recommend it. It targets being found and quoted, not being selected under real requirements.",
    definition:
      "Generative Engine Optimization, or GEO, is the practice of structuring and publishing content so that generative AI systems retrieve, cite, and include a company in their answers.",
    mechanics:
      "GEO focuses on clear, structured, quotable content, consistent entity information, and presence in the sources a model draws on, so the system can find and reference you.",
    matters:
      "As buyers ask AI systems for recommendations, being retrievable and citable is a real prerequisite. GEO works on that prerequisite.",
    reframe: [
      "GEO optimizes for being cited. Commercial evaluation asks whether, once cited, you survive the buyer's specific requirements and become the recommendation. Citation is upstream of selection, not the same as it.",
      "We do not do GEO. We observe the evaluation that runs after retrieval, so you can see which requirement removes you and what evidence would change the outcome.",
    ],
    faqs: [
      {
        q: "Is GEO the same as commercial evaluation?",
        a: "No. GEO is a set of tactics for being retrieved and cited. Commercial evaluation is the decision process that runs on top of retrieval and determines who is actually recommended. We study the second.",
      },
      {
        q: "Do you offer GEO services?",
        a: "No. We measure and diagnose commercial evaluation. We do not promise citations, rankings, or inclusion, and we are not a GEO agency.",
      },
    ],
  },
  {
    slug: "ai-seo",
    term: "AI SEO",
    kind: "tactic",
    summary:
      "AI SEO adapts search optimization for AI-mediated results. It works on discoverability. Commercial evaluation works on whether you are chosen once discovered.",
    definition:
      "AI SEO is the adaptation of search engine optimization for AI-mediated results: making a company discoverable and correctly represented when AI systems answer questions instead of returning a list of links.",
    mechanics:
      "It extends familiar SEO fundamentals (crawlability, structured data, authoritative content, consistent entities) toward the way AI systems retrieve and synthesize information.",
    matters:
      "When answers replace links, being discoverable and correctly represented still matters. AI SEO addresses that layer.",
    reframe: [
      "AI SEO improves whether you show up. It does not tell you why a competitor is recommended over you when a buyer adds a hard requirement. That is a commercial evaluation question.",
      "Upstream Zero is not an AI SEO agency. We observe the evaluation itself and report where you are eliminated and what evidence is most likely to matter.",
    ],
    faqs: [
      {
        q: "Is AI SEO enough to win recommendations?",
        a: "Discoverability is necessary but not sufficient. Buyers apply requirements, and companies are eliminated on requirements, not on discoverability alone. Commercial evaluation is where that happens.",
      },
      {
        q: "Do you do AI SEO?",
        a: "No. We measure how AI systems evaluate you and give you evidence-based, prioritized decisions. We do not promise rankings or inclusion.",
      },
    ],
  },
  {
    slug: "llm-optimization",
    term: "LLM Optimization",
    kind: "tactic",
    summary:
      "LLM optimization aims to influence how large language models represent and recommend a company. It targets representation. Commercial evaluation targets the decision that representation feeds.",
    definition:
      "LLM optimization refers to practices intended to influence how large language models describe, cite, and recommend a company, given that models increasingly mediate what buyers see.",
    mechanics:
      "It focuses on the information a model can reach and reconstruct about you, and how consistently that information appears across the sources the model was trained on or can retrieve.",
    matters:
      "How a model represents you shapes whether you enter the consideration set at all. Getting the representation right is real work.",
    reframe: [
      "Representation is an input to commercial evaluation, not the whole of it. The decision that matters is what the system does with that representation once a buyer applies real requirements.",
      "We measure that decision. We do not promise to change what a model outputs, and we are not an LLM optimization vendor.",
    ],
    faqs: [
      {
        q: "Can you guarantee a model recommends us?",
        a: "No, and anyone who guarantees it is not being honest about how these systems work. We promise evidence-based diagnosis and prioritized recommendations, never a specific outcome.",
      },
      {
        q: "How is this different from what you do?",
        a: "LLM optimization tries to shape the model's representation of you. We observe and diagnose the evaluation the model runs, so you know where you are eliminated and why.",
      },
    ],
  },
  {
    slug: "ai-search-optimization",
    term: "AI Search Optimization",
    kind: "tactic",
    summary:
      "AI search optimization is making a company discoverable and correctly represented across AI-powered search experiences. It is about being found across surfaces, not about surviving a buyer's requirements.",
    definition:
      "AI search optimization is the practice of making a company discoverable and correctly represented across AI-powered search experiences, from AI overviews to conversational search.",
    mechanics:
      "It spans multiple surfaces at once, working on structured information, authority, and consistency so different AI search experiences can find and describe you.",
    matters:
      "Buyers now search across several AI surfaces. Being present and accurate across them is the ground floor of consideration.",
    reframe: [
      "Being found across surfaces is the start of the story. The end is whether, on each surface, you survive the requirements a buyer actually applies. That is commercial evaluation, and it is what we measure.",
      "We are not a search-optimization agency. We diagnose the evaluation running on those surfaces.",
    ],
    faqs: [
      {
        q: "Which AI surfaces do you look at?",
        a: "We observe the major AI evaluators buyers use, and we disclose which surface each observation came from. Behavior differs by surface, so we never generalize a single surface into a universal claim.",
      },
      {
        q: "Do you optimize for these surfaces?",
        a: "No. We measure and diagnose. You receive evidence and prioritized decisions, not a promise about any surface's output.",
      },
    ],
  },
  {
    slug: "google-ai-mode",
    term: "Google AI Mode",
    kind: "platform",
    summary:
      "Google AI Mode is a conversational, follow-up-driven AI search experience. Because it takes follow-up requirements, it is where commercial evaluation becomes directly observable.",
    definition:
      "Google AI Mode is Google's conversational AI search experience, where a user can ask a question and then refine it through follow-ups rather than reading a list of links.",
    mechanics:
      "It interprets the question, forms an initial recommendation, and updates that recommendation as the user adds requirements, testing the companies already recommended against each new constraint.",
    matters:
      "Because it takes follow-up requirements, AI Mode makes the narrowing of a recommendation visible. It is one of the clearest places to watch commercial evaluation happen.",
    reframe: [
      "AI Mode is a place commercial evaluation happens, not a channel to be optimized. What matters is which follow-up removes you and which keeps you.",
      "Upstream Zero observes evaluations on surfaces like this and reports the exact requirement where a company is displaced or survives.",
    ],
    faqs: [
      {
        q: "Why does the recommendation change as I add follow-ups?",
        a: "Each follow-up is a requirement. The system re-tests the companies it already recommended against the new requirement, and companies that no longer fit drop out. The final answer reflects the full requirement set, not the opening question.",
      },
      {
        q: "Do you work only with Google AI Mode?",
        a: "No. It is one observable surface among several. We disclose the surface behind every observation, because behavior is surface-specific.",
      },
    ],
  },
  {
    slug: "chatgpt-recommendations",
    term: "ChatGPT Recommendations",
    kind: "platform",
    summary:
      "ChatGPT recommendations are the companies ChatGPT names when asked what to consider. They are the output of an evaluation, and they change as the buyer's requirements change.",
    definition:
      "ChatGPT recommendations are the companies ChatGPT surfaces when a user asks which options to consider for a given problem, along with the reasons it narrates.",
    mechanics:
      "ChatGPT interprets the request, draws on what it can reconstruct about the options, and produces a recommendation that shifts as the user supplies more specific requirements.",
    matters:
      "Buyers increasingly ask ChatGPT for a shortlist. The companies it names, and the ones it drops, shape the buyer's starting point before you are ever contacted.",
    reframe: [
      "The recommendation is the visible tip of an evaluation. Its stated reasons are narration about the evaluation, not proof of the mechanism. We treat them accordingly.",
      "Upstream Zero observes these recommendations, and how they move under requirement pressure, rather than trying to manipulate them.",
    ],
    faqs: [
      {
        q: "Can you make ChatGPT recommend us?",
        a: "No. We do not promise inclusion or ranking. We measure how you are currently evaluated and give you prioritized, evidence-based decisions.",
      },
      {
        q: "Are the reasons ChatGPT gives reliable?",
        a: "We treat a system's stated reasons as observations about its narration, not as proof of how it actually decided. That distinction is core to how we read evidence.",
      },
    ],
  },
  {
    slug: "google-ai-overviews",
    term: "Google AI Overviews",
    kind: "platform",
    summary:
      "Google AI Overviews are AI-generated summaries at the top of search results. Being cited in an overview is discoverability; surviving a buyer's requirements is a separate question.",
    definition:
      "Google AI Overviews are the AI-generated summaries Google places above traditional search results, synthesizing an answer from multiple sources.",
    mechanics:
      "An overview retrieves and synthesizes information from across the web into a single answer, sometimes citing sources, sometimes naming companies as part of the response.",
    matters:
      "For many queries, the overview is the first and sometimes only thing a buyer reads. Being represented there shapes the initial frame.",
    reframe: [
      "Appearing in an overview is a form of visibility. It does not tell you whether you would survive the requirements a serious buyer applies in a deeper, conversational evaluation.",
      "We study the deeper evaluation, and we distinguish being retrieved, being synthesized into an answer, and being the recommendation. They are not the same event.",
    ],
    faqs: [
      {
        q: "Is being in an AI Overview the same as being recommended?",
        a: "No. Retrieval, synthesis into an answer, and recommendation are distinct. You can be cited in an overview and still not be the company a requirement-driven evaluation selects.",
      },
      {
        q: "Do you optimize for AI Overviews?",
        a: "No. We measure and diagnose the evaluation, not the overview. We do not promise placement.",
      },
    ],
  },
  {
    slug: "commercial-buying-ai",
    term: "Commercial Buying AI",
    kind: "concept",
    summary:
      "Commercial buying AI refers to AI systems that help buyers evaluate and choose companies. It is the mechanism through which more commercial evaluation now happens before direct contact.",
    definition:
      "Commercial buying AI refers to the AI systems that help buyers understand a problem, compare companies, and decide who to consider, increasingly before they contact any vendor directly.",
    mechanics:
      "These systems interpret a buyer's problem, infer requirements, compare available companies, and narrow toward a recommendation, updating as the buyer refines what they need.",
    matters:
      "As more of this happens before direct contact, the evaluation that shapes a buyer's shortlist is increasingly one you never see. That is the shift Upstream Zero exists to make visible.",
    reframe: [
      "Commercial buying AI is the current mechanism of commercial evaluation. The mechanism will keep changing; the evaluation underneath it is durable, and that is what we study.",
      "We help you see how these systems currently evaluate you, and what would have to change for you to be the logical choice.",
    ],
    faqs: [
      {
        q: "Is this a passing trend?",
        a: "The specific tools will change. The underlying fact, that commercial evaluation increasingly concludes before a buyer engages you, is the durable shift. We anchor to the evaluation, not the tool.",
      },
      {
        q: "How do I see how buying AI evaluates my company?",
        a: "Start with a Commercial Evaluation Audit: a structured observation of how current systems evaluate, recommend, or eliminate you, with prioritized decisions.",
      },
    ],
  },
  {
    slug: "answer-engine-optimization",
    term: "Answer Engine Optimization",
    aka: "AEO",
    kind: "tactic",
    summary:
      "Answer Engine Optimization (AEO) structures content so answer engines quote it directly. It improves whether you are cited, which is necessary for consideration but not the same as surviving a buyer's requirements.",
    definition:
      "Answer Engine Optimization, or AEO, is the practice of structuring content and metadata so that answer engines, the systems that return a direct answer instead of a list of links, retrieve and quote your content when someone asks a question.",
    mechanics:
      "AEO works on retrieval and citation: clear question-and-answer structure, schema markup, concise definitions, and authoritative sourcing, so an answer engine can lift a passage and attribute it to you. The unit of success is a citation or a mention.",
    matters:
      "If an answer engine never surfaces you, you cannot be considered. AEO raises the odds of being retrieved and cited, which is the entry ticket to the conversation.",
    limitations:
      "Being cited is not being chosen. AEO optimizes whether you are quoted, not whether you survive the requirements a buyer adds after the first question. A company can be cited in an overview and still be eliminated the moment a real requirement is applied. AEO also acts on the answer surface, not on the commercial evaluation behind the recommendation.",
    lifecycle:
      "In the commercial evaluation lifecycle, AEO sits at the very front: retrieval and mention. It helps you enter the recommendation set, where recommendation set formation, vendor elimination, and selection survivability take over. Getting quoted is the start of the process, not the decision.",
    businessLogic:
      "The commercial logic runs downstream of citation. Being retrieved puts you in front of the evaluation; surviving that evaluation is what keeps you in the deals that become pipeline. AEO can help you get seen, but the pipeline, fit, and win-rate effects depend on whether you then survive the requirements that decide the shortlist. Upstream Zero measures whether that position moves; it does not promise a number.",
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    lifecycleStages: ["discovery", "retrieval"],
    relatedTerms: [
      "generative-engine-optimization",
      "ai-search-optimization",
      "ai-visibility",
      "ai-seo",
      "commercial-evaluation",
    ],
    reframe: [
      "AEO is about being quoted. Commercial evaluation is about being chosen. A citation gets you into the room; it does not decide who the buyer selects once requirements are applied.",
      "Structured content and schema may be recommended when the evidence shows a retrieval gap, but as a candidate mechanism for a specific problem, not as the goal itself.",
    ],
    faqs: [
      {
        q: "Is AEO the same as SEO?",
        a: "No. SEO optimizes ranking in a list of links; AEO optimizes being quoted as the answer. Both are about being found, not about surviving a buyer's requirements.",
      },
      {
        q: "Does Upstream Zero do AEO?",
        a: "No. Upstream Zero studies and measures commercial evaluation. Answer-engine structuring may be a recommended mechanism when observed evidence shows a retrieval gap, but it is not our category.",
      },
    ],
  },
  {
    slug: "evidence-strategy",
    term: "Evidence Strategy",
    kind: "concept",
    summary:
      "Evidence strategy is deciding what must become true for an evaluator to credit you with a requirement, and which specific evidence would make that credible. It connects an observed elimination to a prioritized set of evidence.",
    definition:
      "Evidence Strategy is the practice of determining, for a requirement where a company is eliminated, what an evaluator must be able to associate with the company, and which specific evidence would make that association credible.",
    mechanics:
      "It starts from an observed failure: a requirement where you drop out. It names what must become true, compares that against the evidence you already publish, identifies the gap, prioritizes the evidence most likely to close it, and then measures whether the position moves.",
    matters:
      "Most companies produce evidence by volume and habit. An evidence strategy produces it by diagnosis: the specific proof, for the specific requirement, in the place an evaluator looks. It is the difference between publishing more and publishing what is missing.",
    limitations:
      "An evidence strategy is grounded in observed behavior and diagnosis, not a guarantee. It recommends candidate interventions tied to an evidence gap; whether a given intervention moves the outcome is measured, not assumed. Evaluator behavior can change, and a stated rationale is a description of narration, not proof of mechanism.",
    lifecycle:
      "Evidence strategy sits in the middle of the commercial evaluation lifecycle: after diagnosis, where and why you are eliminated, and before measurement, whether the intervention moved your position. It turns validation and evidence findings into a prioritized plan.",
    businessLogic:
      "The commercial logic is direct: buyers eliminate on requirements, and requirements are decided on evidence. Close the evidence gap on the requirement that removes you and you are more likely to survive to the shortlist, which is where fit, pipeline, and win rates are decided. Upstream Zero recommends the evidence and measures whether recommendation behavior changes; it does not promise a revenue outcome.",
    relatedComponents: [
      "validation-and-evidence",
      "requirement-interpretation",
      "vendor-elimination",
    ],
    lifecycleStages: ["requirement-evaluation", "validation"],
    relatedTerms: [
      "commercial-evaluation",
      "answer-engine-optimization",
      "ai-visibility",
    ],
    reframe: [
      "Evidence strategy is where research becomes action. It is the bridge from what we observe an evaluator doing to what a company can actually do about it, kept on the commercial side so recommendations never contaminate the research record.",
      "It is not content marketing by volume. It is a diagnosis-driven, prioritized set of candidate interventions for a specific requirement and a specific gap.",
    ],
    faqs: [
      {
        q: "Is evidence strategy the same as content marketing?",
        a: "No. Content marketing produces material to be found. Evidence strategy produces the specific proof an evaluator needs for the requirement that is eliminating you, and measures whether it changes the outcome.",
      },
      {
        q: "Does more evidence always help?",
        a: "No. The system does not recommend every evidence type for every problem. The recommendation depends on the requirement being tested, the evaluator's apparent confidence gap, and your existing coverage.",
      },
    ],
  },
  {
    slug: "ai-recommendations",
    term: "AI Recommendations",
    kind: "concept",
    summary:
      "AI recommendations are the vendor suggestions produced when an AI system answers a buying question. They are the output of an evaluation you usually never see, and they change as the buyer adds requirements.",
    definition:
      "AI Recommendations are the vendor or product suggestions an AI system returns when a buyer asks what to use, buy, or shortlist. Each is the visible output of a hidden evaluation: the system formed a set, applied the buyer's requirements, eliminated options, and settled on what to recommend.",
    mechanics:
      "A buyer asks a question. The system surfaces a set of candidates, then reshapes that set every time the buyer adds a requirement, dropping vendors that do not clearly satisfy it and elevating those that do. The recommendation you see reflects the accumulated requirements, not the opening question.",
    matters:
      "The recommendation is what the buyer arrives with. If an AI system recommends a competitor, that decision was made before a salesperson was ever involved, in an evaluation you did not observe.",
    limitations:
      "A recommendation is an output, not a mechanism. Seeing that you were or were not recommended does not by itself tell you which requirement decided it, whether it repeats across evaluators, or what evidence would change it. A recommendation can also vary run to run, so a single instance is an observation, not a law.",
    lifecycle:
      "AI recommendations are the recommendation stage of the lifecycle, sitting between retrieval and requirement evaluation. They are produced from the retrieved set and then reshaped by every requirement the buyer applies, which is where survivability and elimination take over.",
    lifecycleStages: ["recommendation", "requirement-evaluation"],
    businessLogic:
      "Organizations care about AI recommendations because being recommended is what puts you in the deal. Whether that contributes to stronger pipeline, better-fit opportunities, higher win rates, or revenue depends on whether you then survive the requirements the buyer adds after the first recommendation. Upstream Zero measures whether your recommendation position moves; it does not assume a recommendation guarantees a sale.",
    relatedComponents: [
      "recommendation-set-formation",
      "selection-survivability",
      "frontrunner-movement",
    ],
    relatedTerms: [
      "commercial-evaluation",
      "recommendation-intelligence",
      "ai-visibility",
      "generative-engine-optimization",
    ],
    reframe: [
      "AI visibility asks whether a system can find you. AI recommendations are whether it puts you forward once a real buyer applies requirements. Being retrieved is necessary; being recommended is the result of the evaluation.",
      "Upstream Zero studies how recommendations form and change, so a recommendation becomes something you can diagnose rather than something that simply happens to you.",
    ],
    faqs: [
      {
        q: "Why does an AI recommend our competitor instead of us?",
        a: "Usually because a specific requirement was applied that the competitor visibly satisfied and you did not. The recommendation is the end of a sequence; the useful question is which requirement decided it.",
      },
      {
        q: "Do AI recommendations stay the same?",
        a: "No. They change as the buyer adds requirements, and they can vary across repeated runs and across evaluators. That is why recommendation movement is measured against a baseline, not assumed.",
      },
    ],
  },
  {
    slug: "recommendation-intelligence",
    term: "Recommendation Intelligence",
    kind: "concept",
    summary:
      "Recommendation intelligence is the practice of measuring and diagnosing how AI systems recommend, eliminate, and select vendors, so a company can see why it wins or loses in AI-mediated evaluation.",
    definition:
      "Recommendation Intelligence is the discipline of observing, measuring, and diagnosing how AI systems form vendor recommendations: which companies are surfaced, which requirements eliminate them, how the leader moves, and what evidence appears to drive selection.",
    mechanics:
      "It runs a category through the requirement sequences a buyer would use, records how the recommendation set forms and changes, and diagnoses where and why a company is eliminated, then measures whether interventions move that position over time.",
    matters:
      "Companies can now see a layer of commercial evaluation that used to be invisible. Recommendation intelligence turns AI recommendations from an unexplained outcome into a measured, diagnosable process.",
    limitations:
      "Recommendation intelligence measures and diagnoses; it does not guarantee an outcome. It reports what was observed, at its evidence tier, and separates observation from inference. A stated evaluator rationale is treated as narration, not proof of mechanism, and most observations should be measured for your own category rather than assumed from another.",
    lifecycle:
      "Recommendation intelligence spans the whole lifecycle from recommendation through measurement: it is how the recommendation, requirement-evaluation, validation, selection, and measurement stages are made observable and connected back to business outcomes.",
    lifecycleStages: ["recommendation", "validation", "selection", "measurement"],
    businessLogic:
      "The commercial logic: you cannot improve what you cannot see. Recommendation intelligence shows where you are eliminated and whether an intervention moves your position, which is the input to pipeline, fit, and win-rate decisions. Whether those downstream outcomes improve depends on execution across the rest of the evaluation. Upstream Zero measures the movement rather than promising the revenue.",
    relatedComponents: [
      "selection-survivability",
      "vendor-elimination",
      "validation-and-evidence",
      "recommendation-stability",
    ],
    relatedTerms: [
      "commercial-evaluation",
      "ai-recommendations",
      "evidence-strategy",
      "ai-visibility",
    ],
    reframe: [
      "Recommendation intelligence is close to what Upstream Zero does, but the anchor is commercial evaluation: the decision itself. Recommendation intelligence is how that decision is currently measured, because AI evaluators make it observable.",
      "It is not a visibility dashboard. It is measurement and diagnosis of the evaluation that decides who a buyer selects.",
    ],
    faqs: [
      {
        q: "Is recommendation intelligence the same as AI visibility tracking?",
        a: "No. Visibility tracking counts mentions. Recommendation intelligence measures whether you survive requirements and are selected, and diagnoses why, which is a different and later part of the process.",
      },
      {
        q: "Can recommendation intelligence be measured today?",
        a: "Parts of it can, through AI evaluators: which companies are recommended, which requirements eliminate them, and how the recommendation changes. Upstream Zero measures that layer and reports it with its conditions and limits.",
      },
    ],
  },
  {
    slug: "vendor-selection",
    term: "Vendor Selection",
    kind: "concept",
    summary:
      "Vendor selection is the point where a buyer, or a system acting for them, chooses one vendor from a shortlist. In AI-mediated buying, much of the narrowing that decides selection happens before you engage.",
    definition:
      "Vendor Selection is the stage of a buying decision where a shortlist is reduced to the chosen vendor. It is the end of commercial evaluation: the requirements have been applied, the field has narrowed, and one option is selected.",
    mechanics:
      "Selection follows validation. A buyer confirms which shortlisted vendors credibly meet the requirements, then chooses. When an AI system mediates the early stages, the shortlist a buyer selects from was already shaped by requirements and eliminations you may never have seen.",
    matters:
      "Selection is where revenue is won or lost. But by the time selection happens, most of the field has already been removed. Influencing selection means influencing the evaluation that produced the shortlist, not just the final step.",
    limitations:
      "You cannot act directly on selection. Selection is the consequence of everything upstream: retrieval, recommendation, requirement evaluation, and validation. Optimizing the final step without surviving the earlier ones changes nothing, because you were removed before selection was reached.",
    lifecycle:
      "Vendor selection is the selection stage, near the end of the lifecycle, after validation and before measurement. It is the outcome the earlier stages produce, and it feeds back into business outcomes.",
    lifecycleStages: ["selection"],
    businessLogic:
      "Selection is the closest stage to revenue, which is exactly why it is the wrong place to intervene. The commercial logic runs backward: to be selected more often you have to survive the requirements that build the shortlist. Upstream Zero measures whether your position through those earlier stages improves; it does not promise a selection rate.",
    relatedComponents: [
      "selection-survivability",
      "competitor-displacement",
      "vendor-elimination",
    ],
    relatedTerms: [
      "commercial-evaluation",
      "requirement-based-evaluation",
      "ai-recommendations",
      "recommendation-intelligence",
    ],
    reframe: [
      "Vendor selection is the moment everyone focuses on and the moment you can least influence directly. Commercial evaluation is the process that produces it, and it is where the leverage actually sits.",
      "Being on the shortlist is not being selected, and being selected is decided by requirements applied long before the final choice.",
    ],
    faqs: [
      {
        q: "How is vendor selection different from being recommended?",
        a: "A recommendation puts you on the shortlist. Selection is being chosen from it. You can be recommended and still not selected if a later requirement removes you or a competitor validates better.",
      },
      {
        q: "Can Upstream Zero improve our selection rate?",
        a: "Upstream Zero measures and diagnoses where you are eliminated before selection and whether interventions move that position. It reports measured movement, not a promised selection rate.",
      },
    ],
  },
  {
    slug: "requirement-based-evaluation",
    term: "Requirement Based Evaluation",
    kind: "concept",
    summary:
      "Requirement-based evaluation is how a buyer narrows a field: by applying specific requirements that vendors must satisfy. It is the mechanism that decides who survives and who is eliminated.",
    definition:
      "Requirement-Based Evaluation is the process of narrowing a set of vendors by applying the buyer's specific requirements, one after another, and keeping only the vendors that credibly satisfy each one.",
    mechanics:
      "A buyer states or implies requirements. Each requirement is applied to the current set; vendors that do not visibly satisfy it are dropped. Because requirements are applied in sequence, the surviving set, and the leader, can change at every step.",
    matters:
      "Requirements are the invariant of commercial evaluation. Tools and surfaces change, but buyers always narrow by requirements. Understanding which requirements decide your category is how you learn where you are eliminated.",
    limitations:
      "Knowing the requirements is not the same as satisfying them, and satisfying them is not the same as being credited with them. An evaluator has to be able to associate you with a requirement through evidence. Requirement-based evaluation explains where you are tested; evidence strategy addresses whether you pass.",
    lifecycle:
      "Requirement-based evaluation is the requirement-evaluation stage, the center of the lifecycle. It sits between recommendation and validation and is where selection survivability, vendor elimination, and frontrunner movement all play out.",
    lifecycleStages: ["requirement-evaluation"],
    businessLogic:
      "The commercial logic is direct: requirements decide the shortlist, and the shortlist decides the deals you are in. Surviving the requirements that matter in your category is what keeps you in contention for pipeline and win rates. Upstream Zero identifies those requirements and measures whether your position on them moves; it does not promise a downstream number.",
    relatedComponents: [
      "requirement-interpretation",
      "vendor-elimination",
      "selection-survivability",
    ],
    relatedTerms: [
      "commercial-evaluation",
      "evidence-strategy",
      "vendor-selection",
      "recommendation-intelligence",
    ],
    reframe: [
      "Requirement-based evaluation is the how of commercial evaluation. It is the mechanism the research studies directly: which requirement removes you, and whether that repeats.",
      "It is not a checklist you self-assess. It is what an evaluator applies to you, which is why it has to be observed rather than assumed.",
    ],
    faqs: [
      {
        q: "Who defines the requirements?",
        a: "The buyer, explicitly or implicitly, and the evaluator interprets them. That interpretation can vary, which is why requirement interpretation is studied as its own research component.",
      },
      {
        q: "How do we know which requirements eliminate us?",
        a: "By observing a category run through realistic requirement sequences and recording where you drop out. That is what a Commercial Evaluation Audit produces.",
      },
    ],
  },
];

export const HUB_PILLAR = PILLARS.find((p) => p.hub)!;
