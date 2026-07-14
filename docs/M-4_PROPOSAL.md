# M-4 (PROPOSED) — Ingestion & Consolidation for the Requirement-Led Observatory

**Status: DRAFT v0.2 — NOT AN APPROVED METHOD.**
For founder review (FD-11). It carries no authority and becomes M-4 only
when explicitly frozen. Until then no canonical question, inferred
requirement, or gate instance may be produced by it or any other
procedure.

**Revision:** v0.1 was question-centered. v0.2 rebuilds the pipeline
around the requirement spine (QUESTION_OBSERVATORY.md R4) and adds
requirement observation, inference, formation detection, gate-behavior
identification, and the anti-double-counting rules the inference loop
demands (Observatory §12.3).

---

## 0. The full ingestion path

```
Raw Source
  → Observed Expression                     (§1–3: admissibility, capture, permanence)
    → Business Problem / Buying Role assignment        (§4)
      → Requirement or Uncertainty assignment          (§5–7)
        → Requirement confidence + source class        (§8)
          → Canonical-question consolidation           (§9–10)
            → Evaluator-environment observation        (§11)
              → Evidence-requirement linkage           (§12)
                → Revision / split / merge             (§13)
```

Stages apply as evidence permits; the path is the full model, not a
mandatory conveyor (an RFP-observed requirement enters at §5 with no
expression cluster; an early-funnel expression may stop at uncertainty).

## 1. Observed expressions — admissibility (carried from v0.1)

Verbatim interaction artifacts only: raw prompts, search queries, buyer
wordings, evaluator follow-ups, interview statements. Mandatory capture:
verbatim text, timestamp, evaluator-environment (EE-), instrument version
(I-), source method, consent state for human sources. Inadmissible:
hearsay, recollected paraphrase, expressions we invented to illustrate,
model output generated on request as "typical questions."

## 2. Admissible requirement observations (new in v0.2)

A requirement may be recorded as **observed** only from:

- an RFP or tender document stating it (artifact captured, hashed)
- a security questionnaire or procurement checklist item
- a direct buyer statement (verbatim, consented)
- an evaluator's explicit requirement assertion during evaluation
  (double-stamped; note this is evaluator narration and is recorded as
  such — it evidences that the *evaluator applies* the requirement, not
  that buyers hold it)

Each observed requirement carries its evidencing artifacts as edges. A
requirement without such artifacts is `inferred`, `research-derived`, or
`editorial` — never silently "observed."

## 3. Raw permanence (carried, unchanged)

Expressions and requirement artifacts are immutable, content-hashed,
permanently preserved; PII redaction on capture with declared redactions;
no downstream step may edit, delete, or overwrite the raw layer. Splits,
merges, and re-classifications re-point edges only.

## 4. Business-problem and buying-role assignment

Each expression (or requirement artifact) is assigned a business problem
and, where determinable, a buying role — with written rationale. Where
role is not determinable it is recorded as `unassigned`, never guessed.
New business problems require the same evidence discipline (a problem
claimed to exist in a market needs observed support or an honest
non-observed class).

## 5. Requirement-or-uncertainty assignment

- If admissible requirement observation exists (§2): link to the observed
  requirement.
- Else, if the expression cluster supports inference (§6): create or link
  an `inferred` requirement.
- **Else: assign to an uncertainty attached to the business problem, and
  stop there.** A requirement is never retrofitted where evidence
  supports only an unresolved problem or uncertainty (Observatory §1.1).

## 6. Inferred requirements — creation rules

An inferred requirement may be created from an expression cluster only
when: the cluster meets the support threshold (FD-13 parameters:
≥ N expressions, ≥ M distinct source methods); the requirement statement
is **entailed by the cluster** (no scope beyond what expressions imply);
the inference method and coder are recorded; and the requirement carries
a **`provenance-shared` marker** naming its generating cluster.

**Anti-double-counting (binding):** evidence shared between an inferred
requirement and its cluster's canonical questions is counted once in any
coverage or stability metric; claims about an inferred requirement's
stability or market breadth require evidence *independent of the founding
cluster* (new sources, new environments, or direct observation per §2).

## 7. Requirement formation detection

Formation — an uncertainty crystallizing into a requirement — is recorded
when time-separated evidence shows the transition (early expressions
resolve an open uncertainty; later expressions or artifacts state a
requirement). The requirement enters with status `emerging`, a
`formed-from` edge to the uncertainty, and the dated evidence of the
transition. Formation events are observations of market behavior and are
publishable findings in their own right.

## 8. Requirement confidence and source class

Source class per Observatory §2 (observed / inferred / research-derived /
editorial). Research confidence coded per class-specific criteria:
artifact quality and diversity for observed; cluster support, entailment
tightness, and coder agreement for inferred. Evaluator-asserted
requirements are noted as narration-derived (§2, last bullet) and capped
accordingly. Confidence is derived and recomputable — never a hand-set
number.

## 9. Canonical-question consolidation (carried from v0.1, re-based)

The clustering, resolution test ("would a complete answer to one fully
resolve the other, for the same role at the same stage?"),
default-to-separate rule, entailment rule for canonical wording, and
contested-canonicalization preservation all carry forward unchanged — 
with one re-basing: a CQ is consolidated **as a projection of its
assigned requirement-or-uncertainty × role × stage × intent** (Observatory
§4). Role and stage are consolidation dimensions, not annotations:
expressions identical in wording but differing in role or stage remain
separate questions.

## 10. Ambiguity and multiplicity

- **One expression, multiple requirements:** an expression may evidence
  more than one requirement (edges to each, with rationale); its evidence
  weight divides rather than duplicates in coverage metrics.
- **Ambiguous expressions:** where requirement/uncertainty assignment is
  genuinely unresolvable, the expression is held in an explicit
  `unassigned` pool — visible backlog, never forced. Ambiguity is data
  (it may itself evidence an unformed requirement).

## 11. Evaluator-environment observation

Every expression and evaluator observation carries its EE- and I- stamps;
evaluator confidence records are typed `expressed | behavioral`
(Observatory §5); frequency and distribution statistics are computed from
stamps, never asserted.

**Gate-behavior identification (new):** gate instances are created only
from observed gate behavior under a declared protocol — e.g., flip tests
(vary one requirement's satisfaction in controlled inputs; observe
recommendation-set change), firing/inactivity observation across matched
scenarios, saturation checks (does the gate still differentiate?), stage
and role variation. A gate without such observations may exist only under
an honest non-observed source class (FD-14 sets the instance policy).

## 12. Evidence-requirement linkage

Where the graph declares what evidence would satisfy a requirement
(ER- objects), answers link through them; validation conditions live on
the ER. Declaring an ER is hypothesis work and carries research
confidence like everything else.

## 13. Revision, split, and merge (carried, extended)

Splits and merges of requirements, gates, uncertainties, and CQs are
Revision objects with reasons and impact; IDs never reused; superseded
objects remain published with forward pointers; expressions re-point; the
raw layer is untouched. Class changes (editorial → observed, emerging →
established, contested resolutions) are revisions carrying their new
evidence.

## 14. Safeguards against editorial invention (carried, extended)

The class systems (questions *and* requirements *and* gates *and*
business problems); the entailment rules (canonical wording ≤ its
expressions; inferred requirements ≤ their clusters); the audit trail
(every derived object resolves to verbatim raw evidence or a declared
gap in a fixed number of clicks); periodic laundering checks sampling
derived objects for drift beyond entailment — drift findings published
as revisions; the provenance-shared markers making the inference loop
visible rather than deniable.

## 15. Replication and coder discipline (carried)

Independent re-coding at target agreement (parameter); single-coder
periods declared on every affected object with time-separated
self-agreement substituting, honestly labeled; agreement rates published
as instrument health.

## 16. Open parameters — must be set before freeze

1. N / M support thresholds: per confidence grade, for
   observed-commercial CQ admission, and for inferred-requirement
   creation (FD-13).
2. Coder-agreement targets and re-coding cadence.
3. Redaction and consent policy for human-derived material.
4. Search-frequency admission gates (a query seen once vs. a pattern).
5. Gate-instance evidence policy (FD-14): minimum observed behaviors to
   instantiate a gate.
6. Independence criterion for §6's anti-double-counting rule (what counts
   as evidence independent of a founding cluster).

---

*Draft v0.2 ends. Not an approved Method; not frozen. Everything
downstream — canonical questions, inferred requirements, gate instances,
the Question Observatory itself — is gated on the founder's explicit
freeze (FD-11).*
