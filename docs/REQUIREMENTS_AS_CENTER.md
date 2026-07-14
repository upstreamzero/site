# Are Requirements More Fundamental Than Questions? — An Analysis

**Date:** July 14, 2026
**Status:** analysis only — no architecture changed. Requested by the
founder before freezing M-4, to test whether Canonical Questions were
accidentally made more fundamental than they are.
**Epistemic status:** argued position; the verdict is at §4.

---

## 1. The founder's hypothesis, stated fairly

Requirements are the durable commercial object. Canonical questions are
one *representation* of requirements — their observable linguistic
expression. Observed expressions are evidence that the questions actually
occur. Requirements survive evaluator changes, model changes, wording
changes, language changes, and search-behavior changes. Questions do not.

## 2. The case for requirements as the center

**2.1 The invariance test — requirements win it.** A question is a
linguistic act: it varies by language (a German buyer asks differently),
by modality, and — decisively — by *whether questioning happens at all*.
A procurement RFP contains no questions; it contains requirements,
directly observable as requirements. A requirement gate ("must support
data residency in region X") manifests as a question in a chat evaluator,
as a line item in an RFP, as a checklist in a security review, and as an
unstated filter in a human committee. The requirement is the thing all
four share. Questions are one surface of it — exactly as the hypothesis
claims.

**2.2 The founding documents already say this.** COMPANY.md's purpose
statement begins: *"Buying committees apply requirements. Requirements
shape confidence; confidence shapes recommendations; recommendations shape
selection."* Requirements drive the founding causal chain. "Commercial
requirements" and "requirement gates" are named research areas from day
one, and "requirement coverage" is a field in the machine-representation
vision. Centering requirements is not a new idea being tested against the
architecture — it is the architecture drifting back toward the founding
documents. That convergence is evidence, not coincidence.

**2.3 Selection causality runs through requirements.** Selection outcomes
are produced by requirement satisfaction, weighted by role and stage —
not by question-answering per se. Questions are instruments by which
evaluators assess requirements. An observatory that wants to reach the
apex evidence tier (real-world selection corroboration) needs its spine
aligned with what causes selection.

**2.4 The audit is requirement-shaped.** Customers do not want "question
coverage" as such; they want to know which requirements they fail to
substantiate (CAP-2 has said this since v0.1). Requirement coverage is
also the more honest metric: question counts inflate under linguistic
multiplicity — ten phrasings of one requirement are one gap, not ten.

**2.5 The architecture should anticipate its own most probable finding.**
H-3's most likely outcome is precisely: requirements stable across
evaluators, question formulations evaluator-specific. If the program
expects to *discover* that requirements are the invariant, building the
observatory around questions would mean rebuilding it upon confirmation.

## 3. The steelman for questions — and what survives of it

**3.1 Observability.** Questions and expressions are observed;
requirements are mostly inferred. An observatory organized around its
least-observable object risks centering interpretation — a worse version
of the sin R3 just corrected. *What survives:* partially. Requirements
are directly observable in procurement artifacts (RFPs, gate lists,
security questionnaires) and indirectly in evaluator behavior. But most
requirements in most markets will be inferred from expression clusters —
so requirement objects need the same evidence discipline as everything
else (§5.4), or the laundering risk simply moves up one level.

**3.2 The pre-requirement region.** Not every question expresses a
requirement. Early-stage, problem-aware questions ("why does onboarding
keep failing?") precede requirement crystallization; requirements are a
mid-funnel artifact. A requirement-only spine would amputate the front of
the buying journey. *What survives:* fully — the model must allow
uncertainties to attach directly to business problems where no
requirement yet exists, with requirement *formation* itself becoming an
observable event worth studying.

**3.3 Humans arrive with questions.** The founder's own rendering ruling.
*What survives:* fully — but it is an argument about the human interface,
not about the ontology's center. Nothing about a requirement spine forces
category-based navigation back on humans.

**3.4 Durability is a gradient, not a crown.** Business problems outlive
requirements (a residency requirement exists because of a regulatory era;
the underlying problem — "we must not leak patient data" — outlives the
regulation's specific form). The chain already encodes the durability
gradient; "which node is the center" matters less than the ordering being
correct. *What survives:* as a caution — adopting requirements as the
spine should not be oversold as adopting the *most* durable object, but
the most durable object that is still commercially specific enough to
organize coverage.

## 4. Verdict

**The founder's hypothesis is correct, with two guards.**

Requirements (with underlying uncertainty as their epistemic face) should
become the durable organizing spine. Canonical questions demote to
**derived linguistic representations** — precisely: a CQ is a stable
projection of (requirement × buying role × stage × intent) into language.
Observed expressions sit beneath both as the raw evidence layer, which
also makes the founder's reordering (expressions before canonical
questions in derivation order) the epistemically correct one — R3 drew
the CQ above the OE, quietly implying the derived object outranked its
data.

**Guard 1 — the pre-requirement region stays representable.** Every CQ
links to an uncertainty; every uncertainty links to a requirement *or*
directly to a business problem when no requirement has crystallized.
Requirement formation becomes an observable event, not a modeling
assumption.

**Guard 2 — the human interface does not change.** Questions remain how
humans (and question-shaped retrieval systems) enter. The demotion is
ontological, not experiential: *requirements are the commercial spine,
questions are the human interface, the graph is the machine interface.*
The public name "Question Observatory" survives because it names the
interface truthfully; the map beneath it is a requirement map.

## 5. Implications before implementation (as requested)

1. **The chain reorders** to the founder's proposed sequence, with Guard
   1's escape hatch. Schema delta is small: edge-cardinality rules and
   ordering, not new types — R3's types all survive.
2. **Coverage re-bases again.** Requirement coverage becomes the headline
   metric (the audit's native unit); question coverage becomes a secondary
   linguistic-surface metric; expression counts stop being confusable with
   demand breadth.
3. **M-4 gains a primary assignment step.** Consolidation ultimately maps
   expression clusters to (requirement × role × stage) coordinates;
   canonical wording remains the linguistic layer on top. The draft's
   §5 (uncertainty assignment) becomes two steps: uncertainty, then
   requirement-or-business-problem linkage.
4. **The class discipline extends to requirements — the critical
   addition.** A requirement claimed to exist in a market needs evidence:
   observed in procurement artifacts, gates, or expression clusters —
   else it is research-derived or editorial and says so. Without this,
   demoting questions just relocates the laundering risk from "invented
   questions" to "invented requirements."
5. **H-3 sharpens.** Requirement stability across evaluators stops being
   one sub-question and becomes the observatory's central measured claim.
6. **The audit speaks its native language** — requirement gap maps by
   buying role, with questions as the linguistic detail — which is what
   CAP-2 promised in prose all along.

## 6. What this analysis does not do

It does not change QUESTION_OBSERVATORY.md, the IA, or M-4. If the
founder ratifies the verdict, those revise together (Observatory R4, M-4
draft v0.2) in one pass — before the freeze, so the method is designed
against the correct spine on the first freeze rather than amended after.
