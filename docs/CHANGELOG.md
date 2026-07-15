# Changelog

Method revisions and architectural changes to the Upstream Zero
repository. Content-object corrections are recorded as Revision objects
in the graph; this file records changes to the method and ontology
themselves.

## 2026-07-15 — Method revision: `observes` edge relation

Added `observes` to the closed edge vocabulary (IA §4.2, enforced in
`website/src/lib/schema.ts`). It expresses the discipline→invariant
relation: a discipline concept that *studies* an enduring commercial
structure, as distinct from `depends-on` (a structural prerequisite).

- First and only use in this revision: `commercial-evaluation — observes →
  requirements`. Commercial evaluation is the discipline; requirements are
  the enduring structure it observes.
- Replaces the earlier, inaccurate `commercial-evaluation — depends-on →
  requirements`, which implied prerequisite rather than study.
- No other edge relations were added in this pass.

Rationale: the public architecture should state the true relationship
between the discipline and its invariant, not approximate it with the
nearest pre-existing relation.
