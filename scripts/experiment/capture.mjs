#!/usr/bin/env node
/**
 * Guided/automated capture for one experiment.
 *
 *   npm run experiment:capture -- EXP-0001                 (interactive)
 *   npm run experiment:capture -- EXP-0001 --from-file r.txt \
 *       --env EE-2 --prompt P1 --model "Claude (UI string)" \
 *       [--citations "url1,url2"] [--next-turns "a||b"] [--screenshot p.png]
 *   npm run experiment:capture -- EXP-TEST --fixture       (synthetic test)
 *
 * The operator supplies the response ONCE; the system assigns the run ID
 * and filenames, writes raw + metadata, hashes everything, updates and
 * validates the manifest, and triggers the private backup automatically.
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { execSync } from "node:child_process";
import {
  ROOT, loadConfig, ensureRunDirs, loadManifest, saveManifest,
  nextRunId, sha256, validateManifest, nowIso, runsDir,
} from "./lib.mjs";

const args = process.argv.slice(2);
const expId = args[0];
if (!expId) { console.error("usage: experiment:capture -- <EXP-ID> [flags]"); process.exit(2); }
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name) => args.includes(`--${name}`);

const cfg = await loadConfig(expId);
const base = ensureRunDirs(expId);
const m = loadManifest(expId);
m.protocolVersion = cfg.protocolVersion;

function addRun({ envId, promptId, responseText, model, citations, nextTurns, screenshot, deviations }) {
  const runId = nextRunId(m);
  const rawFile = `raw/${runId}.txt`;
  fs.writeFileSync(path.join(base, rawFile), responseText);
  const shots = [];
  if (screenshot && fs.existsSync(screenshot)) {
    const dest = `screenshots/${runId}${path.extname(screenshot)}`;
    fs.copyFileSync(screenshot, path.join(base, dest));
    shots.push(dest);
  }
  const metaFile = `metadata/${runId}.json`;
  const env = cfg.environments.find((e) => e.id === envId);
  const meta = {
    runId, capturedAt: nowIso(), environment: env,
    citations: citations ?? [], offeredNextTurns: nextTurns ?? [],
    locale: "en-US",
  };
  fs.writeFileSync(path.join(base, metaFile), JSON.stringify(meta, null, 2));
  const hashes = { [rawFile]: sha256(path.join(base, rawFile)),
                   [metaFile]: sha256(path.join(base, metaFile)) };
  for (const s of shots) hashes[s] = sha256(path.join(base, s));
  m.runs.push({
    runId,
    evaluatorEnvironment: `${envId} ${env?.name ?? ""}`.trim(),
    evaluatorReportedModel: model || "(not reported)",
    promptId,
    promptText: cfg.prompts[promptId],
    runDateTimeUtc: nowIso(),
    timezone: "UTC (captured as ISO)",
    sessionConditions: cfg.sessionConditions,
    accountState: flag("account") ?? "operator default account, per protocol",
    personalizationMemoryState: flag("memory") ?? "off where product allows",
    retrievalBrowsingState: flag("retrieval") ?? "product default",
    exposureClassification: cfg.exposureDefault,
    rawOutputFile: rawFile,
    screenshotFiles: shots,
    sha256: hashes,
    captureOperator: flag("operator") ?? "claude (agent-assisted)",
    knownDeviations: deviations ?? [],
    offeredNextTurns: nextTurns ?? [],
    scoringSheetFile: null,
    reviewStatus: "captured",
    publicationStatus: "unpublished",
  });
  saveManifest(expId, m);
  console.log(`captured ${runId} (${envId} × ${promptId}) — hashed, manifest updated`);
  return runId;
}

if (has("fixture")) {
  if (!cfg.fixture) { console.error("refusing --fixture on a non-fixture experiment config"); process.exit(1); }
  addRun({
    envId: "EE-T", promptId: "P1",
    responseText:
      "SYNTHETIC FIXTURE RESPONSE. Upstream Zero is a research company studying commercial evaluation. Its claims are labeled Narrated. See https://upstreamzero.com/claims for the ledger.",
    model: "fixture-model-1", citations: ["https://upstreamzero.com/claims"],
    nextTurns: ["What is the evidence tier system?"], deviations: [],
  });
} else if (flag("from-file")) {
  const txt = fs.readFileSync(flag("from-file"), "utf8");
  addRun({
    envId: flag("env"), promptId: flag("prompt"), responseText: txt,
    model: flag("model"),
    citations: flag("citations")?.split(",").map((s) => s.trim()).filter(Boolean) ?? [],
    nextTurns: flag("next-turns")?.split("||").map((s) => s.trim()).filter(Boolean) ?? [],
    screenshot: flag("screenshot"),
    deviations: flag("deviations")?.split(";").filter(Boolean) ?? [],
  });
} else {
  // guided interactive capture: paste once, answer three short questions
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const plan = [];
  for (const env of cfg.environments)
    for (const pid of Object.keys(cfg.prompts))
      for (let i = 0; i < cfg.runsPerPrompt; i++) plan.push({ env, pid, rep: i + 1 });
  const done = new Set(m.runs.map((r) => `${r.evaluatorEnvironment.split(" ")[0]}|${r.promptId}`));
  console.log(`Guided capture — ${expId}. ${m.runs.length} runs recorded so far.\n`);
  for (const step of plan) {
    const key = `${step.env.id}|${step.pid}`;
    const already = m.runs.filter((r) => r.evaluatorEnvironment.startsWith(step.env.id) && r.promptId === step.pid).length;
    if (already >= cfg.runsPerPrompt) continue;
    console.log(`\n─── ${step.env.id} ${step.env.name} · ${step.pid} (rep ${already + 1}/${cfg.runsPerPrompt}) ───`);
    console.log(`Access: ${step.env.access}`);
    console.log(`PROMPT (paste verbatim into the evaluator):\n\n  ${cfg.prompts[step.pid]}\n`);
    const go = await rl.question("Press Enter when response is ready to paste (or 'skip' / 'quit'): ");
    if (go.trim() === "quit") break;
    if (go.trim() === "skip") continue;
    console.log("Paste the FULL response, then a line with only 'EOF':");
    const lines = [];
    for (;;) {
      const l = await rl.question("");
      if (l.trim() === "EOF") break;
      lines.push(l);
    }
    const model = await rl.question("Evaluator-reported model string: ");
    const cits = await rl.question("Citation URLs (comma-separated, empty if none): ");
    const nts = await rl.question("Offered next turns (separated by ||, empty if none): ");
    addRun({
      envId: step.env.id, promptId: step.pid, responseText: lines.join("\n"),
      model, citations: cits.split(",").map((s) => s.trim()).filter(Boolean),
      nextTurns: nts.split("||").map((s) => s.trim()).filter(Boolean),
    });
    // automatic backup after every capture
    try { execSync(`node scripts/experiment/backup.mjs ${expId}`, { cwd: ROOT, stdio: "inherit" }); }
    catch { console.warn("backup failed — resolve before review"); }
  }
  rl.close();
}

validateManifest(expId);
if (!process.argv.includes("--no-backup") && !process.stdin.isTTY) {
  try { execSync(`node scripts/experiment/backup.mjs ${expId}`, { cwd: ROOT, stdio: "inherit" }); }
  catch { console.warn("backup failed — resolve before review"); }
}
console.log(`capture complete — ${loadManifest(expId).runs.length} total runs in runs/${expId}/`);
