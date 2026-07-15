#!/usr/bin/env node
/**
 * PROTOCOL FREEZE — the founder's protocol-approval act, made immutable.
 *
 *   npm run experiment:freeze -- EXP-0001 --founder "Skyler Meyer"
 *
 * Running this command IS the pre-registration act. It records a
 * cryptographic receipt binding the exact frozen protocol so that no run
 * may be captured against a silently altered protocol. It publishes
 * nothing and touches no public content.
 *
 * Preconditions (non-fixture):
 *   - the protocol doc and all frozen source files are committed and have
 *     no uncommitted modifications (the freeze must reference a real,
 *     retrievable commit).
 * The receipt is written to protocol/<EXP>/FREEZE_RECEIPT.json; commit it
 * as a separate, timestamped commit. Later protocol changes must bump the
 * version and re-freeze; historical receipts are never altered.
 */
import fs from "node:fs";
import {
  loadConfig, frozenFiles, frozenHashes, receiptPath,
  gitHead, gitPathsClean, git, nowIso, ROOT,
} from "./lib.mjs";
import path from "node:path";

const args = process.argv.slice(2);
const expId = args[0];
if (!expId) { console.error("usage: experiment:freeze -- <EXP-ID> --founder \"Name\""); process.exit(2); }
const flag = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };

const cfg = await loadConfig(expId);
const isFixture = Boolean(cfg.fixture);
const files = frozenFiles(expId);

// all frozen files must exist
const missing = Object.entries(files).filter(([, p]) => !fs.existsSync(p));
if (missing.length) {
  console.error("FREEZE BLOCKED — frozen source files missing:\n" +
    missing.map(([n, p]) => `  - ${n}: ${path.relative(ROOT, p)}`).join("\n"));
  process.exit(1);
}

const relPaths = Object.values(files).map((p) => path.relative(ROOT, p));
let commit;
if (isFixture) {
  commit = "FIXTURE-NO-COMMIT";
} else {
  if (!gitPathsClean(relPaths)) {
    console.error(
      "FREEZE BLOCKED — the protocol or a frozen file has uncommitted changes.\n" +
      "Commit the final protocol first; the freeze must reference a retrievable commit:\n" +
      relPaths.map((p) => `  - ${p}`).join("\n"));
    process.exit(1);
  }
  commit = gitHead();
}

const founder = flag("founder") || (() => {
  try { return git("config user.name"); } catch { return null; }
})();
if (!founder) { console.error("FREEZE BLOCKED — no founder identity (pass --founder \"Name\")"); process.exit(1); }

const hashes = frozenHashes(expId);
const receipt = {
  receiptVersion: 1,
  experimentId: expId,
  protocolVersion: cfg.protocolVersion,
  status: "frozen",
  fixture: isFixture,
  hashes: {
    protocolSha256: hashes.protocol,
    rubricSha256: hashes.rubric,
    promptSetSha256: hashes.prompts,
    predictionsSha256: hashes.predictions,
    refutationConditionsSha256: hashes.refutation,
  },
  approvalTimestampUtc: nowIso(),
  approvingFounder: founder,
  protocolCommit: commit,
  note: isFixture
    ? "FIXTURE freeze — nothing produced under this experiment may ever be published."
    : "Approval of this receipt is pre-registration. The commit above is the timestamp authority.",
};

fs.writeFileSync(receiptPath(expId), JSON.stringify(receipt, null, 2) + "\n");
console.log(`PROTOCOL FROZEN — ${expId} ${cfg.protocolVersion}`);
console.log(`  receipt: ${path.relative(ROOT, receiptPath(expId))}`);
console.log(`  protocol commit: ${commit}`);
console.log(`  founder: ${founder}`);
for (const [k, v] of Object.entries(receipt.hashes)) console.log(`  ${k}: ${v?.slice(0, 16)}…`);
if (!isFixture)
  console.log("\nNext: commit protocol/" + expId + "/FREEZE_RECEIPT.json — that commit is the pre-registration timestamp. Capture may then begin.");
