#!/usr/bin/env node
/**
 * Safety check: fails the build if private staging or sensitive files are
 * TRACKED by git. Runs as the website `prebuild` (locally and in Cloudflare
 * Pages CI), so an accidental commit of private artifacts can never reach a
 * deployment — the build that would publish it fails instead.
 *
 * Lives inside website/ so the public repo builds standalone, with no
 * dependency on the private operations repository. It scans the whole repo
 * (cwd = repo root = website/..).
 */
import { execSync } from "node:child_process";

const FORBIDDEN_PATH_PREFIXES = ["runs/", "backups/", "protocol/EXP-TEST/"];
const FORBIDDEN_PATTERNS = [
  /(^|\/)\.env(\.|$)/,
  /\.pem$/,
  /\.key$/,
  /\.p12$/,
  /\.har$/,
  /(^|\/)cookies.*\.txt$/,
  /session.*\.json$/i,
  /credentials/i,
  /\.sqlite$/,
  /(^|\/)protocol\/.*FIXTURE.*\//i,
  /\.uzenc$/,
];

let tracked;
try {
  tracked = execSync("git ls-files", {
    cwd: new URL("../..", import.meta.url).pathname,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);
} catch {
  console.warn(
    "[safety] git unavailable — skipping tracked-file check (build env without git).",
  );
  process.exit(0);
}

const violations = tracked.filter(
  (f) =>
    FORBIDDEN_PATH_PREFIXES.some((p) => f.startsWith(p)) ||
    FORBIDDEN_PATTERNS.some((re) => re.test(f)),
);

if (violations.length) {
  console.error(
    "[safety] FORBIDDEN FILES ARE TRACKED BY GIT — refusing to build:\n" +
      violations.map((v) => "  " + v).join("\n") +
      "\nRemove them from the index (git rm --cached) before building.",
  );
  process.exit(1);
}
console.log("[safety] staging/sensitive-file check passed.");
