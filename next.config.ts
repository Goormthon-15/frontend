import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  // Docker 컨테이너에서 standalone 출력 활성화
  output: "standalone",

  /** vapor ui 관련 설정 */
  // Vapor UI 번들 최적화 설정
  experimental: {
    optimizePackageImports: ["@vapor-ui/core", "@vapor-ui/icons"],

    // TurboPack svgr 설정
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  /** svgr 관련 설정 */
  webpack(config) {
    // @public alias 추가
    config.resolve.alias = {
      ...config.resolve.alias,
      "@public": path.resolve(__dirname, "public"),
    };

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
