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
};

export const PILLARS: Pillar[] = [
  {
    slug: "commercial-evaluation",
    term: "Commercial Evaluation",
    kind: "concept",
    hub: true,
    summary:
      "Commercial evaluation is the process that decides which company a buyer considers, validates, and selects. In AI-mediated buying, much of it happens before you know the buyer exists.",
    definition:
      "Commercial evaluation is the process by which a buyer, or a system acting for a buyer, decides which companies are worth considering, which meet the real requirements, and which is the logical choice. It is older than AI and independent of any one channel.",
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
];

export const HUB_PILLAR = PILLARS.find((p) => p.hub)!;
