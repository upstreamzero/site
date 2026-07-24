/** Comparison pages: high-value "X vs Y" retrieval queries that also make the
 *  semantic relationships between concepts explicit. Each accurately explains
 *  both concepts, where they overlap, where they differ, and how both sit in
 *  the commercial evaluation lifecycle. The stance is consistent: market
 *  tactics (AEO, GEO, SEO) are implementation disciplines for retrieval and
 *  understanding; commercial evaluation is the broader process Upstream Zero
 *  studies and measures. Never a promise of outcomes. */
import type { LifecycleStageKey } from "./pillars";

export type Comparison = {
  slug: string;
  a: string; // term A
  b: string; // term B
  title: string; // SEO title
  summary: string; // meta description
  answer: string; // direct answer up top
  aDef: string;
  bDef: string;
  overlap: string;
  difference: string;
  lifecycle: string; // how both fit the lifecycle
  lifecycleStages: LifecycleStageKey[]; // stages the comparison spans
  relatedTerms: string[]; // pillar slugs
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "aeo-vs-geo",
    a: "AEO",
    b: "GEO",
    title: "AEO vs GEO: What Is the Difference? | Upstream Zero",
    summary:
      "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) both aim to get your content used by AI systems. AEO targets being quoted as the answer; GEO targets being represented in generated responses. Neither decides whether you survive a buyer's requirements.",
    answer:
      "AEO optimizes being quoted directly by answer engines. GEO optimizes being represented well inside generative AI responses. They overlap heavily and are often used together, but both act on retrieval and understanding, not on whether you are recommended and selected once a buyer applies requirements.",
    aDef: "Answer Engine Optimization structures content and metadata so answer engines retrieve and quote you, with a citation as the unit of success.",
    bDef: "Generative Engine Optimization structures content, entities, and authority so generative AI systems represent your company accurately in the answers they compose.",
    overlap:
      "Both are retrieval-and-understanding disciplines: clear structure, schema, authoritative sourcing, and consistent entity signals. In practice the tactics overlap so much that many teams treat them as one effort.",
    difference:
      "AEO is framed around being the quoted answer; GEO is framed around being well-represented in a generated response. The distinction is mostly emphasis. Neither addresses what happens after retrieval, when the buyer adds requirements and the field narrows.",
    lifecycle:
      "AEO and GEO both act at discovery and retrieval, the front of the lifecycle. They help you enter the recommendation set. What decides survival, elimination, and selection happens in the later stages that commercial evaluation studies.",
    lifecycleStages: ["discovery", "retrieval"],
    relatedTerms: [
      "answer-engine-optimization",
      "generative-engine-optimization",
      "ai-visibility",
      "commercial-evaluation",
    ],
  },
  {
    slug: "aeo-vs-seo",
    a: "AEO",
    b: "SEO",
    title: "AEO vs SEO: What Is the Difference? | Upstream Zero",
    summary:
      "SEO optimizes ranking in a list of links. AEO (Answer Engine Optimization) optimizes being quoted as the answer itself. Both are about being found, not about surviving a buyer's requirements or being selected.",
    answer:
      "SEO earns a position in a ranked list of links a person clicks. AEO earns a place in the single answer an engine returns. AEO is the natural evolution of SEO for answer engines, but both stop at being found; neither decides whether you are recommended and chosen once requirements are applied.",
    aDef: "Answer Engine Optimization structures content so an answer engine retrieves and quotes it as the response, attributed to you.",
    bDef: "Search Engine Optimization structures content and signals so a search engine ranks your page highly in a list of results.",
    overlap:
      "Both depend on relevance, authority, clear structure, and technical hygiene, and good SEO practice feeds AEO. The underlying content and entity signals are largely shared.",
    difference:
      "SEO competes for a click in a list; AEO competes for inclusion in a synthesized answer where there may be no list at all. The success unit shifts from a ranking to a citation. Both remain discovery tactics.",
    lifecycle:
      "SEO and AEO both act at discovery and retrieval. They influence whether you appear at all. Commercial evaluation picks up after that, when requirements narrow the field to a recommendation and a selection.",
    lifecycleStages: ["discovery", "retrieval"],
    relatedTerms: [
      "answer-engine-optimization",
      "ai-search-optimization",
      "ai-visibility",
      "commercial-evaluation",
    ],
  },
  {
    slug: "geo-vs-ai-seo",
    a: "GEO",
    b: "AI SEO",
    title: "GEO vs AI SEO: What Is the Difference? | Upstream Zero",
    summary:
      "GEO (Generative Engine Optimization) and AI SEO overlap almost entirely: both adapt content so AI systems find, understand, and represent you. The difference is mostly labeling. Neither decides whether you survive a buyer's requirements.",
    answer:
      "GEO and AI SEO are near-synonyms for adapting your content and signals so AI systems retrieve and represent you well. Any real difference is emphasis and vocabulary. Both are retrieval-and-understanding disciplines and neither governs recommendation, survival, or selection.",
    aDef: "Generative Engine Optimization structures content, entities, and authority so generative AI represents your company accurately in composed answers.",
    bDef: "AI SEO is the broad practice of optimizing content and technical signals for AI-driven search and answer systems.",
    overlap:
      "The tactics are effectively the same: structured content, schema, entity consistency, and authoritative sourcing aimed at AI systems. Teams often use the terms interchangeably.",
    difference:
      "GEO tends to emphasize how you are represented inside a generated answer; AI SEO tends to be used as the umbrella label. The practical overlap is near-total.",
    lifecycle:
      "Both operate at discovery and retrieval. They shape whether and how you are surfaced. The stages that decide who wins, requirement evaluation through selection, are what commercial evaluation measures.",
    lifecycleStages: ["discovery", "retrieval"],
    relatedTerms: [
      "generative-engine-optimization",
      "ai-seo",
      "ai-search-optimization",
      "commercial-evaluation",
    ],
  },
  {
    slug: "ai-visibility-vs-commercial-evaluation",
    a: "AI Visibility",
    b: "Commercial Evaluation",
    title: "AI Visibility vs Commercial Evaluation | Upstream Zero",
    summary:
      "AI visibility is whether an AI system can find and mention you. Commercial evaluation is whether you survive a buyer's requirements and are selected. You can be highly visible and still eliminated at the first real requirement.",
    answer:
      "AI visibility is about being found; commercial evaluation is about being chosen. Visibility is necessary but not sufficient: it puts you in front of the evaluation, and the evaluation, applying requirements and narrowing the field, decides who is recommended and selected. Upstream Zero studies the evaluation, not the visibility.",
    aDef: "AI Visibility is the degree to which AI systems can discover, retrieve, and mention your company when relevant.",
    bDef: "Commercial Evaluation is the process that decides which company a buyer considers, validates, and selects, much of which now happens through AI before you know the buyer exists.",
    overlap:
      "Both concern how AI systems treat your company, and both start from being present in the model's world. Visibility is the entry condition for commercial evaluation.",
    difference:
      "Visibility measures presence and mention. Commercial evaluation measures survival and selection under requirements. A visible company can still be the first eliminated when a real requirement is applied; an evaluation-strong company converts presence into recommendation and selection.",
    lifecycle:
      "AI visibility acts at discovery and retrieval. Commercial evaluation spans recommendation, requirement evaluation, validation, selection, and measurement. Visibility is the first step of the same loop that ends in business outcomes.",
    lifecycleStages: [
      "discovery",
      "retrieval",
      "recommendation",
      "requirement-evaluation",
      "validation",
      "selection",
    ],
    relatedTerms: [
      "ai-visibility",
      "commercial-evaluation",
      "recommendation-intelligence",
      "answer-engine-optimization",
    ],
  },
  {
    slug: "retrieval-vs-recommendation",
    a: "Retrieval",
    b: "Recommendation",
    title: "Retrieval vs Recommendation in AI Buying | Upstream Zero",
    summary:
      "Retrieval is whether an AI system surfaces you at all. Recommendation is whether it puts you forward as an answer. Being retrieved is necessary for being recommended, but the two are decided by different things.",
    answer:
      "Retrieval is the system finding and surfacing your content; recommendation is the system putting you forward as a suggested vendor. Retrieval is a precondition for recommendation, but a retrieved company can still fail to be recommended once the buyer's requirements are considered.",
    aDef: "Retrieval is the stage where an AI system finds and surfaces candidate content or vendors relevant to a query.",
    bDef: "Recommendation is the stage where the system puts specific vendors forward as its answer, formed from the retrieved set and reshaped by requirements.",
    overlap:
      "Recommendation depends on retrieval: you cannot be recommended if you were never retrieved. Both are early, AI-mediated stages of the buying process.",
    difference:
      "Retrieval optimization (AEO, GEO) improves whether you are surfaced. Recommendation is decided by how you compare against the buyer's requirements once surfaced. Improving retrieval does not guarantee recommendation.",
    lifecycle:
      "Retrieval is the retrieval stage; recommendation is the recommendation stage that follows it. The gap between them is exactly where visibility work stops and commercial evaluation begins.",
    lifecycleStages: ["retrieval", "recommendation"],
    relatedTerms: [
      "answer-engine-optimization",
      "ai-recommendations",
      "commercial-evaluation",
      "recommendation-intelligence",
    ],
  },
  {
    slug: "recommendation-vs-selection",
    a: "Recommendation",
    b: "Selection",
    title: "Recommendation vs Selection in AI Buying | Upstream Zero",
    summary:
      "A recommendation puts you on the shortlist. Selection is being chosen from it. You can be recommended and still not selected if a later requirement removes you or a competitor validates better.",
    answer:
      "Recommendation is being put forward as a candidate; selection is being the one chosen. Recommendation gets you onto the shortlist; selection is decided by the requirements and validation that follow. Being recommended is necessary but not sufficient for being selected.",
    aDef: "Recommendation is the system putting your company forward as a suggested option within a set.",
    bDef: "Selection is the final choice of one vendor from the shortlist, at the end of the evaluation.",
    overlap:
      "Both are outcomes of the same evaluation, and selection is drawn from the recommended set. Improving your recommendation position generally improves your odds of selection, all else equal.",
    difference:
      "Recommendation is plural and early; selection is singular and final. Between them sit the requirements and validation that can still eliminate a recommended vendor. Surviving to selection is a stricter test than being recommended.",
    lifecycle:
      "Recommendation is the recommendation stage; selection is the selection stage near the end. Requirement evaluation and validation sit between them and decide who survives.",
    lifecycleStages: [
      "recommendation",
      "requirement-evaluation",
      "validation",
      "selection",
    ],
    relatedTerms: [
      "ai-recommendations",
      "vendor-selection",
      "requirement-based-evaluation",
      "commercial-evaluation",
    ],
  },
  {
    slug: "recommendation-vs-validation",
    a: "Recommendation",
    b: "Validation",
    title: "Recommendation vs Validation in AI Buying | Upstream Zero",
    summary:
      "Recommendation is being put forward. Validation is whether an evaluator can confirm you credibly meet a requirement. A recommendation can be withdrawn at validation when the evidence for a requirement is missing.",
    answer:
      "Recommendation is the system suggesting you; validation is the system confirming, against evidence, that you actually satisfy a requirement. A vendor can be recommended and then fail validation when the requirement is tested and the evidence is not there. Validation is where evidence strategy matters most.",
    aDef: "Recommendation is your company being put forward as a candidate within an answer.",
    bDef: "Validation is the stage where an evaluator checks whether a vendor credibly meets a requirement, using the evidence it can find.",
    overlap:
      "Both concern how an evaluator treats your company against a buyer's needs, and validation acts on the recommended set. Strong validation reinforces a recommendation.",
    difference:
      "Recommendation can rest on general relevance; validation demands specific evidence for a specific requirement. This is where a plausible-looking recommendation collapses if the proof an evaluator needs is missing.",
    lifecycle:
      "Recommendation is the recommendation stage; validation is the validation stage that follows requirement evaluation. Validation is where the evidence gap decides whether a recommendation survives.",
    lifecycleStages: ["recommendation", "validation"],
    relatedTerms: [
      "ai-recommendations",
      "evidence-strategy",
      "requirement-based-evaluation",
      "commercial-evaluation",
    ],
  },
  {
    slug: "ai-search-optimization-vs-traditional-seo",
    a: "AI Search Optimization",
    b: "Traditional SEO",
    title: "AI Search Optimization vs Traditional SEO | Upstream Zero",
    summary:
      "Traditional SEO optimizes ranking in link-based search. AI search optimization adapts to answer and generative systems that synthesize a response instead of returning a list. Both are discovery disciplines, not evaluation.",
    answer:
      "Traditional SEO targets ranking in a list of blue links. AI search optimization targets being retrieved, understood, and represented by systems that answer directly. The center of gravity shifts from ranking to citation and representation, but both remain about being found, not about surviving requirements or being selected.",
    aDef: "AI Search Optimization is the practice of adapting content and signals for AI-driven search and answer engines that synthesize responses.",
    bDef: "Traditional SEO is the practice of optimizing pages and signals to rank in conventional, link-based search results.",
    overlap:
      "Both rest on relevance, authority, structure, and technical hygiene, and traditional SEO fundamentals feed AI search optimization. Much of the underlying work is shared.",
    difference:
      "Traditional SEO competes for a click in a ranked list; AI search optimization competes for inclusion and accurate representation in a synthesized answer, often with no list. The success unit moves from ranking to citation.",
    lifecycle:
      "Both act at discovery and retrieval. They influence whether and how you appear. Whether you are then recommended, survive requirements, and are selected is what commercial evaluation measures.",
    lifecycleStages: ["discovery", "retrieval"],
    relatedTerms: [
      "ai-search-optimization",
      "ai-seo",
      "answer-engine-optimization",
      "commercial-evaluation",
    ],
  },
];

export function comparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
