import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes the whole site to ./out for any static host.
  output: "export",
  // Trailing slashes keep the rebuilt URLs identical to the WordPress originals
  // (/proposals/, /add-ons/ ...), so existing inbound links and SEO carry over.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
