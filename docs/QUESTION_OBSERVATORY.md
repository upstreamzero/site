# The Question Observatory — Architecture

**Date:** July 14, 2026
**Author:** Claude — founding information architect
**Status:** ARCHITECTURE FOR REVIEW — deliberately unimplemented.

**Revision notes (practicing our own discipline):**
- **R1** introduced the Question Observatory: canonical questions as
  observed first-class objects, mandatory source provenance, computed
  coverage, the Client Zero audit mapping.
- **R2** applies the founder's durable/variable correction. R1's error,
  preserved for the record: platform names (ChatGPT, Google AI Mode,
  Copilot, Bing…) appeared in the *schema* — in the source-type enum and
  as a prominent per-environment structure — which quietly organized the
  observatory around temporary evaluator implementations. R2 removes every
  platform name from the schema. **The durable commercial layer organizes
  the system; evaluators are an observation dimension.** The company is
  organized around what survives technology change.

---

## 0. The two layers

**THE DURABLE LAYER** — commercial reality, stable across technology
change. Business problems, buying-committee roles, commercial
requirements, requirement clusters and gates, evaluation questions,
underlying uncertainties, evidence requirements, validation requirements,
confidence states, selection outcomes. These existed before AI evaluators
and will outlive every system currently observing them.

**THE VARIABLE EVALUATOR LAYER** — the implementations through which the
durable layer is observed at any moment: Google Search, Google AI Mode,
ChatGPT, Copilot, Bing, Claude, Perplexity, human buying committees,
procurement systems, future agents and evaluator classes. **These names
never appear in the schema.** They are records in the instrument registry
— data, not structure. They will change; the schema will not notice.

The test for every future modeling decision: *if every current AI product
disappeared tomorrow, which parts of the observatory would still be
correct?* The durable layer must be all of it.

A canonical question exists independently of any model. *"Which solution
best supports a regulated healthcare organization with strict data
residency requirements?"* may be observed in ChatGPT today, Google AI Mode
tomorrow, a procurement agent later, and human buying committees
throughout. The question remains. The evaluator changes.

## 1. The fundamental principle (unchanged from R1)

The purpose of the website is **comprehensive question coverage** — of
*durable* questions. Every page exists because a meaningful question
exists; every answer increases coverage; coverage is measured, not
asserted (§6). What R2 adds: coverage is counted over the durable layer.
An answer observed to work in one evaluator does not increase coverage of
the question — it increases the *evaluator-observation record* of an
answer whose coverage is assessed against durable evidence requirements.

## 2. The durable layer — modeled with restraint

The founder's chain:

```
Business Problem
  → Buying Committee (role)
    → Requirement (clusters; gates)
      → Evaluation Question
        → Evidence Requirement
          → Evaluator Observation      ← the variable layer attaches HERE
            → Confidence
              → Recommendation
                → Validation
                  → Selection
```

Eleven durable concepts do not require eleven new types. Each chain node
is modeled as a **type**, a **field**, a **derived state**, or an
**existing type** — the ontology grows by five, and the extension is
recorded as a Method revision per the graph's constitution:

| Chain node | Modeling | Notes |
|---|---|---|
| Business problem | **new type** `business-problem` (BP-) | the commercial situation that creates evaluation |
| Buying committee role | **new type** `buyer-role` (BR-) | economic buyer, technical evaluator, security reviewer, end user, procurement… |
| Commercial requirement | **new type** `requirement` (RQ-) | field `kind: requirement \| gate`; field `cluster` groups related requirements — clusters and gates are structure on one type, not two more types |
| Requirement cluster / gate | fields on `requirement` | see above |
| Evaluation question | **new type** `canonical-question` (CQ-) | §3 |
| Underlying uncertainty | field on CQ | what the asker is actually resolving |
| Evidence requirement | **new type** `evidence-requirement` (ER-) | what evidence would satisfy the requirement — declared independently of any evaluator |
| Validation requirement | field on ER | the conditions under which the evidence counts as validated |
| Confidence state | **derived** | computed from the evidence chain, never stored (the tier-floor lesson) |
| Recommendation / selection outcome | **observations** | recorded evaluator/buyer behavior — `observation` objects with kinds `recommendation` and `selection`; real-world selection outcomes are what the apex evidence tier corroborates against |

## 3. The canonical question (CQ), revised

Identity fields (curated, versioned): `canonicalQuestion`,
`underlyingUncertainty`, `intent`, `buyerStage` — as R1.

Durable edges (the R2 addition — every CQ connects into the chain):

```
derives-from   → business-problem     the problem that created it
asked-by       → buyer-role           the role responsible for it
evaluates      → requirement          the requirement or gate it tests
requires       → evidence-requirement the evidence needed to answer it
```

**What moved out of identity: everything evaluator-specific.** R1 gave the
CQ per-environment records and variant lists as near-identity fields. R2
demotes them to what they are — observations:

- **Evaluator expression observations**: how a given evaluator phrases,
  decomposes, prioritizes, or answers this durable question — including
  wording variants — recorded as `observation` objects, instrument-stamped
  (which evaluator, which version, when, sampled how), attached to the CQ
  via `observed-as` edges. Variants are evaluator *behavior*, not question
  *identity*. No permanent per-platform question taxonomy exists, or can
  exist, in this schema.
- **Frequency and recency** per evaluator: properties of those
  observations (with N and windows), aggregated at build time — never
  hand-maintained fields on the question.

The R1 rules survive intact: a CQ cannot exist without a source record
(no editorial invention — build-enforced); sources involving people
inherit consent and named-parties rules; V1's six Philosophy questions
grandfather visibly as `internal-research` (FD-10).

**Source records, corrected:** R1's source enum mixed *methods* with
*platforms*. R2 splits them — `method` (evaluator-prompt, search-data,
interview, customer-conversation, internal-research, finding-derived:
durable methodology vocabulary) and `instrument →` (a registry reference:
whichever evaluator or data source it was, as data). New evaluator classes
require a registry record, never a schema change.

## 4. The variable layer — the instrument registry

Every evaluator implementation — each AI system and version, each search
surface, each procurement platform, *and human buying committees as an
evaluator class* — registers as an **Instrument** (existing type; no
extension). Instruments carry identity, version, access mode, known
limitations, observation windows. Evaluator observations point at them.

This yields the founder's requirement mechanically: we record how each
evaluator *expresses, prioritizes, decomposes, or answers the same durable
commercial questions* — as dated, stamped observations attached to durable
objects — and when an evaluator dies, its observations remain valid
history rather than orphaned taxonomy.

## 5. The standing research questions

The observatory's own instrument panel must eventually distinguish
(each of these is a measured research output, never an assumption):

1. Which requirements remain stable across evaluator changes?
2. Which questions are universal across buying environments?
3. Which question formulations are evaluator-specific?
4. Which evidence works across evaluators?
5. Which evidence is environment-dependent?
6. Which requirement gates are durable even when recommendation behavior
   changes?

Proposed registration: **H-3, generalized** — *evaluator implementations
differ materially in how they express, prioritize, and answer durable
commercial questions, and in which evidence they accept* — with the six
distinctions above as its measured sub-questions. Refutation condition:
cross-evaluator observation shows expression, prioritization, and evidence
acceptance statistically indistinguishable at meaningful sample sizes.
Nothing in the rendering or coverage model may assume the answer.

## 6. Coverage — computed over the durable layer

All computed at build; never stored (unchanged discipline). R2 re-bases
the denominators on durable objects:

| Coverage | Definition (computed) |
|---|---|
| Question | durable CQs published ÷ durable CQs observed |
| Answer | CQs with a published resolved-question rendering |
| Evidence | distribution of answers' tiers **against their evidence requirements** — an answer covers a question only as far as the declared ER is satisfied |
| Requirement | requirements ÷ gates with at least one evaluating CQ answered |
| Evaluator | instruments with active observation ÷ instruments registered — an observation-freshness measure, not an organizing dimension |
| Link | mean independent graph paths into each durable object |

At launch every number is zero or near-zero, printed honestly.

## 7. Rendering integration (pattern unchanged)

The V1 six-part pattern stands. R2 changes only what organizes the map:

- **CQ pages are the resolved-question pages**; the human sitemap organizes
  by business problem and buyer role — durable categories — never by
  evaluator. There is no "/chatgpt-questions" page in this architecture,
  and there never will be.
- Evaluator-specific expression appears *inside* a question's Evidence
  section as instrument-stamped observation ("ChatGPT (I-12, 2026-07)
  decomposes this question into…"), exactly as dated and superseded as any
  other observation.
- Unanswered observed questions publish honestly with their observation
  records — the telescope log, not just the discoveries.
- Humans navigate questions; machines navigate entities; both interfaces
  are organized around the durable layer.

## 8. Client Zero and the audit

The audit mapping sharpens under R2 — it becomes a **requirement-coverage
map organized by buying role**, with evaluator behavior as the observation
detail:

| Audit question | Observatory operation |
|---|---|
| Which questions exist in your market? | durable CQ set for your business problems and buyer roles, ranked by measured observation frequency |
| Which environments ask them? | evaluator observations per CQ (instrument-stamped) |
| Which questions do you answer? | coverage computation, your corpus as answer set |
| Which do competitors answer? | same, competitor corpus |
| Which remain uncovered? | the gap map, by requirement and gate |
| Which lack sufficient evidence? | ER-satisfaction distribution over your answered set |

Because the audit is organized on the durable layer, **it survives
evaluator turnover** — a customer's coverage map remains meaningful when
the next evaluator class arrives; only the observation records refresh.
That durability is precisely what makes the audit worth paying for, and it
is the same property that makes the research program credible. The
firewall is unchanged: audits report coverage; they never promise
evaluator behavior.

## 9. Epistemics and open problems (carried from R1, re-based)

- Evaluator observations carry N, windows, instrument stamps; frequency
  claims without sample sizes do not ship.
- **The ingestion pipeline (proposed M-4) remains the hard problem**, now
  with a sharper statement: consolidation must map observed expressions to
  durable questions — and deciding that two evaluator expressions are "the
  same durable question" is a judgment that must be auditable (expressions
  preserved verbatim, consolidation reasoning recorded) so editorial
  invention cannot re-enter through the mapping step.
- Declaring evidence requirements (ER objects) is itself research — what
  evidence *should* satisfy a requirement is a hypothesis until selection
  outcomes corroborate it. ERs carry tiers like everything else.

## 10. Founder decisions

- **FD-9 · Source access** — which observation sources exist today, under
  whose credentials.
- **FD-10 · The bootstrap set** — grandfather V1's six questions as
  `internal-research`-sourced, or require observed sources first.
- **FD-11 · M-4 ingestion method** — consolidation procedure needs founder
  review before the first real CQ ships.
- **FD-12 · Durable-layer seeds** *(new in R2)* — the first business
  problems, buyer roles, and requirement clusters to model. The durable
  layer should be seeded from evidence (interviews, engagements, observed
  prompts) like everything else; the founder decides which market to map
  first.

## 11. Rollout (proposed, not begun)

1. Vocabulary amendment recorded: five durable types
   (`business-problem`, `buyer-role`, `requirement`,
   `canonical-question`, `evidence-requirement`) + durable edge relations
   (`asked-by`, `evaluates`, `requires`, `observed-as`, `answers`,
   `motivated`) + method/source split.
2. Instrument registry seeded with evaluator implementations — including
   human buying committees as an evaluator class.
3. H-3 (generalized) registered; the six standing distinctions recorded as
   its sub-questions.
4. M-4 drafted; FD-9…FD-12 resolved.
5. Durable layer seeded from real evidence for one market (FD-12).
6. CQs published with honest coverage zeros; question index organized by
   business problem and buyer role.
7. Question-native rendering applied site-wide.
8. Coverage board; then audit tooling (Client Zero first).

---

*Architecture revised; nothing implemented. The organizing test, restated:
the company is organized around what survives technology change. Current
models live inside Evaluator Observation. They do not sit at the top of
the system — and in this schema, they cannot.*
