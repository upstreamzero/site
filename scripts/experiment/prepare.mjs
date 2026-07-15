#!/usr/bin/env node
/**
 * Prepare the founder review package for an experiment:
 *   draft heuristic scores + flags → proposed public objects (drafts) →
 *   REVIEW.md + REVIEW.html (one artifact, judgment-ready).
 *
 *   npm run experiment:prepare -- EXP-0001
 *
 * Publishes NOTHING. Never touches content/. Never runs git.
 * Draft scores are heuristic proposals with excerpts and uncertainty;
 * they remain draft until founder review. Tiers are never computed.
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT, loadConfig, loadManifest, saveManifest, runsDir,
  nextObjectId, sensitiveScan, nowIso, validateManifest, sha256,
  backupFullyConfirmed, CHANNELS, BLOCKING_CHANNEL_STATUS, verifyFrozen,
} from "./lib.mjs";

const expId = process.argv[2];
if (!expId) { console.error("usage: experiment:prepare -- <EXP-ID>"); process.exit(2); }
const cfg = await loadConfig(expId);
const base = runsDir(expId);
const m = loadManifest(expId);
validateManifest(expId);

// protocol must still be frozen and unaltered
const fz = verifyFrozen(expId, { fixture: Boolean(cfg.fixture) });
if (!fz.ok) { console.error("BLOCKED — protocol freeze check failed:\n" + fz.errors.map((e) => "  - " + e).join("\n")); process.exit(1); }

// all three backup tiers, including the INDEPENDENT off-device copy
if (!backupFullyConfirmed(m)) {
  const b = m.backup ?? {};
  console.error("BLOCKED — backup not fully confirmed:\n"
    + `  - workingCopy: ${b.workingCopy?.confirmed ? "ok" : "MISSING"}\n`
    + `  - localEncryptedArchive: ${b.localEncryptedArchive?.confirmed ? "ok" : "MISSING"}\n`
    + `  - offDeviceBackup: ${b.offDeviceBackup?.confirmed ? "ok" : "MISSING — run: npm run experiment:backup -- " + expId + " --off-device <independent path>"}`);
  process.exit(1);
}
const runs = m.runs.filter((r) => ["captured", "scored", "reviewed"].includes(r.reviewStatus));
if (!runs.length) { console.error("no runs to prepare"); process.exit(1); }

const pkg = path.join(base, "publication-package");
fs.rmSync(pkg, { recursive: true, force: true });
fs.mkdirSync(path.join(pkg, "content-drafts/observations"), { recursive: true });
fs.mkdirSync(path.join(pkg, "content-drafts/evidence"), { recursive: true });

// ── heuristic draft scoring (proposals, not judgments) ──
function draftScore(text, citations) {
  const has = (re) => re.test(text);
  const ex = (re) => (text.match(re) ?? []).slice(0, 2);
  const dim = (value, excerpts, note, uncertainty) => ({ value, excerpts, note, uncertainty });
  const cites = citations.filter((c) => c.includes("upstreamzero.com"));
  return {
    S1_coherence: dim(
      has(/upstream zero/i) && has(/commercial evaluation|research/i) ? 2 : has(/upstream zero/i) ? 1 : 0,
      ex(/[^.]*[Uu]pstream Zero[^.]*\./g),
      "keyword heuristic — confirm the account describes the actual company",
      "medium"),
    S2_completeness: dim(
      null,
      ex(/[^.]*(observatory|evidence tier|Client Zero|Narrated)[^.]*\./g),
      "checklist count requires human reading; matched elements shown",
      "high"),
    S3_evidenceTierPreservation: dim(
      has(/narrated|evidence tier|low[- ]evidence|early[- ]stage|not yet (proven|demonstrated)/i) ? 2 : 0,
      ex(/[^.]*(Narrated|evidence tier|early stage)[^.]*\./gi),
      "phrase heuristic — verify tiers aren't flattened elsewhere in response",
      "medium"),
    S4_uncertaintyPreservation: dim(
      has(/refut|would change|limitation|unknown|hypothes/i) ? 1 : 0,
      ex(/[^.]*(refut|limitation|hypothes)[^.]*\./gi),
      "requires human confirmation of faithful uncertainty transfer",
      "high"),
    S5_relationshipFidelity: dim(null, ex(/[^.]*H-1[^.]*\./g), "edge fidelity requires human reading", "high"),
    S6_unsupportedAdditions: dim(null, [], "fabrication detection requires human reading against the graph", "high"),
    S7_omissions: dim(null, [], "requires human reading", "high"),
    S8_citationBehavior: dim(
      cites.length ? 2 : citations.length ? 1 : 0,
      cites.slice(0, 3),
      `citations captured: ${citations.length}; to upstreamzero.com: ${cites.length}`,
      "low"),
    S9_provenanceRecovery: dim(
      citations.some((c) => /graph\.json|\/objects\/|\/claims/.test(c)) ? 2 : null,
      citations.filter((c) => /graph\.json|\/objects\/|\/claims/.test(c)).slice(0, 3),
      "P7 only; null for other prompts",
      "medium"),
  };
}

const obsId = nextObjectId("OBS", [path.join(pkg, "content-drafts/observations")]);
const evId = nextObjectId("E", [path.join(pkg, "content-drafts/evidence")]);
const proposals = [];
let n = 0;

for (const r of runs) {
  n += 1;
  const raw = fs.readFileSync(path.join(base, r.rawOutputFile), "utf8");
  const meta = JSON.parse(fs.readFileSync(path.join(base, `metadata/${r.runId}.json`), "utf8"));
  const scores = draftScore(raw, meta.citations ?? []);
  const flags = [];
  // channel-capture status: operator-error / unknown are BLOCKING
  const channels = r.channels ?? {};
  for (const name of CHANNELS) {
    const st = channels[name]?.status ?? "unknown";
    if (BLOCKING_CHANNEL_STATUS.includes(st))
      flags.push(`BLOCKING channel "${name}" is "${st}" — resolve before approval (operator-error or ambiguous absence)`);
  }
  if (r.knownDeviations.length) flags.push(`protocol deviations: ${r.knownDeviations.join("; ")}`);
  for (const h of sensitiveScan(raw))
    flags.push(`possible sensitive content: ${h.label} (${h.examples.join(", ")})`);
  for (const [k, v] of Object.entries(scores))
    if (v.uncertainty === "high") flags.push(`scoring ambiguity: ${k} needs human judgment`);

  const scoreFile = `scores/${r.runId}.score.json`;
  fs.writeFileSync(path.join(base, scoreFile), JSON.stringify({
    scoreSheetVersion: 1, rubricVersion: `${m.protocolVersion ?? cfg.protocolVersion} §5 (S1–S9)`,
    runId: r.runId, rawOutputSha256: r.sha256[r.rawOutputFile],
    scorer: "claude (heuristic draft — requires human confirmation)",
    scoringTimestampUtc: nowIso(), scores, uncertaintyNotes: flags.join("; "),
    disagreements: [], adjudicationStatus: "pending",
  }, null, 2));
  r.scoringSheetFile = scoreFile;
  r.sha256[scoreFile] = sha256(path.join(base, scoreFile));
  r.reviewStatus = "scored";

  const eid = evId(n), oid = obsId(n);
  const redacted = path.join(base, "redacted", path.basename(r.rawOutputFile));
  const artifact = fs.existsSync(redacted) ? redacted : path.join(base, r.rawOutputFile);
  // evidence draft (verbatim raw or redacted derivative)
  fs.writeFileSync(path.join(pkg, "content-drafts/evidence", `${eid}.mdx`), matterStringify({
    id: eid, type: "evidence",
    title: `${expId} ${r.runId} — verbatim capture (${r.evaluatorEnvironment}, ${r.promptId})`,
    created: nowIso().slice(0, 10), status: "published capture",
    pubState: "published",
    edges: [{ rel: "part-of", to: expId }],
  }, [
    `Verbatim ${fs.existsSync(redacted) ? "redacted derivative" : "raw capture"} · SHA-256 \`${r.sha256[r.rawOutputFile]}\``,
    `Environment: ${r.evaluatorEnvironment} · model: ${r.evaluatorReportedModel} · ${r.runDateTimeUtc}`,
    `Exposure: ${r.exposureClassification}`,
    "", "```", fs.readFileSync(artifact, "utf8").trim(), "```",
  ].join("\n")));
  // observation draft (interpretation layer, clearly typed)
  fs.writeFileSync(path.join(pkg, "content-drafts/observations", `${oid}.mdx`), matterStringify({
    id: oid, type: "observation",
    title: `${r.evaluatorEnvironment} response to ${r.promptId} (${expId} ${r.runId})`,
    created: nowIso().slice(0, 10), status: "published",
    pubState: "published", observationType: "behavioral", tier: "Observed",
    edges: [
      { rel: "part-of", to: expId },
      { rel: "evidenced-by", to: eid },
    ],
  }, [
    `Single observed response (N=1) of ${r.evaluatorEnvironment} to frozen prompt ${r.promptId}, captured ${r.runDateTimeUtc} under protocol ${m.protocolVersion}.`,
    "",
    `Draft coding (heuristic, pending human confirmation): citations to upstreamzero.com: ${(meta.citations ?? []).filter((c) => c.includes("upstreamzero.com")).length}; tier-language present: ${scores.S3_evidenceTierPreservation.value === 2 ? "yes" : "no/unconfirmed"}.`,
    "",
    `Raw evidence: ${eid} (hash-verifiable). Exposure: ${r.exposureClassification}.`,
  ].join("\n")));

  proposals.push({ run: r, meta, scores, flags, eid, oid, artifact: path.relative(base, artifact) });
}
saveManifest(expId, m);
validateManifest(expId);

function matterStringify(data, body) {
  const yaml = [];
  const emit = (k, v, ind = "") => {
    if (Array.isArray(v)) {
      yaml.push(`${ind}${k}:`);
      for (const item of v)
        if (typeof item === "object") {
          const [[k1, v1], ...rest] = Object.entries(item);
          yaml.push(`${ind}  - ${k1}: ${v1}`);
          for (const [k2, v2] of rest) yaml.push(`${ind}    ${k2}: ${v2}`);
        } else yaml.push(`${ind}  - ${item}`);
    } else yaml.push(`${ind}${k}: ${JSON.stringify(v)}`);
  };
  for (const [k, v] of Object.entries(data)) emit(k, v);
  return `---\n${yaml.join("\n")}\n---\n\n${body}\n`;
}

// ── run-log + experiment page proposal ──
const runLogEntries = proposals.map((p) => ({
  runId: `${expId}-${p.run.runId}`, date: p.run.runDateTimeUtc.slice(0, 10),
  environment: p.run.evaluatorEnvironment, status: "published",
  evidence: [p.oid, p.eid], deviations: p.run.knownDeviations,
}));
fs.writeFileSync(path.join(pkg, "runlog-proposal.json"), JSON.stringify(runLogEntries, null, 2));
fs.writeFileSync(path.join(pkg, "mapping.json"), JSON.stringify(
  proposals.map((p) => ({ runId: p.run.runId, evidence: p.eid, observation: p.oid })), null, 2));

// ── the single review artifact ──
const md = [];
md.push(`# Review package — ${expId}`, `Generated ${nowIso()} · protocol ${m.protocolVersion}`, "",
  `**Nothing here is public.** Approve with:`,
  "```", `npm run experiment:approve -- ${expId} --runs ${proposals.map((p) => p.run.runId).join(",")}`, "```",
  `Reject with \`npm run experiment:reject -- ${expId} --runs <ids>\`. Redactions: place a`,
  `redacted copy at runs/${expId}/redacted/<raw-filename>, re-run prepare, re-review.`, "");
for (const p of proposals) {
  md.push(`---`, `## ${p.run.runId} · ${p.run.evaluatorEnvironment} · ${p.run.promptId}`, "",
    `### 1 · RAW OBSERVATION (verbatim; what the evaluator did)`,
    `- artifact: \`${p.artifact}\` · sha256 \`${p.run.sha256[p.run.rawOutputFile].slice(0, 16)}…\``,
    `- model: ${p.run.evaluatorReportedModel} · ${p.run.runDateTimeUtc} · exposure: ${p.run.exposureClassification}`,
    `- citations: ${p.meta.citations?.join(", ") || "(none)"}`,
    `- offered next turns: ${p.meta.offeredNextTurns?.join(" || ") || "(none)"}`,
    `- disclaimers: ${p.meta.disclaimers?.join(" · ") || "(none)"}`,
    "",
    `**Evidence-channel capture status:**`,
    ...CHANNELS.map((name) => {
      const c = p.run.channels?.[name] ?? { status: "unknown" };
      const blocking = BLOCKING_CHANNEL_STATUS.includes(c.status) ? " ⚑" : "";
      return `- ${name}: **${c.status}**${blocking}`;
    }),
    "", "> " + fs.readFileSync(path.join(base, p.run.rawOutputFile), "utf8").trim().split("\n").join("\n> "), "",
    `### 2 · AGENT-PROPOSED CODING (heuristic drafts — your judgment required)`,
    ...Object.entries(p.scores).map(([k, v]) =>
      `- **${k}** = ${v.value ?? "∅ (human)"} · uncertainty ${v.uncertainty} — ${v.note}${v.excerpts.length ? ` · excerpts: ${v.excerpts.map((e) => `"${String(e).slice(0, 90)}"`).join(" · ")}` : ""}`),
    "",
    `### 3 · AGENT-PROPOSED INTERPRETATION (what would be published)`,
    `- observation object **${p.oid}** (tier: Observed, N=1, behavioral) — draft at content-drafts/observations/${p.oid}.mdx`,
    `- evidence object **${p.eid}** (verbatim, hash-locked) — draft at content-drafts/evidence/${p.eid}.mdx`,
    `### 4 · EXISTING RELATIONSHIPS`,
    `- edges: ${p.oid}/${p.eid} → part-of → ${expId}; ${p.oid} → evidenced-by → ${p.eid}`,
    `- experiment links: ${cfg.hypothesisLinks.join(", ") || "—"} (pre-existing; unchanged by this run)`,
    `### 5 · PROPOSED PUBLIC CLAIMS`,
    `- none. No claim, hypothesis, finding, or tier promotion is proposed. Scores are observations.`,
    p.flags.length ? `### ⚑ FLAGS FOR REVIEW\n${p.flags.map((f) => `- ${f}`).join("\n")}` : `### ⚑ FLAGS FOR REVIEW\n- none`,
    "");
}
md.push(`---`, `## Proposed experiment-page update`,
  "Run-log entries to append (runlog-proposal.json):",
  "```json", JSON.stringify(runLogEntries, null, 2), "```");
fs.writeFileSync(path.join(pkg, "REVIEW.md"), md.join("\n"));

// minimal self-contained HTML for comfortable reading
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
fs.writeFileSync(path.join(pkg, "REVIEW.html"),
  `<!doctype html><meta charset="utf-8"><title>Review — ${expId}</title><style>
  body{font-family:Georgia,serif;max-width:72ch;margin:3rem auto;padding:0 1rem;background:#fafaf7;color:#1a1a18;line-height:1.6}
  h1,h2,h3{font-weight:500} code,pre{font-family:Menlo,monospace;font-size:.85em}
  blockquote{border-left:2px solid rgba(26,26,24,.35);margin:1rem 0;padding:.4rem 1rem;background:#fcfcfa}
  .flag{color:#b5432a} hr{border:0;border-top:1px solid rgba(26,26,24,.18);margin:2.5rem 0}
  </style><pre style="white-space:pre-wrap;font-family:inherit">${esc(md.join("\n"))}</pre>`);

// ── package hash manifest: binds the exact reviewed drafts so approval
//    can detect any change made after review but before approval ──
function hashTree(dir) {
  const out = {};
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else out[path.relative(pkg, p)] = sha256(p);
    }
  })(dir);
  return out;
}
const packageManifest = {
  preparedAt: nowIso(),
  protocolReceiptSha256: fz.receiptSha256,
  files: hashTree(pkg),
};
fs.writeFileSync(path.join(pkg, "package-manifest.json"),
  JSON.stringify(packageManifest, null, 2));
// the package-manifest hashes itself out (it is written last, after hashing)
packageManifest.selfExcluded = true;

console.log(`review package ready: runs/${expId}/publication-package/`);
console.log(`  REVIEW.md / REVIEW.html · ${proposals.length} runs · drafts for ${proposals.length} observations + ${proposals.length} evidence objects`);
const blocking = proposals.flatMap((p) => p.flags.filter((f) => f.startsWith("BLOCKING")));
if (blocking.length) console.log(`  ⚑ ${blocking.length} BLOCKING channel issue(s) — approval will refuse until resolved.`);
console.log("NOTHING has been published. Founder approval command is printed inside REVIEW.md.");
