#!/usr/bin/env node
/**
 * FOUNDER REJECTION — marks runs rejected; publishes nothing; drafts for
 * rejected runs are removed from the publication package. Raw evidence
 * remains preserved privately (immutability applies to rejected runs
 * too — rejection is a judgment, not a deletion).
 *
 *   npm run experiment:reject -- EXP-0001 --runs R-001[,R-002] [--reason "…"]
 */
import fs from "node:fs";
import path from "node:path";
import { loadManifest, saveManifest, runsDir, nowIso } from "./lib.mjs";

const args = process.argv.slice(2);
const expId = args[0];
const runsArg = args[args.indexOf("--runs") + 1];
if (!expId || args.indexOf("--runs") < 0) {
  console.error('usage: experiment:reject -- <EXP-ID> --runs R-001 [--reason "…"]');
  process.exit(2);
}
const reason = args.includes("--reason") ? args[args.indexOf("--reason") + 1] : "(none recorded)";
const m = loadManifest(expId);
const pkg = path.join(runsDir(expId), "publication-package");
const mapping = fs.existsSync(path.join(pkg, "mapping.json"))
  ? JSON.parse(fs.readFileSync(path.join(pkg, "mapping.json"), "utf8"))
  : [];

for (const id of runsArg.split(",").map((s) => s.trim())) {
  const r = m.runs.find((x) => x.runId === id);
  if (!r) { console.error(`run ${id} not found`); continue; }
  r.reviewStatus = "rejected";
  r.publicationStatus = "unpublished";
  r.rejectedAt = nowIso();
  r.rejectionReason = reason;
  const map = mapping.find((x) => x.runId === id);
  if (map) {
    fs.rmSync(path.join(pkg, "content-drafts/evidence", `${map.evidence}.mdx`), { force: true });
    fs.rmSync(path.join(pkg, "content-drafts/observations", `${map.observation}.mdx`), { force: true });
  }
  console.log(`rejected ${id} — nothing published; raw evidence preserved privately.`);
}
saveManifest(expId, m);
