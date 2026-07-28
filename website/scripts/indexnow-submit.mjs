/**
 * IndexNow submission. Notifies IndexNow-participating search engines
 * (Bing, Yandex, and others via the shared endpoint) that our pages have
 * changed, so they recrawl promptly. Independent of Cloudflare Crawler Hints.
 *
 * The IndexNow key is public by design: control of the domain is proven by
 * hosting <key>.txt at the site root. The key file lives in website/public,
 * so it deploys to https://upstreamzero.com/<key>.txt automatically.
 *
 * Run after a deploy, once the key file and sitemap are live:
 *   node website/scripts/indexnow-submit.mjs
 */

import { readdir } from "node:fs/promises";

const HOST = "upstreamzero.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function findKey() {
  const dir = new URL("../public/", import.meta.url);
  const files = await readdir(dir);
  const keyFile = files.find((f) => f.endsWith(".txt"));
  if (!keyFile) {
    throw new Error("No IndexNow key file (public/<key>.txt) found.");
  }
  return {
    key: keyFile.replace(/\.txt$/, ""),
    keyLocation: `https://${HOST}/${keyFile}`,
  };
}

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const { key, keyLocation } = await findKey();
  const urlList = await sitemapUrls();
  if (urlList.length === 0) throw new Error("No URLs found in sitemap.");

  console.log(`Submitting ${urlList.length} URLs to IndexNow.`);
  console.log(`Key: ${key}`);
  console.log(`Key location: ${keyLocation}`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
  });
  const text = await res.text();
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (text.trim()) console.log(text.trim());

  // 200 OK and 202 Accepted are both success.
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
