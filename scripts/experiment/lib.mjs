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

export function loadManifest(expId) {
  const p = path.join(runsDir(expId), "manifest.json");
  if (!fs.existsSync(p)) {
    return {
      manifestVersion: 1,
      experimentId: expId,
      protocolVersion: null,
      backup: { required: true, confirmed: false, location: null, confirmedAt: null },
      runs: [],
      derivatives: [],
    };
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
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
