#!/usr/bin/env node
/**
 * Private backup of a run package (raw + metadata + scores + manifest).
 *
 *   npm run experiment:backup -- EXP-0001
 *
 * v1 target: LOCAL ENCRYPTED ARCHIVE (temporary fallback per founder) —
 * tar.gz of runs/<EXP> (excluding publication-package), AES-256 encrypted
 * with a keyfile at ~/.uz-backup/key (created once, chmod 600, OUTSIDE
 * the repository). Archive written to backups/ (gitignored) and verified
 * by decrypt-and-list before the manifest is marked backed up.
 *
 * R2 upload is intentionally not configured: the current wrangler token
 * has no R2 scope and R2 requires account enablement (founder decision —
 * see report). When enabled, this script gains `--r2 <bucket>`.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { ROOT, loadManifest, saveManifest, nowIso, runsDir } from "./lib.mjs";

const expId = process.argv[2];
if (!expId) { console.error("usage: experiment:backup -- <EXP-ID>"); process.exit(2); }

const keyDir = path.join(os.homedir(), ".uz-backup");
const keyFile = path.join(keyDir, "key");
if (!fs.existsSync(keyFile)) {
  fs.mkdirSync(keyDir, { recursive: true });
  execSync(`openssl rand -hex 32 > "${keyFile}" && chmod 600 "${keyFile}"`);
  console.log(`backup key created at ${keyFile} — keep this file safe; without it archives cannot be decrypted.`);
}

const outDir = path.join(ROOT, "backups");
fs.mkdirSync(outDir, { recursive: true });
const stamp = nowIso().replace(/[:.]/g, "-");
const archive = path.join(outDir, `${expId}-${stamp}.tar.gz.enc`);

execSync(
  `tar -czf - --exclude publication-package -C "${path.join(ROOT, "runs")}" "${expId}" | ` +
  `openssl enc -aes-256-cbc -pbkdf2 -salt -pass file:"${keyFile}" -out "${archive}"`,
  { shell: "/bin/sh" },
);
// verify: decrypt and list
const listing = execSync(
  `openssl enc -d -aes-256-cbc -pbkdf2 -pass file:"${keyFile}" -in "${archive}" | tar -tzf - | wc -l`,
  { shell: "/bin/sh", encoding: "utf8" },
).trim();
if (parseInt(listing, 10) < 1) { console.error("backup verification failed"); process.exit(1); }

const m = loadManifest(expId);
m.backup = {
  required: true,
  confirmed: true,
  location: `${archive} (local encrypted; key: ~/.uz-backup/key) — R2 pending founder decision`,
  confirmedAt: nowIso(),
};
saveManifest(expId, m);
console.log(`backup verified: ${archive} (${listing} files) — manifest.backup.confirmed=true`);
console.log("NOTE: local-only backup is a temporary fallback; copy backups/ + ~/.uz-backup/key to a second device or approve R2.");
