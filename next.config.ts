import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The `serverExternalPackages` option allows you to opt-out of bundling dependencies in your Server Components.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  webpack: (config, { buildId, dev }) => {
    const newConfig = config;

    if (!dev && newConfig.output.filename.startsWith("static")) {
      newConfig.output.filename = newConfig.output.filename.replace("[name]", `[name]-${buildId}`);
      newConfig.output.chunkFilename = newConfig.output.chunkFilename.replace("[name]", `[name]-${buildId}`);
    }

    return newConfig;
  },
  generateBuildId: async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    return `build-${timestamp}`;
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().getTime().toString(),
    KAKAO_SDK_KEY: process.env.KAKAO_SDK_KEY
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{
          key: "Access-Control-Allow-Origin",
          value: "https://dev.kia80years-event.com,https://kia80years-event.com"
        }, {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS"
        }, {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization"
        }, {
          key: "Access-Control-Allow-Credentials",
          value: "true"
        }]
      },
      {
        // 이미지 파일에 대한 캐시 헤더 설정
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // 1년 캐시
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ]
      },
      {
        // 폰트 파일에 대한 캐시 헤더 설정
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // 1년 캐시
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ]
      },
      {
        // 일반적인 정적 파일들 (jpg, jpeg, png, gif, webp, avif, ico, svg, woff, woff2, ttf, otf, json)
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|ico|svg|woff|woff2|ttf|otf|json)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // 1년 캐시
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ]
      }
    ];
  }
};

export default nextConfig;
