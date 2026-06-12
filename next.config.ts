import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  repo = `/${repoName}`;
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
  output: process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production' ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  basePath: repo,
  assetPrefix: repo,
};

export default withPWA(nextConfig);
