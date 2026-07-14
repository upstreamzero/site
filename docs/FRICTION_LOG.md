# Friction Log — where the architecture meets implementation

**Started:** July 13, 2026, at the first hour of the Phase 6 build.
**Rule:** every entry is a place the architecture bent, broke, or proved
untestable when the real thing was built. These become Phase 5. No
theoretical criticism — only what implementation surfaced.

---

- **FR-1 · The provenance model's timestamp authority does not exist.**
  IA §5 and §6 lean on *public git history* for pre-registration
  timestamps and diffable claims ("trust nothing; diff everything"). The
  company directory is not a git repository at all. Until `git init` +
  a public remote + a founder decision on what is public (FD-7), the
  strongest verification guarantee in the architecture is unimplemented.
  *Severity: high. Fix: infrastructure + founder decision, not code.*
  **RESOLVED 2026-07-14:** the public repository exists
  (github.com/upstreamzero/site); commit 5195458 is the first entry in the
  provenance record. Pre-registration claims date from that commit.

- **FR-2 · `<url>.json` machine renderings collide with App Router
  segment rules.** Dots in dynamic segments don't route cleanly, so the
  promised `/claims/C-0001.json` becomes `/objects/C-0001` (a JSON route
  handler). The IA's "predictable machine URL" survives in spirit — every
  page footer links its machine rendering — but the *convention* changed
  under the framework's constraints. IA §4.4 should be amended.

- **FR-3 · Final typefaces are not yet self-hostable in this build.**
  STIX Two Text and IBM Plex Mono require font files vendored into the
  repo (network-hermetic build; no CDN per system rules). v0.1 ships the
  interim system stacks from DESIGN_LANGUAGE §3. Cost: the two-voice
  contrast is weaker on machines without Iowan/Palatino. Fix: vendor
  WOFF2 files, a mechanical follow-up.

- **FR-4 · The environment had no JavaScript runtime.** Node v22 was
  installed locally to `.tools/` (user-approved). Not an architecture
  break — logged as deployment reality: the build must be reproducible on
  a machine with nothing preinstalled.

- **FR-5 · Flat-by-type URLs cost one near-identical route file per
  type.** Sixteen object types → a dozen thin `[id]/page.tsx` files
  delegating to one shared renderer. The IA's flat namespace survives,
  but the implementation tax is real; if types grow, consider a single
  catch-all route with type validation instead. IA said "no hierarchy to
  restructure later" — true for URLs, not for route files.

- **FR-6 · The tier floor rule is untestable at N=0.** Build-time
  enforcement (claim with no evidence edges must be Narrated) is
  implemented and passing — trivially, because every claim is Narrated.
  The rule has never rejected a real violation. It is a latch that has
  never clicked. Flagged so nobody mistakes "passing" for "proven."

- **FR-7 · Content lives outside the app root** (`content/` at repo
  root, per "the website is one rendering of the company's knowledge").
  Next.js reads it fine at build time, but dev-mode hot reload does not
  watch it — editing content requires a dev-server nudge. Acceptable for
  v0.1; a custom watcher is the fix if it grates.

- **FR-9 · Dev-mode inspection is broken under the preview launcher.**
  Turbopack (Next 16 dev) panics spawning its pooled node process when
  launched by the preview harness, even with PATH exported in a wrapper —
  the same toolchain builds fine from a normal shell. v0.1 inspection ran
  against the production server (`next start`), which is honest but slows
  the edit-inspect loop (rebuild per change). Environment friction, not
  architecture; needs a proper dev-env fix before heavy iteration.

- **FR-8 · The Propagation Record and Outcome Record types ship with
  zero instances and no ingestion path.** The architecture defines how
  they render but not the *procedure* by which a sighting becomes a
  record (who observes, how it's verified, what the consent flow is for
  outcomes). Empty states are honest, but the pipeline behind two of the
  four commercial registers is undesigned. Phase 5 material.
