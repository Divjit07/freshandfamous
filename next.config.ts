import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Replacing files under /public at the same path used to keep serving a
    // stale optimized bitmap. findAsset appends ?v=mtime; allow that search
    // param (omit `search` = allow any). TTL 0 so optimizer doesn't hold stale.
    minimumCacheTTL: 0,
    qualities: [75, 95, 100],
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
