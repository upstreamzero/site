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
  h1?: string; // override the default "What is {title}?" heading (for question and explainer pages)
  eyebrow?: string; // override the kind-derived eyebrow label
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
    limitations: "Commercial evaluation is a process to understand and measure, not a lever to pull directly. Observing where you are eliminated does not by itself change the outcome; it tells you what must become true. And what is observable today is the AI evaluator's behavior, not the human buying committee, so generalization runs through a bridge hypothesis.",
    lifecycle: "Commercial evaluation is the lifecycle. It runs from AI-mediated buying through recommendation, requirement evaluation, validation, and selection, and loops back to business outcomes through measurement. Every other term names a part of it.",
    lifecycleStages: ["ai-mediated-buying", "recommendation", "requirement-evaluation", "validation", "selection", "measurement"],
    businessLogic: "The evaluation decides who a buyer selects, and selection is where pipeline, win rates, and revenue are realized. Improving your position in the evaluation is the mechanism behind those outcomes, but whether they improve depends on execution across every stage. Upstream Zero measures the movement; it does not promise the number.",
    relatedTerms: ["ai-visibility", "recommendation-intelligence", "ai-recommendations", "requirement-based-evaluation", "vendor-selection", "evidence-strategy"],
    relatedComponents: ["recommendation-survivability", "vendor-elimination", "validation-and-evidence", "recommendation-set-formation"],
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
    limitations: "Presence alone does not reveal recommendation strength, recommendation order, requirement fit, validation quality, or selection likelihood. AI visibility tells you that a company appears; it does not tell you whether it is recommended first, whether it survives the requirements a buyer adds, or whether it is [eliminated](/concepts/vendor-elimination) once the field narrows. A company can be highly visible and never become the logical choice.",
    lifecycle: "AI visibility spans discovery and retrieval: whether and how often a company, product, or brand appears across AI-generated answers and buying environments. It is the broadest of the market terms, because it measures presence rather than any single mechanism. After presence, the evaluation decides what matters: the company may enter but rank behind a better-fitting alternative, be eliminated when a requirement is added, lack validation evidence, or lose frontrunner status during follow-up questions. Visibility is necessary; it is not [recommendation survivability](/concepts/recommendation-survivability).",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Organizations invest in AI visibility to be present in the buying conversations that increasingly happen through AI. That presence can be evaluated alongside qualified pipeline and ICP alignment. But visibility without evaluation survivability may not create qualified opportunity: appearing in an answer is not the same as surviving the requirements that decide the shortlist. Upstream Zero measures whether recommendation behavior moves as requirements are applied; it does not assume presence produces pipeline.",
    relatedTerms: ["answer-engine-optimization", "generative-engine-optimization", "ai-search-optimization", "commercial-evaluation", "recommendation-intelligence"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "Visibility answers 'can the system find me?' It does not answer 'does the system recommend me when a real buyer describes their requirements?' Those are different questions, and the second is the one that closes deals.",
      "A evaluation audit starts where visibility work ends: it observes what happens after you are found, when requirements are applied and companies are eliminated.",
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
    slug: "ai-visibility-tools",
    term: "AI Visibility Tools",
    aka: "AEO and GEO tools",
    kind: "tactic",
    h1: "AI visibility tools: what they do, and the question they cannot answer",
    eyebrow: "Tools and platforms",
    summary:
      "AI visibility tools track whether your brand appears in ChatGPT and Google AI answers. They report presence. They do not tell you why AI recommends a competitor over you, or which requirement removed you.",
    definition:
      "AI visibility tools, also called AEO tools, GEO tools, or AI visibility software, monitor whether and how your company appears in AI-generated answers across assistants like ChatGPT and Google AI. They report mentions, citations, and share of voice against your competitors.",
    mechanics:
      "They run a set of sample prompts against AI systems on a schedule, record which brands are named and cited, and track those mentions over time and against competitors. The output is a presence score and a trend line.",
    matters:
      "If you cannot tell whether AI mentions you, you are working blind in a channel that increasingly shapes buying. Visibility tools give you the first read: whether you are in the conversation at all.",
    limitations:
      "A visibility score tells you that you appeared. It does not tell you why a competitor was recommended over you, at which requirement you dropped out, or what evidence would change the result. Two tools often report very different scores for the same company because they test different prompts, on different schedules, against different models, and most never show the raw output. Presence is measured; the [evaluation](/learn/commercial-evaluation) that decides who is chosen is not.",
    lifecycle:
      "AI visibility tools act at discovery and retrieval: whether you appear and how often. They stop where the [recommendation](/concepts/recommendation-set-formation) is decided. After you appear, a buyer adds requirements, the field narrows, and companies are [eliminated](/concepts/vendor-elimination). A tool that tracks mentions cannot see that elimination happen.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic:
      "Teams buy visibility tools to prove they are present in AI answers and to benchmark against competitors. Presence can be tracked alongside pipeline, but presence is not the outcome: appearing in an answer is not the same as surviving the requirements that produce the shortlist. Upstream Zero measures whether the recommendation itself moves as requirements are applied, which is a different question than how often you are mentioned.",
    relatedTerms: [
      "ai-visibility",
      "are-we-showing-up-in-ai",
      "ai-search-monitoring",
      "answer-engine-optimization",
      "generative-engine-optimization",
      "commercial-evaluation",
    ],
    relatedComponents: ["recommendation-set-formation", "vendor-elimination"],
    reframe: [
      "AI visibility tools answer 'am I showing up?' That is a real question and a useful floor. But being mentioned is not being recommended. The moment a buyer says the product must integrate with their systems or meet their compliance requirement, presence does nothing and fit decides the outcome.",
      "Upstream Zero is not a visibility tool and does not sell one. We study the evaluation that runs after you appear: which requirement removes you, why a competitor survives, and what evidence would change the recommendation. Because we do not sell the fix, we can tell you honestly where you actually stand. See [how visibility tools compare to Upstream Zero](/compare/ai-visibility-tools-vs-upstream-zero).",
    ],
    faqs: [
      {
        q: "What is the best AI visibility tool?",
        a: "It depends what you need. If you want to monitor whether you appear in AI answers and benchmark competitors, several tools do that well. If you want to understand why AI recommends a competitor over you and what changes it, that is a different question presence tracking does not answer, and it is what Upstream Zero studies.",
      },
      {
        q: "Do AI visibility tools tell you why competitors are recommended?",
        a: "No. They report that a competitor appeared. They do not reconstruct the evaluation that recommended it, the requirement that eliminated you, or the evidence that would change the result. That is the gap between visibility and being chosen.",
      },
      {
        q: "Why do AI visibility tools give different scores for the same company?",
        a: "Because they test different prompts, on different schedules, against different AI models, and most do not show the raw prompts or outputs. The same company can score very differently across tools, which is why presence numbers are a starting point, not an answer.",
      },
    ],
  },
  {
    slug: "are-we-showing-up-in-ai",
    term: "Are We Showing Up in AI?",
    kind: "tactic",
    h1: "Are we showing up in AI?",
    eyebrow: "Getting found in AI",
    summary:
      "Buyers now ask ChatGPT and Google AI for recommendations. 'Are we showing up?' is the right first question and the wrong last one. Here is how to check, and what showing up does and does not get you.",
    definition:
      "Showing up in AI means appearing when someone asks an AI assistant like ChatGPT or Google AI for options in your category. It is the AI-era version of appearing in search results: the entry ticket to being considered.",
    mechanics:
      "Whether you appear depends on whether AI systems can find, read, and correctly describe your company from the sources they draw on. If your information is missing, inconsistent, or unclear, the system cannot surface you accurately, or at all.",
    matters:
      "If you never appear, you are never considered, and you will not know it, because there is no lost deal to review. Checking whether you show up is the first honest read on your position in AI-mediated buying.",
    limitations:
      "Showing up tells you that you were mentioned. It does not tell you whether you were recommended, whether you survived the buyer's next requirement, or why a competitor was chosen instead. The most common and expensive mistake is treating presence as the goal: companies that show up reliably are eliminated every day the moment a real requirement is applied.",
    lifecycle:
      "Showing up is discovery and retrieval, the front of the [commercial evaluation lifecycle](/learn/commercial-evaluation). Everything that decides who is chosen happens after it: the [recommendation forms](/concepts/recommendation-set-formation), requirements narrow the field, and companies are [eliminated](/concepts/vendor-elimination). Presence gets you to the start line.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic:
      "It is worth confirming you show up in AI, because presence is the precondition for everything after it. But presence is not pipeline. The companies that win in AI-mediated buying are the ones that survive the requirements a buyer adds, which is a different measurement than whether you are mentioned. Upstream Zero measures the second.",
    relatedTerms: [
      "ai-visibility",
      "ai-visibility-tools",
      "chatgpt-recommendations",
      "google-ai-mode",
      "commercial-evaluation",
    ],
    relatedComponents: ["recommendation-set-formation", "vendor-elimination"],
    reframe: [
      "'Are we showing up?' is where every company starts, and it is the right place to start. But the more important question arrives one step later: when a buyer describes what they actually need, are you still recommended, or does a competitor take your place?",
      "Upstream Zero picks up exactly there. We do not sell you more visibility. We show you what happens after you appear, on ChatGPT and Google AI: which requirement removes you, why a competitor survives, and what would have to become true for the recommendation to change.",
    ],
    faqs: [
      {
        q: "How do I check if my company shows up in ChatGPT?",
        a: "Ask ChatGPT the questions a buyer in your category would ask, in a fresh session, and see whether you are named and how you are described. Repeat across a few phrasings and on Google AI as well. This gives you a first read, though it is a snapshot, not a measurement.",
      },
      {
        q: "We show up in AI but still lose. Why?",
        a: "Because showing up is not being chosen. AI recommends the company that best fits the requirements the buyer adds, and you can appear in the opening answer and be eliminated the moment a real requirement is applied. That elimination is what Upstream Zero studies.",
      },
      {
        q: "Is showing up in AI the same as AI visibility?",
        a: "Roughly, yes: both describe presence. The point of this page is that presence is the floor, not the goal. The question that decides outcomes is whether you survive the buyer's requirements once you appear.",
      },
    ],
  },
  {
    slug: "ai-search-monitoring",
    term: "AI Search Monitoring",
    aka: "AI citation tracking",
    kind: "tactic",
    h1: "AI search monitoring: tracking movement, and what it leaves out",
    eyebrow: "Measurement",
    summary:
      "AI search monitoring tracks how your brand appears in ChatGPT and Google AI over time: mentions, citations, and share of voice. It shows movement. It does not explain why the recommendation changed or whether your work caused it.",
    definition:
      "AI search monitoring, also called AI citation tracking, is the ongoing measurement of how your company appears in AI-generated answers: which prompts surface you, how often you are cited, and how that changes over time and against competitors.",
    mechanics:
      "A monitoring tool re-runs a set of prompts on a schedule and records the results, building a time series of mentions, citations, and position. You watch the line move up or down.",
    matters:
      "Once you invest in being present in AI answers, you want to know whether it is working. Monitoring gives you a trend: are you mentioned more or less often than last month, and than your competitors.",
    limitations:
      "A trend line shows that something changed. It does not show why. Monitoring cannot tell you which requirement removed you when the recommendation shifted, why a competitor overtook you, or whether your own work caused the movement rather than a model update or a change in the prompts tested. Movement without cause is a number you cannot act on.",
    lifecycle:
      "AI search monitoring measures the [lifecycle](/learn/commercial-evaluation) from the outside: it observes the output, who is mentioned, over time. It does not observe the mechanism, why. Cause lives in the [recommendation](/concepts/recommendation-set-formation) and [elimination](/concepts/vendor-elimination) steps, which a mention count does not reach.",
    lifecycleStages: ["measurement"],
    businessLogic:
      "Monitoring is bought to prove progress and justify spend. But a mention trend is a weak proxy for commercial outcome, because being mentioned more often is not the same as surviving the requirements that decide the shortlist, and the trend rarely separates your work from model and prompt changes. Upstream Zero measures whether the recommendation itself moves when requirements are applied, and reports the conditions, so the movement can be attributed rather than merely observed.",
    relatedTerms: [
      "ai-visibility",
      "ai-visibility-tools",
      "ai-search-optimization",
      "commercial-evaluation",
      "recommendation-intelligence",
    ],
    relatedComponents: ["recommendation-stability", "competitor-displacement"],
    reframe: [
      "Monitoring answers 'did my mentions go up?' The commercial question is 'did the recommendation change, and did my work cause it?' A mention count moving is not evidence that you are more likely to be chosen, or that anything you did moved it.",
      "Upstream Zero measures the recommendation under controlled, repeated conditions on ChatGPT and Google AI, so a change can be tied to a requirement and a cause, not just charted. Because the runs are conditioned and dated, the movement is attributable.",
    ],
    faqs: [
      {
        q: "Is AI search monitoring the same as AI visibility tracking?",
        a: "Largely yes: both track how often and where you appear in AI answers over time. The limitation is the same too: they show movement in mentions, not the cause of a change in the recommendation or whether your work produced it.",
      },
      {
        q: "How do I know if my AI optimization is working?",
        a: "A mention trend is a weak answer, because it does not separate your work from model updates or prompt changes, and being mentioned more is not the same as being recommended more. The stronger measure is whether the recommendation moves when requirements are applied, under repeated, dated conditions.",
      },
      {
        q: "Why did my AI mentions change?",
        a: "It could be your work, a model update, a change in the prompts a tool tests, or normal variation between runs. Monitoring alone usually cannot tell you which, which is why movement needs conditions and controls to be attributable.",
      },
    ],
  },
  {
    slug: "how-ai-recommends-vendors",
    term: "How AI Recommends Vendors",
    kind: "concept",
    h1: "How AI recommends vendors",
    eyebrow: "How it works",
    summary:
      "When a buyer asks ChatGPT or Google AI for the best option in a category, the system does not rank a fixed list. It builds a recommendation from the buyer's requirements, and it changes as the requirements change.",
    definition:
      "AI vendor recommendation is how assistants like ChatGPT and Google AI answer a buying question: they interpret what the buyer needs, compare candidates against those requirements, and return a short recommendation, narrowing the field as the buyer adds detail.",
    mechanics:
      "A buyer asks a broad question and gets a broad set. As they add requirements, integration, compliance, scale, budget, the system re-matches candidates against the current requirements and removes those that do not fit. The recommendation at the end reflects the full requirement set, not the opening question.",
    matters:
      "This is why you can be recommended for the generic question and gone by the specific one. The recommendation is not a ranking of who is best overall; it is a match against what this buyer needs, rebuilt at each step. Understanding that is how you learn where you are actually lost.",
    limitations:
      "What is observable today is the AI evaluator's behavior on ChatGPT and Google AI, not the human buying committee behind it. The two are related but not identical, so reading the evaluator is a strong signal about how AI-mediated buying behaves, not a direct readout of a person's decision. Upstream Zero reports what was observed and under what conditions, and marks what remains uncertain.",
    lifecycle:
      "This is the core of the [commercial evaluation lifecycle](/learn/commercial-evaluation): [recommendation formation](/concepts/recommendation-set-formation), [requirement evaluation](/learn/requirement-based-evaluation), and [elimination](/concepts/vendor-elimination). Discovery and retrieval get you into the opening answer; this is what decides who survives it.",
    lifecycleStages: ["recommendation", "requirement-evaluation", "selection"],
    businessLogic:
      "Because the recommendation is rebuilt from requirements, the lever that matters is fit and the evidence of fit, not presence. A company improves its position by surviving more of the requirements a real buyer applies, which Upstream Zero measures directly on ChatGPT and Google AI. Whether that improves pipeline depends on execution beyond the evaluation; the evaluation is where it starts.",
    relatedTerms: [
      "chatgpt-recommendations",
      "google-ai-mode",
      "requirement-based-evaluation",
      "commercial-evaluation",
      "ai-recommendations",
    ],
    relatedComponents: [
      "recommendation-set-formation",
      "vendor-elimination",
      "recommendation-survivability",
    ],
    reframe: [
      "It is tempting to think AI ranks vendors the way a list ranks results. It does not. It constructs a recommendation from the buyer's requirements, and one new requirement can change who is recommended. There is no permanent best; there is the best fit for what is being asked.",
      "Upstream Zero studies this directly on ChatGPT and Google AI: how the recommendation forms, which requirement removes a company, and what evidence would change the outcome. Perplexity, Gemini, and Copilot are where this expands next, as the evidence base grows.",
    ],
    faqs: [
      {
        q: "How does ChatGPT decide which vendors to recommend?",
        a: "It interprets the buyer's question, compares candidates against the requirements it infers, and returns a short recommendation. As the buyer adds requirements, it re-matches and removes candidates that no longer fit, so the final answer reflects the full requirement set, not the opening question.",
      },
      {
        q: "Why does the recommendation change when I add details?",
        a: "Because the recommendation is a match against requirements, not a fixed ranking. Each requirement you add changes the match, and a company that fit the general question can be eliminated the moment a specific requirement is applied.",
      },
      {
        q: "Does Upstream Zero cover Perplexity, Gemini, and Copilot?",
        a: "Version 1 focuses on ChatGPT and Google AI, where our research and evidence are strongest and where buyers most commonly begin. Perplexity, Gemini, and Copilot are planned expansions, added as our documented evidence on them grows.",
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
    limitations: "Being understandable or usable while an answer is generated does not mean the company will be recommended for a buyer's particular requirement set. GEO shapes how a generative system represents you as it composes a response; it does not decide whether you enter the [recommendation set](/concepts/recommendation-set-formation), survive a follow-up requirement, or clear [validation](/concepts/validation-and-evidence). A company can be represented accurately and still be eliminated when a requirement is applied.",
    lifecycle: "GEO acts at discovery and retrieval, at the moment a generative system interprets sources and synthesizes an answer. Its job is accurate representation while the response is built. After that point the evaluation continues, and the company may fail to enter the recommendation set, enter but rank behind a better-fitting alternative, be eliminated when the buyer adds a requirement, lack the evidence to clear validation, or lose [frontrunner status](/concepts/frontrunner-movement) during follow-up questions. Representation is where [commercial evaluation](/learn/commercial-evaluation) starts, not where it is decided.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Organizations invest in GEO for representation quality: whether they enter the initial consideration set accurately described. That presence can be evaluated alongside qualified pipeline and ICP alignment. Whether it contributes to those outcomes depends on whether the company then fits the requirements the buyer adds and survives [requirement-based evaluation](/learn/requirement-based-evaluation). Upstream Zero measures whether recommendation behavior moves; it does not assume accurate representation produces the outcome.",
    relatedTerms: ["answer-engine-optimization", "ai-seo", "ai-search-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
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
    limitations: "Search discoverability and citation performance do not explain how a company is compared, eliminated, validated, or selected once the evaluation begins. AI SEO improves whether you are found and cited across search experiences; it does not decide whether you fit a buyer's requirement, clear [validation](/concepts/validation-and-evidence), or survive follow-up questions. Being discoverable is the entry, not the decision.",
    lifecycle: "AI SEO acts at discovery and retrieval, across both traditional and AI-mediated search: making a company discoverable and correctly surfaced. It is an acquisition-and-entry discipline. What happens after entry is decided by fit and evidence: the company may fail to enter the [recommendation set](/concepts/recommendation-set-formation), rank behind a better-fitting alternative, be eliminated when a requirement is added, or fail to clear validation. Discoverability gets you into the evaluation; it does not carry you through it.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Organizations invest in AI SEO to acquire attention and enter more evaluations. That entry can be evaluated alongside qualified pipeline and top-of-funnel ICP alignment. Whether it converts depends on downstream fit and evidence: visibility survives only if the company also survives [requirement-based evaluation](/learn/requirement-based-evaluation). Upstream Zero measures whether recommendation behavior moves through that evaluation; it does not assume discoverability produces revenue.",
    relatedTerms: ["ai-search-optimization", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
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
    limitations: "LLM optimization improves whether language models retrieve, understand, and represent you. It does not guarantee recommendation, does not guarantee surviving requirements, and does not guarantee selection.",
    lifecycle: "LLM optimization acts at discovery and retrieval. It shapes how a model represents you; commercial evaluation decides who is recommended and selected.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Organizations invest in LLM optimization because better model representation may increase the likelihood of entering AI-mediated evaluations. Whether that contributes to stronger pipeline, better ICP alignment, higher win rates, faster deal cycles, revenue, retention, or expansion depends on how the organization performs through the remainder of the evaluation. Upstream Zero measures those downstream changes rather than assuming model representation alone creates commercial success.",
    relatedTerms: ["ai-seo", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
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
    limitations: "AI search optimization improves whether AI search and answer systems surface and represent you. It does not guarantee recommendation, does not guarantee surviving requirements, and does not guarantee selection.",
    lifecycle: "AI search optimization acts at discovery and retrieval. It affects whether you are surfaced; the recommendation, requirement, validation, and selection stages decide the outcome.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Organizations invest in AI search optimization because better surfacing may increase the likelihood of entering AI-mediated evaluations. Whether that contributes to stronger pipeline, better ICP alignment, higher win rates, faster deal cycles, revenue, retention, or expansion depends on how the organization performs through the remainder of the evaluation. Upstream Zero measures those downstream changes rather than assuming surfacing alone creates commercial success.",
    relatedTerms: ["ai-seo", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
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
    limitations: "Observing one surface tells you about that surface, not others; behavior differs across evaluators, so a result here is not a universal claim. A surface shows where evaluation happens; it does not by itself tell you why you were eliminated or what would change it.",
    lifecycle: "Google AI Mode is a surface where retrieval and recommendation are observed. It is one window into the evaluation lifecycle, not the lifecycle itself.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you perform on a given surface may affect whether you enter the evaluations that run there. Whether that contributes to pipeline, ICP fit, win rates, or revenue depends on the rest of the evaluation and on how buyers use the surface. Upstream Zero discloses which surface each observation came from and measures movement rather than assuming one surface creates commercial success.",
    relatedTerms: ["chatgpt-recommendations", "google-ai-overviews", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
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
    limitations: "Observing one surface tells you about that surface, not others; behavior differs across evaluators, so a result here is not a universal claim. A surface shows where evaluation happens; it does not by itself tell you why you were eliminated or what would change it.",
    lifecycle: "ChatGPT recommendations are the recommendation stage as it appears on that surface. It is one window into the evaluation lifecycle, not the whole of it.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you perform on a given surface may affect whether you enter the evaluations that run there. Whether that contributes to pipeline, ICP fit, win rates, or revenue depends on the rest of the evaluation and on how buyers use the surface. Upstream Zero discloses which surface each observation came from and measures movement rather than assuming one surface creates commercial success.",
    relatedTerms: ["google-ai-mode", "google-ai-overviews", "ai-recommendations", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
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
    limitations: "Observing one surface tells you about that surface, not others; behavior differs across evaluators, so a result here is not a universal claim. A surface shows where evaluation happens; it does not by itself tell you why you were eliminated or what would change it.",
    lifecycle: "Google AI Overviews sit at retrieval and recommendation on that surface, summarizing a set. They are one window into the evaluation lifecycle, not the lifecycle itself.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you perform on a given surface may affect whether you enter the evaluations that run there. Whether that contributes to pipeline, ICP fit, win rates, or revenue depends on the rest of the evaluation and on how buyers use the surface. Upstream Zero discloses which surface each observation came from and measures movement rather than assuming one surface creates commercial success.",
    relatedTerms: ["google-ai-mode", "chatgpt-recommendations", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
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
    limitations: "Commercial buying AI names the shift, not a lever. Knowing that buying decisions increasingly begin with AI does not tell you where you are eliminated or what would change it; that has to be observed for your category.",
    lifecycle: "Commercial buying AI spans the front of the lifecycle, from AI-mediated buying through recommendation, where systems begin to shape the decision before a buyer engages you.",
    lifecycleStages: ["ai-mediated-buying", "recommendation"],
    businessLogic: "Organizations care about commercial buying AI because more of the buying decision now forms before a salesperson is involved. Whether that shift helps or hurts your pipeline, fit, win rates, or revenue depends on how you perform in the evaluation those systems run. Upstream Zero measures that performance rather than assuming presence in AI creates commercial success.",
    relatedTerms: ["commercial-evaluation", "ai-recommendations", "recommendation-intelligence", "ai-visibility"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
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
        a: "Start with a Evaluation Audit: a structured observation of how current systems evaluate, recommend, or eliminate you, with prioritized decisions.",
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
      "In the commercial evaluation lifecycle, AEO sits at the very front: retrieval and mention. It helps you enter the recommendation set, where recommendation set formation, vendor elimination, and recommendation survivability take over. Getting quoted is the start of the process, not the decision.",
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
      "recommendation-survivability",
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
      "recommendation-survivability",
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
      "recommendation-survivability",
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
      "Requirement-based evaluation is the requirement-evaluation stage, the center of the lifecycle. It sits between recommendation and validation and is where recommendation survivability, vendor elimination, and frontrunner movement all play out.",
    lifecycleStages: ["requirement-evaluation"],
    businessLogic:
      "The commercial logic is direct: requirements decide the shortlist, and the shortlist decides the deals you are in. Surviving the requirements that matter in your category is what keeps you in contention for pipeline and win rates. Upstream Zero identifies those requirements and measures whether your position on them moves; it does not promise a downstream number.",
    relatedComponents: [
      "requirement-interpretation",
      "vendor-elimination",
      "recommendation-survivability",
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
        a: "By observing a category run through realistic requirement sequences and recording where you drop out. That is what a Evaluation Audit produces.",
      },
    ],
  },
];

export const HUB_PILLAR = PILLARS.find((p) => p.hub)!;
