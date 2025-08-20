import { CacheConfig, FileType } from "./cache-utils";

/**
 * 캐시 설정 상수
 */
export const CACHE_DURATIONS = {
  ONE_YEAR: 31536000, // 365 * 24 * 60 * 60
  ONE_MONTH: 2592000, // 30 * 24 * 60 * 60
  ONE_WEEK: 604800, // 7 * 24 * 60 * 60
  ONE_DAY: 86400, // 24 * 60 * 60
  ONE_HOUR: 3600, // 60 * 60
  NO_CACHE: 0,
} as const;

/**
 * 환경별 캐시 설정
 */
export const ENVIRONMENT_CONFIGS = {
  production: {
    image: { maxAge: CACHE_DURATIONS.ONE_YEAR, immutable: true, etag: true },
    font: { maxAge: CACHE_DURATIONS.ONE_YEAR, immutable: true, etag: true },
    svg: { maxAge: CACHE_DURATIONS.ONE_MONTH, immutable: false, etag: false },
    css: { maxAge: CACHE_DURATIONS.ONE_DAY, immutable: false, etag: false },
    js: { maxAge: CACHE_DURATIONS.ONE_DAY, immutable: false, etag: false },
    other: { maxAge: CACHE_DURATIONS.NO_CACHE, immutable: false, etag: false },
  },
  development: {
    image: { maxAge: CACHE_DURATIONS.ONE_HOUR, immutable: false, etag: false },
    font: { maxAge: CACHE_DURATIONS.ONE_HOUR, immutable: false, etag: false },
    svg: { maxAge: CACHE_DURATIONS.ONE_HOUR, immutable: false, etag: false },
    css: { maxAge: CACHE_DURATIONS.NO_CACHE, immutable: false, etag: false },
    js: { maxAge: CACHE_DURATIONS.NO_CACHE, immutable: false, etag: false },
    other: { maxAge: CACHE_DURATIONS.NO_CACHE, immutable: false, etag: false },
  },
} as const;

/**
 * 현재 환경에 따른 캐시 설정을 반환합니다.
 */
export function getCacheConfigForEnvironment(): Record<FileType, CacheConfig> {
  const env = process.env.NODE_ENV === "production" ? "production" : "development";
  return ENVIRONMENT_CONFIGS[env];
}

/**
 * 특정 파일 타입에 대한 커스텀 캐시 설정
 */
export const CUSTOM_CACHE_RULES = {
  // 특정 경로에 대한 특별한 캐시 설정
  "/images/banners/": { maxAge: CACHE_DURATIONS.ONE_WEEK, immutable: false, etag: true },
  "/fonts/critical/": { maxAge: CACHE_DURATIONS.ONE_YEAR, immutable: true, etag: true },
} as const;
