import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repositoryName.endsWith(".github.io");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGitHubActions && repositoryName && !isUserSiteRepo ? `/${repositoryName}` : "",
  assetPrefix:
    isGitHubActions && repositoryName && !isUserSiteRepo ? `/${repositoryName}/` : "",
};

export default nextConfig;
