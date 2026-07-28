/**
 * The Commercial Evidence System, requirement-first.
 *
 * Categories are the doorway; requirements are the invariant and the durable
 * assets. A category page answers "how do buyers actually evaluate this
 * category?" and routes into the requirement pages that decide the outcome.
 * A requirement page answers a single buyer question and links to the
 * requirements evaluated next, so the whole thing reads as one knowledge
 * graph: category -> example -> requirement -> evidence -> related -> audit.
 *
 * Governing test for every page: would this help a buyer, or the AI doing the
 * evaluation, become more confident that a company satisfies this requirement?
 * If not, it does not belong here.
 *
 * Adding a requirement or a category is a data edit; the templates and the
 * internal linking follow automatically.
 */

export type Requirement = {
  slug: string;
  /** Short label used in lists and links. */
  name: string;
  /** Expansion or full name, when the short label is an acronym. */
  full?: string;
  /** One sentence: what the requirement is. */
  whatItIs: string;
  /** Why buyers require it, in business terms. */
  whyItMatters: string;
  /** The questions buyers ask AI about it. */
  buyerQuestions: string[];
  /** How introducing it changes the recommendation set. */
  howItChangesRecs: string;
  /** Public evidence that strengthens confidence you satisfy it. */
  evidence: string[];
  /** Requirement slugs commonly evaluated next. */
  related: string[];
};

export type EvalCategory = {
  slug: string;
  name: string;
  /** The buyer question the page answers (the H1). */
  buyerQuestion: string;
  /** One line under the H1. */
  intro: string;
  /** The evaluation example. `reqs` are requirement slugs so each step links
   *  to its requirement page. */
  example: { q: string; cos: string[]; reqs: string[] };
  /** The requirements that typically decide this category, in evaluation
   *  order. Requirement slugs. */
  requirementSlugs: string[];
};

/* ─────────────────────────────────────────── requirements ── */

export const REQUIREMENTS: Record<string, Requirement> = {
  fedramp: {
    slug: "fedramp",
    name: "FedRAMP",
    full: "Federal Risk and Authorization Management Program",
    whatItIs:
      "A US government program that authorizes cloud products for federal use at Low, Moderate, or High impact levels.",
    whyItMatters:
      "For federal agencies and their contractors, a vendor without an authorization at the required level is off the table, no matter how good the product is.",
    buyerQuestions: [
      "Is this vendor FedRAMP authorized?",
      "At what impact level, Moderate or High?",
      "Is it fully authorized or still in process?",
    ],
    howItChangesRecs:
      "The moment a buyer says federal or FedRAMP High, AI drops every vendor that cannot show an active authorization at that level, category leaders included.",
    evidence: [
      "Your listing in the FedRAMP Marketplace, with impact level and status",
      "The authorizing agency or JAB sponsor",
      "Whether the authorization is active, not just in process",
    ],
    related: ["soc-2", "air-gapped", "zero-trust"],
  },
  "air-gapped": {
    slug: "air-gapped",
    name: "Air-gapped deployment",
    whatItIs:
      "A deployment fully isolated from external networks, with no internet connectivity.",
    whyItMatters:
      "Defense, intelligence, and critical-infrastructure buyers require an air-gapped option. A cloud-only vendor cannot serve them at all.",
    buyerQuestions: [
      "Do you support air-gapped or fully on-prem deployment?",
      "Can it run with no internet access?",
      "How are updates and threat intelligence delivered to an isolated environment?",
    ],
    howItChangesRecs:
      "When a buyer requires air-gapped, cloud-native leaders are eliminated instantly and the set narrows to the few vendors with a true offline mode.",
    evidence: [
      "Documentation of a disconnected or air-gapped deployment mode",
      "Reference deployments in classified or OT environments",
      "How you deliver updates without a network connection",
    ],
    related: ["fedramp", "zero-trust"],
  },
  "zero-trust": {
    slug: "zero-trust",
    name: "Zero Trust",
    whatItIs:
      "A security model that trusts no user or device by default and verifies every access request.",
    whyItMatters:
      "Zero Trust is the architecture buyers now expect and a US federal mandate. Vendors that cannot map to it read as dated.",
    buyerQuestions: [
      "Does this support a Zero Trust architecture?",
      "How does it handle identity and least-privilege access?",
      "Does it align with NIST 800-207?",
    ],
    howItChangesRecs:
      "As buyers add Zero Trust language, AI favors vendors that describe their architecture in those terms and quietly demotes those that do not.",
    evidence: [
      "Architecture documentation mapped to NIST 800-207",
      "Identity, segmentation, and least-privilege capabilities",
      "How you fit the buyer's existing identity provider",
    ],
    related: ["fedramp", "soc-2"],
  },
  "soc-2": {
    slug: "soc-2",
    name: "SOC 2",
    full: "SOC 2 Type II",
    whatItIs:
      "An independent audit of a vendor's controls for security, availability, and confidentiality, with Type II covering a period of time.",
    whyItMatters:
      "SOC 2 Type II is the baseline trust signal for enterprise software. Without it, security and procurement stall the deal before product fit is ever discussed.",
    buyerQuestions: [
      "Do you have a SOC 2 report?",
      "Type I or Type II?",
      "Can we see the latest report under NDA?",
    ],
    howItChangesRecs:
      "A missing or expired SOC 2 removes a vendor early, before the evaluation reaches whether the product is any good.",
    evidence: [
      "A current SOC 2 Type II report",
      "A trust center or security page that lists it",
      "The audit period and the auditor",
    ],
    related: ["fedramp", "zero-trust"],
  },
  crowdstrike: {
    slug: "crowdstrike",
    name: "CrowdStrike integration",
    whatItIs:
      "Clean interoperability with CrowdStrike Falcon, a widely deployed endpoint protection platform.",
    whyItMatters:
      "Enterprises standardized on CrowdStrike want new tools to work alongside it, not force a rip-and-replace.",
    buyerQuestions: [
      "Does this integrate with CrowdStrike?",
      "Do you share telemetry with Falcon?",
      "Is there a validated integration?",
    ],
    howItChangesRecs:
      "When a buyer names their existing stack, AI favors vendors with a documented CrowdStrike integration and drops those that would replace it.",
    evidence: [
      "A listing in the CrowdStrike Marketplace",
      "Documented telemetry or data exchange",
      "Joint customers running both",
    ],
    related: ["microsoft-defender", "zero-trust"],
  },
  "microsoft-defender": {
    slug: "microsoft-defender",
    name: "Microsoft Defender integration",
    whatItIs:
      "Interoperability with Microsoft Defender and the wider Microsoft security stack, including Sentinel.",
    whyItMatters:
      "Buyers standardized on Microsoft E5 want tools that extend that investment rather than duplicate it.",
    buyerQuestions: [
      "Does this integrate with Microsoft Defender?",
      "Does it work with Sentinel?",
      "Is it part of the Microsoft ecosystem?",
    ],
    howItChangesRecs:
      "For Microsoft-first buyers, AI leans toward vendors inside the Defender and Sentinel ecosystem.",
    evidence: [
      "A Microsoft integration or certification",
      "A Sentinel connector",
      "An Azure Marketplace listing",
    ],
    related: ["crowdstrike", "zero-trust"],
  },
};

/* ─────────────────────────────────────────────── categories ── */

export const CATEGORIES: EvalCategory[] = [
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    buyerQuestion: "How does AI decide which cybersecurity platform to recommend?",
    intro:
      "Endpoint, cloud, and network security buyers open with a broad question, then add the requirements that actually govern the purchase. Watch what survives.",
    example: {
      q: "Best endpoint security for a global bank",
      cos: ["CrowdStrike", "SentinelOne", "Microsoft Defender", "Palo Alto"],
      reqs: ["fedramp", "zero-trust", "air-gapped"],
    },
    requirementSlugs: [
      "fedramp",
      "soc-2",
      "zero-trust",
      "air-gapped",
      "crowdstrike",
      "microsoft-defender",
    ],
  },
];

/* ──────────────────────────────────────────────── helpers ── */

export function getRequirement(slug: string): Requirement | undefined {
  return REQUIREMENTS[slug];
}

export function getCategory(slug: string): EvalCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Categories in which this requirement appears (for cross-linking). */
export function categoriesForRequirement(slug: string): EvalCategory[] {
  return CATEGORIES.filter((c) => c.requirementSlugs.includes(slug));
}

/** Resolve a list of requirement slugs to requirements, dropping unknowns. */
export function resolveRequirements(slugs: string[]): Requirement[] {
  return slugs.map((s) => REQUIREMENTS[s]).filter(Boolean) as Requirement[];
}
