#!/usr/bin/env node
/**
 * Safety check: fails the build if private staging or sensitive files are
 * TRACKED by git. Runs as `prebuild` for the website (locally and in
 * Cloudflare Pages CI), so an accidental commit of runs/ can never reach
 * a deployment — the build that would publish it fails instead.
 */
import { execSync } from "node:child_process";

const FORBIDDEN_PATH_PREFIXES = ["runs/", "backups/"];
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
];

let tracked;
try {
  tracked = execSync("git ls-files", {
    cwd: new URL("..", import.meta.url).pathname,
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
