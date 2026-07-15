#!/usr/bin/env node
/**
 * Validate an experiment run manifest (runs/<EXP>/manifest.json):
 *  - structure and status vocabulary
 *  - raw-file immutability: recomputes SHA-256 of every hashed file and
 *    fails on mismatch (raw evidence must never be edited after capture)
 *  - backup gate: no run may be reviewed/approved without confirmed backup
 *  - derivative provenance: every derivative names its source raw hash,
 *    transformation, performer, timestamp, reason
 * Usage: node scripts/validate-manifest.mjs runs/EXP-0001
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/validate-manifest.mjs runs/EXP-0001");
  process.exit(2);
}
const mPath = path.join(dir, "manifest.json");
const m = JSON.parse(fs.readFileSync(mPath, "utf8"));
const errs = [];
const REVIEW = ["captured", "scored", "reviewed", "approved", "rejected"];
const PUB = ["unpublished", "published"];

if (m.manifestVersion !== 1) errs.push("manifestVersion must be 1");
if (!m.experimentId) errs.push("experimentId missing");
if (!m.backup || typeof m.backup.confirmed !== "boolean")
  errs.push("backup.confirmed missing");

const sha256 = (p) =>
  crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");

for (const r of m.runs ?? []) {
  const id = r.runId ?? "<no runId>";
  for (const f of [
    "runId", "evaluatorEnvironment", "promptId", "promptText",
    "runDateTimeUtc", "timezone", "exposureClassification",
    "rawOutputFile", "captureOperator",
  ])
    if (!r[f]) errs.push(`${id}: field "${f}" is empty`);
  if (!REVIEW.includes(r.reviewStatus))
    errs.push(`${id}: bad reviewStatus "${r.reviewStatus}"`);
  if (!PUB.includes(r.publicationStatus))
    errs.push(`${id}: bad publicationStatus "${r.publicationStatus}"`);
  if (
    ["reviewed", "approved"].includes(r.reviewStatus) &&
    !m.backup.confirmed
  )
    errs.push(
      `${id}: reviewStatus "${r.reviewStatus}" requires backup.confirmed=true (verified second copy outside the public repo)`,
    );
  if (r.publicationStatus === "published" && r.reviewStatus !== "approved")
    errs.push(`${id}: published without founder approval`);
  // immutability: recompute hashes
  for (const [file, expected] of Object.entries(r.sha256 ?? {})) {
    const p = path.join(dir, file);
    if (!fs.existsSync(p)) errs.push(`${id}: hashed file missing: ${file}`);
    else if (sha256(p) !== expected)
      errs.push(
        `${id}: HASH MISMATCH for ${file} — raw evidence has been modified after capture`,
      );
  }
  if (
    r.reviewStatus !== "captured" &&
    Object.keys(r.sha256 ?? {}).length === 0
  )
    errs.push(`${id}: no sha256 hashes recorded`);
}

for (const d of m.derivatives ?? []) {
  if (d._comment) continue;
  for (const f of ["file", "sourceRawSha256", "transformation", "performedBy", "timestamp", "reason"])
    if (!d[f]) errs.push(`derivative ${d.file || "<unnamed>"}: "${f}" missing`);
}

if (errs.length) {
  console.error("MANIFEST INVALID:\n" + errs.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(
  `manifest OK: ${m.runs?.length ?? 0} runs, backup.confirmed=${m.backup.confirmed}`,
);
