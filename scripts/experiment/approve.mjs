#!/usr/bin/env node
/**
 * FOUNDER APPROVAL — the only path by which experiment evidence becomes
 * public. Running this command IS the explicit approval act; no agent may
 * run it without a direct founder instruction that names the experiment
 * AND the run IDs in the same instruction. Silence, protocol approval,
 * approval of another run, or "looks good" NEVER count as approval.
 *
 *   npm run experiment:approve -- EXP-0001 --runs R-001,R-002 \
 *       --founder "Skyler Meyer" [--dry-run] [--accept-deviations] \
 *       [--redactions R-002]
 *
 * Safety battery (every condition blocks): protocol frozen & unaltered;
 * manifest valid (raw present, hashes match); all three backup tiers
 * confirmed incl. off-device; publication package present; runs
 * scored/reviewed (not rejected); no BLOCKING channel status; deviations
 * accepted; drafts present, published, edges resolvable; drafts UNCHANGED
 * since review; declared redactions match the published derivative.
 * Then: stage content/, append run log, validate via full build, commit
 * ONLY content paths, push, await Cloudflare, verify pages, and write an
 * append-only approval receipt. --dry-run stops after build validation and
 * restores the tree (no receipt, nothing published).
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  ROOT, matter, loadManifest, saveManifest, runsDir, validateManifest,
  nowIso, backupFullyConfirmed, BLOCKING_CHANNEL_STATUS, CHANNELS,
  verifyFrozen, loadConfig, git,
} from "./lib.mjs";
import { sha256Buffer } from "./crypto.mjs";

const args = process.argv.slice(2);
const expId = args[0];
const runsArg = args[args.indexOf("--runs") + 1];
const dry = args.includes("--dry-run");
const flag = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
if (!expId || !runsArg || args.indexOf("--runs") < 0) {
  console.error("usage: experiment:approve -- <EXP-ID> --runs R-001,R-002 --founder \"Name\" [--dry-run]");
  process.exit(2);
}
const runIds = runsArg.split(",").map((s) => s.trim());
const base = runsDir(expId);
const pkg = path.join(base, "publication-package");
const sh = (cmd, opts = {}) => execSync(cmd, { cwd: ROOT, encoding: "utf8", ...opts });
const cfg = await loadConfig(expId);
const hashFile = (p) => sha256Buffer(fs.readFileSync(p));

// ── safety battery ──
const errs = [];
validateManifest(expId);
const m = loadManifest(expId);

const fz = verifyFrozen(expId, { fixture: Boolean(cfg.fixture) });
if (!fz.ok) errs.push(...fz.errors.map((e) => `protocol: ${e}`));
if (m.protocolReceipt?.receiptSha256 && fz.receiptSha256 &&
    m.protocolReceipt.receiptSha256 !== fz.receiptSha256)
  errs.push("manifest protocol-receipt reference does not match the current freeze receipt");

if (!backupFullyConfirmed(m)) {
  const b = m.backup ?? {};
  errs.push(`backup not fully confirmed (workingCopy=${!!b.workingCopy?.confirmed}, `
    + `localEncryptedArchive=${!!b.localEncryptedArchive?.confirmed}, `
    + `offDeviceBackup=${!!b.offDeviceBackup?.confirmed})`);
}
if (!fs.existsSync(path.join(pkg, "mapping.json"))) errs.push("no publication package — run experiment:prepare first");

const mapping = fs.existsSync(path.join(pkg, "mapping.json")) ? JSON.parse(fs.readFileSync(path.join(pkg, "mapping.json"), "utf8")) : [];
const runlog = fs.existsSync(path.join(pkg, "runlog-proposal.json")) ? JSON.parse(fs.readFileSync(path.join(pkg, "runlog-proposal.json"), "utf8")) : [];

// draft-unchanged: recompute package hashes vs package-manifest.json
if (fs.existsSync(path.join(pkg, "package-manifest.json"))) {
  const pm = JSON.parse(fs.readFileSync(path.join(pkg, "package-manifest.json"), "utf8"));
  const now = {};
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else { const rel = path.relative(pkg, p); if (rel !== "package-manifest.json") now[rel] = hashFile(p); }
    }
  })(pkg);
  for (const [rel, h] of Object.entries(pm.files ?? {}))
    if (now[rel] !== h) errs.push(`publication draft changed after review: ${rel}`);
  for (const rel of Object.keys(now))
    if (!(rel in (pm.files ?? {}))) errs.push(`publication package gained a file after review: ${rel}`);
} else errs.push("package-manifest.json missing — re-run experiment:prepare");

const declaredRedactions = (flag("redactions") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const approvedRedactions = [];

for (const id of runIds) {
  const r = m.runs.find((x) => x.runId === id);
  if (!r) { errs.push(`run ${id} not in manifest`); continue; }
  if (r.reviewStatus === "rejected") errs.push(`run ${id} was rejected`);
  if (!["scored", "reviewed"].includes(r.reviewStatus)) errs.push(`run ${id} is "${r.reviewStatus}" — must be scored/reviewed`);
  // channel gate: operator-error / unknown block approval
  for (const name of CHANNELS) {
    const st = r.channels?.[name]?.status ?? "unknown";
    if (BLOCKING_CHANNEL_STATUS.includes(st))
      errs.push(`run ${id} channel "${name}" is "${st}" — resolve before approval`);
  }
  if (r.knownDeviations.length && !args.includes("--accept-deviations"))
    errs.push(`run ${id} has unresolved protocol deviations (${r.knownDeviations.join("; ")}) — pass --accept-deviations to approve them explicitly`);

  const map = mapping.find((x) => x.runId === id);
  if (!map) { errs.push(`run ${id} has no drafts in the package`); continue; }

  // redaction ↔ published-derivative consistency
  const redFile = path.join(base, "redacted", path.basename(r.rawOutputFile));
  const evDraft = path.join(pkg, "content-drafts/evidence", `${map.evidence}.mdx`);
  if (fs.existsSync(redFile)) {
    const redText = fs.readFileSync(redFile, "utf8").trim();
    const draftText = fs.existsSync(evDraft) ? fs.readFileSync(evDraft, "utf8") : "";
    if (!draftText.includes(redText))
      errs.push(`run ${id}: redaction exists but the published evidence derivative does not match the redacted file`);
    else approvedRedactions.push({ runId: id, redactedFile: path.relative(ROOT, redFile), sha256: hashFile(redFile) });
  } else if (declaredRedactions.includes(id)) {
    errs.push(`run ${id}: --redactions names it but no redacted/${path.basename(r.rawOutputFile)} exists`);
  }

  for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const p = path.join(pkg, "content-drafts", kind, `${oid}.mdx`);
    if (!fs.existsSync(p)) { errs.push(`draft missing: ${kind}/${oid}`); continue; }
    const fm = matter.read(p);
    if (fm.data.pubState !== "published") errs.push(`${oid} draft is not marked published`);
    for (const e of fm.data.edges ?? []) {
      const inDrafts = mapping.some((x) => [x.evidence, x.observation].includes(e.to));
      const inContent = fs.existsSync(path.join(ROOT, "content")) &&
        sh(`grep -rl "^id: ${e.to}$" content/ || true`).trim() !== "";
      if (!inDrafts && !inContent) errs.push(`${oid} edges to nonexistent object ${e.to}`);
    }
  }
}
if (errs.length) {
  console.error("PUBLICATION BLOCKED:\n" + errs.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

// ── stage into content/ ──
const touched = [];
const finalScores = {};
for (const id of runIds) {
  const map = mapping.find((x) => x.runId === id);
  const r = m.runs.find((x) => x.runId === id);
  if (r.scoringSheetFile && fs.existsSync(path.join(base, r.scoringSheetFile)))
    finalScores[id] = JSON.parse(fs.readFileSync(path.join(base, r.scoringSheetFile), "utf8")).scores;
  for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const dest = path.join(ROOT, "content", kind, `${oid}.mdx`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(pkg, "content-drafts", kind, `${oid}.mdx`), dest);
    touched.push(path.relative(ROOT, dest));
  }
}
const expFile = path.join(ROOT, "content/experiments", `${expId}.mdx`);
const expDoc = matter.read(expFile);
expDoc.data.runLog = [
  ...(expDoc.data.runLog ?? []),
  ...runlog.filter((e) => runIds.some((id) => e.runId.endsWith(id))),
];
fs.writeFileSync(expFile, matter.stringify(expDoc.content, expDoc.data));
touched.push(path.relative(ROOT, expFile));

// ── validate via full build ──
try {
  sh(`npm run build`, { cwd: path.join(ROOT, "website"), stdio: "inherit" });
} catch {
  console.error("BUILD VALIDATION FAILED — restoring working tree; nothing published.");
  sh(`git checkout -- ${touched.join(" ")} 2>/dev/null || true`);
  for (const t of touched) if (!t.includes("experiments")) fs.rmSync(path.join(ROOT, t), { force: true });
  process.exit(1);
}

if (dry) {
  console.log("DRY RUN: validation passed. Restoring working tree; nothing published.");
  sh(`git checkout -- content/experiments/${expId}.mdx 2>/dev/null || true`);
  for (const t of touched) if (!t.includes("experiments")) fs.rmSync(path.join(ROOT, t), { force: true });
  process.exit(0);
}

// ── record approval, commit ONLY content paths, push, deploy, verify ──
for (const id of runIds) {
  const r = m.runs.find((x) => x.runId === id);
  r.reviewStatus = "approved";
  r.publicationStatus = "published";
  r.approvedAt = nowIso();
}
saveManifest(expId, m);
sh(`git add ${touched.map((t) => `"${t}"`).join(" ")}`);
const staged = sh("git diff --cached --name-only").trim().split("\n");
if (staged.some((f) => f.startsWith("runs/") || f.startsWith("backups/"))) {
  console.error("SAFETY: staging area contains private paths — aborting."); process.exit(1);
}
sh(`git commit -m "Publish ${expId} runs ${runIds.join(", ")} — founder-approved

Evidence and observation objects generated by the experiment pipeline;
raw artifacts remain private (hash-verifiable against the published
records). Run log appended (append-only). Protocol receipt ${fz.receiptSha256.slice(0, 12)}.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"`);
const head = sh("git rev-parse --short HEAD").trim();
sh("git push origin main");
console.log(`pushed ${head}; waiting for Cloudflare…`);
let deployed = false;
for (let i = 0; i < 24 && !deployed; i++) {
  const out = sh(`npx wrangler pages deployment list --project-name=upstreamzero 2>/dev/null | grep "${head}" | head -1 || true`, { cwd: path.join(ROOT, "website") });
  if (/ago/.test(out) && !/Failure/.test(out)) deployed = true;
  else if (/Failure/.test(out)) { console.error("DEPLOYMENT FAILED — investigate before retrying."); break; }
  else sh("sleep 15");
}
console.log(deployed ? "deployed." : "deployment not confirmed within window — verify manually.");
let okAll = true;
const verified = [];
for (const map of mapping.filter((x) => runIds.includes(x.runId))) {
  for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const url = `https://upstreamzero.com/${kind}/${oid}`;
    const code = sh(`curl -s -o /dev/null -w "%{http_code}" ${url}`).trim();
    const jcode = sh(`curl -s -o /dev/null -w "%{http_code}" https://upstreamzero.com/objects/${oid}`).trim();
    console.log(`${url} → ${code} · /objects/${oid} → ${jcode}`);
    verified.push({ url, code, objectsCode: jcode });
    if (code !== "200" || jcode !== "200") okAll = false;
  }
}

// ── append-only approval receipt ──
const pm = JSON.parse(fs.readFileSync(path.join(pkg, "package-manifest.json"), "utf8"));
const receipt = {
  experimentId: expId,
  approvedRunIds: runIds,
  decision: approvedRedactions.length ? "approved-with-redactions" : "approved",
  approvedRedactions,
  finalAcceptedScores: finalScores,
  protocolReceiptReference: m.protocolReceipt?.receiptSha256 ?? fz.receiptSha256,
  publicationPackageHashes: pm.files,
  approvalTimestampUtc: nowIso(),
  founderIdentity: flag("founder") || (() => { try { return git("config user.name"); } catch { return "(unrecorded)"; } })(),
  gitCommit: sh("git rev-parse HEAD").trim(),
  deploymentResult: { deployed, verified, allPagesLive: okAll },
};
fs.appendFileSync(path.join(base, "approval-receipts.jsonl"), JSON.stringify(receipt) + "\n");
console.log(okAll ? `PUBLICATION COMPLETE — commit ${head}; approval receipt appended.`
  : "PUBLISHED WITH VERIFICATION WARNINGS — check URLs above; approval receipt appended.");
