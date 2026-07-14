# Foundational Understanding — Upstream Zero

**Phase 1 deliverable**
**Date:** July 13, 2026
**Author:** Claude — founding product designer, information architect, frontend engineer, design systems lead
**Sources:** `company/COMPANY.md`, `company/HOW_WE_WORK.md` (substantive); `FOUNDING_CHARTER.md` (empty pre-COMPANY.md scaffold — superseded, should be rewritten or removed)
**Status:** Awaiting approval before Phase 2

---

## 1. What company I believe we're building

Upstream Zero is a **research company whose subject is commercial evaluation** —
the process by which organizations evaluate products, services, vendors, and
technologies before selecting them. That process has always been economically
enormous and methodologically invisible: for decades it could only be inferred
from its exhaust (win rates, lost deals, buyer anecdotes, procurement folklore).

The founding event is that **AI systems now participate in commercial
evaluation, and unlike human buying committees, their evaluation behavior can be
sampled, recorded, and experimented on at scale.** AI plays a double role: a new
evaluator entering the market, and the first instrument through which evaluation
can be studied directly.

The company intends to progress along a deliberate chain — make evaluation
**observable → measurable → understandable → predictable → improvable** — with
products emerging from that progression rather than preceding it. Identity is
explicitly ordered: researchers first, product builders second; instruments
first, products after something previously unobservable becomes measurable.

The current commercial wedge — helping organizations understand why AI
evaluators do or don't recommend them — funds and feeds the research. It is
explicitly not the destination. The long-term bet is that every organization
will maintain a **machine representation**: structured commercial knowledge
(problems solved, capabilities, requirement coverage, evidence, constraints,
integrations, confidence) of which the website is one rendering, not the
canonical form. The category being named is **Commercial Evaluation
Intelligence**.

The website is **Client Zero**: the first public implementation of the research,
meant to appreciate through accumulated evidence rather than rewritten copy.

In one sentence: *a scientific institution being built around a newly observable
economic process, with a diagnostic service as its first instrument-funded
application — and a website that is itself the first experiment.*

## 2. The durable principles

These are designed to outlive any product, instrument, or market condition. The
website's architecture should treat them as load-bearing.

1. **Observation precedes products.** The sequencing (observable → measurable →
   understandable → predictable → improvable) is a principle, not a roadmap.
2. **Evidence over articulation.** Nothing becomes true because it sounds
   convincing. Experiments are designed to *eliminate* competing explanations.
3. **Epistemic type-safety, with a concrete mechanism.** Observations,
   hypotheses, findings, mechanisms, and narratives are distinct categories that
   never silently promote themselves. HOW_WE_WORK.md operationalizes this as a
   six-tier evidence hierarchy — **Narrated → Observed → Replicated → Causally
   Supported → Cross Evaluator → Real World Corroborated** — with the rule that
   claims are presented at their tier and confidence is never promoted beyond
   it. This hierarchy is the company's most important single artifact: the
   mechanism behind the philosophy. It should be a first-class object in the
   site's data model, not a styling detail.
4. **Provenance as architecture.** Every significant claim eventually traces
   through observation → experiment → prediction → raw evidence → interpretation
   → confidence → revision history — inspectable by humans, followable by
   machines.
5. **Corrections are instrument improvements.** Revision history is a feature of
   knowledge. The site must make revision visible and dignified, never buried.
6. **Protect the operating system above individual ideas** — including founding
   ideas.
7. **The subject is evaluation, not AI.** AI is the current instrument; the
   research question survives instrument replacement.
8. **Researchers first, product builders second.** Better instruments, not
   prettier dashboards.
9. **Pre-committed tie-breakers.** Measurement beats elegance; evidence beats
   storytelling; when certainty exceeds data, reduce certainty. Reality gets the
   final vote.
10. **Trust through verifiability, not repetition** — in research, product, and
    design language alike (calm, editorial, institutional, never
    marketing-first).

## 3. Temporary assumptions that should not influence design decisions

- **AI as the instrument.** COMPANY.md is explicit: AI is *currently* the
  instrument. The site's data model, schema names, and page structures should be
  organized around *commercial evaluation* as the subject — able to survive the
  instrument being replaced. Nothing should assume evaluators are chat-shaped.
- **The current commercial wedge.** "Why does AI recommend or not recommend
  you" is the first application, not the identity. If the information
  architecture centers the wedge, the company becomes the GEO agency it
  disavows. The wedge deserves a room, not the lobby.
- **Today's model landscape.** Which systems evaluate, how they retrieve, how
  they expose reasoning — volatile. Findings tied to specific models are dated
  observations, never durable mechanisms; the data model must carry model
  version, date, and revision as mandatory metadata, not optional annotations.
- **The current research-area list.** Eleven areas is a snapshot of founding
  curiosity. Areas will merge, split, and retire; navigation must not hard-code
  them.
- **The category name.** "Commercial Evaluation Intelligence" is a positioning
  act. Build for the research; hold the label loosely. The site should never
  render the category as an established fact about the world.
- **`FOUNDING_CHARTER.md`.** An empty scaffold predating COMPANY.md, now
  contradicted by it. Should be rewritten from the real documents or deleted.
- **Any assumption that evidence exists yet.** The repository records a
  philosophy of evidence but no observations, experiments, or datasets. Until
  told otherwise, I assume the evidence base at launch is small or empty — and
  the architecture must be honest at N=0 (see §5 and §7).

## 4. Likely visitor misconceptions

- **"This is a GEO/AEO/AI-visibility company."** The most likely and most
  damaging misread. The visible commercial offer is superficially identical to
  a fast-growing optimization market. The research-first identity must be
  unmistakable within seconds of landing, or the wedge defines the company.
- **"This is an AI company."** Every concrete example currently involves AI, so
  visitors will collapse subject and instrument. "If AI disappeared tomorrow,
  the research program would continue" reads as rhetoric until the site shows
  evaluation research framed independently of any one instrument.
- **"Observatory" taken as achieved rather than aspirational.** If a skeptic
  arrives expecting an observatory and finds a manifesto, the framing backfires
  as exactly the performative marketing the company forswears. The observatory
  claim must be sized to the actual visible evidence at launch.
- **The coined vocabulary.** "Recommendation survivability," "commercial
  representation," "evidence systems," "evaluation architectures" are
  load-bearing internally and undefined externally. Without visible definitions,
  visitors map them to the nearest familiar concept (SEO, sales enablement,
  knowledge graphs) and misunderstand precisely.
- **Neutrality doubts.** Sophisticated visitors — researchers, journalists,
  procurement professionals — will ask: "You sell understanding of AI
  recommendations to vendors; how is your research neutral?" If the site doesn't
  answer proactively, they answer uncharitably.
- **"Evidence tiers" mistaken for marketing badges.** A six-tier confidence
  system rendered carelessly looks like gamification. The tiers must read as
  epistemic bookkeeping (closer to a legal citation or a physics error bar than
  a trust badge).

## 5. Research risks

Risks to the research program itself — which the website inherits, because the
website is Client Zero and will publicly carry the program's claims.

1. **Instrument instability.** AI evaluators change under their researchers'
   feet — model updates, retrieval changes, silent behavior shifts. A finding
   can be true in March and false in May with no announcement. Implication:
   every observation needs model identity, version, date, and sampling
   conditions as mandatory provenance; replication *across time* is a
   first-class research activity, and the site must display findings as dated,
   not eternal.
2. **Rationale unfaithfulness.** The premise that AI "reasons publicly" is
   empirically fragile: model-stated rationales are known to diverge from the
   factors that actually drove outputs. An observatory built on self-reported
   reasoning measures the press release, not the mechanism. Behavioral
   experiments (vary inputs, measure recommendation changes) escape this;
   the methodology — and the site's evidence display — should treat model
   rationales as **Narrated**-tier evidence regardless of how legible they look.
3. **Sampling noise mistaken for signal.** Evaluator outputs are sensitive to
   prompt phrasing, ordering, and temperature. Without large samples and
   published variance, "findings" may be sampling artifacts. The site should
   normalize showing N, variance, and conditions — even when it makes results
   look less dramatic. Especially then.
4. **Observer effects and self-contamination.** Publishing findings about how
   AI evaluators behave changes vendor behavior and eventually the evaluators'
   own training/retrieval corpus. Sharper still: Upstream Zero's own published
   research becomes content that the evaluators it studies may ingest. Client
   Zero makes the company a participant in its own experiment. This is both a
   research confound and — handled honestly — a fascinating published finding.
   It should be acknowledged, not hidden.
5. **Selection bias in the wedge pipeline.** Organizations that pay for
   diagnosis are disproportionately those with recommendation problems. Research
   built only on client data inherits that skew.
6. **Commercial contamination.** Revenue pressure pulls diagnosis toward
   optimization; optimization contaminates neutral observation (intervening on
   the system you claim to observe). Without a published firewall, this is the
   program's most likely failure mode — not scientific error, but incentive
   drift.
7. **The bridge-claim gap.** Findings about AI evaluators generalize to
   "commercial evaluation" only via resemblance, influence, or replacement
   claims that are themselves untested hypotheses. Overgeneralizing is the
   fastest route to the program being dismissed by exactly the sophisticated
   audience it needs.
8. **Category-of-one epistemics.** A self-declared new discipline has no peer
   community to catch its errors. Internal review is not external replication.
   Mitigations worth pursuing: publishing raw data and protocols so outsiders
   *can* replicate, inviting adversarial review, and citing adjacent literatures
   (B2B buying behavior, procurement science, IR/recsys evaluation) rather than
   claiming virgin territory.
9. **Reproducibility economics.** Observing at scale costs money; raw evidence
   may be large. If "raw evidence" links quietly degrade into summaries, the
   provenance chain becomes theater. Better to publish less with full chains
   than more with broken ones.
10. **Legal and naming risk.** Findings that name specific vendors or specific
    AI systems carry defamation-adjacent and terms-of-service risk. The
    publication policy needs a named-parties rule before the first named
    finding ships.

## 6. What information is still missing

In priority order for the phases ahead:

1. **The evidence base as of today.** What observations, experiments, or
   datasets actually exist? This is the single biggest determinant of Phase 2:
   an observatory with holdings and an observatory under construction are
   different buildings. **My working assumption until corrected: at or near
   N=0, and the architecture must be honest and dignified at N=0.**
2. **Operational methodology.** The tier *scale* exists; the *procedures* don't
   (in the repo): which systems observed, sampled how, what qualifies a claim
   for each tier, what counts as real-world corroboration.
3. **The buyer-side firewall.** The mechanism (not narrative) that keeps
   diagnosis from becoming optimization.
4. **Publication policy.** Open vs. proprietary; whether raw evidence is
   public; the named-parties rule; whether there's external review.
5. **Business model mechanics.** Who pays, for what deliverable; funding
   posture. Determines how much pressure the wedge exerts on the research.
6. **Team and authorship.** A research institution's initial credibility is
   borrowed from its people. Findings need authors; the site needs to know if
   authors can be named.
7. **The name.** "Upstream Zero" is still unexplained anywhere in the repo. If
   the site doesn't say, visitors will guess.
8. **The visual references.** Phase 3 says "study the supplied visual
   references" — none are in the repository yet. I'll need them before Phase 3,
   or I'll proceed on the adjectives alone (calm, editorial, institutional,
   timeless, highly crafted, modern, original) and say so.
9. **Domain and deployment target** (for Phase 6), plus any analytics stance —
   note that conversion-optimization tooling is arguably incompatible with the
   epistemics (see §7).
10. **Success horizon.** What the program should look like working, at 1 and 5
    years — this calibrates how much the IA invests in structures that only pay
    off at scale.

## 7. What should never appear on the website

A negative specification, derived from the operating system. These are
standing rules I intend to design and build against; several are the concrete
form of "never marketing-first."

**Claims and language**
- No claim presented above its evidence tier; no important claim without a
  tier label, date, and revision trail.
- No unfalsifiable superlatives: "leading," "revolutionary," "game-changing,"
  "the future of," "trusted by."
- No presenting the category ("Commercial Evaluation Intelligence") as an
  established fact about the world rather than a program the company is
  attempting.
- No optimization promises — "improve your AI visibility," "rank higher in
  ChatGPT" — in any wording. This is the GEO trap; one such sentence would
  redefine the company.
- No hypothesis stated in the indicative mood as settled fact — including the
  founding documents' own claims, if they are rendered on the site.

**Persuasion machinery**
- No popups, exit intents, chat widgets, countdown timers, scroll-jacking, or
  autoplaying anything.
- No testimonials-as-proof, logo walls, "as seen in" press strips, or social
  proof substituting for evidence — these are repetition, and trust here is
  earned through verifiability.
- No A/B testing of claim language for conversion. Optimizing how convincing a
  claim sounds, independent of its evidence, is a direct violation of the
  research philosophy — this one belongs in writing because analytics tooling
  makes it frictionless to drift into.
- No dark patterns of any kind, including manufactured urgency and
  pre-checked boxes.

**Visual and structural**
- No stock photography, no decorative AI-generated imagery, no generic SaaS
  illustration style (isometric people, floating UI screenshots, gradient
  blobs).
- No trend-chasing treatments that will date the site within two years.
- No fake evidence artifacts: placeholder charts, illustrative "sample data"
  rendered in the same visual language as real findings. If real data doesn't
  exist yet, the design must say so plainly rather than simulate it.
- No burying corrections. Retractions and revisions get the same typographic
  dignity as findings.

**Data and integrity**
- No client-identifiable data without documented consent; no name-and-shame
  findings below cross-evaluator evidence.
- No unversioned significant claims — if it matters, it has a revision history.

## 8. Where I disagree with the current thinking

Offered in the spirit of the operating system, applied to the operating system.

1. **"Commercial evaluation has become observable for the first time" is
   overclaimed.** What's observable is *AI evaluators'* behavior; human buying
   committees remain opaque. The generalization runs through an unstated bridge
   claim — AI evaluation **resembles**, **influences**, or is **replacing**
   human evaluation — three different research programs with different evidence
   requirements. By the company's own taxonomy this is a hypothesis presented
   as an observation. Notably, HOW_WE_WORK.md's apex tier ("Real World
   Corroborated") already encodes the right answer — AI-observed findings rank
   below real-world corroboration. The hierarchy knows what the purpose
   statement forgot; COMPANY.md should be brought into line with it, and the
   bridge claim should be the program's first named hypothesis.
2. **The instrument is a participant, not a telescope — and its legibility is
   partly illusory.** Covered as research risks #2 and #4; as a disagreement,
   the point is that the founding framing ("AI reasons publicly… can now be
   studied directly") asserts a transparency the evidence on rationale
   faithfulness doesn't support. The program is still viable — via behavioral
   experiments — but the framing should claim behavior, not introspection.
3. **"If AI disappeared tomorrow, the research program would continue" is
   currently hollow.** No AI-independent instrument is named anywhere. Either
   name one (procurement datasets, win/loss archives, buyer-panel experiments)
   or soften to "the research *question* would remain."
4. **The wedge structurally recreates the SEO incentive; the "What We Are Not"
   list is a narrative where the company's own rules demand a mechanism.**
   Vendors will pay to *change* recommendations, not merely understand them.
   Missing: a published firewall — an ethics line, buyer-side offerings that
   balance seller-side revenue, or structural separation of research from
   commercial work. Astronomers don't move the stars for paying clients.
5. **The mission's causal chain contains unmarked hypotheses and one probable
   inversion.** "Better buying decisions reduce information asymmetry" runs
   backwards — reduced asymmetry produces better decisions. And "improves
   outcomes for both buyers and sellers" assumes positive-sum; in competitive
   selection it's zero-sum among sellers. The honest, sharper mission: buyers
   and *deserving* sellers win; incumbents advantaged by opacity lose.
6. **The success criterion violates the research philosophy.** "People should
   leave *believing* they discovered the public observatory…" defines success
   as produced conviction — the first principle says nothing becomes true by
   sounding convincing. Proposed replacement, which will drive my design work
   unless overruled: **a skeptical visitor can select any significant claim and
   verify it end-to-end through the provenance chain in minutes.** If that's
   true, the observatory impression follows free; if false, design must not
   manufacture it.
7. **"Improvable" needs a beneficiary.** Improving *evaluation* (buyers decide
   better) and improving *evaluation outcomes* (sellers get recommended) are
   different businesses with different ethics. The mission implies the former;
   the wedge sells toward the latter. This is the most consequential undecided
   sentence in the founding documents, and it directly shapes how the site
   describes the commercial offering.
8. **Naming the category is itself a marketing act.** Category creation is a
   go-to-market strategy inside a document that says "never marketing-first."
   Acceptable — institutions get named — but the observatory framing, the
   category name, and "new scientific discipline" are all persuasion and should
   be held to the same evidence standard as everything else.

### Repository inconsistencies

- `FOUNDING_CHARTER.md` predates and contradicts COMPANY.md; rewrite or remove.
- COMPANY.md and HOW_WE_WORK.md restate overlapping rules in different words
  (Research Philosophy / Operating Principles vs. Research Rules / Decision
  Principle). Harmless now; divergence risk later. One should be canonical.
- By the six-tier hierarchy, nearly every claim in the founding documents sits
  at **Narrated** — and "claims should always be presented at the appropriate
  evidence tier" applies to founding documents too. Tier-labeling the founding
  claims themselves remains the cheapest, most credibility-building move
  available, and I intend to propose exactly that treatment when the site
  renders them.

---

*Phase 1 complete. Stopping for approval. The answers that most affect Phase 2:
the actual evidence base today (§6.1), the firewall (§6.3), publication policy
(§6.4), and whether my proposed success criterion (§8.6) replaces the
belief-shaped one.*
