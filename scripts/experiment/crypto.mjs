/**
 * Authenticated encryption for private run archives.
 *
 * Format: AES-256-GCM (Node stdlib `crypto`, an established authenticated
 * encryption construction — NOT custom cryptography). The 16-byte GCM
 * authentication tag means any alteration of the ciphertext, IV, or tag
 * causes decryption to THROW rather than return altered plaintext.
 *
 * On-disk layout of a .uzenc file:
 *   magic  "UZENC1\n"   (7 bytes)
 *   iv     (12 bytes, random per archive)
 *   tag    (16 bytes, GCM auth tag)
 *   ciphertext (rest)
 *
 * Key: the 32-byte value in ~/.uz-backup/key (64 hex chars). Never
 * committed; created once with `openssl rand -hex 32`, chmod 600.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const MAGIC = Buffer.from("UZENC1\n", "utf8");
const IV_LEN = 12;
const TAG_LEN = 16;

export function loadKey(keyFile) {
  const hex = fs.readFileSync(keyFile, "utf8").trim();
  if (!/^[0-9a-fA-F]{64}$/.test(hex))
    throw new Error(`key at ${keyFile} is not 32 bytes of hex (got ${hex.length} chars)`);
  return Buffer.from(hex, "hex");
}

/** Encrypt a plaintext Buffer to the authenticated on-disk format. */
export function encryptBuffer(plaintext, key) {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([MAGIC, iv, tag, ct]);
}

/** Decrypt; THROWS if the magic is wrong or the auth tag fails (tamper). */
export function decryptBuffer(blob, key) {
  if (!blob.subarray(0, MAGIC.length).equals(MAGIC))
    throw new Error("not a UZENC1 archive (bad magic)");
  let o = MAGIC.length;
  const iv = blob.subarray(o, (o += IV_LEN));
  const tag = blob.subarray(o, (o += TAG_LEN));
  const ct = blob.subarray(o);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  // .final() throws "Unsupported state or unable to authenticate data" on
  // any tampering — this is the authenticated-integrity guarantee.
  return Buffer.concat([decipher.update(ct), decipher.final()]);
}

export function sha256Buffer(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}
