# EXP-0001 — Protocol & Prediction Card

**Title:** Can a transparent first-party knowledge graph be reconstructed
faithfully by evaluator systems?
**Version:** 1.0 — **DRAFT FOR FOUNDER APPROVAL (FD-8). NOT PRE-REGISTERED.
NOT RUN.** Approval freezes this document into
`content/experiments/EXP-0001.mdx`; that commit becomes the immutable
pre-registration timestamp; no run may begin before it exists.
**Method:** conducted under frozen Method v1.0 (M-4) observation
discipline: verbatim capture, double-stamping (environment × instrument),
raw permanence, exposure labeling, coder discipline.
**Date drafted:** July 14, 2026 (drafted at repo HEAD `d6963b5`).

---

## 1. Research question and linkage

Upstream Zero publishes its knowledge as a transparent, tiered,
machine-readable graph (HTML pages, `llms.txt`, `graph.json`, per-object
JSON, explicit evidence tiers, declared limitations). **When evaluator
systems describe Upstream Zero, how faithfully do they reconstruct that
graph** — its facts, its tiers, its uncertainty, its relationships, and
its provenance?

Linkage: tests the practical premise of **C-0003** (machine
representation) and the influence channel of **H-1**; operationalizes the
fidelity invariant on ourselves first (**Client Zero**). This is a
reconstruction-fidelity experiment, not a ranking or visibility
experiment.

## 2. Frozen evaluator environments

Six environments, registered as EE- records at pre-registration. Consumer
web UI, default model and settings, US-English. Personalization
minimized and *recorded*: fresh conversation per probe; memory /
personalization / custom instructions **off** where the product allows;
account identity noted in the run log. The exact model/version string
reported by each UI is captured per response; environment versions are
whatever is publicly served during the run window — recorded, not chosen.

| ID (to assign) | Environment | Access mode |
|---|---|---|
| EE-1 | ChatGPT (chatgpt.com) | default model, temporary chat, memory off |
| EE-2 | Claude (claude.ai) | default model, new chat, no preferences/projects |
| EE-3 | Perplexity (perplexity.ai) | default mode |
| EE-4 | Google AI Mode | default, clean browser profile |
| EE-5 | Microsoft Copilot (copilot.microsoft.com) | default mode |
| EE-6 | Google Search (classic results + AI Overview if shown) | clean profile; captures citation/surface behavior |

## 3. Frozen instrument — I-1 "Reconstruction probe" v1.0 (session conditions)

- One fresh session per prompt per run. No cross-session contamination.
- Prompts pasted **verbatim** (§4). No paraphrase, no typo correction, no
  regeneration; the first completed response is the observation. (A
  regeneration, if ever used, is a separate labeled observation, never a
  replacement.)
- No clicking suggested follow-ups except in the designated multi-turn
  probe (P8), whose follow-up wording is itself frozen.
- Captured per response: full raw output text; all citations/links;
  **offered next turns / suggested follow-ups verbatim** (admissible
  future evidence under M-4 source `evaluator-followup`); UI-reported
  model string; timestamp (UTC); environment ID; screenshots; account
  state notes; locale.
- Repetition: each prompt × **3 runs** per environment, on ≥2 separate
  days within the run window (stability sampling; N recorded on every
  statistic).
- Run window: **10 business days** from pre-registration (parameter,
  §11).

## 4. Frozen prompts (exact strings)

- **P1** — `What is Upstream Zero?`
- **P2** — `Tell me about the company at upstreamzero.com — what do they do and what makes them different?`
- **P3** — `What claims does Upstream Zero make, and how strong is the evidence behind them?`
- **P4** — `How does Upstream Zero classify the confidence of its own statements?`
- **P5** — `What is the relationship between Upstream Zero's founding claim about commercial evaluation becoming observable and its hypothesis H-1?`
- **P6** — `Does Upstream Zero promise to improve a company's AI rankings or visibility?`
- **P7** — `Where can I verify Upstream Zero's claims without trusting them? Give specific URLs.`
- **P8** *(multi-turn)* — P1, then verbatim follow-up:
  `What would change their mind about their founding claim?`

Any wording change after freeze is a protocol revision (new version,
recorded), never a silent edit.

## 5. Frozen scoring criteria

Every response scored on nine dimensions, rubric 0/1/2, coder and date
recorded. Single-coder status is declared on all outputs; a
time-separated self-recode of a ≥30% sample substitutes for second-coder
agreement (M-4 §15) and its agreement rate is published.

| # | Dimension | 2 | 0 |
|---|---|---|---|
| S1 | Coherence | coherent account of the actual company | confabulated or wrong entity |
| S2 | Completeness | ≥5 of 6 checklist elements present¹ | ≤1 present |
| S3 | Evidence-tier preservation | conveys that founding claims are low-evidence/Narrated or explains the tier system | states founding claims as established fact |
| S4 | Uncertainty preservation | reproduces our stated limitations/refutation conditions | presents the program as settled |
| S5 | Relationship fidelity | key edges correct (claim↔hypothesis; capability↔method gating; engagement↔non-promises) | relationships scrambled/inverted |
| S6 | Unsupported additions *(inverse)* | none | material fabrication (invented team, clients, funding, outcomes, promises) |
| S7 | Omissions | no material omission given cited surfaces | core identity omitted |
| S8 | Citation behavior | cites correct, live upstreamzero.com URLs; surface used recorded (HTML / llms.txt / graph.json / objects) | no citations or hallucinated URLs |
| S9 | Provenance recovery *(P7)* | a reader could actually verify: ledger/objects/graph surfaced | verification path absent or fabricated |

¹ Completeness checklist: (a) research company; (b) subject = commercial
evaluation; (c) observatory identity/N=0 honesty; (d) evidence-tier
system; (e) Client Zero self-measurement; (f) commercial work exists but
promises no evaluator behavior.

Also recorded, unscored: response latency class, refusal/null answers,
language of citations, whether machine surfaces (`llms.txt`,
`graph.json`, `/objects/*`) appear anywhere in citations.

## 6. Frozen expected failure modes

Pre-declared so that post-hoc "interesting failures" cannot be laundered
into predictions:

- **F1 Entity confusion** — conflation with unrelated "Upstream"/"Zero"
  brands.
- **F2 Tier flattening** — founding claims restated as established fact
  (S3=0).
- **F3 Register inversion** — Upstream Zero described as an
  SEO/AEO/AI-visibility agency (the exact misread the site is designed
  against).
- **F4 Fabricated specifics** — invented team, funding, customers,
  metrics, outcomes.
- **F5 Surface poverty** — citations to the homepage only; machine layer
  unused.
- **F6 Honest nulls** — "I don't have information" (expected for
  parametric-only knowledge given site age; scored as null, not failure).
- **F7 Provenance dead-ends** — invented or broken verification URLs.

## 7. The prediction card

Registered before any run; each prediction names its refutation:

| # | Prediction | Refuted if |
|---|---|---|
| PR1 | ≥1 retrieval-capable environment cites upstreamzero.com for P1 or P2 within the window | no environment retrieves the site at all |
| PR2 | Tier flattening is the modal failure: mean S3 < 1.0 across retrieval-grounded responses | mean S3 ≥ 1.0 (tiers survive better than we fear) |
| PR3 | No environment uses `graph.json` or object JSON unprompted (P1–P6); machine surfaces appear only under P7, if at all | any unprompted machine-surface citation (a happy refutation) |
| PR4 | F3 (optimization-agency misread) occurs at least once across all runs | zero F3 occurrences |
| PR5 | Unsupported additions (S6 ≤ 1) occur in ≥25% of retrieval-grounded responses | <25% |
| PR6 | Our published refutation conditions surface in <25% of P8 runs (uncertainty rarely survives reconstruction) | ≥25% |

These predictions are, per our own vocabulary, Narrated intuitions — the
card exists precisely to convert them into statements reality can
falsify.

## 8. Exposure labeling — the honest correction

The site has been publicly reachable since first production deployment;
the true pre-publication baseline **was never captured and that gap is
permanent**. Therefore, per the founder's rule and M-4 §11:

- **No observation in this experiment may be labeled
  `pre-publication baseline`.**
- All first-run observations are labeled **`post-publication
  observation`**, with per-response exposure sub-status:
  `potentially exposed` (environment has live retrieval) or
  `exposure status unknown` (parametric answers whose training predates
  launch — F6 nulls likely).
- At results publication, the missed baseline is recorded in the friction
  log as a permanent, declared limitation of all EXP-0001 inference.

## 9. Publication record (frozen facts)

- Repository: `github.com/upstreamzero/site` (public; timestamp
  authority).
- Site content at protocol drafting: HEAD `d6963b5`
  (2026-07-14T20:07:52-07:00).
- Version 0.1 "First Light" commit: `5195458`, pushed 2026-07-14
  (public from that push).
- First production deployment (upstreamzero.pages.dev): 2026-07-14.
- `robots.txt`/`sitemap.xml` live: commit `b7ec8be`,
  2026-07-14T18:41:31-07:00.
- Custom domain active with TLS: certificate notBefore
  2026-07-15T01:36:57Z.
- Google sitemap fetch: 2026-07-14, Success, 34 URLs.
- The pre-registration commit hash and site HEAD at run start will be
  appended at freeze and at first run respectively.

## 10. Raw preservation

Every response is preserved verbatim and content-hashed as an Evidence
artifact (text + citations + offered next turns + metadata), screenshots
archived alongside; nothing summarized in place of raw; redactions (none
expected) would be declared. Scoring sheets reference evidence hashes.
Results publish as tiered findings with full chains — or as honest nulls.

## 11. Parameters for approval (FD-8)

1. Run window (proposed: 10 business days from pre-registration).
2. Runs per prompt per environment (proposed: 3, across ≥2 days).
3. PR2/PR5/PR6 thresholds (proposed values above).
4. Environment account details (which accounts; memory-off confirmation
   per product).
5. Whether EE-6 (classic Google) stays in scope (proposed: yes, citations
   only).

---

*Protocol and prediction card complete. Nothing has been run; nothing is
pre-registered. Approval (FD-8) freezes this into the experiment object,
the commit becomes the timestamp, and observation — finally — begins.*
