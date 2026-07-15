#!/usr/bin/env node
/**
 * Prepare (but never publish) a publication package for founder review.
 *
 *   node scripts/prepare-publication.mjs runs/EXP-0001
 *
 * Requires: manifest valid; backup confirmed; every included run has
 * reviewStatus "reviewed" or "approved". Assembles
 * runs/<EXP>/publication-package/ with the files a founder must review,
 * plus REVIEW.md summarizing exactly what would become public.
 *
 * PUBLISHING IS A SEPARATE, EXPLICIT, FOUNDER-INSTRUCTED STEP: approved
 * artifacts are copied into content/ by hand (or by the agent on explicit
 * instruction), validated, committed, pushed. This script never touches
 * content/ and never runs git.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/prepare-publication.mjs runs/EXP-0001");
  process.exit(2);
}
// 1. validate first
execSync(`node ${path.join("scripts", "validate-manifest.mjs")} ${dir}`, {
  stdio: "inherit",
});

const m = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
if (!m.backup.confirmed) {
  console.error("BLOCKED: backup not confirmed — cannot prepare a package.");
  process.exit(1);
}
const includable = (m.runs ?? []).filter((r) =>
  ["reviewed", "approved"].includes(r.reviewStatus),
);
if (!includable.length) {
  console.error(
    "BLOCKED: no runs with reviewStatus reviewed/approved. Scoring completion is NOT approval.",
  );
  process.exit(1);
}

const pkg = path.join(dir, "publication-package");
fs.rmSync(pkg, { recursive: true, force: true });
fs.mkdirSync(pkg, { recursive: true });

const lines = [
  `# Publication package — ${m.experimentId}`,
  `Generated: ${new Date().toISOString()}`,
  ``,
  `**NOTHING IN THIS PACKAGE IS PUBLIC.** Founder review and explicit`,
  `approval are required before any file is copied into content/.`,
  ``,
];
for (const r of includable) {
  const rdir = path.join(pkg, r.runId);
  fs.mkdirSync(rdir, { recursive: true });
  // candidate public artifact: redacted version if present, else raw
  const redacted = path.join(dir, "redacted", path.basename(r.rawOutputFile));
  const src = fs.existsSync(redacted)
    ? redacted
    : path.join(dir, r.rawOutputFile);
  fs.copyFileSync(src, path.join(rdir, path.basename(src)));
  if (r.scoringSheetFile)
    fs.copyFileSync(
      path.join(dir, r.scoringSheetFile),
      path.join(rdir, path.basename(r.scoringSheetFile)),
    );
  fs.writeFileSync(
    path.join(rdir, "run-record.json"),
    JSON.stringify(r, null, 2),
  );
  lines.push(
    `## ${r.runId} — ${r.evaluatorEnvironment} · ${r.promptId}`,
    `- review status: ${r.reviewStatus}`,
    `- exposure: ${r.exposureClassification}`,
    `- public artifact candidate: ${path.basename(src)}${fs.existsSync(redacted) ? " (REDACTED derivative)" : " (RAW — confirm no redaction needed)"}`,
    `- hashes: ${Object.keys(r.sha256 ?? {}).length} recorded`,
    ``,
  );
}
lines.push(
  `## Founder action required`,
  `Reply with explicit approval naming this package (experiment + runs).`,
  `Approval is never inferred. On approval: artifacts are copied into`,
  `content/evidence/ and content/observations/ with pubState "published",`,
  `EXP run log appended, build validated, committed, pushed.`,
);
fs.writeFileSync(path.join(pkg, "REVIEW.md"), lines.join("\n"));
console.log(
  `package prepared: ${pkg} (${includable.length} runs). NOT published.`,
);
