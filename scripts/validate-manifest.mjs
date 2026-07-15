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

if (m.manifestVersion !== 2) errs.push("manifestVersion must be 2");
if (!m.experimentId) errs.push("experimentId missing");

const tier = (name) => m.backup?.[name]?.confirmed === true;
for (const t of ["workingCopy", "localEncryptedArchive", "offDeviceBackup"])
  if (!m.backup || typeof m.backup[t]?.confirmed !== "boolean")
    errs.push(`backup.${t}.confirmed missing`);
const backupFullyConfirmed =
  tier("workingCopy") && tier("localEncryptedArchive") && tier("offDeviceBackup");
if (m.backup?.localEncryptedArchive?.confirmed &&
    m.backup.localEncryptedArchive.method !== "AES-256-GCM")
  errs.push("localEncryptedArchive.method must be AES-256-GCM (authenticated encryption)");

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
    !backupFullyConfirmed
  )
    errs.push(
      `${id}: reviewStatus "${r.reviewStatus}" requires all three backup tiers confirmed, including the independent off-device copy`,
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
  `manifest OK: ${m.runs?.length ?? 0} runs, backup[working=${tier("workingCopy")} local=${tier("localEncryptedArchive")} offDevice=${tier("offDeviceBackup")}]`,
);
