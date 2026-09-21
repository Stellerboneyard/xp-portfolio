import type { NextConfig } from "next";

// Static export for GitHub Pages -- basePath only applies in production:
// GitHub Pages serves this as a project site at /xp-portfolio/, but
// `next dev` still needs to run at "/" locally.
const repoName = "xp-portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: { unoptimized: true },
  // The dev-mode route badge sits bottom-left, exactly on top of this app's
  // own Start button -- dev-only noise, doesn't affect the exported build.
  devIndicators: false,
};

export default nextConfig;
