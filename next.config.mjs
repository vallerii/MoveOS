/** @type {import('next').NextConfig} */
const nextConfig = {
  // No ESLint config/dependency is set up in this repo. Without this, a
  // fresh `next build` detects that and interactively prompts to install +
  // configure ESLint, which hangs forever in any non-interactive environment
  // (CI, this sandbox, etc.) waiting for stdin. Add real linting later if
  // desired — this just stops production builds from silently blocking on it.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
