# The Question Observatory — Architecture

**Date:** July 14, 2026
**Author:** Claude — founding information architect
**Status:** ARCHITECTURE FOR REVIEW — deliberately unimplemented.
**Implementation gate:** M-4 (docs/M-4_PROPOSAL.md, v0.2 draft) must be
explicitly frozen by the founder before anything ships.

**Revision notes:**
- **R1** — the Question Observatory: observed canonical questions,
  computed coverage, the audit mapping.
- **R2** — durable/variable separation; platform names removed from the
  schema.
- **R3** — observer/observed separation; expressions vs. canonicalization;
  honest question classes.
- **R4** — the founder-ratified correction back toward the founding model:
  **requirements become the durable organizing spine.** Canonical
  questions demote to derived linguistic projections; requirement gates
  earn first-class status; requirements carry the same evidence-class
  discipline as questions; research confidence and evaluator confidence
  separate; requirement coverage becomes the headline metric. R3's
  residual error, preserved: it kept the canonical question as the
  organizing center when the founding documents ("buying committees apply
  requirements; requirements shape confidence…") had named the spine all
  along.

**The four-line constitution of this architecture:**

> Requirements are the commercial spine.
> Questions are the human interface.
> The graph is the machine interface.
> Evaluator environments are variable observation dimensions.

---

## 1. The durable spine

```
Business Problem
  → Buying Role
    → Requirement
      → Requirement Gate
        → Underlying Uncertainty
          → Observed Expression
            → Canonical Question
              → Evidence Requirement
                → Evaluator Observation
                  → Evaluator Confidence
                    → Recommendation
                      → Validation
                        → Selection
```

**The chain is the full model, not a mandatory workflow.** No object is
forced through every node. It expresses the durability gradient (business
problems outlive requirements; requirements outlive question wordings;
wordings outlive evaluator versions) and the evidence direction (raw
expressions below, derived objects above, outcomes corroborating at the
end).

### 1.1 The pre-requirement region

Not every commercial question begins with a crystallized requirement.
Early, problem-aware activity is first-class:

```
Business Problem
  → Uncertainty
    → Observed Expressions
      → Emerging Requirement        (formation is itself observable)
```

Uncertainties may attach directly to a business problem, an unresolved
objective, or a buying role when no requirement exists. **A requirement is
never retrofitted where the evidence supports only an unresolved problem
or uncertainty.** Requirement *formation* — the crystallization of an
uncertainty into a stated requirement — is an observable event, recorded
as requirement objects entering with status `emerging` plus the
observations that evidence the formation.

## 2. Requirements require evidence too

Durability does not confer observedness. Every requirement carries a
**source class** and evidence status; the laundering discipline applies
to requirements exactly as to questions:

| Source class | Claim | Integrity rule |
|---|---|---|
| **observed** | directly stated in admissible evidence (RFPs, security questionnaires, procurement checklists, direct buyer statements) | requires the evidencing artifacts as edges |
| **inferred** | derived from observed expressions or behavior | requires the declared inference method (M-4) + the generating cluster; provenance marked as shared with that cluster (§12.3) |
| **research-derived** | proposed by the program | provenance edges to the findings/theory that generated it; never counted as observed market behavior |
| **editorial** | navigation/explanation only | visible label; excluded from all market-coverage metrics |

## 3. Requirement gates — first-class, with the reasoning documented

**A requirement describes what must be true. A gate describes how that
requirement affects evaluation.**

The decision test: does the gate have independent state, behavior,
provenance, and relationships that need to be queried or revised
separately from its requirement? **Yes — first-class type `requirement-gate`
(RG-).** The losslessness argument for why a field cannot represent it:

- **Multiplicity:** one requirement may gate differently per buying role
  and stage (data residency is a hard gate for the security reviewer at
  validation, a soft differentiator for the economic buyer at comparison).
  A field on the requirement holds one gate; reality holds several.
- **Independent behavior:** gates carry their own observed states —
  firing, inactivity, qualification, differentiation, saturation,
  recommendation-set compression (or failure to compress), stage
  dependence, evaluator variation, flip-test sensitivity. These are
  observations *about the gate*, instrument-stamped, needing their own
  attachment point.
- **Independent revision:** a gate can saturate (everyone passes; it stops
  differentiating) while the requirement remains true and important. The
  gate's state changed; the requirement's didn't.
- **Independent provenance:** gate behavior is evidenced by flip tests and
  recommendation-set observations; requirement existence is evidenced by
  RFPs and statements. Different evidence, different chains.

Honesty note: this first-class status is granted largely on *expected*
observations — see §12.1.

Gates inherit the §2 source-class discipline (an asserted gate is not an
observed gate until firing behavior is evidenced).

## 4. Canonical questions — projections, not the spine

**A canonical question is a derived linguistic projection of:**

```
(Requirement | Underlying Uncertainty) × Buying Role × Buyer Stage × Intent
```

It helps humans navigate and normalizes observed expressions. It never
replaces the requirement or uncertainty that produced it. Wording may
vary across evaluator environments, channels, languages, buyer stages,
market maturity, and time — while the underlying requirement remains
stable; that divergence is itself a measured quantity (H-3).

Carried unchanged from R3: the three question classes
(observed-commercial / research-derived / editorial-navigation) with
their integrity rules; the V1 Philosophy questions as
`editorial-navigation`; canonical wording entailed by expressions;
competing canonicalizations preserved as `contested`; consolidation
method, version, and confidence on every CQ.

## 5. Two confidences, never conflated

**Research confidence** — how strongly *Upstream Zero* should believe an
observation, canonicalization, requirement, gate, finding, or mechanism.
Derived from evidence quality, replication, scope, method, and
corroboration. Computed, never stored (the tier-floor discipline).

**Evaluator confidence** — part of the *phenomenon*: the state expressed
or behaviorally demonstrated by an evaluator during commercial
evaluation. Always instrument-stamped, and internally typed per the
standing C-0002 ruling:

- `expressed` — what the evaluator *says* about its confidence
  (narration; capped evidence about mechanism), vs.
- `behavioral` — what re-sampling stability, flip-test resistance, and
  recommendation-set behavior *demonstrate*.

An evaluator loudly certain and behaviorally unstable is exactly the kind
of finding this distinction exists to catch.

## 6. Observer, observed, and the raw layer (carried from R3)

Evaluator environments (`evaluator-environment`, EE- — including human
buying committees) are the studied systems. Instruments are Upstream
Zero's observation procedures (protocol, sampling, session controls,
version capture, extraction, coding, replication, raw capture). Every
behavioral claim is double-stamped (environment × instrument). Observed
expressions (OE-) are verbatim, immutable, content-hashed, permanently
preserved; canonicalization never destroys them.

## 7. Coverage — requirement coverage leads; ten more follow

All computed at build, never stored. Market-coverage denominators count
only `observed` + `inferred` (declared-method) objects; editorial and
research-derived objects are reported separately and never inflate market
claims.

| Metric | Definition (computed) |
|---|---|
| **Requirement coverage** *(headline)* | requirements with ≥1 answered evaluating question ÷ requirements mapped |
| Business-problem coverage | business problems with mapped requirement/uncertainty structure |
| Requirement-gate coverage | gates with observed firing behavior ÷ gates asserted |
| Question coverage | observed-commercial CQs published ÷ observed (downstream of requirement coverage, reported as linguistic surface) |
| Answer coverage | CQs with a published resolved rendering |
| Evidence coverage | answers' tiers against their declared evidence requirements |
| Validation coverage | evidence requirements with validation conditions defined and testable |
| Evaluator-environment coverage | environments with fresh observation ÷ registered |
| Cross-evaluator stability | measured H-3 outputs: requirement/gate stability, expression variation |
| Linkage coverage | mean independent graph paths into each durable object |
| Provenance completeness | objects whose full chain (to raw evidence or declared gap) resolves |

## 8. H-3 — the architecture does not assume its own result

The observatory is built around requirements as the *durable candidate*.
That durability is a hypothesis, and the architecture must be able to
weaken or refute it:

**H-3: Durable commercial structure (requirements, gates) is more stable
across evaluator environments than its linguistic and behavioral surface
(question expressions, decomposition, prioritization, evidence
acceptance).**

Measured sub-tests: requirement stability across evaluators;
question-expression variation; gate stability; evidence transferability;
environment-dependent evidence; role and stage effects; requirement
formation differences across environments. Refutation condition: observed
requirement/gate structure proves as evaluator-volatile as its
expressions — in which case the spine reorganizes and this document gets
its most interesting revision.

## 9. Rendering — the public experience stays question-led

For humans, unchanged: Question → Immediate Answer → Explanation →
Evidence → Limitations → Related Questions, with class labels visible.
The human sitemap organizes by business problem and buying role.

For machines: the graph reads requirement-led — Business Problem →
Requirement/Uncertainty → Evidence → Evaluator Observation → Outcome —
through the object JSON, `/graph.json`, and `/llms.txt`.

The ontological demotion of questions changes nothing about how curiosity
is served. It changes what the answers are *organized by* underneath.

## 10. Client Zero and the audit

The audit is a **requirement gap map organized by buying role** — which
requirements you substantiate, which gates you fail or never fire, where
evidence is missing — with question-level and evaluator-level detail
beneath. Because the map is requirement-led it survives evaluator
turnover. Early-funnel honesty (§12.4): audits also report *uncertainty
coverage*, so problem-aware demand that has not crystallized into
requirements is not invisible to customers. Class discipline applies to
audit outputs; the firewall is unchanged.

## 11. The ontology extension, tallied (R4-final)

- **New types (9):** `business-problem`, `buyer-role`, `requirement`,
  `requirement-gate`, `uncertainty`, `canonical-question`,
  `observed-expression`, `evidence-requirement`, `evaluator-environment`.
- **Amended (1):** `instrument` — narrowed to Upstream Zero observation
  procedures.
- **Edges:** `asked-by`, `evaluates`, `gates` (RG→RQ), `resolves`
  (CQ→UN), `attaches-to` (UN→RQ | BP | BR), `expressed-as` (CQ→OE),
  `observed-in` (OE→EE), `captured-with` (OE→I), `requires` (CQ→ER),
  `answers`, `motivated`, `contests`, `formed-from` (RQ→UN, requirement
  formation).
- **Enums:** question class; requirement/gate source class; expression
  source method; environment class; evaluator-confidence kind
  (expressed | behavioral). Platform names appear in none of them.
- **Not types (restraint preserved):** clusters (field on requirement),
  validation conditions (fields on evidence-requirement), both
  confidences (derived / observation data), recommendation & selection
  (observations).

## 12. New tensions the requirement-centered model creates — the honest register

1. **Gate status granted on expected evidence.** RG- is first-class
   because of behaviors (firing, saturation, flip sensitivity) that we
   have not yet observed — the schema anticipates its hypothesis.
   Mitigation: the *type* exists; *instances* require observed gate
   behavior or an honest non-observed source class. Still, recorded.
2. **The headline metric is the last one measurable.** Requirement
   coverage needs a mapped requirement space (FD-12); at N=0 the
   observatory's most important number is undefined, not zero. The
   coverage board must render "unmapped" honestly rather than print zero.
3. **The inference loop.** Inferred requirements are derived from
   expression clusters; canonical questions are consolidated from the
   same clusters and then linked to those requirements. Evidence can be
   silently counted twice, and one coder decision can manufacture two
   apparently independent objects. Mitigation (binding on M-4): inferred
   requirements carry `provenance-shared` markers with their generating
   cluster; stability and coverage claims for inferred requirements
   require evidence *independent of* the founding cluster.
4. **Requirement-led audits under-represent the early funnel.** Where
   demand is problem-aware and requirements haven't formed, a
   requirement gap map shows nothing. Mitigation: uncertainty coverage is
   a first-class audit output (§10).
5. **Evaluator confidence meets C-0002.** "Confidence expressed by the
   evaluator" is narration; treating it as demonstrated state would
   violate the standing rationale ruling. Resolved by typing evaluator
   confidence `expressed | behavioral` (§5) — recorded here because the
   founder's constraint needed this refinement to stay consistent with
   the company's own epistemics.
6. **The name.** "Question Observatory" names the interface, not the
   spine. Truthful, but expect the question "isn't it really a
   Requirement Observatory?" — the answer (§9) belongs in the public
   FAQ… as an editorial-navigation question, properly labeled.

## 13. Founder-decision register

- **FD-9 · Source access** — which observation sources exist today, whose
  credentials.
- **FD-10 · V1 classification** — confirm the Philosophy six as
  `editorial-navigation`.
- **FD-11 · M-4 freeze** — review and explicitly freeze v0.2, including
  its open parameters (§14 of the proposal).
- **FD-12 · Durable-layer seed** — the first market's business problems,
  roles, and requirement clusters, from evidence.
- **FD-13 · Requirement-inference thresholds** *(new)* — how much
  expression support, of what diversity, licenses an inferred
  requirement (feeds M-4 §14).
- **FD-14 · Gate-instance evidence policy** *(new)* — what observed
  behavior licenses creating a gate instance vs. recording gate-like
  behavior on the requirement.

## 14. Rollout (proposed; M-4-gated; unchanged in shape)

M-4 frozen → vocabulary amendment recorded → environment registry +
instrument versions → H-3 registered → durable layer seeded from evidence
(FD-12) → expressions captured, requirements and CQs produced through
M-4 → site-wide question-led rendering with requirement-led graph →
coverage board (with "unmapped" honesty, §12.2) → audit tooling, Client
Zero first.

---

*R4 complete; nothing implemented. The correction is recorded as what it
is: not a new direction, but the observatory finding its way back to the
founding sentence — buying committees apply requirements.*
