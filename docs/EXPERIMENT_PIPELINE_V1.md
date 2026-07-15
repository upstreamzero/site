# Experiment Pipeline v1 — Capture to Publication

**Date:** July 15, 2026
**Scope:** the minimum safe bridge between experiment capture and the
existing automatic publishing pipeline. Not a platform: no dashboards, no
databases, no auth, no generalized automation.

**The governing principle:** raw evidence is captured as automatically as
possible; interpretation and publication require explicit founder
approval; approved evidence then updates the graph, pages, machine
renderings, and deployment automatically.

---

## 1. What is automatic / agent-assisted / manual / private / public

| Stage | Class | Private or public |
|---|---|---|
| Running evaluator sessions | Manual/agent-assisted | private |
| Raw capture into `runs/` + SHA-256 hashing | Agent-assisted | **private — never in git** |
| Manifest maintenance | Agent-assisted | private |
| Backup confirmation | Manual (founder/operator) | private |
| Scoring (S1–S9 sheets) | Agent-assisted, human-reviewed | private until publication |
| Publication-package preparation | One command (below) | private |
| **Founder approval** | **Manual — explicit instruction only** | — |
| Copying approved artifacts into `content/` | Agent-assisted, on instruction | becomes public at push |
| Ontology + pub-state validation | Automatic (build) | — |
| Pages, graph.json, object JSON, sitemap, llms.txt, counts | Automatic (build) | public |
| Deployment | Automatic (push → Cloudflare) | public |

## 2. The staging area (private, never committed)

```
runs/<EXP-ID>/
  manifest.json          run records, hashes, statuses (template: scripts/templates/)
  raw/                   verbatim captures — IMMUTABLE after capture
  metadata/              capture metadata not embedded in the manifest
  scores/                scoring sheets (template in scripts/templates/)
  screenshots/
  redacted/              derivative files, linked to raw hashes
  publication-package/   generated for founder review; never auto-published
```

**Three independent layers prevent accidental publication:**
1. `.gitignore` — `runs/`, `backups/`, and sensitive patterns (`.env*`,
   `*.pem`, `*.key`, `*.har`, cookies, session files, credentials).
2. Pre-commit hook (`scripts/git-hooks/pre-commit`, installed via
   `sh scripts/install-hooks.sh`) — blocks any commit that stages those
   paths, even force-added.
3. Build-time check (`scripts/check-staging-safety.mjs`, wired as the
   website's `prebuild`) — if forbidden files are ever *tracked*, every
   build fails, locally and in Cloudflare CI, so a slip can never deploy.

## 3. Raw immutability

Raw files are never edited after capture. The manifest records SHA-256
hashes; `validate-manifest.mjs` **recomputes them** and fails on any
mismatch. Corrections, redactions, annotations, and normalizations are
separate files in `redacted/`, each registered in `manifest.derivatives`
with: source raw hash, transformation, performer, timestamp, reason.

## 4. Backup requirement

A gitignored local directory is not durable. **Before any run may be
marked `reviewed` or `approved`** (validator-enforced), the complete run
package must exist as a verified second copy outside the public
repository, and `manifest.backup.confirmed` set `true` with its location.
A run may be *executed* before backup is resolved, but may not be
declared complete or deleted from the machine without the second copy.
**No cloud provider is configured — the founder chooses the destination
(open decision, see report).**

## 5. Publication states (schema)

Every content object carries `pubState`: `draft` | `approved` |
`published` (default) | `superseded`. Only `published` and `superseded`
objects enter pages, sitemap.xml, graph.json, llms.txt, object JSON, and
all counts. Build-enforced consistency: a public object may not edge to a
non-public one. Sensitive raw evidence is never committed as `draft` — it
stays in `runs/`, outside git entirely; `draft` exists only for
non-sensitive work-in-progress.

## 6. Scoring

`scripts/templates/score-sheet.template.json` — versioned, references the
raw hash, records scorer, timestamp, rubric version (EXP-0001 §5, S1–S9),
per-dimension values with supporting excerpts, uncertainty notes,
disagreements, adjudication status. **Scores are observations. Evidence
tiers are never computed from scores; interpretation and promotion remain
human-reviewed.**

## 7. Run log (append-only)

Experiments carry a structured `runLog` (schema-validated; rendered on
the experiment page): runId, date, environment, status, published
evidence IDs, deviations, optional note, optional `supersedes`. Later
runs append; corrections supersede or annotate earlier entries — git
history and the public record preserve every prior state.

## 8. Exact commands (v1.1 — single-founder approval model)

The founder never edits files. Three commands cover the whole lifecycle
(run from the repository root):

```
npm run experiment:capture -- EXP-0001
    Guided capture: presents each frozen prompt (environment x prompt x
    repetition), operator pastes the response ONCE plus model string and
    citations; the system assigns run IDs and filenames, writes raw +
    metadata, computes SHA-256 hashes, updates and validates the
    manifest, and creates the encrypted private backup automatically.
    Agent/programmatic form: --from-file r.txt --env EE-2 --prompt P1
    --model "…" [--citations …] [--next-turns …] [--screenshot …]

npm run experiment:prepare -- EXP-0001
    Drafts heuristic rubric scores (with excerpts and per-dimension
    uncertainty; judgment dimensions left explicitly to the human),
    scans for sensitive content, flags deviations and ambiguity,
    generates the proposed evidence/observation objects and run-log
    entries as drafts, and produces ONE review artifact
    (publication-package/REVIEW.md + REVIEW.html) separating: raw
    observation / agent-proposed coding / agent-proposed interpretation
    / existing relationships / proposed public claims (always: none).
    Publishes nothing; never touches content/; never runs git.

npm run experiment:approve -- EXP-0001 --runs R-001,R-002
    THE FOUNDER APPROVAL ACT. Runs the full safety battery (blocks on
    missing raw, hash mismatch, missing metadata, unresolved deviations
    unless --accept-deviations, rejected runs, missing drafts,
    nonexistent edge targets, drafts not marked published), then: copies
    drafts into content/, appends the append-only run log, validates via
    full site build (ontology + pub-state + routes + sitemap), commits
    ONLY content paths, pushes, waits for Cloudflare, curl-verifies the
    new public pages and machine objects, reports. --dry-run performs
    everything through build validation and then restores the tree.

npm run experiment:reject -- EXP-0001 --runs R-003 --reason "…"
    Marks runs rejected; removes their drafts; publishes nothing; raw
    evidence remains preserved and immutable.

npm run experiment:backup -- EXP-0001
    Manual re-backup (also runs automatically during capture).
```

## 8b. Legacy manual commands

```
sh scripts/install-hooks.sh                      # once per clone
cp scripts/templates/manifest.template.json runs/<EXP>/manifest.json
shasum -a 256 runs/<EXP>/raw/<file>              # hash at capture
node scripts/validate-manifest.mjs runs/<EXP>    # any time; recomputes hashes
node scripts/prepare-publication.mjs runs/<EXP>  # assembles publication-package/
                                                 # + REVIEW.md; publishes NOTHING
```

## 9. The founder approval gate

```
capture → hash → back up → score → prepare publication package
  → FOUNDER REVIEW of runs/<EXP>/publication-package/REVIEW.md
  → FOUNDER APPROVAL — an explicit instruction naming the package
  → copy approved artifacts into content/ (pubState: published)
  → append run-log entry → build validates → commit → push → deploy
```

Approval is a deliberate founder act. **No agent may infer approval from
silence, from scoring completion, or from package preparation.**
`prepare-publication.mjs` never touches `content/` and never runs git.

## 10. Redaction and correction procedures

**Redaction:** performed on capture (PII) or during review; redacted file
lives in `redacted/`, registered as a derivative with declared scope; the
published artifact is the redacted derivative; the raw stays private with
its hash public in the manifest record — verifiable without exposure.
**Correction after publication:** never edit the published object's
recorded content; publish a Revision object, mark the old object
`superseded` (it remains public with a forward pointer), publish the
replacement, append a superseding run-log entry.

## 11. Known limitations (v1, deliberate)

- Backup destination unconfigured (founder decision pending).
- Single-operator capture; coder discipline per M-4 §15 declarations.
- Approval is procedural (git-gated), not cryptographic.
- The empty-register sentinel pages (`/evidence/none-published-yet`,
  `/observations/none-published-yet`) exist because static export cannot
  build a dynamic route with zero instances; they are unlinked,
  noindexed, render the honest N=0 register, and stop being generated
  the moment real objects publish.
- No automation runs evaluator sessions; capture fidelity depends on the
  operator following the frozen protocol.
