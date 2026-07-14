# The Question Observatory — Architecture (R5-FINAL)

**Date frozen:** July 14, 2026
**Author:** Claude — founding information architect
**Status:** METHODOLOGY v1 — consolidated after the falsification review
(docs/ARCHITECTURE_REVIEW_V1.md), findings F-1–F-7 accepted and applied.
**Change policy from this revision forward:** architectural changes
require observed evidence, protocol failure, or demonstrated
contradiction. Intuition is no longer sufficient cause.

**Revision history:**
- **R1** — canonical questions, coverage, the audit mapping.
- **R2** — durable/variable separation; platforms out of the schema.
- **R3** — observer/observed split; expressions vs. canonicalization;
  honest question classes.
- **R4** — requirements become the durable spine (founder-ratified).
- **R5-final** — falsification consolidation: `evidence-requirement`
  removed as a type (F-1); one shared sourceClass vocabulary with
  type-specific integrity rules (F-2); three active coverage metrics
  (F-3); assignment failure feeds H-3 as evidence (F-4);
  baseline-before-publication rule (F-5); versioned coverage
  denominators (F-6); the live Philosophy title corrected (F-7).

**The four-line constitution:**

> Requirements are the commercial spine.
> Questions are the human interface.
> The graph is the machine interface.
> Evaluator environments are variable observation dimensions.

---

## 1. The durable spine

```
Business Problem
  → Buying Role
    → Requirement            (carries its own evidence needs — §2.1)
      → Requirement Gate
        → Underlying Uncertainty
          → Observed Expression
            → Canonical Question
              → Evaluator Observation
                → Evaluator Confidence
                  → Recommendation
                    → Validation
                      → Selection
```

The full model, not a mandatory workflow; no object is forced through
every node. The pre-requirement region is first-class: uncertainties
attach directly to business problems, objectives, or roles; requirements
are never retrofitted; requirement formation is an observable event
(`emerging` status + `formed-from` provenance).

## 2. The object model — Version 1 final

**Types to be added to the graph (8):**

| Type | ID | Role |
|---|---|---|
| `business-problem` | BP- | the commercial situation creating evaluation |
| `buyer-role` | BR- | who evaluates (economic buyer, security reviewer, …) |
| `requirement` | RQ- | what must be true; clusters as fields; **evidence needs, admissible evidence forms, validation conditions, current evidence coverage, and known evidence gaps as fields** (F-1 — the former `evidence-requirement` type is removed, not shelled; reason recorded here and in the review) |
| `requirement-gate` | RG- | how a requirement affects evaluation; instances evidence-gated |
| `uncertainty` | UN- | the open question beneath; may attach to BP/BR when no requirement exists |
| `canonical-question` | CQ- | derived projection: (RQ \| UN) × role × stage × intent |
| `observed-expression` | OE- | verbatim raw artifact; immutable, hashed, permanent |
| `evaluator-environment` | EE- | the studied systems, incl. human committees |

**Amended (1):** `instrument` — Upstream Zero observation procedures only.

**Edges:** `asked-by`, `evaluates`, `gates`, `resolves`, `attaches-to`,
`expressed-as`, `observed-in`, `captured-with`, `answers`, `motivated`,
`contests`, `formed-from`. (F-1 removed `requires`.)

**Not types (restraint):** clusters, evidence needs, validation
conditions (requirement fields); both confidences (derived / observation
data); recommendation & selection (observations).

## 3. Source classes — one vocabulary, type-specific tests (F-2)

One shared `sourceClass` for all derived durable objects:
**observed · inferred · research-derived · editorial** — with
type-specific admissibility tests:

| Object | `observed` requires |
|---|---|
| business problem | directly stated or clearly documented in admissible source material |
| requirement | directly stated as a condition, criterion, mandate, preference, or constraint (RFPs, questionnaires, checklists, direct buyer statements; evaluator-asserted requirements recorded as narration-derived per C-0002) |
| gate behavior | behaviorally demonstrated — evaluator observation under protocol, controlled test (flip test), or real procurement outcome |
| canonical question (observed-commercial) | supporting observed expressions via the frozen M-4 |

`inferred` always means: derived through the frozen M-4 procedure,
supporting expressions preserved, `provenance-shared` marker with the
generating cluster. `research-derived` and `editorial` carry their labels
visibly; editorial objects never enter market-coverage denominators.

## 4. Canonical questions, confidences, observer/observed (carried, final)

- CQ = derived linguistic projection of (requirement | uncertainty) ×
  buying role × buyer stage × intent; wording varies across environments,
  channels, languages, stages, and time; entailment rule binds wording to
  expressions; contested canonicalizations preserved. The projection
  lattice is instantiated sparsely by observed expressions — never
  enumerated.
- Research confidence (ours; derived, recomputable) and evaluator
  confidence (the phenomenon; instrument-stamped; typed
  `expressed | behavioral` per C-0002) remain strictly separate.
- Evaluator environments are the studied systems; instruments are our
  procedures; every behavioral claim is double-stamped; raw expressions
  are permanent.

## 5. Coverage — three active, eight defined (F-3, F-6)

**Active in Version 1:**

1. **Requirement coverage** *(headline)* — requirements with ≥1 answered
   evaluating question ÷ requirements mapped.
2. **Question coverage** — observed-commercial CQs published ÷ observed.
3. **Provenance completeness** — objects whose full chain resolves to raw
   evidence or a declared gap.

**Defined for future activation** (each activation is a recorded
revision, triggered by its inputs existing): business-problem coverage,
requirement-gate coverage, answer coverage, evidence coverage, validation
coverage, evaluator-environment coverage, cross-evaluator stability,
linkage coverage.

**Rendering rule:** an inactive metric renders as *"not yet measurable"*
or *"awaiting required inputs"* — never as zero, and never as an empty
chart, gauge, or placeholder visualization.

**Denominator versioning (F-6):** every coverage claim names its exact
map version and validity date —
`Requirement coverage: 12 of 31 · map RM-HEALTHCARE v0.3 · 2026-07-14`.
When a map changes, historical measurements remain valid against their
original versions; history is never silently recalculated.

## 6. H-3 — with its refutation channel wired open (F-4)

**H-3:** durable commercial structure (requirements, gates) is more
stable across evaluator environments than its linguistic and behavioral
surface.

The architecture is built around the durable *candidate* and must be able
to refute it. Accordingly — binding on M-4 — coder disagreement,
assignment difficulty, unresolved multi-requirement ambiguity,
unassigned-pool growth, and repeated splits/merges are **observations
relevant to H-3**, not merely instrument health. Both interpretations
(instrument noise vs. hypothesis failure) remain visible as competing
explanations until evidence distinguishes them, and M-4 defines the
review triggers at which assignment failure becomes evidence against
requirement identifiability, requirement stability, the
requirement/uncertainty distinction, or the durability assumption itself.

## 7. Baselines before publication (F-5)

For every new market or category, **before** its requirement map or
question coverage is published: capture baseline evaluator observations;
freeze protocols and evaluator versions; preserve raw outputs; record
dates and sampling conditions. All subsequent observations carry an
exposure label: `pre-publication baseline` · `post-publication
observation` · `potentially exposed` · `exposure status unknown`.
H-3 stability claims cite pre-publication baselines or declare their
absence. Client Zero participation is measured, never hidden.

## 8. Rendering (question-led public experience; F-7 applied)

The human pattern is unchanged: Question → Immediate Answer →
Explanation → Evidence → Limitations → Related Questions, with class
labels visible. The Philosophy page's six questions are
`editorial-navigation`; the page is titled to make no market-demand
claim (*"Questions we think an institution like this should answer"*)
and its machine rendering carries the same classification. The graph
reads requirement-led for machines.

## 9. The audit (carried, final)

A requirement gap map organized by buying role, with uncertainty coverage
reported alongside so early-funnel demand is never invisible; question
and evaluator detail beneath; class discipline on all outputs; coverage
claims map-versioned (F-6); the firewall unchanged.

## 10. Founder-decision register (final state)

| FD | Subject | Status |
|---|---|---|
| FD-9 | Source access (which sources, whose credentials) | **open — pilot scoping** |
| FD-10 | V1 Philosophy questions as editorial-navigation | **resolved 2026-07-14** (F-7 executed) |
| FD-11 | M-4 freeze | **resolved 2026-07-14** — frozen as Method v1.0 |
| FD-12 | First market to map | **open — pilot scoping** |
| FD-13 | Requirement-inference thresholds | **converted to pilot parameters** (declare before pilot; M-4 §16) |
| FD-14 | Gate-instance evidence policy | **converted to pilot parameters** (declare before pilot; M-4 §16) |

## 11. What happens next

Architectural expansion stops here. The next work is the first
controlled pilot using the frozen method: FD-9 and FD-12 scope it; the
pilot parameters (M-4 §16) are declared before it begins; F-4's data
stream produces the first evidence that will either strengthen or begin
to refute the spine this architecture stands on. Either result is the
observatory working.
