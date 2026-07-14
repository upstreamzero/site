# Design System — Upstream Zero

**Phase 4 deliverable — the mark, finalized, and the institutional system**
**Date:** July 13, 2026
**Author:** Claude — founding design lead
**Depends on:** DESIGN_LANGUAGE.md (approved), founder rulings: *Mark 2
(Datum Zero) has won; refine to inevitability; the mark must someday stand
without the name; the story enriches after the fact, never before.*
**Status:** Awaiting Phase 5 (self-critique) before Phase 6 (build)

---

## 1. The mark

The zero at the origin; the line flowing downstream from it.

Drawn true. Never tilted, never broken, never filled, never red.

### 1.1 Construction (as amended, R-39–R-45)

All dimensions are ratios of the outer diameter **D**. Absolute sizes are
forbidden in this specification; the mark is a proportion, not a picture.

```
Ring outer diameter        D           (the unit)
Ring stroke                D/7.5
Ring inner aperture        0.733·D     (consequence, accepted — see R-03)
Ring position              at the origin — the upstream end
Datum                      begins at the ring's rightmost point, at center
                           height; extends downstream (rightward) only
Datum length               2·D from the contact point (total width 3·D)
Datum weight (display)     D/60
Datum height               geometric center — exact (see R-10)
Terminals                  butt-cut, 90°
Clear space                D/2 from all ink extremes
Minimum size               4 mm print · 12 px screen
```

### 1.2 The refinement ledger

The mark was not sketched; it was decided. Thirty-eight decisions, each with
its rejected alternative — the record of why every pixel is where it is.

- **R-01 · The unit.** Every dimension a ratio of D. Rejected: absolute
  specs — they rot across media.
- **R-02 · Ring weight D/7.5.** Tested D/6: reads as a bold O, a tire.
  Tested D/9: reads as a circle, not a glyph. Tested D/8: anemic in running
  text. D/7.5 is where "shape" becomes "numeral."
- **R-03 · Inner aperture 0.733·D.** A consequence of R-02, near 3:4.
  Forcing exact 3:4 requires stroke D/8 — rejected above. The approved
  deviation is recorded rather than hidden.
- **R-04 · Datum length exactly 3:2 · D.** Golden section rejected: an
  unstatable ratio violates the instrument register — this institution
  publishes its ratios. 2:1 rejected: reads as road signage. 4:3 rejected:
  too tight to clear the Ø misread.
- **R-05 · Symmetric extension D/4.** Right-biased asymmetry (for lockup)
  tested and rejected: the mark must balance alone; the lockup borrows
  length instead (R-24).
- **R-06 · Datum weight D/60 at display.** The threshold of quiet: the
  reference is present everywhere and shouts nowhere.
- **R-07 · Optical sizes, like a typeface.** Display cut D/60; text cut
  D/40 (≤ 40 px); small cut D/24 (≤ 24 px); favicon cut D/12 (16 px grid).
  One idea, four cuts. A single cut scaled blindly fails at both extremes.
- **R-08 · The datum is unbroken.** Breaking it at the ring's stroke was
  tested: three strokes instead of one (fails engraving), and the wrong
  sentence — the reference does not stop at the representation.
- **R-09 · Junctions self-resolve.** Hairline-over-bold reads clean at
  display; at smaller cuts the weight contrast narrows (R-07), so the
  crossings never clot.
- **R-10 · Geometric center, exactly.** The optical-center raise (+D/100)
  every trained eye expects was tested — and refused. This mark's virtue is
  being drawn true, not flattered. The refusal is the design.
- **R-11 · Butt terminals.** Round caps rejected: rounded is friendly, and
  friendly is the persuasion register.
- **R-12 · A perfect circle.** No superellipse, no optical squaring.
  Instruments are round.
- **R-13 · Clear space D/2**, measured from ink extremes, all sides.
- **R-14 · Minimums.** 4 mm print, 12 px screen; below that, favicon cut or
  wordmark alone (R-27).
- **R-15 · Never tilted.** A datum off level is not a stylistic variant; it
  is a false reading. The single unforgivable misuse.
- **R-16 · Never dashed.** Dashed is the inference register. The mark is
  not an inference.
- **R-17 · The ring is never filled.** A solid disc is the observation
  glyph in the data vocabulary; filling the mark collides the registers.
- **R-18 · Never red.** Red is the current reading. The mark is the
  instrument, not the reading.
- **R-19 · One color: ink, or paper reversed.** In print reversal, weights
  compensate +5% for halation; on screen, no compensation.
- **R-20 · No shadows, gradients, outlines, containers** — except the app
  icon tile (R-23).
- **R-21 · Once per surface.** A mark that appears twice is branding; a
  mark that appears once is a stamp.
- **R-22 · Favicon cut.** 16 px grid: ring Ø 12 px (stroke 2), datum 14 × 1
  px. Supplied as hinted rasters at 16/32/48 — never a scaled display SVG.
- **R-23 · App icon.** Mark at 58% of tile width on paper ground
  (#FAFAF7); slate tile (#161614) for dark contexts; platform mask radii
  accepted; no brand-color tile exists because no brand color exists.
- **R-24 · The lockup: the name rests on the datum.** Wordmark baseline =
  the datum line. Cap height D/5; gap from ring to name = one cap height;
  in lockup the datum extends beneath the full name + D/10 beyond.
  **Shedding the name = the datum returns to 3:2. Nothing else moves.**
  Name-shedding is a removal, not a redesign — the founder's criterion,
  made mechanical.
- **R-25 · Lockup face.** The content serif (STIX Two Text), capitals,
  letterspaced 0.16em, weight 500. Mono rejected: the apparatus voice would
  file the company's own name as metadata.
- **R-26 · Vertical lockup** (square contexts): mark above, name centered
  below at clear-space distance. No second datum — two reference lines is
  two references, and two references is a contradiction.
- **R-27 · Wordmark alone** where the mark would fall below minimums
  (spines under 14 mm, footer legal lines).
- **R-28 · Co-branding.** Partner marks sit strictly *below* the datum
  line, never upon it. Only Upstream Zero rests on the reference.
- **R-29 · The stage.** Mark small; datum extended the full backdrop width.
  The speaker stands beneath an honest horizon. Scale the line, not the
  ring.
- **R-30 · The building.** A continuous datum line runs the architecture at
  1400 mm; wayfinding hangs from it; the mark occurs where the line crosses
  a decision point. The building is levelled, and the mark is where its
  level passes through a zero.
- **R-31 · Engraving.** Datum 0.2 mm deep, ring V-groove 0.5 mm — the depth
  difference preserves hierarchy in raking light.
- **R-32 · Blind emboss.** The mark may be embossed inkless — verification
  by raking light; the watermark idea, absorbed.
- **R-33 · The card (85 × 55).** Mark at left; **the datum bleeds off both
  edges** — the card carries the level line edge to edge. Details rest on
  hairlines at the 8 pt grid.
- **R-34 · Research papers.** The page's head rule *is* the mark's datum
  extended: the mark sits at the left margin and its own line becomes the
  document's first rule. Pages grow out of the mark.
- **R-35 · Software.** Same construction at the 24 px cut: the app's top
  hairline border is the datum, the mark resting in it at the left. One
  geometry from favicon to building.
- **R-36 · Books.** Cover: mark alone, bottom-center, 6% of cover width.
  Spine: wordmark only below 14 mm; the mark is never rotated (R-15 governs
  even spines).
- **R-37 · Motion.** The mark never animates in UI chrome. Ceremonial
  contexts only: the datum draws left→right at constant rate (600 ms), the
  ring fades up (240 ms) after. The system's loader is the **levelling
  line** — a free datum growing at constant rate. No spinners; instruments
  do not spin.
- **R-38 · The mark is never a button**, never a link glyph, never
  decorated on hover. It is a stamp, not a control.

**Amendments of 2026-07-13 (founder art direction — the origin composition):**

- **R-39 · Composition amended: the ring sits at the origin of the datum;
  the line extends downstream only.** Supersedes the centered bisection
  (Plimsoll form), which is recorded here as the rejected predecessor: it
  carried crossing junctions, a residual Ø misread, and the weaker name
  story. The amended form *is* the name — the zero at the upstream end,
  the measurement axis flowing from it. Nothing crosses; nothing clots.
- **R-40 · Contact, not gap.** The datum begins exactly at the ring's
  rightmost point, at center height. A gap was tested: it reads as two
  objects (a bullet and a rule). Contact reads as emanation — measurement
  begins at zero.
- **R-41 · Datum length 2·D from contact (total 3·D).** Stated ratio, per
  R-04's principle. Longer (3·D line) tested: the ring becomes a period at
  the end of a rule. Shorter (1·D): reads as a Ⓞ- list bullet.
- **R-42 · Asymmetry accepted; R-05 superseded.** The bisected mark had to
  balance alone; the origin mark *should* lean forward — a beginning is not
  symmetric. Compositional balance now comes from the lockup and from
  clear space.
- **R-43 · The stacked institutional lockup.** Mark centered above; name in
  the content serif, capitals, letterspaced; beneath it the descriptor —
  **COMMERCIAL EVALUATION OBSERVATORY** — in the apparatus voice at 0.18em.
  The descriptor honors the earned identity (observatory, not institute)
  and is *detachable*: introduction contexts only. Shedding order over the
  institution's life: descriptor first, name second, mark alone last.
- **R-44 · The horizontal lockup inherits R-24's mechanics** with the new
  geometry: the name rests on the extended datum (baseline = the line),
  beginning D/4 after the standard datum's end; the line extends beneath
  the name + D/10 beyond. Shedding the name returns the line to 2·D.
- **R-45 · Favicon cut re-drawn:** ring Ø 10 px at left (stroke 2), datum
  trailing to the frame edge. The origin composition survives 16 px better
  than the bisection did — the tab reads "○—" cleanly.
- **R-46 · The applications gain direction.** The card's datum now bleeds
  off the *right* edge only (R-33 amended); the paper's head rule *flows
  out of the ring* at the left margin (R-34, now literal); the building's
  corridor line runs downstream from the ring at the entrance (R-30). The
  mark, the page, and the building all read in the same direction as the
  name: zero first, then the stream.

**The A/B trial of 2026-07-13** (founder-ordered, run without deference):
*A — the circle as object held to a reference (bisected)* vs. *B — the
circle as origin from which the reference extends.* Ten criteria. **B
survives, 7–2 with one tie.** A won favicon compactness (a centered
symmetric glyph fills a square better than a 3:1 composition) and standalone
symbolic depth. B won simplicity (one visual event vs. four), ownership-
adjusted memorability, scalability, motion, editorial integration, signage,
typographic structure, and — decisively — **long-term ownership**: A's
geometry is contested for life (Ø, ⊘, theta, prohibition signage — fifty
years of other people's meanings), while "○—" is a nearly unclaimed field.
A's two wins produced one new rule rather than a reversal:

- **R-47 · The square cut: the datum never ends inside a frame.** In
  bounded square contexts (favicon, app icon, avatars), the line runs to
  the frame edge and is cropped by it — implying continuation beyond the
  visible field. The stream does not stop; the frame does. This converts
  B's square-format weakness into the system's most quietly telling rule.
- **R-48 · The stacked lockup is the primary institutional lockup**
  (founder ratification, 2026-07-13). Mark above; UPSTREAM ZERO in the
  content serif; COMMERCIAL EVALUATION OBSERVATORY in the apparatus voice.
  Three lines, three lifespans: the descriptor detaches after introduction
  contexts; the name sheds when the institution no longer needs it; the
  mark stands alone last. The horizontal lockup (R-44) is secondary, for
  headers and constrained widths. The descriptor's wording tracks the
  earned identity — it says *observatory* today and changes only when the
  identity-sequence milestone is actually reached (IA §0.2), at which point
  the change is a recorded Revision, not a rebrand.

### 1.3 Files of record

`design/mark/mark.svg` (display cut) · `mark-small.svg` (small cut) ·
`favicon.svg` (16 px cut) · `lockup.svg` (horizontal lockup). The artifact
accompanying this document shows construction, size ladder, misuse, and
applications.

---

## 2. Typography

Two voices, no third, ever (DESIGN_LANGUAGE §3, hardened):

- **Content:** STIX Two Text (SIL OFL) — body 17 px / 1.65, measure 65ch.
  Interim system stack: Iowan Old Style, Palatino, Georgia.
- **Apparatus:** IBM Plex Mono (SIL OFL) — metadata, IDs, tiers, captions'
  apparatus, navigation. 0.68 rem, letterspaced 0.15 em when uppercase,
  never bold.
- **Scale (px):** 12 · 14 · 17 · 21 · 26 · 33 · 41. Headings weight 500,
  line-height 1.25, `text-wrap: balance`. Tabular numerals wherever digits
  align. Italic only for prose emphasis and titles of works.

## 3. Spacing

Base 4 px. Steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144. Section intervals
48/64/96. Apparatus margin rail: 200 px at ≥ 1080 px viewport, folding to
inline annotation blocks below 720 px. Prose measure 65ch; plates may extend
into the rail; nothing full-bleed except the card's datum (R-33).

## 4. Color tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `paper` | #FAFAF7 | #161614 | ground |
| `ink` | #1A1A18 | #E8E6E0 | text, observed marks |
| `ink-60` | 60% ink | 60% ink | secondary text, apparatus |
| `ink-40` | 40% ink | 40% ink | inferred forms, disabled |
| `ink-18` | 18% ink | 18% ink | rules, borders |
| `plate` | #FCFCFA | #FCFCFA | evidence plates (paper in both themes) |
| `needle` | #B5432A | #D06A4F | the current reading — only |

No semantic green/yellow/red. No brand color. Grey is reduced ink; opacity
is epistemic status. Contrast: ink/paper ≈ 15:1 both themes; needle on paper
≥ 4.6:1.

## 5. Icon system

Icons are instrument marks: 24 px grid, 1.5 px stroke, butt caps, square
joins, drawn from the mark's vocabulary — hairlines, ticks, rings, dots.
Rules: at most one solid element per icon (the state dot — solid means
*observed/present*); no filled areas otherwise; no rounded-corner container
shapes; outline style is not a "style," it is the epistemics. Cuts at 16/20/24.
An icon that cannot be drawn in this vocabulary is a feature that doesn't
belong in the product.

## 6. Evidence components (dimensions of record)

- **Tier scale:** six positions, 6 × 16 px marks, 33 px pitch, achieved
  positions solid, unearned outlined (1 px), needle triangle 8 px above the
  current position — needle red only when the scale is the page's subject.
  Always labeled (`Replicated · 3 of 6`); never a bare glyph.
- **Provenance chain:** a path, drawn as a path — nodes 8 px, hairline
  links, observed edges solid, inferred dashed; the viewer's position
  carries the needle. Never force-directed.
- **Instrument stamp:** the mono block (`I-2 · v2026-05 · sampled n=48`),
  12 px, on every evidence rendering without exception.
- **Plates:** frame 1 px at 35% ink, crop marks 12 px outside corners,
  `Fig. n` in apparatus voice, caption ≤ 65ch, N printed on the plate.
- **Specimen register:** illustrative content carries the hatched corner +
  `SPECIMEN` tag in needle red — the only non-reading use of red, justified
  because it *is* a reading: "this is not evidence."

## 7. Motion language

150/240/300 ms, ease-out, one property at a time. Permitted: tier positions
settling, provenance paths drawing in evidence order, annotation opacity on
hover, the levelling-line loader (R-37). Forbidden: parallax, spring
physics, staggered cascades, counters, pulse, spinners. The needle never
blinks. `prefers-reduced-motion`: everything works static.

## 8. The three application languages

- **Website (the observatory):** document anatomy — title, datum rule,
  apparatus rail, body, plates, provenance footer. Navigation in the
  apparatus voice, six entries (IA §5). The homepage is a status board; its
  header rule is the mark's datum (R-34/R-35 applied to the web).
- **Research documents (print/PDF):** A4, margins 24/20/28/20 mm, apparatus
  in the outer margin, plates full-measure, the head rule = the mark's
  datum, page numbers and object IDs in the running feet. A paper should be
  identifiable as ours from across a room — by its rules, not its logo.
- **Application UI (instruments):** denser grid (14 px base type), same
  tokens, tables with hairline rules and tabular numerals, buttons as
  hairline-ruled rectangles in the apparatus voice ("Download evidence
  (14 MB)"), one emphasis style, no primary/secondary persuasion hierarchy.
  Empty states are designed truths (N=0 register), not apologies.

## 9. Favicon and app icon

Favicon: R-22 cut, rasters at 16/32/48, SVG fallback; the tab shows the
ring-and-datum alone — the name-shedding future, arriving first in the
smallest place. App icon: R-23. Notification badges never sit on the ring.

## 10. Print and environmental

Cards (R-33), letterhead (mark at left margin, datum as the head rule,
apparatus footer), papers (§8), books (R-36), engraving and emboss (R-31,
R-32), the building datum and stage rule (R-29, R-30). Environmental type in
the apparatus voice; wayfinding text hangs below the 1400 mm line; room IDs
are object IDs.

## 11. Governance

The identity obeys the company's own epistemics: this document is versioned;
changes are Revisions with reasons; the mark's geometry may change only by
ledger amendment (a new R-number with the rejected alternative recorded).
The mark appears once per surface, is never animated in chrome, never
rotated, never explained in captions. **The story is told after the
handshake, not during it** — the mark must work on a stranger who will
never hear about Plimsoll lines, and it does: a ring, held to a level line,
drawn true.

---

*Phase 4 complete. Phase 5 (self-critique: where did I build a generic SaaS
site, overclaim the research, copy references too closely, add maintenance
burden?) follows on your word, then Phase 6 — the build.*
