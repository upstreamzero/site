# Website Buyer Revision v1 — Audit, IA, and Vertical Slice

**Date:** July 15, 2026 · **Status:** vertical slice implemented locally,
NOT deployed — awaiting founder approval.
**Directive:** organize the public experience around buyer problems and
requirements; questions as the human interface; the graph as the machine
interface; the observatory as verification. The site is Client Zero for
the method we sell.

**Frozen-architecture check:** this revision changes *views*, navigation,
and editorial content only. The ontology, object types, edges, evidence
tiers, frozen Method M-4, and machine surfaces are unchanged. Pages have
always been defined as views over the graph, so this is representable
within the existing method — no unfreeze condition is triggered.

---

## Step 1 — Audit of the current live site

| Page | Current purpose | Buyer uncertainty resolved | Buyer role served | Requirement addressed | Evidence available | Problem with current rendering | Action |
|---|---|---|---|---|---|---|---|
| `/` (home) | Institutional mission + honest inventory + open questions + claim ledger | None directly — a buyer must already care about evidence tiers to engage | None on first screen | None explicitly | Inventory counts, tiered claims | Leads with institutional identity ("studies commercial evaluation to improve commerce") and N=0 honesty before any buyer can recognize their problem | **REVISE** (slice) |
| `/philosophy` | Six institutional questions, question-native rendering | "Why should I believe this site?" (trust) | Skeptical evaluator of *us* | Verifiability | Tiered claims, build-enforced rules | None major — correctly scoped to institutional questions | **KEEP** |
| `/research` | Question→hypothesis→experiment→observation pipeline | "What is actually known?" | Verifier | Evidence transparency | Q-1..3, H-1..3, EXP-0001, N=0 registers | Fine as verification path; not a buyer entry point (correct) | **KEEP** (reposition: reached via "How do you know?") |
| `/methods` | Frozen method registry (M-1..M-4) | "How is measurement done?" | Verifier / technical buyer | Method transparency | M-4 frozen v1.0 | None major | **KEEP** |
| `/claims` | Every claim, tiered, including founding claims | "What do you claim and at what confidence?" | Skeptic | No claim above its evidence | 3 claims, all Narrated | None major | **KEEP** |
| `/services` | Seven buyer questions answered by inspectable objects | Partially: "what can you do for me?" | Economic buyer | Measurement without outcome promises | Capabilities (experimental), engagements (FD-6 pending) | Closest existing page to buyer-led; per-service problem/role/uncertainty/deliverable/not-promised fields not yet explicit | **REVISE** (post-slice rollout) |
| `/contact` | What to bring, what a first conversation covers | "How do we start?" | Buyer ready to act | — | — | None major | **KEEP** |
| `/questions/Q-*` | Research question objects with commercial relevance blocks | Research-adjacent | Verifier | — | Object pages | No index above them; buyer/research/institutional classes not distinguished anywhere | **ADD INDEX** (slice) |
| Object pages (claims, hypotheses, methods, concepts, notes, evidence, observations, experiments, capabilities, engagements, deliverables) | Machine + human renderings of graph objects | Verification | Verifier | Inspectability | Full graph | None — this is the proof layer | **KEEP** |
| `llms.txt` | Machine orientation | — | AI evaluators | Faithful reconstruction | — | Largely defines the company by tier discipline and by what it is *not*; thin positive description of what it studies and offers | **REVISE** (slice) |
| — (missing) | Buyer problem recognition | All 12 buyer problems in the directive | All buyer roles | Problem→requirement→question mapping | Varies (mostly Narrated positions) | Page does not exist | **ADD** (slice: index + 1 full answer page) |
| — (missing) | Operational FAQ | "What is this? Who is it for? Do you optimize? Do you guarantee?" | First-time visitor | Plain-language orientation | Existing objects | Page does not exist | **ADD** (slice) |

**Honest classification of the directive's buyer problem map:** none of the
twelve questions has observed evidence of being "frequently asked" —
no evaluator transcripts or buyer interviews are published yet. All buyer
questions in this revision are therefore classified **editorial
navigation** (invention-rule class 3) and labeled as such on the page.
They can be reclassified to *observed-commercial* only when captured
evidence supports it.

## Step 2 — Revised public information architecture

Two paths; the ontology and machine graph are unchanged and stay out of
the visible navigation.

```
BUYER PATH (primary entry)
  /            Home — problem recognition first, institution second
  /questions   Questions index — three classes, clearly separated:
                 1 · Buyer questions      (editorial navigation, labeled)
                 2 · Research questions   (Q-1, Q-2, Q-3 — graph objects)
                 3 · Institutional questions (→ /philosophy anchors)
  /questions/<slug>   Question-led answer pages (slice ships ONE):
                 QUESTION → DIRECT ANSWER → EXPLANATION → EVIDENCE →
                 LIMITATIONS → RELATED QUESTIONS → RELATED RESEARCH →
                 COMMERCIAL NEXT STEP
  /services    Commercial next step (revision scheduled post-slice)
  /faq         Operational questions (what/who/how, not research)
  /contact     Start

VERIFICATION PATH (reached from every answer's "How do we know?")
  /research /methods /claims /philosophy
  /evidence/* /observations/* /experiments/* /hypotheses/*
  /objects/{id} /graph.json /company.json /llms.txt
```

**Navigation (header):** Home · Questions · Services · FAQ · Research ·
Methods · Claims Ledger · Philosophy · Contact — buyer path first,
verification path second. (Services and FAQ were previously absent from
the header entirely.)

**Six problem areas on the homepage** (each anchors into /questions):
recommendation & exclusion · misrepresentation & reconstruction ·
requirements & evidence gaps · evaluation stability · human vs AI
evaluation · measurement & diagnosis.

## Slice contents (Step 3)

1. Homepage revision — buyer problem + direct answer (labeled as a
   founding position, Narrated) on the first screen; problem areas;
   what we measure / don't promise; inventory and verification retained
   below.
2. `/questions` index with the three classes.
3. `/questions/why-are-some-companies-recommended` — one complete buyer
   question page using the full rendering model.
4. `/faq` — operational FAQ with FAQPage JSON-LD (visible FAQ content).
5. `llms.txt` — positive institutional description per directive.
6. Technical: Organization + WebSite JSON-LD in the layout (previously
   absent), sitemap additions for the three new routes.

## Step 4 — Build, link validation, and technical audit results

- Full static build: **passes** (74 pages; was 71 — the three new routes).
- Internal links: **0 broken** across all built pages (automated crawl of
  every `href="/…"` against the export).
- Anchors: **0 broken** (every `#fragment` link verified against an
  `id=` in the target page, including `/philosophy` and `/questions`
  anchors).
- sitemap.xml: **37 URLs** (34 previous + `/questions`,
  `/questions/why-are-some-companies-recommended`, `/faq`).
- Canonicals: present and apex-domain on all new pages.
- Titles + meta descriptions: present on all new pages.
- Organization + WebSite JSON-LD: **added** to the layout (previously
  absent). Factual fields only; the custom graph remains primary.
- FAQPage JSON-LD: on `/faq` only, mirroring visible content verbatim.
  (`/philosophy` already carried FAQPage markup for its visible Q&A.)
- Mojibake / UTF-8: **0 occurrences** of `â€` in the export; three
  React-eaten spaces around em dashes found by scan and fixed at source.
- graph.json: **27 objects locally = 27 live — machine graph unchanged.**
  company.json unchanged; object routes unchanged.
- llms.txt: revised (positive description first, three-layer map added;
  tier discipline, verification, and the not-an-SEO-agency line retained).
- Mobile rendering: verified at 375px (nav wraps, datum intact,
  problem-area grid collapses to one column).
- robots.txt, www→apex redirect, HTTPS: unchanged since launch
  verification; not re-tested here because nothing was deployed.

## Founder revisions applied before commit (2026-07-15)

1. Homepage direct answer softened to "Being visible is not the same as
   being selected. Recommendations are shaped by how an evaluator
   interprets your fit, evidence, and ability to satisfy the requirements
   of the situation." Rendered at Narrated tier. The explanation now
   states rankings/visibility affect retrieval, retrieval ≠ recommendation,
   recommendation introduces evaluation against situational requirements,
   mechanisms/weights remain under investigation, and Upstream Zero
   measures behavior rather than claiming a settled mechanism. Same
   softening applied to the buyer-answer page. Rankings are never called
   irrelevant — only insufficient to fully explain selection.
2. First screen carries one problem, one answer, and the
   measure/not-promise pair; the six problem areas moved below it. Fuller
   question map lives on /questions.
3. EXP ID collision resolved: EXP-0001 stays Knowledge Propagation
   (retitled); the reconstruction-fidelity protocol, frozen files, and
   config migrated to EXP-0002. No captured run or frozen receipt bound
   the ID, so no pre-report was required. Day 0 captures are propagation
   baselines for EXP-0001, never reconstruction-scored. Inspired Taste is
   recorded only as external motivation for EXP-0002.
4. Buyer questions described as "questions that represent the commercial
   problems Upstream Zero is currently built to investigate" — never
   "frequently asked/common/top." Classification stays editorial.
5. Two-path structure preserved; observatory unchanged as the proof layer.
6. Navigation reduced to seven primary items (Questions · Research ·
   Methods · Claims · Services · About · Contact). FAQ and Philosophy
   moved under a new /about hub and into the footer. No routes removed.

## Explicitly out of scope until founder approves the slice

- Rolling the answer model across Services and remaining problem areas.
- Any new graph objects, claims, tier changes, or question reclassification.
- EXP-0001/EXP-0002 renumbering (see report — ID collision needs a founder
  ruling before the reconstruction-fidelity protocol is frozen).
- Deployment of any of the above.
