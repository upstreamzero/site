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
  { key: "ai-mediated-buying", label: "Buying through AI" },
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
    term: "How AI decides who to recommend",
    kind: "concept",
    hub: true,
    summary:
      "It is how a buyer decides which company to consider, check out, and finally choose. More and more, that decision happens through AI, before you even know the buyer exists.",
    definition:
      "Commercial Evaluation is how a buyer, or an AI acting on their behalf, compares a large field of possible vendors and narrows it to a short list, based on what the buyer needs.",
    mechanics:
      "A buyer describes a problem. The system works out what they need and checks each company against it. Some get cut, one becomes the pick. Every new requirement can change who is left standing.",
    matters:
      "By the time a buyer reaches you, they already have a shortlist, built by a process you usually never see. Understanding that process is how you learn why competitors get chosen and where you get cut.",
    limitations: "This is something to understand and measure, not a switch you can flip. Seeing where you get cut does not change the result on its own; it tells you what would have to become true. And what we can watch today is how the AI behaves, not the people on the buying committee, so applying one to the other is still an assumption we flag.",
    lifecycle: "Commercial evaluation is the whole journey. It runs from buying through AI, to the shortlist, to matching what the buyer needs, to checking the evidence, to the final choice, and loops back to business results through measurement. Every other term here names a part of it.",
    lifecycleStages: ["ai-mediated-buying", "recommendation", "requirement-evaluation", "validation", "selection", "measurement"],
    businessLogic: "This decision is where a buyer picks a winner, and that is where pipeline, win rates, and revenue come from. Improving your standing in it is what drives those results, but whether they actually improve depends on how you execute at every step. Upstream Zero measures the movement; it does not promise the number.",
    relatedTerms: ["ai-visibility", "recommendation-intelligence", "ai-recommendations", "requirement-based-evaluation", "vendor-selection", "evidence-strategy"],
    relatedComponents: ["recommendation-survivability", "vendor-elimination", "validation-and-evidence", "recommendation-set-formation"],
    reframe: [
      "Most of the terms below (AI visibility, GEO, AI SEO) are about getting found. Commercial evaluation is about getting chosen. Being found is necessary, but it is not the same as holding up once a real buyer says what they need.",
      "Upstream Zero studies that decision directly. AI is simply where it is easiest to watch right now. The tools will change; the decision itself will not.",
    ],
    faqs: [
      {
        q: "Is commercial evaluation the same as AI visibility?",
        a: "No. Visibility is whether a system can find and mention you. Commercial evaluation is whether you hold up against what a real buyer needs and become the pick. You can be very visible and still get cut at the first real requirement.",
      },
      {
        q: "Can commercial evaluation be measured?",
        a: "Parts of it, through AI: which companies get recommended, which requirements cut them, and how the shortlist changes as requirements pile up. Upstream Zero measures that and reports it with its conditions and limits.",
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
      "If a system cannot find or correctly describe you, you cannot be considered at all. Visibility is the ticket in the door, not the win.",
    limitations: "Showing up tells you nothing about whether you are recommended first, whether you fit what the buyer needs, whether the evidence holds up, or whether you get chosen. AI visibility tells you a company appears; it does not tell you whether it survives the requirements a buyer adds, or whether it gets [cut](/concepts/vendor-elimination) once the list narrows. A company can be very visible and never become the obvious choice.",
    lifecycle: "AI visibility covers whether and how often a company, product, or brand shows up across AI answers and buying moments. It is the broadest of these terms, because it measures presence rather than any one thing. After you appear, the real decision takes over: you might enter but rank behind a better fit, get cut when a requirement is added, have no evidence to back you up, or lose the lead during follow-up questions. Showing up is necessary; it is not the same as [holding your spot](/concepts/recommendation-survivability).",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Companies invest in AI visibility to be present in the buying conversations that increasingly happen through AI. That presence can be weighed alongside qualified pipeline and how well the leads fit your ideal customer. But showing up without holding up may not create real opportunity: appearing in an answer is not the same as surviving the requirements that decide the shortlist. Upstream Zero measures whether the recommendation moves as requirements are applied; it does not assume showing up produces pipeline.",
    relatedTerms: ["answer-engine-optimization", "generative-engine-optimization", "ai-search-optimization", "commercial-evaluation", "recommendation-intelligence"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "Visibility answers 'can the system find me?' It does not answer 'does the system recommend me when a real buyer says what they need?' Those are different questions, and the second is the one that closes deals.",
      "An evaluation audit starts where visibility work ends: it watches what happens after you are found, when the buyer's requirements come in and companies start getting cut.",
    ],
    faqs: [
      {
        q: "Do you improve AI visibility?",
        a: "We are not a visibility agency and we do not promise rankings or inclusion. We measure and explain how AI systems weigh you today, including whether visibility is even your real problem, and hand you a ranked list of decisions.",
      },
      {
        q: "Is more visibility always better?",
        a: "Not on its own. Being visible in a race you then lose at the first requirement does not help. The useful question is where you are actually being knocked out.",
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
      "A visibility score tells you that you appeared. It does not tell you why a competitor was recommended over you, at which requirement you dropped out, or what evidence would change the result. Two tools often report very different scores for the same company because they test different prompts, on different schedules, against different models, and most never show the raw output. Showing up is measured; the [decision](/learn/commercial-evaluation) about who gets chosen is not.",
    lifecycle:
      "AI visibility tools work at the front, on whether you appear and how often. They stop where the [shortlist](/concepts/recommendation-set-formation) is decided. After you appear, a buyer adds requirements, the field narrows, and companies get [cut](/concepts/vendor-elimination). A tool that counts mentions cannot see that happen.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic:
      "Teams buy visibility tools to prove they show up in AI answers and to benchmark against competitors. You can track that alongside pipeline, but showing up is not the win: appearing in an answer is not the same as surviving the requirements that produce the shortlist. Upstream Zero measures whether the recommendation itself moves as requirements are applied, which is a different question than how often you get mentioned.",
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
      "AI visibility tools answer 'am I showing up?' That is a real question and a useful floor. But being mentioned is not being recommended. The moment a buyer says the product must plug into their systems or meet their compliance requirement, showing up does nothing and fit decides the outcome.",
      "Upstream Zero is not a visibility tool and does not sell one. We study what happens after you appear: which requirement removes you, why a competitor survives, and what evidence would change who AI recommends. Because we do not sell the fix, we can tell you honestly where you actually stand. See [how visibility tools compare to Upstream Zero](/compare/ai-visibility-tools-vs-upstream-zero).",
    ],
    faqs: [
      {
        q: "What is the best AI visibility tool?",
        a: "It depends what you need. If you want to monitor whether you appear in AI answers and benchmark competitors, several tools do that well. If you want to understand why AI recommends a competitor over you and what changes it, that is a different question presence tracking does not answer, and it is what Upstream Zero studies.",
      },
      {
        q: "Do AI visibility tools tell you why competitors are recommended?",
        a: "No. They report that a competitor appeared. They do not reconstruct why it was recommended, the requirement that cut you, or the evidence that would change the result. That is the gap between showing up and being chosen.",
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
      "Showing up tells you that you were mentioned. It does not tell you whether you were recommended, whether you survived the buyer's next requirement, or why a competitor was chosen instead. The most common and expensive mistake is treating showing up as the goal: companies that appear reliably get cut every day the moment a real requirement lands.",
    lifecycle:
      "Showing up is the very front of [how a buyer decides](/learn/commercial-evaluation). Everything that settles who is chosen happens after it: the [shortlist forms](/concepts/recommendation-set-formation), requirements narrow the field, and companies get [cut](/concepts/vendor-elimination). Showing up gets you to the start line.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic:
      "It is worth confirming you show up in AI, because you cannot win a race you are not in. But showing up is not pipeline. The companies that win here are the ones that survive the requirements a buyer adds, which is a different thing to measure than whether you get mentioned. Upstream Zero measures the second.",
    relatedTerms: [
      "ai-visibility",
      "ai-visibility-tools",
      "chatgpt-recommendations",
      "google-ai-mode",
      "commercial-evaluation",
    ],
    relatedComponents: ["recommendation-set-formation", "vendor-elimination"],
    reframe: [
      "'Are we showing up?' is where every company starts, and it is the right place to start. But the bigger question comes one step later: when a buyer spells out what they actually need, are you still recommended, or does a competitor take your place?",
      "Upstream Zero picks up exactly there. We do not sell you more visibility. We show you what happens after you appear, on ChatGPT and Google AI: which requirement removes you, why a competitor survives, and what would have to become true for the answer to change.",
    ],
    faqs: [
      {
        q: "How do I check if my company shows up in ChatGPT?",
        a: "Ask ChatGPT the questions a buyer in your category would ask, in a fresh session, and see whether you are named and how you are described. Repeat across a few phrasings and on Google AI as well. This gives you a first read, though it is a snapshot, not a measurement.",
      },
      {
        q: "We show up in AI but still lose. Why?",
        a: "Because showing up is not being chosen. AI recommends the company that best fits the requirements the buyer adds, and you can appear in the opening answer and get cut the moment a real requirement lands. That is what Upstream Zero studies.",
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
      "AI search monitoring watches [how a buyer decides](/learn/commercial-evaluation) from the outside: it sees the result, who gets mentioned, over time. It does not see why. The cause lives in [how the shortlist forms](/concepts/recommendation-set-formation) and [who gets cut](/concepts/vendor-elimination), which a mention count never reaches.",
    lifecycleStages: ["measurement"],
    businessLogic:
      "Monitoring is bought to prove progress and justify spend. But a mention trend is a weak stand-in for a real result, because being mentioned more often is not the same as surviving the requirements that decide the shortlist, and the trend rarely separates your own work from model and prompt changes. Upstream Zero measures whether the recommendation itself moves when requirements are applied, and reports the conditions, so you can tell what actually caused the movement rather than just watching a line.",
    relatedTerms: [
      "ai-visibility",
      "ai-visibility-tools",
      "ai-search-optimization",
      "commercial-evaluation",
      "recommendation-intelligence",
    ],
    relatedComponents: ["recommendation-stability", "competitor-displacement"],
    reframe: [
      "Monitoring answers 'did my mentions go up?' The real question is 'did the recommendation change, and did my work cause it?' A mention count moving is not proof that you are more likely to be chosen, or that anything you did moved it.",
      "Upstream Zero measures the recommendation under controlled, repeated conditions on ChatGPT and Google AI, so a change can be tied to a specific requirement and a cause, not just charted. Because the runs are controlled and dated, you can tell what actually moved the needle.",
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
      "What we can watch today is how the AI behaves on ChatGPT and Google AI, not the people on the buying committee behind it. The two are related but not the same, so reading the AI is a strong signal about how buying through AI works, not a direct read of a person's decision. Upstream Zero reports what it saw and under what conditions, and flags what is still uncertain.",
    lifecycle:
      "This is the heart of [how a buyer decides](/learn/commercial-evaluation): [the shortlist forming](/concepts/recommendation-set-formation), [the buyer's requirements being applied](/learn/requirement-based-evaluation), and [companies getting cut](/concepts/vendor-elimination). Showing up gets you into the opening answer; this is what decides who survives it.",
    lifecycleStages: ["recommendation", "requirement-evaluation", "selection"],
    businessLogic:
      "Because the recommendation is rebuilt from requirements every time, what matters is fit and the evidence for it, not just showing up. A company improves its standing by surviving more of the requirements a real buyer applies, which Upstream Zero measures directly on ChatGPT and Google AI. Whether that improves pipeline depends on how you execute beyond this decision; this is where it starts.",
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
      "It is tempting to think AI ranks vendors the way a list ranks results. It does not. It builds a recommendation from the buyer's requirements, and one new requirement can change who it names. There is no permanent best; there is the best fit for what is being asked.",
      "Upstream Zero studies this directly on ChatGPT and Google AI: how the recommendation forms, which requirement removes a company, and what evidence would change the outcome. Perplexity, Gemini, and Copilot are where this expands next, as the evidence grows.",
    ],
    faqs: [
      {
        q: "How does ChatGPT decide which vendors to recommend?",
        a: "It reads the buyer's question, compares companies against the requirements it works out, and returns a short recommendation. As the buyer adds requirements, it re-checks and drops companies that no longer fit, so the final answer reflects everything the buyer asked for, not just the opening question.",
      },
      {
        q: "Why does the recommendation change when I add details?",
        a: "Because the recommendation is a match against requirements, not a fixed ranking. Each requirement you add changes the match, and a company that fit the general question can get cut the moment a specific requirement lands.",
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
      "GEO (Generative Engine Optimization) is the practice of shaping content so AI systems quote and recommend it. It aims at getting found and quoted, not at being chosen once real requirements come in.",
    definition:
      "Generative Engine Optimization, or GEO, is the practice of structuring and publishing content so that generative AI systems retrieve, cite, and include a company in their answers.",
    mechanics:
      "GEO focuses on clear, structured, quotable content, consistent entity information, and presence in the sources a model draws on, so the system can find and reference you.",
    matters:
      "As buyers ask AI systems for recommendations, being retrievable and citable is a real prerequisite. GEO works on that prerequisite.",
    limitations: "Being easy to find and quote while an answer is written does not mean the company will be recommended for what a particular buyer needs. GEO shapes how AI describes you as it writes a response; it does not decide whether you make the [shortlist](/concepts/recommendation-set-formation), survive a follow-up requirement, or [prove you can back it up](/concepts/validation-and-evidence). A company can be described accurately and still get cut when a requirement lands.",
    lifecycle: "GEO works at the front, the moment AI reads its sources and writes an answer. Its job is to get you described accurately as the response is built. After that, the decision keeps going, and the company may not make the shortlist at all, make it but rank behind a better fit, get cut when the buyer adds a requirement, lack the evidence to back its claims, or [lose the lead](/concepts/frontrunner-movement) during follow-up questions. Being described well is where [the decision](/learn/commercial-evaluation) starts, not where it is settled.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Companies invest in GEO to be described well: to enter the first round accurately portrayed. You can weigh that alongside qualified pipeline and how well the leads fit your ideal customer. Whether it pays off depends on whether the company then fits the requirements the buyer adds and survives [that round of matching](/learn/requirement-based-evaluation). Upstream Zero measures whether the recommendation moves; it does not assume being described well produces the outcome.",
    relatedTerms: ["answer-engine-optimization", "ai-seo", "ai-search-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "GEO works on getting quoted. The real decision is whether, once quoted, you survive the buyer's specific requirements and become the pick. Getting quoted comes before getting chosen; it is not the same thing.",
      "We do not do GEO. We watch what happens after you are found, so you can see which requirement removes you and what evidence would change the outcome.",
    ],
    faqs: [
      {
        q: "Is GEO the same as commercial evaluation?",
        a: "No. GEO is a set of tactics for getting found and quoted. Commercial evaluation is the decision that runs on top of that and settles who is actually recommended. We study the second.",
      },
      {
        q: "Do you offer GEO services?",
        a: "No. We measure and explain how AI decides who to recommend. We do not promise citations, rankings, or inclusion, and we are not a GEO agency.",
      },
    ],
  },
  {
    slug: "ai-seo",
    term: "AI SEO",
    kind: "tactic",
    summary:
      "AI SEO adapts search optimization for AI-generated answers. It works on getting found. Commercial evaluation works on whether you are chosen once you are found.",
    definition:
      "AI SEO is the adaptation of search engine optimization for AI-mediated results: making a company discoverable and correctly represented when AI systems answer questions instead of returning a list of links.",
    mechanics:
      "It extends familiar SEO fundamentals (crawlability, structured data, authoritative content, consistent entities) toward the way AI systems retrieve and synthesize information.",
    matters:
      "When answers replace links, being discoverable and correctly represented still matters. AI SEO addresses that layer.",
    limitations: "Being found and quoted does not explain how a company is compared, cut, checked, or chosen once the buyer gets specific. AI SEO improves whether you are found and quoted across search; it does not decide whether you fit a buyer's requirement, [back up your claims](/concepts/validation-and-evidence), or survive follow-up questions. Being found is the way in, not the decision.",
    lifecycle: "AI SEO works at the front, across both regular and AI search: getting a company found and surfaced correctly. Its job is to get you in the door. What happens after that is decided by fit and evidence: the company may not make the [shortlist](/concepts/recommendation-set-formation), rank behind a better fit, get cut when a requirement is added, or fail to back up its claims. Being found gets you into the running; it does not carry you through.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Companies invest in AI SEO to win attention and get into more of these decisions. You can weigh that alongside qualified pipeline and how well the early leads fit your ideal customer. Whether it converts depends on fit and evidence later on: being found only pays off if the company also survives [the buyer's requirements](/learn/requirement-based-evaluation). Upstream Zero measures whether the recommendation moves through that; it does not assume being found produces revenue.",
    relatedTerms: ["ai-search-optimization", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "AI SEO improves whether you show up. It does not tell you why a competitor is recommended over you when a buyer adds a hard requirement. That is a different question, about the decision itself.",
      "Upstream Zero is not an AI SEO agency. We watch the decision itself and report where you get cut and what evidence is most likely to matter.",
    ],
    faqs: [
      {
        q: "Is AI SEO enough to win recommendations?",
        a: "Being found is necessary but not enough. Buyers apply requirements, and companies get cut on requirements, not on being found alone. That is where the decision is really made.",
      },
      {
        q: "Do you do AI SEO?",
        a: "No. We measure how AI systems weigh you and give you evidence-based, ranked decisions. We do not promise rankings or inclusion.",
      },
    ],
  },
  {
    slug: "llm-optimization",
    term: "LLM Optimization",
    kind: "tactic",
    summary:
      "LLM optimization tries to shape how large language models describe and recommend a company. It works on how you are described. Commercial evaluation works on the decision that description feeds into.",
    definition:
      "LLM optimization refers to practices intended to influence how large language models describe, cite, and recommend a company, given that models increasingly mediate what buyers see.",
    mechanics:
      "It focuses on the information a model can reach and reconstruct about you, and how consistently that information appears across the sources the model was trained on or can retrieve.",
    matters:
      "How a model describes you shapes whether you make the first cut at all. Getting that description right is real work.",
    limitations: "LLM optimization improves whether language models find, understand, and describe you. It does not guarantee you get recommended, does not guarantee you survive the buyer's requirements, and does not guarantee you get chosen.",
    lifecycle: "LLM optimization works at the front. It shapes how a model describes you; the decision itself is what settles who gets recommended and chosen.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Companies invest in LLM optimization because being described better may make it more likely you get into these AI-driven decisions. Whether that leads to stronger pipeline, better-fit leads, higher win rates, faster deals, revenue, retention, or expansion depends on how you perform through the rest of the decision. Upstream Zero measures those later changes rather than assuming a good description alone wins the business.",
    relatedTerms: ["ai-seo", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "How you are described feeds the decision; it is not the whole of it. What matters is what the system does with that description once a buyer applies real requirements.",
      "We measure that decision. We do not promise to change what a model says, and we are not an LLM optimization vendor.",
    ],
    faqs: [
      {
        q: "Can you guarantee a model recommends us?",
        a: "No, and anyone who guarantees it is not being honest about how these systems work. We promise evidence-based diagnosis and prioritized recommendations, never a specific outcome.",
      },
      {
        q: "How is this different from what you do?",
        a: "LLM optimization tries to shape how the model describes you. We watch and explain the decision the model makes, so you know where you get cut and why.",
      },
    ],
  },
  {
    slug: "ai-search-optimization",
    term: "AI Search Optimization",
    kind: "tactic",
    summary:
      "AI search optimization is making a company easy to find and accurately described across AI-powered search. It is about being found across the different tools, not about surviving a buyer's requirements.",
    definition:
      "AI search optimization is the practice of making a company discoverable and correctly represented across AI-powered search experiences, from AI overviews to conversational search.",
    mechanics:
      "It spans multiple surfaces at once, working on structured information, authority, and consistency so different AI search experiences can find and describe you.",
    matters:
      "Buyers now search across several AI surfaces. Being present and accurate across them is the ground floor of consideration.",
    limitations: "AI search optimization improves whether AI search and answer tools find and describe you. It does not guarantee you get recommended, does not guarantee you survive the buyer's requirements, and does not guarantee you get chosen.",
    lifecycle: "AI search optimization works at the front. It affects whether you get found; the later steps, the shortlist, the requirements, the evidence, and the final choice, decide the outcome.",
    lifecycleStages: ["discovery", "retrieval"],
    businessLogic: "Companies invest in AI search optimization because being found more easily may make it more likely you get into these AI-driven decisions. Whether that leads to stronger pipeline, better-fit leads, higher win rates, faster deals, revenue, retention, or expansion depends on how you perform through the rest of the decision. Upstream Zero measures those later changes rather than assuming being found alone wins the business.",
    relatedTerms: ["ai-seo", "generative-engine-optimization", "answer-engine-optimization", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "validation-and-evidence"],
    reframe: [
      "Being found across the different tools is the start of the story. The end is whether, in each one, you survive the requirements a buyer actually applies. That is the decision we measure.",
      "We are not a search-optimization agency. We explain the decision running inside those tools.",
    ],
    faqs: [
      {
        q: "Which AI tools do you look at?",
        a: "We watch the major AI tools buyers use, and we tell you which one each observation came from. Behavior differs from one to the next, so we never turn a result in one tool into a claim about all of them.",
      },
      {
        q: "Do you optimize for these tools?",
        a: "No. We measure and explain. You get evidence and a ranked set of decisions, not a promise about what any tool will say.",
      },
    ],
  },
  {
    slug: "google-ai-mode",
    term: "Google AI Mode",
    kind: "platform",
    summary:
      "Google AI Mode is a conversational AI search where you keep asking follow-up questions. Because it takes those follow-ups, it is where you can actually watch a buyer's decision unfold.",
    definition:
      "Google AI Mode is Google's conversational AI search experience, where a user can ask a question and then refine it through follow-ups rather than reading a list of links.",
    mechanics:
      "It interprets the question, forms an initial recommendation, and updates that recommendation as the user adds requirements, testing the companies already recommended against each new constraint.",
    matters:
      "Because it takes follow-up requirements, AI Mode lets you see a recommendation narrow in real time. It is one of the clearest places to watch a buyer's decision happen.",
    limitations: "What you see in one tool is about that tool, not the others; behavior differs from one to the next, so a result here is not a claim about all of them. A tool shows you where the decision happens; it does not by itself tell you why you got cut or what would change it.",
    lifecycle: "Google AI Mode is one place you can watch a company get found and get recommended. It is one window into the buyer's decision, not the whole of it.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you do in a given tool may affect whether you get into the decisions that run there. Whether that leads to pipeline, better-fit leads, win rates, or revenue depends on the rest of the decision and on how buyers use that tool. Upstream Zero tells you which tool each observation came from and measures movement rather than assuming one tool wins the business.",
    relatedTerms: ["chatgpt-recommendations", "google-ai-overviews", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
    reframe: [
      "AI Mode is a place a buyer's decision happens, not a channel to be gamed. What matters is which follow-up removes you and which keeps you.",
      "Upstream Zero watches these decisions in tools like this and reports the exact requirement where a company is bumped or survives.",
    ],
    faqs: [
      {
        q: "Why does the recommendation change as I add follow-ups?",
        a: "Each follow-up is a requirement. The system re-tests the companies it already recommended against the new requirement, and companies that no longer fit drop out. The final answer reflects the full requirement set, not the opening question.",
      },
      {
        q: "Do you work only with Google AI Mode?",
        a: "No. It is one tool among several we can watch. We tell you which tool every observation came from, because behavior differs from one to the next.",
      },
    ],
  },
  {
    slug: "chatgpt-recommendations",
    term: "ChatGPT Recommendations",
    kind: "platform",
    summary:
      "ChatGPT recommendations are the companies ChatGPT names when asked what to consider. They are the result of a behind-the-scenes decision, and they change as the buyer's requirements change.",
    definition:
      "ChatGPT recommendations are the companies ChatGPT surfaces when a user asks which options to consider for a given problem, along with the reasons it narrates.",
    mechanics:
      "ChatGPT interprets the request, draws on what it can reconstruct about the options, and produces a recommendation that shifts as the user supplies more specific requirements.",
    matters:
      "Buyers increasingly ask ChatGPT for a shortlist. The companies it names, and the ones it drops, shape the buyer's starting point before you are ever contacted.",
    limitations: "What you see in one tool is about that tool, not the others; behavior differs from one to the next, so a result here is not a claim about all of them. A tool shows you where the decision happens; it does not by itself tell you why you got cut or what would change it.",
    lifecycle: "ChatGPT recommendations are the moment a company gets recommended, as it shows up in that tool. It is one window into the buyer's decision, not the whole of it.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you do in a given tool may affect whether you get into the decisions that run there. Whether that leads to pipeline, better-fit leads, win rates, or revenue depends on the rest of the decision and on how buyers use that tool. Upstream Zero tells you which tool each observation came from and measures movement rather than assuming one tool wins the business.",
    relatedTerms: ["google-ai-mode", "google-ai-overviews", "ai-recommendations", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
    reframe: [
      "The recommendation is the visible tip of a decision you do not see. The reasons it gives are the system talking about itself, not proof of how it really decided. We treat them that way.",
      "Upstream Zero watches these recommendations, and how they move as requirements pile on, rather than trying to game them.",
    ],
    faqs: [
      {
        q: "Can you make ChatGPT recommend us?",
        a: "No. We do not promise inclusion or ranking. We measure how you are weighed today and give you a ranked, evidence-based set of decisions.",
      },
      {
        q: "Are the reasons ChatGPT gives reliable?",
        a: "We treat the reasons a system gives as the system talking about itself, not as proof of how it actually decided. That difference is core to how we read evidence.",
      },
    ],
  },
  {
    slug: "google-ai-overviews",
    term: "Google AI Overviews",
    kind: "platform",
    summary:
      "Google AI Overviews are AI-generated summaries at the top of search results. Being cited in an overview means you got found; surviving a buyer's requirements is a separate question.",
    definition:
      "Google AI Overviews are the AI-generated summaries Google places above traditional search results, synthesizing an answer from multiple sources.",
    mechanics:
      "An overview retrieves and synthesizes information from across the web into a single answer, sometimes citing sources, sometimes naming companies as part of the response.",
    matters:
      "For many queries, the overview is the first and sometimes only thing a buyer reads. Being represented there shapes the initial frame.",
    limitations: "What you see in one tool is about that tool, not the others; behavior differs from one to the next, so a result here is not a claim about all of them. A tool shows you where the decision happens; it does not by itself tell you why you got cut or what would change it.",
    lifecycle: "Google AI Overviews sit where a company gets found and summarized in that tool. They are one window into the buyer's decision, not the whole of it.",
    lifecycleStages: ["retrieval", "recommendation"],
    businessLogic: "How you do in a given tool may affect whether you get into the decisions that run there. Whether that leads to pipeline, better-fit leads, win rates, or revenue depends on the rest of the decision and on how buyers use that tool. Upstream Zero tells you which tool each observation came from and measures movement rather than assuming one tool wins the business.",
    relatedTerms: ["google-ai-mode", "chatgpt-recommendations", "ai-visibility", "commercial-evaluation"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
    reframe: [
      "Appearing in an overview is a form of showing up. It does not tell you whether you would survive the requirements a serious buyer applies in a deeper, back-and-forth conversation.",
      "We study that deeper decision, and we keep three things separate: being found, being written into an answer, and being the recommendation. They are not the same event.",
    ],
    faqs: [
      {
        q: "Is being in an AI Overview the same as being recommended?",
        a: "No. Being found, being written into an answer, and being recommended are three different things. You can be cited in an overview and still not be the company a requirement-driven decision picks.",
      },
      {
        q: "Do you optimize for AI Overviews?",
        a: "No. We measure and explain the decision, not the overview. We do not promise placement.",
      },
    ],
  },
  {
    slug: "commercial-buying-ai",
    term: "Commercial Buying AI",
    kind: "concept",
    summary:
      "Commercial buying AI refers to AI systems that help buyers size up and choose companies. It is how more of the buyer's decision now happens before they ever contact you.",
    definition:
      "Commercial buying AI refers to the AI systems that help buyers understand a problem, compare companies, and decide who to consider, increasingly before they contact any vendor directly.",
    mechanics:
      "These systems interpret a buyer's problem, infer requirements, compare available companies, and narrow toward a recommendation, updating as the buyer refines what they need.",
    matters:
      "As more of this happens before any direct contact, the process that shapes a buyer's shortlist is increasingly one you never see. That is the shift Upstream Zero exists to make visible.",
    limitations: "Commercial buying AI names the shift, not a switch you can flip. Knowing that buying decisions increasingly start with AI does not tell you where you get cut or what would change it; that has to be watched for your own category.",
    lifecycle: "Commercial buying AI covers the front of the journey, from buying through AI to the shortlist, where these systems start shaping the decision before a buyer ever talks to you.",
    lifecycleStages: ["ai-mediated-buying", "recommendation"],
    businessLogic: "Companies care about commercial buying AI because more of the buying decision now forms before a salesperson is ever involved. Whether that shift helps or hurts your pipeline, lead fit, win rates, or revenue depends on how you do in the decision those systems run. Upstream Zero measures that rather than assuming showing up in AI wins the business.",
    relatedTerms: ["commercial-evaluation", "ai-recommendations", "recommendation-intelligence", "ai-visibility"],
    relatedComponents: ["recommendation-set-formation", "recommendation-survivability"],
    reframe: [
      "Commercial buying AI is just today's version of how buyers decide. The tools will keep changing; the decision underneath them lasts, and that is what we study.",
      "We help you see how these systems weigh you today, and what would have to change for you to be the obvious choice.",
    ],
    faqs: [
      {
        q: "Is this a passing trend?",
        a: "The specific tools will change. The lasting shift is that the buyer's decision increasingly wraps up before they ever talk to you. We anchor to the decision, not the tool.",
      },
      {
        q: "How do I see how buying AI sizes up my company?",
        a: "Start with an Evaluation Audit: a structured look at how today's systems size you up, recommend you, or cut you, with a ranked set of decisions.",
      },
    ],
  },
  {
    slug: "answer-engine-optimization",
    term: "Answer Engine Optimization",
    aka: "AEO",
    kind: "tactic",
    summary:
      "Answer Engine Optimization (AEO) structures content so answer engines quote it directly. It improves whether you get quoted, which you need to be considered but is not the same as surviving a buyer's requirements.",
    definition:
      "Answer Engine Optimization, or AEO, is the practice of structuring content and metadata so that answer engines, the systems that return a direct answer instead of a list of links, retrieve and quote your content when someone asks a question.",
    mechanics:
      "AEO works on retrieval and citation: clear question-and-answer structure, schema markup, concise definitions, and authoritative sourcing, so an answer engine can lift a passage and attribute it to you. The unit of success is a citation or a mention.",
    matters:
      "If an answer engine never surfaces you, you cannot be considered. AEO raises the odds of being retrieved and cited, which is the entry ticket to the conversation.",
    limitations:
      "Being quoted is not being chosen. AEO works on whether you get quoted, not on whether you survive the requirements a buyer adds after the first question. A company can be quoted in an overview and still get cut the moment a real requirement lands. AEO works on the answer itself, not on the decision behind the recommendation.",
    lifecycle:
      "AEO sits at the very front: getting found and quoted. It helps you make the shortlist, where the real work takes over, how the shortlist forms, who gets cut, and who holds their spot. Getting quoted is the start, not the decision.",
    businessLogic:
      "The business payoff comes after the quote. Being found puts you in front of the decision; surviving that decision is what keeps you in the deals that become pipeline. AEO can help you get seen, but the pipeline, fit, and win-rate effects depend on whether you then survive the requirements that decide the shortlist. Upstream Zero measures whether your standing moves; it does not promise a number.",
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
      "AEO is about being quoted. Commercial evaluation is about being chosen. A quote gets you into the room; it does not decide who the buyer picks once requirements come in.",
      "Structured content and schema may be worth doing when the evidence shows you are hard to find, but as a fix for a specific problem, not as the goal itself.",
    ],
    faqs: [
      {
        q: "Is AEO the same as SEO?",
        a: "No. SEO works on ranking in a list of links; AEO works on being quoted as the answer. Both are about being found, not about surviving a buyer's requirements.",
      },
      {
        q: "Does Upstream Zero do AEO?",
        a: "No. Upstream Zero studies and measures how AI decides who to recommend. Answer-engine structuring may be worth doing when the evidence shows you are hard to find, but it is not our line of work.",
      },
    ],
  },
  {
    slug: "evidence-strategy",
    term: "Evidence Strategy",
    kind: "concept",
    summary:
      "Evidence strategy is figuring out what has to be true for an AI to believe you meet a requirement, and which specific proof would make that believable. It connects where you got cut to a ranked list of evidence to fix it.",
    definition:
      "Evidence Strategy is working out, for a requirement where a company gets cut, what an AI needs to be able to connect to that company, and which specific proof would make the connection believable.",
    mechanics:
      "It starts from a real failure: a requirement where you drop out. It names what has to become true, checks that against the evidence you already publish, finds the gap, ranks the proof most likely to close it, and then measures whether your standing moves.",
    matters:
      "Most companies produce evidence by volume and habit. An evidence strategy produces it by diagnosis: the specific proof, for the specific requirement, in the place an AI looks. It is the difference between publishing more and publishing what is missing.",
    limitations:
      "An evidence strategy is grounded in what we observe and diagnose, not a guarantee. It suggests things to try, tied to a specific gap; whether any one of them moves the outcome is measured, not assumed. AI behavior can change, and the reasons a system gives are it talking about itself, not proof of how it really decided.",
    lifecycle:
      "Evidence strategy sits in the middle of how a buyer decides: after diagnosis, where and why you get cut, and before measurement, whether the fix moved your standing. It turns evidence findings into a ranked plan.",
    businessLogic:
      "The logic is direct: buyers cut on requirements, and requirements are decided on evidence. Close the evidence gap on the requirement that removes you and you are more likely to survive to the shortlist, which is where fit, pipeline, and win rates are decided. Upstream Zero suggests the evidence and measures whether the recommendation changes; it does not promise a revenue outcome.",
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
      "Evidence strategy is where research becomes action. It is the bridge from what we watch an AI doing to what a company can actually do about it, kept on the business side so recommendations never taint the research record.",
      "It is not content marketing by the truckload. It is a diagnosis-driven, ranked set of things to try for a specific requirement and a specific gap.",
    ],
    faqs: [
      {
        q: "Is evidence strategy the same as content marketing?",
        a: "No. Content marketing produces material to be found. Evidence strategy produces the specific proof an AI needs for the requirement that is cutting you, and measures whether it changes the outcome.",
      },
      {
        q: "Does more evidence always help?",
        a: "No. Not every kind of proof helps with every problem. What to publish depends on the requirement being tested, where the AI seems unsure, and what you already have out there.",
      },
    ],
  },
  {
    slug: "ai-recommendations",
    term: "AI Recommendations",
    kind: "concept",
    summary:
      "AI recommendations are the vendor suggestions an AI gives when it answers a buying question. They are the result of a behind-the-scenes decision you usually never see, and they change as the buyer adds requirements.",
    definition:
      "AI Recommendations are the vendor or product suggestions an AI returns when a buyer asks what to use, buy, or shortlist. Each is the visible result of a hidden decision: the system built a list, applied the buyer's requirements, cut options, and settled on what to recommend.",
    mechanics:
      "A buyer asks a question. The system pulls together a set of candidates, then reshapes it every time the buyer adds a requirement, dropping companies that do not clearly meet it and lifting those that do. The recommendation you see reflects every requirement added so far, not just the opening question.",
    matters:
      "The recommendation is what the buyer shows up with. If an AI recommends a competitor, that call was made before a salesperson was ever involved, in a process you never saw.",
    limitations:
      "A recommendation is a result, not an explanation. Seeing that you were or were not recommended does not by itself tell you which requirement decided it, whether it repeats in other tools, or what evidence would change it. A recommendation can also change from one run to the next, so a single instance is one data point, not a rule.",
    lifecycle:
      "AI recommendations are the moment a company gets recommended, sitting between being found and the buyer's requirements coming in. They start from the companies that were found, then get reshaped by every requirement the buyer applies, which is where surviving and getting cut take over.",
    lifecycleStages: ["recommendation", "requirement-evaluation"],
    businessLogic:
      "Companies care about AI recommendations because being recommended is what puts you in the deal. Whether that leads to stronger pipeline, better-fit opportunities, higher win rates, or revenue depends on whether you then survive the requirements the buyer adds after the first recommendation. Upstream Zero measures whether your standing moves; it does not assume a recommendation guarantees a sale.",
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
      "AI visibility asks whether a system can find you. AI recommendations are whether it puts you forward once a real buyer applies requirements. Being found is necessary; being recommended is the result of the decision.",
      "Upstream Zero studies how recommendations form and change, so a recommendation becomes something you can explain rather than something that just happens to you.",
    ],
    faqs: [
      {
        q: "Why does an AI recommend our competitor instead of us?",
        a: "Usually because a specific requirement came in that the competitor clearly met and you did not. The recommendation is the end of a chain; the useful question is which requirement decided it.",
      },
      {
        q: "Do AI recommendations stay the same?",
        a: "No. They change as the buyer adds requirements, and they can vary from one run to the next and from one tool to another. That is why we measure movement against a baseline rather than assuming it.",
      },
    ],
  },
  {
    slug: "recommendation-intelligence",
    term: "Recommendation Intelligence",
    kind: "concept",
    summary:
      "Recommendation intelligence is the practice of measuring and explaining how AI systems recommend, cut, and choose vendors, so a company can see why it wins or loses when buyers use AI.",
    definition:
      "Recommendation Intelligence is the practice of watching, measuring, and explaining how AI systems form vendor recommendations: which companies get surfaced, which requirements cut them, how the leader changes, and what evidence seems to drive the final choice.",
    mechanics:
      "It runs a category through the requirement sequences a real buyer would use, records how the shortlist forms and changes, works out where and why a company gets cut, then measures whether fixes move its standing over time.",
    matters:
      "Companies can now see a part of the buying decision that used to be invisible. Recommendation intelligence turns AI recommendations from an unexplained outcome into something you can measure and explain.",
    limitations:
      "Recommendation intelligence measures and explains; it does not guarantee an outcome. It reports what was seen, and how sure it is, and keeps what it saw separate from what it infers. The reasons a system gives are it talking about itself, not proof of how it decided, and most findings should be measured for your own category rather than borrowed from another.",
    lifecycle:
      "Recommendation intelligence covers the whole back half of the decision, from the recommendation through to measurement: it is how those steps are made visible and tied back to business results.",
    lifecycleStages: ["recommendation", "validation", "selection", "measurement"],
    businessLogic:
      "The logic: you cannot improve what you cannot see. Recommendation intelligence shows where you get cut and whether a fix moves your standing, which is the input to pipeline, fit, and win-rate decisions. Whether those later outcomes improve depends on how you execute across the rest of the decision. Upstream Zero measures the movement rather than promising the revenue.",
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
      "Recommendation intelligence is close to what Upstream Zero does, but the anchor is the decision itself: how a buyer chooses. Recommendation intelligence is how we measure that today, because AI makes it possible to watch.",
      "It is not a visibility dashboard. It is measuring and explaining the decision that settles who a buyer chooses.",
    ],
    faqs: [
      {
        q: "Is recommendation intelligence the same as AI visibility tracking?",
        a: "No. Visibility tracking counts mentions. Recommendation intelligence measures whether you survive requirements and get chosen, and explains why, which is a different and later part of the process.",
      },
      {
        q: "Can recommendation intelligence be measured today?",
        a: "Parts of it can, through AI: which companies get recommended, which requirements cut them, and how the recommendation changes. Upstream Zero measures that and reports it with its conditions and limits.",
      },
    ],
  },
  {
    slug: "vendor-selection",
    term: "Vendor Selection",
    kind: "concept",
    summary:
      "Vendor selection is the point where a buyer, or a system acting for them, chooses one vendor from a shortlist. When buyers use AI, much of the narrowing that decides the winner happens before you ever engage.",
    definition:
      "Vendor Selection is the stage of a buying decision where a shortlist is cut down to the chosen vendor. It is the end of the whole process: the requirements have been applied, the field has narrowed, and one option is picked.",
    mechanics:
      "The choice comes after the evidence is checked. A buyer confirms which shortlisted vendors can actually back up the requirements, then picks. When AI handles the early stages, the shortlist a buyer picks from was already shaped by requirements and cuts you may never have seen.",
    matters:
      "The final choice is where revenue is won or lost. But by the time it happens, most of the field has already been cut. Influencing the choice means influencing the process that built the shortlist, not just the last step.",
    limitations:
      "You cannot act directly on the final choice. It is the consequence of everything before it: being found, being recommended, meeting the requirements, and backing them up. Polishing the last step without surviving the earlier ones changes nothing, because you were cut before the choice was ever reached.",
    lifecycle:
      "Vendor selection is the final choice, near the end of the process, after the evidence is checked and before measurement. It is the outcome the earlier steps produce, and it feeds back into business results.",
    lifecycleStages: ["selection"],
    businessLogic:
      "The choice is the step closest to revenue, which is exactly why it is the wrong place to intervene. The logic runs backward: to be chosen more often you have to survive the requirements that build the shortlist. Upstream Zero measures whether your standing through those earlier steps improves; it does not promise a win rate.",
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
      "Vendor selection is the moment everyone fixates on and the moment you can least influence directly. The process that produces it is where the leverage actually sits.",
      "Being on the shortlist is not being chosen, and being chosen is decided by requirements applied long before the final call.",
    ],
    faqs: [
      {
        q: "How is vendor selection different from being recommended?",
        a: "A recommendation puts you on the shortlist. Selection is being picked from it. You can be recommended and still not chosen if a later requirement removes you or a competitor proves its case better.",
      },
      {
        q: "Can Upstream Zero improve our selection rate?",
        a: "Upstream Zero measures and explains where you get cut before the final choice and whether fixes move your standing. It reports measured movement, not a promised win rate.",
      },
    ],
  },
  {
    slug: "requirement-based-evaluation",
    term: "Requirement Based Evaluation",
    kind: "concept",
    summary:
      "Requirement-based evaluation is how a buyer narrows a field: by applying specific requirements that vendors must meet. It is the mechanism that decides who survives and who gets cut.",
    definition:
      "Requirement-Based Evaluation is narrowing a set of vendors by applying the buyer's specific requirements, one after another, and keeping only the vendors that can credibly meet each one.",
    mechanics:
      "A buyer states or implies requirements. Each one is applied to the current set; vendors that do not clearly meet it are dropped. Because the requirements come in one at a time, the survivors, and the leader, can change at every step.",
    matters:
      "Requirements are the one constant. Tools and platforms change, but buyers always narrow by requirements. Understanding which ones decide your category is how you learn where you get cut.",
    limitations:
      "Knowing the requirements is not the same as meeting them, and meeting them is not the same as getting credit for them. An AI has to be able to connect you to a requirement through evidence. Requirement-based evaluation explains where you are tested; evidence strategy is about whether you pass.",
    lifecycle:
      "Requirement-based evaluation is the heart of the process. It sits between the recommendation and the evidence check, and it is where surviving, getting cut, and the lead changing hands all play out.",
    lifecycleStages: ["requirement-evaluation"],
    businessLogic:
      "The logic is direct: requirements decide the shortlist, and the shortlist decides the deals you are in. Surviving the requirements that matter in your category is what keeps you in contention for pipeline and win rates. Upstream Zero identifies those requirements and measures whether your standing on them moves; it does not promise a downstream number.",
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
      "Requirement-based evaluation is the how behind the whole decision. It is what the research studies directly: which requirement removes you, and whether that repeats.",
      "It is not a checklist you grade yourself on. It is what an AI applies to you, which is why it has to be watched rather than assumed.",
    ],
    faqs: [
      {
        q: "Who defines the requirements?",
        a: "The buyer, spelled out or implied, and the AI interprets them. That interpretation can vary, which is why we study requirement interpretation as its own research component.",
      },
      {
        q: "How do we know which requirements cut us?",
        a: "By running a category through realistic requirement sequences and recording where you drop out. That is what an Evaluation Audit produces.",
      },
    ],
  },
];

export const HUB_PILLAR = PILLARS.find((p) => p.hub)!;
