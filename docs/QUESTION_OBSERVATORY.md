# The Question Observatory — Architecture

**Date:** July 14, 2026
**Author:** Claude — founding information architect
**Origin:** founder ruling following the question-native rendering V1 review.
**Status:** ARCHITECTURE FOR REVIEW — deliberately unimplemented. No schema
code, no content, no pages have been changed.

---

## 0. What changes, what doesn't — stated precisely

Unchanged: the ontology's existing seventeen types and their rules, the
knowledge graph, the evidence architecture, the tier system, the
question-native rendering pattern (question → immediate answer →
explanation → evidence → limitations → related questions), the visual
language, and the machine interface.

Changed: the website's organizing purpose. It is no longer a collection of
research pages; it is **the public interface to the Question Observatory**
— an instrument whose object of study is *the questions commerce asks*,
and whose output is comprehensive, measurable coverage of them.

One honest correction to the framing before anything else: the founder's
brief says "the ontology remains unchanged" and also "each question should
become a first-class object in the graph." Both cannot be literally true —
**a first-class object is an ontology extension.** This document proposes
exactly one new type (§2) and a handful of new edge relations (§7), and
per the graph's own constitution, extending the closed vocabulary is a
recorded Method revision, not a silent change. The extension is small,
additive, and breaks nothing; but it is an extension, and the record
should say so.

## 1. The fundamental principle

**The purpose of the website is comprehensive question coverage.**

Not content coverage. Not page coverage. Question coverage.

- Every page exists because a meaningful question exists.
- Every answer increases the coverage of the Question Observatory.
- A page without a question behind it is decoration and should not exist.

This principle is measurable (§6), which is what makes it a principle
rather than a slogan.

## 2. The Canonical Question — one new type

### 2.1 Why a new type, not a reuse

The existing `question` type (Q-1…Q-3) holds **research questions** — what
*our instrument* is pointed at. A **canonical question (CQ)** is a
different kind of object: an **observed phenomenon** — a question the
market actually asks, discovered through evidence rather than invented
editorially. Conflating them would blur the observatory's most important
line: Q-objects are ours; CQ-objects are *data about commerce*. They meet
(a finding can answer both; a CQ can motivate a Q) but they are not the
same thing.

### 2.2 The envelope

`CQ-####`, filed under `content/canonical-questions/`. Fields, grouped by
epistemic character — because a canonical question mixes identity,
observation, and derived state, and the architecture must keep those
distinct:

**Identity (curated, versioned):**

```
id                     CQ-0042 — permanent, never reused
canonicalQuestion      the canonical phrasing
variants[]             observed phrasings that resolve to this question
underlyingUncertainty  the commercial uncertainty beneath the words —
                       what the asker is actually trying to resolve
intent                 understand | compare | validate | troubleshoot |
                       price | integrate | trust   (closed enum, extensible
                       by recorded revision)
buyerStage             problem-aware | solution-seeking | comparison |
                       validation | post-purchase   (closed enum)
```

**Observation (evidence — never hand-written):**

```
sources[]              provenance of the question's existence (§3):
                       { sourceType, environment?, observedAt, note,
                         evidence → OBS/E object where applicable }
environmentRecords[]   per retrieval environment (§4):
                       { environment → Instrument id,
                         observationFrequency (with N and window),
                         lastObserved }
```

**Derived (computed at build — never stored by hand, §6):**

```
currentCoverage        unanswered | answered-narrated | answered-evidenced
evidenceCoverage       the tier of the strongest evidence chain behind
                       the published answer
linkCoverage           count of independent graph paths into this CQ
confidence             plain-language, derived from the above
```

**Standard envelope:** created, status, authors, edges, revision history —
identical to every other object.

### 2.3 The rule that keeps the observatory honest

**A canonical question cannot exist without at least one source record.**
Editorially invented questions are forbidden — by build failure, not
policy. If we believe a question matters but have not observed it, the
honest path exists already: observe it (run the evaluation prompt, check
the search data, interview the buyer) and record the observation. The
observatory publishes what commerce asks, not what we wish it asked.

*(Bootstrap honesty: the six questions on the current Philosophy page were
editorially composed during V1. Under this architecture they are
grandfathered as `source: internal-research` with a dated note saying
exactly that — visible, not laundered.)*

## 3. Question sources

Closed source-type vocabulary (extensible by recorded revision):

```
evaluator-prompt       observed AI evaluation prompts (our own instruments)
search-console         Google Search Console query data
google-ai-mode         Google AI Mode observations
chatgpt                ChatGPT observations
copilot                Copilot observations
bing                   Bing observations
perplexity             Perplexity observations
claude                 Claude observations
buyer-interview        direct buyer conversations
customer-conversation  client engagements (consent required — see below)
internal-research      our own program (incl. grandfathered V1 questions)
finding-derived        questions created by previous findings
```

Rules:

- Every canonical question is traceable to *why it exists*. Source records
  answer it.
- Sources that involve people (`buyer-interview`, `customer-conversation`)
  inherit the consent and named-parties rules already in the architecture:
  no identifiable data without documented consent, anonymization declared.
- Search Console and observation-platform sources require accounts and
  access the founder controls — flagged as **FD-9** (which sources are
  actually available to us today, and under whose credentials).

## 4. Retrieval environments — an elegant reuse

The brief lists environments (Google Search, Google AI Mode, ChatGPT,
Copilot, Bing, Perplexity, Claude, future ones) as things questions are
observed *through*. The ontology already has a type for "the thing
observation happens through": **Instrument**. Retrieval environments
register as Instrument records — versioned, dated, with known limitations
— and CQ environment-records point at them.

No new type needed; the instrument registry stops being empty; and every
environment-frequency claim automatically inherits instrument-stamp
discipline (which environment, which version, observed when, sampled how).

## 5. The environment-distribution hypothesis — registered, not assumed

The brief's critical realization — *there is probably not one universal
question graph* — enters the observatory the only way a belief can:

**H-3 (proposed): Question distributions differ materially across
retrieval environments.**

Predictions: the same commercial domain will show measurably different
canonical-question frequency rankings across environments; some questions
will be environment-exclusive. Refutation: cross-environment observation
shows distributions statistically indistinguishable at meaningful sample
sizes. Until measured, nothing in the rendering or coverage model may
*assume* environment differences — the per-environment records exist
precisely so the answer can be measured rather than presumed.

## 6. Coverage — the observatory's instrument panel

Six coverages, all **computed from the graph at build time**, never
maintained by hand (the lesson of the tier floor: honesty enforced by
computation survives deadline pressure; honesty maintained by editing does
not):

| Coverage | Definition (computed) |
|---|---|
| Question | CQs published ÷ CQs observed (the backlog is visible) |
| Answer | CQs with a published resolved-question rendering |
| Evidence | distribution of answer evidence tiers (how much of the map is Narrated vs. evidenced) |
| Retrieval | CQs with ≥1 environment record ÷ all CQs |
| Environment | environments actively observed ÷ environments registered |
| Link | mean independent graph paths into each CQ (the connectivity objective, §7) |

At launch every number is zero or near-zero, and the coverage board prints
that — the observatory opens with an honest empty sky map, exactly as the
site opened at First Light. **"Which questions matter most" is a measured
claim** (frequency × environment spread × buyer stage), never an editorial
one, and carries the same tier discipline as everything else.

## 7. Connectivity — multiple independent retrieval paths

Every answer intentionally increases graph connectivity. New edge
relations (the recorded vocabulary extension, with `answers` being the
load-bearing one):

```
answers          resolved rendering / finding → CQ
asked-in         CQ → Instrument (retrieval environment)
motivated        CQ → Q (a market question motivating a research question)
variant-of       CQ → CQ (variant consolidation)
```

Plus the existing vocabulary doing its normal work (`supports`, `cites`,
`derives-from`…). Linking rules for every published answer: related
questions (≥2 where they exist), supporting findings / methods /
experiments / evidence / claims / observations wherever the graph holds
them. Orphan CQs (no inbound path but the index) are build *warnings* —
visible debt, not silent gaps.

## 8. Rendering integration

Nothing about the V1 pattern changes. What changes is where questions come
from and how they are organized:

- **CQ pages are resolved-question pages.** The six-part pattern renders
  each canonical question; the CQ object supplies the question, variants
  (rendered for machines; humans see the canonical phrasing), and the
  evidence section draws from the graph as V1 already does.
- **The question index becomes the human sitemap** — organized by
  underlying uncertainty and buyer stage, not by our internal categories.
  Humans navigate questions; machines navigate entities. Ontology pages
  remain fully addressable but become the machine's front door, not the
  human's.
- **Unanswered questions are published too.** A CQ observed but not yet
  answered renders honestly as an open question with its observation
  record — the observatory showing its telescope log, not just its
  discoveries. (This is also the strongest possible demonstration that
  questions come from evidence, not editorial invention.)

## 9. Client Zero — the observatory audits itself first, then customers

The same system that determines our publishing priorities becomes the
customer audit. The mapping is exact:

| Audit question | Observatory operation |
|---|---|
| Which important questions exist in your market? | CQ set filtered to the market, ranked by measured frequency × environment spread |
| Which environments ask them? | environment records per CQ |
| Which questions does your company answer? | coverage computation with the customer's content as the answer corpus |
| Which do competitors answer? | same computation, competitor corpus |
| Which remain uncovered? | set difference — the gap map |
| Which lack sufficient evidence? | evidence-coverage distribution over their answered set |

Coverage becomes measurable — which converts the commercial wedge from
diagnosis-by-judgment to **diagnosis-by-instrument**. The firewall is
unaffected and worth restating: an audit reports coverage; it does not
promise evaluator behavior. Existing capabilities (CAP-1, CAP-2) gain
their eventual `derives-from` path through the observatory's methods —
this is how the capabilities finally earn `operational`.

## 10. Epistemics and open problems

- CQ observation records are **behavioral observations** about retrieval
  environments and buyers — they carry N, windows, and instrument stamps
  like any observation. Frequency claims without sample sizes do not ship.
- **The ingestion pipeline is the hard unsolved problem** (the same class
  as FRICTION_LOG FR-8): what procedure turns a raw sighting (a Search
  Console row, an evaluator prompt, an interview note) into a source
  record — who observes, how it is verified, how variants are consolidated
  into canonical questions without editorial invention sneaking in through
  the consolidation step. This needs a Method (proposed: M-4, "canonical
  question ingestion") before the first non-grandfathered CQ ships.
- Variant consolidation is itself a judgment; the method must make it
  auditable (variants preserved verbatim, consolidation reasoning
  recorded).

## 11. Founder decisions this architecture surfaces

- **FD-9 · Source access.** Which sources are actually available today
  (Search Console property? platform observation accounts?) and under
  whose credentials.
- **FD-10 · The bootstrap set.** Approve grandfathering V1's six
  Philosophy questions as `internal-research`-sourced CQs, or require
  observed sources before they enter the observatory.
- **FD-11 · M-4 ingestion method.** The consolidation and verification
  procedure needs founder review before first use — it is where editorial
  invention could quietly re-enter.

## 12. Rollout (proposed, not begun)

1. Vocabulary amendment: CQ type + four edge relations + source enum —
   recorded as a Method revision.
2. Instrument registry: register retrieval environments.
3. H-3 registered as a hypothesis object.
4. M-4 drafted; FD-9/10/11 resolved.
5. Seed CQs **from real observations only**; publish the question index
   with honest coverage zeros.
6. Apply question-native rendering site-wide, with CQs as the source of
   truth for what gets a page.
7. Coverage board on the Observatory home.
8. Audit tooling (Client Zero first, per the founding rule).

---

*Architecture complete; nothing implemented. Awaiting founder review —
particularly §0's honest correction (this is a small ontology extension
and should be recorded as one), §2.3's no-invented-questions build rule,
§4's environments-as-instruments reuse, and the three new founder
decisions in §11.*
