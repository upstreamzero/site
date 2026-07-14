# Design Language — Upstream Zero

**Phase 3 deliverable**
**Date:** July 13, 2026
**Author:** Claude — founding design lead
**Depends on:** VISUAL_IDENTITY.md (directions held, not finalized, per founder);
founder rulings of 2026-07-13: *the underlying idea is inference, not
astronomy; the identity is the measurement system, not the logo; the logo
emerges from the system later.*
**Status:** Awaiting approval before Phase 4 (DESIGN_SYSTEM.md)

---

## 1. The generative principle

Every enduring visual identity has one idea that generates everything else.
Ours, per the founder's correction, is:

> **Inference made visible.** We do not observe commercial evaluation
> directly. We observe its effects — recommendations, reasoning, evidence
> requests, requirement gates, validation behavior, confidence shifts — and
> infer the structure beneath. The transit concept worked not because it was
> astronomical but because it drew this: the solid body you measured, the
> faint ring you inferred.

This principle generates a visual language because it supplies a rule no
other company has any reason to follow:

**Ink is evidence. The page never renders anything more solidly than it is
known.**

Everything below derives from that rule. It is also the answer to the
recognizability test: a document obeying it — where solidity itself carries
epistemic meaning — cannot be mistaken for anyone else's, logo or no logo.

## 2. The three registers

Every visual element on any Upstream Zero surface belongs to exactly one
register, and the registers are visually unmistakable:

1. **The instrument** (what we built): hairline rules, graduation ticks,
   datum lines, grids, figure numbers, object IDs, margins, labels. Always
   thin, always precise, never emphasized. The instrument is quiet — you look
   *through* it, not at it.
2. **The observation** (what we measured): data marks, recorded values,
   quoted evaluator behavior, traces. **The only register that earns solid
   ink and weight.** A filled disc, a bold value, a full-strength line — these
   mean *we saw this*.
3. **The inference** (what we conclude but did not directly see): hypotheses,
   mechanisms, extrapolations, the faint ring. **Never drawn solid.** Rendered
   as outline, dashed stroke, or reduced-opacity forms — visibly present,
   visibly unconfirmed.

Prose (the Narrated register) sits outside the instrument entirely: set in
running serif text with no instrument marks attached, so narrative can never
borrow the apparatus's authority.

This is the visual epistemology. It scales from a chart mark to a page to the
whole site, and it makes the company's core discipline — never promote
confidence beyond evidence — *perceptible at a glance.*

## 3. Typography — two voices

The system speaks in exactly two voices, and their contrast is a signature:

- **The content voice: a text serif of scientific-publishing lineage.**
  Target face for build: **STIX Two Text** — commissioned by a consortium of
  scientific publishers for the typesetting of research; open-licensed (SIL
  OFL); excellent numerals and math heritage. The provenance of the typeface
  itself is on-thesis. (Interim system stack: Iowan Old Style / Palatino /
  Georgia.) Used for: findings, claims, essays, captions' prose, all reading.
- **The instrument voice: a workhorse monospace.** Target face: **IBM Plex
  Mono** (open, institutional heritage, unshowy). Used for: object IDs
  (`OBS-0042`), tier labels, dates, instrument stamps, figure numbers,
  navigation, metadata, table data, everything that is apparatus rather than
  prose. Always small, always letterspaced when uppercase (+0.14–0.18em),
  never bold.

Rules: body text 16–18px at ~65ch measure; modular scale ~1.25 with few
sizes (a scientific document needs hierarchy, not fireworks); headings in the
serif at medium weight — never heavy (heavy is advertising); tabular numerals
wherever digits align; no italic serif for emphasis in apparatus contexts
(italic is reserved for prose emphasis and titles of works); no third
typeface, ever. The two-voice contrast — warm serif prose annotated by cool
mono apparatus — is signature element #1.

## 4. Space, grid, rhythm

- **The apparatus margin.** The signature layout move: content column
  (~65ch) accompanied by a dedicated margin rail where the instrument voice
  lives — object IDs, tier marks, dates, provenance links, sighting notes —
  aligned to the passages they annotate, in the tradition of critical
  editions and lab notebooks. The margin is not empty space; it is where the
  measurement apparatus grips the text. On narrow viewports the rail folds
  into compact annotation lines above their passages — never dropped.
- **Baseline grid:** 4px base unit; vertical rhythm in multiples of 8px;
  type sits on the grid. Spaciousness comes from consistent large intervals
  (48/64/96px between sections), not from arbitrary air.
- **Width discipline:** prose at ~65ch; tables, plates, and graphs may extend
  into the margin rail's width (a plate is allowed to be wider than the text
  that discusses it — journal convention); nothing full-bleed. Full-bleed is
  advertising.
- **Editorial rhythm:** pages read as documents — title, apparatus, body,
  plates, provenance footer — not as stacked marketing "sections." No
  alternating background bands (the SaaS zebra), no cards-for-everything.
  Where a boundary is needed, a graduated rule (§6) draws it.

## 5. Color — ink, paper, and one needle

- **Paper:** warm near-white (`#FAFAF7` family), not pure white — paper,
  not screen glare.
- **Ink:** warm near-black (`#1A1A18` family), not pure black.
- **Grey is not a color; it is reduced ink.** All intermediate values are
  opacity steps of ink, so the solidity rule (§2) stays literal: opacity *is*
  epistemic status.
- **One functional accent: instrument red** (`#B5432A` family — the red of a
  needle, a datum pointer, a surveyor's mark). Reserved exclusively for *the
  current reading*: the pointer on a tier scale, the marker on a revision, the
  "you are here" in a provenance chain. Never for buttons, links, or
  decoration. If red appears, it points at something. Links are ink,
  underlined (hairline underline, slight offset); visited/hover states vary
  the underline, not the color. A site whose only color literally *indicates*
  is signature element #2.
- **Dark theme:** slate-dark paper (`#161614`), warmed light ink (`#E8E6E0`),
  same opacity-as-epistemics logic, same single red (lightened for contrast).
  Plates may remain paper-toned in dark mode — prints mounted on a darkened
  wall — which keeps evidence rendering identical in both themes.
- **Semantic color beyond the needle: none.** Tiers are NOT color-coded
  (green/yellow/red tiers would turn epistemics into traffic lights and
  invite skimming-by-color). Tier is encoded by the graduated scale and
  solidity (§7). This refusal is deliberate and load-bearing.

## 6. Calibration marks — the apparatus vocabulary

Small, strict, reused everywhere; these are what someone recognizes on a
logoless page:

- **The datum line:** a hairline horizontal rule that extends slightly past
  its content block (the theodolite level; already present in the datum-zero
  concept). Used under page titles and as the anchor of plate captions.
- **Graduated rules:** section dividers are not plain lines — they carry
  fine tick marks (minor every unit, major every fifth). The divider is a
  piece of scale.
- **Crop-mark corners** on plates: fine right-angle marks outside the frame
  corners, print-production vernacular for *this is the measured artifact*.
- **Figure numbering:** every plate, table, and graph is numbered (`Fig. 3`)
  in the instrument voice and referenced from prose by number. Numbering is
  information (identity and citability), never decoration.
- **Object IDs as typography:** `C-0007`, `OBS-0042`, `M-1` set in the
  instrument voice — the IDs are not hidden in URLs; they are visible,
  citable apparatus, like specimen labels.
- **The provenance footer:** every page ends with the same quiet block:
  rendered-from IDs, last revision, machine-rendering link. The footer is the
  page's own instrument stamp.

## 7. Evidence and confidence visualization

The tier system is the company's most important artifact; its visual form is
signature element #3: **the graduated tier scale.**

- A horizontal six-position scale built from graduation ticks (Narrated →
  Observed → Replicated → Causally Supported → Cross Evaluator → Real World
  Corroborated). The achieved tier is marked by a **solid filled position**;
  positions beyond it remain **outline ticks** — the unearned tiers are
  literally rendered as unearned. The current reading may carry the needle
  red when the scale is the page's subject.
- The scale always appears with the tier's name in the instrument voice; the
  glyph is never used alone (no secret handshakes; this is an instrument,
  and instruments are labeled).
- **Solidity mapping beyond the scale:** rationale-type observations render
  with a permanent outline treatment on their quoted material (observed
  *narration*, not observed mechanism); inferred mechanisms in any diagram
  are dashed; retracted material is struck but legible (never deleted from
  the page — the strike is the honesty).
- **Confidence language in prose:** "Current Confidence" fields render as
  plain sentences in the content voice — uncertainty is stated, not
  gamified. No percentage theater unless a measured probability actually
  exists.

## 8. Object, graph, and data visualization

- **Objects render as plates.** A finding, an observation, a capability — 
  each is a framed, numbered, captioned exhibit (frame, crop marks, figure
  number, caption, margin apparatus). Signature element #4.
- **Graph visualization obeys the registers:** observed relationships are
  solid hairlines; inferred relationships dashed; nodes sized by nothing
  (size implies importance we haven't measured); the viewer's current
  position marked with the needle. No force-directed hairballs — provenance
  chains render as ordered, readable diagrams (the chain is a *path*, and
  paths are drawn as paths).
- **Charts:** ink-on-paper, hairline axes with graduation ticks, solid marks
  for measurements, dashed for extrapolation, N and conditions printed on the
  plate itself (a chart that hides its N is marketing). No gradients, no
  drop shadows, no rounded bar caps, no animated count-ups.
- **Illustrative vs. real:** anything illustrative (specimen content, example
  deliverables) carries a permanent `SPECIMEN — ILLUSTRATIVE` label in the
  instrument voice and a distinct hatched corner treatment. Fake data must be
  *visually incapable* of being mistaken for evidence (Phase 1 §7 rule, given
  its uniform).

## 9. Motion

**Instruments move like instruments.** Motion is calibration, never
decoration:

- Permitted: a tier scale's position settling into place; a provenance path
  drawing in evidence order (observation → finding → claim) at constant
  rate; hover states that raise an annotation's opacity. Durations 150–300ms,
  ease-out, one property at a time.
- Forbidden: parallax, scroll-jacking, bounce/spring physics, staggered
  card cascades, animated counters, anything that moves without carrying
  meaning. `prefers-reduced-motion` honored absolutely (everything works
  static — motion only ever re-states what the page already says).
- The needle red never blinks. Nothing pulses. Laboratories do not pulse.

## 10. Component philosophy

- Components are **instruments, not widgets**: each exists to make one thing
  inspectable (a tier scale, a provenance chain, an instrument stamp, a
  plate). If a component doesn't help verify something, it doesn't exist.
- Prefer **document semantics** over app chrome: headings, figures, tables,
  definition lists. The site is a publication that behaves, not an app that
  publishes.
- Buttons are rare and literal ("Download evidence (14 MB)", "View machine
  rendering"), set in the instrument voice, drawn as hairline-ruled
  rectangles — closer to a form on a lab requisition than a CTA pill. There
  is exactly one emphasis style; no primary/secondary/ghost hierarchy of
  persuasion.
- Empty states tell the truth plainly ("No measured outcomes yet. Results
  publish here as tiered evidence.") — the N=0 register is a designed state,
  not an apology.

## 11. The logoless test

If every logo disappeared, an Upstream Zero page is identified by:

1. **Two voices** — warm scientific serif annotated by cool letterspaced
   mono apparatus.
2. **The apparatus margin** — metadata gripping the text from the rail.
3. **The graduated tier scale** — earned positions solid, unearned outline.
4. **Solidity as epistemics** — solid/outline/dashed carrying meaning
   consistently from chart marks to diagrams to struck-through retractions.
5. **Plates** — numbered, crop-marked, captioned exhibits.
6. **One red that only points.**
7. **Graduated rules and datum lines** where others put decorative dividers.
8. **The provenance footer** on every page without exception.

Any two of these could be borrowed; the conjunction is an identity. And the
mark, when we return to it, should visibly be *made of this vocabulary* — 
the transit already is (a solid observation, a faint inferred ring, a
graduated path), which is why it felt right: it is the system in miniature,
one instance of the inference grammar. Astronomy was the costume; inference
is the body.

## 12. Rejected

From the references, extracted and refused: Stripe's gradient identity
(dates), Linear's dark-glass aesthetic (era-bound), Intercom's playfulness
(wrong register), Apple's product-hero staging (we have no hardware to
worship), GitHub's mascot energy. From the wider default: SaaS zebra
sections, card grids as page structure, icon libraries (our icons are
instrument marks or nothing), stock and generated imagery, color-coded
severity, testimonial carousels, gradient meshes, glassmorphism, bento
grids, dark-mode-as-brand. From our own temptations: astronomy as decoration
(star fields, telescopes) — the discipline is inference, and the only
astronomy we keep is what the inference grammar independently generates.

## 13. What the references actually contributed

Principles, not layouts: Nature — the editorial *system* is the identity;
authority through consistency. GitHub — objects with IDs, everything links,
the graph is felt everywhere. Wikipedia — density is dignity; links are the
navigation. Stripe — typographic quality as trust signal. Linear — restraint
and polish as a form of respect. Apple — whitespace as confidence. Intercom — 
the product visibly alive inside editorial calm (ours: live tier scales and
provenance chains inside document pages).

---

*Phase 3 complete. A logoless specimen page accompanies this document (see
artifact) as the empirical test of §11 — one Finding rendered entirely in
this language, clearly marked SPECIMEN. Stopping for approval before Phase 4
(DESIGN_SYSTEM.md), which will harden this language into tokens, type scale,
component specs, and accessibility rules. Logo work stays paused per your
direction; the mark will be drawn from this vocabulary when we return to it.*
