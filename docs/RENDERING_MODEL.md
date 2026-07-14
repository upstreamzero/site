# The Question-Native Rendering Model — Version 1

**Date:** July 14, 2026
**Origin:** founder ruling after reviewing v0.1 — "the site reads like an
internal specification. Humans arrive with questions."
**Scope of change:** rendering layer only. The ontology, knowledge graph,
evidence architecture, and content model are untouched and remain correct.

## The model

The atomic unit of the human-facing website is a **resolved question** —
not a page, not an object, not a section. Every unit renders in one fixed
pattern:

1. **Question** — a question a real visitor actually arrives with.
2. **Direct answer** — the very first sentence resolves the uncertainty
   before explaining it.
3. **Explanation** — why that answer is currently our position.
4. **Evidence** — supporting objects, tiers, and counts, drawn live from
   the graph (never restated by hand).
5. **Limitations** — what remains unknown, and what would change our
   position. Founder decisions render inline, visibly pending.
6. **Related questions** — the next questions a curious reader would ask.

This is not an FAQ. It is a research institution whose knowledge is
organized around the questions it answers — an observatory where every
answer leads naturally to the next question.

## The two interfaces

- **Questions are the human interface.** People never navigate the graph
  directly; the ontology powers every evidence section quietly underneath.
- **The graph remains the machine interface.** Object JSON, `/graph.json`,
  `/llms.txt`, and `/company.json` are unchanged. Question pages
  additionally embed machine-readable Q&A structured data, making the
  rendering retrieval-native in both directions: humans get resolution,
  machines get both the Q&A surface and the underlying graph.

## What stays fixed

The visual language (calm, editorial, institutional), evidence tiers,
provenance footers, apparatus voice, linked research objects, and the
build-enforced ontology rules. Only the shape of human experience changed.

## Status

- **V1:** the Philosophy page (six resolved questions), implemented in
  `website/src/components/ResolvedQuestion.tsx` and
  `website/src/app/philosophy/page.tsx`. Deliberately unoptimized and
  unsimplified — it demonstrates the architecture for review.
- **Pending founder review** before the model is applied across the rest
  of the site (Home, Research, Methods, Claims Ledger, Services, Contact).
