import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: the whole graph is knowable at build time
  // (static rendering), and Cloudflare Pages serves it as files.
  output: "export",
};

export default nextConfig;
