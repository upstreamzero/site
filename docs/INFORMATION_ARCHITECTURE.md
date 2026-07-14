# Information Architecture — Upstream Zero

**Phase 2 deliverable — Revision 4**
**Date:** July 13, 2026
**Author:** Claude — founding information architect
**Revision notes (practicing our own discipline):**
- **R2** incorporated the dual-mandate correction: research discipline *and*
  commercial viability. Extended the ontology with commercial object types and
  derived the commercial views from them. The rule is not "do not optimize for
  conversion." The rule is: **do not let conversion pressure distort evidence,
  inflate claims, hide uncertainty, or redefine the company as an optimization
  agency.**
- **R3** incorporates the founder clarification: design a company whose
  authority comes from its research and whose products emerge from it — not a
  museum or academic archive. Adds the reference-institution positioning
  (§0.2) and makes the research→commerce relationship a visible through-line
  (§3.6) rather than a single quiet link. *The research exists to improve
  commerce; the website should make that relationship obvious.*
- **R4** corrects R3's positioning: the metrology-institute/testing-laboratory
  analogy describes a **future, unearned identity**. Today's identity is the
  **observatory** — the discipline is still discovering the structures it will
  eventually standardize and measure. §0.2 reframed as an identity sequence;
  §3.6 Commercial Relevance formalized to the founder's five-field structure.
**Status:** Approved direction; Phase 3 gated on visual references
- **R5 (2026-07-14):** the Question Observatory. The website's organizing
  purpose becomes comprehensive question coverage; canonical questions
  (observed, never editorially invented) become a first-class type;
  retrieval environments register as Instruments; coverage is computed,
  never hand-maintained. Full architecture: docs/QUESTION_OBSERVATORY.md.
  Rendering (docs/RENDERING_MODEL.md) and all existing types unchanged.
  **R2 of that architecture** adds the durable/variable separation: the
  durable commercial chain organizes the system; evaluator implementations
  are observation records only — platform names never appear in the schema.
  **R3** separates observer from observed (evaluator environments are the
  studied systems; Instruments are Upstream Zero's observation procedures —
  correcting R5's earlier note above), models canonical questions as
  derived research objects over immutable observed expressions, and types
  questions honestly (observed-commercial / research-derived /
  editorial-navigation). Implementation is gated on M-4
  (docs/M-4_PROPOSAL.md — draft, not frozen).
  **Observatory R4 (founder-ratified):** requirements become the durable
  organizing spine — a correction back toward the founding model ("buying
  committees apply requirements"). Canonical questions demote to derived
  linguistic projections of (requirement | uncertainty) × role × stage ×
  intent; requirement gates earn first-class status by the
  independent-state test; requirements, gates, and business problems
  inherit the evidence-class discipline; research confidence and evaluator
  confidence separate; requirement coverage becomes the headline metric.
  The public experience remains question-led; the graph reads
  requirement-led. M-4 v0.2 rebuilt around the spine; still not frozen.

---

## 0. The organizing decision

The website is not a set of pages. It is a **public knowledge graph with
rendered views.** Ontology first; navigation is a consequence.

The graph has typed objects, typed relationships, permanent identifiers, and
mandatory provenance metadata. Pages are projections for human readers;
parallel machine renderings project the same graph for machine evaluators.
Nothing significant exists only as prose on a page.

The site serves **three layers over one graph**:

1. **Public Research** — the observatory: questions, hypotheses, experiments,
   observations, findings, methods, tiers, corrections.
2. **Commercial Application** — the translation: what the research means for
   organizations being assessed, recommended, validated, and eliminated by AI
   evaluators.
3. **Paid Engagement** — the path: what Upstream Zero can measure for a client
   today, what an engagement produces, how to start.

These are layers of *rendering and register*, not separate sites. They share
one graph, one tier system, one revision discipline. What keeps them from
contaminating each other is the type system (§3) — not tone, and not hope.

### 0.1 Where I agree with the graph premise — and three standing challenges

*(Unchanged from R1, compressed.)* Pages-as-views over a graph is right, with
three corrections drawn from the references themselves: **(1)** every
successful graph has a spine — Nature is papers, GitHub is repos, Wikipedia is
articles; ours is the **Claim**, the unit of accountability that the tier
system grades and that machines will quote. **(2)** "Pages second" must not
mean "URLs second" — URLs are our DOIs, part of the object model, permanent,
never reused. **(3)** A graph is not a narrative; the editorial voice is
itself an object type (**Note**), typed Narrated by construction, with a
one-way valve: Notes cite objects, objects never cite Notes.

And structurally: at N=0 with a team of ~one, the graph is **file-shaped, not
database-shaped** (§7). Git is the revision authority; the build enforces the
ontology.

### 0.2 Positioning against the reference institutions

The founder named Gartner, IDC, and the Santa Fe Institute as organizations
holding a similar tension. Each resolves it differently, and each resolution
teaches us something — mostly about what *not* to inherit:

- **Gartner** monetizes authority through **opacity**: the research is
  paywalled, the Magic Quadrant methodology is proprietary, and vendors both
  fund and are graded by the same institution. It is commercially brilliant
  and epistemically the inverse of Upstream Zero — our entire premise is that
  verification must not depend on trust, which forecloses paywalled provenance
  and undisclosed methodology. We also cannot copy its conflict structure:
  vendor-pays-for-evaluation is precisely the contamination our firewall
  exists to prevent.
- **IDC** monetizes **data exclusivity**: proprietary datasets, syndicated
  access. Closer, but still sells the evidence itself. Our evidence must be
  inspectable to do its epistemic work; what we sell is the *application* of
  method to a client's specific situation — measurement of *their* standing,
  not access to *our* archive.
- **Santa Fe Institute** has maximal research purity and **no product
  emergence at all** — donor-funded prestige. Designing toward SFI is
  designing the museum the founder just prohibited.

What survives the triangulation is an **identity sequence, not a single
analogy** *(corrected in R4 — the founder's ruling)*:

> The observatory discovers. The institute organizes. The laboratory measures.
> Standards emerge later.

A testing laboratory measures against established standards. Upstream Zero's
research is still *discovering* the structures it will eventually
standardize — we do not yet know all of the evaluation structures we expect to
measure. Today's earned identity is the **observatory**. The
metrology-institute economics ("public standards, private measurements") are
where the model likely matures, and the architecture must *allow* that
evolution — but must not be optimized around an identity that hasn't been
earned.

What this means architecturally:

- **Today, revenue is observation applied to a client's case**, sold with
  observatory honesty: "we can observe and measure X about your situation
  with method M-n, which is version-3 and still evolving" — not "we certify
  you against the standard," because the standard does not yet exist.
- **The Capability maturity axis already encodes the sequence.**
  `experimental` is observatory-phase work (offered with declared
  uncertainty); `operational` is laboratory-grade (stable method, run
  end-to-end). As the discipline matures, capabilities migrate along an axis
  that already exists — no restructuring required. A future `standard` grade
  can be added to the maturity vocabulary when — and only when — the first
  standard is actually earned.
- **Methods are versioned precisely because they are still instruments under
  development**, not standards. The day a Method stabilizes into something
  standard-like is a visible, dated event in its changelog — the architecture
  will record the identity transition as data rather than as a rebrand.
- The economic through-line survives the correction unchanged: **openness is
  what makes the paid measurement worth buying** — true for an observatory
  selling observations today, and true for whatever institute it becomes.

---

## 1. Design constraints inherited from Phase 1 and founder rulings

- Honest and dignified at N=0; findings dated, versioned, instrument-stamped.
- Subject is commercial evaluation; AI is the current instrument.
- Evaluator explanations are observations about the evaluator, never proof of
  mechanism — enforced in the Observation type.
- Propagation is measured, not avoided — Client Zero is an object type.
- Humans **and machine evaluators** independently verify significant claims;
  verification rests on inspectability, not trust.
- Corrections receive equal architectural dignity to findings.
- **Dual mandate:** credibility without commercial ambiguity; commercial
  clarity without research contamination. This is a company, and the site
  must not pretend otherwise.
- Four registers that must never collapse, visually or semantically:
  **research claims · commercial capabilities · promised deliverables ·
  measured outcomes.**

---

## 2. The research ontology

*(Thirteen types, unchanged from R1 in substance; envelope and edge vocabulary
in §4.)*

| # | Type | Role | Key rule |
|---|------|------|----------|
| 1 | **Claim** | *Spine.* Atomic assertion we publicly stand behind | Displayed tier is a floor: never exceeds what evidence edges justify; no edges → automatically Narrated |
| 2 | **Question** | What the observatory is pointed at | Honest N=0 content: a sky map needs no holdings |
| 3 | **Hypothesis** | Named falsifiable statement + predictions | **H-1 reserved:** the bridge claim (AI evaluation resembles / influences / replaces human evaluation) |
| 4 | **Observation** | Immutable recorded instance of evaluator behavior | Mandatory instrument stamp. Typed `behavioral` vs `rationale`; rationale observations are about the evaluator's narration and cap at Narrated for mechanism claims |
| 5 | **Experiment** | Protocol + **pre-registered predictions** + runs | Registration snapshot is immutable; git history is the timestamp authority; abandoned experiments stay visible |
| 6 | **Finding** | Interpreted result bridging observation → claim | Lists competing explanations and unresolved confounds; carries validity date bounds |
| 7 | **Evidence Artifact** | Raw evidence, content-hashed | No orphaned provenance: unpublishable artifacts get declared gaps, never silent ones |
| 8 | **Method** | Versioned procedure | **M-1 = operational tier definitions** — the constitution of the system |
| 9 | **Instrument** | What observation happens through (each model+version+access-mode distinct) | Makes "AI is the current instrument" architectural; new instrument classes are records, not redesigns |
| 10 | **Concept** | Glossary for coined vocabulary | Every rendered use links here; "how is this different from SEO?" is answered once, canonically |
| 11 | **Revision** | First-class correction event | Own index (changelog) with the same dignity as findings; records which objects were re-tiered |
| 12 | **Propagation Record** | *Client Zero.* Sightings of our published objects in the environment we study | Fields: source object, sighting, instrument, fidelity, effect. Your four propagation questions become queries over this type |
| 13 | **Note** | Editorial voice: essays, briefings, announcements | Narrated by construction; one-way valve (Notes cite objects, never the reverse) |

## 3. The commercial ontology — new in R2

Four new types, one per register the founder ruled must never collapse. Each
has its own URL namespace, envelope, and rendering register, so collapsing
them would require deliberately breaking the type system.

### 3.1 Capability — *"what we can measure"*

Something Upstream Zero can measure or analyze for a client **today**.

- **Fields:** what is measured, for whom, maturity (**`operational`** — run
  end-to-end with stable method | **`experimental`** — offered with declared
  uncertainty), method refs, limits and non-claims (what this measurement
  cannot tell you), instrument dependencies.
- **Edges:** `derives-from` → Methods/Findings (mandatory); `delivered-by` →
  Engagements.
- **Rules:** A Capability without at least one `derives-from` edge into the
  research layer **cannot be marked operational** — it renders as experimental
  with the gap declared. This is the founder's sentence made structural: *the
  site makes money because the research creates a capability buyers value* —
  a capability literally cannot outrun its research. Maturity labels answer
  the buyer question "what is still experimental?" honestly, per capability.

### 3.2 Engagement — *"what a paid engagement is"*

A way to work with Upstream Zero. (The founder-listed entry points —
Commercial Evaluation Audit, Recommendation Intelligence Audit, Requirement
and Evidence Gap Analysis, Evaluation Survivability Measurement, Ongoing
Monitoring, Advisory — ship as **provisional** Engagement records, named as
provisional; final productization is future content, not architecture.)

- **Fields:** who it serves, questions it answers, capabilities exercised,
  deliverables produced, what it requires from the client, duration shape,
  status (provisional | active | retired), **explicit non-promises**.
- **Edges:** `exercises` → Capabilities; `produces` → Deliverables.
- **Rules:** An Engagement may promise only Deliverables (artifacts), never
  outcomes. The sentence "we will improve your recommendations" is
  unrepresentable in this type — there is no field it could live in. That is
  the anti-GEO firewall in product form: **we measure and diagnose; we do not
  promise evaluator behavior.**

### 3.3 Deliverable — *"what you receive"*

A concrete artifact template a client receives — inspectable before buying.

- **Fields:** contents specification (sections, measurements included),
  format, what it does *not* contain, example status (real redacted example |
  illustrative-and-labeled | none-yet).
- **Edges:** `produced-by` → Engagements; `applies` → Methods.
- **Rule from Phase 1 §7:** an illustrative deliverable excerpt must be
  visually and semantically typed as illustrative — never rendered in the
  visual language of real findings.

### 3.4 Outcome Record — *"what was measured after the fact"*

The **only** place outcome statements can live: post-hoc, measured, consented,
tiered results from real engagements.

- **Fields:** engagement type, measured effect, measurement method, N,
  consent/anonymization status, tier, validity bounds.
- **Edges:** `measured-by` → Methods; `derives-from` → Observations.
- **Rules:** Outcome Records are evidence-tiered like any research object —
  the tier floor applies. At N=0 the index states plainly: *"No measured
  outcomes yet. Engagement results will be published here as tiered evidence,
  with client consent, as they are measured."* An empty register displayed
  honestly is the architecture keeping its promise before it has data.
  Testimonials, logos, and case-study marketing remain banned (Phase 1 §7);
  this type is what replaces them — slower, and worth more.

### 3.5 The contamination firewall, stated as edge rules

1. Commercial objects may cite research objects. **Research objects never
   cite commercial objects.** (Build-enforced, same as the Note valve.)
2. Any efficacy assertion on a commercial page is a **Claim** in the ledger,
   tiered like every other claim — commercial copy gets no private epistemics.
3. Capabilities cannot be operational without research derivation (§3.1).
4. Engagements cannot promise outcomes (§3.2); outcomes exist only as
   post-hoc Outcome Records (§3.4).
5. Research views carry no engagement calls-to-action. Commercial views link
   back into research everywhere, because that is where their credibility
   lives.

The three layers in one sentence: **research earns trust, the commercial
layer translates it, engagements transact it — and the edges only flow one
way.**

### 3.6 The through-line — making "research exists to improve commerce" obvious

*(New in R3.)* The firewall prevents contamination; it must not hide the
point. The research exists to improve commerce, and a visitor should never be
more than one glance from seeing that relationship. Three mechanisms, none of
which is a call-to-action:

1. **A structured `commercial-relevance` block on Questions, Findings, and
   Claims** *(field structure per founder, R4)*:

   ```
   Commercial Relevance
     Affected Buyers          who makes decisions this touches
     Affected Categories      which product/service categories
     Potential Product Impact what could change in how offerings are selected
     Current Confidence       plain-language honesty about how sure we are
     Evidence Tier            the tier of the underlying object, restated —
                              the block can never display confidence the
                              object hasn't earned
   ```

   Rendered on the object page in a visibly distinct register (it is Narrated
   translation, not evidence). "Potential Product Impact" is always phrased as
   potential — it lives in the same discipline as everything else. Pairing
   "Current Confidence" with "Evidence Tier" inside the block is deliberate:
   the commercial reader gets the honest uncertainty in their own language and
   the epistemic grade in ours, side by side. This replaces R2's "exactly one
   quiet link" — the relationship is ambient, not rationed. What stays
   rationed is *solicitation*, which remains confined to the Services wing.
2. **The mission sentence rendered at the top of the Observatory:** "Upstream
   Zero studies commercial evaluation to improve commerce" (or the founder's
   final wording) — stated as purpose, tier-labeled like everything else. The
   site's first line makes the relationship explicit before any navigation.
3. **Symmetry of derivation, visible in both directions.** Capabilities show
   the research they derive from (§3.1); research objects show which
   capabilities exercise them (`exercised-by` back-edges, auto-derived). A
   visitor reading a Method can see it is a working instrument that clients
   pay to have applied — the clearest possible statement that this is a
   company whose products emerge from its research, made by the graph rather
   than by copy.

---

## 4. Envelope, edges, identity

### 4.1 Common envelope (every object, both ontologies)

```
id · type · title · created · revised[] · status · authors · edges[] ·
tier (tier-bearing types: Claim, Finding, Observation, Outcome Record) ·
maturity (Capability only)
```

### 4.2 Edge vocabulary (closed; extending it is a Method revision)

Research: `supports · weakens · refutes · tests · derives-from · depends-on ·
supersedes · revises · made-with · part-of · follows · defines · cites ·
propagates · corroborated-by · evidenced-by`
Commercial: `exercises · produces · delivered-by · measured-by`

### 4.3 Identity and URLs (the DOI discipline)

```
Research:    /claims/C-0007 · /questions/Q-3 · /hypotheses/H-1
             /observations/OBS-0042 · /experiments/EXP-0004 · /findings/F-0011
             /evidence/E-0102 · /methods/M-1 · /instruments/I-9
             /concepts/{term} · /revisions/R-0005 · /propagation/P-0002
             /notes/{slug}
Commercial:  /capabilities/CAP-2 · /engagements/ENG-1
             /deliverables/D-1 · /outcomes/O-0001
```

IDs permanent, never reused; superseded objects remain at their URLs with
forward pointers; nothing deleted from the public record — superseded or
retracted-with-reason only. Flat namespaces; no hierarchy to restructure.

### 4.4 Machine rendering (the second audience)

Every object serves `<url>.json` (full envelope: statement, tier, edges,
revisions, hashes) plus embedded JSON-LD in the HTML. Site-wide:
`/graph.json` (full typed graph), `/llms.txt` (orientation for machine
readers: what this site is, how tiers work, how to verify), `/company.json`
(Upstream Zero's **own machine representation** — dogfooding the
two-representations thesis on ourselves first).

Verification without trust, concretely: any skeptic — human with curl or
machine evaluator — starts at a claim, walks `supported-by` to findings, to
observations and experiments, to hashed artifacts, checks pre-registration
predates results in public git history, and confirms the displayed tier is
justified. Nobody has to ask us anything. **The commercial layer is subject to
the same walk:** a buyer's agent can verify that an operational capability
actually derives from published method and findings.

---

## 5. Views — navigation as a consequence of the ontology

The three layers produce six primary views. Dense cross-linking (every
rendered object reference is a link) is the real navigation.

```
Observatory   /            Status board: current state of knowledge
Research      /research    Questions → hypotheses → experiments → findings
Claims        /claims      The Claim Ledger — every claim, tiered
Methods       /methods     M-1, instruments, glossary — how anything earns its tier
Services      /services    Capabilities → engagements → deliverables → outcomes
Company       /company     Mission, how we work, Client Zero, team, the name
```

**/ (Observatory).** A status board, not a pitch. It opens with the mission
sentence — *Upstream Zero studies commercial evaluation to improve commerce* —
then: open Questions, latest Observations/Findings, recent Revisions, and the
honest inventory ("N observations, M experiments, K claims above Narrated") —
displayed at near-zero on day one. Launch milestone named **First Light**:
instrument complete, first observations pending. The company is acknowledged
plainly: *"We work with organizations navigating AI-mediated evaluation →
Services."* Calm, specific, unhidden.

**/research.** The pipeline view. H-1 featured as the program's honest
foundation-stone: the discipline's first job is testing its own premise.
Pre-registered-but-unrun experiments are content, not embarrassment.

**/claims.** The spine's index, filterable by tier and status — including the
founding documents' own assertions, tier-labeled Narrated, and every efficacy
claim the commercial pages make. A visitor who doubts us gets sent here by us.

**/methods.** M-1 (the constitution), versioned Methods, Instrument registry,
Concept glossary — where "is this GEO?" dies, once, canonically.

**/services.** The commercial wing, architected as the buyer's seven questions
in order — each answered by a typed object, which is what keeps the register
separation visible:

| Buyer question | Answered by |
|---|---|
| What do you study? | one paragraph → links into /research and /concepts |
| What have you observed? | Findings relevant to buyers (view over research layer — no restatement, no inflation) |
| How might this affect my company? | **Briefing Notes** — the translation layer: where evaluator confidence breaks down, which requirements go unsubstantiated, which evidence gaps affect recommendation outcomes. Typed Narrated, citing findings |
| What can you measure for us today? | **Capabilities index** — operational vs experimental, visibly distinct |
| What would a paid engagement produce? | **Engagements → Deliverables** — inspectable artifact specs, explicit non-promises |
| What is still experimental? | The same maturity labels, honestly rendered — no burying |
| How do we start? | **/services/start** — a calm, specific path: what to bring, what a first conversation covers, a plain contact channel. No calendly ambush, no qualification theater |

**/company.** The Narrated wing, typed as such: mission and operating system
(rendered with tier labels), the name explained, Client Zero (protocol +
Propagation Records), team, and the firewall statement once the founder rules
on it (until then: the gap declared, not papered over).

**Object detail pages** remain the primary destinations — `/findings/F-0011`,
`/capabilities/CAP-2` — each rendering its envelope, tier or maturity with a
link to *why*, full edge neighborhood, revision history, and its `.json`.

**Every page footer, sitewide:** rendered-from object IDs, last revision,
machine-rendering link. The provenance discipline applies to the site itself.

### What deliberately does not exist

No pricing at launch (unpriced provisional engagements state what they are).
No testimonials, logos, case-study marketing (Outcome Records replace them).
No demo CTAs, popups, newsletter interrupts, chat widgets. No blog (Notes are
typed and non-evidentiary). No separate "AI" section (AI lives under
Instruments — that's the point). No search at launch (seventeen well-indexed,
densely linked types beat a bad search box; search bolts on later without
restructuring). **But note what does exist that a museum would lack: a
Services wing with named engagement shapes, inspectable deliverables, and a
plain way to start.** This is a company, findable by any serious buyer in two
clicks — it is simply never allowed to borrow credibility it hasn't earned.

---

## 6. The provenance model, end to end

```
COMPANY.md chain      →  Object
Observation           →  Observation (immutable, instrument-stamped)
Experiment            →  Experiment (protocol + pre-registered predictions)
Prediction            →  Experiment.predictions (git-timestamped, pre-results)
Raw Evidence          →  Evidence Artifact (content-hashed; gaps declared)
Interpretation        →  Finding (competing explanations listed)
Confidence            →  tier (computed floor over supporting edges)
Revision History      →  Revision objects + public git history
```

Structural guarantees: **(1)** tier is a floor function — honesty enforced by
the data model, because editorial discipline is what erodes under deadline
(and now conversion) pressure; **(2)** the content repo is public — anyone can
diff any claim over time; **(3)** the commercial firewall is edge-directional
and build-enforced (§3.5), so contaminating the research layer requires
deliberately breaking the build, not merely drifting under revenue pressure.

## 7. Implementation shape and scalability

*(Unchanged from R1.)* Each object is one MDX/JSON file with schema-validated
frontmatter in public git. Build fails on: dangling edges, tier above evidence
floor, operational capability without research derivation, engagement
containing an outcome promise, research object citing a commercial object.
**The operating system — including the firewall — becomes a compiler error.**
Static rendering; no CMS, no database, no admin UI, no accounts, no comments,
no conversion analytics. Scale path: hundreds of objects, nothing changes;
thousands, add search and richer index filters. IDs and URLs never change.

## 8. Open items

1. **Method M-1** (operational tier definitions) — needs founder authorship.
2. **Firewall statement** for /company — the ruling behind §3.5, in prose.
3. **Named-parties rule** before the first vendor- or evaluator-naming
   observation ships.
4. **Authorship** — can findings and briefings carry your name at launch?
5. **Public repo confirmation** — the provenance guarantees lean on it.
6. **Contact channel** for /services/start (plain email vs. structured
   intake — architecture supports either; email is calmer).
7. **Engagement provisional names** — I've carried your six as provisional
   records; confirm or trim before Phase 6 content.

---

*Phase 2 (R3) complete. Stopping for approval. Decisions surfaced for explicit
sign-off: the four commercial types and their register separation (§3); the
edge-directional firewall as build rule (§3.5, §7); engagements promising
deliverables never outcomes (§3.2); Outcome Records as the tiered replacement
for testimonials (§3.4); Services in primary navigation with the
seven-question structure (§5); the observatory-today identity sequence with
maturity-axis evolution — observatory → institute → laboratory, standards
emerging later (§0.2); and the ambient research→commerce through-line via
structured Commercial Relevance blocks and derivation back-edges (§3.6).*
