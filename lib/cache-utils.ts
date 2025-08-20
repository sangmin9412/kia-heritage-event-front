import { NextResponse } from "next/server";
import { getCacheConfigForEnvironment, CUSTOM_CACHE_RULES } from "./cache-config";

// 파일 타입 정의
export type FileType = "image" | "font" | "svg" | "css" | "js" | "other";

// 캐시 설정 인터페이스
export interface CacheConfig {
  maxAge: number;
  immutable?: boolean;
  etag?: boolean;
}

// 파일 확장자 패턴 정의
export const FILE_PATTERNS = {
  image: /\.(jpg|jpeg|png|gif|webp|avif|ico|bmp|tiff)$/i,
  font: /\.(woff|woff2|ttf|otf|eot)$/i,
  svg: /\.svg$/i,
  css: /\.css$/i,
  js: /\.(js|mjs)$/i,
} as const;

/**
 * 파일 경로를 기반으로 파일 타입을 결정합니다.
 */
export function getFileType(pathname: string): FileType {
  // 경로 기반 체크 (우선순위)
  if (pathname.startsWith("/images/")) {
    return "image";
  }
  if (pathname.startsWith("/fonts/")) {
    return "font";
  }

  // 확장자 기반 체크
  for (const [type, pattern] of Object.entries(FILE_PATTERNS)) {
    if (pattern.test(pathname)) {
      return type as FileType;
    }
  }

  return "other";
}

/**
 * 특정 경로에 대한 커스텀 캐시 설정을 확인합니다.
 */
export function getCustomCacheConfig(pathname: string): CacheConfig | null {
  for (const [path, config] of Object.entries(CUSTOM_CACHE_RULES)) {
    if (pathname.startsWith(path)) {
      return config;
    }
  }
  return null;
}

/**
 * Cache-Control 헤더 값을 생성합니다.
 */
export function generateCacheControlHeader(config: CacheConfig): string {
  const parts = ["public"];

  if (config.maxAge > 0) {
    parts.push(`max-age=${config.maxAge}`);
  }

  if (config.immutable) {
    parts.push("immutable");
  }

  return parts.join(", ");
}

/**
 * 응답에 캐시 헤더를 설정합니다.
 */
export function setCacheHeaders(response: NextResponse, fileType: FileType, pathname?: string): void {
  // 커스텀 캐시 설정 확인
  let config: CacheConfig;

  if (pathname) {
    const customConfig = getCustomCacheConfig(pathname);
    if (customConfig) {
      config = customConfig;
    } else {
      const environmentConfigs = getCacheConfigForEnvironment();
      config = environmentConfigs[fileType];
    }
  } else {
    const environmentConfigs = getCacheConfigForEnvironment();
    config = environmentConfigs[fileType];
  }

  if (config.maxAge === 0) {
    return; // 캐시 설정하지 않음
  }

  // Cache-Control 헤더 설정
  const cacheControl = generateCacheControlHeader(config);
  response.headers.set("Cache-Control", cacheControl);

  // Expires 헤더 설정
  const expiresDate = new Date(Date.now() + config.maxAge * 1000);
  response.headers.set("Expires", expiresDate.toUTCString());

  // ETag 헤더 설정 (필요한 경우)
  if (config.etag) {
    response.headers.set("ETag", `"${Date.now()}"`);
  }
}
