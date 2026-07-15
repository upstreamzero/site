#!/usr/bin/env node
/**
 * Guided/automated capture for one experiment.
 *
 *   npm run experiment:capture -- EXP-0001                 (interactive)
 *   npm run experiment:capture -- EXP-0001 --from-file r.txt \
 *       --env EE-2 --prompt P1 --model "Claude (UI string)" \
 *       [--citations "u1,u2"] [--next-turns "a||b"] [--disclaimers "x||y"] \
 *       [--screenshot p.png | --screenshot-status unavailable] \
 *       [--channels '<json overrides>']
 *   npm run experiment:capture -- EXP-TEST --fixture       (synthetic test)
 *
 * Capture REFUSES to begin unless the protocol is frozen and unaltered.
 * The operator supplies the response ONCE; the system extracts candidate
 * citations, links, offered next turns, and disclaimers automatically,
 * assigns the run ID and filenames, hashes everything, records per-channel
 * capture status, updates and validates the manifest, and triggers the
 * local authenticated backup automatically. The off-device backup is a
 * separate, explicit step (prepare/approve block until it is confirmed).
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { execSync } from "node:child_process";
import {
  ROOT, loadConfig, ensureRunDirs, loadManifest, saveManifest,
  nextRunId, sha256, validateManifest, nowIso, runsDir,
  verifyFrozen, extractChannels, CHANNEL_STATUS,
} from "./lib.mjs";

const args = process.argv.slice(2);
const expId = args[0];
if (!expId) { console.error("usage: experiment:capture -- <EXP-ID> [flags]"); process.exit(2); }
const flag = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const has = (name) => args.includes(`--${name}`);

const cfg = await loadConfig(expId);

// ── protocol-freeze gate: capture cannot begin against an unfrozen or
//    altered protocol ──
const fz = verifyFrozen(expId, { fixture: Boolean(cfg.fixture) });
if (!fz.ok) {
  console.error("CAPTURE BLOCKED — protocol freeze check failed:\n" +
    fz.errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

const base = ensureRunDirs(expId);
const m = loadManifest(expId);
m.protocolVersion = cfg.protocolVersion;
m.protocolReceipt = {
  experimentId: expId,
  version: fz.receipt.protocolVersion,
  receiptSha256: fz.receiptSha256,
  protocolCommit: fz.receipt.protocolCommit,
  frozenAt: fz.receipt.approvalTimestampUtc,
};

const promptIndex = (pid) => {
  const order = cfg.promptOrder ?? Object.keys(cfg.prompts);
  return order.indexOf(pid) + 1;
};

function buildChannels(o) {
  const auto = extractChannels(o.responseText ?? "");
  const cit = o.citations?.length ? o.citations : auto.citations;
  const nt = o.nextTurns?.length ? o.nextTurns : auto.offeredNextTurns;
  const disc = o.disclaimers?.length ? o.disclaimers : auto.disclaimers;
  const ch = {
    rawResponse: { status: (o.responseText ?? "").trim() ? "captured" : "operator-error" },
    citations: { status: cit.length ? "captured" : "absent", values: cit },
    offeredNextTurns: { status: nt.length ? "captured" : "absent", values: nt },
    screenshots: {
      status: o.screenshotFiles?.length ? "captured" : (o.screenshotStatus ?? "unknown"),
      files: o.screenshotFiles ?? [],
    },
    evaluatorName: { status: o.env?.name ? "captured" : "operator-error", value: o.env?.name ?? null },
    productSurface: { status: o.env?.access ? "captured" : "operator-error", value: o.env?.access ?? null },
    modelNameVersion: {
      status: (o.model && o.model !== "(not reported)") ? "captured" : (o.modelStatus ?? "unknown"),
      value: o.model ?? null,
    },
    dateTime: { status: "captured", value: o.capturedAt },
    sessionState: { status: "captured", value: cfg.sessionConditions },
    promptWording: { status: "captured", value: cfg.prompts[o.promptId] },
    promptOrder: { status: "captured", value: promptIndex(o.promptId) },
    deviations: { status: "captured", values: o.deviations ?? [] },
    disclaimers: { status: disc.length ? "captured" : "absent", values: disc },
    responseBoundaries: { status: o.boundariesConfirmed === false ? "unknown" : "captured", value: "full response boundaries confirmed" },
  };
  if (o.channelOverride) for (const [k, v] of Object.entries(o.channelOverride)) ch[k] = { ...ch[k], ...v };
  for (const c of Object.values(ch))
    if (!CHANNEL_STATUS.includes(c.status)) throw new Error(`bad channel status "${c.status}"`);
  return ch;
}

function addRun(o) {
  const runId = nextRunId(m);
  const capturedAt = nowIso();
  const env = cfg.environments.find((e) => e.id === o.envId);
  const channels = buildChannels({ ...o, env, capturedAt });

  const rawFile = `raw/${runId}.txt`;
  fs.writeFileSync(path.join(base, rawFile), o.responseText);
  const shots = [];
  for (const s of o.screenshotFiles ?? []) {
    if (fs.existsSync(s)) {
      const dest = `screenshots/${runId}-${shots.length + 1}${path.extname(s)}`;
      fs.copyFileSync(s, path.join(base, dest));
      shots.push(dest);
    }
  }
  channels.screenshots.files = shots;
  const metaFile = `metadata/${runId}.json`;
  const meta = {
    runId, capturedAt, environment: env, channels,
    citations: channels.citations.values, offeredNextTurns: channels.offeredNextTurns.values,
    disclaimers: channels.disclaimers.values, locale: "en-US",
  };
  fs.writeFileSync(path.join(base, metaFile), JSON.stringify(meta, null, 2));
  const hashes = {
    [rawFile]: sha256(path.join(base, rawFile)),
    [metaFile]: sha256(path.join(base, metaFile)),
  };
  for (const s of shots) hashes[s] = sha256(path.join(base, s));

  m.runs.push({
    runId,
    evaluatorEnvironment: `${o.envId} ${env?.name ?? ""}`.trim(),
    evaluatorReportedModel: channels.modelNameVersion.value || "(not reported)",
    promptId: o.promptId,
    promptText: cfg.prompts[o.promptId],
    promptOrder: promptIndex(o.promptId),
    runDateTimeUtc: capturedAt,
    timezone: "UTC (captured as ISO)",
    sessionConditions: cfg.sessionConditions,
    exposureClassification: cfg.exposureDefault,
    rawOutputFile: rawFile,
    screenshotFiles: shots,
    channels,
    sha256: hashes,
    captureOperator: flag("operator") ?? "claude (agent-assisted)",
    knownDeviations: o.deviations ?? [],
    offeredNextTurns: channels.offeredNextTurns.values,
    protocolReceiptSha256: fz.receiptSha256,
    scoringSheetFile: null,
    reviewStatus: "captured",
    publicationStatus: "unpublished",
  });
  saveManifest(expId, m);
  const blocked = Object.entries(channels).filter(([, c]) => ["operator-error", "unknown"].includes(c.status));
  console.log(`captured ${runId} (${o.envId} × ${o.promptId}) — hashed, ${Object.keys(channels).length} channels recorded`
    + (blocked.length ? ` · ⚑ ${blocked.length} channel(s) need resolution: ${blocked.map(([k]) => k).join(", ")}` : ""));
  return runId;
}

if (has("fixture")) {
  if (!cfg.fixture) { console.error("refusing --fixture on a non-fixture experiment config"); process.exit(1); }
  addRun({
    envId: "EE-T", promptId: "P1",
    responseText:
      "SYNTHETIC FIXTURE RESPONSE. Upstream Zero is a research company studying commercial evaluation. Its claims are labeled Narrated, an early-stage evidence tier, and it publishes its own limitations. See https://upstreamzero.com/claims for the ledger. I don't have information about their funding.",
    model: "fixture-model-1",
    screenshotStatus: "unavailable",
    deviations: [],
  });
} else if (flag("from-file")) {
  const txt = fs.readFileSync(flag("from-file"), "utf8");
  addRun({
    envId: flag("env"), promptId: flag("prompt"), responseText: txt,
    model: flag("model"), modelStatus: flag("model-status"),
    citations: flag("citations")?.split(",").map((s) => s.trim()).filter(Boolean),
    nextTurns: flag("next-turns")?.split("||").map((s) => s.trim()).filter(Boolean),
    disclaimers: flag("disclaimers")?.split("||").map((s) => s.trim()).filter(Boolean),
    screenshotFiles: flag("screenshot") ? [flag("screenshot")] : undefined,
    screenshotStatus: flag("screenshot-status"),
    deviations: flag("deviations")?.split(";").filter(Boolean),
    channelOverride: flag("channels") ? JSON.parse(flag("channels")) : undefined,
  });
} else {
  // guided interactive capture: paste once, confirm auto-extracted channels
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const order = cfg.promptOrder ?? Object.keys(cfg.prompts);
  console.log(`Guided capture — ${expId}. ${m.runs.length} runs recorded so far.\n`);
  outer: for (const env of cfg.environments) {
    for (const pid of order) {
      const already = m.runs.filter((r) => r.evaluatorEnvironment.startsWith(env.id) && r.promptId === pid).length;
      if (already >= cfg.runsPerPrompt) continue;
      console.log(`\n─── ${env.id} ${env.name} · ${pid} (rep ${already + 1}/${cfg.runsPerPrompt}) ───`);
      console.log(`Access: ${env.access}`);
      console.log(`PROMPT (paste verbatim into the evaluator):\n\n  ${cfg.prompts[pid]}\n`);
      const go = await rl.question("Enter when response is ready (or 'skip' / 'quit'): ");
      if (go.trim() === "quit") break outer;
      if (go.trim() === "skip") continue;
      console.log("Paste the FULL response, then a line with only 'EOF':");
      const lines = [];
      for (;;) { const l = await rl.question(""); if (l.trim() === "EOF") break; lines.push(l); }
      const responseText = lines.join("\n");
      // auto-extract, then confirm
      const auto = extractChannels(responseText);
      console.log(`\nAuto-extracted — citations: ${auto.citations.length || "none"}; `
        + `next turns: ${auto.offeredNextTurns.length || "none"}; disclaimers: ${auto.disclaimers.length || "none"}.`);
      const model = await rl.question("Evaluator model string (blank if not visible on the surface): ");
      let modelStatus;
      if (!model.trim()) {
        const a = (await rl.question("  model blank — (u)navailable on surface or (o)perator-error? [u/o]: ")).trim().toLowerCase();
        modelStatus = a.startsWith("o") ? "operator-error" : "unavailable";
      }
      const shot = await rl.question("Screenshot file path (blank if none): ");
      let shotStatus;
      if (!shot.trim()) {
        const a = (await rl.question("  no screenshot — (a)bsent, (u)navailable, or (o)perator-error? [a/u/o]: ")).trim().toLowerCase();
        shotStatus = a[0] === "a" ? "absent" : a[0] === "o" ? "operator-error" : "unavailable";
      }
      const dev = await rl.question("Protocol deviations (';'-separated, blank if none): ");
      addRun({
        envId: env.id, promptId: pid, responseText,
        model: model.trim() || undefined, modelStatus,
        screenshotFiles: shot.trim() ? [shot.trim()] : undefined,
        screenshotStatus: shot.trim() ? undefined : shotStatus,
        deviations: dev.split(";").map((s) => s.trim()).filter(Boolean),
      });
      try { execSync(`node scripts/experiment/backup.mjs ${expId}`, { cwd: ROOT, stdio: "inherit" }); }
      catch { console.warn("local backup failed — resolve before review"); }
    }
  }
  rl.close();
}

validateManifest(expId);
if (!process.stdin.isTTY && !has("no-backup")) {
  try { execSync(`node scripts/experiment/backup.mjs ${expId}`, { cwd: ROOT, stdio: "inherit" }); }
  catch { console.warn("local backup failed — resolve before review"); }
}
console.log(`capture complete — ${loadManifest(expId).runs.length} total runs in runs/${expId}/`);
console.log("Off-device backup is still required before review: npm run experiment:backup -- " + expId + " --off-device <independent path>");
