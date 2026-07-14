# The Question Observatory — Architecture

**Date:** July 14, 2026
**Author:** Claude — founding information architect
**Status:** ARCHITECTURE FOR REVIEW — deliberately unimplemented.
**Implementation gate:** nothing ships until M-4 is designed, reviewed,
and explicitly frozen by the founder (§10, docs/M-4_PROPOSAL.md).

**Revision notes (practicing our own discipline):**
- **R1** introduced the Question Observatory: canonical questions as
  observed first-class objects, mandatory source provenance, computed
  coverage, the Client Zero audit mapping.
- **R2** applied the durable/variable correction: platform names removed
  from the schema; the durable commercial chain organizes the system.
- **R3** applies three founder corrections. R2's errors, preserved for the
  record: **(a)** it registered evaluator environments as Instruments —
  conflating *what is studied* with *how we observe it* (the telescope is
  not the star); **(b)** it treated the canonical question as if directly
  observed, when canonicalization is interpretation performed on raw
  expressions; **(c)** its no-invented-questions rule was too absolute,
  prohibiting legitimately research-derived and navigational questions
  instead of typing them honestly.

---

## 0. The two layers (unchanged in R3)

**THE DURABLE LAYER** — commercial reality, stable across technology
change: business problems, buying roles, requirements and gates,
underlying uncertainties, evidence and validation needs, confidence,
selection.

**THE VARIABLE EVALUATOR LAYER** — the implementations through which the
durable layer is expressed at any moment: current AI systems, search
surfaces, procurement systems, human buying committees, future evaluator
classes. Platform names never appear in the schema; they are registry
data. The organizing test stands: *if every current AI product disappeared
tomorrow, the schema would not notice.* The Observatory must never become
a prompt-monitoring system organized around current platforms.

## 1. Observer and observed — the R3 separation

**Evaluator / Evaluation Environment = what is being studied.**
ChatGPT, Google AI Mode, Copilot, Bing, Claude, Perplexity, human buying
committees, procurement agents: these are the *subjects* of observation.
New type: `evaluator-environment` (EE-), carrying identity, class
(ai-assistant, search-surface, procurement-system, human-committee, …),
version/variant where applicable, and validity windows.

**Instrument / Method = how Upstream Zero observes and measures.**
The Instrument type returns to its true meaning: *our* observation
procedures — each instrument version specifying prompt or interaction
protocol, sampling method, session controls, model/version capture,
date and validity window, extraction method, scoring or coding procedure,
replication rules, and raw-output capture. An instrument observes an
environment; it is never the environment.

**The observation chain, fully separated:**

```
Canonical Question
  → Evaluator Environment        (what was studied)
    → Observation Event          (when and what happened)
      → Instrument Version       (how we observed it)
        → Raw Evidence           (verbatim capture, content-hashed)
          → Coding               (our interpretation, versioned)
```

Every claim about an evaluator's behavior is therefore stamped twice: with
the environment it describes and the instrument that produced it — so
"ChatGPT decomposes this question into X" is always, precisely, "under
protocol I-n vN, environment EE-m exhibited X, raw output E-k."

## 2. The three question layers — observation vs. interpretation

R3's second correction, modeled explicitly:

**Layer 1 — Observed Expression** (`observed-expression`, OE-): the raw,
verbatim artifact — a prompt, search query, buyer wording, evaluator
follow-up, interview statement. Immutable once captured; content-hashed;
stamped with source, evaluator environment, instrument, and date;
preserved permanently. **Canonicalization never destroys expressions.**

**Layer 2 — Canonical Question** (`canonical-question`, CQ-): a **derived
research object** — the normalized question that groups expressions
believed to resolve the same underlying uncertainty. The grouping is
interpretation, and the object says so on its face. Every CQ carries:

```
supporting expressions        edges → OE objects (mandatory for the
                              observed-commercial class, §3)
consolidation method+version  → M-4 vN (the procedure that produced it)
consolidation confidence      coded per M-4
competing canonicalizations   edges → rival CQs, status: contested —
                              disagreements preserved, never silently merged
first / last observed         derived from expression dates
evaluator distribution        derived from expression stamps
uncertainty / requirement     edges → UN / RQ objects
revision history              splits and merges are recorded Revisions
```

The canonical *wording* is chosen, not observed, and is never presented as
a direct observation.

**Layer 3 — Underlying Uncertainty** (`uncertainty`, UN-): the durable
structure that explains why the question exists — what the asker is
actually trying to resolve. Links upward to the requirement or gate it
concerns; multiple CQs may resolve the same uncertainty.

**The durable sequence (R3-final):**

```
Business Problem
  → Buying Role
    → Requirement (clusters; gates)
      → Underlying Uncertainty
        → Canonical Question            [derived research object]
          → Observed Expression          [raw data]
            → Evaluator Observation      [environment × instrument × event]
              → Evidence
                → Confidence             [derived, never stored]
                  → Recommendation / Selection   [observations]
```

The evaluator-specific wording is the most variable thing in the system;
the requirement and underlying uncertainty are the most durable.

## 3. Question classes — the refined invention rule

R2's absolute rule ("no editorially invented questions") replaced with
honest typing. Every CQ carries a `class`, each with its own integrity
rule:

| Class | Claim it makes | Integrity rule (build-enforced where possible) |
|---|---|---|
| **observed-commercial** | "the market asks this" | requires supporting observed expressions via M-4; cannot exist without them |
| **research-derived** | "the program generated this" | requires provenance edges to the findings, theory, mechanism competition, unexplained observations, or framework gaps that generated it; explicitly labeled |
| **editorial-navigation** | none — "this helps humans navigate existing knowledge" | makes no market-demand claim, renders with a visible class label, excluded from all market-coverage denominators |

Consequences:

- **The Philosophy page's six V1 questions are `editorial-navigation`**
  (institution-facing), not grandfathered into the commercial class. If
  external observations later show buyers actually ask them, they can be
  re-classed — with the expressions as evidence, through M-4, as a
  recorded revision. This is the anti-laundering rule: our preferred
  framing never masquerades as observed market behavior. (Supersedes
  FD-10 as previously framed; the founder decision is now simply to
  confirm this classification.)
- Research-derived questions are first-class citizens of the observatory
  — findings legitimately generate questions — they are simply never
  counted as market demand.

## 4. The variable layer — the environment registry

Evaluator environments (EE-) register with class, identity, version
lineage, and validity windows — including **human buying committees as an
evaluator class**. Instruments (our procedures) version separately.
Observation events join the two. When an environment dies, its
observations remain valid history; when our procedure changes, the
instrument version records it. Neither change touches the durable layer.

## 5. The standing research questions (unchanged from R2)

The Observatory's measured distinctions: questions durable across
evaluators; expressions specific to one evaluator; requirements stable
across technology change; evidence that transfers across evaluators;
evidence that is environment-dependent; evaluator-specific decomposition
and prioritization. Registered under generalized H-3 with refutation
conditions; never assumed.

## 6. Coverage — computed over the durable layer (re-based in R3)

All computed at build, never stored. Market-coverage denominators count
**observed-commercial CQs only**; editorial-navigation questions never
inflate coverage claims; research-derived questions count toward program
coverage, reported separately.

| Coverage | Definition (computed) |
|---|---|
| Question | observed-commercial CQs published ÷ observed |
| Answer | CQs with a published resolved-question rendering |
| Evidence | answers' tiers against their declared evidence requirements |
| Requirement | requirements/gates with ≥1 evaluating CQ answered |
| Environment | environments with fresh observation ÷ environments registered |
| Link | mean independent graph paths into each durable object |

## 7. Rendering integration (pattern unchanged; labels added)

The V1 six-part pattern stands. R3 adds: every question page displays its
**class** in the apparatus voice (an editorial-navigation page says so — 
"editorial · written for navigation, not observed demand"), and
evaluator-specific expression appears inside Evidence as
double-stamped observation (environment × instrument), dated like
everything else. The human sitemap organizes by business problem and
buying role. There will never be a per-platform question page.

## 8. Client Zero and the audit (unchanged from R2, one addition)

The audit remains a requirement-coverage map organized by buying role,
surviving evaluator turnover. R3 addition: audit outputs inherit the
class discipline — an audit can only claim "your market asks X" from
observed-commercial CQs with expression support; everything else is
labeled as derived or navigational. The firewall is unchanged.

## 9. The ontology extension, tallied honestly (R3-final)

Recorded as a Method revision upon approval:

- **New types (8):** `business-problem`, `buyer-role`, `requirement`,
  `uncertainty`, `canonical-question`, `observed-expression`,
  `evidence-requirement`, `evaluator-environment`.
- **Amended type (1):** `instrument` — meaning narrowed to Upstream Zero
  observation procedures only.
- **New edge relations:** `asked-by`, `evaluates`, `resolves`
  (CQ → uncertainty), `expressed-as` (CQ → OE), `observed-in`
  (OE → evaluator-environment), `captured-with` (OE → instrument),
  `requires` (CQ → evidence-requirement), `answers`, `motivated`,
  `contests` (CQ ↔ CQ, competing canonicalizations).
- **New enums:** question class; expression source method; environment
  class. Platform names appear in none of them.

This is a materially larger extension than R2 admitted (eight types, not
five). The restraint principle survives in what did *not* become types:
clusters and gates (fields on requirement), validation needs (fields on
evidence-requirement), confidence (derived), recommendation/selection
(observations).

## 10. M-4 — the gate

M-4 (canonical question ingestion and consolidation) is the unresolved
core, and it now gates everything: **no Canonical Question may be
implemented or published until M-4 is designed, reviewed, and explicitly
frozen.** A proposed outline exists at `docs/M-4_PROPOSAL.md` — it is a
draft for review, not an approved method, and says so in its header.

## 11. Founder decisions

- **FD-9 · Source access** — which observation sources exist today, under
  whose credentials.
- **FD-10 (reframed) · V1 classification** — confirm the Philosophy six as
  `editorial-navigation`.
- **FD-11 · M-4** — review, amend, and explicitly freeze the method.
- **FD-12 · Durable-layer seeds** — which market's business problems,
  buying roles, and requirement clusters to map first, from evidence.

## 12. Rollout (proposed, not begun; M-4-gated)

1. M-4 reviewed and frozen (FD-11). Nothing below happens first.
2. Vocabulary amendment recorded (§9).
3. Environment registry seeded (including human committees); first
   instrument versions specified per M-4.
4. Generalized H-3 registered.
5. Durable layer seeded from evidence for one market (FD-12).
6. First observed expressions captured; first CQs consolidated through
   M-4; published with class labels and honest coverage zeros.
7. Question-native rendering applied site-wide; V1 questions re-labeled
   `editorial-navigation` (FD-10).
8. Coverage board; then audit tooling (Client Zero first).

---

*Architecture revised per the founder's corrections; nothing implemented.
The observer is not the observed; the canonical is not the raw; the
invented is not the observed — and the schema now knows all three.*
