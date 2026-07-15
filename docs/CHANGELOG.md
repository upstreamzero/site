# Changelog

Method revisions and architectural changes to the Upstream Zero
repository. Content-object corrections are recorded as Revision objects
in the graph; this file records changes to the method and ontology
themselves.

## 2026-07-15 — Repository separation: public science, private operations

This repository is now the public institution and its published research.
The private operating system — the experiment automation pipeline, scoring
logic, capture/approval/review tooling, unpublished protocols and frozen
prompts (until formally pre-registered), and internal planning documents —
has been extracted to a separate private repository (`upstreamzero/operations`).

Per the Repository Constitution (docs/REPOSITORY_CONSTITUTION.md): what the
institution publicly claims stays inspectable here; how the system is
operated does not. Public verification is unaffected — it runs through the
published graph, machine objects, and this repository's history.

- Retained public: the website, the published knowledge graph, published
  methods (M-1, M-4), governance (constitution, this changelog), machine
  objects, and everything required to build and deploy the site.
- Moved to private: 35 files (experiment pipeline, protocol prompts/rubric,
  root ops runner, internal planning docs).
- The build's staging safety guard moved to `website/scripts/check-staging-safety.mjs`
  so the public site builds standalone with no dependency on the private
  repository.
- Public Git history is unchanged (not rewritten). The extracted files, and
  earlier commit author emails, remain in history by deliberate decision; a
  `.mailmap` normalizes author display without altering commits.
- Protocol-publication rule: unpublished frozen prompts remain private and
  graduate into the public graph as published research objects only when an
  experiment is formally pre-registered.

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
