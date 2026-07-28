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
    slug: "ai-visibility-tools-vs-upstream-zero",
    a: "AI Visibility Tools",
    b: "Upstream Zero",
    title:
      "AI Visibility Tools vs Upstream Zero: What Is the Difference? | Upstream Zero",
    summary:
      "AI visibility tools track whether you appear in AI answers. Upstream Zero studies why AI recommends one company over another. One measures presence; the other explains the outcome.",
    answer:
      "AI visibility tools monitor whether and how often you appear in ChatGPT and Google AI, and compare you against competitors. Upstream Zero studies how AI decides who to recommend: which requirement gets you cut, why a competitor survives, and what evidence would change it. Tools tell you if you show up; Upstream Zero tells you why you win or lose once you do.",
    aDef: "AI visibility tools are software that runs prompts on a schedule and reports how often you get mentioned, cited, and talked about in AI answers over time.",
    bDef: "Upstream Zero is a research company that studies how AI systems size up and recommend companies, and reports where a company gets cut and what would change the recommendation, along with the conditions behind each finding.",
    overlap:
      "Both look at how companies show up in AI answers, and both care about competitors. A team may use a visibility tool for presence and Upstream Zero for the decision behind it.",
    difference:
      "A visibility tool measures presence and reports a number; it does not explain why the number moved. Upstream Zero studies how AI decides who to recommend, under repeated and dated conditions, so a change can be traced to a specific requirement and cause. And because Upstream Zero does not sell a visibility product or the fix, it has no stake in the number it reports.",
    lifecycle:
      "Visibility tools work at the front, whether AI finds and mentions you, and track that over time. Upstream Zero works on the later steps: which companies AI recommends, which requirements it checks, and who gets chosen. That is where the winner is actually decided.",
    lifecycleStages: [
      "discovery",
      "retrieval",
      "recommendation",
      "requirement-evaluation",
      "selection",
    ],
    relatedTerms: [
      "ai-visibility-tools",
      "ai-visibility",
      "commercial-evaluation",
      "recommendation-intelligence",
    ],
  },
  {
    slug: "aeo-vs-geo",
    a: "AEO",
    b: "GEO",
    title: "AEO vs GEO: What Is the Difference? | Upstream Zero",
    summary:
      "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) both aim to get your content used by AI systems. AEO targets being quoted as the answer; GEO targets being represented in generated responses. Neither decides whether you survive a buyer's requirements.",
    answer:
      "AEO works on getting quoted directly by answer engines. GEO works on being represented well inside generative AI responses. They overlap heavily and are often used together, but both are about getting found and understood, not about whether AI recommends and picks you once a buyer applies their requirements.",
    aDef: "Answer Engine Optimization structures your content and metadata so answer engines pull you in and quote you, where success means getting cited.",
    bDef: "Generative Engine Optimization structures your content, entities, and authority so generative AI systems describe your company accurately in the answers they write.",
    overlap:
      "Both are about getting found and understood: clear structure, schema, credible sourcing, and consistent signals about who you are. In practice the tactics overlap so much that many teams treat them as one effort.",
    difference:
      "AEO is framed around being the quoted answer; GEO is framed around being well represented in a generated response. The distinction is mostly emphasis. Neither addresses what happens after you are found, when the buyer adds requirements and the list narrows.",
    lifecycle:
      "AEO and GEO both work at the front, getting found. They help you get onto the list AI considers. What decides who survives, who gets cut, and who is chosen happens later, in the steps Upstream Zero studies.",
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
      "SEO earns a spot in a ranked list of links a person clicks. AEO earns a place in the single answer an engine gives back. AEO is the natural next step from SEO for answer engines, but both stop at being found; neither decides whether AI recommends and chooses you once the buyer's requirements are applied.",
    aDef: "Answer Engine Optimization structures your content so an answer engine pulls it in and quotes it as the response, credited to you.",
    bDef: "Search Engine Optimization structures your content and signals so a search engine ranks your page high in a list of results.",
    overlap:
      "Both depend on relevance, credibility, clear structure, and technical hygiene, and good SEO practice feeds AEO. Much of the underlying content is shared.",
    difference:
      "SEO competes for a click in a list; AEO competes for a place in a written answer where there may be no list at all. Success shifts from a ranking to a citation. Both are still about being found.",
    lifecycle:
      "SEO and AEO both work at the front, getting found. They shape whether you show up at all. What decides who gets recommended and chosen picks up after that, when the buyer's requirements narrow the list.",
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
      "GEO (Generative Engine Optimization) and AI SEO overlap almost entirely: both adapt your content so AI systems find, understand, and describe you. The difference is mostly the label. Neither decides whether you survive a buyer's requirements.",
    answer:
      "GEO and AI SEO are near-synonyms for adapting your content and signals so AI systems find and describe you well. Any real difference is emphasis and wording. Both are about getting found and understood, and neither decides who gets recommended, survives, or is chosen.",
    aDef: "Generative Engine Optimization structures your content, entities, and authority so generative AI describes your company accurately in the answers it writes.",
    bDef: "AI SEO is the broad practice of tuning your content and technical signals for AI-driven search and answer systems.",
    overlap:
      "The tactics are effectively the same: structured content, schema, consistent signals about who you are, and credible sourcing aimed at AI systems. Teams often use the terms interchangeably.",
    difference:
      "GEO tends to emphasize how you are described inside a generated answer; AI SEO tends to be used as the umbrella label. In practice they overlap almost completely.",
    lifecycle:
      "Both work at the front, getting found. They shape whether and how you show up. The steps that decide who wins, from checking requirements through the final choice, are what Upstream Zero measures.",
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
    a: "Getting found by AI",
    b: "Getting chosen",
    title: "Getting Found by AI vs Getting Chosen | Upstream Zero",
    summary:
      "Getting found is whether an AI system can pull you up and mention you. Getting chosen is whether you survive a buyer's requirements and win. You can show up everywhere and still get cut at the first real requirement.",
    answer:
      "Getting found puts you in front of the buyer. Getting chosen is what happens next: AI applies the buyer's requirements, narrows the list, and settles who gets recommended and who wins. Upstream Zero studies how that decision gets made, not whether you show up.",
    aDef: "Getting found by AI is how well AI systems can pull up and mention your company when it is relevant.",
    bDef: "Getting chosen is what happens after you are found: whether you survive the buyer's requirements and get picked, much of which now happens through AI before you even know the buyer exists.",
    overlap:
      "Both are about how AI systems treat your company, and both start from being present in what the model knows. Being found is the price of entry for the decision that follows.",
    difference:
      "Visibility measures presence and mentions. Commercial evaluation measures whether you survive the buyer's requirements and get chosen. A company that shows up everywhere can still be the first cut when a real requirement is applied; a company that evaluates well turns presence into a recommendation and a win.",
    lifecycle:
      "AI visibility works at the front, getting found. Commercial evaluation covers the recommendation, the requirement checks, the validation, the final choice, and the measurement after. Being found is the first step of the same loop that ends in real business results.",
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
      "Retrieval is whether an AI system finds you at all. Recommendation is whether it puts you forward as an answer. You have to be found before you can be recommended, but the two are decided by different things.",
    answer:
      "Retrieval is the system finding and pulling up your content; recommendation is the system putting you forward as a suggested company. You have to be found before you can be recommended, but a company that gets found can still fail to be recommended once the buyer's requirements come into play.",
    aDef: "Retrieval is the step where an AI system finds and pulls up content or companies relevant to a question.",
    bDef: "Recommendation is the step where the system puts specific companies forward as its answer, drawn from what it found and reshaped by the buyer's requirements.",
    overlap:
      "Recommendation depends on being found: you cannot be recommended if you were never pulled up. Both are early steps that AI now runs in the buying process.",
    difference:
      "Getting-found work (AEO, GEO) improves whether you show up. Recommendation is decided by how you stack up against the buyer's requirements once you do. Showing up more does not guarantee a recommendation.",
    lifecycle:
      "First AI finds you, then it decides whether to recommend you. The gap between those two is exactly where getting-found work stops and how AI decides who to recommend begins.",
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
      "A recommendation puts you on the shortlist. Selection is being chosen from it. You can be recommended and still not chosen if a later requirement cuts you or a competitor proves its case better.",
    answer:
      "Recommendation is being put forward as a candidate; selection is being the one chosen. A recommendation gets you onto the shortlist; the win is decided by the requirements and proof that follow. Being recommended is necessary but not enough to be chosen.",
    aDef: "Recommendation is the system putting your company forward as a suggested option within a group.",
    bDef: "Selection is the final choice of one company from the shortlist, at the end of the buyer's decision.",
    overlap:
      "Both come out of the same buyer decision, and the winner is chosen from the shortlist. Moving up on the shortlist generally improves your odds of winning, all else equal.",
    difference:
      "A recommendation is one of several and comes early; the win is a single choice and comes last. In between sit the requirements and proof that can still cut a recommended company. Surviving all the way to the win is a harder test than making the shortlist.",
    lifecycle:
      "First AI recommends you, then the buyer makes the final choice near the end. Checking requirements and confirming the proof sit between them and decide who survives.",
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
      "Recommendation is being put forward. Validation is whether AI can confirm you really meet a requirement. A recommendation can fall apart at validation when the proof for a requirement is missing.",
    answer:
      "Recommendation is the system suggesting you; validation is the system confirming, against evidence, that you actually meet a requirement. A company can be recommended and then fail validation when the requirement is tested and the proof is not there. Validation is where having the right evidence matters most.",
    aDef: "Recommendation is your company being put forward as a candidate within an answer.",
    bDef: "Validation is the step where AI checks whether a company really meets a requirement, using the evidence it can find.",
    overlap:
      "Both are about how AI treats your company against what the buyer needs, and validation works on the companies already recommended. Passing validation cleanly backs up a recommendation.",
    difference:
      "A recommendation can rest on general relevance; validation demands specific proof for a specific requirement. This is where a good-looking recommendation collapses if the proof AI needs is missing.",
    lifecycle:
      "First AI recommends you, then it validates you after checking the requirement. Validation is where a missing piece of proof decides whether the recommendation survives.",
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
      "Traditional SEO improves your ranking in link-based search. AI search optimization adapts to answer and generative systems that write a response instead of returning a list. Both are about getting found, not about how AI decides who wins.",
    answer:
      "Traditional SEO aims for a high spot in a list of blue links. AI search optimization aims to be found, understood, and described accurately by systems that answer directly. The focus shifts from ranking to being cited and described well, but both are still about being found, not about surviving requirements or being chosen.",
    aDef: "AI Search Optimization is the practice of adapting your content and signals for AI-driven search and answer engines that write a response instead of listing links.",
    bDef: "Traditional SEO is the practice of tuning your pages and signals to rank in ordinary, link-based search results.",
    overlap:
      "Both rest on relevance, credibility, structure, and technical hygiene, and solid SEO basics feed AI search optimization. Much of the underlying work is shared.",
    difference:
      "Traditional SEO competes for a click in a ranked list; AI search optimization competes to be included and described accurately in a written answer, often with no list at all. Success moves from a ranking to a citation.",
    lifecycle:
      "Both work at the front, getting found. They shape whether and how you show up. Whether AI then recommends you, whether you survive the requirements, and whether you get chosen is what Upstream Zero measures.",
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
