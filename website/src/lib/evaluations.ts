/**
 * The Commercial Evaluation Graph.
 *
 * A property graph rendered as a website today, and the schema a product,
 * API, and dashboards can inherit tomorrow. Three node types make up the
 * public Evaluation Graph:
 *
 *   Category   the doorway: a market/product category.
 *   Scenario   the composition: a buyer profile (industry + persona + use
 *              case) and the requirement set that actually decides its
 *              evaluation. This is where the multi-constraint decision lives.
 *   Requirement  the atom: a single evaluation criterion. Durable, reusable,
 *              entity-backed. Everything links to it; it links to evidence.
 *
 * Edges: Category -groups-> Scenario -requires-> Requirement -satisfied by->
 * Evidence. Requirement -co-evaluated with-> Requirement. Industry and Persona
 * are carried as Scenario properties for now (promotable to their own nodes
 * without changing anything below).
 *
 * Governing test for every rendered page: would this help a buyer, or the AI
 * doing the evaluation, become more confident that a company satisfies this
 * requirement? If not, it does not belong here.
 *
 * Adding a requirement, scenario, or category is a data edit; templates,
 * links, sitemap, and schema follow automatically.
 */

export type RequirementKind =
  | "compliance"
  | "security"
  | "integration"
  | "capability"
  | "certification"
  | "operational";

export type Requirement = {
  slug: string;
  name: string;
  kind: RequirementKind;
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

export type Scenario = {
  slug: string;
  categorySlug: string;
  /** Full name, e.g. "Global law firm evaluating travel management". */
  name: string;
  /** The industry / vertical (Scenario property; promotable to a node). */
  industry: string;
  /** The buyer role driving the evaluation. */
  persona: string;
  /** The job being done. */
  useCase: string;
  /** The opening buyer question AI is asked. */
  buyerQuestion: string;
  /** The companies AI first puts forward. Illustrative. */
  illustrativeRecommendation: string[];
  /** The requirement set that decides it, in evaluation order. Slugs. */
  requirementSlugs: string[];
};

export type EvalCategory = {
  slug: string;
  name: string;
  /** The buyer question the page answers (the H1). */
  buyerQuestion: string;
  /** One line under the H1. */
  intro: string;
  /** The scenarios (buyer profiles) that evaluate in this category. */
  scenarioSlugs: string[];
  /** The characteristic ("typical") requirements of the category. The full
   *  palette; any one scenario uses a subset. Requirement slugs. */
  requirementSlugs: string[];
};

/* ─────────────────────────────────────────── requirements ── */

export const REQUIREMENTS: Record<string, Requirement> = {
  // Cybersecurity
  fedramp: {
    slug: "fedramp",
    name: "FedRAMP",
    kind: "compliance",
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
    kind: "operational",
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
    kind: "security",
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
    kind: "compliance",
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
    kind: "integration",
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
    kind: "integration",
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

  // Travel management
  "emburse-enterprise": {
    slug: "emburse-enterprise",
    name: "Emburse Enterprise integration",
    kind: "integration",
    whatItIs:
      "A clean integration with Emburse Enterprise, an enterprise travel and expense platform.",
    whyItMatters:
      "Firms standardized on Emburse for expense and reconciliation require their travel program to feed it directly, not through manual exports.",
    buyerQuestions: [
      "Do you integrate with Emburse Enterprise?",
      "Does booking and spend data flow into Emburse automatically?",
      "Is it a certified integration?",
    ],
    howItChangesRecs:
      "When a buyer names Emburse, AI favors travel providers with a documented integration and drops those that would force manual reconciliation.",
    evidence: [
      "A documented or certified Emburse Enterprise integration",
      "An automated feed of booking and spend data",
      "Joint customers running both",
    ],
    related: ["complex-client-billing", "global-after-hours-servicing"],
  },
  "vip-executive-travel": {
    slug: "vip-executive-travel",
    name: "VIP executive travel",
    kind: "capability",
    whatItIs:
      "Dedicated, high-touch servicing for senior executives and partners, including proactive rebooking and premium support.",
    whyItMatters:
      "For a firm's partners and top executives, a missed connection is a client-facing failure. Buyers require a servicing tier built for them.",
    buyerQuestions: [
      "Do you offer dedicated VIP executive servicing?",
      "Is there a named agent team for our partners?",
      "How do you handle proactive rebooking for executives?",
    ],
    howItChangesRecs:
      "Adding VIP servicing narrows the set to providers with a real premium tier, not just a standard help desk.",
    evidence: [
      "A defined VIP or executive servicing tier",
      "Named, dedicated agent teams",
      "Service levels for executive support",
    ],
    related: ["global-after-hours-servicing", "complex-client-billing"],
  },
  "global-after-hours-servicing": {
    slug: "global-after-hours-servicing",
    name: "Global after-hours servicing",
    kind: "operational",
    whatItIs:
      "Live, follow-the-sun support in every region the firm operates, at any hour.",
    whyItMatters:
      "A global firm has travelers in the air around the clock. A provider that goes dark outside one region's business hours cannot serve them.",
    buyerQuestions: [
      "Do you provide 24/7 servicing in every region?",
      "Is after-hours support in-house or outsourced?",
      "What are your overnight response times?",
    ],
    howItChangesRecs:
      "When a buyer requires global 24/7 coverage, regional providers drop out and the set narrows to those with genuine follow-the-sun operations.",
    evidence: [
      "Regional service centers with published hours",
      "Whether after-hours support is in-house or outsourced",
      "Response-time commitments by region",
    ],
    related: ["vip-executive-travel", "emburse-enterprise"],
  },
  "complex-client-billing": {
    slug: "complex-client-billing",
    name: "Complex client billing",
    kind: "capability",
    whatItIs:
      "Allocating travel to clients and matters, and applying firm and client travel policies at the point of booking.",
    whyItMatters:
      "Law firms bill travel back to clients by matter, under strict client-imposed policies. Travel that cannot be allocated correctly creates write-offs and disputes.",
    buyerQuestions: [
      "Can you allocate travel to clients and matters?",
      "Do you support client-specific travel policies?",
      "Can we enforce billing rules at the point of booking?",
    ],
    howItChangesRecs:
      "This requirement removes consumer-grade and generic corporate tools, leaving providers built for professional-services billing.",
    evidence: [
      "Client and matter allocation at booking",
      "Support for client-specific travel policies",
      "Integration with the firm's billing system",
    ],
    related: ["emburse-enterprise", "vip-executive-travel"],
  },
  "duty-of-care": {
    slug: "duty-of-care",
    name: "Duty of care",
    kind: "operational",
    whatItIs:
      "The provider's ability to locate, reach, and assist travelers during a disruption or emergency.",
    whyItMatters:
      "Employers are legally and reputationally responsible for their travelers' safety. A firm needs to know where its people are and reach them fast when something goes wrong.",
    buyerQuestions: [
      "What are your duty-of-care capabilities?",
      "Can you locate and reach travelers in an emergency?",
      "Do you provide risk alerts and traveler tracking?",
    ],
    howItChangesRecs:
      "Adding duty of care removes providers without real traveler tracking and risk response, and favors those with a proven emergency operation.",
    evidence: [
      "Traveler tracking and location capability",
      "Risk alerts and 24/7 emergency response",
      "Integration with a risk-management provider",
    ],
    related: ["global-after-hours-servicing", "vip-executive-travel"],
  },
  "unused-ticket-management": {
    slug: "unused-ticket-management",
    name: "Unused ticket management",
    kind: "capability",
    whatItIs:
      "Tracking and reusing the value of unused or partially used airline tickets before they expire.",
    whyItMatters:
      "For a firm with heavy travel, unused tickets are a large, recoverable cost. A provider that lets that value expire is leaving money on the table.",
    buyerQuestions: [
      "How do you track and recover unused tickets?",
      "Do you automatically apply unused ticket value?",
      "What is your recovery rate?",
    ],
    howItChangesRecs:
      "Cost-focused buyers use this to separate providers with automated recovery from those that track tickets manually or not at all.",
    evidence: [
      "Automated unused-ticket tracking and application",
      "Reporting on recovered value",
      "Recovery-rate benchmarks",
    ],
    related: ["complex-client-billing", "emburse-enterprise"],
  },

  // Customer data platform
  "epic-integration": {
    slug: "epic-integration",
    name: "Epic integration",
    kind: "integration",
    whatItIs:
      "Interoperability with Epic, the electronic health record most large US hospital networks run on.",
    whyItMatters:
      "Patient and encounter data lives in Epic. A platform that can't ingest it cleanly can't build a usable patient profile.",
    buyerQuestions: [
      "Do you integrate with Epic?",
      "Do you connect via FHIR or a data warehouse?",
      "Is it a validated Epic integration?",
    ],
    howItChangesRecs:
      "The moment a hospital names Epic, AI narrows to platforms with a real healthcare data path and drops consumer-marketing tools.",
    evidence: [
      "A documented Epic or Epic-on-FHIR integration",
      "Reference deployments at Epic hospital networks",
      "How Epic data is ingested and kept current",
    ],
    related: ["fhir", "healthcare-data-integration", "hipaa"],
  },
  hipaa: {
    slug: "hipaa",
    name: "HIPAA",
    kind: "compliance",
    full: "Health Insurance Portability and Accountability Act",
    whatItIs:
      "The US regulation governing how protected health information is stored, transmitted, and used.",
    whyItMatters:
      "A platform handling patient data must be HIPAA compliant and sign a BAA. Without it, legal and security stop the deal.",
    buyerQuestions: [
      "Are you HIPAA compliant?",
      "Will you sign a BAA?",
      "How is protected health information secured?",
    ],
    howItChangesRecs:
      "Adding HIPAA removes marketing-only platforms that won't sign a BAA, and narrows to those built for regulated data.",
    evidence: [
      "A signed BAA and stated HIPAA compliance",
      "Documentation of how protected health information is handled",
      "A HITRUST or equivalent certification",
    ],
    related: ["privacy-and-compliance", "consent-management", "epic-integration"],
  },
  snowflake: {
    slug: "snowflake",
    name: "Snowflake integration",
    kind: "integration",
    whatItIs:
      "Working natively with Snowflake, the cloud data warehouse many enterprises run as their system of record.",
    whyItMatters:
      "Hospitals want a platform that reads from and writes to Snowflake, not one that copies data into another silo. Governance depends on it.",
    buyerQuestions: [
      "Do you run on Snowflake or copy data out of it?",
      "Do you support a zero-copy, warehouse-native model?",
      "Can activation run on our Snowflake data?",
    ],
    howItChangesRecs:
      "Warehouse-native buyers use this to separate platforms that operate on Snowflake directly from those that duplicate data.",
    evidence: [
      "A Snowflake-native or zero-copy architecture",
      "A Snowflake partner listing",
      "A documented read, write, and governance model",
    ],
    related: ["warehouse-integration", "epic-integration", "real-time-activation"],
  },
  "salesforce-marketing-cloud": {
    slug: "salesforce-marketing-cloud",
    name: "Salesforce Marketing Cloud activation",
    kind: "integration",
    whatItIs:
      "Pushing built audiences into Salesforce Marketing Cloud for email, SMS, and journey campaigns.",
    whyItMatters:
      "A platform is only useful if the audiences it builds reach the tools the team runs. Many hospitals run on Marketing Cloud.",
    buyerQuestions: [
      "Do you activate into Salesforce Marketing Cloud?",
      "Is it real-time or batch?",
      "Do you sync consent and suppressions?",
    ],
    howItChangesRecs:
      "When a buyer names their activation destination, AI favors platforms with a proven Marketing Cloud connector.",
    evidence: [
      "A documented Salesforce Marketing Cloud integration",
      "Real-time versus batch activation support",
      "Consent and suppression sync",
    ],
    related: ["crm-marketing-activation", "real-time-activation", "consent-management"],
  },
  fhir: {
    slug: "fhir",
    name: "FHIR",
    kind: "integration",
    full: "Fast Healthcare Interoperability Resources",
    whatItIs: "The standard for exchanging healthcare data between systems.",
    whyItMatters:
      "FHIR is how modern healthcare data moves. A platform that speaks FHIR can pull clinical data without brittle custom pipelines.",
    buyerQuestions: [
      "Do you support FHIR?",
      "Which FHIR resources and version?",
      "Can you ingest Epic data over FHIR?",
    ],
    howItChangesRecs:
      "Adding FHIR narrows to platforms built for healthcare interoperability and drops those relying on manual data loads.",
    evidence: [
      "Documented FHIR support and version",
      "The FHIR resources you handle",
      "How FHIR data maps into patient profiles",
    ],
    related: ["epic-integration", "healthcare-data-integration", "hipaa"],
  },
  "real-time-activation": {
    slug: "real-time-activation",
    name: "Real-time activation",
    kind: "capability",
    whatItIs:
      "Building and updating audiences in real time and pushing them to destinations as events happen.",
    whyItMatters:
      "Care and marketing moments are time-sensitive. Batch-only activation misses the window that makes the data valuable.",
    buyerQuestions: [
      "Is activation real-time or batch?",
      "What is the end-to-end latency?",
      "Can it trigger on live events?",
    ],
    howItChangesRecs:
      "When a buyer requires real-time, batch-only platforms drop out and the set narrows to streaming-capable ones.",
    evidence: [
      "Documented real-time or streaming activation",
      "End-to-end latency figures",
      "Event-triggered use cases",
    ],
    related: ["data-ingestion", "salesforce-marketing-cloud", "identity-resolution"],
  },
  "identity-resolution": {
    slug: "identity-resolution",
    name: "Identity resolution",
    kind: "capability",
    whatItIs:
      "Stitching records from many sources into a single, deduplicated profile per person.",
    whyItMatters:
      "A patient appears across the EHR, portals, and marketing systems. Without accurate identity resolution, profiles are fragmented and unusable.",
    buyerQuestions: [
      "How do you resolve identity across sources?",
      "Deterministic, probabilistic, or both?",
      "How do you handle patient matching?",
    ],
    howItChangesRecs:
      "Weak identity resolution shows up fast in evaluation; AI favors platforms with a proven matching approach.",
    evidence: [
      "Your identity-resolution method",
      "Match-rate and accuracy figures",
      "How healthcare identifiers are handled",
    ],
    related: ["data-ingestion", "healthcare-data-integration", "real-time-activation"],
  },
  "data-ingestion": {
    slug: "data-ingestion",
    name: "Data ingestion",
    kind: "capability",
    whatItIs:
      "Bringing data in from every source, batch and streaming, structured and event.",
    whyItMatters:
      "A platform is only as good as the data it can reach. Gaps in ingestion become blind spots in every downstream use.",
    buyerQuestions: [
      "What sources can you ingest?",
      "Batch, streaming, or both?",
      "How do you handle schema changes?",
    ],
    howItChangesRecs:
      "Buyers with complex stacks use ingestion breadth to separate real platforms from thin connectors.",
    evidence: [
      "Supported sources and connectors",
      "Batch and streaming ingestion",
      "How schema changes are handled",
    ],
    related: ["identity-resolution", "warehouse-integration", "real-time-activation"],
  },
  "warehouse-integration": {
    slug: "warehouse-integration",
    name: "Warehouse integration",
    kind: "integration",
    whatItIs:
      "Operating on the customer's cloud data warehouse instead of copying data into a separate store.",
    whyItMatters:
      "Enterprises want one governed copy of data. A platform that duplicates it creates cost, drift, and compliance risk.",
    buyerQuestions: [
      "Do you run on our warehouse?",
      "Zero-copy, or do you extract data?",
      "Which warehouses do you support?",
    ],
    howItChangesRecs:
      "Warehouse-native architecture is now a common requirement, and it splits the field cleanly.",
    evidence: [
      "A warehouse-native or composable architecture",
      "Supported warehouses",
      "The governance and data-residency model",
    ],
    related: ["snowflake", "data-ingestion", "privacy-and-compliance"],
  },
  "crm-marketing-activation": {
    slug: "crm-marketing-activation",
    name: "CRM and marketing activation",
    kind: "capability",
    whatItIs:
      "Pushing audiences into the CRM and marketing tools the team runs campaigns from.",
    whyItMatters:
      "Data creates value only when it reaches the systems that act on it. Activation breadth decides whether the platform is usable day to day.",
    buyerQuestions: [
      "Which CRM and marketing tools do you activate into?",
      "Real-time or batch?",
      "Do you sync consent and suppressions?",
    ],
    howItChangesRecs:
      "Buyers filter on their exact destinations; platforms missing a key connector drop out.",
    evidence: [
      "Your activation destinations",
      "Real-time versus batch support",
      "Consent and suppression sync",
    ],
    related: ["salesforce-marketing-cloud", "real-time-activation", "consent-management"],
  },
  "consent-management": {
    slug: "consent-management",
    name: "Consent management",
    kind: "capability",
    whatItIs:
      "Capturing and enforcing consent and preferences everywhere data is used and activated.",
    whyItMatters:
      "In healthcare, using data without proper consent is a legal and trust failure. The platform must enforce it end to end.",
    buyerQuestions: [
      "How do you manage consent and preferences?",
      "Do you enforce consent at activation?",
      "Do you integrate with our consent platform?",
    ],
    howItChangesRecs:
      "Regulated buyers use consent enforcement to remove marketing-first platforms that treat it as an afterthought.",
    evidence: [
      "End-to-end consent capture and enforcement",
      "Enforcement at the point of activation",
      "Integration with consent platforms",
    ],
    related: ["privacy-and-compliance", "hipaa", "crm-marketing-activation"],
  },
  "privacy-and-compliance": {
    slug: "privacy-and-compliance",
    name: "Privacy and compliance",
    kind: "compliance",
    whatItIs:
      "The controls and certifications that govern how personal data is stored, accessed, and used.",
    whyItMatters:
      "A platform centralizes sensitive data, so it becomes a compliance surface. Buyers require proof before trusting it with patient data.",
    buyerQuestions: [
      "What certifications do you hold?",
      "How do you handle data residency and access control?",
      "How do you support audits?",
    ],
    howItChangesRecs:
      "Missing certifications or weak controls remove a platform before product fit is ever discussed.",
    evidence: [
      "Relevant certifications, such as SOC 2 or HITRUST",
      "Data-residency and access controls",
      "Audit support",
    ],
    related: ["hipaa", "consent-management", "soc-2"],
  },
  "healthcare-data-integration": {
    slug: "healthcare-data-integration",
    name: "Healthcare data integration",
    kind: "integration",
    whatItIs:
      "Connecting to the clinical systems and standards healthcare data lives in, from EHRs to FHIR.",
    whyItMatters:
      "Healthcare data is uniquely complex and regulated. A general platform without healthcare data paths can't serve a hospital.",
    buyerQuestions: [
      "Do you integrate with EHRs and clinical systems?",
      "Do you support healthcare data standards?",
      "Do you have healthcare references?",
    ],
    howItChangesRecs:
      "This requirement removes horizontal marketing platforms and narrows to those with a healthcare data foundation.",
    evidence: [
      "EHR and clinical-system integrations",
      "Support for healthcare standards like FHIR and HL7",
      "Healthcare customer references",
    ],
    related: ["epic-integration", "fhir", "hipaa"],
  },
};

/* ─────────────────────────────────────────────── scenarios ── */

export const SCENARIOS: Record<string, Scenario> = {
  "global-law-firm": {
    slug: "global-law-firm",
    categorySlug: "travel-management",
    name: "Global law firm evaluating travel management",
    industry: "Legal",
    persona: "Firm operations and travel program owners",
    useCase: "Managing travel for partners and executives across global offices",
    buyerQuestion: "Best travel management company for a global law firm",
    illustrativeRecommendation: ["CTM", "Navan", "Amex GBT", "FCM"],
    requirementSlugs: [
      "emburse-enterprise",
      "vip-executive-travel",
      "global-after-hours-servicing",
      "complex-client-billing",
    ],
  },
  "federal-contractor": {
    slug: "federal-contractor",
    categorySlug: "cybersecurity",
    name: "Federal contractor evaluating endpoint security",
    industry: "Public sector and federal contractors",
    persona: "CISO and security operations",
    useCase: "Securing endpoints in a federal, classified-capable environment",
    buyerQuestion: "Best endpoint security for a federal contractor",
    illustrativeRecommendation: [
      "CrowdStrike",
      "SentinelOne",
      "Microsoft Defender",
      "Palo Alto",
    ],
    requirementSlugs: [
      "fedramp",
      "air-gapped",
      "zero-trust",
      "microsoft-defender",
    ],
  },
  "hospital-network": {
    slug: "hospital-network",
    categorySlug: "customer-data-platform",
    name: "Hospital network evaluating a customer data platform",
    industry: "Healthcare",
    persona: "Health-system data, marketing, and IT leaders",
    useCase:
      "Unifying clinical and marketing data for activation across a hospital network",
    buyerQuestion: "What is the best customer data platform for a hospital network?",
    illustrativeRecommendation: [
      "Tealium",
      "Treasure Data",
      "Salesforce Data Cloud",
      "Adobe Real-Time CDP",
      "Hightouch",
      "Twilio Segment",
      "Freshpaint",
    ],
    requirementSlugs: [
      "epic-integration",
      "hipaa",
      "snowflake",
      "salesforce-marketing-cloud",
      "fhir",
      "real-time-activation",
    ],
  },
};

/* ─────────────────────────────────────────────── categories ── */

export const CATEGORIES: EvalCategory[] = [
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    buyerQuestion: "How does AI decide which cybersecurity platform to recommend?",
    intro:
      "Endpoint, cloud, and network security buyers open with a broad question, then add the requirements that actually govern the purchase.",
    scenarioSlugs: ["federal-contractor"],
    requirementSlugs: [
      "fedramp",
      "soc-2",
      "zero-trust",
      "air-gapped",
      "crowdstrike",
      "microsoft-defender",
    ],
  },
  {
    slug: "travel-management",
    name: "Travel management",
    buyerQuestion:
      "How does AI decide which travel management company to recommend?",
    intro:
      "Corporate travel buyers open with a broad question, then add the requirements their program actually runs on.",
    scenarioSlugs: ["global-law-firm"],
    requirementSlugs: [
      "emburse-enterprise",
      "vip-executive-travel",
      "global-after-hours-servicing",
      "complex-client-billing",
      "duty-of-care",
      "unused-ticket-management",
    ],
  },
  {
    slug: "customer-data-platform",
    name: "Customer data platform",
    buyerQuestion:
      "How does AI decide which customer data platform to recommend?",
    intro:
      "CDP buyers open with a broad question, then add the data, integration, and compliance requirements their stack actually runs on.",
    scenarioSlugs: ["hospital-network"],
    requirementSlugs: [
      "identity-resolution",
      "data-ingestion",
      "real-time-activation",
      "warehouse-integration",
      "crm-marketing-activation",
      "consent-management",
      "privacy-and-compliance",
      "healthcare-data-integration",
      "epic-integration",
      "hipaa",
      "snowflake",
      "salesforce-marketing-cloud",
      "fhir",
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

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS[slug];
}

export function scenariosForCategory(catSlug: string): Scenario[] {
  const c = getCategory(catSlug);
  if (!c) return [];
  return c.scenarioSlugs
    .map((s) => SCENARIOS[s])
    .filter(Boolean) as Scenario[];
}

/** Scenarios whose requirement set includes this requirement (backlink). */
export function scenariosForRequirement(reqSlug: string): Scenario[] {
  return Object.values(SCENARIOS).filter((s) =>
    s.requirementSlugs.includes(reqSlug),
  );
}

/** Categories whose typical requirement palette includes this requirement. */
export function categoriesForRequirement(reqSlug: string): EvalCategory[] {
  return CATEGORIES.filter((c) => c.requirementSlugs.includes(reqSlug));
}

/** The characteristic ("typical") requirements of a category. */
export function requirementsForCategory(catSlug: string): Requirement[] {
  const c = getCategory(catSlug);
  if (!c) return [];
  return resolveRequirements(c.requirementSlugs);
}

/** Resolve a list of requirement slugs to requirements, dropping unknowns. */
export function resolveRequirements(slugs: string[]): Requirement[] {
  return slugs.map((s) => REQUIREMENTS[s]).filter(Boolean) as Requirement[];
}
