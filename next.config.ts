import type { NextConfig } from "next";

// GitHub Pages serves a project repo from a subpath
// (user.github.io/<repo>/) until a custom domain claims the root. The deploy
// workflow sets PAGES_BASE_PATH to the repo name while `public/CNAME` is
// absent -- Stage 1 in docs/deploy.md -- and to nothing once the CNAME lands
// and the site owns the root. Unset locally, so `npm run dev` and `npm run
// build` behave exactly as before.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: `next build` writes the whole site to ./out for any static host.
  output: "export",
  // Trailing slashes keep the rebuilt URLs identical to the WordPress originals
  // (/proposals/, /add-ons/ ...), so existing inbound links and SEO carry over.
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
