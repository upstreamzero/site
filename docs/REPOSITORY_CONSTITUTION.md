# Repository Constitution — Institutional Transparency vs Proprietary Implementation

**Adopted:** 2026-07-15 (founder directive). **Status:** standing
architectural rule. It governs future design decisions and is superseded
only by an explicit founder decision.

**Self-classification:** this document is **Layer A (Institutional
Knowledge)** — it describes the separation principle without revealing any
implementation, so it is safe to be public.

---

## Purpose

Upstream Zero is both a research institution and a commercial company. The
long-term objective is to **maximize institutional trust while preserving
the proprietary operating system that produces the research.** The public
institution should become increasingly transparent; the internal operating
system should become increasingly protected. This distinction must be
considered before proposing any new page, document, object type, method,
experiment, pipeline, workflow, or implementation.

## The two layers

**Layer A — Institutional Knowledge.** Information whose publication
increases trust, scientific credibility, commercial understanding,
verification, or public understanding of the observatory: philosophy,
first principles, commercial laws, buyer problems, requirement concepts,
definitions, evidence standards, conceptual methods, hypotheses,
experiments, observations, findings, corrections, revisions, published
claims, public evidence, public machine-readable objects, graph objects
intended for publication, commercial terminology, public research,
educational content, explanations of commercial evaluation. Written
assuming it may become public. Transparency is preferred unless
publication creates measurable commercial harm.

**Layer B — Proprietary Implementation.** Information that materially
enables another organization to recreate Upstream Zero's products,
operating system, automation, research workflow, commercial advantage, or
execution model: internal prompts, agent workflows, orchestration logic,
automation architecture, pipeline implementation, scoring/weighting/
confidence algorithms, requirement-inference and canonicalization logic,
clustering heuristics, coding playbooks, internal review procedures,
report-generation logic, experiment-execution/deployment/publication
workflow, internal validation procedures, internal planning documents,
implementation architecture, commercial prioritization algorithms,
internal operational software, and internal research procedures beyond
what is necessary for public verification. These are proprietary
intellectual property. They do not become public content or documentation
simply because they exist.

## The rules

1. **Two layers, always.** Everything created belongs to Layer A or
   Layer B. Layer A is written assuming publication; Layer B is protected.
2. **The website's job.** The public site explains what Upstream Zero
   studies, why it matters, what evidence exists, what remains uncertain,
   and how to interpret findings — not exactly how the company is built
   internally. *Publish the research; protect the machinery.*
3. **Verification over disclosure.** When choosing between publishing
   evidence and publishing the system that produced it, publish the
   evidence. Trust is earned through observable evidence, not through
   exposing every mechanism.
4. **The publication test.** Before recommending anything become public,
   ask: *"Does publishing this increase institutional trust more than it
   increases competitor replicability?"* If no, recommend keeping it
   internal and explain why.
5. **Expose / do not expose.** Expose: buyer problems, commercial
   questions, observations, evidence, experiments, findings, corrections,
   claims, commercial implications, public methods, public machine
   representations, research philosophy. Do **not** expose: implementation
   architecture, orchestration, internal pipelines, automation systems,
   prompt libraries, agent designs, internal coding heuristics, scoring/
   weighting implementations, operational playbooks, report-generation
   machinery, deployment procedures, or the research operating system —
   unless explicit founder approval is given because publication is
   necessary for scientific verification.
6. **Increasing separation.** The repository should increasingly separate
   into a **Public Institutional Layer** (the observatory: research,
   evidence, claims, questions, experiments, methods, corrections, buyer
   education, public machine-readable knowledge) and a **Private Operating
   Layer** (automation, agent systems, research workflows, scoring,
   inference, canonicalization, internal tooling, deployment, pipelines,
   operational software, commercial intelligence, implementation
   architecture). Future work strengthens the separation rather than
   blurring it.
7. **Classify before recommending.** When proposing new documentation,
   pages, architecture, methods, or objects, state the classification
   (Institutional Knowledge or Proprietary Implementation) before
   recommending publication. If a proposal increases competitor
   replicability more than institutional credibility, recommend keeping it
   private.
8. **Restraint.** Do not publish architecture because it is interesting,
   implementation because it is elegant, or internal systems because they
   improve transparency. Transparency is earned by making claims
   verifiable, not by exposing every mechanism that produced them.
9. **The endpoint.** The observatory should become the most trusted source
   for understanding commercial evaluation; the operating system that makes
   that possible remains proprietary. The public inspects the evidence;
   competitors cannot reconstruct the company.
10. **The standing check.** For any new website content, documentation,
    method, architecture, experiment, or public object, ask: (1) Does this
    strengthen institutional trust? (2) Does it unnecessarily expose
    proprietary implementation? (3) Could a well-funded competitor
    recreate a meaningful portion of Upstream Zero by copying what is about
    to be published? If (3) is yes, recommend an alternative that preserves
    the public value while withholding implementation details.

## Governing principle

**Upstream Zero's public assets should make it easy to trust the
institution, but difficult to recreate the institution.** Future
recommendations optimize for this principle.

---

*On adoption (2026-07-15), a separation audit was performed and its
results reported to the founder. This document catalogs the principle, not
the specific internal assets — by Rule 8, an enumeration of what is
currently exposed is delivered to the founder directly, not published
here.*
