/** Shared helpers for the EXP pipeline. No external dependencies except
 *  gray-matter borrowed from the website's node_modules (for MDX IO). */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";

export const ROOT = path.resolve(new URL("../..", import.meta.url).pathname);
const require = createRequire(import.meta.url);
export const matter = require(path.join(ROOT, "website/node_modules/gray-matter"));

export const sha256 = (p) =>
  crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");

export function runsDir(expId) {
  return path.join(ROOT, "runs", expId);
}

export async function loadConfig(expId) {
  const p = path.join(ROOT, "scripts/experiment", `config-${expId}.mjs`);
  if (!fs.existsSync(p)) throw new Error(`no config for ${expId}`);
  return (await import(p)).default;
}

export function ensureRunDirs(expId) {
  const base = runsDir(expId);
  for (const d of ["raw", "metadata", "scores", "screenshots", "redacted", "publication-package"])
    fs.mkdirSync(path.join(base, d), { recursive: true });
  return base;
}

export function emptyBackup() {
  return {
    required: true,
    workingCopy: { confirmed: false, location: null, confirmedAt: null },
    localEncryptedArchive: {
      confirmed: false, location: null, sha256: null,
      method: "AES-256-GCM", confirmedAt: null,
    },
    offDeviceBackup: {
      confirmed: false, destinationType: null, location: null,
      verifiedHash: null, confirmedAt: null,
    },
  };
}

export function loadManifest(expId) {
  const p = path.join(runsDir(expId), "manifest.json");
  if (!fs.existsSync(p)) {
    return {
      manifestVersion: 2,
      experimentId: expId,
      protocolVersion: null,
      protocolReceipt: null,
      backup: emptyBackup(),
      runs: [],
      derivatives: [],
    };
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** Every backup tier confirmed, including the independent off-device copy. */
export function backupFullyConfirmed(m) {
  const b = m.backup ?? {};
  return Boolean(
    b.workingCopy?.confirmed &&
    b.localEncryptedArchive?.confirmed &&
    b.offDeviceBackup?.confirmed,
  );
}

export function saveManifest(expId, m) {
  fs.writeFileSync(
    path.join(runsDir(expId), "manifest.json"),
    JSON.stringify(m, null, 2),
  );
}

export function nextRunId(m) {
  const n = m.runs.length + 1;
  return `R-${String(n).padStart(3, "0")}`;
}

/** Next free public object id for a prefix (scans content/ and drafts). */
export function nextObjectId(prefix, extraDirs = []) {
  const dirs = [
    path.join(ROOT, "content/observations"),
    path.join(ROOT, "content/evidence"),
    ...extraDirs,
  ];
  let max = 0;
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      const mth = f.match(new RegExp(`^${prefix}-(\\d+)`));
      if (mth) max = Math.max(max, parseInt(mth[1], 10));
    }
  }
  return (n) => `${prefix}-${String(max + n).padStart(4, "0")}`;
}

export function validateManifest(expId) {
  execSync(`node ${path.join(ROOT, "scripts/validate-manifest.mjs")} runs/${expId}`, {
    cwd: ROOT,
    stdio: "inherit",
  });
}

/** Sensitive-content scan for review flagging (heuristic, review-grade). */
export function sensitiveScan(text) {
  const hits = [];
  const checks = [
    [/[\w.+-]+@[\w-]+\.[\w.]+/g, "email address"],
    [/\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g, "phone-like number"],
    [/\b(sk|pk|key|token|bearer)[-_ ]?[A-Za-z0-9]{16,}\b/gi, "credential-like string"],
    [/\b\d{1,3}(\.\d{1,3}){3}\b/g, "IP address"],
  ];
  for (const [re, label] of checks) {
    const m = text.match(re);
    if (m) hits.push({ label, examples: [...new Set(m)].slice(0, 3) });
  }
  // our own public addresses are expected, not sensitive
  return hits.filter(
    (h) => !(h.label === "email address" && h.examples.every((e) => e.endsWith("@upstreamzero.com"))),
  );
}

export function nowIso() {
  return new Date().toISOString();
}

// ── protocol freeze support ─────────────────────────────────────────────

/** The canonical frozen source files for an experiment's protocol. Each is
 *  hashed independently into the freeze receipt. Fixture configs point at a
 *  parallel protocol/<EXP-ID>/ tree so tests can exercise the real freeze. */
export function frozenFiles(expId) {
  const pdir = path.join(ROOT, "protocol", expId);
  // Real experiments keep the protocol doc in committed docs/; fixtures
  // keep a self-contained PROTOCOL.md inside their (gitignored) tree.
  const localDoc = path.join(pdir, "PROTOCOL.md");
  return {
    protocol: fs.existsSync(localDoc) ? localDoc : path.join(ROOT, "docs", `${expId}_PROTOCOL.md`),
    rubric: path.join(pdir, "rubric.json"),
    prompts: path.join(pdir, "prompts.json"),
    predictions: path.join(pdir, "predictions.json"),
    refutation: path.join(pdir, "refutation.json"),
  };
}

export function receiptPath(expId) {
  return path.join(ROOT, "protocol", expId, "FREEZE_RECEIPT.json");
}

export function loadReceipt(expId) {
  const p = receiptPath(expId);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}

/** Recompute the SHA-256 of each frozen file; returns {name: hash|null}. */
export function frozenHashes(expId) {
  const out = {};
  for (const [name, p] of Object.entries(frozenFiles(expId)))
    out[name] = fs.existsSync(p) ? sha256(p) : null;
  return out;
}

export function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf8" }).trim();
}

export function gitHead() {
  return git("rev-parse HEAD");
}

export function gitCommitExists(hash) {
  try { git(`cat-file -e ${hash}^{commit}`); return true; }
  catch { return false; }
}

/** True if none of the given repo-relative paths has uncommitted changes. */
export function gitPathsClean(paths) {
  const out = git(`status --porcelain -- ${paths.map((p) => `"${p}"`).join(" ")}`);
  return out === "";
}

/** Verify the protocol is frozen and unaltered. Returns {ok, errors,
 *  receipt, receiptSha256}. Capture and approval both gate on this. */
export function verifyFrozen(expId, { fixture = false } = {}) {
  const errors = [];
  const receipt = loadReceipt(expId);
  if (!receipt) return { ok: false, errors: ["protocol is not frozen (no FREEZE_RECEIPT.json — run experiment:freeze)"], receipt: null };
  if (receipt.status !== "frozen") errors.push(`protocol receipt status is "${receipt.status}", not "frozen"`);

  const now = frozenHashes(expId);
  const map = {
    protocol: "protocolSha256", rubric: "rubricSha256", prompts: "promptSetSha256",
    predictions: "predictionsSha256", refutation: "refutationConditionsSha256",
  };
  for (const [name, key] of Object.entries(map)) {
    if (now[name] !== receipt.hashes[key])
      errors.push(`frozen file "${name}" hash changed since freeze — protocol was modified after approval`);
  }

  if (!fixture) {
    const relPaths = Object.values(frozenFiles(expId)).map((p) => path.relative(ROOT, p));
    if (!gitPathsClean(relPaths))
      errors.push("working tree contains an unapproved protocol modification");
    if (!receipt.protocolCommit || !gitCommitExists(receipt.protocolCommit))
      errors.push(`referenced protocol commit ${receipt.protocolCommit} is unavailable`);
  }

  return { ok: errors.length === 0, errors, receipt, receiptSha256: sha256(receiptPath(expId)) };
}

// ── evidence channels ───────────────────────────────────────────────────

/** The channels EXP-0001 requires per response. Status vocabulary:
 *  captured | absent | unavailable | operator-error | unknown.
 *  "absent"    = evaluator produced none (a valid, explicit answer).
 *  "unavailable" = surface did not expose it.
 *  "operator-error" | "unknown" = BLOCKS approval (ambiguous absence). */
export const CHANNELS = [
  "rawResponse", "citations", "offeredNextTurns", "screenshots",
  "evaluatorName", "productSurface", "modelNameVersion", "dateTime",
  "sessionState", "promptWording", "promptOrder", "deviations",
  "disclaimers", "responseBoundaries",
];
export const CHANNEL_STATUS = ["captured", "absent", "unavailable", "operator-error", "unknown"];
export const BLOCKING_CHANNEL_STATUS = ["operator-error", "unknown"];

/** Auto-extract candidate channel values from the single pasted response. */
export function extractChannels(text) {
  const urls = [...new Set((text.match(/https?:\/\/[^\s)>\]"']+/g) ?? [])
    .map((u) => u.replace(/[.,;]+$/, "")))];
  const disclaimers = (text.match(
    /[^.\n]*\b(I (don't|do not) have|I'm not (sure|certain)|may (be|not be)|as an AI|I cannot verify|no (public )?information|might be outdated|based on( my)? (training|available))\b[^.\n]*[.]/gi,
  ) ?? []).map((s) => s.trim()).slice(0, 8);
  const nextTurns = (text.match(/(?:^|\n)\s*(?:[-*•]|\d+\.)\s*(?:Would you like|Do you want|Should I|I can|Want me to)[^\n]*/gi) ?? [])
    .map((s) => s.replace(/^[\s\-*•\d.]+/, "").trim()).slice(0, 8);
  return { citations: urls, disclaimers, offeredNextTurns: nextTurns };
}
