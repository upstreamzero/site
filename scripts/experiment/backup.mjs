#!/usr/bin/env node
/**
 * Private, authenticated backup of a run package, in three tiers:
 *
 *   workingCopy          runs/<EXP>/ on this machine (present at capture)
 *   localEncryptedArchive backups/<EXP>-<stamp>.uzenc  (AES-256-GCM)
 *   offDeviceBackup      an independent copy on separate physical/synced
 *                        storage — REQUIRED before review or publication
 *
 *   npm run experiment:backup -- EXP-0001                    (local only)
 *   npm run experiment:backup -- EXP-0001 --off-device /Volumes/USB/uz
 *   npm run experiment:backup -- EXP-0001 --r2 <bucket>      (see note)
 *
 * Encryption is AES-256-GCM (authenticated: any tampering fails
 * decryption). Verification proves, for both the local and the off-device
 * copy: the archive decrypts, its inventory matches the source, and every
 * restored artifact reproduces its original SHA-256.
 *
 * R2 is intentionally NOT auto-enabled: it requires account activation
 * and a payment method (free tier covers our volume at $0, but a card is
 * mandatory). --r2 is a guarded stub pending an explicit founder decision.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { ROOT, loadManifest, saveManifest, nowIso, runsDir } from "./lib.mjs";
import { loadKey, encryptBuffer, decryptBuffer, sha256Buffer } from "./crypto.mjs";

const args = process.argv.slice(2);
const expId = args[0];
if (!expId) { console.error("usage: experiment:backup -- <EXP-ID> [--off-device <path>] [--r2 <bucket>]"); process.exit(2); }
const flag = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };

const keyDir = path.join(os.homedir(), ".uz-backup");
const keyFile = path.join(keyDir, "key");
if (!fs.existsSync(keyFile)) {
  fs.mkdirSync(keyDir, { recursive: true });
  execSync(`openssl rand -hex 32 > "${keyFile}" && chmod 600 "${keyFile}"`);
  console.log(`backup key created at ${keyFile} — keep it safe; without it archives cannot be decrypted.`);
}
const key = loadKey(keyFile);
const base = runsDir(expId);
if (!fs.existsSync(base)) { console.error(`no working copy at ${base}`); process.exit(1); }
const m = loadManifest(expId);

// tar the run package (excluding the regenerable publication-package)
const tarGz = execSync(
  `tar -czf - --exclude publication-package -C "${path.join(ROOT, "runs")}" "${expId}"`,
  { shell: "/bin/sh", maxBuffer: 1 << 28 },
);

/** Decrypt + extract to a temp dir; prove inventory and per-file hashes. */
function verifyArchive(blob, label) {
  const errs = [];
  let plain;
  try { plain = decryptBuffer(blob, key); }
  catch (e) { return { ok: false, errs: [`${label}: decryption/authentication FAILED — ${e.message}`] }; }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "uzverify-"));
  const tgz = path.join(tmp, "a.tgz");
  fs.writeFileSync(tgz, plain);
  const listing = execSync(`tar -tzf "${tgz}"`, { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  execSync(`tar -xzf "${tgz}" -C "${tmp}"`);
  // per-file hash: every hashed artifact in the manifest must reproduce
  let checked = 0;
  for (const r of m.runs ?? []) {
    for (const [rel, expected] of Object.entries(r.sha256 ?? {})) {
      const p = path.join(tmp, expId, rel);
      if (!fs.existsSync(p)) { errs.push(`${label}: restored artifact missing: ${rel}`); continue; }
      const got = sha256Buffer(fs.readFileSync(p));
      if (got !== expected) errs.push(`${label}: HASH MISMATCH on restore for ${rel}`);
      else checked += 1;
    }
  }
  // inventory: every hashed source file must appear in the archive listing
  for (const r of m.runs ?? [])
    for (const rel of Object.keys(r.sha256 ?? {}))
      if (!listing.some((l) => l.replace(/^\.\//, "") === `${expId}/${rel}`))
        errs.push(`${label}: source artifact absent from archive inventory: ${rel}`);
  fs.rmSync(tmp, { recursive: true, force: true });
  return { ok: errs.length === 0, errs, fileCount: listing.length, hashesChecked: checked };
}

// ── tier 2: local encrypted archive ──
const outDir = path.join(ROOT, "backups");
fs.mkdirSync(outDir, { recursive: true });
const stamp = nowIso().replace(/[:.]/g, "-");
const archive = path.join(outDir, `${expId}-${stamp}.uzenc`);
const blob = encryptBuffer(tarGz, key);
fs.writeFileSync(archive, blob);
const archiveHash = sha256Buffer(blob);

const localCheck = verifyArchive(fs.readFileSync(archive), "local");
if (!localCheck.ok) { console.error("LOCAL BACKUP VERIFICATION FAILED:\n" + localCheck.errs.map((e) => "  - " + e).join("\n")); process.exit(1); }

m.backup = m.backup ?? {};
m.backup.required = true;
m.backup.workingCopy = { confirmed: true, location: path.relative(ROOT, base), confirmedAt: nowIso() };
m.backup.localEncryptedArchive = {
  confirmed: true, location: path.relative(ROOT, archive), sha256: archiveHash,
  method: "AES-256-GCM", confirmedAt: nowIso(),
};
console.log(`local encrypted archive verified: ${path.relative(ROOT, archive)}`);
console.log(`  method AES-256-GCM · ${localCheck.fileCount} files · ${localCheck.hashesChecked} artifact hashes reproduced`);

// ── tier 3: off-device (independent) copy ──
const offDir = flag("off-device");
const r2Bucket = flag("r2");
if (r2Bucket) {
  console.error(
    "R2 off-device backup is not enabled. R2 requires account activation and a\n" +
    "payment method (free tier covers this volume at $0, but a card is mandatory).\n" +
    "This is a founder decision — see the report. No paid service was enabled.");
  saveManifest(expId, m);
  process.exit(1);
}
if (offDir) {
  fs.mkdirSync(path.resolve(offDir), { recursive: true });
  const real = fs.realpathSync(path.resolve(offDir));
  if (real.startsWith(fs.realpathSync(ROOT)))
    { console.error(`--off-device path is inside the repository (${real}). It must be independent storage.`); process.exit(1); }
  const dest = path.join(real, path.basename(archive));
  fs.copyFileSync(archive, dest);
  const offCheck = verifyArchive(fs.readFileSync(dest), "off-device");
  if (!offCheck.ok) { console.error("OFF-DEVICE VERIFICATION FAILED:\n" + offCheck.errs.map((e) => "  - " + e).join("\n")); process.exit(1); }
  const offHash = sha256Buffer(fs.readFileSync(dest));
  if (offHash !== archiveHash) { console.error("off-device copy hash differs from source archive"); process.exit(1); }
  m.backup.offDeviceBackup = {
    confirmed: true, destinationType: "external-dir", location: dest,
    verifiedHash: offHash, confirmedAt: nowIso(),
  };
  console.log(`off-device backup verified: ${dest}`);
  console.log(`  ${offCheck.fileCount} files · ${offCheck.hashesChecked} artifact hashes reproduced · archive sha256 matches`);
} else if (!m.backup.offDeviceBackup?.confirmed) {
  console.log("\nNOTE: off-device backup NOT yet confirmed. prepare and approve will BLOCK");
  console.log("until you run:  npm run experiment:backup -- " + expId + " --off-device <independent path>");
}

saveManifest(expId, m);
