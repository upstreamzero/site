#!/usr/bin/env node
/**
 * FOUNDER APPROVAL — the only path by which experiment evidence becomes
 * public. Running this command IS the explicit approval act; no agent
 * may run it without a direct founder instruction naming the runs.
 *
 *   npm run experiment:approve -- EXP-0001 --runs R-001,R-002 [--dry-run]
 *
 * On approval: copies drafts into content/ (pubState published), appends
 * the experiment run log, validates via full site build (which enforces
 * ontology, pub-state, routes, and sitemap), commits ONLY content paths,
 * pushes, waits for Cloudflare, verifies the public pages, reports.
 * --dry-run performs everything through build validation, then restores
 * the working tree and publishes nothing.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { ROOT, matter, loadManifest, saveManifest, runsDir, validateManifest, nowIso } from "./lib.mjs";

const args = process.argv.slice(2);
const expId = args[0];
const runsArg = args[args.indexOf("--runs") + 1];
const dry = args.includes("--dry-run");
if (!expId || !runsArg || args.indexOf("--runs") < 0) {
  console.error("usage: experiment:approve -- <EXP-ID> --runs R-001,R-002 [--dry-run]");
  process.exit(2);
}
const runIds = runsArg.split(",").map((s) => s.trim());
const base = runsDir(expId);
const pkg = path.join(base, "publication-package");
const sh = (cmd, opts = {}) => execSync(cmd, { cwd: ROOT, encoding: "utf8", ...opts });

// ── safety battery: every condition blocks publication ──
const errs = [];
validateManifest(expId); // raw present, hashes match, metadata complete, backup gate
const m = loadManifest(expId);
if (!m.backup.confirmed) errs.push("backup not confirmed");
if (!fs.existsSync(path.join(pkg, "mapping.json"))) errs.push("no publication package — run experiment:prepare first");
const mapping = errs.length ? [] : JSON.parse(fs.readFileSync(path.join(pkg, "mapping.json"), "utf8"));
const runlog = errs.length ? [] : JSON.parse(fs.readFileSync(path.join(pkg, "runlog-proposal.json"), "utf8"));
for (const id of runIds) {
  const r = m.runs.find((x) => x.runId === id);
  if (!r) { errs.push(`run ${id} not in manifest`); continue; }
  if (r.reviewStatus === "rejected") errs.push(`run ${id} was rejected`);
  if (!["scored", "reviewed"].includes(r.reviewStatus)) errs.push(`run ${id} is "${r.reviewStatus}" — must be scored/reviewed`);
  if (r.knownDeviations.length && !args.includes("--accept-deviations"))
    errs.push(`run ${id} has unresolved protocol deviations (${r.knownDeviations.join("; ")}) — pass --accept-deviations to approve them explicitly`);
  const map = mapping.find((x) => x.runId === id);
  if (!map) errs.push(`run ${id} has no drafts in the package`);
  else for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const p = path.join(pkg, "content-drafts", kind, `${oid}.mdx`);
    if (!fs.existsSync(p)) errs.push(`draft missing: ${kind}/${oid}`);
    else {
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
}
if (errs.length) {
  console.error("PUBLICATION BLOCKED:\n" + errs.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

// ── stage into content/ ──
const touched = [];
for (const id of runIds) {
  const map = mapping.find((x) => x.runId === id);
  for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const dest = path.join(ROOT, "content", kind, `${oid}.mdx`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(pkg, "content-drafts", kind, `${oid}.mdx`), dest);
    touched.push(path.relative(ROOT, dest));
  }
}
// append run log (append-only: existing entries preserved)
const expFile = path.join(ROOT, "content/experiments", `${expId}.mdx`);
const expDoc = matter.read(expFile);
expDoc.data.runLog = [
  ...(expDoc.data.runLog ?? []),
  ...runlog.filter((e) => runIds.some((id) => e.runId.endsWith(id))),
];
fs.writeFileSync(expFile, matter.stringify(expDoc.content, expDoc.data));
touched.push(path.relative(ROOT, expFile));

// ── validate via full build (ontology, pub-state, routes, sitemap) ──
try {
  sh(`npm run build`, { cwd: path.join(ROOT, "website"), stdio: "inherit" });
} catch {
  console.error("BUILD VALIDATION FAILED — restoring working tree; nothing published.");
  sh(`git checkout -- ${touched.join(" ")}`);
  sh(`git clean -f ${touched.join(" ")} 2>/dev/null || true`);
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
records). Run log appended (append-only).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"`);
sh("git push origin main");
const head = sh("git rev-parse --short HEAD").trim();
console.log(`pushed ${head}; waiting for Cloudflare…`);
let deployed = false;
for (let i = 0; i < 24 && !deployed; i++) {
  const out = sh(`npx wrangler pages deployment list --project-name=upstreamzero 2>/dev/null | grep "${head}" | head -1 || true`, { cwd: path.join(ROOT, "website") });
  if (/ago/.test(out) && !/Failure/.test(out)) deployed = true;
  else if (/Failure/.test(out)) { console.error("DEPLOYMENT FAILED — investigate before retrying."); process.exit(1); }
  else sh("sleep 15");
}
console.log(deployed ? "deployed." : "deployment not confirmed within window — verify manually.");
let okAll = true;
for (const map of mapping.filter((x) => runIds.includes(x.runId))) {
  for (const [kind, oid] of [["evidence", map.evidence], ["observations", map.observation]]) {
    const url = `https://upstreamzero.com/${kind}/${oid}`;
    const code = sh(`curl -s -o /dev/null -w "%{http_code}" ${url}`).trim();
    const jcode = sh(`curl -s -o /dev/null -w "%{http_code}" https://upstreamzero.com/objects/${oid}`).trim();
    console.log(`${url} → ${code} · /objects/${oid} → ${jcode}`);
    if (code !== "200" || jcode !== "200") okAll = false;
  }
}
console.log(okAll ? `PUBLICATION COMPLETE — commit ${head}` : "PUBLISHED WITH VERIFICATION WARNINGS — check URLs above.");
