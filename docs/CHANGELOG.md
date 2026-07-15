# Changelog

Method revisions and architectural changes to the Upstream Zero
repository. Content-object corrections are recorded as Revision objects
in the graph; this file records changes to the method and ontology
themselves.

## 2026-07-15 — Repository separation: public science, private operations

This repository holds the public institution and its published research.
The private operating system was extracted to a separate private
repository. Per the Repository Constitution
(docs/REPOSITORY_CONSTITUTION.md): what the institution publicly claims
stays inspectable here; how the system is operated does not. Public
verification is unaffected — it runs through the published graph, the
machine objects, and this repository's history.

Public Git history was not rewritten.

## 2026-07-15 — Method revision: `observes` edge relation

Added `observes` to the closed edge vocabulary (the authoritative list is
in `website/src/lib/schema.ts`). It expresses the discipline→invariant
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
