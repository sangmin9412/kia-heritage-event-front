import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The `serverExternalPackages` option allows you to opt-out of bundling dependencies in your Server Components.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().getTime().toString()
  },
  async headers() {
    return [
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
        // 일반적인 정적 파일들 (jpg, jpeg, png, gif, webp, avif, ico, svg, woff, woff2, ttf, otf)
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|ico|svg|woff|woff2|ttf|otf)$",
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
