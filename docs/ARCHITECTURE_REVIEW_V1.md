# Methodology v1 — Falsification Review

**Date:** July 14, 2026
**Mandate:** attempt to falsify the Question Observatory architecture
(R4) and M-4 (v0.2). Contradictions, circular dependencies, hidden
assumptions, over-modeling, unnecessary complexity only. No new
capabilities proposed. Argue removals, merges, simplifications where
warranted.
**Verdict up front:** the spine survives. Two components should be
removed or merged, one rollout should be cut to a third of its size, and
four genuine defects need binding fixes before freeze — the worst being a
circularity that would let the architecture absorb its own refutation as
measurement noise, and a live contradiction already published on the
website.

---

## 1. Findings that should change the architecture

### F-1 · REMOVE: `evidence-requirement` as a type — demote to fields (over-modeling)

The weakest object in the set. Applying the founder's own decision test
(independent state, behavior, provenance, relationships queried or
revised separately): ER fails it *today*. No method exists for declaring
one; no instance can exist at v1; its content (what evidence would
satisfy a requirement + validation conditions) attaches naturally as
fields on `requirement`. R4 already conceded ERs are "hypothesis work" —
a type whose every instance is speculative is scaffolding for a building
that may never be built. **Recommendation:** demote to
`evidenceNeeds` / `validationConditions` fields on requirement;
reinstate as a type only when some ER demonstrably needs independent
provenance or revision. Cost of demotion now: one edge relation removed.
Cost of premature type: permanent URL namespace, schema surface, and M-4
§12 machinery for objects with no evidence pathway. Types: 9 → 8.

### F-2 · MERGE: four parallel class systems into one (unnecessary complexity)

Questions, requirements, gates, and business problems each carry a
nearly identical class discipline (observed / inferred / research-derived
/ editorial, with per-class integrity rules). Four vocabularies that
differ only in noun invite drift — a future revision tightens one and
forgets the others. **Recommendation:** one shared `sourceClass` enum and
one integrity-rule table applied uniformly to every derived durable
object. No expressive power is lost; a whole category of future
inconsistency is deleted.

### F-3 · CUT: implement three coverage metrics, not eleven (over-instrumentation)

Eleven metrics at N=0 is dashboard theater waiting to happen — eight of
them cannot be computed until inputs exist that are months away, and
"defined but fake-rendered" violates the no-fake-evidence rule. 
**Recommendation:** the doc keeps all eleven definitions (cheap,
useful); v1 *implements* three — requirement coverage (headline, with
"unmapped" honesty), question coverage, provenance completeness — and
each remaining metric activates only when its inputs exist. Activation
events are recorded revisions.

## 2. Defects requiring binding fixes before freeze (keep, but fix)

### F-4 · The self-refutation absorber (circular dependency — most serious finding)

H-3 claims requirements are more evaluator-stable than their surfaces.
But M-4 *constructs* requirement objects by having coders assign
expressions to requirements — the procedure presupposes requirements are
identifiable and stable enough to be assignment targets. **If H-3 is
false, the failure will first appear as coder disagreement and assignment
difficulty — which M-4 v0.2 files under "instrument health."** The
architecture would digest its own refutation as measurement noise and
report healthy requirements with a slightly noisy instrument.
**Binding fix (one sentence in M-4, no new machinery):** assignment
difficulty, coder disagreement rates, and `unassigned`-pool growth are
*data feeding H-3*, published as such — not merely instrument health. A
threshold (open parameter) above which assignment failure counts as
evidence against requirement identifiability itself.

### F-5 · Client Zero can manufacture H-3's confirmation (circular dependency)

Once we publish a market's requirement map, evaluators may ingest it.
Later observations could then find "cross-evaluator requirement
stability" that *we caused* — the observatory confirming its own
taxonomy via contamination. EXP-0001 measures propagation generally but
does not protect H-3 specifically. **Binding fix (an ordering constraint,
not machinery):** baseline evaluator observations for a market must be
captured *before* that market's requirement map is published; H-3
stability claims for any market cite pre-publication baselines or declare
their absence.

### F-6 · Coverage denominators are gameable by the mapper (hidden assumption)

"Requirement coverage = answered ÷ mapped" assumes the map is honest —
but we control the denominator, and a conservative map inflates coverage.
The laundering risk, relocated into arithmetic. **Binding fix:** every
coverage claim carries its map version and the mapping method; the
denominator's provenance is inspectable like any claim.

### F-7 · The live site already contradicts R4 (contradiction, published)

The Philosophy page's title — *"The questions we are actually asked"* —
claims observed demand for six questions that R4 classifies as
`editorial-navigation`. The architecture's anti-laundering rule is being
violated by our own homepage-adjacent copy, today. **Binding fix (first
implementation item after freeze):** retitle (e.g., "Questions worth
answering") and surface the class label, exactly as §7 of the Observatory
doc already requires.

## 3. Attacks the architecture survived (kept, with the attack recorded)

- **"The whole durable layer is intuition-derived — doesn't that violate
  evidence-first?"** Resolved: the *schema* is the instrument, and
  instruments legitimately precede observation (a telescope is designed
  before first light); every *instance* is evidence-gated. The apparent
  self-contradiction dissolves cleanly, and this sentence is the reason
  the architecture can stop expanding: the instrument is built.
- **"`uncertainty` and emerging `requirement` are indistinguishable in
  practice."** Partially survived. The pre-requirement region genuinely
  needs the distinction, but coders will struggle at the boundary.
  Pre-freeze M-4 addition (a distinguisher, not a concept): a requirement
  is a falsifiable statement about what a solution must satisfy; an
  uncertainty is an open question about the problem or world. Boundary
  disagreement feeds F-4's data stream. Prediction recorded: if coder
  agreement on this boundary stays low after real use, the types merge —
  by evidence, as the founder now requires.
- **"`requirement-gate` was granted first-class status on expected
  evidence."** Survives because the schema cost is low and instances are
  already evidence-gated (FD-14). The type is a berth, not a claim.
- **"The projection lattice (requirement × role × stage × intent)
  explodes combinatorially."** Survives via a rule that existed but was
  implicit — now explicit: the lattice is *instantiated sparsely by
  observed expressions, never enumerated*. No expression, no CQ.
- **"Assignment determinacy is assumed"** — buyer role/stage often isn't
  recoverable from verbatim text. Survives via the `unassigned` pool,
  with F-4's threshold making pool growth evidentially meaningful.
- **Minor, for M-4's parameter list:** multilingual expressions make the
  entailment rule translation-dependent; the wording-selection step needs
  a language note when it happens.

## 4. What this review did not find

No contradiction in the durable/variable separation, the
observer/observed split, the three question layers, the two confidences,
or the rendering model. The chain ordering held under attack. The
evidence-class discipline is the architecture's strongest component —
F-2 asks only that it be written once instead of four times.

## 5. Disposition summary

| # | Finding | Disposition |
|---|---|---|
| F-1 | evidence-requirement type | **remove** (demote to requirement fields) |
| F-2 | four class systems | **merge** into one sourceClass discipline |
| F-3 | eleven live metrics | **cut** to three at v1; activate by evidence |
| F-4 | self-refutation absorber | keep + binding M-4 fix (disagreement-as-data) |
| F-5 | Client Zero × H-3 contamination | keep + binding ordering constraint (baseline-before-publication) |
| F-6 | gameable denominators | keep + map-version stamping |
| F-7 | live-site title contradiction | fix at first implementation |
| — | uncertainty/requirement boundary | keep + M-4 distinguisher; merge later only on evidence |
| — | requirement-gate, lattice, unassigned pool | survive as designed |

**If the founder accepts F-1 through F-7, the changes are one pass over
two documents (Observatory → R5-final, M-4 → v0.3), and M-4 is ready to
freeze.** From that point, per the founder's ruling, architectural change
requires evidence — and F-4's data stream is where the first such
evidence will come from.
