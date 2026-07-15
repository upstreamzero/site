#!/usr/bin/env node
/**
 * Synthetic failure-path tests for the EXP pipeline hardening.
 *
 *   npm run experiment:test
 *
 * Proves that publication is BLOCKED under every hardening condition, that
 * a clean fixture still passes end-to-end (dry-run), and that rejection
 * publishes nothing. Uses only EXP-TEST fixtures under gitignored trees;
 * touches no public content except a temporary content/experiments/
 * EXP-TEST.mdx used solely by the positive-control build (removed after).
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { decryptBuffer, loadKey } from "./crypto.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EXP = "EXP-TEST";
const runsDir = path.join(ROOT, "runs", EXP);
const protoDir = path.join(ROOT, "protocol", EXP);
const pkgDir = path.join(runsDir, "publication-package");
const OFF = path.join(os.tmpdir(), "uz-offdevice-test");
const scratch = path.join(os.tmpdir(), "uz-test-scratch");
fs.mkdirSync(scratch, { recursive: true });

let pass = 0, fail = 0;
function sh(cmd) {
  try { return { code: 0, out: execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) }; }
  catch (e) { return { code: e.status ?? 1, out: (e.stdout ?? "") + (e.stderr ?? "") }; }
}
function ok(label, cond) {
  if (cond) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; console.log(`  ✗ ${label}`); }
}

function writeProtocol() {
  fs.rmSync(protoDir, { recursive: true, force: true });
  fs.mkdirSync(protoDir, { recursive: true });
  fs.writeFileSync(path.join(protoDir, "PROTOCOL.md"), "# EXP-TEST fixture protocol\nSynthetic. Never published.\n");
  fs.writeFileSync(path.join(protoDir, "rubric.json"), JSON.stringify({ frozenSet: "fixture rubric", dimensions: { S1: "x" } }, null, 2));
  fs.writeFileSync(path.join(protoDir, "prompts.json"), JSON.stringify({ frozenSet: "fixture prompts", runsPerPromptPerEnvironment: 1, order: ["P1"], prompts: { P1: "What is Upstream Zero? (fixture)" } }, null, 2));
  fs.writeFileSync(path.join(protoDir, "predictions.json"), JSON.stringify({ frozenSet: "fixture predictions", predictions: { PR1: "x" } }, null, 2));
  fs.writeFileSync(path.join(protoDir, "refutation.json"), JSON.stringify({ frozenSet: "fixture refutation", perPredictionRefutedIf: { PR1: "x" } }, null, 2));
}

function baseReset() {
  fs.rmSync(runsDir, { recursive: true, force: true });
  fs.rmSync(OFF, { recursive: true, force: true });
  writeProtocol();
  const f = sh(`npm run --silent experiment:freeze -- ${EXP} --founder "Fixture Founder"`);
  if (f.code !== 0) throw new Error("fixture freeze failed:\n" + f.out);
}
function capFixture() {
  const r = sh(`npm run --silent experiment:capture -- ${EXP} --fixture --no-backup`);
  // capture auto-runs local backup on non-TTY; ensure local backup present
  sh(`npm run --silent experiment:backup -- ${EXP}`);
  return r;
}
function capFile(channelsJson) {
  const respFile = path.join(scratch, "resp.txt");
  fs.writeFileSync(respFile, "Fixture response. Upstream Zero is a research company. Narrated tier. https://upstreamzero.com/claims");
  const ch = channelsJson ? ` --channels '${channelsJson}'` : "";
  const r = sh(`npm run --silent experiment:capture -- ${EXP} --from-file "${respFile}" --env EE-T --prompt P1 --model "fixture-model" --screenshot-status unavailable --no-backup${ch}`);
  sh(`npm run --silent experiment:backup -- ${EXP}`);
  return r;
}
const offDevice = () => sh(`npm run --silent experiment:backup -- ${EXP} --off-device "${OFF}"`);
const prepare = () => sh(`npm run --silent experiment:prepare -- ${EXP}`);
const approveDry = (runs) => sh(`npm run --silent experiment:approve -- ${EXP} --runs ${runs} --dry-run --founder "Fixture Founder"`);

console.log(`\nEXP pipeline — failure-path tests\n`);

// ── POSITIVE CONTROL: clean fixture passes prepare + approve --dry-run ──
console.log("0 · positive control (clean fixture must pass, publish nothing)");
{
  baseReset(); capFixture(); offDevice();
  const p = prepare();
  const expFile = path.join(ROOT, "content/experiments", `${EXP}.mdx`);
  fs.writeFileSync(expFile, `---\nid: ${EXP}\ntype: experiment\ntitle: "FIXTURE (test only)"\ncreated: "2026-07-15"\nstatus: fixture\n---\nFixture.\n`);
  const a = approveDry("R-001");
  fs.rmSync(expFile, { force: true });
  ok("prepare succeeds", p.code === 0);
  ok("approve --dry-run passes validation", a.code === 0 && /DRY RUN/.test(a.out));
  ok("nothing published (no content/evidence from fixture)", !fs.existsSync(path.join(ROOT, "content/evidence/E-0001.mdx")) || !fs.readFileSync(path.join(ROOT, "content/evidence/E-0001.mdx"), "utf8").includes("Fixture"));
  ok("no approval receipt written by dry-run", !fs.existsSync(path.join(runsDir, "approval-receipts.jsonl")));
}

// ── 1 · off-device backup absent → prepare blocks ──
console.log("1 · off-device backup absent");
{
  baseReset(); capFixture(); // local only, NO off-device
  const p = prepare();
  ok("prepare BLOCKS without off-device backup", p.code !== 0 && /offDeviceBackup: MISSING/.test(p.out));
}

// ── 2 · encrypted archive modified → authentication fails ──
console.log("2 · encrypted archive tampered");
{
  baseReset(); capFixture(); offDevice();
  const arch = fs.readdirSync(path.join(ROOT, "backups")).filter((f) => f.startsWith(EXP) && f.endsWith(".uzenc")).sort().pop();
  const blob = fs.readFileSync(path.join(ROOT, "backups", arch));
  blob[blob.length - 5] ^= 0xff; // flip a ciphertext byte
  const key = loadKey(path.join(os.homedir(), ".uz-backup/key"));
  let threw = false;
  try { decryptBuffer(blob, key); } catch { threw = true; }
  ok("tampered archive fails authenticated decryption", threw);
}

// ── 3 · raw artifact hash changes → manifest invalid ──
console.log("3 · raw artifact modified after capture");
{
  baseReset(); capFixture(); offDevice();
  fs.appendFileSync(path.join(runsDir, "raw/R-001.txt"), "\nTAMPER");
  const p = prepare();
  ok("prepare BLOCKS on raw hash mismatch", p.code !== 0 && /HASH MISMATCH/.test(p.out));
}

// ── 4 · frozen protocol changes after freeze → capture/prepare block ──
console.log("4 · frozen protocol changed after freeze");
{
  baseReset(); capFixture(); offDevice();
  fs.appendFileSync(path.join(protoDir, "prompts.json"), "\n ");
  const p = prepare();
  ok("prepare BLOCKS when a frozen file hash changed", p.code !== 0 && /freeze check failed|hash changed/.test(p.out));
}

// ── 5 · screenshot required but missing (unknown status) → approve blocks ──
console.log("5 · screenshot required but status unknown");
{
  baseReset(); capFile('{"screenshots":{"status":"unknown"}}'); offDevice(); prepare();
  const a = approveDry("R-001");
  ok("approve BLOCKS on unknown screenshot channel", a.code !== 0 && /channel "screenshots" is "unknown"/.test(a.out));
}

// ── 6 · citations claimed but not captured (operator-error) → approve blocks ──
console.log("6 · citations claimed but not captured");
{
  baseReset(); capFile('{"citations":{"status":"operator-error"}}'); offDevice(); prepare();
  const a = approveDry("R-001");
  ok("approve BLOCKS on operator-error citations channel", a.code !== 0 && /channel "citations" is "operator-error"/.test(a.out));
}

// ── 7 · offered next turn omitted (unknown) → approve blocks ──
console.log("7 · offered next turn omitted");
{
  baseReset(); capFile('{"offeredNextTurns":{"status":"unknown"}}'); offDevice(); prepare();
  const a = approveDry("R-001");
  ok("approve BLOCKS on unknown offeredNextTurns channel", a.code !== 0 && /channel "offeredNextTurns" is "unknown"/.test(a.out));
}

// ── 8 · approval receipt absent (no path publishes without one) ──
console.log("8 · approval receipt is only produced by real approval");
{
  baseReset(); capFixture(); offDevice(); prepare();
  const expFile = path.join(ROOT, "content/experiments", `${EXP}.mdx`);
  fs.writeFileSync(expFile, `---\nid: ${EXP}\ntype: experiment\ntitle: "FIXTURE"\ncreated: "2026-07-15"\nstatus: fixture\n---\nx\n`);
  approveDry("R-001");
  fs.rmSync(expFile, { force: true });
  ok("no approval receipt exists after dry-run/blocked paths", !fs.existsSync(path.join(runsDir, "approval-receipts.jsonl")));
}

// ── 9 · approval names the wrong run → blocks ──
console.log("9 · approval names a nonexistent run");
{
  baseReset(); capFixture(); offDevice(); prepare();
  const a = approveDry("R-999");
  ok("approve BLOCKS on unknown run id", a.code !== 0 && /R-999 not in manifest/.test(a.out));
}

// ── 10 · redactions do not match the public derivative → blocks ──
console.log("10 · redaction mismatch");
{
  baseReset(); capFixture(); offDevice(); prepare();
  // add a redacted file AFTER prepare so the published draft embeds the raw, not this
  fs.mkdirSync(path.join(runsDir, "redacted"), { recursive: true });
  fs.writeFileSync(path.join(runsDir, "redacted/R-001.txt"), "DIFFERENT REDACTED TEXT that the draft does not contain");
  const a = approveDry("R-001 --redactions R-001");
  ok("approve BLOCKS when redaction ≠ published derivative", a.code !== 0 && /redaction/.test(a.out));
}

// ── 11 · publication draft changed after review → blocks ──
console.log("11 · draft changed after review");
{
  baseReset(); capFixture(); offDevice(); prepare();
  const draft = fs.readdirSync(path.join(pkgDir, "content-drafts/observations"))[0];
  fs.appendFileSync(path.join(pkgDir, "content-drafts/observations", draft), "\nEDITED AFTER REVIEW\n");
  const a = approveDry("R-001");
  ok("approve BLOCKS on post-review draft change", a.code !== 0 && /changed after review/.test(a.out));
}

// ── rejection publishes nothing ──
console.log("R · rejection publishes nothing");
{
  baseReset(); capFixture(); offDevice(); prepare();
  const rej = sh(`npm run --silent experiment:reject -- ${EXP} --runs R-001 --reason "fixture rejection"`);
  const a = approveDry("R-001");
  ok("reject succeeds", rej.code === 0);
  ok("evidence draft removed after rejection", !fs.existsSync(path.join(pkgDir, "content-drafts/evidence/E-0001.mdx")));
  ok("approve BLOCKS a rejected run", a.code !== 0 && /was rejected/.test(a.out));
  ok("no fixture content published", !fs.existsSync(path.join(ROOT, "content/observations/OBS-0001.mdx")));
}

// ── cleanup fixtures (leave no fixture data) ──
fs.rmSync(runsDir, { recursive: true, force: true });
fs.rmSync(protoDir, { recursive: true, force: true });
fs.rmSync(OFF, { recursive: true, force: true });
fs.rmSync(scratch, { recursive: true, force: true });
for (const f of fs.readdirSync(path.join(ROOT, "backups")).filter((f) => f.startsWith(EXP)))
  fs.rmSync(path.join(ROOT, "backups", f), { force: true });

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
