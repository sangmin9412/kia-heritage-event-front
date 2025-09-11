# 기아 헤리티지 이벤트 (Kia Heritage Event)

기아자동차 창립 80주년을 기념하여 '나와 기아의 특별한 순간'을 주제로 한 온라인 포스터 이벤트 웹사이트입니다.

## 📋 프로젝트 개요

- **프로젝트명**: Kia Heritage Event Front-end
- **이벤트 기간**: 2025년 9월 29일 ~ 2025년 11월 10일

## 🚀 기술 스택

### Core Framework

- **Next.js 15.4.7**
- **React 19.1.0**
- **TypeScript 5**

### Styling & Animation

- **Tailwind CSS v4** - 유틸리티 기반 CSS 프레임워크
- **Sass** - CSS 전처리기
- **GSAP** - 애니메이션 라이브러리
- **Lenis** - 부드러운 스크롤 구현
- **Motion** - 추가 애니메이션 라이브러리

### UI Components & Interactions

- **Radix UI** - UI 컴포넌트 라이브러리
- **Embla Carousel** - 캐러셀 컴포넌트
- **Lucide React** - SVG 아이콘 라이브러리
- **Lottie Files** - 애니메이션 파일 지원

### Forms & Validation

- **React Hook Form** - 폼 라이브러리
- **Zod** - 스키마 선언 및 검증

### State Management & Data Fetching

- **Zustand** - 상태 관리 라이브러리
- **Axios** - HTTP 클라이언트

### Development & Build Tools

- **Puppeteer** - 브라우저 자동화 (포스터 생성)
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포매팅

## 📁 프로젝트 구조

```
kia-heritage-event-front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── globals.css        # 전역 스타일
│   │   ├── error.tsx          # 에러 페이지
│   │   ├── not-found.tsx      # 404 페이지
│   │   ├── (withLayout)/      # 레이아웃이 적용된 페이지 그룹
│   │   │   ├── page.tsx      # 메인 페이지
│   │   │   ├── (main)/       # 메인 이벤트 페이지
│   │   │   ├── form/         # 이벤트 참여 폼 페이지
│   │   │   └── create/       # 포스터 생성 페이지
│   │   ├── @modal/           # 모달 슬롯
│   │   ├── api/              # API 라우트
│   │   └── test/             # 테스트 페이지
│   ├── components/            # 재사용 가능 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트 (Radix UI 기반)
│   │   ├── features/         # 기능별 컴포넌트
│   │   │   ├── modal/        # 모달 컴포넌트들
│   │   │   ├── toast/        # 토스트 알림
│   │   │   ├── alert/        # 알림 컴포넌트
│   │   │   ├── layout/       # 레이아웃 컴포넌트
│   │   │   └── error/        # 에러 처리 컴포넌트
│   │   ├── contexts/         # React Context
│   │   └── providers/        # Provider 컴포넌트들
│   ├── features/             # 기능별 모듈
│   │   └── poster/           # 포스터 생성 관련 기능
│   ├── blocks/               # 재사용 가능한 블록 컴포넌트
│   │   ├── Animations/       # 애니메이션 블록
│   │   └── TextAnimations/   # 텍스트 애니메이션 블록
│   ├── hooks/                # 커스텀 훅
│   ├── utils/                # 유틸리티 함수
│   ├── types/                # TypeScript 타입 정의
│   ├── config/               # 설정 파일
│   ├── assets/               # 정적 자산 파일
│   ├── lib/                  # 라이브러리 설정
│   ├── styles/               # 스타일 파일
│   └── middleware.ts         # Next.js 미들웨어
├── public/                   # 정적 파일
│   ├── images/              # 이미지 파일
│   ├── fonts/               # 폰트 파일
│   └── lotties/             # Lottie 애니메이션 파일
├── lib/                     # 외부 라이브러리 설정
└── package.json             # 의존성 및 스크립트
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm, yarn, pnpm, bun 중 택일

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   # 또는
   bun install
   ```

2. **개발 서버 시작**

   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   # 또는
   bun dev
   ```

3. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 린팅
npm run lint
```

## 📝 개발 노트

### 프로젝트 구조

- **Route Groups**: `(withLayout)`, `@modal` 등을 활용한 레이아웃 및 모달 구조화
- **Feature-based Architecture**: 기능별로 모듈화된 컴포넌트 구조
- **UI Components**: Radix UI 기반의 재사용 가능한 컴포넌트 라이브러리

### 설정 및 데이터 관리

- 이벤트 기간 및 경품 정보는 `src/config/` 디렉토리에서 관리
- 상태 관리는 Zustand를 통해 전역 상태 관리
- 타입 정의는 `src/types/` 디렉토리에서 중앙 관리

### 리소스 관리

- 이미지 파일은 `public/images/` 디렉토리에 위치
- Lottie 애니메이션은 `public/lotties/` 디렉토리에 위치
- 폰트 파일은 `public/fonts/` 디렉토리에 위치

### 개발 도구

- TypeScript를 통한 타입 안전성 보장
- ESLint와 Prettier를 통한 코드 품질 관리
- 커스텀 훅은 `src/hooks/` 디렉토리에서 관리
- 유틸리티 함수는 `src/utils/` 디렉토리에서 관리

### 주요 기능

- **이벤트 참여 플로우**: 사용자 정보 입력 → 사진 업로드 → 포스터 생성 → 인스타그램 공유
- **포스터 커스터마이징**: 다양한 템플릿과 텍스트 옵션 제공
- **반응형 UI**: 모든 디바이스에서 최적화된 사용자 경험

## 환경변수

```bash
# .env
PUBLIC_URL=https://kia-heritage-event-front.vercel.app

# .env.production
NEXT_PUBLIC_API_URL=https://dev-api.kia80years-event.com

# .env.development
NEXT_PUBLIC_API_URL=https://dev-api.kia80years-event.com
```

## 배포

이 프로젝트는 Vercel에 최적화되어 있으며, 다음 명령어로 배포할 수 있습니다:

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```
