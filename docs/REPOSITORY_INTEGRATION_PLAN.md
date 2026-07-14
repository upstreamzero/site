# Repository Integration Plan — Upstream Zero → upstreamzero/upstreamzero

**Date:** July 13, 2026
**Status:** PLAN ONLY — nothing has been initialized, committed, or pushed.
Awaiting founder approval.
**Inspection method:** local folder examined directly; remote inspected via
read-only clone into the session scratchpad (the remote was not touched).

---

## 0. A finding that changes the premise

The instruction described the remote as containing "existing company and
research documents." **It does not.** `upstreamzero/upstreamzero` contains:

- exactly **one file**: `README.md` — the unmodified GitHub default profile
  template ("Hi there 👋", with the starter comments still in place)
- exactly **one commit**: `7951579` · "Initial commit" · author
  `upstreamzero` · 2026-07-07
- one branch: `main`

Two consequences:

1. **Integration risk is far lower than assumed** — there are no research
   documents to protect and no filename conflicts of any kind.
2. **This is a *special* repository.** For a GitHub account named
   `upstreamzero`, the repo `upstreamzero/upstreamzero` is the profile
   repository: its root `README.md` renders on the public GitHub profile
   page. Whatever README this plan puts at the root becomes the
   organization's public face on GitHub. That is an opportunity (the
   profile can carry the institutional readme) but it is a *convention
   collision*: profile repos are normally kept tiny, and most organizations
   put a website in its own repo. The founder said "do not create a new
   repository," so this plan integrates here — with the collision flagged
   honestly rather than discovered later.

## 1. Current local structure

`/Users/skylermeyer/Upstream-Zero` — **not a git repository, no remote.**

```
.claude/                 launch config (machine-specific absolute paths)
.tools/                  locally downloaded Node v22 runtime  (~200 MB — never commit)
company/                 COMPANY.md · HOW_WE_WORK.md          (the operating system)
content/                 the knowledge graph: 26 objects in 17 typed dirs
design/                  identity-concepts/ · mark/            (SVG files of record)
references/              visual-notes.md
site/                    Next.js app (src/, node_modules/, .next/, package.json…)
FOUNDING_CHARTER.md          (stale — predates COMPANY.md; superseded)
FOUNDATIONAL_UNDERSTANDING.md
INFORMATION_ARCHITECTURE.md
DESIGN_LANGUAGE.md · DESIGN_SYSTEM.md
VISUAL_IDENTITY.md · IDENTITY_SPACE.md · THE_INVARIANT.md
FRICTION_LOG.md
REPOSITORY_INTEGRATION_PLAN.md   (this file)
```

## 2. Current remote structure

```
upstreamzero/upstreamzero @ main
└── README.md            (default profile template, unmodified)
```

History: one commit, `7951579`, 2026-07-07.

## 3. Every potential conflict

| Path | Local | Remote | Conflict? |
|---|---|---|---|
| `README.md` | absent | present (template) | **None on filenames.** Checkout of remote history brings README.md into a tree that doesn't have one. |
| everything else | present | absent | none |

The only *soft* conflict is semantic: the root README doubles as the GitHub
profile page (§0). Replacing its template content later is desirable but is
a **founder decision** (it edits the public profile); this plan preserves
the file and its history and does not rewrite it.

## 4. Remote files that must be preserved

- `README.md` — preserved as a file and in history. Its *content* may later
  be replaced (never deleted) by an institutional readme, as a separate,
  founder-approved commit.
- Commit `7951579` — preserved untouched; all new work lands as descendants
  of it. No force-push, no rebase, no history rewriting at any step.

## 5. Safest proposed final repository structure

The repository *is the company's knowledge*; the website is one rendering
of it (IA §0). The structure should say so:

```
upstreamzero/upstreamzero
├── README.md                  (existing; content upgrade = later founder decision)
├── .gitignore                 (new — §8)
├── company/                   the operating system
├── content/                   the knowledge graph (the canonical objects)
├── design/                    identity files of record
├── references/                visual research notes
├── docs/                      NEW — the founding process documents move here:
│   ├── FOUNDATIONAL_UNDERSTANDING.md
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── DESIGN_LANGUAGE.md · DESIGN_SYSTEM.md
│   ├── VISUAL_IDENTITY.md · IDENTITY_SPACE.md · THE_INVARIANT.md
│   ├── FRICTION_LOG.md
│   └── REPOSITORY_INTEGRATION_PLAN.md
└── website/                   the Next.js app (renamed from site/ — §6)
```

Rationale for `docs/`: nine process documents at root would bury the
knowledge graph that the repo exists to publish. (Alternative: keep them at
root — zero risk either way; this is taste, and reversible.)
`FOUNDING_CHARTER.md` is proposed for **deletion in the first commit** — it
is the pre-COMPANY.md placeholder scaffold, superseded and contradicted;
flagged since Phase 1. *Founder call; default in this plan is delete.*

## 6. Website at root, or in a directory?

**In a directory — `/website`.** Reasons:

1. The repo's primary content is the knowledge graph; a Next.js app at root
   would make the company's canonical repository read as a web project
   with some markdown attached — backwards, by our own architecture.
2. `content/` must sit *beside* the app, not inside it (already built that
   way: the site resolves `../content`). Root-level app would force content
   inside the app tree.
3. This is the profile repo (§0); its root should stay legible.
4. Deployment platforms (e.g. Vercel) handle a subdirectory root with one
   setting.

Rename `site/ → website/` for vocabulary consistency with this plan. Three
references need updating, all local-only: `.tools/dev.sh` (cd path),
`.claude/launch.json` (absolute paths), and nothing inside the app itself
(its content resolution is relative: `../content` — rename-safe).

## 7. Exact integration steps (run only after approval)

```bash
cd /Users/skylermeyer/Upstream-Zero

# 0. Preflight: stop the running site server; verify no stray .git
lsof -ti tcp:3100 | xargs kill 2>/dev/null || true
test ! -d .git || { echo "unexpected .git — abort"; exit 1; }

# 1. Rename the app directory and fix the two local path references
mv site website
sed -i '' 's|/Upstream-Zero/site|/Upstream-Zero/website|g' .tools/dev.sh .claude/launch.json

# 2. Restructure docs (per §5) and drop the superseded charter (per §5, founder call)
mkdir -p docs
mv FOUNDATIONAL_UNDERSTANDING.md INFORMATION_ARCHITECTURE.md \
   DESIGN_LANGUAGE.md DESIGN_SYSTEM.md VISUAL_IDENTITY.md \
   IDENTITY_SPACE.md THE_INVARIANT.md FRICTION_LOG.md \
   REPOSITORY_INTEGRATION_PLAN.md docs/
rm FOUNDING_CHARTER.md

# 3. Write .gitignore (contents in §8) BEFORE git init — nothing large is ever staged
#    (file written in this step)

# 4. Initialize and attach the existing history — additive only
git init -b main
git remote add origin https://github.com/upstreamzero/upstreamzero.git
git fetch origin
git checkout -b integration origin/main   # local branch on top of the real history;
                                          # brings README.md in; untracked local
                                          # files are untouched (no overlap — §3)

# 5. Verify the build still passes after the rename, from the new layout
(cd website && PATH="$PWD/../.tools/node/bin:$PATH" npm run build)

# 6. Stage, inspect, commit — on the integration branch
git add -A
git status                                # eyeball: no .tools/, node_modules/, .next/
git commit -m "<message in §9>"

# 7. STOP. Nothing is pushed. Founder reviews `git log --stat`.
#    Push (after explicit approval, and only then):
#      git checkout -b main --track origin/main && git merge --ff-only integration
#      git push origin main                # plain push — never --force
```

Safety properties: the remote is not written at any step above; the single
remote commit remains the root of all history; every operation before the
(withheld) push is local and reversible.

## 8. .gitignore (written before `git init`)

```gitignore
# local toolchain — 200MB downloaded Node runtime, machine-specific
.tools/

# machine-specific launcher config (absolute paths)
.claude/

# website build artifacts and dependencies
website/node_modules/
website/.next/
website/next-env.d.ts

# OS/editor noise
.DS_Store
*.log

# scratch
nohup.out
```

Deliberately **not** ignored: `website/package-lock.json` (reproducible
builds are a provenance property), `content/` (obviously), `design/`
(files of record).

## 9. Proposed first commit message

```
Version 0.1 — First Light

The instrument, complete; the holdings, honestly zero.

This commit adds the Upstream Zero operating system (company/), the
knowledge graph at N=0 (content/ — 26 objects: 3 questions, 2 hypotheses,
3 claims all tiered Narrated, 1 draft experiment, 1 method under
development, 6 concepts, 1 note, 2 experimental capabilities, 6
provisional engagements, 1 deliverable spec), the identity files of
record (design/), the founding process documents (docs/), and the
website that renders the graph (website/ — Next.js; build fails on
ontology violations: dangling edges, tier above evidence, operational
capability without derivation, research citing commercial).

Eight founder decisions ship as visible placeholders (FD-1..FD-8), not
silent fills. From this commit forward, git history is the provenance
timestamp authority the architecture requires (FRICTION_LOG FR-1) —
pre-registration claims date from here, not before.

Removes FOUNDING_CHARTER.md (pre-COMPANY.md scaffold, superseded).
Preserves the repository's existing README.md and history untouched.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

## 10. Rollback procedure

**Before any push (the only state this plan reaches):**
- Full rollback of git state: `rm -rf .git` — the working tree is
  untouched by this (all our files remain exactly as written); the local
  repo simply ceases to exist. The remote was never contacted with writes.
- Rollback of the folder moves: `mv website site; mv docs/*.md .; rmdir docs`
  and re-run the sed on `.tools/dev.sh` / `.claude/launch.json` in reverse.
  (Or simply keep them — the moves are independent of git.)
- The remote `README.md` restored locally? Not needed — we never modified
  it; deleting `.git` removes our checked-out copy of it too… **no:**
  `git checkout` writes `README.md` into the working tree. Rollback:
  `rm README.md` after `rm -rf .git` if reverting fully.

**After a push (not part of this plan; listed for completeness):**
- Never force-push. If the integration commit must be undone on the
  remote: `git revert <commit>` and push the revert — history stays
  intact, which is precisely the property the provenance model depends on.

## Open questions folded into this plan (founder decisions)

- **FD-7 is half-answered:** the repo is public and history-preserving,
  which satisfies the provenance model's needs — but confirm you intend
  the *company's canonical content* to live in the profile repo
  (§0 collision) rather than, someday, a dedicated repo. This plan works
  either way; moving later is possible without history loss (the docs
  and content are plain files).
- Root `README.md` content upgrade (profile page) — separate commit,
  founder-authored or founder-approved.
- `FOUNDING_CHARTER.md` deletion — default is delete; say the word to keep.
- `docs/` restructure vs. flat root — default is `docs/`; reversible.

---

*Plan complete. Nothing initialized, committed, or pushed. The read-only
inspection clone lives in the session scratchpad and touches nothing.
Awaiting approval — and answers to the four founder calls above.*
